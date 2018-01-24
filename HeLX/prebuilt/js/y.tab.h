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
     BOOL = 260,
     NUL = 261,
     UND = 262,
     STRING_LITERAL = 263,
     TEMPLATE_LITERAL = 264,
     REGEXP_LITERAL = 265,
     INC_OP = 266,
     DEC_OP = 267,
     LEFT_OP = 268,
     RIGHT_OP = 269,
     EQ_OP = 270,
     NE_OP = 271,
     NOT_OP = 272,
     XOR_OP = 273,
     AND_OP = 274,
     OR_OP = 275,
     MUL_ASSIGN = 276,
     DIV_ASSIGN = 277,
     MOD_ASSIGN = 278,
     ADD_ASSIGN = 279,
     NOT_ASSIGN = 280,
     EXP_ASSIGN = 281,
     SUB_ASSIGN = 282,
     LEFT_ASSIGN = 283,
     RIGHT_ASSIGN = 284,
     AND_ASSIGN = 285,
     XOR_ASSIGN = 286,
     OR_ASSIGN = 287,
     CASE = 288,
     DEFAULT = 289,
     IF = 290,
     ELSE = 291,
     SWITCH = 292,
     WHILE = 293,
     DO = 294,
     FOR = 295,
     CONTINUE = 296,
     BREAK = 297,
     RETURN = 298,
     TRY = 299,
     CATCH = 300,
     FINALLY = 301,
     THROW = 302,
     DEBUGGER = 303,
     DELETE = 304,
     IMPORT = 305,
     IN = 306,
     OF = 307,
     INSTANCEOF = 308,
     NEW = 309,
     TYPEOF = 310,
     ELLIPSIS = 311,
     TREMA = 312,
     ARROW_FUNC = 313,
     REV_ARROW = 314,
     BIND_OP = 315,
     ASSERT = 316,
     HLX = 317,
     F_BRACKET = 318,
     F_PAREN = 319
   };
#endif
/* Tokens.  */
#define IDENTIFIER 258
#define NUMBER 259
#define BOOL 260
#define NUL 261
#define UND 262
#define STRING_LITERAL 263
#define TEMPLATE_LITERAL 264
#define REGEXP_LITERAL 265
#define INC_OP 266
#define DEC_OP 267
#define LEFT_OP 268
#define RIGHT_OP 269
#define EQ_OP 270
#define NE_OP 271
#define NOT_OP 272
#define XOR_OP 273
#define AND_OP 274
#define OR_OP 275
#define MUL_ASSIGN 276
#define DIV_ASSIGN 277
#define MOD_ASSIGN 278
#define ADD_ASSIGN 279
#define NOT_ASSIGN 280
#define EXP_ASSIGN 281
#define SUB_ASSIGN 282
#define LEFT_ASSIGN 283
#define RIGHT_ASSIGN 284
#define AND_ASSIGN 285
#define XOR_ASSIGN 286
#define OR_ASSIGN 287
#define CASE 288
#define DEFAULT 289
#define IF 290
#define ELSE 291
#define SWITCH 292
#define WHILE 293
#define DO 294
#define FOR 295
#define CONTINUE 296
#define BREAK 297
#define RETURN 298
#define TRY 299
#define CATCH 300
#define FINALLY 301
#define THROW 302
#define DEBUGGER 303
#define DELETE 304
#define IMPORT 305
#define IN 306
#define OF 307
#define INSTANCEOF 308
#define NEW 309
#define TYPEOF 310
#define ELLIPSIS 311
#define TREMA 312
#define ARROW_FUNC 313
#define REV_ARROW 314
#define BIND_OP 315
#define ASSERT 316
#define HLX 317
#define F_BRACKET 318
#define F_PAREN 319




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 27 "toJS.y"
{char *str;}
/* Line 1529 of yacc.c.  */
#line 179 "y.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

