import{f as h}from"./api.b5a5152d.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{i as u,o as i,j as n,k as t,m as g,q as f,t as a,x as b,r as v,F as x,l as y,c as $}from"./vendor.b997f083.js";import{e as k}from"./emitter.c6b549dc.js";const w={props:["product","listIndex"],emits:["addCollection","addCart"],setup(s,{emit:o}){return{emit:o}}},C={class:"group"},L={class:"relative mb-2"},N=["src","alt"],S={class:"hidden group-hover:flex group-hover:bg-gray-900/50 space-x-3 flex-1 justify-center items-center absolute top-0 left-0 w-full h-full rounded"},P=t("i",{class:"bi bi-heart text-xl text-white"},null,-1),q=[P],B=t("i",{class:"bi bi-cart text-xl text-white"},null,-1),I=[B],j={class:"flex justify-between items-center"},A=t("p",{class:"productTag text-sm"},"\u5FBD\u7AE0",-1),T={class:"text-sm"};function V(s,o,e,d,p,_){const c=u("router-link");return i(),n("div",C,[t("div",L,[t("img",{class:"w-100 bg-gray-300 rounded",src:e.product.imageUrl,alt:`${e.product.title}\u7522\u54C1\u5716\u7247`},null,8,N),t("div",S,[t("button",{type:"button",class:"rounded py-2 px-3 bg-white bg-opacity-30 hover:border-gray-300 hover:bg-opacity-50","data-id":"product.id",onClick:o[0]||(o[0]=r=>s.$emit("addCollection",e.product))},q),t("button",{type:"button",class:"rounded py-2 px-3 bg-white bg-opacity-30 hover:border-gray-300 hover:bg-opacity-50","data-id":"product.id",onClick:o[1]||(o[1]=r=>s.$emit("addCart",e.product.id))},I)])]),g(c,{to:`/products/${e.product.id}`,class:"hover:text-yellow-600 block mb-1 cursor-pointer"},{default:f(()=>[b(a(e.product.title),1)]),_:1},8,["to"]),t("div",j,[A,t("p",T,"NT$ "+a(e.product.price),1)])])}var F=l(w,[["render",V]]);const J={components:{ProductListItemSquare:F},setup(){const s=v([]);function o(){h.getProducts().then(e=>{e&&(s.value=JSON.parse(JSON.stringify(e)),console.log(s.value))})}return o(),{productList:s,getProduct:o,emitter:k}}},O={class:"relative px-4 bg-white"},D={class:"grid grid-cols-5 p-5 gap-4"},E={class:"col-start-2 col-span-4"},H=t("h5",{class:"mb-4"},"\u5546\u54C1",-1),M={class:"grid grid-cols-3 gap-4"};function U(s,o,e,d,p,_){const c=u("ProductListItemSquare");return i(),n("div",O,[t("div",D,[t("div",E,[H,t("div",M,[(i(!0),n(x,null,y(d.productList,(r,m)=>(i(),$(c,{key:r.id,product:r,"list-index":m,onAddCart:z=>d.emitter.emit("add-cart",{id:r.id,num:1})},null,8,["product","list-index","onAddCart"]))),128))])])])])}var W=l(J,[["render",U]]);export{W as default};
