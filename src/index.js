module.exports=function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s=3)}([function(t,e){t.exports=require("react")},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setCreationManagersForHook=e.useGridData=void 0;const r=i(0);let n=null;e.useGridData=()=>{const[t,e]=r.useState(()=>()=>[]),[i,a]=r.useState(),[s,o]=r.useState();return r.useEffect(()=>{if(null==n)throw"Something went wrong with the useGridData hook - If this issue persists, please contact library support.";e(()=>()=>null!=n?n.getItemsWithinRegion():[]),a(()=>()=>null!=n?n.undoLastRectangle():()=>{}),o(()=>()=>null!=n?n.undoLastDrawnLineForLatestRectangle():()=>{})},[]),null==s||null==i?[t]:[t,i,s]},e.setCreationManagersForHook=t=>{n=t}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RectangleBoundaryUtil=void 0;class r{}e.RectangleBoundaryUtil=r,r.getShiftRateFromMousePosition=(t,e)=>Math.round(t/e)*e},function(t,e,i){"use strict";var r=this&&this.__createBinding||(Object.create?function(t,e,i,r){void 0===r&&(r=i),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[i]}})}:function(t,e,i,r){void 0===r&&(r=i),t[r]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&r(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.useGridData=e.ReactGridDrawUI=void 0;const s=a(i(0)),o=i(1);Object.defineProperty(e,"useGridData",{enumerable:!0,get:function(){return o.useGridData}});const l=i(4),c={display:"flex",margin:"0 auto"},h={zIndex:1e4,width:"inherit",position:"absolute"},d=t=>{const[e,i]=s.useState(new l.CanvasManager({lineClickTolerance:t.lineClickTolerance,selectCircleSize:t.selectCircleSize,circleLineShiftSize:t.circleLineShiftSize,contextLineWidth:t.contextLineWidth,lineColour:t.lineColour}));s.useEffect(()=>{let t=r();e.createCanvas(t)},[]);const r=()=>{let e=t.children;if(e.length>1)throw"children of element <ReactGridDrawUI> greater than 1";let i=e.props.id;if(null==i)throw"child of element <ReactGridDrawUI> has no ID";return i};return s.default.createElement(s.Fragment,null,s.default.createElement("div",{id:"canvas-wrap",style:c},t.children,s.default.createElement("canvas",{id:"canvas",style:h})))};e.ReactGridDrawUI=d,d.defaultProps={lineClickTolerance:15,selectCircleSize:3,circleLineShiftSize:10,contextLineWidth:1,lineColour:"red"}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CanvasManager=void 0;const r=i(5),n=i(6),a=i(1),s=i(7);e.CanvasManager=class{constructor(t){this.containerID=null,this.drag=!1,this.body=null,this.createCanvas=t=>{this.containerID=t,this.body=document.getElementById(this.containerID),this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.addEventListener("mousedown",this.mouseDown,!1),this.canvas.addEventListener("mouseup",this.mouseUp,!1),this.canvas.addEventListener("mousemove",this.mouseMove,!1),this.setCanvasSize(),this.rectangleCreationManager=new r.RectangleCreationManager(this.canvas,this.ctx,this.currentRect,this.lineProperties),this.rectangleBoundaryValidator=new n.RectangleBoundaryValidator(this.canvas,this.lineProperties,this.rectangleCreationManager),a.setCreationManagersForHook(new s.PublicFunctionManager(this.canvas,this.rectangles,this.containerID,this.rectangleCreationManager))},this.setCanvasSize=()=>{null!=this.body&&(this.canvas.width=this.body.offsetWidth,this.canvas.height=this.body.offsetHeight)},this.mouseDown=t=>{let e=t.offsetX,i=t.offsetY,r=this.rectangleBoundaryValidator.getRectForMouseOnBorder(e,i,this.rectangles);null!=r?this.rectangleCreationManager.drawLineAtClickedGridBoundaryPosition(t,r):this.rectangleBoundaryValidator.isMouseClickInsideBoxRegion(e,i,this.rectangles)||(this.rectangleCreationManager.resetBoxProperties(this.currentRect,e,i),this.drag=!0)},this.mouseUp=t=>{this.drag&&this.rectangles.push(this.currentRect),this.drag=!1,this.currentRect={startX:0,startY:0,width:0,height:0,verticalPointsSelected:[],horizontalPointsSelected:[],undoLineList:[]},this.drawAllCreatedRectangles(t)},this.mouseMove=t=>{if(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drag&&null!=this.body)this.rectangleCreationManager.drawRectangle(this.currentRect,t.pageX,t.pageY);else if(!this.drag){let e=t.pageX-this.canvas.offsetLeft,i=t.pageY-this.canvas.offsetTop;this.rectangleBoundaryValidator.showMouseCursorAsPointer(t,"auto"),this.rectangleBoundaryValidator.CheckForMouseOnBoxBoundaryOfRectAndReDraw(this.currentRect,e,i,t)}this.drawAllCreatedRectangles(t)},this.drawAllCreatedRectangles=t=>{let e=t.pageX-this.canvas.offsetLeft,i=t.pageY-this.canvas.offsetTop;this.buildRectanglesWithMouseChecks(e,i,t)},this.rectangles=[],this.currentRect={startX:0,startY:0,width:0,height:0,horizontalPointsSelected:[],verticalPointsSelected:[],undoLineList:[]},this.rectangleCreationManager=new r.RectangleCreationManager(this.canvas,this.ctx,this.currentRect,t),this.rectangleBoundaryValidator=new n.RectangleBoundaryValidator(this.canvas,t,this.rectangleCreationManager),this.lineProperties=t}buildRectanglesWithMouseChecks(t,e,i){this.rectangles.forEach(r=>{this.rectangleBoundaryValidator.CheckForMouseOnBoxBoundaryOfRectAndReDraw(r,t,e,i),this.rectangleCreationManager.drawRectGridLines(r)})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RectangleCreationManager=void 0;const r=i(2);e.RectangleCreationManager=class{constructor(t,e,i,r){this.drawAllRectBorderLinesAndGridLines=t=>{t.forEach(t=>{let e=t.startX+t.width+this.canvas.offsetLeft,i=t.startY+t.height+this.canvas.offsetTop;this.drawRectangle(t,e,i),this.drawRectGridLines(t)})},this.drawSelectableCircleOnBoxBoundary=(t,e)=>{this.ctx.fillStyle=this.lineColour,this.ctx.beginPath(),this.ctx.arc(t,e,this.selectCircleSize,0,2*Math.PI),this.ctx.closePath(),this.ctx.fill()},this.drawLineFromBoxBoundaryX=t=>{this.ctx.fillStyle=this.lineColour,this.ctx.beginPath(),this.ctx.lineWidth=this.contextLineWidth,this.ctx.moveTo(t.startX,t.startY),this.ctx.lineTo(t.endX,t.startY),this.ctx.closePath(),this.ctx.stroke()},this.drawLineFromBoxBoundaryY=t=>{this.ctx.fillStyle=this.lineColour,this.ctx.lineWidth=this.contextLineWidth,this.ctx.beginPath(),this.ctx.moveTo(t.startX,t.startY),this.ctx.lineTo(t.startX,t.endY),this.ctx.closePath(),this.ctx.stroke()},this.resetBoxProperties=(t,e,i)=>{this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),t.startX=e,t.startY=i},this.canvas=t,this.ctx=e,this.currentRect=i,this.lineClickTolerance=r.lineClickTolerance,this.selectCircleSize=r.selectCircleSize,this.contextLineWidth=r.contextLineWidth,this.circleLineShiftSize=r.circleLineShiftSize,this.lineColour=r.lineColour}drawRectangle(t,e,i){t.width=e-this.canvas.offsetLeft-t.startX,t.height=i-this.canvas.offsetTop-t.startY,this.ctx.strokeStyle=this.lineColour,this.ctx.lineWidth=this.contextLineWidth,this.ctx.strokeRect(t.startX,t.startY,t.width,t.height)}drawLineAtClickedGridBoundaryPosition(t,e){let i=e.height+e.startY,r=e.width+e.startX,n=t.pageX-this.canvas.offsetLeft,a=t.pageY-this.canvas.offsetTop,s=Math.abs(n-e.startX)<this.lineClickTolerance,o=Math.abs(n-r)<this.lineClickTolerance,l=Math.abs(a-e.startY)<this.lineClickTolerance,c=Math.abs(a-i)<this.lineClickTolerance;s||o?this.addHorizontalLineAtMousePosition(e.startX,a,r,e):(l||c)&&this.addVerticalLineAtMousePosition(n,e.startY,i,e)}addVerticalLineAtMousePosition(t,e,i,n){let a={startX:r.RectangleBoundaryUtil.getShiftRateFromMousePosition(t,this.circleLineShiftSize),startY:e,endY:i};n.verticalPointsSelected.push(a),this.drawLineFromBoxBoundaryY(a),n.undoLineList.push(!1)}addHorizontalLineAtMousePosition(t,e,i,n){let a={startX:t,startY:r.RectangleBoundaryUtil.getShiftRateFromMousePosition(e,this.circleLineShiftSize),endX:i};n.horizontalPointsSelected.push(a),n.undoLineList.push(!0),this.drawLineFromBoxBoundaryX(a)}drawRectGridLines(t){t.horizontalPointsSelected.forEach(t=>{this.drawLineFromBoxBoundaryX(t)}),t.verticalPointsSelected.forEach(t=>{this.drawLineFromBoxBoundaryY(t)})}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RectangleBoundaryValidator=void 0;const r=i(2);e.RectangleBoundaryValidator=class{constructor(t,e,i){this.isMouseClickInsideBoxRegion=(t,e,i)=>i.some(i=>Math.abs(t)>=i.startX&&Math.abs(t)<=i.width+i.startX&&Math.abs(e)>=i.startY&&Math.abs(e)<=i.height+i.startY),this.checkForCircleOnBoundary=(t,e,i)=>{let r=t.startY,n=t.startX,a=t.height+r,s=t.width+n,o=Math.abs(e-n)<this.lineClickTolerance,l=Math.abs(e-s)<this.lineClickTolerance,c=Math.abs(i-r)<this.lineClickTolerance,h=Math.abs(i-a)<this.lineClickTolerance;o&&i>t.startY&&i<=t.startY+t.height?this.previewCircleAndLineForLeftBorderOnHover(i,n,s):l&&i>t.startY&&i<=t.startY+t.height?this.previewCircleAndLineForRightBorderOnHover(i,n,s):c&&e>t.startX&&e<=t.startX+t.width?this.previewCircleAndLineForTopBorderOnHover(e,r,a):h&&e>t.startX&&e<=t.startX+t.width&&this.previewCircleAndLineForBottomBorderOnHover(e,a,r)},this.canvas=t,this.lineClickTolerance=e.lineClickTolerance,this.selectCircleSize=e.selectCircleSize,this.circleLineShiftSize=e.circleLineShiftSize,this.contextLineWidth=e.contextLineWidth,this.rectangleCreationManager=i}getRectForMouseOnBorder(t,e,i){return i.find(i=>this.checkForMouseOnBorderOfSingleRect(i,t,e))}CheckForMouseOnBoxBoundaryOfRectAndReDraw(t,e,i,r){let n=t.startX+t.width+this.canvas.offsetLeft,a=t.startY+t.height+this.canvas.offsetTop;this.checkForMouseOnBorderOfSingleRect(t,e,i)&&(this.showMouseCursorAsPointer(r,"pointer"),this.checkForCircleOnBoundary(t,e,i)),this.rectangleCreationManager.drawRectangle(t,n,a)}showMouseCursorAsPointer(t,e){t.target.style.cursor=e}previewCircleAndLineForBottomBorderOnHover(t,e,i){let n=r.RectangleBoundaryUtil.getShiftRateFromMousePosition(t,this.circleLineShiftSize),a={startX:n,startY:e,endY:i};this.rectangleCreationManager.drawSelectableCircleOnBoxBoundary(n,e),this.rectangleCreationManager.drawLineFromBoxBoundaryY(a)}previewCircleAndLineForTopBorderOnHover(t,e,i){let n=r.RectangleBoundaryUtil.getShiftRateFromMousePosition(t,this.circleLineShiftSize),a={startX:n,startY:e,endY:i};this.rectangleCreationManager.drawSelectableCircleOnBoxBoundary(n,e),this.rectangleCreationManager.drawLineFromBoxBoundaryY(a)}previewCircleAndLineForRightBorderOnHover(t,e,i){let n=r.RectangleBoundaryUtil.getShiftRateFromMousePosition(t,this.circleLineShiftSize),a={startX:e,startY:n,endX:i};this.rectangleCreationManager.drawSelectableCircleOnBoxBoundary(i,n),this.rectangleCreationManager.drawLineFromBoxBoundaryX(a)}previewCircleAndLineForLeftBorderOnHover(t,e,i){let n=r.RectangleBoundaryUtil.getShiftRateFromMousePosition(t,this.circleLineShiftSize),a={startX:e,startY:n,endX:i};this.rectangleCreationManager.drawSelectableCircleOnBoxBoundary(e,n),this.rectangleCreationManager.drawLineFromBoxBoundaryX(a)}checkForMouseOnBorderOfSingleRect(t,e,i){let r=t.startY,n=t.startX,a=t.height+r,s=t.width+n,o=Math.abs(e-n)<=this.lineClickTolerance||Math.abs(e-s)<=this.lineClickTolerance,l=Math.abs(i-r)<=this.lineClickTolerance||Math.abs(i-a)<=this.lineClickTolerance;return o&&(i>=r&&i<=a)||l&&(e>=n&&e<=s)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PublicFunctionManager=void 0;e.PublicFunctionManager=class{constructor(t,e,i,r){this.containerID=null,this.getItemsWithinRegion=()=>{let t=document.getElementById(this.containerID),e=[];return this.rectangles.forEach(i=>{i.horizontalPointsSelected.sort((function(t,e){return t.startY-e.startY})),i.verticalPointsSelected.sort((function(t,e){return t.startX-e.startX}));let r=this.buildTableFromBox(i.verticalPointsSelected.length,i.horizontalPointsSelected.length);if(i.horizontalPointsSelected.push({startX:i.startX,startY:i.startY+i.height,endX:i.startX+i.width}),i.verticalPointsSelected.push({startX:i.startX+i.width,startY:i.startY,endY:i.startY+i.height}),null!=t){let e=t.childNodes;for(let t=0;t<e.length;t++){let n=e[t].childNodes;for(let t=0;t<n.length;t++){let e=n[t],a=e.getBoundingClientRect(),s=a.left-this.canvasRect.left,o=a.top-this.canvasRect.top;if(this.isItemInsideBox(i,e,s,o)){let t=this.findGridPosition(s,o,i.horizontalPointsSelected,i.verticalPointsSelected),n=t[0],a=t[1];if(null!=r[n]){let t=r[n][a],i=""!=t&&null!=t;r[n][a]=i?r[n][a]+" "+e.innerText:e.innerText}else r[n]=[]}}}}i.horizontalPointsSelected.pop(),i.verticalPointsSelected.pop(),e.push(r)}),e},this.undoLastRectangle=()=>{this.rectangles.pop(),this.rectangleCreationManager.resetBoxProperties({},0,0),this.rectangleCreationManager.drawAllRectBorderLinesAndGridLines(this.rectangles)},this.undoLastDrawnLineForLatestRectangle=()=>{let t=this.rectangles[this.rectangles.length-1];this.undoLastDrawnLineForRectangle(t)},this.undoLastDrawnLineForRectangle=t=>{t.undoLineList.pop()?t.horizontalPointsSelected.pop():t.verticalPointsSelected.pop();let e=t.startX+t.width+this.canvas.offsetLeft,i=t.startY+t.height+this.canvas.offsetTop;this.rectangleCreationManager.resetBoxProperties(t,t.startX,t.startY),this.rectangleCreationManager.drawRectangle(t,e,i),this.rectangleCreationManager.drawAllRectBorderLinesAndGridLines(this.rectangles)},this.buildTableFromBox=(t,e)=>{let i=[];for(let r=0;r<e+1;r++)for(let n=0;n<t+1;n++)null!=i[r]?i[r].push(""):i[r]=0!==e||0!==t?[""]:[];return i},this.findGridPosition=(t,e,i,r)=>{let n=0,a=0;if(0===i.length)for(let e=0;e<r.length;e++){t<r[e].startX?(a=0,n=e):n++}else if(0===r.length)for(let t=0;t<i.length;t++){e<i[t].startY?(a=t,n=0):a++}else for(let n=0;n<i.length;n++){let a=i[n].startY;for(let i=0;i<r.length;i++){if(t<r[i].startX&&e<a)return[n,i]}}return[a,n]},this.isItemInsideBox=(t,e,i,r)=>{let n=e.offsetHeight/2;return i>=t.startX&&i<=t.width+t.startX&&r+n>=t.startY&&r+n<=t.height+t.startY},this.canvas=t,this.rectangles=e,this.containerID=i,this.rectangleCreationManager=r,this.canvasRect=this.canvas.getBoundingClientRect()}}}]);