(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f3fc09c4"],{"3bd6":function(t,a,n){"use strict";n.r(a);var s=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"axios"},[n("el-alert",{attrs:{title:"axios",type:"success",closable:!1}}),t._v(" "),t._l(t.list,(function(a){return n("el-tag",{key:a,staticClass:"axios_tag"},[t._v(t._s(a))])}))],2)},e=[];n("1c03");var c={name:"Axios",data:function(){return{list:[]}},mounted:function(){this.getRatings()},methods:{getRatings:function(){var t=this;this.$fetch("/api/ratings",{}).then((function(a){t.list=a.data})).catch((function(a){t.$message.error(a)}))}}},i=c,o=(n("cb0f"),n("9ca4")),r=Object(o["a"])(i,s,e,!1,null,"d1a555ee",null);a["default"]=r.exports},cb0f:function(t,a,n){"use strict";var s=n("ce8a"),e=n.n(s);e.a},ce8a:function(t,a,n){}}]);