#include <stdio.h>
#include "y.tab.h"

extern int yylex();
extern int column;
extern int yylineno;
extern char* yytext;

int main()
{
	for ( int token = yylex(); token; token = yylex() ){
		printf("%d ", token);
		printf(yytext);
		printf(" %d", column);
		printf("\n");
	}

	return 0;
}