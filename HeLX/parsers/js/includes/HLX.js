/***************************
* At the beginning of file *
***************************/

try{global}catch(e){var global=window}
$$ = function(o){this.$ = [o];};
$v = function(o){return new $$(o);}
// $f is reserved for for-loops

// Bridge commonJS to HLX
var JS = new $$(function(str){
	function wrap(obj){
		if (obj !== null && (typeof obj === 'object' || typeof obj === 'function')){
			for (var i in obj){
				obj[i] = wrap(obj[i]);
			}
		}
		return new $$(obj);
	}
	return wrap(eval(str.$[0]));
});
var HLX = function(obj){
	if (obj instanceof $$){
		obj = obj.$[0];
	}
	if (obj !== null && (typeof obj === 'object' || typeof obj === 'function')){
		for (var i in obj){
			obj[i] = HLX(obj[i]);
		}
	}
	return obj;
};

function wrap(obj){
	for (i of Object.getOwnPropertyNames(obj)){
		console.log(i);
		if (typeof obj[i] === 'function'){
			obj[i] = function(){
				for (j in arguments){
					arguments[j] = wrap(arguments[j]);
				}
				return obj[i].apply(arguments);
			}
		} else if (typeof obj[i] === 'object'){
			obj[i] = wrap(obj[i]);
		}
	}
	return $v(obj);
}
Array = wrap(Array);

// Clone
$c = function(o,force){
	var f;
	if (Array.isArray(o)){
		f = o.slice();
	} else if (typeof o === 'object' && o !== null){
		if (o instanceof $$ && !force){
			f = o;
		} else{
			f = Object.assign( Object.create(Object.getPrototypeOf(o)), o );
		}
	} else{
		return o;
	}
	for (var prop in o){
		f[prop] = $c(o[prop],force);
	}
	return f;
};

// Equals operator
$e = function(a,b){
	// Maybe check if prototypes are equal
	if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null || typeof a === 'function' && typeof b === 'function'){
		for (var prop in a){
			if (Object.keys(a).length !== Object.keys(b).length){
				return false;
			}
			if (!$e(a[prop],b[prop])){
				return false;
			}
		}
		return true;
	} else{
		return a === b;
	}
};
// Addition operator
$a = function(a,b){
	// Check for dupe prototypes
	// Instanceof not preserved for function adding and the 2nd arg of $p
	if (Array.isArray(a) && Array.isArray(b)){
		return a.concat(b);
	} else if (typeof a === 'object' && typeof b === 'object'){
		if (a === null){ return b; }
		if (b === null){ return a; }
		return Object.assign(
			$p(
				Object.getPrototypeOf(a),
				Object.getPrototypeOf(b)
			),
			a,
			b
		);
	} else if (typeof a === 'function' && typeof b === 'function'){
		return function(){
			var _ = {};
			a.apply(_, arguments);
			var $ = Object.assign(
				$p(
					a.prototype,
					b.prototype
				),
				_
			);
			b.apply($, arguments);
			return $;
		};
	} else{
		return a + b;
	}
};
// Array index interpretation
$i = function(a,i){
	if (i === 0){
		return $v(a.length);
	} else if (i < 0){
		return a[a.length+i];
	} else{
		return a[i-1]
	}
}
// Generate range
$r = function(a,b){
	var out = [];
	if (a < b){
		while (a <= b){
			out.push($v(a++));
		}
	} else{
		while (a >= b){
			out.push($v(a--));
		}
	}
	return out;
};

// Chain prototypes
$p = function(base, adj){
	var $ = $c(adj);
	Object.setPrototypeOf($, base);
	return Object.create($);
};
// Ensure value is wrapped
$w = function(o){
	return o instanceof $$? o : new $$(o);
};
HLX.isFloat = function(n){return n === +n && n !== (n|0);}
HLX.isInt = function(n){return n === +n && n === (n|0);}
var print = new $$(function (){
	var s = [].slice.call( arguments ).map( function(x){return HLX($c(x,true));} );
	console.log.apply(null,s); return s;
});

/****************************
* At the beginning of funcs *
****************************/

'use strict';
for (let i in this==global?undefined:this){
	eval('var '+i+'=this.'+i);
}


/******************
* In worker files *
******************/

function GET(loc){ 'use strict';
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', loc, false);
	xhttp.send();
	return xhttp.responseText;
}
function POST(loc, data){ 'use strict';
	xhttp.open('POST', loc, false);
	for (let i = 2; i < arguments.length; i++){ xhttp.setRequestHeader(arguments[i].substr(0,arguments[i].indexOf(': ')), arguments[i].substr(arguments[i].indexOf(': ')+1)); }
	xhttp.send(data);
	return xhttp.responseText;
}
HLX.workers.start('test','3*3');
HLX.workers.list['test'].onmessage = function(e){
	console.log(e.data);
}
console.log(1);
GET('http://www.fakeresponse.com/api/?sleep=3');
console.log(2);