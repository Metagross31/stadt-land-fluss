(this["webpackJsonpstadt-land-fluss"]=this["webpackJsonpstadt-land-fluss"]||[]).push([[8],{181:function(e,t,n){"use strict";var a=n(2),r=n(168),o=n(79),s=n.n(o),i=(n(0),n(182)),c=n.n(i);t.a=function(e){return Object(a.jsx)("div",{className:c.a.button_wrapper,children:Object(a.jsx)(r.a,{type:"button",color:"default",variant:"contained",size:"large",startIcon:Object(a.jsx)(s.a,{}),onClick:e.onReturnToDashboard,children:"Dashboard"})})}},182:function(e,t,n){e.exports={button_wrapper:"ToDashboardButton_button_wrapper__1EtAB"}},184:function(e,t,n){"use strict";n.d(t,"l",(function(){return l})),n.d(t,"k",(function(){return d})),n.d(t,"j",(function(){return m})),n.d(t,"g",(function(){return p})),n.d(t,"n",(function(){return b})),n.d(t,"e",(function(){return h})),n.d(t,"d",(function(){return f})),n.d(t,"c",(function(){return j})),n.d(t,"h",(function(){return _})),n.d(t,"i",(function(){return x})),n.d(t,"m",(function(){return v})),n.d(t,"a",(function(){return y})),n.d(t,"b",(function(){return C})),n.d(t,"f",(function(){return w}));var a=n(12),r=n(185),o=n(187),s=n(205),i=n.n(s),c=n(77),u=n(50),l=function(e,t){if(e>t.length)throw new Error("Cannot create more randomn unique letters than the number of possibleLetters provided!");for(var n=[],a=Object(r.a)(t),o=function(e){var t=i()(a);n.push(t),a=a.filter((function(e){return e!==t}))},s=0;s<e;s++)o();return n},d=function(e,t,n){for(var a=Object(r.a)(n),o=e-n.length,s=t.filter((function(e){return!n.includes(e)})),c=function(e){var t=i()(s);a.push(t),s=s.filter((function(e){return e!==t}))},u=0;u<o;u++)c();return a},m=function(e){return Array.from(e).map((function(e){return e[1]})).sort((function(e,t){return e.name.toLowerCase()<t.name.toLowerCase()?-1:e.name.toLowerCase()>t.name.toLowerCase()?1:0}))},p=function(e){return Object(u.e)(e,{points:c.s,star:!1,text:"",valid:!0})},b=function(e){return e.map((function(e){var t=e.text.trim();return Object(a.a)(Object(a.a)({},e),{},{text:t,valid:""!==t})}))},h=function(e,t){var n=new Map;return e.forEach((function(a){var r=[];t.forEach((function(){var t=new Map;e.forEach((function(e){t.set(e.id,!0)})),r.push(t)})),n.set(a.id,r)})),n},f=function(e,t,n){if(e.checkForDuplicates||e.onlyPlayerWithValidAnswer)for(var a=t.keys().next().value,r=t.get(a),o=0;o<r.length;o++)j(e,t,o,n.get(o))},j=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];(e.checkForDuplicates||e.onlyPlayerWithValidAnswer)&&Array.from(t.keys()).forEach((function(r){var o=t.get(r);if(o[n].valid)if(e.onlyPlayerWithValidAnswer&&g(r,t,n))o[n].points=c.n;else{var s=e.checkForDuplicates&&O(r,t,n,a);o[n].points=s?c.o:c.s}}))},g=function(e,t,n){var a=Array.from(t.keys()).filter((function(t){return t!==e})),r=!0;return a.forEach((function(e){return r=r&&!t.get(e)[n].valid})),r},O=function(e,t,n,a){var r=Object(u.f)(t.get(e)[n].text),s=Array.from(t.keys()).filter((function(t){return t!==e}));return a.includes(r)||Object(o.some)(s,(function(e){var a=t.get(e)[n];return a.valid&&r===Object(u.f)(a.text)}))},_=function(e){return e<=3?1:2},x=function(e){var t=0;return e.forEach((function(e){return t=e?t:t+1})),t},v=function(e,t){var n=new Map;return e.forEach((function(e,a){if(!e){var r=t.get(a);r&&n.set(a,r)}})),m(n)},y=function(e,t){t.forEach((function(t){t.forEach((function(t){t.valid?e.creativeAnswersExtraPoints&&t.star&&(t.points=t.points+c.d):t.points=0}))}))},C=function(e,t){var n={};e.forEach((function(e,t){return n[t]={name:e.name,points:0}})),t.forEach((function(e){e.forEach((function(e,t){return n[t].points+=e.reduce((function(e,t){return e+t.points}),0)}))}));var a=[],s=new Map;Object.keys(n).forEach((function(e){var t=n[e],o=t.name,i=t.points;a.push(i);var c=s.get(i)||[];s.set(i,[].concat(Object(r.a)(c),[o]))}));var i=[];return Object(o.uniq)(a).sort((function(e,t){return t-e})).forEach((function(e){return i.push({playerNames:s.get(e).sort(),points:e})})),i},w=function(e,t,n){var a=[];return n.forEach((function(n){n.forEach((function(n,r){var o=e.get(r);n.forEach((function(e,n){e.valid&&e.star&&a.push({category:t.categories[n],playerName:o.name,text:e.text})}))}))})),a}},191:function(e,t,n){"use strict";var a,r;n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r})),function(e){e.checkForDuplicates="checkForDuplicates",e.creativeAnswersExtraPoints="creativeAnswersExtraPoints",e.onlyPlayerWithValidAnswer="onlyPlayerWithValidAnswer"}(a||(a={})),function(e){e.allPlayersSubmit="allPlayers",e.countdownEnds="countdownEnds",e.firstPlayerSubmits="firstPlayer"}(r||(r={}))},193:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return s}));var a="Spiel-ID",r="Anzahl Kategorien",o="Anzahl Runden",s="Spielername"},201:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return l}));var a,r=n(2),o=n(169),s=n(85),i=n.n(s),c=(n(0),n(202)),u=n.n(c);!function(e){e.newgame="newgame",e.joingame="joingame"}(a||(a={}));var l=function(e){var t="newgame"===e.context?"ein neues Spiel erstellst":"einem anderen Spiel beitrittst",n="Du nimmst bereits an einem laufenden Spiel teil. Wenn du ".concat(t,",\n    kannst du nicht mehr in das alte Spiel zur\xfcckkehren!");return Object(r.jsxs)("div",{className:"material-card-style",children:[Object(r.jsxs)("p",{className:u.a.hint_text,children:[Object(r.jsx)("span",{className:"rejoin-running-game-hint-highlighted",children:"Achtung: "}),n]}),Object(r.jsxs)(o.a,{component:"button",className:u.a.rejoin_game_button,onClick:e.rejoinRunningGame,children:[Object(r.jsx)(i.a,{}),"Zur\xfcck ins laufende Spiel"]})]})}},202:function(e,t,n){e.exports={hint_text:"RejoinRunningGameHint_hint_text__24Gb_",rejoin_game_button:"RejoinRunningGameHint_rejoin_game_button__1Tob4"}},203:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return u}));var a=n(77),r=n(50),o=function(){return"Du musst einen Spielernamen eingeben"},s=function(){return"Du musst eine Spiel-ID eingeben"},i=function(){return"Die Anzahl an Runden muss zwischen ".concat(a.m," und ").concat(a.i," liegen")},c=function(){return"W\xe4hle mindestens ".concat(a.k," Kategorien aus. Zum Beispiel: Stadt, Land und Fluss/Gew\xe4sser")},u=function(e){var t=Object(r.h)(e,"Runde","Runden"),n=a.p.length-e;return"Du hast zu viele Buchstaben ausgeschlossen! Bei ".concat(e," ").concat(t," darfst du maximal ").concat(n," Buchstaben ausschlie\xdfen")}},234:function(e,t,n){e.exports={add_category_button:"AddCustomCategory_add_category_button__3TBkN",less_padding:"AddCustomCategory_less_padding__t9AWk",dialog_min_width:"AddCustomCategory_dialog_min_width__3OgRe"}},235:function(e,t,n){e.exports={chip:"ChipsArray_chip__3nVin",chip_label:"ChipsArray_chip_label__Tjvqm"}},238:function(e,t,n){e.exports={options_label:"NewGameOptionsPanel_options_label__21M5o"}},239:function(e,t,n){e.exports={random_categories_button:"SelectRandomCategories_random_categories_button__888IJ",dialog_title:"SelectRandomCategories_dialog_title__2q4PR",dialog_min_width:"SelectRandomCategories_dialog_min_width__2rUfu"}},245:function(e,t,n){e.exports={custom_fieldset:"NewGame_custom_fieldset__3bBUZ",custom_fieldset_error:"NewGame_custom_fieldset_error__1fnFz",custom_legend:"NewGame_custom_legend__2x34A",radio_group:"NewGame_radio_group__1yiCz",countdown_wrapper:"NewGame_countdown_wrapper__xLLcN",countdown_input:"NewGame_countdown_input__1l49c",too_many_letters_excluded_error:"NewGame_too_many_letters_excluded_error___H604",too_few_categories_error:"NewGame_too_few_categories_error__iKaVK",selected_categories_wrapper:"NewGame_selected_categories_wrapper__2RkmF",jump_to_end_button:"NewGame_jump_to_end_button__2tXZ2",jump_to_end_button_icon:"NewGame_jump_to_end_button_icon__1eUy8",alert_snackbar:"NewGame_alert_snackbar__2NScL"}},326:function(e,t,n){"use strict";n.r(t);var a,r=n(86),o=n(12),s=n(185),i=n(38),c=n(39),u=n(41),l=n(40),d=n(2),m=n(302),p=n(323),b=n(300),h=n(301),f=n(310),j=n(309),g=n(327),O=n(299),_=n(168),x=n(231),v=n(232),y=n(247),C=n.n(y),w=n(246),N=n.n(w),k=n(187),S=n(0),I=n.n(S),R=n(84),A=n(27),E=n(178),T=n(186),P=n(329),G=n(303),D=n(304),K=n(305),F=n(167),z=n(197),M=n.n(z),B=n(234),V=n.n(B),L=function(e){var t=e.onClose,n=e.open,a=Object(S.useState)(""),r=Object(T.a)(a,2),o=r[0],s=r[1],i=Object(S.useState)(!1),c=Object(T.a)(i,2),u=c[0],l=c[1],m=u&&!o,b=function(){return t(null)};return Object(d.jsx)(P.a,{onEnter:function(){l(!1),s("")},onClose:b,open:n,children:Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),e.stopPropagation();var n=o.trim();""!==n?(l(!1),t(n)):(s(""),l(!0))},className:V.a.dialog_min_width,noValidate:!0,autoComplete:"off",children:[Object(d.jsxs)(G.a,{children:[Object(d.jsx)(D.a,{children:"Eigene Kategorie definieren"}),Object(d.jsx)("label",{htmlFor:"new-category-input",className:"sr-only",children:"Neue Kategorie"}),Object(d.jsx)(p.a,{autoFocus:!0,margin:"dense",fullWidth:!0,required:!0,value:o,error:m,helperText:m?"Kategorie eingeben":"",inputProps:{id:"new-category-input"},onChange:function(e){return s(e.target.value)}})]}),Object(d.jsxs)(K.a,{children:[Object(d.jsx)(_.a,{type:"button",onClick:b,children:"Abbrechen"}),Object(d.jsx)(_.a,{type:"submit",color:"primary",children:"Hinzuf\xfcgen"})]})]})})},W=function(e){var t=Object(S.useState)(!1),n=Object(T.a)(t,2),a=n[0],r=n[1];return Object(d.jsxs)(I.a.Fragment,{children:[Object(d.jsx)(F.a,{className:V.a.add_category_button,size:"small",title:"Eigene Kategorie definieren","aria-label":"Eigene Kategorie definieren",onClick:function(){return r(!0)},children:Object(d.jsx)(M.a,{})}),Object(d.jsx)(L,{open:a,onClose:function(t){r(!1),t&&e.addCustomCategory(t)}})]})},U=n(332),q=n(130),H=n(179),Z=n(237),J=n.n(Z),X=n(236),Q=n.n(X),Y=n(235),$=n.n(Y);!function(e){e.available="available",e.selected="selected"}(a||(a={}));var ee,te=Object(q.a)((function(e){return Object(H.a)({root:{display:"flex",justifyContent:"center",flexWrap:"wrap",padding:e.spacing(.5)}})})),ne=function(e){var t=te();return Object(d.jsx)("div",{className:t.root,role:"list",children:e.chipsArray.map((function(t,n){return Object(d.jsx)(U.a,{role:"listitem",classes:{root:$.a.chip,label:$.a.chip_label},color:"selected"===e.chipType?"primary":void 0,icon:"selected"===e.chipType?Object(d.jsx)(Q.a,{}):Object(d.jsx)(J.a,{}),label:t,onClick:function(){return e.removeChip(t)}},"chip-to-".concat(e.chipType,"-").concat(n))}))})},ae=n(333),re=n(306),oe=n(307),se=n(308),ie=n(328),ce=n(132),ue=n(215),le=n.n(ue),de=n(77),me=n(191),pe=n(238),be=n.n(pe),he=function(e){return Object(d.jsxs)(ae.a,{className:"new-game-expansion-panel",children:[Object(d.jsx)(re.a,{expandIcon:Object(d.jsx)(le.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:"Weitere Optionen"}),Object(d.jsxs)(oe.a,{children:[Object(d.jsxs)(se.a,{className:"game-options-list",children:[Object(d.jsx)(j.a,{control:Object(d.jsx)(ie.a,{checked:e.scoringOptions.checkForDuplicates,name:me.b.checkForDuplicates,color:"primary",onChange:e.handleGameOptionChange}),label:de.e.checkForDuplicates}),Object(d.jsx)(j.a,{control:Object(d.jsx)(ie.a,{checked:e.scoringOptions.onlyPlayerWithValidAnswer,name:me.b.onlyPlayerWithValidAnswer,color:"primary",onChange:e.handleGameOptionChange}),label:de.e.onlyPlayerWithValidAnswer}),Object(d.jsx)(j.a,{control:Object(d.jsx)(ie.a,{checked:e.scoringOptions.creativeAnswersExtraPoints,name:me.b.creativeAnswersExtraPoints,color:"primary",onChange:e.handleGameOptionChange}),label:de.e.creativeAnswersExtraPoints})]}),Object(d.jsx)(ce.a,{}),Object(d.jsxs)(b.a,{component:"fieldset",children:[Object(d.jsx)(h.a,{component:"legend",className:be.a.options_label,children:"Folgende Buchstaben ausschlie\xdfen:"}),Object(d.jsx)(se.a,{row:!0,className:"letters-to-exclude",children:de.p.map((function(t,n){return Object(d.jsx)(j.a,{control:Object(d.jsx)(ie.a,{checked:e.lettersToExclude.includes(t),color:"primary",onChange:function(n){return e.handleLetterToExcludeChange(n,t)}}),label:t},"slf-letters-to-exclude-".concat(n))}))})]})]})]})},fe=n(201),je=n(78),ge=n(196),Oe=n.n(ge),_e=n(193),xe=n(239),ve=n.n(xe),ye=Object(q.a)((function(){return{label:{fontSize:"0.85rem"}}})),Ce=function(e){var t=ye(),n=e.onClose,a=e.open,r=Object(S.useState)(!0),o=Object(T.a)(r,2),s=o[0],i=o[1],c=Object(S.useState)(de.k),u=Object(T.a)(c,2),l=u[0],m=u[1],b=Object(S.useState)(!1),h=Object(T.a)(b,2),f=h[0],g=h[1],O=Object(S.useState)(!1),x=Object(T.a)(O,2),v=x[0],y=x[1],C="".concat(_e.b," (mindestens ").concat(de.k,", maximal ").concat(e.maxNumberOfCategories,")"),w="".concat(_e.b," (").concat(de.k,"-").concat(e.maxNumberOfCategories,")"),N=function(){return n(null)};return Object(d.jsx)(P.a,{onClose:N,open:a,children:Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),e.stopPropagation(),s?(g(!1),n(l,v)):g(!0)},className:ve.a.dialog_min_width,noValidate:!0,autoComplete:"off",children:[Object(d.jsxs)(G.a,{children:[Object(d.jsx)(D.a,{className:ve.a.dialog_title,children:"Kategorien zuf\xe4llig ausw\xe4hlen"}),Object(d.jsx)("label",{htmlFor:"number-of-categories-input",className:"sr-only",children:C}),Object(d.jsx)(p.a,{name:"numberOfRoundsInput",label:w,type:"number",value:l,variant:"outlined",fullWidth:!0,required:!0,autoFocus:!0,error:f&&!s,helperText:f&&!s?"Du musst eine g\xfcltige Anzahl eingeben":"",inputProps:{id:"number-of-categories-input",min:de.k,max:e.maxNumberOfCategories},onChange:function(t){var n=+t.target.value;m(n),i(n>=de.k&&n<=e.maxNumberOfCategories)}}),Object(d.jsx)(j.a,{classes:t,control:Object(d.jsx)(ie.a,{checked:v,name:"retainSelection",color:"primary",onChange:function(e){y(e.target.checked)}}),label:"Inklusive bereits ausgew\xe4hlter Kategorien"})]}),Object(d.jsxs)(K.a,{children:[Object(d.jsx)(_.a,{type:"button",onClick:N,children:"Abbrechen"}),Object(d.jsx)(_.a,{type:"submit",color:"primary",children:"Ausw\xe4hlen"})]})]})})},we=function(e){var t=Object(S.useState)(!1),n=Object(T.a)(t,2),a=n[0],r=n[1];return Object(d.jsxs)(I.a.Fragment,{children:[Object(d.jsx)(F.a,{className:ve.a.random_categories_button,size:"small",title:"Kategorien zuf\xe4llig ausw\xe4hlen","aria-label":"Kategorien zuf\xe4llig ausw\xe4hlen",onClick:function(){return r(!0)},children:Object(d.jsx)(Oe.a,{})}),Object(d.jsx)(Ce,{maxNumberOfCategories:e.maxNumberOfCategories,open:a,onClose:function(t,n){r(!1),t&&void 0!==n&&e.selectCategoriesRandomly(t,n)}})]})},Ne=n(181),ke=n(62),Se=n(17),Ie=n(203),Re=n(184),Ae=n(50),Ee=n(28),Te=n(245),Pe=n.n(Te);!function(e){e.available="available",e.selected="selected"}(ee||(ee={}));var Ge=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={a11yMessageAssertive:"",a11yMessagePolite:"",availableCategories:de.a,durationOfCountdown:de.b,endRoundMode:me.a.allPlayersSubmit,isNumberOfRoundsInputValid:!0,isSnackbarOpen:!1,lettersToExclude:Object(s.a)(de.r),nameInput:a.props.playerInfo?a.props.playerInfo.name:"",numberOfRoundsInput:de.c,selectedCategories:de.q,scoringOptions:{checkForDuplicates:!0,creativeAnswersExtraPoints:!0,onlyPlayerWithValidAnswer:!0},snackBarMessage:"",validateInputs:!1},a.submitButton=void 0,a.handleNameInputChange=function(e){a.setState({nameInput:e.target.value})},a.handleNumberOfRoundsInputChange=function(e){var t=+e.target.value,n=t>=de.m&&t<=de.i;a.setState({isNumberOfRoundsInputValid:n,numberOfRoundsInput:t})},a.handleGameOptionChange=function(e){a.setState({scoringOptions:Object(o.a)(Object(o.a)({},a.state.scoringOptions),{},Object(r.a)({},e.target.name,e.target.checked))})},a.handleCountdownInputChange=function(e){a.setState({durationOfCountdown:+e.target.value})},a.handleLetterToExcludeChange=function(e,t){var n=a.state.lettersToExclude,r=e.target.checked?[].concat(Object(s.a)(n),[t]):n.filter((function(e){return e!==t}));a.setState({lettersToExclude:r})},a.handleUseCountdownChange=function(e){a.setState({endRoundMode:e.target.value})},a.selectCategoriesRandomly=function(e,t){var n=[].concat(Object(s.a)(a.state.availableCategories),Object(s.a)(a.state.selectedCategories)),r=Object(Re.k)(e,n,t?a.state.selectedCategories:[]),o=n.filter((function(e){return!r.includes(e)})).sort();a.setState({availableCategories:o,selectedCategories:r}),setTimeout((function(){var t="Es wurden ".concat(e," Kategorien zuf\xe4llig ausgew\xe4hlt.");a.setState({a11yMessagePolite:t})}),500)},a.updateCategoryArrays=function(e,t){var n,r,o;t===ee.selected?(n=a.state.selectedCategories.filter((function(t){return t!==e})),(r=Object(s.a)(a.state.availableCategories)).push(e),o="Kategorie ".concat(e," wurde aus der Liste der ausgew\xe4hlten Kategorien entfernt.")):(r=a.state.availableCategories.filter((function(t){return t!==e})),(n=Object(s.a)(a.state.selectedCategories)).push(e),o="Kategorie ".concat(e," wurde der Liste der ausgew\xe4hlten Kategorien hinzugef\xfcgt.")),a.setState({a11yMessagePolite:o,availableCategories:r,selectedCategories:n})},a.addCustomCategory=function(e){a.setState({selectedCategories:[].concat(Object(s.a)(a.state.selectedCategories),[e])}),setTimeout((function(){var t="Die Kategorie ".concat(e," wurde der Liste der ausgew\xe4hlten Kategorien hinzugef\xfcgt.");a.setState({a11yMessagePolite:t})}),500)},a.scrollToAndFocusSubmitButton=function(){var e,t;null===(e=a.submitButton.current)||void 0===e||e.scrollIntoView(),null===(t=a.submitButton.current)||void 0===t||t.focus()},a.handleSubmit=function(e){e.preventDefault(),a.isReadyToStartGame()?a.startNewGame():a.setState({nameInput:a.state.nameInput.trim(),validateInputs:!0})},a.isReadyToStartGame=function(){var e=a.state,t=e.isNumberOfRoundsInputValid,n=e.lettersToExclude,r=e.numberOfRoundsInput,o=e.selectedCategories;return a.state.nameInput.trim()?t?o.length<de.k?(a.alertUser(Object(Ie.d)()),!1):!(de.p.length-n.length<r)||(a.alertUser(Object(Ie.e)(r)),!1):(a.alertUser(Object(Ie.c)()),!1):(a.alertUser(Object(Ie.b)()),!1)},a.alertUser=function(e){return a.setState({a11yMessageAssertive:e,isSnackbarOpen:!0,snackBarMessage:e})},a.handleSnackBarClose=function(){return a.setState({isSnackbarOpen:!1})},a.startNewGame=function(){var e=a.props.playerInfo,t=a.props.playerIdCreationTimestamp,n=a.state,r=n.durationOfCountdown,o=n.endRoundMode,s=n.nameInput,i=n.numberOfRoundsInput,c=n.scoringOptions,u=n.selectedCategories,l=Object(E.a)();Object(Ee.f)(),Object(Ee.h)({id:e.id,idCreationTimestamp:t,name:s.trim()}),Object(Ee.j)({gameId:l,idCreationTimestamp:Object(Ae.b)(new Date),isPlayerAdmin:!0}),a.props.onSetGameData({gameConfig:{categories:u,durationOfCountdown:r,endRoundMode:o,letters:Object(Re.l)(i,Object(k.xor)(de.p,a.state.lettersToExclude)),numberOfRounds:i,scoringOptions:c},gameId:l,isRejoiningGame:!1,playerInfo:{id:e.id,isAdmin:!0,name:s.trim()}}),a.props.history.push("/play")},a.rejoinRunningGame=function(){a.props.onPrepareRejoiningGame(),a.props.history.push("/play")},a.returnToDashboard=function(){a.props.history.push("/")},a.submitButton=I.a.createRef(),a}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t="".concat(_e.d," (maximal ").concat(ke.c," Zeichen)"),n="".concat(_e.d," (max. ").concat(ke.c," Zeichen)"),r="".concat(_e.c," (maximal ").concat(de.i,")"),o="".concat(_e.c," (max. ").concat(de.i,")"),s=this.state.availableCategories.length+this.state.selectedCategories.length,i=this.state.validateInputs&&!this.state.nameInput,c=this.state.validateInputs&&!this.state.isNumberOfRoundsInputValid,u=this.state.validateInputs&&this.state.selectedCategories.length<de.k,l=this.state.validateInputs&&de.p.length-this.state.lettersToExclude.length<this.state.numberOfRoundsInput,y=Object(d.jsx)(m.a,{className:"MuiFormHelperText-contained "+Pe.a.too_few_categories_error,error:!0,children:Object(Ie.d)()}),w=Object(d.jsx)(m.a,{className:"MuiFormHelperText-contained "+Pe.a.too_many_letters_excluded_error,error:!0,children:Object(Ie.e)(this.state.numberOfRoundsInput)}),k=Object(d.jsxs)("form",{onSubmit:this.handleSubmit,className:"app-form",noValidate:!0,autoComplete:"off",children:[Object(d.jsx)("label",{htmlFor:"player-name-input",className:"sr-only",children:t}),Object(d.jsx)(p.a,{name:"nameInput",label:n,value:this.state.nameInput,className:"app-form-input",variant:"outlined",fullWidth:!0,required:!0,autoFocus:!0,error:i,helperText:i?Object(Ie.b)():"",inputProps:{id:"player-name-input",autoComplete:"nickname",maxLength:ke.c},onChange:this.handleNameInputChange}),Object(d.jsx)("label",{htmlFor:"number-of-rounds-input",className:"sr-only",children:r}),Object(d.jsx)(p.a,{name:"numberOfRoundsInput",label:o,type:"number",value:this.state.numberOfRoundsInput,className:"app-form-input",variant:"outlined",fullWidth:!0,required:!0,error:c,helperText:c?Object(Ie.c)():"",inputProps:{id:"number-of-rounds-input",min:de.m,max:de.i},onChange:this.handleNumberOfRoundsInputChange}),Object(d.jsxs)(b.a,{component:"fieldset",classes:{root:Pe.a.custom_fieldset},children:[Object(d.jsx)(h.a,{component:"legend",className:Pe.a.custom_legend,children:"Beenden der Runde durch"}),Object(d.jsxs)(f.a,{className:Pe.a.radio_group,name:"usecountdown",value:this.state.endRoundMode,onChange:this.handleUseCountdownChange,children:[Object(d.jsx)(j.a,{value:me.a.allPlayersSubmit,control:Object(d.jsx)(g.a,{color:"primary"}),label:"Alle Spielenden gemeinsam"}),Object(d.jsx)(j.a,{value:me.a.firstPlayerSubmits,control:Object(d.jsx)(g.a,{color:"primary"}),label:"Schnellster Spieler"}),Object(d.jsxs)("div",{className:Pe.a.countdown_wrapper,children:[Object(d.jsx)(j.a,{value:me.a.countdownEnds,control:Object(d.jsx)(g.a,{color:"primary"}),label:"Countdown (Sekunden)"}),Object(d.jsx)(O.a,{type:"number",value:this.state.durationOfCountdown,className:Pe.a.countdown_input,disabled:this.state.endRoundMode!==me.a.countdownEnds,inputProps:{"aria-label":"Dauer des Countdowns",min:de.j},onChange:this.handleCountdownInputChange})]})]})]}),Object(d.jsx)(he,{lettersToExclude:this.state.lettersToExclude,scoringOptions:this.state.scoringOptions,handleGameOptionChange:this.handleGameOptionChange,handleLetterToExcludeChange:this.handleLetterToExcludeChange}),l&&!c?w:null,Object(d.jsxs)("div",{className:Pe.a.selected_categories_wrapper,children:[Object(d.jsx)(we,{maxNumberOfCategories:s,selectCategoriesRandomly:this.selectCategoriesRandomly}),Object(d.jsxs)(b.a,{component:"fieldset",classes:{root:u?Pe.a.custom_fieldset_error:Pe.a.custom_fieldset},children:[Object(d.jsxs)(h.a,{component:"legend",className:Pe.a.custom_legend,children:["Ausgew\xe4hlte Kategorien (mind. ",de.k,")",Object(d.jsx)("span",{className:"sr-only",children:"Klicke auf eine Kategorie, um diese aus der Liste der ausgew\xe4hlten Kategorien zu entfernen."})]}),Object(d.jsx)(ne,{chipsArray:this.state.selectedCategories,chipType:a.selected,removeChip:function(t){return e.updateCategoryArrays(t,ee.selected)}})]}),Object(d.jsx)(W,{addCustomCategory:this.addCustomCategory})]}),u?y:null,Object(d.jsxs)("button",{type:"button",className:Pe.a.jump_to_end_button,onClick:this.scrollToAndFocusSubmitButton,children:[Object(d.jsx)("span",{children:"Zum Formularende springen"}),Object(d.jsx)(N.a,{className:Pe.a.jump_to_end_button_icon})]}),Object(d.jsxs)(b.a,{component:"fieldset",classes:{root:Pe.a.custom_fieldset},children:[Object(d.jsxs)(h.a,{component:"legend",className:Pe.a.custom_legend,children:["Verf\xfcgbare Kategorien",Object(d.jsx)("span",{className:"sr-only",children:"Klicke auf eine Kategorie, um diese der Liste der ausgew\xe4hlten Kategorien hinzuzuf\xfcgen."})]}),Object(d.jsx)(ne,{chipsArray:this.state.availableCategories,chipType:a.available,removeChip:function(t){return e.updateCategoryArrays(t,ee.available)}})]}),Object(d.jsx)("div",{className:"button-wrapper add-margin-top",children:Object(d.jsx)(_.a,{type:"submit",color:"primary",variant:"contained",size:"large",startIcon:Object(d.jsx)(C.a,{}),ref:this.submitButton,children:"Spiel erstellen"})})]}),S=Object(d.jsx)(fe.a,{context:fe.b.newgame,rejoinRunningGame:this.rejoinRunningGame});return Object(d.jsxs)("div",{className:"main-content-wrapper",children:[this.props.gameId?S:null,Object(d.jsxs)("div",{className:"material-card-style",children:[Object(d.jsx)(je.a,{text:"Neues Spiel"}),k]}),Object(d.jsx)(Ne.a,{onReturnToDashboard:this.returnToDashboard}),Object(d.jsx)(x.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.isSnackbarOpen,autoHideDuration:3e3,onClose:this.handleSnackBarClose,children:Object(d.jsx)(v.a,{classes:{root:Pe.a.alert_snackbar},message:this.state.snackBarMessage})}),Object(d.jsx)(R.b,{message:this.state.a11yMessageAssertive,"aria-live":"assertive",clearOnUnmount:"true"}),Object(d.jsx)(R.b,{message:this.state.a11yMessagePolite,"aria-live":"polite",clearOnUnmount:"true"})]})}},{key:"componentDidUpdate",value:function(e){this.props.playerInfo&&this.props.playerInfo!==e.playerInfo&&this.setState({nameInput:this.props.playerInfo.name})}}]),n}(S.Component);t.default=Object(A.b)((function(e){return{gameId:e.gameId,playerIdCreationTimestamp:e.playerIdCreationTimestamp,playerInfo:e.playerInfo}}),(function(e){return{onPrepareRejoiningGame:function(){return e(Object(Se.h)())},onSetGameData:function(t){return e(Object(Se.k)(t))}}}))(Ge)}}]);
//# sourceMappingURL=8.9caa7719.chunk.js.map