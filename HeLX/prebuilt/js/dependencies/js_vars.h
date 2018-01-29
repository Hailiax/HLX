#include "hashmap.h"

map_t varMap;
#define KEY_MAX_LENGTH (256)
#define KEY_COUNT (4*4)
typedef struct variable {
    char name[KEY_MAX_LENGTH];
    char type; // 1: public; 2: private; 3: constant public; 4: constant private
} variable;

typedef struct llnode {
	char* val;
	struct llnode* next;
} llnode;

extern llnode* llcat(llnode* a, llnode* b);

char* end_scope(llnode *vars, llnode *exclude);
char* var_declare(char *name, llnode **vars, char type);
char* var_access(char *name);
char* var_clean(char *rawName);