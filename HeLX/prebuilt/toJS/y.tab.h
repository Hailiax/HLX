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
     CONSTANT = 259,
     STRING_LITERAL = 260,
     TEMPLATE_LITERAL = 261,
     REGEXP_LITERAL = 262,
     INC_OP = 263,
     DEC_OP = 264,
     LEFT_OP = 265,
     RIGHT_OP = 266,
     EQ_OP = 267,
     NE_OP = 268,
     NOT_OP = 269,
     XOR_OP = 270,
     AND_OP = 271,
     OR_OP = 272,
     MUL_ASSIGN = 273,
     DIV_ASSIGN = 274,
     MOD_ASSIGN = 275,
     ADD_ASSIGN = 276,
     NOT_ASSIGN = 277,
     EXP_ASSIGN = 278,
     SUB_ASSIGN = 279,
     LEFT_ASSIGN = 280,
     RIGHT_ASSIGN = 281,
     AND_ASSIGN = 282,
     XOR_ASSIGN = 283,
     OR_ASSIGN = 284,
     TYPE_NAME = 285,
     CASE = 286,
     DEFAULT = 287,
     IF = 288,
     ELSE = 289,
     SWITCH = 290,
     WHILE = 291,
     DO = 292,
     FOR = 293,
     CONTINUE = 294,
     BREAK = 295,
     RETURN = 296,
     TRY = 297,
     CATCH = 298,
     FINALLY = 299,
     THROW = 300,
     DEBUGGER = 301,
     DELETE = 302,
     IMPORT = 303,
     IN = 304,
     OF = 305,
     INSTANCEOF = 306,
     NEW = 307,
     TYPEOF = 308,
     ELLIPSIS = 309,
     MINI_ELLIPSIS = 310,
     ARROW_FUNC = 311,
     REV_ARROW = 312,
     BIND_OP = 313,
     TYPE_DEC = 314,
     HLX = 315
   };
#endif
/* Tokens.  */
#define IDENTIFIER 258
#define CONSTANT 259
#define STRING_LITERAL 260
#define TEMPLATE_LITERAL 261
#define REGEXP_LITERAL 262
#define INC_OP 263
#define DEC_OP 264
#define LEFT_OP 265
#define RIGHT_OP 266
#define EQ_OP 267
#define NE_OP 268
#define NOT_OP 269
#define XOR_OP 270
#define AND_OP 271
#define OR_OP 272
#define MUL_ASSIGN 273
#define DIV_ASSIGN 274
#define MOD_ASSIGN 275
#define ADD_ASSIGN 276
#define NOT_ASSIGN 277
#define EXP_ASSIGN 278
#define SUB_ASSIGN 279
#define LEFT_ASSIGN 280
#define RIGHT_ASSIGN 281
#define AND_ASSIGN 282
#define XOR_ASSIGN 283
#define OR_ASSIGN 284
#define TYPE_NAME 285
#define CASE 286
#define DEFAULT 287
#define IF 288
#define ELSE 289
#define SWITCH 290
#define WHILE 291
#define DO 292
#define FOR 293
#define CONTINUE 294
#define BREAK 295
#define RETURN 296
#define TRY 297
#define CATCH 298
#define FINALLY 299
#define THROW 300
#define DEBUGGER 301
#define DELETE 302
#define IMPORT 303
#define IN 304
#define OF 305
#define INSTANCEOF 306
#define NEW 307
#define TYPEOF 308
#define ELLIPSIS 309
#define MINI_ELLIPSIS 310
#define ARROW_FUNC 311
#define REV_ARROW 312
#define BIND_OP 313
#define TYPE_DEC 314
#define HLX 315




#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 1 "bisonGrammar.y"
{char* str;}
/* Line 1529 of yacc.c.  */
#line 171 "y.tab.h"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif

extern YYSTYPE yylval;

