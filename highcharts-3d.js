/*
 Highcharts JS v5.0.11-modified (2017-05-05)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(r){"object"===typeof module&&module.exports?module.exports=r:r(Highcharts)})(function(r){(function(a){var m=a.deg2rad,h=a.pick;a.perspective=function(v,l,F){var f=l.options.chart.options3d,n=F?l.inverted:!1,g=l.plotWidth/2,q=l.plotHeight/2,d=f.depth/2,e=h(f.depth,1)*h(f.viewDistance,0),c=l.scale3d||1,b=m*f.beta*(n?-1:1),f=m*f.alpha*(n?-1:1),k=Math.cos(f),t=Math.cos(-b),B=Math.sin(f),w=Math.sin(-b);F||(g+=l.plotLeft,q+=l.plotTop);return a.map(v,function(b){var a,h;h=(n?b.y:b.x)-g;var f=(n?
b.x:b.y)-q,u=(b.z||0)-d;a=t*h-w*u;b=-B*w*h+k*f-t*B*u;h=k*w*h+B*f+k*t*u;f=0<e&&e<Number.POSITIVE_INFINITY?e/(h+d+e):1;a=a*f*c+g;b=b*f*c+q;return{x:n?b:a,y:n?a:b,z:h*c+d}})};a.pointCameraDistance=function(a,l){var v=l.options.chart.options3d,f=l.plotWidth/2;l=l.plotHeight/2;v=h(v.depth,1)*h(v.viewDistance,0)+v.depth;return Math.sqrt(Math.pow(f-a.plotX,2)+Math.pow(l-a.plotY,2)+Math.pow(v-a.plotZ,2))}})(r);(function(a){function m(b){var c=0,a,A;for(a=0;a<b.length;a++)A=(a+1)%b.length,c+=b[a].x*b[A].y-
b[A].x*b[a].y;return c/2}function h(b,c,a,A,k,d,e,f){var p=[],D=d-k;return d>k&&d-k>Math.PI/2+.0001?(p=p.concat(h(b,c,a,A,k,k+Math.PI/2,e,f)),p=p.concat(h(b,c,a,A,k+Math.PI/2,d,e,f))):d<k&&k-d>Math.PI/2+.0001?(p=p.concat(h(b,c,a,A,k,k-Math.PI/2,e,f)),p=p.concat(h(b,c,a,A,k-Math.PI/2,d,e,f))):["C",b+a*Math.cos(k)-a*y*D*Math.sin(k)+e,c+A*Math.sin(k)+A*y*D*Math.cos(k)+f,b+a*Math.cos(d)+a*y*D*Math.sin(d)+e,c+A*Math.sin(d)-A*y*D*Math.cos(d)+f,b+a*Math.cos(d)+e,c+A*Math.sin(d)+f]}var v=Math.cos,l=Math.PI,
F=Math.sin,f=a.animObject,n=a.charts,g=a.color,q=a.defined,d=a.deg2rad,e=a.each,c=a.extend,b=a.inArray,k=a.map,t=a.merge,B=a.perspective,w=a.pick,x=a.SVGElement,C=a.SVGRenderer,z=a.wrap,y=4*(Math.sqrt(2)-1)/3/(l/2);C.prototype.toLinePath=function(b,a){var c=[];e(b,function(b){c.push("L",b.x,b.y)});b.length&&(c[0]="M",a&&c.push("Z"));return c};C.prototype.cuboid=function(b){var c=this.g(),k=c.destroy;b=this.cuboidPath(b);c.attr({"stroke-linejoin":"round"});c.front=this.path(b[0]).attr({"class":"highcharts-3d-front"}).add(c);
c.top=this.path(b[1]).attr({"class":"highcharts-3d-top"}).add(c);c.side=this.path(b[2]).attr({"class":"highcharts-3d-side"}).add(c);c.fillSetter=function(b){this.front.attr({fill:b});this.top.attr({fill:g(b).brighten(.1).get()});this.side.attr({fill:g(b).brighten(-.1).get()});this.color=b;return this};c.opacitySetter=function(b){this.front.attr({opacity:b});this.top.attr({opacity:b});this.side.attr({opacity:b});return this};c.attr=function(b,c){if("string"===typeof b&&"undefined"!==typeof c){var k=
b;b={};b[k]=c}if(b.shapeArgs||q(b.x))b=this.renderer.cuboidPath(b.shapeArgs||b),this.front.attr({d:b[0]}),this.top.attr({d:b[1]}),this.side.attr({d:b[2]});else return a.SVGElement.prototype.attr.call(this,b);return this};c.animate=function(b,c,a){q(b.x)&&q(b.y)?(b=this.renderer.cuboidPath(b),this.front.animate({d:b[0]},c,a),this.top.animate({d:b[1]},c,a),this.side.animate({d:b[2]},c,a),this.attr({zIndex:-b[3]})):b.opacity?(this.front.animate(b,c,a),this.top.animate(b,c,a),this.side.animate(b,c,a)):
x.prototype.animate.call(this,b,c,a);return this};c.destroy=function(){this.front.destroy();this.top.destroy();this.side.destroy();return k.call(this)};c.attr({zIndex:-b[3]});return c};a.SVGRenderer.prototype.cuboidPath=function(b){function c(b){return w[b]}var a=b.x,d=b.y,e=b.z,f=b.height,D=b.width,h=b.depth,q=n[this.chartIndex],t,g,l=q.options.chart.options3d.alpha,u=0,w=[{x:a,y:d,z:e},{x:a+D,y:d,z:e},{x:a+D,y:d+f,z:e},{x:a,y:d+f,z:e},{x:a,y:d+f,z:e+h},{x:a+D,y:d+f,z:e+h},{x:a+D,y:d,z:e+h},{x:a,
y:d,z:e+h}],w=B(w,q,b.insidePlotArea);g=function(b,a){var d=[[],-1];b=k(b,c);a=k(a,c);0>m(b)?d=[b,0]:0>m(a)&&(d=[a,1]);return d};t=g([3,2,1,0],[7,6,5,4]);b=t[0];D=t[1];t=g([1,6,7,0],[4,5,2,3]);f=t[0];h=t[1];t=g([1,2,5,6],[0,7,4,3]);g=t[0];t=t[1];1===t?u+=1E4*(1E3-a):t||(u+=1E4*a);u+=10*(!h||0<=l&&180>=l||360>l&&357.5<l?q.plotHeight-d:10+d);1===D?u+=100*e:D||(u+=100*(1E3-e));u=-Math.round(u);return[this.toLinePath(b,!0),this.toLinePath(f,!0),this.toLinePath(g,!0),u]};a.SVGRenderer.prototype.arc3d=
function(a){function k(a){var c=!1,k={};a=t(a);for(var d in a)-1!==b(d,q)&&(k[d]=a[d],delete a[d],c=!0);return c?k:!1}var p=this.g(),h=p.renderer,q="x y r innerR start end".split(" ");a=t(a);a.alpha*=d;a.beta*=d;p.top=h.path();p.side1=h.path();p.side2=h.path();p.inn=h.path();p.out=h.path();p.onAdd=function(){var b=p.parentGroup,a=p.attr("class");p.top.add(p);e(["out","inn","side1","side2"],function(c){p[c].addClass(a+" highcharts-3d-side").add(b)})};p.setPaths=function(b){var a=p.renderer.arc3dPath(b),
c=100*a.zTop;p.attribs=b;p.top.attr({d:a.top,zIndex:a.zTop});p.inn.attr({d:a.inn,zIndex:a.zInn});p.out.attr({d:a.out,zIndex:a.zOut});p.side1.attr({d:a.side1,zIndex:a.zSide1});p.side2.attr({d:a.side2,zIndex:a.zSide2});p.zIndex=c;p.attr({zIndex:c});b.center&&(p.top.setRadialReference(b.center),delete b.center)};p.setPaths(a);p.fillSetter=function(b){var a=g(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:a});this.side2.attr({fill:a});this.inn.attr({fill:a});this.out.attr({fill:a});this.top.attr({fill:b});
return this};e(["opacity","translateX","translateY","visibility"],function(b){p[b+"Setter"]=function(b,a){p[a]=b;e(["out","inn","side1","side2","top"],function(c){p[c].attr(a,b)})}});z(p,"attr",function(b,a){var d;"object"===typeof a&&(d=k(a))&&(c(p.attribs,d),p.setPaths(p.attribs));return b.apply(this,[].slice.call(arguments,1))});z(p,"animate",function(b,a,c,d){var e,h=this.attribs,p;delete a.center;delete a.z;delete a.depth;delete a.alpha;delete a.beta;p=f(w(c,this.renderer.globalAnimation));p.duration&&
(e=k(a),a.dummy=1,e&&(p.step=function(b,a){function c(b){return h[b]+(w(e[b],h[b])-h[b])*a.pos}"dummy"===a.prop&&a.elem.setPaths(t(h,{x:c("x"),y:c("y"),r:c("r"),innerR:c("innerR"),start:c("start"),end:c("end")}))}),c=p);return b.call(this,a,c,d)});p.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();x.prototype.destroy.call(this)};p.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};
p.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return p};C.prototype.arc3dPath=function(b){function a(b){b%=2*Math.PI;b>Math.PI&&(b=2*Math.PI-b);return b}var c=b.x,d=b.y,k=b.start,e=b.end-.00001,f=b.r,q=b.innerR,t=b.depth,g=b.alpha,n=b.beta,w=Math.cos(k),B=Math.sin(k);b=Math.cos(e);var u=Math.sin(e),m=f*Math.cos(n),f=f*Math.cos(g),z=q*Math.cos(n),y=q*Math.cos(g),q=t*Math.sin(n),x=t*Math.sin(g),t=["M",c+m*w,d+f*B],t=t.concat(h(c,d,m,f,k,e,0,0)),
t=t.concat(["L",c+z*b,d+y*u]),t=t.concat(h(c,d,z,y,e,k,0,0)),t=t.concat(["Z"]),C=0<n?Math.PI/2:0,n=0<g?0:Math.PI/2,C=k>-C?k:e>-C?-C:k,E=e<l-n?e:k<l-n?l-n:e,r=2*l-n,g=["M",c+m*v(C),d+f*F(C)],g=g.concat(h(c,d,m,f,C,E,0,0));e>r&&k<r?(g=g.concat(["L",c+m*v(E)+q,d+f*F(E)+x]),g=g.concat(h(c,d,m,f,E,r,q,x)),g=g.concat(["L",c+m*v(r),d+f*F(r)]),g=g.concat(h(c,d,m,f,r,e,0,0)),g=g.concat(["L",c+m*v(e)+q,d+f*F(e)+x]),g=g.concat(h(c,d,m,f,e,r,q,x)),g=g.concat(["L",c+m*v(r),d+f*F(r)]),g=g.concat(h(c,d,m,f,r,E,
0,0))):e>l-n&&k<l-n&&(g=g.concat(["L",c+m*Math.cos(E)+q,d+f*Math.sin(E)+x]),g=g.concat(h(c,d,m,f,E,e,q,x)),g=g.concat(["L",c+m*Math.cos(e),d+f*Math.sin(e)]),g=g.concat(h(c,d,m,f,e,E,0,0)));g=g.concat(["L",c+m*Math.cos(E)+q,d+f*Math.sin(E)+x]);g=g.concat(h(c,d,m,f,E,C,q,x));g=g.concat(["Z"]);n=["M",c+z*w,d+y*B];n=n.concat(h(c,d,z,y,k,e,0,0));n=n.concat(["L",c+z*Math.cos(e)+q,d+y*Math.sin(e)+x]);n=n.concat(h(c,d,z,y,e,k,q,x));n=n.concat(["Z"]);w=["M",c+m*w,d+f*B,"L",c+m*w+q,d+f*B+x,"L",c+z*w+q,d+y*
B+x,"L",c+z*w,d+y*B,"Z"];c=["M",c+m*b,d+f*u,"L",c+m*b+q,d+f*u+x,"L",c+z*b+q,d+y*u+x,"L",c+z*b,d+y*u,"Z"];u=Math.atan2(x,-q);d=Math.abs(e+u);b=Math.abs(k+u);k=Math.abs((k+e)/2+u);d=a(d);b=a(b);k=a(k);k*=1E5;e=1E5*b;d*=1E5;return{top:t,zTop:1E5*Math.PI+1,out:g,zOut:Math.max(k,e,d),inn:n,zInn:Math.max(k,e,d),side1:w,zSide1:.99*d,side2:c,zSide2:.99*e}}})(r);(function(a){function m(a,d){var e=a.plotLeft,c=a.plotWidth+e,b=a.plotTop,k=a.plotHeight+b,f=e+a.plotWidth/2,g=b+a.plotHeight/2,h=Number.MAX_VALUE,
n=-Number.MAX_VALUE,q=Number.MAX_VALUE,l=-Number.MAX_VALUE,m,u=1;m=[{x:e,y:b,z:0},{x:e,y:b,z:d}];v([0,1],function(b){m.push({x:c,y:m[b].y,z:m[b].z})});v([0,1,2,3],function(b){m.push({x:m[b].x,y:k,z:m[b].z})});m=r(m,a,!1);v(m,function(b){h=Math.min(h,b.x);n=Math.max(n,b.x);q=Math.min(q,b.y);l=Math.max(l,b.y)});e>h&&(u=Math.min(u,1-Math.abs((e+f)/(h+f))%1));c<n&&(u=Math.min(u,(c-f)/(n-f)));b>q&&(u=0>q?Math.min(u,(b+g)/(-q+b+g)):Math.min(u,1-(b+g)/(q+g)%1));k<l&&(u=Math.min(u,Math.abs((k-g)/(l-g))));
return u}var h=a.Chart,v=a.each,l=a.merge,r=a.perspective,f=a.pick,n=a.wrap;h.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};h.prototype.propsRequireDirtyBox.push("chart.options3d");h.prototype.propsRequireUpdateSeries.push("chart.options3d");a.wrap(a.Chart.prototype,"isInsidePlot",function(a){return this.is3d()||a.apply(this,[].slice.call(arguments,1))});var g=a.getOptions();l(!0,g,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,
viewDistance:25,frame:{bottom:{size:1},side:{size:1},back:{size:1}}}}});n(h.prototype,"setClassName",function(a){a.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});a.wrap(a.Chart.prototype,"setChartSize",function(a){var d=this.options.chart.options3d;a.apply(this,[].slice.call(arguments,1));if(this.is3d()){var e=this.inverted,c=this.clipBox,b=this.margin;c[e?"y":"x"]=-(b[3]||0);c[e?"x":"y"]=-(b[0]||0);c[e?"height":"width"]=this.chartWidth+(b[3]||
0)+(b[1]||0);c[e?"width":"height"]=this.chartHeight+(b[0]||0)+(b[2]||0);this.scale3d=1;!0===d.fitToPlot&&(this.scale3d=m(this,d.depth))}});n(h.prototype,"redraw",function(a){this.is3d()&&(this.isDirtyBox=!0);a.apply(this,[].slice.call(arguments,1))});n(h.prototype,"renderSeries",function(a){var d=this.series.length;if(this.is3d())for(;d--;)a=this.series[d],a.translate(),a.render();else a.call(this)});h.prototype.retrieveStacks=function(a){var d=this.series,e={},c,b=1;v(this.series,function(k){c=f(k.options.stack,
a?0:d.length-1-k.index);e[c]?e[c].series.push(k):(e[c]={series:[k],position:b},b++)});e.totalStacks=b+1;return e}})(r);(function(a){var m,h=a.Axis,v=a.Chart,l=a.each,r=a.extend,f=a.merge,n=a.perspective,g=a.pick,q=a.splat,d=a.Tick,e=a.wrap;e(h.prototype,"setOptions",function(a,b){a.call(this,b);this.chart.is3d()&&"colorAxis"!==this.coll&&(a=this.options,a.tickWidth=g(a.tickWidth,0),a.gridLineWidth=g(a.gridLineWidth,1))});e(h.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));
if(this.chart.is3d()&&"colorAxis"!==this.coll){var b=this.chart,c=b.renderer,d=b.options.chart.options3d,e=d.frame,f=e.bottom,g=e.back,e=e.side,h=d.depth,n=this.height,q=this.width,l=this.left,m=this.top;this.isZAxis||(this.horiz?(g={x:l,y:m+(b.xAxis[0].opposite?-f.size:n),z:0,width:q,height:f.size,depth:h,insidePlotArea:!1},this.bottomFrame?this.bottomFrame.animate(g):(this.bottomFrame=c.cuboid(g).attr({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:b.yAxis[0].reversed&&0<d.alpha?
4:-1}).add(),this.bottomFrame.attr({fill:f.color||"none",stroke:f.color||"none"}))):(d={x:l+(b.yAxis[0].opposite?0:-e.size),y:m+(b.xAxis[0].opposite?-f.size:0),z:h,width:q+e.size,height:n+f.size,depth:g.size,insidePlotArea:!1},this.backFrame?this.backFrame.animate(d):(this.backFrame=c.cuboid(d).attr({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:-3}).add(),this.backFrame.attr({fill:g.color||"none",stroke:g.color||"none"})),b={x:l+(b.yAxis[0].opposite?q:-e.size),y:m+(b.xAxis[0].opposite?
-f.size:0),z:0,width:e.size,height:n+f.size,depth:h,insidePlotArea:!1},this.sideFrame?this.sideFrame.animate(b):(this.sideFrame=c.cuboid(b).attr({"class":"highcharts-3d-frame highcharts-3d-frame-side",zIndex:-2}).add(),this.sideFrame.attr({fill:e.color||"none",stroke:e.color||"none"}))))}});e(h.prototype,"getPlotLinePath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||"colorAxis"===this.coll||null===b)return b;var c=this.chart,d=c.options.chart.options3d,c=this.isZAxis?
c.plotWidth:d.depth,d=this.opposite;this.horiz&&(d=!d);b=[this.swapZ({x:b[1],y:b[2],z:d?c:0}),this.swapZ({x:b[1],y:b[2],z:c}),this.swapZ({x:b[4],y:b[5],z:c}),this.swapZ({x:b[4],y:b[5],z:d?0:c})];b=n(b,this.chart,!1);return b=this.chart.renderer.toLinePath(b,!1)});e(h.prototype,"getLinePath",function(a){return this.chart.is3d()?[]:a.apply(this,[].slice.call(arguments,1))});e(h.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,
1));var b=arguments,c=b[1],b=this.getPlotLinePath(b[2]);(c=this.getPlotLinePath(c))&&b?c.push("L",b[10],b[11],"L",b[7],b[8],"L",b[4],b[5],"L",b[1],b[2]):c=null;return c});e(d.prototype,"getMarkPath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.axis.chart.is3d()||"colorAxis"===this.axis.coll)return b;b=[this.axis.swapZ({x:b[1],y:b[2],z:0}),this.axis.swapZ({x:b[4],y:b[5],z:0})];b=n(b,this.axis.chart,!1);return b=["M",b[0].x,b[0].y,"L",b[1].x,b[1].y]});e(d.prototype,"getLabelPosition",
function(a){var b=a.apply(this,[].slice.call(arguments,1));this.axis.chart.is3d()&&"colorAxis"!==this.axis.coll&&(b=n([this.axis.swapZ({x:b.x,y:b.y,z:0})],this.axis.chart,!1)[0]);return b});a.wrap(h.prototype,"getTitlePosition",function(a){var b=this.chart.is3d()&&"colorAxis"!==this.coll,c,d;b&&(d=this.axisTitleMargin,this.axisTitleMargin=0);c=a.apply(this,[].slice.call(arguments,1));b&&(c=n([this.swapZ({x:c.x,y:c.y,z:0})],this.chart,!1)[0],c[this.horiz?"y":"x"]+=(this.horiz?1:-1)*(this.opposite?
-1:1)*d,this.axisTitleMargin=d);return c});e(h.prototype,"drawCrosshair",function(a){var b=arguments;this.chart.is3d()&&b[2]&&(b[2]={plotX:b[2].plotXold||b[2].plotX,plotY:b[2].plotYold||b[2].plotY});a.apply(this,[].slice.call(b,1))});e(h.prototype,"destroy",function(a){l(["backFrame","bottomFrame","sideFrame"],function(b){this[b]&&(this[b]=this[b].destroy())},this);a.apply(this,[].slice.call(arguments,1))});h.prototype.swapZ=function(a,b){if(this.isZAxis){b=b?0:this.chart.plotLeft;var c=this.chart;
return{x:b+(c.yAxis[0].opposite?a.z:c.xAxis[0].width-a.z),y:a.y,z:a.x-b}}return a};m=a.ZAxis=function(){this.init.apply(this,arguments)};r(m.prototype,h.prototype);r(m.prototype,{isZAxis:!0,setOptions:function(a){a=f({offset:0,lineWidth:0},a);h.prototype.setOptions.call(this,a);this.coll="zAxis"},setAxisSize:function(){h.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=
this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();l(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,c=c.zData,c.length&&(a.dataMin=Math.min(g(a.dataMin,c[0]),Math.min.apply(null,c)),a.dataMax=Math.max(g(a.dataMax,c[0]),Math.max.apply(null,c)))})}});e(v.prototype,"getAxes",function(a){var b=this,c=this.options,c=c.zAxis=q(c.zAxis||{});a.call(this);b.is3d()&&(this.zAxis=[],l(c,
function(a,c){a.index=c;a.isX=!0;(new m(b,a)).setScale()}))})})(r);(function(a){function m(a){var d=a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&(d.stroke=this.options.edgeColor||d.fill,d["stroke-width"]=l(this.options.edgeWidth,1));return d}var h=a.each,v=a.perspective,l=a.pick,r=a.Series,f=a.seriesTypes,n=a.inArray,g=a.svg;a=a.wrap;a(f.column.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this,e=d.chart,c=d.options,b=c.depth||
25,f=d.borderWidth%2?.5:0;if(e.inverted&&!d.yAxis.reversed||!e.inverted&&d.yAxis.reversed)f*=-1;var g=(c.stacking?c.stack||0:d.index)*(b+(c.groupZPadding||1));!1!==c.grouping&&(g=0);g+=c.groupZPadding||1;h(d.data,function(a){if(null!==a.y){var c=a.shapeArgs,k=a.tooltipPos,n;h([["x","width"],["y","height"]],function(a){n=c[a[0]]-f;if(0>n+c[a[1]]||n>d[a[0]+"Axis"].len)for(var b in c)c[b]=0;0>n&&(c[a[1]]+=c[a[0]],c[a[0]]=0);n+c[a[1]]>d[a[0]+"Axis"].len&&(c[a[1]]=d[a[0]+"Axis"].len-c[a[0]])});a.shapeType=
"cuboid";c.z=g;c.depth=b;c.insidePlotArea=!0;k=v([{x:k[0],y:k[1],z:g}],e,!0)[0];a.tooltipPos=[k.x,k.y]}});d.z=g}});a(f.column.prototype,"animate",function(a){if(this.chart.is3d()){var d=arguments[1],e=this.yAxis,c=this,b=this.yAxis.reversed;g&&(d?h(c.data,function(a){null!==a.y&&(a.height=a.shapeArgs.height,a.shapey=a.shapeArgs.y,a.shapeArgs.height=1,b||(a.shapeArgs.y=a.stackY?a.plotY+e.translate(a.stackY):a.plotY+(a.negative?-a.height:a.height)))}):(h(c.data,function(a){null!==a.y&&(a.shapeArgs.height=
a.height,a.shapeArgs.y=a.shapey,a.graphic&&a.graphic.animate(a.shapeArgs,c.options.animation))}),this.drawDataLabels(),c.animate=null))}else a.apply(this,[].slice.call(arguments,1))});a(f.column.prototype,"plotGroup",function(a,d,e,c,b,f){this.chart.is3d()&&f&&!this[d]&&(this[d]=f,f.attr(this.getPlotBox()),this[d].survive=!0);return a.apply(this,Array.prototype.slice.call(arguments,1))});a(f.column.prototype,"setVisible",function(a,d){var e=this,c;e.chart.is3d()&&h(e.data,function(a){c=(a.visible=
a.options.visible=d=void 0===d?!a.visible:d)?"visible":"hidden";e.options.data[n(a,e.data)]=a.options;a.graphic&&a.graphic.attr({visibility:c})});a.apply(this,Array.prototype.slice.call(arguments,1))});a(f.column.prototype,"init",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this.options,e=d.grouping,c=d.stacking,b=l(this.yAxis.options.reversedStacks,!0),f=0;if(void 0===e||e){e=this.chart.retrieveStacks(c);f=d.stack||0;for(c=0;c<e[f].series.length&&e[f].series[c]!==
this;c++);f=10*(e.totalStacks-e[f].position)+(b?c:-c);this.xAxis.reversed||(f=10*e.totalStacks-f)}d.zIndex=f}});a(f.column.prototype,"pointAttribs",m);f.columnrange&&(a(f.columnrange.prototype,"pointAttribs",m),f.columnrange.prototype.plotGroup=f.column.prototype.plotGroup,f.columnrange.prototype.setVisible=f.column.prototype.setVisible);a(r.prototype,"alignDataLabel",function(a){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var d=arguments[4],e={x:d.x,y:d.y,z:this.z},e=
v([e],this.chart,!0)[0];d.x=e.x;d.y=e.y}a.apply(this,[].slice.call(arguments,1))})})(r);(function(a){var m=a.deg2rad,h=a.each,v=a.pick,l=a.seriesTypes,r=a.svg;a=a.wrap;a(l.pie.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var f=this,g=f.options,l=g.depth||0,d=f.chart.options.chart.options3d,e=d.alpha,c=d.beta,b=g.stacking?(g.stack||0)*l:f._i*l,b=b+l/2;!1!==g.grouping&&(b=0);h(f.data,function(a){var d=a.shapeArgs;a.shapeType="arc3d";d.z=b;d.depth=
.75*l;d.alpha=e;d.beta=c;d.center=f.center;d=(d.end+d.start)/2;a.slicedTranslation={translateX:Math.round(Math.cos(d)*g.slicedOffset*Math.cos(e*m)),translateY:Math.round(Math.sin(d)*g.slicedOffset*Math.cos(e*m))}})}});a(l.pie.prototype.pointClass.prototype,"haloPath",function(a){var f=arguments;return this.series.chart.is3d()?[]:a.call(this,f[1])});a(l.pie.prototype,"pointAttribs",function(a,h,g){a=a.call(this,h,g);g=this.options;this.chart.is3d()&&(a.stroke=g.edgeColor||h.color||this.color,a["stroke-width"]=
v(g.edgeWidth,1));return a});a(l.pie.prototype,"drawPoints",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&h(this.points,function(a){var f=a.graphic;if(f)f[a.y&&a.visible?"show":"hide"]()})});a(l.pie.prototype,"drawDataLabels",function(a){if(this.chart.is3d()){var f=this.chart.options.chart.options3d;h(this.data,function(a){var g=a.shapeArgs,d=g.r,e=(g.start+g.end)/2,c=a.labelPos,b=-d*(1-Math.cos((g.alpha||f.alpha)*m))*Math.sin(e),n=d*(Math.cos((g.beta||f.beta)*m)-1)*Math.cos(e);
h([0,2,4],function(a){c[a]+=n;c[a+1]+=b})})}a.apply(this,[].slice.call(arguments,1))});a(l.pie.prototype,"addPoint",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});a(l.pie.prototype,"animate",function(a){if(this.chart.is3d()){var f=arguments[1],g=this.options.animation,h=this.center,d=this.group,e=this.markerGroup;r&&(!0===g&&(g={}),f?(d.oldtranslateX=d.translateX,d.oldtranslateY=d.translateY,f={translateX:h[0],translateY:h[1],scaleX:.001,
scaleY:.001},d.attr(f),e&&(e.attrSetters=d.attrSetters,e.attr(f))):(f={translateX:d.oldtranslateX,translateY:d.oldtranslateY,scaleX:1,scaleY:1},d.animate(f,g),e&&e.animate(f,g),this.animate=null))}else a.apply(this,[].slice.call(arguments,1))})})(r);(function(a){var m=a.perspective,h=a.pick,v=a.Point,l=a.seriesTypes,r=a.wrap;r(l.scatter.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var f=this.chart,g=h(this.zAxis,f.options.zAxis[0]),l=[],d,e,c;for(c=
0;c<this.data.length;c++)d=this.data[c],e=g.isLog&&g.val2lin?g.val2lin(d.z):d.z,d.plotZ=g.translate(e),d.isInside=d.isInside?e>=g.min&&e<=g.max:!1,l.push({x:d.plotX,y:d.plotY,z:d.plotZ});f=m(l,f,!0);for(c=0;c<this.data.length;c++)d=this.data[c],g=f[c],d.plotXold=d.plotX,d.plotYold=d.plotY,d.plotZold=d.plotZ,d.plotX=g.x,d.plotY=g.y,d.plotZ=g.z}});r(l.scatter.prototype,"init",function(a,h,g){h.is3d()&&(this.axisTypes=["xAxis","yAxis","zAxis"],this.pointArrayMap=["x","y","z"],this.parallelArrays=["x",
"y","z"],this.directTouch=!0);a=a.apply(this,[h,g]);this.chart.is3d()&&(this.tooltipOptions.pointFormat=this.userOptions.tooltip?this.userOptions.tooltip.pointFormat||"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e":"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e");return a});r(l.scatter.prototype,"pointAttribs",function(f,h){var g=f.apply(this,
[].slice.call(arguments,1));this.chart.is3d()&&h&&(g.zIndex=a.pointCameraDistance(h,this.chart));return g});r(v.prototype,"applyOptions",function(a){var f=a.apply(this,[].slice.call(arguments,1));this.series.chart.is3d()&&void 0===f.z&&(f.z=0);return f})})(r);(function(a){var m=a.Axis,h=a.SVGRenderer,r=a.VMLRenderer;r&&(a.setOptions({animate:!1}),r.prototype.cuboid=h.prototype.cuboid,r.prototype.cuboidPath=h.prototype.cuboidPath,r.prototype.toLinePath=h.prototype.toLinePath,r.prototype.createElement3D=
h.prototype.createElement3D,r.prototype.arc3d=function(a){a=h.prototype.arc3d.call(this,a);a.css({zIndex:a.zIndex});return a},a.VMLRenderer.prototype.arc3dPath=a.SVGRenderer.prototype.arc3dPath,a.wrap(m.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));this.sideFrame&&(this.sideFrame.css({zIndex:0}),this.sideFrame.front.attr({fill:this.sideFrame.color}));this.bottomFrame&&(this.bottomFrame.css({zIndex:1}),this.bottomFrame.front.attr({fill:this.bottomFrame.color}));this.backFrame&&
(this.backFrame.css({zIndex:0}),this.backFrame.front.attr({fill:this.backFrame.color}))}))})(r)});