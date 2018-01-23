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




/* Copy the first part of user declarations.  */


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
#line 1 "bisonGrammar.y"
{char* str;}
/* Line 193 of yacc.c.  */
#line 219 "y.tab.c"
	YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */
#line 18 "bisonGrammar.y"

#include <stdio.h>
#include <string.h>
void yyerror (char *s);
int yylex();
char* cat(char* a, char* b);
char* dec(char *name);


/* Line 216 of yacc.c.  */
#line 240 "y.tab.c"

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
#define YYFINAL  58
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   940

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  86
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  32
/* YYNRULES -- Number of rules.  */
#define YYNRULES  110
/* YYNRULES -- Number of states.  */
#define YYNSTATES  205

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   315

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,    63,    62,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    85,     2,     2,     2,    81,    73,     2,
      65,    66,    78,    76,    61,    77,    82,    79,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    68,    64,
      74,    67,    75,    71,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    69,     2,    70,    80,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    83,    72,    84,     2,     2,     2,     2,
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
      55,    56,    57,    58,    59,    60
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     7,    11,    13,    16,    18,    20,    22,
      24,    26,    28,    30,    33,    36,    41,    45,    50,    57,
      65,    70,    75,    82,    89,    96,   105,   108,   111,   114,
     118,   125,   131,   137,   142,   144,   147,   151,   155,   157,
     162,   164,   168,   170,   173,   175,   181,   183,   187,   189,
     193,   195,   199,   201,   205,   207,   211,   213,   217,   221,
     223,   227,   231,   233,   237,   241,   243,   247,   251,   253,
     257,   261,   265,   269,   271,   274,   277,   280,   282,   287,
     291,   296,   300,   303,   306,   308,   310,   312,   314,   316,
     318,   322,   326,   328,   331,   333,   335,   337,   339,   341,
     343,   345,   347,   349,   351,   353,   355,   357,   359,   361,
     363
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int8 yyrhs[] =
{
      87,     0,    -1,    60,    61,    88,    -1,    62,    88,    63,
      -1,    89,    -1,    88,    89,    -1,    91,    -1,    87,    -1,
      90,    -1,    92,    -1,    93,    -1,    94,    -1,    61,    -1,
     100,    61,    -1,    97,    61,    -1,    31,   101,    61,    89,
      -1,    32,    61,    89,    -1,    33,   100,    61,    89,    -1,
      33,   100,    61,    89,    34,    92,    -1,    33,   100,    61,
      89,    34,    61,    89,    -1,    35,   100,    61,    89,    -1,
      36,   100,    61,    89,    -1,    37,    61,    89,    36,   100,
      61,    -1,    38,     3,    49,   114,    61,    89,    -1,    38,
       3,    50,   114,    61,    89,    -1,    38,    97,    64,   100,
      64,   100,    61,    89,    -1,    39,    61,    -1,    40,    61,
      -1,    41,    61,    -1,    41,   100,    61,    -1,    65,    96,
      66,    56,    61,    87,    -1,    65,    96,    66,    56,   100,
      -1,    65,    66,    56,    61,    87,    -1,    65,    66,    56,
     100,    -1,    97,    -1,    96,    97,    -1,    98,    67,    99,
      -1,    98,    68,    99,    -1,     3,    -1,    98,    69,   100,
      70,    -1,   101,    -1,   112,   117,    99,    -1,    99,    -1,
     100,    99,    -1,   102,    -1,   102,    71,   100,    61,   101,
      -1,   103,    -1,   102,    17,   103,    -1,   104,    -1,   103,
      16,   104,    -1,   105,    -1,   104,    72,   105,    -1,   106,
      -1,   105,    15,   106,    -1,   107,    -1,   106,    73,   107,
      -1,   108,    -1,   107,    12,   108,    -1,   107,    13,   108,
      -1,   109,    -1,   108,    74,   109,    -1,   108,    75,   109,
      -1,   110,    -1,   109,    10,   110,    -1,   109,    11,   110,
      -1,   111,    -1,   110,    76,   111,    -1,   110,    77,   111,
      -1,   112,    -1,   111,    78,   112,    -1,   111,    79,   112,
      -1,   111,    80,   112,    -1,   111,    81,   112,    -1,   113,
      -1,     8,   112,    -1,     9,   112,    -1,   116,   112,    -1,
     114,    -1,   113,    69,   100,    70,    -1,   113,    65,    66,
      -1,   113,    65,   115,    66,    -1,   113,    82,     3,    -1,
     113,     8,    -1,   113,     9,    -1,    98,    -1,     4,    -1,
       5,    -1,     6,    -1,     7,    -1,    95,    -1,    69,   115,
      70,    -1,    83,   100,    84,    -1,    99,    -1,   115,    99,
      -1,    76,    -1,    77,    -1,    85,    -1,    14,    -1,    67,
      -1,    23,    -1,    18,    -1,    19,    -1,    20,    -1,    21,
      -1,    24,    -1,    25,    -1,    26,    -1,    27,    -1,    28,
      -1,    29,    -1,    22,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint8 yyrline[] =
{
       0,    30,    30,    31,    34,    35,    38,    39,    40,    41,
      42,    43,    46,    47,    48,    51,    52,    55,    56,    57,
      58,    61,    62,    63,    64,    65,    68,    69,    70,    71,
      75,    76,    77,    78,    82,    83,    87,    88,    92,    93,
      97,    98,   102,   103,   107,   108,   112,   113,   116,   117,
     120,   121,   124,   125,   128,   129,   132,   133,   134,   137,
     138,   139,   142,   143,   144,   147,   148,   149,   152,   153,
     154,   155,   156,   159,   160,   161,   162,   165,   166,   167,
     168,   169,   170,   171,   174,   175,   176,   177,   178,   179,
     180,   181,   185,   186,   190,   191,   192,   193,   196,   197,
     198,   199,   200,   201,   202,   203,   204,   205,   206,   207,
     208
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || YYTOKEN_TABLE
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "IDENTIFIER", "CONSTANT",
  "STRING_LITERAL", "TEMPLATE_LITERAL", "REGEXP_LITERAL", "INC_OP",
  "DEC_OP", "LEFT_OP", "RIGHT_OP", "EQ_OP", "NE_OP", "NOT_OP", "XOR_OP",
  "AND_OP", "OR_OP", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN",
  "ADD_ASSIGN", "NOT_ASSIGN", "EXP_ASSIGN", "SUB_ASSIGN", "LEFT_ASSIGN",
  "RIGHT_ASSIGN", "AND_ASSIGN", "XOR_ASSIGN", "OR_ASSIGN", "TYPE_NAME",
  "CASE", "DEFAULT", "IF", "ELSE", "SWITCH", "WHILE", "DO", "FOR",
  "CONTINUE", "BREAK", "RETURN", "TRY", "CATCH", "FINALLY", "THROW",
  "DEBUGGER", "DELETE", "IMPORT", "IN", "OF", "INSTANCEOF", "NEW",
  "TYPEOF", "ELLIPSIS", "MINI_ELLIPSIS", "ARROW_FUNC", "REV_ARROW",
  "BIND_OP", "TYPE_DEC", "HLX", "','", "'\\t'", "'\\b'", "';'", "'('",
  "')'", "'='", "':'", "'['", "']'", "'?'", "'|'", "'&'", "'<'", "'>'",
  "'+'", "'-'", "'*'", "'/'", "'^'", "'%'", "'.'", "'{'", "'}'", "'!'",
  "$accept", "compound_statement", "statement_list", "statement",
  "expression_statement", "labeled_statement", "selection_statement",
  "iteration_statement", "jump_statement", "function_literal",
  "declaration_list", "declaration", "declarator", "assignment_expression",
  "expression", "constant_expression", "logical_or_expression",
  "logical_and_expression", "inclusive_or_expression",
  "exclusive_or_expression", "and_expression", "equality_expression",
  "relational_expression", "shift_expression", "additive_expression",
  "multiplicative_expression", "unary_expression", "postfix_expression",
  "primary_expression", "argument_expression_list", "prefix_operator",
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
     315,    44,     9,     8,    59,    40,    41,    61,    58,    91,
      93,    63,   124,    38,    60,    62,    43,    45,    42,    47,
      94,    37,    46,   123,   125,    33
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    86,    87,    87,    88,    88,    89,    89,    89,    89,
      89,    89,    90,    90,    90,    91,    91,    92,    92,    92,
      92,    93,    93,    93,    93,    93,    94,    94,    94,    94,
      95,    95,    95,    95,    96,    96,    97,    97,    98,    98,
      99,    99,   100,   100,   101,   101,   102,   102,   103,   103,
     104,   104,   105,   105,   106,   106,   107,   107,   107,   108,
     108,   108,   109,   109,   109,   110,   110,   110,   111,   111,
     111,   111,   111,   112,   112,   112,   112,   113,   113,   113,
     113,   113,   113,   113,   114,   114,   114,   114,   114,   114,
     114,   114,   115,   115,   116,   116,   116,   116,   117,   117,
     117,   117,   117,   117,   117,   117,   117,   117,   117,   117,
     117
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     3,     3,     1,     2,     1,     1,     1,     1,
       1,     1,     1,     2,     2,     4,     3,     4,     6,     7,
       4,     4,     6,     6,     6,     8,     2,     2,     2,     3,
       6,     5,     5,     4,     1,     2,     3,     3,     1,     4,
       1,     3,     1,     2,     1,     5,     1,     3,     1,     3,
       1,     3,     1,     3,     1,     3,     1,     3,     3,     1,
       3,     3,     1,     3,     3,     1,     3,     3,     1,     3,
       3,     3,     3,     1,     2,     2,     2,     1,     4,     3,
       4,     3,     2,     2,     1,     1,     1,     1,     1,     1,
       3,     3,     1,     2,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,     0,     0,     0,     0,    38,    85,    86,    87,    88,
       0,     0,    97,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,    12,     0,     0,    94,    95,     0,    96,
       7,     0,     4,     8,     6,     9,    10,    11,    89,     0,
      84,    42,     0,    40,    44,    46,    48,    50,    52,    54,
      56,    59,    62,    65,    68,    73,    77,     0,     1,     2,
      84,    74,    75,     0,    68,     0,     0,     0,     0,     0,
      38,     0,     0,    26,    27,    28,     0,     0,     0,    34,
      92,     0,     0,     3,     5,    14,     0,     0,     0,    13,
      43,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,   100,
     101,   102,   103,   110,    99,   104,   105,   106,   107,   108,
     109,    98,     0,    82,    83,     0,     0,     0,    76,     0,
      16,     0,     0,     0,     0,     0,     0,     0,    29,     0,
       0,    35,    90,    93,    91,    36,    37,     0,    47,     0,
      49,    51,    53,    55,    57,    58,    60,    61,    63,    64,
      66,    67,    69,    70,    71,    72,    41,    79,     0,     0,
      81,    15,    17,    20,    21,     0,     0,     0,     0,     0,
      33,     0,    39,     0,    80,    78,     0,     0,     0,     0,
       0,    32,     0,    31,    45,     0,    18,    22,    23,    24,
       0,    30,    19,     0,    25
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int8 yydefgoto[] =
{
      -1,    30,    31,    32,    33,    34,    35,    36,    37,    38,
      78,    39,    60,    41,    42,    43,    44,    45,    46,    47,
      48,    49,    50,    51,    52,    53,    54,    55,    56,    81,
      57,   122
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -71
static const yytype_int16 yypact[] =
{
     -18,   -20,   314,    36,   314,   -71,   -71,   -71,   -71,   -71,
     855,   855,   -71,   855,    -5,   855,   855,   855,     1,    50,
      11,    16,    84,   -71,     2,   855,   -71,   -71,   855,   -71,
     -71,   231,   -71,   -71,   -71,   -71,   -71,   -71,   -71,    22,
     -29,   -71,   327,   -71,    -7,   -10,   -13,    85,    26,     6,
     -60,    17,   -43,   -55,   228,     4,   -71,   855,   -71,   314,
      33,   -71,   -71,    44,   -71,   314,   353,   436,   449,   314,
       0,    42,   -29,   -71,   -71,   -71,   462,    52,     5,   -71,
     -71,   479,   562,   -71,   -71,   -71,   855,   855,   855,   -71,
     -71,   855,   855,   855,   855,   855,   855,   855,   855,   855,
     855,   855,   855,   855,   855,   855,   855,   855,   855,   -71,
     -71,   -71,   -71,   -71,   -71,   -71,   -71,   -71,   -71,   -71,
     -71,   -71,   855,   -71,   -71,   575,   855,   106,   -71,   314,
     -71,   314,   314,   314,    74,    75,    75,   855,   -71,   588,
      55,   -71,   -71,   -71,   -71,   -71,   -71,   605,   -10,   688,
     -13,    85,    26,     6,   -60,   -60,    17,    17,   -43,   -43,
     -55,   -55,   -71,   -71,   -71,   -71,   -71,   -71,   701,   718,
     -71,   -71,    78,   -71,   -71,   855,    53,    54,   733,   -18,
     855,   816,   -71,   855,   -71,   -71,   -26,   829,   314,   314,
     855,   -71,   -18,   855,   -71,   314,   -71,   -71,   -71,   -71,
     842,   -71,   -71,   314,   -71
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int8 yypgoto[] =
{
     -71,     3,   109,   -11,   -71,   -71,   -70,   -71,   -71,   -71,
     -71,    -8,    -2,   -21,    15,   -12,   -71,    28,    24,    29,
      30,    39,   -46,   -25,   -17,    -9,   123,   -71,   -39,    -1,
     -71,   -71
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint8 yytable[] =
{
      40,    63,    40,     3,    80,     5,    93,    15,     5,    16,
      91,    71,   123,   124,    99,   100,    79,    72,    97,    98,
      84,    90,    72,   105,   106,   107,   108,   101,   102,    40,
      66,    67,    68,   103,   104,   195,    58,    76,    86,    87,
      88,     4,     1,    82,     2,    90,    90,    90,    84,   135,
     136,   154,   155,    70,   130,    90,    65,    40,   134,    94,
     143,    90,    69,    40,    92,   145,   146,    40,    77,   125,
     141,   140,    73,   126,   156,   157,    72,    74,     5,     6,
       7,     8,     9,    85,   158,   159,   127,     5,     6,     7,
       8,     9,    10,    11,   160,   161,   176,   177,    12,    96,
      95,   166,    88,   147,    80,   129,   137,   149,   139,   170,
     175,   181,   186,    59,   188,   189,   196,   150,   171,   148,
     172,   173,   174,   151,   168,   152,    90,    40,    90,    40,
      40,    40,     0,    61,    62,   153,    64,     0,     0,     0,
      24,   169,     0,     0,    25,    75,     0,   143,    90,    24,
       0,     0,   178,    25,   180,     0,     0,    90,    28,    90,
      26,    27,     0,     0,     0,     0,    90,    28,     0,    29,
       0,   194,    90,     0,     0,     0,     0,   198,   199,    90,
     128,     0,   191,     0,   202,     0,    40,    40,     0,     0,
     187,     0,   204,    40,     0,   201,   193,     0,     0,     0,
       0,    40,     0,     0,     0,   200,     0,     0,     0,     0,
       0,     0,     0,     0,    64,     0,    64,    64,    64,    64,
      64,    64,    64,    64,    64,    64,    64,    64,   162,   163,
     164,   165,     0,     0,     5,     6,     7,     8,     9,    10,
      11,     0,     0,     0,     0,    12,   109,   110,   111,   112,
     113,   114,   115,   116,   117,   118,   119,   120,     0,     0,
       0,     0,    13,    14,    15,     0,    16,    17,    18,    19,
      20,    21,    22,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     1,    23,     2,    83,   121,    24,     0,     0,     0,
      25,     0,     0,     0,     0,     0,    64,    26,    27,     0,
       0,     0,     0,     0,    28,     0,    29,     5,     6,     7,
       8,     9,    10,    11,     0,     0,     0,     0,    12,     0,
       5,     6,     7,     8,     9,    10,    11,     0,     0,     0,
       0,    12,     0,     0,     0,    13,    14,    15,     0,    16,
      17,    18,    19,    20,    21,    22,     5,     6,     7,     8,
       9,    10,    11,     0,     0,     0,     0,    12,     0,     0,
       0,     0,     0,     0,     1,    23,     2,     0,     0,    24,
       0,     0,     0,    25,     0,     0,     0,     0,    89,     0,
      26,    27,    24,     0,     0,     0,    25,    28,     0,    29,
       0,     0,     0,    26,    27,     0,     0,     0,     0,     0,
      28,     0,    29,     0,   131,     0,     0,     0,    24,     0,
       0,     0,    25,     0,     0,     0,     0,     0,     0,    26,
      27,     0,     0,     0,     0,     0,    28,     0,    29,     5,
       6,     7,     8,     9,    10,    11,     0,     0,     0,     0,
      12,     0,     5,     6,     7,     8,     9,    10,    11,     0,
       0,     0,     0,    12,     0,     5,     6,     7,     8,     9,
      10,    11,     0,     0,     0,     0,    12,     0,     0,     0,
       0,     0,     5,     6,     7,     8,     9,    10,    11,     0,
       0,     0,     0,    12,     0,     0,     0,   132,     0,     0,
       0,    24,     0,     0,     0,    25,     0,     0,     0,     0,
     133,     0,    26,    27,    24,     0,     0,     0,    25,    28,
       0,    29,     0,   138,     0,    26,    27,    24,     0,     0,
       0,    25,    28,     0,    29,     0,     0,     0,    26,    27,
       0,     0,     0,     0,    24,    28,     0,    29,    25,   142,
       0,     0,     0,     0,     0,    26,    27,     0,     0,     0,
       0,     0,    28,     0,    29,     5,     6,     7,     8,     9,
      10,    11,     0,     0,     0,     0,    12,     0,     5,     6,
       7,     8,     9,    10,    11,     0,     0,     0,     0,    12,
       0,     5,     6,     7,     8,     9,    10,    11,     0,     0,
       0,     0,    12,     0,     0,     0,     0,     0,     5,     6,
       7,     8,     9,    10,    11,     0,     0,     0,     0,    12,
       0,     0,     0,     0,     0,     0,     0,    24,     0,     0,
       0,    25,     0,     0,     0,     0,     0,     0,    26,    27,
      24,   167,     0,     0,    25,    28,   144,    29,     0,   179,
       0,    26,    27,    24,     0,     0,     0,    25,    28,     0,
      29,     0,     0,     0,    26,    27,     0,     0,     0,     0,
      24,    28,     0,    29,    25,   182,     0,     0,     0,     0,
       0,    26,    27,     0,     0,     0,     0,     0,    28,     0,
      29,     5,     6,     7,     8,     9,    10,    11,     0,     0,
       0,     0,    12,     0,     5,     6,     7,     8,     9,    10,
      11,     0,     0,     0,     0,    12,     0,     0,     0,     0,
       0,     5,     6,     7,     8,     9,    10,    11,     0,     0,
       0,     0,    12,     0,     0,     0,     5,     6,     7,     8,
       9,    10,    11,     0,     0,     0,     0,    12,     0,   183,
       0,     0,     0,    24,     0,     0,     0,    25,     0,     0,
       0,     0,     0,     0,    26,    27,    24,   184,     0,     0,
      25,    28,     0,    29,     0,     0,     0,    26,    27,     0,
       0,     0,     0,    24,    28,     0,    29,    25,   185,     0,
       0,     0,     0,     0,    26,    27,     0,   190,    24,     0,
       0,    28,    25,    29,     0,     0,     0,     0,     0,    26,
      27,     0,     0,     0,     0,     0,    28,     0,    29,     5,
       6,     7,     8,     9,    10,    11,     0,     0,     0,     0,
      12,     0,     5,     6,     7,     8,     9,    10,    11,     0,
       0,     0,     0,    12,     0,     5,     6,     7,     8,     9,
      10,    11,     0,     0,     0,     0,    12,     0,     5,     6,
       7,     8,     9,    10,    11,     0,     0,     0,     0,    12,
       0,     0,     0,     0,     0,     0,     0,   192,     0,     0,
       0,    24,     0,     0,     0,    25,     0,     0,     0,     0,
     197,     0,    26,    27,    24,     0,     0,     0,    25,    28,
       0,    29,     0,   203,     0,    26,    27,    24,     0,     0,
       0,    25,    28,     0,    29,     0,     0,     0,    26,    27,
      24,     0,     0,     0,    25,    28,     0,    29,     0,     0,
       0,    26,    27,     0,     0,     0,     0,     0,    28,     0,
      29
};

static const yytype_int16 yycheck[] =
{
       2,    13,     4,     0,    25,     3,    16,    33,     3,    35,
      17,    19,     8,     9,    74,    75,    24,    19,    12,    13,
      31,    42,    24,    78,    79,    80,    81,    10,    11,    31,
      15,    16,    17,    76,    77,    61,     0,    22,    67,    68,
      69,    61,    60,    28,    62,    66,    67,    68,    59,    49,
      50,    97,    98,     3,    65,    76,    61,    59,    69,    72,
      81,    82,    61,    65,    71,    86,    87,    69,    66,    65,
      78,    66,    61,    69,    99,   100,    78,    61,     3,     4,
       5,     6,     7,    61,   101,   102,    82,     3,     4,     5,
       6,     7,     8,     9,   103,   104,   135,   136,    14,    73,
      15,   122,    69,    88,   125,    61,    64,    92,    56,     3,
      36,    56,    34,     4,    61,    61,   186,    93,   129,    91,
     131,   132,   133,    94,   125,    95,   147,   129,   149,   131,
     132,   133,    -1,    10,    11,    96,    13,    -1,    -1,    -1,
      65,   126,    -1,    -1,    69,    61,    -1,   168,   169,    65,
      -1,    -1,   137,    69,   139,    -1,    -1,   178,    83,   180,
      76,    77,    -1,    -1,    -1,    -1,   187,    83,    -1,    85,
      -1,   183,   193,    -1,    -1,    -1,    -1,   188,   189,   200,
      57,    -1,   179,    -1,   195,    -1,   188,   189,    -1,    -1,
     175,    -1,   203,   195,    -1,   192,   181,    -1,    -1,    -1,
      -1,   203,    -1,    -1,    -1,   190,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    91,    -1,    93,    94,    95,    96,
      97,    98,    99,   100,   101,   102,   103,   104,   105,   106,
     107,   108,    -1,    -1,     3,     4,     5,     6,     7,     8,
       9,    -1,    -1,    -1,    -1,    14,    18,    19,    20,    21,
      22,    23,    24,    25,    26,    27,    28,    29,    -1,    -1,
      -1,    -1,    31,    32,    33,    -1,    35,    36,    37,    38,
      39,    40,    41,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    60,    61,    62,    63,    67,    65,    -1,    -1,    -1,
      69,    -1,    -1,    -1,    -1,    -1,   183,    76,    77,    -1,
      -1,    -1,    -1,    -1,    83,    -1,    85,     3,     4,     5,
       6,     7,     8,     9,    -1,    -1,    -1,    -1,    14,    -1,
       3,     4,     5,     6,     7,     8,     9,    -1,    -1,    -1,
      -1,    14,    -1,    -1,    -1,    31,    32,    33,    -1,    35,
      36,    37,    38,    39,    40,    41,     3,     4,     5,     6,
       7,     8,     9,    -1,    -1,    -1,    -1,    14,    -1,    -1,
      -1,    -1,    -1,    -1,    60,    61,    62,    -1,    -1,    65,
      -1,    -1,    -1,    69,    -1,    -1,    -1,    -1,    61,    -1,
      76,    77,    65,    -1,    -1,    -1,    69,    83,    -1,    85,
      -1,    -1,    -1,    76,    77,    -1,    -1,    -1,    -1,    -1,
      83,    -1,    85,    -1,    61,    -1,    -1,    -1,    65,    -1,
      -1,    -1,    69,    -1,    -1,    -1,    -1,    -1,    -1,    76,
      77,    -1,    -1,    -1,    -1,    -1,    83,    -1,    85,     3,
       4,     5,     6,     7,     8,     9,    -1,    -1,    -1,    -1,
      14,    -1,     3,     4,     5,     6,     7,     8,     9,    -1,
      -1,    -1,    -1,    14,    -1,     3,     4,     5,     6,     7,
       8,     9,    -1,    -1,    -1,    -1,    14,    -1,    -1,    -1,
      -1,    -1,     3,     4,     5,     6,     7,     8,     9,    -1,
      -1,    -1,    -1,    14,    -1,    -1,    -1,    61,    -1,    -1,
      -1,    65,    -1,    -1,    -1,    69,    -1,    -1,    -1,    -1,
      61,    -1,    76,    77,    65,    -1,    -1,    -1,    69,    83,
      -1,    85,    -1,    61,    -1,    76,    77,    65,    -1,    -1,
      -1,    69,    83,    -1,    85,    -1,    -1,    -1,    76,    77,
      -1,    -1,    -1,    -1,    65,    83,    -1,    85,    69,    70,
      -1,    -1,    -1,    -1,    -1,    76,    77,    -1,    -1,    -1,
      -1,    -1,    83,    -1,    85,     3,     4,     5,     6,     7,
       8,     9,    -1,    -1,    -1,    -1,    14,    -1,     3,     4,
       5,     6,     7,     8,     9,    -1,    -1,    -1,    -1,    14,
      -1,     3,     4,     5,     6,     7,     8,     9,    -1,    -1,
      -1,    -1,    14,    -1,    -1,    -1,    -1,    -1,     3,     4,
       5,     6,     7,     8,     9,    -1,    -1,    -1,    -1,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    65,    -1,    -1,
      -1,    69,    -1,    -1,    -1,    -1,    -1,    -1,    76,    77,
      65,    66,    -1,    -1,    69,    83,    84,    85,    -1,    61,
      -1,    76,    77,    65,    -1,    -1,    -1,    69,    83,    -1,
      85,    -1,    -1,    -1,    76,    77,    -1,    -1,    -1,    -1,
      65,    83,    -1,    85,    69,    70,    -1,    -1,    -1,    -1,
      -1,    76,    77,    -1,    -1,    -1,    -1,    -1,    83,    -1,
      85,     3,     4,     5,     6,     7,     8,     9,    -1,    -1,
      -1,    -1,    14,    -1,     3,     4,     5,     6,     7,     8,
       9,    -1,    -1,    -1,    -1,    14,    -1,    -1,    -1,    -1,
      -1,     3,     4,     5,     6,     7,     8,     9,    -1,    -1,
      -1,    -1,    14,    -1,    -1,    -1,     3,     4,     5,     6,
       7,     8,     9,    -1,    -1,    -1,    -1,    14,    -1,    61,
      -1,    -1,    -1,    65,    -1,    -1,    -1,    69,    -1,    -1,
      -1,    -1,    -1,    -1,    76,    77,    65,    66,    -1,    -1,
      69,    83,    -1,    85,    -1,    -1,    -1,    76,    77,    -1,
      -1,    -1,    -1,    65,    83,    -1,    85,    69,    70,    -1,
      -1,    -1,    -1,    -1,    76,    77,    -1,    64,    65,    -1,
      -1,    83,    69,    85,    -1,    -1,    -1,    -1,    -1,    76,
      77,    -1,    -1,    -1,    -1,    -1,    83,    -1,    85,     3,
       4,     5,     6,     7,     8,     9,    -1,    -1,    -1,    -1,
      14,    -1,     3,     4,     5,     6,     7,     8,     9,    -1,
      -1,    -1,    -1,    14,    -1,     3,     4,     5,     6,     7,
       8,     9,    -1,    -1,    -1,    -1,    14,    -1,     3,     4,
       5,     6,     7,     8,     9,    -1,    -1,    -1,    -1,    14,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    61,    -1,    -1,
      -1,    65,    -1,    -1,    -1,    69,    -1,    -1,    -1,    -1,
      61,    -1,    76,    77,    65,    -1,    -1,    -1,    69,    83,
      -1,    85,    -1,    61,    -1,    76,    77,    65,    -1,    -1,
      -1,    69,    83,    -1,    85,    -1,    -1,    -1,    76,    77,
      65,    -1,    -1,    -1,    69,    83,    -1,    85,    -1,    -1,
      -1,    76,    77,    -1,    -1,    -1,    -1,    -1,    83,    -1,
      85
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,    60,    62,    87,    61,     3,     4,     5,     6,     7,
       8,     9,    14,    31,    32,    33,    35,    36,    37,    38,
      39,    40,    41,    61,    65,    69,    76,    77,    83,    85,
      87,    88,    89,    90,    91,    92,    93,    94,    95,    97,
      98,    99,   100,   101,   102,   103,   104,   105,   106,   107,
     108,   109,   110,   111,   112,   113,   114,   116,     0,    88,
      98,   112,   112,   101,   112,    61,   100,   100,   100,    61,
       3,    97,    98,    61,    61,    61,   100,    66,    96,    97,
      99,   115,   100,    63,    89,    61,    67,    68,    69,    61,
      99,    17,    71,    16,    72,    15,    73,    12,    13,    74,
      75,    10,    11,    76,    77,    78,    79,    80,    81,    18,
      19,    20,    21,    22,    23,    24,    25,    26,    27,    28,
      29,    67,   117,     8,     9,    65,    69,    82,   112,    61,
      89,    61,    61,    61,    89,    49,    50,    64,    61,    56,
      66,    97,    70,    99,    84,    99,    99,   100,   103,   100,
     104,   105,   106,   107,   108,   108,   109,   109,   110,   110,
     111,   111,   112,   112,   112,   112,    99,    66,   115,   100,
       3,    89,    89,    89,    89,    36,   114,   114,   100,    61,
     100,    56,    70,    61,    66,    70,    34,   100,    61,    61,
      64,    87,    61,   100,   101,    61,    92,    61,    89,    89,
     100,    87,    89,    61,    89
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
#line 30 "bisonGrammar.y"
    {printf("\n%s\n",(yyvsp[(3) - (3)].str));}
    break;

  case 3:
#line 31 "bisonGrammar.y"
    {(yyval.str) = (yyvsp[(2) - (3)].str);}
    break;

  case 4:
#line 34 "bisonGrammar.y"
    {;}
    break;

  case 5:
#line 35 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),(yyvsp[(2) - (2)].str));}
    break;

  case 6:
#line 38 "bisonGrammar.y"
    {;}
    break;

  case 7:
#line 39 "bisonGrammar.y"
    {;}
    break;

  case 8:
#line 40 "bisonGrammar.y"
    {;}
    break;

  case 9:
#line 41 "bisonGrammar.y"
    {;}
    break;

  case 10:
#line 42 "bisonGrammar.y"
    {;}
    break;

  case 11:
#line 43 "bisonGrammar.y"
    {;}
    break;

  case 12:
#line 46 "bisonGrammar.y"
    {(yyval.str) = ";";}
    break;

  case 13:
#line 47 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),";");}
    break;

  case 14:
#line 48 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),";");}
    break;

  case 15:
#line 51 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat("case ",(yyvsp[(2) - (4)].str)),":"),(yyvsp[(4) - (4)].str));}
    break;

  case 16:
#line 52 "bisonGrammar.y"
    {(yyval.str) = cat("default:",(yyvsp[(3) - (3)].str));}
    break;

  case 17:
#line 55 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("if(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 18:
#line 56 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (6)].str)),"){"),(yyvsp[(4) - (6)].str)),"}else "),(yyvsp[(6) - (6)].str));}
    break;

  case 19:
#line 57 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("if(",(yyvsp[(2) - (7)].str)),"){"),(yyvsp[(4) - (7)].str)),"}else{"),(yyvsp[(7) - (7)].str)),"}");}
    break;

  case 20:
#line 58 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("switch(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 21:
#line 61 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("while(",(yyvsp[(2) - (4)].str)),"){"),(yyvsp[(4) - (4)].str)),"}");}
    break;

  case 22:
#line 62 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("do{",(yyvsp[(3) - (6)].str)),"}while("),(yyvsp[(5) - (6)].str)),");");}
    break;

  case 23:
#line 63 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].str))," in "),(yyvsp[(4) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 24:
#line 64 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat("for(let ",(yyvsp[(2) - (6)].str))," of "),(yyvsp[(4) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 25:
#line 65 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat(cat(cat(cat(cat("for(",(yyvsp[(2) - (8)].str)),";"),(yyvsp[(4) - (8)].str)),";"),(yyvsp[(6) - (8)].str)),"){"),(yyvsp[(8) - (8)].str)),"}");}
    break;

  case 26:
#line 68 "bisonGrammar.y"
    {(yyval.str) = "continue;";}
    break;

  case 27:
#line 69 "bisonGrammar.y"
    {(yyval.str) = "break;";}
    break;

  case 28:
#line 70 "bisonGrammar.y"
    {(yyval.str) = "return;";}
    break;

  case 29:
#line 71 "bisonGrammar.y"
    {(yyval.str) = cat(cat("return ",(yyvsp[(2) - (3)].str)),";");}
    break;

  case 30:
#line 75 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (6)].str)),"){"),(yyvsp[(6) - (6)].str)),"}");}
    break;

  case 31:
#line 76 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat("function(",(yyvsp[(2) - (5)].str)),"){return "),(yyvsp[(5) - (5)].str)),";}");}
    break;

  case 32:
#line 77 "bisonGrammar.y"
    {(yyval.str) = cat(cat("function(){",(yyvsp[(5) - (5)].str)),"}");}
    break;

  case 33:
#line 78 "bisonGrammar.y"
    {(yyval.str) = cat(cat("function(){return ",(yyvsp[(4) - (4)].str)),";}");}
    break;

  case 34:
#line 82 "bisonGrammar.y"
    {;}
    break;

  case 35:
#line 83 "bisonGrammar.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (2)].str),","),(yyvsp[(2) - (2)].str));}
    break;

  case 36:
#line 87 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(dec((yyvsp[(1) - (3)].str)),(yyvsp[(1) - (3)].str)),"="),(yyvsp[(3) - (3)].str));}
    break;

  case 37:
#line 88 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat("this.",(yyvsp[(1) - (3)].str)),"="),(yyvsp[(3) - (3)].str));}
    break;

  case 38:
#line 92 "bisonGrammar.y"
    {;}
    break;

  case 39:
#line 93 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat((yyvsp[(1) - (4)].str),"["),(yyvsp[(3) - (4)].str)),"]");}
    break;

  case 40:
#line 97 "bisonGrammar.y"
    {;}
    break;

  case 41:
#line 98 "bisonGrammar.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (3)].str),(yyvsp[(2) - (3)].str)),(yyvsp[(3) - (3)].str));}
    break;

  case 42:
#line 102 "bisonGrammar.y"
    {;}
    break;

  case 43:
#line 103 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),(yyvsp[(2) - (2)].str));}
    break;

  case 44:
#line 107 "bisonGrammar.y"
    {;}
    break;

  case 45:
#line 108 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat(cat((yyvsp[(1) - (5)].str),"?"),(yyvsp[(3) - (5)].str) ),":"),(yyvsp[(5) - (5)].str));}
    break;

  case 46:
#line 112 "bisonGrammar.y"
    {;}
    break;

  case 47:
#line 113 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"||"), (yyvsp[(3) - (3)].str) );}
    break;

  case 48:
#line 116 "bisonGrammar.y"
    {;}
    break;

  case 49:
#line 117 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"&&"), (yyvsp[(3) - (3)].str) );}
    break;

  case 50:
#line 120 "bisonGrammar.y"
    {;}
    break;

  case 51:
#line 121 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"|"), (yyvsp[(3) - (3)].str) );}
    break;

  case 52:
#line 124 "bisonGrammar.y"
    {;}
    break;

  case 53:
#line 125 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"^"), (yyvsp[(3) - (3)].str) );}
    break;

  case 54:
#line 128 "bisonGrammar.y"
    {;}
    break;

  case 55:
#line 129 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"&"), (yyvsp[(3) - (3)].str) );}
    break;

  case 56:
#line 132 "bisonGrammar.y"
    {;}
    break;

  case 57:
#line 133 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"==="), (yyvsp[(3) - (3)].str) );}
    break;

  case 58:
#line 134 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"!=="), (yyvsp[(3) - (3)].str) );}
    break;

  case 59:
#line 137 "bisonGrammar.y"
    {;}
    break;

  case 60:
#line 138 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"<"), (yyvsp[(3) - (3)].str) );}
    break;

  case 61:
#line 139 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),">"), (yyvsp[(3) - (3)].str) );}
    break;

  case 62:
#line 142 "bisonGrammar.y"
    {;}
    break;

  case 63:
#line 143 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"<<"), (yyvsp[(3) - (3)].str) );}
    break;

  case 64:
#line 144 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),">>"), (yyvsp[(3) - (3)].str) );}
    break;

  case 65:
#line 147 "bisonGrammar.y"
    {;}
    break;

  case 66:
#line 148 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"+"), (yyvsp[(3) - (3)].str) );}
    break;

  case 67:
#line 149 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"-"), (yyvsp[(3) - (3)].str) );}
    break;

  case 68:
#line 152 "bisonGrammar.y"
    {;}
    break;

  case 69:
#line 153 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"*"), (yyvsp[(3) - (3)].str) );}
    break;

  case 70:
#line 154 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"/"), (yyvsp[(3) - (3)].str) );}
    break;

  case 71:
#line 155 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"**"), (yyvsp[(3) - (3)].str) );}
    break;

  case 72:
#line 156 "bisonGrammar.y"
    {(yyval.str) = cat( cat((yyvsp[(1) - (3)].str),"%"), (yyvsp[(3) - (3)].str) );}
    break;

  case 73:
#line 159 "bisonGrammar.y"
    {;}
    break;

  case 74:
#line 160 "bisonGrammar.y"
    {(yyval.str) = cat("++",(yyvsp[(2) - (2)].str));}
    break;

  case 75:
#line 161 "bisonGrammar.y"
    {(yyval.str) = cat("--",(yyvsp[(2) - (2)].str));}
    break;

  case 76:
#line 162 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),(yyvsp[(2) - (2)].str));}
    break;

  case 77:
#line 165 "bisonGrammar.y"
    {;}
    break;

  case 78:
#line 166 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat((yyvsp[(1) - (4)].str),"["),(yyvsp[(3) - (4)].str)),"]");}
    break;

  case 79:
#line 167 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (3)].str),"()");}
    break;

  case 80:
#line 168 "bisonGrammar.y"
    {(yyval.str) = cat(cat(cat((yyvsp[(1) - (4)].str),"("),(yyvsp[(3) - (4)].str)),")");}
    break;

  case 81:
#line 169 "bisonGrammar.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (3)].str),"."),(yyvsp[(3) - (3)].str));}
    break;

  case 82:
#line 170 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),"++");}
    break;

  case 83:
#line 171 "bisonGrammar.y"
    {(yyval.str) = cat((yyvsp[(1) - (2)].str),"--");;}
    break;

  case 84:
#line 174 "bisonGrammar.y"
    {;}
    break;

  case 85:
#line 175 "bisonGrammar.y"
    {;}
    break;

  case 86:
#line 176 "bisonGrammar.y"
    {(yyval.str) = cat(cat("'",(yyvsp[(1) - (1)].str)),"'");}
    break;

  case 87:
#line 177 "bisonGrammar.y"
    {(yyval.str) = cat(cat("`",(yyvsp[(1) - (1)].str)),"`");}
    break;

  case 88:
#line 178 "bisonGrammar.y"
    {(yyval.str) = cat(cat("/",(yyvsp[(1) - (1)].str)),"/");}
    break;

  case 89:
#line 179 "bisonGrammar.y"
    {;}
    break;

  case 90:
#line 180 "bisonGrammar.y"
    {(yyval.str) = cat(cat("[",(yyvsp[(2) - (3)].str)),"]");}
    break;

  case 91:
#line 181 "bisonGrammar.y"
    {(yyval.str) = cat(cat("(",(yyvsp[(2) - (3)].str)),")");}
    break;

  case 92:
#line 185 "bisonGrammar.y"
    {;}
    break;

  case 93:
#line 186 "bisonGrammar.y"
    {(yyval.str) = cat(cat((yyvsp[(1) - (2)].str),","),(yyvsp[(2) - (2)].str));}
    break;

  case 94:
#line 190 "bisonGrammar.y"
    {(yyval.str) = "+";}
    break;

  case 95:
#line 191 "bisonGrammar.y"
    {(yyval.str) = "-";}
    break;

  case 96:
#line 192 "bisonGrammar.y"
    {(yyval.str) = "!";}
    break;

  case 97:
#line 193 "bisonGrammar.y"
    {(yyval.str) = "~";}
    break;

  case 98:
#line 196 "bisonGrammar.y"
    {(yyval.str) = "=";}
    break;

  case 99:
#line 197 "bisonGrammar.y"
    {(yyval.str) = "**=";}
    break;

  case 100:
#line 198 "bisonGrammar.y"
    {(yyval.str) = "*=";}
    break;

  case 101:
#line 199 "bisonGrammar.y"
    {(yyval.str) = "/=";}
    break;

  case 102:
#line 200 "bisonGrammar.y"
    {(yyval.str) = "%=";}
    break;

  case 103:
#line 201 "bisonGrammar.y"
    {(yyval.str) = "+=";}
    break;

  case 104:
#line 202 "bisonGrammar.y"
    {(yyval.str) = "-=";}
    break;

  case 105:
#line 203 "bisonGrammar.y"
    {(yyval.str) = "<<=";}
    break;

  case 106:
#line 204 "bisonGrammar.y"
    {(yyval.str) = ">>=";}
    break;

  case 107:
#line 205 "bisonGrammar.y"
    {(yyval.str) = "&=";}
    break;

  case 108:
#line 206 "bisonGrammar.y"
    {(yyval.str) = "^=";}
    break;

  case 109:
#line 207 "bisonGrammar.y"
    {(yyval.str) = "|=";}
    break;

  case 110:
#line 208 "bisonGrammar.y"
    {(yyval.str) = "!=";}
    break;


/* Line 1267 of yacc.c.  */
#line 2334 "y.tab.c"
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


#line 211 "bisonGrammar.y"

extern char yytext[];
extern int column;

char* cat(char *a, char *b){
	char *c = (char *) malloc(1 +sizeof(char*) * (strlen(a)+ strlen(b)));
	strcpy(c, a);
	strcat(c, b);
	return c;
}

char* dec(char *name){
	return "";
}

void yyerror(char *s){
	fflush(stdout);
	printf("\n%s\n", s);
}

int main(){
	return yyparse();
}

