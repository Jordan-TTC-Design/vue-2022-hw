import{o as p,c as f,u as _,R as h,a as y,b as L,d as v,e as E,p as g,f as A}from"./vendor.39b5dbd6.js";const P=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};P();const b={setup(a){return(n,s)=>(p(),f(_(h)))}},O="modulepreload",u={},R="/vue-2022-hw/dist/",i=function(n,s){return!s||s.length===0?n():Promise.all(s.map(r=>{if(r=`${R}${r}`,r in u)return;u[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":O,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((d,m)=>{o.addEventListener("load",d),o.addEventListener("error",m)})})).then(()=>n())},l=y({history:L(),routes:[{path:"/",name:"FrontLayout",component:()=>i(()=>import("./FrontLayout.e4cda3c8.js"),["assets/FrontLayout.e4cda3c8.js","assets/vendor.39b5dbd6.js"]),children:[{path:"",component:()=>i(()=>import("./Home.331c7e76.js"),["assets/Home.331c7e76.js","assets/Home.23b20ff4.css","assets/plugin-vue_export-helper.21dcd24c.js","assets/vendor.39b5dbd6.js"])}]},{path:"/admin",name:"AdminLayout",component:()=>i(()=>import("./AdminLayout.9ffe814a.js"),["assets/AdminLayout.9ffe814a.js","assets/vendor.39b5dbd6.js"]),children:[{path:"login",component:()=>i(()=>import("./AdminLogin.becb2f16.js"),["assets/AdminLogin.becb2f16.js","assets/vendor.39b5dbd6.js","assets/api.6efc7dcb.js"])},{path:"",component:()=>i(()=>import("./AdminProducts.f0cac628.js"),["assets/AdminProducts.f0cac628.js","assets/vendor.39b5dbd6.js","assets/api.6efc7dcb.js","assets/plugin-vue_export-helper.21dcd24c.js"])}]}]});l.beforeEach(()=>{document.body.scrollTop=0,document.documentElement.scrollTop=0,window.pageYOffset=0});const c=v(b);c.use(E());c.use(l);c.use(g,A);c.mount("#app");