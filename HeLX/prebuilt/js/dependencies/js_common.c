// Todo: Multi character strings, backwards ranges
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "js_common.h"

char* cat(char *a, char *b){
	char *c = (char *) malloc(1 +sizeof(char*) * (strlen(a)+ strlen(b)));
	strcpy(c, a);
	strcat(c, b);
	return c;
}