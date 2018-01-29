#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "js_vars.h"
#include "js_common.h"

llnode* llcat(llnode *a, llnode *b){
	if (a == 0) return b;
	llnode* start = a;
	while (a->next != NULL)
		a = a->next;
	a->next = b;
	return start;
}

char* end_scope(llnode *vars, llnode *exclude){
	if (vars == 0) return "";
	char* out = "let ";
	char varName[KEY_MAX_LENGTH];
	if (exclude == 0) goto rem;

	llnode* tmp = malloc(sizeof(llnode));
	tmp->val = 0;
	tmp->next = vars;
	vars = tmp;
	llnode* previous = vars;
	llnode* vars_ = vars->next;
	llnode* exclude_ = exclude;

clean:
	if (strcmp(vars_->val, exclude_->val) == 0){
		llnode* tmp = vars_;
		if (vars_->next != NULL){
			previous->next = vars_->next;
			vars_ = vars_->next;
		} else{
			previous->next = NULL;
			goto rem;
		}
		free(tmp);
		exclude_ = exclude;
		goto clean;
	}
	if (exclude_->next != NULL){
		exclude_ = exclude_->next;
		goto clean;
	}

	if (vars_->next != NULL){
		vars_ = vars_->next;
		previous = previous->next;
		exclude_ = exclude;
		goto clean;
	}

rem:
	if (vars->val != NULL){
		out = cat(out, vars->val);
		snprintf( varName, KEY_MAX_LENGTH, "%s", vars->val );
		hashmap_remove( varMap, varName );
		if (vars->next != NULL){
			out = cat(out,",");
			vars = vars->next;
			goto rem;
		}
	} else if (vars->next != NULL){
		vars = vars->next;
		goto rem;
	}

	if (strlen(out) != 4){
		return cat(out,";");
	} else{
		return "";
	}
}

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

char* var_declare(char *rawName, llnode **vars, char type){
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

		if (type == 2){
			return "this.";
		} else{
			llnode* tmp = malloc(sizeof(llnode));
			tmp->val = name;
			tmp->next = *vars;
			*vars = tmp;
		}
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