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
"HLX={extend:function(){var b,d,g,h,j,k,l=arguments[0]||{},p=1,q=arguments.length,u=!1;for('boolean'==typeof l&&(u=l,l=arguments[1]||{},p=2),'object'==typeof l||l&&'[object Function]'==={}.toString.call(l)||(l={}),q===p&&(l=this,--p);p<q;p++)if(null!=(b=arguments[p]))for(d in b)g=l[d],l!==(h=b[d])&&(u&&h&&('object'==typeof h&&h.constructor==Object||(j=Array.isArray(h)))?(j?(j=!1,k=g&&Array.isArray(g)?g:[]):k=g&&'object'==typeof g&&g.constructor==Object?g:{},l[d]=HLX.extend(u,k,h)):void 0!=h&&(l[d]=h));return l},isFloat:function(b){return b===+b&&b!==(0|b)},isInt:function(b){return b===+b&&b===(0|b)},add:function(b,d){return b[0]+=d[0],b},sub:function(b,d){return b[0]-=d[0],b},mul:function(b,d){return b[0]*=d[0],b},div:function(b,d){return b[0]/=d[0],b},mod:function(b,d){return b[0]%=d[0],b},exp:function(b,d){return b[0]**=d[0],b},lshft:function(b,d){return b[0]<<=d[0],b},rshft:function(b,d){return b[0]>>=d[0],b},zrshft:function(b,d){return b[0]>>>=d[0],b},band:function(b,d){return b[0]&=d[0],b},bxor:function(b,d){return b[0]^=d[0],b},bor:function(b,d){return b[0]|=d[0],b},uplus:function(b){return b[0]=+b[0],b},uminus:function(b){return b[0]=-b[0],b},unot:function(b){return b[0]=!b[0],b},ubnot:function(b){return b[0]=~b[0],b}};var js=[function(b){if(Array.isArray(b)&&1===b.length&&(b=b[0]),null!==b&&('object'==typeof b||'function'==typeof b))for(var d=Object.getOwnPropertyNames(b),g=0;g<d.length;g++)b[d[g]]=js[0](b[d[g]]);return b}],print=[function(){let b=[].slice.call(arguments).map(function(d){return js[0](d)});return console.log.apply(null,b),b}];"
;