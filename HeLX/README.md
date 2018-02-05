Experiment in programming languages.  
Check it out at [hailiax.io/HeLX/](https://hailiax.io/HeLX/)
  
This language was originally inspired by Javascript. (The e in HeLX stands for ECMAScript)  
I thought that there were a few things under the hood that should be explicit while some other featues (like prototypes) that should have been abstracted. In addition, I felt the syntax was a little inconsistent and could be cleaned up.  
The goal of this language was to create a language easier to learn than JS and cleaner than Python. (I got annoyed at some of my friends saying programming looked really hard and confusing so I asked what would make a clean, easy language)  
  
Current major features:  
* References (intuitive but slower pointers)  
* The fact this works  
* The language has been reduced to simple expressions and statements. (only first class functions and no class decs)  
  
Planned major features:  
* Intuitive OOP (compiles to prototypes in JS)  
* Functional (w/ monads) and concurrent programming (compiles to WebWorkers in JS)  
* Optional static typing, pure funcs & immutable objs, operator overloading, assertions, etc  
* Compiler to JVM and/or CLR  
* Symbolic programming of some sort? I have no clue how I will implement this right now.
  
Note:  
After experimenting with other languages, I had realized that HeLX was beginning to look like a lisp so I will need time to think about and reconsider HeLX.
