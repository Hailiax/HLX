

;let Point=function(xx,yy){this.x=xx;this.y=yy;let hypot=function(n,m){return (n**2+m**2)**0.5;};this.distance=function(){return hypot(this.x,this.y);};};let pt=new Point(3,4);console.log(pt.x);console.log(pt.y);console.log(pt.distance());;

