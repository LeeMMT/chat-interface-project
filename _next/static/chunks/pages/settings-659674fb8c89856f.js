(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[662],{8356:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/settings",function(){return r(5859)}])},5859:function(e,n,r){"use strict";r.r(n);var t=r(5893),i=r(1163),s=r(2487),u=r(7536),a=r(5582),l=r(9936),c=r(7357),o=r(3321),d=r(1664),h=r.n(d),f=r(6100);n.default=()=>{let e=(0,i.useRouter)(),{user:n,setUser:r}=(0,s.a)(),{register:d,handleSubmit:p,formState:{errors:y}}=(0,u.cI)(),x=(0,f.ad)(),_=async t=>{let{apiKey:i}=t;try{let t=(0,f.JU)(x,"users",n.uid);await (0,f.r7)(t,{apiKey:i}),r(e=>({...e,apiKey:i})),e.push("/")}catch(e){console.error("Error adding API key: ",e)}};return(0,t.jsxs)(a.Z,{component:"form",sx:{display:"flex",flexDirection:"column",justifyContent:"center",height:"100vh"},onSubmit:p(_),children:[(0,t.jsx)(l.Z,{...d("apiKey",{required:"Key required."}),sx:{mb:2},helperText:"Paste your OpenAI API key here",required:!0,fullWidth:!0,name:"apiKey",label:"API key",id:"api-key"}),(0,t.jsxs)(c.Z,{sx:{display:"flex",gap:2},children:[(0,t.jsx)(h(),{href:"/",children:(0,t.jsx)(o.Z,{variant:"text",children:"Go back"})}),(0,t.jsx)(o.Z,{variant:"outlined",type:"submit",children:"Add key"})]})]})}}},function(e){e.O(0,[199,75,664,774,888,179],function(){return e(e.s=8356)}),_N_E=e.O()}]);