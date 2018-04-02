%{

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "includes/hashmap.h"
#include "includes/vars.h"
#include "includes/common.h"

void yyerror (char *s);
int yylex();

void new_HLX();

%}

%union {
	struct {
		char* s;
		llnode* v;
	} data;
}
%token <data> IDENTIFIER NUMBER STRING_LITERAL TEMPLATE_LITERAL REGEXP_LITERAL
%token NUL UNDEFINED TRU FALS INFINITY NOTNUMBER EPSILON

%token INC_OP DEC_OP LEFT_OP RIGHT_OP ZRIGHT_OP EQ_OP NE_OP LE_OP GE_OP NOT_OP XOR_OP AND_OP OR_OP
%token MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN EXP_ASSIGN TERN_ASSIGN PTR_ASSIGN CONST_ASSIGN
%token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN ZRIGHT_ASSIGN AND_ASSIGN XOR_ASSIGN OR_ASSIGN

%token CASE DEFAULT IF ELSE ELSEIF SWITCH CONTINUE BREAK RETURN RETURN_NOTHING FOR CNCRNT_FOR
%token TRY CATCH THROW DELETE IMPORT INSTANCEOF TYPEOF TO IN OF AT
%token ELLIPSIS ASSERT HLX FROM_HLX FUNC FUNC_1VAR END_STMT

%type <data> range exponentiation_expression else_statement try_statement throw_statement bind_expression translation_unit function_literal primary_expression assign_operator statement_block statement_list statement labeled_statement switch_statement if_statement iteration_statement jump_statement logical_or_expression logical_and_expression inclusive_or_expression exclusive_or_expression and_expression equality_expression relational_expression shift_expression additive_expression multiplicative_expression unary_expression postfix_expression expression identifier_list expression_list

%start translation_unit

%%

translation_unit
	: HLX statement_list											{$$.s = cat(end_scope($2.v,0),$2.s); printf("%s\n",$$.s); new_HLX();}
	| translation_unit HLX statement_list							{$$.s = cat(end_scope($3.v,0),$3.s); printf("%s\n",$$.s); new_HLX();}
	;

/************* Todo: fix adding more than 2 funcs, charAt and other JS methods, add $ in front of vars, assertions, # notation, ~ notation, ternary statement, imports exports HLX acts as separate file DocsJS = import '../dep/docs.js', macros?
* Statements *
*************/

statement_block
	: END_STMT														{;}
	| statement_list END_STMT										{$$.s = $1.s;}
	;

statement_list
	: statement														{;}
	| statement_list statement										{$$.s = cat($1.s,$2.s); $$.v = llcat($1.v,$2.v);}
	;

statement
	: expression													{$$.s = cat($1.s,";");}
	| labeled_statement												{;}
	| if_statement													{$$.s = cat(cat(cat("{",end_scope($1.v,0)),$1.s),"}"); $$.v = NULL;}
	| else_statement												{$$.s = cat(cat(cat("{",end_scope($1.v,0)),$1.s),"}"); $$.v = NULL;}
	| switch_statement												{$$.s = cat(cat(cat("{",end_scope($1.v,0)),$1.s),"}"); $$.v = NULL;}
	| iteration_statement											{$$.s = cat(cat(cat("{",end_scope($1.v,0)),$1.s),"}"); $$.v = NULL;}
	| try_statement													{;}
	| throw_statement												{;}
	| jump_statement												{;}
	;

else_statement
	: if_statement ELSE statement_block								{$$.s = cat(cat(cat($1.s,"else{"),cat(end_scope($3.v,0),$3.s)),"}");}
	;

if_statement
	: IF expression statement_block									{$$.s = cat(cat(cat(cat("if(",$2.s),".$[0]){"),cat(end_scope($3.v,0),$3.s)),"}"); $$.v = $2.v;}
	| if_statement ELSEIF expression statement_block				{$$.s = cat(cat(cat(cat(cat($1.s,"else if("),$3.s),".$[0]){"),cat(end_scope($4.v,0),$4.s)),"}"); $$.v = llcat($1.v,$3.v);}
	;

switch_statement
	: SWITCH expression statement_block								{$$.s = cat(cat(cat(cat("switch(",$2.s),".$[0]){"),$3.s),"}"); $$.v = llcat($2.v,$3.v);}
	;

labeled_statement
	: CASE expression statement_block								{$$.s = cat(cat(cat("case ",$2.s),".$[0]:"),cat(end_scope($3.v,0),$3.s)); $$.v = $2.v;}
	| DEFAULT statement_block										{$$.s = cat("default:",cat(end_scope($2.v,0),$2.s));}
	;

iteration_statement
	: FOR expression statement_block								{$$.s = cat(cat(cat(cat("while(",$2.s),".$[0]){"),cat(end_scope($3.v,0),$3.s)),"}"); $$.v = $2.v;}
	| FOR TO expression statement_block								{$$.s = cat(cat(cat(cat("do{",cat(end_scope($4.v,0),$4.s)),"}while("),$3.s),".$[0])"); $$.v = $3.v;}
	| FOR expression TO expression statement_block					{$$.s = cat(cat(cat(cat(cat($2.s,";do{"),cat(end_scope($5.v,0),$5.s)),"}while("),$4.s),".$[0])"); $$.v = llcat($2.v,$4.v);}
	| FOR IDENTIFIER IN expression statement_block					{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = NULL; $$.s = cat(cat(cat(cat(cat(cat("for(let ",$2.s)," in "),$4.s),".$[0]){"),cat(end_scope($5.v,tmp),$5.s)),"}"); $$.v = $4.v;}
	| FOR IDENTIFIER OF expression statement_block					{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = NULL; $$.s = cat(cat(cat(cat(cat(cat("for(let ",$2.s)," of $c("),$4.s),".$[0],true)){"),cat(end_scope($5.v,tmp),$5.s)),"}"); $$.v = $4.v;}
	| FOR IDENTIFIER AT expression statement_block					{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = NULL; $$.s = cat(cat(cat(cat(cat(cat("for(let ",$2.s)," of "),$4.s),".$[0]){"),cat(end_scope($5.v,tmp),$5.s)),"}"); $$.v = $4.v;}
	;

try_statement
	: TRY statement_block											{$$.s = cat(cat("try{",cat(end_scope($2.v,0),$2.s)),"}catch($$){}");}
	| TRY statement_block CATCH statement_block						{llnode* tmp = malloc(sizeof(llnode)); tmp->val = "$$"; tmp->next = NULL; $$.s = cat(cat(cat(cat("try{",cat(end_scope($2.v,0),$2.s)),"}catch($$){"),cat(end_scope($4.v,tmp),$4.s)),"}");}
	;

throw_statement
	: THROW expression												{$$.s = cat(cat("throw ",$2.s),".$[0]"); $$.v = $2.v;}
	;

jump_statement
	: CONTINUE														{$$.s = "continue;";}
	| BREAK															{$$.s = "break;";}
	| RETURN_NOTHING												{$$.s = "return;";}
	| RETURN expression												{$$.s = cat(cat("return ",$2.s),";"); $$.v = $2.v;}
	;

/**************
* Expressions *
**************/

expression
	: logical_or_expression											{;}
	| logical_or_expression '=' expression							{var_declare($1.s,&$1.v,1); $$.s = cat(cat(cat(cat(cat(cat("(",$1.s),".$[0]=$c("),$3.s),").$[0],"),$1.s),")"); $$.v = llcat($1.v,$3.v);}
	| logical_or_expression PTR_ASSIGN expression					{var_declare($1.s,&$1.v,1); $$.s = cat(cat(cat(cat(cat(cat("(",$1.s),".$="),$3.s),".$,"),$1.s),")"); $$.v = llcat($1.v,$3.v);}
	| logical_or_expression ':' expression							{var_declare($1.s,&$1.v,1); $$.s = cat(cat(cat(cat(cat(cat("(",cat(cat(cat(cat(cat(cat("(",$1.s),".$[0]=$c("),$3.s),").$[0],"),$1.s),")")),",this."),$1.s),"="),$1.s),")"); $$.v = llcat($1.v,$3.v);}
	| logical_or_expression assign_operator expression				{$$.s = cat(cat(cat(cat(cat(cat(cat("(",$1.s),".$[0]"),$2.s),$3.s),".$[0],"),$1.s),")"); $$.v = llcat($1.v,$3.v);}
	| logical_or_expression ADD_ASSIGN expression					{$$.s = cat(cat(cat(cat(cat($1.s,"=$v($a("),$1.s),".$[0],"),$3.s),".$[0]))"); $$.v = llcat($1.v,$3.v);}
	| logical_or_expression TERN_ASSIGN expression					{$$.s = cat(cat(cat(cat(cat(cat($1.s,"=$w("),$1.s),").$[0]?"),$1.s),":"),$3.s); $$.v = llcat($1.v,$3.v);}
	;

logical_or_expression
	: logical_and_expression										{;}
	| logical_or_expression '|' logical_and_expression				{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]||"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

logical_and_expression
	: inclusive_or_expression										{;}
	| logical_and_expression '&' inclusive_or_expression			{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]&&"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

inclusive_or_expression
	: exclusive_or_expression										{;}
	| inclusive_or_expression OR_OP exclusive_or_expression			{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]|"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

exclusive_or_expression
	: and_expression												{;}
	| exclusive_or_expression XOR_OP and_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]^"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

and_expression
	: equality_expression											{;}
	| and_expression AND_OP equality_expression						{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]&"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

equality_expression
	: relational_expression											{;}
	| equality_expression EQ_OP relational_expression				{$$.s = cat(cat(cat(cat("$v($e(",$1.s),".$[0],"),$3.s),".$[0]))"); $$.v = llcat($1.v,$3.v);}
	| equality_expression NE_OP relational_expression				{$$.s = cat(cat(cat(cat("$v(!$e(",$1.s),".$[0],"),$3.s),".$[0]))"); $$.v = llcat($1.v,$3.v);}
	;

relational_expression
	: shift_expression												{;}
	| relational_expression '<' shift_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]<"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| relational_expression '>' shift_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]>"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| relational_expression LE_OP shift_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]<="),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| relational_expression GE_OP shift_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]>="),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

shift_expression
	: additive_expression											{;}
	| shift_expression LEFT_OP additive_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]<<"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| shift_expression RIGHT_OP additive_expression					{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]>>"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| shift_expression ZRIGHT_OP additive_expression				{$$.s = cat(cat(cat(cat("[",$1.s),".$[0]>>>"),$3.s),".$[0]]"); $$.v = llcat($1.v,$3.v);}
	;

additive_expression
	: multiplicative_expression										{;}
	| additive_expression '+' multiplicative_expression				{$$.s = cat(cat(cat(cat("$v($a(",$1.s),".$[0],"),$3.s),".$[0]))"); $$.v = llcat($1.v,$3.v);}
	| additive_expression '-' multiplicative_expression				{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]-"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}

multiplicative_expression
	: exponentiation_expression										{;}
	| multiplicative_expression '*' exponentiation_expression		{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]*"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| multiplicative_expression '/' exponentiation_expression		{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]/"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	| multiplicative_expression '%' exponentiation_expression		{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]%"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

exponentiation_expression
	: unary_expression												{;}
	| exponentiation_expression '^' unary_expression				{$$.s = cat(cat(cat(cat("$v(",$1.s),".$[0]**"),$3.s),".$[0])"); $$.v = llcat($1.v,$3.v);}
	;

unary_expression // Unary negative number?
	: postfix_expression											{;}
	| '!' unary_expression											{$$.s = cat(cat("$v(!",$2.s),".$[0])"); $$.v = $2.v;}
	| NOT_OP unary_expression										{$$.s = cat(cat("$v(~",$2.s),".$[0])"); $$.v = $2.v;}
	;

postfix_expression
	: bind_expression												{;}
	| postfix_expression INC_OP										{$$.s = cat(cat(cat(cat("(",$1.s),".$[0]+=1,"),$1.s),")");}
	| postfix_expression DEC_OP										{$$.s = cat(cat(cat(cat("(",$1.s),".$[0]-=1,"),$1.s),")");}
	;

bind_expression
	: primary_expression											{;}
	| bind_expression '.' '[' expression ']'						{$$.s = cat(cat(cat(cat("$i(",$1.s),".$[0],"),$4.s),".$[0])"); $$.v = $4.v;}
	| bind_expression '.' '(' ')'									{$$.s = cat(cat("$w(new ",$1.s),".$[0]())");}
	| bind_expression '.' '(' expression_list ')'					{$$.s = cat(cat(cat(cat("$w(new ",$1.s),".$[0]("),$4.s),"))"); $$.v = $4.v;}
	| bind_expression '.' IDENTIFIER								{$$.s = cat(cat($1.s,".$[0]."),$3.s);}
	| bind_expression '.' '{' primary_expression '}'				{$$.s = cat(cat(cat($1.s,".$[0]["),$4.s),".$[0]]");}
	;

primary_expression
	: IDENTIFIER													{;}
	| NUMBER														{$$.s = cat(cat("$v(",$1.s),")");}
	| TRU															{$$.s = "$v(true)";}
	| FALS															{$$.s = "$v(false)";}
	| NUL															{$$.s = "$v(null)";}
	| UNDEFINED														{$$.s = "$v(undefined)";}
	| INFINITY														{$$.s = "$v(Infinity)";}
	| EPSILON														{$$.s = "$v(Number.EPSILON)";}
	| NOTNUMBER														{$$.s = "$v(NaN)";}
	| STRING_LITERAL												{$$.s = cat(cat("$v('",$1.s),"')");}
	| TEMPLATE_LITERAL												{$$.s = cat(cat("$v(`",$1.s),"`)");}
	| REGEXP_LITERAL												{$$.s = cat(cat("$v(/",$1.s),"/)");}
	| function_literal												{$$.s = cat(cat("$v(",$1.s),")");}
	| FROM_HLX expression ')'										{$$.s = cat(cat("HLX(",$2.s),")");}
	| '[' range ']'													{$$.s = cat(cat("$v(",$2.s),")");}
	| '[' expression_list ']' 										{$$.s = cat(cat("$v([",$2.s),"])"); $$.v = $2.v;}
	| '[' ']'														{$$.s = "$v([])";}
	| '(' ')'														{$$.s = "$v(function(){})";}
	| '{' expression '}'											{$$.s = cat(cat("(",$2.s),")"); $$.v = $2.v;}
	;

/**************
* Definitions *
**************/

function_literal
	: '(' identifier_list ')' FUNC statement_block					{$$.s = cat(cat(cat(cat(cat("function(",$2.s),"){"),FuncHeader),cat(end_scope($5.v,$2.v),$5.s)),"}");}
	| '(' ')' FUNC statement_block									{$$.s = cat(cat(cat("function(){",FuncHeader),cat(end_scope($4.v,0),$4.s)),"}");}
	;

identifier_list
	: IDENTIFIER													{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $1.s; tmp->next = $$.v; $$.v = tmp;}
	| identifier_list IDENTIFIER									{$$.s = cat(cat($1.s,","),$2.s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = $1.v; $1.v = tmp; $$.v = $1.v;}
	;

expression_list // Get rid of this and possible identifier list
	: expression													{;}
	| expression_list expression									{$$.s = cat(cat($1.s,","),$2.s); $$.v = llcat($1.v,$2.v);}
	;

range
	: expression ELLIPSIS expression 								{$$.s = cat(cat(cat(cat("$r(",$1.s),".$[0],"),$3.s),".$[0])");}
	;

assign_operator
	: EXP_ASSIGN													{$$.s = "**=";}
	| MUL_ASSIGN													{$$.s = "*=";}
	| DIV_ASSIGN													{$$.s = "/=";}
	| MOD_ASSIGN													{$$.s = "%=";}
	| SUB_ASSIGN													{$$.s = "-=";}
	| LEFT_ASSIGN													{$$.s = "<<=";}
	| RIGHT_ASSIGN													{$$.s = ">>=";}
	| ZRIGHT_ASSIGN													{$$.s = ">>>=";}
	| AND_ASSIGN													{$$.s = "&=";}
	| XOR_ASSIGN													{$$.s = "^=";}
	| OR_ASSIGN														{$$.s = "|=";}
	;

%%
extern char yytext[];
extern int column;
ilnode* sig_tabs;

void new_HLX(){
	// free old HLX
	varMap = hashmap_new();
}

void yyerror(char *s){
	fflush(stdout);
	printf("\n%*s\n%*s\n", column, "^", column, s);
}

int main(){
	new_HLX();
	sig_tabs = malloc(sizeof(ilnode));
	sig_tabs->val = -1;
	sig_tabs->next = NULL;
	printf("%s\n",HLXHeader);
	return yyparse();
}
