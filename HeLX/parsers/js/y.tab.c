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
#define YYFINAL  59
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   606

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  93
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  34
/* YYNRULES -- Number of rules.  */
#define YYNRULES  122
/* YYNRULES -- Number of states.  */
#define YYNSTATES  203

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
       2,     2,     2,    85,     2,     2,     2,    83,    76,     2,
      89,    90,    81,    79,     2,    80,    86,    82,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    74,     2,
      77,    73,    78,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    87,     2,    88,    84,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    91,    75,    92,     2,     2,     2,     2,
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
       0,     0,     3,     6,    10,    12,    15,    17,    20,    22,
      24,    26,    28,    30,    32,    34,    36,    38,    42,    46,
      51,    55,    59,    62,    66,    71,    77,    83,    89,    95,
      98,   103,   106,   108,   110,   112,   115,   117,   121,   125,
     129,   133,   137,   141,   143,   147,   149,   153,   155,   159,
     161,   165,   167,   171,   173,   177,   181,   183,   187,   191,
     195,   199,   201,   205,   209,   213,   215,   219,   223,   225,
     229,   233,   237,   239,   243,   245,   248,   251,   253,   256,
     259,   261,   267,   272,   278,   282,   288,   290,   292,   294,
     296,   298,   300,   302,   304,   306,   308,   310,   312,   314,
     318,   322,   326,   329,   332,   336,   342,   347,   349,   352,
     354,   357,   361,   363,   365,   367,   369,   371,   373,   375,
     377,   379,   381
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int8 yyrhs[] =
{
      94,     0,    -1,    68,    96,    -1,    94,    68,    96,    -1,
      72,    -1,    96,    72,    -1,    97,    -1,    96,    97,    -1,
     106,    -1,   101,    -1,    99,    -1,    98,    -1,   100,    -1,
     102,    -1,   103,    -1,   104,    -1,   105,    -1,    99,    46,
      95,    -1,    45,   106,    95,    -1,    99,    47,   106,    95,
      -1,    48,   106,    95,    -1,    43,   106,    95,    -1,    44,
      95,    -1,    53,   106,    95,    -1,    53,    62,   106,    95,
      -1,    53,   106,    62,   106,    95,    -1,    53,     3,    63,
     106,    95,    -1,    53,     3,    64,   106,    95,    -1,    53,
       3,    65,   106,    95,    -1,    55,    95,    -1,    55,    95,
      56,    95,    -1,    57,   106,    -1,    49,    -1,    50,    -1,
      52,    -1,    51,   106,    -1,   107,    -1,   107,    73,   106,
      -1,   107,    34,   106,    -1,   107,    74,   106,    -1,   107,
     126,   106,    -1,   107,    31,   106,    -1,   107,    33,   106,
      -1,   108,    -1,   107,    75,   108,    -1,   109,    -1,   108,
      76,   109,    -1,   110,    -1,   109,    27,   110,    -1,   111,
      -1,   110,    25,   111,    -1,   112,    -1,   111,    26,   112,
      -1,   113,    -1,   112,    20,   113,    -1,   112,    21,   113,
      -1,   114,    -1,   113,    77,   114,    -1,   113,    78,   114,
      -1,   113,    22,   114,    -1,   113,    23,   114,    -1,   115,
      -1,   114,    17,   115,    -1,   114,    18,   115,    -1,   114,
      19,   115,    -1,   116,    -1,   115,    79,   116,    -1,   115,
      80,   116,    -1,   117,    -1,   116,    81,   117,    -1,   116,
      82,   117,    -1,   116,    83,   117,    -1,   118,    -1,   117,
      84,   118,    -1,   119,    -1,    85,   118,    -1,    24,   118,
      -1,   120,    -1,   119,    15,    -1,   119,    16,    -1,   121,
      -1,   120,    86,    87,   106,    88,    -1,   120,    86,    89,
      90,    -1,   120,    86,    89,   124,    90,    -1,   120,    86,
       3,    -1,   120,    86,    91,   121,    92,    -1,     3,    -1,
       4,    -1,    10,    -1,    11,    -1,     8,    -1,     9,    -1,
      12,    -1,    14,    -1,    13,    -1,     5,    -1,     6,    -1,
       7,    -1,   122,    -1,    69,   106,    90,    -1,    87,   125,
      88,    -1,    87,   124,    88,    -1,    87,    88,    -1,    89,
      90,    -1,    91,   106,    92,    -1,    89,   123,    90,    70,
      95,    -1,    89,    90,    70,    95,    -1,     3,    -1,   123,
       3,    -1,   106,    -1,   124,   106,    -1,   106,    66,   106,
      -1,    32,    -1,    28,    -1,    29,    -1,    30,    -1,    36,
      -1,    37,    -1,    38,    -1,    39,    -1,    40,    -1,    41,
      -1,    42,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,    41,    41,    42,    50,    51,    55,    56,    60,    61,
      62,    63,    64,    65,    66,    67,    68,    72,    76,    77,
      81,    85,    86,    90,    91,    92,    93,    94,    95,    99,
     100,   104,   108,   109,   110,   111,   119,   120,   121,   122,
     123,   124,   125,   129,   130,   134,   135,   139,   140,   144,
     145,   149,   150,   154,   155,   156,   160,   161,   162,   163,
     164,   168,   169,   170,   171,   175,   176,   177,   180,   181,
     182,   183,   187,   188,   192,   193,   194,   198,   199,   200,
     204,   205,   206,   207,   208,   209,   213,   214,   215,   216,
     217,   218,   219,   220,   221,   222,   223,   224,   225,   226,
     227,   228,   229,   230,   231,   239,   240,   244,   245,   249,
     250,   254,   258,   259,   260,   261,   262,   263,   264,   265,
     266,   267,   268
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
  "RIGHT_OP", "ZRIGHT_OP", "EQ_OP", "NE_OP", "LE_OP", "GE_OP", "NOT_OP",
  "XOR_OP", "AND_OP", "OR_OP", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN",
  "ADD_ASSIGN", "EXP_ASSIGN", "TERN_ASSIGN", "PTR_ASSIGN", "CONST_ASSIGN",
  "SUB_ASSIGN", "LEFT_ASSIGN", "RIGHT_ASSIGN", "ZRIGHT_ASSIGN",
  "AND_ASSIGN", "XOR_ASSIGN", "OR_ASSIGN", "CASE", "DEFAULT", "IF", "ELSE",
  "ELSEIF", "SWITCH", "CONTINUE", "BREAK", "RETURN", "RETURN_NOTHING",
  "FOR", "CNCRNT_FOR", "TRY", "CATCH", "THROW", "DELETE", "IMPORT",
  "INSTANCEOF", "TYPEOF", "TO", "IN", "OF", "AT", "ELLIPSIS", "ASSERT",
  "HLX", "FROM_HLX", "FUNC", "FUNC_1VAR", "END_STMT", "'='", "':'", "'|'",
  "'&'", "'<'", "'>'", "'+'", "'-'", "'*'", "'/'", "'%'", "'^'", "'!'",
  "'.'", "'['", "']'", "'('", "')'", "'{'", "'}'", "$accept",
  "translation_unit", "statement_block", "statement_list", "statement",
  "else_statement", "if_statement", "switch_statement",
  "labeled_statement", "iteration_statement", "try_statement",
  "throw_statement", "jump_statement", "expression",
  "logical_or_expression", "logical_and_expression",
  "inclusive_or_expression", "exclusive_or_expression", "and_expression",
  "equality_expression", "relational_expression", "shift_expression",
  "additive_expression", "multiplicative_expression",
  "exponentiation_expression", "unary_expression", "postfix_expression",
  "bind_expression", "primary_expression", "function_literal",
  "identifier_list", "expression_list", "range", "assign_operator", 0
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
     325,   326,   327,    61,    58,   124,    38,    60,    62,    43,
      45,    42,    47,    37,    94,    33,    46,    91,    93,    40,
      41,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    93,    94,    94,    95,    95,    96,    96,    97,    97,
      97,    97,    97,    97,    97,    97,    97,    98,    99,    99,
     100,   101,   101,   102,   102,   102,   102,   102,   102,   103,
     103,   104,   105,   105,   105,   105,   106,   106,   106,   106,
     106,   106,   106,   107,   107,   108,   108,   109,   109,   110,
     110,   111,   111,   112,   112,   112,   113,   113,   113,   113,
     113,   114,   114,   114,   114,   115,   115,   115,   116,   116,
     116,   116,   117,   117,   118,   118,   118,   119,   119,   119,
     120,   120,   120,   120,   120,   120,   121,   121,   121,   121,
     121,   121,   121,   121,   121,   121,   121,   121,   121,   121,
     121,   121,   121,   121,   121,   122,   122,   123,   123,   124,
     124,   125,   126,   126,   126,   126,   126,   126,   126,   126,
     126,   126,   126
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     2,     3,     1,     2,     1,     2,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     3,     3,     4,
       3,     3,     2,     3,     4,     5,     5,     5,     5,     2,
       4,     2,     1,     1,     1,     2,     1,     3,     3,     3,
       3,     3,     3,     1,     3,     1,     3,     1,     3,     1,
       3,     1,     3,     1,     3,     3,     1,     3,     3,     3,
       3,     1,     3,     3,     3,     1,     3,     3,     1,     3,
       3,     3,     1,     3,     1,     2,     2,     1,     2,     2,
       1,     5,     4,     5,     3,     5,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     3,
       3,     3,     2,     2,     3,     5,     4,     1,     2,     1,
       2,     3,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,    86,    87,    95,    96,    97,    90,    91,
      88,    89,    92,    94,    93,     0,     0,     0,     0,     0,
      32,    33,     0,    34,     0,     0,     0,     0,     0,     0,
       0,     0,     2,     6,    11,    10,    12,     9,    13,    14,
      15,    16,     8,    36,    43,    45,    47,    49,    51,    53,
      56,    61,    65,    68,    72,    74,    77,    80,    98,     1,
       0,    76,     0,     4,    22,     0,     0,     0,    35,    86,
       0,     0,    29,    31,     0,    75,   102,   109,     0,     0,
     107,   103,     0,     0,     7,     0,     0,   113,   114,   115,
       0,   112,     0,     0,   116,   117,   118,   119,   120,   121,
     122,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    78,    79,     0,     3,    21,     5,
      18,    20,     0,     0,     0,     0,     0,    23,     0,    99,
       0,   101,   110,   100,     0,   108,     0,   104,    17,     0,
      41,    42,    38,    37,    39,    44,    40,    46,    48,    50,
      52,    54,    55,    59,    60,    57,    58,    62,    63,    64,
      66,    67,    69,    70,    71,    73,    84,     0,     0,     0,
       0,     0,     0,    24,     0,    30,   111,   106,     0,    19,
       0,    82,   109,     0,     0,    26,    27,    28,    25,   105,
      81,    83,    85
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,     2,    64,    65,    33,    34,    35,    36,    37,    38,
      39,    40,    41,    42,    43,    44,    45,    46,    47,    48,
      49,    50,    51,    52,    53,    54,    55,    56,    57,    58,
      82,    78,    79,   104
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -92
static const yytype_int16 yypact[] =
{
     -32,   351,    12,   -92,   -92,   -92,   -92,   -92,   -92,   -92,
     -92,   -92,   -92,   -92,   -92,   489,   489,   211,   489,   489,
     -92,   -92,   489,   -92,    21,   211,   489,   489,   489,   374,
       4,   489,   351,   -92,   -92,    17,   -92,   -92,   -92,   -92,
     -92,   -92,   -92,   531,   -38,    28,    46,    52,    32,    -5,
      22,   -13,   -39,     0,   -92,    53,     1,   -92,   -92,   -92,
     351,   -92,   211,   -92,   -92,   281,   211,   211,   -92,   -17,
     489,   141,    36,   -92,     5,   -92,   -92,    34,   420,    13,
     -92,    33,     6,    10,   -92,   211,   489,   -92,   -92,   -92,
     489,   -92,   489,   489,   -92,   -92,   -92,   -92,   -92,   -92,
     -92,   489,   489,   489,   489,   489,   489,   489,   489,   489,
     489,   489,   489,   489,   489,   489,   489,   489,   489,   489,
     489,   489,   489,   489,   -92,   -92,     2,   351,   -92,   -92,
     -92,   -92,   489,   489,   489,   211,   489,   -92,   211,   -92,
     489,   -92,   -92,   -92,   211,   -92,    35,   -92,   -92,   211,
     -92,   -92,   -92,   -92,   -92,   -38,   -92,    28,    46,    52,
      32,    -5,    -5,    22,    22,    22,    22,   -13,   -13,   -13,
     -39,   -39,     0,     0,     0,   -92,   -92,   489,   443,   512,
     211,   211,   211,   -92,   211,   -92,   -92,   -92,   211,   -92,
      16,   -92,   -92,   466,    19,   -92,   -92,   -92,   -92,   -92,
     -92,   -92,   -92
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int8 yypgoto[] =
{
     -92,   -92,    -6,    15,   -28,   -92,   -92,   -92,   -92,   -92,
     -92,   -92,   -92,   -16,   -92,    11,     8,     9,    14,    -1,
     -12,   -91,   -66,   -37,   -63,   -14,   -92,   -92,   -60,   -92,
     -92,   -56,   -92,   -92
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
      62,    61,    66,    67,    84,   176,    68,    80,    71,   145,
      73,    74,    59,    77,    75,    83,    32,   111,   112,    72,
     163,   164,   165,   166,    69,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,     1,    84,   105,   115,
     116,   117,   120,   121,   122,    15,   132,   133,   134,   167,
     168,   169,   109,   110,   135,   106,   128,   172,   173,   174,
     130,   131,   142,    85,    86,   137,   118,   119,   124,   125,
     149,   107,   113,   114,   150,   127,   151,   152,   108,   148,
      60,   170,   171,    70,   123,   153,   154,   126,   156,   177,
      27,   178,   138,   179,    81,   139,   146,   161,   162,    84,
     140,   143,   147,   144,   200,   188,    28,   160,    29,   175,
      30,   202,    31,   157,   155,   158,   180,   181,   182,   194,
     184,   159,   193,     0,   186,     0,     0,     0,     0,   183,
       0,     0,   185,     0,     0,     0,     0,     0,   187,     0,
       0,     0,     0,   189,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,     0,     0,     0,     0,
       0,   190,   192,     0,     0,    15,     0,     0,     0,     0,
       0,     0,     0,     0,   195,   196,   197,   142,   198,     0,
       0,     0,   199,     0,    16,    17,    18,     0,     0,    19,
      20,    21,    22,    23,    24,     0,    25,     0,    26,     0,
       0,     0,     0,   136,     0,     0,     0,     0,     0,     0,
      27,     0,     0,    63,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    28,     0,    29,     0,
      30,     0,    31,     0,     0,    15,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    16,    17,    18,     0,     0,    19,
      20,    21,    22,    23,    24,     0,    25,     0,    26,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      27,     0,     0,    63,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    28,     0,    29,     0,
      30,     0,    31,     0,     0,    15,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    16,    17,    18,     0,     0,    19,
      20,    21,    22,    23,    24,     0,    25,     0,    26,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      27,     0,     0,   129,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    28,     0,    29,     0,
      30,     0,    31,     0,     0,    15,     0,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,     0,    16,    17,    18,     0,    15,    19,
      20,    21,    22,    23,    24,     0,    25,     0,    26,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      27,     0,     0,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,     0,    28,     0,    29,     0,
      30,     0,    31,    27,    15,     0,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,     0,    28,
       0,    29,    76,    30,     0,    31,     0,    15,     0,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,     0,     0,     0,     0,     0,     0,     0,     0,    27,
      15,     0,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,     0,    28,     0,    29,   141,    30,
       0,    31,    27,    15,     0,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,     0,    28,     0,
      29,     0,    30,   191,    31,    27,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    28,     0,    29,     0,    30,   201,    31,    27,    87,
      88,    89,    90,    91,    92,    93,     0,    94,    95,    96,
      97,    98,    99,   100,    28,     0,    29,     0,    30,     0,
      31,    27,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    29,
       0,    30,     0,    31,   101,   102,   103
};

static const yytype_int16 yycheck[] =
{
      16,    15,    18,    19,    32,     3,    22,     3,    24,     3,
      26,    27,     0,    29,    28,    31,     1,    22,    23,    25,
     111,   112,   113,   114,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    68,    65,    76,    17,
      18,    19,    81,    82,    83,    24,    63,    64,    65,   115,
     116,   117,    20,    21,    70,    27,    62,   120,   121,   122,
      66,    67,    78,    46,    47,    71,    79,    80,    15,    16,
      86,    25,    77,    78,    90,    60,    92,    93,    26,    85,
      68,   118,   119,    62,    84,   101,   102,    86,   104,    87,
      69,    89,    56,    91,    90,    90,    90,   109,   110,   127,
      66,    88,    92,    70,    88,    70,    85,   108,    87,   123,
      89,    92,    91,   105,   103,   106,   132,   133,   134,   179,
     136,   107,   178,    -1,   140,    -1,    -1,    -1,    -1,   135,
      -1,    -1,   138,    -1,    -1,    -1,    -1,    -1,   144,    -1,
      -1,    -1,    -1,   149,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      -1,   177,   178,    -1,    -1,    24,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,   180,   181,   182,   193,   184,    -1,
      -1,    -1,   188,    -1,    43,    44,    45,    -1,    -1,    48,
      49,    50,    51,    52,    53,    -1,    55,    -1,    57,    -1,
      -1,    -1,    -1,    62,    -1,    -1,    -1,    -1,    -1,    -1,
      69,    -1,    -1,    72,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    85,    -1,    87,    -1,
      89,    -1,    91,    -1,    -1,    24,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    43,    44,    45,    -1,    -1,    48,
      49,    50,    51,    52,    53,    -1,    55,    -1,    57,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      69,    -1,    -1,    72,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    85,    -1,    87,    -1,
      89,    -1,    91,    -1,    -1,    24,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    43,    44,    45,    -1,    -1,    48,
      49,    50,    51,    52,    53,    -1,    55,    -1,    57,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      69,    -1,    -1,    72,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    85,    -1,    87,    -1,
      89,    -1,    91,    -1,    -1,    24,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    -1,
      -1,    -1,    -1,    -1,    43,    44,    45,    -1,    24,    48,
      49,    50,    51,    52,    53,    -1,    55,    -1,    57,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      69,    -1,    -1,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    -1,    85,    -1,    87,    -1,
      89,    -1,    91,    69,    24,    -1,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    -1,    85,
      -1,    87,    88,    89,    -1,    91,    -1,    24,    -1,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    69,
      24,    -1,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    85,    -1,    87,    88,    89,
      -1,    91,    69,    24,    -1,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    -1,    85,    -1,
      87,    -1,    89,    90,    91,    69,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    85,    -1,    87,    -1,    89,    90,    91,    69,    28,
      29,    30,    31,    32,    33,    34,    -1,    36,    37,    38,
      39,    40,    41,    42,    85,    -1,    87,    -1,    89,    -1,
      91,    69,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    87,
      -1,    89,    -1,    91,    73,    74,    75
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    68,    94,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    24,    43,    44,    45,    48,
      49,    50,    51,    52,    53,    55,    57,    69,    85,    87,
      89,    91,    96,    97,    98,    99,   100,   101,   102,   103,
     104,   105,   106,   107,   108,   109,   110,   111,   112,   113,
     114,   115,   116,   117,   118,   119,   120,   121,   122,     0,
      68,   118,   106,    72,    95,    96,   106,   106,   106,     3,
      62,   106,    95,   106,   106,   118,    88,   106,   124,   125,
       3,    90,   123,   106,    97,    46,    47,    28,    29,    30,
      31,    32,    33,    34,    36,    37,    38,    39,    40,    41,
      42,    73,    74,    75,   126,    76,    27,    25,    26,    20,
      21,    22,    23,    77,    78,    17,    18,    19,    79,    80,
      81,    82,    83,    84,    15,    16,    86,    96,    95,    72,
      95,    95,    63,    64,    65,   106,    62,    95,    56,    90,
      66,    88,   106,    88,    70,     3,    90,    92,    95,   106,
     106,   106,   106,   106,   106,   108,   106,   109,   110,   111,
     112,   113,   113,   114,   114,   114,   114,   115,   115,   115,
     116,   116,   117,   117,   117,   118,     3,    87,    89,    91,
     106,   106,   106,    95,   106,    95,   106,    95,    70,    95,
     106,    90,   106,   124,   121,    95,    95,    95,    95,    95,
      88,    90,    92
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
    {(yyval.data).s = cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s); printf("%s\n",(yyval.data).s); new_HLX();}
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
    {(yyval.data).s = cat(cat(cat("{",end_scope((yyvsp[(1) - (1)].data).v,0)),(yyvsp[(1) - (1)].data).s),"}"); (yyval.data).v = NULL;}
    break;

  case 11:
#line 63 "parser.y"
    {(yyval.data).s = cat(cat(cat("{",end_scope((yyvsp[(1) - (1)].data).v,0)),(yyvsp[(1) - (1)].data).s),"}"); (yyval.data).v = NULL;}
    break;

  case 12:
#line 64 "parser.y"
    {(yyval.data).s = cat(cat(cat("{",end_scope((yyvsp[(1) - (1)].data).v,0)),(yyvsp[(1) - (1)].data).s),"}"); (yyval.data).v = NULL;}
    break;

  case 13:
#line 65 "parser.y"
    {(yyval.data).s = cat(cat(cat("{",end_scope((yyvsp[(1) - (1)].data).v,0)),(yyvsp[(1) - (1)].data).s),"}"); (yyval.data).v = NULL;}
    break;

  case 14:
#line 66 "parser.y"
    {;}
    break;

  case 15:
#line 67 "parser.y"
    {;}
    break;

  case 16:
#line 68 "parser.y"
    {;}
    break;

  case 17:
#line 72 "parser.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (3)].data).s,"else{"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)),"}");}
    break;

  case 18:
#line 76 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("if(",(yyvsp[(2) - (3)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 19:
#line 77 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat((yyvsp[(1) - (4)].data).s,"else if("),(yyvsp[(3) - (4)].data).s),".$[0]){"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}"); (yyval.data).v = llcat((yyvsp[(1) - (4)].data).v,(yyvsp[(3) - (4)].data).v);}
    break;

  case 20:
#line 81 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("switch(",(yyvsp[(2) - (3)].data).s),".$[0]){"),(yyvsp[(3) - (3)].data).s),"}"); (yyval.data).v = llcat((yyvsp[(2) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 21:
#line 85 "parser.y"
    {(yyval.data).s = cat(cat(cat("case ",(yyvsp[(2) - (3)].data).s),".$[0]:"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 22:
#line 86 "parser.y"
    {(yyval.data).s = cat("default:",cat(end_scope((yyvsp[(2) - (2)].data).v,0),(yyvsp[(2) - (2)].data).s));}
    break;

  case 23:
#line 90 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("while(",(yyvsp[(2) - (3)].data).s),".$[0]){"),cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 24:
#line 91 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("do{",cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}while("),(yyvsp[(3) - (4)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(3) - (4)].data).v;}
    break;

  case 25:
#line 92 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat((yyvsp[(2) - (5)].data).s,";do{"),cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}while("),(yyvsp[(4) - (5)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(2) - (5)].data).v,(yyvsp[(4) - (5)].data).v);}
    break;

  case 26:
#line 93 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," in "),(yyvsp[(4) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 27:
#line 94 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," of $c("),(yyvsp[(4) - (5)].data).s),".$[0],true)){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 28:
#line 95 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (5)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (5)].data).s)," of "),(yyvsp[(4) - (5)].data).s),".$[0]){"),cat(end_scope((yyvsp[(5) - (5)].data).v,tmp),(yyvsp[(5) - (5)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 29:
#line 99 "parser.y"
    {(yyval.data).s = cat(cat("try{",cat(end_scope((yyvsp[(2) - (2)].data).v,0),(yyvsp[(2) - (2)].data).s)),"}catch($$){}");}
    break;

  case 30:
#line 100 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = "$$"; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat("try{",cat(end_scope((yyvsp[(2) - (4)].data).v,0),(yyvsp[(2) - (4)].data).s)),"}catch($$){"),cat(end_scope((yyvsp[(4) - (4)].data).v,tmp),(yyvsp[(4) - (4)].data).s)),"}");}
    break;

  case 31:
#line 104 "parser.y"
    {(yyval.data).s = cat(cat("throw ",(yyvsp[(2) - (2)].data).s),".$[0]"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 32:
#line 108 "parser.y"
    {(yyval.data).s = "continue;";}
    break;

  case 33:
#line 109 "parser.y"
    {(yyval.data).s = "break;";}
    break;

  case 34:
#line 110 "parser.y"
    {(yyval.data).s = "return;";}
    break;

  case 35:
#line 111 "parser.y"
    {(yyval.data).s = cat(cat("return ",(yyvsp[(2) - (2)].data).s),";"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 36:
#line 119 "parser.y"
    {;}
    break;

  case 37:
#line 120 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 38:
#line 121 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$="),(yyvsp[(3) - (3)].data).s),".$,"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 39:
#line 122 "parser.y"
    {var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1); (yyval.data).s = cat(cat(cat(cat(cat(cat("(",cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]=$c("),(yyvsp[(3) - (3)].data).s),").$[0],"),(yyvsp[(1) - (3)].data).s),")")),",this."),(yyvsp[(1) - (3)].data).s),"="),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 40:
#line 123 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat("(",(yyvsp[(1) - (3)].data).s),".$[0]"),(yyvsp[(2) - (3)].data).s),(yyvsp[(3) - (3)].data).s),".$[0],"),(yyvsp[(1) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 41:
#line 124 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"=$v($a("),(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 42:
#line 125 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"=$w("),(yyvsp[(1) - (3)].data).s),").$[0]?"),(yyvsp[(1) - (3)].data).s),":"),(yyvsp[(3) - (3)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 43:
#line 129 "parser.y"
    {;}
    break;

  case 44:
#line 130 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]||"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 45:
#line 134 "parser.y"
    {;}
    break;

  case 46:
#line 135 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 47:
#line 139 "parser.y"
    {;}
    break;

  case 48:
#line 140 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]|"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 49:
#line 144 "parser.y"
    {;}
    break;

  case 50:
#line 145 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]^"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 51:
#line 149 "parser.y"
    {;}
    break;

  case 52:
#line 150 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]&"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 53:
#line 154 "parser.y"
    {;}
    break;

  case 54:
#line 155 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 55:
#line 156 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(!$e(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 56:
#line 160 "parser.y"
    {;}
    break;

  case 57:
#line 161 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 58:
#line 162 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 59:
#line 163 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<="),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 60:
#line 164 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>="),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 61:
#line 168 "parser.y"
    {;}
    break;

  case 62:
#line 169 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]<<"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 63:
#line 170 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]>>"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 64:
#line 171 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),".$[0]>>>"),(yyvsp[(3) - (3)].data).s),".$[0]]"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 65:
#line 175 "parser.y"
    {;}
    break;

  case 66:
#line 176 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v($a(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0]))"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 67:
#line 177 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]-"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 68:
#line 180 "parser.y"
    {;}
    break;

  case 69:
#line 181 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]*"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 70:
#line 182 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]/"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 71:
#line 183 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]%"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 72:
#line 187 "parser.y"
    {;}
    break;

  case 73:
#line 188 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$v(",(yyvsp[(1) - (3)].data).s),".$[0]**"),(yyvsp[(3) - (3)].data).s),".$[0])"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 74:
#line 192 "parser.y"
    {;}
    break;

  case 75:
#line 193 "parser.y"
    {(yyval.data).s = cat(cat("$v(!",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 76:
#line 194 "parser.y"
    {(yyval.data).s = cat(cat("$v(~",(yyvsp[(2) - (2)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(2) - (2)].data).v;}
    break;

  case 77:
#line 198 "parser.y"
    {;}
    break;

  case 78:
#line 199 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]+=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 79:
#line 200 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("(",(yyvsp[(1) - (2)].data).s),".$[0]-=1,"),(yyvsp[(1) - (2)].data).s),")");}
    break;

  case 80:
#line 204 "parser.y"
    {;}
    break;

  case 81:
#line 205 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$i(",(yyvsp[(1) - (5)].data).s),".$[0],"),(yyvsp[(4) - (5)].data).s),".$[0])"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 82:
#line 206 "parser.y"
    {(yyval.data).s = cat(cat("$w(new ",(yyvsp[(1) - (4)].data).s),".$[0]())");}
    break;

  case 83:
#line 207 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$w(new ",(yyvsp[(1) - (5)].data).s),".$[0]("),(yyvsp[(4) - (5)].data).s),"))"); (yyval.data).v = (yyvsp[(4) - (5)].data).v;}
    break;

  case 84:
#line 208 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (3)].data).s,".$[0]."),(yyvsp[(3) - (3)].data).s);}
    break;

  case 85:
#line 209 "parser.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (5)].data).s,".$[0]["),(yyvsp[(4) - (5)].data).s),".$[0]]");}
    break;

  case 86:
#line 213 "parser.y"
    {;}
    break;

  case 87:
#line 214 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 88:
#line 215 "parser.y"
    {(yyval.data).s = "$v(true)";}
    break;

  case 89:
#line 216 "parser.y"
    {(yyval.data).s = "$v(false)";}
    break;

  case 90:
#line 217 "parser.y"
    {(yyval.data).s = "$v(null)";}
    break;

  case 91:
#line 218 "parser.y"
    {(yyval.data).s = "$v(undefined)";}
    break;

  case 92:
#line 219 "parser.y"
    {(yyval.data).s = "$v(Infinity)";}
    break;

  case 93:
#line 220 "parser.y"
    {(yyval.data).s = "$v(Number.EPSILON)";}
    break;

  case 94:
#line 221 "parser.y"
    {(yyval.data).s = "$v(NaN)";}
    break;

  case 95:
#line 222 "parser.y"
    {(yyval.data).s = cat(cat("$v('",(yyvsp[(1) - (1)].data).s),"')");}
    break;

  case 96:
#line 223 "parser.y"
    {(yyval.data).s = cat(cat("$v(`",(yyvsp[(1) - (1)].data).s),"`)");}
    break;

  case 97:
#line 224 "parser.y"
    {(yyval.data).s = cat(cat("$v(/",(yyvsp[(1) - (1)].data).s),"/)");}
    break;

  case 98:
#line 225 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(1) - (1)].data).s),")");}
    break;

  case 99:
#line 226 "parser.y"
    {(yyval.data).s = cat(cat("HLX(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 100:
#line 227 "parser.y"
    {(yyval.data).s = cat(cat("$v(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 101:
#line 228 "parser.y"
    {(yyval.data).s = cat(cat("$v([",(yyvsp[(2) - (3)].data).s),"])"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 102:
#line 229 "parser.y"
    {(yyval.data).s = "$v([])";}
    break;

  case 103:
#line 230 "parser.y"
    {(yyval.data).s = "$v(function(){})";}
    break;

  case 104:
#line 231 "parser.y"
    {(yyval.data).s = cat(cat("(",(yyvsp[(2) - (3)].data).s),")"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 105:
#line 239 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){"),FuncHeader),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 106:
#line 240 "parser.y"
    {(yyval.data).s = cat(cat(cat("function(){",FuncHeader),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}");}
    break;

  case 107:
#line 244 "parser.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(1) - (1)].data).s; tmp->next = (yyval.data).v; (yyval.data).v = tmp;}
    break;

  case 108:
#line 245 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (2)].data).s; tmp->next = (yyvsp[(1) - (2)].data).v; (yyvsp[(1) - (2)].data).v = tmp; (yyval.data).v = (yyvsp[(1) - (2)].data).v;}
    break;

  case 109:
#line 249 "parser.y"
    {;}
    break;

  case 110:
#line 250 "parser.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 111:
#line 254 "parser.y"
    {(yyval.data).s = cat(cat(cat(cat("$r(",(yyvsp[(1) - (3)].data).s),".$[0],"),(yyvsp[(3) - (3)].data).s),".$[0])");}
    break;

  case 112:
#line 258 "parser.y"
    {(yyval.data).s = "**=";}
    break;

  case 113:
#line 259 "parser.y"
    {(yyval.data).s = "*=";}
    break;

  case 114:
#line 260 "parser.y"
    {(yyval.data).s = "/=";}
    break;

  case 115:
#line 261 "parser.y"
    {(yyval.data).s = "%=";}
    break;

  case 116:
#line 262 "parser.y"
    {(yyval.data).s = "-=";}
    break;

  case 117:
#line 263 "parser.y"
    {(yyval.data).s = "<<=";}
    break;

  case 118:
#line 264 "parser.y"
    {(yyval.data).s = ">>=";}
    break;

  case 119:
#line 265 "parser.y"
    {(yyval.data).s = ">>>=";}
    break;

  case 120:
#line 266 "parser.y"
    {(yyval.data).s = "&=";}
    break;

  case 121:
#line 267 "parser.y"
    {(yyval.data).s = "^=";}
    break;

  case 122:
#line 268 "parser.y"
    {(yyval.data).s = "|=";}
    break;


/* Line 1267 of yacc.c.  */
#line 2371 "y.tab.c"
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


#line 271 "parser.y"

extern char yytext[];
extern int column;
ilnode* sig_tabs;

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
	sig_tabs = malloc(sizeof(ilnode));
	sig_tabs->val = -1;
	sig_tabs->next = NULL;
	printf("%s\n",HLXHeader);
	return yyparse();
}

