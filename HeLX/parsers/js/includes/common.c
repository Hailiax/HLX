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
"try{}catch(c){var global=window}$$=function(c){this.$=[c]},$v=function(c){return new $$(c)};var JS=new $$(function(str){function wrap(c){if(null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=wrap(c[i]);return new $$(c)}return wrap(eval(str.$[0]))}),HLX=function(c){if(c instanceof $$&&(c=c.$[0]),null!==c&&('object'==typeof c||'function'==typeof c))for(i in c)c[i]=HLX(c[i]);return c};$c=function(c,d){var g;if(Array.isArray(c))g=c.slice();else if('object'==typeof c&&null!==c)g=c instanceof $$&&!d?c:Object.assign(Object.create(Object.getPrototypeOf(c)),c);else return c;for(prop in c)g[prop]=$c(c[prop],d);return g},$e=function(c,d){if('object'==typeof c&&'object'==typeof d&&null!==c&&null!==d||'function'==typeof c&&'function'==typeof d){for(prop in c){if(Object.keys(c).length!==Object.keys(d).length)return!1;if(!$e(c[prop],d[prop]))return!1}return!0}return c===d},$a=function(c,d){return Array.isArray(c)&&Array.isArray(d)?c.concat(d):'object'==typeof c&&'object'==typeof d?null===c?d:null===d?c:Object.assign($p(Object.getPrototypeOf(c),Object.getPrototypeOf(d)),c,d):'function'==typeof c&&'function'==typeof d?function(){var g={};c.apply(g,arguments);var h=Object.assign($p(c.prototype,d.prototype),g);return d.apply(h,arguments),h}:c+d},$r=function(c,d){var g=[];if(c<d)for(;c<=d;)g.push($v(c++));else for(;c>=d;)g.push($v(c--));return g},$p=function(c,d){var g=$c(d);return Object.setPrototypeOf(g,c),Object.create(g)},$w=function(c){return c instanceof $$?c:new $$(c)},HLX.isFloat=function(c){return c===+c&&c!==(0|c)},HLX.isInt=function(c){return c===+c&&c===(0|c)};var print=new $$(function(){var c=[].slice.call(arguments).map(function(d){return HLX($c(d,!0))});return console.log.apply(null,c),c});"
;
char* FuncHeader =
"for(let i in this==global?undefined:this){eval('var '+i+'=this.'+i);}"
;