/*
 Highcharts JS v5.0.11-modified (2017-05-05)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){var p=a.deg2rad,k=a.pick;a.perspective=function(w,q,r){var l=q.options.chart.options3d,g=r?q.inverted:!1,h=q.plotWidth/2,d=q.plotHeight/2,f=l.depth/2,e=k(l.depth,1)*k(l.viewDistance,0),c=q.scale3d||1,b=p*l.beta*(g?-1:1),l=p*l.alpha*(g?-1:1),n=Math.cos(l),t=Math.cos(-b),A=Math.sin(l),z=Math.sin(-b);r||(h+=q.plotLeft,d+=q.plotTop);return a.map(w,function(b){var a,k;k=(g?b.y:b.x)-h;var l=(g?
b.x:b.y)-d,u=(b.z||0)-f;a=t*k-z*u;b=-A*z*k+n*l-t*A*u;k=n*z*k+A*l+n*t*u;l=0<e&&e<Number.POSITIVE_INFINITY?e/(k+f+e):1;a=a*l*c+h;b=b*l*c+d;return{x:g?b:a,y:g?a:b,z:k*c+f}})};a.pointCameraDistance=function(a,q){var r=q.options.chart.options3d,l=q.plotWidth/2;q=q.plotHeight/2;r=k(r.depth,1)*k(r.viewDistance,0)+r.depth;return Math.sqrt(Math.pow(l-a.plotX,2)+Math.pow(q-a.plotY,2)+Math.pow(r-a.plotZ,2))}})(x);(function(a){function p(b){var c=0,m,B;for(m=0;m<b.length;m++)B=(m+1)%b.length,c+=b[m].x*b[B].y-
b[B].x*b[m].y;return c/2}function k(b,c,m,B,a,d,n,f){var e=[],D=d-a;return d>a&&d-a>Math.PI/2+.0001?(e=e.concat(k(b,c,m,B,a,a+Math.PI/2,n,f)),e=e.concat(k(b,c,m,B,a+Math.PI/2,d,n,f))):d<a&&a-d>Math.PI/2+.0001?(e=e.concat(k(b,c,m,B,a,a-Math.PI/2,n,f)),e=e.concat(k(b,c,m,B,a-Math.PI/2,d,n,f))):["C",b+m*Math.cos(a)-m*v*D*Math.sin(a)+n,c+B*Math.sin(a)+B*v*D*Math.cos(a)+f,b+m*Math.cos(d)+m*v*D*Math.sin(d)+n,c+B*Math.sin(d)-B*v*D*Math.cos(d)+f,b+m*Math.cos(d)+n,c+B*Math.sin(d)+f]}var w=Math.cos,q=Math.PI,
r=Math.sin,l=a.animObject,g=a.charts,h=a.color,d=a.defined,f=a.deg2rad,e=a.each,c=a.extend,b=a.inArray,n=a.map,t=a.merge,A=a.perspective,z=a.pick,y=a.SVGElement,F=a.SVGRenderer,C=a.wrap,v=4*(Math.sqrt(2)-1)/3/(q/2);C(F.prototype,"init",function(b){b.apply(this,[].slice.call(arguments,1));e([{name:"darker",slope:.6},{name:"brighter",slope:1.4}],function(b){this.definition({tagName:"filter",id:"highcharts-"+b.name,children:[{tagName:"feComponentTransfer",children:[{tagName:"feFuncR",type:"linear",slope:b.slope},
{tagName:"feFuncG",type:"linear",slope:b.slope},{tagName:"feFuncB",type:"linear",slope:b.slope}]}]})},this)});F.prototype.toLinePath=function(b,c){var a=[];e(b,function(b){a.push("L",b.x,b.y)});b.length&&(a[0]="M",c&&a.push("Z"));return a};F.prototype.cuboid=function(b){var c=this.g(),m=c.destroy;b=this.cuboidPath(b);c.front=this.path(b[0]).attr({"class":"highcharts-3d-front"}).add(c);c.top=this.path(b[1]).attr({"class":"highcharts-3d-top"}).add(c);c.side=this.path(b[2]).attr({"class":"highcharts-3d-side"}).add(c);
c.fillSetter=function(b){this.front.attr({fill:b});this.top.attr({fill:h(b).brighten(.1).get()});this.side.attr({fill:h(b).brighten(-.1).get()});this.color=b;return this};c.opacitySetter=function(b){this.front.attr({opacity:b});this.top.attr({opacity:b});this.side.attr({opacity:b});return this};c.attr=function(b,c){if("string"===typeof b&&"undefined"!==typeof c){var m=b;b={};b[m]=c}if(b.shapeArgs||d(b.x))b=this.renderer.cuboidPath(b.shapeArgs||b),this.front.attr({d:b[0]}),this.top.attr({d:b[1]}),
this.side.attr({d:b[2]});else return a.SVGElement.prototype.attr.call(this,b);return this};c.animate=function(b,c,a){d(b.x)&&d(b.y)?(b=this.renderer.cuboidPath(b),this.front.animate({d:b[0]},c,a),this.top.animate({d:b[1]},c,a),this.side.animate({d:b[2]},c,a),this.attr({zIndex:-b[3]})):b.opacity?(this.front.animate(b,c,a),this.top.animate(b,c,a),this.side.animate(b,c,a)):y.prototype.animate.call(this,b,c,a);return this};c.destroy=function(){this.front.destroy();this.top.destroy();this.side.destroy();
return m.call(this)};c.attr({zIndex:-b[3]});return c};a.SVGRenderer.prototype.cuboidPath=function(b){function c(b){return q[b]}var a=b.x,d=b.y,f=b.z,e=b.height,D=b.width,k=b.depth,l=g[this.chartIndex],h,u,r=l.options.chart.options3d.alpha,t=0,q=[{x:a,y:d,z:f},{x:a+D,y:d,z:f},{x:a+D,y:d+e,z:f},{x:a,y:d+e,z:f},{x:a,y:d+e,z:f+k},{x:a+D,y:d+e,z:f+k},{x:a+D,y:d,z:f+k},{x:a,y:d,z:f+k}],q=A(q,l,b.insidePlotArea);u=function(b,a){var d=[[],-1];b=n(b,c);a=n(a,c);0>p(b)?d=[b,0]:0>p(a)&&(d=[a,1]);return d};h=
u([3,2,1,0],[7,6,5,4]);b=h[0];D=h[1];h=u([1,6,7,0],[4,5,2,3]);e=h[0];k=h[1];h=u([1,2,5,6],[0,7,4,3]);u=h[0];h=h[1];1===h?t+=1E4*(1E3-a):h||(t+=1E4*a);t+=10*(!k||0<=r&&180>=r||360>r&&357.5<r?l.plotHeight-d:10+d);1===D?t+=100*f:D||(t+=100*(1E3-f));t=-Math.round(t);return[this.toLinePath(b,!0),this.toLinePath(e,!0),this.toLinePath(u,!0),t]};a.SVGRenderer.prototype.arc3d=function(a){function d(a){var c=!1,d={};a=t(a);for(var f in a)-1!==b(f,k)&&(d[f]=a[f],delete a[f],c=!0);return c?d:!1}var m=this.g(),
n=m.renderer,k="x y r innerR start end".split(" ");a=t(a);a.alpha*=f;a.beta*=f;m.top=n.path();m.side1=n.path();m.side2=n.path();m.inn=n.path();m.out=n.path();m.onAdd=function(){var b=m.parentGroup,a=m.attr("class");m.top.add(m);e(["out","inn","side1","side2"],function(c){m[c].addClass(a+" highcharts-3d-side").add(b)})};m.setPaths=function(b){var a=m.renderer.arc3dPath(b),c=100*a.zTop;m.attribs=b;m.top.attr({d:a.top,zIndex:a.zTop});m.inn.attr({d:a.inn,zIndex:a.zInn});m.out.attr({d:a.out,zIndex:a.zOut});
m.side1.attr({d:a.side1,zIndex:a.zSide1});m.side2.attr({d:a.side2,zIndex:a.zSide2});m.zIndex=c;m.attr({zIndex:c});b.center&&(m.top.setRadialReference(b.center),delete b.center)};m.setPaths(a);m.fillSetter=function(b){var a=h(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:a});this.side2.attr({fill:a});this.inn.attr({fill:a});this.out.attr({fill:a});this.top.attr({fill:b});return this};e(["opacity","translateX","translateY","visibility"],function(b){m[b+"Setter"]=function(b,a){m[a]=b;e(["out",
"inn","side1","side2","top"],function(c){m[c].attr(a,b)})}});C(m,"attr",function(b,a){var f;"object"===typeof a&&(f=d(a))&&(c(m.attribs,f),m.setPaths(m.attribs));return b.apply(this,[].slice.call(arguments,1))});C(m,"animate",function(b,a,c,f){var n,m=this.attribs,e;delete a.center;delete a.z;delete a.depth;delete a.alpha;delete a.beta;e=l(z(c,this.renderer.globalAnimation));e.duration&&(n=d(a),a.dummy=1,n&&(e.step=function(b,a){function c(b){return m[b]+(z(n[b],m[b])-m[b])*a.pos}"dummy"===a.prop&&
a.elem.setPaths(t(m,{x:c("x"),y:c("y"),r:c("r"),innerR:c("innerR"),start:c("start"),end:c("end")}))}),c=e);return b.call(this,a,c,f)});m.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();y.prototype.destroy.call(this)};m.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};m.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return m};
F.prototype.arc3dPath=function(b){function a(b){b%=2*Math.PI;b>Math.PI&&(b=2*Math.PI-b);return b}var c=b.x,d=b.y,f=b.start,n=b.end-.00001,e=b.r,h=b.innerR,l=b.depth,g=b.alpha,t=b.beta,A=Math.cos(f),F=Math.sin(f);b=Math.cos(n);var z=Math.sin(n),p=e*Math.cos(t),e=e*Math.cos(g),u=h*Math.cos(t),v=h*Math.cos(g),h=l*Math.sin(t),y=l*Math.sin(g),l=["M",c+p*A,d+e*F],l=l.concat(k(c,d,p,e,f,n,0,0)),l=l.concat(["L",c+u*b,d+v*z]),l=l.concat(k(c,d,u,v,n,f,0,0)),l=l.concat(["Z"]),C=0<t?Math.PI/2:0,t=0<g?0:Math.PI/
2,C=f>-C?f:n>-C?-C:f,E=n<q-t?n:f<q-t?q-t:n,x=2*q-t,g=["M",c+p*w(C),d+e*r(C)],g=g.concat(k(c,d,p,e,C,E,0,0));n>x&&f<x?(g=g.concat(["L",c+p*w(E)+h,d+e*r(E)+y]),g=g.concat(k(c,d,p,e,E,x,h,y)),g=g.concat(["L",c+p*w(x),d+e*r(x)]),g=g.concat(k(c,d,p,e,x,n,0,0)),g=g.concat(["L",c+p*w(n)+h,d+e*r(n)+y]),g=g.concat(k(c,d,p,e,n,x,h,y)),g=g.concat(["L",c+p*w(x),d+e*r(x)]),g=g.concat(k(c,d,p,e,x,E,0,0))):n>q-t&&f<q-t&&(g=g.concat(["L",c+p*Math.cos(E)+h,d+e*Math.sin(E)+y]),g=g.concat(k(c,d,p,e,E,n,h,y)),g=g.concat(["L",
c+p*Math.cos(n),d+e*Math.sin(n)]),g=g.concat(k(c,d,p,e,n,E,0,0)));g=g.concat(["L",c+p*Math.cos(E)+h,d+e*Math.sin(E)+y]);g=g.concat(k(c,d,p,e,E,C,h,y));g=g.concat(["Z"]);t=["M",c+u*A,d+v*F];t=t.concat(k(c,d,u,v,f,n,0,0));t=t.concat(["L",c+u*Math.cos(n)+h,d+v*Math.sin(n)+y]);t=t.concat(k(c,d,u,v,n,f,h,y));t=t.concat(["Z"]);A=["M",c+p*A,d+e*F,"L",c+p*A+h,d+e*F+y,"L",c+u*A+h,d+v*F+y,"L",c+u*A,d+v*F,"Z"];c=["M",c+p*b,d+e*z,"L",c+p*b+h,d+e*z+y,"L",c+u*b+h,d+v*z+y,"L",c+u*b,d+v*z,"Z"];z=Math.atan2(y,-h);
d=Math.abs(n+z);b=Math.abs(f+z);f=Math.abs((f+n)/2+z);d=a(d);b=a(b);f=a(f);f*=1E5;n=1E5*b;d*=1E5;return{top:l,zTop:1E5*Math.PI+1,out:g,zOut:Math.max(f,n,d),inn:t,zInn:Math.max(f,n,d),side1:A,zSide1:.99*d,side2:c,zSide2:.99*n}}})(x);(function(a){function p(a,f){var d=a.plotLeft,c=a.plotWidth+d,b=a.plotTop,n=a.plotHeight+b,g=d+a.plotWidth/2,h=b+a.plotHeight/2,l=Number.MAX_VALUE,k=-Number.MAX_VALUE,p=Number.MAX_VALUE,q=-Number.MAX_VALUE,v,u=1;v=[{x:d,y:b,z:0},{x:d,y:b,z:f}];w([0,1],function(b){v.push({x:c,
y:v[b].y,z:v[b].z})});w([0,1,2,3],function(b){v.push({x:v[b].x,y:n,z:v[b].z})});v=r(v,a,!1);w(v,function(b){l=Math.min(l,b.x);k=Math.max(k,b.x);p=Math.min(p,b.y);q=Math.max(q,b.y)});d>l&&(u=Math.min(u,1-Math.abs((d+g)/(l+g))%1));c<k&&(u=Math.min(u,(c-g)/(k-g)));b>p&&(u=0>p?Math.min(u,(b+h)/(-p+b+h)):Math.min(u,1-(b+h)/(p+h)%1));n<q&&(u=Math.min(u,Math.abs((n-h)/(q-h))));return u}var k=a.Chart,w=a.each,q=a.merge,r=a.perspective,l=a.pick,g=a.wrap;k.prototype.is3d=function(){return this.options.chart.options3d&&
this.options.chart.options3d.enabled};k.prototype.propsRequireDirtyBox.push("chart.options3d");k.prototype.propsRequireUpdateSeries.push("chart.options3d");a.wrap(a.Chart.prototype,"isInsidePlot",function(a){return this.is3d()||a.apply(this,[].slice.call(arguments,1))});var h=a.getOptions();q(!0,h,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,frame:{bottom:{size:1},side:{size:1},back:{size:1}}}}});g(k.prototype,"getContainer",function(a){a.apply(this,[].slice.call(arguments,
1));this.renderer.definition({tagName:"style",textContent:".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n"})});g(k.prototype,"setClassName",function(a){a.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});a.wrap(a.Chart.prototype,"setChartSize",function(a){var d=this.options.chart.options3d;a.apply(this,[].slice.call(arguments,1));if(this.is3d()){var e=this.inverted,c=this.clipBox,
b=this.margin;c[e?"y":"x"]=-(b[3]||0);c[e?"x":"y"]=-(b[0]||0);c[e?"height":"width"]=this.chartWidth+(b[3]||0)+(b[1]||0);c[e?"width":"height"]=this.chartHeight+(b[0]||0)+(b[2]||0);this.scale3d=1;!0===d.fitToPlot&&(this.scale3d=p(this,d.depth))}});g(k.prototype,"redraw",function(a){this.is3d()&&(this.isDirtyBox=!0);a.apply(this,[].slice.call(arguments,1))});g(k.prototype,"renderSeries",function(a){var d=this.series.length;if(this.is3d())for(;d--;)a=this.series[d],a.translate(),a.render();else a.call(this)});
k.prototype.retrieveStacks=function(a){var d=this.series,e={},c,b=1;w(this.series,function(n){c=l(n.options.stack,a?0:d.length-1-n.index);e[c]?e[c].series.push(n):(e[c]={series:[n],position:b},b++)});e.totalStacks=b+1;return e}})(x);(function(a){var p,k=a.Axis,w=a.Chart,q=a.each,r=a.extend,l=a.merge,g=a.perspective,h=a.pick,d=a.splat,f=a.Tick,e=a.wrap;e(k.prototype,"setOptions",function(a,b){a.call(this,b);this.chart.is3d()&&"colorAxis"!==this.coll&&(a=this.options,a.tickWidth=h(a.tickWidth,0),a.gridLineWidth=
h(a.gridLineWidth,1))});e(k.prototype,"render",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()&&"colorAxis"!==this.coll){var b=this.chart,c=b.renderer,d=b.options.chart.options3d,f=d.frame,e=f.bottom,g=f.back,f=f.side,h=d.depth,l=this.height,k=this.width,p=this.left,r=this.top;this.isZAxis||(this.horiz?(e={x:p,y:r+(b.xAxis[0].opposite?-e.size:l),z:0,width:k,height:e.size,depth:h,insidePlotArea:!1},this.bottomFrame?this.bottomFrame.animate(e):this.bottomFrame=c.cuboid(e).attr({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",
zIndex:b.yAxis[0].reversed&&0<d.alpha?4:-1}).add()):(d={x:p+(b.yAxis[0].opposite?0:-f.size),y:r+(b.xAxis[0].opposite?-e.size:0),z:h,width:k+f.size,height:l+e.size,depth:g.size,insidePlotArea:!1},this.backFrame?this.backFrame.animate(d):this.backFrame=c.cuboid(d).attr({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:-3}).add(),b={x:p+(b.yAxis[0].opposite?k:-f.size),y:r+(b.xAxis[0].opposite?-e.size:0),z:0,width:f.size,height:l+e.size,depth:h,insidePlotArea:!1},this.sideFrame?this.sideFrame.animate(b):
this.sideFrame=c.cuboid(b).attr({"class":"highcharts-3d-frame highcharts-3d-frame-side",zIndex:-2}).add()))}});e(k.prototype,"getPlotLinePath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||"colorAxis"===this.coll||null===b)return b;var c=this.chart,d=c.options.chart.options3d,c=this.isZAxis?c.plotWidth:d.depth,d=this.opposite;this.horiz&&(d=!d);b=[this.swapZ({x:b[1],y:b[2],z:d?c:0}),this.swapZ({x:b[1],y:b[2],z:c}),this.swapZ({x:b[4],y:b[5],z:c}),this.swapZ({x:b[4],
y:b[5],z:d?0:c})];b=g(b,this.chart,!1);return b=this.chart.renderer.toLinePath(b,!1)});e(k.prototype,"getLinePath",function(a){return this.chart.is3d()?[]:a.apply(this,[].slice.call(arguments,1))});e(k.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,1));var b=arguments,c=b[1],b=this.getPlotLinePath(b[2]);(c=this.getPlotLinePath(c))&&b?c.push("L",b[10],b[11],"L",b[7],b[8],"L",b[4],b[5],"L",b[1],b[2]):c=null;return c});
e(f.prototype,"getMarkPath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.axis.chart.is3d()||"colorAxis"===this.axis.coll)return b;b=[this.axis.swapZ({x:b[1],y:b[2],z:0}),this.axis.swapZ({x:b[4],y:b[5],z:0})];b=g(b,this.axis.chart,!1);return b=["M",b[0].x,b[0].y,"L",b[1].x,b[1].y]});e(f.prototype,"getLabelPosition",function(a){var b=a.apply(this,[].slice.call(arguments,1));this.axis.chart.is3d()&&"colorAxis"!==this.axis.coll&&(b=g([this.axis.swapZ({x:b.x,y:b.y,z:0})],this.axis.chart,
!1)[0]);return b});a.wrap(k.prototype,"getTitlePosition",function(a){var b=this.chart.is3d()&&"colorAxis"!==this.coll,c,d;b&&(d=this.axisTitleMargin,this.axisTitleMargin=0);c=a.apply(this,[].slice.call(arguments,1));b&&(c=g([this.swapZ({x:c.x,y:c.y,z:0})],this.chart,!1)[0],c[this.horiz?"y":"x"]+=(this.horiz?1:-1)*(this.opposite?-1:1)*d,this.axisTitleMargin=d);return c});e(k.prototype,"drawCrosshair",function(a){var b=arguments;this.chart.is3d()&&b[2]&&(b[2]={plotX:b[2].plotXold||b[2].plotX,plotY:b[2].plotYold||
b[2].plotY});a.apply(this,[].slice.call(b,1))});e(k.prototype,"destroy",function(a){q(["backFrame","bottomFrame","sideFrame"],function(b){this[b]&&(this[b]=this[b].destroy())},this);a.apply(this,[].slice.call(arguments,1))});k.prototype.swapZ=function(a,b){if(this.isZAxis){b=b?0:this.chart.plotLeft;var c=this.chart;return{x:b+(c.yAxis[0].opposite?a.z:c.xAxis[0].width-a.z),y:a.y,z:a.x-b}}return a};p=a.ZAxis=function(){this.init.apply(this,arguments)};r(p.prototype,k.prototype);r(p.prototype,{isZAxis:!0,
setOptions:function(a){a=l({offset:0,lineWidth:0},a);k.prototype.setOptions.call(this,a);this.coll="zAxis"},setAxisSize:function(){k.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();q(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=
!0,c=c.zData,c.length&&(a.dataMin=Math.min(h(a.dataMin,c[0]),Math.min.apply(null,c)),a.dataMax=Math.max(h(a.dataMax,c[0]),Math.max.apply(null,c)))})}});e(w.prototype,"getAxes",function(a){var b=this,c=this.options,c=c.zAxis=d(c.zAxis||{});a.call(this);b.is3d()&&(this.zAxis=[],q(c,function(a,c){a.index=c;a.isX=!0;(new p(b,a)).setScale()}))})})(x);(function(a){var p=a.each,k=a.perspective,w=a.pick,q=a.Series,r=a.seriesTypes,l=a.inArray,g=a.svg;a=a.wrap;a(r.column.prototype,"translate",function(a){a.apply(this,
[].slice.call(arguments,1));if(this.chart.is3d()){var d=this,f=d.chart,e=d.options,c=e.depth||25,b=d.borderWidth%2?.5:0;if(f.inverted&&!d.yAxis.reversed||!f.inverted&&d.yAxis.reversed)b*=-1;var g=(e.stacking?e.stack||0:d.index)*(c+(e.groupZPadding||1));!1!==e.grouping&&(g=0);g+=e.groupZPadding||1;p(d.data,function(a){if(null!==a.y){var e=a.shapeArgs,h=a.tooltipPos,l;p([["x","width"],["y","height"]],function(a){l=e[a[0]]-b;if(0>l+e[a[1]]||l>d[a[0]+"Axis"].len)for(var c in e)e[c]=0;0>l&&(e[a[1]]+=e[a[0]],
e[a[0]]=0);l+e[a[1]]>d[a[0]+"Axis"].len&&(e[a[1]]=d[a[0]+"Axis"].len-e[a[0]])});a.shapeType="cuboid";e.z=g;e.depth=c;e.insidePlotArea=!0;h=k([{x:h[0],y:h[1],z:g}],f,!0)[0];a.tooltipPos=[h.x,h.y]}});d.z=g}});a(r.column.prototype,"animate",function(a){if(this.chart.is3d()){var d=arguments[1],f=this.yAxis,e=this,c=this.yAxis.reversed;g&&(d?p(e.data,function(b){null!==b.y&&(b.height=b.shapeArgs.height,b.shapey=b.shapeArgs.y,b.shapeArgs.height=1,c||(b.shapeArgs.y=b.stackY?b.plotY+f.translate(b.stackY):
b.plotY+(b.negative?-b.height:b.height)))}):(p(e.data,function(b){null!==b.y&&(b.shapeArgs.height=b.height,b.shapeArgs.y=b.shapey,b.graphic&&b.graphic.animate(b.shapeArgs,e.options.animation))}),this.drawDataLabels(),e.animate=null))}else a.apply(this,[].slice.call(arguments,1))});a(r.column.prototype,"plotGroup",function(a,d,f,e,c,b){this.chart.is3d()&&b&&!this[d]&&(this[d]=b,b.attr(this.getPlotBox()),this[d].survive=!0);return a.apply(this,Array.prototype.slice.call(arguments,1))});a(r.column.prototype,
"setVisible",function(a,d){var f=this,e;f.chart.is3d()&&p(f.data,function(a){e=(a.visible=a.options.visible=d=void 0===d?!a.visible:d)?"visible":"hidden";f.options.data[l(a,f.data)]=a.options;a.graphic&&a.graphic.attr({visibility:e})});a.apply(this,Array.prototype.slice.call(arguments,1))});a(r.column.prototype,"init",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var d=this.options,f=d.grouping,e=d.stacking,c=w(this.yAxis.options.reversedStacks,!0),b=0;if(void 0===f||
f){f=this.chart.retrieveStacks(e);b=d.stack||0;for(e=0;e<f[b].series.length&&f[b].series[e]!==this;e++);b=10*(f.totalStacks-f[b].position)+(c?e:-e);this.xAxis.reversed||(b=10*f.totalStacks-b)}d.zIndex=b}});a(q.prototype,"alignDataLabel",function(a){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var d=arguments[4],f={x:d.x,y:d.y,z:this.z},f=k([f],this.chart,!0)[0];d.x=f.x;d.y=f.y}a.apply(this,[].slice.call(arguments,1))})})(x);(function(a){var p=a.deg2rad,k=a.each,w=a.seriesTypes,
q=a.svg;a=a.wrap;a(w.pie.prototype,"translate",function(a){a.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var l=this,g=l.options,h=g.depth||0,d=l.chart.options.chart.options3d,f=d.alpha,e=d.beta,c=g.stacking?(g.stack||0)*h:l._i*h,c=c+h/2;!1!==g.grouping&&(c=0);k(l.data,function(b){var a=b.shapeArgs;b.shapeType="arc3d";a.z=c;a.depth=.75*h;a.alpha=f;a.beta=e;a.center=l.center;a=(a.end+a.start)/2;b.slicedTranslation={translateX:Math.round(Math.cos(a)*g.slicedOffset*Math.cos(f*p)),translateY:Math.round(Math.sin(a)*
g.slicedOffset*Math.cos(f*p))}})}});a(w.pie.prototype.pointClass.prototype,"haloPath",function(a){var l=arguments;return this.series.chart.is3d()?[]:a.call(this,l[1])});a(w.pie.prototype,"drawPoints",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&k(this.points,function(a){var g=a.graphic;if(g)g[a.y&&a.visible?"show":"hide"]()})});a(w.pie.prototype,"drawDataLabels",function(a){if(this.chart.is3d()){var l=this.chart.options.chart.options3d;k(this.data,function(a){var g=a.shapeArgs,
d=g.r,f=(g.start+g.end)/2,e=a.labelPos,c=-d*(1-Math.cos((g.alpha||l.alpha)*p))*Math.sin(f),b=d*(Math.cos((g.beta||l.beta)*p)-1)*Math.cos(f);k([0,2,4],function(a){e[a]+=b;e[a+1]+=c})})}a.apply(this,[].slice.call(arguments,1))});a(w.pie.prototype,"addPoint",function(a){a.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});a(w.pie.prototype,"animate",function(a){if(this.chart.is3d()){var l=arguments[1],g=this.options.animation,h=this.center,d=this.group,f=this.markerGroup;
q&&(!0===g&&(g={}),l?(d.oldtranslateX=d.translateX,d.oldtranslateY=d.translateY,l={translateX:h[0],translateY:h[1],scaleX:.001,scaleY:.001},d.attr(l),f&&(f.attrSetters=d.attrSetters,f.attr(l))):(l={translateX:d.oldtranslateX,translateY:d.oldtranslateY,scaleX:1,scaleY:1},d.animate(l,g),f&&f.animate(l,g),this.animate=null))}else a.apply(this,[].slice.call(arguments,1))})})(x);(function(a){var p=a.perspective,k=a.pick,w=a.Point,q=a.seriesTypes,r=a.wrap;r(q.scatter.prototype,"translate",function(a){a.apply(this,
[].slice.call(arguments,1));if(this.chart.is3d()){var g=this.chart,h=k(this.zAxis,g.options.zAxis[0]),d=[],f,e,c;for(c=0;c<this.data.length;c++)f=this.data[c],e=h.isLog&&h.val2lin?h.val2lin(f.z):f.z,f.plotZ=h.translate(e),f.isInside=f.isInside?e>=h.min&&e<=h.max:!1,d.push({x:f.plotX,y:f.plotY,z:f.plotZ});g=p(d,g,!0);for(c=0;c<this.data.length;c++)f=this.data[c],h=g[c],f.plotXold=f.plotX,f.plotYold=f.plotY,f.plotZold=f.plotZ,f.plotX=h.x,f.plotY=h.y,f.plotZ=h.z}});r(q.scatter.prototype,"init",function(a,
g,h){g.is3d()&&(this.axisTypes=["xAxis","yAxis","zAxis"],this.pointArrayMap=["x","y","z"],this.parallelArrays=["x","y","z"],this.directTouch=!0);a=a.apply(this,[g,h]);this.chart.is3d()&&(this.tooltipOptions.pointFormat=this.userOptions.tooltip?this.userOptions.tooltip.pointFormat||"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e":"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e");
return a});r(q.scatter.prototype,"pointAttribs",function(k,g){var h=k.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&g&&(h.zIndex=a.pointCameraDistance(g,this.chart));return h});r(w.prototype,"applyOptions",function(a){var g=a.apply(this,[].slice.call(arguments,1));this.series.chart.is3d()&&void 0===g.z&&(g.z=0);return g})})(x)});