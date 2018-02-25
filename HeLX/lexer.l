%{

#include <stdio.h>
#include "includes/vars.h"
#include "y.tab.h"

void count();
void comment();
void line_comment();
int check_type();

void setyylval();

void end_file();
void count_tabs();
void indent();

int tab_level = 0;
/*
int last_tab = 0;
ilnode* sig_tabs = malloc(sizeof(ilnode));
sig_tabs->val = -1;
sig_tabs->next = NULL;
*/

%}

D			[0-9]
L			[a-zA-Z_$]
E			([eE][+-]|[eE])
R			(\\.|[^\\/\n])
RF			(\\.|[^*\\/\n])
F			[igmuy]{0,5}

%s READYEND

%%

"/*"						{ comment(); }
"//"						{ line_comment(); }
"\n"						{ count(); count_tabs(); }
"\b"						{ return END_STMT; }
"HeLX".*					{ count(); return HLX; }
"HLX.("						{ count(); return FROM_HLX; }
";"							{ count(); return ';'; }

<INITIAL><<EOF>>			{ end_file(); BEGIN(READYEND); }
<READYEND><<EOF>>			{ return 0; }

"if"						{ count(); indent(); return IF; }
"else"						{ count(); indent(); return ELSE; }
"for"						{ count(); indent(); return FOR; }
"do"						{ count(); indent(); return DO; }
"while"						{ count(); indent(); return WHILE; }
"switch"					{ count(); indent(); return SWITCH; }
"case"						{ count(); indent(); return CASE; }
"default"					{ count(); indent(); return DEFAULT; }
"try"						{ count(); indent(); return TRY; }
"catch"						{ count(); indent(); return CATCH; }
">>"						{ count(); indent(); return FUNC; }

"break"						{ count(); return BREAK; }
"continue"					{ count(); return CONTINUE; }
"debugger"					{ count(); return DEBUGGER; }
"delete"					{ count(); return DELETE; }
"finally"					{ count(); return FINALLY; }
"import"					{ count(); return IMPORT; }
"in"						{ count(); return IN; }
"instanceof"				{ count(); return INSTANCEOF; }
"of"						{ count(); return OF; }
"@of"						{ count(); return PTR_OF; }
"<<"						{ count(); return RETURN; }
"throw"						{ count(); return THROW; }
"typeof"					{ count(); return TYPEOF; }

0[nN]						{ count(); return NUL; }
0[uU]						{ count(); return UNDEFINED; }
0[tT]						{ count(); return TRU; }
0[fF]						{ count(); return FALS; }
0[iI]						{ count(); return INFINITY; }
0[lL]						{ count(); return EPSILON; }
0[vV]						{ count(); return NOTNUMBER; }

{L}({L}|{D})*				{ count(); setyylval(0); return IDENTIFIER; }

[0-9]+						{ count(); setyylval(0); return NUMBER; }
0[xXbBoO][0-9A-Fa-f]+		{ count(); setyylval(0); return NUMBER; }
{D}+"."?{D}*{E}?{D}+		{ count(); setyylval(0); return NUMBER; }

'(\\.|[^\\'\n])*'			{ count(); setyylval(1); return STRING_LITERAL; }
\"(\\.|[^\\"])*\"			{ count(); setyylval(1); return TEMPLATE_LITERAL; }
"/"{RF}{R}*"/"{F}			{ count(); setyylval(1); return REGEXP_LITERAL; }

"::"						{ count(); return ASSERT; }
".."						{ count(); return ELLIPSIS; }
"~"							{ count(); return '~'; }
"#"							{ count(); return '#'; }
"?"							{ count(); return '?'; }

"?="						{ count(); return TERN_ASSIGN; }
"@="						{ count(); return PTR_ASSIGN; }
"#="						{ count(); return CONST_ASSIGN; }

"&"							{ count(); return '&'; }
"|"							{ count(); return '|'; }
"!"							{ count(); return '!'; }
"-"							{ count(); return '-'; }
"+"							{ count(); return '+'; }
"*"							{ count(); return '*'; }
"/"							{ count(); return '/'; }
"%"							{ count(); return '%'; }
"^"							{ count(); return '^'; }

"+="						{ count(); return ADD_ASSIGN; }
"-="						{ count(); return SUB_ASSIGN; }
"*="						{ count(); return MUL_ASSIGN; }
"/="						{ count(); return DIV_ASSIGN; }
"%="						{ count(); return MOD_ASSIGN; }
"^="						{ count(); return EXP_ASSIGN; }

"$%"						{ count(); return ZRIGHT_OP; }
"$>"						{ count(); return RIGHT_OP; }
"$<"						{ count(); return LEFT_OP; }
"$^"						{ count(); return XOR_OP; }
"$!"						{ count(); return NOT_OP; }
"$&"						{ count(); return AND_OP; }
"$|"						{ count(); return OR_OP; }

"$%="						{ count(); return ZRIGHT_ASSIGN; }
"$>="						{ count(); return RIGHT_ASSIGN; }
"$<="						{ count(); return LEFT_ASSIGN; }
"$&="						{ count(); return AND_ASSIGN; }
"$^="						{ count(); return XOR_ASSIGN; }
"$|="						{ count(); return OR_ASSIGN; }

"++"						{ count(); return INC_OP; }
"--"						{ count(); return DEC_OP; }

"=="						{ count(); return EQ_OP; }
"!="						{ count(); return NE_OP; }
"<"							{ count(); return '<'; }
">"							{ count(); return '>'; }

"{"							{ count(); return '{'; }
"}"							{ count(); return '}'; }
":"							{ count(); return ':'; }
"="							{ count(); return '='; }
"("							{ count(); return '('; }
")"							{ count(); return ')'; }
"["							{ count(); return '['; }
"]"							{ count(); return ']'; }
"."							{ count(); return '.'; }

[ ,\v\f\t]					{ count(); }
.							{ /* ignore bad characters */ }

%%

int yywrap(){
	return 1;
}


void comment(){
	char c, c1;

loop:
	while ((c = input()) != '*' && c != 0)
		;// putchar(c);

	if ((c1 = input()) != '/' && c != 0)
	{
		unput(c1);
		goto loop;
	}

	if (c != 0)
		;// putchar(c1);
}

void line_comment(){
	while (input() != '\n');
	unput('\n');
}


void indent() {
	tab_level++;
}

void count_tabs() {
	int this_tab_level = 0, delta;
	char c;

	while ((c = input()) == '\t')
		this_tab_level++;

	unput(c);

	delta = this_tab_level - tab_level;
	while (delta++ < 0){
		unput('\b');
		tab_level--;
	}
}


void setyylval(int trim){
	if (trim){
		int len = strlen(yytext);
		memmove(yytext, yytext+1, len-2);
		yytext[len-2] = 0;
	}
	yylval.data.s = strdup(yytext);
}


void end_file() {
	unput(',');
	for ( ; tab_level > 0; tab_level-- ){
		unput('\b');
	}
	unput(',');
}


int column = 0;

void count(){
	int i;

	for (i = 0; yytext[i] != '\0'; i++)
		if (yytext[i] == '\n')
			column = 0;
		else if (yytext[i] == '\t')
			column += 8 - (column % 8);
		else
			column++;

	//ECHO;
}