// Todo: Multi character strings, backwards ranges
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "genrange.h"
#include "common.h"

char* genrange_dc(char *a, char *z){
	double A = atof(a);
	double Z = atof(z);
	int n;
	if ( strlen(a) > strlen(z) ){
		n = strlen(a)+1;
	} else{
		n = strlen(z)+1;
	}
	char buffer[n];
	char* out = "";
	if ( A < Z ){
		for ( double i = A; i <= Z; i++ ){
			snprintf(buffer, n, "%f", i);
			out = cat(out,cat(cat("$v(",buffer),"),"));
		}
	} else{
		for ( double i = Z; i >= A; i-- ){
			snprintf(buffer, n, "%f", i);
			out = cat(out,cat(cat("$v(",buffer),"),"));
		}
	}
	int len = strlen(out);
	memmove(out, out, len-1);
	out[len-1] = 0;
	return out;
}

char* genrange_da(char *a, char *b, char *z){
	double A = atof(a);
	double B = atof(b);
	double Z = atof(z);
	int n;
	if ( strlen(a) > strlen(z) ){
		n = strlen(a)+1;
	} else{
		n = strlen(z)+1;
	}
	char buffer[n];
	char* out = "";
	if ( A < B ){
		double delta = B - A;
		for ( double i = A; i <= Z; i+=delta ){
			snprintf(buffer, n, "%f", i);
			out = cat(out,cat(cat("$v(",buffer),"),"));
		}
	} else{
		double delta = A - B;
		for ( double i = A; i >= Z; i-=delta ){
			snprintf(buffer, n, "%f", i);
			out = cat(out,cat(cat("$v(",buffer),"),"));
		}
	}
	int len = strlen(out);
	memmove(out, out, len-1);
	out[len-1] = 0;
	return out;
}

char* genrange_sc(char *t, char *a, char *z){
	char* out = "";
	char* template = cat(cat(cat(cat("$v(",t),"%c"),t),"),");
	int a_len = strlen(a);
	int z_len = strlen(z);
	int n;
	if ( a_len > z_len ){
		n = a_len+6;
	} else{
		n = z_len+6;
	}
	char buffer[n];
	if ( strcmp(a,z) < 0 ){
		for ( char i = a[0]; i <= z[0]; i++ ){
			snprintf(buffer, n, template, i);
			out = cat(out,buffer);
		}
	} else{
		for ( char i = z[0]; i >= a[0]; i-- ){
			snprintf(buffer, n, template, i);
			out = cat(out,buffer);
		}
	}
	int len = strlen(out);
	memmove(out, out, len-1);
	out[len-1] = 0;
	return out;
}

char* genrange_sa(char *t, char *a, char *b, char *z){
	char* out = "";
	char* template = cat(cat(cat(cat("$v(",t),"%c"),t),"),");
	int a_len = strlen(a);
	int z_len = strlen(z);
	int n;
	if ( a_len > z_len ){
		n = a_len+6;
	} else{
		n = z_len+6;
	}
	char buffer[n];
	if ( strcmp(a,z) < 0 ){
		for ( char i = a[0]; i <= z[0]; i++ ){
			snprintf(buffer, n, template, i);
			out = cat(out,buffer);
		}
	} else{
		for ( char i = z[0]; i >= a[0]; i-- ){
			snprintf(buffer, n, template, i);
			out = cat(out,buffer);
		}
	}
	int len = strlen(out);
	memmove(out, out, len-1);
	out[len-1] = 0;
	return out;
}