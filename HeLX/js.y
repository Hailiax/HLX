%{

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "includes/hashmap.h"
#include "includes/js_genrange.h"
#include "includes/js_vars.h"
#include "includes/js_common.h"

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

%token INC_OP DEC_OP LEFT_OP RIGHT_OP ZRIGHT_OP EQ_OP NE_OP NOT_OP XOR_OP AND_OP OR_OP
%token MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN EXP_ASSIGN TERN_ASSIGN
%token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN ZRIGHT_ASSIGN AND_ASSIGN XOR_ASSIGN OR_ASSIGN

%token CASE DEFAULT IF ELSE SWITCH WHILE DO FOR CONTINUE BREAK RETURN
%token TRY CATCH FINALLY THROW DEBUGGER DELETE IMPORT IN OF INSTANCEOF NEW TYPEOF
%token ELLIPSIS TREMA ASSERT HLX F_BRACKET F_PAREN PTRPTR
%token BIND_ARW EXTEND_ARW ASYNC_ARW GEN_ARW REV_ARW DRFT_ARW
 
%type <data> translation_unit assignment_expression range function_literal primary_expression assignment_operator compound_statement statement_list statement expression_statement labeled_statement selection_statement iteration_statement jump_statement constant_expression logical_or_expression logical_and_expression inclusive_or_expression exclusive_or_expression and_expression equality_expression relational_expression shift_expression additive_expression multiplicative_expression prefix_expression postfix_expression expression identifier_list expression_list

%start translation_unit

%%

translation_unit
	: HLX ',' statement_list										{$$.s = cat(end_scope($3.v,0),$3.s); printf("%s\n",$$.s); new_HLX();}
	| translation_unit translation_unit								{;}
	;

/************* Todo: fix ranges, fix private variables using references (maybe var access is useless), negative array index, assertions, # notation, ~ notation?, imports exports HLX acts as separate file DocsJS = import '../dep/docs.js', more elegant terneary exp, macros
* Statements *
*************/

statement_list
	: statement														{;}
	| statement_list statement										{$$.s = cat($1.s,$2.s); $$.v = llcat($1.v,$2.v);}
	;

statement
	: labeled_statement												{;}
	| compound_statement											{;}
	| expression_statement											{;}
	| selection_statement											{;}
	| iteration_statement											{;}
	| jump_statement												{;}
	;

compound_statement
	: '\t' '\b'														{;}
	| '\t' statement_list '\b'										{$$.s = $2.s; $$.v = $2.v;}
	;

expression_statement
	: ','															{$$.s = ";";}
	| expression ','												{$$.s = cat($1.s,";");}
	;

labeled_statement
	: CASE expression ',' statement									{$$.s = cat(cat(cat("case ",$2.s),":"),cat(end_scope($4.v,0),$4.s)); $$.v = $2.v;}
	| DEFAULT ',' statement											{$$.s = cat("default:",cat(end_scope($3.v,0),$3.s));}
	;

selection_statement
	: IF expression ',' statement									{$$.s = cat(cat(cat(cat("if(",$2.s),"){"),cat(end_scope($4.v,0),$4.s)),"}"); $$.v = $2.v;}
	| IF expression ',' statement ELSE selection_statement			{$$.s = cat(cat(cat(cat(cat("if(",$2.s),"){"),cat(end_scope($4.v,0),$4.s)),"}else "),cat(end_scope($6.v,0),$6.s)); $$.v = llcat($2.v,$6.v);}
	| IF expression ',' statement ELSE ',' statement				{$$.s = cat(cat(cat(cat(cat(cat("if(",$2.s),"){"),cat(end_scope($4.v,0),$4.s)),"}else{"),cat(end_scope($7.v,0),$7.s)),"}"); $$.v = $2.v;}
	| SWITCH expression ',' statement								{$$.s = cat(cat(cat(cat("switch(",$2.s),"){"),$4.s),"}"); end_scope($4.v,0); $$.v = $2.v;}
	;

iteration_statement
	: WHILE expression ',' statement								{$$.s = cat(cat(cat(cat("while(",$2.s),"){"),cat(end_scope($4.v,0),$4.s)),"}"); $$.v = $2.v;}
	| DO ',' statement WHILE expression ','							{$$.s = cat(cat(cat(cat("do{",cat(end_scope($3.v,0),$3.s)),"}while("),$5.s),");"); $$.v = $5.v;}
	| FOR IDENTIFIER IN expression ',' statement					{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = NULL; $$.s = cat(cat(cat(cat(cat(cat("for(let ",$2.s)," in "),$4.s),"){"),cat(end_scope($6.v,tmp),$6.s)),"}"); $$.v = $4.v;}
	| FOR IDENTIFIER OF expression ',' statement					{llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = NULL; $$.s = cat(cat(cat(cat(cat(cat("for(let ",$2.s)," of "),$4.s),"){"),cat(end_scope($6.v,tmp),$6.s)),"}"); $$.v = $4.v;}
	| FOR expression ';' expression ';' expression ',' statement	{$$.s = cat(cat(cat(cat(cat(cat(cat(cat("for(",$2.s),";"),$4.s),";"),$6.s),"){"),cat(end_scope($8.v,$2.v),$8.s)),"}"); $$.v = llcat($4.v,$6.v);}
	;

jump_statement
	: CONTINUE ','													{$$.s = "continue;";}
	| BREAK ','														{$$.s = "break;";}
	| RETURN ','													{$$.s = "return;";}
	| RETURN expression ','											{$$.s = cat(cat("return ",$2.s),";"); $$.v = $2.v;}
	;

/**************
* Expressions *
**************/

expression
	: assignment_expression											{;}
	| expression '=' assignment_expression							{$$.s = cat(cat(cat(cat(var_declare($1.s,&$1.v,1),$1.s),"=HLX.extend(true,[],"),$3.s),")"); $$.v = llcat($1.v,$3.v);}
	| expression ':' assignment_expression							{$$.s = cat(cat(cat(cat(var_declare($1.s,&$1.v,2),$1.s),"=HLX.extend(true,[],"),$3.s),")"); $$.v = llcat($1.v,$3.v);}
	;

assignment_expression
	: constant_expression											{;}
	| assignment_expression assignment_operator constant_expression	{$$.s = cat(cat(cat(cat(cat(cat("(",$1.s),"[0]"),$2.s),$3.s),"[0],"),$1.s")");}
	| assignment_expression TERN_ASSIGN constant_expression			{$$.s = cat(cat(cat(cat(cat(cat($1.s,"="),$1.s),"?"),$1.s),":"),$3.s);}
	;

constant_expression // Add third arg for stuff after expr
	: logical_or_expression											{;}
	| logical_or_expression '?' expression ',' expression			{$$.s = cat(cat(cat(cat($1.s,"?"),$3.s ),":"),$5.s);}
	| logical_or_expression '?' ',' '\t' expression ',' expression ',' '\b'		{$$.s = cat(cat(cat(cat($1.s,"?"),$5.s ),":"),$7.s);}
	| logical_or_expression '?' expression ',' '\t' expression ',' '\b'			{$$.s = cat(cat(cat(cat($1.s,"?"),$3.s ),":"),$6.s);}
	;

logical_or_expression
	: logical_and_expression										{;}
	| logical_or_expression OR_OP logical_and_expression			{$$.s = cat(cat(cat(cat("[",$1.s),"[0]||"),$3.s),"[0]]");}
	;

logical_and_expression
	: inclusive_or_expression										{;}
	| logical_and_expression AND_OP inclusive_or_expression			{$$.s = cat(cat(cat(cat("[",$1.s),"[0]&&"),$3.s),"[0]]");}
	;

inclusive_or_expression
	: exclusive_or_expression										{;}
	| inclusive_or_expression '|' exclusive_or_expression			{$$.s = cat(cat(cat(cat("[",$1.s),"[0]|"),$3.s),"[0]]");}
	;

exclusive_or_expression
	: and_expression												{;}
	| exclusive_or_expression XOR_OP and_expression					{$$.s = cat(cat(cat(cat("[",$1.s),"[0]^"),$3.s),"[0]]");}
	;

and_expression
	: equality_expression											{;}
	| and_expression '&' equality_expression						{$$.s = cat(cat(cat(cat("[",$1.s),"[0]&"),$3.s),"[0]]");}
	;

equality_expression
	: relational_expression											{;}
	| equality_expression EQ_OP relational_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]==="),$3.s),"[0]]");}
	| equality_expression NE_OP relational_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]!=="),$3.s),"[0]]");}
	;

relational_expression
	: shift_expression												{;}
	| relational_expression '<' shift_expression					{$$.s = cat(cat(cat(cat("[",$1.s),"[0]<"),$3.s),"[0]]");}
	| relational_expression '>' shift_expression					{$$.s = cat(cat(cat(cat("[",$1.s),"[0]>"),$3.s),"[0]]");}
	;

shift_expression
	: additive_expression											{;}
	| shift_expression LEFT_OP additive_expression					{$$.s = cat(cat(cat(cat("[",$1.s),"[0]<<"),$3.s),"[0]]");}
	| shift_expression RIGHT_OP additive_expression					{$$.s = cat(cat(cat(cat("[",$1.s),"[0]>>"),$3.s),"[0]]");}
	| shift_expression ZRIGHT_OP additive_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]>>>"),$3.s),"[0]]");}
	;

additive_expression
	: multiplicative_expression										{;}
	| additive_expression '+' multiplicative_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]+"),$3.s),"[0]]");}
	| additive_expression '-' multiplicative_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]-"),$3.s),"[0]]");}

multiplicative_expression
	: prefix_expression												{;}
	| multiplicative_expression '*' prefix_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]*"),$3.s),"[0]]");}
	| multiplicative_expression '/' prefix_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]/"),$3.s),"[0]]");}
	| multiplicative_expression '^' prefix_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]**"),$3.s),"[0]]");}
	| multiplicative_expression '%' prefix_expression				{$$.s = cat(cat(cat(cat("[",$1.s),"[0]%"),$3.s),"[0]]");}
	;

prefix_expression
	: postfix_expression											{;}
	| NEW prefix_expression											{$$.s = cat(cat("[new ",$2.s),"[0]]");}
	| '+' prefix_expression											{$$.s = cat(cat(cat(cat(cat(cat("(",$2.s),"[0]=+"),$2.s),"[0],a"),$2.s),")");}
	| '-' prefix_expression											{$$.s = cat(cat(cat(cat(cat(cat("(",$2.s),"[0]=-"),$2.s),"[0],a"),$2.s),")");}
	| '!' prefix_expression											{$$.s = cat(cat(cat(cat(cat(cat("(",$2.s),"[0]=!"),$2.s),"[0],a"),$2.s),")");}
	| NOT_OP prefix_expression										{$$.s = cat(cat(cat(cat(cat(cat("(",$2.s),"[0]=~"),$2.s),"[0],a"),$2.s),")");}
	;

postfix_expression
	: primary_expression											{;}
	| postfix_expression '[' expression ']'							{$$.s = cat(cat(cat($1.s,"[0]["),$3.s),"]");}
	| postfix_expression '(' ')'									{$$.s = cat($1.s,"[0]()");}
	| postfix_expression '(' expression_list ')'					{$$.s = cat(cat(cat($1.s,"[0]("),$3.s),")");}
	| postfix_expression '.' IDENTIFIER								{$$.s = cat(cat($1.s,"[0]."),$3.s);}
	| postfix_expression INC_OP										{$$.s = cat(cat(cat(cat("(",$1.s),"[0]+=1,"),$1.s),")");}
	| postfix_expression DEC_OP										{$$.s = cat(cat(cat(cat("(",$1.s),"[0]-=1,"),$1.s),")");}
	;

primary_expression
	: IDENTIFIER													{;}
	| NUMBER														{$$.s = cat(cat("[",$1.s),"]");}
	| TRU															{$$.s = "[true]";}
	| FALS															{$$.s = "[false]";}
	| NUL															{$$.s = "[null]";}
	| UNDEFINED														{$$.s = "[undefined]";}
	| INFINITY														{$$.s = "[Infinity]";}
	| EPSILON														{$$.s = "[Number.EPSILON]";}
	| NOTNUMBER														{$$.s = "[NaN]";}
	| STRING_LITERAL												{$$.s = cat(cat("['",$1.s),"']");}
	| TEMPLATE_LITERAL												{$$.s = cat(cat("[`",$1.s),"`]");}
	| REGEXP_LITERAL												{$$.s = cat(cat("[/",$1.s),"/]");}
	| function_literal												{$$.s = cat(cat("[",$1.s),"]");}
	| range															{;}
	| '[' expression_list ']' 										{$$.s = cat(cat("[[",$2.s),"]]");}
	| F_BRACKET expression_list ']' 								{$$.s = cat(cat("[[",$2.s),"]]");}
	| '[' ']'														{$$.s = "[[]]";}
	| F_BRACKET ']'													{$$.s = "[[]]";}
	| '(' ')'														{$$.s = "[function(){}]";}
	| F_PAREN ')'													{$$.s = "[function(){}]";}
	| '{' expression '}'											{$$.s = cat(cat("(",$2.s),")");}
	| '{' range '}'													{$$.s = $2.s;}
	;

range
	: NUMBER TREMA NUMBER											{$$.s = genrange_dc($1.s,$3.s);}
	| NUMBER NUMBER													{$$.s = cat(cat(cat("[",$1.s),"],"),cat(cat("[",$2.s),"]"));}
	| NUMBER NUMBER TREMA NUMBER									{$$.s = genrange_da($1.s,$2.s,$4.s);}
	| STRING_LITERAL TREMA STRING_LITERAL							{$$.s = genrange_sc("'",$1.s,$3.s);}
	| STRING_LITERAL STRING_LITERAL									{$$.s = cat(cat(cat(cat("['",$1.s),"']"),","),cat(cat("['",$2.s),"']"));}
	| STRING_LITERAL STRING_LITERAL TREMA STRING_LITERAL			{$$.s = genrange_sa("'",$1.s,$2.s,$4.s);}
	| TEMPLATE_LITERAL TREMA TEMPLATE_LITERAL						{$$.s = genrange_sc("`",$1.s,$3.s);}
	| TEMPLATE_LITERAL TEMPLATE_LITERAL								{$$.s = cat(cat(cat(cat("[`",$1.s),"`]"),","),cat(cat("[`",$2.s),"`]"));}
	| TEMPLATE_LITERAL TEMPLATE_LITERAL TREMA TEMPLATE_LITERAL		{$$.s = genrange_sa("`",$1.s,$2.s,$4.s);}
	;

/**************
* Definitions *
**************/

expression_list
	: expression													{;}
	| expression_list expression									{$$.s = cat(cat($1.s,","),$2.s); $$.v = llcat($1.v,$2.v);}
	;

function_literal
	: '(' identifier_list ')' BIND_ARW ',' compound_statement		{$$.s = cat(cat(cat(cat("function(",$2.s),"){"),cat(end_scope($6.v,$2.v),$6.s)),"}");}
	| F_PAREN identifier_list ')' BIND_ARW ',' compound_statement	{$$.s = cat(cat(cat(cat("function(",$2.s),"){"),cat(end_scope($6.v,$2.v),$6.s)),"}");}
	| '(' identifier_list ')' BIND_ARW expression 					{$$.s = cat(cat(cat(cat("function(",$2.s),"){return "),cat(end_scope($5.v,$2.v),$5.s)),";}");}
	| F_PAREN identifier_list ')' BIND_ARW expression 				{$$.s = cat(cat(cat(cat("function(",$2.s),"){return "),cat(end_scope($5.v,$2.v),$5.s)),";}");}
	| '(' ')' BIND_ARW ',' compound_statement						{$$.s = cat(cat("function(){",cat(end_scope($5.v,0),$5.s)),"}");}
	| F_PAREN ')' BIND_ARW ',' compound_statement					{$$.s = cat(cat("function(){",cat(end_scope($5.v,0),$5.s)),"}");}
	| '(' ')' BIND_ARW expression 									{$$.s = cat(cat("function(){return ",cat(end_scope($4.v,0),$4.s)),";}");}
	| F_PAREN ')' BIND_ARW expression 								{$$.s = cat(cat("function(){return ",cat(end_scope($4.v,0),$4.s)),";}");}
	;

identifier_list
	: IDENTIFIER IDENTIFIER											{$$.s = cat(cat($1.s,","),$2.s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = $1.s; tmp->next = $$.v; $$.v = tmp; tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = $$.v; $$.v = tmp;}
	| identifier_list IDENTIFIER									{$$.s = cat(cat($1.s,","),$2.s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = $2.s; tmp->next = $1.v; $1.v = tmp; $$.v = $1.v;}
	;

assignment_operator
	: EXP_ASSIGN													{$$.s = "**=";}
	| MUL_ASSIGN													{$$.s = "*=";}
	| DIV_ASSIGN													{$$.s = "/=";}
	| MOD_ASSIGN													{$$.s = "%=";}
	| ADD_ASSIGN													{$$.s = "+=";}
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
	printf("%s\n",HLXHeader);
	return yyparse();
}
