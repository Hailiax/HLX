#include "hashmap.h"

map_t varMap;
#define KEY_COUNT (4*4)
typedef struct variable {
    char* name;
    char type; // 1: public; 2: constant
} variable;

typedef struct llnode {
	char* val;
	struct llnode* next;
} llnode;

typedef struct ilnode {
	int val;
	struct ilnode* next;
} ilnode;
extern ilnode* sig_tabs;

extern llnode* llcat(llnode* a, llnode* b);

char* end_scope(llnode *vars, llnode *exclude);
char* var_declare(char *name, llnode **vars, char type);
char* var_access(char *name);
char* var_clean(char *rawName);