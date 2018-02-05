HeLX is a dynamically typed, object-oriented, and functional language that's optionally statically typed and/or purely functional with a new pointer, concurrency, and inheritance model.  
Check it out at [hailiax.io/HeLX/](https://hailiax.io/HeLX/)  
That website used Emscripten to convert the compiler here (written in C) to asm.js
  
This language was originally inspired by Javascript. (The e in HeLX stands for ECMAScript)  
I thought that there were a few things under the hood that should be explicit while some other featues (like prototypes) should have been abstracted out. In addition, I felt the syntax was a little inconsistent and could be cleaned up.  
The goal of this language was to create a language easier to learn than JS and cleaner than Python. (I got annoyed at some of my friends saying programming looked really hard and confusing so I asked what would make a clean, easy language)  
  
Current major features:  
* References (intuitive but slower pointers)  
* The fact this works :D  
* The language has been reduced to simple expressions and statements. (only first class functions and no class decs)  
  
Planned major features:  
* Intuitive OOP (compiles to prototypes in JS)  
* Functional (w/ monads) and concurrent programming (compiles to WebWorkers in JS)  
* Optional static typing, pure funcs & immutable objs, operator overloading, assertions, etc  
* Compiler to JVM and/or CLR (compiles to JS currently because I did not think I was ready for bytecode yet; HeLX was the first thing I've ever written in C)  
* I'll practice some symbolic languages
  
Note:  
After experimenting with other languages, I had realized that HeLX was beginning to look like a lisp so I will need time to think about and reconsider HeLX.
