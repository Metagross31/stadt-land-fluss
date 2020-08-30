(this["webpackJsonpstadt-land-fluss"]=this["webpackJsonpstadt-land-fluss"]||[]).push([[2],{101:function(e,t,n){e.exports=n(116)},102:function(e,t,n){},107:function(e,t,n){},112:function(e,t,n){},116:function(e,t,n){"use strict";n.r(t),n.d(t,"appStore",(function(){return ie}));n(102);var a=n(0),r=n.n(a),o=n(6),i=n.n(o),c=n(53),l=n(32),s=n(33),u=n(35),m=n(36),d=(n(107),n(157)),p=n(20),f=n(26),h=n(18),g=n(159),b=(n(112),n(147)),y=n(67),v=n.n(y),E=n(81),k=n(83),S=n.n(k),w=n(82),N=n.n(w),O=function(e){Object(m.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={isFullscreenActive:!1},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.state.isFullscreenActive?"Vollbildmodus beenden":"Vollbildmodus starten";return r.a.createElement("header",{className:"app-header "+this.props.theme.className},r.a.createElement("h1",null,"Stadt-Land-Fluss"),r.a.createElement("p",null,"Spieler: ",this.props.playerName?this.props.playerName:"-"),r.a.createElement("div",{className:"about-section"},r.a.createElement("p",null,"v",E.version),r.a.createElement("a",{href:"https://github.com/alexlehner86",target:"_blank",rel:"noopener noreferrer","aria-label":"Mehr \xfcber den Autor erfahren (\xf6ffnet neues Fenster)"},"Autor")),r.a.createElement("div",{className:"icon-buttons"},r.a.createElement(b.a,{size:"small",title:t,"aria-label":t,onClick:function(){return e.toggleFullscreen()}},this.state.isFullscreenActive?r.a.createElement(N.a,{fontSize:"small"}):r.a.createElement(S.a,{fontSize:"small"})),r.a.createElement(b.a,{size:"small",title:"Zum Dashboard","aria-label":"Zum Dashboard",onClick:function(){return e.props.history.push("/")}},r.a.createElement(v.a,{fontSize:"small"}))))}},{key:"componentDidMount",value:function(){var e=this;document.addEventListener("fullscreenchange",(function(t){e.setState({isFullscreenActive:!!document.fullscreenElement})}))}},{key:"toggleFullscreen",value:function(){this.state.isFullscreenActive?this.closeFullscreen():this.openFullscreen()}},{key:"openFullscreen",value:function(){var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}},{key:"closeFullscreen",value:function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()}}]),n}(a.Component),j=Object(h.f)(Object(p.b)((function(e){return{playerName:e.playerInfo?e.playerInfo.name:""}}))(O)),_=n(77),T=n(38),I=n(130),F=n(156),A=n(151),C=n(78),G=n.n(C),R=n(94),z=n.n(R),P=n(64),x=n(13),M=n(23),L=n(29),D=n.n(L),U=function(e){Object(m.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={anchorEl:null},e.handleThemePickerClick=function(t){e.setState({anchorEl:t.currentTarget})},e.handleThemePickerMenuClose=function(){e.setState({anchorEl:null})},e.handleThemePickerMenuItemClick=function(t){e.setState({anchorEl:null}),e.props.onSetAppTheme(t),Object(M.g)(t.id)},e}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=r.a.createElement(A.a,{component:f.b,to:"/play",className:D.a.rejoin_game_link},r.a.createElement(z.a,null),"Zur\xfcck ins laufende Spiel");return r.a.createElement("div",{className:"main-content-wrapper"},r.a.createElement("div",{className:"material-card-style"},r.a.createElement(P.a,{showDivider:!0,text:"Dashboard"}),r.a.createElement("div",{className:D.a.link_container},this.props.gameId?t:null,r.a.createElement(A.a,{component:f.b,to:"/newgame"},"Neues Spiel"),r.a.createElement(A.a,{component:f.b,to:"/joingame"},"Spiel beitreten"),r.a.createElement(A.a,{component:f.b,to:"/manual"},"Spielanleitung")),r.a.createElement("div",{className:D.a.image_wrapper},r.a.createElement("img",{src:this.props.activeTheme.homepageImageUrl,alt:"Stadt, Land, Fluss",className:D.a.slf_image}),r.a.createElement(b.a,{className:D.a.theme_picker_button,color:"primary",title:"Theme \xe4ndern","aria-label":"Theme \xe4ndern","aria-controls":"theme-picker-menu","aria-haspopup":"true",onClick:this.handleThemePickerClick},r.a.createElement(G.a,{fontSize:"small"})),r.a.createElement(I.a,{id:"theme-picker-menu",anchorEl:this.state.anchorEl,keepMounted:!0,open:Boolean(this.state.anchorEl),onClose:this.handleThemePickerMenuClose},T.a.map((function(t,n){return r.a.createElement(F.a,{key:"theme-picker-menu-item-"+n,onClick:function(){return e.handleThemePickerMenuItemClick(t)}},t.displayName)})))),r.a.createElement("div",{className:D.a.img_copyright},r.a.createElement("h3",null,"Credits/Bilder"),r.a.createElement("a",{href:"https://www.vecteezy.com/vector-art/830131-river-city-landscape-with-buildings-hills-and-trees",target:"_blank",rel:"noopener noreferrer"},"Homepage/Stadt-Land-Fluss by pikgura \u2013 www.vecteezy.com"),r.a.createElement("a",{href:"https://www.vecteezy.com/vector-art/276920-abstract-seamless-pattern-with-tropical-leaves",target:"_blank",rel:"noopener noreferrer"},"Theme Gr\xfcn/Wald by NadiaGrapes \u2013 www.vecteezy.com"),r.a.createElement("a",{href:"https://www.freepik.com/free-photos-vectors/background",target:"_blank",rel:"noopener noreferrer"},"Theme Blau/Meer by macrovector \u2013 www.freepik.com"),r.a.createElement("a",{href:"https://www.vecteezy.com/vector-art/460735-seashell-sand-seamless-pattern",target:"_blank",rel:"noopener noreferrer"},"Theme Orange/Strand by Macrovector \u2013 www.vecteezy.com"),r.a.createElement("a",{href:"https://www.vecteezy.com/vector-art/454258-music-seamless",target:"_blank",rel:"noopener noreferrer"},"Theme Pink/Musik by Macrovector \u2013 www.vecteezy.com"),r.a.createElement("a",{href:"https://www.vecteezy.com/vector-art/662038-cat-and-bat-pattern",target:"_blank",rel:"noopener noreferrer"},"Theme Schwarz/Goth by angyee \u2013 www.vecteezy.com"))))}}]),n}(a.Component),B=Object(p.b)((function(e){return{activeTheme:e.activeTheme,gameId:e.gameId}}),(function(e){return{onSetAppTheme:function(t){return e(Object(x.h)(t))}}}))(U),W=n(43),J=n.e(10).then(n.bind(null,255)),q=Promise.all([n.e(1),n.e(11)]).then(n.bind(null,256)),H=Promise.all([n.e(0),n.e(1),n.e(7),n.e(8)]).then(n.bind(null,282)),K=Promise.all([n.e(0),n.e(1),n.e(5),n.e(9)]).then(n.bind(null,279)),V=Object(a.lazy)((function(){return J})),Z=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(12)]).then(n.bind(null,283))})),Y=Object(a.lazy)((function(){return q})),Q=Object(a.lazy)((function(){return H})),X=Object(a.lazy)((function(){return K})),$=n(115),ee=function(e){Object(m.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(d.a,{theme:this.props.activeTheme.muiTheme},r.a.createElement("div",{className:"app-container"},r.a.createElement(f.a,{basename:"/stadt-land-fluss"},r.a.createElement(j,{theme:this.props.activeTheme}),r.a.createElement("main",{className:"app-main "+this.props.activeTheme.className,style:this.props.activeTheme.style},r.a.createElement(a.Suspense,{fallback:r.a.createElement(_.a,null)},r.a.createElement(h.c,null,r.a.createElement(h.a,{path:"/manual",exact:!0,component:V}),r.a.createElement(h.a,{path:"/newgame",exact:!0,component:Q}),r.a.createElement(h.a,{path:"/joingame",exact:!0,component:Y}),r.a.createElement(h.a,{path:"/play",exact:!0,component:X}),r.a.createElement(h.a,{path:"/results",exact:!0,component:Z}),r.a.createElement(h.a,{path:"/",component:B})))))))}},{key:"componentDidMount",value:function(){$.disable();var e=Object(M.a)();if(e){var t=T.a.find((function(t){return t.id===e}));t&&this.props.onSetAppTheme(t)}var n=Object(M.b)(),a=Object(W.b)(new Date);(!n||a-n.idCreationTimestamp>604800)&&(n={id:Object(g.a)(),idCreationTimestamp:a,name:n?n.name:""},Object(M.h)(n)),this.props.onSetStoredPlayerInfo(n);var r=Object(M.d)();r&&(a-r.idCreationTimestamp<=3600?this.props.onSetStoredRunningGameInfo(r):Object(M.f)())}}]),n}(a.Component),te=Object(p.b)((function(e){return{activeTheme:e.activeTheme}}),(function(e){return{onSetAppTheme:function(t){return e(Object(x.h)(t))},onSetStoredPlayerInfo:function(t){return e(Object(x.k)(t))},onSetStoredRunningGameInfo:function(t){return e(Object(x.l)(t))}}}))(ee),ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var re=n(22),oe={activeTheme:T.a[0],allPlayers:null,gameId:null,gameConfig:null,gameRounds:null,isRejoiningGame:!1,playerIdCreationTimestamp:0,playerInfo:null},ie=Object(c.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x.b:return Object(re.a)({},e,{activeTheme:t.payload});case x.e:var n=t.payload;return Object(re.a)({},e,{isRejoiningGame:!1,playerIdCreationTimestamp:n.idCreationTimestamp,playerInfo:{id:n.id,isAdmin:!1,name:n.name}});case x.f:var a=t.payload;return Object(re.a)({},e,{isRejoiningGame:!0,gameId:a.gameId,playerInfo:Object(re.a)({},e.playerInfo,{isAdmin:a.isPlayerAdmin})});case x.c:return Object(re.a)({},e,{},t.payload);case x.d:return Object(re.a)({},e,{},t.payload,{gameId:null});case x.a:return Object(re.a)({},e,{allPlayers:null,gameId:null,gameConfig:null,gameRounds:null});default:return e}}));i.a.render(r.a.createElement(p.a,{store:ie},r.a.createElement(te,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/stadt-land-fluss",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/stadt-land-fluss","/service-worker.js");ne?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ae(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ae(t,e)}))}}()},13:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return r})),n.d(t,"f",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"a",(function(){return l})),n.d(t,"h",(function(){return s})),n.d(t,"k",(function(){return u})),n.d(t,"l",(function(){return m})),n.d(t,"i",(function(){return d})),n.d(t,"j",(function(){return p})),n.d(t,"g",(function(){return f}));var a="SET_APP_THEME",r="SET_STORED_PLAYER_INFO",o="SET_STORED_RUNNING_GAME_INFO",i="SET_DATA_FOR_NEW_GAME",c="SET_DATA_OF_FINISHED_GAME",l="RESET_APP_STATE",s=function(e){return{type:a,payload:e}},u=function(e){return{type:r,payload:e}},m=function(e){return{type:o,payload:e}},d=function(e){return{type:i,payload:e}},p=function(e){return{type:c,payload:e}},f=function(){return{type:l}}},23:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"g",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return l})),n.d(t,"d",(function(){return s})),n.d(t,"j",(function(){return u})),n.d(t,"c",(function(){return m})),n.d(t,"i",(function(){return d})),n.d(t,"e",(function(){return p})),n.d(t,"k",(function(){return f})),n.d(t,"f",(function(){return h}));var a=n(43),r=n(63),o=function(){return localStorage.getItem("SLF-APP-THEME")},i=function(e){return localStorage.setItem("SLF-APP-THEME",e)},c=function(){var e=localStorage.getItem("SLF-PLAYER-INFO");return e?JSON.parse(e):null},l=function(e){return localStorage.setItem("SLF-PLAYER-INFO",JSON.stringify(e))},s=function(){var e=localStorage.getItem("SLF-RUNNING-GAME-INFO");return e?JSON.parse(e):null},u=function(e){return localStorage.setItem("SLF-RUNNING-GAME-INFO",JSON.stringify(e))},m=function(){var e=localStorage.getItem("SLF-RUNNING-GAME-CONFIG");return e?JSON.parse(e):null},d=function(e){return localStorage.setItem("SLF-RUNNING-GAME-CONFIG",JSON.stringify(e))},p=function(e){var t=localStorage.getItem("SLF-RUNNING-GAME-ROUND-"+e);return t?Object(a.a)(JSON.parse(t)):null},f=function(e,t){localStorage.setItem("SLF-RUNNING-GAME-ROUND-"+e,JSON.stringify(Object(a.c)(t)))},h=function(){localStorage.removeItem("SLF-RUNNING-GAME-INFO"),localStorage.removeItem("SLF-RUNNING-GAME-CONFIG");for(var e=1;e<=r.i;e++)localStorage.removeItem("SLF-RUNNING-GAME-ROUND-"+e)}},29:function(e,t,n){e.exports={link_container:"Dashboard_link_container__3OzIj",rejoin_game_link:"Dashboard_rejoin_game_link__3ZrTM",image_wrapper:"Dashboard_image_wrapper__2diTg",theme_picker_button:"Dashboard_theme_picker_button__LkZGQ",slf_image:"Dashboard_slf_image__xWV0X",img_copyright:"Dashboard_img_copyright__PC5ge"}},38:function(e,t,n){"use strict";n.d(t,"a",(function(){return w}));var a,r=n(85),o=n.n(r),i=n(86),c=n.n(i),l=n(87),s=n.n(l),u=n(88),m=n.n(u),d=n(62),p=n.n(d),f=n(89),h=n.n(f),g=n(90),b=n.n(g),y=n(91),v=n.n(y),E=n(92),k=n.n(E),S=n(30);!function(e){e.green="green",e.blue="blue",e.orange="orange",e.pink="pink",e.black="black"}(a||(a={}));var w=[{id:a.green,animationBackgroundColor:"rgb(31, 121, 52)",className:"green-theme",displayName:"Gr\xfcn/Wald",homepageImageUrl:"".concat("/stadt-land-fluss","/assets/city-country-river-green.jpg"),muiTheme:Object(S.a)({palette:{primary:o.a,secondary:c.a}}),style:{background:"linear-gradient(rgba(60, 143, 80, 0.3), rgba(60, 143, 80, 0.3)),\n                url('".concat("/stadt-land-fluss","/assets/leaves-pattern.jpg')")}},{id:a.blue,animationBackgroundColor:"rgb(9, 100, 204)",className:"blue-theme",displayName:"Blau/Meer",homepageImageUrl:"".concat("/stadt-land-fluss","/assets/city-country-river-blue.jpg"),muiTheme:Object(S.a)({palette:{primary:s.a,secondary:m.a}}),style:{background:"linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),\n                url('".concat("/stadt-land-fluss","/assets/sea-pattern.jpg')")}},{id:a.orange,animationBackgroundColor:"rgb(187, 138, 5)",className:"orange-theme",displayName:"Orange/Strand",homepageImageUrl:"".concat("/stadt-land-fluss","/assets/city-country-river-orange.jpg"),muiTheme:Object(S.a)({palette:{primary:p.a,secondary:h.a}}),style:{background:"linear-gradient(rgba(241, 179, 8, 0.3), rgba(240, 188, 47, 0.3)),\n                url('".concat("/stadt-land-fluss","/assets/beach-pattern.jpg')")}},{id:a.pink,animationBackgroundColor:"rgb(167, 34, 207)",className:"pink-theme",displayName:"Pink/Musik",homepageImageUrl:"".concat("/stadt-land-fluss","/assets/city-country-river-pink.jpg"),muiTheme:Object(S.a)({palette:{primary:b.a,secondary:v.a}}),style:{background:"linear-gradient(rgba(133, 14, 103, 0.3), rgba(133, 14, 103, 0.3)),\n                url('".concat("/stadt-land-fluss","/assets/music-pattern.jpg')")}},{id:a.black,animationBackgroundColor:"rgb(0, 0, 0)",className:"black-theme",displayName:"Schwarz/Goth",homepageImageUrl:"".concat("/stadt-land-fluss","/assets/city-country-river-bw.jpg"),muiTheme:Object(S.a)({palette:{primary:k.a,secondary:p.a}}),style:{background:"linear-gradient(rgba(0, 51, 153, 0.1), rgba(0, 51, 153, 0.1)),\n                url('".concat("/stadt-land-fluss","/assets/halloween-pattern.jpg')")}}]},43:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return r})),n.d(t,"f",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return l}));var a=function(e){var t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},r=function(e,t){return new Array(e).fill(t)},o=function(e,t,n){return 1===e?t:n},i=function(e){return e.getTime()/1e3|0},c=function(e){var t=new Map;return Object.keys(e).forEach((function(n){return t.set(n,e[n])})),t},l=function(e){var t={};return e.forEach((function(e,n){return t[n]=e})),t}},63:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"m",(function(){return o})),n.d(t,"i",(function(){return i})),n.d(t,"k",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"j",(function(){return s})),n.d(t,"t",(function(){return a})),n.d(t,"p",(function(){return m})),n.d(t,"r",(function(){return d})),n.d(t,"q",(function(){return p})),n.d(t,"a",(function(){return f})),n.d(t,"f",(function(){return u})),n.d(t,"l",(function(){return h})),n.d(t,"g",(function(){return g})),n.d(t,"h",(function(){return b})),n.d(t,"o",(function(){return y})),n.d(t,"s",(function(){return v})),n.d(t,"n",(function(){return E})),n.d(t,"d",(function(){return k})),n.d(t,"e",(function(){return S}));var a,r=3,o=1,i=15,c=3,l=60,s=30;!function(e){e.countdown="countdown",e.player="player"}(a||(a={}));var u,m=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],d=["Q","X","Y"],p=["Stadt","Land","Fluss/Gew\xe4sser"],f=["Band/Musiker","Berg/Gebirge","Beruf","Ber\xfchmte Person","Buchtitel","Chemisches Element","Dinge die man jeden Tag macht","Etwas Eckiges","Etwas Rundes","Fiktiver Charakter","Film/Serie","Getr\xe4nk","Grund f\xfcr eine Versp\xe4tung","Hobby","In Zeiten des Corona-Lockdowns verboten","K\xf6nnte ein Trump-Tweet sein","K\xf6rperteil","Krankheit","Laster","Marke","Mordwaffe","Pflanze","Pizzasorte","Porno-K\xfcnstlername","Religion","Scheidungsgrund","Schimpfwort","See/Meer","Sehensw\xfcrdigkeit","Sex (Stellung, Synonym)","Speise","Tier","Title of your Sex Tape","Unn\xf6tige Superkraft","Videospiel","Was bei einer Zoom-Konferenz schiefgehen kann","Werkzeug","Wort in einer Fremdsprache"];!function(e){e.waitingToStart="waitingToStart",e.fillOutTextfields="fillOutTextfields",e.evaluateRound="evaluateRound"}(u||(u={}));var h=2,g=5,b=800,y=5,v=10,E=20,k=5,S={checkForDuplicates:"Wenn zwei oder mehr Spieler einen identischen Begriff in einer Kategorie eintragen,\n        so z\xe4hlt dieser nur ".concat(y," statt ").concat(v," Punkte."),creativeAnswersExtraPoints:"Von Mitspielern als besonders kreativ oder lustig ausgezeichnete Begriffe bringen ".concat(k," Extrapunkte."),onlyPlayerWithValidAnswer:"Wenn ein Spieler als einziger einen zul\xe4ssigen Begriff in einer Kategorie\n        eintr\xe4gt, so z\xe4hlt dieser Begriff ".concat(E," statt ").concat(v," Punkte.")}},64:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(119),r=n(0),o=n.n(r),i=n(93),c=n.n(i),l=function(e){return o.a.createElement(o.a.Fragment,null,o.a.createElement("h2",{className:c.a.section_header},e.text),e.showDivider?o.a.createElement(a.a,null):null)}},77:function(e,t,n){"use strict";var a=n(118),r=n(117),o=n(0),i=n.n(o),c=Object(r.a)({loadingScreen:{position:"absolute",top:"0",left:"0",height:"100%",width:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)"},loadingSpinner:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"60px"}});t.a=function(){var e=c();return i.a.createElement("div",{className:e.loadingScreen},i.a.createElement("div",{className:e.loadingSpinner},i.a.createElement(a.a,{color:"secondary",size:60})))}},81:function(e){e.exports=JSON.parse('{"name":"stadt-land-fluss","version":"1.5.3","homepage":"https://alexlehner86.github.io/stadt-land-fluss","private":true,"dependencies":{"@material-ui/core":"^4.9.8","@material-ui/icons":"^4.9.1","@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.5.0","@testing-library/user-event":"^7.2.1","@types/jest":"^24.9.1","@types/node":"^12.12.30","@types/react":"^16.9.25","@types/react-dom":"^16.9.5","backspace-disabler":"^1.1.3","lodash":"^4.17.15","pubnub":"^4.27.4","pubnub-react":"^2.0.0","random-item":"^3.0.0","react":"^16.13.1","react-countdown":"^2.2.1","react-dom":"^16.13.1","react-redux":"^7.2.0","react-router":"^5.1.2","react-router-dom":"^5.1.2","react-scripts":"3.4.1","redux":"^4.0.5","typescript":"^3.7.5","uuid":"^7.0.2"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","eslint":"node_modules\\\\.bin\\\\eslint --ext .ts .\\\\src","predeploy":"npm run build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/lodash":"^4.14.149","@types/pubnub":"^4.27.2","@types/react-redux":"^7.1.7","@types/react-router-dom":"^5.1.3","@types/uuid":"^7.0.2","@typescript-eslint/eslint-plugin":"^3.4.0","@typescript-eslint/parser":"^3.4.0","eslint":"^6.6.0","eslint-plugin-react":"^7.20.0","gh-pages":"^2.2.0"}}')},93:function(e,t,n){e.exports={section_header:"SectionHeader_section_header__yNLGp"}}},[[101,3,4]]]);
//# sourceMappingURL=main.d9397046.chunk.js.map