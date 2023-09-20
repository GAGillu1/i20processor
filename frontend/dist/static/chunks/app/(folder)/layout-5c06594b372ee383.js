(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[494],{8790:function(e,t,r){Promise.resolve().then(r.bind(r,4023))},4023:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var o=r(7437),a=r(2005),s=r(1396),i=r.n(s),n=r(4033),l=r(4263),c=r(5925),d=()=>{let e=(0,n.usePathname)(),t=(0,l.useContextDispatch)(),r=(0,l.useMyContext)(),s=(0,n.useRouter)();async function d(){t({type:"logout"}),await fetch("/api/logout"),c.toast.success("Logout Successful!"),s.push("/login")}return(0,o.jsxs)("nav",{className:"py-12 px-10 flex flex-col h-screen items-center font-semibold text-gray-600 justify-between tracking-wider top-0",children:[(0,o.jsx)("div",{className:"pt-3",children:(0,o.jsx)(i(),{href:"/",className:"font-extrabold text-3xl text-indigo-700 ",children:"I-20 Processor"})}),(0,o.jsxs)("div",{className:"flex gap-4 justify-between flex-col",children:[(0,o.jsxs)(i(),{href:"/",className:"navLink ".concat("/"===e?"activeNavLink":""),children:[(0,o.jsx)(a.tv,{}),"Home"]}),(0,o.jsxs)(i(),{className:"navLink ".concat(e.includes("/i20")?"activeNavLink":""),href:"/i20",children:[(0,o.jsx)(a.B4,{}),"I20"]}),"ADMIN"===r.role&&(0,o.jsxs)(i(),{className:"navLink ".concat(e.includes("/admin")?"activeNavLink":""),href:"/admin",children:[(0,o.jsx)(a.L,{}),"Admin"]}),"USER"!==r.role&&(0,o.jsxs)(i(),{className:"navLink ".concat("/dso"===e?"activeNavLink":""),href:"/dso",children:[(0,o.jsx)(a.SU,{})," DSO"]}),(0,o.jsxs)(i(),{href:"/logs",className:"navLink ".concat("/logs"===e?"activeNavLink":""),children:[(0,o.jsx)(a.I$,{}),"Logs"]})]}),(0,o.jsxs)("div",{children:[(0,o.jsxs)(i(),{href:"/support",className:"navLink text-slate-500 font-normal",children:[(0,o.jsx)(a.CE,{})," Support"]}),(0,o.jsxs)("button",{className:"font-normal text-slate-500 bg-indigo-50",onClick:()=>d(),children:[(0,o.jsx)(a.R0,{}),"Logout"]})]})]})},u=()=>{let e=(0,l.useMyContext)(),t=function(){let e=Number(new Date().getHours());return e<12?"Good Morning":e<16?"Good Afternoon":"Good Evening"}();return(0,o.jsxs)("section",{className:"w-[95%] mx-auto flex justify-between items-center py-12",children:[(0,o.jsxs)("div",{className:"",children:[(0,o.jsxs)("h1",{className:"text-3xl font-bold tracking-tight text-slate-800",children:[t,", ",e.fullname]}),(0,o.jsxs)("p",{className:"font-semibold text-lg text-slate-600",children:["Welcome to ",e.institutionname," I-20 Processor.."]})]}),(0,o.jsxs)(i(),{className:"bg-white rounded-lg tracking-wider py-2 px-4 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150 flex items-center gap-2",href:"/profile",children:[(0,o.jsx)(a.m2,{}),"Profile"]})]})},p=r(2265);function f(e){let{children:t}=e;return(0,o.jsx)(p.Fragment,{children:(0,o.jsxs)("div",{className:"grid grid-cols-6",children:[(0,o.jsx)(d,{}),(0,o.jsxs)("section",{className:"col-span-5 bg-indigo-200 rounded-l-3xl my-3",children:[(0,o.jsx)(u,{}),t]})]})})}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=r(2265),a=Symbol.for("react.element"),s=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,n=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var o,s={},c=null,d=null;for(o in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)i.call(t,o)&&!l.hasOwnProperty(o)&&(s[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===s[o]&&(s[o]=t[o]);return{$$typeof:a,type:e,key:c,ref:d,props:s,_owner:n.current}}t.Fragment=s,t.jsx=c,t.jsxs=c},7437:function(e,t,r){"use strict";e.exports=r(622)},1396:function(e,t,r){e.exports=r(6685)},4033:function(e,t,r){e.exports=r(8165)},5925:function(e,t,r){"use strict";let o,a;r.r(t),r.d(t,{CheckmarkIcon:function(){return G},ErrorIcon:function(){return U},LoaderIcon:function(){return B},ToastBar:function(){return ee},ToastIcon:function(){return V},Toaster:function(){return ea},default:function(){return es},resolveValue:function(){return k},toast:function(){return M},useToaster:function(){return H},useToasterStore:function(){return T}});var s,i=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let r="",o="",a="";for(let s in e){let i=e[s];"@"==s[0]?"i"==s[1]?r=s+" "+i+";":o+="f"==s[1]?p(i,s):s+"{"+p(i,"k"==s[1]?"":t)+"}":"object"==typeof i?o+=p(i,t?t.replace(/([^,])+/g,e=>s.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):s):null!=i&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=p.p?p.p(s,i):s+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+o},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},h=(e,t,r,o,a)=>{var s;let i=m(e),n=f[i]||(f[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!f[n]){let t=i!==e?e:(e=>{let t,r,o=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?o.shift():t[3]?(r=t[3].replace(u," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(u," ").trim();return o[0]})(e);f[n]=p(a?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&f.g?f.g:null;return r&&(f.g=f[n]),s=f[n],l?t.data=t.data.replace(l,s):-1===t.data.indexOf(s)&&(t.data=o?s+t.data:t.data+s),n},g=(e,t,r)=>e.reduce((e,o,a)=>{let s=t[a];if(s&&s.call){let e=s(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;s=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+o+(null==s?"":s)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let y,b,v,w=x.bind({k:1});function j(e,t){let r=this||{};return function(){let o=arguments;function a(s,i){let n=Object.assign({},s),l=n.className||a.className;r.p=Object.assign({theme:b&&b()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,o)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),y(c,n)}return t?t(a):a}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,E=(o=0,()=>(++o).toString()),_=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},O=new Map,L=e=>{if(O.has(e))return;let t=setTimeout(()=>{O.delete(e),D({type:4,toastId:e})},1e3);O.set(e,t)},$=e=>{let t=O.get(e);t&&clearTimeout(t)},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&$(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?C(e,{type:1,toast:r}):C(e,{type:0,toast:r});case 3:let{toastId:o}=t;return o?L(o):e.toasts.forEach(e=>{L(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},I=[],P={toasts:[],pausedAt:void 0},D=e=>{P=C(P,e),I.forEach(e=>{e(P)})},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={})=>{let[t,r]=(0,i.useState)(P);(0,i.useEffect)(()=>(I.push(r),()=>{let e=I.indexOf(r);e>-1&&I.splice(e,1)}),[t]);let o=t.toasts.map(t=>{var r,o;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},A=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||E()}),z=e=>(t,r)=>{let o=A(t,e,r);return D({type:2,toast:o}),o.id},M=(e,t)=>z("blank")(e,t);M.error=z("error"),M.success=z("success"),M.loading=z("loading"),M.custom=z("custom"),M.dismiss=e=>{D({type:3,toastId:e})},M.remove=e=>D({type:4,toastId:e}),M.promise=(e,t,r)=>{let o=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(M.success(k(t.success,e),{id:o,...r,...null==r?void 0:r.success}),e)).catch(e=>{M.error(k(t.error,e),{id:o,...r,...null==r?void 0:r.error})}),e};var R=(e,t)=>{D({type:1,toast:{id:e,height:t}})},F=()=>{D({type:5,time:Date.now()})},H=e=>{let{toasts:t,pausedAt:r}=T(e);(0,i.useEffect)(()=>{if(r)return;let e=Date.now(),o=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&M.dismiss(t.id);return}return setTimeout(()=>M.dismiss(t.id),r)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[t,r]);let o=(0,i.useCallback)(()=>{r&&D({type:6,time:Date.now()})},[r]),a=(0,i.useCallback)((e,r)=>{let{reverseOrder:o=!1,gutter:a=8,defaultPosition:s}=r||{},i=t.filter(t=>(t.position||s)===(e.position||s)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[t]);return{toasts:t,handlers:{updateHeight:R,startPause:F,endPause:o,calculateOffset:a}}},U=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,G=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,W=j("div")`
  position: absolute;
`,Y=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?i.createElement(q,null,t):t:"blank"===r?null:i.createElement(Y,null,i.createElement(B,{...o}),"loading"!==r&&i.createElement(W,null,"error"===r?i.createElement(U,{...o}):i.createElement(G,{...o})))},Z=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,J=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=(e,t)=>{let r=e.includes("top")?1:-1,[o,a]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Z(r),J(r)];return{animation:t?`${w(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=i.memo(({toast:e,position:t,style:r,children:o})=>{let a=e.height?X(e.position||t||"top-center",e.visible):{opacity:0},s=i.createElement(V,{toast:e}),n=i.createElement(Q,{...e.ariaProps},k(e.message,e));return i.createElement(K,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof o?o({icon:s,message:n}):i.createElement(i.Fragment,null,s,n))});s=i.createElement,p.p=void 0,y=s,b=void 0,v=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:o,children:a})=>{let s=i.useCallback(t=>{if(t){let r=()=>{o(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return i.createElement("div",{ref:s,className:t,style:r},a)},er=(e,t)=>{let r=e.includes("top"),o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:_()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...o}},eo=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ea=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:a,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=H(r);return i.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let s=r.position||t,n=er(s,c.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return i.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eo:"",style:n},"custom"===r.type?k(r.message,r):a?a(r):i.createElement(ee,{toast:r,position:s}))}))},es=M}},function(e){e.O(0,[685,146,971,596,744],function(){return e(e.s=8790)}),_N_E=e.O()}]);