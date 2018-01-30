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
     SUB_ASSIGN = 287,
     LEFT_ASSIGN = 288,
     RIGHT_ASSIGN = 289,
     ZRIGHT_ASSIGN = 290,
     AND_ASSIGN = 291,
     XOR_ASSIGN = 292,
     OR_ASSIGN = 293,
     CASE = 294,
     DEFAULT = 295,
     IF = 296,
     ELSE = 297,
     SWITCH = 298,
     WHILE = 299,
     DO = 300,
     FOR = 301,
     CONTINUE = 302,
     BREAK = 303,
     RETURN = 304,
     TRY = 305,
     CATCH = 306,
     FINALLY = 307,
     THROW = 308,
     DEBUGGER = 309,
     DELETE = 310,
     IMPORT = 311,
     IN = 312,
     OF = 313,
     INSTANCEOF = 314,
     NEW = 315,
     TYPEOF = 316,
     ELLIPSIS = 317,
     TREMA = 318,
     ASSERT = 319,
     HLX = 320,
     F_BRACKET = 321,
     F_PAREN = 322,
     PTRPTR = 323,
     BIND_ARW = 324,
     EXTEND_ARW = 325,
     ASYNC_ARW = 326,
     GEN_ARW = 327,
     REV_ARW = 328,
     DRFT_ARW = 329
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
#define SUB_ASSIGN 287
#define LEFT_ASSIGN 288
#define RIGHT_ASSIGN 289
#define ZRIGHT_ASSIGN 290
#define AND_ASSIGN 291
#define XOR_ASSIGN 292
#define OR_ASSIGN 293
#define CASE 294
#define DEFAULT 295
#define IF 296
#define ELSE 297
#define SWITCH 298
#define WHILE 299
#define DO 300
#define FOR 301
#define CONTINUE 302
#define BREAK 303
#define RETURN 304
#define TRY 305
#define CATCH 306
#define FINALLY 307
#define THROW 308
#define DEBUGGER 309
#define DELETE 310
#define IMPORT 311
#define IN 312
#define OF 313
#define INSTANCEOF 314
#define NEW 315
#define TYPEOF 316
#define ELLIPSIS 317
#define TREMA 318
#define ASSERT 319
#define HLX 320
#define F_BRACKET 321
#define F_PAREN 322
#define PTRPTR 323
#define BIND_ARW 324
#define EXTEND_ARW 325
#define ASYNC_ARW 326
#define GEN_ARW 327
#define REV_ARW 328
#define DRFT_ARW 329




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 18 "js.y"
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

