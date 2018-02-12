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
     TREMA = 321,
     ASSERT = 322,
     HLX = 323,
     F_BRACKET = 324,
     F_PAREN = 325,
     FROM_HLX = 326,
     BIND_ARW = 327,
     EXTEND_ARW = 328,
     ASYNC_ARW = 329,
     GEN_ARW = 330,
     REV_ARW = 331,
     DRFT_ARW = 332
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
#define TREMA 321
#define ASSERT 322
#define HLX 323
#define F_BRACKET 324
#define F_PAREN 325
#define FROM_HLX 326
#define BIND_ARW 327
#define EXTEND_ARW 328
#define ASYNC_ARW 329
#define GEN_ARW 330
#define REV_ARW 331
#define DRFT_ARW 332




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
#line 273 "y.tab.c"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 286 "y.tab.c"

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
#define YYFINAL  4
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   1214

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  103
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  31
/* YYNRULES -- Number of rules.  */
#define YYNRULES  131
/* YYNRULES -- Number of states.  */
#define YYNSTATES  252

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   332

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,    80,    79,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    95,     2,     2,     2,    94,    86,     2,
      98,    99,    91,    89,    78,    90,   100,    92,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    83,    81,
      87,    82,    88,    84,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    96,     2,    97,    93,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,   101,    85,   102,     2,     2,     2,     2,
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
      65,    66,    67,    68,    69,    70,    71,    72,    73,    74,
      75,    76,    77
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     7,    10,    12,    15,    17,    19,    21,
      23,    25,    27,    30,    34,    36,    39,    44,    48,    53,
      60,    68,    73,    78,    85,    92,    99,   106,   115,   118,
     121,   124,   128,   130,   134,   138,   142,   144,   148,   152,
     154,   160,   170,   179,   181,   185,   187,   191,   193,   197,
     199,   203,   205,   209,   211,   215,   219,   221,   225,   229,
     231,   235,   239,   243,   245,   249,   253,   255,   259,   263,
     267,   271,   273,   276,   279,   282,   285,   287,   292,   296,
     301,   305,   311,   314,   317,   319,   321,   323,   325,   327,
     329,   331,   333,   335,   337,   339,   341,   343,   347,   351,
     355,   359,   363,   366,   369,   372,   375,   379,   381,   384,
     388,   395,   402,   408,   414,   420,   426,   431,   436,   438,
     441,   443,   445,   447,   449,   451,   453,   455,   457,   459,
     461,   463
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int16 yyrhs[] =
{
     104,     0,    -1,    68,    78,   105,    -1,   104,   104,    -1,
     106,    -1,   105,   106,    -1,   109,    -1,   107,    -1,   108,
      -1,   110,    -1,   111,    -1,   112,    -1,    79,    80,    -1,
      79,   105,    80,    -1,    78,    -1,   113,    78,    -1,    41,
     113,    78,   106,    -1,    42,    78,   106,    -1,    43,   113,
      78,   106,    -1,    43,   113,    78,   106,    44,   110,    -1,
      43,   113,    78,   106,    44,    78,   106,    -1,    45,   113,
      78,   106,    -1,    46,   113,    78,   106,    -1,    47,    78,
     106,    46,   113,    78,    -1,    51,     3,    62,   113,    78,
     106,    -1,    51,     3,    63,   113,    78,   106,    -1,    51,
       3,    64,   113,    78,   106,    -1,    51,   113,    81,   113,
      81,   113,    78,   106,    -1,    48,    78,    -1,    49,    78,
      -1,    50,    78,    -1,    50,   113,    78,    -1,   114,    -1,
     113,    82,   113,    -1,   113,    32,   113,    -1,   113,    83,
     113,    -1,   115,    -1,   114,   133,   115,    -1,   114,    31,
     115,    -1,   116,    -1,   116,    84,   113,    78,   113,    -1,
     116,    84,    78,    79,   113,    78,   113,    78,    80,    -1,
     116,    84,   113,    78,    79,   113,    78,    80,    -1,   117,
      -1,   116,    25,   117,    -1,   118,    -1,   117,    24,   118,
      -1,   119,    -1,   118,    85,   119,    -1,   120,    -1,   119,
      23,   120,    -1,   121,    -1,   120,    86,   121,    -1,   122,
      -1,   121,    20,   122,    -1,   121,    21,   122,    -1,   123,
      -1,   122,    87,   123,    -1,   122,    88,   123,    -1,   124,
      -1,   123,    17,   124,    -1,   123,    18,   124,    -1,   123,
      19,   124,    -1,   125,    -1,   124,    89,   125,    -1,   124,
      90,   125,    -1,   126,    -1,   125,    91,   126,    -1,   125,
      92,   126,    -1,   125,    93,   126,    -1,   125,    94,   126,
      -1,   127,    -1,    89,   126,    -1,    90,   126,    -1,    95,
     126,    -1,    22,   126,    -1,   128,    -1,   127,    96,   113,
      97,    -1,   127,    98,    99,    -1,   127,    98,   129,    99,
      -1,   127,   100,     3,    -1,   127,   100,   101,   128,   102,
      -1,   127,    15,    -1,   127,    16,    -1,     3,    -1,     4,
      -1,    10,    -1,    11,    -1,     8,    -1,     9,    -1,    12,
      -1,    14,    -1,    13,    -1,     5,    -1,     6,    -1,     7,
      -1,   131,    -1,    71,   113,    99,    -1,    96,   130,    97,
      -1,    69,   130,    97,    -1,    96,   129,    97,    -1,    69,
     129,    97,    -1,    96,    97,    -1,    69,    97,    -1,    98,
      99,    -1,    70,    99,    -1,   101,   113,   102,    -1,   113,
      -1,   129,   113,    -1,   113,    66,   113,    -1,    98,   132,
      99,    72,    78,   107,    -1,    70,   132,    99,    72,    78,
     107,    -1,    98,   132,    99,    72,   113,    -1,    70,   132,
      99,    72,   113,    -1,    98,    99,    72,    78,   107,    -1,
      70,    99,    72,    78,   107,    -1,    98,    99,    72,   113,
      -1,    70,    99,    72,   113,    -1,     3,    -1,   132,     3,
      -1,    30,    -1,    26,    -1,    27,    -1,    28,    -1,    29,
      -1,    34,    -1,    35,    -1,    36,    -1,    37,    -1,    38,
      -1,    39,    -1,    40,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,    42,    42,    43,    51,    52,    56,    57,    58,    59,
      60,    61,    65,    66,    70,    71,    75,    76,    80,    81,
      82,    83,    87,    88,    89,    90,    91,    92,    96,    97,
      98,    99,   107,   108,   109,   110,   114,   115,   116,   120,
     121,   122,   123,   127,   128,   132,   133,   137,   138,   142,
     143,   147,   148,   152,   153,   154,   158,   159,   160,   164,
     165,   166,   167,   171,   172,   173,   176,   177,   178,   179,
     180,   184,   185,   186,   187,   188,   192,   193,   194,   195,
     196,   197,   198,   199,   203,   204,   205,   206,   207,   208,
     209,   210,   211,   212,   213,   214,   215,   216,   217,   218,
     219,   220,   221,   222,   223,   224,   225,   233,   234,   238,
     242,   243,   244,   245,   246,   247,   248,   249,   253,   254,
     258,   259,   260,   261,   262,   263,   264,   265,   266,   267,
     268,   269
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
  "INSTANCEOF", "TYPEOF", "IN", "OF", "PTR_OF", "ELLIPSIS", "TREMA",
  "ASSERT", "HLX", "F_BRACKET", "F_PAREN", "FROM_HLX", "BIND_ARW",
  "EXTEND_ARW", "ASYNC_ARW", "GEN_ARW", "REV_ARW", "DRFT_ARW", "','",
  "'\\t'", "'\\b'", "';'", "'='", "':'", "'?'", "'|'", "'&'", "'<'", "'>'",
  "'+'", "'-'", "'*'", "'/'", "'^'", "'%'", "'!'", "'['", "']'", "'('",
  "')'", "'.'", "'{'", "'}'", "$accept", "translation_unit",
  "statement_list", "statement", "compound_statement",
  "expression_statement", "labeled_statement", "selection_statement",
  "iteration_statement", "jump_statement", "expression",
  "assignment_expression", "constant_expression", "logical_or_expression",
  "logical_and_expression", "inclusive_or_expression",
  "exclusive_or_expression", "and_expression", "equality_expression",
  "relational_expression", "shift_expression", "additive_expression",
  "multiplicative_expression", "prefix_expression", "postfix_expression",
  "primary_expression", "expression_list", "range", "function_literal",
  "identifier_list", "assignment_operator", 0
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
     325,   326,   327,   328,   329,   330,   331,   332,    44,     9,
       8,    59,    61,    58,    63,   124,    38,    60,    62,    43,
      45,    42,    47,    94,    37,    33,    91,    93,    40,    41,
      46,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,   103,   104,   104,   105,   105,   106,   106,   106,   106,
     106,   106,   107,   107,   108,   108,   109,   109,   110,   110,
     110,   110,   111,   111,   111,   111,   111,   111,   112,   112,
     112,   112,   113,   113,   113,   113,   114,   114,   114,   115,
     115,   115,   115,   116,   116,   117,   117,   118,   118,   119,
     119,   120,   120,   121,   121,   121,   122,   122,   122,   123,
     123,   123,   123,   124,   124,   124,   125,   125,   125,   125,
     125,   126,   126,   126,   126,   126,   127,   127,   127,   127,
     127,   127,   127,   127,   128,   128,   128,   128,   128,   128,
     128,   128,   128,   128,   128,   128,   128,   128,   128,   128,
     128,   128,   128,   128,   128,   128,   128,   129,   129,   130,
     131,   131,   131,   131,   131,   131,   131,   131,   132,   132,
     133,   133,   133,   133,   133,   133,   133,   133,   133,   133,
     133,   133
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     3,     2,     1,     2,     1,     1,     1,     1,
       1,     1,     2,     3,     1,     2,     4,     3,     4,     6,
       7,     4,     4,     6,     6,     6,     6,     8,     2,     2,
       2,     3,     1,     3,     3,     3,     1,     3,     3,     1,
       5,     9,     8,     1,     3,     1,     3,     1,     3,     1,
       3,     1,     3,     1,     3,     3,     1,     3,     3,     1,
       3,     3,     3,     1,     3,     3,     1,     3,     3,     3,
       3,     1,     2,     2,     2,     2,     1,     4,     3,     4,
       3,     5,     2,     2,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     3,     3,     3,
       3,     3,     2,     2,     2,     2,     3,     1,     2,     3,
       6,     6,     5,     5,     5,     5,     4,     4,     1,     2,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,     0,     1,     3,    84,    85,    93,    94,
      95,    88,    89,    86,    87,    90,    92,    91,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    14,     0,     0,     0,     0,     0,     0,     0,
       2,     4,     7,     8,     6,     9,    10,    11,     0,    32,
      36,    39,    43,    45,    47,    49,    51,    53,    56,    59,
      63,    66,    71,    76,    96,    75,     0,     0,     0,     0,
       0,     0,    28,    29,    30,     0,    84,     0,   103,   107,
       0,     0,   118,   105,     0,     0,    12,     0,    72,    73,
      74,   102,     0,     0,   104,     0,     0,     5,     0,    15,
       0,     0,   121,   122,   123,   124,   120,     0,   125,   126,
     127,   128,   129,   130,   131,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    82,    83,     0,     0,     0,
       0,    17,     0,     0,     0,     0,    31,     0,     0,     0,
       0,     0,   101,   108,    99,     0,   119,     0,    97,    13,
     100,    98,     0,     0,   106,    34,    33,    35,    38,    37,
      44,     0,     0,    46,    48,    50,    52,    54,    55,    57,
      58,    60,    61,    62,    64,    65,    67,    68,    69,    70,
       0,    78,   107,     0,    80,     0,    16,    18,    21,    22,
       0,     0,     0,     0,     0,   109,     0,   117,     0,     0,
     116,     0,     0,     0,    77,    79,     0,     0,     0,     0,
       0,     0,     0,   115,     0,   113,   114,     0,   112,     0,
       0,    40,    81,     0,    19,    23,    24,    25,    26,     0,
     111,   110,     0,     0,    20,     0,     0,     0,    27,     0,
      42,    41
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,     5,    40,    41,    42,    43,    44,    45,    46,    47,
      48,    49,    50,    51,    52,    53,    54,    55,    56,    57,
      58,    59,    60,    61,    62,    63,    80,    81,    64,    84,
     115
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -188
static const yytype_int16 yypact[] =
{
     -41,   -47,    29,   419,  -188,   -41,  -188,  -188,  -188,  -188,
    -188,  -188,  -188,  -188,  -188,  -188,  -188,  -188,  1014,  1014,
     -25,  1014,  1014,  1014,   -16,   -12,    -9,    81,  1113,   441,
      11,  1014,  -188,   221,  1014,  1014,  1014,   540,    12,  1014,
     419,  -188,  -188,  -188,  -188,  -188,  -188,  -188,    82,   247,
    -188,   -14,    24,   -13,    48,    -8,    18,   -37,    16,   -30,
     -50,  -188,    39,  -188,  -188,  -188,    85,   419,   113,   122,
     124,   419,  -188,  -188,  -188,   130,   -17,   134,  -188,   155,
     562,   -23,  -188,     8,    13,    17,  -188,   320,  -188,  -188,
    -188,  -188,   584,     4,    34,    14,    -6,  -188,  1014,  -188,
    1014,  1014,  -188,  -188,  -188,  -188,  -188,  1014,  -188,  -188,
    -188,  -188,  -188,  -188,  -188,  1014,  1014,   683,  1014,  1014,
    1014,  1014,  1014,  1014,  1014,  1014,  1014,  1014,  1014,  1014,
    1014,  1014,  1014,  1014,  1014,  -188,  -188,  1014,   705,     3,
     419,  -188,   419,   419,   419,    69,  -188,  1014,  1014,  1014,
    1014,  1014,  -188,    51,  -188,   727,  -188,    52,  -188,  -188,
    -188,  -188,   826,    55,  -188,    51,    51,    51,  -188,  -188,
      24,    59,   158,   -13,    48,    -8,    18,   -37,   -37,    16,
      16,   -30,   -30,   -30,   -50,   -50,  -188,  -188,  -188,  -188,
      43,  -188,    51,   848,  -188,   243,  -188,    97,  -188,  -188,
    1014,   226,   265,   271,   137,    51,    63,    51,   870,    63,
      51,   969,  1014,   992,  -188,  -188,    42,   -15,   273,   419,
     419,   419,  1014,  -188,    63,    51,  -188,    63,    51,   303,
    1014,    51,  -188,   419,  -188,  -188,  -188,  -188,  -188,   305,
    -188,  -188,  1014,   314,  -188,   419,   325,    66,  -188,    67,
    -188,  -188
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -188,   153,   125,   -35,  -187,  -188,  -188,   -62,  -188,  -188,
     -19,  -188,   -94,  -188,    41,    54,    56,    53,    40,   -58,
     -57,   -70,    19,   -11,  -188,    -7,   -36,   141,  -188,   142,
    -188
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
      66,    92,    68,    69,    70,    97,   194,    65,    75,    77,
      79,   116,    85,   168,    82,    82,   156,   156,    79,   223,
      96,   169,   226,    88,    89,    90,    98,     1,    21,     4,
      22,     3,   141,   126,   127,   128,   145,   240,   122,   123,
     241,   131,   132,   133,   134,   147,   148,   149,   118,    98,
     124,   125,    97,    67,   135,   136,   181,   182,   183,   129,
     130,   153,    71,   233,   177,   178,    72,   179,   180,    73,
     117,   120,   119,   153,   154,    98,   100,   101,   121,   165,
     155,   166,   167,    98,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,   164,     1,   172,   100,
     101,   161,   193,    18,   195,   196,   162,   197,   198,   199,
      83,    94,   157,   163,    98,   200,   158,    98,   190,   192,
     186,   187,   188,   189,   208,   100,   101,   211,   201,   202,
     203,   204,   205,   100,   101,   137,   207,   138,   212,   139,
     214,   217,    33,   210,   232,    98,   250,   251,   184,   185,
      29,    30,    31,     2,    98,   234,    98,   170,    87,    74,
      99,   176,    98,   140,   100,   101,    98,   100,   101,    98,
      34,    35,   173,   175,   153,   174,    36,    37,    93,    38,
      95,   218,    39,     0,   236,   237,   238,    98,   216,   225,
      98,   142,   228,   229,   231,   100,   101,     0,   244,     0,
     143,     0,   144,   239,   100,   101,   100,   101,   146,     0,
     248,   243,   100,   101,     0,   150,   100,   101,   222,   100,
     101,   151,     0,   246,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,   213,   100,   101,     0,
     100,   101,     0,    18,     0,     0,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,    98,     0,
       0,     0,    19,    20,    21,     0,    22,    23,    24,    25,
      26,    27,    28,   102,   103,   104,   105,   106,   107,     0,
       0,   108,   109,   110,   111,   112,   113,   114,     0,     0,
      29,    30,    31,     0,     0,     0,     0,    98,     0,    32,
      33,    86,     0,    98,   219,    98,     0,     0,   100,   101,
      34,    35,    29,    30,    31,     0,    36,    37,     0,    38,
       0,     0,    39,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,    98,     0,    98,     0,    37,
       0,    38,    18,   220,    39,     0,    98,   100,   101,   221,
       0,   235,     0,   100,   101,   100,   101,    98,     0,     0,
       0,    19,    20,    21,     0,    22,    23,    24,    25,    26,
      27,    28,     0,     0,     0,     0,     0,     0,     0,     0,
       0,   242,     0,   245,     0,   100,   101,   100,   101,    29,
      30,    31,   247,     0,     0,     0,   100,   101,    32,    33,
     159,     0,     0,   249,     0,     0,     0,   100,   101,    34,
      35,     0,     0,     0,     0,    36,    37,     0,    38,     0,
       0,    39,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,     0,     0,     0,     0,     0,     0,
       0,    18,     0,     0,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,     0,     0,     0,     0,
      19,    20,    21,    18,    22,    23,    24,    25,    26,    27,
      28,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    29,    30,
      31,     0,     0,     0,     0,     0,     0,    32,    33,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    34,    35,
      29,    30,    31,     0,    36,    37,     0,    38,     0,     0,
      39,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      34,    35,     0,     0,     0,     0,    36,    37,    78,    38,
       0,     0,    39,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,     0,     0,     0,     0,     0,
       0,     0,    18,     0,     0,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    15,    16,    17,     0,     0,     0,
       0,     0,     0,     0,    18,     0,     0,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    15,    16,    17,     0,
       0,     0,     0,     0,     0,     0,    18,     0,     0,    29,
      30,    31,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    34,
      35,    29,    30,    31,     0,    36,    37,    91,    38,     0,
       0,    39,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    34,    35,    29,    30,    31,     0,    36,    37,   152,
      38,     0,     0,    39,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    34,    35,     0,     0,     0,     0,    36,
      37,   160,    38,     0,     0,    39,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,     0,     0,
       0,     0,     0,     0,     0,    18,     0,     0,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    15,    16,    17,
       0,     0,     0,     0,     0,     0,     0,    18,     0,     0,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,     0,     0,     0,     0,     0,     0,     0,    18,
       0,     0,    29,    30,    31,     0,     0,     0,     0,     0,
       0,   171,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    34,    35,    29,    30,    31,     0,    36,    37,
       0,    38,     0,     0,    39,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    34,    35,    29,    30,    31,     0,
      36,    37,     0,    38,   191,   206,    39,     0,     0,     0,
       0,     0,     0,     0,     0,     0,    34,    35,     0,     0,
       0,     0,    36,    37,     0,    38,     0,     0,    39,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    15,    16,
      17,     0,     0,     0,     0,     0,     0,     0,    18,     0,
       0,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,     0,     0,     0,     0,     0,     0,     0,
      18,     0,     0,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,     0,     0,     0,     0,     0,
       0,     0,    18,     0,     0,    29,    30,    31,     0,     0,
       0,     0,     0,     0,   209,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    34,    35,    29,    30,    31,
       0,    36,    37,     0,    38,     0,     0,    39,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    34,    35,    29,
      30,    31,     0,    36,    37,     0,    38,   215,   224,    39,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    34,
      35,     0,     0,     0,     0,    36,    37,     0,    38,     0,
       0,    39,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,     0,     0,     0,     0,     0,     0,
       0,    18,     0,     0,     0,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    15,    16,    17,     0,     0,     0,
       0,     0,     0,     0,    18,     0,     0,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    15,    16,    17,     0,
       0,     0,     0,     0,     0,     0,    18,     0,    29,    30,
      31,     0,     0,     0,     0,     0,     0,   227,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    34,    35,
       0,    29,    30,    31,    36,    37,     0,    38,     0,     0,
      39,   230,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    34,    35,    29,    30,    31,     0,    36,    37,     0,
      38,     0,     0,    39,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    34,    35,     0,     0,     0,     0,    36,
      37,     0,    38,     0,     0,    39,    76,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,     0,     0,
       0,     0,     0,     0,     0,    18,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    29,    30,    31,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    34,    35,     0,     0,     0,     0,    36,    37,
       0,    38,     0,     0,    39
};

static const yytype_int16 yycheck[] =
{
      19,    37,    21,    22,    23,    40,     3,    18,    27,    28,
      29,    25,    31,   107,     3,     3,     3,     3,    37,   206,
      39,   115,   209,    34,    35,    36,    32,    68,    43,     0,
      45,    78,    67,    17,    18,    19,    71,   224,    20,    21,
     227,    91,    92,    93,    94,    62,    63,    64,    24,    32,
      87,    88,    87,    78,    15,    16,   126,   127,   128,    89,
      90,    80,    78,    78,   122,   123,    78,   124,   125,    78,
      84,    23,    85,    92,    97,    32,    82,    83,    86,    98,
      72,   100,   101,    32,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,   102,    68,   117,    82,
      83,    97,   138,    22,   101,   140,    72,   142,   143,   144,
      99,    99,    99,    99,    32,    46,    99,    32,   137,   138,
     131,   132,   133,   134,    72,    82,    83,    72,   147,   148,
     149,   150,   151,    82,    83,    96,   155,    98,    79,   100,
      97,    44,    79,   162,   102,    32,    80,    80,   129,   130,
      69,    70,    71,     0,    32,   217,    32,   116,    33,    78,
      78,   121,    32,    78,    82,    83,    32,    82,    83,    32,
      89,    90,   118,   120,   193,   119,    95,    96,    37,    98,
      38,   200,   101,    -1,   219,   220,   221,    32,   195,   208,
      32,    78,   211,   212,   213,    82,    83,    -1,   233,    -1,
      78,    -1,    78,   222,    82,    83,    82,    83,    78,    -1,
     245,   230,    82,    83,    -1,    81,    82,    83,    81,    82,
      83,    66,    -1,   242,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    78,    82,    83,    -1,
      82,    83,    -1,    22,    -1,    -1,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    32,    -1,
      -1,    -1,    41,    42,    43,    -1,    45,    46,    47,    48,
      49,    50,    51,    26,    27,    28,    29,    30,    31,    -1,
      -1,    34,    35,    36,    37,    38,    39,    40,    -1,    -1,
      69,    70,    71,    -1,    -1,    -1,    -1,    32,    -1,    78,
      79,    80,    -1,    32,    78,    32,    -1,    -1,    82,    83,
      89,    90,    69,    70,    71,    -1,    95,    96,    -1,    98,
      -1,    -1,   101,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    32,    -1,    32,    -1,    96,
      -1,    98,    22,    78,   101,    -1,    32,    82,    83,    78,
      -1,    78,    -1,    82,    83,    82,    83,    32,    -1,    -1,
      -1,    41,    42,    43,    -1,    45,    46,    47,    48,    49,
      50,    51,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    78,    -1,    78,    -1,    82,    83,    82,    83,    69,
      70,    71,    78,    -1,    -1,    -1,    82,    83,    78,    79,
      80,    -1,    -1,    78,    -1,    -1,    -1,    82,    83,    89,
      90,    -1,    -1,    -1,    -1,    95,    96,    -1,    98,    -1,
      -1,   101,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      41,    42,    43,    22,    45,    46,    47,    48,    49,    50,
      51,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    69,    70,
      71,    -1,    -1,    -1,    -1,    -1,    -1,    78,    79,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    89,    90,
      69,    70,    71,    -1,    95,    96,    -1,    98,    -1,    -1,
     101,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      89,    90,    -1,    -1,    -1,    -1,    95,    96,    97,    98,
      -1,    -1,   101,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    22,    -1,    -1,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    22,    -1,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,    69,
      70,    71,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    89,
      90,    69,    70,    71,    -1,    95,    96,    97,    98,    -1,
      -1,   101,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    89,    90,    69,    70,    71,    -1,    95,    96,    97,
      98,    -1,    -1,   101,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    89,    90,    -1,    -1,    -1,    -1,    95,
      96,    97,    98,    -1,    -1,   101,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,
      -1,    -1,    69,    70,    71,    -1,    -1,    -1,    -1,    -1,
      -1,    78,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    89,    90,    69,    70,    71,    -1,    95,    96,
      -1,    98,    -1,    -1,   101,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    89,    90,    69,    70,    71,    -1,
      95,    96,    -1,    98,    99,    78,   101,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    89,    90,    -1,    -1,
      -1,    -1,    95,    96,    -1,    98,    -1,    -1,   101,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,
      -1,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      22,    -1,    -1,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    22,    -1,    -1,    69,    70,    71,    -1,    -1,
      -1,    -1,    -1,    -1,    78,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    89,    90,    69,    70,    71,
      -1,    95,    96,    -1,    98,    -1,    -1,   101,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    89,    90,    69,
      70,    71,    -1,    95,    96,    -1,    98,    99,    78,   101,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    89,
      90,    -1,    -1,    -1,    -1,    95,    96,    -1,    98,    -1,
      -1,   101,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,    -1,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    22,    -1,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    69,    70,
      71,    -1,    -1,    -1,    -1,    -1,    -1,    78,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    89,    90,
      -1,    69,    70,    71,    95,    96,    -1,    98,    -1,    -1,
     101,    79,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    89,    90,    69,    70,    71,    -1,    95,    96,    -1,
      98,    -1,    -1,   101,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    89,    90,    -1,    -1,    -1,    -1,    95,
      96,    -1,    98,    -1,    -1,   101,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    69,    70,    71,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    89,    90,    -1,    -1,    -1,    -1,    95,    96,
      -1,    98,    -1,    -1,   101
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    68,   104,    78,     0,   104,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    22,    41,
      42,    43,    45,    46,    47,    48,    49,    50,    51,    69,
      70,    71,    78,    79,    89,    90,    95,    96,    98,   101,
     105,   106,   107,   108,   109,   110,   111,   112,   113,   114,
     115,   116,   117,   118,   119,   120,   121,   122,   123,   124,
     125,   126,   127,   128,   131,   126,   113,    78,   113,   113,
     113,    78,    78,    78,    78,   113,     3,   113,    97,   113,
     129,   130,     3,    99,   132,   113,    80,   105,   126,   126,
     126,    97,   129,   130,    99,   132,   113,   106,    32,    78,
      82,    83,    26,    27,    28,    29,    30,    31,    34,    35,
      36,    37,    38,    39,    40,   133,    25,    84,    24,    85,
      23,    86,    20,    21,    87,    88,    17,    18,    19,    89,
      90,    91,    92,    93,    94,    15,    16,    96,    98,   100,
      78,   106,    78,    78,    78,   106,    78,    62,    63,    64,
      81,    66,    97,   113,    97,    72,     3,    99,    99,    80,
      97,    97,    72,    99,   102,   113,   113,   113,   115,   115,
     117,    78,   113,   118,   119,   120,   121,   122,   122,   123,
     123,   124,   124,   124,   125,   125,   126,   126,   126,   126,
     113,    99,   113,   129,     3,   101,   106,   106,   106,   106,
      46,   113,   113,   113,   113,   113,    78,   113,    72,    78,
     113,    72,    79,    78,    97,    99,   128,    44,   113,    78,
      78,    78,    81,   107,    78,   113,   107,    78,   113,   113,
      79,   113,   102,    78,   110,    78,   106,   106,   106,   113,
     107,   107,    78,   113,   106,    78,   113,    78,   106,    78,
      80,    80
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
#line 42 "parser.y"
    {(yyval.data).s = cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s); printf("%s\n",(yyval.data).s); new_HLX();}
    break;

  case 3:
#line 43 "parser.y"
    {;}
    break;

  case 4:
#line 51 "parser.y"
    {;}
    break;

  case 5:
#line 52 "parser.y"
    {(yyval.data).s = cat((yyvsp[(1) - (2)].data).s,(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 6:
#line 56 "parser.y"
    {;}
    break;

  case 7:
#line 57 "parser.y"
    {;}
    break;

  case 8:
#line 58 "parser.y"
    {;}
    break;

  case 9:
#line 59 "parser.y"
    {;}
    break;

  case 10:
#line 60 "parser.y"
    {;}
    break;

  case 11:
#line 61 "parser.y"
    {;}
    break;

  case 12:
#line 65 "parser.y"
    {;}
    break;

  case 13:
#line 66 "parser.y"
    {(yyval.data).s = (yyvsp[(2) - (3)].data).s; (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 14:
#line 70 "parser.y"
    {(yyval.data).s = ";";}
    break;

  case 15:
#line 71 "parser.y"
    {(yyval.data).s = cat((yyvsp[(1) - (2)].data).s,";");}
    break;

  case 16:
#line 75 "parser.y"
    {(yyval.data).s = cat(cat(cat("case ",(yyvsp[(2) - (4)].data).s),".$[0]:"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 17:
#line 76 "parser.y"
    {(yyval.data).s = cat("default:",cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s));}
    break;

  case 18:
#line 80 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("if(",(yyvsp[(2) - (4)].data).s),".$[0]){"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 19:
#line 81 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (6)].data).s),".$[0]){"),cat(end_scope((yyvsp[(4) - (6)].data).v,0),(yyvsp[(4) - (6)].data).s)),"}else "),cat(end_scope((yyvsp[(6) - (6)].data).v,0),(yyvsp[(6) - (6)].data).s)); (yyval.data).v = llcat((yyvsp[(2) - (6)].data).v,(yyvsp[(6) - (6)].data).v);}
    break;

  case 20:
#line 82 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (7)].data).s),".$[0]){"),cat(end_scope((yyvsp[(4) - (7)].data).v,0),(yyvsp[(4) - (7)].data).s)),"}else{"),cat(end_scope((yyvsp[(7) - (7)].data).v,0),(yyvsp[(7) - (7)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (7)].data).v;}
    break;

  case 21:
#line 83 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("switch(",(yyvsp[(2) - (4)].data).s),".$[0]){"),(yyvsp[(4) - (4)].data).s),"}"); end_scope((yyvsp[(4) - (4)].data).v,0); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 22:
#line 87 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("while(",(yyvsp[(2) - (4)].data).s),".$[0]){"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 23:
#line 88 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("do{",cat(end_scope((yyvsp[(3) - (6)].data).v,0),(yyvsp[(3) - (6)].data).s)),"}while("),(yyvsp[(5) - (6)].data).s),".$[0]);"); (yyval.data).v = (yyvsp[(5) - (6)].data).v;}
    break;

  case 24:
#line 89 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (6)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].data).s)," in "),(yyvsp[(4) - (6)].data).s),".$[0]){"),cat(end_scope((yyvsp[(6) - (6)].data).v,tmp),(yyvsp[(6) - (6)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (6)].data).v;}
    break;

  case 25:
#line 90 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (6)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].data).s)," of $c("),(yyvsp[(4) - (6)].data).s),".$[0],true)){"),cat(end_scope((yyvsp[(6) - (6)].data).v,tmp),(yyvsp[(6) - (6)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (6)].data).v;}
    break;

  case 26:
#line 91 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (6)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].data).s)," of "),(yyvsp[(4) - (6)].data).s),".$[0]){"),cat(end_scope((yyvsp[(6) - (6)].data).v,tmp),(yyvsp[(6) - (6)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (6)].data).v;}
    break;

  case 27:
#line 92 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat(cat("for(",(yyvsp[(2) - (8)].data).s),";"),(yyvsp[(4) - (8)].data).s),".$[0];"),(yyvsp[(6) - (8)].data).s),"){"),cat(end_scope((yyvsp[(8) - (8)].data).v,(yyvsp[(2) - (8)].data).v),(yyvsp[(8) - (8)].data).s)),"}"); (yyval.data).v = llcat((yyvsp[(2) - (8)].data).v,llcat((yyvsp[(4) - (8)].data).v,(yyvsp[(6) - (8)].data).v));}
    break;

  case 28:
#line 96 "parser.y"
    {(yyval.data).s = "continue;";}
    break;

  case 29:
#line 97 "parser.y"
    {(yyval.data).s = "break;";}
    break;

  case 30:
#line 98 "parser.y"
    {(yyval.data).s = "return;";}
    break;

  case 31:
#line 99 "parser.y"
    {(yyval.data).s = cat(cat("return ",(yyvsp[(2) - (3)].data).s),";"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 32:
#line 107 "parser.y"
    {;}
    break;

  case 33:
#line 108 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 34:
#line 109 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$="),(yyvsp[(3) - (3)].data).s),".$,"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 35:
#line 110 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")")),",this."),(yyvsp[(1) - (3)].data).s),"="),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 36:
#line 114 "parser.y"
    {;}
    break;

  case 37:
#line 115 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]"),(yyvsp[(2) - (3)].data).s),(yyvsp[(3) - (3)].data).s),".$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 38:
#line 116 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"=$w("),(yyvsp[(1) - (3)].data).s),").$[0]?"),(yyvsp[(1) - (3)].data).s),":"),(yyvsp[(3) - (3)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 39:
#line 120 "parser.y"
    {;}
    break;

  case 40:
#line 121 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (5)].data).s,"?"),(yyvsp[(3) - (5)].data).s ),":"),(yyvsp[(5) - (5)].data).s); (yyval.data).v = llcat(llcat((yyvsp[(1) - (5)].data).v,(yyvsp[(3) - (5)].data).v),(yyvsp[(5) - (5)].data).v);}
    break;

  case 41:
#line 122 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (9)].data).s,"?"),(yyvsp[(5) - (9)].data).s ),":"),(yyvsp[(7) - (9)].data).s); (yyval.data).v = llcat(llcat((yyvsp[(1) - (9)].data).v,(yyvsp[(5) - (9)].data).v),(yyvsp[(7) - (9)].data).v);}
    break;

  case 42:
#line 123 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (8)].data).s,"?"),(yyvsp[(3) - (8)].data).s ),":"),(yyvsp[(6) - (8)].data).s); (yyval.data).v = llcat(llcat((yyvsp[(1) - (8)].data).v,(yyvsp[(3) - (8)].data).v),(yyvsp[(6) - (8)].data).v);}
    break;

  case 43:
#line 127 "parser.y"
    {;}
    break;

  case 44:
#line 128 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]||"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 45:
#line 132 "parser.y"
    {;}
    break;

  case 46:
#line 133 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 47:
#line 137 "parser.y"
    {;}
    break;

  case 48:
#line 138 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]|"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 49:
#line 142 "parser.y"
    {;}
    break;

  case 50:
#line 143 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]^"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 51:
#line 147 "parser.y"
    {;}
    break;

  case 52:
#line 148 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 53:
#line 152 "parser.y"
    {;}
    break;

  case 54:
#line 153 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 55:
#line 154 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(!$e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 56:
#line 158 "parser.y"
    {;}
    break;

  case 57:
#line 159 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 58:
#line 160 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 59:
#line 164 "parser.y"
    {;}
    break;

  case 60:
#line 165 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 61:
#line 166 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 62:
#line 167 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),".$[0]>>>"),(yyvsp[(3) - (3)].data).s),".$[0]]"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 63:
#line 171 "parser.y"
    {;}
    break;

  case 64:
#line 172 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($a(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 65:
#line 173 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]-"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 66:
#line 176 "parser.y"
    {;}
    break;

  case 67:
#line 177 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]*"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 68:
#line 178 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]/"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 69:
#line 179 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]**"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 70:
#line 180 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]%"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 71:
#line 184 "parser.y"
    {;}
    break;

  case 72:
#line 185 "parser.y"
    {(yyval.data).s = cat(cat("$v(+",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 73:
#line 186 "parser.y"
    {(yyval.data).s = cat(cat("$v(-",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 74:
#line 187 "parser.y"
    {(yyval.data).s = cat(cat("$v(!",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 75:
#line 188 "parser.y"
    {(yyval.data).s = cat(cat("$v(~",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 76:
#line 192 "parser.y"
    {;}
    break;

  case 77:
#line 193 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat(cat(cat((yyvsp[(1) - (4)].data).s,".$[0][1/"),(yyvsp[(3) - (4)].data).s),".$[0]>0?"),(yyvsp[(3) - (4)].data).s),".$[0]:"),(yyvsp[(3) - (4)].data).s),".$[0]+"),(yyvsp[(1) - (4)].data).s),".$[0].length-1]"); (yyval.data).v = (yyvsp[(3) - (4)].data).v;}
    break;

  case 78:
#line 194 "parser.y"
    {(yyval.data).s = cat(cat("$w(new ",(yyvsp[(1) - (3)].data).s),".$[0]())");}
    break;

  case 79:
#line 195 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$w(new ",(yyvsp[(1) - (4)].data).s),".$[0]("),(yyvsp[(3) - (4)].data).s),"))"); (yyval.data).v = (yyvsp[(3) - (4)].data).v;}
    break;

  case 80:
#line 196 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (3)].data).s,".$[0]."),(yyvsp[(3) - (3)].data).s);}
    break;

  case 81:
#line 197 "parser.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (5)].data).s,".$[0]["),(yyvsp[(4) - (5)].data).s),".$[0]]");}
    break;

  case 82:
#line 198 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]+=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 83:
#line 199 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]-=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 84:
#line 203 "parser.y"
    {;}
    break;

  case 85:
#line 204 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 86:
#line 205 "parser.y"
    {(yyval.data).s = "$v(true)";}
    break;

  case 87:
#line 206 "parser.y"
    {(yyval.data).s = "$v(false)";}
    break;

  case 88:
#line 207 "parser.y"
    {(yyval.data).s = "$v(null)";}
    break;

  case 89:
#line 208 "parser.y"
    {(yyval.data).s = "$v(undefined)";}
    break;

  case 90:
#line 209 "parser.y"
    {(yyval.data).s = "$v(Infinity)";}
    break;

  case 91:
#line 210 "parser.y"
    {(yyval.data).s = "$v(Number.EPSILON)";}
    break;

  case 92:
#line 211 "parser.y"
    {(yyval.data).s = "$v(NaN)";}
    break;

  case 93:
#line 212 "parser.y"
    {(yyval.data).s = cat(cat("$v('",(yyvsp[(1) - (1)].data).s),"')");}
    break;

  case 94:
#line 213 "parser.y"
    {(yyval.data).s = cat(cat("$v(`",(yyvsp[(1) - (1)].data).s),"`)");}
    break;

  case 95:
#line 214 "parser.y"
    {(yyval.data).s = cat(cat("$v(/",(yyvsp[(1) - (1)].data).s),"/)");}
    break;

  case 96:
#line 215 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 97:
#line 216 "parser.y"
    {(yyval.data).s = cat(cat("HLX(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 98:
#line 217 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 99:
#line 218 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 100:
#line 219 "parser.y"
    {(yyval.data).s = cat(cat("$v([",(yyvsp[(2) - (3)].data).s),"])"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 101:
#line 220 "parser.y"
    {(yyval.data).s = cat(cat("$v([",(yyvsp[(2) - (3)].data).s),"])"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 102:
#line 221 "parser.y"
    {(yyval.data).s = "$v([])";}
    break;

  case 103:
#line 222 "parser.y"
    {(yyval.data).s = "$v([])";}
    break;

  case 104:
#line 223 "parser.y"
    {(yyval.data).s = "$v(function(){})";}
    break;

  case 105:
#line 224 "parser.y"
    {(yyval.data).s = "$v(function(){})";}
    break;

  case 106:
#line 225 "parser.y"
    {(yyval.data).s = cat(cat("(",(yyvsp[(2) - (3)].data).s),")"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 107:
#line 233 "parser.y"
    {;}
    break;

  case 108:
#line 234 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 109:
#line 238 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$r(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0])");}
    break;

  case 110:
#line 242 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].data).s),"){"),FuncHeader),cat(end_scope((yyvsp[(6) - (6)].data).v,(yyvsp[(2) - (6)].data).v),(yyvsp[(6) - (6)].data).s)),"}");}
    break;

  case 111:
#line 243 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].data).s),"){"),FuncHeader),cat(end_scope((yyvsp[(6) - (6)].data).v,(yyvsp[(2) - (6)].data).v),(yyvsp[(6) - (6)].data).s)),"}");}
    break;

  case 112:
#line 244 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){"),FuncHeader),"return "),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),";}");}
    break;

  case 113:
#line 245 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){"),FuncHeader),"return "),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),";}");}
    break;

  case 114:
#line 246 "parser.y"
    {(yyval.data).s = cat(cat(cat("function(){",FuncHeader),cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 115:
#line 247 "parser.y"
    {(yyval.data).s = cat(cat(cat("function(){",FuncHeader),cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 116:
#line 248 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("function(){",FuncHeader),"return "),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),";}");}
    break;

  case 117:
#line 249 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("function(){",FuncHeader),"return "),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),";}");}
    break;

  case 118:
#line 253 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(1) - (1)].data).s; tmp->next = (yyval.data).v; (yyval.data).v = tmp;}
    break;

  case 119:
#line 254 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (2)].data).s; tmp->next = (yyvsp[(1) - (2)].data).v; (yyvsp[(1) - (2)].data).v = tmp; (yyval.data).v = (yyvsp[(1) - (2)].data).v;}
    break;

  case 120:
#line 258 "parser.y"
    {(yyval.data).s = "**=";}
    break;

  case 121:
#line 259 "parser.y"
    {(yyval.data).s = "*=";}
    break;

  case 122:
#line 260 "parser.y"
    {(yyval.data).s = "/=";}
    break;

  case 123:
#line 261 "parser.y"
    {(yyval.data).s = "%=";}
    break;

  case 124:
#line 262 "parser.y"
    {(yyval.data).s = "+=";}
    break;

  case 125:
#line 263 "parser.y"
    {(yyval.data).s = "-=";}
    break;

  case 126:
#line 264 "parser.y"
    {(yyval.data).s = "<<=";}
    break;

  case 127:
#line 265 "parser.y"
    {(yyval.data).s = ">>=";}
    break;

  case 128:
#line 266 "parser.y"
    {(yyval.data).s = ">>>=";}
    break;

  case 129:
#line 267 "parser.y"
    {(yyval.data).s = "&=";}
    break;

  case 130:
#line 268 "parser.y"
    {(yyval.data).s = "^=";}
    break;

  case 131:
#line 269 "parser.y"
    {(yyval.data).s = "|=";}
    break;


/* Line 1267 of yacc.c.  */
#line 2578 "y.tab.c"
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


#line 272 "parser.y"

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

