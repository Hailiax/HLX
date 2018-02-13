## Build your own  
Compile together:  
* y.tab.c (from `yacc -d parser.y`)  
* lex.yy.c (from `lex lexer.l`)  
* includes/common.c  
* includes/hashmap.c   
* includes/vars.c  

The resulting executable will take in HeLX code via stdin and output javascript via stdout. Using `<` and `>` to redirect those might help you.
  
## Use prebuilt HeLXc  
Locate HeLXc and HeLXtoJSc at bin/  
HeLXc is a bash script that depends on HeLXtoJSc and node.
```sh
HeLXc path/to/input/file.hlx
```  
HeLXc creates a .js file with the same name as the input file using HeLXtoJSc. Then, HeLXc calls node to interpret it.  
  
## Note  
The outputted javascript is very unoptimized. I recommend using google closure compiler to clean it up. The output from this version of HeLXc isn't very human-unreadable anyways.
