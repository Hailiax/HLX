/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton interface for Bison's Yacc-like parsers in C

   Copyright (C) 1984, 1989, 1990, 2000, 2001, 2002, 2003, 2004, 2005, 2006
   Free Software Foundation, Inc.

   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2, or (at your option)
   any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor,
   Boston, MA 02110-1301, USA.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

/* Tokens.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
   /* Put the tokens into the symbol table, so that GDB and other debuggers
      know about them.  */
   enum yytokentype {
     IDENTIFIER = 258,
     NUMBER = 259,
     STRING_LITERAL = 260,
     TEMPLATE_LITERAL = 261,
     REGEXP_LITERAL = 262,
     NUL = 263,
     UNDEFINED = 264,
     TRU = 265,
     FALS = 266,
     INFINITY = 267,
     NOTNUMBER = 268,
     EPSILON = 269,
     INC_OP = 270,
     DEC_OP = 271,
     LEFT_OP = 272,
     RIGHT_OP = 273,
     ZRIGHT_OP = 274,
     EQ_OP = 275,
     NE_OP = 276,
     NOT_OP = 277,
     XOR_OP = 278,
     AND_OP = 279,
     OR_OP = 280,
     MUL_ASSIGN = 281,
     DIV_ASSIGN = 282,
     MOD_ASSIGN = 283,
     ADD_ASSIGN = 284,
     EXP_ASSIGN = 285,
     TERN_ASSIGN = 286,
     PTR_ASSIGN = 287,
     CONST_ASSIGN = 288,
     SUB_ASSIGN = 289,
     LEFT_ASSIGN = 290,
     RIGHT_ASSIGN = 291,
     ZRIGHT_ASSIGN = 292,
     AND_ASSIGN = 293,
     XOR_ASSIGN = 294,
     OR_ASSIGN = 295,
     CASE = 296,
     DEFAULT = 297,
     IF = 298,
     ELSE = 299,
     SWITCH = 300,
     WHILE = 301,
     DO = 302,
     CONTINUE = 303,
     BREAK = 304,
     RETURN = 305,
     RETURN_NOTHING = 306,
     FOR = 307,
     CNCRNT_FOR = 308,
     TRY = 309,
     CATCH = 310,
     FINALLY = 311,
     THROW = 312,
     DEBUGGER = 313,
     DELETE = 314,
     IMPORT = 315,
     INSTANCEOF = 316,
     TYPEOF = 317,
     IN = 318,
     OF = 319,
     PTR_OF = 320,
     ELLIPSIS = 321,
     ASSERT = 322,
     HLX = 323,
     F_BRACKET = 324,
     F_PAREN = 325,
     FROM_HLX = 326,
     FUNC = 327,
     FUNC_1VAR = 328,
     END_STMT = 329
   };
#endif
/* Tokens.  */
#define IDENTIFIER 258
#define NUMBER 259
#define STRING_LITERAL 260
#define TEMPLATE_LITERAL 261
#define REGEXP_LITERAL 262
#define NUL 263
#define UNDEFINED 264
#define TRU 265
#define FALS 266
#define INFINITY 267
#define NOTNUMBER 268
#define EPSILON 269
#define INC_OP 270
#define DEC_OP 271
#define LEFT_OP 272
#define RIGHT_OP 273
#define ZRIGHT_OP 274
#define EQ_OP 275
#define NE_OP 276
#define NOT_OP 277
#define XOR_OP 278
#define AND_OP 279
#define OR_OP 280
#define MUL_ASSIGN 281
#define DIV_ASSIGN 282
#define MOD_ASSIGN 283
#define ADD_ASSIGN 284
#define EXP_ASSIGN 285
#define TERN_ASSIGN 286
#define PTR_ASSIGN 287
#define CONST_ASSIGN 288
#define SUB_ASSIGN 289
#define LEFT_ASSIGN 290
#define RIGHT_ASSIGN 291
#define ZRIGHT_ASSIGN 292
#define AND_ASSIGN 293
#define XOR_ASSIGN 294
#define OR_ASSIGN 295
#define CASE 296
#define DEFAULT 297
#define IF 298
#define ELSE 299
#define SWITCH 300
#define WHILE 301
#define DO 302
#define CONTINUE 303
#define BREAK 304
#define RETURN 305
#define RETURN_NOTHING 306
#define FOR 307
#define CNCRNT_FOR 308
#define TRY 309
#define CATCH 310
#define FINALLY 311
#define THROW 312
#define DEBUGGER 313
#define DELETE 314
#define IMPORT 315
#define INSTANCEOF 316
#define TYPEOF 317
#define IN 318
#define OF 319
#define PTR_OF 320
#define ELLIPSIS 321
#define ASSERT 322
#define HLX 323
#define F_BRACKET 324
#define F_PAREN 325
#define FROM_HLX 326
#define FUNC 327
#define FUNC_1VAR 328
#define END_STMT 329




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 17 "parser.y"
{
	struct {
		char* s;
		llnode* v;
	} data;
}
/* Line 1529 of yacc.c.  */
#line 204 "y.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

