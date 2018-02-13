## What
HeLX is a new language that:  
* introduces OOP without any keywords (no new, this, super, extends, class, etc)  
* introduces a new pointer model that's explicit and intuitive  
* is built only from expressions and statements (this might change as I learn LISPs)  

HeLX, once finished, will:  
* introduce a single intuitive token to unify functional programming, concurrent/async flow, and static properties (no static, async, await, etc)  
* support monads
* support optional static typing, pure functions, and constants
* compile to run on the JVM or CLR

Check it out at [hailiax.io/HeLX/](https://hailiax.io/HeLX/)  
That website used Emscripten to convert the compiler here (written in C) to asm.js  
Also, I plan on writing a bunch of algos (quine, sorts, etc) in HeLX to essentially prove HeLX's capabilities. (Formal proofs are beyond me at the moment.)
  
## Why
HeLX was originally inspired by Javascript and currently compiles to it. That's why the e in HeLX stands for ECMAScript.  
After hearing some of my friends say programming looked confusing/hard over and over again, I decided I wanted to create an extremely consistent, clean, intuitive, and unified programming language. HeLX aims to remove as many keywords as possible while supporting as many programming styles as possible in the most elegant syntax ever created (shoot for the stars right? ;).  
  
## How  
Below, I explain HeLX's OOP and pointer model. However, looking at the examples on [hailiax.io/HeLX/](https://hailiax.io/HeLX/) may be more useful.
#### Keywordless Object Oriented
I'm aware this sounds ridiculous but hear me out. I believe HeLX's implementation is truly more intuitive and powerful than current OOP models.  
* In other languages, objects are typically created using `new` on a class/function/etc. In HeLX, objects are created by simply calling a function that doesn't return anything. In other words `thisFunctionReturnsSomething()` behaves normally but `thisFunctionDoesntReturn()` is basically `new thisFunctionDoesntReturn()`  
* In other languages, public variables look like `this.pubVar = 5` but in HeLX, public variables look like `pubVar: 5`. The equals sign is just replaced by a colon for public variables. This has the added benefit of proper scoping and disallowing public and private variables that the same name.  
* HeLX implements inheritance in two ways. First, you can add functions just like you can add strings. For example, `subclass = superclass + FUNCTION_LITERAL`. The eqivalent of calling super midway through a subclass constructor would be `subclass = FUNCTION_LITERAL + superclass + FUNCTION_LITERAL`. (Adding functions is kinda similar to `extends`. I call this concatenated functional inheritance.)  
* The second way is more normal. `subclass = function{ super = superclass() }`. (HeLX syntax doesn't look like that. I call this encapsulated functional inheritance)  

Since you can add functions and strings, HeLX also allows you to add arrays and objects. I think being able to plainly add first-class functions opens up a lot of flexibility. In addition, since keywords are not functions, removing them makes integrating OOP and FP easier. (functional programming features aren't done yet though)  

#### References (pointers)  
I named these references instead of pointers because naming them pointers would be misleading.  
* First, scalar and vector values behave the same way to the programmer. In other languages, for `A = 3; B = A` B would be a copy of A but for `A = [3]; B = A` B and A would be pointers to the same array. In HeLX, for `A = [3], B = A` B would be a new array with deep-copied values from A. (Perhaps this is ultra-call-by-value?)  
* Referencing a value requires the new `@=` operator. For `A = [3], B @= A`, B and A would now be pointers to the same array.  
While this is quite unusual, it forces the programmer to be explicit when taking the value or reference of a variable and I believe this will reduce errors.
