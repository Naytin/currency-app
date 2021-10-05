(this.webpackJsonpcurrency=this.webpackJsonpcurrency||[]).push([[0],{182:function(e,t,n){},288:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(23),o=n.n(a),i=(n(181),n(182),n(25)),s=n(46),l=n(297),u=n(77),d=n(58),j=n(48),f=n(59),p=n(298),b=n(295),O=n(88),m=n(76),h=n(175),x=n(61),v=x.c,g=n(34),y=function(e,t){if("number"===typeof e)return Number(e>1?e.toFixed(t):e.toFixed(t+1));var n=Number(e);return Number(n>1?n.toFixed(t):n.toFixed(t+1))},C=function(e){return 0===e.length?0:e.reduce((function(e,t){return e+t}),0)},N=function(e,t){return 0===t?t:100*(e/t-1)},w=function(e,t){return e<0?"-".concat(t).concat(y(e,2).toString().slice(1,6)):e>0?"+".concat(t).concat(y(e,2)):"".concat(t).concat(y(e,2))},S=function(e){return e.portfolio},T=Object(g.d)(S,(function(e){return e.portfolio.length?y(C(e.portfolio.map((function(e){return e.profit.totalValue}))),4):0})),k=Object(g.d)(S,(function(e){return e.portfolio.length?e.portfolio.map((function(e){return e.id})).join(","):null})),A=function(e){return e.app},E=n(291),F=n(5),D=function(){return Object(F.jsx)("div",{className:"loader",children:Object(F.jsx)(E.a,{})})},I=n(35),q=function(e){var t=Object(x.b)();return Object(c.useMemo)((function(){return Object(I.b)(e,t)}),[t,e])},_=n(172),L=n(32),R=n(66),U=n.n(R),V=n(120),B=n(162),P=n.n(B).a.create({baseURL:"https://pro-api.coinmarketcap.com/v1/cryptocurrency",headers:{"X-CMC_PRO_API_KEY":"b4dd5499-4837-4d1b-85c5-11d968b0af88","Access-Control-Allow-Origin":"*"}}),M=function(){return P.get("/listings/latest").then((function(e){return e.data}))},W=function(e){return P.get("/quotes/latest?id=".concat(e)).then((function(e){return e.data}))},$=Object(g.b)("app/setAppStatus"),J=Object(g.b)("app/setAppError"),Q=n(299),G=function(e){if("undefined"!==typeof window){var t=window.localStorage.getItem(e);return null===t?[]:JSON.parse(t)}return[]},X=function(e,t,n){var c=t.USD,r=c.price,a=c.percent_change_24h,o=C(e.map((function(e){return+e.coins}))),i=y(C(e.map((function(e){return+e.coins*r}))),2),s=C(e.map((function(e){return+e.coins*+e.cost}))),l=w(i-s,"$"),u=w(N(i,s),""),d=a,j=N(i,s)>=0;return{id:n,numberOfCoins:o,totalValue:i,cost:s,profit:l,percentage:u,changes24h:d,price:r,changes:j}},H=Object(g.c)("portfolio/getCoins",function(){var e=Object(V.a)(U.a.mark((function e(t,n){var c,r,a,o,i;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.dispatch,r=n.rejectWithValue,c($({status:"loading"})),e.prev=2,e.next=5,M();case 5:return a=e.sent,c($({status:"succeeded"})),e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(2),e.t0 instanceof Error&&(o=e.t0,i=o.message,c($({status:"failed"})),c(J({error:i}))),e.abrupt("return",r(null));case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t,n){return e.apply(this,arguments)}}()),Y=Object(g.c)("portfolio/getCoinsById",function(){var e=Object(V.a)(U.a.mark((function e(t,n){var c,r,a,o,i;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.dispatch,r=n.rejectWithValue,c($({status:"loading"})),e.prev=2,e.next=5,W(t);case 5:return a=e.sent,c($({status:"succeeded"})),e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(2),e.t0 instanceof Error&&(o=e.t0,i=o.message,c($({status:"failed"})),c(J({error:i}))),e.abrupt("return",r(null));case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t,n){return e.apply(this,arguments)}}()),K=Object(g.c)("portfolio/updateDataFromLS",function(){var e=Object(V.a)(U.a.mark((function e(t,n){var c,r,a,o,i;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=n.dispatch,r=n.rejectWithValue,c($({status:"loading"})),e.prev=2,a=G("portfolio"),c($({status:"succeeded"})),e.abrupt("return",a.map((function(e){return Object(L.a)(Object(L.a)({},e),{},{profit:X(e.transactions,e.quote,e.id)})})));case 8:return e.prev=8,e.t0=e.catch(2),e.t0 instanceof Error&&(o=e.t0,i=o.message,c($({status:"failed"})),c(J({error:i}))),e.abrupt("return",r(null));case 12:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t,n){return e.apply(this,arguments)}}()),z=Object(g.e)({name:"portfolio",initialState:{portfolio:[],coins:[]},reducers:{setCoinToState:function(e,t){var n={id:t.payload.id,numberOfCoins:0,totalValue:0,cost:0,profit:"",percentage:"",changes24h:0,price:0,changes:!0};e.portfolio.push(Object(L.a)(Object(L.a)({},t.payload),{},{transactions:[],profit:n}))},deleteCoin:function(e,t){e.portfolio=e.portfolio.filter((function(e){return e.id!==t.payload.id}))},addTransaction:function(e,t){e.portfolio=e.portfolio.map((function(e){return e.id===t.payload.id?Object(L.a)(Object(L.a)({},e),{},{transactions:[].concat(Object(_.a)(e.transactions),[Object(L.a)(Object(L.a)({},t.payload),{},{uuid:Object(Q.a)()})])}):e}))},deleteTransaction:function(e,t){e.portfolio=e.portfolio.map((function(e){return Object(L.a)(Object(L.a)({},e),{},{transactions:e.transactions.filter((function(e){return e.uuid!==t.payload.uuid}))})}))}},extraReducers:function(e){e.addCase(H.fulfilled,(function(e,t){e.coins=t.payload.map((function(e){return e}))})),e.addCase(Y.fulfilled,(function(e,t){e.portfolio=e.portfolio.map((function(e){return Object(L.a)(Object(L.a)({},t.payload[e.id]),{},{transactions:e.transactions,profit:e.profit})}))})),e.addCase(K.fulfilled,(function(e,t){e.portfolio=t.payload}))}}),Z=z.reducer,ee=z.actions,te=ee.setCoinToState,ne=ee.deleteCoin,ce=ee.addTransaction,re=ee.deleteTransaction,ae={getCoins:H,getCoinsById:Y,updateDataFromLS:K,setCoinToState:te,deleteCoin:ne,addTransaction:ce,deleteTransaction:re},oe=l.a.confirm,ie=function(){var e=v(S).portfolio,t=v(k),n=v(A).status,r=q(ae),a=r.deleteCoin,o=r.getCoinsById,i=r.updateDataFromLS;return Object(c.useEffect)((function(){var e;if(t){e=setInterval((function(){o(t),i()}),6e4)}return function(){return clearInterval(e)}}),[t]),"loading"===n&&null===t?Object(F.jsx)(D,{}):Object(F.jsxs)("section",{className:"portfolio",children:[Object(F.jsx)("div",{className:"top-bound"}),Object(F.jsxs)("div",{className:"portfolio-container",children:[Object(F.jsx)(u.a,{gutter:[0,16],justify:"space-between",className:"portfolio-overview",children:e.map((function(e){return Object(F.jsx)(d.a,{placement:"top",color:"blue",title:"Click to watch more info",children:Object(F.jsx)(j.a,{span:24,children:Object(F.jsxs)("div",{className:"portfolio-overview-card",children:[Object(F.jsx)(f.a,{type:"primary",icon:Object(F.jsx)(m.a,{}),className:"portfolio-overview-delete",onClick:function(){return t=e.id,void oe({title:"Do you Want to delete these item?",icon:Object(F.jsx)(O.a,{}),content:"All crypto assets will be deleted",onOk:function(){a({id:t})},onCancel:function(){console.log("Cancel")}});var t}}),Object(F.jsxs)(s.b,{to:"currency/".concat(e.name),className:"portfolio-overview-link",children:[Object(F.jsx)(p.a,{className:"portfolio-overview-image",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCL1sMQf-CBs21lUpMRnEqduXQW_-lt49iA&usqp=CAU"}),Object(F.jsx)(b.a,{title:"TOTAL VALUE",value:e.profit.totalValue,className:"portfolio-overview-total"}),Object(F.jsx)(b.a,{prefix:e.profit.totalValue?Object(F.jsxs)("span",{className:"portfolio-overview-profit-mod \n                                            ".concat(e.profit.changes?"long":"short"),children:[e.profit.percentage,"%"]}):"",title:"PROFIT/LOSS",value:"".concat(e.profit.profit),className:"portfolio-overview-profit"}),Object(F.jsx)(b.a,{prefix:"$",title:"".concat(e.profit.numberOfCoins," ").concat(e.symbol),value:y(e.quote.USD.price,2),className:"portfolio-overview-cost"})]})]})})},e.id)}))}),Object(F.jsx)(u.a,{gutter:[0,16],className:"portfolio-overview",children:Object(F.jsxs)(j.a,{xs:24,sm:24,lg:24,className:"portfolio-overview-add",children:[Object(F.jsx)(s.b,{to:"/cryptocurrencies",children:Object(F.jsx)(f.a,{type:"primary",shape:"circle",icon:Object(F.jsx)(h.a,{})})}),Object(F.jsx)(b.a,{value:"Bitcoin, Cardano, Ethereum",title:"Add tokens"})]})})]})]})},se=Object(c.memo)(ie),le=n(55),ue=n(293),de=n(300),je=ue.a.Text,fe=function(){var e=Object(i.g)(),t=Object(c.useState)("/"===e.pathname),n=Object(le.a)(t,2),r=n[0],a=n[1],o=v(T);return Object(c.useEffect)((function(){a("/"===e.pathname)}),[e]),Object(F.jsxs)("header",{className:"header",children:[Object(F.jsxs)(j.a,{span:12,className:"total-balance",children:[Object(F.jsx)(je,{className:"total-balance-text",children:"Total Balance"}),Object(F.jsxs)(je,{className:"total-balance-count",children:["$ ",o]})]}),Object(F.jsx)(j.a,{span:12,className:"add-token-control",children:r?Object(F.jsxs)(s.b,{to:"/cryptocurrencies",onClick:function(){return a(!1)},children:[Object(F.jsx)(h.a,{}),Object(F.jsx)(je,{children:"Add tokens"})]}):Object(F.jsx)(s.b,{to:"/",onClick:function(){return a(!0)},children:Object(F.jsx)(de.a,{})})})]})},pe=function(){var e=Object(c.useState)([]),t=Object(le.a)(e,2),n=t[0],r=t[1],a=v(S),o=a.coins,i=a.portfolio,s=v(A).status,l=q(ae),f=l.getCoins,O=l.setCoinToState;Object(c.useEffect)((function(){o.length||f()}),[o]),Object(c.useEffect)((function(){var e=o.filter((function(e){return!i.some((function(t){return e.id===t.id}))}));r(e)}),[o,i]);return"loading"===s?Object(F.jsx)(D,{}):Object(F.jsx)("section",{className:"cryptocurrency",children:Object(F.jsx)(u.a,{gutter:[0,16],justify:"space-between",className:"cryptocurrency-overview",children:n.map((function(e){return Object(F.jsx)(d.a,{placement:"top",color:"blue",title:"Click to add coin",children:Object(F.jsxs)(j.a,{xs:24,sm:24,lg:11,className:"cryptocurrency-overview-card",onClick:function(){return function(e){O(e)}(e)},children:[Object(F.jsxs)("div",{className:"cryptocurrency-overview-symbol",children:[Object(F.jsx)(p.a,{className:"cryptocurrency-overview-image",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCL1sMQf-CBs21lUpMRnEqduXQW_-lt49iA&usqp=CAU"}),Object(F.jsxs)(ue.a.Text,{children:[e.symbol," "]}),Object(F.jsxs)(ue.a.Text,{children:["(",e.name,")"]})]}),Object(F.jsx)(b.a,{prefix:"".concat(e.quote.USD.percent_change_24h<0?"":"+"),title:"CHANGES 24H",value:y(e.quote.USD.percent_change_24h,2)+"%",className:"cryptocurrency-overview-change \n                                       ".concat(e.quote.USD.percent_change_24h<0?"short":"long")}),Object(F.jsx)(b.a,{prefix:"$",title:"PRICE",value:y(e.quote.USD.price,2),className:"cryptocurrency-overview-price"})]})},e.id)}))})})},be=Object(c.memo)(pe),Oe=n(292),me=n(294),he=n(296),xe=function(e){var t=e.visible,n=e.onCreate,c=e.onCancel,r=e.title,a=me.a.useForm(),o=Object(le.a)(a,1)[0];return Object(F.jsx)(l.a,{visible:t,title:r,okText:"Create",cancelText:"Cancel",onCancel:c,onOk:function(){o.validateFields().then((function(e){o.resetFields(),n(e)})).catch((function(e){console.log("Validate Failed:",e)}))},children:Object(F.jsxs)(me.a,{form:o,layout:"vertical",name:"form_in_modal",initialValues:{modifier:"public"},children:[Object(F.jsx)(me.a.Item,{name:"coins",label:"Count of coin",rules:[{required:!0,pattern:new RegExp("^([,|.]?[0-9])+$"),message:"Please input the count of coins"}],children:Object(F.jsx)(he.a,{placeholder:"example - 0.054"})}),Object(F.jsx)(me.a.Item,{name:"cost",label:"Cost of one coin",rules:[{required:!0,pattern:new RegExp("^([,|.]?[0-9])+$"),message:"Please input the cost of coins"}],children:Object(F.jsx)(he.a,{type:"textarea",placeholder:"example - 45200"})})]})})},ve=Object(c.memo)(xe),ge=ue.a.Title,ye=l.a.confirm,Ce=function(){var e=Object(c.useState)(!1),t=Object(le.a)(e,2),n=t[0],r=t[1],a=Object(i.h)().tokenName,o=q(ae),l=o.addTransaction,d=o.deleteTransaction,p=o.updateDataFromLS,h=Object(x.c)((function(e){return function(e,t){return e.portfolio.portfolio.filter((function(e){return e.name===t}))}(e,a)}));return 0===h.length?Object(F.jsx)(i.a,{to:"/"}):Object(F.jsxs)("section",{className:"currency",children:[Object(F.jsxs)(ge,{level:4,className:"currency-title",children:[Object(F.jsx)("span",{children:h[0].symbol})," (",h[0].name,")"]}),Object(F.jsx)(s.b,{to:"/",children:Object(F.jsx)(f.a,{className:"currency-delete-btn",type:"primary",icon:Object(F.jsx)(m.a,{})})}),Object(F.jsx)(u.a,{gutter:[16,16],children:Object(F.jsxs)(j.a,{span:24,children:[Object(F.jsx)(ge,{level:5,children:"TRANSACTIONS"}),Object(F.jsx)(Oe.a,{title:"COINS",children:h[0].transactions.length?h[0].transactions.map((function(e){return Object(F.jsxs)("div",{className:"currency-transaction-item",children:[Object(F.jsx)(b.a,{prefix:h[0].symbol,title:"",value:"(".concat(e.coins,") -"),suffix:"".concat(e.cost)}),Object(F.jsx)(f.a,{type:"primary",icon:Object(F.jsx)(m.a,{}),onClick:function(){return t=e.uuid,void ye({title:"Do you Want to delete this item?",icon:Object(F.jsx)(O.a,{}),onOk:function(){d({uuid:t,id:h[0].id}),p()},onCancel:function(){console.log("Cancel")}});var t}})]},e.uuid)})):Object(F.jsxs)(ge,{level:5,children:["You don't have a transaction yet. Create a transaction for ",h[0].name]})}),Object(F.jsx)(f.a,{color:"red",className:"currency-transaction-btn",onClick:function(){return r(!0)},children:"Add transaction"})]})}),Object(F.jsx)(ve,{visible:n,onCreate:function(e){l(Object(L.a)({id:h[0].id},e)),r(!1),p()},title:h[0].name,onCancel:function(){r(!1)}})]})},Ne=Object(c.memo)(Ce);var we=function(){var e=q(ae).updateDataFromLS;return Object(c.useEffect)((function(){e()}),[]),Object(F.jsxs)("div",{className:"App",children:[Object(F.jsx)(fe,{}),Object(F.jsx)("main",{children:Object(F.jsxs)(i.d,{children:[Object(F.jsx)(i.b,{exact:!0,path:"/",render:function(){return Object(F.jsx)(se,{})}}),Object(F.jsx)(i.b,{exact:!0,path:"/cryptocurrencies",render:function(){return Object(F.jsx)(be,{})}}),Object(F.jsx)(i.b,{path:"/currency/:tokenName",render:function(){return Object(F.jsx)(Ne,{})}})]})})]})},Se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,301)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))},Te=n(82),ke=Object(g.e)({name:"app",initialState:{status:"idle",error:null},reducers:{},extraReducers:function(e){e.addCase($,(function(e,t){e.status=t.payload.status})),e.addCase(J,(function(e,t){e.error=t.payload.error}))}}).reducer,Ae=Object(I.c)({portfolio:Z,app:ke}),Ee=Object(g.a)({reducer:Ae,middleware:function(e){return e().concat(Te.a)}}),Fe=Date.now().valueOf();function De(e){Date.now().valueOf()-Fe>1e3&&(!function(e){try{var t=JSON.stringify(e);localStorage.setItem("portfolio",t)}catch(n){console.log("save localStorage error",n)}}(e),Fe=Date.now().valueOf())}Ee.subscribe((function(){De(Ee.getState().portfolio.portfolio)})),o.a.render(Object(F.jsx)(r.a.StrictMode,{children:Object(F.jsx)(x.a,{store:Ee,children:Object(F.jsx)(s.a,{children:Object(F.jsx)(we,{})})})}),document.getElementById("root")),Se()}},[[288,1,2]]]);
//# sourceMappingURL=main.eb0b9d04.chunk.js.map