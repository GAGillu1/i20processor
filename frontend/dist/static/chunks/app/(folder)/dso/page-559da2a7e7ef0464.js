(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[661],{3561:function(e,n,t){Promise.resolve().then(t.bind(t,7378))},7378:function(e,n,t){"use strict";t.r(n);var s=t(7437),a=t(2265),i=t(6230),l=t(841),r=t(5691),c=t(76),o=t(4263),u=t(6454),d=t(7308),m=t(5925),h=t(7263);let f=r.Ry({i20File:r.nK().required("Please select a i20 file")});n.default=()=>{let[e,n]=(0,a.useState)(!1),[t,r]=(0,a.useState)(!1),g=(0,o.useMyContext)();async function p(e){try{console.log(e);let n=await fetch("/api/dso",{method:"POST",body:(0,h.Z)(e)}),t=await n.blob(),s=window.URL.createObjectURL(t),a=document.createElement("a");a.href=s,a.setAttribute("download","i20.zip"),a.click(),window.URL.revokeObjectURL(s),m.toast.success("Download Succesful!")}catch(e){}finally{r(!1)}}return(0,a.useEffect)(()=>{n(g.dsoSign)},[g.dsoSign]),(0,s.jsx)("main",{className:"main",children:(0,s.jsxs)("section",{className:"section",children:[(0,s.jsx)("h2",{className:"formHeader",children:"Import I20"}),(0,s.jsx)(i.J9,{initialValues:u.mI,validationSchema:f,onSubmit:e=>p(e),children:(0,s.jsx)("section",{className:"w-[90%] mx-auto",children:(0,s.jsxs)(i.l0,{className:"grid grid-cols-3 gap-y-2 items-center",children:[(0,s.jsx)("label",{children:"Actions:"}),(0,s.jsxs)("div",{className:"flex gap-1 items-center",children:[(0,s.jsx)(i.gN,{component:d.vN,name:"sign",className:"h-full"}),(0,s.jsx)("label",{htmlFor:"sign",children:"Signature"})]}),(0,s.jsxs)("div",{className:"flex gap-1 items-center",children:[(0,s.jsx)(i.gN,{component:d.IA,name:"split"}),(0,s.jsx)("label",{htmlFor:"split",children:"Split"})]}),e&&(0,s.jsxs)(a.Fragment,{children:[(0,s.jsx)("label",{htmlFor:"dso",children:"DSO:"}),(0,s.jsxs)(i.gN,{as:"select",name:"dso",className:"col-span-2",children:[(0,s.jsx)("option",{value:"",children:"Select DSO"}),(0,s.jsx)(c.Z,{})]}),(0,s.jsx)(l.Z,{name:"dso",className:"col-span-2 col-start-2"})]}),(0,s.jsx)("label",{htmlFor:"i20File",children:"I20 File:"}),(0,s.jsx)(i.gN,{component:d.S2,name:"i20File",accept:".pdf",className:"col-span-2"}),(0,s.jsx)(l.Z,{name:"i20File",className:"col-span-2 col-start-2"}),(0,s.jsx)("div",{className:"col-span-3 mx-auto mt-8",children:(0,s.jsx)("button",{type:"submit",children:"Process"})})]})})})]})})}},76:function(e,n,t){"use strict";var s=t(7437),a=t(2265),i=t(5925);n.Z=()=>{let[e,n]=(0,a.useState)(["Select DSO"]);(0,a.useEffect)(()=>{t()},[]);let t=async()=>{try{let e=await fetch("/api/dso");if(!e.ok)throw e;let{data:t}=await e.json();n(t)}catch(n){let e=await n.json();i.toast.error(e.message)}};return(0,s.jsx)(a.Fragment,{children:e.length>0?e.map(e=>(0,s.jsx)("option",{value:e,children:e},e)):""})}},841:function(e,n,t){"use strict";var s=t(7437),a=t(2005),i=t(6230);n.Z=e=>{let{...n}=e;return(0,s.jsx)(i.Bc,{...n,render:e=>(0,s.jsx)("div",{className:n.className,children:(0,s.jsxs)("div",{className:"flex gap-2 text-red-700",children:[(0,s.jsx)(a.Pz,{className:"w-6 h-6"}),(0,s.jsx)("div",{children:e})]})})})}},7263:function(e,n,t){"use strict";function s(e){let n=new FormData;for(let[t,s]of Object.entries(e))n.append(t,s);return n}t.d(n,{Z:function(){return s}})},6454:function(e,n,t){"use strict";t.d(n,{Gw:function(){return c},Jv:function(){return d},U0:function(){return l},Us:function(){return h},Wj:function(){return a},Yi:function(){return u},bi:function(){return s},dr:function(){return r},mI:function(){return i},uv:function(){return m},w4:function(){return o}});let s={username:"",fullname:"",email:"",role:"USER"},a={username:"",fullname:"",email:"",role:"",signature:""},i={sign:"",dso:"",split:"",i20File:""},l={i20Type:"initI20",dsoName:"",i20File:"",issmFile:"",slateFile:"",toSlate:"n",prog:"ug"},r={x:80,y:180,length:160,width:60,signFile:"",action:""},c={username:"",password:""},o={username:""},u={cPwd:"",nPwd:"",cNPwd:""},d={username:"",fullname:"",email:""},m={type:"",username:"",password:"",endpoint:""},h={vpnUsername:"",vpnPassword:"",issmUsername:"",issmPassword:"",excelFile:"",instance:""}},7308:function(e,n,t){"use strict";t.d(n,{IA:function(){return c},PI:function(){return r},S2:function(){return u},ZD:function(){return d},vN:function(){return o},xM:function(){return m}});var s=t(7437),a=t(4263),i=t(2265),l=t(2838);let r=e=>{let{...n}=e,t=(0,a.useContextDispatch)();return(0,s.jsx)("select",{...n,onChange:e=>{n.form.setFieldValue(n.field.name,e.target.value),t({type:"slateInput",data:e.target.value})}})},c=e=>{let{...n}=e;return(0,s.jsx)("input",{type:"checkbox",onChange:e=>{n.form.setFieldValue(n.field.name,e.target.value)},...n})},o=e=>{let{...n}=e,t=(0,a.useContextDispatch)();return(0,s.jsx)("input",{type:"checkbox",onChange:e=>{n.form.setFieldValue(n.field.name,e.target.value),t({type:"dsoSign",data:e.target.checked})},...n})},u=e=>{let{...n}=e;return(0,s.jsx)("input",{type:"file",...n,onChange:e=>{n.form.setFieldValue(n.field.name,e.currentTarget.files[0])}})},d=e=>{let{...n}=e,[t,a]=(0,i.useState)(n.active),r=()=>{a(!t),n.form.setFieldValue(n.field.name,!t)};return(0,s.jsxs)("div",{className:"flex items-center justify-end gap-2",children:[(0,s.jsx)("label",{children:t?"Active":"Inactive"}),(0,s.jsx)("div",{className:"group ".concat(n.disabled?"opacity-70 group-hover:transition-none":""),children:(0,s.jsxs)(l.r,{checked:t,onChange:()=>r(),className:"".concat(t?"bg-green-600 group-hover:bg-green-700":"bg-red-600 group-hover:bg-red-700"," relative inline-flex h-6 w-12 items-center rounded-full transition duration-150"),disabled:n.disabled,children:[(0,s.jsx)("span",{className:"sr-only",children:n.name}),(0,s.jsx)("span",{className:"".concat(t?"translate-x-3":"-translate-x-3"," inline-block h-4 w-4 transform rounded-full bg-white transition group-hover:scale-125 duration-150")})]})})]})},m=e=>{let{...n}=e;return!n.hidden&&(0,s.jsxs)("button",{type:"submit",disabled:n.loading,children:[(0,s.jsx)("span",{className:"animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute",hidden:!n.loading}),(0,s.jsx)("span",{className:"w-2 h-2 bg-indigo-900 rounded-full",hidden:!n.loading}),!n.loading&&n.children,n.loading?"".concat(n.loadingMsg):"".concat(n.action)]})}}},function(e){e.O(0,[910,146,971,596,744],function(){return e(e.s=3561)}),_N_E=e.O()}]);