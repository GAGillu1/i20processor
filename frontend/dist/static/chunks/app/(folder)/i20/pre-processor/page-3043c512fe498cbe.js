(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[800],{8114:function(e,s,a){Promise.resolve().then(a.bind(a,9613))},9613:function(e,s,a){"use strict";a.r(s);var n=a(7437),t=a(2265),r=a(6230),l=a(4263),i=a(6762),c=a(6454),o=a(7308),u=a(841),d=a(5925),m=a(7263),p=a(8545),h=a(4033);s.default=e=>{let{searchParams:s}=e,a=(0,h.useRouter)(),x=(0,l.useContextDispatch)(),f=(0,l.useMyContext)(),g=null==s?void 0:s.result,[j,w]=(0,t.useState)(!1),[P,y]=(0,t.useState)(!1),[N,v]=(0,t.useState)(c.Us);async function b(e){try{w(!0);let s=await fetch("/api/i20/pre-processor",{method:"POST",body:(0,m.Z)(e)});if(200===s.status){let e=await s.blob(),n=window.URL.createObjectURL(e),t=document.createElement("a");t.href=n,t.setAttribute("download","Duplicate_Issm_Records.xlsx"),t.click(),window.URL.revokeObjectURL(n),d.toast.success("Download Successful!"),a.push("/i20/pre-processor?result=true")}else if(201===s.status){let e=await s.json();d.toast.success(e.message)}else throw s}catch(s){let e=await s.json();d.toast.error(e.message)}finally{w(!1),x({type:"preProcessUpdate",action:0})}}return t.useEffect(()=>{w(0!==f.preProcessStatus)},[]),(0,n.jsxs)("main",{className:"main",children:[(0,n.jsx)("h2",{children:"I20 Pre-processor"}),(0,n.jsx)("section",{className:"section",children:g?(0,n.jsx)(p.H,{}):(0,n.jsx)(r.J9,{initialValues:c.Us,validationSchema:i.uz,onSubmit:e=>b(e),children:(0,n.jsxs)("section",{className:"w-[90%] mx-auto",children:[(0,n.jsx)("h2",{className:"formHeader",children:"Import I20"}),(0,n.jsxs)(r.l0,{className:"grid grid-cols-3 gap-y-2 items-center",children:[(0,n.jsx)("h3",{className:"col-span-3 text-center",children:"VPN Credentials"}),(0,n.jsx)("label",{htmlFor:"vpnUsername",children:"Username"}),(0,n.jsx)(r.gN,{name:"vpnUsername",placeholder:"john12",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"vpnUsername",className:"col-span-2 col-start-2"}),(0,n.jsx)("label",{htmlFor:"vpnPassword",children:"Password"}),(0,n.jsx)(r.gN,{name:"vpnPassword",type:"password",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"vpnPassword",className:"col-span-2 col-start-2"}),(0,n.jsx)("h3",{className:"col-span-3 text-center",children:"ISSM Credentials"}),(0,n.jsx)("label",{htmlFor:"instance",children:"Instance:"}),(0,n.jsx)(r.gN,{name:"instance",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"instance",className:"col-span-2 col-start-2"}),(0,n.jsx)("label",{htmlFor:"issmUsername",children:"Username"}),(0,n.jsx)(r.gN,{name:"issmUsername",placeholder:"john12",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"issmUsername",className:"col-span-2 col-start-2"}),(0,n.jsx)("label",{htmlFor:"issmPassword",children:"Password"}),(0,n.jsx)(r.gN,{name:"issmPassword",type:"password",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"issmPassword",className:"col-span-2 col-start-2"}),(0,n.jsx)("label",{htmlFor:"excelFile",children:"Excel File:"}),(0,n.jsx)(r.gN,{component:o.S2,name:"excelFile",accept:".xlsx",className:"col-span-2"}),(0,n.jsx)(u.Z,{name:"excelFile",className:"col-span-2 col-start-2"}),(0,n.jsx)("div",{className:"mx-auto col-span-3 mt-8",children:(0,n.jsx)(o.xM,{loading:j,loadingMsg:"Processing",action:"Process"})})]})]})})}),j&&(0,n.jsx)(p.k,{})]})}},841:function(e,s,a){"use strict";var n=a(7437),t=a(2005),r=a(6230);s.Z=e=>{let{...s}=e;return(0,n.jsx)(r.Bc,{...s,render:e=>(0,n.jsx)("div",{className:s.className,children:(0,n.jsxs)("div",{className:"flex gap-2 text-red-700",children:[(0,n.jsx)(t.Pz,{className:"w-6 h-6"}),(0,n.jsx)("div",{children:e})]})})})}},7263:function(e,s,a){"use strict";function n(e){let s=new FormData;for(let[a,n]of Object.entries(e))s.append(a,n);return s}a.d(s,{Z:function(){return n}})},6454:function(e,s,a){"use strict";a.d(s,{Gw:function(){return c},Jv:function(){return d},U0:function(){return l},Us:function(){return p},Wj:function(){return t},Yi:function(){return u},bi:function(){return n},dr:function(){return i},mI:function(){return r},uv:function(){return m},w4:function(){return o}});let n={username:"",fullname:"",email:"",role:"USER"},t={username:"",fullname:"",email:"",role:"",signature:""},r={sign:"",dso:"",split:"",i20File:""},l={i20Type:"initI20",dsoName:"",i20File:"",issmFile:"",slateFile:"",toSlate:"n",prog:"ug"},i={x:80,y:180,length:160,width:60,signFile:"",action:""},c={username:"",password:""},o={username:""},u={cPwd:"",nPwd:"",cNPwd:""},d={username:"",fullname:"",email:""},m={type:"",username:"",password:"",endpoint:""},p={vpnUsername:"",vpnPassword:"",issmUsername:"",issmPassword:"",excelFile:"",instance:""}},7308:function(e,s,a){"use strict";a.d(s,{IA:function(){return c},PI:function(){return i},S2:function(){return u},ZD:function(){return d},vN:function(){return o},xM:function(){return m}});var n=a(7437),t=a(4263),r=a(2265),l=a(2838);let i=e=>{let{...s}=e,a=(0,t.useContextDispatch)();return(0,n.jsx)("select",{...s,onChange:e=>{s.form.setFieldValue(s.field.name,e.target.value),a({type:"slateInput",data:e.target.value})}})},c=e=>{let{...s}=e;return(0,n.jsx)("input",{type:"checkbox",onChange:e=>{s.form.setFieldValue(s.field.name,e.target.value)},...s})},o=e=>{let{...s}=e,a=(0,t.useContextDispatch)();return(0,n.jsx)("input",{type:"checkbox",onChange:e=>{s.form.setFieldValue(s.field.name,e.target.value),a({type:"dsoSign",data:e.target.checked})},...s})},u=e=>{let{...s}=e;return(0,n.jsx)("input",{type:"file",...s,onChange:e=>{s.form.setFieldValue(s.field.name,e.currentTarget.files[0])}})},d=e=>{let{...s}=e,[a,t]=(0,r.useState)(s.active),i=()=>{t(!a),s.form.setFieldValue(s.field.name,!a)};return(0,n.jsxs)("div",{className:"flex items-center justify-end gap-2",children:[(0,n.jsx)("label",{children:a?"Active":"Inactive"}),(0,n.jsx)("div",{className:"group ".concat(s.disabled?"opacity-70 group-hover:transition-none":""),children:(0,n.jsxs)(l.r,{checked:a,onChange:()=>i(),className:"".concat(a?"bg-green-600 group-hover:bg-green-700":"bg-red-600 group-hover:bg-red-700"," relative inline-flex h-6 w-12 items-center rounded-full transition duration-150"),disabled:s.disabled,children:[(0,n.jsx)("span",{className:"sr-only",children:s.name}),(0,n.jsx)("span",{className:"".concat(a?"translate-x-3":"-translate-x-3"," inline-block h-4 w-4 transform rounded-full bg-white transition group-hover:scale-125 duration-150")})]})})]})},m=e=>{let{...s}=e;return!s.hidden&&(0,n.jsxs)("button",{type:"submit",disabled:s.loading,children:[(0,n.jsx)("span",{className:"animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute",hidden:!s.loading}),(0,n.jsx)("span",{className:"w-2 h-2 bg-indigo-900 rounded-full",hidden:!s.loading}),!s.loading&&s.children,s.loading?"".concat(s.loadingMsg):"".concat(s.action)]})}},8545:function(e,s,a){"use strict";a.d(s,{H:function(){return j},k:function(){return x}});var n=a(7437),t=a(2265),r=a(4263),l=a(5925),i=a(4033),c=a(1396),o=a.n(c);let u=["w-[5%]","w-1/6","w-2/6","w-3/6","w-4/6","w-5/6","w-full"],d=["Add Sign:","Split Failure:","Total Files:","Total Pages:","Total Signatures:","Index Error:","Index Size:","Index Msg:","Missing Records:","Sign Message:","Split Message","Zip Message:"],m=()=>{let[e,s]=(0,t.useState)([]),a=(0,i.usePathname)(),r="/api"+a,c=async()=>{try{let e=await fetch(r);if(!e.ok)throw e;let a=await e.json();s(a.data)}catch(s){let e=await s.json();l.default.error(e.message)}};return(0,t.useEffect)(()=>{c()}),e?d.map((s,a)=>e[a]?(0,n.jsxs)(t.Fragment,{children:[(0,n.jsx)("p",{className:"font-semibold",children:s}),(0,n.jsx)("p",{className:"col-span-2",children:e[a]})]},a):""):""},p=["Uploading","Splitting","Signing","Zipping","Posting"],h=["Loading","Uploading","Validating VPN Credentials","VPN login Success","ISSM login Validation","ISSM Login Success"],x=()=>{let e=(0,i.usePathname)();return"/i20/pre-processor"===e?(0,n.jsx)(f,{}):(0,n.jsx)(g,{})},f=()=>{let e=(0,r.useMyContext)(),s=e.preProcessStatus,a=e.preProcessMaxCount+5;return(0,n.jsx)("section",{className:"section",children:(0,n.jsxs)("div",{className:"w-[90%] mx-auto",children:[(0,n.jsx)("h3",{className:"animate-pulse text-center",children:"".concat(s<6?h[s]:"Processed "+(s-5)+"/"+(a-5))}),(0,n.jsx)("div",{className:"mt-4 h-2 w-full rounded-full bg-slate-200",children:(0,n.jsx)("div",{className:"h-2 animate-pulse bg-indigo-400 rounded-full ",style:{width:"".concat(Math.floor(s/a*100),"%")}})})]})})},g=()=>{let e=(0,r.useMyContext)(),s=e.postProcessStatus;return(0,n.jsx)("section",{className:"section",children:(0,n.jsxs)("div",{className:"w-[90%] mx-auto",children:[(0,n.jsx)("h3",{className:"animate-pulse text-center",children:"".concat(p[s])}),(0,n.jsx)("div",{className:"mt-4 h-2 w-full rounded-full bg-slate-200",children:(0,n.jsx)("div",{className:"h-2 animate-pulse bg-indigo-400 rounded-full "+"".concat(u[s])})})]})})},j=()=>{let e=(0,i.usePathname)();return(0,n.jsxs)("section",{className:"w-[90%] mx-auto",children:[(0,n.jsx)("h2",{className:"formHeader",children:"Results"}),(0,n.jsx)("div",{className:"grid grid-cols-3 gap-y-2",children:(0,n.jsx)(m,{})}),(0,n.jsx)("div",{className:"flex justify-center items-center mt-4",children:(0,n.jsx)(o(),{href:e,children:(0,n.jsx)("button",{children:"Got it!"})})})]})}},6762:function(e,s,a){"use strict";a.d(s,{IK:function(){return t},JI:function(){return r},Ju:function(){return o},OC:function(){return d},Qh:function(){return u},dm:function(){return c},eF:function(){return l},nf:function(){return i},uz:function(){return m}});var n=a(5691);let t=n.Ry({username:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a username"),fullname:n.Z_().max(50,"You may only enter upto 50 characters").required("Please enter fullname"),email:n.Z_().email().max(50,"You may only enter upto 50 characters").required("Please enter a valid email address")}),r=n.Ry({dsoName:n.nK().required("Please select a DSO"),i20File:n.nK().required("Please select a I20 file"),issmFile:n.nK().required("Please select a issm file"),slateFile:n.nK().required("Please select a slate file")}),l=n.Ry({username:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Username"),fullname:n.Z_().max(50,"You may only enter upto 50 characters").required("Please enter a Full name"),email:n.Z_().email().required("Please enter a email address").max(50,"You may only enter upto 50 characters")}),i=n.Ry({x:n.Rx().required("Please enter x-coordinates"),y:n.Rx().required("Please enter y-coordinates"),length:n.Rx().required("Please enter length"),width:n.Rx().required("Please enter width"),signFile:n.nK().required("Please attach a signature"),action:n.Z_().required("Please select an action")}),c=n.Ry({username:n.Z_().required("Please provide the username"),password:n.Z_().required("Please provide the password")}),o=n.Ry({username:n.Z_().required("Please provide username")}),u=n.Ry({cPwd:n.Z_().max(50,"You may only enter upto 50 characters").required("Please provide current password"),nPwd:n.Z_().max(50,"You may only enter upto 50 characters").required("Please provide new password"),cNPwd:n.Z_().label("nPwd").oneOf([n.iH("nPwd"),""],"Passwords must match").max(50,"You may only enter upto 50 characters").required("Please provide confirm new password")}),d=n.Ry({type:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Instance name"),username:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a Username"),password:n.Z_().max(50,"You may only enter upto 50 characters").required("Please enter a Password"),endpoint:n.Z_().required("Please enter a endpoint address")}),m=n.Ry({vpnUsername:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter a VPN username"),vpnPassword:n.Z_().max(50,"You may only enter upto 50 characters").required("Please enter VPN Password"),issmUsername:n.Z_().max(20,"You may only enter upto 20 characters").required("Please enter ISSM Username"),issmPassword:n.Z_().max(50,"You may only enter upto 50 characters").required("Please enter ISSM Password"),excelFile:n.nK().required("Please attach the Excel file"),instance:n.Z_().required("Please select an Instance")})},1396:function(e,s,a){e.exports=a(6685)},4033:function(e,s,a){e.exports=a(8165)}},function(e){e.O(0,[685,910,146,971,596,744],function(){return e(e.s=8114)}),_N_E=e.O()}]);