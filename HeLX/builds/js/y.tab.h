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
     INC_OP = 269,
     DEC_OP = 270,
     LEFT_OP = 271,
     RIGHT_OP = 272,
     EQ_OP = 273,
     NE_OP = 274,
     NOT_OP = 275,
     XOR_OP = 276,
     AND_OP = 277,
     OR_OP = 278,
     MUL_ASSIGN = 279,
     DIV_ASSIGN = 280,
     MOD_ASSIGN = 281,
     ADD_ASSIGN = 282,
     NOT_ASSIGN = 283,
     EXP_ASSIGN = 284,
     TERN_ASSIGN = 285,
     SUB_ASSIGN = 286,
     LEFT_ASSIGN = 287,
     RIGHT_ASSIGN = 288,
     AND_ASSIGN = 289,
     XOR_ASSIGN = 290,
     OR_ASSIGN = 291,
     CASE = 292,
     DEFAULT = 293,
     IF = 294,
     ELSE = 295,
     SWITCH = 296,
     WHILE = 297,
     DO = 298,
     FOR = 299,
     CONTINUE = 300,
     BREAK = 301,
     RETURN = 302,
     TRY = 303,
     CATCH = 304,
     FINALLY = 305,
     THROW = 306,
     DEBUGGER = 307,
     DELETE = 308,
     IMPORT = 309,
     IN = 310,
     OF = 311,
     INSTANCEOF = 312,
     NEW = 313,
     TYPEOF = 314,
     ELLIPSIS = 315,
     TREMA = 316,
     ASSERT = 317,
     HLX = 318,
     F_BRACKET = 319,
     F_PAREN = 320,
     PTRPTR = 321,
     BIND_ARW = 322,
     EXTEND_ARW = 323,
     ASYNC_ARW = 324,
     GEN_ARW = 325,
     REV_ARW = 326,
     DRFT_ARW = 327
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
#define INC_OP 269
#define DEC_OP 270
#define LEFT_OP 271
#define RIGHT_OP 272
#define EQ_OP 273
#define NE_OP 274
#define NOT_OP 275
#define XOR_OP 276
#define AND_OP 277
#define OR_OP 278
#define MUL_ASSIGN 279
#define DIV_ASSIGN 280
#define MOD_ASSIGN 281
#define ADD_ASSIGN 282
#define NOT_ASSIGN 283
#define EXP_ASSIGN 284
#define TERN_ASSIGN 285
#define SUB_ASSIGN 286
#define LEFT_ASSIGN 287
#define RIGHT_ASSIGN 288
#define AND_ASSIGN 289
#define XOR_ASSIGN 290
#define OR_ASSIGN 291
#define CASE 292
#define DEFAULT 293
#define IF 294
#define ELSE 295
#define SWITCH 296
#define WHILE 297
#define DO 298
#define FOR 299
#define CONTINUE 300
#define BREAK 301
#define RETURN 302
#define TRY 303
#define CATCH 304
#define FINALLY 305
#define THROW 306
#define DEBUGGER 307
#define DELETE 308
#define IMPORT 309
#define IN 310
#define OF 311
#define INSTANCEOF 312
#define NEW 313
#define TYPEOF 314
#define ELLIPSIS 315
#define TREMA 316
#define ASSERT 317
#define HLX 318
#define F_BRACKET 319
#define F_PAREN 320
#define PTRPTR 321
#define BIND_ARW 322
#define EXTEND_ARW 323
#define ASYNC_ARW 324
#define GEN_ARW 325
#define REV_ARW 326
#define DRFT_ARW 327




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
#line 200 "y.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

