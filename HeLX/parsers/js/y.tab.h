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
     LE_OP = 277,
     GE_OP = 278,
     NOT_OP = 279,
     XOR_OP = 280,
     AND_OP = 281,
     OR_OP = 282,
     MUL_ASSIGN = 283,
     DIV_ASSIGN = 284,
     MOD_ASSIGN = 285,
     ADD_ASSIGN = 286,
     EXP_ASSIGN = 287,
     TERN_ASSIGN = 288,
     PTR_ASSIGN = 289,
     CONST_ASSIGN = 290,
     SUB_ASSIGN = 291,
     LEFT_ASSIGN = 292,
     RIGHT_ASSIGN = 293,
     ZRIGHT_ASSIGN = 294,
     AND_ASSIGN = 295,
     XOR_ASSIGN = 296,
     OR_ASSIGN = 297,
     CASE = 298,
     DEFAULT = 299,
     IF = 300,
     ELSE = 301,
     ELSEIF = 302,
     SWITCH = 303,
     CONTINUE = 304,
     BREAK = 305,
     RETURN = 306,
     RETURN_NOTHING = 307,
     FOR = 308,
     CNCRNT_FOR = 309,
     TRY = 310,
     CATCH = 311,
     THROW = 312,
     DELETE = 313,
     IMPORT = 314,
     INSTANCEOF = 315,
     TYPEOF = 316,
     TO = 317,
     IN = 318,
     OF = 319,
     AT = 320,
     ELLIPSIS = 321,
     ASSERT = 322,
     HLX = 323,
     FROM_HLX = 324,
     FUNC = 325,
     FUNC_1VAR = 326,
     END_STMT = 327
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
#define LE_OP 277
#define GE_OP 278
#define NOT_OP 279
#define XOR_OP 280
#define AND_OP 281
#define OR_OP 282
#define MUL_ASSIGN 283
#define DIV_ASSIGN 284
#define MOD_ASSIGN 285
#define ADD_ASSIGN 286
#define EXP_ASSIGN 287
#define TERN_ASSIGN 288
#define PTR_ASSIGN 289
#define CONST_ASSIGN 290
#define SUB_ASSIGN 291
#define LEFT_ASSIGN 292
#define RIGHT_ASSIGN 293
#define ZRIGHT_ASSIGN 294
#define AND_ASSIGN 295
#define XOR_ASSIGN 296
#define OR_ASSIGN 297
#define CASE 298
#define DEFAULT 299
#define IF 300
#define ELSE 301
#define ELSEIF 302
#define SWITCH 303
#define CONTINUE 304
#define BREAK 305
#define RETURN 306
#define RETURN_NOTHING 307
#define FOR 308
#define CNCRNT_FOR 309
#define TRY 310
#define CATCH 311
#define THROW 312
#define DELETE 313
#define IMPORT 314
#define INSTANCEOF 315
#define TYPEOF 316
#define TO 317
#define IN 318
#define OF 319
#define AT 320
#define ELLIPSIS 321
#define ASSERT 322
#define HLX 323
#define FROM_HLX 324
#define FUNC 325
#define FUNC_1VAR 326
#define END_STMT 327




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
#line 200 "y.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

