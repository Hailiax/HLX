%{

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dependencies/hashmap.h"
#include "dependencies/js_genrange.h"
#include "dependencies/js_common.h"

void yyerror (char *s);
int yylex();

char* var_declare(char *name, char *value, char type);
char* var_access(char *name);
char* var_clean(char *rawName);

map_t varMap;
#define KEY_MAX_LENGTH (256)
#define KEY_COUNT (4*4)
typedef struct variable {
    char name[KEY_MAX_LENGTH];
    char type; // 1: public; 2: private; 3: constant public; 4: constant private
} variable;

%}

%union {char *str;}
%token <str> IDENTIFIER NUMBER BOOL NUL UND STRING_LITERAL TEMPLATE_LITERAL REGEXP_LITERAL

%token INC_OP DEC_OP LEFT_OP RIGHT_OP EQ_OP NE_OP NOT_OP XOR_OP AND_OP OR_OP
%token MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN NOT_ASSIGN EXP_ASSIGN
%token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN XOR_ASSIGN OR_ASSIGN

%token CASE DEFAULT IF ELSE SWITCH WHILE DO FOR CONTINUE BREAK RETURN
%token TRY CATCH FINALLY THROW DEBUGGER DELETE IMPORT IN OF INSTANCEOF NEW TYPEOF
%token ELLIPSIS TREMA ARROW_FUNC REV_ARROW BIND_OP ASSERT HLX F_BRACKET F_PAREN
 
%type <str> range function_literal primary_expression assignment_operator compound_statement statement_list statement expression_statement labeled_statement selection_statement iteration_statement jump_statement assignment_expression constant_expression logical_or_expression logical_and_expression inclusive_or_expression exclusive_or_expression and_expression equality_expression relational_expression shift_expression additive_expression multiplicative_expression prefix_expression postfix_expression expression expression_list

%start compound_statement

%%

/*************
* Statements *
*************/

compound_statement
	: HLX ',' statement_list											{printf("\n\n%s\n\n",$3);}
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
	| FOR expression ';' expression ';' expression ',' statement		{$$ = cat(cat(cat(cat(cat(cat(cat(cat("for(",$2),";"),$4),";"),$6),"){"),$8),"}");}
	;		

jump_statement
	: CONTINUE ','														{$$ = "continue;";}
	| BREAK ','															{$$ = "break;";}
	| RETURN ','														{$$ = "return;";}
	| RETURN expression ','												{$$ = cat(cat("return ",$2),";");}
	;

/**************
* Expressions *
**************/

expression
	: assignment_expression												{;}
	| expression assignment_expression									{$$ = cat($1,$2);}
	;

assignment_expression
	: constant_expression												{;}
	| prefix_expression assignment_operator assignment_expression		{$$ = cat(cat($1,$2),$3);}
	| postfix_expression '=' assignment_expression						{$$ = cat(cat(cat(var_declare($1,$3,1),$1),"="),$3);}
	| postfix_expression ':' assignment_expression						{$$ = cat(cat(cat(var_declare($1,$3,2),$1),"="),$3);}
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
	
multiplicative_expression					
	: prefix_expression													{;}
	| multiplicative_expression '*' prefix_expression					{$$ = cat( cat($1,"*"), $3 );}
	| multiplicative_expression '/' prefix_expression					{$$ = cat( cat($1,"/"), $3 );}
	| multiplicative_expression '^' prefix_expression					{$$ = cat( cat($1,"**"), $3 );}
	| multiplicative_expression '%' prefix_expression					{$$ = cat( cat($1,"%"), $3 );}
	;

prefix_expression					
	: postfix_expression												{;}
	| NEW prefix_expression												{$$ = cat("new ",$2);}
	| INC_OP prefix_expression											{$$ = cat("++",$2);}
	| DEC_OP prefix_expression											{$$ = cat("--",$2);}
	| '+' prefix_expression												{$$ = cat("+",$2);}
	| '-' prefix_expression												{$$ = cat("-",$2);}
	| '!' prefix_expression												{$$ = cat("!",$2);}
	| NOT_OP prefix_expression											{$$ = cat("~",$2);}
	;

postfix_expression					
	: primary_expression												{;}
	| postfix_expression '[' expression ']'								{$$ = cat(cat(cat($1,"["),$3),"]");}
	| postfix_expression '(' ')'										{$$ = cat($1,"()");}
	| postfix_expression '(' expression_list ')'						{$$ = cat(cat(cat($1,"("),$3),")");}
	| postfix_expression '.' IDENTIFIER									{$$ = cat(cat($1,"."),$3);}
	| postfix_expression INC_OP											{$$ = cat($1,"++");}
	| postfix_expression DEC_OP											{$$ = cat($1,"--");;}
	;

primary_expression
	: IDENTIFIER														{$$ = cat(var_access($1),$1);}
	| NUMBER															{;}
	| BOOL																{;}
	| NUL																{;}
	| UND																{;}
	| STRING_LITERAL													{$$ = cat(cat("'",$1),"'");}
	| TEMPLATE_LITERAL													{$$ = cat(cat("`",$1),"`");}
	| REGEXP_LITERAL													{$$ = cat(cat("/",$1),"/");}
	| function_literal													{;}
	| range																{;}
	| '[' expression_list ']' 											{$$ = cat(cat("[",$2),"]");}
	| F_BRACKET expression_list ']' 									{$$ = cat(cat("[",$2),"]");}
	| '[' ']'															{$$ = "[]";}
	| F_BRACKET ']'														{$$ = "[]";}
	| '{' expression '}'												{$$ = cat(cat("(",$2),")");}
	| '{' range '}'														{$$ = $2;}
	;

range
	: NUMBER TREMA NUMBER												{$$ = genrange_dc($1,$3);}
	| NUMBER NUMBER														{$$ = cat(cat($1,","),$2);}
	| NUMBER NUMBER TREMA NUMBER										{$$ = genrange_da($1,$2,$4);}
	| NUMBER NUMBER NUMBER												{$$ = cat(cat(cat(cat($1,","),$2),","),$3);}
	| NUMBER NUMBER NUMBER TREMA NUMBER									{$$ = genrange_dg($1,$2,$3,$5);}
	| STRING_LITERAL TREMA STRING_LITERAL								{$$ = genrange_sc("'",$1,$3);}
	| STRING_LITERAL STRING_LITERAL										{$$ = cat(cat(cat(cat("'",$1),"'"),","),cat(cat("'",$2),"'"));}
	| STRING_LITERAL STRING_LITERAL TREMA STRING_LITERAL				{$$ = genrange_sa("'",$1,$2,$4);}
	| TEMPLATE_LITERAL TREMA TEMPLATE_LITERAL							{$$ = genrange_sc("`",$1,$3);}
	| TEMPLATE_LITERAL TEMPLATE_LITERAL									{$$ = cat(cat(cat(cat("`",$1),"`"),","),cat(cat("`",$2),"`"));}
	| TEMPLATE_LITERAL TEMPLATE_LITERAL TREMA TEMPLATE_LITERAL			{$$ = genrange_sa("`",$1,$2,$4);}
	;

/**************
* Definitions *
**************/

expression_list					
	: assignment_expression												{;}
	| expression_list assignment_expression								{$$ = cat(cat($1,","),$2);}
	;

function_literal
	: '(' expression_list ')' ARROW_FUNC ',' compound_statement			{$$ = cat(cat(cat(cat("function(",$2),"){"),$6),"}");}
	| F_PAREN expression_list ')' ARROW_FUNC ',' compound_statement		{$$ = cat(cat(cat(cat("function(",$2),"){"),$6),"}");}
	| '(' expression_list ')' ARROW_FUNC expression 					{$$ = cat(cat(cat(cat("function(",$2),"){return "),$5),";}");}
	| F_PAREN expression_list ')' ARROW_FUNC expression 				{$$ = cat(cat(cat(cat("function(",$2),"){return "),$5),";}");}
	| '(' ')' ARROW_FUNC ',' compound_statement							{$$ = cat(cat("function(){",$5),"}");}
	| F_PAREN ')' ARROW_FUNC ',' compound_statement						{$$ = cat(cat("function(){",$5),"}");}
	| '(' ')' ARROW_FUNC expression 									{$$ = cat(cat("function(){return ",$4),";}");}
	| F_PAREN ')' ARROW_FUNC expression 								{$$ = cat(cat("function(){return ",$4),";}");}
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

// Todo: Needs scoping
char* var_access(char *rawName){
	variable* var;

	char* name = var_clean(rawName);

	char varName[KEY_MAX_LENGTH];
	snprintf( varName, KEY_MAX_LENGTH, "%s", name );
	int error = hashmap_get( varMap, varName, (void**)(&var) );

	if ( error == MAP_OK )
		if ( var->type == 2 )
			return "this.";
	return "";
}

char* var_declare(char *rawName, char *value, char type){
	variable* var;
	char* name = var_clean(rawName);

	char varName[KEY_MAX_LENGTH];
	snprintf( varName, KEY_MAX_LENGTH, "%s", name );
	int error = hashmap_get( varMap, varName, (void**)(&var) );

	if ( error == MAP_MISSING ){
		var = malloc( sizeof(var) );
		snprintf( var->name, KEY_MAX_LENGTH, "%s", name );
		var->type = type;
		hashmap_put( varMap, var->name, var );
		if (type == 1)
			return "let ";
		else
			return "this.";
	}

	return "";
}

char* var_clean(char *rawName){
	char *name = strdup(rawName);
	int len = strlen(name);
	char *out = "";

	for ( int i = 0; i < len; i++ ){
		if ( i == 4 && name[i] == '.' && strcmp(out,"this") == 0 ){
			out = "";
			continue;
		}
		if ( !( (64 < name[i] && name[i] < 91) || (96 < name[i] && name[i] < 123) || name[i] == '_' || name[i] == '$' ) )
			break;
		char c[2];
		c[0] = name[i];
		c[1] = 0;
		out = cat(out, c);
	}

	return out;
}

void yyerror(char *s){
	fflush(stdout);
	printf("\n%*s\n%*s\n", column, "^", column, s);
}

int main(){
	varMap = hashmap_new();
	return yyparse();
}
