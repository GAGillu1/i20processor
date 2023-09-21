(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[471],{6626:function(e,a,n){Promise.resolve().then(n.bind(n,7228))},6019:function(e,a,n){"use strict";var s=n(7437);a.Z=()=>(0,s.jsx)("h1",{children:"Loading..."})},7228:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return N}});var s=n(7437),t=n(1396),r=n.n(t),l=n(4033),i=n(2265),o=e=>{let{...a}=e,n=(0,l.useSearchParams)(),t=a.userList.filter(e=>{var n;return null===(n=e.fullname)||void 0===n?void 0:n.toLowerCase().includes(a.search.toLowerCase())});return(0,s.jsx)(i.Fragment,{children:t.length>0?t.map(e=>(0,s.jsx)(r(),{className:"userItem "+"".concat(n.get("user")===e.username?"bg-indigo-300":"bg-indigo-100"),href:"/admin/users/?user="+e.username,children:e.fullname},e.username)):(0,s.jsx)("p",{className:"text-sm tracking-wide text-slate-700",children:"No Users found!"})})},c=n(6230),d=n(841),u=n(6762),m=n(6454),x=n(7308),h=n(2005),j=n(5925),f=n(7263),g=()=>{let[e,a]=(0,i.useState)(m.Wj),n=(0,l.useSearchParams)().get("user"),[t,o]=(0,i.useState)(!1),[g,p]=(0,i.useState)(!1),[y,v]=(0,i.useState)(!0);(0,i.useEffect)(()=>{o(!0),b(n),v(!0)},[n]);let N=async e=>{try{p(!0),console.log("userInfo",e);let a=await fetch("/api/users/"+n,{method:"PUT",body:(0,f.Z)(e)});if(!a.ok)throw a;let s=await a.json();console.log(s),j.toast.success(s.message),b(n)}catch(a){let e=await a.json();j.toast.error(e.message)}finally{p(!1)}},b=async e=>{await fetch("/api/users/"+e).then(e=>e.json()).then(e=>a(e.data)).then(()=>{o(!1)})};return(0,s.jsxs)("section",{children:[(0,s.jsx)("h1",{className:"text-center font-bold text-xl text-slate-700 py-2",children:"User Info"}),!t&&(0,s.jsx)(c.J9,{initialValues:e,validationSchema:u.IK,onSubmit:e=>N(e),children:(0,s.jsxs)("section",{children:[(0,s.jsx)(c.gN,{component:x.ZD,name:"active",active:e.active,disabled:y}),(0,s.jsxs)(c.l0,{children:[(0,s.jsx)("label",{htmlFor:"username",children:"Username"}),(0,s.jsx)(c.gN,{name:"username",readOnly:y}),(0,s.jsx)(d.Z,{name:"username"}),(0,s.jsx)("label",{htmlFor:"fullname",children:"Full name"}),(0,s.jsx)(c.gN,{name:"fullname",readOnly:y}),(0,s.jsx)(d.Z,{name:"fullname"}),(0,s.jsx)("label",{htmlFor:"email",children:"Email"}),(0,s.jsx)("br",{}),(0,s.jsx)(c.gN,{name:"email",readOnly:y}),(0,s.jsx)(d.Z,{name:"email"}),(0,s.jsx)("label",{htmlFor:"role",className:"",children:"Role"}),(0,s.jsx)("br",{}),(0,s.jsxs)(c.gN,{component:"select",name:"role",className:"px-1",disabled:y,children:[(0,s.jsx)("option",{value:"USER",children:"User"}),(0,s.jsx)("option",{value:"ADMIN",children:"Admin"}),(0,s.jsx)("option",{value:"STAFF",children:"Staff"})]}),(0,s.jsx)(d.Z,{name:"role",className:"col-span-2 col-start-2"}),(0,s.jsxs)("div",{className:"flex gap-2 items-center justify-end pt-4",children:[(0,s.jsx)(r(),{href:"/admin/users/?user=".concat(n,"&addSign=true"),className:"bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide",children:"+ Add Signature"}),(0,s.jsxs)("button",{type:"button",className:"bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide ".concat(y?"":" hidden"),onClick:()=>v(!y),children:[(0,s.jsx)(h.dY,{}),"Edit"]}),(0,s.jsx)(x.xM,{hidden:y,loading:g,loadingMsg:"Saving",action:"Save",children:(0,s.jsx)(h.N,{})})]})]})]})})]})},p=n(6019),y=()=>{let[e,a]=(0,i.useState)(!1),n=async e=>{try{a(!0);let n=await fetch("/api/users",{method:"POST",body:(0,f.Z)(e)});if(!n.ok)throw n;let s=await n.json();console.log(s),j.toast.success(s.message)}catch(a){let e=await a.json();j.toast.error(e.message)}finally{a(!1)}};return(0,s.jsxs)("section",{children:[(0,s.jsx)("h2",{className:"text-center",children:"Add New user"}),(0,s.jsx)(c.J9,{initialValues:m.bi,validationSchema:u.eF,onSubmit:e=>n(e),children:(0,s.jsx)("section",{children:(0,s.jsxs)(c.l0,{children:[(0,s.jsx)("label",{htmlFor:"username",children:"Username"}),(0,s.jsx)(c.gN,{name:"username"}),(0,s.jsx)(d.Z,{name:"username"}),(0,s.jsx)("label",{htmlFor:"fullname",className:"pt-1",children:"Full name"}),(0,s.jsx)(c.gN,{name:"fullname"}),(0,s.jsx)(d.Z,{name:"fullname"}),(0,s.jsx)("label",{htmlFor:"email",className:"pt-1",children:"Email"}),(0,s.jsx)(c.gN,{name:"email"}),(0,s.jsx)(d.Z,{name:"email"}),(0,s.jsx)("label",{htmlFor:"role",className:"pt-1",children:"Role"}),(0,s.jsxs)(c.gN,{component:"select",name:"role",className:"px-1",children:[(0,s.jsx)("option",{value:"USER",children:"User"}),(0,s.jsx)("option",{value:"ADMIN",children:"Admin"}),(0,s.jsx)("option",{value:"STAFF",children:"Staff"})]}),(0,s.jsx)(d.Z,{name:"role",className:"col-span-2 col-start-2"}),(0,s.jsx)("div",{className:"flex items-center justify-end  pt-2",children:(0,s.jsx)(x.xM,{loading:e,loadingMsg:"Adding",action:"Register"})})]})})})]})},v=()=>{var e;let a=null===(e=(0,l.useSearchParams)())||void 0===e?void 0:e.get("user"),n=m.dr,[t,o]=(0,i.useState)(!1),g=async e=>{try{o(!0);let n=await fetch("/api/users/"+a,{method:"POST",body:(0,f.Z)(e)});if(!n.ok)throw n;let s=await n.blob(),t=window.URL.createObjectURL(s),r=document.createElement("a");r.href=t,r.setAttribute("download","i20.pdf"),r.click(),window.URL.revokeObjectURL(t),j.toast.success("Signature Added Successfully!")}catch(a){let e=await a.json();j.toast.error(e.message)}finally{o(!1)}};return(0,s.jsxs)("section",{children:[(0,s.jsxs)("div",{className:"flex justify-between items-center pt-2 pb-4",children:[(0,s.jsx)(r(),{href:"/admin/users?user=".concat(a),children:(0,s.jsx)(h.xC,{})}),(0,s.jsx)("h1",{className:"text-center font-bold text-xl text-slate-700",children:"Add Signature"}),(0,s.jsx)(h.xC,{className:"invisible text-slate-700"})]}),(0,s.jsx)(c.J9,{initialValues:n,validationSchema:u.nf,onSubmit:e=>g(e),children:(0,s.jsx)("section",{children:(0,s.jsxs)(c.l0,{children:[(0,s.jsx)("label",{htmlFor:"x",className:"pt-1",children:"X-Coordinate"}),(0,s.jsx)(c.gN,{name:"x"}),(0,s.jsx)(d.Z,{name:"x"}),(0,s.jsx)("label",{htmlFor:"y",className:"pt-1",children:"Y-Coordinate"}),(0,s.jsx)(c.gN,{name:"y"}),(0,s.jsx)(d.Z,{name:"y"}),(0,s.jsx)("label",{htmlFor:"length",className:"pt-1",children:"Length"}),(0,s.jsx)(c.gN,{name:"length"}),(0,s.jsx)(d.Z,{name:"length"}),(0,s.jsx)("label",{htmlFor:"width",className:"pt-1",children:"Width"}),(0,s.jsx)(c.gN,{name:"width"}),(0,s.jsx)(d.Z,{name:"width"}),(0,s.jsx)("label",{htmlFor:"signFile",className:"pt-1",children:"Signature"}),(0,s.jsx)(c.gN,{component:x.S2,name:"signFile"}),(0,s.jsx)(d.Z,{name:"signFile"}),(0,s.jsx)("label",{htmlFor:"action",className:"pt-1",children:"Action"}),(0,s.jsx)("br",{}),(0,s.jsxs)(c.gN,{component:"select",name:"action",className:"px-1",children:[(0,s.jsx)("option",{value:"",children:"Select Action"}),(0,s.jsx)("option",{value:"test",children:"Test"}),(0,s.jsx)("option",{value:"upload",children:"Upload"})]}),(0,s.jsx)(d.Z,{name:"action",className:"col-span-2 col-start-2"}),(0,s.jsx)("div",{className:"flex gap-2 items-center justify-end pt-4",children:(0,s.jsx)(x.xM,{loading:t,loadingMsg:"Adding",action:"Add Signature",children:(0,s.jsx)(h.dt,{})})})]})})})]})},N=e=>{let{searchParams:a}=e,[n,t]=(0,i.useState)([]),[l,c]=(0,i.useState)(""),d=null==a?void 0:a.addSign,u=(null==a?void 0:a.user)&&!d;(0,i.useEffect)(()=>{m()},[]);let m=async()=>{try{let e=await fetch("/api/users");if(!e.ok)throw e;let a=await e.json();t(a.data)}catch(a){let e=await a.json();j.toast.error(e.message)}};return(0,s.jsxs)("main",{className:"w-[95%] mx-auto",children:[(0,s.jsx)("h1",{className:" p-4 font-bold text-slate-700 text-xl",children:"User List"}),(0,s.jsxs)("section",{className:"grid grid-cols-2 gap-2 h-[70vh]",children:[(0,s.jsxs)("div",{className:"bg-white rounded-lg p-4",children:[(0,s.jsxs)(r(),{href:"/admin/users",className:"navLink bg-indigo-100 w-32 text-center text-indigo-900",children:[(0,s.jsx)(h.dt,{}),"Add User"]}),(0,s.jsx)("div",{className:"my-2 bg-slate-200 h-1 rounded-full"}),(0,s.jsx)("div",{className:"group",children:(0,s.jsxs)("div",{className:"searchBar",children:[(0,s.jsx)(h.W1,{}),(0,s.jsx)("input",{type:"text",placeholder:"Search User...",onChange:e=>c(e.target.value)})]})}),(0,s.jsx)("ul",{className:"flex flex-col gap-2 mt-4 overflow-y-auto h-[55vh]",children:(0,s.jsx)(o,{userList:n,search:l})})]}),(0,s.jsxs)("div",{className:"bg-white rounded-lg p-4 ",children:[u&&(0,s.jsx)(i.Suspense,{fallback:(0,s.jsx)(p.Z,{}),children:(0,s.jsx)(g,{})}),!(d||u)&&(0,s.jsx)(i.Suspense,{fallback:(0,s.jsx)(p.Z,{}),children:(0,s.jsx)(y,{})}),d&&(0,s.jsx)(i.Suspense,{fallback:(0,s.jsx)(p.Z,{}),children:(0,s.jsx)(v,{})})]})]})]})}},841:function(e,a,n){"use strict";var s=n(7437),t=n(2005),r=n(6230);a.Z=e=>{let{...a}=e;return(0,s.jsx)(r.Bc,{...a,render:e=>(0,s.jsx)("div",{className:a.className,children:(0,s.jsxs)("div",{className:"flex gap-2 text-red-700",children:[(0,s.jsx)(t.Pz,{className:"w-6 h-6"}),(0,s.jsx)("div",{children:e})]})})})}},7263:function(e,a,n){"use strict";function s(e){let a=new FormData;for(let[n,s]of Object.entries(e))a.append(n,s);return a}n.d(a,{Z:function(){return s}})},6454:function(e,a,n){"use strict";n.d(a,{Gw:function(){return o},Jv:function(){return u},U0:function(){return l},Us:function(){return x},Wj:function(){return t},Yi:function(){return d},bi:function(){return s},dr:function(){return i},mI:function(){return r},uv:function(){return m},w4:function(){return c}});let s={username:"",fullname:"",email:"",role:"USER"},t={username:"",fullname:"",email:"",role:"",signature:""},r={sign:"",dso:"",split:"",i20File:""},l={i20Type:"initI20",dsoName:"",i20File:"",issmFile:"",slateFile:"",toSlate:"n",prog:"ug"},i={x:80,y:180,length:160,width:60,signFile:"",action:""},o={username:"",password:""},c={username:""},d={cPwd:"",nPwd:"",cNPwd:""},u={username:"",fullname:"",email:""},m={type:"",username:"",password:"",endpoint:""},x={vpnUsername:"",vpnPassword:"",issmUsername:"",issmPassword:"",excelFile:"",instance:""}},7308:function(e,a,n){"use strict";n.d(a,{IA:function(){return o},PI:function(){return i},S2:function(){return d},ZD:function(){return u},vN:function(){return c},xM:function(){return m}});var s=n(7437),t=n(4263),r=n(2265),l=n(2838);let i=e=>{let{...a}=e,n=(0,t.useContextDispatch)();return(0,s.jsx)("select",{...a,onChange:e=>{a.form.setFieldValue(a.field.name,e.target.value),n({type:"slateInput",data:e.target.value})}})},o=e=>{let{...a}=e;return(0,s.jsx)("input",{type:"checkbox",onChange:e=>{a.form.setFieldValue(a.field.name,e.target.value)},...a})},c=e=>{let{...a}=e,n=(0,t.useContextDispatch)();return(0,s.jsx)("input",{type:"checkbox",onChange:e=>{a.form.setFieldValue(a.field.name,e.target.value),n({type:"dsoSign",data:e.target.checked})},...a})},d=e=>{let{...a}=e;return(0,s.jsx)("input",{type:"file",...a,onChange:e=>{a.form.setFieldValue(a.field.name,e.currentTarget.files[0])}})},u=e=>{let{...a}=e,[n,t]=(0,r.useState)(a.active),i=()=>{t(!n),a.form.setFieldValue(a.field.name,!n)};return(0,s.jsxs)("div",{className:"flex items-center justify-end gap-2",children:[(0,s.jsx)("label",{children:n?"Active":"Inactive"}),(0,s.jsx)("div",{className:"group ".concat(a.disabled?"opacity-70 group-hover:transition-none":""),children:(0,s.jsxs)(l.r,{checked:n,onChange:()=>i(),className:"".concat(n?"bg-green-600 group-hover:bg-green-700":"bg-red-600 group-hover:bg-red-700"," relative inline-flex h-6 w-12 items-center rounded-full transition duration-150"),disabled:a.disabled,children:[(0,s.jsx)("span",{className:"sr-only",children:a.name}),(0,s.jsx)("span",{className:"".concat(n?"translate-x-3":"-translate-x-3"," inline-block h-4 w-4 transform rounded-full bg-white transition group-hover:scale-125 duration-150")})]})})]})},m=e=>{let{...a}=e;return!a.hidden&&(0,s.jsxs)("button",{type:"submit",disabled:a.loading,children:[(0,s.jsx)("span",{className:"animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute",hidden:!a.loading}),(0,s.jsx)("span",{className:"w-2 h-2 bg-indigo-900 rounded-full",hidden:!a.loading}),!a.loading&&a.children,a.loading?"".concat(a.loadingMsg):"".concat(a.action)]})}},6762:function(e,a,n){"use strict";n.d(a,{IK:function(){return t},JI:function(){return r},Ju:function(){return c},OC:function(){return u},Qh:function(){return d},dm:function(){return o},eF:function(){return l},nf:function(){return i},uz:function(){return m}});var s=n(5691);let t=s.Ry({username:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a username"),fullname:s.Z_().max(50,"You may only enter upto 50 characters").required("Please enter fullname"),email:s.Z_().email().max(50,"You may only enter upto 50 characters").required("Please enter a valid email address")}),r=s.Ry({dsoName:s.nK().required("Please select a DSO"),i20File:s.nK().required("Please select a I20 file"),issmFile:s.nK().required("Please select a issm file"),slateFile:s.nK().required("Please select a slate file")}),l=s.Ry({username:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Username"),fullname:s.Z_().max(50,"You may only enter upto 50 characters").required("Please enter a Full name"),email:s.Z_().email().required("Please enter a email address").max(50,"You may only enter upto 50 characters")}),i=s.Ry({x:s.Rx().required("Please enter x-coordinates"),y:s.Rx().required("Please enter y-coordinates"),length:s.Rx().required("Please enter length"),width:s.Rx().required("Please enter width"),signFile:s.nK().required("Please attach a signature"),action:s.Z_().required("Please select an action")}),o=s.Ry({username:s.Z_().required("Please provide the username"),password:s.Z_().required("Please provide the password")}),c=s.Ry({username:s.Z_().required("Please provide username")}),d=s.Ry({cPwd:s.Z_().max(50,"You may only enter upto 50 characters").required("Please provide current password"),nPwd:s.Z_().max(50,"You may only enter upto 50 characters").required("Please provide new password"),cNPwd:s.Z_().label("nPwd").oneOf([s.iH("nPwd"),""],"Passwords must match").max(50,"You may only enter upto 50 characters").required("Please provide confirm new password")}),u=s.Ry({type:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Instance name"),username:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Username"),password:s.Z_().max(50,"You may only enter upto 50 characters").required("Please enter a Password"),endpoint:s.Z_().required("Please enter a endpoint address")}),m=s.Ry({vpnUsername:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a VPN username"),vpnPassword:s.Z_().max(50,"You may only enter upto 50 characters").required("Please enter VPN Password"),issmUsername:s.Z_().max(20,"You may only enter upto 20 characters").required("Please enter ISSM Username"),issmPassword:s.Z_().max(50,"You may only enter upto 50 characters").required("Please enter ISSM Password"),excelFile:s.nK().required("Please attach the Excel file"),instance:s.Z_().required("Please select an Instance")})},1396:function(e,a,n){e.exports=n(6685)},4033:function(e,a,n){e.exports=n(8165)}},function(e){e.O(0,[685,910,146,971,596,744],function(){return e(e.s=6626)}),_N_E=e.O()}]);