// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// {{PRE_JSES}}

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;

// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)

if (Module['ENVIRONMENT']) {
  if (Module['ENVIRONMENT'] === 'WEB') {
    ENVIRONMENT_IS_WEB = true;
  } else if (Module['ENVIRONMENT'] === 'WORKER') {
    ENVIRONMENT_IS_WORKER = true;
  } else if (Module['ENVIRONMENT'] === 'NODE') {
    ENVIRONMENT_IS_NODE = true;
  } else if (Module['ENVIRONMENT'] === 'SHELL') {
    ENVIRONMENT_IS_SHELL = true;
  } else {
    throw new Error('The provided Module[\'ENVIRONMENT\'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.');
  }
} else {
  ENVIRONMENT_IS_WEB = typeof window === 'object';
  ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
  ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
  ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
}


if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = console.log;
  if (!Module['printErr']) Module['printErr'] = console.warn;

  var nodeFS;
  var nodePath;

  Module['read'] = function shell_read(filename, binary) {
    var ret;
    ret = tryParseAsDataURI(filename);
    if (!ret) {
      if (!nodeFS) nodeFS = require('fs');
      if (!nodePath) nodePath = require('path');
      filename = nodePath['normalize'](filename);
      ret = nodeFS['readFileSync'](filename);
    }
    return binary ? ret : ret.toString();
  };

  Module['readBinary'] = function readBinary(filename) {
    var ret = Module['read'](filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  if (!Module['thisProgram']) {
    if (process['argv'].length > 1) {
      Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
    } else {
      Module['thisProgram'] = 'unknown-program';
    }
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
  // Currently node will swallow unhandled rejections, but this behavior is
  // deprecated, and in the future it will exit with error status.
  process['on']('unhandledRejection', function(reason, p) {
    Module['printErr']('node.js exiting due to unhandled promise rejection');
    process['exit'](1);
  });

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = function shell_read(f) {
      var data = tryParseAsDataURI(f);
      if (data) {
        return intArrayToString(data);
      }
      return read(f);
    };
  } else {
    Module['read'] = function shell_read() { throw 'no read() available' };
  }

  Module['readBinary'] = function readBinary(f) {
    var data;
    data = tryParseAsDataURI(f);
    if (data) {
      return data;
    }
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof quit === 'function') {
    Module['quit'] = function(status, toThrow) {
      quit(status);
    }
  }
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function shell_read(url) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    } catch (err) {
      var data = tryParseAsDataURI(url);
      if (data) {
        return intArrayToString(data);
      }
      throw err;
    }
  };

  if (ENVIRONMENT_IS_WORKER) {
    Module['readBinary'] = function readBinary(url) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(xhr.response);
      } catch (err) {
        var data = tryParseAsDataURI(url);
        if (data) {
          return data;
        }
        throw err;
      }
    };
  }

  Module['readAsync'] = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function shell_print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function shell_printErr(x) {
      console.warn(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (typeof Module['setWindowTitle'] === 'undefined') {
    Module['setWindowTitle'] = function(title) { document.title = title };
  }
}
else {
  // Unreachable because SHELL is dependent on the others
  throw new Error('Unknown runtime environment. Where are we?');
}

if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}
if (!Module['quit']) {
  Module['quit'] = function(status, toThrow) {
    throw toThrow;
  }
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = undefined;



// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

// stack management, and other functionality that is provided by the compiled code,
// should not be used before it is ready
stackSave = stackRestore = stackAlloc = setTempRet0 = getTempRet0 = function() {
  abort('cannot use the stack before compiled code is ready to run, and has provided stack access');
};

function staticAlloc(size) {
  assert(!staticSealed);
  var ret = STATICTOP;
  STATICTOP = (STATICTOP + size + 15) & -16;
  return ret;
}

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  if (end >= TOTAL_MEMORY) {
    var success = enlargeMemory();
    if (!success) {
      HEAP32[DYNAMICTOP_PTR>>2] = ret;
      return 0;
    }
  }
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  var ret = size = Math.ceil(size / factor) * factor;
  return ret;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 === 0);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    Module.printErr(text);
  }
}



var functionPointers = new Array(0);

function addFunction(func) {
  for (var i = 0; i < functionPointers.length; i++) {
    if (!functionPointers[i]) {
      functionPointers[i] = func;
      return 2*(1 + i);
    }
  }
  throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
}

function removeFunction(index) {
  functionPointers[(index-2)/2] = null;
}

var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}


function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

function dynCall(sig, ptr, args) {
  if (args && args.length) {
    assert(args.length == sig.length-1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    assert(sig.length == 1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].call(null, ptr);
  }
}


function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

var Runtime = {
  // FIXME backwards compatibility layer for ports. Support some Runtime.*
  //       for now, fix it there, then remove it from here. That way we
  //       can minimize any period of breakage.
  dynCall: dynCall, // for SDL2 port
  // helpful errors
  getTempRet0: function() { abort('getTempRet0() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  staticAlloc: function() { abort('staticAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  stackAlloc: function() { abort('stackAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
};

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 8;



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html



//========================================
// Runtime essentials
//========================================

var ABORT = 0; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

var JSfuncs = {
  // Helpers for cwrap -- it can't refer to Runtime directly because it might
  // be renamed by closure, instead it calls JSfuncs['stackSave'].body to find
  // out what the minified function name is.
  'stackSave': function() {
    stackSave()
  },
  'stackRestore': function() {
    stackRestore()
  },
  // type conversion from js to c
  'arrayToC' : function(arr) {
    var ret = stackAlloc(arr.length);
    writeArrayToMemory(arr, ret);
    return ret;
  },
  'stringToC' : function(str) {
    var ret = 0;
    if (str !== null && str !== undefined && str !== 0) { // null string
      // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
      var len = (str.length << 2) + 1;
      ret = stackAlloc(len);
      stringToUTF8(str, ret, len);
    }
    return ret;
  }
};
// For fast lookup of conversion functions
var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

// C calling interface.
function ccall (ident, returnType, argTypes, args, opts) {
  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  if (returnType === 'string') ret = Pointer_stringify(ret);
  if (stack !== 0) {
    stackRestore(stack);
  }
  return ret;
}

function cwrap (ident, returnType, argTypes) {
  argTypes = argTypes || [];
  var cfunc = getCFunc(ident);
  // When the function takes numbers and returns a number, we can just return
  // the original function
  var numericArgs = argTypes.every(function(type){ return type === 'number'});
  var numericRet = returnType !== 'string';
  if (numericRet && numericArgs) {
    return cfunc;
  }
  return function() {
    return ccall(ident, returnType, argTypes, arguments);
  }
}

/** @type {function(number, number, string, boolean=)} */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @type {function(number, string, boolean=)} */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [typeof _malloc === 'function' ? _malloc : staticAlloc, stackAlloc, staticAlloc, dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!staticSealed) return staticAlloc(size);
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}

/** @type {function(number, number=)} */
function Pointer_stringify(ptr, length) {
  if (length === 0 || !ptr) return '';
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = 0;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    hasUtf |= t;
    if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (hasUtf < 128) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  return UTF8ToString(ptr);
}

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAP8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
function UTF8ArrayToString(u8Array, idx) {
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  while (u8Array[endPtr]) ++endPtr;

  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var u0, u1, u2, u3, u4, u5;

    var str = '';
    while (1) {
      // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
      u0 = u8Array[idx++];
      if (!u0) return str;
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      u1 = u8Array[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      u2 = u8Array[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u3 = u8Array[idx++] & 63;
        if ((u0 & 0xF8) == 0xF0) {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
        } else {
          u4 = u8Array[idx++] & 63;
          if ((u0 & 0xFC) == 0xF8) {
            u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
          } else {
            u5 = u8Array[idx++] & 63;
            u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
          }
        }
      }
      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF8ToString(ptr) {
  return UTF8ArrayToString(HEAPU8,ptr);
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x1FFFFF) {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x3FFFFFF) {
      if (outIdx + 4 >= endIdx) break;
      outU8Array[outIdx++] = 0xF8 | (u >> 24);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 5 >= endIdx) break;
      outU8Array[outIdx++] = 0xFC | (u >> 30);
      outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      ++len;
    } else if (u <= 0x7FF) {
      len += 2;
    } else if (u <= 0xFFFF) {
      len += 3;
    } else if (u <= 0x1FFFFF) {
      len += 4;
    } else if (u <= 0x3FFFFFF) {
      len += 5;
    } else {
      len += 6;
    }
  }
  return len;
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function UTF16ToString(ptr) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  while (HEAP16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

function demangle(func) {
  warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  return func;
}

function demangleAll(text) {
  var regex =
    /__Z[\w\d_]+/g;
  return text.replace(regex,
    function(x) {
      var y = demangle(x);
      return x === y ? x : (x + ' [' + y + ']');
    });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  var js = jsStackTrace();
  if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
  return demangleAll(js);
}

// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;
var MIN_TOTAL_MEMORY = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBuffer(buf) {
  Module['buffer'] = buffer = buf;
}

function updateGlobalBufferViews() {
  Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
  Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
  Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}

var STATIC_BASE, STATICTOP, staticSealed; // static area
var STACK_BASE, STACKTOP, STACK_MAX; // stack area
var DYNAMIC_BASE, DYNAMICTOP_PTR; // dynamic area handled by sbrk

  STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
  staticSealed = false;


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  HEAPU32[(STACK_MAX >> 2)-1] = 0x02135467;
  HEAPU32[(STACK_MAX >> 2)-2] = 0x89BACDFE;
}

function checkStackCookie() {
  if (HEAPU32[(STACK_MAX >> 2)-1] != 0x02135467 || HEAPU32[(STACK_MAX >> 2)-2] != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' + HEAPU32[(STACK_MAX >> 2)-2].toString(16) + ' ' + HEAPU32[(STACK_MAX >> 2)-1].toString(16));
  }
  // Also test the global address 0 for integrity. This check is not compatible with SAFE_SPLIT_MEMORY though, since that mode already tests all address 0 accesses on its own.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
}

function abortStackOverflow(allocSize) {
  abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
}

function abortOnCannotGrowMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
}


function enlargeMemory() {
  abortOnCannotGrowMemory();
}


var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
if (TOTAL_MEMORY < TOTAL_STACK) Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');



// Use a provided buffer, if there is one, or else allocate a new one
if (Module['buffer']) {
  buffer = Module['buffer'];
  assert(buffer.byteLength === TOTAL_MEMORY, 'provided buffer should be ' + TOTAL_MEMORY + ' bytes, but it is ' + buffer.byteLength);
} else {
  // Use a WebAssembly memory where available
  {
    buffer = new ArrayBuffer(TOTAL_MEMORY);
  }
  assert(buffer.byteLength === TOTAL_MEMORY);
  Module['buffer'] = buffer;
}
updateGlobalBufferViews();


function getTotalMemory() {
  return TOTAL_MEMORY;
}

// Endianness check (note: assumes compiler arch was little-endian)
  HEAP32[0] = 0x63736d65; /* 'emsc' */
HEAP16[1] = 0x6373;
if (HEAPU8[2] !== 0x73 || HEAPU8[3] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  checkStackCookie();
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

assert(Math['imul'] && Math['fround'] && Math['clz32'] && Math['trunc'], 'this is a legacy browser, build with LEGACY_VM_SUPPORT');

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data



var memoryInitializer = null;






// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return String.prototype.startsWith ?
      filename.startsWith(dataURIPrefix) :
      filename.indexOf(dataURIPrefix) === 0;
}





// === Body ===

var ASM_CONSTS = [];




STATIC_BASE = GLOBAL_BASE;

STATICTOP = STATIC_BASE + 20000;
/* global initializers */  __ATINIT__.push();


memoryInitializer = "data:application/octet-stream;base64,AAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAACAAAAAwAAAAQAAAAFAAAABQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAXAAAAFwAAABcAAAAXAAAAFwAAABcAAAAXAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAAB8AAAAfAAAAIQAAACIAAAAKAAAAIwAAACQAAAAKAAAACgAAACUAAAAKAAAAJgAAACcAAAAKAAAACgAAAAoAAAAKAAAAKAAAACkAAAAqAAAACgAAACsAAAAKAAAACgAAACwAAAAtAAAALgAAAC8AAAAKAAAAAQAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAAAoAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAAKAAAAPwAAAEAAAABBAAAAQgAAACoAAABDAAAAJwAAAEQAAAAKAAAARQAAAEYAAABHAAAASAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAABAAAAAQAAAAEAAAACAAAAAQAAAAEAAAABAAAAAQAAAAEAAAADAAAAAQAAAAEAAAAEAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAFAAAABQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAFAAAABQAAAAUAAAAFAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAQAAAAEAAAABAAAAAQAAAAUAAAAFAAAABQAAAAUAAAAFAAAABQAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAEAAAABAAAAAQAAAAEAAAAAAAAAljAHdyxhDu66UQmZGcRtB4/0anA1pWPpo5VknjKI2w6kuNx5HunV4IjZ0pcrTLYJvXyxfgctuOeRHb+QZBC3HfIgsGpIcbnz3kG+hH3U2hrr5N1tUbXU9MeF04NWmGwTwKhrZHr5Yv3syWWKT1wBFNlsBmNjPQ/69Q0IjcggbjteEGlM5EFg1XJxZ6LR5AM8R9QES/2FDdJrtQql+qi1NWyYskLWybvbQPm8rONs2DJ1XN9Fzw3W3Fk90ausMNkmOgDeUYBR18gWYdC/tfS0ISPEs1aZlbrPD6W9uJ64AigIiAVfstkMxiTpC7GHfG8vEUxoWKsdYcE9LWa2kEHcdgZx2wG8INKYKhDV74mFsXEftbYGpeS/nzPUuOiiyQd4NPkAD46oCZYYmA7huw1qfy09bQiXbGSRAVxj5vRRa2tiYWwc2DBlhU4AYvLtlQZse6UBG8H0CIJXxA/1xtmwZVDptxLquL6LfIi5/N8d3WJJLdoV83zTjGVM1PtYYbJNzlG1OnQAvKPiMLvUQaXfSteV2D1txNGk+/TW02rpaUP82W40RohnrdC4YNpzLQRE5R0DM19MCqrJfA3dPHEFUKpBAicQEAu+hiAMySW1aFezhW8gCdRmuZ/kYc4O+d5emMnZKSKY0LC0qNfHFz2zWYENtC47XL23rWy6wCCDuO22s7+aDOK2A5rSsXQ5R9Xqr3fSnRUm2wSDFtxzEgtj44Q7ZJQ+am0NqFpqegvPDuSd/wmTJ64ACrGeB31Ekw/w0qMIh2jyAR7+wgZpXVdi98tnZYBxNmwZ5wZrbnYb1P7gK9OJWnraEMxK3Wdv37n5+e++jkO+txfVjrBg6KPW1n6T0aHEwtg4UvLfT/Fnu9FnV7ym3Qa1P0s2skjaKw3YTBsKr/ZKAzZgegRBw+9g31XfZ6jvjm4xeb5pRoyzYcsag2a8oNJvJTbiaFKVdwzMA0cLu7kWAiIvJgVVvju6xSgLvbKSWrQrBGqzXKf/18Ixz9C1i57ZLB2u3luwwmSbJvJj7JyjanUKk20CqQYJnD82DuuFZwdyE1cABYJKv5UUerjiriuxezgbtgybjtKSDb7V5bfv3Hwh39sL1NLThkLi1PH4s91oboPaH80WvoFbJrn24Xewb3dHtxjmWgiIcGoP/8o7BmZcCwER/55lj2muYvjT/2thRc9sFnjiCqDu0g3XVIMETsKzAzlhJmen9xZg0E1HaUnbd24+SmrRrtxa1tlmC99A8DvYN1OuvKnFnrvef8+yR+n/tTAc8r29isK6yjCTs1Omo7QkBTbQupMG180pV95Uv2fZIy56ZrO4SmHEAhtoXZQrbyo3vgu0oY4MwxvfBVqN7wItMAkAAAUAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADAAAACkYAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwCQAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAMAAAASRgAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAKAAAFAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAwAAABpKAAAABAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAK/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2EUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAZAAAAOgDAAAQJwAAoIYBAEBCDwCAlpgAAOH1BV9wiQD/CS8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvAG0ABAADAE8AbABsAFsAbQBrACQAYgBaAG0AVABVAGAAXwBQAF4AWQBhACUAJQBRAEwAYwBSAGQAaABpACQAVwBYAGUAJAAkACQAJAAkACQAJAAkACQAJAAkACQATQBnAE4AXABTAFYAXQBLAAAAKQAAAC0AJAA9AEgAPgAAAAAAOwAuAEYAOQAsAEcAOgAvADQAAAABAAIAPAAAAAAAJQAAAAAAIAAhACIAHQAfAB4AIwAzADEARQAyAEoAKwBEAEIAagAkAD8AZgAkACQAJAAkAA0AJAAkACQAEQAkABMAJAAWACQAJAAkACQAJAAkAEEASQAwACgANQAAACoAAAAnACYAAAAnADgANwBDACQAQAAkACQAJAAkACQAJAAkACQAJAAPACQAJAAVACQAJAAkABoAJAAkACoANgAFACQABwAkACQAJAAkACQADgAkACQAJAAkACQAJAAkACQAKgAFAAUABgAIACQAJAAkACQAJAAkACQAJAAkABkAJAAcACoAJAAkACQADAAkABIAJAAXABgAGwAqACQAJAALABAAJAAqAAkACgAkACQAFAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACwAMAA0AEQAVABUAFgAfAB8AJwAcABgAHAAcACAAIAAWABYAEQAYABgADAAaABwAHQApACoAGgAdACcACwAsAE8AGgAtACoALAAyACkADQAtAC0AHAA1AEQAMgA8AOMAVABUADIAGgAbAFIAGwAbAE8AZQBlAFQAbABsANsAgwAbABsAGwDaABsAGwAbABsAGwAbABsAGwBEAFIAVACIAIgAGwDWADwAGwAbADUAgwAbAFcAGwBXABsAGwBXAFcAbgAbABsAVQBuAFUAVQDTAIQAbgCEAIkAiQCEAIYAhgBVANIAzQCiAIQAogCEAMsAogCGAMkAtQDIALUAxwCiALUAogDEAFUAwgDBAMAAtQC/ALUAvgC9AIYApACkAKQAvACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAxgDRAMYA0QC7AMYA0QC6ALQAswCyALEAxgDRAMYA0QDeAN4A3gDeAN4A3wCwAN8A4ACvAOAArgDgAOEArQDhAOEA4QDiAKsA4gDiAOIA5ACqAOQA5ADkAKkAqACnAKUAoQCgAJ4AnQCcAJoAmQCXAJYAlQCUAJMAkgCRAJAAjwCNAIwAfQB8AHsAegB5AHgAdgB1AHQAcgBxAHAAbQBrAGoAaABhAE4ARQA+ADcAMwAxADAALwAuACsAKAAkACMAIgAhABkAEgAQAA4ABQDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAAAAAAAAAAAAAACEAYUBhQGFAYUBhQE7AEMAQwBnAQAAZwFAAFQBhQGFATIAPgCFAUEAbAFPAGkAPwBJAIUBNgA8AGMBYwFfAUgBhQGFATcAPAEyAC8AQAEwADYARQFDAUMBMwE3AD4BhQFZAIUBWAGFAYUBhQGFAW8AhQFvAYUBAACFAYUBhQFoAGUBhQGFAYUBhQGFAYUBhQGFAV0BVACFAYUBaQAAAGMAmAAAAJEAhQGFAYUBhQGFAYUBhQGFAYUBVQGFAYUBhQFnAIUBhQFKAYUBUwE5AUUAMAF4AAAAKwEuASoBAAAqAScBIwEAACQBLAEkAR4BIwEoAYUBhQGFAYUBhQFzAHsAAAChAAAAggCeAIUBhQFEATMBhQEtASgBKQEZARcBKAEjASIBJQEAABcBEgEAABABEAETAQAAGwEUAYYAhQHVABQBAAAVARMBFAEEAQABAAACAfoABwH1APcA5QDqAPIAjgAAAAAAAAAAAOkA7ACfAKAAmQCQAJMAkgCWAAAAlgAAAOgAhQCRAIIAAAB8AAAAiQAAAAAAAADpAIYAcQAAAAAAZwCFAQAAAABPAFIAAACFAS0BMAE1AToBPwFzAEQBAADdAAEAAQABAN0A3QDdAN0A3QDdAN0A3QDeAN0A3wDdAN0A4ADdAN0A3QDdAN0A3QDdAOEA3QDdAN0A3QDdAN0A3QDdAN0A3wDdAN0A3QDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDdAN0A3QDdAN0A3QDdAN0A3gDdAN4A3QDfAN0A3QDdAOAA4ADdAN0A3QDdAN0A3QDdAN0A3QDiAN0A3QDiAOEA3QDdAOMA3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN8A3QDdAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3QDdAN0A3QDdAOIA3QDiAN0A4wDdAN0A3QDdAN0A3wDdAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3QDdAN0A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDdAOQApADfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3wDfAN8A3QDfAN8A3wDfAN8A3wDfAN8A3wDfAN0A3wDfAN8A3wDfAN0A3wDfAN8A3wDfAAAA3QDdAN0A3QDdAN0A3QAAAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjAA8ADwAPAA8AJAAPAA8ADwAPAA8ADwAPAA8AJQAGACYAJwAPACgAKQAqACsALAAPAA8ALQAPAA8ADwAuAC8ADwAwADEAMgAPADMADwA0ADUANgA3ADgAOgA9AEIARgBHAEgAYQBiAGkAVABLAFUAVQBjAGQASQBKAEMATABNADsAUABXAF8AbABuAFEAYABqADkAcQCEAFIAcwBvAHIAegBtAD4AdAB1AFcAfgCBAHsAPQCHAIYAhgB8AFMAVACEAFUAVQCFAIsAjABXAJAAkQDcAIQAVgBXAFgA2wBZAFoAWwBWAFwAXQBeAFYARQCFAFcAiQCJAFYA2gA+AFcAWAB/AIUAWQCIAFoAiABbAFYAiQCJAJMAXABdAFQAlABVAFUA2QCiAJUAogCJAIkAogCGAIYAVwDYANYAtQCiALUAogDVALUAVwDUAMYA0wDGANIAtQDGALUA0ABXAM8AzgDNAMYAzADGAMsAygBXALYAtgC2AMkAtgC2ALYAtgC2ALcAtgC2ALYAtgC2ALYAtgC2ALYAtgC2ALcAtwC2ALYAtgC2ALYAtgC2ALcAtwC3ALcAtwC3ALcAtwC3ALcAtwC3ALcAtgC2ALYAtgC3ALcAtwC3ALcAtwC3ALcAtwC3ALcAtwC3ALcAtwC3ALcAtwC3ALcAtwC2ALYAtgC2ANEA1wDRANcAyADRANcAxwDFAMQAwwDCANEA1wDRANcAPAA8ADwAPAA8AEAAwQBAAEQAwABEAL8ARABPAL4ATwBPAE8AgwC9AIMAgwCDALYAvAC2ALYAtgC7ALoAuQC4ALQAswCyALEAsACvAK4ArQCsAKsAqgCpAKgApwCmAKUApACjAKEAoACfAJ4AnQCcAJsAmgCZAJgAlwCWAJIAjwCOAI0AigCCAEQA3QCAAH0AeQB4AHcAdgBwAGsAaABnAGYAZQBOAEUAQQA/AN0ABQDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDc/9f/GwCfAUz/3P9M/w0ABQAPAEz/TP9M/0z/TP9M/0z/TP/EBMQE3v/EBMQExATn/9oE/v8CAE0AxAT/AQQATP/fAMQExATEBBUCCQDEBJ8BTP9M/0z/TP9M/0z/TP/d/9wATP8RABMA5v9HACoAKwDb/3IAZQAfAEz/AABM/0z/TP8hAGoASQCIAFUAogBM/+r/nwHs//L/+P+fASwAUABM/0z/TP/7/0z/TP9vAHUCqABpAAoATP8/AUz/TP9M/0z/iwJrAAsA0P9dAEz/TP/EBMQETP9M/0z/TP9M/8QETP9M/0z/TP9M/0z/TP/EBMQE6wLEBMQExATEBMQExATEBMQExATEBMQExATEBMQExATEBMQETP9M/8QEAQOwALQATP+/AEz/wwBM/58BTP+fAZ8BnwGlAMQExATEBEz/TP9vAEz/YQNM/4kATP9M/3cDjwBM/0z/3ADcAEz/TP8TAIoAHQDm/0cAKgArANv/2/9yAHIAZQBlAGUAHwAfAEz/TP9M/0z/x/9M/9cDTP9M/0z/TP9M/6sATP9M/8QEJgA3AFcAjABvAO0DjABvAE0ExARkBEz/TP/z/0MAnwGfAcQETP+MAG8ATP+MAG8ASgDEBG8AnwFM/0z/TP9M/0wATP9M/8QEUgBM/58BYgCNAEz/jgBM/0z/EwAoABUAFgAXACUAGQADABIAHAAFAB4AAwADAAMADwAQAAQAJQAdACcABgBPAFAAIgAjACQAAAApAEEAKwBPAFAA1ABLAEoA1wBeAHAATgBLAEsAGQAYAE8AUAB4AFQAVQDkAEsAYwDnAEsAXQBLAFIATwBQAE8AUABLAEsAFAAVAE8AUABLAD8AWABLAE8AUABLAE8AUAA/AEsAPwBiAAMABAAFAAYABwAIAAkACgALAAwADQAOAEEAXQAXAF8APwBhAFEAFgBgADkAOgB6AEsAYABgAGAATwBQAAQAjwCXAEsAmQCaAJsATwBQAFgAWQBaAFsAjgCPAFMAiACJAIoAiwBLABEAEgATAE8AUAA/ADwAnQCeAJ8ABQBLAEIAQwCkAE8AUAA/AEsAqQBLAEsATwBQAE8AUABLAE4ATwBQAE8AUABWAFcATgBPAFAABgBcAF0AAwBfAEsARQBiAEUATwBQAAMAxwCDAIQAhQAEAOAA4QBWAFcA0ABPAFAAYwBpAGoA1gAFAOwA2QDaANsABgB/AIAAhgCHAEUA4gD3ACwAgQCCAEUAKgBMAOoATAAAAE0ATQAhAN4AewB5AHwA9AADAAQABQAGAAcACAAJAAoACwAMAA0ADgB9ACcAJgB+AP///////xYAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgD///////8nACgAKQD//ysALAAtAC4ALwAwADEA//////////////////////////88AP////////////9CAEMA//////////////////9LAEwATQD/////////////////////VgBXAP//////////XABdAP//XwD/////YgADAAQABQAGAAcACAAJAAoACwAMAA0ADgD//////////////////xYA//////////////////////////////////////////8nACgAKQD//ysALAAtAC4ALwAwADEA//////////////////////////88AP////////////9CAEMA//////////////////9LAEwATQD/////////////////////VgBXAP//////////XABdAP//XwD/////YgADAAQABQAGAAcACAAJAAoACwAMAA0ADgD//////////////////xYA//////////////////////////////////////////8nACgAKQD//ysALAAtAC4ALwAwADEA//////////////////////////88AP////////////9CAEMA//////////////////9LAEwA////////////////////////VgBXAP//////////XABdAP//XwD/////YgADAAQABQAGAAcACAAJAAoACwAMAA0ADgD//////////////////xYA/////wMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD///////////////////////////////////////88AP////////////9CAEMA/////////////////////////////////////zwA////////VgBXAEIAQwD/////XABdAF4AXwD/////YgD///////////////////////9WAFcA//////////9cAF0AXgBfAP////9iAAMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD/////AwAEAAUABgAHAAgACQAKAAsADAANAA4A//////////////////8WAP///////////////////////////////////////zwA/////////////0IAQwD/////////////////////////////////////PAD///////9WAFcAQgBDAP////9cAF0AXgBfAP////9iAP///////////////////////1YAVwD//////////1wAXQBeAF8A/////2IAAwAEAAUABgAHAAgACQAKAAsADAANAA4A//////////////////8WAP////8DAAQABQAGAAcACAAJAAoACwAMAA0ADgD//////////////////xYA////////////////////////////////////////PAD/////////////QgBDAP//////////////////SwD///////////////88AP///////1YAVwBCAEMA/////1wAXQD//18A/////2IA////////////////////////VgBXAP//////////XABdAP//XwBgAP//YgADAAQABQAGAAcACAAJAAoACwAMAA0ADgD//////////////////xYA/////wMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD///////////////////////////////////////88AP////////////9CAEMA//////////////////9LAP///////////////zwA////////VgBXAEIAQwD/////XABdAP//XwD//0sAYgD///////////////////////9WAFcA//////////9cAF0A//9fAP////9iAAMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD/////AwAEAAUABgAHAAgACQAKAAsADAANAA4A//////////////////8WAP///////////////////////////////////////zwA/////////////0IAQwD/////////////////////////////////////PAD///////9WAFcAQgBDAP////9cAF0A//9fAGAASwBiAP///////////////////////1YAVwD//////////1wAXQD//18A/////2IAAwAEAAUABgAHAAgACQAKAAsADAANAA4A//////////////////8WAP///////wMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD/////////////////////////////////////PAD/////////////QgBDAP//////////////////SwD//////////////////zwA/////1YAVwD//0IAQwD//1wAXQD//18A/////2IATAD///////////////////////9WAFcA//////////9cAF0A//9fAP////9iAAMABAAFAAYABwAIAAkACgALAAwADQAOAP//////////////////FgD/////AwAEAAUABgAHAAgACQAKAAsADAANAA4A//////////////////8WAP///////////////////////////////////////zwA/////////////0IAQwD/////////////////////////////////////PAD///////9WAFcAQgBDAP////9cAF0A//9fAP////9iAP///////////////////////1YAVwD//////////1wAXQD//18A/////2IATP/ZALsA2f9N/0z/TP///0z/TP/t/1gAtv9M/2YAYwBkAHEAcwBLAFEAMgBGAPb/TP9M/8gA4P9M/8oATP9mYXRhbCBmbGV4IHNjYW5uZXIgaW50ZXJuYWwgZXJyb3ItLW5vIGFjdGlvbiBmb3VuZABvdXQgb2YgZHluYW1pYyBtZW1vcnkgaW4geXlfY3JlYXRlX2J1ZmZlcigpAGZhdGFsIGZsZXggc2Nhbm5lciBpbnRlcm5hbCBlcnJvci0tZW5kIG9mIGJ1ZmZlciBtaXNzZWQAZmF0YWwgZXJyb3IgLSBzY2FubmVyIGlucHV0IGJ1ZmZlciBvdmVyZmxvdwBpbnB1dCBpbiBmbGV4IHNjYW5uZXIgZmFpbGVkAG91dCBvZiBkeW5hbWljIG1lbW9yeSBpbiB5eV9nZXRfbmV4dF9idWZmZXIoKQBvdXQgb2YgZHluYW1pYyBtZW1vcnkgaW4geXllbnN1cmVfYnVmZmVyX3N0YWNrKCkAZmxleCBzY2FubmVyIHB1c2gtYmFjayBvdmVyZmxvdwAAAgICAgICAk1MAgICAgICAgICAgICAgICAgICAgICAgJcAgICW1MCX2BYVktXYVkCAgICAgICAgICUE5UT1VRAgICAgICAgICAgICAgICAgICAgICAgICAgICXQJeWgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiUmMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpJZ0tMTWJQWUhURFdZpaWMjUJXVWVGaWpeX2AEFQEWaWrjA5jm3K+caEp5e2lqsIGC8k6r85dnmXxpamlqmux/gGlqm0WioGlqUWlqQ1JHogYHCAkKCwwNDg8QEQGOfY+RkHoSWp2es9tjpqppapLHzODNzs9paoiJiovFV37BwsPE4YOEhWlqkx3R0tOU7h4f1WlqlfTY91Npamlq+Z9pamlqIiPiaWqWJCWjJvukJ6lpasiivL2+ye/whoffaWqsra7lyvbo6evLuLm/wNbx+tC6u9ne2vUhAvz9Xe20sbX4BgcICQoLDA0ODxARtmZktwAAABJrbG1ub3BxcnN0dXZ3AAAAExQVABYXGBkaGxwAAAAAAAAAAAAAHQAAAAAAHh8AAAAAAAAAICFcAAAAAAAAAAAiIwAAAAAkJQAmAAAnBgcICQoLDA0ODxARAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAExQVABYXGBkaGxwAAAAAAAAAAAAAHQAAAAAAHh8AAAAAAAAAICGnAAAAAAAAAAAiIwAAAAAkJQAmAAAnBgcICQoLDA0ODxARAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAExQVABYXGBkaGxwAAAAAAAAAAAAAHQAAAAAAHh8AAAAAAAAAICEAAAAAAAAAAAAiIwAAAAAkJQAmAAAnBgcICQoLDA0ODxARAAAAAAAAABIAAAYHCAkKCwwNDg8QEQAAAAAAAAASAAAAAAAAAAAAAAAAAAAAHQAAAAAAHh8AAAAAAAAAAAAAAAAAAB0AAAAiIx4fAAAkJVYmAAAnAAAAAAAAAAAAIiMAAAAAJCVhJgAAJwYHCAkKCwwNDg8QEQAAAAAAAAASAAAGBwgJCgsMDQ4PEBEAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAB0AAAAAAB4fAAAAAAAAAAAAAAAAAAAdAAAAIiMeHwAAJCWhJgAAJwAAAAAAAAAAACIjAAAAACQlqCYAACcGBwgJCgsMDQ4PEBEAAAAAAAAAEgAABgcICQoLDA0ODxARAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAdAAAAAAAeHwAAAAAAAACyAAAAAAAAHQAAACIjHh8AACQlACYAACcAAAAAAAAAAAAiIwAAAAAkJQAmxgAnBgcICQoLDA0ODxARAAAAAAAAABIAAAYHCAkKCwwNDg8QEQAAAAAAAAASAAAAAAAAAAAAAAAAAAAAHQAAAAAAHh8AAAAAAAAA1AAAAAAAAB0AAAAiIx4fAAAkJQAmANcnAAAAAAAAAAAAIiMAAAAAJCUAJgAAJwYHCAkKCwwNDg8QEQAAAAAAAAASAAAGBwgJCgsMDQ4PEBEAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAB0AAAAAAB4fAAAAAAAAAAAAAAAAAAAdAAAAIiMeHwAAJCUAJt3kJwAAAAAAAAAAACIjAAAAACQlACYAACcGBwgJCgsMDQ4PEBEAAAAAAAAAEgAAAAYHCAkKCwwNDg8QEQAAAAAAAAASAAAAAAAAAAAAAAAAAAAdAAAAAAAeHwAAAAAAAADnAAAAAAAAAB0AACIjAB4fACQlACYAACfqAAAAAAAAAAAAIiMAAAAAJCUAJgAAJwYHCAkKCwwNDg8QEQAAAAAAAAASAABPBwgJCgsMDQ4PEBEAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAB0AAAAAAB4fAAAAAAAAAAAAAAAAAAAdAAAAIiMeHwAAJCUAJgAAJwAAAAAAAAAAACIjAAAAACQlACYAACcAAAAAAQNSU1tcXVZXVFVYWlkAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAgQHCAYJCgsAHyIlKSstLzEzNjk9QEVLX15pAGwAbwBKAAAAAAAAUgAbHB0ARmNxAABlAAwAR0hJYgBkAABfBQ8AAH5/gIF9AIKDhIWGh4gAAAAAAAAAAAAAAAAAAAAAAAAAAFBRAAAAAGgAawBuABEAAAAAAAAAHmFyewB8AA1gAABmZyAhJCMqAAAsLjAyNDU3ODo7PD4/QUJDRABNAE9qbXAQEhUWAAAAAAB6AAB5AAAATE4AAAAAAHgAdncAdQAAJgATFxgZAHRzAAAUAAAAGgAoJwACAwIBAgEBAQEBAQIDAQIEAwQGBwQEBgYGCAICAgMBAwMBAwMBBQkIAQMBAwEDAQMBAwEDAwEDAwEDAwMBAwMBAwMDAwECAgICAgEEAwQDAgIBAQEBAQEBAQEBAQEBAQMDAgICAgMDAwIEAwIEAwIEAQIGBgUFBQUEBAICAQEBAQEBAQEBAQEBJXMKAGNhc2UgADoAZGVmYXVsdDoAaWYoACl7AH0AfWVsc2UgAH1lbHNlewBzd2l0Y2goAHdoaWxlKABkb3sAfXdoaWxlKAApOwBmb3IobGV0IAAgaW4gACBvZiAAZm9yKABjb250aW51ZTsAYnJlYWs7AHJldHVybjsAcmV0dXJuIAA9SExYLmV4dGVuZCh0cnVlLFtdLAApAD0APwBbMF18fABbMF1dAFswXSYmAFswXXwAWzBdXgBbMF0mAFswXT09PQBbMF0hPT0AWzBdPABbMF0+AFswXTw8AFswXT4+AFswXT4+PgBbMF0rAFswXS0AWzBdKgBbMF0vAFswXSoqAFswXSUAW25ldyAASExYLnVwbHVzKABITFgudW1pbnVzKABITFgudW5vdCgASExYLnVibm90KABbMF1bAF0AWzBdKCkAWzBdKABbMF0uAEhMWC5hZGQoACxbMV0pAEhMWC5zdWIoAFt0cnVlXQBbZmFsc2VdAFtudWxsXQBbdW5kZWZpbmVkXQBbSW5maW5pdHldAFtOdW1iZXIuRVBTSUxPTl0AW05hTl0AWycAJ10AW2AAYF0AWy8AL10AW1sAXV0AW1tdXQBbZnVuY3Rpb24oKXt9XQAoACcAYABmdW5jdGlvbigAKXtyZXR1cm4gADt9AGZ1bmN0aW9uKCl7AGZ1bmN0aW9uKCl7cmV0dXJuIABITFguZXhwKABITFgubXVsKABITFguZGl2KABITFgubW9kKABITFgubHNoZnQoAEhMWC5yc2hmdCgASExYLnpyc2hmdCgASExYLmJhbmQoAEhMWC5ieG9yKABITFguYm9yKAAAZGVlZmZnZ2dnZ2doaGlpampra2trbGxsbGxtbW1tbm5ub29vcHBwcHFxcnJzc3R0dXV2dnZ3d3d4eHh4eXl5enp6enp7e3t7e3t8fHx8fHx8fX19fX19fX19fX19fX19fX19fX19fX5+fn5+fn5+fn9/gICAgICAgICBgYKCgoKCgoKCgoKCgv8FKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QFhBW3hzeW50YXggZXJyb3IARXJyb3I6IGRpc2NhcmRpbmcAAEFlSwBlAwQFBgcICQoLDA0OFicoKSssLS4vMDE8QkNLTFZXXF1fYmZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX6ABD8FPwY/e25Lbm5uSwNuS0tLbntebn8DYIFNZnt7e15/YIFufmdLT1AaGxwdHh8gISIjJCUmghlRGFIXUxQVVFUREhNWV1hZWlsPEF1fYT8EPwU/BktnS0tLZzk6TktebgNFA2BNXkVgY2Nvb3Bwcktuc3R1dnd3eHh5eXl6ent7e3tuYH8DBAUGZ2dnZyxubm5LbkVLbkVMS15gKm5LS05oS25oS25uTG5La0tnZ25oaEtuZ0tuS2dLTU1FcnJvcjogcG9wcGluZwBtZW1vcnkgZXhoYXVzdGVkAENsZWFudXA6IGRpc2NhcmRpbmcgbG9va2FoZWFkAENsZWFudXA6IHBvcHBpbmcARGVsZXRpbmcACiUqcwolKnMKAF4ALypASExYQ05UUkxFTkRAKi8KAEhMWD17ZXh0ZW5kOmZ1bmN0aW9uKCl7dmFyIGIsZCxnLGgsaixrLGw9YXJndW1lbnRzWzBdfHx7fSxwPTEscT1hcmd1bWVudHMubGVuZ3RoLHU9ITE7Zm9yKCdib29sZWFuJz09dHlwZW9mIGwmJih1PWwsbD1hcmd1bWVudHNbMV18fHt9LHA9MiksJ29iamVjdCc9PXR5cGVvZiBsfHxsJiYnW29iamVjdCBGdW5jdGlvbl0nPT09e30udG9TdHJpbmcuY2FsbChsKXx8KGw9e30pLHE9PT1wJiYobD10aGlzLC0tcCk7cDxxO3ArKylpZihudWxsIT0oYj1hcmd1bWVudHNbcF0pKWZvcihkIGluIGIpZz1sW2RdLGwhPT0oaD1iW2RdKSYmKHUmJmgmJignb2JqZWN0Jz09dHlwZW9mIGgmJmguY29uc3RydWN0b3I9PU9iamVjdHx8KGo9QXJyYXkuaXNBcnJheShoKSkpPyhqPyhqPSExLGs9ZyYmQXJyYXkuaXNBcnJheShnKT9nOltdKTprPWcmJidvYmplY3QnPT10eXBlb2YgZyYmZy5jb25zdHJ1Y3Rvcj09T2JqZWN0P2c6e30sbFtkXT1ITFguZXh0ZW5kKHUsayxoKSk6dm9pZCAwIT1oJiYobFtkXT1oKSk7cmV0dXJuIGx9LGlzRmxvYXQ6ZnVuY3Rpb24oYil7cmV0dXJuIGI9PT0rYiYmYiE9PSgwfGIpfSxpc0ludDpmdW5jdGlvbihiKXtyZXR1cm4gYj09PStiJiZiPT09KDB8Yil9LGFkZDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdKz1kWzBdLGJ9LHN1YjpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdLT1kWzBdLGJ9LG11bDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdKj1kWzBdLGJ9LGRpdjpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdLz1kWzBdLGJ9LG1vZDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdJT1kWzBdLGJ9LGV4cDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdKio9ZFswXSxifSxsc2hmdDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdPDw9ZFswXSxifSxyc2hmdDpmdW5jdGlvbihiLGQpe3JldHVybiBiWzBdPj49ZFswXSxifSx6cnNoZnQ6ZnVuY3Rpb24oYixkKXtyZXR1cm4gYlswXT4+Pj1kWzBdLGJ9LGJhbmQ6ZnVuY3Rpb24oYixkKXtyZXR1cm4gYlswXSY9ZFswXSxifSxieG9yOmZ1bmN0aW9uKGIsZCl7cmV0dXJuIGJbMF1ePWRbMF0sYn0sYm9yOmZ1bmN0aW9uKGIsZCl7cmV0dXJuIGJbMF18PWRbMF0sYn0sdXBsdXM6ZnVuY3Rpb24oYil7cmV0dXJuIGJbMF09K2JbMF0sYn0sdW1pbnVzOmZ1bmN0aW9uKGIpe3JldHVybiBiWzBdPS1iWzBdLGJ9LHVub3Q6ZnVuY3Rpb24oYil7cmV0dXJuIGJbMF09IWJbMF0sYn0sdWJub3Q6ZnVuY3Rpb24oYil7cmV0dXJuIGJbMF09fmJbMF0sYn19O3ZhciBqcz1bZnVuY3Rpb24oYil7aWYoQXJyYXkuaXNBcnJheShiKSYmMT09PWIubGVuZ3RoJiYoYj1iWzBdKSxudWxsIT09YiYmKCdvYmplY3QnPT10eXBlb2YgYnx8J2Z1bmN0aW9uJz09dHlwZW9mIGIpKWZvcih2YXIgZD1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiKSxnPTA7ZzxkLmxlbmd0aDtnKyspYltkW2ddXT1qc1swXShiW2RbZ11dKTtyZXR1cm4gYn1dLHByaW50PVtmdW5jdGlvbigpe2xldCBiPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5tYXAoZnVuY3Rpb24oZCl7cmV0dXJuIGpzWzBdKGQpfSk7cmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KG51bGwsYiksYn1dOwAlZgBbAF0sACVjAGxldCAAJXMALAA7AHRoaXMAdGhpcy4AaW5maW5pdHkAEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAETCQsLAAAJBgsAAAsABhEAAAAREREAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAADAAAAAAJDAAAAAAADAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAANAAAABA0AAAAACQ4AAAAAAA4AAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAASEhIAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAKAAAAAAoAAAAACQsAAAAAAAsAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAtKyAgIDBYMHgAKG51bGwpAC0wWCswWCAwWC0weCsweCAweABpbmYASU5GAG5hbgBOQU4AMDEyMzQ1Njc4OUFCQ0RFRi4AVCEiGQ0BAgMRSxwMEAQLHRIeJ2hub3BxYiAFBg8TFBUaCBYHKCQXGAkKDhsfJSODgn0mKis8PT4/Q0dKTVhZWltcXV5fYGFjZGVmZ2lqa2xyc3R5ent8AElsbGVnYWwgYnl0ZSBzZXF1ZW5jZQBEb21haW4gZXJyb3IAUmVzdWx0IG5vdCByZXByZXNlbnRhYmxlAE5vdCBhIHR0eQBQZXJtaXNzaW9uIGRlbmllZABPcGVyYXRpb24gbm90IHBlcm1pdHRlZABObyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5AE5vIHN1Y2ggcHJvY2VzcwBGaWxlIGV4aXN0cwBWYWx1ZSB0b28gbGFyZ2UgZm9yIGRhdGEgdHlwZQBObyBzcGFjZSBsZWZ0IG9uIGRldmljZQBPdXQgb2YgbWVtb3J5AFJlc291cmNlIGJ1c3kASW50ZXJydXB0ZWQgc3lzdGVtIGNhbGwAUmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUASW52YWxpZCBzZWVrAENyb3NzLWRldmljZSBsaW5rAFJlYWQtb25seSBmaWxlIHN5c3RlbQBEaXJlY3Rvcnkgbm90IGVtcHR5AENvbm5lY3Rpb24gcmVzZXQgYnkgcGVlcgBPcGVyYXRpb24gdGltZWQgb3V0AENvbm5lY3Rpb24gcmVmdXNlZABIb3N0IGlzIGRvd24ASG9zdCBpcyB1bnJlYWNoYWJsZQBBZGRyZXNzIGluIHVzZQBCcm9rZW4gcGlwZQBJL08gZXJyb3IATm8gc3VjaCBkZXZpY2Ugb3IgYWRkcmVzcwBCbG9jayBkZXZpY2UgcmVxdWlyZWQATm8gc3VjaCBkZXZpY2UATm90IGEgZGlyZWN0b3J5AElzIGEgZGlyZWN0b3J5AFRleHQgZmlsZSBidXN5AEV4ZWMgZm9ybWF0IGVycm9yAEludmFsaWQgYXJndW1lbnQAQXJndW1lbnQgbGlzdCB0b28gbG9uZwBTeW1ib2xpYyBsaW5rIGxvb3AARmlsZW5hbWUgdG9vIGxvbmcAVG9vIG1hbnkgb3BlbiBmaWxlcyBpbiBzeXN0ZW0ATm8gZmlsZSBkZXNjcmlwdG9ycyBhdmFpbGFibGUAQmFkIGZpbGUgZGVzY3JpcHRvcgBObyBjaGlsZCBwcm9jZXNzAEJhZCBhZGRyZXNzAEZpbGUgdG9vIGxhcmdlAFRvbyBtYW55IGxpbmtzAE5vIGxvY2tzIGF2YWlsYWJsZQBSZXNvdXJjZSBkZWFkbG9jayB3b3VsZCBvY2N1cgBTdGF0ZSBub3QgcmVjb3ZlcmFibGUAUHJldmlvdXMgb3duZXIgZGllZABPcGVyYXRpb24gY2FuY2VsZWQARnVuY3Rpb24gbm90IGltcGxlbWVudGVkAE5vIG1lc3NhZ2Ugb2YgZGVzaXJlZCB0eXBlAElkZW50aWZpZXIgcmVtb3ZlZABEZXZpY2Ugbm90IGEgc3RyZWFtAE5vIGRhdGEgYXZhaWxhYmxlAERldmljZSB0aW1lb3V0AE91dCBvZiBzdHJlYW1zIHJlc291cmNlcwBMaW5rIGhhcyBiZWVuIHNldmVyZWQAUHJvdG9jb2wgZXJyb3IAQmFkIG1lc3NhZ2UARmlsZSBkZXNjcmlwdG9yIGluIGJhZCBzdGF0ZQBOb3QgYSBzb2NrZXQARGVzdGluYXRpb24gYWRkcmVzcyByZXF1aXJlZABNZXNzYWdlIHRvbyBsYXJnZQBQcm90b2NvbCB3cm9uZyB0eXBlIGZvciBzb2NrZXQAUHJvdG9jb2wgbm90IGF2YWlsYWJsZQBQcm90b2NvbCBub3Qgc3VwcG9ydGVkAFNvY2tldCB0eXBlIG5vdCBzdXBwb3J0ZWQATm90IHN1cHBvcnRlZABQcm90b2NvbCBmYW1pbHkgbm90IHN1cHBvcnRlZABBZGRyZXNzIGZhbWlseSBub3Qgc3VwcG9ydGVkIGJ5IHByb3RvY29sAEFkZHJlc3Mgbm90IGF2YWlsYWJsZQBOZXR3b3JrIGlzIGRvd24ATmV0d29yayB1bnJlYWNoYWJsZQBDb25uZWN0aW9uIHJlc2V0IGJ5IG5ldHdvcmsAQ29ubmVjdGlvbiBhYm9ydGVkAE5vIGJ1ZmZlciBzcGFjZSBhdmFpbGFibGUAU29ja2V0IGlzIGNvbm5lY3RlZABTb2NrZXQgbm90IGNvbm5lY3RlZABDYW5ub3Qgc2VuZCBhZnRlciBzb2NrZXQgc2h1dGRvd24AT3BlcmF0aW9uIGFscmVhZHkgaW4gcHJvZ3Jlc3MAT3BlcmF0aW9uIGluIHByb2dyZXNzAFN0YWxlIGZpbGUgaGFuZGxlAFJlbW90ZSBJL08gZXJyb3IAUXVvdGEgZXhjZWVkZWQATm8gbWVkaXVtIGZvdW5kAFdyb25nIG1lZGl1bSB0eXBlAE5vIGVycm9yIGluZm9ybWF0aW9u";





/* no memory initializer */
var tempDoublePtr = STATICTOP; STATICTOP += 16;

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}

// {{PRE_LIBRARY}}


  function ___lock() {}

  
    

  
  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      else Module.printErr('failed to set errno from JS');
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function (stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              var isPosixPlatform = (process.platform != 'win32'); // Node doesn't offer a direct check, so test by exclusion
  
              var fd = process.stdin.fd;
              if (isPosixPlatform) {
                // Linux and Mac cannot use process.stdin.fd (which isn't set up as sync)
                var usingDevice = false;
                try {
                  fd = fs.openSync('/dev/stdin', 'r');
                  usingDevice = true;
                } catch (e) {}
              }
  
              try {
                bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (usingDevice) { fs.closeSync(fd); }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
  
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            Module['print'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            Module['printErr'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
        // If we are asked to expand the size of a file that already exists, revert to using a standard JS array to store the file
        // instead of a typed array. This makes resizing the array more flexible because we can just .push() elements at the back to
        // increase the size.
        if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
          node.contents = MEMFS.getFileDataAsRegularArray(node);
          node.usedBytes = node.contents.length; // We might be writing to a lazy-loaded file which had overridden this property, so force-reset it.
        }
  
        if (!node.contents || node.contents.subarray) { // Keep using a typed array if creating a new storage, or if old one was a typed array as well.
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
          // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
          // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
          // avoid overshooting the allocation cap by a very large margin.
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity); // Allocate new storage.
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
          return;
        }
        // Not using a typed array to back the file storage. Use a standard JS array instead.
        if (!node.contents && newCapacity > 0) node.contents = [];
        while (node.contents.length < newCapacity) node.contents.push(0);
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = function(e) {
              callback(this.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = function(event) {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries });
              }
  
              entries[cursor.primaryKey] = { timestamp: cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function(e) {
          done(this.error);
          e.preventDefault();
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        flags &= ~0x200000 /*O_PATH*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x800 /*O_NONBLOCK*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x8000 /*O_LARGEFILE*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x80000 /*O_CLOEXEC*/; // Some applications may pass it; it makes no sense for a single process.
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
          var buf = Buffer.from ? Buffer.from(buffer.buffer) : new Buffer(buffer.buffer);
          try {
            return fs.readSync(stream.nfd, buf, offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },write:function (stream, buffer, offset, length, position) {
          // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
          var buf = Buffer.from ? Buffer.from(buffer.buffer) : new Buffer(buffer.buffer);
          try {
            return fs.writeSync(stream.nfd, buf, offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          return position;
        }}};
  
  var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0);
        var createdParents = {};
        function ensureParent(path) {
          // return the parent node, creating subdirs as necessary
          var parts = path.split('/');
          var parent = root;
          for (var i = 0; i < parts.length-1; i++) {
            var curr = parts.slice(0, i+1).join('/');
            // Issue 4254: Using curr as a node name will prevent the node
            // from being found in FS.nameTable when FS.open is called on
            // a path which holds a child of this node,
            // given that all FS functions assume node names
            // are just their corresponding parts within their given path,
            // rather than incremental aggregates which include their parent's
            // directories.
            if (!createdParents[curr]) {
              createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
            }
            parent = createdParents[curr];
          }
          return parent;
        }
        function base(path) {
          var parts = path.split('/');
          return parts[parts.length-1];
        }
        // We also accept FileList here, by using Array.prototype
        Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
          WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function(obj) {
          WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function(pack) {
          pack['metadata'].files.forEach(function(file) {
            var name = file.filename.substr(1); // remove initial slash
            WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
          });
        });
        return root;
      },createNode:function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
        if (mode === WORKERFS.FILE_MODE) {
          node.size = contents.size;
          node.contents = contents;
        } else {
          node.size = 4096;
          node.contents = {};
        }
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },node_ops:{getattr:function (node) {
          return {
            dev: 1,
            ino: undefined,
            mode: node.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: undefined,
            size: node.size,
            atime: new Date(node.timestamp),
            mtime: new Date(node.timestamp),
            ctime: new Date(node.timestamp),
            blksize: 4096,
            blocks: Math.ceil(node.size / 4096),
          };
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
        },lookup:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        },mknod:function (parent, name, mode, dev) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rename:function (oldNode, newDir, newName) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },unlink:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rmdir:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readdir:function (node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newName, oldPath) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readlink:function (node) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          if (position >= stream.node.size) return 0;
          var chunk = stream.node.contents.slice(position, position + length);
          var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
          buffer.set(new Uint8Array(ab), offset);
          return chunk.size;
        },write:function (stream, buffer, offset, length, position) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.size;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        }}};
  
  var _stdin=STATICTOP; STATICTOP += 16;;
  
  var _stdout=STATICTOP; STATICTOP += 16;;
  
  var _stderr=STATICTOP; STATICTOP += 16;;var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); }
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); }
            }
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          console.log('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(err) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(err);
        }
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function (path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != ERRNO_CODES.EEXIST) throw e;
          }
        }
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function (stream) {
        return 0;
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto !== 'undefined') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else if (ENVIRONMENT_IS_NODE) {
          // for nodejs
          random_device = function() { return require('crypto')['randomBytes'](1)[0]; };
        } else {
          // default for ES5 platforms
          random_device = function() { return (Math.random()*256)|0; };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function () {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          //Module.printErr(stackTrace()); // useful for debugging
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          // Node.js compatibility: assigning on this.stack fails on Node 4 (but fixed on Node 8)
          if (this.stack) Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
          'WORKERFS': WORKERFS,
        };
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var SYSCALLS={DEFAULT_POLLMASK:5,mappings:{},umask:511,calculateAt:function (dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function (func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -ERRNO_CODES.ENOTDIR;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      },doMsync:function (addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
      },doMkdir:function (path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function (path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -ERRNO_CODES.EINVAL;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function (path, buf, bufsize) {
        if (bufsize <= 0) return -ERRNO_CODES.EINVAL;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function (path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -ERRNO_CODES.EINVAL;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -ERRNO_CODES.EACCES;
        }
        return 0;
      },doDup:function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:0,get:function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function () {
        var ret = Pointer_stringify(SYSCALLS.get());
        return ret;
      },getStreamFromFD:function () {
        var stream = FS.getStream(SYSCALLS.get());
        if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return stream;
      },getSocketFromFD:function () {
        var socket = SOCKFS.getSocket(SYSCALLS.get());
        if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return socket;
      },getSocketAddress:function (allowNull) {
        var addrp = SYSCALLS.get(), addrlen = SYSCALLS.get();
        if (allowNull && addrp === 0) return null;
        var info = __read_sockaddr(addrp, addrlen);
        if (info.errno) throw new FS.ErrnoError(info.errno);
        info.addr = DNS.lookup_addr(info.addr) || info.addr;
        return info;
      },get64:function () {
        var low = SYSCALLS.get(), high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      },getZero:function () {
        assert(SYSCALLS.get() === 0);
      }};function ___syscall140(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // llseek
      var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
      // NOTE: offset_high is unused - Emscripten's off_t is 32-bit
      var offset = offset_low;
      FS.llseek(stream, offset, whence);
      HEAP32[((result)>>2)]=stream.position;
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall145(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // readv
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doReadv(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall146(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // writev
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doWritev(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall54(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // ioctl
      var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)]=0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return -ERRNO_CODES.EINVAL; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall6(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // close
      var stream = SYSCALLS.getStreamFromFD();
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  
  
   
  
   
  
  var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_STATIC);   

  function ___unlock() {}

   

   

   

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }



   

  function _llvm_stackrestore(p) {
      var self = _llvm_stacksave;
      var ret = self.LLVM_SAVEDSTACKS[p];
      self.LLVM_SAVEDSTACKS.splice(p, 1);
      stackRestore(ret);
    }

  function _llvm_stacksave() {
      var self = _llvm_stacksave;
      if (!self.LLVM_SAVEDSTACKS) {
        self.LLVM_SAVEDSTACKS = [];
      }
      self.LLVM_SAVEDSTACKS.push(stackSave());
      return self.LLVM_SAVEDSTACKS.length-1;
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 

   

   

   
FS.staticInit();__ATINIT__.unshift(function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() });__ATMAIN__.push(function() { FS.ignorePermissions = false });__ATEXIT__.push(function() { FS.quit() });;
__ATINIT__.unshift(function() { TTY.init() });__ATEXIT__.push(function() { TTY.shutdown() });;
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); var NODEJS_PATH = require("path"); NODEFS.staticInit(); };
DYNAMICTOP_PTR = staticAlloc(4);

STACK_BASE = STACKTOP = alignMemory(STATICTOP);

STACK_MAX = STACK_BASE + TOTAL_STACK;

DYNAMIC_BASE = alignMemory(STACK_MAX);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;

staticSealed = true; // seal the static portion of memory

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

var ASSERTIONS = true;

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {String} input The string to decode.
 */
var decodeBase64 = typeof atob === 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE === 'boolean' && ENVIRONMENT_IS_NODE) {
    var buf;
    try {
      buf = Buffer.from(s, 'base64');
    } catch (_) {
      buf = new Buffer(s, 'base64');
    }
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}



function nullFunc_ii(x) { Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    Module["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    Module["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };

Module.asmLibraryArg = { "abort": abort, "assert": assert, "enlargeMemory": enlargeMemory, "getTotalMemory": getTotalMemory, "abortOnCannotGrowMemory": abortOnCannotGrowMemory, "abortStackOverflow": abortStackOverflow, "nullFunc_ii": nullFunc_ii, "nullFunc_iiii": nullFunc_iiii, "invoke_ii": invoke_ii, "invoke_iiii": invoke_iiii, "___lock": ___lock, "___setErrNo": ___setErrNo, "___syscall140": ___syscall140, "___syscall145": ___syscall145, "___syscall146": ___syscall146, "___syscall54": ___syscall54, "___syscall6": ___syscall6, "___unlock": ___unlock, "__exit": __exit, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_exit": _exit, "_llvm_stackrestore": _llvm_stackrestore, "_llvm_stacksave": _llvm_stacksave, "DYNAMICTOP_PTR": DYNAMICTOP_PTR, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "cttz_i8": cttz_i8 };
// EMSCRIPTEN_START_ASM
var asm = (/** @suppress {uselessCode} */ function(global, env, buffer) {
'almost asm';


  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);

  var DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var cttz_i8=env.cttz_i8|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntS = 0, tempValue = 0, tempDouble = 0.0;
  var tempRet0 = 0;

  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_max=global.Math.max;
  var Math_clz32=global.Math.clz32;
  var abort=env.abort;
  var assert=env.assert;
  var enlargeMemory=env.enlargeMemory;
  var getTotalMemory=env.getTotalMemory;
  var abortOnCannotGrowMemory=env.abortOnCannotGrowMemory;
  var abortStackOverflow=env.abortStackOverflow;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var invoke_ii=env.invoke_ii;
  var invoke_iiii=env.invoke_iiii;
  var ___lock=env.___lock;
  var ___setErrNo=env.___setErrNo;
  var ___syscall140=env.___syscall140;
  var ___syscall145=env.___syscall145;
  var ___syscall146=env.___syscall146;
  var ___syscall54=env.___syscall54;
  var ___syscall6=env.___syscall6;
  var ___unlock=env.___unlock;
  var __exit=env.__exit;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _exit=env._exit;
  var _llvm_stackrestore=env._llvm_stackrestore;
  var _llvm_stacksave=env._llvm_stacksave;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS

function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
  if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(size|0);

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function _yylex() {
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0;
 var $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0;
 var $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0;
 var $98 = 0, $99 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $8 = HEAP32[4320]|0;
 $9 = ($8|0)!=(0);
 if (!($9)) {
  HEAP32[4320] = 1;
  $10 = HEAP32[4321]|0;
  $11 = ($10|0)!=(0);
  if (!($11)) {
   HEAP32[4321] = 1;
  }
  $12 = HEAP32[4317]|0;
  $13 = ($12|0)!=(0|0);
  if (!($13)) {
   $14 = HEAP32[619]|0;
   HEAP32[4317] = $14;
  }
  $15 = HEAP32[4318]|0;
  $16 = ($15|0)!=(0|0);
  if (!($16)) {
   $17 = HEAP32[651]|0;
   HEAP32[4318] = $17;
  }
  $18 = HEAP32[4322]|0;
  $19 = ($18|0)!=(0|0);
  if ($19) {
   $20 = HEAP32[4322]|0;
   $21 = HEAP32[$20>>2]|0;
   $22 = ($21|0)!=(0|0);
   if (!($22)) {
    label = 10;
   }
  } else {
   label = 10;
  }
  if ((label|0) == 10) {
   _yyensure_buffer_stack();
   $23 = HEAP32[4317]|0;
   $24 = (_yy_create_buffer($23,16384)|0);
   $25 = HEAP32[4322]|0;
   HEAP32[$25>>2] = $24;
  }
  _yy_load_buffer_state();
 }
 L17: while(1) {
  $26 = HEAP32[4323]|0;
  $2 = $26;
  $27 = HEAP8[17920]|0;
  $28 = $2;
  HEAP8[$28>>0] = $27;
  $29 = $2;
  $3 = $29;
  $30 = HEAP32[4321]|0;
  $1 = $30;
  L19: while(1) {
   while(1) {
    $31 = $2;
    $32 = HEAP8[$31>>0]|0;
    $33 = $32&255;
    $34 = (8 + ($33<<2)|0);
    $35 = HEAP32[$34>>2]|0;
    $36 = $35&255;
    $5 = $36;
    $37 = $1;
    $38 = (3144 + ($37<<1)|0);
    $39 = HEAP16[$38>>1]|0;
    $40 = ($39<<16>>16)!=(0);
    if ($40) {
     $41 = $1;
     HEAP32[4324] = $41;
     $42 = $2;
     HEAP32[4325] = $42;
    }
    while(1) {
     $43 = $1;
     $44 = (4512 + ($43<<1)|0);
     $45 = HEAP16[$44>>1]|0;
     $46 = $45 << 16 >> 16;
     $47 = $5;
     $48 = $47&255;
     $49 = (($46) + ($48))|0;
     $50 = (3588 + ($49<<1)|0);
     $51 = HEAP16[$50>>1]|0;
     $52 = $51 << 16 >> 16;
     $53 = $1;
     $54 = ($52|0)!=($53|0);
     $55 = $1;
     if (!($54)) {
      break;
     }
     $56 = (4970 + ($55<<1)|0);
     $57 = HEAP16[$56>>1]|0;
     $58 = $57 << 16 >> 16;
     $1 = $58;
     $59 = $1;
     $60 = ($59|0)>=(222);
     if (!($60)) {
      continue;
     }
     $61 = $5;
     $62 = $61&255;
     $63 = (1032 + ($62<<2)|0);
     $64 = HEAP32[$63>>2]|0;
     $65 = $64&255;
     $5 = $65;
    }
    $66 = (4512 + ($55<<1)|0);
    $67 = HEAP16[$66>>1]|0;
    $68 = $67 << 16 >> 16;
    $69 = $5;
    $70 = $69&255;
    $71 = (($68) + ($70))|0;
    $72 = (5428 + ($71<<1)|0);
    $73 = HEAP16[$72>>1]|0;
    $74 = $73 << 16 >> 16;
    $1 = $74;
    $75 = $2;
    $76 = ((($75)) + 1|0);
    $2 = $76;
    $77 = $1;
    $78 = (4512 + ($77<<1)|0);
    $79 = HEAP16[$78>>1]|0;
    $80 = $79 << 16 >> 16;
    $81 = ($80|0)!=(389);
    if (!($81)) {
     break;
    }
   }
   L30: while(1) {
    $82 = $1;
    $83 = (3144 + ($82<<1)|0);
    $84 = HEAP16[$83>>1]|0;
    $85 = $84 << 16 >> 16;
    $4 = $85;
    $86 = $4;
    $87 = ($86|0)==(0);
    if ($87) {
     $88 = HEAP32[4325]|0;
     $2 = $88;
     $89 = HEAP32[4324]|0;
     $1 = $89;
     $90 = $1;
     $91 = (3144 + ($90<<1)|0);
     $92 = HEAP16[$91>>1]|0;
     $93 = $92 << 16 >> 16;
     $4 = $93;
    }
    $94 = $3;
    HEAP32[4326] = $94;
    $95 = $2;
    $96 = $3;
    $97 = $95;
    $98 = $96;
    $99 = (($97) - ($98))|0;
    HEAP32[4327] = $99;
    $100 = $2;
    $101 = HEAP8[$100>>0]|0;
    HEAP8[17920] = $101;
    $102 = $2;
    HEAP8[$102>>0] = 0;
    $103 = $2;
    HEAP32[4323] = $103;
    L35: while(1) {
     $104 = $4;
     switch ($104|0) {
     case 109:  {
      continue L17;
      break;
     }
     case 3:  {
      label = 27;
      break L17;
      break;
     }
     case 4:  {
      label = 28;
      break L17;
      break;
     }
     case 5:  {
      label = 29;
      break L17;
      break;
     }
     case 113:  {
      label = 31;
      break L17;
      break;
     }
     case 6:  {
      label = 32;
      break L17;
      break;
     }
     case 7:  {
      label = 33;
      break L17;
      break;
     }
     case 8:  {
      label = 34;
      break L17;
      break;
     }
     case 9:  {
      label = 35;
      break L17;
      break;
     }
     case 10:  {
      label = 36;
      break L17;
      break;
     }
     case 11:  {
      label = 37;
      break L17;
      break;
     }
     case 12:  {
      label = 38;
      break L17;
      break;
     }
     case 13:  {
      label = 39;
      break L17;
      break;
     }
     case 14:  {
      label = 40;
      break L17;
      break;
     }
     case 15:  {
      label = 41;
      break L17;
      break;
     }
     case 16:  {
      label = 42;
      break L17;
      break;
     }
     case 17:  {
      label = 43;
      break L17;
      break;
     }
     case 18:  {
      label = 44;
      break L17;
      break;
     }
     case 19:  {
      label = 45;
      break L17;
      break;
     }
     case 20:  {
      label = 46;
      break L17;
      break;
     }
     case 21:  {
      label = 47;
      break L17;
      break;
     }
     case 22:  {
      label = 48;
      break L17;
      break;
     }
     case 23:  {
      label = 49;
      break L17;
      break;
     }
     case 24:  {
      label = 50;
      break L17;
      break;
     }
     case 25:  {
      label = 51;
      break L17;
      break;
     }
     case 26:  {
      label = 52;
      break L17;
      break;
     }
     case 27:  {
      label = 53;
      break L17;
      break;
     }
     case 28:  {
      label = 54;
      break L17;
      break;
     }
     case 29:  {
      label = 55;
      break L17;
      break;
     }
     case 30:  {
      label = 56;
      break L17;
      break;
     }
     case 31:  {
      label = 57;
      break L17;
      break;
     }
     case 32:  {
      label = 58;
      break L17;
      break;
     }
     case 33:  {
      label = 59;
      break L17;
      break;
     }
     case 34:  {
      label = 60;
      break L17;
      break;
     }
     case 35:  {
      label = 61;
      break L17;
      break;
     }
     case 36:  {
      label = 62;
      break L17;
      break;
     }
     case 37:  {
      label = 63;
      break L17;
      break;
     }
     case 38:  {
      label = 64;
      break L17;
      break;
     }
     case 39:  {
      label = 65;
      break L17;
      break;
     }
     case 40:  {
      label = 66;
      break L17;
      break;
     }
     case 41:  {
      label = 67;
      break L17;
      break;
     }
     case 42:  {
      label = 68;
      break L17;
      break;
     }
     case 43:  {
      label = 69;
      break L17;
      break;
     }
     case 44:  {
      label = 70;
      break L17;
      break;
     }
     case 45:  {
      label = 71;
      break L17;
      break;
     }
     case 46:  {
      label = 72;
      break L17;
      break;
     }
     case 47:  {
      label = 73;
      break L17;
      break;
     }
     case 48:  {
      label = 74;
      break L17;
      break;
     }
     case 49:  {
      label = 75;
      break L17;
      break;
     }
     case 50:  {
      label = 76;
      break L17;
      break;
     }
     case 51:  {
      label = 77;
      break L17;
      break;
     }
     case 52:  {
      label = 78;
      break L17;
      break;
     }
     case 53:  {
      label = 79;
      break L17;
      break;
     }
     case 54:  {
      label = 80;
      break L17;
      break;
     }
     case 55:  {
      label = 81;
      break L17;
      break;
     }
     case 56:  {
      label = 82;
      break L17;
      break;
     }
     case 57:  {
      label = 83;
      break L17;
      break;
     }
     case 58:  {
      label = 84;
      break L17;
      break;
     }
     case 59:  {
      label = 85;
      break L17;
      break;
     }
     case 60:  {
      label = 86;
      break L17;
      break;
     }
     case 61:  {
      label = 87;
      break L17;
      break;
     }
     case 62:  {
      label = 88;
      break L17;
      break;
     }
     case 63:  {
      label = 89;
      break L17;
      break;
     }
     case 64:  {
      label = 90;
      break L17;
      break;
     }
     case 65:  {
      label = 91;
      break L17;
      break;
     }
     case 66:  {
      label = 92;
      break L17;
      break;
     }
     case 67:  {
      label = 93;
      break L17;
      break;
     }
     case 68:  {
      label = 94;
      break L17;
      break;
     }
     case 69:  {
      label = 95;
      break L17;
      break;
     }
     case 70:  {
      label = 96;
      break L17;
      break;
     }
     case 71:  {
      label = 97;
      break L17;
      break;
     }
     case 72:  {
      label = 98;
      break L17;
      break;
     }
     case 73:  {
      label = 99;
      break L17;
      break;
     }
     case 74:  {
      label = 100;
      break L17;
      break;
     }
     case 75:  {
      label = 101;
      break L17;
      break;
     }
     case 76:  {
      label = 102;
      break L17;
      break;
     }
     case 77:  {
      label = 103;
      break L17;
      break;
     }
     case 78:  {
      label = 104;
      break L17;
      break;
     }
     case 80:  {
      label = 106;
      break L17;
      break;
     }
     case 81:  {
      label = 107;
      break L17;
      break;
     }
     case 82:  {
      label = 108;
      break L17;
      break;
     }
     case 83:  {
      label = 109;
      break L17;
      break;
     }
     case 84:  {
      label = 110;
      break L17;
      break;
     }
     case 85:  {
      label = 111;
      break L17;
      break;
     }
     case 86:  {
      label = 112;
      break L17;
      break;
     }
     case 87:  {
      label = 113;
      break L17;
      break;
     }
     case 88:  {
      label = 114;
      break L17;
      break;
     }
     case 89:  {
      label = 115;
      break L17;
      break;
     }
     case 90:  {
      label = 116;
      break L17;
      break;
     }
     case 91:  {
      label = 117;
      break L17;
      break;
     }
     case 92:  {
      label = 118;
      break L17;
      break;
     }
     case 93:  {
      label = 119;
      break L17;
      break;
     }
     case 94:  {
      label = 120;
      break L17;
      break;
     }
     case 95:  {
      label = 121;
      break L17;
      break;
     }
     case 96:  {
      label = 122;
      break L17;
      break;
     }
     case 97:  {
      label = 123;
      break L17;
      break;
     }
     case 98:  {
      label = 124;
      break L17;
      break;
     }
     case 99:  {
      label = 125;
      break L17;
      break;
     }
     case 100:  {
      label = 126;
      break L17;
      break;
     }
     case 101:  {
      label = 127;
      break L17;
      break;
     }
     case 102:  {
      label = 128;
      break L17;
      break;
     }
     case 103:  {
      label = 129;
      break L17;
      break;
     }
     case 104:  {
      label = 130;
      break L17;
      break;
     }
     case 105:  {
      label = 131;
      break L17;
      break;
     }
     case 106:  {
      label = 132;
      break L17;
      break;
     }
     case 107:  {
      label = 133;
      break L17;
      break;
     }
     case 1:  {
      label = 25;
      break L19;
      break;
     }
     case 2:  {
      label = 26;
      break L19;
      break;
     }
     case 112:  {
      label = 30;
      break L19;
      break;
     }
     case 79:  {
      label = 105;
      break L19;
      break;
     }
     case 108:  {
      label = 134;
      break L19;
      break;
     }
     case 110:  {
      label = 135;
      break L19;
      break;
     }
     case 0:  {
      label = 24;
      break L35;
      break;
     }
     case 111:  {
      break;
     }
     default: {
      label = 149;
      break L19;
     }
     }
     $112 = $2;
     $113 = HEAP32[4326]|0;
     $114 = $112;
     $115 = $113;
     $116 = (($114) - ($115))|0;
     $117 = (($116) - 1)|0;
     $6 = $117;
     $118 = HEAP8[17920]|0;
     $119 = $2;
     HEAP8[$119>>0] = $118;
     $120 = HEAP32[4322]|0;
     $121 = HEAP32[$120>>2]|0;
     $122 = ((($121)) + 44|0);
     $123 = HEAP32[$122>>2]|0;
     $124 = ($123|0)==(0);
     if ($124) {
      $125 = HEAP32[4322]|0;
      $126 = HEAP32[$125>>2]|0;
      $127 = ((($126)) + 16|0);
      $128 = HEAP32[$127>>2]|0;
      HEAP32[4328] = $128;
      $129 = HEAP32[4317]|0;
      $130 = HEAP32[4322]|0;
      $131 = HEAP32[$130>>2]|0;
      HEAP32[$131>>2] = $129;
      $132 = HEAP32[4322]|0;
      $133 = HEAP32[$132>>2]|0;
      $134 = ((($133)) + 44|0);
      HEAP32[$134>>2] = 1;
     }
     $135 = HEAP32[4323]|0;
     $136 = HEAP32[4322]|0;
     $137 = HEAP32[$136>>2]|0;
     $138 = ((($137)) + 4|0);
     $139 = HEAP32[$138>>2]|0;
     $140 = HEAP32[4328]|0;
     $141 = (($139) + ($140)|0);
     $142 = ($135>>>0)<=($141>>>0);
     if ($142) {
      label = 139;
      break;
     }
     $155 = (_yy_get_next_buffer()|0);
     switch ($155|0) {
     case 0:  {
      label = 147;
      break L30;
      break;
     }
     case 2:  {
      label = 148;
      break L35;
      break;
     }
     case 1:  {
      break;
     }
     default: {
      continue L17;
     }
     }
     $156 = (_yywrap()|0);
     $157 = ($156|0)!=(0);
     if (!($157)) {
      label = 145;
      break L19;
     }
     $158 = HEAP32[4326]|0;
     HEAP32[4323] = $158;
     $159 = HEAP32[4321]|0;
     $160 = (($159) - 1)|0;
     $161 = (($160|0) / 2)&-1;
     $162 = (111 + ($161))|0;
     $163 = (($162) + 1)|0;
     $4 = $163;
    }
    if ((label|0) == 24) {
     label = 0;
     $105 = HEAP8[17920]|0;
     $106 = $2;
     HEAP8[$106>>0] = $105;
     $107 = HEAP32[4325]|0;
     $2 = $107;
     $108 = HEAP32[4324]|0;
     $1 = $108;
     continue;
    }
    else if ((label|0) == 139) {
     label = 0;
     $143 = HEAP32[4326]|0;
     $144 = $6;
     $145 = (($143) + ($144)|0);
     HEAP32[4323] = $145;
     $146 = (_yy_get_previous_state()|0);
     $1 = $146;
     $147 = $1;
     $148 = (_yy_try_NUL_trans($147)|0);
     $7 = $148;
     $149 = HEAP32[4326]|0;
     $3 = $149;
     $150 = $7;
     $151 = ($150|0)!=(0);
     $152 = HEAP32[4323]|0;
     if ($151) {
      label = 140;
      break;
     }
     $2 = $152;
     continue;
    }
    else if ((label|0) == 148) {
     label = 0;
     $172 = HEAP32[4322]|0;
     $173 = HEAP32[$172>>2]|0;
     $174 = ((($173)) + 4|0);
     $175 = HEAP32[$174>>2]|0;
     $176 = HEAP32[4328]|0;
     $177 = (($175) + ($176)|0);
     HEAP32[4323] = $177;
     $178 = (_yy_get_previous_state()|0);
     $1 = $178;
     $179 = HEAP32[4323]|0;
     $2 = $179;
     $180 = HEAP32[4326]|0;
     $3 = $180;
     continue;
    }
   }
   if ((label|0) == 140) {
    label = 0;
    $153 = ((($152)) + 1|0);
    HEAP32[4323] = $153;
    $2 = $153;
    $154 = $7;
    $1 = $154;
    continue;
   }
   else if ((label|0) == 147) {
    label = 0;
    $166 = HEAP32[4326]|0;
    $167 = $6;
    $168 = (($166) + ($167)|0);
    HEAP32[4323] = $168;
    $169 = (_yy_get_previous_state()|0);
    $1 = $169;
    $170 = HEAP32[4323]|0;
    $2 = $170;
    $171 = HEAP32[4326]|0;
    $3 = $171;
    continue;
   }
  }
  if ((label|0) == 25) {
   label = 0;
   _comment();
   continue;
  }
  else if ((label|0) == 26) {
   label = 0;
   _line_comment();
   continue;
  }
  else if ((label|0) == 30) {
   label = 0;
   _end_file();
   HEAP32[4321] = 3;
   continue;
  }
  else if ((label|0) == 105) {
   label = 0;
   _count_tabs();
   continue;
  }
  else if ((label|0) == 134) {
   label = 0;
   _count();
   continue;
  }
  else if ((label|0) == 135) {
   label = 0;
   $109 = HEAP32[4326]|0;
   $110 = HEAP32[4327]|0;
   $111 = HEAP32[4318]|0;
   (_fwrite($109,$110,1,$111)|0);
   continue;
  }
  else if ((label|0) == 145) {
   label = 0;
   $164 = (0)!=(0);
   if ($164) {
    continue;
   }
   $165 = HEAP32[4317]|0;
   _yyrestart($165);
   continue;
  }
  else if ((label|0) == 149) {
   label = 0;
   _yy_fatal_error(9604);
   continue;
  }
 }
 switch (label|0) {
  case 27: {
   _count();
   $0 = 9;
   break;
  }
  case 28: {
   _count();
   $0 = 8;
   break;
  }
  case 29: {
   _count();
   $0 = 320;
   break;
  }
  case 31: {
   $0 = 0;
   break;
  }
  case 32: {
   _count();
   $0 = 303;
   break;
  }
  case 33: {
   _count();
   $0 = 294;
   break;
  }
  case 34: {
   _count();
   $0 = 306;
   break;
  }
  case 35: {
   _count();
   $0 = 302;
   break;
  }
  case 36: {
   _count();
   $0 = 309;
   break;
  }
  case 37: {
   _count();
   $0 = 295;
   break;
  }
  case 38: {
   _count();
   $0 = 310;
   break;
  }
  case 39: {
   _count();
   $0 = 300;
   break;
  }
  case 40: {
   _count();
   $0 = 297;
   break;
  }
  case 41: {
   _count();
   $0 = 301;
   break;
  }
  case 42: {
   _count();
   $0 = 307;
   break;
  }
  case 43: {
   _count();
   $0 = 296;
   break;
  }
  case 44: {
   _count();
   $0 = 311;
   break;
  }
  case 45: {
   _count();
   $0 = 312;
   break;
  }
  case 46: {
   _count();
   $0 = 314;
   break;
  }
  case 47: {
   _count();
   $0 = 315;
   break;
  }
  case 48: {
   _count();
   $0 = 313;
   break;
  }
  case 49: {
   _count();
   $0 = 304;
   break;
  }
  case 50: {
   _count();
   $0 = 298;
   break;
  }
  case 51: {
   _count();
   $0 = 308;
   break;
  }
  case 52: {
   _count();
   $0 = 305;
   break;
  }
  case 53: {
   _count();
   $0 = 316;
   break;
  }
  case 54: {
   _count();
   $0 = 299;
   break;
  }
  case 55: {
   _count();
   $0 = 263;
   break;
  }
  case 56: {
   _count();
   $0 = 264;
   break;
  }
  case 57: {
   _count();
   $0 = 265;
   break;
  }
  case 58: {
   _count();
   $0 = 266;
   break;
  }
  case 59: {
   _count();
   $0 = 267;
   break;
  }
  case 60: {
   _count();
   $0 = 269;
   break;
  }
  case 61: {
   _count();
   $0 = 268;
   break;
  }
  case 62: {
   _count();
   _setyylval(0);
   $0 = 258;
   break;
  }
  case 63: {
   _count();
   _setyylval(0);
   $0 = 259;
   break;
  }
  case 64: {
   _count();
   _setyylval(0);
   $0 = 259;
   break;
  }
  case 65: {
   _count();
   _setyylval(0);
   $0 = 259;
   break;
  }
  case 66: {
   _count();
   _setyylval(1);
   $0 = 260;
   break;
  }
  case 67: {
   _count();
   _setyylval(1);
   $0 = 261;
   break;
  }
  case 68: {
   _count();
   _setyylval(1);
   $0 = 262;
   break;
  }
  case 69: {
   _count();
   $0 = 324;
   break;
  }
  case 70: {
   _count();
   $0 = 325;
   break;
  }
  case 71: {
   _count();
   $0 = 326;
   break;
  }
  case 72: {
   _count();
   $0 = 327;
   break;
  }
  case 73: {
   _count();
   $0 = 329;
   break;
  }
  case 74: {
   _count();
   $0 = 329;
   break;
  }
  case 75: {
   _count();
   $0 = 329;
   break;
  }
  case 76: {
   _count();
   $0 = 328;
   break;
  }
  case 77: {
   _count();
   $0 = 319;
   break;
  }
  case 78: {
   _count();
   $0 = 318;
   break;
  }
  case 79: {
   _count();
   $0 = 317;
   break;
  }
  case 80: {
   _count();
   $0 = 290;
   break;
  }
  case 81: {
   _count();
   $0 = 289;
   break;
  }
  case 82: {
   _count();
   $0 = 288;
   break;
  }
  case 83: {
   _count();
   $0 = 284;
   break;
  }
  case 84: {
   _count();
   $0 = 287;
   break;
  }
  case 85: {
   _count();
   $0 = 281;
   break;
  }
  case 86: {
   _count();
   $0 = 282;
   break;
  }
  case 87: {
   _count();
   $0 = 283;
   break;
  }
  case 88: {
   _count();
   $0 = 291;
   break;
  }
  case 89: {
   _count();
   $0 = 285;
   break;
  }
  case 90: {
   _count();
   $0 = 292;
   break;
  }
  case 91: {
   _count();
   $0 = 293;
   break;
  }
  case 92: {
   _count();
   $0 = 286;
   break;
  }
  case 93: {
   _count();
   $0 = 274;
   break;
  }
  case 94: {
   _count();
   $0 = 273;
   break;
  }
  case 95: {
   _count();
   $0 = 272;
   break;
  }
  case 96: {
   _count();
   $0 = 270;
   break;
  }
  case 97: {
   _count();
   $0 = 271;
   break;
  }
  case 98: {
   _count();
   $0 = 279;
   break;
  }
  case 99: {
   _count();
   $0 = 280;
   break;
  }
  case 100: {
   _count();
   $0 = 275;
   break;
  }
  case 101: {
   _count();
   $0 = 276;
   break;
  }
  case 102: {
   _count();
   $0 = 59;
   break;
  }
  case 103: {
   _count();
   $0 = 123;
   break;
  }
  case 104: {
   _count();
   $0 = 125;
   break;
  }
  case 106: {
   _count();
   $0 = 44;
   break;
  }
  case 107: {
   _count();
   $0 = 58;
   break;
  }
  case 108: {
   _count();
   $0 = 61;
   break;
  }
  case 109: {
   _count();
   $0 = 322;
   break;
  }
  case 110: {
   _count();
   $0 = 40;
   break;
  }
  case 111: {
   _count();
   $0 = 41;
   break;
  }
  case 112: {
   _count();
   $0 = 321;
   break;
  }
  case 113: {
   _count();
   $0 = 91;
   break;
  }
  case 114: {
   _count();
   $0 = 93;
   break;
  }
  case 115: {
   _count();
   $0 = 46;
   break;
  }
  case 116: {
   _count();
   $0 = 38;
   break;
  }
  case 117: {
   _count();
   $0 = 33;
   break;
  }
  case 118: {
   _count();
   $0 = 126;
   break;
  }
  case 119: {
   _count();
   $0 = 277;
   break;
  }
  case 120: {
   _count();
   $0 = 45;
   break;
  }
  case 121: {
   _count();
   $0 = 43;
   break;
  }
  case 122: {
   _count();
   $0 = 42;
   break;
  }
  case 123: {
   _count();
   $0 = 47;
   break;
  }
  case 124: {
   _count();
   $0 = 37;
   break;
  }
  case 125: {
   _count();
   $0 = 60;
   break;
  }
  case 126: {
   _count();
   $0 = 62;
   break;
  }
  case 127: {
   _count();
   $0 = 94;
   break;
  }
  case 128: {
   _count();
   $0 = 278;
   break;
  }
  case 129: {
   _count();
   $0 = 124;
   break;
  }
  case 130: {
   _count();
   $0 = 63;
   break;
  }
  case 131: {
   _count();
   $0 = 64;
   break;
  }
  case 132: {
   _count();
   $0 = 323;
   break;
  }
  case 133: {
   _count();
   $0 = 35;
   break;
  }
 }
 $181 = $0;
 STACKTOP = sp;return ($181|0);
}
function _yyensure_buffer_stack() {
 var $$sink = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = HEAP32[4322]|0;
 $3 = ($2|0)!=(0|0);
 if ($3) {
  $13 = HEAP32[4331]|0;
  $14 = (($13) - 1)|0;
  $15 = (0)>=($14>>>0);
  if (!($15)) {
   STACKTOP = sp;return;
  }
  $1 = 8;
  $16 = HEAP32[4331]|0;
  $17 = $1;
  $18 = (($16) + ($17))|0;
  $0 = $18;
  $19 = HEAP32[4322]|0;
  $20 = $0;
  $21 = $20<<2;
  $22 = (_yyrealloc($19,$21)|0);
  HEAP32[4322] = $22;
  $23 = HEAP32[4322]|0;
  $24 = ($23|0)!=(0|0);
  if (!($24)) {
   _yy_fatal_error(9874);
  }
  $25 = HEAP32[4322]|0;
  $26 = HEAP32[4331]|0;
  $27 = (($25) + ($26<<2)|0);
  $28 = $1;
  $29 = $28<<2;
  _memset(($27|0),0,($29|0))|0;
  $30 = $0;
  $$sink = $30;
 } else {
  $0 = 1;
  $4 = $0;
  $5 = $4<<2;
  $6 = (_yyalloc($5)|0);
  HEAP32[4322] = $6;
  $7 = HEAP32[4322]|0;
  $8 = ($7|0)!=(0|0);
  if (!($8)) {
   _yy_fatal_error(9874);
  }
  $9 = HEAP32[4322]|0;
  $10 = $0;
  $11 = $10<<2;
  _memset(($9|0),0,($11|0))|0;
  $12 = $0;
  $$sink = $12;
 }
 HEAP32[4331] = $$sink;
 STACKTOP = sp;return;
}
function _yy_create_buffer($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $5 = (_yyalloc(48)|0);
 $4 = $5;
 $6 = $4;
 $7 = ($6|0)!=(0|0);
 if (!($7)) {
  _yy_fatal_error(9655);
 }
 $8 = $3;
 $9 = $4;
 $10 = ((($9)) + 12|0);
 HEAP32[$10>>2] = $8;
 $11 = $4;
 $12 = ((($11)) + 12|0);
 $13 = HEAP32[$12>>2]|0;
 $14 = (($13) + 2)|0;
 $15 = (_yyalloc($14)|0);
 $16 = $4;
 $17 = ((($16)) + 4|0);
 HEAP32[$17>>2] = $15;
 $18 = $4;
 $19 = ((($18)) + 4|0);
 $20 = HEAP32[$19>>2]|0;
 $21 = ($20|0)!=(0|0);
 if (!($21)) {
  _yy_fatal_error(9655);
 }
 $22 = $4;
 $23 = ((($22)) + 20|0);
 HEAP32[$23>>2] = 1;
 $24 = $4;
 $25 = $2;
 _yy_init_buffer($24,$25);
 $26 = $4;
 STACKTOP = sp;return ($26|0);
}
function _yy_load_buffer_state() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[4322]|0;
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($1)) + 16|0);
 $3 = HEAP32[$2>>2]|0;
 HEAP32[4328] = $3;
 $4 = HEAP32[4322]|0;
 $5 = HEAP32[$4>>2]|0;
 $6 = ((($5)) + 8|0);
 $7 = HEAP32[$6>>2]|0;
 HEAP32[4323] = $7;
 HEAP32[4326] = $7;
 $8 = HEAP32[4322]|0;
 $9 = HEAP32[$8>>2]|0;
 $10 = HEAP32[$9>>2]|0;
 HEAP32[4317] = $10;
 $11 = HEAP32[4323]|0;
 $12 = HEAP8[$11>>0]|0;
 HEAP8[17920] = $12;
 return;
}
function _yy_get_previous_state() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $3 = HEAP32[4321]|0;
 $0 = $3;
 $4 = HEAP32[4326]|0;
 $1 = $4;
 while(1) {
  $5 = $1;
  $6 = HEAP32[4323]|0;
  $7 = ($5>>>0)<($6>>>0);
  if (!($7)) {
   break;
  }
  $8 = $1;
  $9 = HEAP8[$8>>0]|0;
  $10 = $9 << 24 >> 24;
  $11 = ($10|0)!=(0);
  if ($11) {
   $12 = $1;
   $13 = HEAP8[$12>>0]|0;
   $14 = $13&255;
   $15 = (8 + ($14<<2)|0);
   $16 = HEAP32[$15>>2]|0;
   $18 = $16;
  } else {
   $18 = 1;
  }
  $17 = $18&255;
  $2 = $17;
  $19 = $0;
  $20 = (3144 + ($19<<1)|0);
  $21 = HEAP16[$20>>1]|0;
  $22 = ($21<<16>>16)!=(0);
  if ($22) {
   $23 = $0;
   HEAP32[4324] = $23;
   $24 = $1;
   HEAP32[4325] = $24;
  }
  while(1) {
   $25 = $0;
   $26 = (4512 + ($25<<1)|0);
   $27 = HEAP16[$26>>1]|0;
   $28 = $27 << 16 >> 16;
   $29 = $2;
   $30 = $29&255;
   $31 = (($28) + ($30))|0;
   $32 = (3588 + ($31<<1)|0);
   $33 = HEAP16[$32>>1]|0;
   $34 = $33 << 16 >> 16;
   $35 = $0;
   $36 = ($34|0)!=($35|0);
   $37 = $0;
   if (!($36)) {
    break;
   }
   $38 = (4970 + ($37<<1)|0);
   $39 = HEAP16[$38>>1]|0;
   $40 = $39 << 16 >> 16;
   $0 = $40;
   $41 = $0;
   $42 = ($41|0)>=(222);
   if (!($42)) {
    continue;
   }
   $43 = $2;
   $44 = $43&255;
   $45 = (1032 + ($44<<2)|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = $46&255;
   $2 = $47;
  }
  $48 = (4512 + ($37<<1)|0);
  $49 = HEAP16[$48>>1]|0;
  $50 = $49 << 16 >> 16;
  $51 = $2;
  $52 = $51&255;
  $53 = (($50) + ($52))|0;
  $54 = (5428 + ($53<<1)|0);
  $55 = HEAP16[$54>>1]|0;
  $56 = $55 << 16 >> 16;
  $0 = $56;
  $57 = $1;
  $58 = ((($57)) + 1|0);
  $1 = $58;
 }
 $59 = $0;
 STACKTOP = sp;return ($59|0);
}
function _yy_try_NUL_trans($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $5 = HEAP32[4323]|0;
 $3 = $5;
 $4 = 1;
 $6 = $1;
 $7 = (3144 + ($6<<1)|0);
 $8 = HEAP16[$7>>1]|0;
 $9 = ($8<<16>>16)!=(0);
 if ($9) {
  $10 = $1;
  HEAP32[4324] = $10;
  $11 = $3;
  HEAP32[4325] = $11;
 }
 while(1) {
  $12 = $1;
  $13 = (4512 + ($12<<1)|0);
  $14 = HEAP16[$13>>1]|0;
  $15 = $14 << 16 >> 16;
  $16 = $4;
  $17 = $16&255;
  $18 = (($15) + ($17))|0;
  $19 = (3588 + ($18<<1)|0);
  $20 = HEAP16[$19>>1]|0;
  $21 = $20 << 16 >> 16;
  $22 = $1;
  $23 = ($21|0)!=($22|0);
  $24 = $1;
  if (!($23)) {
   break;
  }
  $25 = (4970 + ($24<<1)|0);
  $26 = HEAP16[$25>>1]|0;
  $27 = $26 << 16 >> 16;
  $1 = $27;
  $28 = $1;
  $29 = ($28|0)>=(222);
  if (!($29)) {
   continue;
  }
  $30 = $4;
  $31 = $30&255;
  $32 = (1032 + ($31<<2)|0);
  $33 = HEAP32[$32>>2]|0;
  $34 = $33&255;
  $4 = $34;
 }
 $35 = (4512 + ($24<<1)|0);
 $36 = HEAP16[$35>>1]|0;
 $37 = $36 << 16 >> 16;
 $38 = $4;
 $39 = $38&255;
 $40 = (($37) + ($39))|0;
 $41 = (5428 + ($40<<1)|0);
 $42 = HEAP16[$41>>1]|0;
 $43 = $42 << 16 >> 16;
 $1 = $43;
 $44 = $1;
 $45 = ($44|0)==(221);
 $46 = $45&1;
 $2 = $46;
 $47 = $2;
 $48 = ($47|0)!=(0);
 $49 = $1;
 $50 = $48 ? 0 : $49;
 STACKTOP = sp;return ($50|0);
}
function _yy_get_next_buffer() {
 var $$sink = 0, $$sink5 = 0, $$sink7 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0;
 var $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0;
 var $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0;
 var $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0;
 var $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0;
 var $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0;
 var $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0;
 var $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0;
 var $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0;
 var $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0;
 var $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0;
 var $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $13 = HEAP32[4322]|0;
 $14 = HEAP32[$13>>2]|0;
 $15 = ((($14)) + 4|0);
 $16 = HEAP32[$15>>2]|0;
 $1 = $16;
 $17 = HEAP32[4326]|0;
 $2 = $17;
 $18 = HEAP32[4323]|0;
 $19 = HEAP32[4322]|0;
 $20 = HEAP32[$19>>2]|0;
 $21 = ((($20)) + 4|0);
 $22 = HEAP32[$21>>2]|0;
 $23 = HEAP32[4328]|0;
 $24 = (($23) + 1)|0;
 $25 = (($22) + ($24)|0);
 $26 = ($18>>>0)>($25>>>0);
 if ($26) {
  _yy_fatal_error(9699);
 }
 $27 = HEAP32[4322]|0;
 $28 = HEAP32[$27>>2]|0;
 $29 = ((($28)) + 40|0);
 $30 = HEAP32[$29>>2]|0;
 $31 = ($30|0)==(0);
 $32 = HEAP32[4323]|0;
 $33 = HEAP32[4326]|0;
 $34 = $32;
 $35 = $33;
 $36 = (($34) - ($35))|0;
 if ($31) {
  $37 = (($36) - 0)|0;
  $38 = ($37|0)==(1);
  if ($38) {
   $0 = 1;
   $246 = $0;
   STACKTOP = sp;return ($246|0);
  } else {
   $0 = 2;
   $246 = $0;
   STACKTOP = sp;return ($246|0);
  }
 }
 $39 = (($36) - 1)|0;
 $3 = $39;
 $4 = 0;
 while(1) {
  $40 = $4;
  $41 = $3;
  $42 = ($40|0)<($41|0);
  if (!($42)) {
   break;
  }
  $43 = $2;
  $44 = ((($43)) + 1|0);
  $2 = $44;
  $45 = HEAP8[$43>>0]|0;
  $46 = $1;
  $47 = ((($46)) + 1|0);
  $1 = $47;
  HEAP8[$46>>0] = $45;
  $48 = $4;
  $49 = (($48) + 1)|0;
  $4 = $49;
 }
 $50 = HEAP32[4322]|0;
 $51 = HEAP32[$50>>2]|0;
 $52 = ((($51)) + 44|0);
 $53 = HEAP32[$52>>2]|0;
 $54 = ($53|0)==(2);
 if ($54) {
  HEAP32[4328] = 0;
  $$sink = 0;
 } else {
  $55 = HEAP32[4322]|0;
  $56 = HEAP32[$55>>2]|0;
  $57 = ((($56)) + 12|0);
  $58 = HEAP32[$57>>2]|0;
  $59 = $3;
  $60 = (($58) - ($59))|0;
  $61 = (($60) - 1)|0;
  $6 = $61;
  while(1) {
   $62 = $6;
   $63 = ($62>>>0)<=(0);
   if (!($63)) {
    break;
   }
   $64 = HEAP32[4322]|0;
   $65 = ($64|0)!=(0|0);
   if ($65) {
    $66 = HEAP32[4322]|0;
    $67 = HEAP32[$66>>2]|0;
    $68 = $67;
   } else {
    $68 = 0;
   }
   $7 = $68;
   $69 = HEAP32[4323]|0;
   $70 = $7;
   $71 = ((($70)) + 4|0);
   $72 = HEAP32[$71>>2]|0;
   $73 = $69;
   $74 = $72;
   $75 = (($73) - ($74))|0;
   $8 = $75;
   $76 = $7;
   $77 = ((($76)) + 20|0);
   $78 = HEAP32[$77>>2]|0;
   $79 = ($78|0)!=(0);
   $80 = $7;
   if ($79) {
    $81 = ((($80)) + 12|0);
    $82 = HEAP32[$81>>2]|0;
    $83 = $82<<1;
    $9 = $83;
    $84 = $9;
    $85 = ($84>>>0)<=(0);
    $86 = $7;
    $87 = ((($86)) + 12|0);
    $88 = HEAP32[$87>>2]|0;
    if ($85) {
     $89 = (($88>>>0) / 8)&-1;
     $90 = $7;
     $91 = ((($90)) + 12|0);
     $92 = HEAP32[$91>>2]|0;
     $93 = (($92) + ($89))|0;
     HEAP32[$91>>2] = $93;
    } else {
     $94 = $88<<1;
     HEAP32[$87>>2] = $94;
    }
    $95 = $7;
    $96 = ((($95)) + 4|0);
    $97 = HEAP32[$96>>2]|0;
    $98 = $7;
    $99 = ((($98)) + 12|0);
    $100 = HEAP32[$99>>2]|0;
    $101 = (($100) + 2)|0;
    $102 = (_yyrealloc($97,$101)|0);
    $103 = $7;
    $$sink5 = $102;$$sink7 = $103;
   } else {
    $$sink5 = 0;$$sink7 = $80;
   }
   $104 = ((($$sink7)) + 4|0);
   HEAP32[$104>>2] = $$sink5;
   $105 = $7;
   $106 = ((($105)) + 4|0);
   $107 = HEAP32[$106>>2]|0;
   $108 = ($107|0)!=(0|0);
   if (!($108)) {
    _yy_fatal_error(9755);
   }
   $109 = $7;
   $110 = ((($109)) + 4|0);
   $111 = HEAP32[$110>>2]|0;
   $112 = $8;
   $113 = (($111) + ($112)|0);
   HEAP32[4323] = $113;
   $114 = HEAP32[4322]|0;
   $115 = HEAP32[$114>>2]|0;
   $116 = ((($115)) + 12|0);
   $117 = HEAP32[$116>>2]|0;
   $118 = $3;
   $119 = (($117) - ($118))|0;
   $120 = (($119) - 1)|0;
   $6 = $120;
  }
  $121 = $6;
  $122 = ($121>>>0)>(8192);
  if ($122) {
   $6 = 8192;
  }
  $123 = HEAP32[4322]|0;
  $124 = HEAP32[$123>>2]|0;
  $125 = ((($124)) + 24|0);
  $126 = HEAP32[$125>>2]|0;
  $127 = ($126|0)!=(0);
  L39: do {
   if ($127) {
    $10 = 42;
    $11 = 0;
    while(1) {
     $128 = $11;
     $129 = $6;
     $130 = ($128>>>0)<($129>>>0);
     if ($130) {
      $131 = HEAP32[4317]|0;
      $132 = (_getc($131)|0);
      $10 = $132;
      $133 = ($132|0)!=(-1);
      if ($133) {
       $134 = $10;
       $135 = ($134|0)!=(10);
       $247 = $135;
      } else {
       $247 = 0;
      }
     } else {
      $247 = 0;
     }
     $136 = $10;
     if (!($247)) {
      break;
     }
     $137 = $136&255;
     $138 = HEAP32[4322]|0;
     $139 = HEAP32[$138>>2]|0;
     $140 = ((($139)) + 4|0);
     $141 = HEAP32[$140>>2]|0;
     $142 = $3;
     $143 = (($141) + ($142)|0);
     $144 = $11;
     $145 = (($143) + ($144)|0);
     HEAP8[$145>>0] = $137;
     $146 = $11;
     $147 = (($146) + 1)|0;
     $11 = $147;
    }
    $148 = ($136|0)==(10);
    if ($148) {
     $149 = $10;
     $150 = $149&255;
     $151 = HEAP32[4322]|0;
     $152 = HEAP32[$151>>2]|0;
     $153 = ((($152)) + 4|0);
     $154 = HEAP32[$153>>2]|0;
     $155 = $3;
     $156 = (($154) + ($155)|0);
     $157 = $11;
     $158 = (($157) + 1)|0;
     $11 = $158;
     $159 = (($156) + ($157)|0);
     HEAP8[$159>>0] = $150;
    }
    $160 = $10;
    $161 = ($160|0)==(-1);
    if ($161) {
     $162 = HEAP32[4317]|0;
     $163 = (_ferror($162)|0);
     $164 = ($163|0)!=(0);
     if ($164) {
      _yy_fatal_error(9799);
     }
    }
    $165 = $11;
    HEAP32[4328] = $165;
   } else {
    $166 = (___errno_location()|0);
    HEAP32[$166>>2] = 0;
    while(1) {
     $167 = HEAP32[4322]|0;
     $168 = HEAP32[$167>>2]|0;
     $169 = ((($168)) + 4|0);
     $170 = HEAP32[$169>>2]|0;
     $171 = $3;
     $172 = (($170) + ($171)|0);
     $173 = $6;
     $174 = HEAP32[4317]|0;
     $175 = (_fread($172,1,$173,$174)|0);
     HEAP32[4328] = $175;
     $176 = ($175|0)==(0);
     if (!($176)) {
      break L39;
     }
     $177 = HEAP32[4317]|0;
     $178 = (_ferror($177)|0);
     $179 = ($178|0)!=(0);
     if (!($179)) {
      break L39;
     }
     $180 = (___errno_location()|0);
     $181 = HEAP32[$180>>2]|0;
     $182 = ($181|0)!=(4);
     if ($182) {
      break;
     }
     $183 = (___errno_location()|0);
     HEAP32[$183>>2] = 0;
     $184 = HEAP32[4317]|0;
     _clearerr($184);
    }
    _yy_fatal_error(9799);
   }
  } while(0);
  $185 = HEAP32[4328]|0;
  $$sink = $185;
 }
 $186 = HEAP32[4322]|0;
 $187 = HEAP32[$186>>2]|0;
 $188 = ((($187)) + 16|0);
 HEAP32[$188>>2] = $$sink;
 $189 = HEAP32[4328]|0;
 $190 = ($189|0)==(0);
 do {
  if ($190) {
   $191 = $3;
   $192 = ($191|0)==(0);
   if ($192) {
    $5 = 1;
    $193 = HEAP32[4317]|0;
    _yyrestart($193);
    break;
   } else {
    $5 = 2;
    $194 = HEAP32[4322]|0;
    $195 = HEAP32[$194>>2]|0;
    $196 = ((($195)) + 44|0);
    HEAP32[$196>>2] = 2;
    break;
   }
  } else {
   $5 = 0;
  }
 } while(0);
 $197 = HEAP32[4328]|0;
 $198 = $3;
 $199 = (($197) + ($198))|0;
 $200 = HEAP32[4322]|0;
 $201 = HEAP32[$200>>2]|0;
 $202 = ((($201)) + 12|0);
 $203 = HEAP32[$202>>2]|0;
 $204 = ($199>>>0)>($203>>>0);
 if ($204) {
  $205 = HEAP32[4328]|0;
  $206 = $3;
  $207 = (($205) + ($206))|0;
  $208 = HEAP32[4328]|0;
  $209 = $208 >>> 1;
  $210 = (($207) + ($209))|0;
  $12 = $210;
  $211 = HEAP32[4322]|0;
  $212 = HEAP32[$211>>2]|0;
  $213 = ((($212)) + 4|0);
  $214 = HEAP32[$213>>2]|0;
  $215 = $12;
  $216 = (_yyrealloc($214,$215)|0);
  $217 = HEAP32[4322]|0;
  $218 = HEAP32[$217>>2]|0;
  $219 = ((($218)) + 4|0);
  HEAP32[$219>>2] = $216;
  $220 = HEAP32[4322]|0;
  $221 = HEAP32[$220>>2]|0;
  $222 = ((($221)) + 4|0);
  $223 = HEAP32[$222>>2]|0;
  $224 = ($223|0)!=(0|0);
  if (!($224)) {
   _yy_fatal_error(9828);
  }
 }
 $225 = $3;
 $226 = HEAP32[4328]|0;
 $227 = (($226) + ($225))|0;
 HEAP32[4328] = $227;
 $228 = HEAP32[4322]|0;
 $229 = HEAP32[$228>>2]|0;
 $230 = ((($229)) + 4|0);
 $231 = HEAP32[$230>>2]|0;
 $232 = HEAP32[4328]|0;
 $233 = (($231) + ($232)|0);
 HEAP8[$233>>0] = 0;
 $234 = HEAP32[4322]|0;
 $235 = HEAP32[$234>>2]|0;
 $236 = ((($235)) + 4|0);
 $237 = HEAP32[$236>>2]|0;
 $238 = HEAP32[4328]|0;
 $239 = (($238) + 1)|0;
 $240 = (($237) + ($239)|0);
 HEAP8[$240>>0] = 0;
 $241 = HEAP32[4322]|0;
 $242 = HEAP32[$241>>2]|0;
 $243 = ((($242)) + 4|0);
 $244 = HEAP32[$243>>2]|0;
 HEAP32[4326] = $244;
 $245 = $5;
 $0 = $245;
 $246 = $0;
 STACKTOP = sp;return ($246|0);
}
function _yywrap() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 1;
}
function _yyrestart($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $2 = HEAP32[4322]|0;
 $3 = ($2|0)!=(0|0);
 if ($3) {
  $4 = HEAP32[4322]|0;
  $5 = HEAP32[$4>>2]|0;
  $6 = ($5|0)!=(0|0);
  if (!($6)) {
   label = 3;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  _yyensure_buffer_stack();
  $7 = HEAP32[4317]|0;
  $8 = (_yy_create_buffer($7,16384)|0);
  $9 = HEAP32[4322]|0;
  HEAP32[$9>>2] = $8;
 }
 $10 = HEAP32[4322]|0;
 $11 = ($10|0)!=(0|0);
 if ($11) {
  $12 = HEAP32[4322]|0;
  $13 = HEAP32[$12>>2]|0;
  $15 = $13;
 } else {
  $15 = 0;
 }
 $14 = $1;
 _yy_init_buffer($15,$14);
 _yy_load_buffer_state();
 STACKTOP = sp;return;
}
function _yy_fatal_error($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer = sp;
 $1 = $0;
 $2 = HEAP32[587]|0;
 $3 = $1;
 HEAP32[$vararg_buffer>>2] = $3;
 (_fprintf($2,12017,$vararg_buffer)|0);
 _exit(2);
 // unreachable;
}
function _yy_init_buffer($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $5 = (___errno_location()|0);
 $6 = HEAP32[$5>>2]|0;
 $4 = $6;
 $7 = $2;
 _yy_flush_buffer($7);
 $8 = $3;
 $9 = $2;
 HEAP32[$9>>2] = $8;
 $10 = $2;
 $11 = ((($10)) + 40|0);
 HEAP32[$11>>2] = 1;
 $12 = $2;
 $13 = HEAP32[4322]|0;
 $14 = ($13|0)!=(0|0);
 if ($14) {
  $15 = HEAP32[4322]|0;
  $16 = HEAP32[$15>>2]|0;
  $18 = $16;
 } else {
  $18 = 0;
 }
 $17 = ($12|0)!=($18|0);
 if ($17) {
  $19 = $2;
  $20 = ((($19)) + 32|0);
  HEAP32[$20>>2] = 1;
  $21 = $2;
  $22 = ((($21)) + 36|0);
  HEAP32[$22>>2] = 0;
 }
 $23 = $3;
 $24 = ($23|0)!=(0|0);
 if ($24) {
  $25 = $3;
  $26 = (_fileno($25)|0);
  $27 = (_isatty($26)|0);
  $28 = ($27|0)>(0);
  $29 = $28&1;
  $32 = $29;
 } else {
  $32 = 0;
 }
 $30 = $2;
 $31 = ((($30)) + 24|0);
 HEAP32[$31>>2] = $32;
 $33 = $4;
 $34 = (___errno_location()|0);
 HEAP32[$34>>2] = $33;
 STACKTOP = sp;return;
}
function _yyalloc($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $2 = $1;
 $3 = (_malloc($2)|0);
 STACKTOP = sp;return ($3|0);
}
function _yy_flush_buffer($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $2 = $1;
 $3 = ($2|0)!=(0|0);
 if (!($3)) {
  STACKTOP = sp;return;
 }
 $4 = $1;
 $5 = ((($4)) + 16|0);
 HEAP32[$5>>2] = 0;
 $6 = $1;
 $7 = ((($6)) + 4|0);
 $8 = HEAP32[$7>>2]|0;
 HEAP8[$8>>0] = 0;
 $9 = $1;
 $10 = ((($9)) + 4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = ((($11)) + 1|0);
 HEAP8[$12>>0] = 0;
 $13 = $1;
 $14 = ((($13)) + 4|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = $1;
 $17 = ((($16)) + 8|0);
 HEAP32[$17>>2] = $15;
 $18 = $1;
 $19 = ((($18)) + 28|0);
 HEAP32[$19>>2] = 1;
 $20 = $1;
 $21 = ((($20)) + 44|0);
 HEAP32[$21>>2] = 0;
 $22 = $1;
 $23 = HEAP32[4322]|0;
 $24 = ($23|0)!=(0|0);
 if ($24) {
  $25 = HEAP32[4322]|0;
  $26 = HEAP32[$25>>2]|0;
  $28 = $26;
 } else {
  $28 = 0;
 }
 $27 = ($22|0)==($28|0);
 if (!($27)) {
  STACKTOP = sp;return;
 }
 _yy_load_buffer_state();
 STACKTOP = sp;return;
}
function _yyrealloc($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $4 = $2;
 $5 = $3;
 $6 = (_realloc($4,$5)|0);
 STACKTOP = sp;return ($6|0);
}
function _comment() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 while(1) {
  while(1) {
   $2 = (_input()|0);
   $3 = $2&255;
   $0 = $3;
   $4 = $3 << 24 >> 24;
   $5 = ($4|0)!=(42);
   if (!($5)) {
    break;
   }
   $6 = $0;
   $7 = $6 << 24 >> 24;
   $8 = ($7|0)!=(0);
   if (!($8)) {
    break;
   }
  }
  $9 = (_input()|0);
  $10 = $9&255;
  $1 = $10;
  $11 = $10 << 24 >> 24;
  $12 = ($11|0)!=(47);
  if (!($12)) {
   label = 8;
   break;
  }
  $13 = $0;
  $14 = $13 << 24 >> 24;
  $15 = ($14|0)!=(0);
  if (!($15)) {
   label = 8;
   break;
  }
  $16 = $1;
  $17 = $16 << 24 >> 24;
  $18 = HEAP32[4326]|0;
  _yyunput($17,$18);
 }
 if ((label|0) == 8) {
  STACKTOP = sp;return;
 }
}
function _input() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $3 = HEAP8[17920]|0;
 $4 = HEAP32[4323]|0;
 HEAP8[$4>>0] = $3;
 $5 = HEAP32[4323]|0;
 $6 = HEAP8[$5>>0]|0;
 $7 = $6 << 24 >> 24;
 $8 = ($7|0)==(0);
 L1: do {
  if ($8) {
   $9 = HEAP32[4323]|0;
   $10 = HEAP32[4322]|0;
   $11 = HEAP32[$10>>2]|0;
   $12 = ((($11)) + 4|0);
   $13 = HEAP32[$12>>2]|0;
   $14 = HEAP32[4328]|0;
   $15 = (($13) + ($14)|0);
   $16 = ($9>>>0)<($15>>>0);
   $17 = HEAP32[4323]|0;
   if ($16) {
    HEAP8[$17>>0] = 0;
    break;
   }
   $18 = HEAP32[4326]|0;
   $19 = $17;
   $20 = $18;
   $21 = (($19) - ($20))|0;
   $2 = $21;
   $22 = HEAP32[4323]|0;
   $23 = ((($22)) + 1|0);
   HEAP32[4323] = $23;
   $24 = (_yy_get_next_buffer()|0);
   switch ($24|0) {
   case 2:  {
    $25 = HEAP32[4317]|0;
    _yyrestart($25);
    break;
   }
   case 1:  {
    break;
   }
   case 0:  {
    $31 = HEAP32[4326]|0;
    $32 = $2;
    $33 = (($31) + ($32)|0);
    HEAP32[4323] = $33;
    break L1;
    break;
   }
   default: {
    break L1;
   }
   }
   $26 = (_yywrap()|0);
   $27 = ($26|0)!=(0);
   if ($27) {
    $0 = 0;
    $42 = $0;
    STACKTOP = sp;return ($42|0);
   }
   $28 = (0)!=(0);
   if (!($28)) {
    $29 = HEAP32[4317]|0;
    _yyrestart($29);
   }
   $30 = (_input()|0);
   $0 = $30;
   $42 = $0;
   STACKTOP = sp;return ($42|0);
  }
 } while(0);
 $34 = HEAP32[4323]|0;
 $35 = HEAP8[$34>>0]|0;
 $36 = $35&255;
 $1 = $36;
 $37 = HEAP32[4323]|0;
 HEAP8[$37>>0] = 0;
 $38 = HEAP32[4323]|0;
 $39 = ((($38)) + 1|0);
 HEAP32[4323] = $39;
 $40 = HEAP8[$39>>0]|0;
 HEAP8[17920] = $40;
 $41 = $1;
 $0 = $41;
 $42 = $0;
 STACKTOP = sp;return ($42|0);
}
function _yyunput($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $2 = $0;
 $3 = $1;
 $8 = HEAP32[4323]|0;
 $4 = $8;
 $9 = HEAP8[17920]|0;
 $10 = $4;
 HEAP8[$10>>0] = $9;
 $11 = $4;
 $12 = HEAP32[4322]|0;
 $13 = HEAP32[$12>>2]|0;
 $14 = ((($13)) + 4|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = ((($15)) + 2|0);
 $17 = ($11>>>0)<($16>>>0);
 if ($17) {
  $18 = HEAP32[4328]|0;
  $19 = (($18) + 2)|0;
  $5 = $19;
  $20 = HEAP32[4322]|0;
  $21 = HEAP32[$20>>2]|0;
  $22 = ((($21)) + 4|0);
  $23 = HEAP32[$22>>2]|0;
  $24 = HEAP32[4322]|0;
  $25 = HEAP32[$24>>2]|0;
  $26 = ((($25)) + 12|0);
  $27 = HEAP32[$26>>2]|0;
  $28 = (($27) + 2)|0;
  $29 = (($23) + ($28)|0);
  $6 = $29;
  $30 = HEAP32[4322]|0;
  $31 = HEAP32[$30>>2]|0;
  $32 = ((($31)) + 4|0);
  $33 = HEAP32[$32>>2]|0;
  $34 = $5;
  $35 = (($33) + ($34)|0);
  $7 = $35;
  while(1) {
   $36 = $7;
   $37 = HEAP32[4322]|0;
   $38 = HEAP32[$37>>2]|0;
   $39 = ((($38)) + 4|0);
   $40 = HEAP32[$39>>2]|0;
   $41 = ($36>>>0)>($40>>>0);
   if (!($41)) {
    break;
   }
   $42 = $7;
   $43 = ((($42)) + -1|0);
   $7 = $43;
   $44 = HEAP8[$43>>0]|0;
   $45 = $6;
   $46 = ((($45)) + -1|0);
   $6 = $46;
   HEAP8[$46>>0] = $44;
  }
  $47 = $6;
  $48 = $7;
  $49 = $47;
  $50 = $48;
  $51 = (($49) - ($50))|0;
  $52 = $4;
  $53 = (($52) + ($51)|0);
  $4 = $53;
  $54 = $6;
  $55 = $7;
  $56 = $54;
  $57 = $55;
  $58 = (($56) - ($57))|0;
  $59 = $3;
  $60 = (($59) + ($58)|0);
  $3 = $60;
  $61 = HEAP32[4322]|0;
  $62 = HEAP32[$61>>2]|0;
  $63 = ((($62)) + 12|0);
  $64 = HEAP32[$63>>2]|0;
  HEAP32[4328] = $64;
  $65 = HEAP32[4322]|0;
  $66 = HEAP32[$65>>2]|0;
  $67 = ((($66)) + 16|0);
  HEAP32[$67>>2] = $64;
  $68 = $4;
  $69 = HEAP32[4322]|0;
  $70 = HEAP32[$69>>2]|0;
  $71 = ((($70)) + 4|0);
  $72 = HEAP32[$71>>2]|0;
  $73 = ((($72)) + 2|0);
  $74 = ($68>>>0)<($73>>>0);
  if ($74) {
   _yy_fatal_error(9923);
  }
 }
 $75 = $2;
 $76 = $75&255;
 $77 = $4;
 $78 = ((($77)) + -1|0);
 $4 = $78;
 HEAP8[$78>>0] = $76;
 $79 = $3;
 HEAP32[4326] = $79;
 $80 = $4;
 $81 = HEAP8[$80>>0]|0;
 HEAP8[17920] = $81;
 $82 = $4;
 HEAP32[4323] = $82;
 STACKTOP = sp;return;
}
function _line_comment() {
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 while(1) {
  $0 = (_input()|0);
  $1 = ($0|0)!=(10);
  if (!($1)) {
   break;
  }
 }
 $2 = HEAP32[4326]|0;
 _yyunput(10,$2);
 return;
}
function _count_tabs() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $0 = 0;
 while(1) {
  $3 = (_input()|0);
  $4 = $3&255;
  $2 = $4;
  $5 = $4 << 24 >> 24;
  $6 = ($5|0)==(9);
  if (!($6)) {
   break;
  }
  $7 = $0;
  $8 = (($7) + 1)|0;
  $0 = $8;
 }
 $9 = $2;
 $10 = $9 << 24 >> 24;
 $11 = HEAP32[4326]|0;
 _yyunput($10,$11);
 $12 = $0;
 $13 = HEAP32[4319]|0;
 $14 = (($12) - ($13))|0;
 $1 = $14;
 while(1) {
  $15 = $1;
  $16 = (($15) + 1)|0;
  $1 = $16;
  $17 = ($15|0)<(0);
  if (!($17)) {
   break;
  }
  $18 = HEAP32[4326]|0;
  _yyunput(44,$18);
  $19 = HEAP32[4326]|0;
  _yyunput(8,$19);
 }
 while(1) {
  $20 = $1;
  $21 = (($20) + -1)|0;
  $1 = $21;
  $22 = ($21|0)>(0);
  $23 = HEAP32[4326]|0;
  if (!($22)) {
   break;
  }
  _yyunput(9,$23);
 }
 _yyunput(44,$23);
 $24 = $0;
 HEAP32[4319] = $24;
 STACKTOP = sp;return;
}
function _setyylval($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $3 = $1;
 $4 = ($3|0)!=(0);
 if ($4) {
  $5 = HEAP32[4326]|0;
  $6 = (_strlen($5)|0);
  $2 = $6;
  $7 = HEAP32[4326]|0;
  $8 = HEAP32[4326]|0;
  $9 = ((($8)) + 1|0);
  $10 = $2;
  $11 = (($10) - 2)|0;
  _memmove(($7|0),($9|0),($11|0))|0;
  $12 = HEAP32[4326]|0;
  $13 = $2;
  $14 = (($13) - 2)|0;
  $15 = (($12) + ($14)|0);
  HEAP8[$15>>0] = 0;
 }
 $16 = HEAP32[4326]|0;
 $17 = (___strdup($16)|0);
 HEAP32[4334] = $17;
 STACKTOP = sp;return;
}
function _end_file() {
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[4326]|0;
 _yyunput(44,$0);
 while(1) {
  $1 = HEAP32[4319]|0;
  $2 = ($1|0)>(0);
  $3 = HEAP32[4326]|0;
  if (!($2)) {
   break;
  }
  _yyunput(8,$3);
  $4 = HEAP32[4319]|0;
  $5 = (($4) + -1)|0;
  HEAP32[4319] = $5;
 }
 _yyunput(44,$3);
 return;
}
function _count() {
 var $$sink$sink = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $0 = 0;
 while(1) {
  $1 = HEAP32[4326]|0;
  $2 = $0;
  $3 = (($1) + ($2)|0);
  $4 = HEAP8[$3>>0]|0;
  $5 = $4 << 24 >> 24;
  $6 = ($5|0)!=(0);
  if (!($6)) {
   break;
  }
  $7 = HEAP32[4326]|0;
  $8 = $0;
  $9 = (($7) + ($8)|0);
  $10 = HEAP8[$9>>0]|0;
  $11 = $10 << 24 >> 24;
  $12 = ($11|0)==(10);
  do {
   if ($12) {
    $$sink$sink = 0;
   } else {
    $13 = HEAP32[4326]|0;
    $14 = $0;
    $15 = (($13) + ($14)|0);
    $16 = HEAP8[$15>>0]|0;
    $17 = $16 << 24 >> 24;
    $18 = ($17|0)==(9);
    $19 = HEAP32[4329]|0;
    if ($18) {
     $20 = (($19|0) % 8)&-1;
     $21 = (8 - ($20))|0;
     $22 = HEAP32[4329]|0;
     $23 = (($22) + ($21))|0;
     $$sink$sink = $23;
     break;
    } else {
     $24 = (($19) + 1)|0;
     $$sink$sink = $24;
     break;
    }
   }
  } while(0);
  HEAP32[4329] = $$sink$sink;
  $25 = $0;
  $26 = (($25) + 1)|0;
  $0 = $26;
 }
 STACKTOP = sp;return;
}
function _yyparse() {
 var $$ = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0;
 var $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0;
 var $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0;
 var $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0;
 var $1069 = 0, $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0, $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0;
 var $1087 = 0, $1088 = 0, $1089 = 0, $109 = 0, $1090 = 0, $1091 = 0, $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0;
 var $1104 = 0, $1105 = 0, $1106 = 0, $1107 = 0, $1108 = 0, $1109 = 0, $111 = 0, $1110 = 0, $1111 = 0, $1112 = 0, $1113 = 0, $1114 = 0, $1115 = 0, $1116 = 0, $1117 = 0, $1118 = 0, $1119 = 0, $112 = 0, $1120 = 0, $1121 = 0;
 var $1122 = 0, $1123 = 0, $1124 = 0, $1125 = 0, $1126 = 0, $1127 = 0, $1128 = 0, $1129 = 0, $113 = 0, $1130 = 0, $1131 = 0, $1132 = 0, $1133 = 0, $1134 = 0, $1135 = 0, $1136 = 0, $1137 = 0, $1138 = 0, $1139 = 0, $114 = 0;
 var $1140 = 0, $1141 = 0, $1142 = 0, $1143 = 0, $1144 = 0, $1145 = 0, $1146 = 0, $1147 = 0, $1148 = 0, $1149 = 0, $115 = 0, $1150 = 0, $1151 = 0, $1152 = 0, $1153 = 0, $1154 = 0, $1155 = 0, $1156 = 0, $1157 = 0, $1158 = 0;
 var $1159 = 0, $116 = 0, $1160 = 0, $1161 = 0, $1162 = 0, $1163 = 0, $1164 = 0, $1165 = 0, $1166 = 0, $1167 = 0, $1168 = 0, $1169 = 0, $117 = 0, $1170 = 0, $1171 = 0, $1172 = 0, $1173 = 0, $1174 = 0, $1175 = 0, $1176 = 0;
 var $1177 = 0, $1178 = 0, $1179 = 0, $118 = 0, $1180 = 0, $1181 = 0, $1182 = 0, $1183 = 0, $1184 = 0, $1185 = 0, $1186 = 0, $1187 = 0, $1188 = 0, $1189 = 0, $119 = 0, $1190 = 0, $1191 = 0, $1192 = 0, $1193 = 0, $1194 = 0;
 var $1195 = 0, $1196 = 0, $1197 = 0, $1198 = 0, $1199 = 0, $12 = 0, $120 = 0, $1200 = 0, $1201 = 0, $1202 = 0, $1203 = 0, $1204 = 0, $1205 = 0, $1206 = 0, $1207 = 0, $1208 = 0, $1209 = 0, $121 = 0, $1210 = 0, $1211 = 0;
 var $1212 = 0, $1213 = 0, $1214 = 0, $1215 = 0, $1216 = 0, $1217 = 0, $1218 = 0, $1219 = 0, $122 = 0, $1220 = 0, $1221 = 0, $1222 = 0, $1223 = 0, $1224 = 0, $1225 = 0, $1226 = 0, $1227 = 0, $1228 = 0, $1229 = 0, $123 = 0;
 var $1230 = 0, $1231 = 0, $1232 = 0, $1233 = 0, $1234 = 0, $1235 = 0, $1236 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0;
 var $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0;
 var $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0;
 var $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0;
 var $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0;
 var $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0;
 var $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0;
 var $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0;
 var $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0;
 var $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0;
 var $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0;
 var $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0;
 var $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0;
 var $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0;
 var $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0;
 var $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0;
 var $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0;
 var $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0;
 var $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0;
 var $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0;
 var $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0;
 var $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0;
 var $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0;
 var $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0;
 var $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0;
 var $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0;
 var $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0;
 var $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0;
 var $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0;
 var $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0;
 var $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0;
 var $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0;
 var $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0;
 var $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0;
 var $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0;
 var $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0;
 var $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0;
 var $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0;
 var $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0;
 var $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0;
 var $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0;
 var $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0;
 var $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0;
 var $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0;
 var $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0;
 var $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0;
 var $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0;
 var $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0;
 var $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $or$cond = 0, $or$cond3 = 0;
 var $or$cond5 = 0, $or$cond7 = 0, $or$cond9 = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 2112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(2112|0);
 $vararg_buffer = sp;
 $5 = sp + 1704|0;
 $8 = sp + 72|0;
 $12 = sp + 48|0;
 $4 = 0;
 $6 = $5;
 $9 = $8;
 $11 = 200;
 $13 = 0;
 $0 = 0;
 $3 = 0;
 HEAP32[4332] = 0;
 HEAP32[4333] = -2;
 $23 = $6;
 $7 = $23;
 $24 = $9;
 $10 = $24;
 L1: while(1) {
  $27 = $0;
  $28 = $27&65535;
  $29 = $7;
  HEAP16[$29>>1] = $28;
  $30 = $6;
  $31 = $11;
  $32 = (($30) + ($31<<1)|0);
  $33 = ((($32)) + -2|0);
  $34 = $7;
  $35 = ($33>>>0)<=($34>>>0);
  if ($35) {
   $36 = $7;
   $37 = $6;
   $38 = $36;
   $39 = $37;
   $40 = (($38) - ($39))|0;
   $41 = (($40|0) / 2)&-1;
   $42 = (($41) + 1)|0;
   $14 = $42;
   $43 = $11;
   $44 = (10000)<=($43>>>0);
   if ($44) {
    label = 159;
    break;
   }
   $45 = $11;
   $46 = $45<<1;
   $11 = $46;
   $47 = $11;
   $48 = (10000)<($47>>>0);
   $$ = $48 ? 10000 : $46;
   $11 = $$;
   $49 = $6;
   $15 = $49;
   $50 = $11;
   $51 = ($50*10)|0;
   $52 = (($51) + 7)|0;
   $53 = (_malloc($52)|0);
   $16 = $53;
   $54 = $16;
   $55 = ($54|0)!=(0|0);
   if (!($55)) {
    label = 159;
    break;
   }
   $56 = $16;
   $57 = $6;
   $58 = $14;
   $59 = $58<<1;
   _memcpy(($56|0),($57|0),($59|0))|0;
   $60 = $16;
   $6 = $60;
   $61 = $11;
   $62 = $61<<1;
   $63 = (($62) + 7)|0;
   $17 = $63;
   $64 = $17;
   $65 = (($64>>>0) / 8)&-1;
   $66 = $16;
   $67 = (($66) + ($65<<3)|0);
   $16 = $67;
   $68 = $16;
   $69 = $9;
   $70 = $14;
   $71 = $70<<3;
   _memcpy(($68|0),($69|0),($71|0))|0;
   $72 = $16;
   $9 = $72;
   $73 = $11;
   $74 = $73<<3;
   $75 = (($74) + 7)|0;
   $18 = $75;
   $76 = $18;
   $77 = (($76>>>0) / 8)&-1;
   $78 = $16;
   $79 = (($78) + ($77<<3)|0);
   $16 = $79;
   $80 = $15;
   $81 = ($80|0)!=($5|0);
   if ($81) {
    $82 = $15;
    _free($82);
   }
   $83 = $6;
   $84 = $14;
   $85 = (($83) + ($84<<1)|0);
   $86 = ((($85)) + -2|0);
   $7 = $86;
   $87 = $9;
   $88 = $14;
   $89 = (($87) + ($88<<3)|0);
   $90 = ((($89)) + -8|0);
   $10 = $90;
   $91 = $6;
   $92 = $11;
   $93 = (($91) + ($92<<1)|0);
   $94 = ((($93)) + -2|0);
   $95 = $7;
   $96 = ($94>>>0)<=($95>>>0);
   if ($96) {
    label = 158;
    break;
   }
  }
  $97 = $0;
  $98 = (6352 + ($97<<1)|0);
  $99 = HEAP16[$98>>1]|0;
  $100 = $99 << 16 >> 16;
  $1 = $100;
  $101 = $1;
  $102 = ($101|0)==(-180);
  do {
   if ($102) {
    label = 28;
   } else {
    $103 = HEAP32[4333]|0;
    $104 = ($103|0)==(-2);
    if ($104) {
     $105 = (_yylex()|0);
     HEAP32[4333] = $105;
    }
    $106 = HEAP32[4333]|0;
    $107 = ($106|0)<=(0);
    if ($107) {
     $4 = 0;
     HEAP32[4333] = 0;
    } else {
     $108 = HEAP32[4333]|0;
     $109 = ($108>>>0)<=(329);
     if ($109) {
      $110 = HEAP32[4333]|0;
      $111 = (9955 + ($110)|0);
      $112 = HEAP8[$111>>0]|0;
      $113 = $112&255;
      $114 = $113;
     } else {
      $114 = 2;
     }
     $4 = $114;
    }
    $115 = $4;
    $116 = $1;
    $117 = (($116) + ($115))|0;
    $1 = $117;
    $118 = $1;
    $119 = ($118|0)<(0);
    $120 = $1;
    $121 = (1340)<($120|0);
    $or$cond = $119 | $121;
    if ($or$cond) {
     label = 28;
    } else {
     $122 = $1;
     $123 = (6860 + ($122<<1)|0);
     $124 = HEAP16[$123>>1]|0;
     $125 = $124 << 16 >> 16;
     $126 = $4;
     $127 = ($125|0)!=($126|0);
     if ($127) {
      label = 28;
     } else {
      $128 = $1;
      $129 = (10285 + ($128)|0);
      $130 = HEAP8[$129>>0]|0;
      $131 = $130&255;
      $1 = $131;
      $132 = $1;
      $133 = ($132|0)<=(0);
      $134 = $1;
      if ($133) {
       $135 = ($134|0)==(0);
       $136 = $1;
       $137 = ($136|0)==(-1);
       $or$cond3 = $135 | $137;
       if ($or$cond3) {
        label = 142;
        break;
       }
       $138 = $1;
       $139 = (0 - ($138))|0;
       $1 = $139;
       label = 29;
       break;
      }
      $140 = ($134|0)==(4);
      if ($140) {
       label = 157;
       break L1;
      }
      $141 = $3;
      $142 = ($141|0)!=(0);
      if ($142) {
       $143 = $3;
       $144 = (($143) + -1)|0;
       $3 = $144;
      }
      $145 = HEAP32[4333]|0;
      $146 = ($145|0)!=(0);
      if ($146) {
       HEAP32[4333] = -2;
      }
      $147 = $1;
      $0 = $147;
      $148 = $10;
      $149 = ((($148)) + 8|0);
      $10 = $149;
      ;HEAP32[$149>>2]=HEAP32[17336>>2]|0;HEAP32[$149+4>>2]=HEAP32[17336+4>>2]|0;
     }
    }
   }
  } while(0);
  if ((label|0) == 28) {
   label = 0;
   $150 = $0;
   $151 = (11626 + ($150)|0);
   $152 = HEAP8[$151>>0]|0;
   $153 = $152&255;
   $1 = $153;
   $154 = $1;
   $155 = ($154|0)==(0);
   if ($155) {
    label = 142;
   } else {
    label = 29;
   }
  }
  do {
   if ((label|0) == 29) {
    label = 0;
    $156 = $1;
    $157 = (11880 + ($156)|0);
    $158 = HEAP8[$157>>0]|0;
    $159 = $158&255;
    $13 = $159;
    $160 = $10;
    $161 = $13;
    $162 = (1 - ($161))|0;
    $163 = (($160) + ($162<<3)|0);
    ;HEAP32[$12>>2]=HEAP32[$163>>2]|0;HEAP32[$12+4>>2]=HEAP32[$163+4>>2]|0;
    $164 = $1;
    do {
     switch ($164|0) {
     case 2:  {
      $165 = $10;
      $166 = ((($165)) + 4|0);
      $167 = HEAP32[$166>>2]|0;
      $168 = (_end_scope($167,0)|0);
      $169 = $10;
      $170 = HEAP32[$169>>2]|0;
      $171 = (_cat($168,$170)|0);
      HEAP32[$12>>2] = $171;
      $172 = HEAP32[$12>>2]|0;
      HEAP32[$vararg_buffer>>2] = $172;
      (_printf(12017,$vararg_buffer)|0);
      _new_HLX();
      break;
     }
     case 136:  {
      HEAP32[$12>>2] = 12640;
      break;
     }
     case 135:  {
      HEAP32[$12>>2] = 12630;
      break;
     }
     case 5:  {
      $173 = $10;
      $174 = ((($173)) + -8|0);
      $175 = HEAP32[$174>>2]|0;
      $176 = $10;
      $177 = HEAP32[$176>>2]|0;
      $178 = (_cat($175,$177)|0);
      HEAP32[$12>>2] = $178;
      $179 = $10;
      $180 = ((($179)) + -8|0);
      $181 = ((($180)) + 4|0);
      $182 = HEAP32[$181>>2]|0;
      $183 = $10;
      $184 = ((($183)) + 4|0);
      $185 = HEAP32[$184>>2]|0;
      $186 = (_llcat($182,$185)|0);
      $187 = ((($12)) + 4|0);
      HEAP32[$187>>2] = $186;
      break;
     }
     case 134:  {
      HEAP32[$12>>2] = 12620;
      break;
     }
     case 133:  {
      HEAP32[$12>>2] = 12608;
      break;
     }
     case 132:  {
      HEAP32[$12>>2] = 12597;
      break;
     }
     case 131:  {
      HEAP32[$12>>2] = 12586;
      break;
     }
     case 130:  {
      HEAP32[$12>>2] = 12369;
      break;
     }
     case 129:  {
      HEAP32[$12>>2] = 12354;
      break;
     }
     case 128:  {
      HEAP32[$12>>2] = 12577;
      break;
     }
     case 13:  {
      $188 = $10;
      $189 = ((($188)) + -8|0);
      $190 = HEAP32[$189>>2]|0;
      HEAP32[$12>>2] = $190;
      $191 = $10;
      $192 = ((($191)) + -8|0);
      $193 = ((($192)) + 4|0);
      $194 = HEAP32[$193>>2]|0;
      $195 = ((($12)) + 4|0);
      HEAP32[$195>>2] = $194;
      break;
     }
     case 14:  {
      HEAP32[$12>>2] = 14818;
      break;
     }
     case 15:  {
      $196 = $10;
      $197 = ((($196)) + -8|0);
      $198 = HEAP32[$197>>2]|0;
      $199 = (_cat($198,14818)|0);
      HEAP32[$12>>2] = $199;
      break;
     }
     case 16:  {
      $200 = $10;
      $201 = ((($200)) + -16|0);
      $202 = HEAP32[$201>>2]|0;
      $203 = (_cat(12021,$202)|0);
      $204 = (_cat($203,12027)|0);
      $205 = $10;
      $206 = ((($205)) + 4|0);
      $207 = HEAP32[$206>>2]|0;
      $208 = (_end_scope($207,0)|0);
      $209 = $10;
      $210 = HEAP32[$209>>2]|0;
      $211 = (_cat($208,$210)|0);
      $212 = (_cat($204,$211)|0);
      HEAP32[$12>>2] = $212;
      $213 = $10;
      $214 = ((($213)) + -16|0);
      $215 = ((($214)) + 4|0);
      $216 = HEAP32[$215>>2]|0;
      $217 = ((($12)) + 4|0);
      HEAP32[$217>>2] = $216;
      break;
     }
     case 17:  {
      $218 = $10;
      $219 = ((($218)) + 4|0);
      $220 = HEAP32[$219>>2]|0;
      $221 = (_end_scope($220,0)|0);
      $222 = $10;
      $223 = HEAP32[$222>>2]|0;
      $224 = (_cat($221,$223)|0);
      $225 = (_cat(12029,$224)|0);
      HEAP32[$12>>2] = $225;
      break;
     }
     case 18:  {
      $226 = $10;
      $227 = ((($226)) + -16|0);
      $228 = HEAP32[$227>>2]|0;
      $229 = (_cat(12038,$228)|0);
      $230 = (_cat($229,12042)|0);
      $231 = $10;
      $232 = ((($231)) + 4|0);
      $233 = HEAP32[$232>>2]|0;
      $234 = (_end_scope($233,0)|0);
      $235 = $10;
      $236 = HEAP32[$235>>2]|0;
      $237 = (_cat($234,$236)|0);
      $238 = (_cat($230,$237)|0);
      $239 = (_cat($238,12045)|0);
      HEAP32[$12>>2] = $239;
      $240 = $10;
      $241 = ((($240)) + -16|0);
      $242 = ((($241)) + 4|0);
      $243 = HEAP32[$242>>2]|0;
      $244 = ((($12)) + 4|0);
      HEAP32[$244>>2] = $243;
      break;
     }
     case 19:  {
      $245 = $10;
      $246 = ((($245)) + -32|0);
      $247 = HEAP32[$246>>2]|0;
      $248 = (_cat(12038,$247)|0);
      $249 = (_cat($248,12042)|0);
      $250 = $10;
      $251 = ((($250)) + -16|0);
      $252 = ((($251)) + 4|0);
      $253 = HEAP32[$252>>2]|0;
      $254 = (_end_scope($253,0)|0);
      $255 = $10;
      $256 = ((($255)) + -16|0);
      $257 = HEAP32[$256>>2]|0;
      $258 = (_cat($254,$257)|0);
      $259 = (_cat($249,$258)|0);
      $260 = (_cat($259,12047)|0);
      $261 = $10;
      $262 = ((($261)) + 4|0);
      $263 = HEAP32[$262>>2]|0;
      $264 = (_end_scope($263,0)|0);
      $265 = $10;
      $266 = HEAP32[$265>>2]|0;
      $267 = (_cat($264,$266)|0);
      $268 = (_cat($260,$267)|0);
      HEAP32[$12>>2] = $268;
      $269 = $10;
      $270 = ((($269)) + -32|0);
      $271 = ((($270)) + 4|0);
      $272 = HEAP32[$271>>2]|0;
      $273 = $10;
      $274 = ((($273)) + 4|0);
      $275 = HEAP32[$274>>2]|0;
      $276 = (_llcat($272,$275)|0);
      $277 = ((($12)) + 4|0);
      HEAP32[$277>>2] = $276;
      break;
     }
     case 20:  {
      $278 = $10;
      $279 = ((($278)) + -40|0);
      $280 = HEAP32[$279>>2]|0;
      $281 = (_cat(12038,$280)|0);
      $282 = (_cat($281,12042)|0);
      $283 = $10;
      $284 = ((($283)) + -24|0);
      $285 = ((($284)) + 4|0);
      $286 = HEAP32[$285>>2]|0;
      $287 = (_end_scope($286,0)|0);
      $288 = $10;
      $289 = ((($288)) + -24|0);
      $290 = HEAP32[$289>>2]|0;
      $291 = (_cat($287,$290)|0);
      $292 = (_cat($282,$291)|0);
      $293 = (_cat($292,12054)|0);
      $294 = $10;
      $295 = ((($294)) + 4|0);
      $296 = HEAP32[$295>>2]|0;
      $297 = (_end_scope($296,0)|0);
      $298 = $10;
      $299 = HEAP32[$298>>2]|0;
      $300 = (_cat($297,$299)|0);
      $301 = (_cat($293,$300)|0);
      $302 = (_cat($301,12045)|0);
      HEAP32[$12>>2] = $302;
      $303 = $10;
      $304 = ((($303)) + -40|0);
      $305 = ((($304)) + 4|0);
      $306 = HEAP32[$305>>2]|0;
      $307 = ((($12)) + 4|0);
      HEAP32[$307>>2] = $306;
      break;
     }
     case 21:  {
      $308 = $10;
      $309 = ((($308)) + -16|0);
      $310 = HEAP32[$309>>2]|0;
      $311 = (_cat(12061,$310)|0);
      $312 = (_cat($311,12042)|0);
      $313 = $10;
      $314 = HEAP32[$313>>2]|0;
      $315 = (_cat($312,$314)|0);
      $316 = (_cat($315,12045)|0);
      HEAP32[$12>>2] = $316;
      $317 = $10;
      $318 = ((($317)) + 4|0);
      $319 = HEAP32[$318>>2]|0;
      (_end_scope($319,0)|0);
      $320 = $10;
      $321 = ((($320)) + -16|0);
      $322 = ((($321)) + 4|0);
      $323 = HEAP32[$322>>2]|0;
      $324 = ((($12)) + 4|0);
      HEAP32[$324>>2] = $323;
      break;
     }
     case 22:  {
      $325 = $10;
      $326 = ((($325)) + -16|0);
      $327 = HEAP32[$326>>2]|0;
      $328 = (_cat(12069,$327)|0);
      $329 = (_cat($328,12042)|0);
      $330 = $10;
      $331 = ((($330)) + 4|0);
      $332 = HEAP32[$331>>2]|0;
      $333 = (_end_scope($332,0)|0);
      $334 = $10;
      $335 = HEAP32[$334>>2]|0;
      $336 = (_cat($333,$335)|0);
      $337 = (_cat($329,$336)|0);
      $338 = (_cat($337,12045)|0);
      HEAP32[$12>>2] = $338;
      $339 = $10;
      $340 = ((($339)) + -16|0);
      $341 = ((($340)) + 4|0);
      $342 = HEAP32[$341>>2]|0;
      $343 = ((($12)) + 4|0);
      HEAP32[$343>>2] = $342;
      break;
     }
     case 23:  {
      $344 = $10;
      $345 = ((($344)) + -24|0);
      $346 = ((($345)) + 4|0);
      $347 = HEAP32[$346>>2]|0;
      $348 = (_end_scope($347,0)|0);
      $349 = $10;
      $350 = ((($349)) + -24|0);
      $351 = HEAP32[$350>>2]|0;
      $352 = (_cat($348,$351)|0);
      $353 = (_cat(12076,$352)|0);
      $354 = (_cat($353,12080)|0);
      $355 = $10;
      $356 = ((($355)) + -8|0);
      $357 = HEAP32[$356>>2]|0;
      $358 = (_cat($354,$357)|0);
      $359 = (_cat($358,12088)|0);
      HEAP32[$12>>2] = $359;
      $360 = $10;
      $361 = ((($360)) + -8|0);
      $362 = ((($361)) + 4|0);
      $363 = HEAP32[$362>>2]|0;
      $364 = ((($12)) + 4|0);
      HEAP32[$364>>2] = $363;
      break;
     }
     case 24:  {
      $365 = (_malloc(8)|0);
      $19 = $365;
      $366 = $10;
      $367 = ((($366)) + -32|0);
      $368 = HEAP32[$367>>2]|0;
      $369 = $19;
      HEAP32[$369>>2] = $368;
      $370 = $19;
      $371 = ((($370)) + 4|0);
      HEAP32[$371>>2] = 0;
      $372 = $10;
      $373 = ((($372)) + -32|0);
      $374 = HEAP32[$373>>2]|0;
      $375 = (_cat(12091,$374)|0);
      $376 = (_cat($375,12100)|0);
      $377 = $10;
      $378 = ((($377)) + -16|0);
      $379 = HEAP32[$378>>2]|0;
      $380 = (_cat($376,$379)|0);
      $381 = (_cat($380,12042)|0);
      $382 = $10;
      $383 = ((($382)) + 4|0);
      $384 = HEAP32[$383>>2]|0;
      $385 = $19;
      $386 = (_end_scope($384,$385)|0);
      $387 = $10;
      $388 = HEAP32[$387>>2]|0;
      $389 = (_cat($386,$388)|0);
      $390 = (_cat($381,$389)|0);
      $391 = (_cat($390,12045)|0);
      HEAP32[$12>>2] = $391;
      $392 = $10;
      $393 = ((($392)) + -16|0);
      $394 = ((($393)) + 4|0);
      $395 = HEAP32[$394>>2]|0;
      $396 = ((($12)) + 4|0);
      HEAP32[$396>>2] = $395;
      break;
     }
     case 25:  {
      $397 = (_malloc(8)|0);
      $20 = $397;
      $398 = $10;
      $399 = ((($398)) + -32|0);
      $400 = HEAP32[$399>>2]|0;
      $401 = $20;
      HEAP32[$401>>2] = $400;
      $402 = $20;
      $403 = ((($402)) + 4|0);
      HEAP32[$403>>2] = 0;
      $404 = $10;
      $405 = ((($404)) + -32|0);
      $406 = HEAP32[$405>>2]|0;
      $407 = (_cat(12091,$406)|0);
      $408 = (_cat($407,12105)|0);
      $409 = $10;
      $410 = ((($409)) + -16|0);
      $411 = HEAP32[$410>>2]|0;
      $412 = (_cat($408,$411)|0);
      $413 = (_cat($412,12042)|0);
      $414 = $10;
      $415 = ((($414)) + 4|0);
      $416 = HEAP32[$415>>2]|0;
      $417 = $20;
      $418 = (_end_scope($416,$417)|0);
      $419 = $10;
      $420 = HEAP32[$419>>2]|0;
      $421 = (_cat($418,$420)|0);
      $422 = (_cat($413,$421)|0);
      $423 = (_cat($422,12045)|0);
      HEAP32[$12>>2] = $423;
      $424 = $10;
      $425 = ((($424)) + -16|0);
      $426 = ((($425)) + 4|0);
      $427 = HEAP32[$426>>2]|0;
      $428 = ((($12)) + 4|0);
      HEAP32[$428>>2] = $427;
      break;
     }
     case 26:  {
      $429 = $10;
      $430 = ((($429)) + -48|0);
      $431 = HEAP32[$430>>2]|0;
      $432 = (_cat(12110,$431)|0);
      $433 = (_cat($432,14818)|0);
      $434 = $10;
      $435 = ((($434)) + -32|0);
      $436 = HEAP32[$435>>2]|0;
      $437 = (_cat($433,$436)|0);
      $438 = (_cat($437,14818)|0);
      $439 = $10;
      $440 = ((($439)) + -16|0);
      $441 = HEAP32[$440>>2]|0;
      $442 = (_cat($438,$441)|0);
      $443 = (_cat($442,12042)|0);
      $444 = $10;
      $445 = ((($444)) + 4|0);
      $446 = HEAP32[$445>>2]|0;
      $447 = $10;
      $448 = ((($447)) + -48|0);
      $449 = ((($448)) + 4|0);
      $450 = HEAP32[$449>>2]|0;
      $451 = (_end_scope($446,$450)|0);
      $452 = $10;
      $453 = HEAP32[$452>>2]|0;
      $454 = (_cat($451,$453)|0);
      $455 = (_cat($443,$454)|0);
      $456 = (_cat($455,12045)|0);
      HEAP32[$12>>2] = $456;
      $457 = $10;
      $458 = ((($457)) + -32|0);
      $459 = ((($458)) + 4|0);
      $460 = HEAP32[$459>>2]|0;
      $461 = $10;
      $462 = ((($461)) + -16|0);
      $463 = ((($462)) + 4|0);
      $464 = HEAP32[$463>>2]|0;
      $465 = (_llcat($460,$464)|0);
      $466 = ((($12)) + 4|0);
      HEAP32[$466>>2] = $465;
      break;
     }
     case 27:  {
      HEAP32[$12>>2] = 12115;
      break;
     }
     case 28:  {
      HEAP32[$12>>2] = 12125;
      break;
     }
     case 29:  {
      HEAP32[$12>>2] = 12132;
      break;
     }
     case 30:  {
      $467 = $10;
      $468 = ((($467)) + -8|0);
      $469 = HEAP32[$468>>2]|0;
      $470 = (_cat(12140,$469)|0);
      $471 = (_cat($470,14818)|0);
      HEAP32[$12>>2] = $471;
      $472 = $10;
      $473 = ((($472)) + -8|0);
      $474 = ((($473)) + 4|0);
      $475 = HEAP32[$474>>2]|0;
      $476 = ((($12)) + 4|0);
      HEAP32[$476>>2] = $475;
      break;
     }
     case 127:  {
      HEAP32[$12>>2] = 12568;
      break;
     }
     case 32:  {
      $477 = $10;
      $478 = ((($477)) + -16|0);
      $479 = HEAP32[$478>>2]|0;
      $480 = $10;
      $481 = ((($480)) + -16|0);
      $482 = ((($481)) + 4|0);
      $483 = (_var_declare($479,$482,1)|0);
      $484 = $10;
      $485 = ((($484)) + -16|0);
      $486 = HEAP32[$485>>2]|0;
      $487 = (_cat($483,$486)|0);
      $488 = (_cat($487,12148)|0);
      $489 = $10;
      $490 = HEAP32[$489>>2]|0;
      $491 = (_cat($488,$490)|0);
      $492 = (_cat($491,12169)|0);
      HEAP32[$12>>2] = $492;
      $493 = $10;
      $494 = ((($493)) + -16|0);
      $495 = ((($494)) + 4|0);
      $496 = HEAP32[$495>>2]|0;
      $497 = $10;
      $498 = ((($497)) + 4|0);
      $499 = HEAP32[$498>>2]|0;
      $500 = (_llcat($496,$499)|0);
      $501 = ((($12)) + 4|0);
      HEAP32[$501>>2] = $500;
      break;
     }
     case 33:  {
      $502 = $10;
      $503 = ((($502)) + -16|0);
      $504 = HEAP32[$503>>2]|0;
      $505 = $10;
      $506 = ((($505)) + -16|0);
      $507 = ((($506)) + 4|0);
      $508 = (_var_declare($504,$507,2)|0);
      $509 = $10;
      $510 = ((($509)) + -16|0);
      $511 = HEAP32[$510>>2]|0;
      $512 = (_cat($508,$511)|0);
      $513 = (_cat($512,12148)|0);
      $514 = $10;
      $515 = HEAP32[$514>>2]|0;
      $516 = (_cat($513,$515)|0);
      $517 = (_cat($516,12169)|0);
      HEAP32[$12>>2] = $517;
      $518 = $10;
      $519 = ((($518)) + -16|0);
      $520 = ((($519)) + 4|0);
      $521 = HEAP32[$520>>2]|0;
      $522 = $10;
      $523 = ((($522)) + 4|0);
      $524 = HEAP32[$523>>2]|0;
      $525 = (_llcat($521,$524)|0);
      $526 = ((($12)) + 4|0);
      HEAP32[$526>>2] = $525;
      break;
     }
     case 126:  {
      HEAP32[$12>>2] = 12559;
      break;
     }
     case 35:  {
      $527 = $10;
      $528 = ((($527)) + -8|0);
      $529 = HEAP32[$528>>2]|0;
      $530 = $10;
      $531 = ((($530)) + -16|0);
      $532 = HEAP32[$531>>2]|0;
      $533 = (_cat($529,$532)|0);
      $534 = (_cat($533,14816)|0);
      $535 = $10;
      $536 = HEAP32[$535>>2]|0;
      $537 = (_cat($534,$536)|0);
      $538 = (_cat($537,12169)|0);
      HEAP32[$12>>2] = $538;
      break;
     }
     case 36:  {
      $539 = $10;
      $540 = ((($539)) + -16|0);
      $541 = HEAP32[$540>>2]|0;
      $542 = (_cat($541,12171)|0);
      $543 = $10;
      $544 = ((($543)) + -16|0);
      $545 = HEAP32[$544>>2]|0;
      $546 = (_cat($542,$545)|0);
      $547 = (_cat($546,12173)|0);
      $548 = $10;
      $549 = ((($548)) + -16|0);
      $550 = HEAP32[$549>>2]|0;
      $551 = (_cat($547,$550)|0);
      $552 = (_cat($551,12027)|0);
      $553 = $10;
      $554 = HEAP32[$553>>2]|0;
      $555 = (_cat($552,$554)|0);
      HEAP32[$12>>2] = $555;
      break;
     }
     case 125:  {
      HEAP32[$12>>2] = 12550;
      break;
     }
     case 38:  {
      $556 = $10;
      $557 = ((($556)) + -32|0);
      $558 = HEAP32[$557>>2]|0;
      $559 = (_cat($558,12173)|0);
      $560 = $10;
      $561 = ((($560)) + -16|0);
      $562 = HEAP32[$561>>2]|0;
      $563 = (_cat($559,$562)|0);
      $564 = (_cat($563,12027)|0);
      $565 = $10;
      $566 = HEAP32[$565>>2]|0;
      $567 = (_cat($564,$566)|0);
      HEAP32[$12>>2] = $567;
      break;
     }
     case 39:  {
      $568 = $10;
      $569 = ((($568)) + -64|0);
      $570 = HEAP32[$569>>2]|0;
      $571 = (_cat($570,12173)|0);
      $572 = $10;
      $573 = ((($572)) + -32|0);
      $574 = HEAP32[$573>>2]|0;
      $575 = (_cat($571,$574)|0);
      $576 = (_cat($575,12027)|0);
      $577 = $10;
      $578 = ((($577)) + -16|0);
      $579 = HEAP32[$578>>2]|0;
      $580 = (_cat($576,$579)|0);
      HEAP32[$12>>2] = $580;
      break;
     }
     case 40:  {
      $581 = $10;
      $582 = ((($581)) + -56|0);
      $583 = HEAP32[$582>>2]|0;
      $584 = (_cat($583,12173)|0);
      $585 = $10;
      $586 = ((($585)) + -40|0);
      $587 = HEAP32[$586>>2]|0;
      $588 = (_cat($584,$587)|0);
      $589 = (_cat($588,12027)|0);
      $590 = $10;
      $591 = ((($590)) + -16|0);
      $592 = HEAP32[$591>>2]|0;
      $593 = (_cat($589,$592)|0);
      HEAP32[$12>>2] = $593;
      break;
     }
     case 124:  {
      $1082 = $10;
      $1083 = ((($1082)) + -8|0);
      $1084 = HEAP32[$1083>>2]|0;
      $1085 = (_cat($1084,14816)|0);
      $1086 = $10;
      $1087 = HEAP32[$1086>>2]|0;
      $1088 = (_cat($1085,$1087)|0);
      HEAP32[$12>>2] = $1088;
      $1089 = (_malloc(8)|0);
      $22 = $1089;
      $1090 = $10;
      $1091 = HEAP32[$1090>>2]|0;
      $1092 = $22;
      HEAP32[$1092>>2] = $1091;
      $1093 = $10;
      $1094 = ((($1093)) + -8|0);
      $1095 = ((($1094)) + 4|0);
      $1096 = HEAP32[$1095>>2]|0;
      $1097 = $22;
      $1098 = ((($1097)) + 4|0);
      HEAP32[$1098>>2] = $1096;
      $1099 = $22;
      $1100 = $10;
      $1101 = ((($1100)) + -8|0);
      $1102 = ((($1101)) + 4|0);
      HEAP32[$1102>>2] = $1099;
      $1103 = $10;
      $1104 = ((($1103)) + -8|0);
      $1105 = ((($1104)) + 4|0);
      $1106 = HEAP32[$1105>>2]|0;
      $1107 = ((($12)) + 4|0);
      HEAP32[$1107>>2] = $1106;
      break;
     }
     case 42:  {
      $594 = $10;
      $595 = ((($594)) + -16|0);
      $596 = HEAP32[$595>>2]|0;
      $597 = (_cat(14800,$596)|0);
      $598 = (_cat($597,12175)|0);
      $599 = $10;
      $600 = HEAP32[$599>>2]|0;
      $601 = (_cat($598,$600)|0);
      $602 = (_cat($601,12181)|0);
      HEAP32[$12>>2] = $602;
      break;
     }
     case 123:  {
      $1054 = $10;
      $1055 = ((($1054)) + -8|0);
      $1056 = HEAP32[$1055>>2]|0;
      $1057 = (_cat($1056,14816)|0);
      $1058 = $10;
      $1059 = HEAP32[$1058>>2]|0;
      $1060 = (_cat($1057,$1059)|0);
      HEAP32[$12>>2] = $1060;
      $1061 = (_malloc(8)|0);
      $21 = $1061;
      $1062 = $10;
      $1063 = ((($1062)) + -8|0);
      $1064 = HEAP32[$1063>>2]|0;
      $1065 = $21;
      HEAP32[$1065>>2] = $1064;
      $1066 = ((($12)) + 4|0);
      $1067 = HEAP32[$1066>>2]|0;
      $1068 = $21;
      $1069 = ((($1068)) + 4|0);
      HEAP32[$1069>>2] = $1067;
      $1070 = $21;
      $1071 = ((($12)) + 4|0);
      HEAP32[$1071>>2] = $1070;
      $1072 = (_malloc(8)|0);
      $21 = $1072;
      $1073 = $10;
      $1074 = HEAP32[$1073>>2]|0;
      $1075 = $21;
      HEAP32[$1075>>2] = $1074;
      $1076 = ((($12)) + 4|0);
      $1077 = HEAP32[$1076>>2]|0;
      $1078 = $21;
      $1079 = ((($1078)) + 4|0);
      HEAP32[$1079>>2] = $1077;
      $1080 = $21;
      $1081 = ((($12)) + 4|0);
      HEAP32[$1081>>2] = $1080;
      break;
     }
     case 44:  {
      $603 = $10;
      $604 = ((($603)) + -16|0);
      $605 = HEAP32[$604>>2]|0;
      $606 = (_cat(14800,$605)|0);
      $607 = (_cat($606,12186)|0);
      $608 = $10;
      $609 = HEAP32[$608>>2]|0;
      $610 = (_cat($607,$609)|0);
      $611 = (_cat($610,12181)|0);
      HEAP32[$12>>2] = $611;
      break;
     }
     case 122:  {
      $1045 = $10;
      $1046 = ((($1045)) + 4|0);
      $1047 = HEAP32[$1046>>2]|0;
      $1048 = (_end_scope($1047,0)|0);
      $1049 = $10;
      $1050 = HEAP32[$1049>>2]|0;
      $1051 = (_cat($1048,$1050)|0);
      $1052 = (_cat(12531,$1051)|0);
      $1053 = (_cat($1052,12516)|0);
      HEAP32[$12>>2] = $1053;
      break;
     }
     case 46:  {
      $612 = $10;
      $613 = ((($612)) + -16|0);
      $614 = HEAP32[$613>>2]|0;
      $615 = (_cat(14800,$614)|0);
      $616 = (_cat($615,12192)|0);
      $617 = $10;
      $618 = HEAP32[$617>>2]|0;
      $619 = (_cat($616,$618)|0);
      $620 = (_cat($619,12181)|0);
      HEAP32[$12>>2] = $620;
      break;
     }
     case 121:  {
      $1036 = $10;
      $1037 = ((($1036)) + 4|0);
      $1038 = HEAP32[$1037>>2]|0;
      $1039 = (_end_scope($1038,0)|0);
      $1040 = $10;
      $1041 = HEAP32[$1040>>2]|0;
      $1042 = (_cat($1039,$1041)|0);
      $1043 = (_cat(12531,$1042)|0);
      $1044 = (_cat($1043,12516)|0);
      HEAP32[$12>>2] = $1044;
      break;
     }
     case 48:  {
      $621 = $10;
      $622 = ((($621)) + -16|0);
      $623 = HEAP32[$622>>2]|0;
      $624 = (_cat(14800,$623)|0);
      $625 = (_cat($624,12197)|0);
      $626 = $10;
      $627 = HEAP32[$626>>2]|0;
      $628 = (_cat($625,$627)|0);
      $629 = (_cat($628,12181)|0);
      HEAP32[$12>>2] = $629;
      break;
     }
     case 120:  {
      $1027 = $10;
      $1028 = ((($1027)) + 4|0);
      $1029 = HEAP32[$1028>>2]|0;
      $1030 = (_end_scope($1029,0)|0);
      $1031 = $10;
      $1032 = HEAP32[$1031>>2]|0;
      $1033 = (_cat($1030,$1032)|0);
      $1034 = (_cat(12519,$1033)|0);
      $1035 = (_cat($1034,12045)|0);
      HEAP32[$12>>2] = $1035;
      break;
     }
     case 50:  {
      $630 = $10;
      $631 = ((($630)) + -16|0);
      $632 = HEAP32[$631>>2]|0;
      $633 = (_cat(14800,$632)|0);
      $634 = (_cat($633,12202)|0);
      $635 = $10;
      $636 = HEAP32[$635>>2]|0;
      $637 = (_cat($634,$636)|0);
      $638 = (_cat($637,12181)|0);
      HEAP32[$12>>2] = $638;
      break;
     }
     case 119:  {
      $1018 = $10;
      $1019 = ((($1018)) + 4|0);
      $1020 = HEAP32[$1019>>2]|0;
      $1021 = (_end_scope($1020,0)|0);
      $1022 = $10;
      $1023 = HEAP32[$1022>>2]|0;
      $1024 = (_cat($1021,$1023)|0);
      $1025 = (_cat(12519,$1024)|0);
      $1026 = (_cat($1025,12045)|0);
      HEAP32[$12>>2] = $1026;
      break;
     }
     case 52:  {
      $639 = $10;
      $640 = ((($639)) + -16|0);
      $641 = HEAP32[$640>>2]|0;
      $642 = (_cat(14800,$641)|0);
      $643 = (_cat($642,12207)|0);
      $644 = $10;
      $645 = HEAP32[$644>>2]|0;
      $646 = (_cat($643,$645)|0);
      $647 = (_cat($646,12181)|0);
      HEAP32[$12>>2] = $647;
      break;
     }
     case 53:  {
      $648 = $10;
      $649 = ((($648)) + -16|0);
      $650 = HEAP32[$649>>2]|0;
      $651 = (_cat(14800,$650)|0);
      $652 = (_cat($651,12214)|0);
      $653 = $10;
      $654 = HEAP32[$653>>2]|0;
      $655 = (_cat($652,$654)|0);
      $656 = (_cat($655,12181)|0);
      HEAP32[$12>>2] = $656;
      break;
     }
     case 118:  {
      $1000 = $10;
      $1001 = ((($1000)) + -24|0);
      $1002 = HEAP32[$1001>>2]|0;
      $1003 = (_cat(12496,$1002)|0);
      $1004 = (_cat($1003,12506)|0);
      $1005 = $10;
      $1006 = ((($1005)) + 4|0);
      $1007 = HEAP32[$1006>>2]|0;
      $1008 = $10;
      $1009 = ((($1008)) + -24|0);
      $1010 = ((($1009)) + 4|0);
      $1011 = HEAP32[$1010>>2]|0;
      $1012 = (_end_scope($1007,$1011)|0);
      $1013 = $10;
      $1014 = HEAP32[$1013>>2]|0;
      $1015 = (_cat($1012,$1014)|0);
      $1016 = (_cat($1004,$1015)|0);
      $1017 = (_cat($1016,12516)|0);
      HEAP32[$12>>2] = $1017;
      break;
     }
     case 55:  {
      $657 = $10;
      $658 = ((($657)) + -16|0);
      $659 = HEAP32[$658>>2]|0;
      $660 = (_cat(14800,$659)|0);
      $661 = (_cat($660,12221)|0);
      $662 = $10;
      $663 = HEAP32[$662>>2]|0;
      $664 = (_cat($661,$663)|0);
      $665 = (_cat($664,12181)|0);
      HEAP32[$12>>2] = $665;
      break;
     }
     case 56:  {
      $666 = $10;
      $667 = ((($666)) + -16|0);
      $668 = HEAP32[$667>>2]|0;
      $669 = (_cat(14800,$668)|0);
      $670 = (_cat($669,12226)|0);
      $671 = $10;
      $672 = HEAP32[$671>>2]|0;
      $673 = (_cat($670,$672)|0);
      $674 = (_cat($673,12181)|0);
      HEAP32[$12>>2] = $674;
      break;
     }
     case 117:  {
      $982 = $10;
      $983 = ((($982)) + -24|0);
      $984 = HEAP32[$983>>2]|0;
      $985 = (_cat(12496,$984)|0);
      $986 = (_cat($985,12506)|0);
      $987 = $10;
      $988 = ((($987)) + 4|0);
      $989 = HEAP32[$988>>2]|0;
      $990 = $10;
      $991 = ((($990)) + -24|0);
      $992 = ((($991)) + 4|0);
      $993 = HEAP32[$992>>2]|0;
      $994 = (_end_scope($989,$993)|0);
      $995 = $10;
      $996 = HEAP32[$995>>2]|0;
      $997 = (_cat($994,$996)|0);
      $998 = (_cat($986,$997)|0);
      $999 = (_cat($998,12516)|0);
      HEAP32[$12>>2] = $999;
      break;
     }
     case 58:  {
      $675 = $10;
      $676 = ((($675)) + -16|0);
      $677 = HEAP32[$676>>2]|0;
      $678 = (_cat(14800,$677)|0);
      $679 = (_cat($678,12231)|0);
      $680 = $10;
      $681 = HEAP32[$680>>2]|0;
      $682 = (_cat($679,$681)|0);
      $683 = (_cat($682,12181)|0);
      HEAP32[$12>>2] = $683;
      break;
     }
     case 59:  {
      $684 = $10;
      $685 = ((($684)) + -16|0);
      $686 = HEAP32[$685>>2]|0;
      $687 = (_cat(14800,$686)|0);
      $688 = (_cat($687,12237)|0);
      $689 = $10;
      $690 = HEAP32[$689>>2]|0;
      $691 = (_cat($688,$690)|0);
      $692 = (_cat($691,12181)|0);
      HEAP32[$12>>2] = $692;
      break;
     }
     case 60:  {
      $693 = $10;
      $694 = ((($693)) + -16|0);
      $695 = HEAP32[$694>>2]|0;
      $696 = (_cat(14800,$695)|0);
      $697 = (_cat($696,12243)|0);
      $698 = $10;
      $699 = HEAP32[$698>>2]|0;
      $700 = (_cat($697,$699)|0);
      $701 = (_cat($700,12181)|0);
      HEAP32[$12>>2] = $701;
      break;
     }
     case 116:  {
      $964 = $10;
      $965 = ((($964)) + -32|0);
      $966 = HEAP32[$965>>2]|0;
      $967 = (_cat(12496,$966)|0);
      $968 = (_cat($967,12042)|0);
      $969 = $10;
      $970 = ((($969)) + 4|0);
      $971 = HEAP32[$970>>2]|0;
      $972 = $10;
      $973 = ((($972)) + -32|0);
      $974 = ((($973)) + 4|0);
      $975 = HEAP32[$974>>2]|0;
      $976 = (_end_scope($971,$975)|0);
      $977 = $10;
      $978 = HEAP32[$977>>2]|0;
      $979 = (_cat($976,$978)|0);
      $980 = (_cat($968,$979)|0);
      $981 = (_cat($980,12045)|0);
      HEAP32[$12>>2] = $981;
      break;
     }
     case 62:  {
      $702 = $10;
      $703 = ((($702)) + -16|0);
      $704 = HEAP32[$703>>2]|0;
      $705 = (_cat(14800,$704)|0);
      $706 = (_cat($705,12250)|0);
      $707 = $10;
      $708 = HEAP32[$707>>2]|0;
      $709 = (_cat($706,$708)|0);
      $710 = (_cat($709,12181)|0);
      HEAP32[$12>>2] = $710;
      break;
     }
     case 63:  {
      $711 = $10;
      $712 = ((($711)) + -16|0);
      $713 = HEAP32[$712>>2]|0;
      $714 = (_cat(14800,$713)|0);
      $715 = (_cat($714,12255)|0);
      $716 = $10;
      $717 = HEAP32[$716>>2]|0;
      $718 = (_cat($715,$717)|0);
      $719 = (_cat($718,12181)|0);
      HEAP32[$12>>2] = $719;
      break;
     }
     case 115:  {
      $946 = $10;
      $947 = ((($946)) + -32|0);
      $948 = HEAP32[$947>>2]|0;
      $949 = (_cat(12496,$948)|0);
      $950 = (_cat($949,12042)|0);
      $951 = $10;
      $952 = ((($951)) + 4|0);
      $953 = HEAP32[$952>>2]|0;
      $954 = $10;
      $955 = ((($954)) + -32|0);
      $956 = ((($955)) + 4|0);
      $957 = HEAP32[$956>>2]|0;
      $958 = (_end_scope($953,$957)|0);
      $959 = $10;
      $960 = HEAP32[$959>>2]|0;
      $961 = (_cat($958,$960)|0);
      $962 = (_cat($950,$961)|0);
      $963 = (_cat($962,12045)|0);
      HEAP32[$12>>2] = $963;
      break;
     }
     case 65:  {
      $720 = $10;
      $721 = ((($720)) + -16|0);
      $722 = HEAP32[$721>>2]|0;
      $723 = (_cat(14800,$722)|0);
      $724 = (_cat($723,12260)|0);
      $725 = $10;
      $726 = HEAP32[$725>>2]|0;
      $727 = (_cat($724,$726)|0);
      $728 = (_cat($727,12181)|0);
      HEAP32[$12>>2] = $728;
      break;
     }
     case 66:  {
      $729 = $10;
      $730 = ((($729)) + -16|0);
      $731 = HEAP32[$730>>2]|0;
      $732 = (_cat(14800,$731)|0);
      $733 = (_cat($732,12265)|0);
      $734 = $10;
      $735 = HEAP32[$734>>2]|0;
      $736 = (_cat($733,$735)|0);
      $737 = (_cat($736,12181)|0);
      HEAP32[$12>>2] = $737;
      break;
     }
     case 67:  {
      $738 = $10;
      $739 = ((($738)) + -16|0);
      $740 = HEAP32[$739>>2]|0;
      $741 = (_cat(14800,$740)|0);
      $742 = (_cat($741,12270)|0);
      $743 = $10;
      $744 = HEAP32[$743>>2]|0;
      $745 = (_cat($742,$744)|0);
      $746 = (_cat($745,12181)|0);
      HEAP32[$12>>2] = $746;
      break;
     }
     case 68:  {
      $747 = $10;
      $748 = ((($747)) + -16|0);
      $749 = HEAP32[$748>>2]|0;
      $750 = (_cat(14800,$749)|0);
      $751 = (_cat($750,12276)|0);
      $752 = $10;
      $753 = HEAP32[$752>>2]|0;
      $754 = (_cat($751,$753)|0);
      $755 = (_cat($754,12181)|0);
      HEAP32[$12>>2] = $755;
      break;
     }
     case 114:  {
      $930 = $10;
      $931 = ((($930)) + -8|0);
      $932 = HEAP32[$931>>2]|0;
      $933 = (_cat($932,14816)|0);
      $934 = $10;
      $935 = HEAP32[$934>>2]|0;
      $936 = (_cat($933,$935)|0);
      HEAP32[$12>>2] = $936;
      $937 = $10;
      $938 = ((($937)) + -8|0);
      $939 = ((($938)) + 4|0);
      $940 = HEAP32[$939>>2]|0;
      $941 = $10;
      $942 = ((($941)) + 4|0);
      $943 = HEAP32[$942>>2]|0;
      $944 = (_llcat($940,$943)|0);
      $945 = ((($12)) + 4|0);
      HEAP32[$945>>2] = $944;
      break;
     }
     case 70:  {
      $756 = $10;
      $757 = HEAP32[$756>>2]|0;
      $758 = (_cat(12281,$757)|0);
      $759 = (_cat($758,12181)|0);
      HEAP32[$12>>2] = $759;
      break;
     }
     case 71:  {
      $760 = $10;
      $761 = HEAP32[$760>>2]|0;
      $762 = (_cat(12287,$761)|0);
      $763 = (_cat($762,12169)|0);
      HEAP32[$12>>2] = $763;
      break;
     }
     case 72:  {
      $764 = $10;
      $765 = HEAP32[$764>>2]|0;
      $766 = (_cat(12298,$765)|0);
      $767 = (_cat($766,12169)|0);
      HEAP32[$12>>2] = $767;
      break;
     }
     case 73:  {
      $768 = $10;
      $769 = HEAP32[$768>>2]|0;
      $770 = (_cat(12310,$769)|0);
      $771 = (_cat($770,12169)|0);
      HEAP32[$12>>2] = $771;
      break;
     }
     case 74:  {
      $772 = $10;
      $773 = HEAP32[$772>>2]|0;
      $774 = (_cat(12320,$773)|0);
      $775 = (_cat($774,12169)|0);
      HEAP32[$12>>2] = $775;
      break;
     }
     case 112:  {
      $921 = $10;
      $922 = ((($921)) + -24|0);
      $923 = HEAP32[$922>>2]|0;
      $924 = $10;
      $925 = ((($924)) + -16|0);
      $926 = HEAP32[$925>>2]|0;
      $927 = $10;
      $928 = HEAP32[$927>>2]|0;
      $929 = (_genrange_sa(12494,$923,$926,$928)|0);
      HEAP32[$12>>2] = $929;
      break;
     }
     case 76:  {
      $776 = $10;
      $777 = ((($776)) + -24|0);
      $778 = HEAP32[$777>>2]|0;
      $779 = (_cat($778,12331)|0);
      $780 = $10;
      $781 = ((($780)) + -8|0);
      $782 = HEAP32[$781>>2]|0;
      $783 = (_cat($779,$782)|0);
      $784 = (_cat($783,12336)|0);
      HEAP32[$12>>2] = $784;
      break;
     }
     case 77:  {
      $785 = $10;
      $786 = ((($785)) + -16|0);
      $787 = HEAP32[$786>>2]|0;
      $788 = (_cat($787,12338)|0);
      HEAP32[$12>>2] = $788;
      break;
     }
     case 78:  {
      $789 = $10;
      $790 = ((($789)) + -24|0);
      $791 = HEAP32[$790>>2]|0;
      $792 = (_cat($791,12344)|0);
      $793 = $10;
      $794 = ((($793)) + -8|0);
      $795 = HEAP32[$794>>2]|0;
      $796 = (_cat($792,$795)|0);
      $797 = (_cat($796,12169)|0);
      HEAP32[$12>>2] = $797;
      break;
     }
     case 79:  {
      $798 = $10;
      $799 = ((($798)) + -16|0);
      $800 = HEAP32[$799>>2]|0;
      $801 = (_cat($800,12349)|0);
      $802 = $10;
      $803 = HEAP32[$802>>2]|0;
      $804 = (_cat($801,$803)|0);
      HEAP32[$12>>2] = $804;
      break;
     }
     case 80:  {
      $805 = $10;
      $806 = ((($805)) + -8|0);
      $807 = HEAP32[$806>>2]|0;
      $808 = (_cat(12354,$807)|0);
      $809 = (_cat($808,12363)|0);
      HEAP32[$12>>2] = $809;
      break;
     }
     case 81:  {
      $810 = $10;
      $811 = ((($810)) + -8|0);
      $812 = HEAP32[$811>>2]|0;
      $813 = (_cat(12369,$812)|0);
      $814 = (_cat($813,12363)|0);
      HEAP32[$12>>2] = $814;
      break;
     }
     case 111:  {
      $910 = $10;
      $911 = ((($910)) + -8|0);
      $912 = HEAP32[$911>>2]|0;
      $913 = (_cat(12452,$912)|0);
      $914 = (_cat($913,12455)|0);
      $915 = (_cat($914,14816)|0);
      $916 = $10;
      $917 = HEAP32[$916>>2]|0;
      $918 = (_cat(12452,$917)|0);
      $919 = (_cat($918,12455)|0);
      $920 = (_cat($915,$919)|0);
      HEAP32[$12>>2] = $920;
      break;
     }
     case 83:  {
      $815 = $10;
      $816 = HEAP32[$815>>2]|0;
      $817 = (_cat(14800,$816)|0);
      $818 = (_cat($817,12336)|0);
      HEAP32[$12>>2] = $818;
      break;
     }
     case 84:  {
      HEAP32[$12>>2] = 12378;
      break;
     }
     case 85:  {
      HEAP32[$12>>2] = 12385;
      break;
     }
     case 86:  {
      HEAP32[$12>>2] = 12393;
      break;
     }
     case 87:  {
      HEAP32[$12>>2] = 12400;
      break;
     }
     case 88:  {
      HEAP32[$12>>2] = 12412;
      break;
     }
     case 89:  {
      HEAP32[$12>>2] = 12423;
      break;
     }
     case 90:  {
      HEAP32[$12>>2] = 12440;
      break;
     }
     case 91:  {
      $819 = $10;
      $820 = HEAP32[$819>>2]|0;
      $821 = (_cat(12446,$820)|0);
      $822 = (_cat($821,12449)|0);
      HEAP32[$12>>2] = $822;
      break;
     }
     case 92:  {
      $823 = $10;
      $824 = HEAP32[$823>>2]|0;
      $825 = (_cat(12452,$824)|0);
      $826 = (_cat($825,12455)|0);
      HEAP32[$12>>2] = $826;
      break;
     }
     case 93:  {
      $827 = $10;
      $828 = HEAP32[$827>>2]|0;
      $829 = (_cat(12458,$828)|0);
      $830 = (_cat($829,12461)|0);
      HEAP32[$12>>2] = $830;
      break;
     }
     case 94:  {
      $831 = $10;
      $832 = HEAP32[$831>>2]|0;
      $833 = (_cat(14800,$832)|0);
      $834 = (_cat($833,12336)|0);
      HEAP32[$12>>2] = $834;
      break;
     }
     case 110:  {
      $904 = $10;
      $905 = ((($904)) + -16|0);
      $906 = HEAP32[$905>>2]|0;
      $907 = $10;
      $908 = HEAP32[$907>>2]|0;
      $909 = (_genrange_sc(12494,$906,$908)|0);
      HEAP32[$12>>2] = $909;
      break;
     }
     case 96:  {
      $835 = $10;
      $836 = ((($835)) + -8|0);
      $837 = HEAP32[$836>>2]|0;
      $838 = (_cat(12464,$837)|0);
      $839 = (_cat($838,12467)|0);
      HEAP32[$12>>2] = $839;
      break;
     }
     case 97:  {
      $840 = $10;
      $841 = ((($840)) + -8|0);
      $842 = HEAP32[$841>>2]|0;
      $843 = (_cat(12464,$842)|0);
      $844 = (_cat($843,12467)|0);
      HEAP32[$12>>2] = $844;
      break;
     }
     case 98:  {
      HEAP32[$12>>2] = 12470;
      break;
     }
     case 99:  {
      HEAP32[$12>>2] = 12470;
      break;
     }
     case 100:  {
      HEAP32[$12>>2] = 12475;
      break;
     }
     case 101:  {
      HEAP32[$12>>2] = 12475;
      break;
     }
     case 102:  {
      $845 = $10;
      $846 = ((($845)) + -8|0);
      $847 = HEAP32[$846>>2]|0;
      $848 = (_cat(12490,$847)|0);
      $849 = (_cat($848,12169)|0);
      HEAP32[$12>>2] = $849;
      break;
     }
     case 103:  {
      $850 = $10;
      $851 = ((($850)) + -8|0);
      $852 = HEAP32[$851>>2]|0;
      HEAP32[$12>>2] = $852;
      break;
     }
     case 104:  {
      $853 = $10;
      $854 = ((($853)) + -16|0);
      $855 = HEAP32[$854>>2]|0;
      $856 = $10;
      $857 = HEAP32[$856>>2]|0;
      $858 = (_genrange_dc($855,$857)|0);
      HEAP32[$12>>2] = $858;
      break;
     }
     case 105:  {
      $859 = $10;
      $860 = ((($859)) + -8|0);
      $861 = HEAP32[$860>>2]|0;
      $862 = (_cat(14800,$861)|0);
      $863 = (_cat($862,14802)|0);
      $864 = $10;
      $865 = HEAP32[$864>>2]|0;
      $866 = (_cat(14800,$865)|0);
      $867 = (_cat($866,12336)|0);
      $868 = (_cat($863,$867)|0);
      HEAP32[$12>>2] = $868;
      break;
     }
     case 106:  {
      $869 = $10;
      $870 = ((($869)) + -24|0);
      $871 = HEAP32[$870>>2]|0;
      $872 = $10;
      $873 = ((($872)) + -16|0);
      $874 = HEAP32[$873>>2]|0;
      $875 = $10;
      $876 = HEAP32[$875>>2]|0;
      $877 = (_genrange_da($871,$874,$876)|0);
      HEAP32[$12>>2] = $877;
      break;
     }
     case 107:  {
      $878 = $10;
      $879 = ((($878)) + -16|0);
      $880 = HEAP32[$879>>2]|0;
      $881 = $10;
      $882 = HEAP32[$881>>2]|0;
      $883 = (_genrange_sc(12492,$880,$882)|0);
      HEAP32[$12>>2] = $883;
      break;
     }
     case 108:  {
      $884 = $10;
      $885 = ((($884)) + -8|0);
      $886 = HEAP32[$885>>2]|0;
      $887 = (_cat(12446,$886)|0);
      $888 = (_cat($887,12449)|0);
      $889 = (_cat($888,14816)|0);
      $890 = $10;
      $891 = HEAP32[$890>>2]|0;
      $892 = (_cat(12446,$891)|0);
      $893 = (_cat($892,12449)|0);
      $894 = (_cat($889,$893)|0);
      HEAP32[$12>>2] = $894;
      break;
     }
     case 109:  {
      $895 = $10;
      $896 = ((($895)) + -24|0);
      $897 = HEAP32[$896>>2]|0;
      $898 = $10;
      $899 = ((($898)) + -16|0);
      $900 = HEAP32[$899>>2]|0;
      $901 = $10;
      $902 = HEAP32[$901>>2]|0;
      $903 = (_genrange_sa(12492,$897,$900,$902)|0);
      HEAP32[$12>>2] = $903;
      break;
     }
     default: {
     }
     }
    } while(0);
    $1108 = $13;
    $1109 = $10;
    $1110 = (0 - ($1108))|0;
    $1111 = (($1109) + ($1110<<3)|0);
    $10 = $1111;
    $1112 = $13;
    $1113 = $7;
    $1114 = (0 - ($1112))|0;
    $1115 = (($1113) + ($1114<<1)|0);
    $7 = $1115;
    $13 = 0;
    $1116 = $10;
    $1117 = ((($1116)) + 8|0);
    $10 = $1117;
    ;HEAP32[$1117>>2]=HEAP32[$12>>2]|0;HEAP32[$1117+4>>2]=HEAP32[$12+4>>2]|0;
    $1118 = $1;
    $1119 = (12649 + ($1118)|0);
    $1120 = HEAP8[$1119>>0]|0;
    $1121 = $1120&255;
    $1 = $1121;
    $1122 = $1;
    $1123 = (($1122) - 100)|0;
    $1124 = (9542 + ($1123<<1)|0);
    $1125 = HEAP16[$1124>>1]|0;
    $1126 = $1125 << 16 >> 16;
    $1127 = $7;
    $1128 = HEAP16[$1127>>1]|0;
    $1129 = $1128 << 16 >> 16;
    $1130 = (($1126) + ($1129))|0;
    $0 = $1130;
    $1131 = $0;
    $1132 = (0)<=($1131|0);
    $1133 = $0;
    $1134 = ($1133|0)<=(1340);
    $or$cond5 = $1132 & $1134;
    if ($or$cond5) {
     $1135 = $0;
     $1136 = (6860 + ($1135<<1)|0);
     $1137 = HEAP16[$1136>>1]|0;
     $1138 = $1137 << 16 >> 16;
     $1139 = $7;
     $1140 = HEAP16[$1139>>1]|0;
     $1141 = $1140 << 16 >> 16;
     $1142 = ($1138|0)==($1141|0);
     if ($1142) {
      $1143 = $0;
      $1144 = (10285 + ($1143)|0);
      $1145 = HEAP8[$1144>>0]|0;
      $1146 = $1145&255;
      $0 = $1146;
      break;
     }
    }
    $1147 = $1;
    $1148 = (($1147) - 100)|0;
    $1149 = (12786 + ($1148)|0);
    $1150 = HEAP8[$1149>>0]|0;
    $1151 = $1150 << 24 >> 24;
    $0 = $1151;
   }
   else if ((label|0) == 142) {
    label = 0;
    $1152 = $3;
    $1153 = ($1152|0)!=(0);
    if (!($1153)) {
     $1154 = HEAP32[4332]|0;
     $1155 = (($1154) + 1)|0;
     HEAP32[4332] = $1155;
     _yyerror(12817);
    }
    $1156 = $3;
    $1157 = ($1156|0)==(3);
    do {
     if ($1157) {
      $1158 = HEAP32[4333]|0;
      $1159 = ($1158|0)<=(0);
      if ($1159) {
       $1160 = HEAP32[4333]|0;
       $1161 = ($1160|0)==(0);
       if ($1161) {
        label = 158;
        break L1;
       } else {
        break;
       }
      } else {
       $1162 = $4;
       _yydestruct(12830,$1162,17336);
       HEAP32[4333] = -2;
       break;
      }
     }
    } while(0);
    $3 = 3;
    while(1) {
     $1163 = $0;
     $1164 = (6352 + ($1163<<1)|0);
     $1165 = HEAP16[$1164>>1]|0;
     $1166 = $1165 << 16 >> 16;
     $1 = $1166;
     $1167 = $1;
     $1168 = ($1167|0)!=(-180);
     if ($1168) {
      $1169 = $1;
      $1170 = (($1169) + 1)|0;
      $1 = $1170;
      $1171 = $1;
      $1172 = (0)<=($1171|0);
      $1173 = $1;
      $1174 = ($1173|0)<=(1340);
      $or$cond7 = $1172 & $1174;
      if ($or$cond7) {
       $1175 = $1;
       $1176 = (6860 + ($1175<<1)|0);
       $1177 = HEAP16[$1176>>1]|0;
       $1178 = $1177 << 16 >> 16;
       $1179 = ($1178|0)==(1);
       if ($1179) {
        $1180 = $1;
        $1181 = (10285 + ($1180)|0);
        $1182 = HEAP8[$1181>>0]|0;
        $1183 = $1182&255;
        $1 = $1183;
        $1184 = $1;
        $1185 = (0)<($1184|0);
        if ($1185) {
         break;
        }
       }
      }
     }
     $1186 = $7;
     $1187 = $6;
     $1188 = ($1186|0)==($1187|0);
     if ($1188) {
      label = 158;
      break L1;
     }
     $1189 = $0;
     $1190 = (12848 + ($1189)|0);
     $1191 = HEAP8[$1190>>0]|0;
     $1192 = $1191&255;
     $1193 = $10;
     _yydestruct(13102,$1192,$1193);
     $1194 = $10;
     $1195 = ((($1194)) + -8|0);
     $10 = $1195;
     $1196 = $7;
     $1197 = ((($1196)) + -2|0);
     $7 = $1197;
     $1198 = $7;
     $1199 = HEAP16[$1198>>1]|0;
     $1200 = $1199 << 16 >> 16;
     $0 = $1200;
    }
    $1201 = $1;
    $1202 = ($1201|0)==(4);
    if ($1202) {
     label = 157;
     break L1;
    }
    $1203 = $10;
    $1204 = ((($1203)) + 8|0);
    $10 = $1204;
    ;HEAP32[$1204>>2]=HEAP32[17336>>2]|0;HEAP32[$1204+4>>2]=HEAP32[17336+4>>2]|0;
    $1205 = $1;
    $0 = $1205;
   }
  } while(0);
  $25 = $7;
  $26 = ((($25)) + 2|0);
  $7 = $26;
 }
 if ((label|0) == 157) {
  $2 = 0;
 }
 else if ((label|0) == 158) {
  $2 = 1;
 }
 else if ((label|0) == 159) {
  _yyerror(13117);
  $2 = 2;
 }
 $1206 = HEAP32[4333]|0;
 $1207 = ($1206|0)!=(0);
 $1208 = HEAP32[4333]|0;
 $1209 = ($1208|0)!=(-2);
 $or$cond9 = $1207 & $1209;
 if ($or$cond9) {
  $1210 = $4;
  _yydestruct(13134,$1210,17336);
 }
 $1211 = $13;
 $1212 = $10;
 $1213 = (0 - ($1211))|0;
 $1214 = (($1212) + ($1213<<3)|0);
 $10 = $1214;
 $1215 = $13;
 $1216 = $7;
 $1217 = (0 - ($1215))|0;
 $1218 = (($1216) + ($1217<<1)|0);
 $7 = $1218;
 while(1) {
  $1219 = $7;
  $1220 = $6;
  $1221 = ($1219|0)!=($1220|0);
  if (!($1221)) {
   break;
  }
  $1222 = $7;
  $1223 = HEAP16[$1222>>1]|0;
  $1224 = $1223 << 16 >> 16;
  $1225 = (12848 + ($1224)|0);
  $1226 = HEAP8[$1225>>0]|0;
  $1227 = $1226&255;
  $1228 = $10;
  _yydestruct(13164,$1227,$1228);
  $1229 = $10;
  $1230 = ((($1229)) + -8|0);
  $10 = $1230;
  $1231 = $7;
  $1232 = ((($1231)) + -2|0);
  $7 = $1232;
 }
 $1233 = $6;
 $1234 = ($1233|0)!=($5|0);
 if (!($1234)) {
  $1236 = $2;
  STACKTOP = sp;return ($1236|0);
 }
 $1235 = $6;
 _free($1235);
 $1236 = $2;
 STACKTOP = sp;return ($1236|0);
}
function _new_HLX() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_hashmap_new()|0);
 HEAP32[4330] = $0;
 return;
}
function _yyerror($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $1 = $0;
 $2 = HEAP32[651]|0;
 (_fflush($2)|0);
 $3 = HEAP32[4329]|0;
 $4 = HEAP32[4329]|0;
 $5 = $1;
 HEAP32[$vararg_buffer>>2] = $3;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = 13200;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = $4;
 $vararg_ptr3 = ((($vararg_buffer)) + 12|0);
 HEAP32[$vararg_ptr3>>2] = $5;
 (_printf(13190,$vararg_buffer)|0);
 STACKTOP = sp;return;
}
function _yydestruct($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $3 = $0;
 $4 = $1;
 $5 = $2;
 $6 = $3;
 $7 = ($6|0)!=(0|0);
 if (!($7)) {
  $3 = 13181;
 }
 STACKTOP = sp;return;
}
function _main() {
 var $0 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $0 = 0;
 _new_HLX();
 HEAP32[$vararg_buffer>>2] = 13221;
 (_printf(12017,$vararg_buffer)|0);
 (_yyparse()|0);
 (_printf(13202,$vararg_buffer1)|0);
 STACKTOP = sp;return 0;
}
function _hashmap_new() {
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = (_malloc(12)|0);
 $1 = $2;
 $3 = $1;
 $4 = ($3|0)!=(0|0);
 if ($4) {
  $5 = (_calloc(256,12)|0);
  $6 = $1;
  $7 = ((($6)) + 8|0);
  HEAP32[$7>>2] = $5;
  $8 = $1;
  $9 = ((($8)) + 8|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = ($10|0)!=(0|0);
  if ($11) {
   $12 = $1;
   HEAP32[$12>>2] = 256;
   $13 = $1;
   $14 = ((($13)) + 4|0);
   HEAP32[$14>>2] = 0;
   $15 = $1;
   $0 = $15;
   $19 = $0;
   STACKTOP = sp;return ($19|0);
  }
 }
 $16 = $1;
 $17 = ($16|0)!=(0|0);
 if ($17) {
  $18 = $1;
  _hashmap_free($18);
 }
 $0 = 0;
 $19 = $0;
 STACKTOP = sp;return ($19|0);
}
function _hashmap_free($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $3 = $1;
 $2 = $3;
 $4 = $2;
 $5 = ((($4)) + 8|0);
 $6 = HEAP32[$5>>2]|0;
 _free($6);
 $7 = $2;
 _free($7);
 STACKTOP = sp;return;
}
function _crc32($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $5 = 0;
 $4 = 0;
 while(1) {
  $6 = $4;
  $7 = $3;
  $8 = ($6>>>0)<($7>>>0);
  $9 = $5;
  if (!($8)) {
   break;
  }
  $10 = $2;
  $11 = $4;
  $12 = (($10) + ($11)|0);
  $13 = HEAP8[$12>>0]|0;
  $14 = $13&255;
  $15 = $9 ^ $14;
  $16 = $15 & 255;
  $17 = (1324 + ($16<<2)|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = $5;
  $20 = $19 >>> 8;
  $21 = $18 ^ $20;
  $5 = $21;
  $22 = $4;
  $23 = (($22) + 1)|0;
  $4 = $23;
 }
 STACKTOP = sp;return ($9|0);
}
function _hashmap_hash_int($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $5 = $3;
 $6 = $3;
 $7 = (_strlen($6)|0);
 $8 = (_crc32($5,$7)|0);
 $4 = $8;
 $9 = $4;
 $10 = $9 << 12;
 $11 = $4;
 $12 = (($11) + ($10))|0;
 $4 = $12;
 $13 = $4;
 $14 = $13 >>> 22;
 $15 = $4;
 $16 = $15 ^ $14;
 $4 = $16;
 $17 = $4;
 $18 = $17 << 4;
 $19 = $4;
 $20 = (($19) + ($18))|0;
 $4 = $20;
 $21 = $4;
 $22 = $21 >>> 9;
 $23 = $4;
 $24 = $23 ^ $22;
 $4 = $24;
 $25 = $4;
 $26 = $25 << 10;
 $27 = $4;
 $28 = (($27) + ($26))|0;
 $4 = $28;
 $29 = $4;
 $30 = $29 >>> 2;
 $31 = $4;
 $32 = $31 ^ $30;
 $4 = $32;
 $33 = $4;
 $34 = $33 << 7;
 $35 = $4;
 $36 = (($35) + ($34))|0;
 $4 = $36;
 $37 = $4;
 $38 = $37 >>> 12;
 $39 = $4;
 $40 = $39 ^ $38;
 $4 = $40;
 $41 = $4;
 $42 = $41 >>> 3;
 $43 = (___muldi3(($42|0),0,-1640531535,0)|0);
 $44 = tempRet0;
 $4 = $43;
 $45 = $4;
 $46 = $2;
 $47 = HEAP32[$46>>2]|0;
 $48 = (($45>>>0) % ($47>>>0))&-1;
 STACKTOP = sp;return ($48|0);
}
function _hashmap_hash($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $3 = $0;
 $4 = $1;
 $8 = $3;
 $7 = $8;
 $9 = $7;
 $10 = ((($9)) + 4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = $7;
 $13 = HEAP32[$12>>2]|0;
 $14 = (($13|0) / 2)&-1;
 $15 = ($11|0)>=($14|0);
 if ($15) {
  $2 = -2;
  $55 = $2;
  STACKTOP = sp;return ($55|0);
 }
 $16 = $7;
 $17 = $4;
 $18 = (_hashmap_hash_int($16,$17)|0);
 $5 = $18;
 $6 = 0;
 while(1) {
  $19 = $6;
  $20 = ($19|0)<(8);
  if (!($20)) {
   label = 11;
   break;
  }
  $21 = $7;
  $22 = ((($21)) + 8|0);
  $23 = HEAP32[$22>>2]|0;
  $24 = $5;
  $25 = (($23) + (($24*12)|0)|0);
  $26 = ((($25)) + 4|0);
  $27 = HEAP32[$26>>2]|0;
  $28 = ($27|0)==(0);
  if ($28) {
   label = 6;
   break;
  }
  $30 = $7;
  $31 = ((($30)) + 8|0);
  $32 = HEAP32[$31>>2]|0;
  $33 = $5;
  $34 = (($32) + (($33*12)|0)|0);
  $35 = ((($34)) + 4|0);
  $36 = HEAP32[$35>>2]|0;
  $37 = ($36|0)==(1);
  if ($37) {
   $38 = $7;
   $39 = ((($38)) + 8|0);
   $40 = HEAP32[$39>>2]|0;
   $41 = $5;
   $42 = (($40) + (($41*12)|0)|0);
   $43 = HEAP32[$42>>2]|0;
   $44 = $4;
   $45 = (_strcmp($43,$44)|0);
   $46 = ($45|0)==(0);
   if ($46) {
    label = 9;
    break;
   }
  }
  $48 = $5;
  $49 = (($48) + 1)|0;
  $50 = $7;
  $51 = HEAP32[$50>>2]|0;
  $52 = (($49|0) % ($51|0))&-1;
  $5 = $52;
  $53 = $6;
  $54 = (($53) + 1)|0;
  $6 = $54;
 }
 if ((label|0) == 6) {
  $29 = $5;
  $2 = $29;
  $55 = $2;
  STACKTOP = sp;return ($55|0);
 }
 else if ((label|0) == 9) {
  $47 = $5;
  $2 = $47;
  $55 = $2;
  STACKTOP = sp;return ($55|0);
 }
 else if ((label|0) == 11) {
  $2 = -2;
  $55 = $2;
  STACKTOP = sp;return ($55|0);
 }
 return (0)|0;
}
function _hashmap_rehash($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $2 = $0;
 $9 = $2;
 $6 = $9;
 $10 = $6;
 $11 = HEAP32[$10>>2]|0;
 $12 = $11<<1;
 $13 = (_calloc($12,12)|0);
 $7 = $13;
 $14 = $7;
 $15 = ($14|0)!=(0|0);
 if (!($15)) {
  $1 = -1;
  $55 = $1;
  STACKTOP = sp;return ($55|0);
 }
 $16 = $6;
 $17 = ((($16)) + 8|0);
 $18 = HEAP32[$17>>2]|0;
 $5 = $18;
 $19 = $7;
 $20 = $6;
 $21 = ((($20)) + 8|0);
 HEAP32[$21>>2] = $19;
 $22 = $6;
 $23 = HEAP32[$22>>2]|0;
 $4 = $23;
 $24 = $6;
 $25 = HEAP32[$24>>2]|0;
 $26 = $25<<1;
 $27 = $6;
 HEAP32[$27>>2] = $26;
 $28 = $6;
 $29 = ((($28)) + 4|0);
 HEAP32[$29>>2] = 0;
 $3 = 0;
 while(1) {
  $30 = $3;
  $31 = $4;
  $32 = ($30|0)<($31|0);
  $33 = $5;
  if (!($32)) {
   label = 9;
   break;
  }
  $34 = $3;
  $35 = (($33) + (($34*12)|0)|0);
  $36 = ((($35)) + 4|0);
  $37 = HEAP32[$36>>2]|0;
  $38 = ($37|0)==(0);
  if (!($38)) {
   $39 = $6;
   $40 = $5;
   $41 = $3;
   $42 = (($40) + (($41*12)|0)|0);
   $43 = HEAP32[$42>>2]|0;
   $44 = $5;
   $45 = $3;
   $46 = (($44) + (($45*12)|0)|0);
   $47 = ((($46)) + 8|0);
   $48 = HEAP32[$47>>2]|0;
   $49 = (_hashmap_put($39,$43,$48)|0);
   $8 = $49;
   $50 = $8;
   $51 = ($50|0)!=(0);
   if ($51) {
    label = 7;
    break;
   }
  }
  $53 = $3;
  $54 = (($53) + 1)|0;
  $3 = $54;
 }
 if ((label|0) == 7) {
  $52 = $8;
  $1 = $52;
  $55 = $1;
  STACKTOP = sp;return ($55|0);
 }
 else if ((label|0) == 9) {
  _free($33);
  $1 = 0;
  $55 = $1;
  STACKTOP = sp;return ($55|0);
 }
 return (0)|0;
}
function _hashmap_put($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $4 = $0;
 $5 = $1;
 $6 = $2;
 $9 = $4;
 $8 = $9;
 $10 = $4;
 $11 = $5;
 $12 = (_hashmap_hash($10,$11)|0);
 $7 = $12;
 while(1) {
  $13 = $7;
  $14 = ($13|0)==(-2);
  if (!($14)) {
   label = 6;
   break;
  }
  $15 = $4;
  $16 = (_hashmap_rehash($15)|0);
  $17 = ($16|0)==(-1);
  if ($17) {
   label = 4;
   break;
  }
  $18 = $4;
  $19 = $5;
  $20 = (_hashmap_hash($18,$19)|0);
  $7 = $20;
 }
 if ((label|0) == 4) {
  $3 = -1;
  $44 = $3;
  STACKTOP = sp;return ($44|0);
 }
 else if ((label|0) == 6) {
  $21 = $6;
  $22 = $8;
  $23 = ((($22)) + 8|0);
  $24 = HEAP32[$23>>2]|0;
  $25 = $7;
  $26 = (($24) + (($25*12)|0)|0);
  $27 = ((($26)) + 8|0);
  HEAP32[$27>>2] = $21;
  $28 = $5;
  $29 = $8;
  $30 = ((($29)) + 8|0);
  $31 = HEAP32[$30>>2]|0;
  $32 = $7;
  $33 = (($31) + (($32*12)|0)|0);
  HEAP32[$33>>2] = $28;
  $34 = $8;
  $35 = ((($34)) + 8|0);
  $36 = HEAP32[$35>>2]|0;
  $37 = $7;
  $38 = (($36) + (($37*12)|0)|0);
  $39 = ((($38)) + 4|0);
  HEAP32[$39>>2] = 1;
  $40 = $8;
  $41 = ((($40)) + 4|0);
  $42 = HEAP32[$41>>2]|0;
  $43 = (($42) + 1)|0;
  HEAP32[$41>>2] = $43;
  $3 = 0;
  $44 = $3;
  STACKTOP = sp;return ($44|0);
 }
 return (0)|0;
}
function _hashmap_get($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $4 = $0;
 $5 = $1;
 $6 = $2;
 $11 = $4;
 $9 = $11;
 $12 = $9;
 $13 = $5;
 $14 = (_hashmap_hash_int($12,$13)|0);
 $7 = $14;
 $8 = 0;
 while(1) {
  $15 = $8;
  $16 = ($15|0)<(8);
  if (!($16)) {
   label = 7;
   break;
  }
  $17 = $9;
  $18 = ((($17)) + 8|0);
  $19 = HEAP32[$18>>2]|0;
  $20 = $7;
  $21 = (($19) + (($20*12)|0)|0);
  $22 = ((($21)) + 4|0);
  $23 = HEAP32[$22>>2]|0;
  $10 = $23;
  $24 = $10;
  $25 = ($24|0)==(1);
  if ($25) {
   $26 = $9;
   $27 = ((($26)) + 8|0);
   $28 = HEAP32[$27>>2]|0;
   $29 = $7;
   $30 = (($28) + (($29*12)|0)|0);
   $31 = HEAP32[$30>>2]|0;
   $32 = $5;
   $33 = (_strcmp($31,$32)|0);
   $34 = ($33|0)==(0);
   if ($34) {
    label = 5;
    break;
   }
  }
  $43 = $7;
  $44 = (($43) + 1)|0;
  $45 = $9;
  $46 = HEAP32[$45>>2]|0;
  $47 = (($44|0) % ($46|0))&-1;
  $7 = $47;
  $48 = $8;
  $49 = (($48) + 1)|0;
  $8 = $49;
 }
 if ((label|0) == 5) {
  $35 = $9;
  $36 = ((($35)) + 8|0);
  $37 = HEAP32[$36>>2]|0;
  $38 = $7;
  $39 = (($37) + (($38*12)|0)|0);
  $40 = ((($39)) + 8|0);
  $41 = HEAP32[$40>>2]|0;
  $42 = $6;
  HEAP32[$42>>2] = $41;
  $3 = 0;
  $51 = $3;
  STACKTOP = sp;return ($51|0);
 }
 else if ((label|0) == 7) {
  $50 = $6;
  HEAP32[$50>>2] = 0;
  $3 = -3;
  $51 = $3;
  STACKTOP = sp;return ($51|0);
 }
 return (0)|0;
}
function _hashmap_remove($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $3 = $0;
 $4 = $1;
 $9 = $3;
 $7 = $9;
 $10 = $7;
 $11 = $4;
 $12 = (_hashmap_hash_int($10,$11)|0);
 $6 = $12;
 $5 = 0;
 while(1) {
  $13 = $5;
  $14 = ($13|0)<(8);
  if (!($14)) {
   label = 7;
   break;
  }
  $15 = $7;
  $16 = ((($15)) + 8|0);
  $17 = HEAP32[$16>>2]|0;
  $18 = $6;
  $19 = (($17) + (($18*12)|0)|0);
  $20 = ((($19)) + 4|0);
  $21 = HEAP32[$20>>2]|0;
  $8 = $21;
  $22 = $8;
  $23 = ($22|0)==(1);
  if ($23) {
   $24 = $7;
   $25 = ((($24)) + 8|0);
   $26 = HEAP32[$25>>2]|0;
   $27 = $6;
   $28 = (($26) + (($27*12)|0)|0);
   $29 = HEAP32[$28>>2]|0;
   $30 = $4;
   $31 = (_strcmp($29,$30)|0);
   $32 = ($31|0)==(0);
   if ($32) {
    label = 5;
    break;
   }
  }
  $61 = $6;
  $62 = (($61) + 1)|0;
  $63 = $7;
  $64 = HEAP32[$63>>2]|0;
  $65 = (($62|0) % ($64|0))&-1;
  $6 = $65;
  $66 = $5;
  $67 = (($66) + 1)|0;
  $5 = $67;
 }
 if ((label|0) == 5) {
  $33 = $7;
  $34 = ((($33)) + 8|0);
  $35 = HEAP32[$34>>2]|0;
  $36 = $6;
  $37 = (($35) + (($36*12)|0)|0);
  $38 = ((($37)) + 8|0);
  $39 = HEAP32[$38>>2]|0;
  _free($39);
  $40 = $7;
  $41 = ((($40)) + 8|0);
  $42 = HEAP32[$41>>2]|0;
  $43 = $6;
  $44 = (($42) + (($43*12)|0)|0);
  $45 = ((($44)) + 4|0);
  HEAP32[$45>>2] = 0;
  $46 = $7;
  $47 = ((($46)) + 8|0);
  $48 = HEAP32[$47>>2]|0;
  $49 = $6;
  $50 = (($48) + (($49*12)|0)|0);
  $51 = ((($50)) + 8|0);
  HEAP32[$51>>2] = 0;
  $52 = $7;
  $53 = ((($52)) + 8|0);
  $54 = HEAP32[$53>>2]|0;
  $55 = $6;
  $56 = (($54) + (($55*12)|0)|0);
  HEAP32[$56>>2] = 0;
  $57 = $7;
  $58 = ((($57)) + 4|0);
  $59 = HEAP32[$58>>2]|0;
  $60 = (($59) + -1)|0;
  HEAP32[$58>>2] = $60;
  $2 = 0;
  $68 = $2;
  STACKTOP = sp;return ($68|0);
 }
 else if ((label|0) == 7) {
  $2 = -3;
  $68 = $2;
  STACKTOP = sp;return ($68|0);
 }
 return (0)|0;
}
function _cat($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $5 = $2;
 $6 = (_strlen($5)|0);
 $7 = $3;
 $8 = (_strlen($7)|0);
 $9 = (($6) + ($8))|0;
 $10 = $9<<2;
 $11 = (1 + ($10))|0;
 $12 = (_malloc($11)|0);
 $4 = $12;
 $13 = $4;
 $14 = $2;
 (_strcpy($13,$14)|0);
 $15 = $4;
 $16 = $3;
 (_strcat($15,$16)|0);
 $17 = $4;
 STACKTOP = sp;return ($17|0);
}
function _genrange_dc($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$alloca_mul = 0, $10 = 0.0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $29 = 0, $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0, $37 = 0, $38 = 0.0, $39 = 0, $4 = 0.0, $40 = 0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0, $45 = 0.0;
 var $46 = 0.0, $47 = 0.0, $48 = 0, $49 = 0, $5 = 0.0, $50 = 0.0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0.0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0;
 var $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $7 = 0, $8 = 0, $9 = 0.0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 80|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(80|0);
 $vararg_buffer1 = sp + 40|0;
 $vararg_buffer = sp + 32|0;
 $2 = $0;
 $3 = $1;
 $12 = $2;
 $13 = (+_atof($12));
 $4 = $13;
 $14 = $3;
 $15 = (+_atof($14));
 $5 = $15;
 $16 = $2;
 $17 = (_strlen($16)|0);
 $18 = $3;
 $19 = (_strlen($18)|0);
 $20 = ($17>>>0)>($19>>>0);
 if ($20) {
  $21 = $2;
  $22 = (_strlen($21)|0);
  $23 = (($22) + 1)|0;
  $6 = $23;
 } else {
  $24 = $3;
  $25 = (_strlen($24)|0);
  $26 = (($25) + 1)|0;
  $6 = $26;
 }
 $27 = $6;
 $28 = (_llvm_stacksave()|0);
 $7 = $28;
 $$alloca_mul = $27;
 $29 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(((((1*$$alloca_mul)|0)+15)&-16)|0);;
 $8 = 17921;
 $30 = $4;
 $31 = $5;
 $32 = $30 < $31;
 if ($32) {
  $33 = $4;
  $9 = $33;
  while(1) {
   $34 = $9;
   $35 = $5;
   $36 = $34 <= $35;
   if (!($36)) {
    break;
   }
   $37 = $6;
   $38 = $9;
   HEAPF64[$vararg_buffer>>3] = $38;
   (_snprintf($29,$37,14797,$vararg_buffer)|0);
   $39 = $8;
   $40 = (_cat(14800,$29)|0);
   $41 = (_cat($40,14802)|0);
   $42 = (_cat($39,$41)|0);
   $8 = $42;
   $43 = $9;
   $44 = $43 + 1.0;
   $9 = $44;
  }
  $57 = $8;
  $58 = (_strlen($57)|0);
  $11 = $58;
  $59 = $8;
  $60 = $8;
  $61 = $11;
  $62 = (($61) - 1)|0;
  _memmove(($59|0),($60|0),($62|0))|0;
  $63 = $8;
  $64 = $11;
  $65 = (($64) - 1)|0;
  $66 = (($63) + ($65)|0);
  HEAP8[$66>>0] = 0;
  $67 = $8;
  $68 = $7;
  _llvm_stackrestore(($68|0));
  STACKTOP = sp;return ($67|0);
 } else {
  $45 = $5;
  $10 = $45;
  while(1) {
   $46 = $10;
   $47 = $4;
   $48 = $46 >= $47;
   if (!($48)) {
    break;
   }
   $49 = $6;
   $50 = $10;
   HEAPF64[$vararg_buffer1>>3] = $50;
   (_snprintf($29,$49,14797,$vararg_buffer1)|0);
   $51 = $8;
   $52 = (_cat(14800,$29)|0);
   $53 = (_cat($52,14802)|0);
   $54 = (_cat($51,$53)|0);
   $8 = $54;
   $55 = $10;
   $56 = $55 + -1.0;
   $10 = $56;
  }
  $57 = $8;
  $58 = (_strlen($57)|0);
  $11 = $58;
  $59 = $8;
  $60 = $8;
  $61 = $11;
  $62 = (($61) - 1)|0;
  _memmove(($59|0),($60|0),($62|0))|0;
  $63 = $8;
  $64 = $11;
  $65 = (($64) - 1)|0;
  $66 = (($63) + ($65)|0);
  HEAP8[$66>>0] = 0;
  $67 = $8;
  $68 = $7;
  _llvm_stackrestore(($68|0));
  STACKTOP = sp;return ($67|0);
 }
 return (0)|0;
}
function _genrange_da($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$alloca_mul = 0, $10 = 0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0.0, $19 = 0, $20 = 0.0, $21 = 0, $22 = 0.0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0.0, $38 = 0.0, $39 = 0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0;
 var $47 = 0, $48 = 0.0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0.0, $60 = 0.0, $61 = 0.0, $62 = 0, $63 = 0, $64 = 0.0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0.0, $7 = 0.0, $70 = 0.0, $71 = 0.0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0, $81 = 0, $82 = 0;
 var $83 = 0, $9 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(112|0);
 $vararg_buffer1 = sp + 64|0;
 $vararg_buffer = sp + 56|0;
 $3 = $0;
 $4 = $1;
 $5 = $2;
 $17 = $3;
 $18 = (+_atof($17));
 $6 = $18;
 $19 = $4;
 $20 = (+_atof($19));
 $7 = $20;
 $21 = $5;
 $22 = (+_atof($21));
 $8 = $22;
 $23 = $3;
 $24 = (_strlen($23)|0);
 $25 = $5;
 $26 = (_strlen($25)|0);
 $27 = ($24>>>0)>($26>>>0);
 if ($27) {
  $28 = $3;
  $29 = (_strlen($28)|0);
  $30 = (($29) + 1)|0;
  $9 = $30;
 } else {
  $31 = $5;
  $32 = (_strlen($31)|0);
  $33 = (($32) + 1)|0;
  $9 = $33;
 }
 $34 = $9;
 $35 = (_llvm_stacksave()|0);
 $10 = $35;
 $$alloca_mul = $34;
 $36 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(((((1*$$alloca_mul)|0)+15)&-16)|0);;
 $11 = 17921;
 $37 = $6;
 $38 = $7;
 $39 = $37 < $38;
 if ($39) {
  $40 = $7;
  $41 = $6;
  $42 = $40 - $41;
  $12 = $42;
  $43 = $6;
  $13 = $43;
  while(1) {
   $44 = $13;
   $45 = $8;
   $46 = $44 <= $45;
   if (!($46)) {
    break;
   }
   $47 = $9;
   $48 = $13;
   HEAPF64[$vararg_buffer>>3] = $48;
   (_snprintf($36,$47,14797,$vararg_buffer)|0);
   $49 = $11;
   $50 = (_cat(14800,$36)|0);
   $51 = (_cat($50,14802)|0);
   $52 = (_cat($49,$51)|0);
   $11 = $52;
   $53 = $12;
   $54 = $13;
   $55 = $54 + $53;
   $13 = $55;
  }
  $72 = $11;
  $73 = (_strlen($72)|0);
  $16 = $73;
  $74 = $11;
  $75 = $11;
  $76 = $16;
  $77 = (($76) - 1)|0;
  _memmove(($74|0),($75|0),($77|0))|0;
  $78 = $11;
  $79 = $16;
  $80 = (($79) - 1)|0;
  $81 = (($78) + ($80)|0);
  HEAP8[$81>>0] = 0;
  $82 = $11;
  $83 = $10;
  _llvm_stackrestore(($83|0));
  STACKTOP = sp;return ($82|0);
 } else {
  $56 = $6;
  $57 = $7;
  $58 = $56 - $57;
  $14 = $58;
  $59 = $6;
  $15 = $59;
  while(1) {
   $60 = $15;
   $61 = $8;
   $62 = $60 >= $61;
   if (!($62)) {
    break;
   }
   $63 = $9;
   $64 = $15;
   HEAPF64[$vararg_buffer1>>3] = $64;
   (_snprintf($36,$63,14797,$vararg_buffer1)|0);
   $65 = $11;
   $66 = (_cat(14800,$36)|0);
   $67 = (_cat($66,14802)|0);
   $68 = (_cat($65,$67)|0);
   $11 = $68;
   $69 = $14;
   $70 = $15;
   $71 = $70 - $69;
   $15 = $71;
  }
  $72 = $11;
  $73 = (_strlen($72)|0);
  $16 = $73;
  $74 = $11;
  $75 = $11;
  $76 = $16;
  $77 = (($76) - 1)|0;
  _memmove(($74|0),($75|0),($77|0))|0;
  $78 = $11;
  $79 = $16;
  $80 = (($79) - 1)|0;
  $81 = (($78) + ($80)|0);
  HEAP8[$81>>0] = 0;
  $82 = $11;
  $83 = $10;
  _llvm_stackrestore(($83|0));
  STACKTOP = sp;return ($82|0);
 }
 return (0)|0;
}
function _genrange_sc($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$alloca_mul = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0;
 var $9 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $3 = $0;
 $4 = $1;
 $5 = $2;
 $6 = 17921;
 $15 = $3;
 $16 = (_cat(14800,$15)|0);
 $17 = (_cat($16,14805)|0);
 $18 = $3;
 $19 = (_cat($17,$18)|0);
 $20 = (_cat($19,14802)|0);
 $7 = $20;
 $21 = $4;
 $22 = (_strlen($21)|0);
 $8 = $22;
 $23 = $5;
 $24 = (_strlen($23)|0);
 $9 = $24;
 $25 = $8;
 $26 = $9;
 $27 = ($25|0)>($26|0);
 if ($27) {
  $28 = $8;
  $29 = (($28) + 6)|0;
  $10 = $29;
 } else {
  $30 = $9;
  $31 = (($30) + 6)|0;
  $10 = $31;
 }
 $32 = $10;
 $33 = (_llvm_stacksave()|0);
 $11 = $33;
 $$alloca_mul = $32;
 $34 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(((((1*$$alloca_mul)|0)+15)&-16)|0);;
 $35 = $4;
 $36 = $5;
 $37 = (_strcmp($35,$36)|0);
 $38 = ($37|0)<(0);
 if ($38) {
  $39 = $4;
  $40 = HEAP8[$39>>0]|0;
  $12 = $40;
  while(1) {
   $41 = $12;
   $42 = $41 << 24 >> 24;
   $43 = $5;
   $44 = HEAP8[$43>>0]|0;
   $45 = $44 << 24 >> 24;
   $46 = ($42|0)<=($45|0);
   if (!($46)) {
    break;
   }
   $47 = $10;
   $48 = $7;
   $49 = $12;
   $50 = $49 << 24 >> 24;
   HEAP32[$vararg_buffer>>2] = $50;
   (_snprintf($34,$47,$48,$vararg_buffer)|0);
   $51 = $6;
   $52 = (_cat($51,$34)|0);
   $6 = $52;
   $53 = $12;
   $54 = (($53) + 1)<<24>>24;
   $12 = $54;
  }
  $71 = $6;
  $72 = (_strlen($71)|0);
  $14 = $72;
  $73 = $6;
  $74 = $6;
  $75 = $14;
  $76 = (($75) - 1)|0;
  _memmove(($73|0),($74|0),($76|0))|0;
  $77 = $6;
  $78 = $14;
  $79 = (($78) - 1)|0;
  $80 = (($77) + ($79)|0);
  HEAP8[$80>>0] = 0;
  $81 = $6;
  $82 = $11;
  _llvm_stackrestore(($82|0));
  STACKTOP = sp;return ($81|0);
 } else {
  $55 = $5;
  $56 = HEAP8[$55>>0]|0;
  $13 = $56;
  while(1) {
   $57 = $13;
   $58 = $57 << 24 >> 24;
   $59 = $4;
   $60 = HEAP8[$59>>0]|0;
   $61 = $60 << 24 >> 24;
   $62 = ($58|0)>=($61|0);
   if (!($62)) {
    break;
   }
   $63 = $10;
   $64 = $7;
   $65 = $13;
   $66 = $65 << 24 >> 24;
   HEAP32[$vararg_buffer1>>2] = $66;
   (_snprintf($34,$63,$64,$vararg_buffer1)|0);
   $67 = $6;
   $68 = (_cat($67,$34)|0);
   $6 = $68;
   $69 = $13;
   $70 = (($69) + -1)<<24>>24;
   $13 = $70;
  }
  $71 = $6;
  $72 = (_strlen($71)|0);
  $14 = $72;
  $73 = $6;
  $74 = $6;
  $75 = $14;
  $76 = (($75) - 1)|0;
  _memmove(($73|0),($74|0),($76|0))|0;
  $77 = $6;
  $78 = $14;
  $79 = (($78) - 1)|0;
  $80 = (($77) + ($79)|0);
  HEAP8[$80>>0] = 0;
  $81 = $6;
  $82 = $11;
  _llvm_stackrestore(($82|0));
  STACKTOP = sp;return ($81|0);
 }
 return (0)|0;
}
function _genrange_sa($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $$alloca_mul = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0;
 var $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0;
 var $84 = 0, $9 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $4 = $0;
 $5 = $1;
 $6 = $2;
 $7 = $3;
 $8 = 17921;
 $17 = $4;
 $18 = (_cat(14800,$17)|0);
 $19 = (_cat($18,14805)|0);
 $20 = $4;
 $21 = (_cat($19,$20)|0);
 $22 = (_cat($21,14802)|0);
 $9 = $22;
 $23 = $5;
 $24 = (_strlen($23)|0);
 $10 = $24;
 $25 = $7;
 $26 = (_strlen($25)|0);
 $11 = $26;
 $27 = $10;
 $28 = $11;
 $29 = ($27|0)>($28|0);
 if ($29) {
  $30 = $10;
  $31 = (($30) + 6)|0;
  $12 = $31;
 } else {
  $32 = $11;
  $33 = (($32) + 6)|0;
  $12 = $33;
 }
 $34 = $12;
 $35 = (_llvm_stacksave()|0);
 $13 = $35;
 $$alloca_mul = $34;
 $36 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(((((1*$$alloca_mul)|0)+15)&-16)|0);;
 $37 = $5;
 $38 = $7;
 $39 = (_strcmp($37,$38)|0);
 $40 = ($39|0)<(0);
 if ($40) {
  $41 = $5;
  $42 = HEAP8[$41>>0]|0;
  $14 = $42;
  while(1) {
   $43 = $14;
   $44 = $43 << 24 >> 24;
   $45 = $7;
   $46 = HEAP8[$45>>0]|0;
   $47 = $46 << 24 >> 24;
   $48 = ($44|0)<=($47|0);
   if (!($48)) {
    break;
   }
   $49 = $12;
   $50 = $9;
   $51 = $14;
   $52 = $51 << 24 >> 24;
   HEAP32[$vararg_buffer>>2] = $52;
   (_snprintf($36,$49,$50,$vararg_buffer)|0);
   $53 = $8;
   $54 = (_cat($53,$36)|0);
   $8 = $54;
   $55 = $14;
   $56 = (($55) + 1)<<24>>24;
   $14 = $56;
  }
  $73 = $8;
  $74 = (_strlen($73)|0);
  $16 = $74;
  $75 = $8;
  $76 = $8;
  $77 = $16;
  $78 = (($77) - 1)|0;
  _memmove(($75|0),($76|0),($78|0))|0;
  $79 = $8;
  $80 = $16;
  $81 = (($80) - 1)|0;
  $82 = (($79) + ($81)|0);
  HEAP8[$82>>0] = 0;
  $83 = $8;
  $84 = $13;
  _llvm_stackrestore(($84|0));
  STACKTOP = sp;return ($83|0);
 } else {
  $57 = $7;
  $58 = HEAP8[$57>>0]|0;
  $15 = $58;
  while(1) {
   $59 = $15;
   $60 = $59 << 24 >> 24;
   $61 = $5;
   $62 = HEAP8[$61>>0]|0;
   $63 = $62 << 24 >> 24;
   $64 = ($60|0)>=($63|0);
   if (!($64)) {
    break;
   }
   $65 = $12;
   $66 = $9;
   $67 = $15;
   $68 = $67 << 24 >> 24;
   HEAP32[$vararg_buffer1>>2] = $68;
   (_snprintf($36,$65,$66,$vararg_buffer1)|0);
   $69 = $8;
   $70 = (_cat($69,$36)|0);
   $8 = $70;
   $71 = $15;
   $72 = (($71) + -1)<<24>>24;
   $15 = $72;
  }
  $73 = $8;
  $74 = (_strlen($73)|0);
  $16 = $74;
  $75 = $8;
  $76 = $8;
  $77 = $16;
  $78 = (($77) - 1)|0;
  _memmove(($75|0),($76|0),($78|0))|0;
  $79 = $8;
  $80 = $16;
  $81 = (($80) - 1)|0;
  $82 = (($79) + ($81)|0);
  HEAP8[$82>>0] = 0;
  $83 = $8;
  $84 = $13;
  _llvm_stackrestore(($84|0));
  STACKTOP = sp;return ($83|0);
 }
 return (0)|0;
}
function _llcat($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $3 = $0;
 $4 = $1;
 $6 = $3;
 $7 = ($6|0)==(0|0);
 if ($7) {
  $8 = $4;
  $2 = $8;
  $21 = $2;
  STACKTOP = sp;return ($21|0);
 }
 $9 = $3;
 $5 = $9;
 while(1) {
  $10 = $3;
  $11 = ((($10)) + 4|0);
  $12 = HEAP32[$11>>2]|0;
  $13 = ($12|0)!=(0|0);
  if (!($13)) {
   break;
  }
  $14 = $3;
  $15 = ((($14)) + 4|0);
  $16 = HEAP32[$15>>2]|0;
  $3 = $16;
 }
 $17 = $4;
 $18 = $3;
 $19 = ((($18)) + 4|0);
 HEAP32[$19>>2] = $17;
 $20 = $5;
 $2 = $20;
 $21 = $2;
 STACKTOP = sp;return ($21|0);
}
function _end_scope($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0;
 var $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $vararg_buffer = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 304|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(304|0);
 $vararg_buffer = sp;
 $6 = sp + 40|0;
 $3 = $0;
 $4 = $1;
 $12 = $3;
 $13 = ($12|0)==(0|0);
 if ($13) {
  $2 = 17921;
  $99 = $2;
  STACKTOP = sp;return ($99|0);
 }
 $5 = 14808;
 $14 = $4;
 $15 = ($14|0)==(0|0);
 L5: do {
  if (!($15)) {
   $16 = (_malloc(8)|0);
   $7 = $16;
   $17 = $7;
   HEAP32[$17>>2] = 0;
   $18 = $3;
   $19 = $7;
   $20 = ((($19)) + 4|0);
   HEAP32[$20>>2] = $18;
   $21 = $7;
   $3 = $21;
   $22 = $3;
   $8 = $22;
   $23 = $3;
   $24 = ((($23)) + 4|0);
   $25 = HEAP32[$24>>2]|0;
   $9 = $25;
   $26 = $4;
   $10 = $26;
   while(1) {
    $27 = $9;
    $28 = HEAP32[$27>>2]|0;
    $29 = $10;
    $30 = HEAP32[$29>>2]|0;
    $31 = (_strcmp($28,$30)|0);
    $32 = ($31|0)==(0);
    if ($32) {
     $33 = $9;
     $11 = $33;
     $34 = $9;
     $35 = ((($34)) + 4|0);
     $36 = HEAP32[$35>>2]|0;
     $37 = ($36|0)!=(0|0);
     if (!($37)) {
      break;
     }
     $38 = $9;
     $39 = ((($38)) + 4|0);
     $40 = HEAP32[$39>>2]|0;
     $41 = $8;
     $42 = ((($41)) + 4|0);
     HEAP32[$42>>2] = $40;
     $43 = $9;
     $44 = ((($43)) + 4|0);
     $45 = HEAP32[$44>>2]|0;
     $9 = $45;
     $46 = $11;
     _free($46);
     $47 = $4;
     $10 = $47;
     continue;
    }
    $50 = $10;
    $51 = ((($50)) + 4|0);
    $52 = HEAP32[$51>>2]|0;
    $53 = ($52|0)!=(0|0);
    if ($53) {
     $54 = $10;
     $55 = ((($54)) + 4|0);
     $56 = HEAP32[$55>>2]|0;
     $10 = $56;
     continue;
    }
    $57 = $9;
    $58 = ((($57)) + 4|0);
    $59 = HEAP32[$58>>2]|0;
    $60 = ($59|0)!=(0|0);
    if (!($60)) {
     break L5;
    }
    $61 = $9;
    $62 = ((($61)) + 4|0);
    $63 = HEAP32[$62>>2]|0;
    $9 = $63;
    $64 = $8;
    $65 = ((($64)) + 4|0);
    $66 = HEAP32[$65>>2]|0;
    $8 = $66;
    $67 = $4;
    $10 = $67;
   }
   $48 = $8;
   $49 = ((($48)) + 4|0);
   HEAP32[$49>>2] = 0;
  }
 } while(0);
 while(1) {
  $68 = $3;
  $69 = HEAP32[$68>>2]|0;
  $70 = ($69|0)!=(0|0);
  if ($70) {
   $71 = $5;
   $72 = $3;
   $73 = HEAP32[$72>>2]|0;
   $74 = (_cat($71,$73)|0);
   $5 = $74;
   $75 = $3;
   $76 = HEAP32[$75>>2]|0;
   HEAP32[$vararg_buffer>>2] = $76;
   (_snprintf($6,256,14813,$vararg_buffer)|0);
   $77 = HEAP32[4330]|0;
   (_hashmap_remove($77,$6)|0);
   $78 = $3;
   $79 = ((($78)) + 4|0);
   $80 = HEAP32[$79>>2]|0;
   $81 = ($80|0)!=(0|0);
   if (!($81)) {
    break;
   }
   $82 = $5;
   $83 = (_cat($82,14816)|0);
   $5 = $83;
   $84 = $3;
   $85 = ((($84)) + 4|0);
   $86 = HEAP32[$85>>2]|0;
   $3 = $86;
   continue;
  } else {
   $87 = $3;
   $88 = ((($87)) + 4|0);
   $89 = HEAP32[$88>>2]|0;
   $90 = ($89|0)!=(0|0);
   if (!($90)) {
    break;
   }
   $91 = $3;
   $92 = ((($91)) + 4|0);
   $93 = HEAP32[$92>>2]|0;
   $3 = $93;
   continue;
  }
 }
 $94 = $5;
 $95 = (_strlen($94)|0);
 $96 = ($95|0)!=(4);
 if ($96) {
  $97 = $5;
  $98 = (_cat($97,14818)|0);
  $2 = $98;
  $99 = $2;
  STACKTOP = sp;return ($99|0);
 } else {
  $2 = 17921;
  $99 = $2;
  STACKTOP = sp;return ($99|0);
 }
 return (0)|0;
}
function _var_clean($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0;
 var $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $6 = sp + 20|0;
 $1 = $0;
 $7 = $1;
 $8 = (___strdup($7)|0);
 $2 = $8;
 $9 = $2;
 $10 = (_strlen($9)|0);
 $3 = $10;
 $4 = 17921;
 $5 = 0;
 L1: while(1) {
  $11 = $5;
  $12 = $3;
  $13 = ($11|0)<($12|0);
  if (!($13)) {
   label = 15;
   break;
  }
  $14 = $5;
  $15 = ($14|0)==(4);
  if ($15) {
   $16 = $2;
   $17 = $5;
   $18 = (($16) + ($17)|0);
   $19 = HEAP8[$18>>0]|0;
   $20 = $19 << 24 >> 24;
   $21 = ($20|0)==(46);
   if ($21) {
    $22 = $4;
    $23 = (_strcmp($22,14820)|0);
    $24 = ($23|0)==(0);
    if ($24) {
     $4 = 17921;
    } else {
     label = 7;
    }
   } else {
    label = 7;
   }
  } else {
   label = 7;
  }
  if ((label|0) == 7) {
   label = 0;
   $25 = $2;
   $26 = $5;
   $27 = (($25) + ($26)|0);
   $28 = HEAP8[$27>>0]|0;
   $29 = $28 << 24 >> 24;
   $30 = (64)<($29|0);
   if ($30) {
    $31 = $2;
    $32 = $5;
    $33 = (($31) + ($32)|0);
    $34 = HEAP8[$33>>0]|0;
    $35 = $34 << 24 >> 24;
    $36 = ($35|0)<(91);
    if (!($36)) {
     label = 9;
    }
   } else {
    label = 9;
   }
   do {
    if ((label|0) == 9) {
     label = 0;
     $37 = $2;
     $38 = $5;
     $39 = (($37) + ($38)|0);
     $40 = HEAP8[$39>>0]|0;
     $41 = $40 << 24 >> 24;
     $42 = (96)<($41|0);
     if ($42) {
      $43 = $2;
      $44 = $5;
      $45 = (($43) + ($44)|0);
      $46 = HEAP8[$45>>0]|0;
      $47 = $46 << 24 >> 24;
      $48 = ($47|0)<(123);
      if ($48) {
       break;
      }
     }
     $49 = $2;
     $50 = $5;
     $51 = (($49) + ($50)|0);
     $52 = HEAP8[$51>>0]|0;
     $53 = $52 << 24 >> 24;
     $54 = ($53|0)==(95);
     if (!($54)) {
      $55 = $2;
      $56 = $5;
      $57 = (($55) + ($56)|0);
      $58 = HEAP8[$57>>0]|0;
      $59 = $58 << 24 >> 24;
      $60 = ($59|0)==(36);
      if (!($60)) {
       label = 15;
       break L1;
      }
     }
    }
   } while(0);
   $61 = $2;
   $62 = $5;
   $63 = (($61) + ($62)|0);
   $64 = HEAP8[$63>>0]|0;
   HEAP8[$6>>0] = $64;
   $65 = ((($6)) + 1|0);
   HEAP8[$65>>0] = 0;
   $66 = $4;
   $67 = (_cat($66,$6)|0);
   $4 = $67;
  }
  $68 = $5;
  $69 = (($68) + 1)|0;
  $5 = $69;
 }
 if ((label|0) == 15) {
  $70 = $4;
  STACKTOP = sp;return ($70|0);
 }
 return (0)|0;
}
function _var_declare($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 304|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(304|0);
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $7 = sp + 24|0;
 $9 = sp + 40|0;
 $4 = $0;
 $5 = $1;
 $6 = $2;
 $12 = $4;
 $13 = (_var_clean($12)|0);
 $8 = $13;
 $14 = $8;
 HEAP32[$vararg_buffer>>2] = $14;
 (_snprintf($9,256,14813,$vararg_buffer)|0);
 $15 = HEAP32[4330]|0;
 $16 = (_hashmap_get($15,$9,$7)|0);
 $10 = $16;
 $17 = $10;
 $18 = ($17|0)==(-3);
 do {
  if ($18) {
   $19 = (_malloc(4)|0);
   HEAP32[$7>>2] = $19;
   $20 = HEAP32[$7>>2]|0;
   $21 = $8;
   HEAP32[$vararg_buffer1>>2] = $21;
   (_snprintf($20,256,14813,$vararg_buffer1)|0);
   $22 = $6;
   $23 = HEAP32[$7>>2]|0;
   $24 = ((($23)) + 256|0);
   HEAP8[$24>>0] = $22;
   $25 = HEAP32[4330]|0;
   $26 = HEAP32[$7>>2]|0;
   $27 = HEAP32[$7>>2]|0;
   (_hashmap_put($25,$26,$27)|0);
   $28 = $6;
   $29 = $28 << 24 >> 24;
   $30 = ($29|0)==(2);
   if (!($30)) {
    $31 = (_malloc(8)|0);
    $11 = $31;
    $32 = $8;
    $33 = $11;
    HEAP32[$33>>2] = $32;
    $34 = $5;
    $35 = HEAP32[$34>>2]|0;
    $36 = $11;
    $37 = ((($36)) + 4|0);
    HEAP32[$37>>2] = $35;
    $38 = $11;
    $39 = $5;
    HEAP32[$39>>2] = $38;
    break;
   }
   $3 = 14825;
   $40 = $3;
   STACKTOP = sp;return ($40|0);
  }
 } while(0);
 $3 = 17921;
 $40 = $3;
 STACKTOP = sp;return ($40|0);
}
function _malloc($0) {
 $0 = $0|0;
 var $$$0172$i = 0, $$$0173$i = 0, $$$4236$i = 0, $$$4329$i = 0, $$$i = 0, $$0 = 0, $$0$i = 0, $$0$i$i = 0, $$0$i$i$i = 0, $$0$i20$i = 0, $$01$i$i = 0, $$0172$lcssa$i = 0, $$01726$i = 0, $$0173$lcssa$i = 0, $$01735$i = 0, $$0192 = 0, $$0194 = 0, $$0201$i$i = 0, $$0202$i$i = 0, $$0206$i$i = 0;
 var $$0207$i$i = 0, $$024370$i = 0, $$0260$i$i = 0, $$0261$i$i = 0, $$0262$i$i = 0, $$0268$i$i = 0, $$0269$i$i = 0, $$0320$i = 0, $$0322$i = 0, $$0323$i = 0, $$0325$i = 0, $$0331$i = 0, $$0336$i = 0, $$0337$$i = 0, $$0337$i = 0, $$0339$i = 0, $$0340$i = 0, $$0345$i = 0, $$1176$i = 0, $$1178$i = 0;
 var $$124469$i = 0, $$1264$i$i = 0, $$1266$i$i = 0, $$1321$i = 0, $$1326$i = 0, $$1341$i = 0, $$1347$i = 0, $$1351$i = 0, $$2234243136$i = 0, $$2247$ph$i = 0, $$2253$ph$i = 0, $$2333$i = 0, $$3$i = 0, $$3$i$i = 0, $$3$i200 = 0, $$3328$i = 0, $$3349$i = 0, $$4$lcssa$i = 0, $$4$ph$i = 0, $$411$i = 0;
 var $$4236$i = 0, $$4329$lcssa$i = 0, $$432910$i = 0, $$4335$$4$i = 0, $$4335$ph$i = 0, $$43359$i = 0, $$723947$i = 0, $$748$i = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i17$i = 0, $$pre$i195 = 0, $$pre$i210 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i18$iZ2D = 0, $$pre$phi$i211Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phiZ2D = 0, $$sink1$i = 0;
 var $$sink1$i$i = 0, $$sink14$i = 0, $$sink2$i = 0, $$sink2$i204 = 0, $$sink3$i = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0;
 var $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0;
 var $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0;
 var $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0;
 var $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0;
 var $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0;
 var $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0;
 var $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0;
 var $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0;
 var $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0;
 var $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0;
 var $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0;
 var $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0;
 var $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0;
 var $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0;
 var $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0;
 var $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0;
 var $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0;
 var $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0;
 var $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0;
 var $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0;
 var $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0;
 var $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0;
 var $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0;
 var $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0;
 var $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0;
 var $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0;
 var $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0;
 var $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0;
 var $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0;
 var $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0;
 var $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0;
 var $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0;
 var $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0;
 var $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0;
 var $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0;
 var $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0;
 var $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0;
 var $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0;
 var $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0;
 var $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0;
 var $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0;
 var $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0;
 var $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0;
 var $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0;
 var $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0;
 var $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $98 = 0, $99 = 0, $cond$i = 0, $cond$i$i = 0, $cond$i208 = 0, $exitcond$i$i = 0, $not$$i = 0;
 var $not$$i$i = 0, $not$$i197 = 0, $not$$i209 = 0, $not$1$i = 0, $not$1$i203 = 0, $not$3$i = 0, $not$5$i = 0, $or$cond$i = 0, $or$cond$i201 = 0, $or$cond1$i = 0, $or$cond10$i = 0, $or$cond11$i = 0, $or$cond11$not$i = 0, $or$cond12$i = 0, $or$cond2$i = 0, $or$cond2$i199 = 0, $or$cond49$i = 0, $or$cond5$i = 0, $or$cond50$i = 0, $or$cond7$i = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = sp;
 $2 = ($0>>>0)<(245);
 do {
  if ($2) {
   $3 = ($0>>>0)<(11);
   $4 = (($0) + 11)|0;
   $5 = $4 & -8;
   $6 = $3 ? 16 : $5;
   $7 = $6 >>> 3;
   $8 = HEAP32[4336]|0;
   $9 = $8 >>> $7;
   $10 = $9 & 3;
   $11 = ($10|0)==(0);
   if (!($11)) {
    $12 = $9 & 1;
    $13 = $12 ^ 1;
    $14 = (($13) + ($7))|0;
    $15 = $14 << 1;
    $16 = (17384 + ($15<<2)|0);
    $17 = ((($16)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ((($18)) + 8|0);
    $20 = HEAP32[$19>>2]|0;
    $21 = ($16|0)==($20|0);
    if ($21) {
     $22 = 1 << $14;
     $23 = $22 ^ -1;
     $24 = $8 & $23;
     HEAP32[4336] = $24;
    } else {
     $25 = ((($20)) + 12|0);
     HEAP32[$25>>2] = $16;
     HEAP32[$17>>2] = $20;
    }
    $26 = $14 << 3;
    $27 = $26 | 3;
    $28 = ((($18)) + 4|0);
    HEAP32[$28>>2] = $27;
    $29 = (($18) + ($26)|0);
    $30 = ((($29)) + 4|0);
    $31 = HEAP32[$30>>2]|0;
    $32 = $31 | 1;
    HEAP32[$30>>2] = $32;
    $$0 = $19;
    STACKTOP = sp;return ($$0|0);
   }
   $33 = HEAP32[(17352)>>2]|0;
   $34 = ($6>>>0)>($33>>>0);
   if ($34) {
    $35 = ($9|0)==(0);
    if (!($35)) {
     $36 = $9 << $7;
     $37 = 2 << $7;
     $38 = (0 - ($37))|0;
     $39 = $37 | $38;
     $40 = $36 & $39;
     $41 = (0 - ($40))|0;
     $42 = $40 & $41;
     $43 = (($42) + -1)|0;
     $44 = $43 >>> 12;
     $45 = $44 & 16;
     $46 = $43 >>> $45;
     $47 = $46 >>> 5;
     $48 = $47 & 8;
     $49 = $48 | $45;
     $50 = $46 >>> $48;
     $51 = $50 >>> 2;
     $52 = $51 & 4;
     $53 = $49 | $52;
     $54 = $50 >>> $52;
     $55 = $54 >>> 1;
     $56 = $55 & 2;
     $57 = $53 | $56;
     $58 = $54 >>> $56;
     $59 = $58 >>> 1;
     $60 = $59 & 1;
     $61 = $57 | $60;
     $62 = $58 >>> $60;
     $63 = (($61) + ($62))|0;
     $64 = $63 << 1;
     $65 = (17384 + ($64<<2)|0);
     $66 = ((($65)) + 8|0);
     $67 = HEAP32[$66>>2]|0;
     $68 = ((($67)) + 8|0);
     $69 = HEAP32[$68>>2]|0;
     $70 = ($65|0)==($69|0);
     if ($70) {
      $71 = 1 << $63;
      $72 = $71 ^ -1;
      $73 = $8 & $72;
      HEAP32[4336] = $73;
      $90 = $73;
     } else {
      $74 = ((($69)) + 12|0);
      HEAP32[$74>>2] = $65;
      HEAP32[$66>>2] = $69;
      $90 = $8;
     }
     $75 = $63 << 3;
     $76 = (($75) - ($6))|0;
     $77 = $6 | 3;
     $78 = ((($67)) + 4|0);
     HEAP32[$78>>2] = $77;
     $79 = (($67) + ($6)|0);
     $80 = $76 | 1;
     $81 = ((($79)) + 4|0);
     HEAP32[$81>>2] = $80;
     $82 = (($79) + ($76)|0);
     HEAP32[$82>>2] = $76;
     $83 = ($33|0)==(0);
     if (!($83)) {
      $84 = HEAP32[(17364)>>2]|0;
      $85 = $33 >>> 3;
      $86 = $85 << 1;
      $87 = (17384 + ($86<<2)|0);
      $88 = 1 << $85;
      $89 = $90 & $88;
      $91 = ($89|0)==(0);
      if ($91) {
       $92 = $90 | $88;
       HEAP32[4336] = $92;
       $$pre = ((($87)) + 8|0);
       $$0194 = $87;$$pre$phiZ2D = $$pre;
      } else {
       $93 = ((($87)) + 8|0);
       $94 = HEAP32[$93>>2]|0;
       $$0194 = $94;$$pre$phiZ2D = $93;
      }
      HEAP32[$$pre$phiZ2D>>2] = $84;
      $95 = ((($$0194)) + 12|0);
      HEAP32[$95>>2] = $84;
      $96 = ((($84)) + 8|0);
      HEAP32[$96>>2] = $$0194;
      $97 = ((($84)) + 12|0);
      HEAP32[$97>>2] = $87;
     }
     HEAP32[(17352)>>2] = $76;
     HEAP32[(17364)>>2] = $79;
     $$0 = $68;
     STACKTOP = sp;return ($$0|0);
    }
    $98 = HEAP32[(17348)>>2]|0;
    $99 = ($98|0)==(0);
    if ($99) {
     $$0192 = $6;
    } else {
     $100 = (0 - ($98))|0;
     $101 = $98 & $100;
     $102 = (($101) + -1)|0;
     $103 = $102 >>> 12;
     $104 = $103 & 16;
     $105 = $102 >>> $104;
     $106 = $105 >>> 5;
     $107 = $106 & 8;
     $108 = $107 | $104;
     $109 = $105 >>> $107;
     $110 = $109 >>> 2;
     $111 = $110 & 4;
     $112 = $108 | $111;
     $113 = $109 >>> $111;
     $114 = $113 >>> 1;
     $115 = $114 & 2;
     $116 = $112 | $115;
     $117 = $113 >>> $115;
     $118 = $117 >>> 1;
     $119 = $118 & 1;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = (($120) + ($121))|0;
     $123 = (17648 + ($122<<2)|0);
     $124 = HEAP32[$123>>2]|0;
     $125 = ((($124)) + 4|0);
     $126 = HEAP32[$125>>2]|0;
     $127 = $126 & -8;
     $128 = (($127) - ($6))|0;
     $129 = ((($124)) + 16|0);
     $130 = HEAP32[$129>>2]|0;
     $not$3$i = ($130|0)==(0|0);
     $$sink14$i = $not$3$i&1;
     $131 = (((($124)) + 16|0) + ($$sink14$i<<2)|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = ($132|0)==(0|0);
     if ($133) {
      $$0172$lcssa$i = $124;$$0173$lcssa$i = $128;
     } else {
      $$01726$i = $124;$$01735$i = $128;$135 = $132;
      while(1) {
       $134 = ((($135)) + 4|0);
       $136 = HEAP32[$134>>2]|0;
       $137 = $136 & -8;
       $138 = (($137) - ($6))|0;
       $139 = ($138>>>0)<($$01735$i>>>0);
       $$$0173$i = $139 ? $138 : $$01735$i;
       $$$0172$i = $139 ? $135 : $$01726$i;
       $140 = ((($135)) + 16|0);
       $141 = HEAP32[$140>>2]|0;
       $not$$i = ($141|0)==(0|0);
       $$sink1$i = $not$$i&1;
       $142 = (((($135)) + 16|0) + ($$sink1$i<<2)|0);
       $143 = HEAP32[$142>>2]|0;
       $144 = ($143|0)==(0|0);
       if ($144) {
        $$0172$lcssa$i = $$$0172$i;$$0173$lcssa$i = $$$0173$i;
        break;
       } else {
        $$01726$i = $$$0172$i;$$01735$i = $$$0173$i;$135 = $143;
       }
      }
     }
     $145 = (($$0172$lcssa$i) + ($6)|0);
     $146 = ($$0172$lcssa$i>>>0)<($145>>>0);
     if ($146) {
      $147 = ((($$0172$lcssa$i)) + 24|0);
      $148 = HEAP32[$147>>2]|0;
      $149 = ((($$0172$lcssa$i)) + 12|0);
      $150 = HEAP32[$149>>2]|0;
      $151 = ($150|0)==($$0172$lcssa$i|0);
      do {
       if ($151) {
        $156 = ((($$0172$lcssa$i)) + 20|0);
        $157 = HEAP32[$156>>2]|0;
        $158 = ($157|0)==(0|0);
        if ($158) {
         $159 = ((($$0172$lcssa$i)) + 16|0);
         $160 = HEAP32[$159>>2]|0;
         $161 = ($160|0)==(0|0);
         if ($161) {
          $$3$i = 0;
          break;
         } else {
          $$1176$i = $160;$$1178$i = $159;
         }
        } else {
         $$1176$i = $157;$$1178$i = $156;
        }
        while(1) {
         $162 = ((($$1176$i)) + 20|0);
         $163 = HEAP32[$162>>2]|0;
         $164 = ($163|0)==(0|0);
         if (!($164)) {
          $$1176$i = $163;$$1178$i = $162;
          continue;
         }
         $165 = ((($$1176$i)) + 16|0);
         $166 = HEAP32[$165>>2]|0;
         $167 = ($166|0)==(0|0);
         if ($167) {
          break;
         } else {
          $$1176$i = $166;$$1178$i = $165;
         }
        }
        HEAP32[$$1178$i>>2] = 0;
        $$3$i = $$1176$i;
       } else {
        $152 = ((($$0172$lcssa$i)) + 8|0);
        $153 = HEAP32[$152>>2]|0;
        $154 = ((($153)) + 12|0);
        HEAP32[$154>>2] = $150;
        $155 = ((($150)) + 8|0);
        HEAP32[$155>>2] = $153;
        $$3$i = $150;
       }
      } while(0);
      $168 = ($148|0)==(0|0);
      do {
       if (!($168)) {
        $169 = ((($$0172$lcssa$i)) + 28|0);
        $170 = HEAP32[$169>>2]|0;
        $171 = (17648 + ($170<<2)|0);
        $172 = HEAP32[$171>>2]|0;
        $173 = ($$0172$lcssa$i|0)==($172|0);
        if ($173) {
         HEAP32[$171>>2] = $$3$i;
         $cond$i = ($$3$i|0)==(0|0);
         if ($cond$i) {
          $174 = 1 << $170;
          $175 = $174 ^ -1;
          $176 = $98 & $175;
          HEAP32[(17348)>>2] = $176;
          break;
         }
        } else {
         $177 = ((($148)) + 16|0);
         $178 = HEAP32[$177>>2]|0;
         $not$1$i = ($178|0)!=($$0172$lcssa$i|0);
         $$sink2$i = $not$1$i&1;
         $179 = (((($148)) + 16|0) + ($$sink2$i<<2)|0);
         HEAP32[$179>>2] = $$3$i;
         $180 = ($$3$i|0)==(0|0);
         if ($180) {
          break;
         }
        }
        $181 = ((($$3$i)) + 24|0);
        HEAP32[$181>>2] = $148;
        $182 = ((($$0172$lcssa$i)) + 16|0);
        $183 = HEAP32[$182>>2]|0;
        $184 = ($183|0)==(0|0);
        if (!($184)) {
         $185 = ((($$3$i)) + 16|0);
         HEAP32[$185>>2] = $183;
         $186 = ((($183)) + 24|0);
         HEAP32[$186>>2] = $$3$i;
        }
        $187 = ((($$0172$lcssa$i)) + 20|0);
        $188 = HEAP32[$187>>2]|0;
        $189 = ($188|0)==(0|0);
        if (!($189)) {
         $190 = ((($$3$i)) + 20|0);
         HEAP32[$190>>2] = $188;
         $191 = ((($188)) + 24|0);
         HEAP32[$191>>2] = $$3$i;
        }
       }
      } while(0);
      $192 = ($$0173$lcssa$i>>>0)<(16);
      if ($192) {
       $193 = (($$0173$lcssa$i) + ($6))|0;
       $194 = $193 | 3;
       $195 = ((($$0172$lcssa$i)) + 4|0);
       HEAP32[$195>>2] = $194;
       $196 = (($$0172$lcssa$i) + ($193)|0);
       $197 = ((($196)) + 4|0);
       $198 = HEAP32[$197>>2]|0;
       $199 = $198 | 1;
       HEAP32[$197>>2] = $199;
      } else {
       $200 = $6 | 3;
       $201 = ((($$0172$lcssa$i)) + 4|0);
       HEAP32[$201>>2] = $200;
       $202 = $$0173$lcssa$i | 1;
       $203 = ((($145)) + 4|0);
       HEAP32[$203>>2] = $202;
       $204 = (($145) + ($$0173$lcssa$i)|0);
       HEAP32[$204>>2] = $$0173$lcssa$i;
       $205 = ($33|0)==(0);
       if (!($205)) {
        $206 = HEAP32[(17364)>>2]|0;
        $207 = $33 >>> 3;
        $208 = $207 << 1;
        $209 = (17384 + ($208<<2)|0);
        $210 = 1 << $207;
        $211 = $8 & $210;
        $212 = ($211|0)==(0);
        if ($212) {
         $213 = $8 | $210;
         HEAP32[4336] = $213;
         $$pre$i = ((($209)) + 8|0);
         $$0$i = $209;$$pre$phi$iZ2D = $$pre$i;
        } else {
         $214 = ((($209)) + 8|0);
         $215 = HEAP32[$214>>2]|0;
         $$0$i = $215;$$pre$phi$iZ2D = $214;
        }
        HEAP32[$$pre$phi$iZ2D>>2] = $206;
        $216 = ((($$0$i)) + 12|0);
        HEAP32[$216>>2] = $206;
        $217 = ((($206)) + 8|0);
        HEAP32[$217>>2] = $$0$i;
        $218 = ((($206)) + 12|0);
        HEAP32[$218>>2] = $209;
       }
       HEAP32[(17352)>>2] = $$0173$lcssa$i;
       HEAP32[(17364)>>2] = $145;
      }
      $219 = ((($$0172$lcssa$i)) + 8|0);
      $$0 = $219;
      STACKTOP = sp;return ($$0|0);
     } else {
      $$0192 = $6;
     }
    }
   } else {
    $$0192 = $6;
   }
  } else {
   $220 = ($0>>>0)>(4294967231);
   if ($220) {
    $$0192 = -1;
   } else {
    $221 = (($0) + 11)|0;
    $222 = $221 & -8;
    $223 = HEAP32[(17348)>>2]|0;
    $224 = ($223|0)==(0);
    if ($224) {
     $$0192 = $222;
    } else {
     $225 = (0 - ($222))|0;
     $226 = $221 >>> 8;
     $227 = ($226|0)==(0);
     if ($227) {
      $$0336$i = 0;
     } else {
      $228 = ($222>>>0)>(16777215);
      if ($228) {
       $$0336$i = 31;
      } else {
       $229 = (($226) + 1048320)|0;
       $230 = $229 >>> 16;
       $231 = $230 & 8;
       $232 = $226 << $231;
       $233 = (($232) + 520192)|0;
       $234 = $233 >>> 16;
       $235 = $234 & 4;
       $236 = $235 | $231;
       $237 = $232 << $235;
       $238 = (($237) + 245760)|0;
       $239 = $238 >>> 16;
       $240 = $239 & 2;
       $241 = $236 | $240;
       $242 = (14 - ($241))|0;
       $243 = $237 << $240;
       $244 = $243 >>> 15;
       $245 = (($242) + ($244))|0;
       $246 = $245 << 1;
       $247 = (($245) + 7)|0;
       $248 = $222 >>> $247;
       $249 = $248 & 1;
       $250 = $249 | $246;
       $$0336$i = $250;
      }
     }
     $251 = (17648 + ($$0336$i<<2)|0);
     $252 = HEAP32[$251>>2]|0;
     $253 = ($252|0)==(0|0);
     L74: do {
      if ($253) {
       $$2333$i = 0;$$3$i200 = 0;$$3328$i = $225;
       label = 57;
      } else {
       $254 = ($$0336$i|0)==(31);
       $255 = $$0336$i >>> 1;
       $256 = (25 - ($255))|0;
       $257 = $254 ? 0 : $256;
       $258 = $222 << $257;
       $$0320$i = 0;$$0325$i = $225;$$0331$i = $252;$$0337$i = $258;$$0340$i = 0;
       while(1) {
        $259 = ((($$0331$i)) + 4|0);
        $260 = HEAP32[$259>>2]|0;
        $261 = $260 & -8;
        $262 = (($261) - ($222))|0;
        $263 = ($262>>>0)<($$0325$i>>>0);
        if ($263) {
         $264 = ($262|0)==(0);
         if ($264) {
          $$411$i = $$0331$i;$$432910$i = 0;$$43359$i = $$0331$i;
          label = 61;
          break L74;
         } else {
          $$1321$i = $$0331$i;$$1326$i = $262;
         }
        } else {
         $$1321$i = $$0320$i;$$1326$i = $$0325$i;
        }
        $265 = ((($$0331$i)) + 20|0);
        $266 = HEAP32[$265>>2]|0;
        $267 = $$0337$i >>> 31;
        $268 = (((($$0331$i)) + 16|0) + ($267<<2)|0);
        $269 = HEAP32[$268>>2]|0;
        $270 = ($266|0)==(0|0);
        $271 = ($266|0)==($269|0);
        $or$cond2$i199 = $270 | $271;
        $$1341$i = $or$cond2$i199 ? $$0340$i : $266;
        $272 = ($269|0)==(0|0);
        $not$5$i = $272 ^ 1;
        $273 = $not$5$i&1;
        $$0337$$i = $$0337$i << $273;
        if ($272) {
         $$2333$i = $$1341$i;$$3$i200 = $$1321$i;$$3328$i = $$1326$i;
         label = 57;
         break;
        } else {
         $$0320$i = $$1321$i;$$0325$i = $$1326$i;$$0331$i = $269;$$0337$i = $$0337$$i;$$0340$i = $$1341$i;
        }
       }
      }
     } while(0);
     if ((label|0) == 57) {
      $274 = ($$2333$i|0)==(0|0);
      $275 = ($$3$i200|0)==(0|0);
      $or$cond$i201 = $274 & $275;
      if ($or$cond$i201) {
       $276 = 2 << $$0336$i;
       $277 = (0 - ($276))|0;
       $278 = $276 | $277;
       $279 = $223 & $278;
       $280 = ($279|0)==(0);
       if ($280) {
        $$0192 = $222;
        break;
       }
       $281 = (0 - ($279))|0;
       $282 = $279 & $281;
       $283 = (($282) + -1)|0;
       $284 = $283 >>> 12;
       $285 = $284 & 16;
       $286 = $283 >>> $285;
       $287 = $286 >>> 5;
       $288 = $287 & 8;
       $289 = $288 | $285;
       $290 = $286 >>> $288;
       $291 = $290 >>> 2;
       $292 = $291 & 4;
       $293 = $289 | $292;
       $294 = $290 >>> $292;
       $295 = $294 >>> 1;
       $296 = $295 & 2;
       $297 = $293 | $296;
       $298 = $294 >>> $296;
       $299 = $298 >>> 1;
       $300 = $299 & 1;
       $301 = $297 | $300;
       $302 = $298 >>> $300;
       $303 = (($301) + ($302))|0;
       $304 = (17648 + ($303<<2)|0);
       $305 = HEAP32[$304>>2]|0;
       $$4$ph$i = 0;$$4335$ph$i = $305;
      } else {
       $$4$ph$i = $$3$i200;$$4335$ph$i = $$2333$i;
      }
      $306 = ($$4335$ph$i|0)==(0|0);
      if ($306) {
       $$4$lcssa$i = $$4$ph$i;$$4329$lcssa$i = $$3328$i;
      } else {
       $$411$i = $$4$ph$i;$$432910$i = $$3328$i;$$43359$i = $$4335$ph$i;
       label = 61;
      }
     }
     if ((label|0) == 61) {
      while(1) {
       label = 0;
       $307 = ((($$43359$i)) + 4|0);
       $308 = HEAP32[$307>>2]|0;
       $309 = $308 & -8;
       $310 = (($309) - ($222))|0;
       $311 = ($310>>>0)<($$432910$i>>>0);
       $$$4329$i = $311 ? $310 : $$432910$i;
       $$4335$$4$i = $311 ? $$43359$i : $$411$i;
       $312 = ((($$43359$i)) + 16|0);
       $313 = HEAP32[$312>>2]|0;
       $not$1$i203 = ($313|0)==(0|0);
       $$sink2$i204 = $not$1$i203&1;
       $314 = (((($$43359$i)) + 16|0) + ($$sink2$i204<<2)|0);
       $315 = HEAP32[$314>>2]|0;
       $316 = ($315|0)==(0|0);
       if ($316) {
        $$4$lcssa$i = $$4335$$4$i;$$4329$lcssa$i = $$$4329$i;
        break;
       } else {
        $$411$i = $$4335$$4$i;$$432910$i = $$$4329$i;$$43359$i = $315;
        label = 61;
       }
      }
     }
     $317 = ($$4$lcssa$i|0)==(0|0);
     if ($317) {
      $$0192 = $222;
     } else {
      $318 = HEAP32[(17352)>>2]|0;
      $319 = (($318) - ($222))|0;
      $320 = ($$4329$lcssa$i>>>0)<($319>>>0);
      if ($320) {
       $321 = (($$4$lcssa$i) + ($222)|0);
       $322 = ($$4$lcssa$i>>>0)<($321>>>0);
       if (!($322)) {
        $$0 = 0;
        STACKTOP = sp;return ($$0|0);
       }
       $323 = ((($$4$lcssa$i)) + 24|0);
       $324 = HEAP32[$323>>2]|0;
       $325 = ((($$4$lcssa$i)) + 12|0);
       $326 = HEAP32[$325>>2]|0;
       $327 = ($326|0)==($$4$lcssa$i|0);
       do {
        if ($327) {
         $332 = ((($$4$lcssa$i)) + 20|0);
         $333 = HEAP32[$332>>2]|0;
         $334 = ($333|0)==(0|0);
         if ($334) {
          $335 = ((($$4$lcssa$i)) + 16|0);
          $336 = HEAP32[$335>>2]|0;
          $337 = ($336|0)==(0|0);
          if ($337) {
           $$3349$i = 0;
           break;
          } else {
           $$1347$i = $336;$$1351$i = $335;
          }
         } else {
          $$1347$i = $333;$$1351$i = $332;
         }
         while(1) {
          $338 = ((($$1347$i)) + 20|0);
          $339 = HEAP32[$338>>2]|0;
          $340 = ($339|0)==(0|0);
          if (!($340)) {
           $$1347$i = $339;$$1351$i = $338;
           continue;
          }
          $341 = ((($$1347$i)) + 16|0);
          $342 = HEAP32[$341>>2]|0;
          $343 = ($342|0)==(0|0);
          if ($343) {
           break;
          } else {
           $$1347$i = $342;$$1351$i = $341;
          }
         }
         HEAP32[$$1351$i>>2] = 0;
         $$3349$i = $$1347$i;
        } else {
         $328 = ((($$4$lcssa$i)) + 8|0);
         $329 = HEAP32[$328>>2]|0;
         $330 = ((($329)) + 12|0);
         HEAP32[$330>>2] = $326;
         $331 = ((($326)) + 8|0);
         HEAP32[$331>>2] = $329;
         $$3349$i = $326;
        }
       } while(0);
       $344 = ($324|0)==(0|0);
       do {
        if ($344) {
         $426 = $223;
        } else {
         $345 = ((($$4$lcssa$i)) + 28|0);
         $346 = HEAP32[$345>>2]|0;
         $347 = (17648 + ($346<<2)|0);
         $348 = HEAP32[$347>>2]|0;
         $349 = ($$4$lcssa$i|0)==($348|0);
         if ($349) {
          HEAP32[$347>>2] = $$3349$i;
          $cond$i208 = ($$3349$i|0)==(0|0);
          if ($cond$i208) {
           $350 = 1 << $346;
           $351 = $350 ^ -1;
           $352 = $223 & $351;
           HEAP32[(17348)>>2] = $352;
           $426 = $352;
           break;
          }
         } else {
          $353 = ((($324)) + 16|0);
          $354 = HEAP32[$353>>2]|0;
          $not$$i209 = ($354|0)!=($$4$lcssa$i|0);
          $$sink3$i = $not$$i209&1;
          $355 = (((($324)) + 16|0) + ($$sink3$i<<2)|0);
          HEAP32[$355>>2] = $$3349$i;
          $356 = ($$3349$i|0)==(0|0);
          if ($356) {
           $426 = $223;
           break;
          }
         }
         $357 = ((($$3349$i)) + 24|0);
         HEAP32[$357>>2] = $324;
         $358 = ((($$4$lcssa$i)) + 16|0);
         $359 = HEAP32[$358>>2]|0;
         $360 = ($359|0)==(0|0);
         if (!($360)) {
          $361 = ((($$3349$i)) + 16|0);
          HEAP32[$361>>2] = $359;
          $362 = ((($359)) + 24|0);
          HEAP32[$362>>2] = $$3349$i;
         }
         $363 = ((($$4$lcssa$i)) + 20|0);
         $364 = HEAP32[$363>>2]|0;
         $365 = ($364|0)==(0|0);
         if ($365) {
          $426 = $223;
         } else {
          $366 = ((($$3349$i)) + 20|0);
          HEAP32[$366>>2] = $364;
          $367 = ((($364)) + 24|0);
          HEAP32[$367>>2] = $$3349$i;
          $426 = $223;
         }
        }
       } while(0);
       $368 = ($$4329$lcssa$i>>>0)<(16);
       do {
        if ($368) {
         $369 = (($$4329$lcssa$i) + ($222))|0;
         $370 = $369 | 3;
         $371 = ((($$4$lcssa$i)) + 4|0);
         HEAP32[$371>>2] = $370;
         $372 = (($$4$lcssa$i) + ($369)|0);
         $373 = ((($372)) + 4|0);
         $374 = HEAP32[$373>>2]|0;
         $375 = $374 | 1;
         HEAP32[$373>>2] = $375;
        } else {
         $376 = $222 | 3;
         $377 = ((($$4$lcssa$i)) + 4|0);
         HEAP32[$377>>2] = $376;
         $378 = $$4329$lcssa$i | 1;
         $379 = ((($321)) + 4|0);
         HEAP32[$379>>2] = $378;
         $380 = (($321) + ($$4329$lcssa$i)|0);
         HEAP32[$380>>2] = $$4329$lcssa$i;
         $381 = $$4329$lcssa$i >>> 3;
         $382 = ($$4329$lcssa$i>>>0)<(256);
         if ($382) {
          $383 = $381 << 1;
          $384 = (17384 + ($383<<2)|0);
          $385 = HEAP32[4336]|0;
          $386 = 1 << $381;
          $387 = $385 & $386;
          $388 = ($387|0)==(0);
          if ($388) {
           $389 = $385 | $386;
           HEAP32[4336] = $389;
           $$pre$i210 = ((($384)) + 8|0);
           $$0345$i = $384;$$pre$phi$i211Z2D = $$pre$i210;
          } else {
           $390 = ((($384)) + 8|0);
           $391 = HEAP32[$390>>2]|0;
           $$0345$i = $391;$$pre$phi$i211Z2D = $390;
          }
          HEAP32[$$pre$phi$i211Z2D>>2] = $321;
          $392 = ((($$0345$i)) + 12|0);
          HEAP32[$392>>2] = $321;
          $393 = ((($321)) + 8|0);
          HEAP32[$393>>2] = $$0345$i;
          $394 = ((($321)) + 12|0);
          HEAP32[$394>>2] = $384;
          break;
         }
         $395 = $$4329$lcssa$i >>> 8;
         $396 = ($395|0)==(0);
         if ($396) {
          $$0339$i = 0;
         } else {
          $397 = ($$4329$lcssa$i>>>0)>(16777215);
          if ($397) {
           $$0339$i = 31;
          } else {
           $398 = (($395) + 1048320)|0;
           $399 = $398 >>> 16;
           $400 = $399 & 8;
           $401 = $395 << $400;
           $402 = (($401) + 520192)|0;
           $403 = $402 >>> 16;
           $404 = $403 & 4;
           $405 = $404 | $400;
           $406 = $401 << $404;
           $407 = (($406) + 245760)|0;
           $408 = $407 >>> 16;
           $409 = $408 & 2;
           $410 = $405 | $409;
           $411 = (14 - ($410))|0;
           $412 = $406 << $409;
           $413 = $412 >>> 15;
           $414 = (($411) + ($413))|0;
           $415 = $414 << 1;
           $416 = (($414) + 7)|0;
           $417 = $$4329$lcssa$i >>> $416;
           $418 = $417 & 1;
           $419 = $418 | $415;
           $$0339$i = $419;
          }
         }
         $420 = (17648 + ($$0339$i<<2)|0);
         $421 = ((($321)) + 28|0);
         HEAP32[$421>>2] = $$0339$i;
         $422 = ((($321)) + 16|0);
         $423 = ((($422)) + 4|0);
         HEAP32[$423>>2] = 0;
         HEAP32[$422>>2] = 0;
         $424 = 1 << $$0339$i;
         $425 = $426 & $424;
         $427 = ($425|0)==(0);
         if ($427) {
          $428 = $426 | $424;
          HEAP32[(17348)>>2] = $428;
          HEAP32[$420>>2] = $321;
          $429 = ((($321)) + 24|0);
          HEAP32[$429>>2] = $420;
          $430 = ((($321)) + 12|0);
          HEAP32[$430>>2] = $321;
          $431 = ((($321)) + 8|0);
          HEAP32[$431>>2] = $321;
          break;
         }
         $432 = HEAP32[$420>>2]|0;
         $433 = ($$0339$i|0)==(31);
         $434 = $$0339$i >>> 1;
         $435 = (25 - ($434))|0;
         $436 = $433 ? 0 : $435;
         $437 = $$4329$lcssa$i << $436;
         $$0322$i = $437;$$0323$i = $432;
         while(1) {
          $438 = ((($$0323$i)) + 4|0);
          $439 = HEAP32[$438>>2]|0;
          $440 = $439 & -8;
          $441 = ($440|0)==($$4329$lcssa$i|0);
          if ($441) {
           label = 97;
           break;
          }
          $442 = $$0322$i >>> 31;
          $443 = (((($$0323$i)) + 16|0) + ($442<<2)|0);
          $444 = $$0322$i << 1;
          $445 = HEAP32[$443>>2]|0;
          $446 = ($445|0)==(0|0);
          if ($446) {
           label = 96;
           break;
          } else {
           $$0322$i = $444;$$0323$i = $445;
          }
         }
         if ((label|0) == 96) {
          HEAP32[$443>>2] = $321;
          $447 = ((($321)) + 24|0);
          HEAP32[$447>>2] = $$0323$i;
          $448 = ((($321)) + 12|0);
          HEAP32[$448>>2] = $321;
          $449 = ((($321)) + 8|0);
          HEAP32[$449>>2] = $321;
          break;
         }
         else if ((label|0) == 97) {
          $450 = ((($$0323$i)) + 8|0);
          $451 = HEAP32[$450>>2]|0;
          $452 = ((($451)) + 12|0);
          HEAP32[$452>>2] = $321;
          HEAP32[$450>>2] = $321;
          $453 = ((($321)) + 8|0);
          HEAP32[$453>>2] = $451;
          $454 = ((($321)) + 12|0);
          HEAP32[$454>>2] = $$0323$i;
          $455 = ((($321)) + 24|0);
          HEAP32[$455>>2] = 0;
          break;
         }
        }
       } while(0);
       $456 = ((($$4$lcssa$i)) + 8|0);
       $$0 = $456;
       STACKTOP = sp;return ($$0|0);
      } else {
       $$0192 = $222;
      }
     }
    }
   }
  }
 } while(0);
 $457 = HEAP32[(17352)>>2]|0;
 $458 = ($457>>>0)<($$0192>>>0);
 if (!($458)) {
  $459 = (($457) - ($$0192))|0;
  $460 = HEAP32[(17364)>>2]|0;
  $461 = ($459>>>0)>(15);
  if ($461) {
   $462 = (($460) + ($$0192)|0);
   HEAP32[(17364)>>2] = $462;
   HEAP32[(17352)>>2] = $459;
   $463 = $459 | 1;
   $464 = ((($462)) + 4|0);
   HEAP32[$464>>2] = $463;
   $465 = (($462) + ($459)|0);
   HEAP32[$465>>2] = $459;
   $466 = $$0192 | 3;
   $467 = ((($460)) + 4|0);
   HEAP32[$467>>2] = $466;
  } else {
   HEAP32[(17352)>>2] = 0;
   HEAP32[(17364)>>2] = 0;
   $468 = $457 | 3;
   $469 = ((($460)) + 4|0);
   HEAP32[$469>>2] = $468;
   $470 = (($460) + ($457)|0);
   $471 = ((($470)) + 4|0);
   $472 = HEAP32[$471>>2]|0;
   $473 = $472 | 1;
   HEAP32[$471>>2] = $473;
  }
  $474 = ((($460)) + 8|0);
  $$0 = $474;
  STACKTOP = sp;return ($$0|0);
 }
 $475 = HEAP32[(17356)>>2]|0;
 $476 = ($475>>>0)>($$0192>>>0);
 if ($476) {
  $477 = (($475) - ($$0192))|0;
  HEAP32[(17356)>>2] = $477;
  $478 = HEAP32[(17368)>>2]|0;
  $479 = (($478) + ($$0192)|0);
  HEAP32[(17368)>>2] = $479;
  $480 = $477 | 1;
  $481 = ((($479)) + 4|0);
  HEAP32[$481>>2] = $480;
  $482 = $$0192 | 3;
  $483 = ((($478)) + 4|0);
  HEAP32[$483>>2] = $482;
  $484 = ((($478)) + 8|0);
  $$0 = $484;
  STACKTOP = sp;return ($$0|0);
 }
 $485 = HEAP32[4454]|0;
 $486 = ($485|0)==(0);
 if ($486) {
  HEAP32[(17824)>>2] = 4096;
  HEAP32[(17820)>>2] = 4096;
  HEAP32[(17828)>>2] = -1;
  HEAP32[(17832)>>2] = -1;
  HEAP32[(17836)>>2] = 0;
  HEAP32[(17788)>>2] = 0;
  $487 = $1;
  $488 = $487 & -16;
  $489 = $488 ^ 1431655768;
  HEAP32[$1>>2] = $489;
  HEAP32[4454] = $489;
  $493 = 4096;
 } else {
  $$pre$i195 = HEAP32[(17824)>>2]|0;
  $493 = $$pre$i195;
 }
 $490 = (($$0192) + 48)|0;
 $491 = (($$0192) + 47)|0;
 $492 = (($493) + ($491))|0;
 $494 = (0 - ($493))|0;
 $495 = $492 & $494;
 $496 = ($495>>>0)>($$0192>>>0);
 if (!($496)) {
  $$0 = 0;
  STACKTOP = sp;return ($$0|0);
 }
 $497 = HEAP32[(17784)>>2]|0;
 $498 = ($497|0)==(0);
 if (!($498)) {
  $499 = HEAP32[(17776)>>2]|0;
  $500 = (($499) + ($495))|0;
  $501 = ($500>>>0)<=($499>>>0);
  $502 = ($500>>>0)>($497>>>0);
  $or$cond1$i = $501 | $502;
  if ($or$cond1$i) {
   $$0 = 0;
   STACKTOP = sp;return ($$0|0);
  }
 }
 $503 = HEAP32[(17788)>>2]|0;
 $504 = $503 & 4;
 $505 = ($504|0)==(0);
 L167: do {
  if ($505) {
   $506 = HEAP32[(17368)>>2]|0;
   $507 = ($506|0)==(0|0);
   L169: do {
    if ($507) {
     label = 118;
    } else {
     $$0$i20$i = (17792);
     while(1) {
      $508 = HEAP32[$$0$i20$i>>2]|0;
      $509 = ($508>>>0)>($506>>>0);
      if (!($509)) {
       $510 = ((($$0$i20$i)) + 4|0);
       $511 = HEAP32[$510>>2]|0;
       $512 = (($508) + ($511)|0);
       $513 = ($512>>>0)>($506>>>0);
       if ($513) {
        break;
       }
      }
      $514 = ((($$0$i20$i)) + 8|0);
      $515 = HEAP32[$514>>2]|0;
      $516 = ($515|0)==(0|0);
      if ($516) {
       label = 118;
       break L169;
      } else {
       $$0$i20$i = $515;
      }
     }
     $539 = (($492) - ($475))|0;
     $540 = $539 & $494;
     $541 = ($540>>>0)<(2147483647);
     if ($541) {
      $542 = (_sbrk(($540|0))|0);
      $543 = HEAP32[$$0$i20$i>>2]|0;
      $544 = HEAP32[$510>>2]|0;
      $545 = (($543) + ($544)|0);
      $546 = ($542|0)==($545|0);
      if ($546) {
       $547 = ($542|0)==((-1)|0);
       if ($547) {
        $$2234243136$i = $540;
       } else {
        $$723947$i = $540;$$748$i = $542;
        label = 135;
        break L167;
       }
      } else {
       $$2247$ph$i = $542;$$2253$ph$i = $540;
       label = 126;
      }
     } else {
      $$2234243136$i = 0;
     }
    }
   } while(0);
   do {
    if ((label|0) == 118) {
     $517 = (_sbrk(0)|0);
     $518 = ($517|0)==((-1)|0);
     if ($518) {
      $$2234243136$i = 0;
     } else {
      $519 = $517;
      $520 = HEAP32[(17820)>>2]|0;
      $521 = (($520) + -1)|0;
      $522 = $521 & $519;
      $523 = ($522|0)==(0);
      $524 = (($521) + ($519))|0;
      $525 = (0 - ($520))|0;
      $526 = $524 & $525;
      $527 = (($526) - ($519))|0;
      $528 = $523 ? 0 : $527;
      $$$i = (($528) + ($495))|0;
      $529 = HEAP32[(17776)>>2]|0;
      $530 = (($$$i) + ($529))|0;
      $531 = ($$$i>>>0)>($$0192>>>0);
      $532 = ($$$i>>>0)<(2147483647);
      $or$cond$i = $531 & $532;
      if ($or$cond$i) {
       $533 = HEAP32[(17784)>>2]|0;
       $534 = ($533|0)==(0);
       if (!($534)) {
        $535 = ($530>>>0)<=($529>>>0);
        $536 = ($530>>>0)>($533>>>0);
        $or$cond2$i = $535 | $536;
        if ($or$cond2$i) {
         $$2234243136$i = 0;
         break;
        }
       }
       $537 = (_sbrk(($$$i|0))|0);
       $538 = ($537|0)==($517|0);
       if ($538) {
        $$723947$i = $$$i;$$748$i = $517;
        label = 135;
        break L167;
       } else {
        $$2247$ph$i = $537;$$2253$ph$i = $$$i;
        label = 126;
       }
      } else {
       $$2234243136$i = 0;
      }
     }
    }
   } while(0);
   do {
    if ((label|0) == 126) {
     $548 = (0 - ($$2253$ph$i))|0;
     $549 = ($$2247$ph$i|0)!=((-1)|0);
     $550 = ($$2253$ph$i>>>0)<(2147483647);
     $or$cond7$i = $550 & $549;
     $551 = ($490>>>0)>($$2253$ph$i>>>0);
     $or$cond10$i = $551 & $or$cond7$i;
     if (!($or$cond10$i)) {
      $561 = ($$2247$ph$i|0)==((-1)|0);
      if ($561) {
       $$2234243136$i = 0;
       break;
      } else {
       $$723947$i = $$2253$ph$i;$$748$i = $$2247$ph$i;
       label = 135;
       break L167;
      }
     }
     $552 = HEAP32[(17824)>>2]|0;
     $553 = (($491) - ($$2253$ph$i))|0;
     $554 = (($553) + ($552))|0;
     $555 = (0 - ($552))|0;
     $556 = $554 & $555;
     $557 = ($556>>>0)<(2147483647);
     if (!($557)) {
      $$723947$i = $$2253$ph$i;$$748$i = $$2247$ph$i;
      label = 135;
      break L167;
     }
     $558 = (_sbrk(($556|0))|0);
     $559 = ($558|0)==((-1)|0);
     if ($559) {
      (_sbrk(($548|0))|0);
      $$2234243136$i = 0;
      break;
     } else {
      $560 = (($556) + ($$2253$ph$i))|0;
      $$723947$i = $560;$$748$i = $$2247$ph$i;
      label = 135;
      break L167;
     }
    }
   } while(0);
   $562 = HEAP32[(17788)>>2]|0;
   $563 = $562 | 4;
   HEAP32[(17788)>>2] = $563;
   $$4236$i = $$2234243136$i;
   label = 133;
  } else {
   $$4236$i = 0;
   label = 133;
  }
 } while(0);
 if ((label|0) == 133) {
  $564 = ($495>>>0)<(2147483647);
  if ($564) {
   $565 = (_sbrk(($495|0))|0);
   $566 = (_sbrk(0)|0);
   $567 = ($565|0)!=((-1)|0);
   $568 = ($566|0)!=((-1)|0);
   $or$cond5$i = $567 & $568;
   $569 = ($565>>>0)<($566>>>0);
   $or$cond11$i = $569 & $or$cond5$i;
   $570 = $566;
   $571 = $565;
   $572 = (($570) - ($571))|0;
   $573 = (($$0192) + 40)|0;
   $574 = ($572>>>0)>($573>>>0);
   $$$4236$i = $574 ? $572 : $$4236$i;
   $or$cond11$not$i = $or$cond11$i ^ 1;
   $575 = ($565|0)==((-1)|0);
   $not$$i197 = $574 ^ 1;
   $576 = $575 | $not$$i197;
   $or$cond49$i = $576 | $or$cond11$not$i;
   if (!($or$cond49$i)) {
    $$723947$i = $$$4236$i;$$748$i = $565;
    label = 135;
   }
  }
 }
 if ((label|0) == 135) {
  $577 = HEAP32[(17776)>>2]|0;
  $578 = (($577) + ($$723947$i))|0;
  HEAP32[(17776)>>2] = $578;
  $579 = HEAP32[(17780)>>2]|0;
  $580 = ($578>>>0)>($579>>>0);
  if ($580) {
   HEAP32[(17780)>>2] = $578;
  }
  $581 = HEAP32[(17368)>>2]|0;
  $582 = ($581|0)==(0|0);
  do {
   if ($582) {
    $583 = HEAP32[(17360)>>2]|0;
    $584 = ($583|0)==(0|0);
    $585 = ($$748$i>>>0)<($583>>>0);
    $or$cond12$i = $584 | $585;
    if ($or$cond12$i) {
     HEAP32[(17360)>>2] = $$748$i;
    }
    HEAP32[(17792)>>2] = $$748$i;
    HEAP32[(17796)>>2] = $$723947$i;
    HEAP32[(17804)>>2] = 0;
    $586 = HEAP32[4454]|0;
    HEAP32[(17380)>>2] = $586;
    HEAP32[(17376)>>2] = -1;
    $$01$i$i = 0;
    while(1) {
     $587 = $$01$i$i << 1;
     $588 = (17384 + ($587<<2)|0);
     $589 = ((($588)) + 12|0);
     HEAP32[$589>>2] = $588;
     $590 = ((($588)) + 8|0);
     HEAP32[$590>>2] = $588;
     $591 = (($$01$i$i) + 1)|0;
     $exitcond$i$i = ($591|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $$01$i$i = $591;
     }
    }
    $592 = (($$723947$i) + -40)|0;
    $593 = ((($$748$i)) + 8|0);
    $594 = $593;
    $595 = $594 & 7;
    $596 = ($595|0)==(0);
    $597 = (0 - ($594))|0;
    $598 = $597 & 7;
    $599 = $596 ? 0 : $598;
    $600 = (($$748$i) + ($599)|0);
    $601 = (($592) - ($599))|0;
    HEAP32[(17368)>>2] = $600;
    HEAP32[(17356)>>2] = $601;
    $602 = $601 | 1;
    $603 = ((($600)) + 4|0);
    HEAP32[$603>>2] = $602;
    $604 = (($600) + ($601)|0);
    $605 = ((($604)) + 4|0);
    HEAP32[$605>>2] = 40;
    $606 = HEAP32[(17832)>>2]|0;
    HEAP32[(17372)>>2] = $606;
   } else {
    $$024370$i = (17792);
    while(1) {
     $607 = HEAP32[$$024370$i>>2]|0;
     $608 = ((($$024370$i)) + 4|0);
     $609 = HEAP32[$608>>2]|0;
     $610 = (($607) + ($609)|0);
     $611 = ($$748$i|0)==($610|0);
     if ($611) {
      label = 145;
      break;
     }
     $612 = ((($$024370$i)) + 8|0);
     $613 = HEAP32[$612>>2]|0;
     $614 = ($613|0)==(0|0);
     if ($614) {
      break;
     } else {
      $$024370$i = $613;
     }
    }
    if ((label|0) == 145) {
     $615 = ((($$024370$i)) + 12|0);
     $616 = HEAP32[$615>>2]|0;
     $617 = $616 & 8;
     $618 = ($617|0)==(0);
     if ($618) {
      $619 = ($581>>>0)>=($607>>>0);
      $620 = ($581>>>0)<($$748$i>>>0);
      $or$cond50$i = $620 & $619;
      if ($or$cond50$i) {
       $621 = (($609) + ($$723947$i))|0;
       HEAP32[$608>>2] = $621;
       $622 = HEAP32[(17356)>>2]|0;
       $623 = ((($581)) + 8|0);
       $624 = $623;
       $625 = $624 & 7;
       $626 = ($625|0)==(0);
       $627 = (0 - ($624))|0;
       $628 = $627 & 7;
       $629 = $626 ? 0 : $628;
       $630 = (($581) + ($629)|0);
       $631 = (($$723947$i) - ($629))|0;
       $632 = (($622) + ($631))|0;
       HEAP32[(17368)>>2] = $630;
       HEAP32[(17356)>>2] = $632;
       $633 = $632 | 1;
       $634 = ((($630)) + 4|0);
       HEAP32[$634>>2] = $633;
       $635 = (($630) + ($632)|0);
       $636 = ((($635)) + 4|0);
       HEAP32[$636>>2] = 40;
       $637 = HEAP32[(17832)>>2]|0;
       HEAP32[(17372)>>2] = $637;
       break;
      }
     }
    }
    $638 = HEAP32[(17360)>>2]|0;
    $639 = ($$748$i>>>0)<($638>>>0);
    if ($639) {
     HEAP32[(17360)>>2] = $$748$i;
    }
    $640 = (($$748$i) + ($$723947$i)|0);
    $$124469$i = (17792);
    while(1) {
     $641 = HEAP32[$$124469$i>>2]|0;
     $642 = ($641|0)==($640|0);
     if ($642) {
      label = 153;
      break;
     }
     $643 = ((($$124469$i)) + 8|0);
     $644 = HEAP32[$643>>2]|0;
     $645 = ($644|0)==(0|0);
     if ($645) {
      break;
     } else {
      $$124469$i = $644;
     }
    }
    if ((label|0) == 153) {
     $646 = ((($$124469$i)) + 12|0);
     $647 = HEAP32[$646>>2]|0;
     $648 = $647 & 8;
     $649 = ($648|0)==(0);
     if ($649) {
      HEAP32[$$124469$i>>2] = $$748$i;
      $650 = ((($$124469$i)) + 4|0);
      $651 = HEAP32[$650>>2]|0;
      $652 = (($651) + ($$723947$i))|0;
      HEAP32[$650>>2] = $652;
      $653 = ((($$748$i)) + 8|0);
      $654 = $653;
      $655 = $654 & 7;
      $656 = ($655|0)==(0);
      $657 = (0 - ($654))|0;
      $658 = $657 & 7;
      $659 = $656 ? 0 : $658;
      $660 = (($$748$i) + ($659)|0);
      $661 = ((($640)) + 8|0);
      $662 = $661;
      $663 = $662 & 7;
      $664 = ($663|0)==(0);
      $665 = (0 - ($662))|0;
      $666 = $665 & 7;
      $667 = $664 ? 0 : $666;
      $668 = (($640) + ($667)|0);
      $669 = $668;
      $670 = $660;
      $671 = (($669) - ($670))|0;
      $672 = (($660) + ($$0192)|0);
      $673 = (($671) - ($$0192))|0;
      $674 = $$0192 | 3;
      $675 = ((($660)) + 4|0);
      HEAP32[$675>>2] = $674;
      $676 = ($668|0)==($581|0);
      do {
       if ($676) {
        $677 = HEAP32[(17356)>>2]|0;
        $678 = (($677) + ($673))|0;
        HEAP32[(17356)>>2] = $678;
        HEAP32[(17368)>>2] = $672;
        $679 = $678 | 1;
        $680 = ((($672)) + 4|0);
        HEAP32[$680>>2] = $679;
       } else {
        $681 = HEAP32[(17364)>>2]|0;
        $682 = ($668|0)==($681|0);
        if ($682) {
         $683 = HEAP32[(17352)>>2]|0;
         $684 = (($683) + ($673))|0;
         HEAP32[(17352)>>2] = $684;
         HEAP32[(17364)>>2] = $672;
         $685 = $684 | 1;
         $686 = ((($672)) + 4|0);
         HEAP32[$686>>2] = $685;
         $687 = (($672) + ($684)|0);
         HEAP32[$687>>2] = $684;
         break;
        }
        $688 = ((($668)) + 4|0);
        $689 = HEAP32[$688>>2]|0;
        $690 = $689 & 3;
        $691 = ($690|0)==(1);
        if ($691) {
         $692 = $689 & -8;
         $693 = $689 >>> 3;
         $694 = ($689>>>0)<(256);
         L237: do {
          if ($694) {
           $695 = ((($668)) + 8|0);
           $696 = HEAP32[$695>>2]|0;
           $697 = ((($668)) + 12|0);
           $698 = HEAP32[$697>>2]|0;
           $699 = ($698|0)==($696|0);
           if ($699) {
            $700 = 1 << $693;
            $701 = $700 ^ -1;
            $702 = HEAP32[4336]|0;
            $703 = $702 & $701;
            HEAP32[4336] = $703;
            break;
           } else {
            $704 = ((($696)) + 12|0);
            HEAP32[$704>>2] = $698;
            $705 = ((($698)) + 8|0);
            HEAP32[$705>>2] = $696;
            break;
           }
          } else {
           $706 = ((($668)) + 24|0);
           $707 = HEAP32[$706>>2]|0;
           $708 = ((($668)) + 12|0);
           $709 = HEAP32[$708>>2]|0;
           $710 = ($709|0)==($668|0);
           do {
            if ($710) {
             $715 = ((($668)) + 16|0);
             $716 = ((($715)) + 4|0);
             $717 = HEAP32[$716>>2]|0;
             $718 = ($717|0)==(0|0);
             if ($718) {
              $719 = HEAP32[$715>>2]|0;
              $720 = ($719|0)==(0|0);
              if ($720) {
               $$3$i$i = 0;
               break;
              } else {
               $$1264$i$i = $719;$$1266$i$i = $715;
              }
             } else {
              $$1264$i$i = $717;$$1266$i$i = $716;
             }
             while(1) {
              $721 = ((($$1264$i$i)) + 20|0);
              $722 = HEAP32[$721>>2]|0;
              $723 = ($722|0)==(0|0);
              if (!($723)) {
               $$1264$i$i = $722;$$1266$i$i = $721;
               continue;
              }
              $724 = ((($$1264$i$i)) + 16|0);
              $725 = HEAP32[$724>>2]|0;
              $726 = ($725|0)==(0|0);
              if ($726) {
               break;
              } else {
               $$1264$i$i = $725;$$1266$i$i = $724;
              }
             }
             HEAP32[$$1266$i$i>>2] = 0;
             $$3$i$i = $$1264$i$i;
            } else {
             $711 = ((($668)) + 8|0);
             $712 = HEAP32[$711>>2]|0;
             $713 = ((($712)) + 12|0);
             HEAP32[$713>>2] = $709;
             $714 = ((($709)) + 8|0);
             HEAP32[$714>>2] = $712;
             $$3$i$i = $709;
            }
           } while(0);
           $727 = ($707|0)==(0|0);
           if ($727) {
            break;
           }
           $728 = ((($668)) + 28|0);
           $729 = HEAP32[$728>>2]|0;
           $730 = (17648 + ($729<<2)|0);
           $731 = HEAP32[$730>>2]|0;
           $732 = ($668|0)==($731|0);
           do {
            if ($732) {
             HEAP32[$730>>2] = $$3$i$i;
             $cond$i$i = ($$3$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $733 = 1 << $729;
             $734 = $733 ^ -1;
             $735 = HEAP32[(17348)>>2]|0;
             $736 = $735 & $734;
             HEAP32[(17348)>>2] = $736;
             break L237;
            } else {
             $737 = ((($707)) + 16|0);
             $738 = HEAP32[$737>>2]|0;
             $not$$i$i = ($738|0)!=($668|0);
             $$sink1$i$i = $not$$i$i&1;
             $739 = (((($707)) + 16|0) + ($$sink1$i$i<<2)|0);
             HEAP32[$739>>2] = $$3$i$i;
             $740 = ($$3$i$i|0)==(0|0);
             if ($740) {
              break L237;
             }
            }
           } while(0);
           $741 = ((($$3$i$i)) + 24|0);
           HEAP32[$741>>2] = $707;
           $742 = ((($668)) + 16|0);
           $743 = HEAP32[$742>>2]|0;
           $744 = ($743|0)==(0|0);
           if (!($744)) {
            $745 = ((($$3$i$i)) + 16|0);
            HEAP32[$745>>2] = $743;
            $746 = ((($743)) + 24|0);
            HEAP32[$746>>2] = $$3$i$i;
           }
           $747 = ((($742)) + 4|0);
           $748 = HEAP32[$747>>2]|0;
           $749 = ($748|0)==(0|0);
           if ($749) {
            break;
           }
           $750 = ((($$3$i$i)) + 20|0);
           HEAP32[$750>>2] = $748;
           $751 = ((($748)) + 24|0);
           HEAP32[$751>>2] = $$3$i$i;
          }
         } while(0);
         $752 = (($668) + ($692)|0);
         $753 = (($692) + ($673))|0;
         $$0$i$i = $752;$$0260$i$i = $753;
        } else {
         $$0$i$i = $668;$$0260$i$i = $673;
        }
        $754 = ((($$0$i$i)) + 4|0);
        $755 = HEAP32[$754>>2]|0;
        $756 = $755 & -2;
        HEAP32[$754>>2] = $756;
        $757 = $$0260$i$i | 1;
        $758 = ((($672)) + 4|0);
        HEAP32[$758>>2] = $757;
        $759 = (($672) + ($$0260$i$i)|0);
        HEAP32[$759>>2] = $$0260$i$i;
        $760 = $$0260$i$i >>> 3;
        $761 = ($$0260$i$i>>>0)<(256);
        if ($761) {
         $762 = $760 << 1;
         $763 = (17384 + ($762<<2)|0);
         $764 = HEAP32[4336]|0;
         $765 = 1 << $760;
         $766 = $764 & $765;
         $767 = ($766|0)==(0);
         if ($767) {
          $768 = $764 | $765;
          HEAP32[4336] = $768;
          $$pre$i17$i = ((($763)) + 8|0);
          $$0268$i$i = $763;$$pre$phi$i18$iZ2D = $$pre$i17$i;
         } else {
          $769 = ((($763)) + 8|0);
          $770 = HEAP32[$769>>2]|0;
          $$0268$i$i = $770;$$pre$phi$i18$iZ2D = $769;
         }
         HEAP32[$$pre$phi$i18$iZ2D>>2] = $672;
         $771 = ((($$0268$i$i)) + 12|0);
         HEAP32[$771>>2] = $672;
         $772 = ((($672)) + 8|0);
         HEAP32[$772>>2] = $$0268$i$i;
         $773 = ((($672)) + 12|0);
         HEAP32[$773>>2] = $763;
         break;
        }
        $774 = $$0260$i$i >>> 8;
        $775 = ($774|0)==(0);
        do {
         if ($775) {
          $$0269$i$i = 0;
         } else {
          $776 = ($$0260$i$i>>>0)>(16777215);
          if ($776) {
           $$0269$i$i = 31;
           break;
          }
          $777 = (($774) + 1048320)|0;
          $778 = $777 >>> 16;
          $779 = $778 & 8;
          $780 = $774 << $779;
          $781 = (($780) + 520192)|0;
          $782 = $781 >>> 16;
          $783 = $782 & 4;
          $784 = $783 | $779;
          $785 = $780 << $783;
          $786 = (($785) + 245760)|0;
          $787 = $786 >>> 16;
          $788 = $787 & 2;
          $789 = $784 | $788;
          $790 = (14 - ($789))|0;
          $791 = $785 << $788;
          $792 = $791 >>> 15;
          $793 = (($790) + ($792))|0;
          $794 = $793 << 1;
          $795 = (($793) + 7)|0;
          $796 = $$0260$i$i >>> $795;
          $797 = $796 & 1;
          $798 = $797 | $794;
          $$0269$i$i = $798;
         }
        } while(0);
        $799 = (17648 + ($$0269$i$i<<2)|0);
        $800 = ((($672)) + 28|0);
        HEAP32[$800>>2] = $$0269$i$i;
        $801 = ((($672)) + 16|0);
        $802 = ((($801)) + 4|0);
        HEAP32[$802>>2] = 0;
        HEAP32[$801>>2] = 0;
        $803 = HEAP32[(17348)>>2]|0;
        $804 = 1 << $$0269$i$i;
        $805 = $803 & $804;
        $806 = ($805|0)==(0);
        if ($806) {
         $807 = $803 | $804;
         HEAP32[(17348)>>2] = $807;
         HEAP32[$799>>2] = $672;
         $808 = ((($672)) + 24|0);
         HEAP32[$808>>2] = $799;
         $809 = ((($672)) + 12|0);
         HEAP32[$809>>2] = $672;
         $810 = ((($672)) + 8|0);
         HEAP32[$810>>2] = $672;
         break;
        }
        $811 = HEAP32[$799>>2]|0;
        $812 = ($$0269$i$i|0)==(31);
        $813 = $$0269$i$i >>> 1;
        $814 = (25 - ($813))|0;
        $815 = $812 ? 0 : $814;
        $816 = $$0260$i$i << $815;
        $$0261$i$i = $816;$$0262$i$i = $811;
        while(1) {
         $817 = ((($$0262$i$i)) + 4|0);
         $818 = HEAP32[$817>>2]|0;
         $819 = $818 & -8;
         $820 = ($819|0)==($$0260$i$i|0);
         if ($820) {
          label = 194;
          break;
         }
         $821 = $$0261$i$i >>> 31;
         $822 = (((($$0262$i$i)) + 16|0) + ($821<<2)|0);
         $823 = $$0261$i$i << 1;
         $824 = HEAP32[$822>>2]|0;
         $825 = ($824|0)==(0|0);
         if ($825) {
          label = 193;
          break;
         } else {
          $$0261$i$i = $823;$$0262$i$i = $824;
         }
        }
        if ((label|0) == 193) {
         HEAP32[$822>>2] = $672;
         $826 = ((($672)) + 24|0);
         HEAP32[$826>>2] = $$0262$i$i;
         $827 = ((($672)) + 12|0);
         HEAP32[$827>>2] = $672;
         $828 = ((($672)) + 8|0);
         HEAP32[$828>>2] = $672;
         break;
        }
        else if ((label|0) == 194) {
         $829 = ((($$0262$i$i)) + 8|0);
         $830 = HEAP32[$829>>2]|0;
         $831 = ((($830)) + 12|0);
         HEAP32[$831>>2] = $672;
         HEAP32[$829>>2] = $672;
         $832 = ((($672)) + 8|0);
         HEAP32[$832>>2] = $830;
         $833 = ((($672)) + 12|0);
         HEAP32[$833>>2] = $$0262$i$i;
         $834 = ((($672)) + 24|0);
         HEAP32[$834>>2] = 0;
         break;
        }
       }
      } while(0);
      $959 = ((($660)) + 8|0);
      $$0 = $959;
      STACKTOP = sp;return ($$0|0);
     }
    }
    $$0$i$i$i = (17792);
    while(1) {
     $835 = HEAP32[$$0$i$i$i>>2]|0;
     $836 = ($835>>>0)>($581>>>0);
     if (!($836)) {
      $837 = ((($$0$i$i$i)) + 4|0);
      $838 = HEAP32[$837>>2]|0;
      $839 = (($835) + ($838)|0);
      $840 = ($839>>>0)>($581>>>0);
      if ($840) {
       break;
      }
     }
     $841 = ((($$0$i$i$i)) + 8|0);
     $842 = HEAP32[$841>>2]|0;
     $$0$i$i$i = $842;
    }
    $843 = ((($839)) + -47|0);
    $844 = ((($843)) + 8|0);
    $845 = $844;
    $846 = $845 & 7;
    $847 = ($846|0)==(0);
    $848 = (0 - ($845))|0;
    $849 = $848 & 7;
    $850 = $847 ? 0 : $849;
    $851 = (($843) + ($850)|0);
    $852 = ((($581)) + 16|0);
    $853 = ($851>>>0)<($852>>>0);
    $854 = $853 ? $581 : $851;
    $855 = ((($854)) + 8|0);
    $856 = ((($854)) + 24|0);
    $857 = (($$723947$i) + -40)|0;
    $858 = ((($$748$i)) + 8|0);
    $859 = $858;
    $860 = $859 & 7;
    $861 = ($860|0)==(0);
    $862 = (0 - ($859))|0;
    $863 = $862 & 7;
    $864 = $861 ? 0 : $863;
    $865 = (($$748$i) + ($864)|0);
    $866 = (($857) - ($864))|0;
    HEAP32[(17368)>>2] = $865;
    HEAP32[(17356)>>2] = $866;
    $867 = $866 | 1;
    $868 = ((($865)) + 4|0);
    HEAP32[$868>>2] = $867;
    $869 = (($865) + ($866)|0);
    $870 = ((($869)) + 4|0);
    HEAP32[$870>>2] = 40;
    $871 = HEAP32[(17832)>>2]|0;
    HEAP32[(17372)>>2] = $871;
    $872 = ((($854)) + 4|0);
    HEAP32[$872>>2] = 27;
    ;HEAP32[$855>>2]=HEAP32[(17792)>>2]|0;HEAP32[$855+4>>2]=HEAP32[(17792)+4>>2]|0;HEAP32[$855+8>>2]=HEAP32[(17792)+8>>2]|0;HEAP32[$855+12>>2]=HEAP32[(17792)+12>>2]|0;
    HEAP32[(17792)>>2] = $$748$i;
    HEAP32[(17796)>>2] = $$723947$i;
    HEAP32[(17804)>>2] = 0;
    HEAP32[(17800)>>2] = $855;
    $874 = $856;
    while(1) {
     $873 = ((($874)) + 4|0);
     HEAP32[$873>>2] = 7;
     $875 = ((($874)) + 8|0);
     $876 = ($875>>>0)<($839>>>0);
     if ($876) {
      $874 = $873;
     } else {
      break;
     }
    }
    $877 = ($854|0)==($581|0);
    if (!($877)) {
     $878 = $854;
     $879 = $581;
     $880 = (($878) - ($879))|0;
     $881 = HEAP32[$872>>2]|0;
     $882 = $881 & -2;
     HEAP32[$872>>2] = $882;
     $883 = $880 | 1;
     $884 = ((($581)) + 4|0);
     HEAP32[$884>>2] = $883;
     HEAP32[$854>>2] = $880;
     $885 = $880 >>> 3;
     $886 = ($880>>>0)<(256);
     if ($886) {
      $887 = $885 << 1;
      $888 = (17384 + ($887<<2)|0);
      $889 = HEAP32[4336]|0;
      $890 = 1 << $885;
      $891 = $889 & $890;
      $892 = ($891|0)==(0);
      if ($892) {
       $893 = $889 | $890;
       HEAP32[4336] = $893;
       $$pre$i$i = ((($888)) + 8|0);
       $$0206$i$i = $888;$$pre$phi$i$iZ2D = $$pre$i$i;
      } else {
       $894 = ((($888)) + 8|0);
       $895 = HEAP32[$894>>2]|0;
       $$0206$i$i = $895;$$pre$phi$i$iZ2D = $894;
      }
      HEAP32[$$pre$phi$i$iZ2D>>2] = $581;
      $896 = ((($$0206$i$i)) + 12|0);
      HEAP32[$896>>2] = $581;
      $897 = ((($581)) + 8|0);
      HEAP32[$897>>2] = $$0206$i$i;
      $898 = ((($581)) + 12|0);
      HEAP32[$898>>2] = $888;
      break;
     }
     $899 = $880 >>> 8;
     $900 = ($899|0)==(0);
     if ($900) {
      $$0207$i$i = 0;
     } else {
      $901 = ($880>>>0)>(16777215);
      if ($901) {
       $$0207$i$i = 31;
      } else {
       $902 = (($899) + 1048320)|0;
       $903 = $902 >>> 16;
       $904 = $903 & 8;
       $905 = $899 << $904;
       $906 = (($905) + 520192)|0;
       $907 = $906 >>> 16;
       $908 = $907 & 4;
       $909 = $908 | $904;
       $910 = $905 << $908;
       $911 = (($910) + 245760)|0;
       $912 = $911 >>> 16;
       $913 = $912 & 2;
       $914 = $909 | $913;
       $915 = (14 - ($914))|0;
       $916 = $910 << $913;
       $917 = $916 >>> 15;
       $918 = (($915) + ($917))|0;
       $919 = $918 << 1;
       $920 = (($918) + 7)|0;
       $921 = $880 >>> $920;
       $922 = $921 & 1;
       $923 = $922 | $919;
       $$0207$i$i = $923;
      }
     }
     $924 = (17648 + ($$0207$i$i<<2)|0);
     $925 = ((($581)) + 28|0);
     HEAP32[$925>>2] = $$0207$i$i;
     $926 = ((($581)) + 20|0);
     HEAP32[$926>>2] = 0;
     HEAP32[$852>>2] = 0;
     $927 = HEAP32[(17348)>>2]|0;
     $928 = 1 << $$0207$i$i;
     $929 = $927 & $928;
     $930 = ($929|0)==(0);
     if ($930) {
      $931 = $927 | $928;
      HEAP32[(17348)>>2] = $931;
      HEAP32[$924>>2] = $581;
      $932 = ((($581)) + 24|0);
      HEAP32[$932>>2] = $924;
      $933 = ((($581)) + 12|0);
      HEAP32[$933>>2] = $581;
      $934 = ((($581)) + 8|0);
      HEAP32[$934>>2] = $581;
      break;
     }
     $935 = HEAP32[$924>>2]|0;
     $936 = ($$0207$i$i|0)==(31);
     $937 = $$0207$i$i >>> 1;
     $938 = (25 - ($937))|0;
     $939 = $936 ? 0 : $938;
     $940 = $880 << $939;
     $$0201$i$i = $940;$$0202$i$i = $935;
     while(1) {
      $941 = ((($$0202$i$i)) + 4|0);
      $942 = HEAP32[$941>>2]|0;
      $943 = $942 & -8;
      $944 = ($943|0)==($880|0);
      if ($944) {
       label = 216;
       break;
      }
      $945 = $$0201$i$i >>> 31;
      $946 = (((($$0202$i$i)) + 16|0) + ($945<<2)|0);
      $947 = $$0201$i$i << 1;
      $948 = HEAP32[$946>>2]|0;
      $949 = ($948|0)==(0|0);
      if ($949) {
       label = 215;
       break;
      } else {
       $$0201$i$i = $947;$$0202$i$i = $948;
      }
     }
     if ((label|0) == 215) {
      HEAP32[$946>>2] = $581;
      $950 = ((($581)) + 24|0);
      HEAP32[$950>>2] = $$0202$i$i;
      $951 = ((($581)) + 12|0);
      HEAP32[$951>>2] = $581;
      $952 = ((($581)) + 8|0);
      HEAP32[$952>>2] = $581;
      break;
     }
     else if ((label|0) == 216) {
      $953 = ((($$0202$i$i)) + 8|0);
      $954 = HEAP32[$953>>2]|0;
      $955 = ((($954)) + 12|0);
      HEAP32[$955>>2] = $581;
      HEAP32[$953>>2] = $581;
      $956 = ((($581)) + 8|0);
      HEAP32[$956>>2] = $954;
      $957 = ((($581)) + 12|0);
      HEAP32[$957>>2] = $$0202$i$i;
      $958 = ((($581)) + 24|0);
      HEAP32[$958>>2] = 0;
      break;
     }
    }
   }
  } while(0);
  $960 = HEAP32[(17356)>>2]|0;
  $961 = ($960>>>0)>($$0192>>>0);
  if ($961) {
   $962 = (($960) - ($$0192))|0;
   HEAP32[(17356)>>2] = $962;
   $963 = HEAP32[(17368)>>2]|0;
   $964 = (($963) + ($$0192)|0);
   HEAP32[(17368)>>2] = $964;
   $965 = $962 | 1;
   $966 = ((($964)) + 4|0);
   HEAP32[$966>>2] = $965;
   $967 = $$0192 | 3;
   $968 = ((($963)) + 4|0);
   HEAP32[$968>>2] = $967;
   $969 = ((($963)) + 8|0);
   $$0 = $969;
   STACKTOP = sp;return ($$0|0);
  }
 }
 $970 = (___errno_location()|0);
 HEAP32[$970>>2] = 12;
 $$0 = 0;
 STACKTOP = sp;return ($$0|0);
}
function _free($0) {
 $0 = $0|0;
 var $$0195$i = 0, $$0195$in$i = 0, $$0348 = 0, $$0349 = 0, $$0361 = 0, $$0368 = 0, $$1 = 0, $$1347 = 0, $$1352 = 0, $$1355 = 0, $$1363 = 0, $$1367 = 0, $$2 = 0, $$3 = 0, $$3365 = 0, $$pre = 0, $$pre$phiZ2D = 0, $$sink3 = 0, $$sink5 = 0, $1 = 0;
 var $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0;
 var $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0;
 var $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0;
 var $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0;
 var $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0;
 var $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0;
 var $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0;
 var $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0;
 var $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $cond374 = 0, $cond375 = 0, $not$ = 0, $not$370 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0|0)==(0|0);
 if ($1) {
  return;
 }
 $2 = ((($0)) + -8|0);
 $3 = HEAP32[(17360)>>2]|0;
 $4 = ((($0)) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & -8;
 $7 = (($2) + ($6)|0);
 $8 = $5 & 1;
 $9 = ($8|0)==(0);
 do {
  if ($9) {
   $10 = HEAP32[$2>>2]|0;
   $11 = $5 & 3;
   $12 = ($11|0)==(0);
   if ($12) {
    return;
   }
   $13 = (0 - ($10))|0;
   $14 = (($2) + ($13)|0);
   $15 = (($10) + ($6))|0;
   $16 = ($14>>>0)<($3>>>0);
   if ($16) {
    return;
   }
   $17 = HEAP32[(17364)>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $78 = ((($7)) + 4|0);
    $79 = HEAP32[$78>>2]|0;
    $80 = $79 & 3;
    $81 = ($80|0)==(3);
    if (!($81)) {
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    }
    $82 = (($14) + ($15)|0);
    $83 = ((($14)) + 4|0);
    $84 = $15 | 1;
    $85 = $79 & -2;
    HEAP32[(17352)>>2] = $15;
    HEAP32[$78>>2] = $85;
    HEAP32[$83>>2] = $84;
    HEAP32[$82>>2] = $15;
    return;
   }
   $19 = $10 >>> 3;
   $20 = ($10>>>0)<(256);
   if ($20) {
    $21 = ((($14)) + 8|0);
    $22 = HEAP32[$21>>2]|0;
    $23 = ((($14)) + 12|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = ($24|0)==($22|0);
    if ($25) {
     $26 = 1 << $19;
     $27 = $26 ^ -1;
     $28 = HEAP32[4336]|0;
     $29 = $28 & $27;
     HEAP32[4336] = $29;
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    } else {
     $30 = ((($22)) + 12|0);
     HEAP32[$30>>2] = $24;
     $31 = ((($24)) + 8|0);
     HEAP32[$31>>2] = $22;
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    }
   }
   $32 = ((($14)) + 24|0);
   $33 = HEAP32[$32>>2]|0;
   $34 = ((($14)) + 12|0);
   $35 = HEAP32[$34>>2]|0;
   $36 = ($35|0)==($14|0);
   do {
    if ($36) {
     $41 = ((($14)) + 16|0);
     $42 = ((($41)) + 4|0);
     $43 = HEAP32[$42>>2]|0;
     $44 = ($43|0)==(0|0);
     if ($44) {
      $45 = HEAP32[$41>>2]|0;
      $46 = ($45|0)==(0|0);
      if ($46) {
       $$3 = 0;
       break;
      } else {
       $$1352 = $45;$$1355 = $41;
      }
     } else {
      $$1352 = $43;$$1355 = $42;
     }
     while(1) {
      $47 = ((($$1352)) + 20|0);
      $48 = HEAP32[$47>>2]|0;
      $49 = ($48|0)==(0|0);
      if (!($49)) {
       $$1352 = $48;$$1355 = $47;
       continue;
      }
      $50 = ((($$1352)) + 16|0);
      $51 = HEAP32[$50>>2]|0;
      $52 = ($51|0)==(0|0);
      if ($52) {
       break;
      } else {
       $$1352 = $51;$$1355 = $50;
      }
     }
     HEAP32[$$1355>>2] = 0;
     $$3 = $$1352;
    } else {
     $37 = ((($14)) + 8|0);
     $38 = HEAP32[$37>>2]|0;
     $39 = ((($38)) + 12|0);
     HEAP32[$39>>2] = $35;
     $40 = ((($35)) + 8|0);
     HEAP32[$40>>2] = $38;
     $$3 = $35;
    }
   } while(0);
   $53 = ($33|0)==(0|0);
   if ($53) {
    $$1 = $14;$$1347 = $15;$87 = $14;
   } else {
    $54 = ((($14)) + 28|0);
    $55 = HEAP32[$54>>2]|0;
    $56 = (17648 + ($55<<2)|0);
    $57 = HEAP32[$56>>2]|0;
    $58 = ($14|0)==($57|0);
    if ($58) {
     HEAP32[$56>>2] = $$3;
     $cond374 = ($$3|0)==(0|0);
     if ($cond374) {
      $59 = 1 << $55;
      $60 = $59 ^ -1;
      $61 = HEAP32[(17348)>>2]|0;
      $62 = $61 & $60;
      HEAP32[(17348)>>2] = $62;
      $$1 = $14;$$1347 = $15;$87 = $14;
      break;
     }
    } else {
     $63 = ((($33)) + 16|0);
     $64 = HEAP32[$63>>2]|0;
     $not$370 = ($64|0)!=($14|0);
     $$sink3 = $not$370&1;
     $65 = (((($33)) + 16|0) + ($$sink3<<2)|0);
     HEAP32[$65>>2] = $$3;
     $66 = ($$3|0)==(0|0);
     if ($66) {
      $$1 = $14;$$1347 = $15;$87 = $14;
      break;
     }
    }
    $67 = ((($$3)) + 24|0);
    HEAP32[$67>>2] = $33;
    $68 = ((($14)) + 16|0);
    $69 = HEAP32[$68>>2]|0;
    $70 = ($69|0)==(0|0);
    if (!($70)) {
     $71 = ((($$3)) + 16|0);
     HEAP32[$71>>2] = $69;
     $72 = ((($69)) + 24|0);
     HEAP32[$72>>2] = $$3;
    }
    $73 = ((($68)) + 4|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($74|0)==(0|0);
    if ($75) {
     $$1 = $14;$$1347 = $15;$87 = $14;
    } else {
     $76 = ((($$3)) + 20|0);
     HEAP32[$76>>2] = $74;
     $77 = ((($74)) + 24|0);
     HEAP32[$77>>2] = $$3;
     $$1 = $14;$$1347 = $15;$87 = $14;
    }
   }
  } else {
   $$1 = $2;$$1347 = $6;$87 = $2;
  }
 } while(0);
 $86 = ($87>>>0)<($7>>>0);
 if (!($86)) {
  return;
 }
 $88 = ((($7)) + 4|0);
 $89 = HEAP32[$88>>2]|0;
 $90 = $89 & 1;
 $91 = ($90|0)==(0);
 if ($91) {
  return;
 }
 $92 = $89 & 2;
 $93 = ($92|0)==(0);
 if ($93) {
  $94 = HEAP32[(17368)>>2]|0;
  $95 = ($7|0)==($94|0);
  $96 = HEAP32[(17364)>>2]|0;
  if ($95) {
   $97 = HEAP32[(17356)>>2]|0;
   $98 = (($97) + ($$1347))|0;
   HEAP32[(17356)>>2] = $98;
   HEAP32[(17368)>>2] = $$1;
   $99 = $98 | 1;
   $100 = ((($$1)) + 4|0);
   HEAP32[$100>>2] = $99;
   $101 = ($$1|0)==($96|0);
   if (!($101)) {
    return;
   }
   HEAP32[(17364)>>2] = 0;
   HEAP32[(17352)>>2] = 0;
   return;
  }
  $102 = ($7|0)==($96|0);
  if ($102) {
   $103 = HEAP32[(17352)>>2]|0;
   $104 = (($103) + ($$1347))|0;
   HEAP32[(17352)>>2] = $104;
   HEAP32[(17364)>>2] = $87;
   $105 = $104 | 1;
   $106 = ((($$1)) + 4|0);
   HEAP32[$106>>2] = $105;
   $107 = (($87) + ($104)|0);
   HEAP32[$107>>2] = $104;
   return;
  }
  $108 = $89 & -8;
  $109 = (($108) + ($$1347))|0;
  $110 = $89 >>> 3;
  $111 = ($89>>>0)<(256);
  do {
   if ($111) {
    $112 = ((($7)) + 8|0);
    $113 = HEAP32[$112>>2]|0;
    $114 = ((($7)) + 12|0);
    $115 = HEAP32[$114>>2]|0;
    $116 = ($115|0)==($113|0);
    if ($116) {
     $117 = 1 << $110;
     $118 = $117 ^ -1;
     $119 = HEAP32[4336]|0;
     $120 = $119 & $118;
     HEAP32[4336] = $120;
     break;
    } else {
     $121 = ((($113)) + 12|0);
     HEAP32[$121>>2] = $115;
     $122 = ((($115)) + 8|0);
     HEAP32[$122>>2] = $113;
     break;
    }
   } else {
    $123 = ((($7)) + 24|0);
    $124 = HEAP32[$123>>2]|0;
    $125 = ((($7)) + 12|0);
    $126 = HEAP32[$125>>2]|0;
    $127 = ($126|0)==($7|0);
    do {
     if ($127) {
      $132 = ((($7)) + 16|0);
      $133 = ((($132)) + 4|0);
      $134 = HEAP32[$133>>2]|0;
      $135 = ($134|0)==(0|0);
      if ($135) {
       $136 = HEAP32[$132>>2]|0;
       $137 = ($136|0)==(0|0);
       if ($137) {
        $$3365 = 0;
        break;
       } else {
        $$1363 = $136;$$1367 = $132;
       }
      } else {
       $$1363 = $134;$$1367 = $133;
      }
      while(1) {
       $138 = ((($$1363)) + 20|0);
       $139 = HEAP32[$138>>2]|0;
       $140 = ($139|0)==(0|0);
       if (!($140)) {
        $$1363 = $139;$$1367 = $138;
        continue;
       }
       $141 = ((($$1363)) + 16|0);
       $142 = HEAP32[$141>>2]|0;
       $143 = ($142|0)==(0|0);
       if ($143) {
        break;
       } else {
        $$1363 = $142;$$1367 = $141;
       }
      }
      HEAP32[$$1367>>2] = 0;
      $$3365 = $$1363;
     } else {
      $128 = ((($7)) + 8|0);
      $129 = HEAP32[$128>>2]|0;
      $130 = ((($129)) + 12|0);
      HEAP32[$130>>2] = $126;
      $131 = ((($126)) + 8|0);
      HEAP32[$131>>2] = $129;
      $$3365 = $126;
     }
    } while(0);
    $144 = ($124|0)==(0|0);
    if (!($144)) {
     $145 = ((($7)) + 28|0);
     $146 = HEAP32[$145>>2]|0;
     $147 = (17648 + ($146<<2)|0);
     $148 = HEAP32[$147>>2]|0;
     $149 = ($7|0)==($148|0);
     if ($149) {
      HEAP32[$147>>2] = $$3365;
      $cond375 = ($$3365|0)==(0|0);
      if ($cond375) {
       $150 = 1 << $146;
       $151 = $150 ^ -1;
       $152 = HEAP32[(17348)>>2]|0;
       $153 = $152 & $151;
       HEAP32[(17348)>>2] = $153;
       break;
      }
     } else {
      $154 = ((($124)) + 16|0);
      $155 = HEAP32[$154>>2]|0;
      $not$ = ($155|0)!=($7|0);
      $$sink5 = $not$&1;
      $156 = (((($124)) + 16|0) + ($$sink5<<2)|0);
      HEAP32[$156>>2] = $$3365;
      $157 = ($$3365|0)==(0|0);
      if ($157) {
       break;
      }
     }
     $158 = ((($$3365)) + 24|0);
     HEAP32[$158>>2] = $124;
     $159 = ((($7)) + 16|0);
     $160 = HEAP32[$159>>2]|0;
     $161 = ($160|0)==(0|0);
     if (!($161)) {
      $162 = ((($$3365)) + 16|0);
      HEAP32[$162>>2] = $160;
      $163 = ((($160)) + 24|0);
      HEAP32[$163>>2] = $$3365;
     }
     $164 = ((($159)) + 4|0);
     $165 = HEAP32[$164>>2]|0;
     $166 = ($165|0)==(0|0);
     if (!($166)) {
      $167 = ((($$3365)) + 20|0);
      HEAP32[$167>>2] = $165;
      $168 = ((($165)) + 24|0);
      HEAP32[$168>>2] = $$3365;
     }
    }
   }
  } while(0);
  $169 = $109 | 1;
  $170 = ((($$1)) + 4|0);
  HEAP32[$170>>2] = $169;
  $171 = (($87) + ($109)|0);
  HEAP32[$171>>2] = $109;
  $172 = HEAP32[(17364)>>2]|0;
  $173 = ($$1|0)==($172|0);
  if ($173) {
   HEAP32[(17352)>>2] = $109;
   return;
  } else {
   $$2 = $109;
  }
 } else {
  $174 = $89 & -2;
  HEAP32[$88>>2] = $174;
  $175 = $$1347 | 1;
  $176 = ((($$1)) + 4|0);
  HEAP32[$176>>2] = $175;
  $177 = (($87) + ($$1347)|0);
  HEAP32[$177>>2] = $$1347;
  $$2 = $$1347;
 }
 $178 = $$2 >>> 3;
 $179 = ($$2>>>0)<(256);
 if ($179) {
  $180 = $178 << 1;
  $181 = (17384 + ($180<<2)|0);
  $182 = HEAP32[4336]|0;
  $183 = 1 << $178;
  $184 = $182 & $183;
  $185 = ($184|0)==(0);
  if ($185) {
   $186 = $182 | $183;
   HEAP32[4336] = $186;
   $$pre = ((($181)) + 8|0);
   $$0368 = $181;$$pre$phiZ2D = $$pre;
  } else {
   $187 = ((($181)) + 8|0);
   $188 = HEAP32[$187>>2]|0;
   $$0368 = $188;$$pre$phiZ2D = $187;
  }
  HEAP32[$$pre$phiZ2D>>2] = $$1;
  $189 = ((($$0368)) + 12|0);
  HEAP32[$189>>2] = $$1;
  $190 = ((($$1)) + 8|0);
  HEAP32[$190>>2] = $$0368;
  $191 = ((($$1)) + 12|0);
  HEAP32[$191>>2] = $181;
  return;
 }
 $192 = $$2 >>> 8;
 $193 = ($192|0)==(0);
 if ($193) {
  $$0361 = 0;
 } else {
  $194 = ($$2>>>0)>(16777215);
  if ($194) {
   $$0361 = 31;
  } else {
   $195 = (($192) + 1048320)|0;
   $196 = $195 >>> 16;
   $197 = $196 & 8;
   $198 = $192 << $197;
   $199 = (($198) + 520192)|0;
   $200 = $199 >>> 16;
   $201 = $200 & 4;
   $202 = $201 | $197;
   $203 = $198 << $201;
   $204 = (($203) + 245760)|0;
   $205 = $204 >>> 16;
   $206 = $205 & 2;
   $207 = $202 | $206;
   $208 = (14 - ($207))|0;
   $209 = $203 << $206;
   $210 = $209 >>> 15;
   $211 = (($208) + ($210))|0;
   $212 = $211 << 1;
   $213 = (($211) + 7)|0;
   $214 = $$2 >>> $213;
   $215 = $214 & 1;
   $216 = $215 | $212;
   $$0361 = $216;
  }
 }
 $217 = (17648 + ($$0361<<2)|0);
 $218 = ((($$1)) + 28|0);
 HEAP32[$218>>2] = $$0361;
 $219 = ((($$1)) + 16|0);
 $220 = ((($$1)) + 20|0);
 HEAP32[$220>>2] = 0;
 HEAP32[$219>>2] = 0;
 $221 = HEAP32[(17348)>>2]|0;
 $222 = 1 << $$0361;
 $223 = $221 & $222;
 $224 = ($223|0)==(0);
 do {
  if ($224) {
   $225 = $221 | $222;
   HEAP32[(17348)>>2] = $225;
   HEAP32[$217>>2] = $$1;
   $226 = ((($$1)) + 24|0);
   HEAP32[$226>>2] = $217;
   $227 = ((($$1)) + 12|0);
   HEAP32[$227>>2] = $$1;
   $228 = ((($$1)) + 8|0);
   HEAP32[$228>>2] = $$1;
  } else {
   $229 = HEAP32[$217>>2]|0;
   $230 = ($$0361|0)==(31);
   $231 = $$0361 >>> 1;
   $232 = (25 - ($231))|0;
   $233 = $230 ? 0 : $232;
   $234 = $$2 << $233;
   $$0348 = $234;$$0349 = $229;
   while(1) {
    $235 = ((($$0349)) + 4|0);
    $236 = HEAP32[$235>>2]|0;
    $237 = $236 & -8;
    $238 = ($237|0)==($$2|0);
    if ($238) {
     label = 73;
     break;
    }
    $239 = $$0348 >>> 31;
    $240 = (((($$0349)) + 16|0) + ($239<<2)|0);
    $241 = $$0348 << 1;
    $242 = HEAP32[$240>>2]|0;
    $243 = ($242|0)==(0|0);
    if ($243) {
     label = 72;
     break;
    } else {
     $$0348 = $241;$$0349 = $242;
    }
   }
   if ((label|0) == 72) {
    HEAP32[$240>>2] = $$1;
    $244 = ((($$1)) + 24|0);
    HEAP32[$244>>2] = $$0349;
    $245 = ((($$1)) + 12|0);
    HEAP32[$245>>2] = $$1;
    $246 = ((($$1)) + 8|0);
    HEAP32[$246>>2] = $$1;
    break;
   }
   else if ((label|0) == 73) {
    $247 = ((($$0349)) + 8|0);
    $248 = HEAP32[$247>>2]|0;
    $249 = ((($248)) + 12|0);
    HEAP32[$249>>2] = $$1;
    HEAP32[$247>>2] = $$1;
    $250 = ((($$1)) + 8|0);
    HEAP32[$250>>2] = $248;
    $251 = ((($$1)) + 12|0);
    HEAP32[$251>>2] = $$0349;
    $252 = ((($$1)) + 24|0);
    HEAP32[$252>>2] = 0;
    break;
   }
  }
 } while(0);
 $253 = HEAP32[(17376)>>2]|0;
 $254 = (($253) + -1)|0;
 HEAP32[(17376)>>2] = $254;
 $255 = ($254|0)==(0);
 if ($255) {
  $$0195$in$i = (17800);
 } else {
  return;
 }
 while(1) {
  $$0195$i = HEAP32[$$0195$in$i>>2]|0;
  $256 = ($$0195$i|0)==(0|0);
  $257 = ((($$0195$i)) + 8|0);
  if ($256) {
   break;
  } else {
   $$0195$in$i = $257;
  }
 }
 HEAP32[(17376)>>2] = -1;
 return;
}
function _calloc($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$ = 0, $$0 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($0|0)==(0);
 if ($2) {
  $$0 = 0;
 } else {
  $3 = Math_imul($1, $0)|0;
  $4 = $1 | $0;
  $5 = ($4>>>0)>(65535);
  if ($5) {
   $6 = (($3>>>0) / ($0>>>0))&-1;
   $7 = ($6|0)==($1|0);
   $$ = $7 ? $3 : -1;
   $$0 = $$;
  } else {
   $$0 = $3;
  }
 }
 $8 = (_malloc($$0)|0);
 $9 = ($8|0)==(0|0);
 if ($9) {
  return ($8|0);
 }
 $10 = ((($8)) + -4|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = $11 & 3;
 $13 = ($12|0)==(0);
 if ($13) {
  return ($8|0);
 }
 _memset(($8|0),0,($$0|0))|0;
 return ($8|0);
}
function _realloc($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($0|0)==(0|0);
 if ($2) {
  $3 = (_malloc($1)|0);
  $$1 = $3;
  return ($$1|0);
 }
 $4 = ($1>>>0)>(4294967231);
 if ($4) {
  $5 = (___errno_location()|0);
  HEAP32[$5>>2] = 12;
  $$1 = 0;
  return ($$1|0);
 }
 $6 = ($1>>>0)<(11);
 $7 = (($1) + 11)|0;
 $8 = $7 & -8;
 $9 = $6 ? 16 : $8;
 $10 = ((($0)) + -8|0);
 $11 = (_try_realloc_chunk($10,$9)|0);
 $12 = ($11|0)==(0|0);
 if (!($12)) {
  $13 = ((($11)) + 8|0);
  $$1 = $13;
  return ($$1|0);
 }
 $14 = (_malloc($1)|0);
 $15 = ($14|0)==(0|0);
 if ($15) {
  $$1 = 0;
  return ($$1|0);
 }
 $16 = ((($0)) + -4|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = $17 & -8;
 $19 = $17 & 3;
 $20 = ($19|0)==(0);
 $21 = $20 ? 8 : 4;
 $22 = (($18) - ($21))|0;
 $23 = ($22>>>0)<($1>>>0);
 $24 = $23 ? $22 : $1;
 _memcpy(($14|0),($0|0),($24|0))|0;
 _free($0);
 $$1 = $14;
 return ($$1|0);
}
function _try_realloc_chunk($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$1246 = 0, $$1249 = 0, $$2 = 0, $$3 = 0, $$sink1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0;
 var $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $15 = 0, $16 = 0, $17 = 0;
 var $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0;
 var $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0;
 var $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0;
 var $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0;
 var $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $cond = 0, $not$ = 0, $storemerge = 0, $storemerge1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ((($0)) + 4|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = $3 & -8;
 $5 = (($0) + ($4)|0);
 $6 = $3 & 3;
 $7 = ($6|0)==(0);
 if ($7) {
  $8 = ($1>>>0)<(256);
  if ($8) {
   $$2 = 0;
   return ($$2|0);
  }
  $9 = (($1) + 4)|0;
  $10 = ($4>>>0)<($9>>>0);
  if (!($10)) {
   $11 = (($4) - ($1))|0;
   $12 = HEAP32[(17824)>>2]|0;
   $13 = $12 << 1;
   $14 = ($11>>>0)>($13>>>0);
   if (!($14)) {
    $$2 = $0;
    return ($$2|0);
   }
  }
  $$2 = 0;
  return ($$2|0);
 }
 $15 = ($4>>>0)<($1>>>0);
 if (!($15)) {
  $16 = (($4) - ($1))|0;
  $17 = ($16>>>0)>(15);
  if (!($17)) {
   $$2 = $0;
   return ($$2|0);
  }
  $18 = (($0) + ($1)|0);
  $19 = $3 & 1;
  $20 = $19 | $1;
  $21 = $20 | 2;
  HEAP32[$2>>2] = $21;
  $22 = ((($18)) + 4|0);
  $23 = $16 | 3;
  HEAP32[$22>>2] = $23;
  $24 = (($18) + ($16)|0);
  $25 = ((($24)) + 4|0);
  $26 = HEAP32[$25>>2]|0;
  $27 = $26 | 1;
  HEAP32[$25>>2] = $27;
  _dispose_chunk($18,$16);
  $$2 = $0;
  return ($$2|0);
 }
 $28 = HEAP32[(17368)>>2]|0;
 $29 = ($5|0)==($28|0);
 if ($29) {
  $30 = HEAP32[(17356)>>2]|0;
  $31 = (($30) + ($4))|0;
  $32 = ($31>>>0)>($1>>>0);
  $33 = (($31) - ($1))|0;
  $34 = (($0) + ($1)|0);
  if (!($32)) {
   $$2 = 0;
   return ($$2|0);
  }
  $35 = $33 | 1;
  $36 = ((($34)) + 4|0);
  $37 = $3 & 1;
  $38 = $37 | $1;
  $39 = $38 | 2;
  HEAP32[$2>>2] = $39;
  HEAP32[$36>>2] = $35;
  HEAP32[(17368)>>2] = $34;
  HEAP32[(17356)>>2] = $33;
  $$2 = $0;
  return ($$2|0);
 }
 $40 = HEAP32[(17364)>>2]|0;
 $41 = ($5|0)==($40|0);
 if ($41) {
  $42 = HEAP32[(17352)>>2]|0;
  $43 = (($42) + ($4))|0;
  $44 = ($43>>>0)<($1>>>0);
  if ($44) {
   $$2 = 0;
   return ($$2|0);
  }
  $45 = (($43) - ($1))|0;
  $46 = ($45>>>0)>(15);
  $47 = $3 & 1;
  if ($46) {
   $48 = (($0) + ($1)|0);
   $49 = (($48) + ($45)|0);
   $50 = $47 | $1;
   $51 = $50 | 2;
   HEAP32[$2>>2] = $51;
   $52 = ((($48)) + 4|0);
   $53 = $45 | 1;
   HEAP32[$52>>2] = $53;
   HEAP32[$49>>2] = $45;
   $54 = ((($49)) + 4|0);
   $55 = HEAP32[$54>>2]|0;
   $56 = $55 & -2;
   HEAP32[$54>>2] = $56;
   $storemerge = $48;$storemerge1 = $45;
  } else {
   $57 = $47 | $43;
   $58 = $57 | 2;
   HEAP32[$2>>2] = $58;
   $59 = (($0) + ($43)|0);
   $60 = ((($59)) + 4|0);
   $61 = HEAP32[$60>>2]|0;
   $62 = $61 | 1;
   HEAP32[$60>>2] = $62;
   $storemerge = 0;$storemerge1 = 0;
  }
  HEAP32[(17352)>>2] = $storemerge1;
  HEAP32[(17364)>>2] = $storemerge;
  $$2 = $0;
  return ($$2|0);
 }
 $63 = ((($5)) + 4|0);
 $64 = HEAP32[$63>>2]|0;
 $65 = $64 & 2;
 $66 = ($65|0)==(0);
 if (!($66)) {
  $$2 = 0;
  return ($$2|0);
 }
 $67 = $64 & -8;
 $68 = (($67) + ($4))|0;
 $69 = ($68>>>0)<($1>>>0);
 if ($69) {
  $$2 = 0;
  return ($$2|0);
 }
 $70 = (($68) - ($1))|0;
 $71 = $64 >>> 3;
 $72 = ($64>>>0)<(256);
 do {
  if ($72) {
   $73 = ((($5)) + 8|0);
   $74 = HEAP32[$73>>2]|0;
   $75 = ((($5)) + 12|0);
   $76 = HEAP32[$75>>2]|0;
   $77 = ($76|0)==($74|0);
   if ($77) {
    $78 = 1 << $71;
    $79 = $78 ^ -1;
    $80 = HEAP32[4336]|0;
    $81 = $80 & $79;
    HEAP32[4336] = $81;
    break;
   } else {
    $82 = ((($74)) + 12|0);
    HEAP32[$82>>2] = $76;
    $83 = ((($76)) + 8|0);
    HEAP32[$83>>2] = $74;
    break;
   }
  } else {
   $84 = ((($5)) + 24|0);
   $85 = HEAP32[$84>>2]|0;
   $86 = ((($5)) + 12|0);
   $87 = HEAP32[$86>>2]|0;
   $88 = ($87|0)==($5|0);
   do {
    if ($88) {
     $93 = ((($5)) + 16|0);
     $94 = ((($93)) + 4|0);
     $95 = HEAP32[$94>>2]|0;
     $96 = ($95|0)==(0|0);
     if ($96) {
      $97 = HEAP32[$93>>2]|0;
      $98 = ($97|0)==(0|0);
      if ($98) {
       $$3 = 0;
       break;
      } else {
       $$1246 = $97;$$1249 = $93;
      }
     } else {
      $$1246 = $95;$$1249 = $94;
     }
     while(1) {
      $99 = ((($$1246)) + 20|0);
      $100 = HEAP32[$99>>2]|0;
      $101 = ($100|0)==(0|0);
      if (!($101)) {
       $$1246 = $100;$$1249 = $99;
       continue;
      }
      $102 = ((($$1246)) + 16|0);
      $103 = HEAP32[$102>>2]|0;
      $104 = ($103|0)==(0|0);
      if ($104) {
       break;
      } else {
       $$1246 = $103;$$1249 = $102;
      }
     }
     HEAP32[$$1249>>2] = 0;
     $$3 = $$1246;
    } else {
     $89 = ((($5)) + 8|0);
     $90 = HEAP32[$89>>2]|0;
     $91 = ((($90)) + 12|0);
     HEAP32[$91>>2] = $87;
     $92 = ((($87)) + 8|0);
     HEAP32[$92>>2] = $90;
     $$3 = $87;
    }
   } while(0);
   $105 = ($85|0)==(0|0);
   if (!($105)) {
    $106 = ((($5)) + 28|0);
    $107 = HEAP32[$106>>2]|0;
    $108 = (17648 + ($107<<2)|0);
    $109 = HEAP32[$108>>2]|0;
    $110 = ($5|0)==($109|0);
    if ($110) {
     HEAP32[$108>>2] = $$3;
     $cond = ($$3|0)==(0|0);
     if ($cond) {
      $111 = 1 << $107;
      $112 = $111 ^ -1;
      $113 = HEAP32[(17348)>>2]|0;
      $114 = $113 & $112;
      HEAP32[(17348)>>2] = $114;
      break;
     }
    } else {
     $115 = ((($85)) + 16|0);
     $116 = HEAP32[$115>>2]|0;
     $not$ = ($116|0)!=($5|0);
     $$sink1 = $not$&1;
     $117 = (((($85)) + 16|0) + ($$sink1<<2)|0);
     HEAP32[$117>>2] = $$3;
     $118 = ($$3|0)==(0|0);
     if ($118) {
      break;
     }
    }
    $119 = ((($$3)) + 24|0);
    HEAP32[$119>>2] = $85;
    $120 = ((($5)) + 16|0);
    $121 = HEAP32[$120>>2]|0;
    $122 = ($121|0)==(0|0);
    if (!($122)) {
     $123 = ((($$3)) + 16|0);
     HEAP32[$123>>2] = $121;
     $124 = ((($121)) + 24|0);
     HEAP32[$124>>2] = $$3;
    }
    $125 = ((($120)) + 4|0);
    $126 = HEAP32[$125>>2]|0;
    $127 = ($126|0)==(0|0);
    if (!($127)) {
     $128 = ((($$3)) + 20|0);
     HEAP32[$128>>2] = $126;
     $129 = ((($126)) + 24|0);
     HEAP32[$129>>2] = $$3;
    }
   }
  }
 } while(0);
 $130 = ($70>>>0)<(16);
 $131 = $3 & 1;
 if ($130) {
  $132 = $68 | $131;
  $133 = $132 | 2;
  HEAP32[$2>>2] = $133;
  $134 = (($0) + ($68)|0);
  $135 = ((($134)) + 4|0);
  $136 = HEAP32[$135>>2]|0;
  $137 = $136 | 1;
  HEAP32[$135>>2] = $137;
  $$2 = $0;
  return ($$2|0);
 } else {
  $138 = (($0) + ($1)|0);
  $139 = $131 | $1;
  $140 = $139 | 2;
  HEAP32[$2>>2] = $140;
  $141 = ((($138)) + 4|0);
  $142 = $70 | 3;
  HEAP32[$141>>2] = $142;
  $143 = (($138) + ($70)|0);
  $144 = ((($143)) + 4|0);
  $145 = HEAP32[$144>>2]|0;
  $146 = $145 | 1;
  HEAP32[$144>>2] = $146;
  _dispose_chunk($138,$70);
  $$2 = $0;
  return ($$2|0);
 }
 return (0)|0;
}
function _dispose_chunk($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$0366 = 0, $$0367 = 0, $$0378 = 0, $$0385 = 0, $$1 = 0, $$1365 = 0, $$1373 = 0, $$1376 = 0, $$1380 = 0, $$1384 = 0, $$2 = 0, $$3 = 0, $$3382 = 0, $$pre = 0, $$pre$phiZ2D = 0, $$sink2 = 0, $$sink4 = 0, $10 = 0, $100 = 0, $101 = 0;
 var $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0;
 var $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0;
 var $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0;
 var $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0;
 var $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0;
 var $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0;
 var $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0;
 var $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $cond = 0, $cond5 = 0, $not$ = 0, $not$1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (($0) + ($1)|0);
 $3 = ((($0)) + 4|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = $4 & 1;
 $6 = ($5|0)==(0);
 do {
  if ($6) {
   $7 = HEAP32[$0>>2]|0;
   $8 = $4 & 3;
   $9 = ($8|0)==(0);
   if ($9) {
    return;
   }
   $10 = (0 - ($7))|0;
   $11 = (($0) + ($10)|0);
   $12 = (($7) + ($1))|0;
   $13 = HEAP32[(17364)>>2]|0;
   $14 = ($11|0)==($13|0);
   if ($14) {
    $74 = ((($2)) + 4|0);
    $75 = HEAP32[$74>>2]|0;
    $76 = $75 & 3;
    $77 = ($76|0)==(3);
    if (!($77)) {
     $$1 = $11;$$1365 = $12;
     break;
    }
    $78 = (($11) + ($12)|0);
    $79 = ((($11)) + 4|0);
    $80 = $12 | 1;
    $81 = $75 & -2;
    HEAP32[(17352)>>2] = $12;
    HEAP32[$74>>2] = $81;
    HEAP32[$79>>2] = $80;
    HEAP32[$78>>2] = $12;
    return;
   }
   $15 = $7 >>> 3;
   $16 = ($7>>>0)<(256);
   if ($16) {
    $17 = ((($11)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ((($11)) + 12|0);
    $20 = HEAP32[$19>>2]|0;
    $21 = ($20|0)==($18|0);
    if ($21) {
     $22 = 1 << $15;
     $23 = $22 ^ -1;
     $24 = HEAP32[4336]|0;
     $25 = $24 & $23;
     HEAP32[4336] = $25;
     $$1 = $11;$$1365 = $12;
     break;
    } else {
     $26 = ((($18)) + 12|0);
     HEAP32[$26>>2] = $20;
     $27 = ((($20)) + 8|0);
     HEAP32[$27>>2] = $18;
     $$1 = $11;$$1365 = $12;
     break;
    }
   }
   $28 = ((($11)) + 24|0);
   $29 = HEAP32[$28>>2]|0;
   $30 = ((($11)) + 12|0);
   $31 = HEAP32[$30>>2]|0;
   $32 = ($31|0)==($11|0);
   do {
    if ($32) {
     $37 = ((($11)) + 16|0);
     $38 = ((($37)) + 4|0);
     $39 = HEAP32[$38>>2]|0;
     $40 = ($39|0)==(0|0);
     if ($40) {
      $41 = HEAP32[$37>>2]|0;
      $42 = ($41|0)==(0|0);
      if ($42) {
       $$3 = 0;
       break;
      } else {
       $$1373 = $41;$$1376 = $37;
      }
     } else {
      $$1373 = $39;$$1376 = $38;
     }
     while(1) {
      $43 = ((($$1373)) + 20|0);
      $44 = HEAP32[$43>>2]|0;
      $45 = ($44|0)==(0|0);
      if (!($45)) {
       $$1373 = $44;$$1376 = $43;
       continue;
      }
      $46 = ((($$1373)) + 16|0);
      $47 = HEAP32[$46>>2]|0;
      $48 = ($47|0)==(0|0);
      if ($48) {
       break;
      } else {
       $$1373 = $47;$$1376 = $46;
      }
     }
     HEAP32[$$1376>>2] = 0;
     $$3 = $$1373;
    } else {
     $33 = ((($11)) + 8|0);
     $34 = HEAP32[$33>>2]|0;
     $35 = ((($34)) + 12|0);
     HEAP32[$35>>2] = $31;
     $36 = ((($31)) + 8|0);
     HEAP32[$36>>2] = $34;
     $$3 = $31;
    }
   } while(0);
   $49 = ($29|0)==(0|0);
   if ($49) {
    $$1 = $11;$$1365 = $12;
   } else {
    $50 = ((($11)) + 28|0);
    $51 = HEAP32[$50>>2]|0;
    $52 = (17648 + ($51<<2)|0);
    $53 = HEAP32[$52>>2]|0;
    $54 = ($11|0)==($53|0);
    if ($54) {
     HEAP32[$52>>2] = $$3;
     $cond = ($$3|0)==(0|0);
     if ($cond) {
      $55 = 1 << $51;
      $56 = $55 ^ -1;
      $57 = HEAP32[(17348)>>2]|0;
      $58 = $57 & $56;
      HEAP32[(17348)>>2] = $58;
      $$1 = $11;$$1365 = $12;
      break;
     }
    } else {
     $59 = ((($29)) + 16|0);
     $60 = HEAP32[$59>>2]|0;
     $not$1 = ($60|0)!=($11|0);
     $$sink2 = $not$1&1;
     $61 = (((($29)) + 16|0) + ($$sink2<<2)|0);
     HEAP32[$61>>2] = $$3;
     $62 = ($$3|0)==(0|0);
     if ($62) {
      $$1 = $11;$$1365 = $12;
      break;
     }
    }
    $63 = ((($$3)) + 24|0);
    HEAP32[$63>>2] = $29;
    $64 = ((($11)) + 16|0);
    $65 = HEAP32[$64>>2]|0;
    $66 = ($65|0)==(0|0);
    if (!($66)) {
     $67 = ((($$3)) + 16|0);
     HEAP32[$67>>2] = $65;
     $68 = ((($65)) + 24|0);
     HEAP32[$68>>2] = $$3;
    }
    $69 = ((($64)) + 4|0);
    $70 = HEAP32[$69>>2]|0;
    $71 = ($70|0)==(0|0);
    if ($71) {
     $$1 = $11;$$1365 = $12;
    } else {
     $72 = ((($$3)) + 20|0);
     HEAP32[$72>>2] = $70;
     $73 = ((($70)) + 24|0);
     HEAP32[$73>>2] = $$3;
     $$1 = $11;$$1365 = $12;
    }
   }
  } else {
   $$1 = $0;$$1365 = $1;
  }
 } while(0);
 $82 = ((($2)) + 4|0);
 $83 = HEAP32[$82>>2]|0;
 $84 = $83 & 2;
 $85 = ($84|0)==(0);
 if ($85) {
  $86 = HEAP32[(17368)>>2]|0;
  $87 = ($2|0)==($86|0);
  $88 = HEAP32[(17364)>>2]|0;
  if ($87) {
   $89 = HEAP32[(17356)>>2]|0;
   $90 = (($89) + ($$1365))|0;
   HEAP32[(17356)>>2] = $90;
   HEAP32[(17368)>>2] = $$1;
   $91 = $90 | 1;
   $92 = ((($$1)) + 4|0);
   HEAP32[$92>>2] = $91;
   $93 = ($$1|0)==($88|0);
   if (!($93)) {
    return;
   }
   HEAP32[(17364)>>2] = 0;
   HEAP32[(17352)>>2] = 0;
   return;
  }
  $94 = ($2|0)==($88|0);
  if ($94) {
   $95 = HEAP32[(17352)>>2]|0;
   $96 = (($95) + ($$1365))|0;
   HEAP32[(17352)>>2] = $96;
   HEAP32[(17364)>>2] = $$1;
   $97 = $96 | 1;
   $98 = ((($$1)) + 4|0);
   HEAP32[$98>>2] = $97;
   $99 = (($$1) + ($96)|0);
   HEAP32[$99>>2] = $96;
   return;
  }
  $100 = $83 & -8;
  $101 = (($100) + ($$1365))|0;
  $102 = $83 >>> 3;
  $103 = ($83>>>0)<(256);
  do {
   if ($103) {
    $104 = ((($2)) + 8|0);
    $105 = HEAP32[$104>>2]|0;
    $106 = ((($2)) + 12|0);
    $107 = HEAP32[$106>>2]|0;
    $108 = ($107|0)==($105|0);
    if ($108) {
     $109 = 1 << $102;
     $110 = $109 ^ -1;
     $111 = HEAP32[4336]|0;
     $112 = $111 & $110;
     HEAP32[4336] = $112;
     break;
    } else {
     $113 = ((($105)) + 12|0);
     HEAP32[$113>>2] = $107;
     $114 = ((($107)) + 8|0);
     HEAP32[$114>>2] = $105;
     break;
    }
   } else {
    $115 = ((($2)) + 24|0);
    $116 = HEAP32[$115>>2]|0;
    $117 = ((($2)) + 12|0);
    $118 = HEAP32[$117>>2]|0;
    $119 = ($118|0)==($2|0);
    do {
     if ($119) {
      $124 = ((($2)) + 16|0);
      $125 = ((($124)) + 4|0);
      $126 = HEAP32[$125>>2]|0;
      $127 = ($126|0)==(0|0);
      if ($127) {
       $128 = HEAP32[$124>>2]|0;
       $129 = ($128|0)==(0|0);
       if ($129) {
        $$3382 = 0;
        break;
       } else {
        $$1380 = $128;$$1384 = $124;
       }
      } else {
       $$1380 = $126;$$1384 = $125;
      }
      while(1) {
       $130 = ((($$1380)) + 20|0);
       $131 = HEAP32[$130>>2]|0;
       $132 = ($131|0)==(0|0);
       if (!($132)) {
        $$1380 = $131;$$1384 = $130;
        continue;
       }
       $133 = ((($$1380)) + 16|0);
       $134 = HEAP32[$133>>2]|0;
       $135 = ($134|0)==(0|0);
       if ($135) {
        break;
       } else {
        $$1380 = $134;$$1384 = $133;
       }
      }
      HEAP32[$$1384>>2] = 0;
      $$3382 = $$1380;
     } else {
      $120 = ((($2)) + 8|0);
      $121 = HEAP32[$120>>2]|0;
      $122 = ((($121)) + 12|0);
      HEAP32[$122>>2] = $118;
      $123 = ((($118)) + 8|0);
      HEAP32[$123>>2] = $121;
      $$3382 = $118;
     }
    } while(0);
    $136 = ($116|0)==(0|0);
    if (!($136)) {
     $137 = ((($2)) + 28|0);
     $138 = HEAP32[$137>>2]|0;
     $139 = (17648 + ($138<<2)|0);
     $140 = HEAP32[$139>>2]|0;
     $141 = ($2|0)==($140|0);
     if ($141) {
      HEAP32[$139>>2] = $$3382;
      $cond5 = ($$3382|0)==(0|0);
      if ($cond5) {
       $142 = 1 << $138;
       $143 = $142 ^ -1;
       $144 = HEAP32[(17348)>>2]|0;
       $145 = $144 & $143;
       HEAP32[(17348)>>2] = $145;
       break;
      }
     } else {
      $146 = ((($116)) + 16|0);
      $147 = HEAP32[$146>>2]|0;
      $not$ = ($147|0)!=($2|0);
      $$sink4 = $not$&1;
      $148 = (((($116)) + 16|0) + ($$sink4<<2)|0);
      HEAP32[$148>>2] = $$3382;
      $149 = ($$3382|0)==(0|0);
      if ($149) {
       break;
      }
     }
     $150 = ((($$3382)) + 24|0);
     HEAP32[$150>>2] = $116;
     $151 = ((($2)) + 16|0);
     $152 = HEAP32[$151>>2]|0;
     $153 = ($152|0)==(0|0);
     if (!($153)) {
      $154 = ((($$3382)) + 16|0);
      HEAP32[$154>>2] = $152;
      $155 = ((($152)) + 24|0);
      HEAP32[$155>>2] = $$3382;
     }
     $156 = ((($151)) + 4|0);
     $157 = HEAP32[$156>>2]|0;
     $158 = ($157|0)==(0|0);
     if (!($158)) {
      $159 = ((($$3382)) + 20|0);
      HEAP32[$159>>2] = $157;
      $160 = ((($157)) + 24|0);
      HEAP32[$160>>2] = $$3382;
     }
    }
   }
  } while(0);
  $161 = $101 | 1;
  $162 = ((($$1)) + 4|0);
  HEAP32[$162>>2] = $161;
  $163 = (($$1) + ($101)|0);
  HEAP32[$163>>2] = $101;
  $164 = HEAP32[(17364)>>2]|0;
  $165 = ($$1|0)==($164|0);
  if ($165) {
   HEAP32[(17352)>>2] = $101;
   return;
  } else {
   $$2 = $101;
  }
 } else {
  $166 = $83 & -2;
  HEAP32[$82>>2] = $166;
  $167 = $$1365 | 1;
  $168 = ((($$1)) + 4|0);
  HEAP32[$168>>2] = $167;
  $169 = (($$1) + ($$1365)|0);
  HEAP32[$169>>2] = $$1365;
  $$2 = $$1365;
 }
 $170 = $$2 >>> 3;
 $171 = ($$2>>>0)<(256);
 if ($171) {
  $172 = $170 << 1;
  $173 = (17384 + ($172<<2)|0);
  $174 = HEAP32[4336]|0;
  $175 = 1 << $170;
  $176 = $174 & $175;
  $177 = ($176|0)==(0);
  if ($177) {
   $178 = $174 | $175;
   HEAP32[4336] = $178;
   $$pre = ((($173)) + 8|0);
   $$0385 = $173;$$pre$phiZ2D = $$pre;
  } else {
   $179 = ((($173)) + 8|0);
   $180 = HEAP32[$179>>2]|0;
   $$0385 = $180;$$pre$phiZ2D = $179;
  }
  HEAP32[$$pre$phiZ2D>>2] = $$1;
  $181 = ((($$0385)) + 12|0);
  HEAP32[$181>>2] = $$1;
  $182 = ((($$1)) + 8|0);
  HEAP32[$182>>2] = $$0385;
  $183 = ((($$1)) + 12|0);
  HEAP32[$183>>2] = $173;
  return;
 }
 $184 = $$2 >>> 8;
 $185 = ($184|0)==(0);
 if ($185) {
  $$0378 = 0;
 } else {
  $186 = ($$2>>>0)>(16777215);
  if ($186) {
   $$0378 = 31;
  } else {
   $187 = (($184) + 1048320)|0;
   $188 = $187 >>> 16;
   $189 = $188 & 8;
   $190 = $184 << $189;
   $191 = (($190) + 520192)|0;
   $192 = $191 >>> 16;
   $193 = $192 & 4;
   $194 = $193 | $189;
   $195 = $190 << $193;
   $196 = (($195) + 245760)|0;
   $197 = $196 >>> 16;
   $198 = $197 & 2;
   $199 = $194 | $198;
   $200 = (14 - ($199))|0;
   $201 = $195 << $198;
   $202 = $201 >>> 15;
   $203 = (($200) + ($202))|0;
   $204 = $203 << 1;
   $205 = (($203) + 7)|0;
   $206 = $$2 >>> $205;
   $207 = $206 & 1;
   $208 = $207 | $204;
   $$0378 = $208;
  }
 }
 $209 = (17648 + ($$0378<<2)|0);
 $210 = ((($$1)) + 28|0);
 HEAP32[$210>>2] = $$0378;
 $211 = ((($$1)) + 16|0);
 $212 = ((($$1)) + 20|0);
 HEAP32[$212>>2] = 0;
 HEAP32[$211>>2] = 0;
 $213 = HEAP32[(17348)>>2]|0;
 $214 = 1 << $$0378;
 $215 = $213 & $214;
 $216 = ($215|0)==(0);
 if ($216) {
  $217 = $213 | $214;
  HEAP32[(17348)>>2] = $217;
  HEAP32[$209>>2] = $$1;
  $218 = ((($$1)) + 24|0);
  HEAP32[$218>>2] = $209;
  $219 = ((($$1)) + 12|0);
  HEAP32[$219>>2] = $$1;
  $220 = ((($$1)) + 8|0);
  HEAP32[$220>>2] = $$1;
  return;
 }
 $221 = HEAP32[$209>>2]|0;
 $222 = ($$0378|0)==(31);
 $223 = $$0378 >>> 1;
 $224 = (25 - ($223))|0;
 $225 = $222 ? 0 : $224;
 $226 = $$2 << $225;
 $$0366 = $226;$$0367 = $221;
 while(1) {
  $227 = ((($$0367)) + 4|0);
  $228 = HEAP32[$227>>2]|0;
  $229 = $228 & -8;
  $230 = ($229|0)==($$2|0);
  if ($230) {
   label = 69;
   break;
  }
  $231 = $$0366 >>> 31;
  $232 = (((($$0367)) + 16|0) + ($231<<2)|0);
  $233 = $$0366 << 1;
  $234 = HEAP32[$232>>2]|0;
  $235 = ($234|0)==(0|0);
  if ($235) {
   label = 68;
   break;
  } else {
   $$0366 = $233;$$0367 = $234;
  }
 }
 if ((label|0) == 68) {
  HEAP32[$232>>2] = $$1;
  $236 = ((($$1)) + 24|0);
  HEAP32[$236>>2] = $$0367;
  $237 = ((($$1)) + 12|0);
  HEAP32[$237>>2] = $$1;
  $238 = ((($$1)) + 8|0);
  HEAP32[$238>>2] = $$1;
  return;
 }
 else if ((label|0) == 69) {
  $239 = ((($$0367)) + 8|0);
  $240 = HEAP32[$239>>2]|0;
  $241 = ((($240)) + 12|0);
  HEAP32[$241>>2] = $$1;
  HEAP32[$239>>2] = $$1;
  $242 = ((($$1)) + 8|0);
  HEAP32[$242>>2] = $240;
  $243 = ((($$1)) + 12|0);
  HEAP32[$243>>2] = $$0367;
  $244 = ((($$1)) + 24|0);
  HEAP32[$244>>2] = 0;
  return;
 }
}
function ___stdio_close($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer = sp;
 $1 = ((($0)) + 60|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = (_dummy($2)|0);
 HEAP32[$vararg_buffer>>2] = $3;
 $4 = (___syscall6(6,($vararg_buffer|0))|0);
 $5 = (___syscall_ret($4)|0);
 STACKTOP = sp;return ($5|0);
}
function ___stdio_write($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0 = 0, $$04756 = 0, $$04855 = 0, $$04954 = 0, $$051 = 0, $$1 = 0, $$150 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_buffer3 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr6 = 0;
 var $vararg_ptr7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $vararg_buffer3 = sp + 16|0;
 $vararg_buffer = sp;
 $3 = sp + 32|0;
 $4 = ((($0)) + 28|0);
 $5 = HEAP32[$4>>2]|0;
 HEAP32[$3>>2] = $5;
 $6 = ((($3)) + 4|0);
 $7 = ((($0)) + 20|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = (($8) - ($5))|0;
 HEAP32[$6>>2] = $9;
 $10 = ((($3)) + 8|0);
 HEAP32[$10>>2] = $1;
 $11 = ((($3)) + 12|0);
 HEAP32[$11>>2] = $2;
 $12 = (($9) + ($2))|0;
 $13 = ((($0)) + 60|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = $3;
 HEAP32[$vararg_buffer>>2] = $14;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = $15;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = 2;
 $16 = (___syscall146(146,($vararg_buffer|0))|0);
 $17 = (___syscall_ret($16)|0);
 $18 = ($12|0)==($17|0);
 L1: do {
  if ($18) {
   label = 3;
  } else {
   $$04756 = 2;$$04855 = $12;$$04954 = $3;$26 = $17;
   while(1) {
    $25 = ($26|0)<(0);
    if ($25) {
     break;
    }
    $34 = (($$04855) - ($26))|0;
    $35 = ((($$04954)) + 4|0);
    $36 = HEAP32[$35>>2]|0;
    $37 = ($26>>>0)>($36>>>0);
    $38 = ((($$04954)) + 8|0);
    $$150 = $37 ? $38 : $$04954;
    $39 = $37 << 31 >> 31;
    $$1 = (($39) + ($$04756))|0;
    $40 = $37 ? $36 : 0;
    $$0 = (($26) - ($40))|0;
    $41 = HEAP32[$$150>>2]|0;
    $42 = (($41) + ($$0)|0);
    HEAP32[$$150>>2] = $42;
    $43 = ((($$150)) + 4|0);
    $44 = HEAP32[$43>>2]|0;
    $45 = (($44) - ($$0))|0;
    HEAP32[$43>>2] = $45;
    $46 = HEAP32[$13>>2]|0;
    $47 = $$150;
    HEAP32[$vararg_buffer3>>2] = $46;
    $vararg_ptr6 = ((($vararg_buffer3)) + 4|0);
    HEAP32[$vararg_ptr6>>2] = $47;
    $vararg_ptr7 = ((($vararg_buffer3)) + 8|0);
    HEAP32[$vararg_ptr7>>2] = $$1;
    $48 = (___syscall146(146,($vararg_buffer3|0))|0);
    $49 = (___syscall_ret($48)|0);
    $50 = ($34|0)==($49|0);
    if ($50) {
     label = 3;
     break L1;
    } else {
     $$04756 = $$1;$$04855 = $34;$$04954 = $$150;$26 = $49;
    }
   }
   $27 = ((($0)) + 16|0);
   HEAP32[$27>>2] = 0;
   HEAP32[$4>>2] = 0;
   HEAP32[$7>>2] = 0;
   $28 = HEAP32[$0>>2]|0;
   $29 = $28 | 32;
   HEAP32[$0>>2] = $29;
   $30 = ($$04756|0)==(2);
   if ($30) {
    $$051 = 0;
   } else {
    $31 = ((($$04954)) + 4|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = (($2) - ($32))|0;
    $$051 = $33;
   }
  }
 } while(0);
 if ((label|0) == 3) {
  $19 = ((($0)) + 44|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = ((($0)) + 48|0);
  $22 = HEAP32[$21>>2]|0;
  $23 = (($20) + ($22)|0);
  $24 = ((($0)) + 16|0);
  HEAP32[$24>>2] = $23;
  HEAP32[$4>>2] = $20;
  HEAP32[$7>>2] = $20;
  $$051 = $2;
 }
 STACKTOP = sp;return ($$051|0);
}
function ___stdio_seek($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$pre = 0, $10 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $3 = sp + 20|0;
 $4 = ((($0)) + 60|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $3;
 HEAP32[$vararg_buffer>>2] = $5;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = 0;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = $1;
 $vararg_ptr3 = ((($vararg_buffer)) + 12|0);
 HEAP32[$vararg_ptr3>>2] = $6;
 $vararg_ptr4 = ((($vararg_buffer)) + 16|0);
 HEAP32[$vararg_ptr4>>2] = $2;
 $7 = (___syscall140(140,($vararg_buffer|0))|0);
 $8 = (___syscall_ret($7)|0);
 $9 = ($8|0)<(0);
 if ($9) {
  HEAP32[$3>>2] = -1;
  $10 = -1;
 } else {
  $$pre = HEAP32[$3>>2]|0;
  $10 = $$pre;
 }
 STACKTOP = sp;return ($10|0);
}
function ___syscall_ret($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0>>>0)>(4294963200);
 if ($1) {
  $2 = (0 - ($0))|0;
  $3 = (___errno_location()|0);
  HEAP32[$3>>2] = $2;
  $$0 = -1;
 } else {
  $$0 = $0;
 }
 return ($$0|0);
}
function ___errno_location() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (17904|0);
}
function _dummy($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return ($0|0);
}
function ___stdio_read($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $3 = sp + 16|0;
 HEAP32[$3>>2] = $1;
 $4 = ((($3)) + 4|0);
 $5 = ((($0)) + 48|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = ($6|0)!=(0);
 $8 = $7&1;
 $9 = (($2) - ($8))|0;
 HEAP32[$4>>2] = $9;
 $10 = ((($3)) + 8|0);
 $11 = ((($0)) + 44|0);
 $12 = HEAP32[$11>>2]|0;
 HEAP32[$10>>2] = $12;
 $13 = ((($3)) + 12|0);
 HEAP32[$13>>2] = $6;
 $14 = ((($0)) + 60|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = $3;
 HEAP32[$vararg_buffer>>2] = $15;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = $16;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = 2;
 $17 = (___syscall145(145,($vararg_buffer|0))|0);
 $18 = (___syscall_ret($17)|0);
 $19 = ($18|0)<(1);
 if ($19) {
  $20 = $18 & 48;
  $21 = $20 ^ 16;
  $22 = HEAP32[$0>>2]|0;
  $23 = $22 | $21;
  HEAP32[$0>>2] = $23;
  $$0 = $18;
 } else {
  $24 = HEAP32[$4>>2]|0;
  $25 = ($18>>>0)>($24>>>0);
  if ($25) {
   $26 = (($18) - ($24))|0;
   $27 = HEAP32[$11>>2]|0;
   $28 = ((($0)) + 4|0);
   HEAP32[$28>>2] = $27;
   $29 = (($27) + ($26)|0);
   $30 = ((($0)) + 8|0);
   HEAP32[$30>>2] = $29;
   $31 = HEAP32[$5>>2]|0;
   $32 = ($31|0)==(0);
   if ($32) {
    $$0 = $2;
   } else {
    $33 = ((($27)) + 1|0);
    HEAP32[$28>>2] = $33;
    $34 = HEAP8[$27>>0]|0;
    $35 = (($2) + -1)|0;
    $36 = (($1) + ($35)|0);
    HEAP8[$36>>0] = $34;
    $$0 = $2;
   }
  } else {
   $$0 = $18;
  }
 }
 STACKTOP = sp;return ($$0|0);
}
function ___stdout_write($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $3 = sp + 16|0;
 $4 = ((($0)) + 36|0);
 HEAP32[$4>>2] = 2;
 $5 = HEAP32[$0>>2]|0;
 $6 = $5 & 64;
 $7 = ($6|0)==(0);
 if ($7) {
  $8 = ((($0)) + 60|0);
  $9 = HEAP32[$8>>2]|0;
  $10 = $3;
  HEAP32[$vararg_buffer>>2] = $9;
  $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
  HEAP32[$vararg_ptr1>>2] = 21523;
  $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
  HEAP32[$vararg_ptr2>>2] = $10;
  $11 = (___syscall54(54,($vararg_buffer|0))|0);
  $12 = ($11|0)==(0);
  if (!($12)) {
   $13 = ((($0)) + 75|0);
   HEAP8[$13>>0] = -1;
  }
 }
 $14 = (___stdio_write($0,$1,$2)|0);
 STACKTOP = sp;return ($14|0);
}
function _pthread_self() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (2736|0);
}
function _strcmp($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$011 = 0, $$0710 = 0, $$lcssa = 0, $$lcssa8 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond9 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $2 = HEAP8[$0>>0]|0;
 $3 = HEAP8[$1>>0]|0;
 $4 = ($2<<24>>24)!=($3<<24>>24);
 $5 = ($2<<24>>24)==(0);
 $or$cond9 = $5 | $4;
 if ($or$cond9) {
  $$lcssa = $3;$$lcssa8 = $2;
 } else {
  $$011 = $1;$$0710 = $0;
  while(1) {
   $6 = ((($$0710)) + 1|0);
   $7 = ((($$011)) + 1|0);
   $8 = HEAP8[$6>>0]|0;
   $9 = HEAP8[$7>>0]|0;
   $10 = ($8<<24>>24)!=($9<<24>>24);
   $11 = ($8<<24>>24)==(0);
   $or$cond = $11 | $10;
   if ($or$cond) {
    $$lcssa = $9;$$lcssa8 = $8;
    break;
   } else {
    $$011 = $7;$$0710 = $6;
   }
  }
 }
 $12 = $$lcssa8&255;
 $13 = $$lcssa&255;
 $14 = (($12) - ($13))|0;
 return ($14|0);
}
function _isspace($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0|0)==(32);
 $2 = (($0) + -9)|0;
 $3 = ($2>>>0)<(5);
 $4 = $1 | $3;
 $5 = $4&1;
 return ($5|0);
}
function _strlen($0) {
 $0 = $0|0;
 var $$0 = 0, $$015$lcssa = 0, $$01519 = 0, $$1$lcssa = 0, $$pn = 0, $$pre = 0, $$sink = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = $0;
 $2 = $1 & 3;
 $3 = ($2|0)==(0);
 L1: do {
  if ($3) {
   $$015$lcssa = $0;
   label = 4;
  } else {
   $$01519 = $0;$23 = $1;
   while(1) {
    $4 = HEAP8[$$01519>>0]|0;
    $5 = ($4<<24>>24)==(0);
    if ($5) {
     $$sink = $23;
     break L1;
    }
    $6 = ((($$01519)) + 1|0);
    $7 = $6;
    $8 = $7 & 3;
    $9 = ($8|0)==(0);
    if ($9) {
     $$015$lcssa = $6;
     label = 4;
     break;
    } else {
     $$01519 = $6;$23 = $7;
    }
   }
  }
 } while(0);
 if ((label|0) == 4) {
  $$0 = $$015$lcssa;
  while(1) {
   $10 = HEAP32[$$0>>2]|0;
   $11 = (($10) + -16843009)|0;
   $12 = $10 & -2139062144;
   $13 = $12 ^ -2139062144;
   $14 = $13 & $11;
   $15 = ($14|0)==(0);
   $16 = ((($$0)) + 4|0);
   if ($15) {
    $$0 = $16;
   } else {
    break;
   }
  }
  $17 = $10&255;
  $18 = ($17<<24>>24)==(0);
  if ($18) {
   $$1$lcssa = $$0;
  } else {
   $$pn = $$0;
   while(1) {
    $19 = ((($$pn)) + 1|0);
    $$pre = HEAP8[$19>>0]|0;
    $20 = ($$pre<<24>>24)==(0);
    if ($20) {
     $$1$lcssa = $19;
     break;
    } else {
     $$pn = $19;
    }
   }
  }
  $21 = $$1$lcssa;
  $$sink = $21;
 }
 $22 = (($$sink) - ($1))|0;
 return ($22|0);
}
function _fwrite($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $$ = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $4 = Math_imul($2, $1)|0;
 $5 = ($1|0)==(0);
 $$ = $5 ? 0 : $2;
 $6 = ((($3)) + 76|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)>(-1);
 if ($8) {
  $10 = (___lockfile($3)|0);
  $phitmp = ($10|0)==(0);
  $11 = (___fwritex($0,$4,$3)|0);
  if ($phitmp) {
   $13 = $11;
  } else {
   ___unlockfile($3);
   $13 = $11;
  }
 } else {
  $9 = (___fwritex($0,$4,$3)|0);
  $13 = $9;
 }
 $12 = ($13|0)==($4|0);
 if ($12) {
  $15 = $$;
 } else {
  $14 = (($13>>>0) / ($1>>>0))&-1;
  $15 = $14;
 }
 return ($15|0);
}
function ___unlockfile($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function ___lockfile($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 0;
}
function ___towrite($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 74|0);
 $2 = HEAP8[$1>>0]|0;
 $3 = $2 << 24 >> 24;
 $4 = (($3) + 255)|0;
 $5 = $4 | $3;
 $6 = $5&255;
 HEAP8[$1>>0] = $6;
 $7 = HEAP32[$0>>2]|0;
 $8 = $7 & 8;
 $9 = ($8|0)==(0);
 if ($9) {
  $11 = ((($0)) + 8|0);
  HEAP32[$11>>2] = 0;
  $12 = ((($0)) + 4|0);
  HEAP32[$12>>2] = 0;
  $13 = ((($0)) + 44|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = ((($0)) + 28|0);
  HEAP32[$15>>2] = $14;
  $16 = ((($0)) + 20|0);
  HEAP32[$16>>2] = $14;
  $17 = ((($0)) + 48|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = (($14) + ($18)|0);
  $20 = ((($0)) + 16|0);
  HEAP32[$20>>2] = $19;
  $$0 = 0;
 } else {
  $10 = $7 | 32;
  HEAP32[$0>>2] = $10;
  $$0 = -1;
 }
 return ($$0|0);
}
function ___fwritex($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$038 = 0, $$042 = 0, $$1 = 0, $$139 = 0, $$141 = 0, $$143 = 0, $$pre = 0, $$pre47 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ((($2)) + 16|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)==(0|0);
 if ($5) {
  $7 = (___towrite($2)|0);
  $8 = ($7|0)==(0);
  if ($8) {
   $$pre = HEAP32[$3>>2]|0;
   $12 = $$pre;
   label = 5;
  } else {
   $$1 = 0;
  }
 } else {
  $6 = $4;
  $12 = $6;
  label = 5;
 }
 L5: do {
  if ((label|0) == 5) {
   $9 = ((($2)) + 20|0);
   $10 = HEAP32[$9>>2]|0;
   $11 = (($12) - ($10))|0;
   $13 = ($11>>>0)<($1>>>0);
   $14 = $10;
   if ($13) {
    $15 = ((($2)) + 36|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = (FUNCTION_TABLE_iiii[$16 & 7]($2,$0,$1)|0);
    $$1 = $17;
    break;
   }
   $18 = ((($2)) + 75|0);
   $19 = HEAP8[$18>>0]|0;
   $20 = ($19<<24>>24)>(-1);
   L10: do {
    if ($20) {
     $$038 = $1;
     while(1) {
      $21 = ($$038|0)==(0);
      if ($21) {
       $$139 = 0;$$141 = $0;$$143 = $1;$31 = $14;
       break L10;
      }
      $22 = (($$038) + -1)|0;
      $23 = (($0) + ($22)|0);
      $24 = HEAP8[$23>>0]|0;
      $25 = ($24<<24>>24)==(10);
      if ($25) {
       break;
      } else {
       $$038 = $22;
      }
     }
     $26 = ((($2)) + 36|0);
     $27 = HEAP32[$26>>2]|0;
     $28 = (FUNCTION_TABLE_iiii[$27 & 7]($2,$0,$$038)|0);
     $29 = ($28>>>0)<($$038>>>0);
     if ($29) {
      $$1 = $28;
      break L5;
     }
     $30 = (($0) + ($$038)|0);
     $$042 = (($1) - ($$038))|0;
     $$pre47 = HEAP32[$9>>2]|0;
     $$139 = $$038;$$141 = $30;$$143 = $$042;$31 = $$pre47;
    } else {
     $$139 = 0;$$141 = $0;$$143 = $1;$31 = $14;
    }
   } while(0);
   _memcpy(($31|0),($$141|0),($$143|0))|0;
   $32 = HEAP32[$9>>2]|0;
   $33 = (($32) + ($$143)|0);
   HEAP32[$9>>2] = $33;
   $34 = (($$139) + ($$143))|0;
   $$1 = $34;
  }
 } while(0);
 return ($$1|0);
}
function ___lctrans_impl($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$0 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($1|0)==(0|0);
 if ($2) {
  $$0 = 0;
 } else {
  $3 = HEAP32[$1>>2]|0;
  $4 = ((($1)) + 4|0);
  $5 = HEAP32[$4>>2]|0;
  $6 = (___mo_lookup($3,$5,$0)|0);
  $$0 = $6;
 }
 $7 = ($$0|0)!=(0|0);
 $8 = $7 ? $$0 : $0;
 return ($8|0);
}
function ___mo_lookup($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$ = 0, $$090 = 0, $$094 = 0, $$191 = 0, $$195 = 0, $$4 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0;
 var $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond102 = 0, $or$cond104 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = HEAP32[$0>>2]|0;
 $4 = (($3) + 1794895138)|0;
 $5 = ((($0)) + 8|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = (_swapc($6,$4)|0);
 $8 = ((($0)) + 12|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = (_swapc($9,$4)|0);
 $11 = ((($0)) + 16|0);
 $12 = HEAP32[$11>>2]|0;
 $13 = (_swapc($12,$4)|0);
 $14 = $1 >>> 2;
 $15 = ($7>>>0)<($14>>>0);
 L1: do {
  if ($15) {
   $16 = $7 << 2;
   $17 = (($1) - ($16))|0;
   $18 = ($10>>>0)<($17>>>0);
   $19 = ($13>>>0)<($17>>>0);
   $or$cond = $18 & $19;
   if ($or$cond) {
    $20 = $13 | $10;
    $21 = $20 & 3;
    $22 = ($21|0)==(0);
    if ($22) {
     $23 = $10 >>> 2;
     $24 = $13 >>> 2;
     $$090 = 0;$$094 = $7;
     while(1) {
      $25 = $$094 >>> 1;
      $26 = (($$090) + ($25))|0;
      $27 = $26 << 1;
      $28 = (($27) + ($23))|0;
      $29 = (($0) + ($28<<2)|0);
      $30 = HEAP32[$29>>2]|0;
      $31 = (_swapc($30,$4)|0);
      $32 = (($28) + 1)|0;
      $33 = (($0) + ($32<<2)|0);
      $34 = HEAP32[$33>>2]|0;
      $35 = (_swapc($34,$4)|0);
      $36 = ($35>>>0)<($1>>>0);
      $37 = (($1) - ($35))|0;
      $38 = ($31>>>0)<($37>>>0);
      $or$cond102 = $36 & $38;
      if (!($or$cond102)) {
       $$4 = 0;
       break L1;
      }
      $39 = (($35) + ($31))|0;
      $40 = (($0) + ($39)|0);
      $41 = HEAP8[$40>>0]|0;
      $42 = ($41<<24>>24)==(0);
      if (!($42)) {
       $$4 = 0;
       break L1;
      }
      $43 = (($0) + ($35)|0);
      $44 = (_strcmp($2,$43)|0);
      $45 = ($44|0)==(0);
      if ($45) {
       break;
      }
      $62 = ($$094|0)==(1);
      $63 = ($44|0)<(0);
      $64 = (($$094) - ($25))|0;
      $$195 = $63 ? $25 : $64;
      $$191 = $63 ? $$090 : $26;
      if ($62) {
       $$4 = 0;
       break L1;
      } else {
       $$090 = $$191;$$094 = $$195;
      }
     }
     $46 = (($27) + ($24))|0;
     $47 = (($0) + ($46<<2)|0);
     $48 = HEAP32[$47>>2]|0;
     $49 = (_swapc($48,$4)|0);
     $50 = (($46) + 1)|0;
     $51 = (($0) + ($50<<2)|0);
     $52 = HEAP32[$51>>2]|0;
     $53 = (_swapc($52,$4)|0);
     $54 = ($53>>>0)<($1>>>0);
     $55 = (($1) - ($53))|0;
     $56 = ($49>>>0)<($55>>>0);
     $or$cond104 = $54 & $56;
     if ($or$cond104) {
      $57 = (($0) + ($53)|0);
      $58 = (($53) + ($49))|0;
      $59 = (($0) + ($58)|0);
      $60 = HEAP8[$59>>0]|0;
      $61 = ($60<<24>>24)==(0);
      $$ = $61 ? $57 : 0;
      $$4 = $$;
     } else {
      $$4 = 0;
     }
    } else {
     $$4 = 0;
    }
   } else {
    $$4 = 0;
   }
  } else {
   $$4 = 0;
  }
 } while(0);
 return ($$4|0);
}
function _swapc($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$ = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($1|0)==(0);
 $3 = (_llvm_bswap_i32(($0|0))|0);
 $$ = $2 ? $0 : $3;
 return ($$|0);
}
function _memchr($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0$lcssa = 0, $$035$lcssa = 0, $$035$lcssa65 = 0, $$03555 = 0, $$036$lcssa = 0, $$036$lcssa64 = 0, $$03654 = 0, $$046 = 0, $$137$lcssa = 0, $$13745 = 0, $$140 = 0, $$2 = 0, $$23839 = 0, $$3 = 0, $$lcssa = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0;
 var $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0;
 var $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond53 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = $1 & 255;
 $4 = $0;
 $5 = $4 & 3;
 $6 = ($5|0)!=(0);
 $7 = ($2|0)!=(0);
 $or$cond53 = $7 & $6;
 L1: do {
  if ($or$cond53) {
   $8 = $1&255;
   $$03555 = $0;$$03654 = $2;
   while(1) {
    $9 = HEAP8[$$03555>>0]|0;
    $10 = ($9<<24>>24)==($8<<24>>24);
    if ($10) {
     $$035$lcssa65 = $$03555;$$036$lcssa64 = $$03654;
     label = 6;
     break L1;
    }
    $11 = ((($$03555)) + 1|0);
    $12 = (($$03654) + -1)|0;
    $13 = $11;
    $14 = $13 & 3;
    $15 = ($14|0)!=(0);
    $16 = ($12|0)!=(0);
    $or$cond = $16 & $15;
    if ($or$cond) {
     $$03555 = $11;$$03654 = $12;
    } else {
     $$035$lcssa = $11;$$036$lcssa = $12;$$lcssa = $16;
     label = 5;
     break;
    }
   }
  } else {
   $$035$lcssa = $0;$$036$lcssa = $2;$$lcssa = $7;
   label = 5;
  }
 } while(0);
 if ((label|0) == 5) {
  if ($$lcssa) {
   $$035$lcssa65 = $$035$lcssa;$$036$lcssa64 = $$036$lcssa;
   label = 6;
  } else {
   $$2 = $$035$lcssa;$$3 = 0;
  }
 }
 L8: do {
  if ((label|0) == 6) {
   $17 = HEAP8[$$035$lcssa65>>0]|0;
   $18 = $1&255;
   $19 = ($17<<24>>24)==($18<<24>>24);
   if ($19) {
    $$2 = $$035$lcssa65;$$3 = $$036$lcssa64;
   } else {
    $20 = Math_imul($3, 16843009)|0;
    $21 = ($$036$lcssa64>>>0)>(3);
    L11: do {
     if ($21) {
      $$046 = $$035$lcssa65;$$13745 = $$036$lcssa64;
      while(1) {
       $22 = HEAP32[$$046>>2]|0;
       $23 = $22 ^ $20;
       $24 = (($23) + -16843009)|0;
       $25 = $23 & -2139062144;
       $26 = $25 ^ -2139062144;
       $27 = $26 & $24;
       $28 = ($27|0)==(0);
       if (!($28)) {
        break;
       }
       $29 = ((($$046)) + 4|0);
       $30 = (($$13745) + -4)|0;
       $31 = ($30>>>0)>(3);
       if ($31) {
        $$046 = $29;$$13745 = $30;
       } else {
        $$0$lcssa = $29;$$137$lcssa = $30;
        label = 11;
        break L11;
       }
      }
      $$140 = $$046;$$23839 = $$13745;
     } else {
      $$0$lcssa = $$035$lcssa65;$$137$lcssa = $$036$lcssa64;
      label = 11;
     }
    } while(0);
    if ((label|0) == 11) {
     $32 = ($$137$lcssa|0)==(0);
     if ($32) {
      $$2 = $$0$lcssa;$$3 = 0;
      break;
     } else {
      $$140 = $$0$lcssa;$$23839 = $$137$lcssa;
     }
    }
    while(1) {
     $33 = HEAP8[$$140>>0]|0;
     $34 = ($33<<24>>24)==($18<<24>>24);
     if ($34) {
      $$2 = $$140;$$3 = $$23839;
      break L8;
     }
     $35 = ((($$140)) + 1|0);
     $36 = (($$23839) + -1)|0;
     $37 = ($36|0)==(0);
     if ($37) {
      $$2 = $35;$$3 = 0;
      break;
     } else {
      $$140 = $35;$$23839 = $36;
     }
    }
   }
  }
 } while(0);
 $38 = ($$3|0)!=(0);
 $39 = $38 ? $$2 : 0;
 return ($39|0);
}
function ___ofl_lock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___lock((17908|0));
 return (17916|0);
}
function ___ofl_unlock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___unlock((17908|0));
 return;
}
function _fflush($0) {
 $0 = $0|0;
 var $$0 = 0, $$023 = 0, $$02325 = 0, $$02327 = 0, $$024$lcssa = 0, $$02426 = 0, $$1 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0|0)==(0|0);
 do {
  if ($1) {
   $8 = HEAP32[683]|0;
   $9 = ($8|0)==(0|0);
   if ($9) {
    $29 = 0;
   } else {
    $10 = HEAP32[683]|0;
    $11 = (_fflush($10)|0);
    $29 = $11;
   }
   $12 = (___ofl_lock()|0);
   $$02325 = HEAP32[$12>>2]|0;
   $13 = ($$02325|0)==(0|0);
   if ($13) {
    $$024$lcssa = $29;
   } else {
    $$02327 = $$02325;$$02426 = $29;
    while(1) {
     $14 = ((($$02327)) + 76|0);
     $15 = HEAP32[$14>>2]|0;
     $16 = ($15|0)>(-1);
     if ($16) {
      $17 = (___lockfile($$02327)|0);
      $26 = $17;
     } else {
      $26 = 0;
     }
     $18 = ((($$02327)) + 20|0);
     $19 = HEAP32[$18>>2]|0;
     $20 = ((($$02327)) + 28|0);
     $21 = HEAP32[$20>>2]|0;
     $22 = ($19>>>0)>($21>>>0);
     if ($22) {
      $23 = (___fflush_unlocked($$02327)|0);
      $24 = $23 | $$02426;
      $$1 = $24;
     } else {
      $$1 = $$02426;
     }
     $25 = ($26|0)==(0);
     if (!($25)) {
      ___unlockfile($$02327);
     }
     $27 = ((($$02327)) + 56|0);
     $$023 = HEAP32[$27>>2]|0;
     $28 = ($$023|0)==(0|0);
     if ($28) {
      $$024$lcssa = $$1;
      break;
     } else {
      $$02327 = $$023;$$02426 = $$1;
     }
    }
   }
   ___ofl_unlock();
   $$0 = $$024$lcssa;
  } else {
   $2 = ((($0)) + 76|0);
   $3 = HEAP32[$2>>2]|0;
   $4 = ($3|0)>(-1);
   if (!($4)) {
    $5 = (___fflush_unlocked($0)|0);
    $$0 = $5;
    break;
   }
   $6 = (___lockfile($0)|0);
   $phitmp = ($6|0)==(0);
   $7 = (___fflush_unlocked($0)|0);
   if ($phitmp) {
    $$0 = $7;
   } else {
    ___unlockfile($0);
    $$0 = $7;
   }
  }
 } while(0);
 return ($$0|0);
}
function ___fflush_unlocked($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 20|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($0)) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($2>>>0)>($4>>>0);
 if ($5) {
  $6 = ((($0)) + 36|0);
  $7 = HEAP32[$6>>2]|0;
  (FUNCTION_TABLE_iiii[$7 & 7]($0,0,0)|0);
  $8 = HEAP32[$1>>2]|0;
  $9 = ($8|0)==(0|0);
  if ($9) {
   $$0 = -1;
  } else {
   label = 3;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  $10 = ((($0)) + 4|0);
  $11 = HEAP32[$10>>2]|0;
  $12 = ((($0)) + 8|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = ($11>>>0)<($13>>>0);
  if ($14) {
   $15 = $11;
   $16 = $13;
   $17 = (($15) - ($16))|0;
   $18 = ((($0)) + 40|0);
   $19 = HEAP32[$18>>2]|0;
   (FUNCTION_TABLE_iiii[$19 & 7]($0,$17,1)|0);
  }
  $20 = ((($0)) + 16|0);
  HEAP32[$20>>2] = 0;
  HEAP32[$3>>2] = 0;
  HEAP32[$1>>2] = 0;
  HEAP32[$12>>2] = 0;
  HEAP32[$10>>2] = 0;
  $$0 = 0;
 }
 return ($$0|0);
}
function _ferror($0) {
 $0 = $0|0;
 var $$lobit = 0, $$lobit8 = 0, $$lobit9 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 76|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)>(-1);
 if ($3) {
  $6 = (___lockfile($0)|0);
  $phitmp = ($6|0)==(0);
  $7 = HEAP32[$0>>2]|0;
  $8 = $7 >>> 5;
  $$lobit = $8 & 1;
  if ($phitmp) {
   $$lobit9 = $$lobit;
  } else {
   ___unlockfile($0);
   $$lobit9 = $$lobit;
  }
 } else {
  $4 = HEAP32[$0>>2]|0;
  $5 = $4 >>> 5;
  $$lobit8 = $5 & 1;
  $$lobit9 = $$lobit8;
 }
 return ($$lobit9|0);
}
function ___shlim($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$sink = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ((($0)) + 104|0);
 HEAP32[$2>>2] = $1;
 $3 = ((($0)) + 8|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ((($0)) + 4|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = $4;
 $8 = $6;
 $9 = (($7) - ($8))|0;
 $10 = ((($0)) + 108|0);
 HEAP32[$10>>2] = $9;
 $11 = ($1|0)!=(0);
 $12 = ($9|0)>($1|0);
 $or$cond = $11 & $12;
 $13 = (($6) + ($1)|0);
 $$sink = $or$cond ? $13 : $4;
 $14 = ((($0)) + 100|0);
 HEAP32[$14>>2] = $$sink;
 return;
}
function ___shgetc($0) {
 $0 = $0|0;
 var $$0 = 0, $$phi$trans$insert = 0, $$phi$trans$insert28$phi$trans$insert = 0, $$pre = 0, $$pre$phi34Z2D = 0, $$pre29$pre = 0, $$pre35 = 0, $$sink = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0;
 var $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 104|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)==(0);
 if ($3) {
  label = 3;
 } else {
  $4 = ((($0)) + 108|0);
  $5 = HEAP32[$4>>2]|0;
  $6 = ($5|0)<($2|0);
  if ($6) {
   label = 3;
  } else {
   label = 4;
  }
 }
 if ((label|0) == 3) {
  $7 = (___uflow($0)|0);
  $8 = ($7|0)<(0);
  if ($8) {
   label = 4;
  } else {
   $10 = HEAP32[$1>>2]|0;
   $11 = ($10|0)==(0);
   $$phi$trans$insert = ((($0)) + 8|0);
   if ($11) {
    $$pre = HEAP32[$$phi$trans$insert>>2]|0;
    $$phi$trans$insert28$phi$trans$insert = ((($0)) + 4|0);
    $$pre29$pre = HEAP32[$$phi$trans$insert28$phi$trans$insert>>2]|0;
    $$pre35 = ((($0)) + 108|0);
    $$pre$phi34Z2D = $$pre35;$$sink = $$pre;$26 = $$pre;$29 = $$pre29$pre;
   } else {
    $12 = HEAP32[$$phi$trans$insert>>2]|0;
    $13 = ((($0)) + 4|0);
    $14 = HEAP32[$13>>2]|0;
    $15 = $14;
    $16 = (($12) - ($15))|0;
    $17 = ((($0)) + 108|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = (($10) - ($18))|0;
    $20 = ($16|0)<($19|0);
    $21 = $12;
    if ($20) {
     $$pre$phi34Z2D = $17;$$sink = $21;$26 = $21;$29 = $14;
    } else {
     $22 = (($19) + -1)|0;
     $23 = (($14) + ($22)|0);
     $$pre$phi34Z2D = $17;$$sink = $23;$26 = $21;$29 = $14;
    }
   }
   $24 = ((($0)) + 100|0);
   HEAP32[$24>>2] = $$sink;
   $25 = ($26|0)==(0|0);
   if (!($25)) {
    $27 = $26;
    $28 = $29;
    $30 = HEAP32[$$pre$phi34Z2D>>2]|0;
    $31 = (($27) + 1)|0;
    $32 = (($31) - ($28))|0;
    $33 = (($32) + ($30))|0;
    HEAP32[$$pre$phi34Z2D>>2] = $33;
   }
   $34 = ((($29)) + -1|0);
   $35 = HEAP8[$34>>0]|0;
   $36 = $35&255;
   $37 = ($36|0)==($7|0);
   if ($37) {
    $$0 = $7;
   } else {
    $38 = $7&255;
    HEAP8[$34>>0] = $38;
    $$0 = $7;
   }
  }
 }
 if ((label|0) == 4) {
  $9 = ((($0)) + 100|0);
  HEAP32[$9>>2] = 0;
  $$0 = -1;
 }
 return ($$0|0);
}
function ___floatscan($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0 = 0, $$0105$ph = 0, $$0106$ph = 0, $$0107$lcssa = 0, $$0107127 = 0, $$0113 = 0, $$0114 = 0.0, $$1$lcssa = 0, $$1108 = 0, $$1128 = 0, $$2 = 0, $$2109125 = 0, $$3110 = 0, $$3126 = 0, $$4 = 0, $$4111 = 0, $$5 = 0, $$6 = 0, $$in = 0, $$old8 = 0;
 var $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0;
 var $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0.0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0.0, $14 = 0, $15 = 0;
 var $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0;
 var $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0;
 var $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0;
 var $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0;
 var $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $or$cond = 0, $or$cond5 = 0, $or$cond7 = 0, $or$cond9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 switch ($1|0) {
 case 0:  {
  $$0105$ph = -149;$$0106$ph = 24;
  label = 4;
  break;
 }
 case 1:  {
  $$0105$ph = -1074;$$0106$ph = 53;
  label = 4;
  break;
 }
 case 2:  {
  $$0105$ph = -1074;$$0106$ph = 53;
  label = 4;
  break;
 }
 default: {
  $$0114 = 0.0;
 }
 }
 L4: do {
  if ((label|0) == 4) {
   $3 = ((($0)) + 4|0);
   $4 = ((($0)) + 100|0);
   while(1) {
    $5 = HEAP32[$3>>2]|0;
    $6 = HEAP32[$4>>2]|0;
    $7 = ($5>>>0)<($6>>>0);
    if ($7) {
     $8 = ((($5)) + 1|0);
     HEAP32[$3>>2] = $8;
     $9 = HEAP8[$5>>0]|0;
     $10 = $9&255;
     $12 = $10;
    } else {
     $11 = (___shgetc($0)|0);
     $12 = $11;
    }
    $13 = (_isspace($12)|0);
    $14 = ($13|0)==(0);
    if ($14) {
     break;
    }
   }
   L13: do {
    switch ($12|0) {
    case 43: case 45:  {
     $15 = ($12|0)==(45);
     $16 = $15&1;
     $17 = $16 << 1;
     $18 = (1 - ($17))|0;
     $19 = HEAP32[$3>>2]|0;
     $20 = HEAP32[$4>>2]|0;
     $21 = ($19>>>0)<($20>>>0);
     if ($21) {
      $22 = ((($19)) + 1|0);
      HEAP32[$3>>2] = $22;
      $23 = HEAP8[$19>>0]|0;
      $24 = $23&255;
      $$0 = $24;$$0113 = $18;
      break L13;
     } else {
      $25 = (___shgetc($0)|0);
      $$0 = $25;$$0113 = $18;
      break L13;
     }
     break;
    }
    default: {
     $$0 = $12;$$0113 = 1;
    }
    }
   } while(0);
   $$0107127 = 0;$$1128 = $$0;
   while(1) {
    $26 = $$1128 | 32;
    $27 = (14831 + ($$0107127)|0);
    $28 = HEAP8[$27>>0]|0;
    $29 = $28 << 24 >> 24;
    $30 = ($26|0)==($29|0);
    if (!($30)) {
     $$0107$lcssa = $$0107127;$$1$lcssa = $$1128;
     break;
    }
    $31 = ($$0107127>>>0)<(7);
    do {
     if ($31) {
      $32 = HEAP32[$3>>2]|0;
      $33 = HEAP32[$4>>2]|0;
      $34 = ($32>>>0)<($33>>>0);
      if ($34) {
       $35 = ((($32)) + 1|0);
       HEAP32[$3>>2] = $35;
       $36 = HEAP8[$32>>0]|0;
       $37 = $36&255;
       $$2 = $37;
       break;
      } else {
       $38 = (___shgetc($0)|0);
       $$2 = $38;
       break;
      }
     } else {
      $$2 = $$1128;
     }
    } while(0);
    $39 = (($$0107127) + 1)|0;
    $40 = ($39>>>0)<(8);
    if ($40) {
     $$0107127 = $39;$$1128 = $$2;
    } else {
     $$0107$lcssa = $39;$$1$lcssa = $$2;
     break;
    }
   }
   L29: do {
    switch ($$0107$lcssa|0) {
    case 8:  {
     break;
    }
    case 3:  {
     label = 23;
     break;
    }
    default: {
     $41 = ($$0107$lcssa>>>0)>(3);
     $42 = ($2|0)!=(0);
     $or$cond5 = $42 & $41;
     if ($or$cond5) {
      $43 = ($$0107$lcssa|0)==(8);
      if ($43) {
       break L29;
      } else {
       label = 23;
       break L29;
      }
     }
     $56 = ($$0107$lcssa|0)==(0);
     L34: do {
      if ($56) {
       $$2109125 = 0;$$3126 = $$1$lcssa;
       while(1) {
        $57 = $$3126 | 32;
        $58 = (15348 + ($$2109125)|0);
        $59 = HEAP8[$58>>0]|0;
        $60 = $59 << 24 >> 24;
        $61 = ($57|0)==($60|0);
        if (!($61)) {
         $$3110 = $$2109125;$$5 = $$3126;
         break L34;
        }
        $62 = ($$2109125>>>0)<(2);
        do {
         if ($62) {
          $63 = HEAP32[$3>>2]|0;
          $64 = HEAP32[$4>>2]|0;
          $65 = ($63>>>0)<($64>>>0);
          if ($65) {
           $66 = ((($63)) + 1|0);
           HEAP32[$3>>2] = $66;
           $67 = HEAP8[$63>>0]|0;
           $68 = $67&255;
           $$4 = $68;
           break;
          } else {
           $69 = (___shgetc($0)|0);
           $$4 = $69;
           break;
          }
         } else {
          $$4 = $$3126;
         }
        } while(0);
        $70 = (($$2109125) + 1)|0;
        $71 = ($70>>>0)<(3);
        if ($71) {
         $$2109125 = $70;$$3126 = $$4;
        } else {
         $$3110 = $70;$$5 = $$4;
         break;
        }
       }
      } else {
       $$3110 = $$0107$lcssa;$$5 = $$1$lcssa;
      }
     } while(0);
     switch ($$3110|0) {
     case 3:  {
      $72 = HEAP32[$3>>2]|0;
      $73 = HEAP32[$4>>2]|0;
      $74 = ($72>>>0)<($73>>>0);
      if ($74) {
       $75 = ((($72)) + 1|0);
       HEAP32[$3>>2] = $75;
       $76 = HEAP8[$72>>0]|0;
       $77 = $76&255;
       $80 = $77;
      } else {
       $78 = (___shgetc($0)|0);
       $80 = $78;
      }
      $79 = ($80|0)==(40);
      if ($79) {
       $$4111 = 1;
      } else {
       $81 = HEAP32[$4>>2]|0;
       $82 = ($81|0)==(0|0);
       if ($82) {
        $$0114 = nan;
        break L4;
       }
       $83 = HEAP32[$3>>2]|0;
       $84 = ((($83)) + -1|0);
       HEAP32[$3>>2] = $84;
       $$0114 = nan;
       break L4;
      }
      while(1) {
       $85 = HEAP32[$3>>2]|0;
       $86 = HEAP32[$4>>2]|0;
       $87 = ($85>>>0)<($86>>>0);
       if ($87) {
        $88 = ((($85)) + 1|0);
        HEAP32[$3>>2] = $88;
        $89 = HEAP8[$85>>0]|0;
        $90 = $89&255;
        $93 = $90;
       } else {
        $91 = (___shgetc($0)|0);
        $93 = $91;
       }
       $92 = (($93) + -48)|0;
       $94 = ($92>>>0)<(10);
       $95 = (($93) + -65)|0;
       $96 = ($95>>>0)<(26);
       $or$cond = $94 | $96;
       if (!($or$cond)) {
        $97 = (($93) + -97)|0;
        $98 = ($97>>>0)<(26);
        $99 = ($93|0)==(95);
        $or$cond7 = $99 | $98;
        if (!($or$cond7)) {
         break;
        }
       }
       $111 = (($$4111) + 1)|0;
       $$4111 = $111;
      }
      $100 = ($93|0)==(41);
      if ($100) {
       $$0114 = nan;
       break L4;
      }
      $101 = HEAP32[$4>>2]|0;
      $102 = ($101|0)==(0|0);
      if (!($102)) {
       $103 = HEAP32[$3>>2]|0;
       $104 = ((($103)) + -1|0);
       HEAP32[$3>>2] = $104;
      }
      if (!($42)) {
       $106 = (___errno_location()|0);
       HEAP32[$106>>2] = 22;
       ___shlim($0,0);
       $$0114 = 0.0;
       break L4;
      }
      $105 = ($$4111|0)==(0);
      if ($105) {
       $$0114 = nan;
       break L4;
      } else {
       $$in = $$4111;
      }
      while(1) {
       $107 = (($$in) + -1)|0;
       if (!($102)) {
        $108 = HEAP32[$3>>2]|0;
        $109 = ((($108)) + -1|0);
        HEAP32[$3>>2] = $109;
       }
       $110 = ($107|0)==(0);
       if ($110) {
        $$0114 = nan;
        break L4;
       } else {
        $$in = $107;
       }
      }
      break;
     }
     case 0:  {
      $117 = ($$5|0)==(48);
      if ($117) {
       $118 = HEAP32[$3>>2]|0;
       $119 = HEAP32[$4>>2]|0;
       $120 = ($118>>>0)<($119>>>0);
       if ($120) {
        $121 = ((($118)) + 1|0);
        HEAP32[$3>>2] = $121;
        $122 = HEAP8[$118>>0]|0;
        $123 = $122&255;
        $126 = $123;
       } else {
        $124 = (___shgetc($0)|0);
        $126 = $124;
       }
       $125 = $126 | 32;
       $127 = ($125|0)==(120);
       if ($127) {
        $128 = (+_hexfloat($0,$$0106$ph,$$0105$ph,$$0113,$2));
        $$0114 = $128;
        break L4;
       }
       $129 = HEAP32[$4>>2]|0;
       $130 = ($129|0)==(0|0);
       if ($130) {
        $$6 = 48;
       } else {
        $131 = HEAP32[$3>>2]|0;
        $132 = ((($131)) + -1|0);
        HEAP32[$3>>2] = $132;
        $$6 = 48;
       }
      } else {
       $$6 = $$5;
      }
      $133 = (+_decfloat($0,$$6,$$0106$ph,$$0105$ph,$$0113,$2));
      $$0114 = $133;
      break L4;
      break;
     }
     default: {
      $112 = HEAP32[$4>>2]|0;
      $113 = ($112|0)==(0|0);
      if (!($113)) {
       $114 = HEAP32[$3>>2]|0;
       $115 = ((($114)) + -1|0);
       HEAP32[$3>>2] = $115;
      }
      $116 = (___errno_location()|0);
      HEAP32[$116>>2] = 22;
      ___shlim($0,0);
      $$0114 = 0.0;
      break L4;
     }
     }
    }
    }
   } while(0);
   if ((label|0) == 23) {
    $44 = HEAP32[$4>>2]|0;
    $45 = ($44|0)==(0|0);
    if (!($45)) {
     $46 = HEAP32[$3>>2]|0;
     $47 = ((($46)) + -1|0);
     HEAP32[$3>>2] = $47;
    }
    $48 = ($2|0)!=(0);
    $49 = ($$0107$lcssa>>>0)>(3);
    $or$cond9 = $48 & $49;
    if ($or$cond9) {
     $$1108 = $$0107$lcssa;
     while(1) {
      if (!($45)) {
       $50 = HEAP32[$3>>2]|0;
       $51 = ((($50)) + -1|0);
       HEAP32[$3>>2] = $51;
      }
      $52 = (($$1108) + -1)|0;
      $$old8 = ($52>>>0)>(3);
      if ($$old8) {
       $$1108 = $52;
      } else {
       break;
      }
     }
    }
   }
   $53 = (+($$0113|0));
   $54 = $53 * inf;
   $55 = $54;
   $$0114 = $55;
  }
 } while(0);
 return (+$$0114);
}
function _hexfloat($0,$1,$2,$3,$4) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 $4 = $4|0;
 var $$0 = 0, $$0133 = 0, $$0142 = 0, $$0146 = 0, $$0148 = 0, $$0148$ = 0, $$0151 = 0.0, $$0152 = 0.0, $$0155 = 0.0, $$0155$ = 0.0, $$0159 = 0, $$0165 = 0.0, $$0166 = 0, $$0166169 = 0, $$0166170 = 0, $$1$ph = 0, $$1147 = 0, $$1149 = 0, $$1153 = 0.0, $$1156 = 0.0;
 var $$1160 = 0, $$2 = 0, $$2$lcssa = 0, $$2144 = 0, $$2150 = 0, $$2154 = 0.0, $$2157 = 0.0, $$2161 = 0, $$3145 = 0, $$3158$lcssa = 0.0, $$3158179 = 0.0, $$3162$lcssa = 0, $$3162183 = 0, $$4 = 0.0, $$4163$lcssa = 0, $$4163178 = 0, $$5 = 0.0, $$5164 = 0, $$6 = 0, $$pn = 0.0;
 var $$pre = 0.0, $$pre$phiZ2D = 0.0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0.0, $143 = 0.0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0.0, $154 = 0.0, $155 = 0.0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0.0, $167 = 0.0, $168 = 0.0, $169 = 0, $17 = 0;
 var $170 = 0, $171 = 0.0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0.0, $197 = 0, $198 = 0.0, $199 = 0.0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0.0, $206 = 0.0;
 var $207 = 0.0, $208 = 0.0, $209 = 0.0, $21 = 0, $210 = 0.0, $211 = 0, $212 = 0, $213 = 0.0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0;
 var $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0.0, $67 = 0.0;
 var $68 = 0.0, $69 = 0.0, $7 = 0, $70 = 0, $71 = 0, $72 = 0.0, $73 = 0.0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0;
 var $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0.0, $96 = 0.0, $97 = 0, $98 = 0, $99 = 0, $not$ = 0, $or$cond = 0, $or$cond168 = 0, $or$cond206 = 0, $or$cond4 = 0;
 var $or$cond6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $5 = ((($0)) + 4|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = ((($0)) + 100|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = ($6>>>0)<($8>>>0);
 if ($9) {
  $10 = ((($6)) + 1|0);
  HEAP32[$5>>2] = $10;
  $11 = HEAP8[$6>>0]|0;
  $12 = $11&255;
  $$0 = $12;$$0142 = 0;
 } else {
  $13 = (___shgetc($0)|0);
  $$0 = $13;$$0142 = 0;
 }
 L4: while(1) {
  switch ($$0|0) {
  case 46:  {
   label = 8;
   break L4;
   break;
  }
  case 48:  {
   break;
  }
  default: {
   $$0146 = 0;$$0148 = 0;$$0152 = 1.0;$$0155 = 0.0;$$0159 = 0;$$2 = $$0;$$2144 = $$0142;$101 = 0;$53 = 0;$55 = 0;$99 = 0;
   break L4;
  }
  }
  $14 = HEAP32[$5>>2]|0;
  $15 = HEAP32[$7>>2]|0;
  $16 = ($14>>>0)<($15>>>0);
  if ($16) {
   $17 = ((($14)) + 1|0);
   HEAP32[$5>>2] = $17;
   $18 = HEAP8[$14>>0]|0;
   $19 = $18&255;
   $$0 = $19;$$0142 = 1;
   continue;
  } else {
   $20 = (___shgetc($0)|0);
   $$0 = $20;$$0142 = 1;
   continue;
  }
 }
 if ((label|0) == 8) {
  $21 = HEAP32[$5>>2]|0;
  $22 = HEAP32[$7>>2]|0;
  $23 = ($21>>>0)<($22>>>0);
  if ($23) {
   $24 = ((($21)) + 1|0);
   HEAP32[$5>>2] = $24;
   $25 = HEAP8[$21>>0]|0;
   $26 = $25&255;
   $$1$ph = $26;
  } else {
   $27 = (___shgetc($0)|0);
   $$1$ph = $27;
  }
  $28 = ($$1$ph|0)==(48);
  if ($28) {
   $36 = 0;$37 = 0;
   while(1) {
    $29 = HEAP32[$5>>2]|0;
    $30 = HEAP32[$7>>2]|0;
    $31 = ($29>>>0)<($30>>>0);
    if ($31) {
     $32 = ((($29)) + 1|0);
     HEAP32[$5>>2] = $32;
     $33 = HEAP8[$29>>0]|0;
     $34 = $33&255;
     $41 = $34;
    } else {
     $35 = (___shgetc($0)|0);
     $41 = $35;
    }
    $38 = (_i64Add(($36|0),($37|0),-1,-1)|0);
    $39 = tempRet0;
    $40 = ($41|0)==(48);
    if ($40) {
     $36 = $38;$37 = $39;
    } else {
     $$0146 = 1;$$0148 = 0;$$0152 = 1.0;$$0155 = 0.0;$$0159 = 0;$$2 = $41;$$2144 = 1;$101 = $39;$53 = 0;$55 = 0;$99 = $38;
     break;
    }
   }
  } else {
   $$0146 = 1;$$0148 = 0;$$0152 = 1.0;$$0155 = 0.0;$$0159 = 0;$$2 = $$1$ph;$$2144 = $$0142;$101 = 0;$53 = 0;$55 = 0;$99 = 0;
  }
 }
 while(1) {
  $42 = (($$2) + -48)|0;
  $43 = ($42>>>0)<(10);
  $44 = ($$2|0)==(46);
  if (!($43)) {
   $45 = $$2 | 32;
   $46 = (($45) + -97)|0;
   $47 = ($46>>>0)<(6);
   $or$cond6 = $44 | $47;
   if (!($or$cond6)) {
    $$2$lcssa = $$2;
    break;
   }
  }
  if ($44) {
   $48 = ($$0146|0)==(0);
   if ($48) {
    $$1147 = 1;$$2150 = $$0148;$$2154 = $$0152;$$2157 = $$0155;$$2161 = $$0159;$$3145 = $$2144;$214 = $55;$215 = $53;$216 = $55;$217 = $53;
   } else {
    $$2$lcssa = 46;
    break;
   }
  } else {
   $49 = ($$2|0)>(57);
   $50 = $$2 | 32;
   $51 = (($50) + -87)|0;
   $$0133 = $49 ? $51 : $42;
   $52 = ($53|0)<(0);
   $54 = ($55>>>0)<(8);
   $56 = ($53|0)==(0);
   $57 = $56 & $54;
   $58 = $52 | $57;
   do {
    if ($58) {
     $59 = $$0159 << 4;
     $60 = (($$0133) + ($59))|0;
     $$1149 = $$0148;$$1153 = $$0152;$$1156 = $$0155;$$1160 = $60;
    } else {
     $61 = ($53|0)<(0);
     $62 = ($55>>>0)<(14);
     $63 = ($53|0)==(0);
     $64 = $63 & $62;
     $65 = $61 | $64;
     if ($65) {
      $66 = (+($$0133|0));
      $67 = $$0152 * 0.0625;
      $68 = $67 * $66;
      $69 = $$0155 + $68;
      $$1149 = $$0148;$$1153 = $67;$$1156 = $69;$$1160 = $$0159;
      break;
     } else {
      $70 = ($$0133|0)==(0);
      $71 = ($$0148|0)!=(0);
      $or$cond = $71 | $70;
      $72 = $$0152 * 0.5;
      $73 = $$0155 + $72;
      $$0155$ = $or$cond ? $$0155 : $73;
      $$0148$ = $or$cond ? $$0148 : 1;
      $$1149 = $$0148$;$$1153 = $$0152;$$1156 = $$0155$;$$1160 = $$0159;
      break;
     }
    }
   } while(0);
   $74 = (_i64Add(($55|0),($53|0),1,0)|0);
   $75 = tempRet0;
   $$1147 = $$0146;$$2150 = $$1149;$$2154 = $$1153;$$2157 = $$1156;$$2161 = $$1160;$$3145 = 1;$214 = $99;$215 = $101;$216 = $74;$217 = $75;
  }
  $76 = HEAP32[$5>>2]|0;
  $77 = HEAP32[$7>>2]|0;
  $78 = ($76>>>0)<($77>>>0);
  if ($78) {
   $79 = ((($76)) + 1|0);
   HEAP32[$5>>2] = $79;
   $80 = HEAP8[$76>>0]|0;
   $81 = $80&255;
   $$0146 = $$1147;$$0148 = $$2150;$$0152 = $$2154;$$0155 = $$2157;$$0159 = $$2161;$$2 = $81;$$2144 = $$3145;$101 = $215;$53 = $217;$55 = $216;$99 = $214;
   continue;
  } else {
   $82 = (___shgetc($0)|0);
   $$0146 = $$1147;$$0148 = $$2150;$$0152 = $$2154;$$0155 = $$2157;$$0159 = $$2161;$$2 = $82;$$2144 = $$3145;$101 = $215;$53 = $217;$55 = $216;$99 = $214;
   continue;
  }
 }
 $83 = ($$2144|0)==(0);
 do {
  if ($83) {
   $84 = HEAP32[$7>>2]|0;
   $85 = ($84|0)!=(0|0);
   if ($85) {
    $86 = HEAP32[$5>>2]|0;
    $87 = ((($86)) + -1|0);
    HEAP32[$5>>2] = $87;
   }
   $88 = ($4|0)==(0);
   if ($88) {
    ___shlim($0,0);
   } else {
    if ($85) {
     $89 = HEAP32[$5>>2]|0;
     $90 = ((($89)) + -1|0);
     HEAP32[$5>>2] = $90;
    }
    $91 = ($$0146|0)==(0);
    $92 = ($84|0)==(0|0);
    $or$cond206 = $91 | $92;
    if (!($or$cond206)) {
     $93 = HEAP32[$5>>2]|0;
     $94 = ((($93)) + -1|0);
     HEAP32[$5>>2] = $94;
    }
   }
   $95 = (+($3|0));
   $96 = $95 * 0.0;
   $$0165 = $96;
  } else {
   $97 = ($$0146|0)==(0);
   $98 = $97 ? $55 : $99;
   $100 = $97 ? $53 : $101;
   $102 = ($53|0)<(0);
   $103 = ($55>>>0)<(8);
   $104 = ($53|0)==(0);
   $105 = $104 & $103;
   $106 = $102 | $105;
   if ($106) {
    $$3162183 = $$0159;$108 = $55;$109 = $53;
    while(1) {
     $107 = $$3162183 << 4;
     $110 = (_i64Add(($108|0),($109|0),1,0)|0);
     $111 = tempRet0;
     $112 = ($111|0)<(0);
     $113 = ($110>>>0)<(8);
     $114 = ($111|0)==(0);
     $115 = $114 & $113;
     $116 = $112 | $115;
     if ($116) {
      $$3162183 = $107;$108 = $110;$109 = $111;
     } else {
      $$3162$lcssa = $107;
      break;
     }
    }
   } else {
    $$3162$lcssa = $$0159;
   }
   $117 = $$2$lcssa | 32;
   $118 = ($117|0)==(112);
   if ($118) {
    $119 = (_scanexp($0,$4)|0);
    $120 = tempRet0;
    $121 = ($119|0)==(0);
    $122 = ($120|0)==(-2147483648);
    $123 = $121 & $122;
    if ($123) {
     $124 = ($4|0)==(0);
     if ($124) {
      ___shlim($0,0);
      $$0165 = 0.0;
      break;
     }
     $125 = HEAP32[$7>>2]|0;
     $126 = ($125|0)==(0|0);
     if ($126) {
      $137 = 0;$138 = 0;
     } else {
      $127 = HEAP32[$5>>2]|0;
      $128 = ((($127)) + -1|0);
      HEAP32[$5>>2] = $128;
      $137 = 0;$138 = 0;
     }
    } else {
     $137 = $119;$138 = $120;
    }
   } else {
    $129 = HEAP32[$7>>2]|0;
    $130 = ($129|0)==(0|0);
    if ($130) {
     $137 = 0;$138 = 0;
    } else {
     $131 = HEAP32[$5>>2]|0;
     $132 = ((($131)) + -1|0);
     HEAP32[$5>>2] = $132;
     $137 = 0;$138 = 0;
    }
   }
   $133 = (_bitshift64Shl(($98|0),($100|0),2)|0);
   $134 = tempRet0;
   $135 = (_i64Add(($133|0),($134|0),-32,-1)|0);
   $136 = tempRet0;
   $139 = (_i64Add(($135|0),($136|0),($137|0),($138|0))|0);
   $140 = tempRet0;
   $141 = ($$3162$lcssa|0)==(0);
   if ($141) {
    $142 = (+($3|0));
    $143 = $142 * 0.0;
    $$0165 = $143;
    break;
   }
   $144 = (0 - ($2))|0;
   $145 = ($144|0)<(0);
   $146 = $145 << 31 >> 31;
   $147 = ($140|0)>($146|0);
   $148 = ($139>>>0)>($144>>>0);
   $149 = ($140|0)==($146|0);
   $150 = $149 & $148;
   $151 = $147 | $150;
   if ($151) {
    $152 = (___errno_location()|0);
    HEAP32[$152>>2] = 34;
    $153 = (+($3|0));
    $154 = $153 * 1.7976931348623157E+308;
    $155 = $154 * 1.7976931348623157E+308;
    $$0165 = $155;
    break;
   }
   $156 = (($2) + -106)|0;
   $157 = ($156|0)<(0);
   $158 = $157 << 31 >> 31;
   $159 = ($140|0)<($158|0);
   $160 = ($139>>>0)<($156>>>0);
   $161 = ($140|0)==($158|0);
   $162 = $161 & $160;
   $163 = $159 | $162;
   if ($163) {
    $165 = (___errno_location()|0);
    HEAP32[$165>>2] = 34;
    $166 = (+($3|0));
    $167 = $166 * 2.2250738585072014E-308;
    $168 = $167 * 2.2250738585072014E-308;
    $$0165 = $168;
    break;
   }
   $164 = ($$3162$lcssa|0)>(-1);
   if ($164) {
    $$3158179 = $$0155;$$4163178 = $$3162$lcssa;$173 = $139;$174 = $140;
    while(1) {
     $169 = !($$3158179 >= 0.5);
     $170 = $$4163178 << 1;
     $171 = $$3158179 + -1.0;
     $not$ = $169 ^ 1;
     $172 = $not$&1;
     $$5164 = $170 | $172;
     $$pn = $169 ? $$3158179 : $171;
     $$4 = $$3158179 + $$pn;
     $175 = (_i64Add(($173|0),($174|0),-1,-1)|0);
     $176 = tempRet0;
     $177 = ($$5164|0)>(-1);
     if ($177) {
      $$3158179 = $$4;$$4163178 = $$5164;$173 = $175;$174 = $176;
     } else {
      $$3158$lcssa = $$4;$$4163$lcssa = $$5164;$184 = $175;$185 = $176;
      break;
     }
    }
   } else {
    $$3158$lcssa = $$0155;$$4163$lcssa = $$3162$lcssa;$184 = $139;$185 = $140;
   }
   $178 = ($1|0)<(0);
   $179 = $178 << 31 >> 31;
   $180 = ($2|0)<(0);
   $181 = $180 << 31 >> 31;
   $182 = (_i64Subtract(32,0,($2|0),($181|0))|0);
   $183 = tempRet0;
   $186 = (_i64Add(($182|0),($183|0),($184|0),($185|0))|0);
   $187 = tempRet0;
   $188 = ($179|0)>($187|0);
   $189 = ($1>>>0)>($186>>>0);
   $190 = ($179|0)==($187|0);
   $191 = $190 & $189;
   $192 = $188 | $191;
   if ($192) {
    $193 = ($186|0)>(0);
    if ($193) {
     $$0166 = $186;
     label = 59;
    } else {
     $$0166170 = 0;$197 = 84;
     label = 61;
    }
   } else {
    $$0166 = $1;
    label = 59;
   }
   if ((label|0) == 59) {
    $194 = ($$0166|0)<(53);
    $195 = (84 - ($$0166))|0;
    if ($194) {
     $$0166170 = $$0166;$197 = $195;
     label = 61;
    } else {
     $$pre = (+($3|0));
     $$0151 = 0.0;$$0166169 = $$0166;$$pre$phiZ2D = $$pre;
    }
   }
   if ((label|0) == 61) {
    $196 = (+($3|0));
    $198 = (+_scalbn(1.0,$197));
    $199 = (+_copysignl($198,$196));
    $$0151 = $199;$$0166169 = $$0166170;$$pre$phiZ2D = $196;
   }
   $200 = ($$0166169|0)<(32);
   $201 = $$3158$lcssa != 0.0;
   $or$cond4 = $201 & $200;
   $202 = $$4163$lcssa & 1;
   $203 = ($202|0)==(0);
   $or$cond168 = $203 & $or$cond4;
   $204 = $or$cond168&1;
   $$6 = (($204) + ($$4163$lcssa))|0;
   $$5 = $or$cond168 ? 0.0 : $$3158$lcssa;
   $205 = (+($$6>>>0));
   $206 = $$pre$phiZ2D * $205;
   $207 = $$0151 + $206;
   $208 = $$pre$phiZ2D * $$5;
   $209 = $208 + $207;
   $210 = $209 - $$0151;
   $211 = $210 != 0.0;
   if (!($211)) {
    $212 = (___errno_location()|0);
    HEAP32[$212>>2] = 34;
   }
   $213 = (+_scalbnl($210,$184));
   $$0165 = $213;
  }
 } while(0);
 return (+$$0165);
}
function _decfloat($0,$1,$2,$3,$4,$5) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 $4 = $4|0;
 $5 = $5|0;
 var $$ = 0, $$$0345 = 0, $$$0350 = 0, $$$0385 = 0, $$$0401 = 0, $$$5355 = 0, $$$5390 = 0, $$0329 = 0, $$0332490 = 0, $$0333 = 0, $$0334 = 0, $$0336486 = 0, $$0340496 = 0, $$0341$lcssa = 0, $$0341463 = 0, $$0341464 = 0, $$0341465 = 0, $$0341513 = 0, $$0345$lcssa = 0, $$0345467 = 0;
 var $$0345468 = 0, $$0345469 = 0, $$0345512 = 0, $$0350$lcssa554 = 0, $$0350494 = 0, $$0360 = 0.0, $$0361 = 0.0, $$0365484 = 0.0, $$0372 = 0, $$0380 = 0, $$0380$ph = 0, $$0385$lcssa553 = 0, $$0385493 = 0, $$0393 = 0, $$0396 = 0, $$0401$lcssa = 0, $$0401473 = 0, $$0401474 = 0, $$0401475 = 0, $$0401509 = 0;
 var $$1 = 0.0, $$10 = 0, $$1330$be = 0, $$1330$ph = 0, $$1335 = 0, $$1337 = 0, $$1362 = 0.0, $$1366 = 0.0, $$1373 = 0, $$1373$ph448 = 0, $$1381 = 0, $$1381$ph = 0, $$1381$ph558 = 0, $$1394$lcssa = 0, $$1394511 = 0, $$2 = 0, $$2343 = 0, $$2347 = 0, $$2352$ph449 = 0, $$2367 = 0.0;
 var $$2371$v = 0, $$2374 = 0, $$2387$ph447 = 0, $$2395 = 0, $$2398 = 0, $$2403 = 0, $$3$be = 0, $$3$lcssa = 0, $$3344503 = 0, $$3348 = 0, $$3364 = 0.0, $$3368 = 0.0, $$3375 = 0, $$3383 = 0, $$3399$lcssa = 0, $$3399510 = 0, $$3514 = 0, $$413 = 0, $$425 = 0, $$4349495 = 0;
 var $$4354 = 0, $$4354$ph = 0, $$4354$ph559 = 0, $$4376 = 0, $$4384 = 0, $$4389$ph = 0, $$4389$ph445 = 0, $$4400 = 0, $$4485 = 0, $$5 = 0, $$5$in = 0, $$5355488 = 0, $$5390487 = 0, $$6378$ph = 0, $$6489 = 0, $$9483 = 0, $$neg442 = 0, $$neg443 = 0, $$pre = 0, $$promoted = 0;
 var $$sink = 0, $$sink421$off0 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0.0, $103 = 0.0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0.0, $132 = 0.0, $133 = 0.0;
 var $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0.0, $144 = 0.0, $145 = 0.0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0.0, $159 = 0.0, $16 = 0, $160 = 0.0, $161 = 0, $162 = 0.0, $163 = 0.0, $164 = 0.0, $165 = 0, $166 = 0, $167 = 0, $168 = 0.0, $169 = 0.0, $17 = 0;
 var $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0.0, $177 = 0.0, $178 = 0.0, $179 = 0, $18 = 0, $180 = 0.0, $181 = 0.0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0;
 var $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0;
 var $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0;
 var $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0;
 var $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0;
 var $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0;
 var $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0;
 var $298 = 0, $299 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0.0, $304 = 0, $305 = 0, $306 = 0.0, $307 = 0.0, $308 = 0, $309 = 0.0, $31 = 0, $310 = 0.0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0;
 var $316 = 0, $317 = 0.0, $318 = 0.0, $319 = 0, $32 = 0, $320 = 0.0, $321 = 0.0, $322 = 0.0, $323 = 0.0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0;
 var $334 = 0.0, $335 = 0.0, $336 = 0, $337 = 0.0, $338 = 0.0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0.0, $343 = 0.0, $344 = 0.0, $345 = 0.0, $346 = 0, $347 = 0, $348 = 0.0, $349 = 0, $35 = 0, $350 = 0.0, $351 = 0.0;
 var $352 = 0.0, $353 = 0, $354 = 0, $355 = 0, $356 = 0.0, $357 = 0, $358 = 0.0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0.0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0;
 var $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $39 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0;
 var $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0;
 var $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0;
 var $98 = 0, $99 = 0, $cond = 0, $exitcond = 0, $exitcond551 = 0, $narrow = 0, $not$ = 0, $or$cond = 0, $or$cond11 = 0, $or$cond14 = 0, $or$cond415 = 0, $or$cond417 = 0, $or$cond419 = 0, $or$cond420 = 0, $or$cond422 = 0, $or$cond422$not = 0, $or$cond423 = 0, $or$cond426 = 0, $or$cond5 = 0, $sum = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 512|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(512|0);
 $6 = sp;
 $sum = (($3) + ($2))|0;
 $7 = (0 - ($sum))|0;
 $8 = ((($0)) + 4|0);
 $9 = ((($0)) + 100|0);
 $$0329 = $1;$$0396 = 0;
 L1: while(1) {
  switch ($$0329|0) {
  case 46:  {
   label = 6;
   break L1;
   break;
  }
  case 48:  {
   break;
  }
  default: {
   $$0393 = 0;$$2 = $$0329;$$2398 = $$0396;$366 = 0;$367 = 0;
   break L1;
  }
  }
  $10 = HEAP32[$8>>2]|0;
  $11 = HEAP32[$9>>2]|0;
  $12 = ($10>>>0)<($11>>>0);
  if ($12) {
   $13 = ((($10)) + 1|0);
   HEAP32[$8>>2] = $13;
   $14 = HEAP8[$10>>0]|0;
   $15 = $14&255;
   $$0329 = $15;$$0396 = 1;
   continue;
  } else {
   $16 = (___shgetc($0)|0);
   $$0329 = $16;$$0396 = 1;
   continue;
  }
 }
 if ((label|0) == 6) {
  $17 = HEAP32[$8>>2]|0;
  $18 = HEAP32[$9>>2]|0;
  $19 = ($17>>>0)<($18>>>0);
  if ($19) {
   $20 = ((($17)) + 1|0);
   HEAP32[$8>>2] = $20;
   $21 = HEAP8[$17>>0]|0;
   $22 = $21&255;
   $$1330$ph = $22;
  } else {
   $23 = (___shgetc($0)|0);
   $$1330$ph = $23;
  }
  $24 = ($$1330$ph|0)==(48);
  if ($24) {
   $25 = 0;$26 = 0;
   while(1) {
    $27 = (_i64Add(($25|0),($26|0),-1,-1)|0);
    $28 = tempRet0;
    $29 = HEAP32[$8>>2]|0;
    $30 = HEAP32[$9>>2]|0;
    $31 = ($29>>>0)<($30>>>0);
    if ($31) {
     $32 = ((($29)) + 1|0);
     HEAP32[$8>>2] = $32;
     $33 = HEAP8[$29>>0]|0;
     $34 = $33&255;
     $$1330$be = $34;
    } else {
     $35 = (___shgetc($0)|0);
     $$1330$be = $35;
    }
    $36 = ($$1330$be|0)==(48);
    if ($36) {
     $25 = $27;$26 = $28;
    } else {
     $$0393 = 1;$$2 = $$1330$be;$$2398 = 1;$366 = $27;$367 = $28;
     break;
    }
   }
  } else {
   $$0393 = 1;$$2 = $$1330$ph;$$2398 = $$0396;$366 = 0;$367 = 0;
  }
 }
 HEAP32[$6>>2] = 0;
 $37 = (($$2) + -48)|0;
 $38 = ($37>>>0)<(10);
 $39 = ($$2|0)==(46);
 $40 = $39 | $38;
 L20: do {
  if ($40) {
   $41 = ((($6)) + 496|0);
   $$0341513 = 0;$$0345512 = 0;$$0401509 = 0;$$1394511 = $$0393;$$3399510 = $$2398;$$3514 = $$2;$368 = $39;$369 = $37;$370 = $366;$371 = $367;$44 = 0;$45 = 0;
   L22: while(1) {
    do {
     if ($368) {
      $cond = ($$1394511|0)==(0);
      if ($cond) {
       $$2343 = $$0341513;$$2347 = $$0345512;$$2395 = 1;$$2403 = $$0401509;$$4400 = $$3399510;$372 = $44;$373 = $45;$374 = $44;$375 = $45;
      } else {
       break L22;
      }
     } else {
      $43 = ($$0345512|0)<(125);
      $46 = (_i64Add(($44|0),($45|0),1,0)|0);
      $47 = tempRet0;
      $48 = ($$3514|0)!=(48);
      if (!($43)) {
       if (!($48)) {
        $$2343 = $$0341513;$$2347 = $$0345512;$$2395 = $$1394511;$$2403 = $$0401509;$$4400 = $$3399510;$372 = $370;$373 = $371;$374 = $46;$375 = $47;
        break;
       }
       $57 = HEAP32[$41>>2]|0;
       $58 = $57 | 1;
       HEAP32[$41>>2] = $58;
       $$2343 = $$0341513;$$2347 = $$0345512;$$2395 = $$1394511;$$2403 = $$0401509;$$4400 = $$3399510;$372 = $370;$373 = $371;$374 = $46;$375 = $47;
       break;
      }
      $$$0401 = $48 ? $46 : $$0401509;
      $49 = ($$0341513|0)==(0);
      $$pre = (($6) + ($$0345512<<2)|0);
      if ($49) {
       $$sink = $369;
      } else {
       $50 = HEAP32[$$pre>>2]|0;
       $51 = ($50*10)|0;
       $52 = (($$3514) + -48)|0;
       $53 = (($52) + ($51))|0;
       $$sink = $53;
      }
      HEAP32[$$pre>>2] = $$sink;
      $54 = (($$0341513) + 1)|0;
      $55 = ($54|0)==(9);
      $56 = $55&1;
      $$$0345 = (($56) + ($$0345512))|0;
      $$413 = $55 ? 0 : $54;
      $$2343 = $$413;$$2347 = $$$0345;$$2395 = $$1394511;$$2403 = $$$0401;$$4400 = 1;$372 = $370;$373 = $371;$374 = $46;$375 = $47;
     }
    } while(0);
    $59 = HEAP32[$8>>2]|0;
    $60 = HEAP32[$9>>2]|0;
    $61 = ($59>>>0)<($60>>>0);
    if ($61) {
     $62 = ((($59)) + 1|0);
     HEAP32[$8>>2] = $62;
     $63 = HEAP8[$59>>0]|0;
     $64 = $63&255;
     $$3$be = $64;
    } else {
     $65 = (___shgetc($0)|0);
     $$3$be = $65;
    }
    $66 = (($$3$be) + -48)|0;
    $67 = ($66>>>0)<(10);
    $68 = ($$3$be|0)==(46);
    $69 = $68 | $67;
    if ($69) {
     $$0341513 = $$2343;$$0345512 = $$2347;$$0401509 = $$2403;$$1394511 = $$2395;$$3399510 = $$4400;$$3514 = $$3$be;$368 = $68;$369 = $66;$370 = $372;$371 = $373;$44 = $374;$45 = $375;
    } else {
     $$0341$lcssa = $$2343;$$0345$lcssa = $$2347;$$0401$lcssa = $$2403;$$1394$lcssa = $$2395;$$3$lcssa = $$3$be;$$3399$lcssa = $$4400;$72 = $374;$73 = $372;$75 = $375;$76 = $373;
     label = 29;
     break L20;
    }
   }
   $42 = ($$3399510|0)!=(0);
   $$0341465 = $$0341513;$$0345469 = $$0345512;$$0401475 = $$0401509;$376 = $44;$377 = $45;$378 = $370;$379 = $371;$380 = $42;
   label = 37;
  } else {
   $$0341$lcssa = 0;$$0345$lcssa = 0;$$0401$lcssa = 0;$$1394$lcssa = $$0393;$$3$lcssa = $$2;$$3399$lcssa = $$2398;$72 = 0;$73 = $366;$75 = 0;$76 = $367;
   label = 29;
  }
 } while(0);
 do {
  if ((label|0) == 29) {
   $70 = ($$1394$lcssa|0)==(0);
   $71 = $70 ? $72 : $73;
   $74 = $70 ? $75 : $76;
   $77 = ($$3399$lcssa|0)!=(0);
   $78 = $$3$lcssa | 32;
   $79 = ($78|0)==(101);
   $or$cond415 = $77 & $79;
   if (!($or$cond415)) {
    $94 = ($$3$lcssa|0)>(-1);
    if ($94) {
     $$0341465 = $$0341$lcssa;$$0345469 = $$0345$lcssa;$$0401475 = $$0401$lcssa;$376 = $72;$377 = $75;$378 = $71;$379 = $74;$380 = $77;
     label = 37;
     break;
    } else {
     $$0341464 = $$0341$lcssa;$$0345468 = $$0345$lcssa;$$0401474 = $$0401$lcssa;$381 = $72;$382 = $75;$383 = $77;$384 = $71;$385 = $74;
     label = 39;
     break;
    }
   }
   $80 = (_scanexp($0,$5)|0);
   $81 = tempRet0;
   $82 = ($80|0)==(0);
   $83 = ($81|0)==(-2147483648);
   $84 = $82 & $83;
   if ($84) {
    $85 = ($5|0)==(0);
    if ($85) {
     ___shlim($0,0);
     $$1 = 0.0;
     break;
    }
    $86 = HEAP32[$9>>2]|0;
    $87 = ($86|0)==(0|0);
    if ($87) {
     $90 = 0;$91 = 0;
    } else {
     $88 = HEAP32[$8>>2]|0;
     $89 = ((($88)) + -1|0);
     HEAP32[$8>>2] = $89;
     $90 = 0;$91 = 0;
    }
   } else {
    $90 = $80;$91 = $81;
   }
   $92 = (_i64Add(($90|0),($91|0),($71|0),($74|0))|0);
   $93 = tempRet0;
   $$0341463 = $$0341$lcssa;$$0345467 = $$0345$lcssa;$$0401473 = $$0401$lcssa;$105 = $92;$106 = $72;$108 = $93;$109 = $75;
   label = 41;
  }
 } while(0);
 if ((label|0) == 37) {
  $95 = HEAP32[$9>>2]|0;
  $96 = ($95|0)==(0|0);
  if ($96) {
   $$0341464 = $$0341465;$$0345468 = $$0345469;$$0401474 = $$0401475;$381 = $376;$382 = $377;$383 = $380;$384 = $378;$385 = $379;
   label = 39;
  } else {
   $97 = HEAP32[$8>>2]|0;
   $98 = ((($97)) + -1|0);
   HEAP32[$8>>2] = $98;
   if ($380) {
    $$0341463 = $$0341465;$$0345467 = $$0345469;$$0401473 = $$0401475;$105 = $378;$106 = $376;$108 = $379;$109 = $377;
    label = 41;
   } else {
    label = 40;
   }
  }
 }
 if ((label|0) == 39) {
  if ($383) {
   $$0341463 = $$0341464;$$0345467 = $$0345468;$$0401473 = $$0401474;$105 = $384;$106 = $381;$108 = $385;$109 = $382;
   label = 41;
  } else {
   label = 40;
  }
 }
 do {
  if ((label|0) == 40) {
   $99 = (___errno_location()|0);
   HEAP32[$99>>2] = 22;
   ___shlim($0,0);
   $$1 = 0.0;
  }
  else if ((label|0) == 41) {
   $100 = HEAP32[$6>>2]|0;
   $101 = ($100|0)==(0);
   if ($101) {
    $102 = (+($4|0));
    $103 = $102 * 0.0;
    $$1 = $103;
    break;
   }
   $104 = ($105|0)==($106|0);
   $107 = ($108|0)==($109|0);
   $110 = $104 & $107;
   $111 = ($109|0)<(0);
   $112 = ($106>>>0)<(10);
   $113 = ($109|0)==(0);
   $114 = $113 & $112;
   $115 = $111 | $114;
   $or$cond = $115 & $110;
   if ($or$cond) {
    $116 = ($2|0)>(30);
    $117 = $100 >>> $2;
    $118 = ($117|0)==(0);
    $or$cond417 = $116 | $118;
    if ($or$cond417) {
     $119 = (+($4|0));
     $120 = (+($100>>>0));
     $121 = $119 * $120;
     $$1 = $121;
     break;
    }
   }
   $122 = (($3|0) / -2)&-1;
   $123 = ($122|0)<(0);
   $124 = $123 << 31 >> 31;
   $125 = ($108|0)>($124|0);
   $126 = ($105>>>0)>($122>>>0);
   $127 = ($108|0)==($124|0);
   $128 = $127 & $126;
   $129 = $125 | $128;
   if ($129) {
    $130 = (___errno_location()|0);
    HEAP32[$130>>2] = 34;
    $131 = (+($4|0));
    $132 = $131 * 1.7976931348623157E+308;
    $133 = $132 * 1.7976931348623157E+308;
    $$1 = $133;
    break;
   }
   $134 = (($3) + -106)|0;
   $135 = ($134|0)<(0);
   $136 = $135 << 31 >> 31;
   $137 = ($108|0)<($136|0);
   $138 = ($105>>>0)<($134>>>0);
   $139 = ($108|0)==($136|0);
   $140 = $139 & $138;
   $141 = $137 | $140;
   if ($141) {
    $142 = (___errno_location()|0);
    HEAP32[$142>>2] = 34;
    $143 = (+($4|0));
    $144 = $143 * 2.2250738585072014E-308;
    $145 = $144 * 2.2250738585072014E-308;
    $$1 = $145;
    break;
   }
   $146 = ($$0341463|0)==(0);
   if ($146) {
    $$3348 = $$0345467;
   } else {
    $147 = ($$0341463|0)<(9);
    if ($147) {
     $148 = (($6) + ($$0345467<<2)|0);
     $$promoted = HEAP32[$148>>2]|0;
     $$3344503 = $$0341463;$150 = $$promoted;
     while(1) {
      $149 = ($150*10)|0;
      $151 = (($$3344503) + 1)|0;
      $exitcond551 = ($151|0)==(9);
      if ($exitcond551) {
       break;
      } else {
       $$3344503 = $151;$150 = $149;
      }
     }
     HEAP32[$148>>2] = $149;
    }
    $152 = (($$0345467) + 1)|0;
    $$3348 = $152;
   }
   $153 = ($$0401473|0)<(9);
   if ($153) {
    $154 = ($$0401473|0)<=($105|0);
    $155 = ($105|0)<(18);
    $or$cond5 = $154 & $155;
    if ($or$cond5) {
     $156 = ($105|0)==(9);
     $157 = HEAP32[$6>>2]|0;
     if ($156) {
      $158 = (+($4|0));
      $159 = (+($157>>>0));
      $160 = $158 * $159;
      $$1 = $160;
      break;
     }
     $161 = ($105|0)<(9);
     if ($161) {
      $162 = (+($4|0));
      $163 = (+($157>>>0));
      $164 = $162 * $163;
      $165 = (8 - ($105))|0;
      $166 = (2980 + ($165<<2)|0);
      $167 = HEAP32[$166>>2]|0;
      $168 = (+($167|0));
      $169 = $164 / $168;
      $$1 = $169;
      break;
     }
     $$neg442 = Math_imul($105, -3)|0;
     $$neg443 = (($2) + 27)|0;
     $170 = (($$neg443) + ($$neg442))|0;
     $171 = ($170|0)>(30);
     $172 = $157 >>> $170;
     $173 = ($172|0)==(0);
     $or$cond419 = $171 | $173;
     if ($or$cond419) {
      $174 = (($105) + -10)|0;
      $175 = (2980 + ($174<<2)|0);
      $176 = (+($4|0));
      $177 = (+($157>>>0));
      $178 = $176 * $177;
      $179 = HEAP32[$175>>2]|0;
      $180 = (+($179|0));
      $181 = $178 * $180;
      $$1 = $181;
      break;
     }
    }
   }
   $182 = (($105|0) % 9)&-1;
   $183 = ($182|0)==(0);
   if ($183) {
    $$0380$ph = 0;$$1373$ph448 = $$3348;$$2352$ph449 = 0;$$2387$ph447 = $105;
   } else {
    $184 = ($105|0)>(-1);
    $185 = (($182) + 9)|0;
    $186 = $184 ? $182 : $185;
    $187 = (8 - ($186))|0;
    $188 = (2980 + ($187<<2)|0);
    $189 = HEAP32[$188>>2]|0;
    $190 = ($$3348|0)==(0);
    if ($190) {
     $$0350$lcssa554 = 0;$$0372 = 0;$$0385$lcssa553 = $105;
    } else {
     $191 = (1000000000 / ($189|0))&-1;
     $$0340496 = 0;$$0350494 = 0;$$0385493 = $105;$$4349495 = 0;
     while(1) {
      $192 = (($6) + ($$4349495<<2)|0);
      $193 = HEAP32[$192>>2]|0;
      $194 = (($193>>>0) % ($189>>>0))&-1;
      $195 = (($193>>>0) / ($189>>>0))&-1;
      $196 = (($195) + ($$0340496))|0;
      HEAP32[$192>>2] = $196;
      $197 = Math_imul($191, $194)|0;
      $198 = ($$4349495|0)==($$0350494|0);
      $199 = ($196|0)==(0);
      $or$cond420 = $198 & $199;
      $200 = (($$0350494) + 1)|0;
      $201 = $200 & 127;
      $202 = (($$0385493) + -9)|0;
      $$$0385 = $or$cond420 ? $202 : $$0385493;
      $$$0350 = $or$cond420 ? $201 : $$0350494;
      $203 = (($$4349495) + 1)|0;
      $204 = ($203|0)==($$3348|0);
      if ($204) {
       break;
      } else {
       $$0340496 = $197;$$0350494 = $$$0350;$$0385493 = $$$0385;$$4349495 = $203;
      }
     }
     $205 = ($197|0)==(0);
     if ($205) {
      $$0350$lcssa554 = $$$0350;$$0372 = $$3348;$$0385$lcssa553 = $$$0385;
     } else {
      $206 = (($6) + ($$3348<<2)|0);
      $207 = (($$3348) + 1)|0;
      HEAP32[$206>>2] = $197;
      $$0350$lcssa554 = $$$0350;$$0372 = $207;$$0385$lcssa553 = $$$0385;
     }
    }
    $208 = (9 - ($186))|0;
    $209 = (($208) + ($$0385$lcssa553))|0;
    $$0380$ph = 0;$$1373$ph448 = $$0372;$$2352$ph449 = $$0350$lcssa554;$$2387$ph447 = $209;
   }
   L101: while(1) {
    $210 = ($$2387$ph447|0)<(18);
    $211 = ($$2387$ph447|0)==(18);
    $212 = (($6) + ($$2352$ph449<<2)|0);
    $$0380 = $$0380$ph;$$1373 = $$1373$ph448;
    while(1) {
     if (!($210)) {
      if (!($211)) {
       $$1381$ph = $$0380;$$4354$ph = $$2352$ph449;$$4389$ph445 = $$2387$ph447;$$6378$ph = $$1373;
       break L101;
      }
      $213 = HEAP32[$212>>2]|0;
      $214 = ($213>>>0)<(9007199);
      if (!($214)) {
       $$1381$ph = $$0380;$$4354$ph = $$2352$ph449;$$4389$ph445 = 18;$$6378$ph = $$1373;
       break L101;
      }
     }
     $215 = (($$1373) + 127)|0;
     $$0334 = 0;$$2374 = $$1373;$$5$in = $215;
     while(1) {
      $$5 = $$5$in & 127;
      $216 = (($6) + ($$5<<2)|0);
      $217 = HEAP32[$216>>2]|0;
      $218 = (_bitshift64Shl(($217|0),0,29)|0);
      $219 = tempRet0;
      $220 = (_i64Add(($218|0),($219|0),($$0334|0),0)|0);
      $221 = tempRet0;
      $222 = ($221>>>0)>(0);
      $223 = ($220>>>0)>(1000000000);
      $224 = ($221|0)==(0);
      $225 = $224 & $223;
      $226 = $222 | $225;
      if ($226) {
       $227 = (___udivdi3(($220|0),($221|0),1000000000,0)|0);
       $228 = tempRet0;
       $229 = (___uremdi3(($220|0),($221|0),1000000000,0)|0);
       $230 = tempRet0;
       $$1335 = $227;$$sink421$off0 = $229;
      } else {
       $$1335 = 0;$$sink421$off0 = $220;
      }
      HEAP32[$216>>2] = $$sink421$off0;
      $231 = (($$2374) + 127)|0;
      $232 = $231 & 127;
      $233 = ($$5|0)!=($232|0);
      $234 = ($$5|0)==($$2352$ph449|0);
      $or$cond422 = $233 | $234;
      $or$cond422$not = $or$cond422 ^ 1;
      $235 = ($$sink421$off0|0)==(0);
      $or$cond423 = $235 & $or$cond422$not;
      $$3375 = $or$cond423 ? $$5 : $$2374;
      $236 = (($$5) + -1)|0;
      if ($234) {
       break;
      } else {
       $$0334 = $$1335;$$2374 = $$3375;$$5$in = $236;
      }
     }
     $237 = (($$0380) + -29)|0;
     $238 = ($$1335|0)==(0);
     if ($238) {
      $$0380 = $237;$$1373 = $$3375;
     } else {
      break;
     }
    }
    $239 = (($$2387$ph447) + 9)|0;
    $240 = (($$2352$ph449) + 127)|0;
    $241 = $240 & 127;
    $242 = ($241|0)==($$3375|0);
    $243 = (($$3375) + 127)|0;
    $244 = $243 & 127;
    $245 = (($$3375) + 126)|0;
    $246 = $245 & 127;
    $247 = (($6) + ($246<<2)|0);
    if ($242) {
     $248 = (($6) + ($244<<2)|0);
     $249 = HEAP32[$248>>2]|0;
     $250 = HEAP32[$247>>2]|0;
     $251 = $250 | $249;
     HEAP32[$247>>2] = $251;
     $$4376 = $244;
    } else {
     $$4376 = $$3375;
    }
    $252 = (($6) + ($241<<2)|0);
    HEAP32[$252>>2] = $$1335;
    $$0380$ph = $237;$$1373$ph448 = $$4376;$$2352$ph449 = $241;$$2387$ph447 = $239;
   }
   L119: while(1) {
    $289 = (($$6378$ph) + 1)|0;
    $287 = $289 & 127;
    $290 = (($$6378$ph) + 127)|0;
    $291 = $290 & 127;
    $292 = (($6) + ($291<<2)|0);
    $$1381$ph558 = $$1381$ph;$$4354$ph559 = $$4354$ph;$$4389$ph = $$4389$ph445;
    while(1) {
     $265 = ($$4389$ph|0)==(18);
     $293 = ($$4389$ph|0)>(27);
     $$425 = $293 ? 9 : 1;
     $$1381 = $$1381$ph558;$$4354 = $$4354$ph559;
     while(1) {
      $$0336486 = 0;
      while(1) {
       $253 = (($$0336486) + ($$4354))|0;
       $254 = $253 & 127;
       $255 = ($254|0)==($$6378$ph|0);
       if ($255) {
        $$1337 = 2;
        label = 88;
        break;
       }
       $256 = (($6) + ($254<<2)|0);
       $257 = HEAP32[$256>>2]|0;
       $258 = (3012 + ($$0336486<<2)|0);
       $259 = HEAP32[$258>>2]|0;
       $260 = ($257>>>0)<($259>>>0);
       if ($260) {
        $$1337 = 2;
        label = 88;
        break;
       }
       $261 = ($257>>>0)>($259>>>0);
       if ($261) {
        break;
       }
       $262 = (($$0336486) + 1)|0;
       $263 = ($262|0)<(2);
       if ($263) {
        $$0336486 = $262;
       } else {
        $$1337 = $262;
        label = 88;
        break;
       }
      }
      if ((label|0) == 88) {
       label = 0;
       $264 = ($$1337|0)==(2);
       $or$cond11 = $265 & $264;
       if ($or$cond11) {
        $$0365484 = 0.0;$$4485 = 0;$$9483 = $$6378$ph;
        break L119;
       }
      }
      $266 = (($$425) + ($$1381))|0;
      $267 = ($$4354|0)==($$6378$ph|0);
      if ($267) {
       $$1381 = $266;$$4354 = $$6378$ph;
      } else {
       break;
      }
     }
     $268 = 1 << $$425;
     $269 = (($268) + -1)|0;
     $270 = 1000000000 >>> $$425;
     $$0332490 = 0;$$5355488 = $$4354;$$5390487 = $$4389$ph;$$6489 = $$4354;
     while(1) {
      $271 = (($6) + ($$6489<<2)|0);
      $272 = HEAP32[$271>>2]|0;
      $273 = $272 & $269;
      $274 = $272 >>> $$425;
      $275 = (($274) + ($$0332490))|0;
      HEAP32[$271>>2] = $275;
      $276 = Math_imul($273, $270)|0;
      $277 = ($$6489|0)==($$5355488|0);
      $278 = ($275|0)==(0);
      $or$cond426 = $277 & $278;
      $279 = (($$5355488) + 1)|0;
      $280 = $279 & 127;
      $281 = (($$5390487) + -9)|0;
      $$$5390 = $or$cond426 ? $281 : $$5390487;
      $$$5355 = $or$cond426 ? $280 : $$5355488;
      $282 = (($$6489) + 1)|0;
      $283 = $282 & 127;
      $284 = ($283|0)==($$6378$ph|0);
      if ($284) {
       break;
      } else {
       $$0332490 = $276;$$5355488 = $$$5355;$$5390487 = $$$5390;$$6489 = $283;
      }
     }
     $285 = ($276|0)==(0);
     if ($285) {
      $$1381$ph558 = $266;$$4354$ph559 = $$$5355;$$4389$ph = $$$5390;
      continue;
     }
     $286 = ($287|0)==($$$5355|0);
     if (!($286)) {
      break;
     }
     $294 = HEAP32[$292>>2]|0;
     $295 = $294 | 1;
     HEAP32[$292>>2] = $295;
     $$1381$ph558 = $266;$$4354$ph559 = $$$5355;$$4389$ph = $$$5390;
    }
    $288 = (($6) + ($$6378$ph<<2)|0);
    HEAP32[$288>>2] = $276;
    $$1381$ph = $266;$$4354$ph = $$$5355;$$4389$ph445 = $$$5390;$$6378$ph = $287;
   }
   while(1) {
    $296 = (($$4485) + ($$4354))|0;
    $297 = $296 & 127;
    $298 = ($297|0)==($$9483|0);
    $299 = (($$9483) + 1)|0;
    $300 = $299 & 127;
    if ($298) {
     $301 = (($300) + -1)|0;
     $302 = (($6) + ($301<<2)|0);
     HEAP32[$302>>2] = 0;
     $$10 = $300;
    } else {
     $$10 = $$9483;
    }
    $303 = $$0365484 * 1.0E+9;
    $304 = (($6) + ($297<<2)|0);
    $305 = HEAP32[$304>>2]|0;
    $306 = (+($305>>>0));
    $307 = $303 + $306;
    $308 = (($$4485) + 1)|0;
    $exitcond = ($308|0)==(2);
    if ($exitcond) {
     break;
    } else {
     $$0365484 = $307;$$4485 = $308;$$9483 = $$10;
    }
   }
   $309 = (+($4|0));
   $310 = $309 * $307;
   $311 = (($$1381) + 53)|0;
   $312 = (($311) - ($3))|0;
   $313 = ($312|0)<($2|0);
   $314 = ($312|0)>(0);
   $$ = $314 ? $312 : 0;
   $$0333 = $313 ? $$ : $2;
   $315 = ($$0333|0)<(53);
   if ($315) {
    $316 = (105 - ($$0333))|0;
    $317 = (+_scalbn(1.0,$316));
    $318 = (+_copysignl($317,$310));
    $319 = (53 - ($$0333))|0;
    $320 = (+_scalbn(1.0,$319));
    $321 = (+_fmodl($310,$320));
    $322 = $310 - $321;
    $323 = $318 + $322;
    $$0360 = $318;$$0361 = $321;$$1366 = $323;
   } else {
    $$0360 = 0.0;$$0361 = 0.0;$$1366 = $310;
   }
   $324 = (($$4354) + 2)|0;
   $325 = $324 & 127;
   $326 = ($325|0)==($$10|0);
   if ($326) {
    $$3364 = $$0361;
   } else {
    $327 = (($6) + ($325<<2)|0);
    $328 = HEAP32[$327>>2]|0;
    $329 = ($328>>>0)<(500000000);
    do {
     if ($329) {
      $330 = ($328|0)==(0);
      if ($330) {
       $331 = (($$4354) + 3)|0;
       $332 = $331 & 127;
       $333 = ($332|0)==($$10|0);
       if ($333) {
        $$1362 = $$0361;
        break;
       }
      }
      $334 = $309 * 0.25;
      $335 = $334 + $$0361;
      $$1362 = $335;
     } else {
      $336 = ($328|0)==(500000000);
      if (!($336)) {
       $337 = $309 * 0.75;
       $338 = $337 + $$0361;
       $$1362 = $338;
       break;
      }
      $339 = (($$4354) + 3)|0;
      $340 = $339 & 127;
      $341 = ($340|0)==($$10|0);
      if ($341) {
       $342 = $309 * 0.5;
       $343 = $342 + $$0361;
       $$1362 = $343;
       break;
      } else {
       $344 = $309 * 0.75;
       $345 = $344 + $$0361;
       $$1362 = $345;
       break;
      }
     }
    } while(0);
    $346 = (53 - ($$0333))|0;
    $347 = ($346|0)>(1);
    if ($347) {
     $348 = (+_fmodl($$1362,1.0));
     $349 = $348 != 0.0;
     if ($349) {
      $$3364 = $$1362;
     } else {
      $350 = $$1362 + 1.0;
      $$3364 = $350;
     }
    } else {
     $$3364 = $$1362;
    }
   }
   $351 = $$1366 + $$3364;
   $352 = $351 - $$0360;
   $353 = $311 & 2147483647;
   $354 = (-2 - ($sum))|0;
   $355 = ($353|0)>($354|0);
   do {
    if ($355) {
     $356 = (+Math_abs((+$352)));
     $357 = !($356 >= 9007199254740992.0);
     $358 = $352 * 0.5;
     $not$ = $357 ^ 1;
     $359 = $not$&1;
     $$3383 = (($359) + ($$1381))|0;
     $$2367 = $357 ? $352 : $358;
     $360 = (($$3383) + 50)|0;
     $361 = ($360|0)>($7|0);
     if (!($361)) {
      $362 = ($$0333|0)!=($312|0);
      $narrow = $362 | $357;
      $$2371$v = $313 & $narrow;
      $363 = $$3364 != 0.0;
      $or$cond14 = $363 & $$2371$v;
      if (!($or$cond14)) {
       $$3368 = $$2367;$$4384 = $$3383;
       break;
      }
     }
     $364 = (___errno_location()|0);
     HEAP32[$364>>2] = 34;
     $$3368 = $$2367;$$4384 = $$3383;
    } else {
     $$3368 = $352;$$4384 = $$1381;
    }
   } while(0);
   $365 = (+_scalbnl($$3368,$$4384));
   $$1 = $365;
  }
 } while(0);
 STACKTOP = sp;return (+$$1);
}
function _scanexp($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$0 = 0, $$04861 = 0, $$049 = 0, $$1$be = 0, $$160 = 0, $$2$be = 0, $$2$lcssa = 0, $$254 = 0, $$3$be = 0, $$lcssa = 0, $$pre = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0;
 var $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0;
 var $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0;
 var $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0;
 var $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0;
 var $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $or$cond3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ((($0)) + 4|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ((($0)) + 100|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ($3>>>0)<($5>>>0);
 if ($6) {
  $7 = ((($3)) + 1|0);
  HEAP32[$2>>2] = $7;
  $8 = HEAP8[$3>>0]|0;
  $9 = $8&255;
  $11 = $9;
 } else {
  $10 = (___shgetc($0)|0);
  $11 = $10;
 }
 switch ($11|0) {
 case 43: case 45:  {
  $12 = ($11|0)==(45);
  $13 = $12&1;
  $14 = HEAP32[$2>>2]|0;
  $15 = HEAP32[$4>>2]|0;
  $16 = ($14>>>0)<($15>>>0);
  if ($16) {
   $17 = ((($14)) + 1|0);
   HEAP32[$2>>2] = $17;
   $18 = HEAP8[$14>>0]|0;
   $19 = $18&255;
   $22 = $19;
  } else {
   $20 = (___shgetc($0)|0);
   $22 = $20;
  }
  $21 = (($22) + -48)|0;
  $23 = ($21>>>0)>(9);
  $24 = ($1|0)!=(0);
  $or$cond3 = $24 & $23;
  if ($or$cond3) {
   $25 = HEAP32[$4>>2]|0;
   $26 = ($25|0)==(0|0);
   if ($26) {
    $$0 = $13;$$049 = $22;
   } else {
    $27 = HEAP32[$2>>2]|0;
    $28 = ((($27)) + -1|0);
    HEAP32[$2>>2] = $28;
    $$0 = $13;$$049 = $22;
   }
  } else {
   $$0 = $13;$$049 = $22;
  }
  break;
 }
 default: {
  $$0 = 0;$$049 = $11;
 }
 }
 $29 = (($$049) + -48)|0;
 $30 = ($29>>>0)>(9);
 if ($30) {
  $31 = HEAP32[$4>>2]|0;
  $32 = ($31|0)==(0|0);
  if ($32) {
   $100 = -2147483648;$101 = 0;
  } else {
   $33 = HEAP32[$2>>2]|0;
   $34 = ((($33)) + -1|0);
   HEAP32[$2>>2] = $34;
   $100 = -2147483648;$101 = 0;
  }
 } else {
  $$04861 = 0;$$160 = $$049;
  while(1) {
   $35 = ($$04861*10)|0;
   $36 = (($$160) + -48)|0;
   $37 = (($36) + ($35))|0;
   $38 = HEAP32[$2>>2]|0;
   $39 = HEAP32[$4>>2]|0;
   $40 = ($38>>>0)<($39>>>0);
   if ($40) {
    $41 = ((($38)) + 1|0);
    HEAP32[$2>>2] = $41;
    $42 = HEAP8[$38>>0]|0;
    $43 = $42&255;
    $$1$be = $43;
   } else {
    $44 = (___shgetc($0)|0);
    $$1$be = $44;
   }
   $45 = (($$1$be) + -48)|0;
   $46 = ($45>>>0)<(10);
   $47 = ($37|0)<(214748364);
   $48 = $46 & $47;
   if ($48) {
    $$04861 = $37;$$160 = $$1$be;
   } else {
    break;
   }
  }
  $49 = ($37|0)<(0);
  $50 = $49 << 31 >> 31;
  $51 = (($$1$be) + -48)|0;
  $52 = ($51>>>0)<(10);
  if ($52) {
   $$254 = $$1$be;$56 = $37;$57 = $50;
   while(1) {
    $58 = (___muldi3(($56|0),($57|0),10,0)|0);
    $59 = tempRet0;
    $60 = ($$254|0)<(0);
    $61 = $60 << 31 >> 31;
    $62 = (_i64Add(($$254|0),($61|0),-48,-1)|0);
    $63 = tempRet0;
    $64 = (_i64Add(($62|0),($63|0),($58|0),($59|0))|0);
    $65 = tempRet0;
    $66 = HEAP32[$2>>2]|0;
    $67 = HEAP32[$4>>2]|0;
    $68 = ($66>>>0)<($67>>>0);
    if ($68) {
     $69 = ((($66)) + 1|0);
     HEAP32[$2>>2] = $69;
     $70 = HEAP8[$66>>0]|0;
     $71 = $70&255;
     $$2$be = $71;
    } else {
     $72 = (___shgetc($0)|0);
     $$2$be = $72;
    }
    $73 = (($$2$be) + -48)|0;
    $74 = ($73>>>0)<(10);
    $75 = ($65|0)<(21474836);
    $76 = ($64>>>0)<(2061584302);
    $77 = ($65|0)==(21474836);
    $78 = $77 & $76;
    $79 = $75 | $78;
    $80 = $74 & $79;
    if ($80) {
     $$254 = $$2$be;$56 = $64;$57 = $65;
    } else {
     $$2$lcssa = $$2$be;$94 = $64;$95 = $65;
     break;
    }
   }
  } else {
   $$2$lcssa = $$1$be;$94 = $37;$95 = $50;
  }
  $53 = (($$2$lcssa) + -48)|0;
  $54 = ($53>>>0)<(10);
  $55 = HEAP32[$4>>2]|0;
  if ($54) {
   $83 = $55;
   while(1) {
    $81 = HEAP32[$2>>2]|0;
    $82 = ($81>>>0)<($83>>>0);
    if ($82) {
     $84 = ((($81)) + 1|0);
     HEAP32[$2>>2] = $84;
     $85 = HEAP8[$81>>0]|0;
     $86 = $85&255;
     $$3$be = $86;$102 = $83;
    } else {
     $87 = (___shgetc($0)|0);
     $$pre = HEAP32[$4>>2]|0;
     $$3$be = $87;$102 = $$pre;
    }
    $88 = (($$3$be) + -48)|0;
    $89 = ($88>>>0)<(10);
    if ($89) {
     $83 = $102;
    } else {
     $$lcssa = $102;
     break;
    }
   }
  } else {
   $$lcssa = $55;
  }
  $90 = ($$lcssa|0)==(0|0);
  if (!($90)) {
   $91 = HEAP32[$2>>2]|0;
   $92 = ((($91)) + -1|0);
   HEAP32[$2>>2] = $92;
  }
  $93 = ($$0|0)!=(0);
  $96 = (_i64Subtract(0,0,($94|0),($95|0))|0);
  $97 = tempRet0;
  $98 = $93 ? $96 : $94;
  $99 = $93 ? $97 : $95;
  $100 = $99;$101 = $98;
 }
 tempRet0 = ($100);
 return ($101|0);
}
function _scalbn($0,$1) {
 $0 = +$0;
 $1 = $1|0;
 var $$ = 0, $$$ = 0, $$0 = 0.0, $$020 = 0, $$1 = 0, $$1$ = 0, $$21 = 0.0, $$22 = 0.0, $10 = 0.0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0.0, $2 = 0, $20 = 0.0;
 var $3 = 0.0, $4 = 0, $5 = 0, $6 = 0.0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($1|0)>(1023);
 if ($2) {
  $3 = $0 * 8.9884656743115795E+307;
  $4 = (($1) + -1023)|0;
  $5 = ($4|0)>(1023);
  $6 = $3 * 8.9884656743115795E+307;
  $7 = (($1) + -2046)|0;
  $8 = ($7|0)<(1023);
  $$ = $8 ? $7 : 1023;
  $$$ = $5 ? $$ : $4;
  $$21 = $5 ? $6 : $3;
  $$0 = $$21;$$020 = $$$;
 } else {
  $9 = ($1|0)<(-1022);
  if ($9) {
   $10 = $0 * 2.2250738585072014E-308;
   $11 = (($1) + 1022)|0;
   $12 = ($11|0)<(-1022);
   $13 = $10 * 2.2250738585072014E-308;
   $14 = (($1) + 2044)|0;
   $15 = ($14|0)>(-1022);
   $$1 = $15 ? $14 : -1022;
   $$1$ = $12 ? $$1 : $11;
   $$22 = $12 ? $13 : $10;
   $$0 = $$22;$$020 = $$1$;
  } else {
   $$0 = $0;$$020 = $1;
  }
 }
 $16 = (($$020) + 1023)|0;
 $17 = (_bitshift64Shl(($16|0),0,52)|0);
 $18 = tempRet0;
 HEAP32[tempDoublePtr>>2] = $17;HEAP32[tempDoublePtr+4>>2] = $18;$19 = +HEAPF64[tempDoublePtr>>3];
 $20 = $$0 * $19;
 return (+$20);
}
function _copysignl($0,$1) {
 $0 = +$0;
 $1 = +$1;
 var $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (+_copysign($0,$1));
 return (+$2);
}
function _fmodl($0,$1) {
 $0 = +$0;
 $1 = +$1;
 var $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (+_fmod($0,$1));
 return (+$2);
}
function _scalbnl($0,$1) {
 $0 = +$0;
 $1 = $1|0;
 var $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (+_scalbn($0,$1));
 return (+$2);
}
function _fmod($0,$1) {
 $0 = +$0;
 $1 = +$1;
 var $$ = 0.0, $$070 = 0.0, $$071$lcssa = 0, $$07194 = 0, $$073$lcssa = 0, $$073100 = 0, $$172$ph = 0, $$174 = 0, $$275$lcssa = 0, $$27586 = 0, $$376$lcssa = 0, $$37683 = 0, $$lcssa = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0.0, $104 = 0, $105 = 0;
 var $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0;
 var $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0.0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0;
 var $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0.0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0;
 var $160 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0.0, $28 = 0.0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0;
 var $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0;
 var $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0;
 var $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0;
 var $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 HEAPF64[tempDoublePtr>>3] = $1;$4 = HEAP32[tempDoublePtr>>2]|0;
 $5 = HEAP32[tempDoublePtr+4>>2]|0;
 $6 = (_bitshift64Lshr(($2|0),($3|0),52)|0);
 $7 = tempRet0;
 $8 = $6 & 2047;
 $9 = (_bitshift64Lshr(($4|0),($5|0),52)|0);
 $10 = tempRet0;
 $11 = $9 & 2047;
 $12 = $3 & -2147483648;
 $13 = (_bitshift64Shl(($4|0),($5|0),1)|0);
 $14 = tempRet0;
 $15 = ($13|0)==(0);
 $16 = ($14|0)==(0);
 $17 = $15 & $16;
 L1: do {
  if ($17) {
   label = 3;
  } else {
   $18 = (___DOUBLE_BITS_561($1)|0);
   $19 = tempRet0;
   $20 = $19 & 2147483647;
   $21 = ($20>>>0)>(2146435072);
   $22 = ($18>>>0)>(0);
   $23 = ($20|0)==(2146435072);
   $24 = $23 & $22;
   $25 = $21 | $24;
   $26 = ($8|0)==(2047);
   $or$cond = $26 | $25;
   if ($or$cond) {
    label = 3;
   } else {
    $29 = (_bitshift64Shl(($2|0),($3|0),1)|0);
    $30 = tempRet0;
    $31 = ($30>>>0)>($14>>>0);
    $32 = ($29>>>0)>($13>>>0);
    $33 = ($30|0)==($14|0);
    $34 = $33 & $32;
    $35 = $31 | $34;
    if (!($35)) {
     $36 = ($29|0)==($13|0);
     $37 = ($30|0)==($14|0);
     $38 = $36 & $37;
     $39 = $0 * 0.0;
     $$ = $38 ? $39 : $0;
     return (+$$);
    }
    $40 = ($8|0)==(0);
    if ($40) {
     $41 = (_bitshift64Shl(($2|0),($3|0),12)|0);
     $42 = tempRet0;
     $43 = ($42|0)>(-1);
     $44 = ($41>>>0)>(4294967295);
     $45 = ($42|0)==(-1);
     $46 = $45 & $44;
     $47 = $43 | $46;
     if ($47) {
      $$073100 = 0;$49 = $41;$50 = $42;
      while(1) {
       $48 = (($$073100) + -1)|0;
       $51 = (_bitshift64Shl(($49|0),($50|0),1)|0);
       $52 = tempRet0;
       $53 = ($52|0)>(-1);
       $54 = ($51>>>0)>(4294967295);
       $55 = ($52|0)==(-1);
       $56 = $55 & $54;
       $57 = $53 | $56;
       if ($57) {
        $$073100 = $48;$49 = $51;$50 = $52;
       } else {
        $$073$lcssa = $48;
        break;
       }
      }
     } else {
      $$073$lcssa = 0;
     }
     $58 = (1 - ($$073$lcssa))|0;
     $59 = (_bitshift64Shl(($2|0),($3|0),($58|0))|0);
     $60 = tempRet0;
     $$174 = $$073$lcssa;$87 = $59;$88 = $60;
    } else {
     $61 = $3 & 1048575;
     $62 = $61 | 1048576;
     $$174 = $8;$87 = $2;$88 = $62;
    }
    $63 = ($11|0)==(0);
    if ($63) {
     $64 = (_bitshift64Shl(($4|0),($5|0),12)|0);
     $65 = tempRet0;
     $66 = ($65|0)>(-1);
     $67 = ($64>>>0)>(4294967295);
     $68 = ($65|0)==(-1);
     $69 = $68 & $67;
     $70 = $66 | $69;
     if ($70) {
      $$07194 = 0;$72 = $64;$73 = $65;
      while(1) {
       $71 = (($$07194) + -1)|0;
       $74 = (_bitshift64Shl(($72|0),($73|0),1)|0);
       $75 = tempRet0;
       $76 = ($75|0)>(-1);
       $77 = ($74>>>0)>(4294967295);
       $78 = ($75|0)==(-1);
       $79 = $78 & $77;
       $80 = $76 | $79;
       if ($80) {
        $$07194 = $71;$72 = $74;$73 = $75;
       } else {
        $$071$lcssa = $71;
        break;
       }
      }
     } else {
      $$071$lcssa = 0;
     }
     $81 = (1 - ($$071$lcssa))|0;
     $82 = (_bitshift64Shl(($4|0),($5|0),($81|0))|0);
     $83 = tempRet0;
     $$172$ph = $$071$lcssa;$89 = $82;$90 = $83;
    } else {
     $84 = $5 & 1048575;
     $85 = $84 | 1048576;
     $$172$ph = $11;$89 = $4;$90 = $85;
    }
    $86 = ($$174|0)>($$172$ph|0);
    $91 = (_i64Subtract(($87|0),($88|0),($89|0),($90|0))|0);
    $92 = tempRet0;
    $93 = ($92|0)>(-1);
    $94 = ($91>>>0)>(4294967295);
    $95 = ($92|0)==(-1);
    $96 = $95 & $94;
    $97 = $93 | $96;
    L23: do {
     if ($86) {
      $$27586 = $$174;$101 = $92;$156 = $97;$157 = $87;$158 = $88;$99 = $91;
      while(1) {
       if ($156) {
        $98 = ($99|0)==(0);
        $100 = ($101|0)==(0);
        $102 = $98 & $100;
        if ($102) {
         break;
        } else {
         $104 = $99;$105 = $101;
        }
       } else {
        $104 = $157;$105 = $158;
       }
       $106 = (_bitshift64Shl(($104|0),($105|0),1)|0);
       $107 = tempRet0;
       $108 = (($$27586) + -1)|0;
       $109 = ($108|0)>($$172$ph|0);
       $110 = (_i64Subtract(($106|0),($107|0),($89|0),($90|0))|0);
       $111 = tempRet0;
       $112 = ($111|0)>(-1);
       $113 = ($110>>>0)>(4294967295);
       $114 = ($111|0)==(-1);
       $115 = $114 & $113;
       $116 = $112 | $115;
       if ($109) {
        $$27586 = $108;$101 = $111;$156 = $116;$157 = $106;$158 = $107;$99 = $110;
       } else {
        $$275$lcssa = $108;$$lcssa = $116;$118 = $110;$120 = $111;$159 = $106;$160 = $107;
        break L23;
       }
      }
      $103 = $0 * 0.0;
      $$070 = $103;
      break L1;
     } else {
      $$275$lcssa = $$174;$$lcssa = $97;$118 = $91;$120 = $92;$159 = $87;$160 = $88;
     }
    } while(0);
    if ($$lcssa) {
     $117 = ($118|0)==(0);
     $119 = ($120|0)==(0);
     $121 = $117 & $119;
     if ($121) {
      $129 = $0 * 0.0;
      $$070 = $129;
      break;
     } else {
      $123 = $120;$125 = $118;
     }
    } else {
     $123 = $160;$125 = $159;
    }
    $122 = ($123>>>0)<(1048576);
    $124 = ($125>>>0)<(0);
    $126 = ($123|0)==(1048576);
    $127 = $126 & $124;
    $128 = $122 | $127;
    if ($128) {
     $$37683 = $$275$lcssa;$130 = $125;$131 = $123;
     while(1) {
      $132 = (_bitshift64Shl(($130|0),($131|0),1)|0);
      $133 = tempRet0;
      $134 = (($$37683) + -1)|0;
      $135 = ($133>>>0)<(1048576);
      $136 = ($132>>>0)<(0);
      $137 = ($133|0)==(1048576);
      $138 = $137 & $136;
      $139 = $135 | $138;
      if ($139) {
       $$37683 = $134;$130 = $132;$131 = $133;
      } else {
       $$376$lcssa = $134;$141 = $132;$142 = $133;
       break;
      }
     }
    } else {
     $$376$lcssa = $$275$lcssa;$141 = $125;$142 = $123;
    }
    $140 = ($$376$lcssa|0)>(0);
    if ($140) {
     $143 = (_i64Add(($141|0),($142|0),0,-1048576)|0);
     $144 = tempRet0;
     $145 = (_bitshift64Shl(($$376$lcssa|0),0,52)|0);
     $146 = tempRet0;
     $147 = $143 | $145;
     $148 = $144 | $146;
     $153 = $148;$154 = $147;
    } else {
     $149 = (1 - ($$376$lcssa))|0;
     $150 = (_bitshift64Lshr(($141|0),($142|0),($149|0))|0);
     $151 = tempRet0;
     $153 = $151;$154 = $150;
    }
    $152 = $153 | $12;
    HEAP32[tempDoublePtr>>2] = $154;HEAP32[tempDoublePtr+4>>2] = $152;$155 = +HEAPF64[tempDoublePtr>>3];
    $$070 = $155;
   }
  }
 } while(0);
 if ((label|0) == 3) {
  $27 = $0 * $1;
  $28 = $27 / $27;
  $$070 = $28;
 }
 return (+$$070);
}
function ___DOUBLE_BITS_561($0) {
 $0 = +$0;
 var $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$1 = HEAP32[tempDoublePtr>>2]|0;
 $2 = HEAP32[tempDoublePtr+4>>2]|0;
 tempRet0 = ($2);
 return ($1|0);
}
function _copysign($0,$1) {
 $0 = +$0;
 $1 = +$1;
 var $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 HEAPF64[tempDoublePtr>>3] = $1;$4 = HEAP32[tempDoublePtr>>2]|0;
 $5 = HEAP32[tempDoublePtr+4>>2]|0;
 $6 = $3 & 2147483647;
 $7 = $5 & -2147483648;
 $8 = $7 | $6;
 HEAP32[tempDoublePtr>>2] = $2;HEAP32[tempDoublePtr+4>>2] = $8;$9 = +HEAPF64[tempDoublePtr>>3];
 return (+$9);
}
function ___uflow($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = sp;
 $2 = (___toread($0)|0);
 $3 = ($2|0)==(0);
 if ($3) {
  $4 = ((($0)) + 32|0);
  $5 = HEAP32[$4>>2]|0;
  $6 = (FUNCTION_TABLE_iiii[$5 & 7]($0,$1,1)|0);
  $7 = ($6|0)==(1);
  if ($7) {
   $8 = HEAP8[$1>>0]|0;
   $9 = $8&255;
   $$0 = $9;
  } else {
   $$0 = -1;
  }
 } else {
  $$0 = -1;
 }
 STACKTOP = sp;return ($$0|0);
}
function ___toread($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $sext = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 74|0);
 $2 = HEAP8[$1>>0]|0;
 $3 = $2 << 24 >> 24;
 $4 = (($3) + 255)|0;
 $5 = $4 | $3;
 $6 = $5&255;
 HEAP8[$1>>0] = $6;
 $7 = ((($0)) + 20|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = ((($0)) + 28|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ($8>>>0)>($10>>>0);
 if ($11) {
  $12 = ((($0)) + 36|0);
  $13 = HEAP32[$12>>2]|0;
  (FUNCTION_TABLE_iiii[$13 & 7]($0,0,0)|0);
 }
 $14 = ((($0)) + 16|0);
 HEAP32[$14>>2] = 0;
 HEAP32[$9>>2] = 0;
 HEAP32[$7>>2] = 0;
 $15 = HEAP32[$0>>2]|0;
 $16 = $15 & 4;
 $17 = ($16|0)==(0);
 if ($17) {
  $19 = ((($0)) + 44|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = ((($0)) + 48|0);
  $22 = HEAP32[$21>>2]|0;
  $23 = (($20) + ($22)|0);
  $24 = ((($0)) + 8|0);
  HEAP32[$24>>2] = $23;
  $25 = ((($0)) + 4|0);
  HEAP32[$25>>2] = $23;
  $26 = $15 << 27;
  $sext = $26 >> 31;
  $$0 = $sext;
 } else {
  $18 = $15 | 32;
  HEAP32[$0>>2] = $18;
  $$0 = -1;
 }
 return ($$0|0);
}
function _fprintf($0,$1,$varargs) {
 $0 = $0|0;
 $1 = $1|0;
 $varargs = $varargs|0;
 var $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = sp;
 HEAP32[$2>>2] = $varargs;
 $3 = (_vfprintf($0,$1,$2)|0);
 STACKTOP = sp;return ($3|0);
}
function _vfprintf($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$ = 0, $$0 = 0, $$1 = 0, $$1$ = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, $vacopy_currentptr = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 224|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(224|0);
 $3 = sp + 120|0;
 $4 = sp + 80|0;
 $5 = sp;
 $6 = sp + 136|0;
 dest=$4; stop=dest+40|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $vacopy_currentptr = HEAP32[$2>>2]|0;
 HEAP32[$3>>2] = $vacopy_currentptr;
 $7 = (_printf_core(0,$1,$3,$5,$4)|0);
 $8 = ($7|0)<(0);
 if ($8) {
  $$0 = -1;
 } else {
  $9 = ((($0)) + 76|0);
  $10 = HEAP32[$9>>2]|0;
  $11 = ($10|0)>(-1);
  if ($11) {
   $12 = (___lockfile($0)|0);
   $40 = $12;
  } else {
   $40 = 0;
  }
  $13 = HEAP32[$0>>2]|0;
  $14 = $13 & 32;
  $15 = ((($0)) + 74|0);
  $16 = HEAP8[$15>>0]|0;
  $17 = ($16<<24>>24)<(1);
  if ($17) {
   $18 = $13 & -33;
   HEAP32[$0>>2] = $18;
  }
  $19 = ((($0)) + 48|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = ($20|0)==(0);
  if ($21) {
   $23 = ((($0)) + 44|0);
   $24 = HEAP32[$23>>2]|0;
   HEAP32[$23>>2] = $6;
   $25 = ((($0)) + 28|0);
   HEAP32[$25>>2] = $6;
   $26 = ((($0)) + 20|0);
   HEAP32[$26>>2] = $6;
   HEAP32[$19>>2] = 80;
   $27 = ((($6)) + 80|0);
   $28 = ((($0)) + 16|0);
   HEAP32[$28>>2] = $27;
   $29 = (_printf_core($0,$1,$3,$5,$4)|0);
   $30 = ($24|0)==(0|0);
   if ($30) {
    $$1 = $29;
   } else {
    $31 = ((($0)) + 36|0);
    $32 = HEAP32[$31>>2]|0;
    (FUNCTION_TABLE_iiii[$32 & 7]($0,0,0)|0);
    $33 = HEAP32[$26>>2]|0;
    $34 = ($33|0)==(0|0);
    $$ = $34 ? -1 : $29;
    HEAP32[$23>>2] = $24;
    HEAP32[$19>>2] = 0;
    HEAP32[$28>>2] = 0;
    HEAP32[$25>>2] = 0;
    HEAP32[$26>>2] = 0;
    $$1 = $$;
   }
  } else {
   $22 = (_printf_core($0,$1,$3,$5,$4)|0);
   $$1 = $22;
  }
  $35 = HEAP32[$0>>2]|0;
  $36 = $35 & 32;
  $37 = ($36|0)==(0);
  $$1$ = $37 ? $$1 : -1;
  $38 = $35 | $14;
  HEAP32[$0>>2] = $38;
  $39 = ($40|0)==(0);
  if (!($39)) {
   ___unlockfile($0);
  }
  $$0 = $$1$;
 }
 STACKTOP = sp;return ($$0|0);
}
function _printf_core($0,$1,$2,$3,$4) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 $4 = $4|0;
 var $$ = 0, $$$ = 0, $$$0259 = 0, $$$0262 = 0, $$$0269 = 0, $$$4266 = 0, $$$5 = 0, $$0 = 0, $$0228 = 0, $$0228$ = 0, $$0229322 = 0, $$0232 = 0, $$0235 = 0, $$0237 = 0, $$0240$lcssa = 0, $$0240$lcssa357 = 0, $$0240321 = 0, $$0243 = 0, $$0247 = 0, $$0249$lcssa = 0;
 var $$0249306 = 0, $$0252 = 0, $$0253 = 0, $$0254 = 0, $$0254$$0254$ = 0, $$0259 = 0, $$0262$lcssa = 0, $$0262311 = 0, $$0269 = 0, $$0269$phi = 0, $$1 = 0, $$1230333 = 0, $$1233 = 0, $$1236 = 0, $$1238 = 0, $$1241332 = 0, $$1244320 = 0, $$1248 = 0, $$1250 = 0, $$1255 = 0;
 var $$1260 = 0, $$1263 = 0, $$1263$ = 0, $$1270 = 0, $$2 = 0, $$2234 = 0, $$2239 = 0, $$2242305 = 0, $$2245 = 0, $$2251 = 0, $$2256 = 0, $$2256$ = 0, $$2256$$$2256 = 0, $$2261 = 0, $$2271 = 0, $$284$ = 0, $$289 = 0, $$290 = 0, $$3257 = 0, $$3265 = 0;
 var $$3272 = 0, $$3303 = 0, $$377 = 0, $$4258355 = 0, $$4266 = 0, $$5 = 0, $$6268 = 0, $$lcssa295 = 0, $$pre = 0, $$pre346 = 0, $$pre347 = 0, $$pre347$pre = 0, $$pre349 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0;
 var $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0;
 var $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0;
 var $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0;
 var $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0;
 var $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0;
 var $197 = 0, $198 = 0, $199 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0;
 var $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0;
 var $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0;
 var $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0;
 var $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0;
 var $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0;
 var $306 = 0.0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0;
 var $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0;
 var $arglist_current = 0, $arglist_current2 = 0, $arglist_next = 0, $arglist_next3 = 0, $expanded = 0, $expanded10 = 0, $expanded11 = 0, $expanded13 = 0, $expanded14 = 0, $expanded15 = 0, $expanded4 = 0, $expanded6 = 0, $expanded7 = 0, $expanded8 = 0, $isdigit = 0, $isdigit275 = 0, $isdigit277 = 0, $isdigittmp = 0, $isdigittmp$ = 0, $isdigittmp274 = 0;
 var $isdigittmp276 = 0, $narrow = 0, $or$cond = 0, $or$cond281 = 0, $or$cond283 = 0, $or$cond286 = 0, $storemerge = 0, $storemerge273310 = 0, $storemerge278 = 0, $trunc = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $5 = sp + 16|0;
 $6 = sp;
 $7 = sp + 24|0;
 $8 = sp + 8|0;
 $9 = sp + 20|0;
 HEAP32[$5>>2] = $1;
 $10 = ($0|0)!=(0|0);
 $11 = ((($7)) + 40|0);
 $12 = $11;
 $13 = ((($7)) + 39|0);
 $14 = ((($8)) + 4|0);
 $$0243 = 0;$$0247 = 0;$$0269 = 0;$21 = $1;
 L1: while(1) {
  $15 = ($$0247|0)>(-1);
  do {
   if ($15) {
    $16 = (2147483647 - ($$0247))|0;
    $17 = ($$0243|0)>($16|0);
    if ($17) {
     $18 = (___errno_location()|0);
     HEAP32[$18>>2] = 75;
     $$1248 = -1;
     break;
    } else {
     $19 = (($$0243) + ($$0247))|0;
     $$1248 = $19;
     break;
    }
   } else {
    $$1248 = $$0247;
   }
  } while(0);
  $20 = HEAP8[$21>>0]|0;
  $22 = ($20<<24>>24)==(0);
  if ($22) {
   label = 87;
   break;
  } else {
   $23 = $20;$25 = $21;
  }
  L9: while(1) {
   switch ($23<<24>>24) {
   case 37:  {
    $$0249306 = $25;$27 = $25;
    label = 9;
    break L9;
    break;
   }
   case 0:  {
    $$0249$lcssa = $25;$39 = $25;
    break L9;
    break;
   }
   default: {
   }
   }
   $24 = ((($25)) + 1|0);
   HEAP32[$5>>2] = $24;
   $$pre = HEAP8[$24>>0]|0;
   $23 = $$pre;$25 = $24;
  }
  L12: do {
   if ((label|0) == 9) {
    while(1) {
     label = 0;
     $26 = ((($27)) + 1|0);
     $28 = HEAP8[$26>>0]|0;
     $29 = ($28<<24>>24)==(37);
     if (!($29)) {
      $$0249$lcssa = $$0249306;$39 = $27;
      break L12;
     }
     $30 = ((($$0249306)) + 1|0);
     $31 = ((($27)) + 2|0);
     HEAP32[$5>>2] = $31;
     $32 = HEAP8[$31>>0]|0;
     $33 = ($32<<24>>24)==(37);
     if ($33) {
      $$0249306 = $30;$27 = $31;
      label = 9;
     } else {
      $$0249$lcssa = $30;$39 = $31;
      break;
     }
    }
   }
  } while(0);
  $34 = $$0249$lcssa;
  $35 = $21;
  $36 = (($34) - ($35))|0;
  if ($10) {
   _out_668($0,$21,$36);
  }
  $37 = ($36|0)==(0);
  if (!($37)) {
   $$0269$phi = $$0269;$$0243 = $36;$$0247 = $$1248;$21 = $39;$$0269 = $$0269$phi;
   continue;
  }
  $38 = ((($39)) + 1|0);
  $40 = HEAP8[$38>>0]|0;
  $41 = $40 << 24 >> 24;
  $isdigittmp = (($41) + -48)|0;
  $isdigit = ($isdigittmp>>>0)<(10);
  if ($isdigit) {
   $42 = ((($39)) + 2|0);
   $43 = HEAP8[$42>>0]|0;
   $44 = ($43<<24>>24)==(36);
   $45 = ((($39)) + 3|0);
   $$377 = $44 ? $45 : $38;
   $$$0269 = $44 ? 1 : $$0269;
   $isdigittmp$ = $44 ? $isdigittmp : -1;
   $$0253 = $isdigittmp$;$$1270 = $$$0269;$storemerge = $$377;
  } else {
   $$0253 = -1;$$1270 = $$0269;$storemerge = $38;
  }
  HEAP32[$5>>2] = $storemerge;
  $46 = HEAP8[$storemerge>>0]|0;
  $47 = $46 << 24 >> 24;
  $48 = (($47) + -32)|0;
  $49 = ($48>>>0)<(32);
  L24: do {
   if ($49) {
    $$0262311 = 0;$329 = $46;$51 = $48;$storemerge273310 = $storemerge;
    while(1) {
     $50 = 1 << $51;
     $52 = $50 & 75913;
     $53 = ($52|0)==(0);
     if ($53) {
      $$0262$lcssa = $$0262311;$$lcssa295 = $329;$62 = $storemerge273310;
      break L24;
     }
     $54 = $50 | $$0262311;
     $55 = ((($storemerge273310)) + 1|0);
     HEAP32[$5>>2] = $55;
     $56 = HEAP8[$55>>0]|0;
     $57 = $56 << 24 >> 24;
     $58 = (($57) + -32)|0;
     $59 = ($58>>>0)<(32);
     if ($59) {
      $$0262311 = $54;$329 = $56;$51 = $58;$storemerge273310 = $55;
     } else {
      $$0262$lcssa = $54;$$lcssa295 = $56;$62 = $55;
      break;
     }
    }
   } else {
    $$0262$lcssa = 0;$$lcssa295 = $46;$62 = $storemerge;
   }
  } while(0);
  $60 = ($$lcssa295<<24>>24)==(42);
  if ($60) {
   $61 = ((($62)) + 1|0);
   $63 = HEAP8[$61>>0]|0;
   $64 = $63 << 24 >> 24;
   $isdigittmp276 = (($64) + -48)|0;
   $isdigit277 = ($isdigittmp276>>>0)<(10);
   if ($isdigit277) {
    $65 = ((($62)) + 2|0);
    $66 = HEAP8[$65>>0]|0;
    $67 = ($66<<24>>24)==(36);
    if ($67) {
     $68 = (($4) + ($isdigittmp276<<2)|0);
     HEAP32[$68>>2] = 10;
     $69 = HEAP8[$61>>0]|0;
     $70 = $69 << 24 >> 24;
     $71 = (($70) + -48)|0;
     $72 = (($3) + ($71<<3)|0);
     $73 = $72;
     $74 = $73;
     $75 = HEAP32[$74>>2]|0;
     $76 = (($73) + 4)|0;
     $77 = $76;
     $78 = HEAP32[$77>>2]|0;
     $79 = ((($62)) + 3|0);
     $$0259 = $75;$$2271 = 1;$storemerge278 = $79;
    } else {
     label = 23;
    }
   } else {
    label = 23;
   }
   if ((label|0) == 23) {
    label = 0;
    $80 = ($$1270|0)==(0);
    if (!($80)) {
     $$0 = -1;
     break;
    }
    if ($10) {
     $arglist_current = HEAP32[$2>>2]|0;
     $81 = $arglist_current;
     $82 = ((0) + 4|0);
     $expanded4 = $82;
     $expanded = (($expanded4) - 1)|0;
     $83 = (($81) + ($expanded))|0;
     $84 = ((0) + 4|0);
     $expanded8 = $84;
     $expanded7 = (($expanded8) - 1)|0;
     $expanded6 = $expanded7 ^ -1;
     $85 = $83 & $expanded6;
     $86 = $85;
     $87 = HEAP32[$86>>2]|0;
     $arglist_next = ((($86)) + 4|0);
     HEAP32[$2>>2] = $arglist_next;
     $$0259 = $87;$$2271 = 0;$storemerge278 = $61;
    } else {
     $$0259 = 0;$$2271 = 0;$storemerge278 = $61;
    }
   }
   HEAP32[$5>>2] = $storemerge278;
   $88 = ($$0259|0)<(0);
   $89 = $$0262$lcssa | 8192;
   $90 = (0 - ($$0259))|0;
   $$$0262 = $88 ? $89 : $$0262$lcssa;
   $$$0259 = $88 ? $90 : $$0259;
   $$1260 = $$$0259;$$1263 = $$$0262;$$3272 = $$2271;$94 = $storemerge278;
  } else {
   $91 = (_getint_669($5)|0);
   $92 = ($91|0)<(0);
   if ($92) {
    $$0 = -1;
    break;
   }
   $$pre346 = HEAP32[$5>>2]|0;
   $$1260 = $91;$$1263 = $$0262$lcssa;$$3272 = $$1270;$94 = $$pre346;
  }
  $93 = HEAP8[$94>>0]|0;
  $95 = ($93<<24>>24)==(46);
  do {
   if ($95) {
    $96 = ((($94)) + 1|0);
    $97 = HEAP8[$96>>0]|0;
    $98 = ($97<<24>>24)==(42);
    if (!($98)) {
     $125 = ((($94)) + 1|0);
     HEAP32[$5>>2] = $125;
     $126 = (_getint_669($5)|0);
     $$pre347$pre = HEAP32[$5>>2]|0;
     $$0254 = $126;$$pre347 = $$pre347$pre;
     break;
    }
    $99 = ((($94)) + 2|0);
    $100 = HEAP8[$99>>0]|0;
    $101 = $100 << 24 >> 24;
    $isdigittmp274 = (($101) + -48)|0;
    $isdigit275 = ($isdigittmp274>>>0)<(10);
    if ($isdigit275) {
     $102 = ((($94)) + 3|0);
     $103 = HEAP8[$102>>0]|0;
     $104 = ($103<<24>>24)==(36);
     if ($104) {
      $105 = (($4) + ($isdigittmp274<<2)|0);
      HEAP32[$105>>2] = 10;
      $106 = HEAP8[$99>>0]|0;
      $107 = $106 << 24 >> 24;
      $108 = (($107) + -48)|0;
      $109 = (($3) + ($108<<3)|0);
      $110 = $109;
      $111 = $110;
      $112 = HEAP32[$111>>2]|0;
      $113 = (($110) + 4)|0;
      $114 = $113;
      $115 = HEAP32[$114>>2]|0;
      $116 = ((($94)) + 4|0);
      HEAP32[$5>>2] = $116;
      $$0254 = $112;$$pre347 = $116;
      break;
     }
    }
    $117 = ($$3272|0)==(0);
    if (!($117)) {
     $$0 = -1;
     break L1;
    }
    if ($10) {
     $arglist_current2 = HEAP32[$2>>2]|0;
     $118 = $arglist_current2;
     $119 = ((0) + 4|0);
     $expanded11 = $119;
     $expanded10 = (($expanded11) - 1)|0;
     $120 = (($118) + ($expanded10))|0;
     $121 = ((0) + 4|0);
     $expanded15 = $121;
     $expanded14 = (($expanded15) - 1)|0;
     $expanded13 = $expanded14 ^ -1;
     $122 = $120 & $expanded13;
     $123 = $122;
     $124 = HEAP32[$123>>2]|0;
     $arglist_next3 = ((($123)) + 4|0);
     HEAP32[$2>>2] = $arglist_next3;
     $330 = $124;
    } else {
     $330 = 0;
    }
    HEAP32[$5>>2] = $99;
    $$0254 = $330;$$pre347 = $99;
   } else {
    $$0254 = -1;$$pre347 = $94;
   }
  } while(0);
  $$0252 = 0;$128 = $$pre347;
  while(1) {
   $127 = HEAP8[$128>>0]|0;
   $129 = $127 << 24 >> 24;
   $130 = (($129) + -65)|0;
   $131 = ($130>>>0)>(57);
   if ($131) {
    $$0 = -1;
    break L1;
   }
   $132 = ((($128)) + 1|0);
   HEAP32[$5>>2] = $132;
   $133 = HEAP8[$128>>0]|0;
   $134 = $133 << 24 >> 24;
   $135 = (($134) + -65)|0;
   $136 = ((14840 + (($$0252*58)|0)|0) + ($135)|0);
   $137 = HEAP8[$136>>0]|0;
   $138 = $137&255;
   $139 = (($138) + -1)|0;
   $140 = ($139>>>0)<(8);
   if ($140) {
    $$0252 = $138;$128 = $132;
   } else {
    break;
   }
  }
  $141 = ($137<<24>>24)==(0);
  if ($141) {
   $$0 = -1;
   break;
  }
  $142 = ($137<<24>>24)==(19);
  $143 = ($$0253|0)>(-1);
  do {
   if ($142) {
    if ($143) {
     $$0 = -1;
     break L1;
    } else {
     label = 49;
    }
   } else {
    if ($143) {
     $144 = (($4) + ($$0253<<2)|0);
     HEAP32[$144>>2] = $138;
     $145 = (($3) + ($$0253<<3)|0);
     $146 = $145;
     $147 = $146;
     $148 = HEAP32[$147>>2]|0;
     $149 = (($146) + 4)|0;
     $150 = $149;
     $151 = HEAP32[$150>>2]|0;
     $152 = $6;
     $153 = $152;
     HEAP32[$153>>2] = $148;
     $154 = (($152) + 4)|0;
     $155 = $154;
     HEAP32[$155>>2] = $151;
     label = 49;
     break;
    }
    if (!($10)) {
     $$0 = 0;
     break L1;
    }
    _pop_arg_671($6,$138,$2);
   }
  } while(0);
  if ((label|0) == 49) {
   label = 0;
   if (!($10)) {
    $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
    continue;
   }
  }
  $156 = HEAP8[$128>>0]|0;
  $157 = $156 << 24 >> 24;
  $158 = ($$0252|0)!=(0);
  $159 = $157 & 15;
  $160 = ($159|0)==(3);
  $or$cond281 = $158 & $160;
  $161 = $157 & -33;
  $$0235 = $or$cond281 ? $161 : $157;
  $162 = $$1263 & 8192;
  $163 = ($162|0)==(0);
  $164 = $$1263 & -65537;
  $$1263$ = $163 ? $$1263 : $164;
  L71: do {
   switch ($$0235|0) {
   case 110:  {
    $trunc = $$0252&255;
    switch ($trunc<<24>>24) {
    case 0:  {
     $171 = HEAP32[$6>>2]|0;
     HEAP32[$171>>2] = $$1248;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 1:  {
     $172 = HEAP32[$6>>2]|0;
     HEAP32[$172>>2] = $$1248;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 2:  {
     $173 = ($$1248|0)<(0);
     $174 = $173 << 31 >> 31;
     $175 = HEAP32[$6>>2]|0;
     $176 = $175;
     $177 = $176;
     HEAP32[$177>>2] = $$1248;
     $178 = (($176) + 4)|0;
     $179 = $178;
     HEAP32[$179>>2] = $174;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 3:  {
     $180 = $$1248&65535;
     $181 = HEAP32[$6>>2]|0;
     HEAP16[$181>>1] = $180;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 4:  {
     $182 = $$1248&255;
     $183 = HEAP32[$6>>2]|0;
     HEAP8[$183>>0] = $182;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 6:  {
     $184 = HEAP32[$6>>2]|0;
     HEAP32[$184>>2] = $$1248;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    case 7:  {
     $185 = ($$1248|0)<(0);
     $186 = $185 << 31 >> 31;
     $187 = HEAP32[$6>>2]|0;
     $188 = $187;
     $189 = $188;
     HEAP32[$189>>2] = $$1248;
     $190 = (($188) + 4)|0;
     $191 = $190;
     HEAP32[$191>>2] = $186;
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
     break;
    }
    default: {
     $$0243 = 0;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
     continue L1;
    }
    }
    break;
   }
   case 112:  {
    $192 = ($$0254>>>0)>(8);
    $193 = $192 ? $$0254 : 8;
    $194 = $$1263$ | 8;
    $$1236 = 120;$$1255 = $193;$$3265 = $194;
    label = 61;
    break;
   }
   case 88: case 120:  {
    $$1236 = $$0235;$$1255 = $$0254;$$3265 = $$1263$;
    label = 61;
    break;
   }
   case 111:  {
    $210 = $6;
    $211 = $210;
    $212 = HEAP32[$211>>2]|0;
    $213 = (($210) + 4)|0;
    $214 = $213;
    $215 = HEAP32[$214>>2]|0;
    $216 = (_fmt_o($212,$215,$11)|0);
    $217 = $$1263$ & 8;
    $218 = ($217|0)==(0);
    $219 = $216;
    $220 = (($12) - ($219))|0;
    $221 = ($$0254|0)>($220|0);
    $222 = (($220) + 1)|0;
    $223 = $218 | $221;
    $$0254$$0254$ = $223 ? $$0254 : $222;
    $$0228 = $216;$$1233 = 0;$$1238 = 15304;$$2256 = $$0254$$0254$;$$4266 = $$1263$;$248 = $212;$250 = $215;
    label = 67;
    break;
   }
   case 105: case 100:  {
    $224 = $6;
    $225 = $224;
    $226 = HEAP32[$225>>2]|0;
    $227 = (($224) + 4)|0;
    $228 = $227;
    $229 = HEAP32[$228>>2]|0;
    $230 = ($229|0)<(0);
    if ($230) {
     $231 = (_i64Subtract(0,0,($226|0),($229|0))|0);
     $232 = tempRet0;
     $233 = $6;
     $234 = $233;
     HEAP32[$234>>2] = $231;
     $235 = (($233) + 4)|0;
     $236 = $235;
     HEAP32[$236>>2] = $232;
     $$0232 = 1;$$0237 = 15304;$242 = $231;$243 = $232;
     label = 66;
     break L71;
    } else {
     $237 = $$1263$ & 2048;
     $238 = ($237|0)==(0);
     $239 = $$1263$ & 1;
     $240 = ($239|0)==(0);
     $$ = $240 ? 15304 : (15306);
     $$$ = $238 ? $$ : (15305);
     $241 = $$1263$ & 2049;
     $narrow = ($241|0)!=(0);
     $$284$ = $narrow&1;
     $$0232 = $$284$;$$0237 = $$$;$242 = $226;$243 = $229;
     label = 66;
     break L71;
    }
    break;
   }
   case 117:  {
    $165 = $6;
    $166 = $165;
    $167 = HEAP32[$166>>2]|0;
    $168 = (($165) + 4)|0;
    $169 = $168;
    $170 = HEAP32[$169>>2]|0;
    $$0232 = 0;$$0237 = 15304;$242 = $167;$243 = $170;
    label = 66;
    break;
   }
   case 99:  {
    $259 = $6;
    $260 = $259;
    $261 = HEAP32[$260>>2]|0;
    $262 = (($259) + 4)|0;
    $263 = $262;
    $264 = HEAP32[$263>>2]|0;
    $265 = $261&255;
    HEAP8[$13>>0] = $265;
    $$2 = $13;$$2234 = 0;$$2239 = 15304;$$2251 = $11;$$5 = 1;$$6268 = $164;
    break;
   }
   case 109:  {
    $266 = (___errno_location()|0);
    $267 = HEAP32[$266>>2]|0;
    $268 = (_strerror($267)|0);
    $$1 = $268;
    label = 71;
    break;
   }
   case 115:  {
    $269 = HEAP32[$6>>2]|0;
    $270 = ($269|0)!=(0|0);
    $271 = $270 ? $269 : 15314;
    $$1 = $271;
    label = 71;
    break;
   }
   case 67:  {
    $278 = $6;
    $279 = $278;
    $280 = HEAP32[$279>>2]|0;
    $281 = (($278) + 4)|0;
    $282 = $281;
    $283 = HEAP32[$282>>2]|0;
    HEAP32[$8>>2] = $280;
    HEAP32[$14>>2] = 0;
    HEAP32[$6>>2] = $8;
    $$4258355 = -1;$331 = $8;
    label = 75;
    break;
   }
   case 83:  {
    $$pre349 = HEAP32[$6>>2]|0;
    $284 = ($$0254|0)==(0);
    if ($284) {
     _pad_674($0,32,$$1260,0,$$1263$);
     $$0240$lcssa357 = 0;
     label = 84;
    } else {
     $$4258355 = $$0254;$331 = $$pre349;
     label = 75;
    }
    break;
   }
   case 65: case 71: case 70: case 69: case 97: case 103: case 102: case 101:  {
    $306 = +HEAPF64[$6>>3];
    $307 = (_fmt_fp($0,$306,$$1260,$$0254,$$1263$,$$0235)|0);
    $$0243 = $307;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
    continue L1;
    break;
   }
   default: {
    $$2 = $21;$$2234 = 0;$$2239 = 15304;$$2251 = $11;$$5 = $$0254;$$6268 = $$1263$;
   }
   }
  } while(0);
  L95: do {
   if ((label|0) == 61) {
    label = 0;
    $195 = $6;
    $196 = $195;
    $197 = HEAP32[$196>>2]|0;
    $198 = (($195) + 4)|0;
    $199 = $198;
    $200 = HEAP32[$199>>2]|0;
    $201 = $$1236 & 32;
    $202 = (_fmt_x($197,$200,$11,$201)|0);
    $203 = ($197|0)==(0);
    $204 = ($200|0)==(0);
    $205 = $203 & $204;
    $206 = $$3265 & 8;
    $207 = ($206|0)==(0);
    $or$cond283 = $207 | $205;
    $208 = $$1236 >> 4;
    $209 = (15304 + ($208)|0);
    $$289 = $or$cond283 ? 15304 : $209;
    $$290 = $or$cond283 ? 0 : 2;
    $$0228 = $202;$$1233 = $$290;$$1238 = $$289;$$2256 = $$1255;$$4266 = $$3265;$248 = $197;$250 = $200;
    label = 67;
   }
   else if ((label|0) == 66) {
    label = 0;
    $244 = (_fmt_u($242,$243,$11)|0);
    $$0228 = $244;$$1233 = $$0232;$$1238 = $$0237;$$2256 = $$0254;$$4266 = $$1263$;$248 = $242;$250 = $243;
    label = 67;
   }
   else if ((label|0) == 71) {
    label = 0;
    $272 = (_memchr($$1,0,$$0254)|0);
    $273 = ($272|0)==(0|0);
    $274 = $272;
    $275 = $$1;
    $276 = (($274) - ($275))|0;
    $277 = (($$1) + ($$0254)|0);
    $$3257 = $273 ? $$0254 : $276;
    $$1250 = $273 ? $277 : $272;
    $$2 = $$1;$$2234 = 0;$$2239 = 15304;$$2251 = $$1250;$$5 = $$3257;$$6268 = $164;
   }
   else if ((label|0) == 75) {
    label = 0;
    $$0229322 = $331;$$0240321 = 0;$$1244320 = 0;
    while(1) {
     $285 = HEAP32[$$0229322>>2]|0;
     $286 = ($285|0)==(0);
     if ($286) {
      $$0240$lcssa = $$0240321;$$2245 = $$1244320;
      break;
     }
     $287 = (_wctomb($9,$285)|0);
     $288 = ($287|0)<(0);
     $289 = (($$4258355) - ($$0240321))|0;
     $290 = ($287>>>0)>($289>>>0);
     $or$cond286 = $288 | $290;
     if ($or$cond286) {
      $$0240$lcssa = $$0240321;$$2245 = $287;
      break;
     }
     $291 = ((($$0229322)) + 4|0);
     $292 = (($287) + ($$0240321))|0;
     $293 = ($$4258355>>>0)>($292>>>0);
     if ($293) {
      $$0229322 = $291;$$0240321 = $292;$$1244320 = $287;
     } else {
      $$0240$lcssa = $292;$$2245 = $287;
      break;
     }
    }
    $294 = ($$2245|0)<(0);
    if ($294) {
     $$0 = -1;
     break L1;
    }
    _pad_674($0,32,$$1260,$$0240$lcssa,$$1263$);
    $295 = ($$0240$lcssa|0)==(0);
    if ($295) {
     $$0240$lcssa357 = 0;
     label = 84;
    } else {
     $$1230333 = $331;$$1241332 = 0;
     while(1) {
      $296 = HEAP32[$$1230333>>2]|0;
      $297 = ($296|0)==(0);
      if ($297) {
       $$0240$lcssa357 = $$0240$lcssa;
       label = 84;
       break L95;
      }
      $298 = (_wctomb($9,$296)|0);
      $299 = (($298) + ($$1241332))|0;
      $300 = ($299|0)>($$0240$lcssa|0);
      if ($300) {
       $$0240$lcssa357 = $$0240$lcssa;
       label = 84;
       break L95;
      }
      $301 = ((($$1230333)) + 4|0);
      _out_668($0,$9,$298);
      $302 = ($299>>>0)<($$0240$lcssa>>>0);
      if ($302) {
       $$1230333 = $301;$$1241332 = $299;
      } else {
       $$0240$lcssa357 = $$0240$lcssa;
       label = 84;
       break;
      }
     }
    }
   }
  } while(0);
  if ((label|0) == 67) {
   label = 0;
   $245 = ($$2256|0)>(-1);
   $246 = $$4266 & -65537;
   $$$4266 = $245 ? $246 : $$4266;
   $247 = ($248|0)!=(0);
   $249 = ($250|0)!=(0);
   $251 = $247 | $249;
   $252 = ($$2256|0)!=(0);
   $or$cond = $252 | $251;
   $253 = $$0228;
   $254 = (($12) - ($253))|0;
   $255 = $251 ^ 1;
   $256 = $255&1;
   $257 = (($256) + ($254))|0;
   $258 = ($$2256|0)>($257|0);
   $$2256$ = $258 ? $$2256 : $257;
   $$2256$$$2256 = $or$cond ? $$2256$ : $$2256;
   $$0228$ = $or$cond ? $$0228 : $11;
   $$2 = $$0228$;$$2234 = $$1233;$$2239 = $$1238;$$2251 = $11;$$5 = $$2256$$$2256;$$6268 = $$$4266;
  }
  else if ((label|0) == 84) {
   label = 0;
   $303 = $$1263$ ^ 8192;
   _pad_674($0,32,$$1260,$$0240$lcssa357,$303);
   $304 = ($$1260|0)>($$0240$lcssa357|0);
   $305 = $304 ? $$1260 : $$0240$lcssa357;
   $$0243 = $305;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
   continue;
  }
  $308 = $$2251;
  $309 = $$2;
  $310 = (($308) - ($309))|0;
  $311 = ($$5|0)<($310|0);
  $$$5 = $311 ? $310 : $$5;
  $312 = (($$$5) + ($$2234))|0;
  $313 = ($$1260|0)<($312|0);
  $$2261 = $313 ? $312 : $$1260;
  _pad_674($0,32,$$2261,$312,$$6268);
  _out_668($0,$$2239,$$2234);
  $314 = $$6268 ^ 65536;
  _pad_674($0,48,$$2261,$312,$314);
  _pad_674($0,48,$$$5,$310,0);
  _out_668($0,$$2,$310);
  $315 = $$6268 ^ 8192;
  _pad_674($0,32,$$2261,$312,$315);
  $$0243 = $$2261;$$0247 = $$1248;$$0269 = $$3272;$21 = $132;
 }
 L114: do {
  if ((label|0) == 87) {
   $316 = ($0|0)==(0|0);
   if ($316) {
    $317 = ($$0269|0)==(0);
    if ($317) {
     $$0 = 0;
    } else {
     $$2242305 = 1;
     while(1) {
      $318 = (($4) + ($$2242305<<2)|0);
      $319 = HEAP32[$318>>2]|0;
      $320 = ($319|0)==(0);
      if ($320) {
       $$3303 = $$2242305;
       break;
      }
      $321 = (($3) + ($$2242305<<3)|0);
      _pop_arg_671($321,$319,$2);
      $322 = (($$2242305) + 1)|0;
      $323 = ($322|0)<(10);
      if ($323) {
       $$2242305 = $322;
      } else {
       $$0 = 1;
       break L114;
      }
     }
     while(1) {
      $326 = (($4) + ($$3303<<2)|0);
      $327 = HEAP32[$326>>2]|0;
      $328 = ($327|0)==(0);
      $325 = (($$3303) + 1)|0;
      if (!($328)) {
       $$0 = -1;
       break L114;
      }
      $324 = ($325|0)<(10);
      if ($324) {
       $$3303 = $325;
      } else {
       $$0 = 1;
       break;
      }
     }
    }
   } else {
    $$0 = $$1248;
   }
  }
 } while(0);
 STACKTOP = sp;return ($$0|0);
}
function _out_668($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = HEAP32[$0>>2]|0;
 $4 = $3 & 32;
 $5 = ($4|0)==(0);
 if ($5) {
  (___fwritex($1,$2,$0)|0);
 }
 return;
}
function _getint_669($0) {
 $0 = $0|0;
 var $$0$lcssa = 0, $$06 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $isdigit = 0, $isdigit5 = 0, $isdigittmp = 0, $isdigittmp4 = 0, $isdigittmp7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = HEAP32[$0>>2]|0;
 $2 = HEAP8[$1>>0]|0;
 $3 = $2 << 24 >> 24;
 $isdigittmp4 = (($3) + -48)|0;
 $isdigit5 = ($isdigittmp4>>>0)<(10);
 if ($isdigit5) {
  $$06 = 0;$7 = $1;$isdigittmp7 = $isdigittmp4;
  while(1) {
   $4 = ($$06*10)|0;
   $5 = (($isdigittmp7) + ($4))|0;
   $6 = ((($7)) + 1|0);
   HEAP32[$0>>2] = $6;
   $8 = HEAP8[$6>>0]|0;
   $9 = $8 << 24 >> 24;
   $isdigittmp = (($9) + -48)|0;
   $isdigit = ($isdigittmp>>>0)<(10);
   if ($isdigit) {
    $$06 = $5;$7 = $6;$isdigittmp7 = $isdigittmp;
   } else {
    $$0$lcssa = $5;
    break;
   }
  }
 } else {
  $$0$lcssa = 0;
 }
 return ($$0$lcssa|0);
}
function _pop_arg_671($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$mask = 0, $$mask31 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0.0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0;
 var $116 = 0.0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $arglist_current = 0, $arglist_current11 = 0, $arglist_current14 = 0, $arglist_current17 = 0;
 var $arglist_current2 = 0, $arglist_current20 = 0, $arglist_current23 = 0, $arglist_current26 = 0, $arglist_current5 = 0, $arglist_current8 = 0, $arglist_next = 0, $arglist_next12 = 0, $arglist_next15 = 0, $arglist_next18 = 0, $arglist_next21 = 0, $arglist_next24 = 0, $arglist_next27 = 0, $arglist_next3 = 0, $arglist_next6 = 0, $arglist_next9 = 0, $expanded = 0, $expanded28 = 0, $expanded30 = 0, $expanded31 = 0;
 var $expanded32 = 0, $expanded34 = 0, $expanded35 = 0, $expanded37 = 0, $expanded38 = 0, $expanded39 = 0, $expanded41 = 0, $expanded42 = 0, $expanded44 = 0, $expanded45 = 0, $expanded46 = 0, $expanded48 = 0, $expanded49 = 0, $expanded51 = 0, $expanded52 = 0, $expanded53 = 0, $expanded55 = 0, $expanded56 = 0, $expanded58 = 0, $expanded59 = 0;
 var $expanded60 = 0, $expanded62 = 0, $expanded63 = 0, $expanded65 = 0, $expanded66 = 0, $expanded67 = 0, $expanded69 = 0, $expanded70 = 0, $expanded72 = 0, $expanded73 = 0, $expanded74 = 0, $expanded76 = 0, $expanded77 = 0, $expanded79 = 0, $expanded80 = 0, $expanded81 = 0, $expanded83 = 0, $expanded84 = 0, $expanded86 = 0, $expanded87 = 0;
 var $expanded88 = 0, $expanded90 = 0, $expanded91 = 0, $expanded93 = 0, $expanded94 = 0, $expanded95 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ($1>>>0)>(20);
 L1: do {
  if (!($3)) {
   do {
    switch ($1|0) {
    case 9:  {
     $arglist_current = HEAP32[$2>>2]|0;
     $4 = $arglist_current;
     $5 = ((0) + 4|0);
     $expanded28 = $5;
     $expanded = (($expanded28) - 1)|0;
     $6 = (($4) + ($expanded))|0;
     $7 = ((0) + 4|0);
     $expanded32 = $7;
     $expanded31 = (($expanded32) - 1)|0;
     $expanded30 = $expanded31 ^ -1;
     $8 = $6 & $expanded30;
     $9 = $8;
     $10 = HEAP32[$9>>2]|0;
     $arglist_next = ((($9)) + 4|0);
     HEAP32[$2>>2] = $arglist_next;
     HEAP32[$0>>2] = $10;
     break L1;
     break;
    }
    case 10:  {
     $arglist_current2 = HEAP32[$2>>2]|0;
     $11 = $arglist_current2;
     $12 = ((0) + 4|0);
     $expanded35 = $12;
     $expanded34 = (($expanded35) - 1)|0;
     $13 = (($11) + ($expanded34))|0;
     $14 = ((0) + 4|0);
     $expanded39 = $14;
     $expanded38 = (($expanded39) - 1)|0;
     $expanded37 = $expanded38 ^ -1;
     $15 = $13 & $expanded37;
     $16 = $15;
     $17 = HEAP32[$16>>2]|0;
     $arglist_next3 = ((($16)) + 4|0);
     HEAP32[$2>>2] = $arglist_next3;
     $18 = ($17|0)<(0);
     $19 = $18 << 31 >> 31;
     $20 = $0;
     $21 = $20;
     HEAP32[$21>>2] = $17;
     $22 = (($20) + 4)|0;
     $23 = $22;
     HEAP32[$23>>2] = $19;
     break L1;
     break;
    }
    case 11:  {
     $arglist_current5 = HEAP32[$2>>2]|0;
     $24 = $arglist_current5;
     $25 = ((0) + 4|0);
     $expanded42 = $25;
     $expanded41 = (($expanded42) - 1)|0;
     $26 = (($24) + ($expanded41))|0;
     $27 = ((0) + 4|0);
     $expanded46 = $27;
     $expanded45 = (($expanded46) - 1)|0;
     $expanded44 = $expanded45 ^ -1;
     $28 = $26 & $expanded44;
     $29 = $28;
     $30 = HEAP32[$29>>2]|0;
     $arglist_next6 = ((($29)) + 4|0);
     HEAP32[$2>>2] = $arglist_next6;
     $31 = $0;
     $32 = $31;
     HEAP32[$32>>2] = $30;
     $33 = (($31) + 4)|0;
     $34 = $33;
     HEAP32[$34>>2] = 0;
     break L1;
     break;
    }
    case 12:  {
     $arglist_current8 = HEAP32[$2>>2]|0;
     $35 = $arglist_current8;
     $36 = ((0) + 8|0);
     $expanded49 = $36;
     $expanded48 = (($expanded49) - 1)|0;
     $37 = (($35) + ($expanded48))|0;
     $38 = ((0) + 8|0);
     $expanded53 = $38;
     $expanded52 = (($expanded53) - 1)|0;
     $expanded51 = $expanded52 ^ -1;
     $39 = $37 & $expanded51;
     $40 = $39;
     $41 = $40;
     $42 = $41;
     $43 = HEAP32[$42>>2]|0;
     $44 = (($41) + 4)|0;
     $45 = $44;
     $46 = HEAP32[$45>>2]|0;
     $arglist_next9 = ((($40)) + 8|0);
     HEAP32[$2>>2] = $arglist_next9;
     $47 = $0;
     $48 = $47;
     HEAP32[$48>>2] = $43;
     $49 = (($47) + 4)|0;
     $50 = $49;
     HEAP32[$50>>2] = $46;
     break L1;
     break;
    }
    case 13:  {
     $arglist_current11 = HEAP32[$2>>2]|0;
     $51 = $arglist_current11;
     $52 = ((0) + 4|0);
     $expanded56 = $52;
     $expanded55 = (($expanded56) - 1)|0;
     $53 = (($51) + ($expanded55))|0;
     $54 = ((0) + 4|0);
     $expanded60 = $54;
     $expanded59 = (($expanded60) - 1)|0;
     $expanded58 = $expanded59 ^ -1;
     $55 = $53 & $expanded58;
     $56 = $55;
     $57 = HEAP32[$56>>2]|0;
     $arglist_next12 = ((($56)) + 4|0);
     HEAP32[$2>>2] = $arglist_next12;
     $58 = $57&65535;
     $59 = $58 << 16 >> 16;
     $60 = ($59|0)<(0);
     $61 = $60 << 31 >> 31;
     $62 = $0;
     $63 = $62;
     HEAP32[$63>>2] = $59;
     $64 = (($62) + 4)|0;
     $65 = $64;
     HEAP32[$65>>2] = $61;
     break L1;
     break;
    }
    case 14:  {
     $arglist_current14 = HEAP32[$2>>2]|0;
     $66 = $arglist_current14;
     $67 = ((0) + 4|0);
     $expanded63 = $67;
     $expanded62 = (($expanded63) - 1)|0;
     $68 = (($66) + ($expanded62))|0;
     $69 = ((0) + 4|0);
     $expanded67 = $69;
     $expanded66 = (($expanded67) - 1)|0;
     $expanded65 = $expanded66 ^ -1;
     $70 = $68 & $expanded65;
     $71 = $70;
     $72 = HEAP32[$71>>2]|0;
     $arglist_next15 = ((($71)) + 4|0);
     HEAP32[$2>>2] = $arglist_next15;
     $$mask31 = $72 & 65535;
     $73 = $0;
     $74 = $73;
     HEAP32[$74>>2] = $$mask31;
     $75 = (($73) + 4)|0;
     $76 = $75;
     HEAP32[$76>>2] = 0;
     break L1;
     break;
    }
    case 15:  {
     $arglist_current17 = HEAP32[$2>>2]|0;
     $77 = $arglist_current17;
     $78 = ((0) + 4|0);
     $expanded70 = $78;
     $expanded69 = (($expanded70) - 1)|0;
     $79 = (($77) + ($expanded69))|0;
     $80 = ((0) + 4|0);
     $expanded74 = $80;
     $expanded73 = (($expanded74) - 1)|0;
     $expanded72 = $expanded73 ^ -1;
     $81 = $79 & $expanded72;
     $82 = $81;
     $83 = HEAP32[$82>>2]|0;
     $arglist_next18 = ((($82)) + 4|0);
     HEAP32[$2>>2] = $arglist_next18;
     $84 = $83&255;
     $85 = $84 << 24 >> 24;
     $86 = ($85|0)<(0);
     $87 = $86 << 31 >> 31;
     $88 = $0;
     $89 = $88;
     HEAP32[$89>>2] = $85;
     $90 = (($88) + 4)|0;
     $91 = $90;
     HEAP32[$91>>2] = $87;
     break L1;
     break;
    }
    case 16:  {
     $arglist_current20 = HEAP32[$2>>2]|0;
     $92 = $arglist_current20;
     $93 = ((0) + 4|0);
     $expanded77 = $93;
     $expanded76 = (($expanded77) - 1)|0;
     $94 = (($92) + ($expanded76))|0;
     $95 = ((0) + 4|0);
     $expanded81 = $95;
     $expanded80 = (($expanded81) - 1)|0;
     $expanded79 = $expanded80 ^ -1;
     $96 = $94 & $expanded79;
     $97 = $96;
     $98 = HEAP32[$97>>2]|0;
     $arglist_next21 = ((($97)) + 4|0);
     HEAP32[$2>>2] = $arglist_next21;
     $$mask = $98 & 255;
     $99 = $0;
     $100 = $99;
     HEAP32[$100>>2] = $$mask;
     $101 = (($99) + 4)|0;
     $102 = $101;
     HEAP32[$102>>2] = 0;
     break L1;
     break;
    }
    case 17:  {
     $arglist_current23 = HEAP32[$2>>2]|0;
     $103 = $arglist_current23;
     $104 = ((0) + 8|0);
     $expanded84 = $104;
     $expanded83 = (($expanded84) - 1)|0;
     $105 = (($103) + ($expanded83))|0;
     $106 = ((0) + 8|0);
     $expanded88 = $106;
     $expanded87 = (($expanded88) - 1)|0;
     $expanded86 = $expanded87 ^ -1;
     $107 = $105 & $expanded86;
     $108 = $107;
     $109 = +HEAPF64[$108>>3];
     $arglist_next24 = ((($108)) + 8|0);
     HEAP32[$2>>2] = $arglist_next24;
     HEAPF64[$0>>3] = $109;
     break L1;
     break;
    }
    case 18:  {
     $arglist_current26 = HEAP32[$2>>2]|0;
     $110 = $arglist_current26;
     $111 = ((0) + 8|0);
     $expanded91 = $111;
     $expanded90 = (($expanded91) - 1)|0;
     $112 = (($110) + ($expanded90))|0;
     $113 = ((0) + 8|0);
     $expanded95 = $113;
     $expanded94 = (($expanded95) - 1)|0;
     $expanded93 = $expanded94 ^ -1;
     $114 = $112 & $expanded93;
     $115 = $114;
     $116 = +HEAPF64[$115>>3];
     $arglist_next27 = ((($115)) + 8|0);
     HEAP32[$2>>2] = $arglist_next27;
     HEAPF64[$0>>3] = $116;
     break L1;
     break;
    }
    default: {
     break L1;
    }
    }
   } while(0);
  }
 } while(0);
 return;
}
function _fmt_x($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $$05$lcssa = 0, $$056 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $4 = ($0|0)==(0);
 $5 = ($1|0)==(0);
 $6 = $4 & $5;
 if ($6) {
  $$05$lcssa = $2;
 } else {
  $$056 = $2;$15 = $1;$8 = $0;
  while(1) {
   $7 = $8 & 15;
   $9 = (15356 + ($7)|0);
   $10 = HEAP8[$9>>0]|0;
   $11 = $10&255;
   $12 = $11 | $3;
   $13 = $12&255;
   $14 = ((($$056)) + -1|0);
   HEAP8[$14>>0] = $13;
   $16 = (_bitshift64Lshr(($8|0),($15|0),4)|0);
   $17 = tempRet0;
   $18 = ($16|0)==(0);
   $19 = ($17|0)==(0);
   $20 = $18 & $19;
   if ($20) {
    $$05$lcssa = $14;
    break;
   } else {
    $$056 = $14;$15 = $17;$8 = $16;
   }
  }
 }
 return ($$05$lcssa|0);
}
function _fmt_o($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0$lcssa = 0, $$06 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ($0|0)==(0);
 $4 = ($1|0)==(0);
 $5 = $3 & $4;
 if ($5) {
  $$0$lcssa = $2;
 } else {
  $$06 = $2;$11 = $1;$7 = $0;
  while(1) {
   $6 = $7&255;
   $8 = $6 & 7;
   $9 = $8 | 48;
   $10 = ((($$06)) + -1|0);
   HEAP8[$10>>0] = $9;
   $12 = (_bitshift64Lshr(($7|0),($11|0),3)|0);
   $13 = tempRet0;
   $14 = ($12|0)==(0);
   $15 = ($13|0)==(0);
   $16 = $14 & $15;
   if ($16) {
    $$0$lcssa = $10;
    break;
   } else {
    $$06 = $10;$11 = $13;$7 = $12;
   }
  }
 }
 return ($$0$lcssa|0);
}
function _fmt_u($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$010$lcssa$off0 = 0, $$012 = 0, $$09$lcssa = 0, $$0914 = 0, $$1$lcssa = 0, $$111 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ($1>>>0)>(0);
 $4 = ($0>>>0)>(4294967295);
 $5 = ($1|0)==(0);
 $6 = $5 & $4;
 $7 = $3 | $6;
 if ($7) {
  $$0914 = $2;$8 = $0;$9 = $1;
  while(1) {
   $10 = (___uremdi3(($8|0),($9|0),10,0)|0);
   $11 = tempRet0;
   $12 = $10&255;
   $13 = $12 | 48;
   $14 = ((($$0914)) + -1|0);
   HEAP8[$14>>0] = $13;
   $15 = (___udivdi3(($8|0),($9|0),10,0)|0);
   $16 = tempRet0;
   $17 = ($9>>>0)>(9);
   $18 = ($8>>>0)>(4294967295);
   $19 = ($9|0)==(9);
   $20 = $19 & $18;
   $21 = $17 | $20;
   if ($21) {
    $$0914 = $14;$8 = $15;$9 = $16;
   } else {
    break;
   }
  }
  $$010$lcssa$off0 = $15;$$09$lcssa = $14;
 } else {
  $$010$lcssa$off0 = $0;$$09$lcssa = $2;
 }
 $22 = ($$010$lcssa$off0|0)==(0);
 if ($22) {
  $$1$lcssa = $$09$lcssa;
 } else {
  $$012 = $$010$lcssa$off0;$$111 = $$09$lcssa;
  while(1) {
   $23 = (($$012>>>0) % 10)&-1;
   $24 = $23 | 48;
   $25 = $24&255;
   $26 = ((($$111)) + -1|0);
   HEAP8[$26>>0] = $25;
   $27 = (($$012>>>0) / 10)&-1;
   $28 = ($$012>>>0)<(10);
   if ($28) {
    $$1$lcssa = $26;
    break;
   } else {
    $$012 = $27;$$111 = $26;
   }
  }
 }
 return ($$1$lcssa|0);
}
function _strerror($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = (___pthread_self_85()|0);
 $2 = ((($1)) + 188|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = (___strerror_l($0,$3)|0);
 return ($4|0);
}
function _pad_674($0,$1,$2,$3,$4) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 $4 = $4|0;
 var $$0$lcssa = 0, $$011 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 256|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(256|0);
 $5 = sp;
 $6 = $4 & 73728;
 $7 = ($6|0)==(0);
 $8 = ($2|0)>($3|0);
 $or$cond = $8 & $7;
 if ($or$cond) {
  $9 = (($2) - ($3))|0;
  $10 = ($9>>>0)<(256);
  $11 = $10 ? $9 : 256;
  _memset(($5|0),($1|0),($11|0))|0;
  $12 = ($9>>>0)>(255);
  if ($12) {
   $13 = (($2) - ($3))|0;
   $$011 = $9;
   while(1) {
    _out_668($0,$5,256);
    $14 = (($$011) + -256)|0;
    $15 = ($14>>>0)>(255);
    if ($15) {
     $$011 = $14;
    } else {
     break;
    }
   }
   $16 = $13 & 255;
   $$0$lcssa = $16;
  } else {
   $$0$lcssa = $9;
  }
  _out_668($0,$5,$$0$lcssa);
 }
 STACKTOP = sp;return;
}
function _wctomb($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$0 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = ($0|0)==(0|0);
 if ($2) {
  $$0 = 0;
 } else {
  $3 = (_wcrtomb($0,$1,0)|0);
  $$0 = $3;
 }
 return ($$0|0);
}
function _fmt_fp($0,$1,$2,$3,$4,$5) {
 $0 = $0|0;
 $1 = +$1;
 $2 = $2|0;
 $3 = $3|0;
 $4 = $4|0;
 $5 = $5|0;
 var $$ = 0, $$$ = 0, $$$$559 = 0.0, $$$3484 = 0, $$$3484691 = 0, $$$3484692 = 0, $$$3501 = 0, $$$4502 = 0, $$$542 = 0.0, $$$559 = 0.0, $$0 = 0, $$0463$lcssa = 0, $$0463584 = 0, $$0464594 = 0, $$0471 = 0.0, $$0479 = 0, $$0487642 = 0, $$0488 = 0, $$0488653 = 0, $$0488655 = 0;
 var $$0496$$9 = 0, $$0497654 = 0, $$0498 = 0, $$0509582 = 0.0, $$0510 = 0, $$0511 = 0, $$0514637 = 0, $$0520 = 0, $$0521 = 0, $$0521$ = 0, $$0523 = 0, $$0525 = 0, $$0527 = 0, $$0527629 = 0, $$0527631 = 0, $$0530636 = 0, $$1465 = 0, $$1467 = 0.0, $$1469 = 0.0, $$1472 = 0.0;
 var $$1480 = 0, $$1482$lcssa = 0, $$1482661 = 0, $$1489641 = 0, $$1499$lcssa = 0, $$1499660 = 0, $$1508583 = 0, $$1512$lcssa = 0, $$1512607 = 0, $$1515 = 0, $$1524 = 0, $$1526 = 0, $$1528614 = 0, $$1531$lcssa = 0, $$1531630 = 0, $$1598 = 0, $$2 = 0, $$2473 = 0.0, $$2476 = 0, $$2476$$547 = 0;
 var $$2476$$549 = 0, $$2483$ph = 0, $$2500 = 0, $$2513 = 0, $$2516618 = 0, $$2529 = 0, $$2532617 = 0, $$3 = 0.0, $$3477 = 0, $$3484$lcssa = 0, $$3484648 = 0, $$3501$lcssa = 0, $$3501647 = 0, $$3533613 = 0, $$4 = 0.0, $$4478$lcssa = 0, $$4478590 = 0, $$4492 = 0, $$4502 = 0, $$4518 = 0;
 var $$5$lcssa = 0, $$534$ = 0, $$539 = 0, $$539$ = 0, $$542 = 0.0, $$546 = 0, $$548 = 0, $$5486$lcssa = 0, $$5486623 = 0, $$5493597 = 0, $$5519$ph = 0, $$555 = 0, $$556 = 0, $$559 = 0.0, $$5602 = 0, $$6 = 0, $$6494589 = 0, $$7495601 = 0, $$7505 = 0, $$7505$ = 0;
 var $$7505$ph = 0, $$8 = 0, $$9$ph = 0, $$lcssa673 = 0, $$neg = 0, $$neg567 = 0, $$pn = 0, $$pn566 = 0, $$pr = 0, $$pr564 = 0, $$pre = 0, $$pre$phi690Z2D = 0, $$pre689 = 0, $$sink545$lcssa = 0, $$sink545622 = 0, $$sink562 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0;
 var $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0.0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0.0, $117 = 0.0, $118 = 0.0, $119 = 0, $12 = 0, $120 = 0;
 var $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0;
 var $14 = 0.0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0;
 var $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0;
 var $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0;
 var $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0;
 var $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0.0, $229 = 0.0, $23 = 0;
 var $230 = 0, $231 = 0.0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0;
 var $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0;
 var $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0;
 var $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
 var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
 var $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0;
 var $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0.0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0;
 var $358 = 0, $359 = 0, $36 = 0.0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0;
 var $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $39 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $50 = 0, $51 = 0.0, $52 = 0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0, $62 = 0, $63 = 0;
 var $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0;
 var $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0.0, $88 = 0.0, $89 = 0.0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $exitcond = 0;
 var $narrow = 0, $not$ = 0, $notlhs = 0, $notrhs = 0, $or$cond = 0, $or$cond3$not = 0, $or$cond537 = 0, $or$cond541 = 0, $or$cond544 = 0, $or$cond554 = 0, $or$cond6 = 0, $scevgep684 = 0, $scevgep684685 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 560|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(560|0);
 $6 = sp + 8|0;
 $7 = sp;
 $8 = sp + 524|0;
 $9 = $8;
 $10 = sp + 512|0;
 HEAP32[$7>>2] = 0;
 $11 = ((($10)) + 12|0);
 (___DOUBLE_BITS_675($1)|0);
 $12 = tempRet0;
 $13 = ($12|0)<(0);
 if ($13) {
  $14 = -$1;
  $$0471 = $14;$$0520 = 1;$$0521 = 15321;
 } else {
  $15 = $4 & 2048;
  $16 = ($15|0)==(0);
  $17 = $4 & 1;
  $18 = ($17|0)==(0);
  $$ = $18 ? (15322) : (15327);
  $$$ = $16 ? $$ : (15324);
  $19 = $4 & 2049;
  $narrow = ($19|0)!=(0);
  $$534$ = $narrow&1;
  $$0471 = $1;$$0520 = $$534$;$$0521 = $$$;
 }
 (___DOUBLE_BITS_675($$0471)|0);
 $20 = tempRet0;
 $21 = $20 & 2146435072;
 $22 = ($21>>>0)<(2146435072);
 $23 = (0)<(0);
 $24 = ($21|0)==(2146435072);
 $25 = $24 & $23;
 $26 = $22 | $25;
 do {
  if ($26) {
   $35 = (+_frexpl($$0471,$7));
   $36 = $35 * 2.0;
   $37 = $36 != 0.0;
   if ($37) {
    $38 = HEAP32[$7>>2]|0;
    $39 = (($38) + -1)|0;
    HEAP32[$7>>2] = $39;
   }
   $40 = $5 | 32;
   $41 = ($40|0)==(97);
   if ($41) {
    $42 = $5 & 32;
    $43 = ($42|0)==(0);
    $44 = ((($$0521)) + 9|0);
    $$0521$ = $43 ? $$0521 : $44;
    $45 = $$0520 | 2;
    $46 = ($3>>>0)>(11);
    $47 = (12 - ($3))|0;
    $48 = ($47|0)==(0);
    $49 = $46 | $48;
    do {
     if ($49) {
      $$1472 = $36;
     } else {
      $$0509582 = 8.0;$$1508583 = $47;
      while(1) {
       $50 = (($$1508583) + -1)|0;
       $51 = $$0509582 * 16.0;
       $52 = ($50|0)==(0);
       if ($52) {
        break;
       } else {
        $$0509582 = $51;$$1508583 = $50;
       }
      }
      $53 = HEAP8[$$0521$>>0]|0;
      $54 = ($53<<24>>24)==(45);
      if ($54) {
       $55 = -$36;
       $56 = $55 - $51;
       $57 = $51 + $56;
       $58 = -$57;
       $$1472 = $58;
       break;
      } else {
       $59 = $36 + $51;
       $60 = $59 - $51;
       $$1472 = $60;
       break;
      }
     }
    } while(0);
    $61 = HEAP32[$7>>2]|0;
    $62 = ($61|0)<(0);
    $63 = (0 - ($61))|0;
    $64 = $62 ? $63 : $61;
    $65 = ($64|0)<(0);
    $66 = $65 << 31 >> 31;
    $67 = (_fmt_u($64,$66,$11)|0);
    $68 = ($67|0)==($11|0);
    if ($68) {
     $69 = ((($10)) + 11|0);
     HEAP8[$69>>0] = 48;
     $$0511 = $69;
    } else {
     $$0511 = $67;
    }
    $70 = $61 >> 31;
    $71 = $70 & 2;
    $72 = (($71) + 43)|0;
    $73 = $72&255;
    $74 = ((($$0511)) + -1|0);
    HEAP8[$74>>0] = $73;
    $75 = (($5) + 15)|0;
    $76 = $75&255;
    $77 = ((($$0511)) + -2|0);
    HEAP8[$77>>0] = $76;
    $notrhs = ($3|0)<(1);
    $78 = $4 & 8;
    $79 = ($78|0)==(0);
    $$0523 = $8;$$2473 = $$1472;
    while(1) {
     $80 = (~~(($$2473)));
     $81 = (15356 + ($80)|0);
     $82 = HEAP8[$81>>0]|0;
     $83 = $82&255;
     $84 = $83 | $42;
     $85 = $84&255;
     $86 = ((($$0523)) + 1|0);
     HEAP8[$$0523>>0] = $85;
     $87 = (+($80|0));
     $88 = $$2473 - $87;
     $89 = $88 * 16.0;
     $90 = $86;
     $91 = (($90) - ($9))|0;
     $92 = ($91|0)==(1);
     if ($92) {
      $notlhs = $89 == 0.0;
      $or$cond3$not = $notrhs & $notlhs;
      $or$cond = $79 & $or$cond3$not;
      if ($or$cond) {
       $$1524 = $86;
      } else {
       $93 = ((($$0523)) + 2|0);
       HEAP8[$86>>0] = 46;
       $$1524 = $93;
      }
     } else {
      $$1524 = $86;
     }
     $94 = $89 != 0.0;
     if ($94) {
      $$0523 = $$1524;$$2473 = $89;
     } else {
      break;
     }
    }
    $95 = ($3|0)!=(0);
    $96 = $77;
    $97 = $11;
    $98 = $$1524;
    $99 = (($98) - ($9))|0;
    $100 = (($97) - ($96))|0;
    $101 = (($99) + -2)|0;
    $102 = ($101|0)<($3|0);
    $or$cond537 = $95 & $102;
    $103 = (($3) + 2)|0;
    $$pn = $or$cond537 ? $103 : $99;
    $$0525 = (($100) + ($45))|0;
    $104 = (($$0525) + ($$pn))|0;
    _pad_674($0,32,$2,$104,$4);
    _out_668($0,$$0521$,$45);
    $105 = $4 ^ 65536;
    _pad_674($0,48,$2,$104,$105);
    _out_668($0,$8,$99);
    $106 = (($$pn) - ($99))|0;
    _pad_674($0,48,$106,0,0);
    _out_668($0,$77,$100);
    $107 = $4 ^ 8192;
    _pad_674($0,32,$2,$104,$107);
    $$sink562 = $104;
    break;
   }
   $108 = ($3|0)<(0);
   $$539 = $108 ? 6 : $3;
   if ($37) {
    $109 = $36 * 268435456.0;
    $110 = HEAP32[$7>>2]|0;
    $111 = (($110) + -28)|0;
    HEAP32[$7>>2] = $111;
    $$3 = $109;$$pr = $111;
   } else {
    $$pre = HEAP32[$7>>2]|0;
    $$3 = $36;$$pr = $$pre;
   }
   $112 = ($$pr|0)<(0);
   $113 = ((($6)) + 288|0);
   $$556 = $112 ? $6 : $113;
   $$0498 = $$556;$$4 = $$3;
   while(1) {
    $114 = (~~(($$4))>>>0);
    HEAP32[$$0498>>2] = $114;
    $115 = ((($$0498)) + 4|0);
    $116 = (+($114>>>0));
    $117 = $$4 - $116;
    $118 = $117 * 1.0E+9;
    $119 = $118 != 0.0;
    if ($119) {
     $$0498 = $115;$$4 = $118;
    } else {
     break;
    }
   }
   $120 = ($$pr|0)>(0);
   if ($120) {
    $$1482661 = $$556;$$1499660 = $115;$122 = $$pr;
    while(1) {
     $121 = ($122|0)<(29);
     $123 = $121 ? $122 : 29;
     $$0488653 = ((($$1499660)) + -4|0);
     $124 = ($$0488653>>>0)<($$1482661>>>0);
     if ($124) {
      $$2483$ph = $$1482661;
     } else {
      $$0488655 = $$0488653;$$0497654 = 0;
      while(1) {
       $125 = HEAP32[$$0488655>>2]|0;
       $126 = (_bitshift64Shl(($125|0),0,($123|0))|0);
       $127 = tempRet0;
       $128 = (_i64Add(($126|0),($127|0),($$0497654|0),0)|0);
       $129 = tempRet0;
       $130 = (___uremdi3(($128|0),($129|0),1000000000,0)|0);
       $131 = tempRet0;
       HEAP32[$$0488655>>2] = $130;
       $132 = (___udivdi3(($128|0),($129|0),1000000000,0)|0);
       $133 = tempRet0;
       $$0488 = ((($$0488655)) + -4|0);
       $134 = ($$0488>>>0)<($$1482661>>>0);
       if ($134) {
        break;
       } else {
        $$0488655 = $$0488;$$0497654 = $132;
       }
      }
      $135 = ($132|0)==(0);
      if ($135) {
       $$2483$ph = $$1482661;
      } else {
       $136 = ((($$1482661)) + -4|0);
       HEAP32[$136>>2] = $132;
       $$2483$ph = $136;
      }
     }
     $$2500 = $$1499660;
     while(1) {
      $137 = ($$2500>>>0)>($$2483$ph>>>0);
      if (!($137)) {
       break;
      }
      $138 = ((($$2500)) + -4|0);
      $139 = HEAP32[$138>>2]|0;
      $140 = ($139|0)==(0);
      if ($140) {
       $$2500 = $138;
      } else {
       break;
      }
     }
     $141 = HEAP32[$7>>2]|0;
     $142 = (($141) - ($123))|0;
     HEAP32[$7>>2] = $142;
     $143 = ($142|0)>(0);
     if ($143) {
      $$1482661 = $$2483$ph;$$1499660 = $$2500;$122 = $142;
     } else {
      $$1482$lcssa = $$2483$ph;$$1499$lcssa = $$2500;$$pr564 = $142;
      break;
     }
    }
   } else {
    $$1482$lcssa = $$556;$$1499$lcssa = $115;$$pr564 = $$pr;
   }
   $144 = ($$pr564|0)<(0);
   if ($144) {
    $145 = (($$539) + 25)|0;
    $146 = (($145|0) / 9)&-1;
    $147 = (($146) + 1)|0;
    $148 = ($40|0)==(102);
    $$3484648 = $$1482$lcssa;$$3501647 = $$1499$lcssa;$150 = $$pr564;
    while(1) {
     $149 = (0 - ($150))|0;
     $151 = ($149|0)<(9);
     $152 = $151 ? $149 : 9;
     $153 = ($$3484648>>>0)<($$3501647>>>0);
     if ($153) {
      $157 = 1 << $152;
      $158 = (($157) + -1)|0;
      $159 = 1000000000 >>> $152;
      $$0487642 = 0;$$1489641 = $$3484648;
      while(1) {
       $160 = HEAP32[$$1489641>>2]|0;
       $161 = $160 & $158;
       $162 = $160 >>> $152;
       $163 = (($162) + ($$0487642))|0;
       HEAP32[$$1489641>>2] = $163;
       $164 = Math_imul($161, $159)|0;
       $165 = ((($$1489641)) + 4|0);
       $166 = ($165>>>0)<($$3501647>>>0);
       if ($166) {
        $$0487642 = $164;$$1489641 = $165;
       } else {
        break;
       }
      }
      $167 = HEAP32[$$3484648>>2]|0;
      $168 = ($167|0)==(0);
      $169 = ((($$3484648)) + 4|0);
      $$$3484 = $168 ? $169 : $$3484648;
      $170 = ($164|0)==(0);
      if ($170) {
       $$$3484692 = $$$3484;$$4502 = $$3501647;
      } else {
       $171 = ((($$3501647)) + 4|0);
       HEAP32[$$3501647>>2] = $164;
       $$$3484692 = $$$3484;$$4502 = $171;
      }
     } else {
      $154 = HEAP32[$$3484648>>2]|0;
      $155 = ($154|0)==(0);
      $156 = ((($$3484648)) + 4|0);
      $$$3484691 = $155 ? $156 : $$3484648;
      $$$3484692 = $$$3484691;$$4502 = $$3501647;
     }
     $172 = $148 ? $$556 : $$$3484692;
     $173 = $$4502;
     $174 = $172;
     $175 = (($173) - ($174))|0;
     $176 = $175 >> 2;
     $177 = ($176|0)>($147|0);
     $178 = (($172) + ($147<<2)|0);
     $$$4502 = $177 ? $178 : $$4502;
     $179 = HEAP32[$7>>2]|0;
     $180 = (($179) + ($152))|0;
     HEAP32[$7>>2] = $180;
     $181 = ($180|0)<(0);
     if ($181) {
      $$3484648 = $$$3484692;$$3501647 = $$$4502;$150 = $180;
     } else {
      $$3484$lcssa = $$$3484692;$$3501$lcssa = $$$4502;
      break;
     }
    }
   } else {
    $$3484$lcssa = $$1482$lcssa;$$3501$lcssa = $$1499$lcssa;
   }
   $182 = ($$3484$lcssa>>>0)<($$3501$lcssa>>>0);
   $183 = $$556;
   if ($182) {
    $184 = $$3484$lcssa;
    $185 = (($183) - ($184))|0;
    $186 = $185 >> 2;
    $187 = ($186*9)|0;
    $188 = HEAP32[$$3484$lcssa>>2]|0;
    $189 = ($188>>>0)<(10);
    if ($189) {
     $$1515 = $187;
    } else {
     $$0514637 = $187;$$0530636 = 10;
     while(1) {
      $190 = ($$0530636*10)|0;
      $191 = (($$0514637) + 1)|0;
      $192 = ($188>>>0)<($190>>>0);
      if ($192) {
       $$1515 = $191;
       break;
      } else {
       $$0514637 = $191;$$0530636 = $190;
      }
     }
    }
   } else {
    $$1515 = 0;
   }
   $193 = ($40|0)!=(102);
   $194 = $193 ? $$1515 : 0;
   $195 = (($$539) - ($194))|0;
   $196 = ($40|0)==(103);
   $197 = ($$539|0)!=(0);
   $198 = $197 & $196;
   $$neg = $198 << 31 >> 31;
   $199 = (($195) + ($$neg))|0;
   $200 = $$3501$lcssa;
   $201 = (($200) - ($183))|0;
   $202 = $201 >> 2;
   $203 = ($202*9)|0;
   $204 = (($203) + -9)|0;
   $205 = ($199|0)<($204|0);
   if ($205) {
    $206 = ((($$556)) + 4|0);
    $207 = (($199) + 9216)|0;
    $208 = (($207|0) / 9)&-1;
    $209 = (($208) + -1024)|0;
    $210 = (($206) + ($209<<2)|0);
    $211 = (($207|0) % 9)&-1;
    $$0527629 = (($211) + 1)|0;
    $212 = ($$0527629|0)<(9);
    if ($212) {
     $$0527631 = $$0527629;$$1531630 = 10;
     while(1) {
      $213 = ($$1531630*10)|0;
      $$0527 = (($$0527631) + 1)|0;
      $exitcond = ($$0527|0)==(9);
      if ($exitcond) {
       $$1531$lcssa = $213;
       break;
      } else {
       $$0527631 = $$0527;$$1531630 = $213;
      }
     }
    } else {
     $$1531$lcssa = 10;
    }
    $214 = HEAP32[$210>>2]|0;
    $215 = (($214>>>0) % ($$1531$lcssa>>>0))&-1;
    $216 = ($215|0)==(0);
    $217 = ((($210)) + 4|0);
    $218 = ($217|0)==($$3501$lcssa|0);
    $or$cond541 = $218 & $216;
    if ($or$cond541) {
     $$4492 = $210;$$4518 = $$1515;$$8 = $$3484$lcssa;
    } else {
     $219 = (($214>>>0) / ($$1531$lcssa>>>0))&-1;
     $220 = $219 & 1;
     $221 = ($220|0)==(0);
     $$542 = $221 ? 9007199254740992.0 : 9007199254740994.0;
     $222 = (($$1531$lcssa|0) / 2)&-1;
     $223 = ($215>>>0)<($222>>>0);
     $224 = ($215|0)==($222|0);
     $or$cond544 = $218 & $224;
     $$559 = $or$cond544 ? 1.0 : 1.5;
     $$$559 = $223 ? 0.5 : $$559;
     $225 = ($$0520|0)==(0);
     if ($225) {
      $$1467 = $$$559;$$1469 = $$542;
     } else {
      $226 = HEAP8[$$0521>>0]|0;
      $227 = ($226<<24>>24)==(45);
      $228 = -$$542;
      $229 = -$$$559;
      $$$542 = $227 ? $228 : $$542;
      $$$$559 = $227 ? $229 : $$$559;
      $$1467 = $$$$559;$$1469 = $$$542;
     }
     $230 = (($214) - ($215))|0;
     HEAP32[$210>>2] = $230;
     $231 = $$1469 + $$1467;
     $232 = $231 != $$1469;
     if ($232) {
      $233 = (($230) + ($$1531$lcssa))|0;
      HEAP32[$210>>2] = $233;
      $234 = ($233>>>0)>(999999999);
      if ($234) {
       $$5486623 = $$3484$lcssa;$$sink545622 = $210;
       while(1) {
        $235 = ((($$sink545622)) + -4|0);
        HEAP32[$$sink545622>>2] = 0;
        $236 = ($235>>>0)<($$5486623>>>0);
        if ($236) {
         $237 = ((($$5486623)) + -4|0);
         HEAP32[$237>>2] = 0;
         $$6 = $237;
        } else {
         $$6 = $$5486623;
        }
        $238 = HEAP32[$235>>2]|0;
        $239 = (($238) + 1)|0;
        HEAP32[$235>>2] = $239;
        $240 = ($239>>>0)>(999999999);
        if ($240) {
         $$5486623 = $$6;$$sink545622 = $235;
        } else {
         $$5486$lcssa = $$6;$$sink545$lcssa = $235;
         break;
        }
       }
      } else {
       $$5486$lcssa = $$3484$lcssa;$$sink545$lcssa = $210;
      }
      $241 = $$5486$lcssa;
      $242 = (($183) - ($241))|0;
      $243 = $242 >> 2;
      $244 = ($243*9)|0;
      $245 = HEAP32[$$5486$lcssa>>2]|0;
      $246 = ($245>>>0)<(10);
      if ($246) {
       $$4492 = $$sink545$lcssa;$$4518 = $244;$$8 = $$5486$lcssa;
      } else {
       $$2516618 = $244;$$2532617 = 10;
       while(1) {
        $247 = ($$2532617*10)|0;
        $248 = (($$2516618) + 1)|0;
        $249 = ($245>>>0)<($247>>>0);
        if ($249) {
         $$4492 = $$sink545$lcssa;$$4518 = $248;$$8 = $$5486$lcssa;
         break;
        } else {
         $$2516618 = $248;$$2532617 = $247;
        }
       }
      }
     } else {
      $$4492 = $210;$$4518 = $$1515;$$8 = $$3484$lcssa;
     }
    }
    $250 = ((($$4492)) + 4|0);
    $251 = ($$3501$lcssa>>>0)>($250>>>0);
    $$$3501 = $251 ? $250 : $$3501$lcssa;
    $$5519$ph = $$4518;$$7505$ph = $$$3501;$$9$ph = $$8;
   } else {
    $$5519$ph = $$1515;$$7505$ph = $$3501$lcssa;$$9$ph = $$3484$lcssa;
   }
   $$7505 = $$7505$ph;
   while(1) {
    $252 = ($$7505>>>0)>($$9$ph>>>0);
    if (!($252)) {
     $$lcssa673 = 0;
     break;
    }
    $253 = ((($$7505)) + -4|0);
    $254 = HEAP32[$253>>2]|0;
    $255 = ($254|0)==(0);
    if ($255) {
     $$7505 = $253;
    } else {
     $$lcssa673 = 1;
     break;
    }
   }
   $256 = (0 - ($$5519$ph))|0;
   do {
    if ($196) {
     $not$ = $197 ^ 1;
     $257 = $not$&1;
     $$539$ = (($257) + ($$539))|0;
     $258 = ($$539$|0)>($$5519$ph|0);
     $259 = ($$5519$ph|0)>(-5);
     $or$cond6 = $258 & $259;
     if ($or$cond6) {
      $260 = (($5) + -1)|0;
      $$neg567 = (($$539$) + -1)|0;
      $261 = (($$neg567) - ($$5519$ph))|0;
      $$0479 = $260;$$2476 = $261;
     } else {
      $262 = (($5) + -2)|0;
      $263 = (($$539$) + -1)|0;
      $$0479 = $262;$$2476 = $263;
     }
     $264 = $4 & 8;
     $265 = ($264|0)==(0);
     if ($265) {
      if ($$lcssa673) {
       $266 = ((($$7505)) + -4|0);
       $267 = HEAP32[$266>>2]|0;
       $268 = ($267|0)==(0);
       if ($268) {
        $$2529 = 9;
       } else {
        $269 = (($267>>>0) % 10)&-1;
        $270 = ($269|0)==(0);
        if ($270) {
         $$1528614 = 0;$$3533613 = 10;
         while(1) {
          $271 = ($$3533613*10)|0;
          $272 = (($$1528614) + 1)|0;
          $273 = (($267>>>0) % ($271>>>0))&-1;
          $274 = ($273|0)==(0);
          if ($274) {
           $$1528614 = $272;$$3533613 = $271;
          } else {
           $$2529 = $272;
           break;
          }
         }
        } else {
         $$2529 = 0;
        }
       }
      } else {
       $$2529 = 9;
      }
      $275 = $$0479 | 32;
      $276 = ($275|0)==(102);
      $277 = $$7505;
      $278 = (($277) - ($183))|0;
      $279 = $278 >> 2;
      $280 = ($279*9)|0;
      $281 = (($280) + -9)|0;
      if ($276) {
       $282 = (($281) - ($$2529))|0;
       $283 = ($282|0)>(0);
       $$546 = $283 ? $282 : 0;
       $284 = ($$2476|0)<($$546|0);
       $$2476$$547 = $284 ? $$2476 : $$546;
       $$1480 = $$0479;$$3477 = $$2476$$547;$$pre$phi690Z2D = 0;
       break;
      } else {
       $285 = (($281) + ($$5519$ph))|0;
       $286 = (($285) - ($$2529))|0;
       $287 = ($286|0)>(0);
       $$548 = $287 ? $286 : 0;
       $288 = ($$2476|0)<($$548|0);
       $$2476$$549 = $288 ? $$2476 : $$548;
       $$1480 = $$0479;$$3477 = $$2476$$549;$$pre$phi690Z2D = 0;
       break;
      }
     } else {
      $$1480 = $$0479;$$3477 = $$2476;$$pre$phi690Z2D = $264;
     }
    } else {
     $$pre689 = $4 & 8;
     $$1480 = $5;$$3477 = $$539;$$pre$phi690Z2D = $$pre689;
    }
   } while(0);
   $289 = $$3477 | $$pre$phi690Z2D;
   $290 = ($289|0)!=(0);
   $291 = $290&1;
   $292 = $$1480 | 32;
   $293 = ($292|0)==(102);
   if ($293) {
    $294 = ($$5519$ph|0)>(0);
    $295 = $294 ? $$5519$ph : 0;
    $$2513 = 0;$$pn566 = $295;
   } else {
    $296 = ($$5519$ph|0)<(0);
    $297 = $296 ? $256 : $$5519$ph;
    $298 = ($297|0)<(0);
    $299 = $298 << 31 >> 31;
    $300 = (_fmt_u($297,$299,$11)|0);
    $301 = $11;
    $302 = $300;
    $303 = (($301) - ($302))|0;
    $304 = ($303|0)<(2);
    if ($304) {
     $$1512607 = $300;
     while(1) {
      $305 = ((($$1512607)) + -1|0);
      HEAP8[$305>>0] = 48;
      $306 = $305;
      $307 = (($301) - ($306))|0;
      $308 = ($307|0)<(2);
      if ($308) {
       $$1512607 = $305;
      } else {
       $$1512$lcssa = $305;
       break;
      }
     }
    } else {
     $$1512$lcssa = $300;
    }
    $309 = $$5519$ph >> 31;
    $310 = $309 & 2;
    $311 = (($310) + 43)|0;
    $312 = $311&255;
    $313 = ((($$1512$lcssa)) + -1|0);
    HEAP8[$313>>0] = $312;
    $314 = $$1480&255;
    $315 = ((($$1512$lcssa)) + -2|0);
    HEAP8[$315>>0] = $314;
    $316 = $315;
    $317 = (($301) - ($316))|0;
    $$2513 = $315;$$pn566 = $317;
   }
   $318 = (($$0520) + 1)|0;
   $319 = (($318) + ($$3477))|0;
   $$1526 = (($319) + ($291))|0;
   $320 = (($$1526) + ($$pn566))|0;
   _pad_674($0,32,$2,$320,$4);
   _out_668($0,$$0521,$$0520);
   $321 = $4 ^ 65536;
   _pad_674($0,48,$2,$320,$321);
   if ($293) {
    $322 = ($$9$ph>>>0)>($$556>>>0);
    $$0496$$9 = $322 ? $$556 : $$9$ph;
    $323 = ((($8)) + 9|0);
    $324 = $323;
    $325 = ((($8)) + 8|0);
    $$5493597 = $$0496$$9;
    while(1) {
     $326 = HEAP32[$$5493597>>2]|0;
     $327 = (_fmt_u($326,0,$323)|0);
     $328 = ($$5493597|0)==($$0496$$9|0);
     if ($328) {
      $334 = ($327|0)==($323|0);
      if ($334) {
       HEAP8[$325>>0] = 48;
       $$1465 = $325;
      } else {
       $$1465 = $327;
      }
     } else {
      $329 = ($327>>>0)>($8>>>0);
      if ($329) {
       $330 = $327;
       $331 = (($330) - ($9))|0;
       _memset(($8|0),48,($331|0))|0;
       $$0464594 = $327;
       while(1) {
        $332 = ((($$0464594)) + -1|0);
        $333 = ($332>>>0)>($8>>>0);
        if ($333) {
         $$0464594 = $332;
        } else {
         $$1465 = $332;
         break;
        }
       }
      } else {
       $$1465 = $327;
      }
     }
     $335 = $$1465;
     $336 = (($324) - ($335))|0;
     _out_668($0,$$1465,$336);
     $337 = ((($$5493597)) + 4|0);
     $338 = ($337>>>0)>($$556>>>0);
     if ($338) {
      break;
     } else {
      $$5493597 = $337;
     }
    }
    $339 = ($289|0)==(0);
    if (!($339)) {
     _out_668($0,15372,1);
    }
    $340 = ($337>>>0)<($$7505>>>0);
    $341 = ($$3477|0)>(0);
    $342 = $340 & $341;
    if ($342) {
     $$4478590 = $$3477;$$6494589 = $337;
     while(1) {
      $343 = HEAP32[$$6494589>>2]|0;
      $344 = (_fmt_u($343,0,$323)|0);
      $345 = ($344>>>0)>($8>>>0);
      if ($345) {
       $346 = $344;
       $347 = (($346) - ($9))|0;
       _memset(($8|0),48,($347|0))|0;
       $$0463584 = $344;
       while(1) {
        $348 = ((($$0463584)) + -1|0);
        $349 = ($348>>>0)>($8>>>0);
        if ($349) {
         $$0463584 = $348;
        } else {
         $$0463$lcssa = $348;
         break;
        }
       }
      } else {
       $$0463$lcssa = $344;
      }
      $350 = ($$4478590|0)<(9);
      $351 = $350 ? $$4478590 : 9;
      _out_668($0,$$0463$lcssa,$351);
      $352 = ((($$6494589)) + 4|0);
      $353 = (($$4478590) + -9)|0;
      $354 = ($352>>>0)<($$7505>>>0);
      $355 = ($$4478590|0)>(9);
      $356 = $354 & $355;
      if ($356) {
       $$4478590 = $353;$$6494589 = $352;
      } else {
       $$4478$lcssa = $353;
       break;
      }
     }
    } else {
     $$4478$lcssa = $$3477;
    }
    $357 = (($$4478$lcssa) + 9)|0;
    _pad_674($0,48,$357,9,0);
   } else {
    $358 = ((($$9$ph)) + 4|0);
    $$7505$ = $$lcssa673 ? $$7505 : $358;
    $359 = ($$3477|0)>(-1);
    if ($359) {
     $360 = ((($8)) + 9|0);
     $361 = ($$pre$phi690Z2D|0)==(0);
     $362 = $360;
     $363 = (0 - ($9))|0;
     $364 = ((($8)) + 8|0);
     $$5602 = $$3477;$$7495601 = $$9$ph;
     while(1) {
      $365 = HEAP32[$$7495601>>2]|0;
      $366 = (_fmt_u($365,0,$360)|0);
      $367 = ($366|0)==($360|0);
      if ($367) {
       HEAP8[$364>>0] = 48;
       $$0 = $364;
      } else {
       $$0 = $366;
      }
      $368 = ($$7495601|0)==($$9$ph|0);
      do {
       if ($368) {
        $372 = ((($$0)) + 1|0);
        _out_668($0,$$0,1);
        $373 = ($$5602|0)<(1);
        $or$cond554 = $361 & $373;
        if ($or$cond554) {
         $$2 = $372;
         break;
        }
        _out_668($0,15372,1);
        $$2 = $372;
       } else {
        $369 = ($$0>>>0)>($8>>>0);
        if (!($369)) {
         $$2 = $$0;
         break;
        }
        $scevgep684 = (($$0) + ($363)|0);
        $scevgep684685 = $scevgep684;
        _memset(($8|0),48,($scevgep684685|0))|0;
        $$1598 = $$0;
        while(1) {
         $370 = ((($$1598)) + -1|0);
         $371 = ($370>>>0)>($8>>>0);
         if ($371) {
          $$1598 = $370;
         } else {
          $$2 = $370;
          break;
         }
        }
       }
      } while(0);
      $374 = $$2;
      $375 = (($362) - ($374))|0;
      $376 = ($$5602|0)>($375|0);
      $377 = $376 ? $375 : $$5602;
      _out_668($0,$$2,$377);
      $378 = (($$5602) - ($375))|0;
      $379 = ((($$7495601)) + 4|0);
      $380 = ($379>>>0)<($$7505$>>>0);
      $381 = ($378|0)>(-1);
      $382 = $380 & $381;
      if ($382) {
       $$5602 = $378;$$7495601 = $379;
      } else {
       $$5$lcssa = $378;
       break;
      }
     }
    } else {
     $$5$lcssa = $$3477;
    }
    $383 = (($$5$lcssa) + 18)|0;
    _pad_674($0,48,$383,18,0);
    $384 = $11;
    $385 = $$2513;
    $386 = (($384) - ($385))|0;
    _out_668($0,$$2513,$386);
   }
   $387 = $4 ^ 8192;
   _pad_674($0,32,$2,$320,$387);
   $$sink562 = $320;
  } else {
   $27 = $5 & 32;
   $28 = ($27|0)!=(0);
   $29 = $28 ? 15340 : 15344;
   $30 = ($$0471 != $$0471) | (0.0 != 0.0);
   $31 = $28 ? 15348 : 15352;
   $$0510 = $30 ? $31 : $29;
   $32 = (($$0520) + 3)|0;
   $33 = $4 & -65537;
   _pad_674($0,32,$2,$32,$33);
   _out_668($0,$$0521,$$0520);
   _out_668($0,$$0510,3);
   $34 = $4 ^ 8192;
   _pad_674($0,32,$2,$32,$34);
   $$sink562 = $32;
  }
 } while(0);
 $388 = ($$sink562|0)<($2|0);
 $$555 = $388 ? $2 : $$sink562;
 STACKTOP = sp;return ($$555|0);
}
function ___DOUBLE_BITS_675($0) {
 $0 = +$0;
 var $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$1 = HEAP32[tempDoublePtr>>2]|0;
 $2 = HEAP32[tempDoublePtr+4>>2]|0;
 tempRet0 = ($2);
 return ($1|0);
}
function _frexpl($0,$1) {
 $0 = +$0;
 $1 = $1|0;
 var $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (+_frexp($0,$1));
 return (+$2);
}
function _frexp($0,$1) {
 $0 = +$0;
 $1 = $1|0;
 var $$0 = 0.0, $$016 = 0.0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0.0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0.0, $storemerge = 0, $trunc$clear = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 $4 = (_bitshift64Lshr(($2|0),($3|0),52)|0);
 $5 = tempRet0;
 $6 = $4&65535;
 $trunc$clear = $6 & 2047;
 switch ($trunc$clear<<16>>16) {
 case 0:  {
  $7 = $0 != 0.0;
  if ($7) {
   $8 = $0 * 1.8446744073709552E+19;
   $9 = (+_frexp($8,$1));
   $10 = HEAP32[$1>>2]|0;
   $11 = (($10) + -64)|0;
   $$016 = $9;$storemerge = $11;
  } else {
   $$016 = $0;$storemerge = 0;
  }
  HEAP32[$1>>2] = $storemerge;
  $$0 = $$016;
  break;
 }
 case 2047:  {
  $$0 = $0;
  break;
 }
 default: {
  $12 = $4 & 2047;
  $13 = (($12) + -1022)|0;
  HEAP32[$1>>2] = $13;
  $14 = $3 & -2146435073;
  $15 = $14 | 1071644672;
  HEAP32[tempDoublePtr>>2] = $2;HEAP32[tempDoublePtr+4>>2] = $15;$16 = +HEAPF64[tempDoublePtr>>3];
  $$0 = $16;
 }
 }
 return (+$$0);
}
function _wcrtomb($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $not$ = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ($0|0)==(0|0);
 do {
  if ($3) {
   $$0 = 1;
  } else {
   $4 = ($1>>>0)<(128);
   if ($4) {
    $5 = $1&255;
    HEAP8[$0>>0] = $5;
    $$0 = 1;
    break;
   }
   $6 = (___pthread_self_906()|0);
   $7 = ((($6)) + 188|0);
   $8 = HEAP32[$7>>2]|0;
   $9 = HEAP32[$8>>2]|0;
   $not$ = ($9|0)==(0|0);
   if ($not$) {
    $10 = $1 & -128;
    $11 = ($10|0)==(57216);
    if ($11) {
     $13 = $1&255;
     HEAP8[$0>>0] = $13;
     $$0 = 1;
     break;
    } else {
     $12 = (___errno_location()|0);
     HEAP32[$12>>2] = 84;
     $$0 = -1;
     break;
    }
   }
   $14 = ($1>>>0)<(2048);
   if ($14) {
    $15 = $1 >>> 6;
    $16 = $15 | 192;
    $17 = $16&255;
    $18 = ((($0)) + 1|0);
    HEAP8[$0>>0] = $17;
    $19 = $1 & 63;
    $20 = $19 | 128;
    $21 = $20&255;
    HEAP8[$18>>0] = $21;
    $$0 = 2;
    break;
   }
   $22 = ($1>>>0)<(55296);
   $23 = $1 & -8192;
   $24 = ($23|0)==(57344);
   $or$cond = $22 | $24;
   if ($or$cond) {
    $25 = $1 >>> 12;
    $26 = $25 | 224;
    $27 = $26&255;
    $28 = ((($0)) + 1|0);
    HEAP8[$0>>0] = $27;
    $29 = $1 >>> 6;
    $30 = $29 & 63;
    $31 = $30 | 128;
    $32 = $31&255;
    $33 = ((($0)) + 2|0);
    HEAP8[$28>>0] = $32;
    $34 = $1 & 63;
    $35 = $34 | 128;
    $36 = $35&255;
    HEAP8[$33>>0] = $36;
    $$0 = 3;
    break;
   }
   $37 = (($1) + -65536)|0;
   $38 = ($37>>>0)<(1048576);
   if ($38) {
    $39 = $1 >>> 18;
    $40 = $39 | 240;
    $41 = $40&255;
    $42 = ((($0)) + 1|0);
    HEAP8[$0>>0] = $41;
    $43 = $1 >>> 12;
    $44 = $43 & 63;
    $45 = $44 | 128;
    $46 = $45&255;
    $47 = ((($0)) + 2|0);
    HEAP8[$42>>0] = $46;
    $48 = $1 >>> 6;
    $49 = $48 & 63;
    $50 = $49 | 128;
    $51 = $50&255;
    $52 = ((($0)) + 3|0);
    HEAP8[$47>>0] = $51;
    $53 = $1 & 63;
    $54 = $53 | 128;
    $55 = $54&255;
    HEAP8[$52>>0] = $55;
    $$0 = 4;
    break;
   } else {
    $56 = (___errno_location()|0);
    HEAP32[$56>>2] = 84;
    $$0 = -1;
    break;
   }
  }
 } while(0);
 return ($$0|0);
}
function ___pthread_self_906() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_pthread_self()|0);
 return ($0|0);
}
function ___pthread_self_85() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_pthread_self()|0);
 return ($0|0);
}
function ___strerror_l($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$012$lcssa = 0, $$01214 = 0, $$016 = 0, $$113 = 0, $$115 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $$016 = 0;
 while(1) {
  $3 = (15374 + ($$016)|0);
  $4 = HEAP8[$3>>0]|0;
  $5 = $4&255;
  $6 = ($5|0)==($0|0);
  if ($6) {
   label = 2;
   break;
  }
  $7 = (($$016) + 1)|0;
  $8 = ($7|0)==(87);
  if ($8) {
   $$01214 = 15462;$$115 = 87;
   label = 5;
   break;
  } else {
   $$016 = $7;
  }
 }
 if ((label|0) == 2) {
  $2 = ($$016|0)==(0);
  if ($2) {
   $$012$lcssa = 15462;
  } else {
   $$01214 = 15462;$$115 = $$016;
   label = 5;
  }
 }
 if ((label|0) == 5) {
  while(1) {
   label = 0;
   $$113 = $$01214;
   while(1) {
    $9 = HEAP8[$$113>>0]|0;
    $10 = ($9<<24>>24)==(0);
    $11 = ((($$113)) + 1|0);
    if ($10) {
     break;
    } else {
     $$113 = $11;
    }
   }
   $12 = (($$115) + -1)|0;
   $13 = ($12|0)==(0);
   if ($13) {
    $$012$lcssa = $11;
    break;
   } else {
    $$01214 = $11;$$115 = $12;
    label = 5;
   }
  }
 }
 $14 = ((($1)) + 20|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = (___lctrans($$012$lcssa,$15)|0);
 return ($16|0);
}
function ___lctrans($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (___lctrans_impl($0,$1)|0);
 return ($2|0);
}
function _snprintf($0,$1,$2,$varargs) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $varargs = $varargs|0;
 var $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $3 = sp;
 HEAP32[$3>>2] = $varargs;
 $4 = (_vsnprintf($0,$1,$2,$3)|0);
 STACKTOP = sp;return ($4|0);
}
function _vsnprintf($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $$$015 = 0, $$0 = 0, $$014 = 0, $$015 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 128|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(128|0);
 $4 = sp + 124|0;
 $5 = sp;
 dest=$5; src=3020; stop=dest+124|0; do { HEAP32[dest>>2]=HEAP32[src>>2]|0; dest=dest+4|0; src=src+4|0; } while ((dest|0) < (stop|0));
 $6 = (($1) + -1)|0;
 $7 = ($6>>>0)>(2147483646);
 if ($7) {
  $8 = ($1|0)==(0);
  if ($8) {
   $$014 = $4;$$015 = 1;
   label = 4;
  } else {
   $9 = (___errno_location()|0);
   HEAP32[$9>>2] = 75;
   $$0 = -1;
  }
 } else {
  $$014 = $0;$$015 = $1;
  label = 4;
 }
 if ((label|0) == 4) {
  $10 = $$014;
  $11 = (-2 - ($10))|0;
  $12 = ($$015>>>0)>($11>>>0);
  $$$015 = $12 ? $11 : $$015;
  $13 = ((($5)) + 48|0);
  HEAP32[$13>>2] = $$$015;
  $14 = ((($5)) + 20|0);
  HEAP32[$14>>2] = $$014;
  $15 = ((($5)) + 44|0);
  HEAP32[$15>>2] = $$014;
  $16 = (($$014) + ($$$015)|0);
  $17 = ((($5)) + 16|0);
  HEAP32[$17>>2] = $16;
  $18 = ((($5)) + 28|0);
  HEAP32[$18>>2] = $16;
  $19 = (_vfprintf($5,$2,$3)|0);
  $20 = ($$$015|0)==(0);
  if ($20) {
   $$0 = $19;
  } else {
   $21 = HEAP32[$14>>2]|0;
   $22 = HEAP32[$17>>2]|0;
   $23 = ($21|0)==($22|0);
   $24 = $23 << 31 >> 31;
   $25 = (($21) + ($24)|0);
   HEAP8[$25>>0] = 0;
   $$0 = $19;
  }
 }
 STACKTOP = sp;return ($$0|0);
}
function _sn_write($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$ = 0, $10 = 0, $11 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $3 = ((($0)) + 16|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ((($0)) + 20|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = $6;
 $8 = (($4) - ($7))|0;
 $9 = ($8>>>0)>($2>>>0);
 $$ = $9 ? $2 : $8;
 _memcpy(($6|0),($1|0),($$|0))|0;
 $10 = HEAP32[$5>>2]|0;
 $11 = (($10) + ($$)|0);
 HEAP32[$5>>2] = $11;
 return ($2|0);
}
function _strcpy($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 (___stpcpy($0,$1)|0);
 return ($0|0);
}
function ___stpcpy($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$0$lcssa = 0, $$025$lcssa = 0, $$02536 = 0, $$026$lcssa = 0, $$02642 = 0, $$027$lcssa = 0, $$02741 = 0, $$029 = 0, $$037 = 0, $$1$ph = 0, $$128$ph = 0, $$12834 = 0, $$135 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0;
 var $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0;
 var $35 = 0, $36 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = $1;
 $3 = $0;
 $4 = $2 ^ $3;
 $5 = $4 & 3;
 $6 = ($5|0)==(0);
 L1: do {
  if ($6) {
   $7 = $2 & 3;
   $8 = ($7|0)==(0);
   if ($8) {
    $$026$lcssa = $1;$$027$lcssa = $0;
   } else {
    $$02642 = $1;$$02741 = $0;
    while(1) {
     $9 = HEAP8[$$02642>>0]|0;
     HEAP8[$$02741>>0] = $9;
     $10 = ($9<<24>>24)==(0);
     if ($10) {
      $$029 = $$02741;
      break L1;
     }
     $11 = ((($$02642)) + 1|0);
     $12 = ((($$02741)) + 1|0);
     $13 = $11;
     $14 = $13 & 3;
     $15 = ($14|0)==(0);
     if ($15) {
      $$026$lcssa = $11;$$027$lcssa = $12;
      break;
     } else {
      $$02642 = $11;$$02741 = $12;
     }
    }
   }
   $16 = HEAP32[$$026$lcssa>>2]|0;
   $17 = (($16) + -16843009)|0;
   $18 = $16 & -2139062144;
   $19 = $18 ^ -2139062144;
   $20 = $19 & $17;
   $21 = ($20|0)==(0);
   if ($21) {
    $$02536 = $$027$lcssa;$$037 = $$026$lcssa;$24 = $16;
    while(1) {
     $22 = ((($$037)) + 4|0);
     $23 = ((($$02536)) + 4|0);
     HEAP32[$$02536>>2] = $24;
     $25 = HEAP32[$22>>2]|0;
     $26 = (($25) + -16843009)|0;
     $27 = $25 & -2139062144;
     $28 = $27 ^ -2139062144;
     $29 = $28 & $26;
     $30 = ($29|0)==(0);
     if ($30) {
      $$02536 = $23;$$037 = $22;$24 = $25;
     } else {
      $$0$lcssa = $22;$$025$lcssa = $23;
      break;
     }
    }
   } else {
    $$0$lcssa = $$026$lcssa;$$025$lcssa = $$027$lcssa;
   }
   $$1$ph = $$0$lcssa;$$128$ph = $$025$lcssa;
   label = 8;
  } else {
   $$1$ph = $1;$$128$ph = $0;
   label = 8;
  }
 } while(0);
 if ((label|0) == 8) {
  $31 = HEAP8[$$1$ph>>0]|0;
  HEAP8[$$128$ph>>0] = $31;
  $32 = ($31<<24>>24)==(0);
  if ($32) {
   $$029 = $$128$ph;
  } else {
   $$12834 = $$128$ph;$$135 = $$1$ph;
   while(1) {
    $33 = ((($$135)) + 1|0);
    $34 = ((($$12834)) + 1|0);
    $35 = HEAP8[$33>>0]|0;
    HEAP8[$34>>0] = $35;
    $36 = ($35<<24>>24)==(0);
    if ($36) {
     $$029 = $34;
     break;
    } else {
     $$12834 = $34;$$135 = $33;
    }
   }
  }
 }
 return ($$029|0);
}
function ___strdup($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = (_strlen($0)|0);
 $2 = (($1) + 1)|0;
 $3 = (_malloc($2)|0);
 $4 = ($3|0)==(0|0);
 if ($4) {
  $$0 = 0;
 } else {
  _memcpy(($3|0),($0|0),($2|0))|0;
  $$0 = $3;
 }
 return ($$0|0);
}
function _getc($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 76|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)<(0);
 if ($3) {
  label = 3;
 } else {
  $4 = (___lockfile($0)|0);
  $5 = ($4|0)==(0);
  if ($5) {
   label = 3;
  } else {
   $15 = ((($0)) + 4|0);
   $16 = HEAP32[$15>>2]|0;
   $17 = ((($0)) + 8|0);
   $18 = HEAP32[$17>>2]|0;
   $19 = ($16>>>0)<($18>>>0);
   if ($19) {
    $20 = ((($16)) + 1|0);
    HEAP32[$15>>2] = $20;
    $21 = HEAP8[$16>>0]|0;
    $22 = $21&255;
    $24 = $22;
   } else {
    $23 = (___uflow($0)|0);
    $24 = $23;
   }
   ___unlockfile($0);
   $$0 = $24;
  }
 }
 do {
  if ((label|0) == 3) {
   $6 = ((($0)) + 4|0);
   $7 = HEAP32[$6>>2]|0;
   $8 = ((($0)) + 8|0);
   $9 = HEAP32[$8>>2]|0;
   $10 = ($7>>>0)<($9>>>0);
   if ($10) {
    $11 = ((($7)) + 1|0);
    HEAP32[$6>>2] = $11;
    $12 = HEAP8[$7>>0]|0;
    $13 = $12&255;
    $$0 = $13;
    break;
   } else {
    $14 = (___uflow($0)|0);
    $$0 = $14;
    break;
   }
  }
 } while(0);
 return ($$0|0);
}
function _isatty($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $1 = sp + 16|0;
 $2 = $1;
 HEAP32[$vararg_buffer>>2] = $0;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = 21523;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = $2;
 $3 = (___syscall54(54,($vararg_buffer|0))|0);
 $4 = (___syscall_ret($3)|0);
 $5 = ($4|0)==(0);
 $6 = $5&1;
 STACKTOP = sp;return ($6|0);
}
function _printf($0,$varargs) {
 $0 = $0|0;
 $varargs = $varargs|0;
 var $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = sp;
 HEAP32[$1>>2] = $varargs;
 $2 = HEAP32[651]|0;
 $3 = (_vfprintf($2,$0,$1)|0);
 STACKTOP = sp;return ($3|0);
}
function _fread($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $$ = 0, $$0 = 0, $$054$ph = 0, $$05460 = 0, $$056$ph = 0, $$05659 = 0, $$57 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $4 = Math_imul($2, $1)|0;
 $5 = ($1|0)==(0);
 $$ = $5 ? 0 : $2;
 $6 = ((($3)) + 76|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ($7|0)>(-1);
 if ($8) {
  $9 = (___lockfile($3)|0);
  $36 = $9;
 } else {
  $36 = 0;
 }
 $10 = ((($3)) + 74|0);
 $11 = HEAP8[$10>>0]|0;
 $12 = $11 << 24 >> 24;
 $13 = (($12) + 255)|0;
 $14 = $13 | $12;
 $15 = $14&255;
 HEAP8[$10>>0] = $15;
 $16 = ((($3)) + 8|0);
 $17 = HEAP32[$16>>2]|0;
 $18 = ((($3)) + 4|0);
 $19 = HEAP32[$18>>2]|0;
 $20 = $19;
 $21 = (($17) - ($20))|0;
 $22 = ($21|0)>(0);
 $23 = ($21>>>0)<($4>>>0);
 $$57 = $23 ? $21 : $4;
 if ($22) {
  $24 = (($4) - ($$57))|0;
  $25 = (($0) + ($$57)|0);
  _memcpy(($0|0),($19|0),($$57|0))|0;
  $26 = (($19) + ($$57)|0);
  HEAP32[$18>>2] = $26;
  $$054$ph = $24;$$056$ph = $25;
 } else {
  $$054$ph = $4;$$056$ph = $0;
 }
 $27 = ($$054$ph|0)==(0);
 L7: do {
  if ($27) {
   label = 13;
  } else {
   $28 = ((($3)) + 32|0);
   $$05460 = $$054$ph;$$05659 = $$056$ph;
   while(1) {
    $29 = (___toread($3)|0);
    $30 = ($29|0)==(0);
    if (!($30)) {
     break;
    }
    $31 = HEAP32[$28>>2]|0;
    $32 = (FUNCTION_TABLE_iiii[$31 & 7]($3,$$05659,$$05460)|0);
    $33 = (($32) + 1)|0;
    $34 = ($33>>>0)<(2);
    if ($34) {
     break;
    }
    $39 = (($$05460) - ($32))|0;
    $40 = (($$05659) + ($32)|0);
    $41 = ($39|0)==(0);
    if ($41) {
     label = 13;
     break L7;
    } else {
     $$05460 = $39;$$05659 = $40;
    }
   }
   $35 = ($36|0)==(0);
   if (!($35)) {
    ___unlockfile($3);
   }
   $37 = (($4) - ($$05460))|0;
   $38 = (($37>>>0) / ($1>>>0))&-1;
   $$0 = $38;
  }
 } while(0);
 if ((label|0) == 13) {
  $42 = ($36|0)==(0);
  if ($42) {
   $$0 = $$;
  } else {
   ___unlockfile($3);
   $$0 = $$;
  }
 }
 return ($$0|0);
}
function _clearerr($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 76|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)>(-1);
 if ($3) {
  $4 = (___lockfile($0)|0);
  $phitmp = ($4|0)==(0);
  $5 = HEAP32[$0>>2]|0;
  $6 = $5 & -49;
  HEAP32[$0>>2] = $6;
  if (!($phitmp)) {
   ___unlockfile($0);
  }
 } else {
  $7 = HEAP32[$0>>2]|0;
  $8 = $7 & -49;
  HEAP32[$0>>2] = $8;
 }
 return;
}
function _fileno($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 76|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)>(-1);
 if ($3) {
  $4 = (___lockfile($0)|0);
  $phitmp = ($4|0)==(0);
  if (!($phitmp)) {
   ___unlockfile($0);
  }
 }
 $5 = ((($0)) + 60|0);
 $6 = HEAP32[$5>>2]|0;
 return ($6|0);
}
function _strtox_818($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 128|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(128|0);
 $3 = sp;
 dest=$3; stop=dest+124|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $4 = ((($3)) + 4|0);
 HEAP32[$4>>2] = $0;
 $5 = ((($3)) + 8|0);
 HEAP32[$5>>2] = (-1);
 $6 = ((($3)) + 44|0);
 HEAP32[$6>>2] = $0;
 $7 = ((($3)) + 76|0);
 HEAP32[$7>>2] = -1;
 ___shlim($3,0);
 $8 = (+___floatscan($3,$2,1));
 $9 = ((($3)) + 108|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = HEAP32[$4>>2]|0;
 $12 = HEAP32[$5>>2]|0;
 $13 = (($11) - ($12))|0;
 $14 = (($13) + ($10))|0;
 $15 = ($1|0)==(0|0);
 if (!($15)) {
  $16 = ($14|0)!=(0);
  $17 = (($0) + ($14)|0);
  $18 = $16 ? $17 : $0;
  HEAP32[$1>>2] = $18;
 }
 STACKTOP = sp;return (+$8);
}
function _strtod($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (+_strtox_818($0,$1,1));
 return (+$2);
}
function _atof($0) {
 $0 = $0|0;
 var $1 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = (+_strtod($0,0));
 return (+$1);
}
function _strcat($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $2 = (_strlen($0)|0);
 $3 = (($0) + ($2)|0);
 (_strcpy($3,$1)|0);
 return ($0|0);
}
function runPostSets() {
}
function ___muldsi3($a, $b) {
    $a = $a | 0;
    $b = $b | 0;
    var $1 = 0, $2 = 0, $3 = 0, $6 = 0, $8 = 0, $11 = 0, $12 = 0;
    $1 = $a & 65535;
    $2 = $b & 65535;
    $3 = Math_imul($2, $1) | 0;
    $6 = $a >>> 16;
    $8 = ($3 >>> 16) + (Math_imul($2, $6) | 0) | 0;
    $11 = $b >>> 16;
    $12 = Math_imul($11, $1) | 0;
    return (tempRet0 = (($8 >>> 16) + (Math_imul($11, $6) | 0) | 0) + ((($8 & 65535) + $12 | 0) >>> 16) | 0, 0 | ($8 + $12 << 16 | $3 & 65535)) | 0;
}
function ___muldi3($a$0, $a$1, $b$0, $b$1) {
    $a$0 = $a$0 | 0;
    $a$1 = $a$1 | 0;
    $b$0 = $b$0 | 0;
    $b$1 = $b$1 | 0;
    var $x_sroa_0_0_extract_trunc = 0, $y_sroa_0_0_extract_trunc = 0, $1$0 = 0, $1$1 = 0, $2 = 0;
    $x_sroa_0_0_extract_trunc = $a$0;
    $y_sroa_0_0_extract_trunc = $b$0;
    $1$0 = ___muldsi3($x_sroa_0_0_extract_trunc, $y_sroa_0_0_extract_trunc) | 0;
    $1$1 = tempRet0;
    $2 = Math_imul($a$1, $y_sroa_0_0_extract_trunc) | 0;
    return (tempRet0 = ((Math_imul($b$1, $x_sroa_0_0_extract_trunc) | 0) + $2 | 0) + $1$1 | $1$1 & 0, 0 | $1$0 & -1) | 0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _llvm_cttz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((cttz_i8)+(x & 0xff))>>0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 8)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 16)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((cttz_i8)+(x >>> 24))>>0)])|0) + 24)|0;
}
function ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) {
    $a$0 = $a$0 | 0;
    $a$1 = $a$1 | 0;
    $b$0 = $b$0 | 0;
    $b$1 = $b$1 | 0;
    $rem = $rem | 0;
    var $n_sroa_0_0_extract_trunc = 0, $n_sroa_1_4_extract_shift$0 = 0, $n_sroa_1_4_extract_trunc = 0, $d_sroa_0_0_extract_trunc = 0, $d_sroa_1_4_extract_shift$0 = 0, $d_sroa_1_4_extract_trunc = 0, $4 = 0, $17 = 0, $37 = 0, $49 = 0, $51 = 0, $57 = 0, $58 = 0, $66 = 0, $78 = 0, $86 = 0, $88 = 0, $89 = 0, $91 = 0, $92 = 0, $95 = 0, $105 = 0, $117 = 0, $119 = 0, $125 = 0, $126 = 0, $130 = 0, $q_sroa_1_1_ph = 0, $q_sroa_0_1_ph = 0, $r_sroa_1_1_ph = 0, $r_sroa_0_1_ph = 0, $sr_1_ph = 0, $d_sroa_0_0_insert_insert99$0 = 0, $d_sroa_0_0_insert_insert99$1 = 0, $137$0 = 0, $137$1 = 0, $carry_0203 = 0, $sr_1202 = 0, $r_sroa_0_1201 = 0, $r_sroa_1_1200 = 0, $q_sroa_0_1199 = 0, $q_sroa_1_1198 = 0, $147 = 0, $149 = 0, $r_sroa_0_0_insert_insert42$0 = 0, $r_sroa_0_0_insert_insert42$1 = 0, $150$1 = 0, $151$0 = 0, $152 = 0, $154$0 = 0, $r_sroa_0_0_extract_trunc = 0, $r_sroa_1_4_extract_trunc = 0, $155 = 0, $carry_0_lcssa$0 = 0, $carry_0_lcssa$1 = 0, $r_sroa_0_1_lcssa = 0, $r_sroa_1_1_lcssa = 0, $q_sroa_0_1_lcssa = 0, $q_sroa_1_1_lcssa = 0, $q_sroa_0_0_insert_ext75$0 = 0, $q_sroa_0_0_insert_ext75$1 = 0, $q_sroa_0_0_insert_insert77$1 = 0, $_0$0 = 0, $_0$1 = 0;
    $n_sroa_0_0_extract_trunc = $a$0;
    $n_sroa_1_4_extract_shift$0 = $a$1;
    $n_sroa_1_4_extract_trunc = $n_sroa_1_4_extract_shift$0;
    $d_sroa_0_0_extract_trunc = $b$0;
    $d_sroa_1_4_extract_shift$0 = $b$1;
    $d_sroa_1_4_extract_trunc = $d_sroa_1_4_extract_shift$0;
    if (($n_sroa_1_4_extract_trunc | 0) == 0) {
      $4 = ($rem | 0) != 0;
      if (($d_sroa_1_4_extract_trunc | 0) == 0) {
        if ($4) {
          HEAP32[$rem >> 2] = ($n_sroa_0_0_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
          HEAP32[$rem + 4 >> 2] = 0;
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_0_0_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        if (!$4) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
    }
    $17 = ($d_sroa_1_4_extract_trunc | 0) == 0;
    do {
      if (($d_sroa_0_0_extract_trunc | 0) == 0) {
        if ($17) {
          if (($rem | 0) != 0) {
            HEAP32[$rem >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
            HEAP32[$rem + 4 >> 2] = 0;
          }
          $_0$1 = 0;
          $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        if (($n_sroa_0_0_extract_trunc | 0) == 0) {
          if (($rem | 0) != 0) {
            HEAP32[$rem >> 2] = 0;
            HEAP32[$rem + 4 >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_1_4_extract_trunc >>> 0);
          }
          $_0$1 = 0;
          $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_1_4_extract_trunc >>> 0) >>> 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        $37 = $d_sroa_1_4_extract_trunc - 1 | 0;
        if (($37 & $d_sroa_1_4_extract_trunc | 0) == 0) {
          if (($rem | 0) != 0) {
            HEAP32[$rem >> 2] = 0 | $a$0 & -1;
            HEAP32[$rem + 4 >> 2] = $37 & $n_sroa_1_4_extract_trunc | $a$1 & 0;
          }
          $_0$1 = 0;
          $_0$0 = $n_sroa_1_4_extract_trunc >>> ((_llvm_cttz_i32($d_sroa_1_4_extract_trunc | 0) | 0) >>> 0);
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        $49 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
        $51 = $49 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        if ($51 >>> 0 <= 30) {
          $57 = $51 + 1 | 0;
          $58 = 31 - $51 | 0;
          $sr_1_ph = $57;
          $r_sroa_0_1_ph = $n_sroa_1_4_extract_trunc << $58 | $n_sroa_0_0_extract_trunc >>> ($57 >>> 0);
          $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($57 >>> 0);
          $q_sroa_0_1_ph = 0;
          $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $58;
          break;
        }
        if (($rem | 0) == 0) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = 0 | $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        if (!$17) {
          $117 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
          $119 = $117 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
          if ($119 >>> 0 <= 31) {
            $125 = $119 + 1 | 0;
            $126 = 31 - $119 | 0;
            $130 = $119 - 31 >> 31;
            $sr_1_ph = $125;
            $r_sroa_0_1_ph = $n_sroa_0_0_extract_trunc >>> ($125 >>> 0) & $130 | $n_sroa_1_4_extract_trunc << $126;
            $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($125 >>> 0) & $130;
            $q_sroa_0_1_ph = 0;
            $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $126;
            break;
          }
          if (($rem | 0) == 0) {
            $_0$1 = 0;
            $_0$0 = 0;
            return (tempRet0 = $_0$1, $_0$0) | 0;
          }
          HEAP32[$rem >> 2] = 0 | $a$0 & -1;
          HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        $66 = $d_sroa_0_0_extract_trunc - 1 | 0;
        if (($66 & $d_sroa_0_0_extract_trunc | 0) != 0) {
          $86 = (Math_clz32($d_sroa_0_0_extract_trunc | 0) | 0) + 33 | 0;
          $88 = $86 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
          $89 = 64 - $88 | 0;
          $91 = 32 - $88 | 0;
          $92 = $91 >> 31;
          $95 = $88 - 32 | 0;
          $105 = $95 >> 31;
          $sr_1_ph = $88;
          $r_sroa_0_1_ph = $91 - 1 >> 31 & $n_sroa_1_4_extract_trunc >>> ($95 >>> 0) | ($n_sroa_1_4_extract_trunc << $91 | $n_sroa_0_0_extract_trunc >>> ($88 >>> 0)) & $105;
          $r_sroa_1_1_ph = $105 & $n_sroa_1_4_extract_trunc >>> ($88 >>> 0);
          $q_sroa_0_1_ph = $n_sroa_0_0_extract_trunc << $89 & $92;
          $q_sroa_1_1_ph = ($n_sroa_1_4_extract_trunc << $89 | $n_sroa_0_0_extract_trunc >>> ($95 >>> 0)) & $92 | $n_sroa_0_0_extract_trunc << $91 & $88 - 33 >> 31;
          break;
        }
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = $66 & $n_sroa_0_0_extract_trunc;
          HEAP32[$rem + 4 >> 2] = 0;
        }
        if (($d_sroa_0_0_extract_trunc | 0) == 1) {
          $_0$1 = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
          $_0$0 = 0 | $a$0 & -1;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        } else {
          $78 = _llvm_cttz_i32($d_sroa_0_0_extract_trunc | 0) | 0;
          $_0$1 = 0 | $n_sroa_1_4_extract_trunc >>> ($78 >>> 0);
          $_0$0 = $n_sroa_1_4_extract_trunc << 32 - $78 | $n_sroa_0_0_extract_trunc >>> ($78 >>> 0) | 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
      }
    } while (0);
    if (($sr_1_ph | 0) == 0) {
      $q_sroa_1_1_lcssa = $q_sroa_1_1_ph;
      $q_sroa_0_1_lcssa = $q_sroa_0_1_ph;
      $r_sroa_1_1_lcssa = $r_sroa_1_1_ph;
      $r_sroa_0_1_lcssa = $r_sroa_0_1_ph;
      $carry_0_lcssa$1 = 0;
      $carry_0_lcssa$0 = 0;
    } else {
      $d_sroa_0_0_insert_insert99$0 = 0 | $b$0 & -1;
      $d_sroa_0_0_insert_insert99$1 = $d_sroa_1_4_extract_shift$0 | $b$1 & 0;
      $137$0 = _i64Add($d_sroa_0_0_insert_insert99$0 | 0, $d_sroa_0_0_insert_insert99$1 | 0, -1, -1) | 0;
      $137$1 = tempRet0;
      $q_sroa_1_1198 = $q_sroa_1_1_ph;
      $q_sroa_0_1199 = $q_sroa_0_1_ph;
      $r_sroa_1_1200 = $r_sroa_1_1_ph;
      $r_sroa_0_1201 = $r_sroa_0_1_ph;
      $sr_1202 = $sr_1_ph;
      $carry_0203 = 0;
      while (1) {
        $147 = $q_sroa_0_1199 >>> 31 | $q_sroa_1_1198 << 1;
        $149 = $carry_0203 | $q_sroa_0_1199 << 1;
        $r_sroa_0_0_insert_insert42$0 = 0 | ($r_sroa_0_1201 << 1 | $q_sroa_1_1198 >>> 31);
        $r_sroa_0_0_insert_insert42$1 = $r_sroa_0_1201 >>> 31 | $r_sroa_1_1200 << 1 | 0;
        _i64Subtract($137$0 | 0, $137$1 | 0, $r_sroa_0_0_insert_insert42$0 | 0, $r_sroa_0_0_insert_insert42$1 | 0) | 0;
        $150$1 = tempRet0;
        $151$0 = $150$1 >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1;
        $152 = $151$0 & 1;
        $154$0 = _i64Subtract($r_sroa_0_0_insert_insert42$0 | 0, $r_sroa_0_0_insert_insert42$1 | 0, $151$0 & $d_sroa_0_0_insert_insert99$0 | 0, ((($150$1 | 0) < 0 ? -1 : 0) >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1) & $d_sroa_0_0_insert_insert99$1 | 0) | 0;
        $r_sroa_0_0_extract_trunc = $154$0;
        $r_sroa_1_4_extract_trunc = tempRet0;
        $155 = $sr_1202 - 1 | 0;
        if (($155 | 0) == 0) {
          break;
        } else {
          $q_sroa_1_1198 = $147;
          $q_sroa_0_1199 = $149;
          $r_sroa_1_1200 = $r_sroa_1_4_extract_trunc;
          $r_sroa_0_1201 = $r_sroa_0_0_extract_trunc;
          $sr_1202 = $155;
          $carry_0203 = $152;
        }
      }
      $q_sroa_1_1_lcssa = $147;
      $q_sroa_0_1_lcssa = $149;
      $r_sroa_1_1_lcssa = $r_sroa_1_4_extract_trunc;
      $r_sroa_0_1_lcssa = $r_sroa_0_0_extract_trunc;
      $carry_0_lcssa$1 = 0;
      $carry_0_lcssa$0 = $152;
    }
    $q_sroa_0_0_insert_ext75$0 = $q_sroa_0_1_lcssa;
    $q_sroa_0_0_insert_ext75$1 = 0;
    $q_sroa_0_0_insert_insert77$1 = $q_sroa_1_1_lcssa | $q_sroa_0_0_insert_ext75$1;
    if (($rem | 0) != 0) {
      HEAP32[$rem >> 2] = 0 | $r_sroa_0_1_lcssa;
      HEAP32[$rem + 4 >> 2] = $r_sroa_1_1_lcssa | 0;
    }
    $_0$1 = (0 | $q_sroa_0_0_insert_ext75$0) >>> 31 | $q_sroa_0_0_insert_insert77$1 << 1 | ($q_sroa_0_0_insert_ext75$1 << 1 | $q_sroa_0_0_insert_ext75$0 >>> 31) & 0 | $carry_0_lcssa$1;
    $_0$0 = ($q_sroa_0_0_insert_ext75$0 << 1 | 0 >>> 31) & -2 | $carry_0_lcssa$0;
    return (tempRet0 = $_0$1, $_0$0) | 0;
}
function ___udivdi3($a$0, $a$1, $b$0, $b$1) {
    $a$0 = $a$0 | 0;
    $a$1 = $a$1 | 0;
    $b$0 = $b$0 | 0;
    $b$1 = $b$1 | 0;
    var $1$0 = 0;
    $1$0 = ___udivmoddi4($a$0, $a$1, $b$0, $b$1, 0) | 0;
    return $1$0 | 0;
}
function ___uremdi3($a$0, $a$1, $b$0, $b$1) {
    $a$0 = $a$0 | 0;
    $a$1 = $a$1 | 0;
    $b$0 = $b$0 | 0;
    $b$1 = $b$1 | 0;
    var $rem = 0, __stackBase__ = 0;
    __stackBase__ = STACKTOP;
    STACKTOP = STACKTOP + 16 | 0;
    $rem = __stackBase__ | 0;
    ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) | 0;
    STACKTOP = __stackBase__;
    return (tempRet0 = HEAP32[$rem + 4 >> 2] | 0, HEAP32[$rem >> 2] | 0) | 0;
}
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
}
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
}
function _llvm_bswap_i32(x) {
    x = x|0;
    return (((x&0xff)<<24) | (((x>>8)&0xff)<<16) | (((x>>16)&0xff)<<8) | (x>>>24))|0;
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    var aligned_dest_end = 0;
    var block_aligned_dest_end = 0;
    var dest_end = 0;
    // Test against a benchmarked cutoff limit for when HEAPU8.set() becomes faster to use.
    if ((num|0) >=
      8192
    ) {
      return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    }

    ret = dest|0;
    dest_end = (dest + num)|0;
    if ((dest&3) == (src&3)) {
      // The initial unaligned < 4-byte front.
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      aligned_dest_end = (dest_end & -4)|0;
      block_aligned_dest_end = (aligned_dest_end - 64)|0;
      while ((dest|0) <= (block_aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        HEAP32[(((dest)+(4))>>2)]=((HEAP32[(((src)+(4))>>2)])|0);
        HEAP32[(((dest)+(8))>>2)]=((HEAP32[(((src)+(8))>>2)])|0);
        HEAP32[(((dest)+(12))>>2)]=((HEAP32[(((src)+(12))>>2)])|0);
        HEAP32[(((dest)+(16))>>2)]=((HEAP32[(((src)+(16))>>2)])|0);
        HEAP32[(((dest)+(20))>>2)]=((HEAP32[(((src)+(20))>>2)])|0);
        HEAP32[(((dest)+(24))>>2)]=((HEAP32[(((src)+(24))>>2)])|0);
        HEAP32[(((dest)+(28))>>2)]=((HEAP32[(((src)+(28))>>2)])|0);
        HEAP32[(((dest)+(32))>>2)]=((HEAP32[(((src)+(32))>>2)])|0);
        HEAP32[(((dest)+(36))>>2)]=((HEAP32[(((src)+(36))>>2)])|0);
        HEAP32[(((dest)+(40))>>2)]=((HEAP32[(((src)+(40))>>2)])|0);
        HEAP32[(((dest)+(44))>>2)]=((HEAP32[(((src)+(44))>>2)])|0);
        HEAP32[(((dest)+(48))>>2)]=((HEAP32[(((src)+(48))>>2)])|0);
        HEAP32[(((dest)+(52))>>2)]=((HEAP32[(((src)+(52))>>2)])|0);
        HEAP32[(((dest)+(56))>>2)]=((HEAP32[(((src)+(56))>>2)])|0);
        HEAP32[(((dest)+(60))>>2)]=((HEAP32[(((src)+(60))>>2)])|0);
        dest = (dest+64)|0;
        src = (src+64)|0;
      }
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    } else {
      // In the unaligned copy case, unroll a bit as well.
      aligned_dest_end = (dest_end - 4)|0;
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        HEAP8[(((dest)+(1))>>0)]=((HEAP8[(((src)+(1))>>0)])|0);
        HEAP8[(((dest)+(2))>>0)]=((HEAP8[(((src)+(2))>>0)])|0);
        HEAP8[(((dest)+(3))>>0)]=((HEAP8[(((src)+(3))>>0)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    }
    // The remaining unaligned < 4 byte tail.
    while ((dest|0) < (dest_end|0)) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
    }
    return ret|0;
}
function _memmove(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if (((src|0) < (dest|0)) & ((dest|0) < ((src + num)|0))) {
      // Unlikely case: Copy backwards in a safe manner
      ret = dest;
      src = (src + num)|0;
      dest = (dest + num)|0;
      while ((num|0) > 0) {
        dest = (dest - 1)|0;
        src = (src - 1)|0;
        num = (num - 1)|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      }
      dest = ret;
    } else {
      _memcpy(dest, src, num) | 0;
    }
    return dest | 0;
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
    end = (ptr + num)|0;

    value = value & 0xff;
    if ((num|0) >= 67 /* 64 bytes for an unrolled loop + 3 bytes for unaligned head*/) {
      while ((ptr&3) != 0) {
        HEAP8[((ptr)>>0)]=value;
        ptr = (ptr+1)|0;
      }

      aligned_end = (end & -4)|0;
      block_aligned_end = (aligned_end - 64)|0;
      value4 = value | (value << 8) | (value << 16) | (value << 24);

      while((ptr|0) <= (block_aligned_end|0)) {
        HEAP32[((ptr)>>2)]=value4;
        HEAP32[(((ptr)+(4))>>2)]=value4;
        HEAP32[(((ptr)+(8))>>2)]=value4;
        HEAP32[(((ptr)+(12))>>2)]=value4;
        HEAP32[(((ptr)+(16))>>2)]=value4;
        HEAP32[(((ptr)+(20))>>2)]=value4;
        HEAP32[(((ptr)+(24))>>2)]=value4;
        HEAP32[(((ptr)+(28))>>2)]=value4;
        HEAP32[(((ptr)+(32))>>2)]=value4;
        HEAP32[(((ptr)+(36))>>2)]=value4;
        HEAP32[(((ptr)+(40))>>2)]=value4;
        HEAP32[(((ptr)+(44))>>2)]=value4;
        HEAP32[(((ptr)+(48))>>2)]=value4;
        HEAP32[(((ptr)+(52))>>2)]=value4;
        HEAP32[(((ptr)+(56))>>2)]=value4;
        HEAP32[(((ptr)+(60))>>2)]=value4;
        ptr = (ptr + 64)|0;
      }

      while ((ptr|0) < (aligned_end|0) ) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    // The remaining bytes.
    while ((ptr|0) < (end|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (end-num)|0;
}
function _sbrk(increment) {
    increment = increment|0;
    var oldDynamicTop = 0;
    var oldDynamicTopOnChange = 0;
    var newDynamicTop = 0;
    var totalMemory = 0;
    increment = ((increment + 15) & -16)|0;
    oldDynamicTop = HEAP32[DYNAMICTOP_PTR>>2]|0;
    newDynamicTop = oldDynamicTop + increment | 0;

    if (((increment|0) > 0 & (newDynamicTop|0) < (oldDynamicTop|0)) // Detect and fail if we would wrap around signed 32-bit int.
      | (newDynamicTop|0) < 0) { // Also underflow, sbrk() should be able to be used to subtract.
      abortOnCannotGrowMemory()|0;
      ___setErrNo(12);
      return -1;
    }

    HEAP32[DYNAMICTOP_PTR>>2] = newDynamicTop;
    totalMemory = getTotalMemory()|0;
    if ((newDynamicTop|0) > (totalMemory|0)) {
      if ((enlargeMemory()|0) == 0) {
        HEAP32[DYNAMICTOP_PTR>>2] = oldDynamicTop;
        ___setErrNo(12);
        return -1;
      }
    }
    return oldDynamicTop|0;
}

  
function dynCall_ii(index,a1) {
  index = index|0;
  a1=a1|0;
  return FUNCTION_TABLE_ii[index&1](a1|0)|0;
}


function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return FUNCTION_TABLE_iiii[index&7](a1|0,a2|0,a3|0)|0;
}

function b0(p0) {
 p0 = p0|0; nullFunc_ii(0);return 0;
}
function b1(p0,p1,p2) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(1);return 0;
}

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_ii = [b0,___stdio_close];
var FUNCTION_TABLE_iiii = [b1,b1,___stdio_write,___stdio_seek,___stdio_read,___stdout_write,_sn_write,b1];

  return { ___errno_location: ___errno_location, ___muldi3: ___muldi3, ___udivdi3: ___udivdi3, ___uremdi3: ___uremdi3, _bitshift64Lshr: _bitshift64Lshr, _bitshift64Shl: _bitshift64Shl, _fflush: _fflush, _free: _free, _i64Add: _i64Add, _i64Subtract: _i64Subtract, _llvm_bswap_i32: _llvm_bswap_i32, _main: _main, _malloc: _malloc, _memcpy: _memcpy, _memmove: _memmove, _memset: _memset, _sbrk: _sbrk, dynCall_ii: dynCall_ii, dynCall_iiii: dynCall_iiii, establishStackSpace: establishStackSpace, getTempRet0: getTempRet0, runPostSets: runPostSets, setTempRet0: setTempRet0, setThrew: setThrew, stackAlloc: stackAlloc, stackRestore: stackRestore, stackSave: stackSave };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);

var real____errno_location = asm["___errno_location"]; asm["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____errno_location.apply(null, arguments);
};

var real____muldi3 = asm["___muldi3"]; asm["___muldi3"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____muldi3.apply(null, arguments);
};

var real____udivdi3 = asm["___udivdi3"]; asm["___udivdi3"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____udivdi3.apply(null, arguments);
};

var real____uremdi3 = asm["___uremdi3"]; asm["___uremdi3"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____uremdi3.apply(null, arguments);
};

var real__bitshift64Lshr = asm["_bitshift64Lshr"]; asm["_bitshift64Lshr"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Lshr.apply(null, arguments);
};

var real__bitshift64Shl = asm["_bitshift64Shl"]; asm["_bitshift64Shl"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Shl.apply(null, arguments);
};

var real__fflush = asm["_fflush"]; asm["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__fflush.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__free.apply(null, arguments);
};

var real__i64Add = asm["_i64Add"]; asm["_i64Add"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Add.apply(null, arguments);
};

var real__i64Subtract = asm["_i64Subtract"]; asm["_i64Subtract"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Subtract.apply(null, arguments);
};

var real__llvm_bswap_i32 = asm["_llvm_bswap_i32"]; asm["_llvm_bswap_i32"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__llvm_bswap_i32.apply(null, arguments);
};

var real__main = asm["_main"]; asm["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__main.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__malloc.apply(null, arguments);
};

var real__memmove = asm["_memmove"]; asm["_memmove"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__memmove.apply(null, arguments);
};

var real__sbrk = asm["_sbrk"]; asm["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__sbrk.apply(null, arguments);
};

var real_establishStackSpace = asm["establishStackSpace"]; asm["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_establishStackSpace.apply(null, arguments);
};

var real_getTempRet0 = asm["getTempRet0"]; asm["getTempRet0"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_getTempRet0.apply(null, arguments);
};

var real_setTempRet0 = asm["setTempRet0"]; asm["setTempRet0"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_setTempRet0.apply(null, arguments);
};

var real_setThrew = asm["setThrew"]; asm["setThrew"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_setThrew.apply(null, arguments);
};

var real_stackAlloc = asm["stackAlloc"]; asm["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackAlloc.apply(null, arguments);
};

var real_stackRestore = asm["stackRestore"]; asm["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackRestore.apply(null, arguments);
};

var real_stackSave = asm["stackSave"]; asm["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackSave.apply(null, arguments);
};
var ___errno_location = Module["___errno_location"] = asm["___errno_location"];
var ___muldi3 = Module["___muldi3"] = asm["___muldi3"];
var ___udivdi3 = Module["___udivdi3"] = asm["___udivdi3"];
var ___uremdi3 = Module["___uremdi3"] = asm["___uremdi3"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var _fflush = Module["_fflush"] = asm["_fflush"];
var _free = Module["_free"] = asm["_free"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = asm["_llvm_bswap_i32"];
var _main = Module["_main"] = asm["_main"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var _memset = Module["_memset"] = asm["_memset"];
var _sbrk = Module["_sbrk"] = asm["_sbrk"];
var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
var getTempRet0 = Module["getTempRet0"] = asm["getTempRet0"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var setTempRet0 = Module["setTempRet0"] = asm["setTempRet0"];
var setThrew = Module["setThrew"] = asm["setThrew"];
var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
var stackRestore = Module["stackRestore"] = asm["stackRestore"];
var stackSave = Module["stackSave"] = asm["stackSave"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
;



// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;

if (!Module["intArrayFromString"]) Module["intArrayFromString"] = function() { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["intArrayToString"]) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["ccall"]) Module["ccall"] = function() { abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["cwrap"]) Module["cwrap"] = function() { abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["setValue"]) Module["setValue"] = function() { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getValue"]) Module["getValue"] = function() { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocate"]) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getMemory"]) Module["getMemory"] = function() { abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["Pointer_stringify"]) Module["Pointer_stringify"] = function() { abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["AsciiToString"]) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToAscii"]) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ArrayToString"]) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ToString"]) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8Array"]) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8"]) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF16ToString"]) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF16"]) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF16"]) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF32ToString"]) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF32"]) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF32"]) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocateUTF8"]) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackTrace"]) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreRun"]) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnInit"]) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreMain"]) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnExit"]) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPostRun"]) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeStringToMemory"]) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeArrayToMemory"]) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeAsciiToMemory"]) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addRunDependency"]) Module["addRunDependency"] = function() { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["removeRunDependency"]) Module["removeRunDependency"] = function() { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS"]) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["FS_createFolder"]) Module["FS_createFolder"] = function() { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createPath"]) Module["FS_createPath"] = function() { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createDataFile"]) Module["FS_createDataFile"] = function() { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createPreloadedFile"]) Module["FS_createPreloadedFile"] = function() { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createLazyFile"]) Module["FS_createLazyFile"] = function() { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createLink"]) Module["FS_createLink"] = function() { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createDevice"]) Module["FS_createDevice"] = function() { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_unlink"]) Module["FS_unlink"] = function() { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["GL"]) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["staticAlloc"]) Module["staticAlloc"] = function() { abort("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynamicAlloc"]) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["warnOnce"]) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadDynamicLibrary"]) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadWebAssemblyModule"]) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getLEB"]) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFunctionTables"]) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["alignFunctionTables"]) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["registerFunctions"]) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addFunction"]) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["removeFunction"]) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFuncWrapper"]) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["prettyPrint"]) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["makeBigInt"]) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynCall"]) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getCompilerSetting"]) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["intArrayFromBase64"]) Module["intArrayFromBase64"] = function() { abort("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["tryParseAsDataURI"]) Module["tryParseAsDataURI"] = function() { abort("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };if (!Module["ALLOC_NORMAL"]) Object.defineProperty(Module, "ALLOC_NORMAL", { get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_STACK"]) Object.defineProperty(Module, "ALLOC_STACK", { get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_STATIC"]) Object.defineProperty(Module, "ALLOC_STATIC", { get: function() { abort("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_DYNAMIC"]) Object.defineProperty(Module, "ALLOC_DYNAMIC", { get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_NONE"]) Object.defineProperty(Module, "ALLOC_NONE", { get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });

if (memoryInitializer) {
  if (!isDataURI(memoryInitializer)) {
    if (typeof Module['locateFile'] === 'function') {
      memoryInitializer = Module['locateFile'](memoryInitializer);
    } else if (Module['memoryInitializerPrefixURL']) {
      memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
    }
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    var data = Module['readBinary'](memoryInitializer);
    HEAPU8.set(data, GLOBAL_BASE);
  } else {
    addRunDependency('memory initializer');
    var applyMemoryInitializer = function(data) {
      if (data.byteLength) data = new Uint8Array(data);
      for (var i = 0; i < data.length; i++) {
        assert(HEAPU8[GLOBAL_BASE + i] === 0, "area for memory initializer should not have been touched before it's loaded");
      }
      HEAPU8.set(data, GLOBAL_BASE);
      // Delete the typed array that contains the large blob of the memory initializer request response so that
      // we won't keep unnecessary memory lying around. However, keep the XHR object itself alive so that e.g.
      // its .status field can still be accessed later.
      if (Module['memoryInitializerRequest']) delete Module['memoryInitializerRequest'].response;
      removeRunDependency('memory initializer');
    }
    function doBrowserLoad() {
      Module['readAsync'](memoryInitializer, applyMemoryInitializer, function() {
        throw 'could not load memory initializer ' + memoryInitializer;
      });
    }
    var memoryInitializerBytes = tryParseAsDataURI(memoryInitializer);
    if (memoryInitializerBytes) {
      applyMemoryInitializer(memoryInitializerBytes.buffer);
    } else
    if (Module['memoryInitializerRequest']) {
      // a network request has already been created, just use that
      function useRequest() {
        var request = Module['memoryInitializerRequest'];
        var response = request.response;
        if (request.status !== 200 && request.status !== 0) {
          var data = tryParseAsDataURI(Module['memoryInitializerRequestURL']);
          if (data) {
            response = data.buffer;
          } else {
            // If you see this warning, the issue may be that you are using locateFile or memoryInitializerPrefixURL, and defining them in JS. That
            // means that the HTML file doesn't know about them, and when it tries to create the mem init request early, does it to the wrong place.
            // Look in your browser's devtools network console to see what's going on.
            console.warn('a problem seems to have happened with Module.memoryInitializerRequest, status: ' + request.status + ', retrying ' + memoryInitializer);
            doBrowserLoad();
            return;
          }
        }
        applyMemoryInitializer(response);
      }
      if (Module['memoryInitializerRequest'].response) {
        setTimeout(useRequest, 0); // it's already here; but, apply it asynchronously
      } else {
        Module['memoryInitializerRequest'].addEventListener('load', useRequest); // wait for it
      }
    } else {
      // fetch it from the network ourselves
      doBrowserLoad();
    }
  }
}



/**
 * @constructor
 * @extends {Error}
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  var argv = _malloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8(Module['thisProgram']);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;


  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      Module.printErr('exception thrown: ' + toLog);
      Module['quit'](1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function exit(status, implicit) {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in NO_FILESYSTEM
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var flush = FS.quit;
  if (flush) {
    var print = Module['print'];
    var printErr = Module['printErr'];
    var has = false;
    Module['print'] = Module['printErr'] = function(x) {
      has = true;
    }
    try { // it doesn't matter if it fails
      flush(0);
    } catch(e) {}
    Module['print'] = print;
    Module['printErr'] = printErr;
    if (has) {
      warnOnce('stdio streams had content in them that was not flushed. you should set NO_EXIT_RUNTIME to 0 (see the FAQ), or make sure to emit a newline when you printf etc.');
    }
  }

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && Module['noExitRuntime'] && status === 0) {
    return;
  }

  if (Module['noExitRuntime']) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      Module.printErr('exit(' + status + ') called, but NO_EXIT_RUNTIME is set, so halting execution but not exiting the runtime or preventing further async execution (build with NO_EXIT_RUNTIME=0, if you want a true shutdown)');
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;
    STACKTOP = initialStackTop;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  if (ENVIRONMENT_IS_NODE) {
    process['exit'](status);
  }
  Module['quit'](status, new ExitStatus(status));
}
Module['exit'] = exit;

var abortDecorators = [];

function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  if (what !== undefined) {
    Module.print(what);
    Module.printErr(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';
  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

Module["noExitRuntime"] = true;

run();

// {{POST_RUN_ADDITIONS}}





// {{MODULE_ADDITIONS}}



