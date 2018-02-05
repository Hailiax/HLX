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
"var HLX=function(c){if(null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=HLX(c[i]);return new HLX.val(c)};HLX.val=function(c){this._=[c]},HLX.clone=function(c,d){var e;if(Array.isArray(c))e=c.slice();else if('function'==typeof c)e=c.bind({});else if('object'==typeof c)e=c instanceof HLX.val&&!d?c:Object.assign(Object.create(Object.getPrototypeOf(c)),c);else return c;for(prop in c)e[prop]=HLX.clone(c[prop],d);return e},HLX.equal=function(c,d){if('object'==typeof c&&'object'==typeof d||'function'==typeof c&&'function'==typeof d){for(prop in c){if(Object.keys(c).length!==Object.keys(d).length)return!1;if(!HLX.equal(c[prop],d[prop]))return!1}return!0}return c===d},HLX.add=function(c,d){return Array.isArray(c)&&Array.isArray(d)?c.concat(d):'object'==typeof c&&'object'==typeof d?c+d:'function'==typeof c&&'function'==typeof d?c+d:c+d},HLX.enval=function(c){return c instanceof HLX.val?c:new HLX.val(c)},HLX.isFloat=function(c){return c===+c&&c!==(0|c)},HLX.isInt=function(c){return c===+c&&c===(0|c)};var JS=new HLX.val(function(c){if(c instanceof HLX.val&&(c=c._[0]),null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=JS._[0](c[i]);return c}),print=new HLX.val(function(){let c=[].slice.call(arguments).map(function(d){return JS._[0](HLX.clone(d,!0))});return console.log.apply(null,c),c});"
;