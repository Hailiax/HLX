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

char* HLXHeader =
"var HLX=function(a){if(null!==a&&('object'==typeof a||'function'==typeof a))for(i in a)a[i]=HLX(a[i]);return new HLX.val(a)};HLX.val=function(a){this.h=a},HLX.clone=function(a){var b;for(prop in b=Array.isArray(a)?a.slice():'object'==typeof a||'function'==typeof a?Object.assign(Object.create(Object.getPrototypeOf(a)),a):a,a)b[prop]=HLX.clone(a[prop]);return b},HLX.isFloat=function(a){return a===+a&&a!==(0|a)},HLX.isInt=function(a){return a===+a&&a===(0|a)};var JS=new HLX.val(function(a){if(a instanceof HLX.val&&(a=a.h),null!==a&&('object'==typeof a||'function'==typeof a))for(i in a)a[i]=JS.h(a[i]);return a}),print=new HLX.val(function(){let a=[].slice.call(arguments).map(function(b){return JS.h(HLX.clone(b))});return console.log.apply(null,a),a});"
;