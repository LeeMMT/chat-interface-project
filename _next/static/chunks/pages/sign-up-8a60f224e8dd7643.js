(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[801],{2295:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sign-up",function(){return r(952)}])},952:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return b}});var t=r(5893),n=r(7294),a=r(1163),i=r(9661),l=r(3321),o=r(6720),d=r(9936),u=r(3795),c=r(6886),m=r(7357),h=r(3845),p=r(5861),x=r(5582),f=r(7922),w=r(1737),Z=r(7536),j=r(4457),g=r(6100);let v=()=>{let e=(0,a.useRouter)(),[s,r]=(0,n.useState)(!1),[t,i]=(0,n.useState)(""),{register:l,handleSubmit:o,formState:{errors:d}}=(0,Z.cI)(),u=(0,g.ad)(),c=async(e,s)=>{try{let r=(0,g.JU)(u,"users",e);await (0,g.pl)(r,{...s}),console.log("User added with ID: ",e)}catch(e){console.error("Error adding user: ",e)}},m=async s=>{let{email:t,password:n}=s;try{let a=await (0,j.y1)(t,n);"string"==typeof a?(i(a),r(!0)):(e.push("/"),c(a.uid,{email:s.email}))}catch(e){console.error("Error during sign-up:",e)}};return{handleSubmit:o,onSubmit:m,register:l,errors:d,signUpError:t,alertOpen:s,setAlertOpen:r}};function y(){var e,s;let{handleSubmit:r,onSubmit:n,register:a,errors:Z,signUpError:j,alertOpen:g,setAlertOpen:y}=v();return(0,t.jsxs)(x.Z,{component:"main",maxWidth:"xs",style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"100vh"},children:[(0,t.jsx)(o.ZP,{}),(0,t.jsxs)(m.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,t.jsx)(i.Z,{sx:{m:1,bgcolor:"secondary.main"},children:(0,t.jsx)(h.Z,{})}),(0,t.jsx)(p.Z,{component:"h1",variant:"h5",children:"Sign up"}),(0,t.jsxs)(m.Z,{component:"form",noValidate:!0,onSubmit:r(n),sx:{mt:3},children:[(0,t.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,t.jsx)(c.ZP,{item:!0,xs:12,children:(0,t.jsx)(d.Z,{...a("email",{required:"Email is required.",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message:"Please enter a valid email address."}}),error:!!Z.email,helperText:null===(e=Z.email)||void 0===e?void 0:e.message,required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email"})}),(0,t.jsx)(c.ZP,{item:!0,xs:12,children:(0,t.jsx)(d.Z,{...a("password",{required:"Password is required.",minLength:{value:6,message:"Password must be at least 6 characters"},validate:{hasUpperCase:e=>/[A-Z]/.test(e)||"Password must contain at least 1 uppercase letter",hasNumber:e=>/\d/.test(e)||"Password must contain at least 1 number"}}),error:!!Z.password,helperText:(null===(s=Z.password)||void 0===s?void 0:s.message)||"Password should contain at least 6 characters, at least one uppercase letter, and at least one number",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password"})}),j&&(0,t.jsx)(c.ZP,{item:!0,xs:12,children:(0,t.jsx)(f.Z,{in:g,children:(0,t.jsx)(w.Z,{onClose:()=>y(!1),severity:"error",children:j})})})]}),(0,t.jsx)(l.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),(0,t.jsx)(c.ZP,{container:!0,justifyContent:"center",children:(0,t.jsx)(c.ZP,{item:!0,children:(0,t.jsx)(u.Z,{href:"sign-in",variant:"body2",children:"Already have an account? Sign in now"})})})]})]})]})}var P=r(2487),b=()=>{let{user:e}=(0,P.a)(),s=(0,a.useRouter)();return(0,n.useEffect)(()=>{e&&s.push("/")},[e]),(0,t.jsx)(y,{})}}},function(e){e.O(0,[199,75,82,938,774,888,179],function(){return e(e.s=2295)}),_N_E=e.O()}]);