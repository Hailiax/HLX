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

char* HLXHeader = "var HLX={workers:{start:function(b,d){'use strict';var g=new Worker('HeLXWorker.js');''!==b&&(this.list[b]=g),g.postMessage(d)},list:{}},clean:function(b){'use strict';return Array.isArray(b)?b.map(function(d){return HLX.clean(d[0])}):b},extend:function(){'use strict';var b,d,g,h,j,k,l=arguments[0]||{},m=1,p=arguments.length,q=!1;for('boolean'==typeof l&&(q=l,l=arguments[1]||{},m=2),'object'==typeof l||l&&'[object Function]'==={}.toString.call(l)||(l={}),p===m&&(l=this,--m);m<p;m++)if(null!=(b=arguments[m]))for(d in b)g=l[d],l!==(h=b[d])&&(q&&h&&('object'==typeof h&&h.constructor==Object||(j=Array.isArray(h)))?(j?(j=!1,k=g&&Array.isArray(g)?g:[]):k=g&&'object'==typeof g&&g.constructor==Object?g:{},l[d]=HLX.extend(q,k,h)):void 0!=h&&(l[d]=h));return l},isFloat:function(b){'use strict';return b===+b&&b!==(0|b)},isInt:function(b){'use strict';return b===+b&&b===(0|b)}};function print(){'use strict';let b=[].slice.call(arguments).map(function(d){return'object'==typeof d?JSON.stringify(HLX.clean(d)):'function'==typeof d?JSON.stringify(d):'undefined'==typeof d?'UNDEFINED':d}).join('');return console.log(b),b}function GET(b){'use strict';var d=new XMLHttpRequest;return d.open('GET',b,!1),d.send(),d.responseText}function POST(b,d){'use strict';xhttp.open('POST',b,!1);for(let g=2;g<arguments.length;g++)xhttp.setRequestHeader(arguments[g].substr(0,arguments[g].indexOf(': ')),arguments[g].substr(arguments[g].indexOf(': ')+1));return xhttp.send(d),xhttp.responseText};";