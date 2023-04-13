import{d as g,o as d,c as h,a as n,F as k,r as $,n as E,e as u,f as L,g as M,h as z,b as D,t as F}from"./index-d16e4746.js";const I={class:"h-50 w-full rounded-md mx-auto my-3 shadow-lg bg-gray-200"},R={class:"flex p-2 m-2 items-center"},V=["onClick"],W=g({__name:"Panel",emits:["changeColor","changeWidth","clear","save"],setup(p,{emit:v}){const l=["black","#EB5353","#F9D923","#36AE7C","#187498"];return(e,a)=>(d(),h("div",I,[n("div",R,[(d(),h(k,null,$(l,r=>n("div",{onClick:s=>e.$emit("changeColor",r),style:E({backgroundColor:r}),class:"w-8 h-8 rounded-full m-1 cursor-pointer"},null,12,V)),64)),n("button",{onClick:a[0]||(a[0]=r=>e.$emit("save")),class:"bg-green-400 hover:bg-greeb-500 text-white font-bold py-1 px-4 ml-auto rounded"},"Save"),n("button",{onClick:a[1]||(a[1]=r=>e.$emit("clear")),class:"bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-4 ml-auto rounded"},"Clear")])]))}}),j={class:"h-screen w-screen"},A={class:"flex flex-col justify-center items-center h-full w-full",ref:"canvasContainer"},N=g({__name:"Canvas",emits:["save"],setup(p,{expose:v,emit:l}){const e=u(null),a=u(null),r=u(!1),s=u(0),c=u(0),i=u("black"),_=5,C=500,x=500,S=t=>{!r.value||!e.value||!a.value||(a.value.lineWidth=_,a.value.lineCap="round",a.value.strokeStyle=i.value,a.value.lineTo(t.clientX-s.value,t.clientY-c.value),a.value.stroke())},b=()=>{r.value=!1,a.value.stroke(),a.value.beginPath()},w=()=>{var o;const t=(o=e.value)==null?void 0:o.getBoundingClientRect();s.value=Math.floor((t==null?void 0:t.left)??0),c.value=Math.floor((t==null?void 0:t.top)??0)},y=()=>{!e.value||!a.value||(e.value.width=C,e.value.height=x,w())},m=()=>{if(!e.value)return;const t=e.value.toDataURL();l("save",t)},U=t=>{if(!e.value||!t)return;const o=new Image;o.onload=()=>{var f;(f=a.value)==null||f.drawImage(o,0,0)},o.src=t,y(),b()},B=()=>{!e.value||!a.value||a.value.clearRect(0,0,x,C)};return v({loadCanvas:U,saveCanvas:m}),L(()=>{var t;a.value=(t=e.value)==null?void 0:t.getContext("2d"),y(),m(),window.addEventListener("resize",w)}),(t,o)=>(d(),h("div",j,[n("div",A,[n("div",null,[n("canvas",{class:"shadow-xl border-2 border-gray-100 rounded-md",width:"{{width}}",height:"{{height}}",ref_key:"canvas",ref:e,onMousemove:S,onMousedown:o[0]||(o[0]=f=>r.value=!0),onMouseup:b},null,544),M(W,{onChangeColor:o[1]||(o[1]=f=>i.value=f),onClear:B,onSave:m})])],512)]))}}),P={class:"flex"},X={class:"w-64 z-40 h-screen"},Y={class:"h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800"},T={class:"space-y-2"},q=n("li",null,[n("div",{class:"text-center m-1 p-3 text-base font-normal rounded-lg text-black dark:text-white bg-gray-100 dark:bg-gray-700"}," Canvasnote")],-1),G=n("li",null,[n("div",{class:"text-center flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white"},[n("span",{class:"flex-1 whitespace-nowrap"},"Canvases")])],-1),H=["onClick"],J={class:"flex-1 whitespace-nowrap"},K=D('<li class="flex justify-center"><button type="button" class="btn font-medium rounded-full text-sm p-2.5 text-center items-center mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg><span class="sr-only">Icon description</span></button></li>',1),Q=g({__name:"Dashboard",setup(p){const v=u(),l=z({canvasList:[{name:"Canvas-1",dataUrl:""},{name:"Canvas-2",dataUrl:""},{name:"Canvas-3",dataUrl:""}]}),e=u(l.canvasList[0].name),a=s=>{const c=l.canvasList.find(i=>i.name===e.value);c&&(c.dataUrl=s)},r=s=>{e.value=s;const c=l.canvasList.find(i=>i.name===s);c&&(v.value.loadCanvas(c.dataUrl),console.log(c.dataUrl))};return L(()=>{l.canvasList.forEach(s=>{e.value=s.name,v.value.saveCanvas()}),e.value=l.canvasList[0].name}),(s,c)=>(d(),h("div",P,[n("aside",X,[n("div",Y,[n("ul",T,[q,G,n("li",null,[(d(!0),h(k,null,$(l.canvasList,i=>(d(),h("div",{onClick:_=>r(i.name),class:"cursor-pointer text-center flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"},[n("span",J,F(i.name),1)],8,H))),256))]),K])])]),M(N,{ref_key:"canvas",ref:v,onSave:a,"current-canvas":"{{currentCanvas}}"},null,512)]))}});export{Q as default};
