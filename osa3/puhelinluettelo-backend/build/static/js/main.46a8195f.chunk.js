(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(2),l=function(e){var n=e.name,t=e.number,a=e.del;return r.a.createElement("p",null,n," ",t," ",r.a.createElement("button",{onClick:a},"delete"))},i=function(e){var n=e.searchValue,t=e.handleSearchChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.submit,t=e.name,a=e.nameChange,c=e.number,u=e.numberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=t(3),s=t.n(f),d="/api/persons",h=function(){return s.a.get(d).then((function(e){return e.data}))},b=function(e){return s.a.post(d,e).then((function(e){return e.data}))},v=function(e){return s.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return s.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.type},n.message)},g=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),f=Object(o.a)(u,2),s=f[0],d=f[1],g=Object(a.useState)(""),w=Object(o.a)(g,2),C=w[0],j=w[1],O=Object(a.useState)(""),S=Object(o.a)(O,2),y=S[0],k=S[1],U=Object(a.useState)(null),D=Object(o.a)(U,2),J=D[0],L=D[1];Object(a.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var N=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";L({message:e,type:n}),setTimeout((function(){L(null)}),3e3)},V=t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{notification:J}),r.a.createElement(i,{searchValue:y,handleSearchChange:function(e){k(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{submit:function(e){e.preventDefault();var n={name:s,number:C};if(t.find((function(e){return e.name===s}))){if(window.confirm("".concat(s," is already added to phonebook, replace number with a new one?"))){var a=t.filter((function(e){return e.name===s}))[0].id;p(a,n).then((function(e){c(t.map((function(n){return n.id!==a?n:e}))),N("User ".concat(s," number was changed to ").concat(C))})).catch((function(e){N("".concat(e.response.data.error," "),"error")}))}}else b(n).then((function(e){c(t.concat(e)),N("User ".concat(s," was added"))})).catch((function(e){N("".concat(e.response.data.error," "),"error")}));d(""),j("")},name:s,nameChange:function(e){d(e.target.value)},number:C,numberChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),V.map((function(e,n){return r.a.createElement(l,{key:n,name:e.name,number:e.number,del:function(){return n=e.name,a=e.id,void(window.confirm("Delete '".concat(n,"' ?"))&&v(a).then((function(e){c(t.filter((function(e){return e.name!==n}))),N("User ".concat(n," was deleted"))})).catch((function(e){N("".concat(n," was already deleted from server "),"error")})));var n,a}})})))};t(36);u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.46a8195f.chunk.js.map