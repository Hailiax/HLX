/* A Bison parser, made by GNU Bison 2.3.  */

/* Skeleton implementation for Bison's Yacc-like parsers in C

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

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output.  */
#define YYBISON 1

/* Bison version.  */
#define YYBISON_VERSION "2.3"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Using locations.  */
#define YYLSP_NEEDED 0



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
     FOR = 306,
     CNCRNT_FOR = 307,
     TRY = 308,
     CATCH = 309,
     FINALLY = 310,
     THROW = 311,
     DEBUGGER = 312,
     DELETE = 313,
     IMPORT = 314,
     INSTANCEOF = 315,
     TYPEOF = 316,
     IN = 317,
     OF = 318,
     PTR_OF = 319,
     ELLIPSIS = 320,
     ASSERT = 321,
     HLX = 322,
     F_BRACKET = 323,
     F_PAREN = 324,
     FROM_HLX = 325,
     FUNC = 326,
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
#define FOR 306
#define CNCRNT_FOR 307
#define TRY 308
#define CATCH 309
#define FINALLY 310
#define THROW 311
#define DEBUGGER 312
#define DELETE 313
#define IMPORT 314
#define INSTANCEOF 315
#define TYPEOF 316
#define IN 317
#define OF 318
#define PTR_OF 319
#define ELLIPSIS 320
#define ASSERT 321
#define HLX 322
#define F_BRACKET 323
#define F_PAREN 324
#define FROM_HLX 325
#define FUNC 326
#define END_STMT 327




/* Copy the first part of user declarations.  */
#line 1 "parser.y"


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "includes/hashmap.h"
#include "includes/vars.h"
#include "includes/common.h"

void yyerror (char *s);
int yylex();

void new_HLX();



/* Enabling traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif

/* Enabling verbose error messages.  */
#ifdef YYERROR_VERBOSE
# undef YYERROR_VERBOSE
# define YYERROR_VERBOSE 1
#else
# define YYERROR_VERBOSE 0
#endif

/* Enabling the token table.  */
#ifndef YYTOKEN_TABLE
# define YYTOKEN_TABLE 0
#endif

#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED
typedef union YYSTYPE
#line 17 "parser.y"
{
	struct {
		char* s;
		llnode* v;
	} data;
}
/* Line 193 of yacc.c.  */
#line 263 "y.tab.c"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 276 "y.tab.c"

#ifdef short
# undef short
#endif

#ifdef YYTYPE_UINT8
typedef YYTYPE_UINT8 yytype_uint8;
#else
typedef unsigned char yytype_uint8;
#endif

#ifdef YYTYPE_INT8
typedef YYTYPE_INT8 yytype_int8;
#elif (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
typedef signed char yytype_int8;
#else
typedef short int yytype_int8;
#endif

#ifdef YYTYPE_UINT16
typedef YYTYPE_UINT16 yytype_uint16;
#else
typedef unsigned short int yytype_uint16;
#endif

#ifdef YYTYPE_INT16
typedef YYTYPE_INT16 yytype_int16;
#else
typedef short int yytype_int16;
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif ! defined YYSIZE_T && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned int
# endif
#endif

#define YYSIZE_MAXIMUM ((YYSIZE_T) -1)

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(msgid) dgettext ("bison-runtime", msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(msgid) msgid
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YYUSE(e) ((void) (e))
#else
# define YYUSE(e) /* empty */
#endif

/* Identity function, used to suppress warnings about constant conditions.  */
#ifndef lint
# define YYID(n) (n)
#else
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static int
YYID (int i)
#else
static int
YYID (i)
    int i;
#endif
{
  return i;
}
#endif

#if ! defined yyoverflow || YYERROR_VERBOSE

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#     ifndef _STDLIB_H
#      define _STDLIB_H 1
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's `empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (YYID (0))
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined _STDLIB_H \
       && ! ((defined YYMALLOC || defined malloc) \
	     && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef _STDLIB_H
#    define _STDLIB_H 1
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined _STDLIB_H && (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* ! defined yyoverflow || YYERROR_VERBOSE */


#if (! defined yyoverflow \
     && (! defined __cplusplus \
	 || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yytype_int16 yyss;
  YYSTYPE yyvs;
  };

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (sizeof (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (sizeof (yytype_int16) + sizeof (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

/* Copy COUNT objects from FROM to TO.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(To, From, Count) \
      __builtin_memcpy (To, From, (Count) * sizeof (*(From)))
#  else
#   define YYCOPY(To, From, Count)		\
      do					\
	{					\
	  YYSIZE_T yyi;				\
	  for (yyi = 0; yyi < (Count); yyi++)	\
	    (To)[yyi] = (From)[yyi];		\
	}					\
      while (YYID (0))
#  endif
# endif

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack)					\
    do									\
      {									\
	YYSIZE_T yynewbytes;						\
	YYCOPY (&yyptr->Stack, Stack, yysize);				\
	Stack = &yyptr->Stack;						\
	yynewbytes = yystacksize * sizeof (*Stack) + YYSTACK_GAP_MAXIMUM; \
	yyptr += yynewbytes / sizeof (*yyptr);				\
      }									\
    while (YYID (0))

#endif

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  55
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   698

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  95
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  30
/* YYNRULES -- Number of rules.  */
#define YYNRULES  115
/* YYNRULES -- Number of states.  */
#define YYNSTATES  193

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   327

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    87,     2,     2,     2,    86,    78,     2,
      91,    92,    83,    81,     2,    82,    88,    84,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    75,    73,
      79,    74,    80,    76,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    89,     2,    90,    85,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    93,    77,    94,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    38,    39,    40,    41,    42,    43,    44,
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54,
      55,    56,    57,    58,    59,    60,    61,    62,    63,    64,
      65,    66,    67,    68,    69,    70,    71,    72
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     6,     9,    11,    14,    16,    19,    21,
      23,    25,    27,    29,    33,    36,    40,    46,    52,    56,
      60,    66,    72,    78,    86,    88,    90,    92,    95,    97,
     101,   105,   109,   111,   115,   119,   123,   125,   130,   132,
     136,   138,   142,   144,   148,   150,   154,   156,   160,   162,
     166,   170,   172,   176,   180,   182,   186,   190,   194,   196,
     200,   204,   206,   210,   214,   218,   222,   224,   227,   230,
     232,   238,   243,   249,   253,   259,   262,   265,   267,   269,
     271,   273,   275,   277,   279,   281,   283,   285,   287,   289,
     291,   295,   299,   303,   306,   309,   312,   315,   319,   321,
     324,   328,   334,   339,   341,   344,   346,   348,   350,   352,
     354,   356,   358,   360,   362,   364
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int8 yyrhs[] =
{
      96,     0,    -1,    67,    98,    -1,    96,    96,    -1,    72,
      -1,    98,    72,    -1,    99,    -1,    98,    99,    -1,   104,
      -1,   100,    -1,   101,    -1,   102,    -1,   103,    -1,    41,
     104,    97,    -1,    42,    97,    -1,    43,   104,    97,    -1,
      43,   104,    97,    44,    97,    -1,    43,   104,    97,    44,
     101,    -1,    45,   104,    97,    -1,    46,   104,    97,    -1,
      51,     3,    62,   104,    97,    -1,    51,     3,    63,   104,
      97,    -1,    51,     3,    64,   104,    97,    -1,    51,   104,
      73,   104,    73,   104,    97,    -1,    48,    -1,    49,    -1,
      50,    -1,    50,   104,    -1,   105,    -1,   104,    74,   104,
      -1,   104,    32,   104,    -1,   104,    75,   104,    -1,   106,
      -1,   105,   124,   106,    -1,   105,    29,   106,    -1,   105,
      31,   106,    -1,   107,    -1,   107,    76,   104,   104,    -1,
     108,    -1,   107,    77,   108,    -1,   109,    -1,   108,    78,
     109,    -1,   110,    -1,   109,    25,   110,    -1,   111,    -1,
     110,    23,   111,    -1,   112,    -1,   111,    24,   112,    -1,
     113,    -1,   112,    20,   113,    -1,   112,    21,   113,    -1,
     114,    -1,   113,    79,   114,    -1,   113,    80,   114,    -1,
     115,    -1,   114,    17,   115,    -1,   114,    18,   115,    -1,
     114,    19,   115,    -1,   116,    -1,   115,    81,   116,    -1,
     115,    82,   116,    -1,   117,    -1,   116,    83,   117,    -1,
     116,    84,   117,    -1,   116,    85,   117,    -1,   116,    86,
     117,    -1,   118,    -1,    87,   117,    -1,    22,   117,    -1,
     119,    -1,   118,    88,    89,   104,    90,    -1,   118,    88,
      91,    92,    -1,   118,    88,    91,   120,    92,    -1,   118,
      88,     3,    -1,   118,    88,    93,   119,    94,    -1,   118,
      15,    -1,   118,    16,    -1,     3,    -1,     4,    -1,    10,
      -1,    11,    -1,     8,    -1,     9,    -1,    12,    -1,    14,
      -1,    13,    -1,     5,    -1,     6,    -1,     7,    -1,   122,
      -1,    70,   104,    92,    -1,    89,   121,    90,    -1,    89,
     120,    90,    -1,    89,    90,    -1,    68,    90,    -1,    91,
      92,    -1,    69,    92,    -1,    93,   104,    94,    -1,   104,
      -1,   120,   104,    -1,   104,    65,   104,    -1,    91,   123,
      92,    71,    97,    -1,    91,    92,    71,    97,    -1,     3,
      -1,   123,     3,    -1,    30,    -1,    26,    -1,    27,    -1,
      28,    -1,    34,    -1,    35,    -1,    36,    -1,    37,    -1,
      38,    -1,    39,    -1,    40,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint8 yyrline[] =
{
       0,    41,    41,    42,    50,    51,    55,    56,    60,    61,
      62,    63,    64,    68,    69,    73,    74,    75,    76,    80,
      82,    83,    84,    85,    89,    90,    91,    92,   100,   101,
     102,   103,   107,   108,   109,   110,   114,   115,   119,   120,
     124,   125,   129,   130,   134,   135,   139,   140,   144,   145,
     146,   150,   151,   152,   156,   157,   158,   159,   163,   164,
     165,   168,   169,   170,   171,   172,   176,   177,   178,   182,
     183,   184,   185,   186,   187,   188,   189,   193,   194,   195,
     196,   197,   198,   199,   200,   201,   202,   203,   204,   205,
     206,   207,   208,   209,   210,   211,   212,   213,   221,   222,
     226,   230,   231,   235,   236,   240,   241,   242,   243,   244,
     245,   246,   247,   248,   249,   250
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || YYTOKEN_TABLE
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "IDENTIFIER", "NUMBER", "STRING_LITERAL",
  "TEMPLATE_LITERAL", "REGEXP_LITERAL", "NUL", "UNDEFINED", "TRU", "FALS",
  "INFINITY", "NOTNUMBER", "EPSILON", "INC_OP", "DEC_OP", "LEFT_OP",
  "RIGHT_OP", "ZRIGHT_OP", "EQ_OP", "NE_OP", "NOT_OP", "XOR_OP", "AND_OP",
  "OR_OP", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN", "ADD_ASSIGN",
  "EXP_ASSIGN", "TERN_ASSIGN", "PTR_ASSIGN", "CONST_ASSIGN", "SUB_ASSIGN",
  "LEFT_ASSIGN", "RIGHT_ASSIGN", "ZRIGHT_ASSIGN", "AND_ASSIGN",
  "XOR_ASSIGN", "OR_ASSIGN", "CASE", "DEFAULT", "IF", "ELSE", "SWITCH",
  "WHILE", "DO", "CONTINUE", "BREAK", "RETURN", "FOR", "CNCRNT_FOR", "TRY",
  "CATCH", "FINALLY", "THROW", "DEBUGGER", "DELETE", "IMPORT",
  "INSTANCEOF", "TYPEOF", "IN", "OF", "PTR_OF", "ELLIPSIS", "ASSERT",
  "HLX", "F_BRACKET", "F_PAREN", "FROM_HLX", "FUNC", "END_STMT", "';'",
  "'='", "':'", "'?'", "'|'", "'&'", "'<'", "'>'", "'+'", "'-'", "'*'",
  "'/'", "'^'", "'%'", "'!'", "'.'", "'['", "']'", "'('", "')'", "'{'",
  "'}'", "$accept", "translation_unit", "statement_block",
  "statement_list", "statement", "labeled_statement",
  "selection_statement", "iteration_statement", "jump_statement",
  "expression", "assignment_expression", "constant_expression",
  "logical_or_expression", "logical_and_expression",
  "inclusive_or_expression", "exclusive_or_expression", "and_expression",
  "equality_expression", "relational_expression", "shift_expression",
  "additive_expression", "multiplicative_expression", "prefix_expression",
  "postfix_expression", "primary_expression", "expression_list", "range",
  "function_literal", "identifier_list", "assignment_operator", 0
};
#endif

# ifdef YYPRINT
/* YYTOKNUM[YYLEX-NUM] -- Internal token number corresponding to
   token YYLEX-NUM.  */
static const yytype_uint16 yytoknum[] =
{
       0,   256,   257,   258,   259,   260,   261,   262,   263,   264,
     265,   266,   267,   268,   269,   270,   271,   272,   273,   274,
     275,   276,   277,   278,   279,   280,   281,   282,   283,   284,
     285,   286,   287,   288,   289,   290,   291,   292,   293,   294,
     295,   296,   297,   298,   299,   300,   301,   302,   303,   304,
     305,   306,   307,   308,   309,   310,   311,   312,   313,   314,
     315,   316,   317,   318,   319,   320,   321,   322,   323,   324,
     325,   326,   327,    59,    61,    58,    63,   124,    38,    60,
      62,    43,    45,    42,    47,    94,    37,    33,    46,    91,
      93,    40,    41,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    95,    96,    96,    97,    97,    98,    98,    99,    99,
      99,    99,    99,   100,   100,   101,   101,   101,   101,   102,
     102,   102,   102,   102,   103,   103,   103,   103,   104,   104,
     104,   104,   105,   105,   105,   105,   106,   106,   107,   107,
     108,   108,   109,   109,   110,   110,   111,   111,   112,   112,
     112,   113,   113,   113,   114,   114,   114,   114,   115,   115,
     115,   116,   116,   116,   116,   116,   117,   117,   117,   118,
     118,   118,   118,   118,   118,   118,   118,   119,   119,   119,
     119,   119,   119,   119,   119,   119,   119,   119,   119,   119,
     119,   119,   119,   119,   119,   119,   119,   119,   120,   120,
     121,   122,   122,   123,   123,   124,   124,   124,   124,   124,
     124,   124,   124,   124,   124,   124
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     2,     2,     1,     2,     1,     2,     1,     1,
       1,     1,     1,     3,     2,     3,     5,     5,     3,     3,
       5,     5,     5,     7,     1,     1,     1,     2,     1,     3,
       3,     3,     1,     3,     3,     3,     1,     4,     1,     3,
       1,     3,     1,     3,     1,     3,     1,     3,     1,     3,
       3,     1,     3,     3,     1,     3,     3,     3,     1,     3,
       3,     1,     3,     3,     3,     3,     1,     2,     2,     1,
       5,     4,     5,     3,     5,     2,     2,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       3,     3,     3,     2,     2,     2,     2,     3,     1,     2,
       3,     5,     4,     1,     2,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,    77,    78,    86,    87,    88,    81,    82,
      79,    80,    83,    85,    84,     0,     0,     0,     0,     0,
       0,    24,    25,    26,     0,     0,     0,     0,     0,     0,
       0,     0,     2,     6,     9,    10,    11,    12,     8,    28,
      32,    36,    38,    40,    42,    44,    46,    48,    51,    54,
      58,    61,    66,    69,    89,     1,     3,    68,     0,     4,
      14,     0,     0,     0,     0,    27,    77,     0,    94,    96,
       0,    67,    93,    98,     0,     0,   103,    95,     0,     0,
       7,     0,     0,     0,   106,   107,   108,     0,   105,     0,
     109,   110,   111,   112,   113,   114,   115,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    75,    76,     0,
      13,     5,    15,    18,    19,     0,     0,     0,     0,    90,
       0,    92,    99,    91,     0,   104,     0,    97,    30,    29,
      31,    34,    35,    33,     0,    39,    41,    43,    45,    47,
      49,    50,    52,    53,    55,    56,    57,    59,    60,    62,
      63,    64,    65,    73,     0,     0,     0,     0,     0,     0,
       0,     0,   100,   102,     0,    37,     0,    71,    98,     0,
       0,    16,    10,    20,    21,    22,     0,   101,    70,    72,
      74,     0,    23
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,    56,    60,    61,    33,    34,    35,    36,    37,    38,
      39,    40,    41,    42,    43,    44,    45,    46,    47,    48,
      49,    50,    51,    52,    53,    74,    75,    54,    78,    97
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -69
static const yytype_int16 yypact[] =
{
     -51,   327,     5,   -69,   -69,   -69,   -69,   -69,   -69,   -69,
     -69,   -69,   -69,   -69,   -69,   577,   577,   221,   577,   577,
     577,   -69,   -69,   577,   605,   -68,   -67,   577,   577,   418,
       3,   577,   327,   -69,   -69,   -69,   -69,   -69,     1,   156,
     -69,     9,   -46,    13,    17,    29,    72,    66,    61,    69,
     -49,   -69,     8,   -69,   -69,   -69,   -51,   -69,   130,   -69,
     -69,   274,   130,   130,   130,     1,    57,    27,   -69,   -69,
     -11,   -69,   -69,    -4,   467,   -33,   -69,    12,     6,   -20,
     -69,   577,   577,   577,   -69,   -69,   -69,   577,   -69,   577,
     -69,   -69,   -69,   -69,   -69,   -69,   -69,   577,   577,   577,
     577,   577,   577,   577,   577,   577,   577,   577,   577,   577,
     577,   577,   577,   577,   577,   577,   577,   -69,   -69,    -2,
     -69,   -69,    16,   -69,   -69,   577,   577,   577,   577,   -69,
     577,   -69,     1,   -69,   221,   -69,    23,   -69,     1,     1,
       1,   -69,   -69,   -69,   376,   -46,    13,    17,    29,    72,
      66,    66,    61,    61,    69,    69,    69,   -49,   -49,   -69,
     -69,   -69,   -69,   -69,   577,   509,    38,   221,   130,   130,
     130,    30,     1,   -69,   221,     1,    -6,   -69,     1,   537,
     -21,   -69,    10,   -69,   -69,   -69,   577,   -69,   -69,   -69,
     -69,   130,   -69
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int8 yypgoto[] =
{
     -69,    88,   -44,    96,    -5,   -69,   -54,   -69,   -69,   -16,
     -69,   -58,   -69,     0,    22,    31,    56,    58,    52,    53,
      45,    54,     2,   -69,    11,    -1,   -69,   -69,   -69,   -69
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -18
static const yytype_int16 yytable[] =
{
      58,   163,    62,    63,    64,    55,    76,    65,    67,   135,
     -17,    70,    81,    73,   120,    79,     1,    57,   122,   123,
     124,    81,    68,   117,   118,    69,    81,    80,    81,   141,
      71,   142,   100,    81,   113,   114,   115,   116,   101,   143,
     102,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,   103,    82,    83,    80,   133,   132,    81,
     167,   130,    81,    82,    83,   138,   139,   140,    82,    83,
      82,    83,     1,   190,   137,    82,    83,   -17,   108,   109,
     110,   129,   144,   134,   188,    98,    99,   164,     2,   165,
     173,   166,   104,   105,   174,    77,   119,    32,   136,   145,
     128,    82,    83,   186,    82,    83,    25,    26,    27,   168,
     169,   170,   171,   182,   172,   159,   160,   161,   162,   125,
     126,   127,   146,   181,   183,   184,   185,    29,   175,    30,
     187,    31,   147,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,   106,   107,   192,   176,   178,
     111,   112,    15,   154,   155,   156,   150,   151,   148,   152,
     153,   149,    81,   132,   179,   157,   158,     0,     0,     0,
     191,    16,    17,    18,     0,    19,    20,   180,    21,    22,
      23,    24,    84,    85,    86,    87,    88,    89,     0,     0,
      90,    91,    92,    93,    94,    95,    96,     0,    25,    26,
      27,     0,    59,     0,    82,    83,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    28,     0,    29,
       0,    30,     0,    31,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,     0,     0,     0,     0,
       0,     0,     0,    15,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    16,    17,    18,     0,    19,    20,     0,    21,
      22,    23,    24,     0,     0,     0,     0,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    25,
      26,    27,     0,    59,     0,     0,    15,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    28,     0,
      29,     0,    30,     0,    31,    16,    17,    18,     0,    19,
      20,     0,    21,    22,    23,    24,     0,     0,     0,     0,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    25,    26,    27,     0,   121,     0,     0,    15,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    28,     0,    29,     0,    30,     0,    31,    16,    17,
      18,     0,    19,    20,     0,    21,    22,    23,    24,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,     0,     0,     0,     0,    25,    26,    27,    15,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    81,     0,
       0,     0,     0,     0,    28,     0,    29,     0,    30,     0,
      31,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,     0,     0,     0,     0,     0,     0,     0,
      15,     0,     0,     0,    25,    26,    27,     0,     0,     0,
      82,    83,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    28,     0,    29,     0,    30,     0,    31,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,     0,     0,     0,     0,    25,    26,    27,    15,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    28,     0,    29,    72,    30,
       0,    31,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,     0,     0,     0,     0,     0,     0,
       0,    15,     0,     0,     0,    25,    26,    27,     0,     0,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,     0,     0,    28,     0,    29,   131,    30,    15,
      31,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    25,    26,    27,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,     0,     0,     0,     0,    28,     0,    29,    15,
      30,   177,    31,     0,     0,    25,    26,    27,    66,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
       0,     0,     0,     0,    28,     0,    29,    15,    30,   189,
      31,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    25,    26,    27,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    28,     0,    29,     0,    30,     0,
      31,     0,     0,    25,    26,    27,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    28,     0,    29,     0,    30,     0,    31
};

static const yytype_int16 yycheck[] =
{
      16,     3,    18,    19,    20,     0,     3,    23,    24,     3,
       0,    27,    32,    29,    58,    31,    67,    15,    62,    63,
      64,    32,    90,    15,    16,    92,    32,    32,    32,    87,
      28,    89,    78,    32,    83,    84,    85,    86,    25,    97,
      23,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    24,    74,    75,    61,    90,    74,    32,
      44,    65,    32,    74,    75,    81,    82,    83,    74,    75,
      74,    75,    67,    94,    94,    74,    75,    67,    17,    18,
      19,    92,    98,    71,    90,    76,    77,    89,     0,    91,
     134,    93,    20,    21,    71,    92,    88,     1,    92,    99,
      73,    74,    75,    73,    74,    75,    68,    69,    70,   125,
     126,   127,   128,   167,   130,   113,   114,   115,   116,    62,
      63,    64,   100,   167,   168,   169,   170,    89,   144,    91,
     174,    93,   101,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    79,    80,   191,   164,   165,
      81,    82,    22,   108,   109,   110,   104,   105,   102,   106,
     107,   103,    32,   179,   165,   111,   112,    -1,    -1,    -1,
     186,    41,    42,    43,    -1,    45,    46,   166,    48,    49,
      50,    51,    26,    27,    28,    29,    30,    31,    -1,    -1,
      34,    35,    36,    37,    38,    39,    40,    -1,    68,    69,
      70,    -1,    72,    -1,    74,    75,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    87,    -1,    89,
      -1,    91,    -1,    93,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    22,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    41,    42,    43,    -1,    45,    46,    -1,    48,
      49,    50,    51,    -1,    -1,    -1,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    68,
      69,    70,    -1,    72,    -1,    -1,    22,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    87,    -1,
      89,    -1,    91,    -1,    93,    41,    42,    43,    -1,    45,
      46,    -1,    48,    49,    50,    51,    -1,    -1,    -1,    -1,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    68,    69,    70,    -1,    72,    -1,    -1,    22,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    87,    -1,    89,    -1,    91,    -1,    93,    41,    42,
      43,    -1,    45,    46,    -1,    48,    49,    50,    51,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    -1,    -1,    -1,    -1,    68,    69,    70,    22,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    32,    -1,
      -1,    -1,    -1,    -1,    87,    -1,    89,    -1,    91,    -1,
      93,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      22,    -1,    -1,    -1,    68,    69,    70,    -1,    -1,    -1,
      74,    75,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    87,    -1,    89,    -1,    91,    -1,    93,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    -1,    -1,    68,    69,    70,    22,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    87,    -1,    89,    90,    91,
      -1,    93,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,    -1,    68,    69,    70,    -1,    -1,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    87,    -1,    89,    90,    91,    22,
      93,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    68,    69,    70,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    -1,    -1,    87,    -1,    89,    22,
      91,    92,    93,    -1,    -1,    68,    69,    70,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      -1,    -1,    -1,    -1,    87,    -1,    89,    22,    91,    92,
      93,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    68,    69,    70,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    87,    -1,    89,    -1,    91,    -1,
      93,    -1,    -1,    68,    69,    70,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    87,    -1,    89,    -1,    91,    -1,    93
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    67,    96,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    22,    41,    42,    43,    45,
      46,    48,    49,    50,    51,    68,    69,    70,    87,    89,
      91,    93,    98,    99,   100,   101,   102,   103,   104,   105,
     106,   107,   108,   109,   110,   111,   112,   113,   114,   115,
     116,   117,   118,   119,   122,     0,    96,   117,   104,    72,
      97,    98,   104,   104,   104,   104,     3,   104,    90,    92,
     104,   117,    90,   104,   120,   121,     3,    92,   123,   104,
      99,    32,    74,    75,    26,    27,    28,    29,    30,    31,
      34,    35,    36,    37,    38,    39,    40,   124,    76,    77,
      78,    25,    23,    24,    20,    21,    79,    80,    17,    18,
      19,    81,    82,    83,    84,    85,    86,    15,    16,    88,
      97,    72,    97,    97,    97,    62,    63,    64,    73,    92,
      65,    90,   104,    90,    71,     3,    92,    94,   104,   104,
     104,   106,   106,   106,   104,   108,   109,   110,   111,   112,
     113,   113,   114,   114,   115,   115,   115,   116,   116,   117,
     117,   117,   117,     3,    89,    91,    93,    44,   104,   104,
     104,   104,   104,    97,    71,   104,   104,    92,   104,   120,
     119,    97,   101,    97,    97,    97,    73,    97,    90,    92,
      94,   104,    97
};

#define yyerrok		(yyerrstatus = 0)
#define yyclearin	(yychar = YYEMPTY)
#define YYEMPTY		(-2)
#define YYEOF		0

#define YYACCEPT	goto yyacceptlab
#define YYABORT		goto yyabortlab
#define YYERROR		goto yyerrorlab


/* Like YYERROR except do call yyerror.  This remains here temporarily
   to ease the transition to the new meaning of YYERROR, for GCC.
   Once GCC version 2 has supplanted version 1, this can go.  */

#define YYFAIL		goto yyerrlab

#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)					\
do								\
  if (yychar == YYEMPTY && yylen == 1)				\
    {								\
      yychar = (Token);						\
      yylval = (Value);						\
      yytoken = YYTRANSLATE (yychar);				\
      YYPOPSTACK (1);						\
      goto yybackup;						\
    }								\
  else								\
    {								\
      yyerror (YY_("syntax error: cannot back up")); \
      YYERROR;							\
    }								\
while (YYID (0))


#define YYTERROR	1
#define YYERRCODE	256


/* YYLLOC_DEFAULT -- Set CURRENT to span from RHS[1] to RHS[N].
   If N is 0, then set CURRENT to the empty location which ends
   the previous symbol: RHS[0] (always defined).  */

#define YYRHSLOC(Rhs, K) ((Rhs)[K])
#ifndef YYLLOC_DEFAULT
# define YYLLOC_DEFAULT(Current, Rhs, N)				\
    do									\
      if (YYID (N))                                                    \
	{								\
	  (Current).first_line   = YYRHSLOC (Rhs, 1).first_line;	\
	  (Current).first_column = YYRHSLOC (Rhs, 1).first_column;	\
	  (Current).last_line    = YYRHSLOC (Rhs, N).last_line;		\
	  (Current).last_column  = YYRHSLOC (Rhs, N).last_column;	\
	}								\
      else								\
	{								\
	  (Current).first_line   = (Current).last_line   =		\
	    YYRHSLOC (Rhs, 0).last_line;				\
	  (Current).first_column = (Current).last_column =		\
	    YYRHSLOC (Rhs, 0).last_column;				\
	}								\
    while (YYID (0))
#endif


/* YY_LOCATION_PRINT -- Print the location on the stream.
   This macro was not mandated originally: define only if we know
   we won't break user code: when these are the locations we know.  */

#ifndef YY_LOCATION_PRINT
# if defined YYLTYPE_IS_TRIVIAL && YYLTYPE_IS_TRIVIAL
#  define YY_LOCATION_PRINT(File, Loc)			\
     fprintf (File, "%d.%d-%d.%d",			\
	      (Loc).first_line, (Loc).first_column,	\
	      (Loc).last_line,  (Loc).last_column)
# else
#  define YY_LOCATION_PRINT(File, Loc) ((void) 0)
# endif
#endif


/* YYLEX -- calling `yylex' with the right arguments.  */

#ifdef YYLEX_PARAM
# define YYLEX yylex (YYLEX_PARAM)
#else
# define YYLEX yylex ()
#endif

/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)			\
do {						\
  if (yydebug)					\
    YYFPRINTF Args;				\
} while (YYID (0))

# define YY_SYMBOL_PRINT(Title, Type, Value, Location)			  \
do {									  \
  if (yydebug)								  \
    {									  \
      YYFPRINTF (stderr, "%s ", Title);					  \
      yy_symbol_print (stderr,						  \
		  Type, Value); \
      YYFPRINTF (stderr, "\n");						  \
    }									  \
} while (YYID (0))


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

/*ARGSUSED*/
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_symbol_value_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
#else
static void
yy_symbol_value_print (yyoutput, yytype, yyvaluep)
    FILE *yyoutput;
    int yytype;
    YYSTYPE const * const yyvaluep;
#endif
{
  if (!yyvaluep)
    return;
# ifdef YYPRINT
  if (yytype < YYNTOKENS)
    YYPRINT (yyoutput, yytoknum[yytype], *yyvaluep);
# else
  YYUSE (yyoutput);
# endif
  switch (yytype)
    {
      default:
	break;
    }
}


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_symbol_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
#else
static void
yy_symbol_print (yyoutput, yytype, yyvaluep)
    FILE *yyoutput;
    int yytype;
    YYSTYPE const * const yyvaluep;
#endif
{
  if (yytype < YYNTOKENS)
    YYFPRINTF (yyoutput, "token %s (", yytname[yytype]);
  else
    YYFPRINTF (yyoutput, "nterm %s (", yytname[yytype]);

  yy_symbol_value_print (yyoutput, yytype, yyvaluep);
  YYFPRINTF (yyoutput, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_stack_print (yytype_int16 *bottom, yytype_int16 *top)
#else
static void
yy_stack_print (bottom, top)
    yytype_int16 *bottom;
    yytype_int16 *top;
#endif
{
  YYFPRINTF (stderr, "Stack now");
  for (; bottom <= top; ++bottom)
    YYFPRINTF (stderr, " %d", *bottom);
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)				\
do {								\
  if (yydebug)							\
    yy_stack_print ((Bottom), (Top));				\
} while (YYID (0))


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yy_reduce_print (YYSTYPE *yyvsp, int yyrule)
#else
static void
yy_reduce_print (yyvsp, yyrule)
    YYSTYPE *yyvsp;
    int yyrule;
#endif
{
  int yynrhs = yyr2[yyrule];
  int yyi;
  unsigned long int yylno = yyrline[yyrule];
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %lu):\n",
	     yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      fprintf (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr, yyrhs[yyprhs[yyrule] + yyi],
		       &(yyvsp[(yyi + 1) - (yynrhs)])
		       		       );
      fprintf (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)		\
do {					\
  if (yydebug)				\
    yy_reduce_print (yyvsp, Rule); \
} while (YYID (0))

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args)
# define YY_SYMBOL_PRINT(Title, Type, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef	YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif



#if YYERROR_VERBOSE

# ifndef yystrlen
#  if defined __GLIBC__ && defined _STRING_H
#   define yystrlen strlen
#  else
/* Return the length of YYSTR.  */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static YYSIZE_T
yystrlen (const char *yystr)
#else
static YYSIZE_T
yystrlen (yystr)
    const char *yystr;
#endif
{
  YYSIZE_T yylen;
  for (yylen = 0; yystr[yylen]; yylen++)
    continue;
  return yylen;
}
#  endif
# endif

# ifndef yystpcpy
#  if defined __GLIBC__ && defined _STRING_H && defined _GNU_SOURCE
#   define yystpcpy stpcpy
#  else
/* Copy YYSRC to YYDEST, returning the address of the terminating '\0' in
   YYDEST.  */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static char *
yystpcpy (char *yydest, const char *yysrc)
#else
static char *
yystpcpy (yydest, yysrc)
    char *yydest;
    const char *yysrc;
#endif
{
  char *yyd = yydest;
  const char *yys = yysrc;

  while ((*yyd++ = *yys++) != '\0')
    continue;

  return yyd - 1;
}
#  endif
# endif

# ifndef yytnamerr
/* Copy to YYRES the contents of YYSTR after stripping away unnecessary
   quotes and backslashes, so that it's suitable for yyerror.  The
   heuristic is that double-quoting is unnecessary unless the string
   contains an apostrophe, a comma, or backslash (other than
   backslash-backslash).  YYSTR is taken from yytname.  If YYRES is
   null, do not copy; instead, return the length of what the result
   would have been.  */
static YYSIZE_T
yytnamerr (char *yyres, const char *yystr)
{
  if (*yystr == '"')
    {
      YYSIZE_T yyn = 0;
      char const *yyp = yystr;

      for (;;)
	switch (*++yyp)
	  {
	  case '\'':
	  case ',':
	    goto do_not_strip_quotes;

	  case '\\':
	    if (*++yyp != '\\')
	      goto do_not_strip_quotes;
	    /* Fall through.  */
	  default:
	    if (yyres)
	      yyres[yyn] = *yyp;
	    yyn++;
	    break;

	  case '"':
	    if (yyres)
	      yyres[yyn] = '\0';
	    return yyn;
	  }
    do_not_strip_quotes: ;
    }

  if (! yyres)
    return yystrlen (yystr);

  return yystpcpy (yyres, yystr) - yyres;
}
# endif

/* Copy into YYRESULT an error message about the unexpected token
   YYCHAR while in state YYSTATE.  Return the number of bytes copied,
   including the terminating null byte.  If YYRESULT is null, do not
   copy anything; just return the number of bytes that would be
   copied.  As a special case, return 0 if an ordinary "syntax error"
   message will do.  Return YYSIZE_MAXIMUM if overflow occurs during
   size calculation.  */
static YYSIZE_T
yysyntax_error (char *yyresult, int yystate, int yychar)
{
  int yyn = yypact[yystate];

  if (! (YYPACT_NINF < yyn && yyn <= YYLAST))
    return 0;
  else
    {
      int yytype = YYTRANSLATE (yychar);
      YYSIZE_T yysize0 = yytnamerr (0, yytname[yytype]);
      YYSIZE_T yysize = yysize0;
      YYSIZE_T yysize1;
      int yysize_overflow = 0;
      enum { YYERROR_VERBOSE_ARGS_MAXIMUM = 5 };
      char const *yyarg[YYERROR_VERBOSE_ARGS_MAXIMUM];
      int yyx;

# if 0
      /* This is so xgettext sees the translatable formats that are
	 constructed on the fly.  */
      YY_("syntax error, unexpected %s");
      YY_("syntax error, unexpected %s, expecting %s");
      YY_("syntax error, unexpected %s, expecting %s or %s");
      YY_("syntax error, unexpected %s, expecting %s or %s or %s");
      YY_("syntax error, unexpected %s, expecting %s or %s or %s or %s");
# endif
      char *yyfmt;
      char const *yyf;
      static char const yyunexpected[] = "syntax error, unexpected %s";
      static char const yyexpecting[] = ", expecting %s";
      static char const yyor[] = " or %s";
      char yyformat[sizeof yyunexpected
		    + sizeof yyexpecting - 1
		    + ((YYERROR_VERBOSE_ARGS_MAXIMUM - 2)
		       * (sizeof yyor - 1))];
      char const *yyprefix = yyexpecting;

      /* Start YYX at -YYN if negative to avoid negative indexes in
	 YYCHECK.  */
      int yyxbegin = yyn < 0 ? -yyn : 0;

      /* Stay within bounds of both yycheck and yytname.  */
      int yychecklim = YYLAST - yyn + 1;
      int yyxend = yychecklim < YYNTOKENS ? yychecklim : YYNTOKENS;
      int yycount = 1;

      yyarg[0] = yytname[yytype];
      yyfmt = yystpcpy (yyformat, yyunexpected);

      for (yyx = yyxbegin; yyx < yyxend; ++yyx)
	if (yycheck[yyx + yyn] == yyx && yyx != YYTERROR)
	  {
	    if (yycount == YYERROR_VERBOSE_ARGS_MAXIMUM)
	      {
		yycount = 1;
		yysize = yysize0;
		yyformat[sizeof yyunexpected - 1] = '\0';
		break;
	      }
	    yyarg[yycount++] = yytname[yyx];
	    yysize1 = yysize + yytnamerr (0, yytname[yyx]);
	    yysize_overflow |= (yysize1 < yysize);
	    yysize = yysize1;
	    yyfmt = yystpcpy (yyfmt, yyprefix);
	    yyprefix = yyor;
	  }

      yyf = YY_(yyformat);
      yysize1 = yysize + yystrlen (yyf);
      yysize_overflow |= (yysize1 < yysize);
      yysize = yysize1;

      if (yysize_overflow)
	return YYSIZE_MAXIMUM;

      if (yyresult)
	{
	  /* Avoid sprintf, as that infringes on the user's name space.
	     Don't have undefined behavior even if the translation
	     produced a string with the wrong number of "%s"s.  */
	  char *yyp = yyresult;
	  int yyi = 0;
	  while ((*yyp = *yyf) != '\0')
	    {
	      if (*yyp == '%' && yyf[1] == 's' && yyi < yycount)
		{
		  yyp += yytnamerr (yyp, yyarg[yyi++]);
		  yyf += 2;
		}
	      else
		{
		  yyp++;
		  yyf++;
		}
	    }
	}
      return yysize;
    }
}
#endif /* YYERROR_VERBOSE */


/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

/*ARGSUSED*/
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
static void
yydestruct (const char *yymsg, int yytype, YYSTYPE *yyvaluep)
#else
static void
yydestruct (yymsg, yytype, yyvaluep)
    const char *yymsg;
    int yytype;
    YYSTYPE *yyvaluep;
#endif
{
  YYUSE (yyvaluep);

  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yytype, yyvaluep, yylocationp);

  switch (yytype)
    {

      default:
	break;
    }
}


/* Prevent warnings from -Wmissing-prototypes.  */

#ifdef YYPARSE_PARAM
#if defined __STDC__ || defined __cplusplus
int yyparse (void *YYPARSE_PARAM);
#else
int yyparse ();
#endif
#else /* ! YYPARSE_PARAM */
#if defined __STDC__ || defined __cplusplus
int yyparse (void);
#else
int yyparse ();
#endif
#endif /* ! YYPARSE_PARAM */



/* The look-ahead symbol.  */
int yychar;

/* The semantic value of the look-ahead symbol.  */
YYSTYPE yylval;

/* Number of syntax errors so far.  */
int yynerrs;



/*----------.
| yyparse.  |
`----------*/

#ifdef YYPARSE_PARAM
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
int
yyparse (void *YYPARSE_PARAM)
#else
int
yyparse (YYPARSE_PARAM)
    void *YYPARSE_PARAM;
#endif
#else /* ! YYPARSE_PARAM */
#if (defined __STDC__ || defined __C99__FUNC__ \
     || defined __cplusplus || defined _MSC_VER)
int
yyparse (void)
#else
int
yyparse ()

#endif
#endif
{
  
  int yystate;
  int yyn;
  int yyresult;
  /* Number of tokens to shift before error messages enabled.  */
  int yyerrstatus;
  /* Look-ahead token as an internal (translated) token number.  */
  int yytoken = 0;
#if YYERROR_VERBOSE
  /* Buffer for error messages, and its allocated size.  */
  char yymsgbuf[128];
  char *yymsg = yymsgbuf;
  YYSIZE_T yymsg_alloc = sizeof yymsgbuf;
#endif

  /* Three stacks and their tools:
     `yyss': related to states,
     `yyvs': related to semantic values,
     `yyls': related to locations.

     Refer to the stacks thru separate pointers, to allow yyoverflow
     to reallocate them elsewhere.  */

  /* The state stack.  */
  yytype_int16 yyssa[YYINITDEPTH];
  yytype_int16 *yyss = yyssa;
  yytype_int16 *yyssp;

  /* The semantic value stack.  */
  YYSTYPE yyvsa[YYINITDEPTH];
  YYSTYPE *yyvs = yyvsa;
  YYSTYPE *yyvsp;



#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  YYSIZE_T yystacksize = YYINITDEPTH;

  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;


  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yystate = 0;
  yyerrstatus = 0;
  yynerrs = 0;
  yychar = YYEMPTY;		/* Cause a token to be read.  */

  /* Initialize stack pointers.
     Waste one element of value and location stack
     so that they stay on the same level as the state stack.
     The wasted elements are never initialized.  */

  yyssp = yyss;
  yyvsp = yyvs;

  goto yysetstate;

/*------------------------------------------------------------.
| yynewstate -- Push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
 yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;

 yysetstate:
  *yyssp = yystate;

  if (yyss + yystacksize - 1 <= yyssp)
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYSIZE_T yysize = yyssp - yyss + 1;

#ifdef yyoverflow
      {
	/* Give user a chance to reallocate the stack.  Use copies of
	   these so that the &'s don't force the real ones into
	   memory.  */
	YYSTYPE *yyvs1 = yyvs;
	yytype_int16 *yyss1 = yyss;


	/* Each stack pointer address is followed by the size of the
	   data in use in that stack, in bytes.  This used to be a
	   conditional around just the two extra args, but that might
	   be undefined if yyoverflow is a macro.  */
	yyoverflow (YY_("memory exhausted"),
		    &yyss1, yysize * sizeof (*yyssp),
		    &yyvs1, yysize * sizeof (*yyvsp),

		    &yystacksize);

	yyss = yyss1;
	yyvs = yyvs1;
      }
#else /* no yyoverflow */
# ifndef YYSTACK_RELOCATE
      goto yyexhaustedlab;
# else
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
	goto yyexhaustedlab;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
	yystacksize = YYMAXDEPTH;

      {
	yytype_int16 *yyss1 = yyss;
	union yyalloc *yyptr =
	  (union yyalloc *) YYSTACK_ALLOC (YYSTACK_BYTES (yystacksize));
	if (! yyptr)
	  goto yyexhaustedlab;
	YYSTACK_RELOCATE (yyss);
	YYSTACK_RELOCATE (yyvs);

#  undef YYSTACK_RELOCATE
	if (yyss1 != yyssa)
	  YYSTACK_FREE (yyss1);
      }
# endif
#endif /* no yyoverflow */

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;


      YYDPRINTF ((stderr, "Stack size increased to %lu\n",
		  (unsigned long int) yystacksize));

      if (yyss + yystacksize - 1 <= yyssp)
	YYABORT;
    }

  YYDPRINTF ((stderr, "Entering state %d\n", yystate));

  goto yybackup;

/*-----------.
| yybackup.  |
`-----------*/
yybackup:

  /* Do appropriate processing given the current state.  Read a
     look-ahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to look-ahead token.  */
  yyn = yypact[yystate];
  if (yyn == YYPACT_NINF)
    goto yydefault;

  /* Not known => get a look-ahead token if don't already have one.  */

  /* YYCHAR is either YYEMPTY or YYEOF or a valid look-ahead symbol.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token: "));
      yychar = YYLEX;
    }

  if (yychar <= YYEOF)
    {
      yychar = yytoken = YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yyn == 0 || yyn == YYTABLE_NINF)
	goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  if (yyn == YYFINAL)
    YYACCEPT;

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the look-ahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);

  /* Discard the shifted token unless it is eof.  */
  if (yychar != YYEOF)
    yychar = YYEMPTY;

  yystate = yyn;
  *++yyvsp = yylval;

  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- Do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     `$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
        case 2:
#line 41 "parser.y"
    {(yyval.data).s = cat(end_scope((yyvsp[(2) - (2)].data).v,0),(yyvsp[(2) - (2)].data).s); printf("%s\n",(yyval.data).s); new_HLX();}
    break;

  case 3:
#line 42 "parser.y"
    {;}
    break;

  case 4:
#line 50 "parser.y"
    {;}
    break;

  case 5:
#line 51 "parser.y"
    {(yyval.data).s = (yyvsp[(1) - (2)].data).s;}
    break;

  case 6:
#line 55 "parser.y"
    {;}
    break;

  case 7:
#line 56 "parser.y"
    {(yyval.data).s = cat((yyvsp[(1) - (2)].data).s,(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 8:
#line 60 "parser.y"
    {(yyval.data).s = cat((yyvsp[(1) - (1)].data).s,";");}
    break;

  case 9:
#line 61 "parser.y"
    {;}
    break;

  case 10:
#line 62 "parser.y"
    {;}
    break;

  case 11:
#line 63 "parser.y"
    {;}
    break;

  case 12:
#line 64 "parser.y"
    {;}
    break;

  case 13:
#line 68 "parser.y"
    {(yyval.data).s = cat(cat(cat("case ",(yyvsp[(2) - (3)].data).s),".$[0]:"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 14:
#line 69 "parser.y"
    {(yyval.data).s = cat("default:",cat(end_scope((yyvsp[(2) - (2)].data).v,0),(yyvsp[(2) - (2)].data).s));}
    break;

  case 15:
#line 73 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("if(",(yyvsp[(2) - (3)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 16:
#line 74 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (5)].data).v,0),(yyvsp[(3) - (5)].data).s)),"}else{"),cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (5)].data).v;}
    break;

  case 17:
#line 75 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (5)].data).v,0),(yyvsp[(3) - (5)].data).s)),"}else "),cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)); (yyval.data).v = llcat((yyvsp[(2) - (5)].data).v,(yyvsp[(5) - (5)].data).v);}
    break;

  case 18:
#line 76 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("switch(",(yyvsp[(2) - (3)].data).s),".$[0]){"),(yyvsp[(3) - (3)].data).s),"}"); end_scope((yyvsp[(3) - (3)].data).v,0); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 19:
#line 80 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("while(",(yyvsp[(2) - (3)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 20:
#line 82 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," in "),(yyvsp[(4) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 21:
#line 83 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," of $c("),(yyvsp[(4) - (5)].data).s),".$[0],true)){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 22:
#line 84 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," of "),(yyvsp[(4) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 23:
#line 85 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat(cat("for(",(yyvsp[(2) - (7)].data).s),";"),(yyvsp[(4) - (7)].data).s),".$[0];"),(yyvsp[(6) - (7)].data).s),"){"),cat(end_scope((yyvsp[(7) - (7)].data).v,(yyvsp[(2) - (7)].data).v),(yyvsp[(7) - (7)].data).s)),"}"); (yyval.data).v = llcat((yyvsp[(2) - (7)].data).v,llcat((yyvsp[(4) - (7)].data).v,(yyvsp[(6) - (7)].data).v));}
    break;

  case 24:
#line 89 "parser.y"
    {(yyval.data).s = "continue;";}
    break;

  case 25:
#line 90 "parser.y"
    {(yyval.data).s = "break;";}
    break;

  case 26:
#line 91 "parser.y"
    {(yyval.data).s = "return;";}
    break;

  case 27:
#line 92 "parser.y"
    {(yyval.data).s = cat(cat("return ",(yyvsp[(2) - (2)].data).s),";"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 28:
#line 100 "parser.y"
    {;}
    break;

  case 29:
#line 101 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 30:
#line 102 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$="),(yyvsp[(3) - (3)].data).s),".$,"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 31:
#line 103 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")")),",this."),(yyvsp[(1) - (3)].data).s),"="),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 32:
#line 107 "parser.y"
    {;}
    break;

  case 33:
#line 108 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]"),(yyvsp[(2) - (3)].data).s),(yyvsp[(3) - (3)].data).s),".$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 34:
#line 109 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"=$v($a("),(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 35:
#line 110 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"=$w("),(yyvsp[(1) - (3)].data).s),").$[0]?"),(yyvsp[(1) - (3)].data).s),":"),(yyvsp[(3) - (3)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 36:
#line 114 "parser.y"
    {;}
    break;

  case 37:
#line 115 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (4)].data).s,"?"),(yyvsp[(3) - (4)].data).s ),":"),(yyvsp[(4) - (4)].data).s); (yyval.data).v = llcat(llcat((yyvsp[(1) - (4)].data).v,(yyvsp[(3) - (4)].data).v),(yyvsp[(4) - (4)].data).v);}
    break;

  case 38:
#line 119 "parser.y"
    {;}
    break;

  case 39:
#line 120 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]||"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 40:
#line 124 "parser.y"
    {;}
    break;

  case 41:
#line 125 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 42:
#line 129 "parser.y"
    {;}
    break;

  case 43:
#line 130 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]|"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 44:
#line 134 "parser.y"
    {;}
    break;

  case 45:
#line 135 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]^"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 46:
#line 139 "parser.y"
    {;}
    break;

  case 47:
#line 140 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 48:
#line 144 "parser.y"
    {;}
    break;

  case 49:
#line 145 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 50:
#line 146 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(!$e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 51:
#line 150 "parser.y"
    {;}
    break;

  case 52:
#line 151 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 53:
#line 152 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 54:
#line 156 "parser.y"
    {;}
    break;

  case 55:
#line 157 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 56:
#line 158 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 57:
#line 159 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),".$[0]>>>"),(yyvsp[(3) - (3)].data).s),".$[0]]"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 58:
#line 163 "parser.y"
    {;}
    break;

  case 59:
#line 164 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($a(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 60:
#line 165 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]-"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 61:
#line 168 "parser.y"
    {;}
    break;

  case 62:
#line 169 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]*"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 63:
#line 170 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]/"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 64:
#line 171 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]**"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 65:
#line 172 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]%"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 66:
#line 176 "parser.y"
    {;}
    break;

  case 67:
#line 177 "parser.y"
    {(yyval.data).s = cat(cat("$v(!",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 68:
#line 178 "parser.y"
    {(yyval.data).s = cat(cat("$v(~",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 69:
#line 182 "parser.y"
    {;}
    break;

  case 70:
#line 183 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat(cat(cat((yyvsp[(1) - (5)].data).s,".$[0][1/"),(yyvsp[(4) - (5)].data).s),".$[0]>0?"),(yyvsp[(4) - (5)].data).s),".$[0]:"),(yyvsp[(4) - (5)].data).s),".$[0]+"),(yyvsp[(1) - (5)].data).s),".$[0].length-1]"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 71:
#line 184 "parser.y"
    {(yyval.data).s = cat(cat("$w(new ",(yyvsp[(1) - (4)].data).s),".$[0]())");}
    break;

  case 72:
#line 185 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$w(new ",(yyvsp[(1) - (5)].data).s),".$[0]("),(yyvsp[(4) - (5)].data).s),"))"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 73:
#line 186 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (3)].data).s,".$[0]."),(yyvsp[(3) - (3)].data).s);}
    break;

  case 74:
#line 187 "parser.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (5)].data).s,".$[0]["),(yyvsp[(4) - (5)].data).s),".$[0]]");}
    break;

  case 75:
#line 188 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]+=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 76:
#line 189 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]-=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 77:
#line 193 "parser.y"
    {;}
    break;

  case 78:
#line 194 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 79:
#line 195 "parser.y"
    {(yyval.data).s = "$v(true)";}
    break;

  case 80:
#line 196 "parser.y"
    {(yyval.data).s = "$v(false)";}
    break;

  case 81:
#line 197 "parser.y"
    {(yyval.data).s = "$v(null)";}
    break;

  case 82:
#line 198 "parser.y"
    {(yyval.data).s = "$v(undefined)";}
    break;

  case 83:
#line 199 "parser.y"
    {(yyval.data).s = "$v(Infinity)";}
    break;

  case 84:
#line 200 "parser.y"
    {(yyval.data).s = "$v(Number.EPSILON)";}
    break;

  case 85:
#line 201 "parser.y"
    {(yyval.data).s = "$v(NaN)";}
    break;

  case 86:
#line 202 "parser.y"
    {(yyval.data).s = cat(cat("$v('",(yyvsp[(1) - (1)].data).s),"')");}
    break;

  case 87:
#line 203 "parser.y"
    {(yyval.data).s = cat(cat("$v(`",(yyvsp[(1) - (1)].data).s),"`)");}
    break;

  case 88:
#line 204 "parser.y"
    {(yyval.data).s = cat(cat("$v(/",(yyvsp[(1) - (1)].data).s),"/)");}
    break;

  case 89:
#line 205 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 90:
#line 206 "parser.y"
    {(yyval.data).s = cat(cat("HLX(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 91:
#line 207 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 92:
#line 208 "parser.y"
    {(yyval.data).s = cat(cat("$v([",(yyvsp[(2) - (3)].data).s),"])"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 93:
#line 209 "parser.y"
    {(yyval.data).s = "$v([])";}
    break;

  case 94:
#line 210 "parser.y"
    {(yyval.data).s = "$v([])";}
    break;

  case 95:
#line 211 "parser.y"
    {(yyval.data).s = "$v(function(){})";}
    break;

  case 96:
#line 212 "parser.y"
    {(yyval.data).s = "$v(function(){})";}
    break;

  case 97:
#line 213 "parser.y"
    {(yyval.data).s = cat(cat("(",(yyvsp[(2) - (3)].data).s),")"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 98:
#line 221 "parser.y"
    {;}
    break;

  case 99:
#line 222 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 100:
#line 226 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$r(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0])");}
    break;

  case 101:
#line 230 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){"),FuncHeader),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 102:
#line 231 "parser.y"
    {(yyval.data).s = cat(cat(cat("function(){",FuncHeader),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}");}
    break;

  case 103:
#line 235 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(1) - (1)].data).s; tmp->next = (yyval.data).v; (yyval.data).v = tmp;}
    break;

  case 104:
#line 236 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (2)].data).s; tmp->next = (yyvsp[(1) - (2)].data).v; (yyvsp[(1) - (2)].data).v = tmp; (yyval.data).v = (yyvsp[(1) - (2)].data).v;}
    break;

  case 105:
#line 240 "parser.y"
    {(yyval.data).s = "**=";}
    break;

  case 106:
#line 241 "parser.y"
    {(yyval.data).s = "*=";}
    break;

  case 107:
#line 242 "parser.y"
    {(yyval.data).s = "/=";}
    break;

  case 108:
#line 243 "parser.y"
    {(yyval.data).s = "%=";}
    break;

  case 109:
#line 244 "parser.y"
    {(yyval.data).s = "-=";}
    break;

  case 110:
#line 245 "parser.y"
    {(yyval.data).s = "<<=";}
    break;

  case 111:
#line 246 "parser.y"
    {(yyval.data).s = ">>=";}
    break;

  case 112:
#line 247 "parser.y"
    {(yyval.data).s = ">>>=";}
    break;

  case 113:
#line 248 "parser.y"
    {(yyval.data).s = "&=";}
    break;

  case 114:
#line 249 "parser.y"
    {(yyval.data).s = "^=";}
    break;

  case 115:
#line 250 "parser.y"
    {(yyval.data).s = "|=";}
    break;


/* Line 1267 of yacc.c.  */
#line 2342 "y.tab.c"
      default: break;
    }
  YY_SYMBOL_PRINT ("-> $$ =", yyr1[yyn], &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);

  *++yyvsp = yyval;


  /* Now `shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */

  yyn = yyr1[yyn];

  yystate = yypgoto[yyn - YYNTOKENS] + *yyssp;
  if (0 <= yystate && yystate <= YYLAST && yycheck[yystate] == *yyssp)
    yystate = yytable[yystate];
  else
    yystate = yydefgoto[yyn - YYNTOKENS];

  goto yynewstate;


/*------------------------------------.
| yyerrlab -- here on detecting error |
`------------------------------------*/
yyerrlab:
  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
#if ! YYERROR_VERBOSE
      yyerror (YY_("syntax error"));
#else
      {
	YYSIZE_T yysize = yysyntax_error (0, yystate, yychar);
	if (yymsg_alloc < yysize && yymsg_alloc < YYSTACK_ALLOC_MAXIMUM)
	  {
	    YYSIZE_T yyalloc = 2 * yysize;
	    if (! (yysize <= yyalloc && yyalloc <= YYSTACK_ALLOC_MAXIMUM))
	      yyalloc = YYSTACK_ALLOC_MAXIMUM;
	    if (yymsg != yymsgbuf)
	      YYSTACK_FREE (yymsg);
	    yymsg = (char *) YYSTACK_ALLOC (yyalloc);
	    if (yymsg)
	      yymsg_alloc = yyalloc;
	    else
	      {
		yymsg = yymsgbuf;
		yymsg_alloc = sizeof yymsgbuf;
	      }
	  }

	if (0 < yysize && yysize <= yymsg_alloc)
	  {
	    (void) yysyntax_error (yymsg, yystate, yychar);
	    yyerror (yymsg);
	  }
	else
	  {
	    yyerror (YY_("syntax error"));
	    if (yysize != 0)
	      goto yyexhaustedlab;
	  }
      }
#endif
    }



  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse look-ahead token after an
	 error, discard it.  */

      if (yychar <= YYEOF)
	{
	  /* Return failure if at end of input.  */
	  if (yychar == YYEOF)
	    YYABORT;
	}
      else
	{
	  yydestruct ("Error: discarding",
		      yytoken, &yylval);
	  yychar = YYEMPTY;
	}
    }

  /* Else will try to reuse look-ahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:

  /* Pacify compilers like GCC when the user code never invokes
     YYERROR and the label yyerrorlab therefore never appears in user
     code.  */
  if (/*CONSTCOND*/ 0)
     goto yyerrorlab;

  /* Do not reclaim the symbols of the rule which action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;	/* Each real token shifted decrements this.  */

  for (;;)
    {
      yyn = yypact[yystate];
      if (yyn != YYPACT_NINF)
	{
	  yyn += YYTERROR;
	  if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYTERROR)
	    {
	      yyn = yytable[yyn];
	      if (0 < yyn)
		break;
	    }
	}

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
	YYABORT;


      yydestruct ("Error: popping",
		  yystos[yystate], yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  if (yyn == YYFINAL)
    YYACCEPT;

  *++yyvsp = yylval;


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", yystos[yyn], yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturn;

/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturn;

#ifndef yyoverflow
/*-------------------------------------------------.
| yyexhaustedlab -- memory exhaustion comes here.  |
`-------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  /* Fall through.  */
#endif

yyreturn:
  if (yychar != YYEOF && yychar != YYEMPTY)
     yydestruct ("Cleanup: discarding lookahead",
		 yytoken, &yylval);
  /* Do not reclaim the symbols of the rule which action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
		  yystos[*yyssp], yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif
#if YYERROR_VERBOSE
  if (yymsg != yymsgbuf)
    YYSTACK_FREE (yymsg);
#endif
  /* Make sure YYID is used.  */
  return YYID (yyresult);
}


#line 253 "parser.y"

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

