// Todo: Multi character strings, backwards ranges
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "common.h"

char* cat(char *a, char *b){
	char *c = (char *) malloc(1 +sizeof(char*) * (strlen(a)+ strlen(b)));
	strcpy(c, a);
	strcat(c, b);
	return c;
}

char* HLXHeader =
"try{global}catch(e){var global=window}var HLX=function(c){if(null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=HLX(c[i]);return new $$(c)};$$=function(c){this._=[c]},$v=function(c){return new $$(c)};var JS=new $$(function(c){if(c instanceof $$&&(c=c._[0]),null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=JS._[0](c[i]);return c});$c=function(c,d){var e;if(Array.isArray(c))e=c.slice();else if('object'==typeof c)e=c instanceof $$&&!d?c:Object.assign(Object.create(Object.getPrototypeOf(c)),c);else return c;for(prop in c)e[prop]=$c(c[prop],d);return e},$e=function(c,d){if('object'==typeof c&&'object'==typeof d||'function'==typeof c&&'function'==typeof d){for(prop in c){if(Object.keys(c).length!==Object.keys(d).length)return!1;if(!$e(c[prop],d[prop]))return!1}return!0}return c===d},$a=function(c,d){return Array.isArray(c)&&Array.isArray(d)?c.concat(d):'object'==typeof c&&'object'==typeof d?Object.assign($p(Object.getPrototypeOf(c),Object.getPrototypeOf(d)),c,d):'function'==typeof c&&'function'==typeof d?function(){var e={};c.apply(e,arguments);var g=Object.assign($p(c.prototype,d.prototype),e);return d.apply(g,arguments),g}:c+d},$p=function(c,d){var e=$c(d);return Object.setPrototypeOf(e,c),Object.create(e)},$w=function(c){return c instanceof $$?c:new $$(c)},HLX.isFloat=function(c){return c===+c&&c!==(0|c)},HLX.isInt=function(c){return c===+c&&c===(0|c)};var print=new $$(function(){var c=[].slice.call(arguments).map(function(d){return JS._[0]($c(d,!0))});return console.log.apply(null,c),c});"
;
char* FuncHeader =
"for(let i in this==global?undefined:this){eval('var '+i+'=this.'+i);}"
;