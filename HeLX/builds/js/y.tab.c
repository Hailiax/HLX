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




/* Copy the first part of user declarations.  */
#line 1 "js.y"


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "includes/hashmap.h"
#include "includes/js_genrange.h"
#include "includes/js_vars.h"
#include "includes/js_common.h"

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
#line 18 "js.y"
{
	struct {
		char* s;
		llnode* v;
	} data;
}
/* Line 193 of yacc.c.  */
#line 268 "y.tab.c"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 281 "y.tab.c"

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
#define YYLAST   1340

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  100
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  31
/* YYNRULES -- Number of rules.  */
#define YYNRULES  136
/* YYNRULES -- Number of states.  */
#define YYNSTATES  254

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   329

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,    77,    76,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    92,     2,     2,     2,    91,    83,     2,
      95,    96,    88,    86,    75,    87,    97,    89,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    80,    78,
      84,    79,    85,    81,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    93,     2,    94,    90,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    98,    82,    99,     2,     2,     2,     2,
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
      65,    66,    67,    68,    69,    70,    71,    72,    73,    74
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     7,    10,    12,    15,    17,    19,    21,
      23,    25,    27,    30,    34,    36,    39,    44,    48,    53,
      60,    68,    73,    78,    85,    92,    99,   108,   111,   114,
     117,   121,   123,   127,   131,   133,   137,   141,   143,   149,
     159,   168,   170,   174,   176,   180,   182,   186,   188,   192,
     194,   198,   200,   204,   208,   210,   214,   218,   220,   224,
     228,   232,   234,   238,   242,   244,   248,   252,   256,   260,
     262,   265,   268,   271,   274,   277,   279,   284,   288,   293,
     297,   300,   303,   305,   307,   309,   311,   313,   315,   317,
     319,   321,   323,   325,   327,   329,   331,   335,   339,   342,
     345,   348,   351,   355,   359,   363,   366,   371,   375,   378,
     383,   387,   390,   395,   397,   400,   407,   414,   420,   426,
     432,   438,   443,   448,   451,   454,   456,   458,   460,   462,
     464,   466,   468,   470,   472,   474,   476
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int16 yyrhs[] =
{
     101,     0,    -1,    65,    75,   102,    -1,   101,   101,    -1,
     103,    -1,   102,   103,    -1,   106,    -1,   104,    -1,   105,
      -1,   107,    -1,   108,    -1,   109,    -1,    76,    77,    -1,
      76,   102,    77,    -1,    75,    -1,   110,    75,    -1,    39,
     110,    75,   103,    -1,    40,    75,   103,    -1,    41,   110,
      75,   103,    -1,    41,   110,    75,   103,    42,   107,    -1,
      41,   110,    75,   103,    42,    75,   103,    -1,    43,   110,
      75,   103,    -1,    44,   110,    75,   103,    -1,    45,    75,
     103,    44,   110,    75,    -1,    46,     3,    57,   110,    75,
     103,    -1,    46,     3,    58,   110,    75,   103,    -1,    46,
     110,    78,   110,    78,   110,    75,   103,    -1,    47,    75,
      -1,    48,    75,    -1,    49,    75,    -1,    49,   110,    75,
      -1,   111,    -1,   110,    79,   111,    -1,   110,    80,   111,
      -1,   112,    -1,   111,   130,   112,    -1,   111,    31,   112,
      -1,   113,    -1,   113,    81,   110,    75,   110,    -1,   113,
      81,    75,    76,   110,    75,   110,    75,    77,    -1,   113,
      81,   110,    75,    76,   110,    75,    77,    -1,   114,    -1,
     113,    25,   114,    -1,   115,    -1,   114,    24,   115,    -1,
     116,    -1,   115,    82,   116,    -1,   117,    -1,   116,    23,
     117,    -1,   118,    -1,   117,    83,   118,    -1,   119,    -1,
     118,    20,   119,    -1,   118,    21,   119,    -1,   120,    -1,
     119,    84,   120,    -1,   119,    85,   120,    -1,   121,    -1,
     120,    17,   121,    -1,   120,    18,   121,    -1,   120,    19,
     121,    -1,   122,    -1,   121,    86,   122,    -1,   121,    87,
     122,    -1,   123,    -1,   122,    88,   123,    -1,   122,    89,
     123,    -1,   122,    90,   123,    -1,   122,    91,   123,    -1,
     124,    -1,    60,   123,    -1,    86,   123,    -1,    87,   123,
      -1,    92,   123,    -1,    22,   123,    -1,   125,    -1,   124,
      93,   110,    94,    -1,   124,    95,    96,    -1,   124,    95,
     127,    96,    -1,   124,    97,     3,    -1,   124,    15,    -1,
     124,    16,    -1,     3,    -1,     4,    -1,    10,    -1,    11,
      -1,     8,    -1,     9,    -1,    12,    -1,    14,    -1,    13,
      -1,     5,    -1,     6,    -1,     7,    -1,   128,    -1,   126,
      -1,    93,   127,    94,    -1,    66,   127,    94,    -1,    93,
      94,    -1,    66,    94,    -1,    95,    96,    -1,    67,    96,
      -1,    98,   110,    99,    -1,    98,   126,    99,    -1,     4,
      63,     4,    -1,     4,     4,    -1,     4,     4,    63,     4,
      -1,     5,    63,     5,    -1,     5,     5,    -1,     5,     5,
      63,     5,    -1,     6,    63,     6,    -1,     6,     6,    -1,
       6,     6,    63,     6,    -1,   110,    -1,   127,   110,    -1,
      95,   129,    96,    69,    75,   104,    -1,    67,   129,    96,
      69,    75,   104,    -1,    95,   129,    96,    69,   110,    -1,
      67,   129,    96,    69,   110,    -1,    95,    96,    69,    75,
     104,    -1,    67,    96,    69,    75,   104,    -1,    95,    96,
      69,   110,    -1,    67,    96,    69,   110,    -1,     3,     3,
      -1,   129,     3,    -1,    30,    -1,    26,    -1,    27,    -1,
      28,    -1,    29,    -1,    32,    -1,    33,    -1,    34,    -1,
      35,    -1,    36,    -1,    37,    -1,    38,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,    43,    43,    44,    52,    53,    57,    58,    59,    60,
      61,    62,    66,    67,    71,    72,    76,    77,    81,    82,
      83,    84,    88,    89,    90,    91,    92,    96,    97,    98,
      99,   107,   108,   109,   113,   114,   115,   119,   120,   121,
     122,   126,   127,   131,   132,   136,   137,   141,   142,   146,
     147,   151,   152,   153,   157,   158,   159,   163,   164,   165,
     166,   170,   171,   172,   175,   176,   177,   178,   179,   183,
     184,   185,   186,   187,   188,   192,   193,   194,   195,   196,
     197,   198,   202,   203,   204,   205,   206,   207,   208,   209,
     210,   211,   212,   213,   214,   215,   216,   217,   218,   219,
     220,   221,   222,   223,   227,   228,   229,   230,   231,   232,
     233,   234,   235,   243,   244,   248,   249,   250,   251,   252,
     253,   254,   255,   259,   260,   264,   265,   266,   267,   268,
     269,   270,   271,   272,   273,   274,   275
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
  "EXP_ASSIGN", "TERN_ASSIGN", "SUB_ASSIGN", "LEFT_ASSIGN", "RIGHT_ASSIGN",
  "ZRIGHT_ASSIGN", "AND_ASSIGN", "XOR_ASSIGN", "OR_ASSIGN", "CASE",
  "DEFAULT", "IF", "ELSE", "SWITCH", "WHILE", "DO", "FOR", "CONTINUE",
  "BREAK", "RETURN", "TRY", "CATCH", "FINALLY", "THROW", "DEBUGGER",
  "DELETE", "IMPORT", "IN", "OF", "INSTANCEOF", "NEW", "TYPEOF",
  "ELLIPSIS", "TREMA", "ASSERT", "HLX", "F_BRACKET", "F_PAREN", "PTRPTR",
  "BIND_ARW", "EXTEND_ARW", "ASYNC_ARW", "GEN_ARW", "REV_ARW", "DRFT_ARW",
  "','", "'\\t'", "'\\b'", "';'", "'='", "':'", "'?'", "'|'", "'&'", "'<'",
  "'>'", "'+'", "'-'", "'*'", "'/'", "'^'", "'%'", "'!'", "'['", "']'",
  "'('", "')'", "'.'", "'{'", "'}'", "$accept", "translation_unit",
  "statement_list", "statement", "compound_statement",
  "expression_statement", "labeled_statement", "selection_statement",
  "iteration_statement", "jump_statement", "expression",
  "assignment_expression", "constant_expression", "logical_or_expression",
  "logical_and_expression", "inclusive_or_expression",
  "exclusive_or_expression", "and_expression", "equality_expression",
  "relational_expression", "shift_expression", "additive_expression",
  "multiplicative_expression", "prefix_expression", "postfix_expression",
  "primary_expression", "range", "expression_list", "function_literal",
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
     325,   326,   327,   328,   329,    44,     9,     8,    59,    61,
      58,    63,   124,    38,    60,    62,    43,    45,    42,    47,
      94,    37,    33,    91,    93,    40,    41,    46,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,   100,   101,   101,   102,   102,   103,   103,   103,   103,
     103,   103,   104,   104,   105,   105,   106,   106,   107,   107,
     107,   107,   108,   108,   108,   108,   108,   109,   109,   109,
     109,   110,   110,   110,   111,   111,   111,   112,   112,   112,
     112,   113,   113,   114,   114,   115,   115,   116,   116,   117,
     117,   118,   118,   118,   119,   119,   119,   120,   120,   120,
     120,   121,   121,   121,   122,   122,   122,   122,   122,   123,
     123,   123,   123,   123,   123,   124,   124,   124,   124,   124,
     124,   124,   125,   125,   125,   125,   125,   125,   125,   125,
     125,   125,   125,   125,   125,   125,   125,   125,   125,   125,
     125,   125,   125,   125,   126,   126,   126,   126,   126,   126,
     126,   126,   126,   127,   127,   128,   128,   128,   128,   128,
     128,   128,   128,   129,   129,   130,   130,   130,   130,   130,
     130,   130,   130,   130,   130,   130,   130
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     3,     2,     1,     2,     1,     1,     1,     1,
       1,     1,     2,     3,     1,     2,     4,     3,     4,     6,
       7,     4,     4,     6,     6,     6,     8,     2,     2,     2,
       3,     1,     3,     3,     1,     3,     3,     1,     5,     9,
       8,     1,     3,     1,     3,     1,     3,     1,     3,     1,
       3,     1,     3,     3,     1,     3,     3,     1,     3,     3,
       3,     1,     3,     3,     1,     3,     3,     3,     3,     1,
       2,     2,     2,     2,     2,     1,     4,     3,     4,     3,
       2,     2,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     3,     3,     2,     2,
       2,     2,     3,     3,     3,     2,     4,     3,     2,     4,
       3,     2,     4,     1,     2,     6,     6,     5,     5,     5,
       5,     4,     4,     2,     2,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,     0,     1,     3,    82,    83,    91,    92,
      93,    86,    87,    84,    85,    88,    90,    89,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    14,     0,     0,     0,     0,     0,     0,     0,
       2,     4,     7,     8,     6,     9,    10,    11,     0,    31,
      34,    37,    41,    43,    45,    47,    49,    51,    54,    57,
      61,    64,    69,    75,    95,    94,   105,     0,   108,     0,
     111,     0,    74,     0,     0,     0,     0,     0,     0,    82,
       0,    27,    28,    29,     0,    70,    99,   113,     0,     0,
     101,     0,    12,     0,    71,    72,    73,    98,     0,   100,
       0,     0,    95,     5,    15,     0,     0,   126,   127,   128,
     129,   125,     0,   130,   131,   132,   133,   134,   135,   136,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      80,    81,     0,     0,     0,     0,   104,     0,   107,     0,
     110,     0,    17,     0,     0,     0,     0,     0,     0,     0,
      30,    97,   114,   123,     0,   124,     0,    13,    96,     0,
       0,   102,   103,    32,    33,    36,    35,    42,     0,     0,
      44,    46,    48,    50,    52,    53,    55,    56,    58,    59,
      60,    62,    63,    65,    66,    67,    68,     0,    77,     0,
      79,   106,   109,   112,    16,    18,    21,    22,     0,     0,
       0,     0,     0,   122,     0,     0,   121,     0,     0,     0,
      76,    78,     0,     0,     0,     0,     0,   120,     0,   118,
     119,     0,   117,     0,     0,    38,     0,    19,    23,    24,
      25,     0,   116,   115,     0,     0,    20,     0,     0,     0,
      26,     0,    40,    39
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,     5,    40,    41,    42,    43,    44,    45,    46,    47,
      48,    49,    50,    51,    52,    53,    54,    55,    56,    57,
      58,    59,    60,    61,    62,    63,    64,    88,    65,    91,
     120
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -180
static const yytype_int16 yypact[] =
{
     -36,   -41,    27,   415,  -180,   -36,  -180,    13,     5,    15,
    -180,  -180,  -180,  -180,  -180,  -180,  -180,  -180,  1220,  1220,
     -34,  1220,  1220,  1220,   -25,  1242,    -2,     2,    77,  1220,
     511,     4,  -180,   223,  1220,  1220,  1220,   533,     9,  1220,
     415,  -180,  -180,  -180,  -180,  -180,  -180,  -180,   -35,   220,
    -180,    17,    19,   -26,    71,    42,    43,   -37,   114,   101,
      31,  -180,     0,  -180,  -180,  -180,    33,   106,    73,   136,
      85,   162,  -180,   -22,   415,   -20,   -14,    -8,   415,    44,
      80,  -180,  -180,  -180,    -5,  -180,  -180,   111,   629,   168,
     105,    10,  -180,   319,  -180,  -180,  -180,  -180,   651,   107,
      11,   -48,    93,  -180,  -180,  1220,  1220,  -180,  -180,  -180,
    -180,  -180,  1220,  -180,  -180,  -180,  -180,  -180,  -180,  -180,
    1220,  1220,   747,  1220,  1220,  1220,  1220,  1220,  1220,  1220,
    1220,  1220,  1220,  1220,  1220,  1220,  1220,  1220,  1220,  1220,
    -180,  -180,  1220,   769,   176,   180,  -180,   191,  -180,   195,
    -180,   415,  -180,   415,   415,   415,   165,  1220,  1220,  1220,
    -180,  -180,   111,  -180,   865,  -180,   137,  -180,  -180,   887,
     143,  -180,  -180,   220,   220,  -180,  -180,    19,   138,    29,
     -26,    71,    42,    43,   -37,   -37,   114,   114,   101,   101,
     101,    31,    31,  -180,  -180,  -180,  -180,   -57,  -180,   983,
    -180,  -180,  -180,  -180,  -180,   171,  -180,  -180,  1220,    38,
      55,    87,   140,   111,  1005,   140,   111,  1101,  1220,  1124,
    -180,  -180,   -13,    67,   415,   415,  1220,  -180,   140,   111,
    -180,   140,   111,    74,  1220,   111,   415,  -180,  -180,  -180,
    -180,    76,  -180,  -180,  1220,    82,  -180,   415,    98,   141,
    -180,   142,  -180,  -180
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -180,   217,   187,   -39,  -179,  -180,  -180,    -1,  -180,  -180,
     -19,    88,   -74,  -180,   102,    99,   100,   113,   115,    75,
      81,    50,    70,   -10,  -180,  -180,   200,   -32,  -180,   202,
    -180
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
      73,   103,    75,    76,    77,    98,    80,    89,    72,    84,
      68,    87,    89,   165,   165,   140,   141,    66,    87,    85,
     101,    70,   105,   106,    94,    95,    96,     4,    21,     1,
      22,   105,   106,   227,     3,   152,   230,   220,   175,   156,
     104,    74,   121,   123,   105,   106,   176,   129,   130,   242,
      78,   171,   243,   151,   103,   153,   124,   105,   106,   105,
     106,   154,   236,   127,   128,   105,   106,   155,    69,   162,
     160,   105,   106,    81,   105,   106,    67,    82,    71,   162,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,     1,   142,   125,   143,   145,   144,   122,    18,
      90,   157,   158,   179,   219,    99,   166,   170,   105,   106,
     146,   199,   204,   224,   205,   206,   207,   105,   106,   136,
     137,   138,   139,   197,    87,   126,   193,   194,   195,   196,
     225,   131,   132,   133,   105,   106,   147,    29,   209,   210,
     211,   148,   238,    30,    31,   213,   105,   106,   149,   244,
     216,   247,    83,   105,   106,   105,   106,   249,   159,   105,
     106,   105,   106,    34,    35,   226,   105,   106,   150,    36,
      37,   163,    38,   251,   164,    39,   169,   105,   106,   200,
     162,   188,   189,   190,   201,   239,   240,   134,   135,   223,
     105,   106,   172,   173,   174,   229,   202,   246,   232,   233,
     235,   203,   184,   185,   191,   192,   214,   241,   250,   208,
     186,   187,   217,   222,   218,   245,    33,     2,   252,   253,
      93,   237,   180,   177,   181,   248,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,   182,   102,
     100,   183,     0,     0,     0,    18,   107,   108,   109,   110,
     111,   112,   113,   114,   115,   116,   117,   118,   119,     0,
       0,     0,    19,    20,    21,     0,    22,    23,    24,    25,
      26,    27,    28,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    29,     0,     0,     0,     0,     0,    30,
      31,     0,     0,     0,     0,     0,     0,     0,    32,    33,
      92,     0,     0,     0,     0,     0,     0,     0,     0,    34,
      35,     0,     0,     0,     0,    36,    37,     0,    38,     0,
       0,    39,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,     0,     0,     0,     0,     0,     0,
       0,    18,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    19,    20,
      21,     0,    22,    23,    24,    25,    26,    27,    28,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    29,
       0,     0,     0,     0,     0,    30,    31,     0,     0,     0,
       0,     0,     0,     0,    32,    33,   167,     0,     0,     0,
       0,     0,     0,     0,     0,    34,    35,     0,     0,     0,
       0,    36,    37,     0,    38,     0,     0,    39,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    15,    16,    17,
       0,     0,     0,     0,     0,     0,     0,    18,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    19,    20,    21,     0,    22,    23,
      24,    25,    26,    27,    28,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    29,     0,     0,     0,     0,
       0,    30,    31,     0,     0,     0,     0,     0,     0,     0,
      32,    33,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    34,    35,     0,     0,     0,     0,    36,    37,     0,
      38,     0,     0,    39,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,     0,     0,     0,     0,
       0,     0,     0,    18,     0,     0,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,     0,     0,
       0,     0,     0,     0,     0,    18,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    29,     0,     0,     0,     0,     0,    30,    31,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    29,     0,     0,     0,    34,    35,    30,
      31,     0,     0,    36,    37,    86,    38,     0,     0,    39,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    34,
      35,     0,     0,     0,     0,    36,    37,    97,    38,     0,
       0,    39,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,     0,     0,     0,     0,     0,     0,
       0,    18,     0,     0,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,     0,     0,     0,     0,
       0,     0,     0,    18,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    29,
       0,     0,     0,     0,     0,    30,    31,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    29,     0,     0,     0,    34,    35,    30,    31,     0,
       0,    36,    37,   161,    38,     0,     0,    39,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    34,    35,     0,
       0,     0,     0,    36,    37,   168,    38,     0,     0,    39,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,     0,     0,     0,     0,     0,     0,     0,    18,
       0,     0,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,     0,     0,     0,     0,     0,     0,
       0,    18,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,    29,     0,     0,
       0,     0,     0,    30,    31,     0,     0,     0,     0,     0,
       0,     0,   178,     0,     0,     0,     0,     0,     0,    29,
       0,     0,     0,    34,    35,    30,    31,     0,     0,    36,
      37,     0,    38,     0,     0,    39,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    34,    35,     0,     0,     0,
       0,    36,    37,     0,    38,   198,     0,    39,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    15,    16,    17,
       0,     0,     0,     0,     0,     0,     0,    18,     0,     0,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,     0,     0,     0,     0,     0,     0,     0,    18,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    29,     0,     0,     0,     0,
       0,    30,    31,     0,     0,     0,     0,     0,     0,     0,
     212,     0,     0,     0,     0,     0,     0,    29,     0,     0,
       0,    34,    35,    30,    31,     0,     0,    36,    37,     0,
      38,     0,   215,    39,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    34,    35,     0,     0,     0,     0,    36,
      37,     0,    38,     0,     0,    39,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,     0,     0,
       0,     0,     0,     0,     0,    18,     0,     0,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    15,    16,    17,
       0,     0,     0,     0,     0,     0,     0,    18,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    29,     0,     0,     0,     0,     0,    30,
      31,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    29,     0,     0,     0,    34,
      35,    30,    31,     0,     0,    36,    37,     0,    38,   221,
     228,    39,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    34,    35,     0,     0,     0,     0,    36,    37,     0,
      38,     0,     0,    39,     6,     7,     8,     9,    10,    11,
      12,    13,    14,    15,    16,    17,     0,     0,     0,     0,
       0,     0,     0,    18,     0,     0,     0,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    15,    16,    17,     0,
       0,     0,     0,     0,     0,     0,    18,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    29,     0,     0,     0,     0,     0,    30,    31,     0,
       0,     0,     0,     0,     0,     0,   231,     0,     0,     0,
       0,     0,     0,     0,    29,     0,     0,    34,    35,     0,
      30,    31,     0,    36,    37,     0,    38,     0,     0,    39,
     234,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      34,    35,     0,     0,     0,     0,    36,    37,     0,    38,
       0,     0,    39,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,     0,     0,     0,     0,     0,
       0,     0,    18,     0,     0,    79,     7,     8,     9,    10,
      11,    12,    13,    14,    15,    16,    17,     0,     0,     0,
       0,     0,     0,     0,    18,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      29,     0,     0,     0,     0,     0,    30,    31,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    29,     0,     0,     0,    34,    35,    30,    31,
       0,     0,    36,    37,     0,    38,     0,     0,    39,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    34,    35,
       0,     0,     0,     0,    36,    37,     0,    38,     0,     0,
      39
};

static const yytype_int16 yycheck[] =
{
      19,    40,    21,    22,    23,    37,    25,     3,    18,    28,
       5,    30,     3,     3,     3,    15,    16,     4,    37,    29,
      39,     6,    79,    80,    34,    35,    36,     0,    41,    65,
      43,    79,    80,   212,    75,    74,   215,    94,   112,    78,
      75,    75,    25,    24,    79,    80,   120,    84,    85,   228,
      75,    99,   231,    75,    93,    75,    82,    79,    80,    79,
      80,    75,    75,    20,    21,    79,    80,    75,    63,    88,
      75,    79,    80,    75,    79,    80,    63,    75,    63,    98,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    65,    93,    23,    95,    63,    97,    81,    22,
      96,    57,    58,   122,    75,    96,    96,    96,    79,    80,
       4,   143,   151,    75,   153,   154,   155,    79,    80,    88,
      89,    90,    91,   142,   143,    83,   136,   137,   138,   139,
      75,    17,    18,    19,    79,    80,    63,    60,   157,   158,
     159,     5,    75,    66,    67,   164,    79,    80,    63,    75,
     169,    75,    75,    79,    80,    79,    80,    75,    78,    79,
      80,    79,    80,    86,    87,    78,    79,    80,     6,    92,
      93,     3,    95,    75,    69,    98,    69,    79,    80,     3,
     199,   131,   132,   133,     4,   224,   225,    86,    87,   208,
      79,    80,    99,   105,   106,   214,     5,   236,   217,   218,
     219,     6,   127,   128,   134,   135,    69,   226,   247,    44,
     129,   130,    69,    42,    76,   234,    76,     0,    77,    77,
      33,   222,   123,   121,   124,   244,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,   125,    39,
      38,   126,    -1,    -1,    -1,    22,    26,    27,    28,    29,
      30,    31,    32,    33,    34,    35,    36,    37,    38,    -1,
      -1,    -1,    39,    40,    41,    -1,    43,    44,    45,    46,
      47,    48,    49,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    60,    -1,    -1,    -1,    -1,    -1,    66,
      67,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    75,    76,
      77,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    86,
      87,    -1,    -1,    -1,    -1,    92,    93,    -1,    95,    -1,
      -1,    98,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    39,    40,
      41,    -1,    43,    44,    45,    46,    47,    48,    49,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    60,
      -1,    -1,    -1,    -1,    -1,    66,    67,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    75,    76,    77,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    86,    87,    -1,    -1,    -1,
      -1,    92,    93,    -1,    95,    -1,    -1,    98,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    39,    40,    41,    -1,    43,    44,
      45,    46,    47,    48,    49,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    60,    -1,    -1,    -1,    -1,
      -1,    66,    67,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      75,    76,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    86,    87,    -1,    -1,    -1,    -1,    92,    93,    -1,
      95,    -1,    -1,    98,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    22,    -1,    -1,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    60,    -1,    -1,    -1,    -1,    -1,    66,    67,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    60,    -1,    -1,    -1,    86,    87,    66,
      67,    -1,    -1,    92,    93,    94,    95,    -1,    -1,    98,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    86,
      87,    -1,    -1,    -1,    -1,    92,    93,    94,    95,    -1,
      -1,    98,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    22,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    60,
      -1,    -1,    -1,    -1,    -1,    66,    67,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    60,    -1,    -1,    -1,    86,    87,    66,    67,    -1,
      -1,    92,    93,    94,    95,    -1,    -1,    98,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    86,    87,    -1,
      -1,    -1,    -1,    92,    93,    94,    95,    -1,    -1,    98,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,
      -1,    -1,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    22,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    60,    -1,    -1,
      -1,    -1,    -1,    66,    67,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    75,    -1,    -1,    -1,    -1,    -1,    -1,    60,
      -1,    -1,    -1,    86,    87,    66,    67,    -1,    -1,    92,
      93,    -1,    95,    -1,    -1,    98,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    86,    87,    -1,    -1,    -1,
      -1,    92,    93,    -1,    95,    96,    -1,    98,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    60,    -1,    -1,    -1,    -1,
      -1,    66,    67,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      75,    -1,    -1,    -1,    -1,    -1,    -1,    60,    -1,    -1,
      -1,    86,    87,    66,    67,    -1,    -1,    92,    93,    -1,
      95,    -1,    75,    98,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    86,    87,    -1,    -1,    -1,    -1,    92,
      93,    -1,    95,    -1,    -1,    98,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    60,    -1,    -1,    -1,    -1,    -1,    66,
      67,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    60,    -1,    -1,    -1,    86,
      87,    66,    67,    -1,    -1,    92,    93,    -1,    95,    96,
      75,    98,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    86,    87,    -1,    -1,    -1,    -1,    92,    93,    -1,
      95,    -1,    -1,    98,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    22,    -1,    -1,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    22,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    60,    -1,    -1,    -1,    -1,    -1,    66,    67,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    75,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    60,    -1,    -1,    86,    87,    -1,
      66,    67,    -1,    92,    93,    -1,    95,    -1,    -1,    98,
      76,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      86,    87,    -1,    -1,    -1,    -1,    92,    93,    -1,    95,
      -1,    -1,    98,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    22,    -1,    -1,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    22,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      60,    -1,    -1,    -1,    -1,    -1,    66,    67,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    60,    -1,    -1,    -1,    86,    87,    66,    67,
      -1,    -1,    92,    93,    -1,    95,    -1,    -1,    98,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    86,    87,
      -1,    -1,    -1,    -1,    92,    93,    -1,    95,    -1,    -1,
      98
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    65,   101,    75,     0,   101,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    22,    39,
      40,    41,    43,    44,    45,    46,    47,    48,    49,    60,
      66,    67,    75,    76,    86,    87,    92,    93,    95,    98,
     102,   103,   104,   105,   106,   107,   108,   109,   110,   111,
     112,   113,   114,   115,   116,   117,   118,   119,   120,   121,
     122,   123,   124,   125,   126,   128,     4,    63,     5,    63,
       6,    63,   123,   110,    75,   110,   110,   110,    75,     3,
     110,    75,    75,    75,   110,   123,    94,   110,   127,     3,
      96,   129,    77,   102,   123,   123,   123,    94,   127,    96,
     129,   110,   126,   103,    75,    79,    80,    26,    27,    28,
      29,    30,    31,    32,    33,    34,    35,    36,    37,    38,
     130,    25,    81,    24,    82,    23,    83,    20,    21,    84,
      85,    17,    18,    19,    86,    87,    88,    89,    90,    91,
      15,    16,    93,    95,    97,    63,     4,    63,     5,    63,
       6,    75,   103,    75,    75,    75,   103,    57,    58,    78,
      75,    94,   110,     3,    69,     3,    96,    77,    94,    69,
      96,    99,    99,   111,   111,   112,   112,   114,    75,   110,
     115,   116,   117,   118,   119,   119,   120,   120,   121,   121,
     121,   122,   122,   123,   123,   123,   123,   110,    96,   127,
       3,     4,     5,     6,   103,   103,   103,   103,    44,   110,
     110,   110,    75,   110,    69,    75,   110,    69,    76,    75,
      94,    96,    42,   110,    75,    75,    78,   104,    75,   110,
     104,    75,   110,   110,    76,   110,    75,   107,    75,   103,
     103,   110,   104,   104,    75,   110,   103,    75,   110,    75,
     103,    75,    77,    77
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
#line 43 "js.y"
    {(yyval.data).s = cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s); printf("%s\n",(yyval.data).s); new_HLX();}
    break;

  case 3:
#line 44 "js.y"
    {;}
    break;

  case 4:
#line 52 "js.y"
    {;}
    break;

  case 5:
#line 53 "js.y"
    {(yyval.data).s = cat((yyvsp[(1) - (2)].data).s,(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 6:
#line 57 "js.y"
    {;}
    break;

  case 7:
#line 58 "js.y"
    {;}
    break;

  case 8:
#line 59 "js.y"
    {;}
    break;

  case 9:
#line 60 "js.y"
    {;}
    break;

  case 10:
#line 61 "js.y"
    {;}
    break;

  case 11:
#line 62 "js.y"
    {;}
    break;

  case 12:
#line 66 "js.y"
    {;}
    break;

  case 13:
#line 67 "js.y"
    {(yyval.data).s = (yyvsp[(2) - (3)].data).s; (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 14:
#line 71 "js.y"
    {(yyval.data).s = ";";}
    break;

  case 15:
#line 72 "js.y"
    {(yyval.data).s = cat((yyvsp[(1) - (2)].data).s,";");}
    break;

  case 16:
#line 76 "js.y"
    {(yyval.data).s = cat(cat(cat("case ",(yyvsp[(2) - (4)].data).s),":"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 17:
#line 77 "js.y"
    {(yyval.data).s = cat("default:",cat(end_scope((yyvsp[(3) - (3)].data).v,0),(yyvsp[(3) - (3)].data).s));}
    break;

  case 18:
#line 81 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("if(",(yyvsp[(2) - (4)].data).s),"){"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 19:
#line 82 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (6)].data).s),"){"),cat(end_scope((yyvsp[(4) - (6)].data).v,0),(yyvsp[(4) - (6)].data).s)),"}else "),cat(end_scope((yyvsp[(6) - (6)].data).v,0),(yyvsp[(6) - (6)].data).s)); (yyval.data).v = llcat((yyvsp[(2) - (6)].data).v,(yyvsp[(6) - (6)].data).v);}
    break;

  case 20:
#line 83 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (7)].data).s),"){"),cat(end_scope((yyvsp[(4) - (7)].data).v,0),(yyvsp[(4) - (7)].data).s)),"}else{"),cat(end_scope((yyvsp[(7) - (7)].data).v,0),(yyvsp[(7) - (7)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (7)].data).v;}
    break;

  case 21:
#line 84 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("switch(",(yyvsp[(2) - (4)].data).s),"){"),(yyvsp[(4) - (4)].data).s),"}"); end_scope((yyvsp[(4) - (4)].data).v,0); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 22:
#line 88 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("while(",(yyvsp[(2) - (4)].data).s),"){"),cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),"}"); (yyval.data).v = (yyvsp[(2) - (4)].data).v;}
    break;

  case 23:
#line 89 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("do{",cat(end_scope((yyvsp[(3) - (6)].data).v,0),(yyvsp[(3) - (6)].data).s)),"}while("),(yyvsp[(5) - (6)].data).s),");"); (yyval.data).v = (yyvsp[(5) - (6)].data).v;}
    break;

  case 24:
#line 90 "js.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (6)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].data).s)," in "),(yyvsp[(4) - (6)].data).s),"){"),cat(end_scope((yyvsp[(6) - (6)].data).v,tmp),(yyvsp[(6) - (6)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (6)].data).v;}
    break;

  case 25:
#line 91 "js.y"
    {llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (6)].data).s; tmp->next = NULL; (yyval.data).s = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].data).s)," of "),(yyvsp[(4) - (6)].data).s),"){"),cat(end_scope((yyvsp[(6) - (6)].data).v,tmp),(yyvsp[(6) - (6)].data).s)),"}"); (yyval.data).v = (yyvsp[(4) - (6)].data).v;}
    break;

  case 26:
#line 92 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat(cat(cat("for(",(yyvsp[(2) - (8)].data).s),";"),(yyvsp[(4) - (8)].data).s),";"),(yyvsp[(6) - (8)].data).s),"){"),cat(end_scope((yyvsp[(8) - (8)].data).v,(yyvsp[(2) - (8)].data).v),(yyvsp[(8) - (8)].data).s)),"}"); (yyval.data).v = llcat((yyvsp[(4) - (8)].data).v,(yyvsp[(6) - (8)].data).v);}
    break;

  case 27:
#line 96 "js.y"
    {(yyval.data).s = "continue;";}
    break;

  case 28:
#line 97 "js.y"
    {(yyval.data).s = "break;";}
    break;

  case 29:
#line 98 "js.y"
    {(yyval.data).s = "return;";}
    break;

  case 30:
#line 99 "js.y"
    {(yyval.data).s = cat(cat("return ",(yyvsp[(2) - (3)].data).s),";"); (yyval.data).v = (yyvsp[(2) - (3)].data).v;}
    break;

  case 31:
#line 107 "js.y"
    {;}
    break;

  case 32:
#line 108 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,1),(yyvsp[(1) - (3)].data).s),"=HLX.extend(true,[],"),(yyvsp[(3) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 33:
#line 109 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(var_declare((yyvsp[(1) - (3)].data).s,&(yyvsp[(1) - (3)].data).v,2),(yyvsp[(1) - (3)].data).s),"=HLX.extend(true,[],"),(yyvsp[(3) - (3)].data).s),")"); (yyval.data).v = llcat((yyvsp[(1) - (3)].data).v,(yyvsp[(3) - (3)].data).v);}
    break;

  case 34:
#line 113 "js.y"
    {;}
    break;

  case 35:
#line 114 "js.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(2) - (3)].data).s,(yyvsp[(1) - (3)].data).s),","),(yyvsp[(3) - (3)].data).s),")");}
    break;

  case 36:
#line 115 "js.y"
    {(yyval.data).s = cat(cat(cat(cat(cat(cat((yyvsp[(1) - (3)].data).s,"="),(yyvsp[(1) - (3)].data).s),"?"),(yyvsp[(1) - (3)].data).s),":"),(yyvsp[(3) - (3)].data).s);}
    break;

  case 37:
#line 119 "js.y"
    {;}
    break;

  case 38:
#line 120 "js.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (5)].data).s,"?"),(yyvsp[(3) - (5)].data).s ),":"),(yyvsp[(5) - (5)].data).s);}
    break;

  case 39:
#line 121 "js.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (9)].data).s,"?"),(yyvsp[(5) - (9)].data).s ),":"),(yyvsp[(7) - (9)].data).s);}
    break;

  case 40:
#line 122 "js.y"
    {(yyval.data).s = cat(cat(cat(cat((yyvsp[(1) - (8)].data).s,"?"),(yyvsp[(3) - (8)].data).s ),":"),(yyvsp[(6) - (8)].data).s);}
    break;

  case 41:
#line 126 "js.y"
    {;}
    break;

  case 42:
#line 127 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]||"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 43:
#line 131 "js.y"
    {;}
    break;

  case 44:
#line 132 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]&&"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 45:
#line 136 "js.y"
    {;}
    break;

  case 46:
#line 137 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]|"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 47:
#line 141 "js.y"
    {;}
    break;

  case 48:
#line 142 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]^"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 49:
#line 146 "js.y"
    {;}
    break;

  case 50:
#line 147 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]&"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 51:
#line 151 "js.y"
    {;}
    break;

  case 52:
#line 152 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]==="),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 53:
#line 153 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]!=="),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 54:
#line 157 "js.y"
    {;}
    break;

  case 55:
#line 158 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]<"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 56:
#line 159 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]>"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 57:
#line 163 "js.y"
    {;}
    break;

  case 58:
#line 164 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]<<"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 59:
#line 165 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]>>"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 60:
#line 166 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]>>>"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 61:
#line 170 "js.y"
    {;}
    break;

  case 62:
#line 171 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]+"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 63:
#line 172 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]-"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 64:
#line 175 "js.y"
    {;}
    break;

  case 65:
#line 176 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]*"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 66:
#line 177 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]/"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 67:
#line 178 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]**"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 68:
#line 179 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[",(yyvsp[(1) - (3)].data).s),"[0]%"),(yyvsp[(3) - (3)].data).s),"[0]]");}
    break;

  case 69:
#line 183 "js.y"
    {;}
    break;

  case 70:
#line 184 "js.y"
    {(yyval.data).s = cat(cat("[new ",(yyvsp[(2) - (2)].data).s),"[0]]");}
    break;

  case 71:
#line 185 "js.y"
    {(yyval.data).s = cat(cat("HLX.uplus(",(yyvsp[(2) - (2)].data).s),")");}
    break;

  case 72:
#line 186 "js.y"
    {(yyval.data).s = cat(cat("HLX.uminus(",(yyvsp[(2) - (2)].data).s),")");}
    break;

  case 73:
#line 187 "js.y"
    {(yyval.data).s = cat(cat("HLX.unot(",(yyvsp[(2) - (2)].data).s),")");}
    break;

  case 74:
#line 188 "js.y"
    {(yyval.data).s = cat(cat("HLX.ubnot(",(yyvsp[(2) - (2)].data).s),")");}
    break;

  case 75:
#line 192 "js.y"
    {;}
    break;

  case 76:
#line 193 "js.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (4)].data).s,"[0]["),(yyvsp[(3) - (4)].data).s),"]");}
    break;

  case 77:
#line 194 "js.y"
    {(yyval.data).s = cat((yyvsp[(1) - (3)].data).s,"[0]()");}
    break;

  case 78:
#line 195 "js.y"
    {(yyval.data).s = cat(cat(cat((yyvsp[(1) - (4)].data).s,"[0]("),(yyvsp[(3) - (4)].data).s),")");}
    break;

  case 79:
#line 196 "js.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (3)].data).s,"[0]."),(yyvsp[(3) - (3)].data).s);}
    break;

  case 80:
#line 197 "js.y"
    {(yyval.data).s = cat(cat("HLX.add(",(yyvsp[(1) - (2)].data).s),",[1])");}
    break;

  case 81:
#line 198 "js.y"
    {(yyval.data).s = cat(cat("HLX.sub(",(yyvsp[(1) - (2)].data).s),",[1])");}
    break;

  case 82:
#line 202 "js.y"
    {;}
    break;

  case 83:
#line 203 "js.y"
    {(yyval.data).s = cat(cat("[",(yyvsp[(1) - (1)].data).s),"]");}
    break;

  case 84:
#line 204 "js.y"
    {(yyval.data).s = "[true]";}
    break;

  case 85:
#line 205 "js.y"
    {(yyval.data).s = "[false]";}
    break;

  case 86:
#line 206 "js.y"
    {(yyval.data).s = "[null]";}
    break;

  case 87:
#line 207 "js.y"
    {(yyval.data).s = "[undefined]";}
    break;

  case 88:
#line 208 "js.y"
    {(yyval.data).s = "[Infinity]";}
    break;

  case 89:
#line 209 "js.y"
    {(yyval.data).s = "[Number.EPSILON]";}
    break;

  case 90:
#line 210 "js.y"
    {(yyval.data).s = "[NaN]";}
    break;

  case 91:
#line 211 "js.y"
    {(yyval.data).s = cat(cat("['",(yyvsp[(1) - (1)].data).s),"']");}
    break;

  case 92:
#line 212 "js.y"
    {(yyval.data).s = cat(cat("[`",(yyvsp[(1) - (1)].data).s),"`]");}
    break;

  case 93:
#line 213 "js.y"
    {(yyval.data).s = cat(cat("[/",(yyvsp[(1) - (1)].data).s),"/]");}
    break;

  case 94:
#line 214 "js.y"
    {(yyval.data).s = cat(cat("[",(yyvsp[(1) - (1)].data).s),"]");}
    break;

  case 95:
#line 215 "js.y"
    {;}
    break;

  case 96:
#line 216 "js.y"
    {(yyval.data).s = cat(cat("[[",(yyvsp[(2) - (3)].data).s),"]]");}
    break;

  case 97:
#line 217 "js.y"
    {(yyval.data).s = cat(cat("[[",(yyvsp[(2) - (3)].data).s),"]]");}
    break;

  case 98:
#line 218 "js.y"
    {(yyval.data).s = "[[]]";}
    break;

  case 99:
#line 219 "js.y"
    {(yyval.data).s = "[[]]";}
    break;

  case 100:
#line 220 "js.y"
    {(yyval.data).s = "[function(){}]";}
    break;

  case 101:
#line 221 "js.y"
    {(yyval.data).s = "[function(){}]";}
    break;

  case 102:
#line 222 "js.y"
    {(yyval.data).s = cat(cat("(",(yyvsp[(2) - (3)].data).s),")");}
    break;

  case 103:
#line 223 "js.y"
    {(yyval.data).s = (yyvsp[(2) - (3)].data).s;}
    break;

  case 104:
#line 227 "js.y"
    {(yyval.data).s = genrange_dc((yyvsp[(1) - (3)].data).s,(yyvsp[(3) - (3)].data).s);}
    break;

  case 105:
#line 228 "js.y"
    {(yyval.data).s = cat(cat(cat("[",(yyvsp[(1) - (2)].data).s),"],"),cat(cat("[",(yyvsp[(2) - (2)].data).s),"]"));}
    break;

  case 106:
#line 229 "js.y"
    {(yyval.data).s = genrange_da((yyvsp[(1) - (4)].data).s,(yyvsp[(2) - (4)].data).s,(yyvsp[(4) - (4)].data).s);}
    break;

  case 107:
#line 230 "js.y"
    {(yyval.data).s = genrange_sc("'",(yyvsp[(1) - (3)].data).s,(yyvsp[(3) - (3)].data).s);}
    break;

  case 108:
#line 231 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("['",(yyvsp[(1) - (2)].data).s),"']"),","),cat(cat("['",(yyvsp[(2) - (2)].data).s),"']"));}
    break;

  case 109:
#line 232 "js.y"
    {(yyval.data).s = genrange_sa("'",(yyvsp[(1) - (4)].data).s,(yyvsp[(2) - (4)].data).s,(yyvsp[(4) - (4)].data).s);}
    break;

  case 110:
#line 233 "js.y"
    {(yyval.data).s = genrange_sc("`",(yyvsp[(1) - (3)].data).s,(yyvsp[(3) - (3)].data).s);}
    break;

  case 111:
#line 234 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("[`",(yyvsp[(1) - (2)].data).s),"`]"),","),cat(cat("[`",(yyvsp[(2) - (2)].data).s),"`]"));}
    break;

  case 112:
#line 235 "js.y"
    {(yyval.data).s = genrange_sa("`",(yyvsp[(1) - (4)].data).s,(yyvsp[(2) - (4)].data).s,(yyvsp[(4) - (4)].data).s);}
    break;

  case 113:
#line 243 "js.y"
    {;}
    break;

  case 114:
#line 244 "js.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); (yyval.data).v = llcat((yyvsp[(1) - (2)].data).v,(yyvsp[(2) - (2)].data).v);}
    break;

  case 115:
#line 248 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].data).s),"){"),cat(end_scope((yyvsp[(6) - (6)].data).v,(yyvsp[(2) - (6)].data).v),(yyvsp[(6) - (6)].data).s)),"}");}
    break;

  case 116:
#line 249 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].data).s),"){"),cat(end_scope((yyvsp[(6) - (6)].data).v,(yyvsp[(2) - (6)].data).v),(yyvsp[(6) - (6)].data).s)),"}");}
    break;

  case 117:
#line 250 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){return "),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),";}");}
    break;

  case 118:
#line 251 "js.y"
    {(yyval.data).s = cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].data).s),"){return "),cat(end_scope((yyvsp[(5) - (5)].data).v,(yyvsp[(2) - (5)].data).v),(yyvsp[(5) - (5)].data).s)),";}");}
    break;

  case 119:
#line 252 "js.y"
    {(yyval.data).s = cat(cat("function(){",cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 120:
#line 253 "js.y"
    {(yyval.data).s = cat(cat("function(){",cat(end_scope((yyvsp[(5) - (5)].data).v,0),(yyvsp[(5) - (5)].data).s)),"}");}
    break;

  case 121:
#line 254 "js.y"
    {(yyval.data).s = cat(cat("function(){return ",cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),";}");}
    break;

  case 122:
#line 255 "js.y"
    {(yyval.data).s = cat(cat("function(){return ",cat(end_scope((yyvsp[(4) - (4)].data).v,0),(yyvsp[(4) - (4)].data).s)),";}");}
    break;

  case 123:
#line 259 "js.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(1) - (2)].data).s; tmp->next = (yyval.data).v; (yyval.data).v = tmp; tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (2)].data).s; tmp->next = (yyval.data).v; (yyval.data).v = tmp;}
    break;

  case 124:
#line 260 "js.y"
    {(yyval.data).s = cat(cat((yyvsp[(1) - (2)].data).s,","),(yyvsp[(2) - (2)].data).s); llnode* tmp = malloc(sizeof(llnode)); tmp->val = (yyvsp[(2) - (2)].data).s; tmp->next = (yyvsp[(1) - (2)].data).v; (yyvsp[(1) - (2)].data).v = tmp; (yyval.data).v = (yyvsp[(1) - (2)].data).v;}
    break;

  case 125:
#line 264 "js.y"
    {(yyval.data).s = "HLX.exp(";}
    break;

  case 126:
#line 265 "js.y"
    {(yyval.data).s = "HLX.mul(";}
    break;

  case 127:
#line 266 "js.y"
    {(yyval.data).s = "HLX.div(";}
    break;

  case 128:
#line 267 "js.y"
    {(yyval.data).s = "HLX.mod(";}
    break;

  case 129:
#line 268 "js.y"
    {(yyval.data).s = "HLX.add(";}
    break;

  case 130:
#line 269 "js.y"
    {(yyval.data).s = "HLX.sub(";}
    break;

  case 131:
#line 270 "js.y"
    {(yyval.data).s = "HLX.lshft(";}
    break;

  case 132:
#line 271 "js.y"
    {(yyval.data).s = "HLX.rshft(";}
    break;

  case 133:
#line 272 "js.y"
    {(yyval.data).s = "HLX.zrshft(";}
    break;

  case 134:
#line 273 "js.y"
    {(yyval.data).s = "HLX.band(";}
    break;

  case 135:
#line 274 "js.y"
    {(yyval.data).s = "HLX.bxor(";}
    break;

  case 136:
#line 275 "js.y"
    {(yyval.data).s = "HLX.bor(";}
    break;


/* Line 1267 of yacc.c.  */
#line 2622 "y.tab.c"
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


#line 278 "js.y"

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
	yyparse();
	printf("/*@HLXCNTRLEND@*/\n");
	return 0;
}

