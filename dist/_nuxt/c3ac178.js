(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{293:function(e,r,t){var content=t(305);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(30).default)("053f21cc",content,!0,{sourceMap:!1})},304:function(e,r,t){"use strict";t(293)},305:function(e,r,t){var n=t(29)(!1);n.push([e.i,".users__wrapper{width:90%;margin:auto;padding:1.5rem 0}.users{display:flex;justify-content:center;flex-wrap:wrap;margin-top:1rem}.user h2,.user p{font-size:.9rem;color:rgba(219,221,223,.87451)}.user span{color:#fff;font-size:1.1rem}.user{background:#091457;margin:1rem;padding:1.3rem 1rem;border-radius:1rem}.approve-btn{padding:.2rem 1.5rem;margin-top:1rem;font-size:1rem;font-weight:600;border-radius:.6rem;background:#162682;border:1px solid #162682}.approve-btn:hover{background:#fff;color:#162682}",""]),e.exports=n},315:function(e,r,t){"use strict";t.r(r);t(32),t(24),t(31),t(14),t(46),t(25),t(47);var n=t(9),o=t(19);function c(object,e){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),r.push.apply(r,t)}return r}var l={name:"users",computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(r){Object(n.a)(e,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(source,r))}))}return e}({},Object(o.b)(["getUsers"])),mounted:function(){this.$store.dispatch("getData","users")},methods:{approveUser:function(e){this.$store.dispatch("approveUser",e)}}},f=l,d=(t(304),t(11)),component=Object(d.a)(f,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("section",{staticClass:"users__wrapper"},[t("h1",{staticClass:"sec__title"},[e._v("Users")]),e._v(" "),t("div",{staticClass:"users"},e._l(e.getUsers,(function(r){return t("div",{key:r.id,staticClass:"user"},[t("h2",[t("span",[e._v("Name : ")]),e._v(e._s(r.name))]),e._v(" "),t("p",[t("span",[e._v("E-Mail : ")]),e._v(e._s(r.email))]),e._v(" "),t("p",[e._v("Role : "+e._s(r.role))]),e._v(" "),t("button",{staticClass:"approve-btn",on:{click:function(t){return e.approveUser(r.email)}}},[e._v("\n        Approve\n      ")])])})),0)])}),[],!1,null,null,null);r.default=component.exports}}]);