(this.webpackJsonpcirclepunch=this.webpackJsonpcirclepunch||[]).push([[0],{31:function(e,t,a){e.exports=a(43)},36:function(e,t,a){},37:function(e,t,a){e.exports=a.p+"static/media/logo.25bf045c.svg"},42:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),n=a(13),c=a.n(n),s=(a(36),a(11)),o=(a(37),a(60)),l=a(63),u=a(62),h=a(66),p=Object(o.a)({root:{}});function d(e){var t=p(),a=i.a.useState(100),r=Object(s.a)(a,2),n=(r[0],r[1]);return i.a.createElement("div",{className:t.root},i.a.createElement(u.a,{id:"continuous-slider",gutterBottom:!0},e.label),i.a.createElement(l.a,{container:!0,spacing:3},i.a.createElement(l.a,{item:!0}),i.a.createElement(l.a,{item:!0,xs:!0},i.a.createElement(h.a,{value:e.value,onChange:function(t,a){n(a),e.callback(a)},"aria-labelledby":"continuous-slider",valueLabelDisplay:"auto",max:e.max,min:e.min})),i.a.createElement(l.a,{item:!0})))}var m=a(21),f=a(16),y=a(25),v=a(26),w=a(7),b=a(27),g=a(65),x=function(){function e(e,t,a){for(var r=[],i=a.radius,n=(a.radius,a.x-a.radius),c=(a.radius,a.y-a.radius),s=2*i*Math.cos(e),o=2*i*Math.sin(e),l=2*i*Math.cos(t),u=2*i*Math.sin(t),h=Math.floor(a.x/(2*a.radius)),p=Math.floor(a.y/(2*a.radius)),d=0;d<p;d++)for(var m=0;m<h;m++){var f,y,v,w;({x:null,y:null});var b=2*m*s,g=2*d*l;y={x:i+s+b,y:i+o+g},v={x:i+u+b,y:i+l+g},w={x:i+s+u+b,y:i+l+o+g},(f={x:i+b,y:i+g}).x<=n&&f.y<=c&&r.push(f),y.x<=n&&y.y<=c&&r.push(y),v.x<=n&&v.y<=c&&r.push(v),w.x<=n&&w.y<=c&&r.push(w)}return r}self.addEventListener("message",(function(t){if(t){var a=t.data,r={performance:null,efficiency:null,circles:[]},i=(a.radius,a.radius),n=a.x-a.radius,c=a.radius,s=a.y-a.radius,o=performance.now();if("random"===a.type)for(var l=0;l<2e4;l++){var u={x:null,y:null};u.x=Math.floor(Math.random()*(n-i))+i,u.y=Math.floor(Math.random()*(s-c))+c,r.circles.push(u)}else if("uniform"===a.type)for(var h=Math.floor(a.x/(2*a.radius)),p=Math.floor(a.y/(2*a.radius)),d=0;d<p;d++)for(var m=0;m<h;m++)r.circles.push({x:a.radius+2*m*a.radius,y:a.radius+2*d*a.radius});else if("analytic"===a.type)for(var f=Math.PI/6,y={th:null,be:null},v=0;v<100;v++)for(var w=0;w<100;w++){var b=f*v/100,g=f*w/100;if(!(f<b+g)){var x=e(b,g,a);x.length>r.circles.length&&(r.circles=x,y.th=b,y.be=g,console.log("found a better one with #"+x.length))}}r.performance=performance.now()-o;var E=r.circles.length*Math.PI*(2^a.radius);r.efficiency=E/(a.x*a.y-E),postMessage(r)}}))},E=function e(t){Object(m.a)(this,e);var a=t.toString(),r=new Blob(["("+a+")()"]);return new Worker(URL.createObjectURL(r))},k=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(y.a)(this,Object(v.a)(t).call(this,e))).state={ctx:null},a.randomSpot=a.randomSpot.bind(Object(w.a)(a)),a.uniformSpots=a.uniformSpots.bind(Object(w.a)(a)),a.analyticSpots=a.analyticSpots.bind(Object(w.a)(a)),a.drawAll=a.drawAll.bind(Object(w.a)(a)),a}return Object(b.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.worker=new E(x);var t=this.refs.canvas.getContext("2d");requestAnimationFrame;this.setState({ctx:t}),this.worker.addEventListener("message",(function(t){var a=t.data;e.props.setMetrics({performance:a.performance,efficiency:a.efficiency,numCircles:a.circles.length}),e.drawAll(a)}))}},{key:"componentDidUpdate",value:function(e){e.width===this.props.width&&e.height===this.props.height&&e.radius===this.props.radius||this.analyticSpots()}},{key:"randomSpot",value:function(){var e={type:"random",x:this.props.width,y:this.props.height,radius:this.props.radius};this.worker.postMessage(e)}},{key:"uniformSpots",value:function(){var e={type:"uniform",x:this.props.width,y:this.props.height,radius:this.props.radius};this.worker.postMessage(e)}},{key:"analyticSpots",value:function(){var e={type:"analytic",x:this.props.width,y:this.props.height,radius:this.props.radius};this.worker.postMessage(e)}},{key:"drawAll",value:function(e){var t=this;this.clearCanvas(this.state.ctx,this.props.windowwidth,this.props.windowheight),this.drawRect(this.state.ctx,0,0,this.props.width,this.props.height),e.circles.forEach((function(e){t.drawCircle(t.state.ctx,e.x,e.y,t.props.radius)}))}},{key:"clearCanvas",value:function(e,t,a){e.fillStyle="#FFFFFF",e.fillRect(0,0,t,a)}},{key:"drawCircle",value:function(e,t,a,r){e.beginPath(),e.arc(t,a,r,0,2*Math.PI),e.fillStyle="#FF000F",e.fill(),e.stroke()}},{key:"drawRect",value:function(e,t,a,r,i){e.fillStyle="#e5eaf3",e.fillRect(t,a,r,i)}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(g.a,{onClick:this.randomSpot},"Random"),i.a.createElement(g.a,{onClick:this.uniformSpots},"Uniform"),i.a.createElement(g.a,{onClick:this.analyticSpots},"Analytic"),i.a.createElement("canvas",{ref:"canvas",width:this.props.windowwidth,height:this.props.windowheight,style:{border:"2px solid black"}}))}}]),t}(i.a.Component),j=a(64),O=(a(42),Object(o.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),margin:e.spacing(2),textAlign:"center",color:e.palette.text.secondary}}})));var S=function(){var e=O(),t=Object(r.useState)(500),a=Object(s.a)(t,2),n=a[0],c=a[1],o=Object(r.useState)(500),u=Object(s.a)(o,2),h=u[0],p=u[1],m=Object(r.useState)(30),f=Object(s.a)(m,2),y=f[0],v=f[1],w=Object(r.useState)(0),b=Object(s.a)(w,2),g=(b[0],b[1],Object(r.useState)(0)),x=Object(s.a)(g,2),E=(x[0],x[1],Object(r.useState)({})),S=Object(s.a)(E,2),M=S[0],C=S[1];return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:e.root},i.a.createElement(l.a,{container:!0,direction:"rows"},i.a.createElement(l.a,{container:!0,xs:2,spacing:3,justify:"center",direction:"column"},i.a.createElement(l.a,{item:!0},i.a.createElement(j.a,{className:e.paper},i.a.createElement("div",null,"Estimates: FittingX: ",Math.floor(n/(2*y))," Fitting Y: ",Math.floor(h/(2*y))),i.a.createElement("div",null,"# of circles: ",M.numCircles),i.a.createElement("div",null,"Performance time (ms): ",M.performance),i.a.createElement("div",null,"Efficiency: (Area circles/Area square): ",i.a.createElement("strong",null,100*M.efficiency)))),i.a.createElement(l.a,{item:!0},i.a.createElement(j.a,{className:e.paper},i.a.createElement(d,{max:1700,min:50,callback:c,label:"X distance"}))),i.a.createElement(l.a,{item:!0},i.a.createElement(j.a,{className:e.paper},i.a.createElement(d,{max:900,min:50,callback:p,label:"Y Distance"}))),i.a.createElement(l.a,{item:!0},i.a.createElement(j.a,{className:e.paper},i.a.createElement(d,{max:100,min:5,callback:v,label:"Radius"})))),i.a.createElement(l.a,{container:!0,xs:10,justify:"center"},i.a.createElement(k,{width:n,height:h,windowwidth:1700,windowheight:900,radius:y,setMetrics:C})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[31,1,2]]]);
//# sourceMappingURL=main.71a15155.chunk.js.map