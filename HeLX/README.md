## What is HeLX?
HeLX is a new high-level language that introduces:  
* OOP without any keywords (no new, this, super, extends, class, etc)  
* a new pointer model that's explicit and intuitive  
* a completly new insanely minimal, clean, flexible, and intuitive syntax  

HeLX, once finished, might:  
* add `goto` statements
* include JS-esque built-in libraries
* introduce a single intuitive token to unify functional programming, concurrent/async flow, and static properties (no static, async, await, etc) (actually, there's probably a better way to do this)  
* support monads
* support optional static typing, pure functions, and constants beautifully
* compile to run on the JVM or CLR

Check it out at [hailiax.io/HeLX/](https://hailiax.io/HeLX/) (Press the arrow button in the middle to compile & run)  
That website used Emscripten to convert the compiler here (written in C) to asm.js  
Also, I plan on writing a bunch of algos (quine, sorts, etc) in HeLX to essentially prove HeLX's capabilities. (Formal proofs are beyond me at the moment.)
  
## A little background
HeLX was originally inspired by Javascript and currently compiles to it. That's why the e in HeLX stands for ECMAScript. HeLX also has taken inspiration from Haskell, Python, Scheme & Clojure, C, and Java.  
  
After hearing some of my friends say programming looked confusing/hard over and over again, I decided I wanted to create an extremely consistent, clean, intuitive, and unified programming language. HeLX aims to remove as many keywords as possible while supporting as many programming styles as possible in the most elegant syntax ever created (shoot for the stars right? ;).  
  
## Features explained  
Below, I explain HeLX's major features. There are very nice examples on [hailiax.io/HeLX/](https://hailiax.io/HeLX/).  

#### KOOP: Keywordless object oriented
* If a function doesn't return anything, it returns a class instance where that function is the constructor. Can also be thought of as all functions return class instances but a return statement overrides that. (replaces `new`)  
* Public variables are declared using a colon, then behave like any other regular variable. i.e. `this.x = 5` is `x: 5` in HeLX. (partially replaces `this`)  
* A new model for inheritance: you can literally add functions like adding strings in HeLX. i.e. `superclass = subclass + function`. This mix between the `super`, `extends`, and `this` keywords allows for extreme flexibility.  
* Keywords are not functions; removing them allows for better integration of functional and object-oriented programming.  

#### @ References: intuitive pointers  
I named these references instead of pointers because naming them pointers would be misleading.  
* First, scalar and vector values behave the same way to the programmer. In other languages, for `A = 3; B = A` B would be a copy of A but for `A = [3]; B = A` B and A would be pointers to the same array. In HeLX, for `A = [3], B = A` B would be a new array with deep-copied values from A. (Perhaps this is ultra-call-by-value?)  
* Referencing a value requires the new `@=` operator. For `A = [3], B @= A`, B and A would now point to the same array. 

While this is quite unusual, it forces the programmer to be explicit when taking the value or reference of a variable and I believe this will reduce errors.

#### Magic syntax: human-friendly grammar  
This language is heavily designed around infix operators – the lack of which is equivalent to a semicolon or comma in older languages. This means that this language, while having no semicolons or commas, can still chain statements in the same line or other creative ways. (`a = 3 func.() b = a + 3` is valid HeLX while `a = 3 func() b = a + 3` is not valid python.) This is so minimal that a visible whitespace (comma) was introduced for readability. Note: the dot operator is used more often in HeLX than other languages, but is often used in place of where a space would have been used.  

Commans and all other whitespace are insignificant except *some* newlines followed by a group of tabs (or no tabs) not followed by another newline. These are used to end if/switch/for/etc statements.  

Finally, old conventions were changed. Bitwise operators are now $&, $|, $^, $!, $<, $>, $% (zero-fill right shift), logical and/or are `&`/`|`, exponent operator is `^`. System constants are also changed: `0t` is true, `0f` is false, `0n` is null, `0u` is undefined, `0i` is Infinity, `0l` is epsilon (limit), `0v` is NotANumber (think of it as void). A new ternary assign is introduced `a ?= b` (if `a` evals to `0f`/`0u`/`0n`/etc, it is set to `b`).  

All loops now use `for`. `for <bool> <statements>` acts like a `while(<bool>){<statements>}` loop, `for to <bool> <statements>` acts like a `do{<statements>}while(<bool>)` loop, `for <statement> to <bool> <statements>` acts like a post-check `for(<statement>;<bool>;){<statements>}`, `for <variable> in <iteratable>` assigns the index of each element to the variable, `for <variable> of <iteratable>` assigns the value of each element to the variable, `for <variable> at <iteratable>` assigns the reference of each element to the variable

Array indicies will start at one now to prevent off by one errors. i.e. `arr.[1]` is the first element in `arr`, `arr.[-2]` is the second to last element, and `arr.[0]` returns the length of the array.  

Finally, square brackets `[]` are used exclusivly for arrays, parentheeses `()` are used exclusivly for functions, are curly brackets `{}` are used exclusivly for evaluations.
