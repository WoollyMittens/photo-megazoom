!function(){function a(t){return this.only=function(t){return new this.Main(t,this)},this.each=function(t){for(var i,e=[],n=0,o=t.elements.length;n<o;n+=1)(i=Object.create(t)).element=t.elements[n],delete i.elements,e[n]=new this.Main(i,this);return e},t.elements?this.each(t):this.only(t)}a.prototype.Main=function(t,i){this.config=t,this.context=i,this.element=t.element,this.paused=!1,this.init=function(){this.config=this.checkConfig(t),t.allowSingle&&(this.single=new this.context.Single(this)),t.allowMulti&&(this.multi=new this.context.Multi(this))},this.checkConfig=function(t){return t.threshold=t.threshold||50,t.increment=t.increment||.1,void 0!==t.cancelTouch&&null!==t.cancelTouch||(t.cancelTouch=!0),void 0!==t.cancelGesture&&null!==t.cancelGesture||(t.cancelGesture=!0),(t.swipeUp||t.swipeLeft||t.swipeRight||t.swipeDown||t.drag||t.doubleTap)&&(t.allowSingle=!0,t.swipeUp=t.swipeUp||function(){},t.swipeLeft=t.swipeLeft||function(){},t.swipeRight=t.swipeRight||function(){},t.swipeDown=t.swipeDown||function(){},t.drag=t.drag||function(){},t.doubleTap=t.doubleTap||function(){}),(t.pinch||t.twist)&&(t.allowMulti=!0,t.pinch=t.pinch||function(){},t.twist=t.twist||function(){}),t},this.readEvent=function(t){var i={};return t.touches&&t.touches[0]?(i.x=t.touches[0].pageX,i.y=t.touches[0].pageY):void 0!==t.pageX?(i.x=t.pageX,i.y=t.pageY):(i.x=t.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft),i.y=t.clientY+(document.documentElement.scrollTop||document.body.scrollTop)),i},this.correctOffset=function(t){var i=0,e=0;if(t.offsetParent)for(;t!==this.element;)i+=t.offsetLeft,e+=t.offsetTop,t=t.offsetParent;return{x:i,y:e}},this.enableDefaultTouch=function(){this.config.cancelTouch=!1},this.disableDefaultTouch=function(){this.config.cancelTouch=!0},this.enableDefaultGesture=function(){this.config.cancelGesture=!1},this.disableDefaultGesture=function(){this.config.cancelGesture=!0},this.init()},a.prototype.Multi=function(t){this.parent=t,this.config=t.config,this.element=t.config.element,this.gestureOrigin=null,this.gestureProgression=null,this.init=function(){this.element.addEventListener("mousewheel",this.onChangeWheel()),navigator.userAgent.match(/firefox/gi)&&this.element.addEventListener("DOMMouseScroll",this.onChangeWheel()),"ongesturestart"in window?(this.element.addEventListener("gesturestart",this.onStartGesture()),this.element.addEventListener("gesturechange",this.onChangeGesture()),this.element.addEventListener("gestureend",this.onEndGesture())):"msgesturestart"in window?(this.element.addEventListener("msgesturestart",this.onStartGesture()),this.element.addEventListener("msgesturechange",this.onChangeGesture()),this.element.addEventListener("msgestureend",this.onEndGesture())):(this.element.addEventListener("touchstart",this.onStartFallback()),this.element.addEventListener("touchmove",this.onChangeFallback()),this.element.addEventListener("touchend",this.onEndFallback()))},this.cancelGesture=function(t){this.config.cancelGesture&&(t=t||window.event).preventDefault()},this.startGesture=function(t){this.parent.paused||(this.gestureOrigin={scale:t.scale,rotation:t.rotation,target:t.target||t.srcElement},this.gestureProgression={scale:this.gestureOrigin.scale,rotation:this.gestureOrigin.rotation})},this.changeGesture=function(t){var i,e,n;this.gestureOrigin&&(i=t.scale,e=t.rotation,n=this.parent.readEvent(t),this.config.pinch({x:n.x,y:n.y,scale:i-this.gestureProgression.scale,event:t,target:this.gestureOrigin.target}),this.config.twist({x:n.x,y:n.y,rotation:e-this.gestureProgression.rotation,event:t,target:this.gestureOrigin.target}),this.gestureProgression={scale:t.scale,rotation:t.rotation})},this.endGesture=function(){this.gestureOrigin=null},this.startFallback=function(t){this.parent.paused||2!==t.touches.length||(this.gestureOrigin={touches:[{pageX:t.touches[0].pageX,pageY:t.touches[0].pageY},{pageX:t.touches[1].pageX,pageY:t.touches[1].pageY}],target:t.target||t.srcElement},this.gestureProgression={touches:this.gestureOrigin.touches})},this.changeFallback=function(t){var i,e,n;this.gestureOrigin&&2===t.touches.length&&(i=this.parent.readEvent(t),e=0,n=this.gestureProgression,e+=(t.touches[0].pageX-t.touches[1].pageX)/(n.touches[0].pageX-n.touches[1].pageX),e+=(t.touches[0].pageY-t.touches[1].pageY)/(n.touches[0].pageY-n.touches[1].pageY),this.config.pinch({x:i.x,y:i.y,scale:e-=2,event:t,target:this.gestureOrigin.target}),this.gestureProgression={touches:[{pageX:t.touches[0].pageX,pageY:t.touches[0].pageY},{pageX:t.touches[1].pageX,pageY:t.touches[1].pageY}]})},this.endFallback=function(){this.gestureOrigin=null},this.changeWheel=function(t){var i=1,e=window.event?window.event.wheelDelta/120:-t.detail/3,n=this.parent.readEvent(t),i=0<e?+this.config.increment:-this.config.increment;this.config.pinch({x:n.x,y:n.y,scale:i,event:t,source:t.target||t.srcElement})},this.onStartGesture=function(){var i=this;return function(t){i.cancelGesture(t),i.startGesture(t),i.changeGesture(t)}},this.onChangeGesture=function(){var i=this;return function(t){i.cancelGesture(t),i.changeGesture(t)}},this.onEndGesture=function(){var i=this;return function(t){i.endGesture(t)}},this.onStartFallback=function(){var i=this;return function(t){i.startFallback(t),i.changeFallback(t)}},this.onChangeFallback=function(){var i=this;return function(t){i.cancelGesture(t),i.changeFallback(t)}},this.onEndFallback=function(){var i=this;return function(t){i.endGesture(t)}},this.onChangeWheel=function(){var i=this;return function(t){t=t||window.event,i.cancelGesture(t),i.changeWheel(t)}},this.init()},a.prototype.Single=function(t){this.parent=t,this.config=t.config,this.element=t.config.element,this.lastTouch=null,this.touchOrigin=null,this.touchProgression=null,this.init=function(){this.element.addEventListener("mousedown",this.onStartTouch()),this.element.addEventListener("mousemove",this.onChangeTouch()),document.body.addEventListener("mouseup",this.onEndTouch()),this.element.addEventListener("touchstart",this.onStartTouch()),this.element.addEventListener("touchmove",this.onChangeTouch()),document.body.addEventListener("touchend",this.onEndTouch()),this.element.addEventListener("mspointerdown",this.onStartTouch()),this.element.addEventListener("mspointermove",this.onChangeTouch()),document.body.addEventListener("mspointerup",this.onEndTouch())},this.cancelTouch=function(t){this.config.cancelTouch&&(t=t||window.event).preventDefault()},this.startTouch=function(t){var i;this.parent.paused||(i=this.parent.readEvent(t),this.touchOrigin={x:i.x,y:i.y,target:t.target||t.srcElement},this.touchProgression={x:this.touchOrigin.x,y:this.touchOrigin.y})},this.changeTouch=function(t){var i;this.touchOrigin&&(i=this.parent.readEvent(t),this.config.drag({x:this.touchOrigin.x,y:this.touchOrigin.y,horizontal:i.x-this.touchProgression.x,vertical:i.y-this.touchProgression.y,event:t,source:this.touchOrigin.target}),this.touchProgression={x:i.x,y:i.y})},this.endTouch=function(t){var i;this.touchOrigin&&this.touchProgression&&(i={x:this.touchProgression.x-this.touchOrigin.x,y:this.touchProgression.y-this.touchOrigin.y},this.lastTouch&&Math.abs(this.touchOrigin.x-this.lastTouch.x)<10&&Math.abs(this.touchOrigin.y-this.lastTouch.y)<10&&(new Date).getTime()-this.lastTouch.time<500&&100<(new Date).getTime()-this.lastTouch.time?this.config.doubleTap({x:this.touchOrigin.x,y:this.touchOrigin.y,event:t,source:this.touchOrigin.target}):Math.abs(i.x)>Math.abs(i.y)?i.x>this.config.threshold?this.config.swipeRight({x:this.touchOrigin.x,y:this.touchOrigin.y,distance:i.x,event:t,source:this.touchOrigin.target}):i.x<-this.config.threshold&&this.config.swipeLeft({x:this.touchOrigin.x,y:this.touchOrigin.y,distance:-i.x,event:t,source:this.touchOrigin.target}):i.y>this.config.threshold?this.config.swipeDown({x:this.touchOrigin.x,y:this.touchOrigin.y,distance:i.y,event:t,source:this.touchOrigin.target}):i.y<-this.config.threshold&&this.config.swipeUp({x:this.touchOrigin.x,y:this.touchOrigin.y,distance:-i.y,event:t,source:this.touchOrigin.target}),this.lastTouch={x:this.touchOrigin.x,y:this.touchOrigin.y,time:(new Date).getTime()}),this.touchProgression=null,this.touchOrigin=null},this.onStartTouch=function(){var i=this;return function(t){t=t||window.event,i.startTouch(t),i.changeTouch(t)}},this.onChangeTouch=function(){var i=this;return function(t){t=t||window.event,i.cancelTouch(t),i.changeTouch(t)}},this.onEndTouch=function(){var i=this;return function(t){t=t||window.event,i.endTouch(t)}},this.init()};function b(t){for(var i in this.config={element:document.getElementById("zoomExample"),tileSource:"php/imageslice.php?src={src}&left={left}&top={top}&right={right}&bottom={bottom}&width={width}&height={height}",tileCache:128,tileSize:128,allowRotation:!1},t)this.config[i]=t[i];this.main=new this.Main(this),this.transform=this.main.transform.bind(this.main),this.moveBy=this.main.moveBy.bind(this.main),this.moveTo=this.main.moveTo.bind(this.main),this.zoomBy=this.main.zoomBy.bind(this.main),this.zoomTo=this.main.zoomTo.bind(this.main),this.rotateBy=this.main.rotateBy.bind(this.main),this.rotateTo=this.main.rotateTo.bind(this.main)}b.prototype.Controls=function(t){this.context=null,this.config=null,this.element=null,this.zoomIn=null,this.zoomOut=null,this.init=function(t){return this.context=t,this.config=t.config,this.element=document.createElement("menu"),this.element.className="useful-zoom-controls",this.zoomIn=document.createElement("button"),this.zoomIn.className="useful-zoom-in enabled",this.zoomIn.innerHTML="Zoom In",this.zoomIn.addEventListener("touchstart",this.onSuspendTouch.bind(this)),this.zoomIn.addEventListener("mousedown",this.onSuspendTouch.bind(this)),this.zoomIn.addEventListener("touchend",this.onZoom.bind(this,1.5)),this.zoomIn.addEventListener("mouseup",this.onZoom.bind(this,1.5)),this.element.appendChild(this.zoomIn),this.zoomOut=document.createElement("button"),this.zoomOut.className="useful-zoom-out disabled",this.zoomOut.innerHTML="Zoom Out",this.zoomOut.addEventListener("touchstart",this.onSuspendTouch.bind(this)),this.zoomOut.addEventListener("mousedown",this.onSuspendTouch.bind(this)),this.zoomOut.addEventListener("touchend",this.onZoom.bind(this,.75)),this.zoomOut.addEventListener("mouseup",this.onZoom.bind(this,.75)),this.element.appendChild(this.zoomOut),this.context.element.appendChild(this.element),this},this.redraw=function(){var t=this.zoomIn,i=this.zoomOut,e=this.config.dimensions,n=this.config.transformation;t.className=n.zoom<e.maxZoom?t.className.replace("disabled","enabled"):t.className.replace("enabled","disabled"),i.className=1<n.zoom?i.className.replace("disabled","enabled"):i.className.replace("enabled","disabled")},this.onZoom=function(t){event.preventDefault(),this.context.gestures(!0);var i=this.config.transformation,e=this.config.dimensions;i.zoom=Math.max(Math.min(i.zoom*t,e.maxZoom),1),this.context.redraw()},this.onSuspendTouch=function(){event.preventDefault(),this.context.gestures(!1)},this.init(t)},"object"==typeof exports&&"object"==typeof module?module.exports=b:"function"==typeof define&&define.amd?define([],function(){return b}):"object"==typeof exports?exports.Zoom=b:self.Zoom=b,b.prototype.Main=function(t){this.context=null,this.config=null,this.element=null,this.init=function(t){return this.context=t,this.config=t.config,this.element=t.config.element,this.config.transformation={left:.5,top:.5,zoom:1,rotate:0},this.config.dimensions={width:null,height:null,maxWidth:null,maxHeight:null},this.styling=new this.context.Styling(this),this.overlay=new this.context.Overlay(this),this.controls=new this.context.Controls(this),this.touch=new this.context.Touch(this),this.redraw(),this},this.redraw=function(){this.styling.measure(),this.controls.redraw(),this.overlay.redraw()},this.update=function(){this.controls.redraw()},this.gestures=function(t){this.touch.pause(!t)},this.transitions=function(t){this.overlay.transitions(t)},this.transform=function(t){this.config.transformation.left=Math.max(Math.min(t.left,1),0)||this.config.transformation.left,this.config.transformation.top=Math.max(Math.min(t.top,1),0)||this.config.transformation.top,this.config.transformation.zoom=Math.max(Math.min(t.zoom,this.config.dimensions.maxZoom),1)||this.config.transformation.zoom,this.config.transformation.rotate=Math.max(Math.min(t.rotate,359),0)||this.config.transformation.rotate,this.overlay.transitions(!0),setTimeout(this.redraw.bind(this),0)},this.moveBy=function(t,i){this.moveTo(this.config.transformation.left-t,this.config.transformation.top-i)},this.moveTo=function(t,i){this.config.transformation.left=t,this.config.transformation.top=i,this.config.transformation.left=Math.max(Math.min(this.config.transformation.left,1),0),this.config.transformation.top=Math.max(Math.min(this.config.transformation.top,1),0),this.overlay.redraw()},this.zoomBy=function(t){this.zoomTo(this.config.transformation.zoom+t)},this.zoomTo=function(t){this.config.transformation.zoom=t,this.config.transformation.zoom=Math.max(Math.min(this.config.transformation.zoom,this.config.dimensions.maxZoom),1),this.overlay.redraw()},this.rotateBy=function(t){this.rotateTo(this.config.transformation.rotate+t)},this.rotateTo=function(t){this.config.transformation.rotate+=t,this.config.transformation.rotate=Math.max(Math.min(this.config.transformation.rotate,359),0),this.overlay.redraw()},this.init(t)},b.prototype.Overlay=function(t){this.context=null,this.config=null,this.root=null,this.element=null,this.timeout=null,this.tiles={},this.index=0,this.updated=0,this.init=function(t){this.context=t,this.config=t.config,this.root=t.context,this.config.area={};t=this.context.element.getElementsByTagName("img")[0];return this.element=document.createElement("div"),this.element.className="useful-zoom-overlay",this.element.style.backgroundImage="url("+t.getAttribute("src")+")",this.context.element.appendChild(this.element),t.style.visibility="hidden",this},this.redraw=function(){var t=this.config.transformation,i=(new Date).getTime();20<i-this.updated&&(this.updated=i,i="scale("+t.zoom+", "+t.zoom+") rotate("+t.rotate+"deg)",t=100*t.left+"% "+100*t.top+"%",this.element.style.msTransformOrigin=t,this.element.style.WebkitTransformOrigin=t,this.element.style.transformOrigin=t,this.element.style.msTransform=i,this.element.style.WebkitTransform=i,this.element.style.transform=i),clearTimeout(this.timeout),this.timeout=setTimeout(this.update.bind(this),300)},this.update=function(){this.context.update(),this.measure(),this.clean(),this.populate()},this.measure=function(){var t=this.config.transformation,i=this.config.area;i.size=1/t.zoom,i.left=Math.max(t.left-i.size/2,0),i.top=Math.max(t.top-i.size/2,0),i.right=Math.min(i.left+i.size,1),i.bottom=Math.min(i.top+i.size,1)},this.clean=function(){for(var t in this.tiles)this.tiles.hasOwnProperty(t)&&this.tiles[t].redraw()},this.populate=function(){for(var t,i=this.config.dimensions,e=this.config.transformation,n=this.config.area,o=i.width*e.zoom/this.config.tileSize,s=i.height*e.zoom/this.config.tileSize,h=Math.ceil(e.zoom),r=Math.max(Math.floor(n.left*o)-1,0),a=Math.min(Math.ceil(n.right*o)+1,o),e=Math.max(Math.floor(n.top*s)-1,0),c=Math.min(Math.ceil(n.bottom*s)+1,s),l=e;l<c;l+=1)for(var u=r;u<a;u+=1)void 0===this.tiles[t="tile_"+u+"_"+l+"_"+h]&&(this.tiles[t]=new this.root.Tile(this,{name:t,index:this.index,zoom:h,left:u/o,top:l/s,right:1-(u+1)/o,bottom:1-(l+1)/s}),this.index+=1)},this.transitions=function(t){this.element.className=t?this.element.className+" useful-zoom-transition":this.element.className.replace(/useful-zoom-transition| useful-zoom-transition/g,"")},this.init(t)},b.prototype.Styling=function(t){this.context=null,this.config=null,this.element=null,this.init=function(t){this.context=t,this.config=t.config,this.element=t.element;t=document.createElement("style");navigator.userAgent.match(/webkit/gi)&&t.appendChild(document.createTextNode("")),document.body.appendChild(t);t=t.sheet||t.styleSheet;return t.insertRule?(this.config.colorPassive&&t.insertRule(".useful-zoom-controls button {background-color : "+this.config.colorPassive+" !important;}",0),this.config.colorHover&&t.insertRule(".useful-zoom-controls button:hover, .useful-zoom button:active {background-color : "+this.config.colorHover+" !important;}",0),this.config.colorDisabled&&t.insertRule(".useful-zoom-controls button.disabled, .useful-zoom-controls button.disabled:hover {background-color : "+this.config.colorDisabled+" !important;}",0)):(this.config.colorPassive&&t.addRule(".useful-zoom-controls button","background-color : "+this.config.colorPassive+" !important;",0),this.config.colorHover&&t.addRule(".useful-zoom-controls button:hover, .useful-zoom button:active","background-color : "+this.config.colorHover+" !important;",0),this.config.colorDisabled&&t.addRule(".useful-zoom-controls button.disabled, .useful-zoom-controls button.disabled:hover","background-color : "+this.config.colorDisabled+" !important;",0)),this},this.measure=function(){var t=this.element.getElementsByTagName("a")[0];this.config.tileUrl=t.getAttribute("href"),this.config.dimensions.width=this.element.offsetWidth,this.config.dimensions.height=this.element.offsetHeight,this.config.dimensions.maxWidth=parseInt(t.getAttribute("data-width")),this.config.dimensions.maxHeight=parseInt(t.getAttribute("data-height")),this.config.dimensions.maxZoom=this.config.dimensions.maxWidth/this.config.dimensions.width},this.init(t)},b.prototype.Tile=function(t,i){this.context=null,this.config=null,this.element=null,this.name=null,this.index=null,this.zoom=null,this.left=null,this.top=null,this.right=null,this.bottom=null,this.init=function(t,i){this.context=t,this.config=t.config,this.name=i.name,this.index=i.index,this.zoom=i.zoom,this.left=i.left,this.top=i.top,this.right=i.right,this.bottom=i.bottom;t=1;1<this.right&&(t=1-this.left/this.right-this.left,this.right=1);i=1;return 1<this.bottom&&(i=1-this.top/this.bottom-this.top,this.bottom=1),this.element=document.createElement("div"),this.element.id=this.name,this.element.style.position="absolute",this.element.style.left=100*this.left+"%",this.element.style.top=100*this.top+"%",this.element.style.right=100*this.right+"%",this.element.style.bottom=100*this.bottom+"%",this.element.style.backgroundSize="100% 100%",this.element.style.zIndex=this.zoom,this.element.style.backgroundImage="url("+this.config.tileSource.replace("{src}",this.config.tileUrl).replace("{left}",this.left).replace("{top}",this.top).replace("{right}",1-this.right).replace("{bottom}",1-this.bottom).replace("{width}",Math.round(this.config.tileSize*t)).replace("{height}",Math.round(this.config.tileSize*i))+")",this.context.element.appendChild(this.element),this},this.redraw=function(){var t=this.config.area;this.index<this.context.index-this.config.tileCache?this.remove():(this.right>=t.left||this.left<=t.right)&&(this.bottom>=t.top||this.top<=t.bottom)?this.show():this.hide()},this.remove=function(){this.element.parentNode.removeChild(this.element),delete this.context.tiles[this.name]},this.show=function(){this.element.style.display="block"},this.hide=function(){this.element.style.display="none"},this.init(t,i)},b.prototype.Touch=function(t){this.context=null,this.config=null,this.element=null,this.init=function(t){return this.context=t,this.config=t.config,this.element=t.element,window.addEventListener("resize",this.onResize.bind(this)),this.gestures=new a({element:this.element,threshold:50,increment:.1,cancelTouch:!0,cancelGesture:!0,swipeLeft:function(t){},swipeUp:function(t){},swipeRight:function(t){},swipeDown:function(t){},drag:this.onDrag.bind(this),pinch:this.onPinch.bind(this),twist:this.config.allowRotation?this.onTwist.bind(this):function(){},doubleTap:this.onDoubleTap.bind(this)}),this.element.addEventListener("transitionEnd",this.afterTransitions.bind(this)),this.element.addEventListener("webkitTransitionEnd",this.afterTransitions.bind(this)),this},this.pause=function(t){this.gestures.paused=t},this.onResize=function(){this.context.redraw()},this.onDrag=function(t){this.context.moveBy(t.horizontal/this.config.dimensions.width/this.config.transformation.zoom,t.vertical/this.config.dimensions.height/this.config.transformation.zoom)},this.onPinch=function(t){this.context.zoomBy(t.scale*this.config.transformation.zoom)},this.onTwist=function(t){this.context.rotateBy(t.rotation)},this.onDoubleTap=function(t){t.event.preventDefault(),this.context.transform({left:(t.x/this.config.dimensions.width-.5)/this.config.transformation.zoom+this.config.transformation.left,top:(t.y/this.config.dimensions.height-.5)/this.config.transformation.zoom+this.config.transformation.top,zoom:1.5*this.config.transformation.zoom})},this.afterTransitions=function(){this.context.transitions(!1)},this.init(t)}}();