(function(t){function e(e){for(var r,u,i=e[0],c=e[1],s=e[2],l=0,p=[];l<i.length;l++)u=i[l],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&p.push(o[u][0]),o[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);f&&f(e);while(p.length)p.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={main:0},a=[];function u(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"9e52ec77"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=u(t);var s=new Error;a=function(e){c.onerror=c.onload=null,clearTimeout(l);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,n[1](s)}o[t]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=s;a.push(["61e7","chunk-vendors"]),n()})({"018d":function(t,e,n){"use strict";var r=n("7fa7"),o=n.n(r);o.a},1073:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"},"3f54":function(t,e,n){},"61e7":function(t,e,n){"use strict";n.r(e);n("4de4"),n("d81d"),n("d3b7"),n("3ca3"),n("ddb0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=(n("54ba"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v(" | "),n("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),n("router-view")],1)}),a=[],u=(n("018d"),n("2877")),i={},c=Object(u["a"])(i,o,a,!1,null,null,null),s=c.exports,l=n("31bd"),f=n("2f62");function p(){return new f["a"].Store({state:{},mutations:{},actions:{},modules:{}})}r["a"].use(f["a"]);var d=n("8c4f"),v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("1073")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},m=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),n("h2",[t._v(t._s(t.faaSData))])])},b=[],g=n("bc3a"),_=n.n(g),y={name:"HelloWorld",props:{msg:String},data:function(){return{faaSData:"Getting data from FaaS..."}},mounted:function(){var t=this;_.a.get("/api/detail",{}).then((function(e){console.log("HelloWorld---[axios]"),t.faaSData=e.data.message}))}},w=y,j=(n("f258"),Object(u["a"])(w,h,b,!1,null,"46528a33",null)),O=j.exports,S={name:"Home",components:{HelloWorld:O}},x=S,T=Object(u["a"])(x,v,m,!1,null,null,null),k=T.exports;r["a"].use(d["a"]);var P=[{path:"/",name:"Home",component:k},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"9bcd"))}}];function A(){return new d["a"]({mode:"history",base:"/",routes:P})}function E(){var t=p(),e=A();Object(l["sync"])(t,e);var n=new r["a"]({router:e,store:t,render:function(t){return t(s)}});return{app:n,router:e,store:t}}r["a"].config.productionTip=!1,r["a"].mixin({beforeRouteUpdate:function(t,e,n){var r=this.$options.asyncData;r?r({store:this.$store,route:t}).then(n).catch(n):n()}});var H=E(),W=H.app,C=H.router,I=H.store,M=window,$=M.location;window.__INITIAL_STATE__&&I.replaceState(window.__INITIAL_STATE__),C.onReady((function(){C.beforeResolve((function(t,e,n){var r=C.getMatchedComponents(t),o=C.getMatchedComponents(e),a=!1,u=r.filter((function(t,e){return a=a||o[e]!==t,a})),i=u.map((function(t){return t.asyncData})).filter((function(t){return t}));return i.length?Promise.all(i.map((function(e){return e({store:I,route:t})}))).then((function(){n()})).catch(n):n()})),console.log("entry-client: router.onReady"),W.$mount("#app")})),"https:"===$.protocol&&navigator.serviceWorker&&navigator.serviceWorker.register("/service-worker.js")},"7fa7":function(t,e,n){},f258:function(t,e,n){"use strict";var r=n("3f54"),o=n.n(r);o.a}});
//# sourceMappingURL=main.d42cc1ec.js.map