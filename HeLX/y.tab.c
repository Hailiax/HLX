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
     SIZEOF = 261,
     RANGE = 262,
     PTR_OP = 263,
     INC_OP = 264,
     DEC_OP = 265,
     LEFT_OP = 266,
     RIGHT_OP = 267,
     LE_OP = 268,
     GE_OP = 269,
     EQ_OP = 270,
     NE_OP = 271,
     AND_OP = 272,
     OR_OP = 273,
     MUL_ASSIGN = 274,
     DIV_ASSIGN = 275,
     MOD_ASSIGN = 276,
     ADD_ASSIGN = 277,
     SUB_ASSIGN = 278,
     LEFT_ASSIGN = 279,
     RIGHT_ASSIGN = 280,
     AND_ASSIGN = 281,
     XOR_ASSIGN = 282,
     OR_ASSIGN = 283,
     TYPE_NAME = 284,
     TYPEDEF = 285,
     EXTERN = 286,
     STATIC = 287,
     AUTO = 288,
     REGISTER = 289,
     CHAR = 290,
     SHORT = 291,
     INT = 292,
     LONG = 293,
     SIGNED = 294,
     UNSIGNED = 295,
     FLOAT = 296,
     DOUBLE = 297,
     CONST = 298,
     VOLATILE = 299,
     VOID = 300,
     STRUCT = 301,
     UNION = 302,
     ENUM = 303,
     ELLIPSIS = 304,
     CASE = 305,
     DEFAULT = 306,
     IF = 307,
     ELSE = 308,
     SWITCH = 309,
     WHILE = 310,
     DO = 311,
     FOR = 312,
     GOTO = 313,
     CONTINUE = 314,
     BREAK = 315,
     RETURN = 316
   };
#endif
/* Tokens.  */
#define IDENTIFIER 258
#define CONSTANT 259
#define STRING_LITERAL 260
#define SIZEOF 261
#define RANGE 262
#define PTR_OP 263
#define INC_OP 264
#define DEC_OP 265
#define LEFT_OP 266
#define RIGHT_OP 267
#define LE_OP 268
#define GE_OP 269
#define EQ_OP 270
#define NE_OP 271
#define AND_OP 272
#define OR_OP 273
#define MUL_ASSIGN 274
#define DIV_ASSIGN 275
#define MOD_ASSIGN 276
#define ADD_ASSIGN 277
#define SUB_ASSIGN 278
#define LEFT_ASSIGN 279
#define RIGHT_ASSIGN 280
#define AND_ASSIGN 281
#define XOR_ASSIGN 282
#define OR_ASSIGN 283
#define TYPE_NAME 284
#define TYPEDEF 285
#define EXTERN 286
#define STATIC 287
#define AUTO 288
#define REGISTER 289
#define CHAR 290
#define SHORT 291
#define INT 292
#define LONG 293
#define SIGNED 294
#define UNSIGNED 295
#define FLOAT 296
#define DOUBLE 297
#define CONST 298
#define VOLATILE 299
#define VOID 300
#define STRUCT 301
#define UNION 302
#define ENUM 303
#define ELLIPSIS 304
#define CASE 305
#define DEFAULT 306
#define IF 307
#define ELSE 308
#define SWITCH 309
#define WHILE 310
#define DO 311
#define FOR 312
#define GOTO 313
#define CONTINUE 314
#define BREAK 315
#define RETURN 316




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
typedef int YYSTYPE;
# define yystype YYSTYPE /* obsolescent; will be withdrawn */
# define YYSTYPE_IS_DECLARED 1
# define YYSTYPE_IS_TRIVIAL 1
#endif



/* Copy the second part of user declarations.  */


/* Line 216 of yacc.c.  */
#line 229 "y.tab.c"

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
#define YYFINAL  61
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   1311

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  86
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  64
/* YYNRULES -- Number of rules.  */
#define YYNRULES  212
/* YYNRULES -- Number of states.  */
#define YYNSTATES  350

/* YYTRANSLATE(YYLEX) -- Bison symbol number corresponding to YYLEX.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   316

#define YYTRANSLATE(YYX)						\
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[YYLEX] -- Bison symbol number corresponding to YYLEX.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    73,     2,     2,     2,    75,    68,     2,
      62,    63,    69,    70,    67,    71,    66,    74,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,    81,    83,
      76,    82,    77,    80,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,    64,     2,    65,    78,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,    84,    79,    85,    72,     2,     2,     2,
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
      55,    56,    57,    58,    59,    60,    61
};

#if YYDEBUG
/* YYPRHS[YYN] -- Index of the first RHS symbol of rule number YYN in
   YYRHS.  */
static const yytype_uint16 yyprhs[] =
{
       0,     0,     3,     5,     7,     9,    13,    15,    20,    24,
      29,    33,    37,    40,    43,    45,    49,    51,    54,    57,
      60,    63,    68,    70,    72,    74,    76,    78,    80,    82,
      87,    89,    93,    97,   101,   103,   107,   111,   113,   117,
     121,   123,   127,   131,   135,   139,   141,   145,   149,   151,
     155,   157,   161,   163,   167,   169,   173,   175,   179,   181,
     187,   189,   193,   195,   197,   199,   201,   203,   205,   207,
     209,   211,   213,   215,   217,   221,   223,   226,   230,   232,
     235,   237,   240,   242,   245,   247,   251,   253,   257,   259,
     261,   263,   265,   267,   269,   271,   273,   275,   277,   279,
     281,   283,   285,   287,   289,   291,   297,   302,   305,   307,
     309,   311,   314,   318,   321,   323,   326,   328,   330,   334,
     336,   339,   343,   348,   354,   357,   359,   363,   365,   369,
     371,   373,   376,   378,   380,   384,   389,   393,   398,   403,
     407,   409,   412,   415,   419,   421,   424,   426,   430,   432,
     436,   439,   442,   444,   446,   450,   452,   455,   457,   459,
     462,   466,   469,   473,   477,   482,   485,   489,   493,   498,
     500,   504,   509,   511,   515,   517,   519,   521,   523,   525,
     527,   531,   536,   540,   543,   547,   551,   556,   558,   561,
     563,   566,   568,   571,   577,   585,   591,   597,   605,   612,
     620,   624,   627,   630,   633,   637,   639,   642,   644,   646,
     651,   655,   659
};

/* YYRHS -- A `-1'-separated list of the rules' RHS.  */
static const yytype_int16 yyrhs[] =
{
     147,     0,    -1,     3,    -1,     4,    -1,     5,    -1,    62,
     106,    63,    -1,    87,    -1,    88,    64,   106,    65,    -1,
      88,    62,    63,    -1,    88,    62,    89,    63,    -1,    88,
      66,     3,    -1,    88,     8,     3,    -1,    88,     9,    -1,
      88,    10,    -1,   104,    -1,    89,    67,   104,    -1,    88,
      -1,     9,    90,    -1,    10,    90,    -1,    91,    92,    -1,
       6,    90,    -1,     6,    62,   133,    63,    -1,    68,    -1,
      69,    -1,    70,    -1,    71,    -1,    72,    -1,    73,    -1,
      90,    -1,    62,   133,    63,    92,    -1,    92,    -1,    93,
      69,    92,    -1,    93,    74,    92,    -1,    93,    75,    92,
      -1,    93,    -1,    94,    70,    93,    -1,    94,    71,    93,
      -1,    94,    -1,    95,    11,    94,    -1,    95,    12,    94,
      -1,    95,    -1,    96,    76,    95,    -1,    96,    77,    95,
      -1,    96,    13,    95,    -1,    96,    14,    95,    -1,    96,
      -1,    97,    15,    96,    -1,    97,    16,    96,    -1,    97,
      -1,    98,    68,    97,    -1,    98,    -1,    99,    78,    98,
      -1,    99,    -1,   100,    79,    99,    -1,   100,    -1,   101,
      17,   100,    -1,   101,    -1,   102,    18,   101,    -1,   102,
      -1,   102,    80,   106,    81,   103,    -1,   103,    -1,    90,
     105,   104,    -1,    82,    -1,    19,    -1,    20,    -1,    21,
      -1,    22,    -1,    23,    -1,    24,    -1,    25,    -1,    26,
      -1,    27,    -1,    28,    -1,   104,    -1,   106,    67,   104,
      -1,   103,    -1,   109,    83,    -1,   109,   110,    83,    -1,
     112,    -1,   112,   109,    -1,   113,    -1,   113,   109,    -1,
     124,    -1,   124,   109,    -1,   111,    -1,   110,    67,   111,
      -1,   125,    -1,   125,    82,   136,    -1,    30,    -1,    31,
      -1,    32,    -1,    33,    -1,    34,    -1,    45,    -1,    35,
      -1,    36,    -1,    37,    -1,    38,    -1,    41,    -1,    42,
      -1,    39,    -1,    40,    -1,   114,    -1,   121,    -1,    29,
      -1,   115,     3,    84,   116,    85,    -1,   115,    84,   116,
      85,    -1,   115,     3,    -1,    46,    -1,    47,    -1,   117,
      -1,   116,   117,    -1,   118,   119,    83,    -1,   113,   118,
      -1,   113,    -1,   124,   118,    -1,   124,    -1,   120,    -1,
     119,    67,   120,    -1,   125,    -1,    81,   107,    -1,   125,
      81,   107,    -1,    48,    84,   122,    85,    -1,    48,     3,
      84,   122,    85,    -1,    48,     3,    -1,   123,    -1,   122,
      67,   123,    -1,     3,    -1,     3,    82,   107,    -1,    43,
      -1,    44,    -1,   127,   126,    -1,   126,    -1,     3,    -1,
      62,   125,    63,    -1,   126,    64,   107,    65,    -1,   126,
      64,    65,    -1,   126,    62,   129,    63,    -1,   126,    62,
     132,    63,    -1,   126,    62,    63,    -1,    69,    -1,    69,
     128,    -1,    69,   127,    -1,    69,   128,   127,    -1,   124,
      -1,   128,   124,    -1,   130,    -1,   130,    67,    49,    -1,
     131,    -1,   130,    67,   131,    -1,   109,   125,    -1,   109,
     134,    -1,   109,    -1,     3,    -1,   132,    67,     3,    -1,
     118,    -1,   118,   134,    -1,   127,    -1,   135,    -1,   127,
     135,    -1,    62,   134,    63,    -1,    64,    65,    -1,    64,
     107,    65,    -1,   135,    64,    65,    -1,   135,    64,   107,
      65,    -1,    62,    63,    -1,    62,   129,    63,    -1,   135,
      62,    63,    -1,   135,    62,   129,    63,    -1,   104,    -1,
      84,   137,    85,    -1,    84,   137,    67,    85,    -1,   136,
      -1,   137,    67,   136,    -1,   139,    -1,   140,    -1,   143,
      -1,   144,    -1,   145,    -1,   146,    -1,     3,    81,   138,
      -1,    50,   107,    81,   138,    -1,    51,    81,   138,    -1,
      84,    85,    -1,    84,   142,    85,    -1,    84,   141,    85,
      -1,    84,   141,   142,    85,    -1,   108,    -1,   141,   108,
      -1,   138,    -1,   142,   138,    -1,    83,    -1,   106,    83,
      -1,    52,    62,   106,    63,   138,    -1,    52,    62,   106,
      63,   138,    53,   138,    -1,    54,    62,   106,    63,   138,
      -1,    55,    62,   106,    63,   138,    -1,    56,   138,    55,
      62,   106,    63,    83,    -1,    57,    62,   143,   143,    63,
     138,    -1,    57,    62,   143,   143,   106,    63,   138,    -1,
      58,     3,    83,    -1,    59,    83,    -1,    60,    83,    -1,
      61,    83,    -1,    61,   106,    83,    -1,   148,    -1,   147,
     148,    -1,   149,    -1,   108,    -1,   109,   125,   141,   140,
      -1,   109,   125,   140,    -1,   125,   141,   140,    -1,   125,
     140,    -1
};

/* YYRLINE[YYN] -- source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,    17,    17,    18,    19,    20,    24,    25,    26,    27,
      28,    29,    30,    31,    35,    36,    40,    41,    42,    43,
      44,    45,    49,    50,    51,    52,    53,    54,    58,    59,
      63,    64,    65,    66,    70,    71,    72,    76,    77,    78,
      82,    83,    84,    85,    86,    90,    91,    92,    96,    97,
     101,   102,   106,   107,   111,   112,   116,   117,   121,   122,
     126,   127,   131,   132,   133,   134,   135,   136,   137,   138,
     139,   140,   141,   145,   146,   150,   154,   155,   159,   160,
     161,   162,   163,   164,   168,   169,   173,   174,   178,   179,
     180,   181,   182,   186,   187,   188,   189,   190,   191,   192,
     193,   194,   195,   196,   197,   201,   202,   203,   207,   208,
     212,   213,   217,   221,   222,   223,   224,   228,   229,   233,
     234,   235,   239,   240,   241,   245,   246,   250,   251,   255,
     256,   260,   261,   265,   266,   267,   268,   269,   270,   271,
     275,   276,   277,   278,   282,   283,   288,   289,   293,   294,
     298,   299,   300,   304,   305,   309,   310,   314,   315,   316,
     320,   321,   322,   323,   324,   325,   326,   327,   328,   332,
     333,   334,   338,   339,   343,   344,   345,   346,   347,   348,
     352,   353,   354,   358,   359,   360,   361,   365,   366,   370,
     371,   375,   376,   380,   381,   382,   386,   387,   388,   389,
     393,   394,   395,   396,   397,   401,   402,   406,   407,   411,
     412,   413,   414
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || YYTOKEN_TABLE
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "IDENTIFIER", "CONSTANT",
  "STRING_LITERAL", "SIZEOF", "RANGE", "PTR_OP", "INC_OP", "DEC_OP",
  "LEFT_OP", "RIGHT_OP", "LE_OP", "GE_OP", "EQ_OP", "NE_OP", "AND_OP",
  "OR_OP", "MUL_ASSIGN", "DIV_ASSIGN", "MOD_ASSIGN", "ADD_ASSIGN",
  "SUB_ASSIGN", "LEFT_ASSIGN", "RIGHT_ASSIGN", "AND_ASSIGN", "XOR_ASSIGN",
  "OR_ASSIGN", "TYPE_NAME", "TYPEDEF", "EXTERN", "STATIC", "AUTO",
  "REGISTER", "CHAR", "SHORT", "INT", "LONG", "SIGNED", "UNSIGNED",
  "FLOAT", "DOUBLE", "CONST", "VOLATILE", "VOID", "STRUCT", "UNION",
  "ENUM", "ELLIPSIS", "CASE", "DEFAULT", "IF", "ELSE", "SWITCH", "WHILE",
  "DO", "FOR", "GOTO", "CONTINUE", "BREAK", "RETURN", "'('", "')'", "'['",
  "']'", "'.'", "','", "'&'", "'*'", "'+'", "'-'", "'~'", "'!'", "'/'",
  "'%'", "'<'", "'>'", "'^'", "'|'", "'?'", "':'", "'='", "';'", "'{'",
  "'}'", "$accept", "primary_expression", "postfix_expression",
  "argument_expression_list", "unary_expression", "unary_operator",
  "cast_expression", "multiplicative_expression", "additive_expression",
  "shift_expression", "relational_expression", "equality_expression",
  "and_expression", "exclusive_or_expression", "inclusive_or_expression",
  "logical_and_expression", "logical_or_expression",
  "conditional_expression", "assignment_expression", "assignment_operator",
  "expression", "constant_expression", "declaration",
  "declaration_specifiers", "init_declarator_list", "init_declarator",
  "storage_class_specifier", "type_specifier", "struct_or_union_specifier",
  "struct_or_union", "struct_declaration_list", "struct_declaration",
  "specifier_qualifier_list", "struct_declarator_list",
  "struct_declarator", "enum_specifier", "enumerator_list", "enumerator",
  "type_qualifier", "declarator", "direct_declarator", "pointer",
  "type_qualifier_list", "parameter_type_list", "parameter_list",
  "parameter_declaration", "identifier_list", "type_name",
  "abstract_declarator", "direct_abstract_declarator", "initializer",
  "initializer_list", "statement", "labeled_statement",
  "compound_statement", "declaration_list", "statement_list",
  "expression_statement", "selection_statement", "iteration_statement",
  "jump_statement", "translation_unit", "external_declaration",
  "function_definition", 0
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
     315,   316,    40,    41,    91,    93,    46,    44,    38,    42,
      43,    45,   126,    33,    47,    37,    60,    62,    94,   124,
      63,    58,    61,    59,   123,   125
};
# endif

/* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    86,    87,    87,    87,    87,    88,    88,    88,    88,
      88,    88,    88,    88,    89,    89,    90,    90,    90,    90,
      90,    90,    91,    91,    91,    91,    91,    91,    92,    92,
      93,    93,    93,    93,    94,    94,    94,    95,    95,    95,
      96,    96,    96,    96,    96,    97,    97,    97,    98,    98,
      99,    99,   100,   100,   101,   101,   102,   102,   103,   103,
     104,   104,   105,   105,   105,   105,   105,   105,   105,   105,
     105,   105,   105,   106,   106,   107,   108,   108,   109,   109,
     109,   109,   109,   109,   110,   110,   111,   111,   112,   112,
     112,   112,   112,   113,   113,   113,   113,   113,   113,   113,
     113,   113,   113,   113,   113,   114,   114,   114,   115,   115,
     116,   116,   117,   118,   118,   118,   118,   119,   119,   120,
     120,   120,   121,   121,   121,   122,   122,   123,   123,   124,
     124,   125,   125,   126,   126,   126,   126,   126,   126,   126,
     127,   127,   127,   127,   128,   128,   129,   129,   130,   130,
     131,   131,   131,   132,   132,   133,   133,   134,   134,   134,
     135,   135,   135,   135,   135,   135,   135,   135,   135,   136,
     136,   136,   137,   137,   138,   138,   138,   138,   138,   138,
     139,   139,   139,   140,   140,   140,   140,   141,   141,   142,
     142,   143,   143,   144,   144,   144,   145,   145,   145,   145,
     146,   146,   146,   146,   146,   147,   147,   148,   148,   149,
     149,   149,   149
};

/* YYR2[YYN] -- Number of symbols composing right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     1,     1,     1,     3,     1,     4,     3,     4,
       3,     3,     2,     2,     1,     3,     1,     2,     2,     2,
       2,     4,     1,     1,     1,     1,     1,     1,     1,     4,
       1,     3,     3,     3,     1,     3,     3,     1,     3,     3,
       1,     3,     3,     3,     3,     1,     3,     3,     1,     3,
       1,     3,     1,     3,     1,     3,     1,     3,     1,     5,
       1,     3,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     3,     1,     2,     3,     1,     2,
       1,     2,     1,     2,     1,     3,     1,     3,     1,     1,
       1,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     1,     1,     1,     5,     4,     2,     1,     1,
       1,     2,     3,     2,     1,     2,     1,     1,     3,     1,
       2,     3,     4,     5,     2,     1,     3,     1,     3,     1,
       1,     2,     1,     1,     3,     4,     3,     4,     4,     3,
       1,     2,     2,     3,     1,     2,     1,     3,     1,     3,
       2,     2,     1,     1,     3,     1,     2,     1,     1,     2,
       3,     2,     3,     3,     4,     2,     3,     3,     4,     1,
       3,     4,     1,     3,     1,     1,     1,     1,     1,     1,
       3,     4,     3,     2,     3,     3,     4,     1,     2,     1,
       2,     1,     2,     5,     7,     5,     5,     7,     6,     7,
       3,     2,     2,     2,     3,     1,     2,     1,     1,     4,
       3,     3,     2
};

/* YYDEFACT[STATE-NAME] -- Default rule to reduce with in state
   STATE-NUM when YYTABLE doesn't specify something else to do.  Zero
   means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       0,   133,   104,    88,    89,    90,    91,    92,    94,    95,
      96,    97,   100,   101,    98,    99,   129,   130,    93,   108,
     109,     0,     0,   140,   208,     0,    78,    80,   102,     0,
     103,    82,     0,   132,     0,     0,   205,   207,   124,     0,
       0,   144,   142,   141,    76,     0,    84,    86,    79,    81,
     107,     0,    83,     0,   187,     0,   212,     0,     0,     0,
     131,     1,   206,     0,   127,     0,   125,   134,   145,   143,
       0,    77,     0,   210,     0,     0,   114,     0,   110,     0,
     116,     2,     3,     4,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    22,
      23,    24,    25,    26,    27,   191,   183,     6,    16,    28,
       0,    30,    34,    37,    40,    45,    48,    50,    52,    54,
      56,    58,    60,    73,     0,   189,   174,   175,     0,     0,
     176,   177,   178,   179,    86,   188,   211,   153,   139,   152,
       0,   146,   148,     0,     2,   136,    28,    75,     0,     0,
       0,     0,   122,    85,     0,   169,    87,   209,     0,   113,
     106,   111,     0,     0,   117,   119,   115,     0,     0,    20,
       0,    17,    18,     0,     0,     0,     0,     0,     0,     0,
       0,   201,   202,   203,     0,     0,   155,     0,     0,    12,
      13,     0,     0,     0,    63,    64,    65,    66,    67,    68,
      69,    70,    71,    72,    62,     0,    19,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,   192,   185,     0,
     184,   190,     0,     0,   150,   157,   151,   158,   137,     0,
     138,     0,   135,   123,   128,   126,   172,     0,   105,   120,
       0,   112,     0,   180,     0,     0,   182,     0,     0,     0,
       0,     0,   200,   204,     5,     0,   157,   156,     0,    11,
       8,     0,    14,     0,    10,    61,    31,    32,    33,    35,
      36,    38,    39,    43,    44,    41,    42,    46,    47,    49,
      51,    53,    55,    57,     0,    74,   186,   165,     0,     0,
     161,     0,   159,     0,     0,   147,   149,   154,     0,   170,
     118,   121,    21,   181,     0,     0,     0,     0,     0,    29,
       9,     0,     7,     0,   166,   160,   162,   167,     0,   163,
       0,   171,   173,   193,   195,   196,     0,     0,     0,    15,
      59,   168,   164,     0,     0,   198,     0,   194,   197,   199
};

/* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int16 yydefgoto[] =
{
      -1,   107,   108,   271,   109,   110,   111,   112,   113,   114,
     115,   116,   117,   118,   119,   120,   121,   122,   123,   205,
     124,   148,    54,    55,    45,    46,    26,    27,    28,    29,
      77,    78,    79,   163,   164,    30,    65,    66,    31,    32,
      33,    34,    43,   298,   141,   142,   143,   187,   299,   237,
     156,   247,   125,   126,   127,    57,   129,   130,   131,   132,
     133,    35,    36,    37
};

/* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
   STATE-NUM.  */
#define YYPACT_NINF -206
static const yytype_int16 yypact[] =
{
     978,  -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,
    -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,
    -206,     7,    19,   149,  -206,    42,  1263,  1263,  -206,    10,
    -206,  1263,  1110,    15,    25,   886,  -206,  -206,   -76,    31,
     -19,  -206,  -206,   149,  -206,    32,  -206,  1090,  -206,  -206,
     -30,  1064,  -206,   278,  -206,    42,  -206,  1110,   410,   670,
      15,  -206,  -206,    31,   -18,   -42,  -206,  -206,  -206,  -206,
      19,  -206,   545,  -206,  1110,  1064,  1064,  1013,  -206,   126,
    1064,     1,  -206,  -206,   790,   812,   812,   836,    59,    44,
      51,    58,   527,    91,   177,   111,   128,   562,   648,  -206,
    -206,  -206,  -206,  -206,  -206,  -206,  -206,  -206,   181,   274,
     836,  -206,    77,   163,   219,    33,   220,   134,   138,   143,
     207,     5,  -206,  -206,    45,  -206,  -206,  -206,   349,   420,
    -206,  -206,  -206,  -206,   146,  -206,  -206,  -206,  -206,    14,
     185,   190,  -206,    80,  -206,  -206,  -206,  -206,   179,   -16,
     836,    31,  -206,  -206,   545,  -206,  -206,  -206,  1033,  -206,
    -206,  -206,   836,    66,  -206,   180,  -206,   527,   648,  -206,
     836,  -206,  -206,   183,   527,   836,   836,   836,   205,   599,
     191,  -206,  -206,  -206,    75,   119,     3,   210,   273,  -206,
    -206,   694,   836,   275,  -206,  -206,  -206,  -206,  -206,  -206,
    -206,  -206,  -206,  -206,  -206,   836,  -206,   836,   836,   836,
     836,   836,   836,   836,   836,   836,   836,   836,   836,   836,
     836,   836,   836,   836,   836,   836,   836,  -206,  -206,   456,
    -206,  -206,   932,   719,  -206,    11,  -206,    41,  -206,  1242,
    -206,   282,  -206,  -206,  -206,  -206,  -206,    34,  -206,  -206,
     126,  -206,   836,  -206,   214,   527,  -206,   133,   145,   147,
     224,   599,  -206,  -206,  -206,  1166,    86,  -206,   836,  -206,
    -206,   150,  -206,   136,  -206,  -206,  -206,  -206,  -206,    77,
      77,   163,   163,   219,   219,   219,   219,    33,    33,   220,
     134,   138,   143,   207,   -52,  -206,  -206,  -206,   226,   227,
    -206,   239,    41,  1207,   741,  -206,  -206,  -206,   491,  -206,
    -206,  -206,  -206,  -206,   527,   527,   527,   836,   765,  -206,
    -206,   836,  -206,   836,  -206,  -206,  -206,  -206,   228,  -206,
     240,  -206,  -206,   253,  -206,  -206,   158,   527,   160,  -206,
    -206,  -206,  -206,   527,   209,  -206,   527,  -206,  -206,  -206
};

/* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
    -206,  -206,  -206,  -206,   -48,  -206,   -91,    48,    54,    38,
      52,   107,   110,   120,   118,   121,  -206,   -55,   -70,  -206,
     -38,   -54,     6,     0,  -206,   287,  -206,   -27,  -206,  -206,
     268,   -61,   -24,  -206,    94,  -206,   297,   213,    47,   -13,
     -29,    -3,  -206,   -57,  -206,   127,  -206,   197,  -118,  -205,
    -151,  -206,   -74,  -206,   152,    39,   241,  -172,  -206,  -206,
    -206,  -206,   332,  -206
};

/* YYTABLE[YYPACT[STATE-NUM]].  What to do in state STATE-NUM.  If
   positive, shift that token.  If negative, reduce the rule which
   number is the opposite.  If zero, do what YYDEFACT says.
   If YYTABLE_NINF, syntax error.  */
#define YYTABLE_NINF -1
static const yytype_uint16 yytable[] =
{
      25,   140,   155,   246,   147,    60,    24,   261,    63,    40,
      38,   146,    47,    50,     1,   226,   161,     1,   178,   206,
      42,   236,     1,   224,    76,   151,    48,    49,     1,   323,
     302,    52,   147,   173,    64,    25,   169,   171,   172,   146,
      69,    24,   134,   152,    67,     1,   214,   215,    76,    76,
      76,   151,   159,    76,    75,   231,   166,   134,   139,   184,
     185,   302,   146,   135,   150,   265,   165,   233,   267,   243,
      41,    76,    23,   232,   186,   233,   232,    58,   233,    59,
     135,    22,   167,    23,   155,   225,    74,    22,    23,   318,
      68,    39,   128,   253,    51,   147,   244,   161,    80,    70,
     256,   308,   146,   303,    22,   304,   175,   147,   249,   216,
     217,    23,   226,   176,   146,    71,   276,   277,   278,   309,
     177,   272,    80,    80,    80,    44,   234,    80,   227,     1,
     185,    76,   185,   250,   135,   275,   235,   257,   258,   259,
     174,    76,   226,   240,   186,    80,   207,   241,   265,   251,
     233,   208,   209,   179,   273,   231,   295,   332,   263,   146,
     146,   146,   146,   146,   146,   146,   146,   146,   146,   146,
     146,   146,   146,   146,   146,   146,   146,   319,   147,   301,
     180,   313,   264,   266,    56,   146,   226,   294,    22,   188,
     189,   190,    16,    17,   181,    23,   314,   147,   311,    73,
     226,   322,   220,   226,   146,    80,    60,   162,   315,   136,
     316,   182,   226,   320,   226,    80,   221,   321,    23,    40,
     146,   344,   222,   346,   223,   226,   157,   226,    72,   235,
     212,   213,   139,   210,   211,   218,   219,   165,   155,   139,
     333,   334,   335,   191,   242,   192,   328,   193,   238,   147,
     330,   339,   283,   284,   285,   286,   146,   239,   279,   280,
     260,   252,   266,   345,   255,   139,   281,   282,   340,   347,
     287,   288,   349,   268,   262,   146,   269,   312,   274,   336,
     338,    81,    82,    83,    84,   307,   317,    85,    86,   324,
     325,   341,   348,   194,   195,   196,   197,   198,   199,   200,
     201,   202,   203,   139,   326,   342,   343,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,   289,    87,    88,
      89,   290,    90,    91,    92,    93,    94,    95,    96,    97,
      98,   292,   291,   158,   310,   293,    99,   100,   101,   102,
     103,   104,    81,    82,    83,    84,   204,   153,    85,    86,
     149,   105,    53,   106,   245,   254,   306,    62,     0,   229,
       0,     0,     0,     0,     0,     0,     0,     0,     2,     3,
       4,     5,     6,     7,     8,     9,    10,    11,    12,    13,
      14,    15,    16,    17,    18,    19,    20,    21,     0,    87,
      88,    89,     0,    90,    91,    92,    93,    94,    95,    96,
      97,    98,     0,   137,     0,     0,     0,    99,   100,   101,
     102,   103,   104,    81,    82,    83,    84,     0,     0,    85,
      86,     0,   105,    53,   228,     0,     0,     0,     0,     2,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,    18,    19,    20,    21,    81,
      82,    83,    84,     0,     0,    85,    86,     0,     0,     0,
      87,    88,    89,   138,    90,    91,    92,    93,    94,    95,
      96,    97,    98,     0,     0,     0,     0,     0,    99,   100,
     101,   102,   103,   104,   144,    82,    83,    84,     0,     0,
      85,    86,     0,   105,    53,   230,    87,    88,    89,     0,
      90,    91,    92,    93,    94,    95,    96,    97,    98,     0,
       0,     0,     0,     0,    99,   100,   101,   102,   103,   104,
      81,    82,    83,    84,     0,     0,    85,    86,     0,   105,
      53,   296,     0,     0,     0,     0,     0,     0,   144,    82,
      83,    84,     0,    98,    85,    86,     0,     0,     0,    99,
     100,   101,   102,   103,   104,   144,    82,    83,    84,     0,
       0,    85,    86,     0,     0,   154,   331,    87,    88,    89,
       0,    90,    91,    92,    93,    94,    95,    96,    97,    98,
       0,     0,     0,     0,     0,    99,   100,   101,   102,   103,
     104,     0,   144,    82,    83,    84,     0,    98,    85,    86,
     105,    53,     0,    99,   100,   101,   102,   103,   104,     0,
       0,     0,     0,     0,    98,     0,     0,     0,     0,   154,
      99,   100,   101,   102,   103,   104,     0,     0,     0,     0,
       0,     0,     0,     0,     0,   183,     0,     0,     0,     0,
       0,   144,    82,    83,    84,     0,     0,    85,    86,     0,
       0,    98,     0,     0,     0,     0,     0,    99,   100,   101,
     102,   103,   104,   144,    82,    83,    84,     2,     0,    85,
      86,     0,   105,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,   144,    82,    83,
      84,     0,     0,    85,    86,     0,     0,     0,     0,     0,
      98,     0,     0,     0,     0,     0,    99,   100,   101,   102,
     103,   104,   144,    82,    83,    84,     0,     0,    85,    86,
       0,     0,    98,     0,     0,   145,     0,     0,    99,   100,
     101,   102,   103,   104,   144,    82,    83,    84,     0,     0,
      85,    86,     0,     0,     0,     0,    98,   270,     0,     0,
       0,     0,    99,   100,   101,   102,   103,   104,   144,    82,
      83,    84,     0,     0,    85,    86,     0,     0,     0,     0,
       0,    98,     0,     0,   300,     0,     0,    99,   100,   101,
     102,   103,   104,   144,    82,    83,    84,     0,     0,    85,
      86,     0,     0,    98,     0,     0,   329,     0,     0,    99,
     100,   101,   102,   103,   104,   144,    82,    83,    84,     0,
       0,    85,    86,     0,     0,     0,     0,    98,   337,     0,
       0,     0,     0,    99,   100,   101,   102,   103,   104,   144,
      82,    83,    84,     0,     0,    85,    86,     0,     0,     0,
       0,     0,   168,     0,     0,     0,     0,     0,    99,   100,
     101,   102,   103,   104,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,   170,     0,     0,     0,     0,     0,
      99,   100,   101,   102,   103,   104,    61,     0,     0,     1,
       0,     0,     0,     0,     0,     0,     0,     0,    98,     0,
       0,     0,     0,     0,    99,   100,   101,   102,   103,   104,
       0,     0,     0,     0,     0,     2,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    15,    16,
      17,    18,    19,    20,    21,     1,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,    22,     0,
       0,     0,     0,     0,     0,    23,     0,     0,     0,     0,
       0,     2,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    15,    16,    17,    18,    19,    20,
      21,     1,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,   232,   297,   233,     0,     0,     0,
       0,    23,     0,     0,     0,     0,     0,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
      22,     0,     2,     0,     0,     0,     0,    23,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,    18,    19,
      20,    21,     2,     0,     0,     0,     0,     0,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,    18,    19,
      20,    21,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     2,     0,     0,     0,     0,   160,     8,
       9,    10,    11,    12,    13,    14,    15,    16,    17,    18,
      19,    20,    21,     0,     0,     0,     0,     0,   248,     2,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,    18,    19,    20,    21,     2,
       3,     4,     5,     6,     7,     8,     9,    10,    11,    12,
      13,    14,    15,    16,    17,    18,    19,    20,    21,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,    72,     0,    53,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
       0,     0,     0,     0,    53,     2,     3,     4,     5,     6,
       7,     8,     9,    10,    11,    12,    13,    14,    15,    16,
      17,    18,    19,    20,    21,     0,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,   265,   297,
     233,     0,     0,     0,     0,    23,     2,     3,     4,     5,
       6,     7,     8,     9,    10,    11,    12,    13,    14,    15,
      16,    17,    18,    19,    20,    21,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,     0,
     327,     2,     3,     4,     5,     6,     7,     8,     9,    10,
      11,    12,    13,    14,    15,    16,    17,    18,    19,    20,
      21,   305,     2,     3,     4,     5,     6,     7,     8,     9,
      10,    11,    12,    13,    14,    15,    16,    17,    18,    19,
      20,    21
};

static const yytype_int16 yycheck[] =
{
       0,    58,    72,   154,    59,    34,     0,   179,    84,    22,
       3,    59,    25,     3,     3,    67,    77,     3,    92,   110,
      23,   139,     3,    18,    51,    67,    26,    27,     3,    81,
     235,    31,    87,    87,     3,    35,    84,    85,    86,    87,
      43,    35,    55,    85,    63,     3,    13,    14,    75,    76,
      77,    67,    76,    80,    84,   129,    80,    70,    58,    97,
      98,   266,   110,    57,    82,    62,    79,    64,   186,    85,
      23,    98,    69,    62,    98,    64,    62,    62,    64,    64,
      74,    62,    81,    69,   154,    80,    47,    62,    69,   261,
      43,    84,    53,   167,    84,   150,   150,   158,    51,    67,
     174,    67,   150,    62,    62,    64,    62,   162,   162,    76,
      77,    69,    67,    62,   162,    83,   207,   208,   209,    85,
      62,   191,    75,    76,    77,    83,   139,    80,    83,     3,
     168,   158,   170,    67,   128,   205,   139,   175,   176,   177,
      81,   168,    67,    63,   168,    98,    69,    67,    62,    83,
      64,    74,    75,    62,   192,   229,   226,   308,    83,   207,
     208,   209,   210,   211,   212,   213,   214,   215,   216,   217,
     218,   219,   220,   221,   222,   223,   224,   268,   233,   233,
       3,   255,    63,   186,    32,   233,    67,   225,    62,     8,
       9,    10,    43,    44,    83,    69,    63,   252,   252,    47,
      67,    65,    68,    67,   252,   158,   235,    81,    63,    57,
      63,    83,    67,    63,    67,   168,    78,    67,    69,   232,
     268,    63,    79,    63,    17,    67,    74,    67,    82,   232,
      11,    12,   232,    70,    71,    15,    16,   250,   308,   239,
     314,   315,   316,    62,    65,    64,   303,    66,    63,   304,
     304,   321,   214,   215,   216,   217,   304,    67,   210,   211,
      55,    81,   265,   337,    81,   265,   212,   213,   323,   343,
     218,   219,   346,    63,    83,   323,     3,    63,     3,   317,
     318,     3,     4,     5,     6,     3,    62,     9,    10,    63,
      63,    63,    83,    19,    20,    21,    22,    23,    24,    25,
      26,    27,    28,   303,    65,    65,    53,    29,    30,    31,
      32,    33,    34,    35,    36,    37,    38,    39,    40,    41,
      42,    43,    44,    45,    46,    47,    48,   220,    50,    51,
      52,   221,    54,    55,    56,    57,    58,    59,    60,    61,
      62,   223,   222,    75,   250,   224,    68,    69,    70,    71,
      72,    73,     3,     4,     5,     6,    82,    70,     9,    10,
      63,    83,    84,    85,   151,   168,   239,    35,    -1,   128,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    29,    30,
      31,    32,    33,    34,    35,    36,    37,    38,    39,    40,
      41,    42,    43,    44,    45,    46,    47,    48,    -1,    50,
      51,    52,    -1,    54,    55,    56,    57,    58,    59,    60,
      61,    62,    -1,     3,    -1,    -1,    -1,    68,    69,    70,
      71,    72,    73,     3,     4,     5,     6,    -1,    -1,     9,
      10,    -1,    83,    84,    85,    -1,    -1,    -1,    -1,    29,
      30,    31,    32,    33,    34,    35,    36,    37,    38,    39,
      40,    41,    42,    43,    44,    45,    46,    47,    48,     3,
       4,     5,     6,    -1,    -1,     9,    10,    -1,    -1,    -1,
      50,    51,    52,    63,    54,    55,    56,    57,    58,    59,
      60,    61,    62,    -1,    -1,    -1,    -1,    -1,    68,    69,
      70,    71,    72,    73,     3,     4,     5,     6,    -1,    -1,
       9,    10,    -1,    83,    84,    85,    50,    51,    52,    -1,
      54,    55,    56,    57,    58,    59,    60,    61,    62,    -1,
      -1,    -1,    -1,    -1,    68,    69,    70,    71,    72,    73,
       3,     4,     5,     6,    -1,    -1,     9,    10,    -1,    83,
      84,    85,    -1,    -1,    -1,    -1,    -1,    -1,     3,     4,
       5,     6,    -1,    62,     9,    10,    -1,    -1,    -1,    68,
      69,    70,    71,    72,    73,     3,     4,     5,     6,    -1,
      -1,     9,    10,    -1,    -1,    84,    85,    50,    51,    52,
      -1,    54,    55,    56,    57,    58,    59,    60,    61,    62,
      -1,    -1,    -1,    -1,    -1,    68,    69,    70,    71,    72,
      73,    -1,     3,     4,     5,     6,    -1,    62,     9,    10,
      83,    84,    -1,    68,    69,    70,    71,    72,    73,    -1,
      -1,    -1,    -1,    -1,    62,    -1,    -1,    -1,    -1,    84,
      68,    69,    70,    71,    72,    73,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    83,    -1,    -1,    -1,    -1,
      -1,     3,     4,     5,     6,    -1,    -1,     9,    10,    -1,
      -1,    62,    -1,    -1,    -1,    -1,    -1,    68,    69,    70,
      71,    72,    73,     3,     4,     5,     6,    29,    -1,     9,
      10,    -1,    83,    35,    36,    37,    38,    39,    40,    41,
      42,    43,    44,    45,    46,    47,    48,     3,     4,     5,
       6,    -1,    -1,     9,    10,    -1,    -1,    -1,    -1,    -1,
      62,    -1,    -1,    -1,    -1,    -1,    68,    69,    70,    71,
      72,    73,     3,     4,     5,     6,    -1,    -1,     9,    10,
      -1,    -1,    62,    -1,    -1,    65,    -1,    -1,    68,    69,
      70,    71,    72,    73,     3,     4,     5,     6,    -1,    -1,
       9,    10,    -1,    -1,    -1,    -1,    62,    63,    -1,    -1,
      -1,    -1,    68,    69,    70,    71,    72,    73,     3,     4,
       5,     6,    -1,    -1,     9,    10,    -1,    -1,    -1,    -1,
      -1,    62,    -1,    -1,    65,    -1,    -1,    68,    69,    70,
      71,    72,    73,     3,     4,     5,     6,    -1,    -1,     9,
      10,    -1,    -1,    62,    -1,    -1,    65,    -1,    -1,    68,
      69,    70,    71,    72,    73,     3,     4,     5,     6,    -1,
      -1,     9,    10,    -1,    -1,    -1,    -1,    62,    63,    -1,
      -1,    -1,    -1,    68,    69,    70,    71,    72,    73,     3,
       4,     5,     6,    -1,    -1,     9,    10,    -1,    -1,    -1,
      -1,    -1,    62,    -1,    -1,    -1,    -1,    -1,    68,    69,
      70,    71,    72,    73,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    62,    -1,    -1,    -1,    -1,    -1,
      68,    69,    70,    71,    72,    73,     0,    -1,    -1,     3,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    62,    -1,
      -1,    -1,    -1,    -1,    68,    69,    70,    71,    72,    73,
      -1,    -1,    -1,    -1,    -1,    29,    30,    31,    32,    33,
      34,    35,    36,    37,    38,    39,    40,    41,    42,    43,
      44,    45,    46,    47,    48,     3,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    62,    -1,
      -1,    -1,    -1,    -1,    -1,    69,    -1,    -1,    -1,    -1,
      -1,    29,    30,    31,    32,    33,    34,    35,    36,    37,
      38,    39,    40,    41,    42,    43,    44,    45,    46,    47,
      48,     3,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    62,    63,    64,    -1,    -1,    -1,
      -1,    69,    -1,    -1,    -1,    -1,    -1,    29,    30,    31,
      32,    33,    34,    35,    36,    37,    38,    39,    40,    41,
      42,    43,    44,    45,    46,    47,    48,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      62,    -1,    29,    -1,    -1,    -1,    -1,    69,    35,    36,
      37,    38,    39,    40,    41,    42,    43,    44,    45,    46,
      47,    48,    29,    -1,    -1,    -1,    -1,    -1,    35,    36,
      37,    38,    39,    40,    41,    42,    43,    44,    45,    46,
      47,    48,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    29,    -1,    -1,    -1,    -1,    85,    35,
      36,    37,    38,    39,    40,    41,    42,    43,    44,    45,
      46,    47,    48,    -1,    -1,    -1,    -1,    -1,    85,    29,
      30,    31,    32,    33,    34,    35,    36,    37,    38,    39,
      40,    41,    42,    43,    44,    45,    46,    47,    48,    29,
      30,    31,    32,    33,    34,    35,    36,    37,    38,    39,
      40,    41,    42,    43,    44,    45,    46,    47,    48,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    82,    -1,    84,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    84,    29,    30,    31,    32,    33,
      34,    35,    36,    37,    38,    39,    40,    41,    42,    43,
      44,    45,    46,    47,    48,    -1,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    62,    63,
      64,    -1,    -1,    -1,    -1,    69,    29,    30,    31,    32,
      33,    34,    35,    36,    37,    38,    39,    40,    41,    42,
      43,    44,    45,    46,    47,    48,    -1,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      63,    29,    30,    31,    32,    33,    34,    35,    36,    37,
      38,    39,    40,    41,    42,    43,    44,    45,    46,    47,
      48,    49,    29,    30,    31,    32,    33,    34,    35,    36,
      37,    38,    39,    40,    41,    42,    43,    44,    45,    46,
      47,    48
};

/* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
   symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,     3,    29,    30,    31,    32,    33,    34,    35,    36,
      37,    38,    39,    40,    41,    42,    43,    44,    45,    46,
      47,    48,    62,    69,   108,   109,   112,   113,   114,   115,
     121,   124,   125,   126,   127,   147,   148,   149,     3,    84,
     125,   124,   127,   128,    83,   110,   111,   125,   109,   109,
       3,    84,   109,    84,   108,   109,   140,   141,    62,    64,
     126,     0,   148,    84,     3,   122,   123,    63,   124,   127,
      67,    83,    82,   140,   141,    84,   113,   116,   117,   118,
     124,     3,     4,     5,     6,     9,    10,    50,    51,    52,
      54,    55,    56,    57,    58,    59,    60,    61,    62,    68,
      69,    70,    71,    72,    73,    83,    85,    87,    88,    90,
      91,    92,    93,    94,    95,    96,    97,    98,    99,   100,
     101,   102,   103,   104,   106,   138,   139,   140,   141,   142,
     143,   144,   145,   146,   125,   108,   140,     3,    63,   109,
     129,   130,   131,   132,     3,    65,    90,   103,   107,   122,
      82,    67,    85,   111,    84,   104,   136,   140,   116,   118,
      85,   117,    81,   119,   120,   125,   118,    81,    62,    90,
      62,    90,    90,   107,    81,    62,    62,    62,   138,    62,
       3,    83,    83,    83,   106,   106,   118,   133,     8,     9,
      10,    62,    64,    66,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    82,   105,    92,    69,    74,    75,
      70,    71,    11,    12,    13,    14,    76,    77,    15,    16,
      68,    78,    79,    17,    18,    80,    67,    83,    85,   142,
      85,   138,    62,    64,   125,   127,   134,   135,    63,    67,
      63,    67,    65,    85,   107,   123,   136,   137,    85,   107,
      67,    83,    81,   138,   133,    81,   138,   106,   106,   106,
      55,   143,    83,    83,    63,    62,   127,   134,    63,     3,
      63,    89,   104,   106,     3,   104,    92,    92,    92,    93,
      93,    94,    94,    95,    95,    95,    95,    96,    96,    97,
      98,    99,   100,   101,   106,   104,    85,    63,   129,   134,
      65,   107,   135,    62,    64,    49,   131,     3,    67,    85,
     120,   107,    63,   138,    63,    63,    63,    62,   143,    92,
      63,    67,    65,    81,    63,    63,    65,    63,   129,    65,
     107,    85,   136,   138,   138,   138,   106,    63,   106,   104,
     103,    63,    65,    53,    63,   138,    63,   138,    83,   138
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
#line 17 "HeLXparser.y"
    {;}
    break;

  case 3:
#line 18 "HeLXparser.y"
    {;}
    break;

  case 4:
#line 19 "HeLXparser.y"
    {;}
    break;

  case 5:
#line 20 "HeLXparser.y"
    {;}
    break;

  case 6:
#line 24 "HeLXparser.y"
    {;}
    break;

  case 7:
#line 25 "HeLXparser.y"
    {;}
    break;

  case 8:
#line 26 "HeLXparser.y"
    {;}
    break;

  case 9:
#line 27 "HeLXparser.y"
    {;}
    break;

  case 10:
#line 28 "HeLXparser.y"
    {;}
    break;

  case 11:
#line 29 "HeLXparser.y"
    {;}
    break;

  case 12:
#line 30 "HeLXparser.y"
    {;}
    break;

  case 13:
#line 31 "HeLXparser.y"
    {;}
    break;

  case 14:
#line 35 "HeLXparser.y"
    {;}
    break;

  case 15:
#line 36 "HeLXparser.y"
    {;}
    break;

  case 16:
#line 40 "HeLXparser.y"
    {;}
    break;

  case 17:
#line 41 "HeLXparser.y"
    {;}
    break;

  case 18:
#line 42 "HeLXparser.y"
    {;}
    break;

  case 19:
#line 43 "HeLXparser.y"
    {;}
    break;

  case 20:
#line 44 "HeLXparser.y"
    {;}
    break;

  case 21:
#line 45 "HeLXparser.y"
    {;}
    break;

  case 22:
#line 49 "HeLXparser.y"
    {;}
    break;

  case 23:
#line 50 "HeLXparser.y"
    {;}
    break;

  case 24:
#line 51 "HeLXparser.y"
    {;}
    break;

  case 25:
#line 52 "HeLXparser.y"
    {;}
    break;

  case 26:
#line 53 "HeLXparser.y"
    {;}
    break;

  case 27:
#line 54 "HeLXparser.y"
    {;}
    break;

  case 28:
#line 58 "HeLXparser.y"
    {;}
    break;

  case 29:
#line 59 "HeLXparser.y"
    {;}
    break;

  case 30:
#line 63 "HeLXparser.y"
    {;}
    break;

  case 31:
#line 64 "HeLXparser.y"
    {;}
    break;

  case 32:
#line 65 "HeLXparser.y"
    {;}
    break;

  case 33:
#line 66 "HeLXparser.y"
    {;}
    break;

  case 34:
#line 70 "HeLXparser.y"
    {;}
    break;

  case 35:
#line 71 "HeLXparser.y"
    {;}
    break;

  case 36:
#line 72 "HeLXparser.y"
    {;}
    break;

  case 37:
#line 76 "HeLXparser.y"
    {;}
    break;

  case 38:
#line 77 "HeLXparser.y"
    {;}
    break;

  case 39:
#line 78 "HeLXparser.y"
    {;}
    break;

  case 40:
#line 82 "HeLXparser.y"
    {;}
    break;

  case 41:
#line 83 "HeLXparser.y"
    {;}
    break;

  case 42:
#line 84 "HeLXparser.y"
    {;}
    break;

  case 43:
#line 85 "HeLXparser.y"
    {;}
    break;

  case 44:
#line 86 "HeLXparser.y"
    {;}
    break;

  case 45:
#line 90 "HeLXparser.y"
    {;}
    break;

  case 46:
#line 91 "HeLXparser.y"
    {;}
    break;

  case 47:
#line 92 "HeLXparser.y"
    {;}
    break;

  case 48:
#line 96 "HeLXparser.y"
    {;}
    break;

  case 49:
#line 97 "HeLXparser.y"
    {;}
    break;

  case 50:
#line 101 "HeLXparser.y"
    {;}
    break;

  case 51:
#line 102 "HeLXparser.y"
    {;}
    break;

  case 52:
#line 106 "HeLXparser.y"
    {;}
    break;

  case 53:
#line 107 "HeLXparser.y"
    {;}
    break;

  case 54:
#line 111 "HeLXparser.y"
    {;}
    break;

  case 55:
#line 112 "HeLXparser.y"
    {;}
    break;

  case 56:
#line 116 "HeLXparser.y"
    {;}
    break;

  case 57:
#line 117 "HeLXparser.y"
    {;}
    break;

  case 58:
#line 121 "HeLXparser.y"
    {;}
    break;

  case 59:
#line 122 "HeLXparser.y"
    {;}
    break;

  case 60:
#line 126 "HeLXparser.y"
    {;}
    break;

  case 61:
#line 127 "HeLXparser.y"
    {;}
    break;

  case 62:
#line 131 "HeLXparser.y"
    {;}
    break;

  case 63:
#line 132 "HeLXparser.y"
    {;}
    break;

  case 64:
#line 133 "HeLXparser.y"
    {;}
    break;

  case 65:
#line 134 "HeLXparser.y"
    {;}
    break;

  case 66:
#line 135 "HeLXparser.y"
    {;}
    break;

  case 67:
#line 136 "HeLXparser.y"
    {;}
    break;

  case 68:
#line 137 "HeLXparser.y"
    {;}
    break;

  case 69:
#line 138 "HeLXparser.y"
    {;}
    break;

  case 70:
#line 139 "HeLXparser.y"
    {;}
    break;

  case 71:
#line 140 "HeLXparser.y"
    {;}
    break;

  case 72:
#line 141 "HeLXparser.y"
    {;}
    break;

  case 73:
#line 145 "HeLXparser.y"
    {;}
    break;

  case 74:
#line 146 "HeLXparser.y"
    {;}
    break;

  case 75:
#line 150 "HeLXparser.y"
    {;}
    break;

  case 76:
#line 154 "HeLXparser.y"
    {;}
    break;

  case 77:
#line 155 "HeLXparser.y"
    {;}
    break;

  case 78:
#line 159 "HeLXparser.y"
    {;}
    break;

  case 79:
#line 160 "HeLXparser.y"
    {;}
    break;

  case 80:
#line 161 "HeLXparser.y"
    {;}
    break;

  case 81:
#line 162 "HeLXparser.y"
    {;}
    break;

  case 82:
#line 163 "HeLXparser.y"
    {;}
    break;

  case 83:
#line 164 "HeLXparser.y"
    {;}
    break;

  case 84:
#line 168 "HeLXparser.y"
    {;}
    break;

  case 85:
#line 169 "HeLXparser.y"
    {;}
    break;

  case 86:
#line 173 "HeLXparser.y"
    {;}
    break;

  case 87:
#line 174 "HeLXparser.y"
    {;}
    break;

  case 88:
#line 178 "HeLXparser.y"
    {;}
    break;

  case 89:
#line 179 "HeLXparser.y"
    {;}
    break;

  case 90:
#line 180 "HeLXparser.y"
    {;}
    break;

  case 91:
#line 181 "HeLXparser.y"
    {;}
    break;

  case 92:
#line 182 "HeLXparser.y"
    {;}
    break;

  case 93:
#line 186 "HeLXparser.y"
    {;}
    break;

  case 94:
#line 187 "HeLXparser.y"
    {;}
    break;

  case 95:
#line 188 "HeLXparser.y"
    {;}
    break;

  case 96:
#line 189 "HeLXparser.y"
    {;}
    break;

  case 97:
#line 190 "HeLXparser.y"
    {;}
    break;

  case 98:
#line 191 "HeLXparser.y"
    {;}
    break;

  case 99:
#line 192 "HeLXparser.y"
    {;}
    break;

  case 100:
#line 193 "HeLXparser.y"
    {;}
    break;

  case 101:
#line 194 "HeLXparser.y"
    {;}
    break;

  case 102:
#line 195 "HeLXparser.y"
    {;}
    break;

  case 103:
#line 196 "HeLXparser.y"
    {;}
    break;

  case 104:
#line 197 "HeLXparser.y"
    {;}
    break;

  case 105:
#line 201 "HeLXparser.y"
    {;}
    break;

  case 106:
#line 202 "HeLXparser.y"
    {;}
    break;

  case 107:
#line 203 "HeLXparser.y"
    {;}
    break;

  case 108:
#line 207 "HeLXparser.y"
    {;}
    break;

  case 109:
#line 208 "HeLXparser.y"
    {;}
    break;

  case 110:
#line 212 "HeLXparser.y"
    {;}
    break;

  case 111:
#line 213 "HeLXparser.y"
    {;}
    break;

  case 112:
#line 217 "HeLXparser.y"
    {;}
    break;

  case 114:
#line 222 "HeLXparser.y"
    {;}
    break;

  case 115:
#line 223 "HeLXparser.y"
    {;}
    break;

  case 116:
#line 224 "HeLXparser.y"
    {;}
    break;

  case 117:
#line 228 "HeLXparser.y"
    {;}
    break;

  case 118:
#line 229 "HeLXparser.y"
    {;}
    break;

  case 119:
#line 233 "HeLXparser.y"
    {;}
    break;

  case 120:
#line 234 "HeLXparser.y"
    {;}
    break;

  case 121:
#line 235 "HeLXparser.y"
    {;}
    break;

  case 122:
#line 239 "HeLXparser.y"
    {;}
    break;

  case 123:
#line 240 "HeLXparser.y"
    {;}
    break;

  case 124:
#line 241 "HeLXparser.y"
    {;}
    break;

  case 125:
#line 245 "HeLXparser.y"
    {;}
    break;

  case 126:
#line 246 "HeLXparser.y"
    {;}
    break;

  case 127:
#line 250 "HeLXparser.y"
    {;}
    break;

  case 128:
#line 251 "HeLXparser.y"
    {;}
    break;

  case 129:
#line 255 "HeLXparser.y"
    {;}
    break;

  case 130:
#line 256 "HeLXparser.y"
    {;}
    break;

  case 131:
#line 260 "HeLXparser.y"
    {;}
    break;

  case 132:
#line 261 "HeLXparser.y"
    {;}
    break;

  case 133:
#line 265 "HeLXparser.y"
    {;}
    break;

  case 134:
#line 266 "HeLXparser.y"
    {;}
    break;

  case 135:
#line 267 "HeLXparser.y"
    {;}
    break;

  case 136:
#line 268 "HeLXparser.y"
    {;}
    break;

  case 137:
#line 269 "HeLXparser.y"
    {;}
    break;

  case 138:
#line 270 "HeLXparser.y"
    {;}
    break;

  case 139:
#line 271 "HeLXparser.y"
    {;}
    break;

  case 140:
#line 275 "HeLXparser.y"
    {;}
    break;

  case 141:
#line 276 "HeLXparser.y"
    {;}
    break;

  case 142:
#line 277 "HeLXparser.y"
    {;}
    break;

  case 143:
#line 278 "HeLXparser.y"
    {;}
    break;

  case 144:
#line 282 "HeLXparser.y"
    {;}
    break;

  case 145:
#line 283 "HeLXparser.y"
    {;}
    break;

  case 146:
#line 288 "HeLXparser.y"
    {;}
    break;

  case 147:
#line 289 "HeLXparser.y"
    {;}
    break;

  case 148:
#line 293 "HeLXparser.y"
    {;}
    break;

  case 149:
#line 294 "HeLXparser.y"
    {;}
    break;

  case 150:
#line 298 "HeLXparser.y"
    {;}
    break;

  case 151:
#line 299 "HeLXparser.y"
    {;}
    break;

  case 152:
#line 300 "HeLXparser.y"
    {;}
    break;

  case 153:
#line 304 "HeLXparser.y"
    {;}
    break;

  case 154:
#line 305 "HeLXparser.y"
    {;}
    break;

  case 155:
#line 309 "HeLXparser.y"
    {;}
    break;

  case 156:
#line 310 "HeLXparser.y"
    {;}
    break;

  case 157:
#line 314 "HeLXparser.y"
    {;}
    break;

  case 158:
#line 315 "HeLXparser.y"
    {;}
    break;

  case 159:
#line 316 "HeLXparser.y"
    {;}
    break;

  case 160:
#line 320 "HeLXparser.y"
    {;}
    break;

  case 161:
#line 321 "HeLXparser.y"
    {;}
    break;

  case 162:
#line 322 "HeLXparser.y"
    {;}
    break;

  case 163:
#line 323 "HeLXparser.y"
    {;}
    break;

  case 164:
#line 324 "HeLXparser.y"
    {;}
    break;

  case 165:
#line 325 "HeLXparser.y"
    {;}
    break;

  case 166:
#line 326 "HeLXparser.y"
    {;}
    break;

  case 167:
#line 327 "HeLXparser.y"
    {;}
    break;

  case 168:
#line 328 "HeLXparser.y"
    {;}
    break;

  case 169:
#line 332 "HeLXparser.y"
    {;}
    break;

  case 170:
#line 333 "HeLXparser.y"
    {;}
    break;

  case 171:
#line 334 "HeLXparser.y"
    {;}
    break;

  case 172:
#line 338 "HeLXparser.y"
    {;}
    break;

  case 173:
#line 339 "HeLXparser.y"
    {;}
    break;

  case 174:
#line 343 "HeLXparser.y"
    {;}
    break;

  case 175:
#line 344 "HeLXparser.y"
    {;}
    break;

  case 176:
#line 345 "HeLXparser.y"
    {;}
    break;

  case 177:
#line 346 "HeLXparser.y"
    {;}
    break;

  case 178:
#line 347 "HeLXparser.y"
    {;}
    break;

  case 179:
#line 348 "HeLXparser.y"
    {;}
    break;

  case 180:
#line 352 "HeLXparser.y"
    {;}
    break;

  case 181:
#line 353 "HeLXparser.y"
    {;}
    break;

  case 182:
#line 354 "HeLXparser.y"
    {;}
    break;

  case 183:
#line 358 "HeLXparser.y"
    {;}
    break;

  case 184:
#line 359 "HeLXparser.y"
    {;}
    break;

  case 185:
#line 360 "HeLXparser.y"
    {;}
    break;

  case 186:
#line 361 "HeLXparser.y"
    {;}
    break;

  case 187:
#line 365 "HeLXparser.y"
    {;}
    break;

  case 188:
#line 366 "HeLXparser.y"
    {;}
    break;

  case 189:
#line 370 "HeLXparser.y"
    {;}
    break;

  case 190:
#line 371 "HeLXparser.y"
    {;}
    break;

  case 191:
#line 375 "HeLXparser.y"
    {;}
    break;

  case 192:
#line 376 "HeLXparser.y"
    {;}
    break;

  case 193:
#line 380 "HeLXparser.y"
    {;}
    break;

  case 194:
#line 381 "HeLXparser.y"
    {;}
    break;

  case 195:
#line 382 "HeLXparser.y"
    {;}
    break;

  case 196:
#line 386 "HeLXparser.y"
    {;}
    break;

  case 197:
#line 387 "HeLXparser.y"
    {;}
    break;

  case 198:
#line 388 "HeLXparser.y"
    {;}
    break;

  case 199:
#line 389 "HeLXparser.y"
    {;}
    break;

  case 200:
#line 393 "HeLXparser.y"
    {;}
    break;

  case 201:
#line 394 "HeLXparser.y"
    {;}
    break;

  case 202:
#line 395 "HeLXparser.y"
    {;}
    break;

  case 203:
#line 396 "HeLXparser.y"
    {;}
    break;

  case 204:
#line 397 "HeLXparser.y"
    {;}
    break;

  case 205:
#line 401 "HeLXparser.y"
    {;}
    break;

  case 206:
#line 402 "HeLXparser.y"
    {;}
    break;

  case 207:
#line 406 "HeLXparser.y"
    {;}
    break;

  case 208:
#line 407 "HeLXparser.y"
    {;}
    break;

  case 209:
#line 411 "HeLXparser.y"
    {;}
    break;

  case 210:
#line 412 "HeLXparser.y"
    {;}
    break;

  case 211:
#line 413 "HeLXparser.y"
    {;}
    break;

  case 212:
#line 414 "HeLXparser.y"
    {;}
    break;


/* Line 1267 of yacc.c.  */
#line 3030 "y.tab.c"
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


#line 417 "HeLXparser.y"

#include <stdio.h>

extern char yytext[];
extern int column;

yyerror(s)
char *s;
{
	fflush(stdout);
	printf("\n%*s\n%*s\n", column, "^", column, s);
}

int main(){
	return yyparse();
}

