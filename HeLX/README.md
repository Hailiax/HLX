## What is HeLX?
HeLX is a new language that:  
* introduces OOP without any keywords (no new, this, super, extends, class, etc)  
* introduces a new pointer model that's explicit and intuitive  
* is built only from expressions and statements (this might change as I learn LISPs)  

HeLX, once finished, will:  
* introduce a single intuitive token to unify functional programming, concurrent/async flow, and static properties (no static, async, await, etc)  
* support monads
* support optional static typing, pure functions, and constants
* compile to run on the JVM or CLR

Check it out at [hailiax.io/HeLX/](https://hailiax.io/HeLX/) (Press the arrow button in the middle to compile & run)  
That website used Emscripten to convert the compiler here (written in C) to asm.js  
Also, I plan on writing a bunch of algos (quine, sorts, etc) in HeLX to essentially prove HeLX's capabilities. (Formal proofs are beyond me at the moment.)
  
## A little background
HeLX was originally inspired by Javascript and currently compiles to it. That's why the e in HeLX stands for ECMAScript.  
After hearing some of my friends say programming looked confusing/hard over and over again, I decided I wanted to create an extremely consistent, clean, intuitive, and unified programming language. HeLX aims to remove as many keywords as possible while supporting as many programming styles as possible in the most elegant syntax ever created (shoot for the stars right? ;).  
  
## Features explained  
Below, I explain HeLX's OOP and pointer model. There are very nice examples on [hailiax.io/HeLX/](https://hailiax.io/HeLX/).  

#### Keywordless Object Oriented
* If a function doesn't return anything (void function), it returns a class instance where that function is the constructor. (replaces `new`)  
* Public variables are declared using a colon, then behave like any other regular variable. i.e. `this.x = 5` is `x: 5` in HeLX. (partially replaces `this`)  
* A new model for inheritance: you can literally add functions like adding strings in HeLX. i.e. `superclass = subclass + function`. This mix between the `super`, `extends`, and `this` keywords allows for extreme flexibility.  
* Keywords are not functions; removing them allows for better integration of functional and object-oriented programming.  

#### References (pointers)  
I named these references instead of pointers because naming them pointers would be misleading.  
* First, scalar and vector values behave the same way to the programmer. In other languages, for `A = 3; B = A` B would be a copy of A but for `A = [3]; B = A` B and A would be pointers to the same array. In HeLX, for `A = [3], B = A` B would be a new array with deep-copied values from A. (Perhaps this is ultra-call-by-value?)  
* Referencing a value requires the new `@=` operator. For `A = [3], B @= A`, B and A would now be pointers to the same array.  

While this is quite unusual, it forces the programmer to be explicit when taking the value or reference of a variable and I believe this will reduce errors.
