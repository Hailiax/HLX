%union {char* str;}

%token <str> IDENTIFIER CONSTANT STRING_LITERAL TEMPLATE_LITERAL REGEXP_LITERAL

%token INC_OP DEC_OP LEFT_OP RIGHT_OP EQ_OP NE_OP NOT_OP XOR_OP
%token AND_OP OR_OP MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN NOT_ASSIGN EXP_ASSIGN
%token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN
%token XOR_ASSIGN OR_ASSIGN TYPE_NAME

%token CASE DEFAULT IF ELSE SWITCH WHILE DO FOR CONTINUE BREAK RETURN
%token TRY CATCH FINALLY THROW DEBUGGER DELETE IMPORT IN OF INSTANCEOF NEW TYPEOF
%token ELLIPSIS MINI_ELLIPSIS ARROW_FUNC REV_ARROW BIND_OP TYPE_DEC HLX
 
%type <str> declaration_list function_literal primary_expression prefix_operator assignment_operator compound_statement statement_list statement expression_statement labeled_statement selection_statement iteration_statement jump_statement declaration declarator assignment_expression constant_expression logical_or_expression logical_and_expression inclusive_or_expression exclusive_or_expression and_expression equality_expression relational_expression shift_expression additive_expression multiplicative_expression unary_expression postfix_expression expression argument_expression_list

%start compound_statement

%{
#include <stdio.h>
#include <string.h>
void yyerror (char *s);
int yylex();
char* cat(char* a, char* b);
char* dec(char *name);
%}

%%
// differentiate hello[world] and hello [world] space makes a diff. Autoclose statement blocks
compound_statement
	: HLX ',' statement_list											{printf("\n%s\n",$3);}
	| '\t' statement_list '\b'											{$$ = $2;}
	;
statement_list
	: statement															{;}
	| statement_list statement											{$$ = cat($1,$2);}
	;
statement													
	: labeled_statement													{;}
	| compound_statement												{;}
	| expression_statement												{;}
	| selection_statement												{;}
	| iteration_statement												{;}
	| jump_statement													{;}
	;
expression_statement
	: ','																{$$ = ";";}
	| expression ','													{$$ = cat($1,";");}
	| declaration ','													{$$ = cat($1,";");}
	;
labeled_statement
	: CASE constant_expression ',' statement							{$$ = cat(cat(cat("case ",$2),":"),$4);}
	| DEFAULT ',' statement												{$$ = cat("default:",$3);}
	;
selection_statement													
	: IF expression ',' statement										{$$ = cat(cat(cat(cat("if(",$2),"){"),$4),"}");}
	| IF expression ',' statement ELSE selection_statement				{$$ = cat(cat(cat(cat(cat("if(",$2),"){"),$4),"}else "),$6);}
	| IF expression ',' statement ELSE ',' statement					{$$ = cat(cat(cat(cat(cat(cat("if(",$2),"){"),$4),"}else{"),$7),"}");}
	| SWITCH expression ',' statement									{$$ = cat(cat(cat(cat("switch(",$2),"){"),$4),"}");}
	;
iteration_statement													
	: WHILE expression ',' statement									{$$ = cat(cat(cat(cat("while(",$2),"){"),$4),"}");}
	| DO ',' statement WHILE expression ','								{$$ = cat(cat(cat(cat("do{",$3),"}while("),$5),");");}
	| FOR IDENTIFIER IN primary_expression ',' statement				{$$ = cat(cat(cat(cat(cat(cat("for(let ",$2)," in "),$4),"){"),$6),"}");}
	| FOR IDENTIFIER OF primary_expression ',' statement				{$$ = cat(cat(cat(cat(cat(cat("for(let ",$2)," of "),$4),"){"),$6),"}");}
	| FOR declaration ';' expression ';' expression ',' statement		{$$ = cat(cat(cat(cat(cat(cat(cat(cat("for(",$2),";"),$4),";"),$6),"){"),$8),"}");}
	;													
jump_statement
	: CONTINUE ','														{$$ = "continue;";}
	| BREAK ','															{$$ = "break;";}
	| RETURN ','														{$$ = "return;";}
	| RETURN expression ','												{$$ = cat(cat("return ",$2),";");}
	;

function_literal
	: '(' declaration_list ')' ARROW_FUNC ',' compound_statement		{$$ = cat(cat(cat(cat("function(",$2),"){"),$6),"}");}
	| '(' declaration_list ')' ARROW_FUNC expression 					{$$ = cat(cat(cat(cat("function(",$2),"){return "),$5),";}");}
	| '(' ')' ARROW_FUNC ',' compound_statement							{$$ = cat(cat("function(){",$5),"}");}
	| '(' ')' ARROW_FUNC expression 									{$$ = cat(cat("function(){return ",$4),";}");}
	;

declaration_list
	: declaration														{;}
	| declaration_list declaration										{$$ = cat(cat($1,","),$2);}
	;

// Eliminate reduce reduce by making declarations expressions. Declarators problematic anyways
declaration
	: IDENTIFIER
	| declarator '=' assignment_expression								{$$ = cat(cat(cat(dec($1),$1),"="),$3);}
	| declarator ':' assignment_expression								{$$ = cat(cat(cat("this.",$1),"="),$3);}
	;

declarator
	: IDENTIFIER														{;}
	| declarator '[' expression ']'										{$$ = cat(cat(cat($1,"["),$3),"]");}
	;

assignment_expression
	: constant_expression												{;}
	| unary_expression assignment_operator assignment_expression		{$$ = cat(cat($1,$2),$3);}
	;

expression
	: assignment_expression												{;}
	| expression assignment_expression									{$$ = cat($1,$2);}
	;

constant_expression	
	: logical_or_expression												{;}
	| logical_or_expression '?' expression ',' constant_expression		{$$ = cat(cat(cat(cat($1,"?"),$3 ),":"),$5);}
// !!!!!!!!!!!!!!!!!!!!!!! Needs better line break-indented syntax
	;
logical_or_expression					
	: logical_and_expression											{;}
	| logical_or_expression OR_OP logical_and_expression				{$$ = cat( cat($1,"||"), $3 );}
	;
logical_and_expression					
	: inclusive_or_expression											{;}
	| logical_and_expression AND_OP inclusive_or_expression				{$$ = cat( cat($1,"&&"), $3 );}
	;
inclusive_or_expression					
	: exclusive_or_expression											{;}
	| inclusive_or_expression '|' exclusive_or_expression				{$$ = cat( cat($1,"|"), $3 );}
	;
exclusive_or_expression					
	: and_expression													{;}
	| exclusive_or_expression XOR_OP and_expression						{$$ = cat( cat($1,"^"), $3 );}
	;
and_expression					
	: equality_expression												{;}
	| and_expression '&' equality_expression							{$$ = cat( cat($1,"&"), $3 );}
	;
equality_expression					
	: relational_expression												{;}
	| equality_expression EQ_OP relational_expression					{$$ = cat( cat($1,"==="), $3 );}
	| equality_expression NE_OP relational_expression					{$$ = cat( cat($1,"!=="), $3 );}
	;
relational_expression					
	: shift_expression													{;}
	| relational_expression '<' shift_expression						{$$ = cat( cat($1,"<"), $3 );}
	| relational_expression '>' shift_expression						{$$ = cat( cat($1,">"), $3 );}
	;
shift_expression					
	: additive_expression												{;}
	| shift_expression LEFT_OP additive_expression						{$$ = cat( cat($1,"<<"), $3 );}
	| shift_expression RIGHT_OP additive_expression						{$$ = cat( cat($1,">>"), $3 );}
	;
additive_expression					
	: multiplicative_expression											{;}
	| additive_expression '+' multiplicative_expression					{$$ = cat( cat($1,"+"), $3 );}
	| additive_expression '-' multiplicative_expression					{$$ = cat( cat($1,"-"), $3 );}
	;
multiplicative_expression					
	: unary_expression													{;}
	| multiplicative_expression '*' unary_expression					{$$ = cat( cat($1,"*"), $3 );}
	| multiplicative_expression '/' unary_expression					{$$ = cat( cat($1,"/"), $3 );}
	| multiplicative_expression '^' unary_expression					{$$ = cat( cat($1,"**"), $3 );}
	| multiplicative_expression '%' unary_expression					{$$ = cat( cat($1,"%"), $3 );}
	;
unary_expression					
	: postfix_expression												{;}
	| INC_OP unary_expression											{$$ = cat("++",$2);}
	| DEC_OP unary_expression											{$$ = cat("--",$2);}
	| prefix_operator unary_expression									{$$ = cat($1,$2);}
	;
postfix_expression					
	: primary_expression												{;}
	| postfix_expression '[' expression ']'								{$$ = cat(cat(cat($1,"["),$3),"]");}
	| postfix_expression '(' ')'										{$$ = cat($1,"()");}
	| postfix_expression '(' argument_expression_list ')'				{$$ = cat(cat(cat($1,"("),$3),")");}
	| postfix_expression '.' IDENTIFIER									{$$ = cat(cat($1,"."),$3);}
	| postfix_expression INC_OP											{$$ = cat($1,"++");}
	| postfix_expression DEC_OP											{$$ = cat($1,"--");;}
	;
primary_expression
	: declarator														{;}
	| CONSTANT															{;}
	| STRING_LITERAL													{$$ = cat(cat("'",$1),"'");}
	| TEMPLATE_LITERAL													{$$ = cat(cat("`",$1),"`");}
	| REGEXP_LITERAL													{$$ = cat(cat("/",$1),"/");}
	| function_literal													{;}
	| '[' argument_expression_list ']' 									{$$ = cat(cat("[",$2),"]");}
	| '{' expression '}'												{$$ = cat(cat("(",$2),")");}
	;

argument_expression_list					
	: assignment_expression												{;}
	| argument_expression_list assignment_expression					{$$ = cat(cat($1,","),$2);}
	;

prefix_operator
	: '+'																{$$ = "+";}
	| '-'																{$$ = "-";}
	| '!'																{$$ = "!";}
	| NOT_OP															{$$ = "~";}
	;
assignment_operator													
	: '='																{$$ = "=";}
	| EXP_ASSIGN														{$$ = "**=";}
	| MUL_ASSIGN														{$$ = "*=";}
	| DIV_ASSIGN														{$$ = "/=";}
	| MOD_ASSIGN														{$$ = "%=";}
	| ADD_ASSIGN														{$$ = "+=";}
	| SUB_ASSIGN														{$$ = "-=";}
	| LEFT_ASSIGN														{$$ = "<<=";}
	| RIGHT_ASSIGN														{$$ = ">>=";}
	| AND_ASSIGN														{$$ = "&=";}
	| XOR_ASSIGN														{$$ = "^=";}
	| OR_ASSIGN															{$$ = "|=";}
	| NOT_ASSIGN														{$$ = "!=";}
	;

%%
extern char yytext[];
extern int column;

char* cat(char *a, char *b){
	char *c = (char *) malloc(1 +sizeof(char*) * (strlen(a)+ strlen(b)));
	strcpy(c, a);
	strcat(c, b);
	return c;
}

char* dec(char *name){
	return "";
}

void yyerror(char *s){
	fflush(stdout);
	printf("\n%s\n", s);
}

int main(){
	return yyparse();
}
