D			[0-9]
L			[a-zA-Z_$]
E			([eE][+-]|[eE])
R			(\\.|[^\\/\n])
RF			(\\.|[^*\\/\n])
F			[igmuy]{0,5}


%{
#include <stdio.h>
#include "y.tab.h"

void count();
void comment();
void line_comment();
int check_type();

void setyylval();

void count_tabs();
int last_tab_level = 0;
%}

%%
"/*"						{ comment(); }
"//"						{ line_comment(); }
"\t"						{ count(); return '\t'; }
"\b"						{ count(); return '\b'; }
"HeLX".*					{ count(); return HLX; }

"break"						{ count(); return BREAK; }
"case"						{ count(); return CASE; }
"catch"						{ count(); return CATCH; }
"continue"					{ count(); return CONTINUE; }
"debugger"					{ count(); return DEBUGGER; }
"default"					{ count(); return DEFAULT; }
"delete"					{ count(); return DELETE; }
"do"						{ count(); return DO; }
"else"						{ count(); return ELSE; }
"for"						{ count(); return FOR; }
"finally"					{ count(); return FINALLY; }
"if"						{ count(); return IF; }
"import"					{ count(); return IMPORT; }
"in"						{ count(); return IN; }
"instanceof"				{ count(); return INSTANCEOF; }
"new"						{ count(); return NEW; }
"of"						{ count(); return OF; }
"return"					{ count(); return RETURN; }
"switch"					{ count(); return SWITCH; }
"throw"						{ count(); return THROW; }
"try"						{ count(); return TRY; }
"typeof"					{ count(); return TYPEOF; }
"while"						{ count(); return WHILE; }

"undefined"					{ count(); setyylval(0); return CONSTANT; }
"null"						{ count(); setyylval(0); return CONSTANT; }
"true"						{ count(); setyylval(0); return CONSTANT; }
"false"						{ count(); setyylval(0); return CONSTANT; }

{L}({L}|{D})*				{ count(); setyylval(0); return IDENTIFIER; }

[0-9]+						{ count(); setyylval(0); return CONSTANT; }
0[xXbBoO][0-9A-Fa-f]+		{ count(); setyylval(0); return CONSTANT; }
{D}+"."?{D}*{E}?{D}+		{ count(); setyylval(0); return CONSTANT; }

'(\\.|[^\\'\n])+'			{ count(); setyylval(1); return STRING_LITERAL; }
\"(\\.|[^\\"])*\"			{ count(); setyylval(1); return TEMPLATE_LITERAL; }
"/"{RF}{R}*"/"{F}			{ count(); setyylval(1); return REGEXP_LITERAL; }

"=>"						{ count(); return ARROW_FUNC; }
"<="						{ count(); return REV_ARROW; }
">="						{ count(); return BIND_OP; }
"::"						{ count(); return TYPE_DEC; }
".."						{ count(); return MINI_ELLIPSIS; }
"..."						{ count(); return ELLIPSIS; }
">>="						{ count(); return RIGHT_ASSIGN; }
"<<="						{ count(); return LEFT_ASSIGN; }
"+="						{ count(); return ADD_ASSIGN; }
"-="						{ count(); return SUB_ASSIGN; }
"*="						{ count(); return MUL_ASSIGN; }
"/="						{ count(); return DIV_ASSIGN; }
"%="						{ count(); return MOD_ASSIGN; }
"&="						{ count(); return AND_ASSIGN; }
"^="						{ count(); return EXP_ASSIGN; }
"^^="						{ count(); return XOR_ASSIGN; }
"|="						{ count(); return OR_ASSIGN; }
"!!="						{ count(); return NOT_ASSIGN; }
">>"						{ count(); return RIGHT_OP; }
"<<"						{ count(); return LEFT_OP; }
"++"						{ count(); return INC_OP; }
"--"						{ count(); return DEC_OP; }
"&&"						{ count(); return AND_OP; }
"||"						{ count(); return OR_OP; }
"=="						{ count(); return EQ_OP; }
"!="						{ count(); return NE_OP; }
";"							{ count(); return ';'; }
"{"							{ count(); return '{'; }
"}"							{ count(); return '}'; }
"\n"						{ count_tabs(); }
","							{ count(); return ','; }
":"							{ count(); return ':'; }
"="							{ count(); return '='; }
"("							{ count(); return '('; }
")"							{ count(); return ')'; }
"["							{ count(); return '['; }
"]"							{ count(); return ']'; }
"."							{ count(); return '.'; }
"&"							{ count(); return '&'; }
"!"							{ count(); return '!'; }
"~"							{ count(); return '~'; }
"!!"						{ count(); return NOT_OP; }
"-"							{ count(); return '-'; }
"+"							{ count(); return '+'; }
"*"							{ count(); return '*'; }
"/"							{ count(); return '/'; }
"%"							{ count(); return '%'; }
"<"							{ count(); return '<'; }
">"							{ count(); return '>'; }
"^"							{ count(); return '^'; }
"^^"						{ count(); return XOR_OP; }
"|"							{ count(); return '|'; }
"?"							{ count(); return '?'; }
"@"							{ count(); return '@'; }
"#"							{ count(); return '#'; }

[ \v\f]						{ count(); }
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


void count_tabs() {
	int this_tab_level = 0, delta;
	char c;

	while ((c = input()) == '\t')
		this_tab_level++;

	unput(c);

	delta = this_tab_level - last_tab_level;
	while (delta++ < 0)
		unput('\b');
	while (--delta > 0)
		unput('\t');

	unput(',');

	last_tab_level = this_tab_level;
}


void setyylval(int trim){
	if (trim){
		int len = strlen(yytext);
		memmove(yytext, yytext+1, len-2);
		yytext[len-2] = 0;
	}
	yylval.str = strdup(yytext);
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