/*
 Highcharts JS v5.0.11-modified (2017-05-05)
 Boost module

 (c) 2010-2017 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(A){"object"===typeof module&&module.exports?module.exports=A:A(Highcharts)})(function(A){(function(h){function z(a){return a.series.length>=G(a.options.boost&&a.options.boost.seriesThreshold,10)}function B(a){function c(){var a=Array.prototype.slice.call(arguments),c=-Number.MAX_VALUE;C(a,function(a){if("undefined"!==typeof a&&"undefined"!==typeof a.length&&0<a.length)return c=a.length,!0});return c}return z(a.chart)||c(a.processedXData,a.options.data,a.points)>=(a.options.boostThreshold||
Number.MAX_VALUE)}function A(a){function c(b,c){c=a.createShader("vertex"===c?a.VERTEX_SHADER:a.FRAGMENT_SHADER);a.shaderSource(c,b);a.compileShader(c);return a.getShaderParameter(c,a.COMPILE_STATUS)?c:!1}function d(){function e(b){return a.getUniformLocation(l,b)}var d=c("#version 100\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value \x3d aVertexPosition.w;\nfloat zMax \x3d bubbleZMax;\nfloat zMin \x3d bubbleZMin;\nfloat radius \x3d 0.0;\nfloat pos \x3d 0.0;\nfloat zRange \x3d zMax - zMin;\nif (bubbleSizeAbs){\nvalue \x3d value - bubbleZThreshold;\nzMax \x3d max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin \x3d 0.0;\n}\nif (value \x3c zMin){\nradius \x3d bubbleZMin / 2.0 - 1.0;\n} else {\npos \x3d zRange \x3e 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea \x26\x26 pos \x3e 0.0){\npos \x3d sqrt(pos);\n}\nradius \x3d ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord\n){\nfloat sign \x3d 1.0;\nfloat cvsOffset \x3d 0.0;\nif (cvsCoord) {\nsign *\x3d -1.0;\ncvsOffset \x3d len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value){\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold){\nfloat v;\nif (skipTranslation){\nv \x3d value;// + yAxisPos;\n} else {\nv \x3d translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord);// + yAxisPos;\n}\nif (checkTreshold \x3e 0.0 \x26\x26 hasThreshold) {\nv \x3d min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize \x3d bubbleRadius();\n} else {\ngl_PointSize \x3d pSize;\n}\nvColor \x3d aColor;\nif (isInverted) {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.y) + yAxisPos, yToPixels(aVertexPosition.x, aVertexPosition.z) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
"vertex"),f=c("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col \x3d fillColor;\nif (hasColor) {\ncol \x3d vColor;\n}\nif (isCircle) {\ngl_FragColor \x3d col * texture2D(uSampler, gl_PointCoord.st);\n} else {\ngl_FragColor \x3d col;\n}\n}","fragment");if(!d||!f)return l=!1;l=a.createProgram();a.attachShader(l,d);a.attachShader(l,f);a.linkProgram(l);
a.useProgram(l);a.bindAttribLocation(l,0,"aVertexPosition");h=e("uPMatrix");n=e("pSize");I=e("fillColor");y=e("isBubble");k=e("bubbleSizeAbs");t=e("bubbleSizeByArea");D=e("uSampler");b=e("skipTranslation");p=e("isCircle");g=e("isInverted");return!0}function f(b,c){b=e[b]=e[b]||a.getUniformLocation(l,b);a.uniform1f(b,c)}var e={},l,h,n,I,y,k,t,b,p,g,D;a&&d();return{psUniform:function(){return n},pUniform:function(){return h},fillColorUniform:function(){return I},setBubbleUniforms:function(b,c,e){var d=
b.options,l=Number.MAX_VALUE,h=-Number.MAX_VALUE;"bubble"===b.type&&(l=G(d.zMin,Math.min(l,Math.max(c,!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),h=G(d.zMax,Math.max(h,e)),a.uniform1i(y,1),a.uniform1i(p,1),a.uniform1i(t,"width"!==b.options.sizeBy),a.uniform1i(k,b.options.sizeByAbsoluteValue),f("bubbleZMin",l),f("bubbleZMax",h),f("bubbleZThreshold",b.options.zThreshold),f("bubbleMinSize",b.minPxSize),f("bubbleMaxSize",b.maxPxSize))},bind:function(){a.useProgram(l)},program:function(){return l},
create:d,setUniform:f,setPMatrix:function(b){a.uniformMatrix4fv(h,!1,b)},setColor:function(b){a.uniform4f(I,b[0]/255,b[1]/255,b[2]/255,b[3])},setPointSize:function(b){a.uniform1f(n,b)},setSkipTranslation:function(c){a.uniform1i(b,!0===c?1:0)},setTexture:function(){a.uniform1i(D,0)},setDrawAsCircle:function(b){a.uniform1i(p,b?1:0)},reset:function(){a.uniform1i(y,0);a.uniform1i(p,0)},setInverted:function(b){a.uniform1i(g,b)},destroy:function(){a&&l&&a.deleteProgram(l)}}}function X(a,c,d){var f=!1,e=
!1,l=d||2,h=!1,n=0,g;return{destroy:function(){f&&a.deleteBuffer(f)},bind:function(){if(!f)return!1;a.vertexAttribPointer(e,l,a.FLOAT,!1,0,0)},data:g,build:function(d,k,t){g=d||[];if(!(g&&0!==g.length||h))return f=!1;l=t||l;f&&a.deleteBuffer(f);f=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,f);a.bufferData(a.ARRAY_BUFFER,h||new Float32Array(g),a.STATIC_DRAW);e=a.getAttribLocation(c.program(),k);a.enableVertexAttribArray(e);return!0},render:function(c,e,d){var b=h?h.length:g.length;if(!f||!b)return!1;
if(!c||c>b||0>c)c=0;if(!e||e>b)e=b;a.drawArrays(a[(d||"points").toUpperCase()],c/l,(e-c)/l);return!0},allocate:function(a){n=-1;h=new Float32Array(4*a)},push:function(a,c,e,b){h&&(h[++n]=a,h[++n]=c,h[++n]=e,h[++n]=b)}}}function fa(a){function c(a){var b,c;return B(a)?(b=!!a.options.stacking,c=a.xData||a.options.xData||a.processedXData,b=(b?a.data:c||a.options.data).length,"treemap"===a.type?b*=12:"heatmap"===a.type?b*=6:N[a.type]&&(b*=2),b):0}function d(){b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT)}
function f(a,b){function c(a){a&&(b.colorData.push(a[0]),b.colorData.push(a[1]),b.colorData.push(a[2]),b.colorData.push(a[3]))}function e(a,b,e,d,f){c(f);q.usePreallocated?t.push(a,b,e?1:0,d||1):(D.push(a),D.push(b),D.push(e?1:0),D.push(d||1))}function d(a,b,d,f,v){c(v);e(a+d,b);c(v);e(a,b);c(v);e(a,b+f);c(v);e(a,b+f);c(v);e(a+d,b+f);c(v);e(a+d,b)}function f(a){q.useGPUTranslations||(b.skipTranslation=!0,a.x=B.toPixels(a.x,!0),a.y=F.toPixels(a.y,!0));e(a.x,a.y,0,2)}var v=a.pointArrayMap&&"low,high"===
a.pointArrayMap.join(","),k=a.chart,m=a.options,l=!!m.stacking,g=m.data,n=a.xAxis.getExtremes(),p=n.min,u=n.max,n=a.yAxis.getExtremes(),r=n.min,z=n.max,n=a.xData||m.xData||a.processedXData,w=a.yData||m.yData||a.processedYData,y=a.zData||m.zData||a.processedZData,F=a.yAxis,B=a.xAxis,L=!n||0===n.length,x=a.points||!1,I=!1,E,J,K,H=l?a.data:n||g,A={x:Number.MIN_VALUE,y:0},R={x:Number.MIN_VALUE,y:0};m.boostData&&0<m.boostData.length||(a.closestPointRangePx=Number.MAX_VALUE,x&&0<x.length?(b.skipTranslation=
!0,b.drawMode="triangles",x[0].node&&x[0].node.levelDynamic&&x.sort(function(a,b){if(a.node){if(a.node.levelDynamic>b.node.levelDynamic)return 1;if(a.node.levelDynamic<b.node.levelDynamic)return-1}return 0}),C(x,function(b){var c=b.plotY,e;void 0===c||isNaN(c)||null===b.y||(c=b.shapeArgs,e=b.series.colorAttribs(b),b=e["stroke-width"]||0,J=h.color(e.fill).rgba,J[0]/=255,J[1]/=255,J[2]/=255,"treemap"===a.type&&(b=b||1,K=h.color(e.stroke).rgba,K[0]/=255,K[1]/=255,K[2]/=255,d(c.x,c.y,c.width,c.height,
K),b/=2),d(c.x+b,c.y+b,c.width-2*b,c.height-2*b,J))})):(C(H,function(c,d){var f,m,h,n=!1,P=!1,g=!1,Y=!1,ga=N[a.type],t=!1,x=!0;if("undefined"===typeof k.index)return!1;L?(f=c[0],m=c[1],H[d+1]&&(P=H[d+1][0]),H[d-1]&&(n=H[d-1][0]),3<=c.length&&(h=c[2],c[2]>b.zMax&&(b.zMax=c[2]),c[2]<b.zMin&&(b.zMin=c[2]))):(f=c,m=w[d],H[d+1]&&(P=H[d+1]),H[d-1]&&(n=H[d-1]),y&&y.length&&(h=y[d],y[d]>b.zMax&&(b.zMax=y[d]),y[d]<b.zMin&&(b.zMin=y[d])));P&&P>=p&&P<=u&&(g=!0);n&&n>=p&&n<=u&&(Y=!0);v?(L&&(m=c.slice(1,3)),m=
m[1]):l&&(f=c.x,m=c.stackY);a.requireSorting||(x=m>=r&&m<=z);f>u&&R.x<u&&(R.x=f,R.y=m);f<p&&A.x<p&&(A.x=f,A.y=m);if(0===m||m&&x)if(f>=p&&f<=u&&(t=!0),t||g||Y)q.useGPUTranslations||(b.skipTranslation=!0,f=B.toPixels(f,!0),m=F.toPixels(m,!0)),ga&&(E=0,0>m&&(E=m,m=0),q.useGPUTranslations||(E=F.toPixels(E,!0)),e(f,E,0,0,!1)),b.hasMarkers&&!1!==I&&(a.closestPointRangePx=Math.min(a.closestPointRangePx,Math.abs(f-I))),e(f,m,0,"bubble"===a.type?h||1:2,!1),I=f}),I||(f(A),f(R))))}function e(){u=[];x.data=D=
[];z=[]}function l(a){k&&(k.setUniform("xAxisTrans",a.transA),k.setUniform("xAxisMin",a.min),k.setUniform("xAxisMinPad",a.minPixelPadding),k.setUniform("xAxisPointRange",a.pointRange),k.setUniform("xAxisLen",a.len),k.setUniform("xAxisPos",a.pos),k.setUniform("xAxisCVSCoord",!a.horiz))}function g(a){k&&(k.setUniform("yAxisTrans",a.transA),k.setUniform("yAxisMin",a.min),k.setUniform("yAxisMinPad",a.minPixelPadding),k.setUniform("yAxisPointRange",a.pointRange),k.setUniform("yAxisLen",a.len),k.setUniform("yAxisPos",
a.pos),k.setUniform("yAxisCVSCoord",!a.horiz))}function n(a,b){k.setUniform("hasThreshold",a);k.setUniform("translatedThreshold",b)}function r(c){if(c)p=c.chartWidth||800,F=c.chartHeight||400;else return!1;if(!b||!p||!F)return!1;q.timeRendering&&console.time("gl rendering");k.bind();b.viewport(0,0,p,F);k.setPMatrix([2/p,0,0,0,0,-(2/F),0,0,0,0,-2,0,-1,1,-1,1]);1<q.lineWidth&&!h.isMS&&b.lineWidth(q.lineWidth);t.build(x.data,"aVertexPosition",4);t.bind();w&&(b.bindTexture(b.TEXTURE_2D,E),k.setTexture(E));
k.setInverted(c.options.chart?c.options.chart.inverted:!1);C(u,function(a,c){var e=a.series.options,d=e.threshold,f=Q(d),d=a.series.yAxis.getThreshold(d),m=G(e.marker?e.marker.enabled:null,a.series.xAxis.isRadial?!0:null,a.series.closestPointRangePx>2*((e.marker?e.marker.radius:10)||10)),v=a.series.fillOpacity?(new Z(a.series.color)).setOpacity(G(e.fillOpacity,.85)).get():a.series.color;t.bind();e.colorByPoint&&(v=a.series.chart.options.colors[c]);v=h.color(v).rgba;q.useAlpha||(v[3]=1);"add"===e.boostBlending?
(b.blendFunc(b.SRC_ALPHA,b.ONE),b.blendEquation(b.FUNC_ADD)):"mult"===e.boostBlending?b.blendFunc(b.DST_COLOR,b.ZERO):"darken"===e.boostBlending?(b.blendFunc(b.ONE,b.ONE),b.blendEquation(b.FUNC_MIN)):b.blendFuncSeparate(b.SRC_ALPHA,b.ONE_MINUS_SRC_ALPHA,b.ONE,b.ONE_MINUS_SRC_ALPHA);k.reset();0<a.colorData.length&&(k.setUniform("hasColor",1),c=X(b,k),c.build(a.colorData,"aColor",4),c.bind());k.setColor(v);l(a.series.xAxis);g(a.series.yAxis);n(f,d);"points"===a.drawMode&&(e.marker&&e.marker.radius?
k.setPointSize(2*e.marker.radius):k.setPointSize(1));k.setSkipTranslation(a.skipTranslation);"bubble"===a.series.type&&k.setBubbleUniforms(a.series,a.zMin,a.zMax);k.setDrawAsCircle(ha[a.series.type]&&w||!1);t.render(a.from,a.to,a.drawMode);a.hasMarkers&&m&&(e.marker&&e.marker.radius?k.setPointSize(2*e.marker.radius):k.setPointSize(10),k.setDrawAsCircle(!0),t.render(a.from,a.to,"POINTS"))});t.destroy();q.timeRendering&&console.timeEnd("gl rendering");e();a&&a()}function y(a){d();if(a.renderer.forExport)return r(a);
L?r(a):setTimeout(function(){y(a)},1)}var k=!1,t=!1,b=!1,p=0,F=0,D=!1,z=!1,w=!1,x={},L=!1,u=[],M=U.createElement("canvas"),O=M.getContext("2d"),E,N={column:!0,area:!0},ha={scatter:!0,bubble:!0},q={pointSize:1,lineWidth:3,fillColor:"#AA00AA",useAlpha:!0,usePreallocated:!1,useGPUTranslations:!1,timeRendering:!1,timeSeriesProcessing:!1,timeSetup:!1};return x={allocateBufferForSingleSeries:function(a){var b=0;q.usePreallocated&&(B(a)&&(b=c(a)),t.allocate(b))},pushSeries:function(a){0<u.length&&(u[u.length-
1].to=D.length,u[u.length-1].hasMarkers&&(u[u.length-1].markerTo=z.length));q.timeSeriesProcessing&&console.time("building "+a.type+" series");u.push({from:D.length,markerFrom:z.length,colorData:[],series:a,zMin:Number.MAX_VALUE,zMax:-Number.MAX_VALUE,hasMarkers:a.options.marker?!1!==a.options.marker.enabled:!1,showMarksers:!0,drawMode:{area:"lines",arearange:"lines",areaspline:"line_strip",column:"lines",line:"line_strip",scatter:"points",heatmap:"triangles",treemap:"triangles",bubble:"points"}[a.type]||
"line_strip"});f(a,u[u.length-1]);q.timeSeriesProcessing&&console.timeEnd("building "+a.type+" series")},setSize:function(a,b){if(p!==a||b!==b)p=a,F=b,k.bind(),k.setPMatrix([2/p,0,0,0,0,-(2/F),0,0,0,0,-2,0,-1,1,-1,1])},inited:function(){return L},setThreshold:n,init:function(a,c){var d=0,f=["webgl","experimental-webgl","moz-webgl","webkit-3d"];L=!1;if(!a)return!1;for(q.timeSetup&&console.time("gl setup");d<f.length&&!(b=a.getContext(f[d]));d++);if(b)c||e();else return!1;b.enable(b.BLEND);b.blendFunc(b.SRC_ALPHA,
b.ONE_MINUS_SRC_ALPHA);b.disable(b.DEPTH_TEST);b.depthMask(b.FALSE);k=A(b);t=X(b,k);w=!1;E=b.createTexture();M.width=512;M.height=512;O.fillStyle="#FFF";O.beginPath();O.arc(256,256,256,0,2*Math.PI);O.fill();try{b.bindTexture(b.TEXTURE_2D,E),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,M),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,
b.TEXTURE_MIN_FILTER,b.LINEAR_MIPMAP_LINEAR),b.generateMipmap(b.TEXTURE_2D),b.bindTexture(b.TEXTURE_2D,null),w=!0}catch(na){}L=!0;q.timeSetup&&console.timeEnd("gl setup");return!0},render:y,settings:q,valid:function(){return!1!==b},clear:d,flush:e,setXAxis:l,setYAxis:g,data:D,gl:function(){return b},allocateBuffer:function(a){var b=0;q.usePreallocated&&(C(a.series,function(a){B(a)&&(b+=c(a))}),t.allocate(b))},destroy:function(){t.destroy();k.destroy()},setOptions:function(a){ia(!0,q,a)}}}function aa(a,
c){var d=a.chartWidth,f=a.chartHeight,e=a,l=a.seriesGroup||c.group,g=function(a,e,d,f,h,b,l){a.call(c,d,e,f,h,b,l)},e=z(a)?a:c;e.image||(e.canvas=U.createElement("canvas"),e.image=a.renderer.image("",0,0,d,f).add(l),e.boostClipRect=a.renderer.clipRect(a.plotLeft,a.plotTop,a.plotWidth,a.chartHeight),e.image.clip(e.boostClipRect),e.inverted&&C(["moveTo","lineTo","rect","arc"],function(a){r(!1,a,g)}),e instanceof h.Chart&&(e.markerGroup=e.renderer.g().add(l),e.markerGroup.translate(c.xAxis.pos,c.yAxis.pos)));
e.canvas.width=d;e.canvas.height=f;e.image.attr({x:0,y:0,width:d,height:f,style:"pointer-events: none"});e.boostClipRect.attr({x:a.plotLeft,y:a.plotTop,width:a.plotWidth,height:a.chartHeight});e.ogl||(e.ogl=fa(function(){e.image.attr({href:e.canvas.toDataURL("image/png")})}),e.ogl.init(e.canvas),e.ogl.setOptions(a.options.boost||{}),e instanceof h.Chart&&e.ogl.allocateBuffer(a));e.ogl.setSize(d,f);return e.ogl}function ba(a,c,d){a&&c.image&&c.canvas&&!z(d||c.chart)&&a.render(d||c.chart)}function ca(a,
c){a&&c.image&&c.canvas&&!z(c.chart)&&a.allocateBufferForSingleSeries(c)}function S(a,c,d,f,e,h){e=e||0;f=f||5E4;for(var l=e+f,g=!0;g&&e<l&&e<a.length;)g=c(a[e],e),++e;g&&(e<a.length?h?S(a,c,d,f,e,h):T.requestAnimationFrame?T.requestAnimationFrame(function(){S(a,c,d,f,e)}):setTimeout(function(){S(a,c,d,f,e)}):d&&d())}function ja(a){if(!B(this))return a.call(this);if(a=aa(this.chart,this))ca(a,this),a.pushSeries(this);ba(a,this)}var T=h.win,U=T.document,ka=function(){},Z=h.Color,w=h.Series,g=h.seriesTypes,
C=h.each,da=h.extend,ea=h.addEvent,la=h.fireEvent,ma=h.grep,Q=h.isNumber,ia=h.merge,G=h.pick,r=h.wrap,V=h.getOptions().plotOptions,W;Z.prototype.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",
crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",feldspar:"#d19275",firebrick:"#b22222",
floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",
lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslateblue:"#8470ff",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",
mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",
sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",violetred:"#d02090",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};w.prototype.getPoint=function(a){var c=a,d=this.xData||this.options.xData||this.processedXData||
!1;!a||a instanceof this.pointClass||(c=(new this.pointClass).init(this,this.options.data[a.i],d?d[a.i]:void 0),c.category=c.x,c.dist=a.dist,c.distX=a.distX,c.plotX=a.plotX,c.plotY=a.plotY,c.index=a.i);return c};r(w.prototype,"searchPoint",function(a){return this.getPoint(a.apply(this,[].slice.call(arguments,1)))});r(w.prototype,"destroy",function(a){var c=this,d=c.chart;d.markerGroup===c.markerGroup&&(c.markerGroup=null);d.hoverPoints&&(d.hoverPoints=ma(d.hoverPoints,function(a){return a.series===
c}));d.hoverPoint&&d.hoverPoint.series===c&&(d.hoverPoint=null);a.call(this)});r(w.prototype,"getExtremes",function(a){if(!B(this)||!this.hasExtremes||!this.hasExtremes())return a.apply(this,Array.prototype.slice.call(arguments,1))});C("area arearange column line scatter heatmap bubble treemap heatmap".split(" "),function(a){V[a]&&(V[a].boostThreshold=5E3,V[a].boostData=[])});C(["translate","generatePoints","drawTracker","drawPoints","render"],function(a){function c(c){var d=this.options.stacking&&
("translate"===a||"generatePoints"===a);if(!B(this)||d||"heatmap"===this.type||"treemap"===this.type)"render"===a&&this.image&&!z(this.chart)&&(this.image.attr({href:""}),this.animate=null),c.call(this);else if(this[a+"Canvas"])this[a+"Canvas"]()}r(w.prototype,a,c);"translate"===a&&(g.column&&r(g.column.prototype,a,c),g.arearange&&r(g.arearange.prototype,a,c),g.treemap&&r(g.treemap.prototype,a,c))});(function(){var a=0,c,d=["webgl","experimental-webgl","moz-webgl","webkit-3d"],f=!1;if("undefined"!==
typeof T.WebGLRenderingContext)for(c=U.createElement("canvas");a<d.length;a++)try{if(f=c.getContext(d[a]),"undefined"!==typeof f&&null!==f)return!0}catch(e){}return!1})()?(r(w.prototype,"processData",function(a){B(this)&&"heatmap"!==this.type&&"treemap"!==this.type||a.apply(this,Array.prototype.slice.call(arguments,1));this.hasExtremes&&this.hasExtremes(!0)||a.apply(this,Array.prototype.slice.call(arguments,1))}),h.extend(w.prototype,{pointRange:0,directTouch:!1,allowDG:!1,hasExtremes:function(a){var c=
this.options,d=this.xAxis&&this.xAxis.options,f=this.yAxis&&this.yAxis.options;return c.data.length>(c.boostThreshold||Number.MAX_VALUE)&&Q(f.min)&&Q(f.max)&&(!a||Q(d.min)&&Q(d.max))},destroyGraphics:function(){var a=this,c=this.points,d,f;if(c)for(f=0;f<c.length;f+=1)(d=c[f])&&d.graphic&&(d.graphic=d.graphic.destroy());C(["graph","area","tracker"],function(c){a[c]&&(a[c]=a[c].destroy())})},renderCanvas:function(){var a=this,c=a.options||{},d=!1,f=a.chart,e=this.xAxis,h=this.yAxis,g=c.xData||a.processedXData,
n=c.yData||a.processedYData,r=c.data,d=e.getExtremes(),y=d.min,k=d.max,d=h.getExtremes(),t=d.min,b=d.max,p={},w,D=!!a.sampling,A,B=!1!==c.enableMouseTracking,x=h.getThreshold(c.threshold),C=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),u=!!c.stacking,M=a.cropStart||0,O=a.requireSorting,E=!g,N,G,q,v,m=function(a,b,c){W=a+","+b;B&&!p[W]&&(p[W]=!0,f.inverted&&(a=e.len-a,b=h.len-b),A.push({clientX:a,plotX:a,plotY:b,i:M+c}))},d=aa(f,a);this.visible?((this.points||this.graph)&&this.destroyGraphics(),
z(f)?this.markerGroup=f.markerGroup:this.markerGroup=a.plotGroup("markerGroup","markers",!0,1,f.seriesGroup),A=this.points=[],a.buildKDTree=ka,d&&(ca(d,this),d.pushSeries(a),ba(d,this,f)),S(u?a.data:g||r,function(a,c){var d,g,l,p="undefined"===typeof f.index,r=!0;if(!p&&(E?(d=a[0],g=a[1]):(d=a,g=n[c]),C?(E&&(g=a.slice(1,3)),l=g[0],g=g[1]):u&&(d=a.x,g=a.stackY,l=g-a.y),O||(r=g>=t&&g<=b),null!==g&&d>=y&&d<=k&&r))if(a=Math.ceil(e.toPixels(d,!0)),D){if(void 0===q||a===w){C||(l=g);if(void 0===v||g>G)G=
g,v=c;if(void 0===q||l<N)N=l,q=c}a!==w&&(void 0!==q&&(g=h.toPixels(G,!0),x=h.toPixels(N,!0),m(a,g,v),x!==g&&m(a,x,q)),q=v=void 0,w=a)}else g=Math.ceil(h.toPixels(g,!0)),m(a,g,c);return!p},function(){la(a,"renderedCanvas");a.directTouch=!1;a.options.stickyTracking=!0;delete a.buildKDTree;a.buildKDTree()},f.renderer.forExport?Number.MAX_VALUE:void 0)):!z(f)&&d&&(d.clear(),this.image.attr({href:""}))}}),C(["heatmap","treemap"],function(a){g[a]&&(r(g[a].prototype,"drawPoints",ja),g[a].prototype.directTouch=
!1)}),g.bubble&&(delete g.bubble.prototype.buildKDTree,g.bubble.prototype.directTouch=!1,r(g.bubble.prototype,"markerAttribs",function(a){return B(this)?!1:a.apply(this,[].slice.call(arguments,1))})),g.scatter.prototype.fill=!0,da(g.area.prototype,{fill:!0,fillOpacity:!0,sampling:!0}),da(g.column.prototype,{fill:!0,sampling:!0}),r(w.prototype,"setVisible",function(a,c){a.call(this,c,!1);!1===this.visible&&this.ogl&&this.canvas&&this.image?(this.ogl.clear(),this.image.attr({href:""})):this.chart.redraw()}),
h.Chart.prototype.callbacks.push(function(a){ea(a,"predraw",function(){a.canvas&&a.ogl&&z(a)&&a.ogl.allocateBuffer(a);a.markerGroup&&a.markerGroup.translate(a.xAxis[0].pos,a.yAxis[0].pos)});ea(a,"render",function(){a.ogl&&z(a)&&a.ogl.render(a)})})):"undefined"!==typeof h.initCanvasBoost?h.initCanvasBoost():h.error(26)})(A)});