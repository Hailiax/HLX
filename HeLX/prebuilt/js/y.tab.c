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




/* Copy the first part of user declarations.  */
#line 1 "toJS.y"


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dependencies/hashmap.h"
#include "dependencies/js_genrange.h"
#include "dependencies/js_common.h"

void yyerror (char *s);
int yylex();

char* var_declare(char *name, char *value, char type);
char* var_access(char *name);
char* var_clean(char *rawName);

map_t varMap;
#define KEY_MAX_LENGTH (256)
#define KEY_COUNT (4*4)
typedef struct variable {
    char name[KEY_MAX_LENGTH];
    char type; // 1: public; 2: private; 3: constant public; 4: constant private
} variable;



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
#line 27 "toJS.y"
{char *str;}
/* Line 193 of yacc.c.  */
#line 252 "y.tab.c"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 265 "y.tab.c"

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
#define YYFINAL  62
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   1594

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  90
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  29
/* YYNRULES -- Number of rules.  */
#define YYNRULES  128
/* YYNRULES -- Number of states.  */
#define YYNSTATES  241

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   319

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,    67,    66,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    82,     2,     2,     2,    81,    73,     2,
      85,    86,    78,    76,    65,    77,    87,    79,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    70,    68,
      74,    69,    75,    71,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    83,     2,    84,    80,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    88,    72,    89,     2,     2,     2,     2,
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
      55,    56,    57,    58,    59,    60,    61,    62,    63,    64
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     7,    11,    13,    16,    18,    20,    22,
      24,    26,    28,    30,    33,    38,    42,    47,    54,    62,
      67,    72,    79,    86,    93,   102,   105,   108,   111,   115,
     117,   120,   122,   126,   130,   134,   136,   142,   144,   148,
     150,   154,   156,   160,   162,   166,   168,   172,   174,   178,
     182,   184,   188,   192,   194,   198,   202,   204,   208,   212,
     214,   218,   222,   226,   230,   232,   235,   238,   241,   244,
     247,   250,   253,   255,   260,   264,   269,   273,   276,   279,
     281,   283,   285,   287,   289,   291,   293,   295,   297,   299,
     303,   307,   310,   313,   317,   321,   325,   328,   333,   337,
     343,   347,   350,   355,   359,   362,   367,   369,   372,   379,
     386,   392,   398,   404,   410,   415,   420,   422,   424,   426,
     428,   430,   432,   434,   436,   438,   440,   442,   444
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int8 yyrhs[] =
{
      91,     0,    -1,    62,    65,    92,    -1,    66,    92,    67,
      -1,    93,    -1,    92,    93,    -1,    95,    -1,    91,    -1,
      94,    -1,    96,    -1,    97,    -1,    98,    -1,    65,    -1,
      99,    65,    -1,    33,   101,    65,    93,    -1,    34,    65,
      93,    -1,    35,    99,    65,    93,    -1,    35,    99,    65,
      93,    36,    96,    -1,    35,    99,    65,    93,    36,    65,
      93,    -1,    37,    99,    65,    93,    -1,    38,    99,    65,
      93,    -1,    39,    65,    93,    38,    99,    65,    -1,    40,
       3,    51,   114,    65,    93,    -1,    40,     3,    52,   114,
      65,    93,    -1,    40,    99,    68,    99,    68,    99,    65,
      93,    -1,    41,    65,    -1,    42,    65,    -1,    43,    65,
      -1,    43,    99,    65,    -1,   100,    -1,    99,   100,    -1,
     101,    -1,   112,   118,   100,    -1,   113,    69,   100,    -1,
     113,    70,   100,    -1,   102,    -1,   102,    71,    99,    65,
     101,    -1,   103,    -1,   102,    20,   103,    -1,   104,    -1,
     103,    19,   104,    -1,   105,    -1,   104,    72,   105,    -1,
     106,    -1,   105,    18,   106,    -1,   107,    -1,   106,    73,
     107,    -1,   108,    -1,   107,    15,   108,    -1,   107,    16,
     108,    -1,   109,    -1,   108,    74,   109,    -1,   108,    75,
     109,    -1,   110,    -1,   109,    13,   110,    -1,   109,    14,
     110,    -1,   111,    -1,   110,    76,   111,    -1,   110,    77,
     111,    -1,   112,    -1,   111,    78,   112,    -1,   111,    79,
     112,    -1,   111,    80,   112,    -1,   111,    81,   112,    -1,
     113,    -1,    54,   112,    -1,    11,   112,    -1,    12,   112,
      -1,    76,   112,    -1,    77,   112,    -1,    82,   112,    -1,
      17,   112,    -1,   114,    -1,   113,    83,    99,    84,    -1,
     113,    85,    86,    -1,   113,    85,   116,    86,    -1,   113,
      87,     3,    -1,   113,    11,    -1,   113,    12,    -1,     3,
      -1,     4,    -1,     5,    -1,     6,    -1,     7,    -1,     8,
      -1,     9,    -1,    10,    -1,   117,    -1,   115,    -1,    83,
     116,    84,    -1,    63,   116,    84,    -1,    83,    84,    -1,
      63,    84,    -1,    88,    99,    89,    -1,    88,   115,    89,
      -1,     4,    57,     4,    -1,     4,     4,    -1,     4,     4,
      57,     4,    -1,     4,     4,     4,    -1,     4,     4,     4,
      57,     4,    -1,     8,    57,     8,    -1,     8,     8,    -1,
       8,     8,    57,     8,    -1,     9,    57,     9,    -1,     9,
       9,    -1,     9,     9,    57,     9,    -1,   100,    -1,   116,
     100,    -1,    85,   116,    86,    58,    65,    91,    -1,    64,
     116,    86,    58,    65,    91,    -1,    85,   116,    86,    58,
      99,    -1,    64,   116,    86,    58,    99,    -1,    85,    86,
      58,    65,    91,    -1,    64,    86,    58,    65,    91,    -1,
      85,    86,    58,    99,    -1,    64,    86,    58,    99,    -1,
      69,    -1,    26,    -1,    21,    -1,    22,    -1,    23,    -1,
      24,    -1,    27,    -1,    28,    -1,    29,    -1,    30,    -1,
      31,    -1,    32,    -1,    25,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,    49,    49,    50,    54,    55,    59,    60,    61,    62,
      63,    64,    68,    69,    73,    74,    78,    79,    80,    81,
      85,    86,    87,    88,    89,    93,    94,    95,    96,   104,
     105,   109,   110,   111,   112,   116,   117,   122,   123,   127,
     128,   132,   133,   137,   138,   142,   143,   147,   148,   149,
     153,   154,   155,   159,   160,   161,   165,   166,   167,   170,
     171,   172,   173,   174,   178,   179,   180,   181,   182,   183,
     184,   185,   189,   190,   191,   192,   193,   194,   195,   199,
     200,   201,   202,   203,   204,   205,   206,   207,   208,   209,
     210,   211,   212,   213,   214,   218,   219,   220,   221,   222,
     223,   224,   225,   226,   227,   228,   236,   237,   241,   242,
     243,   244,   245,   246,   247,   248,   252,   253,   254,   255,
     256,   257,   258,   259,   260,   261,   262,   263,   264
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || YYTOKEN_TABLE
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "IDENTIFIER", "NUMBER", "BOOL", "NUL",
  "UND", "STRING_LITERAL", "TEMPLATE_LITERAL", "REGEXP_LITERAL", "INC_OP",
  "DEC_OP", "LEFT_OP", "RIGHT_OP", "EQ_OP", "NE_OP", "NOT_OP", "XOR_OP",
  "AND_OP", "OR_OP", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN",
  "ADD_ASSIGN", "NOT_ASSIGN", "EXP_ASSIGN", "SUB_ASSIGN", "LEFT_ASSIGN",
  "RIGHT_ASSIGN", "AND_ASSIGN", "XOR_ASSIGN", "OR_ASSIGN", "CASE",
  "DEFAULT", "IF", "ELSE", "SWITCH", "WHILE", "DO", "FOR", "CONTINUE",
  "BREAK", "RETURN", "TRY", "CATCH", "FINALLY", "THROW", "DEBUGGER",
  "DELETE", "IMPORT", "IN", "OF", "INSTANCEOF", "NEW", "TYPEOF",
  "ELLIPSIS", "TREMA", "ARROW_FUNC", "REV_ARROW", "BIND_OP", "ASSERT",
  "HLX", "F_BRACKET", "F_PAREN", "','", "'\\t'", "'\\b'", "';'", "'='",
  "':'", "'?'", "'|'", "'&'", "'<'", "'>'", "'+'", "'-'", "'*'", "'/'",
  "'^'", "'%'", "'!'", "'['", "']'", "'('", "')'", "'.'", "'{'", "'}'",
  "$accept", "compound_statement", "statement_list", "statement",
  "expression_statement", "labeled_statement", "selection_statement",
  "iteration_statement", "jump_statement", "expression",
  "assignment_expression", "constant_expression", "logical_or_expression",
  "logical_and_expression", "inclusive_or_expression",
  "exclusive_or_expression", "and_expression", "equality_expression",
  "relational_expression", "shift_expression", "additive_expression",
  "multiplicative_expression", "prefix_expression", "postfix_expression",
  "primary_expression", "range", "expression_list", "function_literal",
  "assignment_operator", 0
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
     315,   316,   317,   318,   319,    44,     9,     8,    59,    61,
      58,    63,   124,    38,    60,    62,    43,    45,    42,    47,
      94,    37,    33,    91,    93,    40,    41,    46,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    90,    91,    91,    92,    92,    93,    93,    93,    93,
      93,    93,    94,    94,    95,    95,    96,    96,    96,    96,
      97,    97,    97,    97,    97,    98,    98,    98,    98,    99,
      99,   100,   100,   100,   100,   101,   101,   102,   102,   103,
     103,   104,   104,   105,   105,   106,   106,   107,   107,   107,
     108,   108,   108,   109,   109,   109,   110,   110,   110,   111,
     111,   111,   111,   111,   112,   112,   112,   112,   112,   112,
     112,   112,   113,   113,   113,   113,   113,   113,   113,   114,
     114,   114,   114,   114,   114,   114,   114,   114,   114,   114,
     114,   114,   114,   114,   114,   115,   115,   115,   115,   115,
     115,   115,   115,   115,   115,   115,   116,   116,   117,   117,
     117,   117,   117,   117,   117,   117,   118,   118,   118,   118,
     118,   118,   118,   118,   118,   118,   118,   118,   118
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     3,     3,     1,     2,     1,     1,     1,     1,
       1,     1,     1,     2,     4,     3,     4,     6,     7,     4,
       4,     6,     6,     6,     8,     2,     2,     2,     3,     1,
       2,     1,     3,     3,     3,     1,     5,     1,     3,     1,
       3,     1,     3,     1,     3,     1,     3,     1,     3,     3,
       1,     3,     3,     1,     3,     3,     1,     3,     3,     1,
       3,     3,     3,     3,     1,     2,     2,     2,     2,     2,
       2,     2,     1,     4,     3,     4,     3,     2,     2,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     3,
       3,     2,     2,     3,     3,     3,     2,     4,     3,     5,
       3,     2,     4,     3,     2,     4,     1,     2,     6,     6,
       5,     5,     5,     5,     4,     4,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,     0,     0,    79,    80,    81,    82,    83,
      84,    85,    86,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    12,
       0,     0,     0,     0,     0,     0,     7,     0,     4,     8,
       6,     9,    10,    11,     0,    29,    31,    35,    37,    39,
      41,    43,    45,    47,    50,    53,    56,    59,    64,    72,
      88,    87,     1,     2,    96,     0,   101,     0,   104,     0,
      66,    64,    67,    71,     0,    59,     0,     0,     0,     0,
       0,    79,     0,    25,    26,    27,     0,    65,    92,   106,
       0,     0,     0,    68,    69,    70,    91,     0,     0,     0,
       0,    88,     3,     5,    13,    30,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,   118,   119,   120,   121,   128,   117,
     122,   123,   124,   125,   126,   127,   116,     0,    77,    78,
       0,     0,     0,     0,     0,    98,     0,    95,     0,   100,
       0,   103,     0,    15,     0,     0,     0,     0,     0,     0,
       0,    28,    90,   107,     0,     0,    89,     0,     0,    93,
      94,    38,     0,    40,    42,    44,    46,    48,    49,    51,
      52,    54,    55,    57,    58,    60,    61,    62,    63,    32,
      33,    34,     0,    74,     0,    76,     0,    97,   102,   105,
      14,    16,    19,    20,     0,     0,     0,     0,     0,   115,
       0,     0,   114,     0,     0,    73,    75,    99,     0,     0,
       0,     0,     0,   113,     0,   111,   112,     0,   110,    36,
       0,    17,    21,    22,    23,     0,   109,   108,    18,     0,
      24
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int16 yydefgoto[] =
{
      -1,    36,    37,    38,    39,    40,    41,    42,    43,    44,
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54,
      55,    56,    57,    58,    59,    60,    90,    61,   137
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -88
static const yytype_int16 yypact[] =
{
     -37,   -48,   444,    24,   444,   -88,     2,   -88,   -88,   -88,
      13,     6,   -88,  1491,  1491,  1491,  1491,   -34,  1491,  1491,
    1491,   -19,  1506,   -15,   -10,   459,  1491,   485,   547,   -88,
    1491,  1491,  1491,   573,   588,  1491,   -88,   358,   -88,   -88,
     -88,   -88,   -88,   -88,   674,   -88,   -88,   -17,    20,    -5,
      51,    -1,     7,   -30,    28,   -28,   -44,   264,    16,   -88,
     -88,   -88,   -88,   444,     8,    73,    27,    79,    31,    88,
     -88,    21,   -88,   -88,    35,   -88,   444,   689,   704,   790,
     444,    10,   806,   -88,   -88,   -88,   822,   -88,   -88,   -88,
     908,    44,   923,   -88,   -88,   -88,   -88,   940,    47,  1026,
     267,    18,   -88,   -88,   -88,   -88,  1491,  1491,  1491,  1491,
    1491,  1491,  1491,  1491,  1491,  1491,  1491,  1491,  1491,  1491,
    1491,  1491,  1491,  1491,   -88,   -88,   -88,   -88,   -88,   -88,
     -88,   -88,   -88,   -88,   -88,   -88,   -88,  1491,   -88,   -88,
    1491,  1491,  1491,  1041,   106,    53,   108,   -88,   105,   -88,
     107,   -88,   444,   -88,   444,   444,   444,    80,    86,    86,
    1491,   -88,   -88,   -88,  1056,    62,   -88,  1142,    66,   -88,
     -88,    20,  1157,    -5,    51,    -1,     7,   -30,   -30,    28,
      28,   -28,   -28,   -44,   -44,   -88,   -88,   -88,   -88,   -88,
     -88,   -88,  1172,   -88,  1258,   -88,   121,   -88,   -88,   -88,
     -88,    90,   -88,   -88,  1491,    63,    65,  1274,   -37,  1491,
    1360,   -37,  1491,  1375,  1491,   -88,   -88,   -88,     3,  1390,
     444,   444,  1491,   -88,   -37,  1491,   -88,   -37,  1491,   -88,
     444,   -88,   -88,   -88,   -88,  1476,   -88,   -88,   -88,   444,
     -88
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
     -88,     0,   123,   -33,   -88,   -88,   -87,   -88,   -88,    -9,
     -26,   -11,   -88,    26,    32,    25,    29,    30,   -55,   -39,
     -38,   -36,   122,   146,   -78,   109,   -14,   -88,   -88
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
       3,    89,    89,   106,   103,    74,    64,    89,    89,    77,
      78,    79,   145,    82,    92,    68,    86,     4,   105,    97,
      99,    66,   112,   113,    62,     1,   100,   138,   139,     2,
     103,    76,   138,   139,   120,   121,   122,   123,    18,   108,
      19,   116,   117,   153,   114,   115,    80,   157,   118,   119,
      83,   105,   105,   105,   107,    84,   105,   177,   178,    65,
     105,   158,   159,    69,   163,   146,   163,   109,   230,   110,
      67,   163,   111,   163,   105,   179,   180,   147,   181,   182,
     205,   206,   183,   184,   148,   140,   141,   149,   150,     5,
       6,     7,     8,     9,    10,    11,    12,   151,   172,   142,
     152,   143,   164,   144,   142,   167,   143,   170,   144,   195,
     196,   189,   197,   198,   190,   191,   199,    89,   204,   200,
     210,   201,   202,   203,   213,   217,   218,    63,   220,   194,
     221,   231,   171,   192,   174,    70,    72,    73,    75,   175,
     173,   176,     0,     0,   101,     0,   105,     0,    87,    27,
      28,   207,    93,    94,    95,   209,     0,     0,   212,    71,
      71,    71,    71,     0,     0,     0,   105,     0,   163,    33,
       0,    34,    71,     0,    35,     0,    71,    71,    71,     0,
       0,   105,     0,   105,     0,     0,   105,   233,   234,     0,
       0,     0,     0,   105,     0,   219,     0,   238,     0,   105,
       0,   225,   105,   229,   228,     0,   240,     0,   223,   105,
       0,   226,     0,   235,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,   236,     0,     0,   237,    75,     0,
      75,    75,    75,    75,    75,    75,    75,    75,    75,    75,
      75,    75,   185,   186,   187,   188,     0,     0,     0,     0,
       0,     0,    71,     0,    71,    71,    71,    71,    71,    71,
      71,    71,    71,    71,    71,    71,    71,    71,    71,    71,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
       0,     0,     0,     0,    15,   124,   125,   126,   127,   128,
     129,   130,   131,   132,   133,   134,   135,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    26,     0,     0,     0,     0,     0,     0,     0,     0,
      27,    28,     0,   136,     0,     0,    75,     0,     0,     0,
       0,     0,     0,    30,    31,     0,     0,     0,     0,    32,
      33,     0,    34,     0,     0,    35,   169,     0,     0,     0,
      71,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,     0,     0,     0,     0,    15,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,    16,    17,    18,     0,    19,    20,    21,    22,    23,
      24,    25,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    26,     0,     0,     0,     0,     0,     0,     0,
       1,    27,    28,    29,     2,   102,     0,     0,     0,     0,
       0,     0,     0,     0,    30,    31,     0,     0,     0,     0,
      32,    33,     0,    34,     0,     0,    35,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,     0,     0,     0,
       0,    15,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,     0,     0,     0,     0,    15,    16,    17,    18,
       0,    19,    20,    21,    22,    23,    24,    25,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    26,     0,
       0,     0,    15,     0,     0,     0,     1,    27,    28,    29,
       2,     0,     0,    26,     0,     0,     0,     0,     0,     0,
      30,    31,    27,    28,    85,     0,    32,    33,     0,    34,
       0,     0,    35,     0,     0,    30,    31,     0,     0,    26,
       0,    32,    33,     0,    34,     0,     0,    35,    27,    28,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
       0,    30,    31,     0,    15,     0,     0,    32,    33,    88,
      34,     0,     0,    35,     0,     0,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,     0,     0,     0,     0,
      15,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    26,     0,     0,     0,    15,     0,     0,     0,     0,
      27,    28,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    30,    31,     0,     0,    26,     0,    32,
      33,     0,    34,    91,     0,    35,    27,    28,     0,     0,
       0,     0,    26,     0,     0,     0,     0,     0,     0,    30,
      31,    27,    28,     0,     0,    32,    33,    96,    34,     0,
       0,    35,     0,     0,    30,    31,     0,     0,     0,     0,
      32,    33,     0,    34,    98,     0,    35,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,     0,     0,     0,
       0,    15,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,     0,     0,     0,     0,    15,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,     0,     0,     0,
       0,    15,     0,     0,     0,     0,     0,     0,    26,     0,
       0,     0,     0,     0,     0,     0,     0,    27,    28,   104,
       0,     0,     0,    26,     0,     0,     0,     0,     0,     0,
      30,    31,    27,    28,   154,     0,    32,    33,    26,    34,
       0,     0,    35,     0,     0,    30,    31,    27,    28,   155,
       0,    32,    33,     0,    34,     0,     0,    35,     0,     0,
      30,    31,     0,     0,     0,     0,    32,    33,     0,    34,
       0,     0,    35,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,     0,     0,     0,     0,    15,     0,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,    15,     0,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,     0,     0,     0,     0,    15,
       0,     0,     0,     0,    26,     0,     0,     0,     0,     0,
       0,     0,     0,    27,    28,   156,     0,     0,     0,     0,
      26,     0,     0,     0,     0,     0,    30,    31,     0,    27,
      28,     0,    32,    33,   160,    34,    26,     0,    35,     0,
       0,     0,    30,    31,     0,    27,    28,   161,    32,    33,
       0,    34,     0,     0,    35,     0,     0,     0,    30,    31,
       0,     0,     0,     0,    32,    33,     0,    34,     0,     0,
      35,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,     0,     0,     0,     0,    15,     5,     6,     7,     8,
       9,    10,    11,    12,    13,    14,     0,     0,     0,     0,
      15,     0,     0,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,     0,     0,     0,     0,    15,     0,     0,
       0,     0,    26,     0,     0,     0,     0,     0,     0,     0,
       0,    27,    28,     0,     0,     0,     0,    26,     0,     0,
       0,     0,     0,     0,    30,    31,    27,    28,     0,     0,
      32,    33,   162,    34,    26,     0,    35,     0,     0,    30,
      31,     0,     0,    27,    28,    32,    33,     0,    34,   165,
       0,    35,     0,     0,     0,     0,    30,    31,     0,     0,
       0,     0,    32,    33,   166,    34,     0,     0,    35,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,    15,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,     0,     0,     0,     0,    15,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,    15,     0,     0,     0,     0,     0,     0,
      26,     0,     0,     0,     0,     0,     0,     0,     0,    27,
      28,     0,     0,     0,     0,    26,     0,     0,     0,     0,
       0,     0,    30,    31,    27,    28,     0,     0,    32,    33,
      26,    34,   168,     0,    35,     0,     0,    30,    31,    27,
      28,   208,     0,    32,    33,     0,    34,   193,     0,    35,
       0,     0,    30,    31,     0,     0,     0,     0,    32,    33,
       0,    34,     0,     0,    35,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,     0,     0,     0,     0,    15,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
       0,     0,     0,     0,    15,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,     0,     0,     0,     0,    15,
       0,     0,     0,     0,     0,     0,    26,     0,     0,     0,
       0,     0,     0,     0,     0,    27,    28,   211,     0,     0,
       0,    26,     0,     0,     0,     0,     0,     0,    30,    31,
      27,    28,   214,     0,    32,    33,    26,    34,     0,     0,
      35,     0,     0,    30,    31,    27,    28,     0,     0,    32,
      33,     0,    34,     0,     0,    35,     0,     0,    30,    31,
       0,     0,     0,     0,    32,    33,   215,    34,     0,     0,
      35,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,     0,     0,     0,     0,    15,     0,     5,     6,     7,
       8,     9,    10,    11,    12,    13,    14,     0,     0,     0,
       0,    15,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    26,     0,     0,     0,     0,     0,     0,     0,
       0,    27,    28,     0,     0,     0,     0,     0,    26,     0,
       0,     0,     0,     0,    30,    31,     0,    27,    28,     0,
      32,    33,   222,    34,   216,     0,    35,     0,     0,     0,
      30,    31,     0,     0,     0,     0,    32,    33,     0,    34,
       0,     0,    35,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,     0,     0,     0,     0,    15,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,     0,     0,
       0,     0,    15,     5,     6,     7,     8,     9,    10,    11,
      12,    13,    14,     0,     0,     0,     0,    15,     0,     0,
       0,     0,     0,     0,    26,     0,     0,     0,     0,     0,
       0,     0,     0,    27,    28,   224,     0,     0,     0,    26,
       0,     0,     0,     0,     0,     0,    30,    31,    27,    28,
     227,     0,    32,    33,    26,    34,     0,     0,    35,     0,
       0,    30,    31,    27,    28,   232,     0,    32,    33,     0,
      34,     0,     0,    35,     0,     0,    30,    31,     0,     0,
       0,     0,    32,    33,     0,    34,     0,     0,    35,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,    15,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,     0,     0,     0,     0,    15,    81,
       6,     7,     8,     9,    10,    11,    12,    13,    14,     0,
       0,     0,     0,    15,     0,     0,     0,     0,     0,     0,
      26,     0,     0,     0,     0,     0,     0,     0,     0,    27,
      28,   239,     0,     0,     0,    26,     0,     0,     0,     0,
       0,     0,    30,    31,    27,    28,     0,     0,    32,    33,
      26,    34,     0,     0,    35,     0,     0,    30,    31,    27,
      28,     0,     0,    32,    33,     0,    34,     0,     0,    35,
       0,     0,    30,    31,     0,     0,     0,     0,    32,    33,
       0,    34,     0,     0,    35
};

static const yytype_int16 yycheck[] =
{
       0,    27,    28,    20,    37,    16,     4,    33,    34,    18,
      19,    20,     4,    22,    28,     9,    25,    65,    44,    33,
      34,     8,    15,    16,     0,    62,    35,    11,    12,    66,
      63,    65,    11,    12,    78,    79,    80,    81,    35,    19,
      37,    13,    14,    76,    74,    75,    65,    80,    76,    77,
      65,    77,    78,    79,    71,    65,    82,   112,   113,    57,
      86,    51,    52,    57,    90,    57,    92,    72,    65,    18,
      57,    97,    73,    99,   100,   114,   115,     4,   116,   117,
     158,   159,   118,   119,    57,    69,    70,     8,    57,     3,
       4,     5,     6,     7,     8,     9,    10,     9,   107,    83,
      65,    85,    58,    87,    83,    58,    85,    89,    87,     3,
      57,   137,     4,     8,   140,   141,     9,   143,    38,   152,
      58,   154,   155,   156,    58,     4,    36,     4,    65,   143,
      65,   218,   106,   142,   109,    13,    14,    15,    16,   110,
     108,   111,    -1,    -1,    35,    -1,   172,    -1,    26,    63,
      64,   160,    30,    31,    32,   164,    -1,    -1,   167,    13,
      14,    15,    16,    -1,    -1,    -1,   192,    -1,   194,    83,
      -1,    85,    26,    -1,    88,    -1,    30,    31,    32,    -1,
      -1,   207,    -1,   209,    -1,    -1,   212,   220,   221,    -1,
      -1,    -1,    -1,   219,    -1,   204,    -1,   230,    -1,   225,
      -1,   210,   228,   214,   213,    -1,   239,    -1,   208,   235,
      -1,   211,    -1,   222,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,   224,    -1,    -1,   227,   106,    -1,
     108,   109,   110,   111,   112,   113,   114,   115,   116,   117,
     118,   119,   120,   121,   122,   123,    -1,    -1,    -1,    -1,
      -1,    -1,   106,    -1,   108,   109,   110,   111,   112,   113,
     114,   115,   116,   117,   118,   119,   120,   121,   122,   123,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      -1,    -1,    -1,    -1,    17,    21,    22,    23,    24,    25,
      26,    27,    28,    29,    30,    31,    32,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      63,    64,    -1,    69,    -1,    -1,   214,    -1,    -1,    -1,
      -1,    -1,    -1,    76,    77,    -1,    -1,    -1,    -1,    82,
      83,    -1,    85,    -1,    -1,    88,    89,    -1,    -1,    -1,
     214,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    -1,    -1,    -1,    -1,    17,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    33,    34,    35,    -1,    37,    38,    39,    40,    41,
      42,    43,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      62,    63,    64,    65,    66,    67,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    76,    77,    -1,    -1,    -1,    -1,
      82,    83,    -1,    85,    -1,    -1,    88,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    -1,    -1,    -1,
      -1,    17,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    -1,    -1,    -1,    -1,    17,    33,    34,    35,
      -1,    37,    38,    39,    40,    41,    42,    43,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    54,    -1,
      -1,    -1,    17,    -1,    -1,    -1,    62,    63,    64,    65,
      66,    -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,
      76,    77,    63,    64,    65,    -1,    82,    83,    -1,    85,
      -1,    -1,    88,    -1,    -1,    76,    77,    -1,    -1,    54,
      -1,    82,    83,    -1,    85,    -1,    -1,    88,    63,    64,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      -1,    76,    77,    -1,    17,    -1,    -1,    82,    83,    84,
      85,    -1,    -1,    88,    -1,    -1,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    -1,    -1,    -1,    -1,
      17,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    54,    -1,    -1,    -1,    17,    -1,    -1,    -1,    -1,
      63,    64,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    76,    77,    -1,    -1,    54,    -1,    82,
      83,    -1,    85,    86,    -1,    88,    63,    64,    -1,    -1,
      -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    76,
      77,    63,    64,    -1,    -1,    82,    83,    84,    85,    -1,
      -1,    88,    -1,    -1,    76,    77,    -1,    -1,    -1,    -1,
      82,    83,    -1,    85,    86,    -1,    88,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    -1,    -1,    -1,
      -1,    17,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    -1,    -1,    -1,    -1,    17,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    -1,    -1,    -1,
      -1,    17,    -1,    -1,    -1,    -1,    -1,    -1,    54,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    63,    64,    65,
      -1,    -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,
      76,    77,    63,    64,    65,    -1,    82,    83,    54,    85,
      -1,    -1,    88,    -1,    -1,    76,    77,    63,    64,    65,
      -1,    82,    83,    -1,    85,    -1,    -1,    88,    -1,    -1,
      76,    77,    -1,    -1,    -1,    -1,    82,    83,    -1,    85,
      -1,    -1,    88,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    -1,    -1,    -1,    -1,    17,    -1,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    -1,
      -1,    -1,    -1,    17,    -1,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    -1,    -1,    -1,    -1,    17,
      -1,    -1,    -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    63,    64,    65,    -1,    -1,    -1,    -1,
      54,    -1,    -1,    -1,    -1,    -1,    76,    77,    -1,    63,
      64,    -1,    82,    83,    68,    85,    54,    -1,    88,    -1,
      -1,    -1,    76,    77,    -1,    63,    64,    65,    82,    83,
      -1,    85,    -1,    -1,    88,    -1,    -1,    -1,    76,    77,
      -1,    -1,    -1,    -1,    82,    83,    -1,    85,    -1,    -1,
      88,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    -1,    -1,    -1,    -1,    17,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    -1,    -1,    -1,    -1,
      17,    -1,    -1,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    -1,    -1,    -1,    -1,    17,    -1,    -1,
      -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    63,    64,    -1,    -1,    -1,    -1,    54,    -1,    -1,
      -1,    -1,    -1,    -1,    76,    77,    63,    64,    -1,    -1,
      82,    83,    84,    85,    54,    -1,    88,    -1,    -1,    76,
      77,    -1,    -1,    63,    64,    82,    83,    -1,    85,    86,
      -1,    88,    -1,    -1,    -1,    -1,    76,    77,    -1,    -1,
      -1,    -1,    82,    83,    84,    85,    -1,    -1,    88,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    -1,
      -1,    -1,    -1,    17,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    -1,    -1,    -1,    -1,    17,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    -1,
      -1,    -1,    -1,    17,    -1,    -1,    -1,    -1,    -1,    -1,
      54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    63,
      64,    -1,    -1,    -1,    -1,    54,    -1,    -1,    -1,    -1,
      -1,    -1,    76,    77,    63,    64,    -1,    -1,    82,    83,
      54,    85,    86,    -1,    88,    -1,    -1,    76,    77,    63,
      64,    65,    -1,    82,    83,    -1,    85,    86,    -1,    88,
      -1,    -1,    76,    77,    -1,    -1,    -1,    -1,    82,    83,
      -1,    85,    -1,    -1,    88,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    -1,    -1,    -1,    -1,    17,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      -1,    -1,    -1,    -1,    17,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    -1,    -1,    -1,    -1,    17,
      -1,    -1,    -1,    -1,    -1,    -1,    54,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    63,    64,    65,    -1,    -1,
      -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    76,    77,
      63,    64,    65,    -1,    82,    83,    54,    85,    -1,    -1,
      88,    -1,    -1,    76,    77,    63,    64,    -1,    -1,    82,
      83,    -1,    85,    -1,    -1,    88,    -1,    -1,    76,    77,
      -1,    -1,    -1,    -1,    82,    83,    84,    85,    -1,    -1,
      88,     3,     4,     5,     6,     7,     8,     9,    10,    11,
      12,    -1,    -1,    -1,    -1,    17,    -1,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    -1,    -1,    -1,
      -1,    17,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    63,    64,    -1,    -1,    -1,    -1,    -1,    54,    -1,
      -1,    -1,    -1,    -1,    76,    77,    -1,    63,    64,    -1,
      82,    83,    68,    85,    86,    -1,    88,    -1,    -1,    -1,
      76,    77,    -1,    -1,    -1,    -1,    82,    83,    -1,    85,
      -1,    -1,    88,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    -1,    -1,    -1,    -1,    17,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    -1,    -1,
      -1,    -1,    17,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    -1,    -1,    -1,    -1,    17,    -1,    -1,
      -1,    -1,    -1,    -1,    54,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    63,    64,    65,    -1,    -1,    -1,    54,
      -1,    -1,    -1,    -1,    -1,    -1,    76,    77,    63,    64,
      65,    -1,    82,    83,    54,    85,    -1,    -1,    88,    -1,
      -1,    76,    77,    63,    64,    65,    -1,    82,    83,    -1,
      85,    -1,    -1,    88,    -1,    -1,    76,    77,    -1,    -1,
      -1,    -1,    82,    83,    -1,    85,    -1,    -1,    88,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    -1,
      -1,    -1,    -1,    17,     3,     4,     5,     6,     7,     8,
       9,    10,    11,    12,    -1,    -1,    -1,    -1,    17,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    -1,
      -1,    -1,    -1,    17,    -1,    -1,    -1,    -1,    -1,    -1,
      54,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    63,
      64,    65,    -1,    -1,    -1,    54,    -1,    -1,    -1,    -1,
      -1,    -1,    76,    77,    63,    64,    -1,    -1,    82,    83,
      54,    85,    -1,    -1,    88,    -1,    -1,    76,    77,    63,
      64,    -1,    -1,    82,    83,    -1,    85,    -1,    -1,    88,
      -1,    -1,    76,    77,    -1,    -1,    -1,    -1,    82,    83,
      -1,    85,    -1,    -1,    88
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    62,    66,    91,    65,     3,     4,     5,     6,     7,
       8,     9,    10,    11,    12,    17,    33,    34,    35,    37,
      38,    39,    40,    41,    42,    43,    54,    63,    64,    65,
      76,    77,    82,    83,    85,    88,    91,    92,    93,    94,
      95,    96,    97,    98,    99,   100,   101,   102,   103,   104,
     105,   106,   107,   108,   109,   110,   111,   112,   113,   114,
     115,   117,     0,    92,     4,    57,     8,    57,     9,    57,
     112,   113,   112,   112,   101,   112,    65,    99,    99,    99,
      65,     3,    99,    65,    65,    65,    99,   112,    84,   100,
     116,    86,   116,   112,   112,   112,    84,   116,    86,   116,
      99,   115,    67,    93,    65,   100,    20,    71,    19,    72,
      18,    73,    15,    16,    74,    75,    13,    14,    76,    77,
      78,    79,    80,    81,    21,    22,    23,    24,    25,    26,
      27,    28,    29,    30,    31,    32,    69,   118,    11,    12,
      69,    70,    83,    85,    87,     4,    57,     4,    57,     8,
      57,     9,    65,    93,    65,    65,    65,    93,    51,    52,
      68,    65,    84,   100,    58,    86,    84,    58,    86,    89,
      89,   103,    99,   104,   105,   106,   107,   108,   108,   109,
     109,   110,   110,   111,   111,   112,   112,   112,   112,   100,
     100,   100,    99,    86,   116,     3,    57,     4,     8,     9,
      93,    93,    93,    93,    38,   114,   114,    99,    65,    99,
      58,    65,    99,    58,    65,    84,    86,     4,    36,    99,
      65,    65,    68,    91,    65,    99,    91,    65,    99,   101,
      65,    96,    65,    93,    93,    99,    91,    91,    93,    65,
      93
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
#line 49 "toJS.y"
    {printf("\n\n%s\n\n",(yyvsp[(3) - (3)].str));}
    break;

  case 3:
#line 50 "toJS.y"
    {(yyval.str) = (yyvsp[(2) - (3)].str);}
    break;

  case 4:
#line 54 "toJS.y"
    {;}
    break;

  case 5:
#line 55 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),(yyvsp[(2) - (2)].str));}
    break;

  case 6:
#line 59 "toJS.y"
    {;}
    break;

  case 7:
#line 60 "toJS.y"
    {;}
    break;

  case 8:
#line 61 "toJS.y"
    {;}
    break;

  case 9:
#line 62 "toJS.y"
    {;}
    break;

  case 10:
#line 63 "toJS.y"
    {;}
    break;

  case 11:
#line 64 "toJS.y"
    {;}
    break;

  case 12:
#line 68 "toJS.y"
    {(yyval.str) = ";";}
    break;

  case 13:
#line 69 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),";");}
    break;

  case 14:
#line 73 "toJS.y"
    {(yyval.str) = cat(cat(cat("case ",(yyvsp[(2) - (4)].str)),":"),(yyvsp[(4) - (4)].str));}
    break;

  case 15:
#line 74 "toJS.y"
    {(yyval.str) = cat("default:",(yyvsp[(3) - (3)].str));}
    break;

  case 16:
#line 78 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("if(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 17:
#line 79 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (6)].str)),"){"),(yyvsp[(4) - (6)].str)),"}else "),(yyvsp[(6) - (6)].str));}
    break;

  case 18:
#line 80 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (7)].str)),"){"),(yyvsp[(4) - (7)].str)),"}else{"),(yyvsp[(7) - (7)].str)),"}");}
    break;

  case 19:
#line 81 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("switch(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 20:
#line 85 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("while(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 21:
#line 86 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("do{",(yyvsp[(3) - (6)].str)),"}while("),(yyvsp[(5) - (6)].str)),");");}
    break;

  case 22:
#line 87 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].str))," in "),(yyvsp[(4) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 23:
#line 88 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].str))," of "),(yyvsp[(4) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 24:
#line 89 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat(cat(cat("for(",(yyvsp[(2) - (8)].str)),";"),(yyvsp[(4) - (8)].str)),";"),(yyvsp[(6) - (8)].str)),"){"),(yyvsp[(8) - (8)].str)),"}");}
    break;

  case 25:
#line 93 "toJS.y"
    {(yyval.str) = "continue;";}
    break;

  case 26:
#line 94 "toJS.y"
    {(yyval.str) = "break;";}
    break;

  case 27:
#line 95 "toJS.y"
    {(yyval.str) = "return;";}
    break;

  case 28:
#line 96 "toJS.y"
    {(yyval.str) = cat(cat("return ",(yyvsp[(2) - (3)].str)),";");}
    break;

  case 29:
#line 104 "toJS.y"
    {;}
    break;

  case 30:
#line 105 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),(yyvsp[(2) - (2)].str));}
    break;

  case 31:
#line 109 "toJS.y"
    {;}
    break;

  case 32:
#line 110 "toJS.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (3)].str),(yyvsp[(2) - (3)].str)),(yyvsp[(3) - (3)].str));}
    break;

  case 33:
#line 111 "toJS.y"
    {(yyval.str) = cat(cat(cat(var_declare((yyvsp[(1) - (3)].str),(yyvsp[(3) - (3)].str),1),(yyvsp[(1) - (3)].str)),"="),(yyvsp[(3) - (3)].str));}
    break;

  case 34:
#line 112 "toJS.y"
    {(yyval.str) = cat(cat(cat(var_declare((yyvsp[(1) - (3)].str),(yyvsp[(3) - (3)].str),2),(yyvsp[(1) - (3)].str)),"="),(yyvsp[(3) - (3)].str));}
    break;

  case 35:
#line 116 "toJS.y"
    {;}
    break;

  case 36:
#line 117 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat((yyvsp[(1) - (5)].str),"?"),(yyvsp[(3) - (5)].str) ),":"),(yyvsp[(5) - (5)].str));}
    break;

  case 37:
#line 122 "toJS.y"
    {;}
    break;

  case 38:
#line 123 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"||"), (yyvsp[(3) - (3)].str) );}
    break;

  case 39:
#line 127 "toJS.y"
    {;}
    break;

  case 40:
#line 128 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"&&"), (yyvsp[(3) - (3)].str) );}
    break;

  case 41:
#line 132 "toJS.y"
    {;}
    break;

  case 42:
#line 133 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"|"), (yyvsp[(3) - (3)].str) );}
    break;

  case 43:
#line 137 "toJS.y"
    {;}
    break;

  case 44:
#line 138 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"^"), (yyvsp[(3) - (3)].str) );}
    break;

  case 45:
#line 142 "toJS.y"
    {;}
    break;

  case 46:
#line 143 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"&"), (yyvsp[(3) - (3)].str) );}
    break;

  case 47:
#line 147 "toJS.y"
    {;}
    break;

  case 48:
#line 148 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"==="), (yyvsp[(3) - (3)].str) );}
    break;

  case 49:
#line 149 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"!=="), (yyvsp[(3) - (3)].str) );}
    break;

  case 50:
#line 153 "toJS.y"
    {;}
    break;

  case 51:
#line 154 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"<"), (yyvsp[(3) - (3)].str) );}
    break;

  case 52:
#line 155 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),">"), (yyvsp[(3) - (3)].str) );}
    break;

  case 53:
#line 159 "toJS.y"
    {;}
    break;

  case 54:
#line 160 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"<<"), (yyvsp[(3) - (3)].str) );}
    break;

  case 55:
#line 161 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),">>"), (yyvsp[(3) - (3)].str) );}
    break;

  case 56:
#line 165 "toJS.y"
    {;}
    break;

  case 57:
#line 166 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"+"), (yyvsp[(3) - (3)].str) );}
    break;

  case 58:
#line 167 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"-"), (yyvsp[(3) - (3)].str) );}
    break;

  case 59:
#line 170 "toJS.y"
    {;}
    break;

  case 60:
#line 171 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"*"), (yyvsp[(3) - (3)].str) );}
    break;

  case 61:
#line 172 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"/"), (yyvsp[(3) - (3)].str) );}
    break;

  case 62:
#line 173 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"**"), (yyvsp[(3) - (3)].str) );}
    break;

  case 63:
#line 174 "toJS.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"%"), (yyvsp[(3) - (3)].str) );}
    break;

  case 64:
#line 178 "toJS.y"
    {;}
    break;

  case 65:
#line 179 "toJS.y"
    {(yyval.str) = cat("new ",(yyvsp[(2) - (2)].str));}
    break;

  case 66:
#line 180 "toJS.y"
    {(yyval.str) = cat("++",(yyvsp[(2) - (2)].str));}
    break;

  case 67:
#line 181 "toJS.y"
    {(yyval.str) = cat("--",(yyvsp[(2) - (2)].str));}
    break;

  case 68:
#line 182 "toJS.y"
    {(yyval.str) = cat("+",(yyvsp[(2) - (2)].str));}
    break;

  case 69:
#line 183 "toJS.y"
    {(yyval.str) = cat("-",(yyvsp[(2) - (2)].str));}
    break;

  case 70:
#line 184 "toJS.y"
    {(yyval.str) = cat("!",(yyvsp[(2) - (2)].str));}
    break;

  case 71:
#line 185 "toJS.y"
    {(yyval.str) = cat("~",(yyvsp[(2) - (2)].str));}
    break;

  case 72:
#line 189 "toJS.y"
    {;}
    break;

  case 73:
#line 190 "toJS.y"
    {(yyval.str) = cat(cat(cat((yyvsp[(1) - (4)].str),"["),(yyvsp[(3) - (4)].str)),"]");}
    break;

  case 74:
#line 191 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (3)].str),"()");}
    break;

  case 75:
#line 192 "toJS.y"
    {(yyval.str) = cat(cat(cat((yyvsp[(1) - (4)].str),"("),(yyvsp[(3) - (4)].str)),")");}
    break;

  case 76:
#line 193 "toJS.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (3)].str),"."),(yyvsp[(3) - (3)].str));}
    break;

  case 77:
#line 194 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),"++");}
    break;

  case 78:
#line 195 "toJS.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),"--");;}
    break;

  case 79:
#line 199 "toJS.y"
    {(yyval.str) = cat(var_access((yyvsp[(1) - (1)].str)),(yyvsp[(1) - (1)].str));}
    break;

  case 80:
#line 200 "toJS.y"
    {;}
    break;

  case 81:
#line 201 "toJS.y"
    {;}
    break;

  case 82:
#line 202 "toJS.y"
    {;}
    break;

  case 83:
#line 203 "toJS.y"
    {;}
    break;

  case 84:
#line 204 "toJS.y"
    {(yyval.str) = cat(cat("'",(yyvsp[(1) - (1)].str)),"'");}
    break;

  case 85:
#line 205 "toJS.y"
    {(yyval.str) = cat(cat("`",(yyvsp[(1) - (1)].str)),"`");}
    break;

  case 86:
#line 206 "toJS.y"
    {(yyval.str) = cat(cat("/",(yyvsp[(1) - (1)].str)),"/");}
    break;

  case 87:
#line 207 "toJS.y"
    {;}
    break;

  case 88:
#line 208 "toJS.y"
    {;}
    break;

  case 89:
#line 209 "toJS.y"
    {(yyval.str) = cat(cat("[",(yyvsp[(2) - (3)].str)),"]");}
    break;

  case 90:
#line 210 "toJS.y"
    {(yyval.str) = cat(cat("[",(yyvsp[(2) - (3)].str)),"]");}
    break;

  case 91:
#line 211 "toJS.y"
    {(yyval.str) = "[]";}
    break;

  case 92:
#line 212 "toJS.y"
    {(yyval.str) = "[]";}
    break;

  case 93:
#line 213 "toJS.y"
    {(yyval.str) = cat(cat("(",(yyvsp[(2) - (3)].str)),")");}
    break;

  case 94:
#line 214 "toJS.y"
    {(yyval.str) = (yyvsp[(2) - (3)].str);}
    break;

  case 95:
#line 218 "toJS.y"
    {(yyval.str) = genrange_dc((yyvsp[(1) - (3)].str),(yyvsp[(3) - (3)].str));}
    break;

  case 96:
#line 219 "toJS.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (2)].str),","),(yyvsp[(2) - (2)].str));}
    break;

  case 97:
#line 220 "toJS.y"
    {(yyval.str) = genrange_da((yyvsp[(1) - (4)].str),(yyvsp[(2) - (4)].str),(yyvsp[(4) - (4)].str));}
    break;

  case 98:
#line 221 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat((yyvsp[(1) - (3)].str),","),(yyvsp[(2) - (3)].str)),","),(yyvsp[(3) - (3)].str));}
    break;

  case 99:
#line 222 "toJS.y"
    {(yyval.str) = genrange_dg((yyvsp[(1) - (5)].str),(yyvsp[(2) - (5)].str),(yyvsp[(3) - (5)].str),(yyvsp[(5) - (5)].str));}
    break;

  case 100:
#line 223 "toJS.y"
    {(yyval.str) = genrange_sc("'",(yyvsp[(1) - (3)].str),(yyvsp[(3) - (3)].str));}
    break;

  case 101:
#line 224 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("'",(yyvsp[(1) - (2)].str)),"'"),","),cat(cat("'",(yyvsp[(2) - (2)].str)),"'"));}
    break;

  case 102:
#line 225 "toJS.y"
    {(yyval.str) = genrange_sa("'",(yyvsp[(1) - (4)].str),(yyvsp[(2) - (4)].str),(yyvsp[(4) - (4)].str));}
    break;

  case 103:
#line 226 "toJS.y"
    {(yyval.str) = genrange_sc("`",(yyvsp[(1) - (3)].str),(yyvsp[(3) - (3)].str));}
    break;

  case 104:
#line 227 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("`",(yyvsp[(1) - (2)].str)),"`"),","),cat(cat("`",(yyvsp[(2) - (2)].str)),"`"));}
    break;

  case 105:
#line 228 "toJS.y"
    {(yyval.str) = genrange_sa("`",(yyvsp[(1) - (4)].str),(yyvsp[(2) - (4)].str),(yyvsp[(4) - (4)].str));}
    break;

  case 106:
#line 236 "toJS.y"
    {;}
    break;

  case 107:
#line 237 "toJS.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (2)].str),","),(yyvsp[(2) - (2)].str));}
    break;

  case 108:
#line 241 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 109:
#line 242 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 110:
#line 243 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].str)),"){return "),(yyvsp[(5) - (5)].str)),";}");}
    break;

  case 111:
#line 244 "toJS.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].str)),"){return "),(yyvsp[(5) - (5)].str)),";}");}
    break;

  case 112:
#line 245 "toJS.y"
    {(yyval.str) = cat(cat("function(){",(yyvsp[(5) - (5)].str)),"}");}
    break;

  case 113:
#line 246 "toJS.y"
    {(yyval.str) = cat(cat("function(){",(yyvsp[(5) - (5)].str)),"}");}
    break;

  case 114:
#line 247 "toJS.y"
    {(yyval.str) = cat(cat("function(){return ",(yyvsp[(4) - (4)].str)),";}");}
    break;

  case 115:
#line 248 "toJS.y"
    {(yyval.str) = cat(cat("function(){return ",(yyvsp[(4) - (4)].str)),";}");}
    break;

  case 116:
#line 252 "toJS.y"
    {(yyval.str) = "=";}
    break;

  case 117:
#line 253 "toJS.y"
    {(yyval.str) = "**=";}
    break;

  case 118:
#line 254 "toJS.y"
    {(yyval.str) = "*=";}
    break;

  case 119:
#line 255 "toJS.y"
    {(yyval.str) = "/=";}
    break;

  case 120:
#line 256 "toJS.y"
    {(yyval.str) = "%=";}
    break;

  case 121:
#line 257 "toJS.y"
    {(yyval.str) = "+=";}
    break;

  case 122:
#line 258 "toJS.y"
    {(yyval.str) = "-=";}
    break;

  case 123:
#line 259 "toJS.y"
    {(yyval.str) = "<<=";}
    break;

  case 124:
#line 260 "toJS.y"
    {(yyval.str) = ">>=";}
    break;

  case 125:
#line 261 "toJS.y"
    {(yyval.str) = "&=";}
    break;

  case 126:
#line 262 "toJS.y"
    {(yyval.str) = "^=";}
    break;

  case 127:
#line 263 "toJS.y"
    {(yyval.str) = "|=";}
    break;

  case 128:
#line 264 "toJS.y"
    {(yyval.str) = "!=";}
    break;


/* Line 1267 of yacc.c.  */
#line 2600 "y.tab.c"
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


#line 267 "toJS.y"

extern char yytext[];
extern int column;

// Todo: Needs scoping
char* var_access(char *rawName){
	variable* var;

	char* name = var_clean(rawName);

	char varName[KEY_MAX_LENGTH];
	snprintf( varName, KEY_MAX_LENGTH, "%s", name );
	int error = hashmap_get( varMap, varName, (void**)(&var) );

	if ( error == MAP_OK )
		if ( var->type == 2 )
			return "this.";
	return "";
}

char* var_declare(char *rawName, char *value, char type){
	variable* var;
	char* name = var_clean(rawName);

	char varName[KEY_MAX_LENGTH];
	snprintf( varName, KEY_MAX_LENGTH, "%s", name );
	int error = hashmap_get( varMap, varName, (void**)(&var) );

	if ( error == MAP_MISSING ){
		var = malloc( sizeof(var) );
		snprintf( var->name, KEY_MAX_LENGTH, "%s", name );
		var->type = type;
		hashmap_put( varMap, var->name, var );
		if (type == 1)
			return "let ";
		else
			return "this.";
	}

	return "";
}

char* var_clean(char *rawName){
	char *name = strdup(rawName);
	int len = strlen(name);
	char *out = "";

	for ( int i = 0; i < len; i++ ){
		if ( i == 4 && name[i] == '.' && strcmp(out,"this") == 0 ){
			out = "";
			continue;
		}
		if ( !( (64 < name[i] && name[i] < 91) || (96 < name[i] && name[i] < 123) || name[i] == '_' || name[i] == '$' ) )
			break;
		char c[2];
		c[0] = name[i];
		c[1] = 0;
		out = cat(out, c);
	}

	return out;
}

void yyerror(char *s){
	fflush(stdout);
	printf("\n%*s\n%*s\n", column, "^", column, s);
}

int main(){
	varMap = hashmap_new();
	return yyparse();
}

