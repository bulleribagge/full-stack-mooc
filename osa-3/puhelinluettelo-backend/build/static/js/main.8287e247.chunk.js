(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(39)},19:function(e,t,n){},20:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(12),c=n.n(u),i=(n(19),n(4)),o=n(2),l=function(e){var t=e.list,n=e.deletePerson;return r.a.createElement("div",null,t.map(function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{type:"button",onClick:function(){return n(Object(i.a)({},e))}},"poista"))}))},s=function(e){var t=e.addPerson,n=e.newName,a=e.setNewName,u=e.newNumber,c=e.setNewNumber;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:n,onChange:function(e){return a(e.target.value)}})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:u,onChange:function(e){return c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},m=function(e){var t=e.filter,n=e.setFilter;return r.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:t,onChange:function(e){return n(e.target.value)}}))},f=(n(20),function(e){var t=e.notification;return"success"in t?r.a.createElement("div",{className:t.success?"success":"error"},t.message):r.a.createElement("div",null)}),d=n(3),p=n.n(d),v=function(){return p.a.get("/api/persons").then(function(e){return e.data})},h=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),h=d[0],b=d[1],E=Object(a.useState)(""),w=Object(o.a)(E,2),j=w[0],N=w[1],O=Object(a.useState)(""),g=Object(o.a)(O,2),k=g[0],P=g[1],C=Object(a.useState)({}),S=Object(o.a)(C,2),y=S[0],L=S[1];Object(a.useEffect)(function(){v().then(function(e){return u(e)})},[]);var F=function(e,t,n){L({message:e,success:t}),setTimeout(function(){L({})},n)},H=function(e){var t=e.response.data.error;F(t||e.message,!1,5e3)},J=n.filter(function(e){return e.name.toLowerCase().includes(k.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(f,{notification:y}),r.a.createElement(m,{filter:k,setFilter:P}),r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement(s,{addPerson:function(e){var t;if(e.preventDefault(),n.map(function(e){return e.name}).includes(h)){if(window.confirm("".concat(h," on jo luettelossa, korvataanko vanha numero uudella?"))){var a=n.find(function(e){return e.name.includes(h)});(t=Object(i.a)({},a,{number:j}),p.a.put("/api/persons/".concat(t.id),t).then(function(e){return e.data})).then(function(){return v()}).then(function(e){return u(e)}).then(function(){return F("P\xe4ivitettiin henkil\xf6n ".concat(h," puhelinnumero"),!0)}).catch(function(e){return H(e)})}}else(function(e){return p.a.post("/api/persons",e).then(function(e){return e.data})})({name:h,number:j}).then(function(){return v()}).then(function(e){return u(e)}).then(function(){return F("Lis\xe4ttiin ".concat(h," puhelinluetteloon"),!0)}).catch(function(e){return H(e)})},newName:h,setNewName:b,newNumber:j,setNewNumber:N}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(l,{list:J,deletePerson:function(e){var t=e.id,a=e.name;window.confirm("Haluatko todella poistaa henkil\xf6n ".concat(a,"?"))&&(function(e){return p.a.delete("/api/persons/".concat(e)).then(function(e){return e.data})}(t).then(function(){return F("Poistettiin ".concat(a," puhelinluettelosta"),!0,3e3)}).catch(function(){return F("Henkil\xf6 ".concat(a," oli jo poistettu"),!1,5e3)}),u(n.filter(function(e){return e.id!==t})))}}))};c.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.8287e247.chunk.js.map