(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{149:function(module,exports,__webpack_require__){var api=__webpack_require__(96),content=__webpack_require__(814);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},150:function(module,exports,__webpack_require__){var api=__webpack_require__(96),content=__webpack_require__(816);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},151:function(module,exports,__webpack_require__){var api=__webpack_require__(96),content=__webpack_require__(818);"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.i,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},218:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/truffle_logo.344d008d.png"},368:function(module,exports,__webpack_require__){__webpack_require__(369),__webpack_require__(519),__webpack_require__(520),module.exports=__webpack_require__(716)},435:function(module,exports){},48:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return substituteNodeText})),__webpack_require__.d(__webpack_exports__,"a",(function(){return setupListeners}));__webpack_require__(20),__webpack_require__(88),__webpack_require__(61),__webpack_require__(44),__webpack_require__(202);var _home_runner_work_vue_upil_vue_upil_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(365),linkifyjs_html__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(360),linkifyjs_html__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(linkifyjs_html__WEBPACK_IMPORTED_MODULE_6__),dot_object__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(361),dot_object__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(dot_object__WEBPACK_IMPORTED_MODULE_7__);function substituteNodeText(inputState,text,searchForLinks){if(text){for(var tempMatch,matches=[];null!==(tempMatch=/\$\{([^}]+)\}/gm.exec(text));)matches.push(tempMatch);var newText=matches.reduce((function(memo,match){var _match=Object(_home_runner_work_vue_upil_vue_upil_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_5__.a)(match,2),originalText=_match[0],dataKey=_match[1],stateValue=dot_object__WEBPACK_IMPORTED_MODULE_7___default.a.pick(dataKey,inputState);return stateValue?memo.replace(originalText,stateValue):(console.error("Couldn't find inputState to replace custom variable ".concat(dataKey)),memo)}),text);return searchForLinks?linkifyjs_html__WEBPACK_IMPORTED_MODULE_6___default()(newText):newText}return text}function setupListeners(_ref){var listeners=_ref.listeners,upil=_ref.upil;return Object.keys(listeners).map((function(event){var handler=listeners[event];return upil.on(event,handler)}))}},520:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _storybook_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(152),vue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(117),vuetify__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(216),vuetify__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(vuetify__WEBPACK_IMPORTED_MODULE_2__);__webpack_require__(706),__webpack_require__(708);vue__WEBPACK_IMPORTED_MODULE_1__.default.use(vuetify__WEBPACK_IMPORTED_MODULE_2___default.a),Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_0__.addDecorator)((function(){return{template:"\n  <v-app><story/></v-app>\n  ",vuetify:new vuetify__WEBPACK_IMPORTED_MODULE_2___default.a}}))},716:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(152);module._StorybookPreserveDecorators=!0,Object(_storybook_vue__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(717)],module)}.call(this,__webpack_require__(324)(module))},717:function(module,exports,__webpack_require__){var map={"./Chatmode.stories.js":819,"./Formmode.stories.js":820,"./Wizardmode.stories.js":821};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=717},813:function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_79b09be2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(149);__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_79b09be2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__).a},814:function(module,exports,__webpack_require__){(exports=__webpack_require__(97)(!1)).push([module.i,"\n.bubbles-enter-active[data-v-79b09be2],\n.bubbles-leave-active[data-v-79b09be2] {\n  transition: all 0.2s;\n}\n.bubbles-enter[data-side='bot'][data-v-79b09be2],\n.bubbles-leave-to[data-side='bot'][data-v-79b09be2] {\n  opacity: 0;\n  transform: translateX(-100vw);\n}\n.bubbles-enter[data-side='user'][data-v-79b09be2],\n.bubbles-leave-to[data-side='user'][data-v-79b09be2] {\n  opacity: 0;\n  transform: translateX(100vw);\n}\n.bottom-container[data-v-79b09be2] {\n  align-self: flex-end;\n}\n.break-all[data-v-79b09be2] {\n  word-break: break-all;\n}\n#conversation-container[data-v-79b09be2] .preformatted {\n  white-space: pre-line;\n}\n\n/* #conversation-container >>> *::selection {\n  background: yellow;\n}\n\n#conversation-container >>> * {\n  -webkit-tap-highlight-color: yellow;\n} */\n#conversation-container[data-v-79b09be2] .v-sheet {\n  border-radius: 15px;\n}\n#conversation-container[data-v-79b09be2] .v-card__text {\n  padding: 10px;\n}\n#conversation-container[data-v-79b09be2] {\n  overflow-x: hidden;\n  padding-left: 5px;\n  padding-right: 5px;\n  padding-top: 5px;\n  /* height: calc(100vh - 56px - 70px) */\n}\n.chat-bubble[data-v-79b09be2] {\n  max-width: 70vw;\n}\n.bubble-container[data-v-79b09be2] {\n  position: relative;\n}\n#bottom-bar[data-v-79b09be2] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100vw;\n  padding-bottom: 10px;\n  padding-left: 10px;\n  padding-right: 15px;\n  transition: padding-bottom 0.5s;\n}\n\n/* Prevents IOS keyboard bar from hiding text input */\n@supports (-webkit-overflow-scrolling: touch) {\n#bottom-bar[data-v-79b09be2] {\n    padding-bottom: 20px;\n}\n#bottom-bar[data-v-79b09be2]:focus-within {\n    padding-bottom: 60px;\n    transition: padding-bottom 0.5s;\n}\n}\n",""]),module.exports=exports},815:function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_26e84cfc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(150);__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_26e84cfc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__).a},816:function(module,exports,__webpack_require__){(exports=__webpack_require__(97)(!1)).push([module.i,"\n.alert-placeholder[data-v-26e84cfc] {\n  height: 40px;\n}\n",""]),module.exports=exports},817:function(module,__webpack_exports__,__webpack_require__){"use strict";var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_77315314_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(151);__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_3_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_77315314_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__).a},818:function(module,exports,__webpack_require__){(exports=__webpack_require__(97)(!1)).push([module.i,"\n#wizard-container[data-v-77315314] {\n  width: 100%;\n  height: 100%;\n}\n#wizard-container > .v-stepper[data-v-77315314] {\n  width: 100%;\n  height: 100%;\n}\n#wizard-container[data-v-77315314] .v-stepper__header {\n  overflow-x: auto;\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: left;\n}\n#wizard-container[data-v-77315314] .v-stepper__step {\n  min-width: -webkit-max-content;\n  min-width: -moz-max-content;\n  min-width: max-content;\n}\n#wizard-container[data-v-77315314] .v-stepper__header .v-divider {\n  min-width: 20px;\n}\n",""]),module.exports=exports},819:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"basic",(function(){return basic})),__webpack_require__.d(__webpack_exports__,"emailValidation",(function(){return emailValidation}));__webpack_require__(10),__webpack_require__(76);var _defaultStatementComp,_defaultReplyComponen,defineProperty=__webpack_require__(26),objectSpread2=(__webpack_require__(25),__webpack_require__(95),__webpack_require__(20),__webpack_require__(112),__webpack_require__(32)),objectWithoutProperties=__webpack_require__(82),dist=(__webpack_require__(30),__webpack_require__(35),__webpack_require__(19)),NODE_TYPES=(dist.Event.EVENT_NAMES,dist.schema.enums.NODE_TYPES),consume=Symbol("consume"),state=Symbol("state"),utils=__webpack_require__(48),lodash_debounce=__webpack_require__(66),lodash_debounce_default=__webpack_require__.n(lodash_debounce),defaultStatementComponentsMap={},defaultReplyComponentsMap={},components_UpilProvidervue_type_script_lang_js_={props:{upil:{Object:!0,required:!0},override:{type:Function,default:function _default(context,node,component){return component}},overrideCurrent:{type:Function,default:function _default(){return function(){return null}}},listeners:{type:Object,default:function _default(){return{}}},searchForLinks:{type:Boolean,default:!1}},provide:function provide(){var _ref;return _ref={},Object(defineProperty.a)(_ref,consume,this.upil.consume),Object(defineProperty.a)(_ref,state,this.stateWrapper),_ref},data:function data(){return{emittedEvents:[],nodes:[],stateWrapper:{inputState:{}},store:null,listenerUnsubscribeArray:[],scenarioEnded:!1}},computed:{allNodes:function allNodes(){var _this=this;return this.nodes?this.nodes.map((function(n){return _this.setupNode(n)})):[]},history:function history(){return this.allNodes.slice(0,this.allNodes.length-1)},currentNode:function(){var currentNode=this.allNodes.concat([]).reverse().find((function(n){return!0!==n.reply&&n.node.input}));return currentNode?this.setupNode(currentNode.rawNode,!0):null},currentEventWithLabel:function currentEventWithLabel(){if(this.currentEvent){var _currentEvent=this.emittedEvents[this.emittedEvents.length-1];return _currentEvent&&_currentEvent.node&&_currentEvent.node.label?_currentEvent:null}return null},currentEvent:function currentEvent(){return this.emittedEvents&&0<this.emittedEvents.length?this.emittedEvents[this.emittedEvents.length-1]:null}},watch:{currentNode:{immediate:!0,handler:function handler(currentNode){this.$emit("update:current",currentNode)}},currentEvent:{immediate:!0,handler:function handler(currentEvent){this.$emit("update:currentEvent",{event:currentEvent,inputState:this.stateWrapper.inputState})}},upil:{immediate:!0,handler:function handler(upil,oldUpil){upil&&upil!==oldUpil&&this.runSetup(upil)}},currentEventWithLabel:{immediate:!0,handler:function handler(currentEventWithLabel){if(currentEventWithLabel)return this.$emit("eventWithLabel",{event:currentEventWithLabel,inputState:this.stateWrapper.inputState})}}},methods:{transferState:function transferState(){this.emittedEvents=this.store.getState().emittedEvents,this.stateWrapper.inputState=this.store.getState().input,this.updateNodes(this.store.getState().nodes)},updateNodes:lodash_debounce_default()((function(nodes){this.nodes=nodes}),100),calculateComponentType:function calculateComponentType(node){var current=1<arguments.length&&void 0!==arguments[1]&&arguments[1],reply=node.reply,componentType=current||!0!==reply?this.calculateStatementComponent(node):this.calculateReplyComponent(node);return current?this.overrideCurrent({scenarioEnded:this.scenarioEnded},node,componentType):this.override({scenarioEnded:this.scenarioEnded},node,componentType)},calculateReplyComponent:function calculateReplyComponent(node){var type=node.type,label=node.label;return defaultReplyComponentsMap[label]||defaultReplyComponentsMap[type]},calculateStatementComponent:function calculateStatementComponent(node){var type=node.type,label=node.label;return defaultStatementComponentsMap[label]||defaultStatementComponentsMap[type]},setupNode:function setupNode(node){var _this2=this,current=1<arguments.length&&void 0!==arguments[1]&&arguments[1],type=node.type,componentType=this.calculateComponentType(node,current);if(!componentType)throw new Error("Can't find a suitable component",node);if(type===NODE_TYPES.GROUP){var nodes=node.nodes,rest=Object(objectWithoutProperties.a)(node,["nodes"]),newNodes=nodes.map((function(n){return _this2.setupNode(n)}));return{node:Object(objectSpread2.a)({nodes:newNodes},rest),rawNode:node,componentType:componentType}}var text=node.text,id=node.id,reply=node.reply,_rest=Object(objectWithoutProperties.a)(node,["text","id","reply"]);return{node:Object(objectSpread2.a)({sendInput:this.createSendInput(node),text:Object(utils.b)(this.stateWrapper.inputState,text,this.searchForLinks),id:!0===reply?"".concat(id,"-r"):id,reply:reply},_rest),rawNode:node,componentType:componentType}},createSendInput:function createSendInput(_ref2){var _this3=this,event=_ref2.event;return function(input){return _this3.upil.consume(event,input)}},runSetup:function runSetup(upil){var providerState,_this4=this;this.store=upil.UpilStore,Object(utils.a)({listeners:(providerState=this.$data,{"scenario-end":function scenarioEnd(){return new Promise((function(resolve){providerState.scenarioEnded=!0,resolve()}))}}),upil:upil}),this.listenerUnsubscribeArray=Object(utils.a)({listeners:this.listeners,upil:upil}),this.transferState(),this.store.subscribe((function(){_this4.transferState()}))}}},componentNormalizer=__webpack_require__(49),UpilProvider=Object(componentNormalizer.a)(components_UpilProvidervue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("span",[this._t("default",null,{history:this.history,allNodes:this.allNodes,currentNode:this.currentNode,sendInput:this.upil.consume,scenarioEnded:this.scenarioEnded})],2)}),[],!1,null,null,null).exports,services_goto=__webpack_require__(362),goto_default=__webpack_require__.n(services_goto),ChatModevue_type_script_lang_js_defaultStatementComponentsMap=(_defaultStatementComp={},Object(defineProperty.a)(_defaultStatementComp,NODE_TYPES.TEMPLATE,(function(){return __webpack_require__.e(0).then(__webpack_require__.bind(null,839))})),Object(defineProperty.a)(_defaultStatementComp,NODE_TYPES.SELECT,(function(){return __webpack_require__.e(0).then(__webpack_require__.bind(null,839))})),Object(defineProperty.a)(_defaultStatementComp,NODE_TYPES.MULTISELECT,(function(){return __webpack_require__.e(0).then(__webpack_require__.bind(null,839))})),_defaultStatementComp),ChatModevue_type_script_lang_js_defaultReplyComponentsMap=(_defaultReplyComponen={},Object(defineProperty.a)(_defaultReplyComponen,NODE_TYPES.TEMPLATE,(function(){return __webpack_require__.e(0).then(__webpack_require__.bind(null,839))})),Object(defineProperty.a)(_defaultReplyComponen,NODE_TYPES.SELECT,(function(){return __webpack_require__.e(8).then(__webpack_require__.bind(null,840))})),Object(defineProperty.a)(_defaultReplyComponen,NODE_TYPES.MULTISELECT,(function(){return __webpack_require__.e(7).then(__webpack_require__.bind(null,841))})),_defaultReplyComponen),components_ChatModevue_type_script_lang_js_={components:{UpilProvider:UpilProvider},data:function data(){return{userInput:"",windowHeight:null,currentNodeAdditionalHeight:0}},props:{upil:{type:Object,required:!0},avatar:{type:String,required:!0},override:{type:Function,default:function _default(context,node,component){return component}},overrideCurrent:{type:Function,default:function _default(context,node,component){return component}},listeners:{type:Object,default:function _default(){return{}}},wrapperStyleOverride:{type:Object,default:function _default(){return null}},removeBottomBar:{type:Boolean,default:!1},searchForLinks:{type:Boolean,default:!0},types:{type:Object,default:function _default(){return{}}}},computed:{wrapperStyle:function wrapperStyle(){return this.wrapperStyleOverride?this.wrapperStyleOverride:{height:"calc(".concat(this.calculatedHeight," - 56px - 70px)")}},calculatedHeight:function calculatedHeight(){var extraIOSHeight=CSS.supports("(-webkit-overflow-scrolling: touch)")?60:0;return"".concat((this.windowHeight||"100vh")-extraIOSHeight-this.currentNodeAdditionalHeight,"px")}},mounted:function mounted(){this.calculateWindowHeight()},methods:{_overrideCurrent:function _overrideCurrent(context,node,component){var componentType=this.calculateCurrentComponent(context,node,component);return this.overrideCurrent(context,node,componentType)},calculateCurrentComponent:function calculateCurrentComponent(context,node){if(context.scenarioEnded)return function(){return __webpack_require__.e(12).then(__webpack_require__.bind(null,842))};switch(node.type){case NODE_TYPES.SELECT:return function(){return __webpack_require__.e(10).then(__webpack_require__.bind(null,843))};case NODE_TYPES.MULTISELECT:return function(){return __webpack_require__.e(9).then(__webpack_require__.bind(null,844))};default:return function(){return __webpack_require__.e(11).then(__webpack_require__.bind(null,845))}}},_override:function _override(context,node,component){var reply=node.reply,type=node.type,internalComponentType=!0===reply?ChatModevue_type_script_lang_js_defaultReplyComponentsMap[type]:ChatModevue_type_script_lang_js_defaultStatementComponentsMap[type];return this.override(context,node,internalComponentType||component)},fromUser:function fromUser(node){return!0===node.reply},chatbubbleColor:function chatbubbleColor(node){return this.fromUser(node)?"secondary":"primary"},scrollToBottom:lodash_debounce_default()((function(){var _this=this;this.$nextTick((function(){var conversationContainer=_this.$refs.conversationContainer;if(conversationContainer){var duration=conversationContainer.scrollHeight-conversationContainer.scrollTop;goto_default()(conversationContainer.scrollHeight,{duration:duration,easing:"easeInOutCubic",container:conversationContainer})}}))}),100),calculateWindowHeight:function calculateWindowHeight(){this.windowHeight=window.innerHeight},onUpdateCurrent:function onUpdateCurrent(){this.currentNodeAdditionalHeight=0},onAdjustHeight:function onAdjustHeight(height){this.currentNodeAdditionalHeight=height},calculateRules:function calculateRules(nodeWrapper){return nodeWrapper&&nodeWrapper.node&&nodeWrapper.node.input&&nodeWrapper.node.input.type&&this.types[nodeWrapper.node.input.type]||[]}}},ChatMode=(__webpack_require__(813),Object(componentNormalizer.a)(components_ChatModevue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("UpilProvider",{attrs:{override:_vm._override,overrideCurrent:_vm._overrideCurrent,upil:_vm.upil,listeners:_vm.listeners,searchForLinks:_vm.searchForLinks},on:{"update:current":_vm.onUpdateCurrent,"update:currentEvent":function($event){return _vm.$emit("update:currentEvent",$event)},eventWithLabel:function($event){return _vm.$emit("eventWithLabel",$event)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){var allNodes=ref.allNodes,currentNode=ref.currentNode,scenarioEnded=ref.scenarioEnded;return[_c("div",[_c("div",{directives:[{name:"resize",rawName:"v-resize",value:_vm.calculateWindowHeight,expression:"calculateWindowHeight"}],ref:"conversationContainer",style:_vm.wrapperStyle,attrs:{id:"conversation-container"}},[_c("v-layout",{attrs:{"justify-space-around":"",wrap:""}},[_c("v-flex",[_c("transition-group",{staticClass:"v-content__wrap fill-height",attrs:{name:"bubbles",tag:"div"},on:{enter:_vm.scrollToBottom}},_vm._l(allNodes,(function(ref){var node=ref.node,componentType=ref.componentType;return _c("v-flex",{key:node.id,staticClass:"my-1 bubble-container",attrs:{xs12:"","data-side":_vm.fromUser(node)?"user":"bot"}},[_c("v-layout",{attrs:{"pa-1":"",reverse:_vm.fromUser(node)}},[_vm.fromUser(node)?_vm._e():_c("v-flex",{attrs:{shrink:""}},[_c("img",{attrs:{height:"40",width:"40",src:_vm.avatar,"mr-1":""}})]),_vm._v(" "),_c("v-flex",{staticClass:"chat-bubble",attrs:{shrink:""}},[_c(componentType,_vm._b({tag:"component",attrs:{upil:_vm.upil}},"component",node,!1))],1)],1)],1)})),1)],1)],1),_vm._v(" "),!_vm.removeBottomBar&&currentNode?_c("div",{attrs:{id:"bottom-bar"}},[_c(currentNode.componentType,_vm._b({tag:"component",attrs:{rules:_vm.calculateRules(currentNode),upil:_vm.upil},on:{"adjust:height":_vm.onAdjustHeight}},"component",currentNode.node,!1))],1):_vm._e()],1),_vm._v(" "),_vm._t("external",null,{allNodes:allNodes,currentNode:currentNode,scenarioEnded:scenarioEnded})],2)]}}],null,!0)})}),[],!1,null,"79b09be2",null).exports),truffle_logo=__webpack_require__(218),truffle_logo_default=__webpack_require__.n(truffle_logo),rules=__webpack_require__(363),types={email:[function(value){return!!(value&&0<value.length)||"Required"},function(value){return!!rules.a.validate(value)||"Invalid email address"}]},basic=(__webpack_exports__.default={title:"Chatmode"},function(){var upil=new dist.UPILCore;return{components:{ChatMode:ChatMode},template:' <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo"/>',data:function data(){return{upil:upil,TruffleLogo:truffle_logo_default.a}},mounted:function mounted(){this.upil.startRaw('\n    DIALOG icecream\n      TEMPLATE \n      "What\'s your name?"\n      >>name\n      /TEMPLATE\n      TEMPLATE "Welcome ${name}"\n    /DIALOG\n    RUN icecream\n  ')}}}),emailValidation=function(){var upil=new dist.UPILCore;return{components:{ChatMode:ChatMode},template:' <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :types="types"/>',data:function data(){return{upil:upil,TruffleLogo:truffle_logo_default.a,types:types}},mounted:function mounted(){this.upil.startRaw('\n    DIALOG icecream\n      TEMPLATE \n      "What\'s your email?"\n      >>email:email\n      /TEMPLATE\n      TEMPLATE "Thank you for your email (${email})"\n    /DIALOG\n    RUN icecream\n  ')}}}},820:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"basic",(function(){return basic}));__webpack_require__(77),__webpack_require__(20),__webpack_require__(111),__webpack_require__(50),__webpack_require__(10),__webpack_require__(76);var objectSpread2=__webpack_require__(32),objectWithoutProperties=__webpack_require__(82),utils=__webpack_require__(48),dist=__webpack_require__(19),lodash_debounce=__webpack_require__(66),lodash_debounce_default=__webpack_require__.n(lodash_debounce);function calculateComponent(_ref3){var type=_ref3.type;return function componentByLabel(_ref,component){return _ref.label,component}({label:_ref3.label},function componentByType(_ref2,component){switch(_ref2.type){case"select":return function(){return __webpack_require__.e(3).then(__webpack_require__.bind(null,846))};case"multi-select":return function(){return __webpack_require__.e(2).then(__webpack_require__.bind(null,847))};case"template":return function(){return __webpack_require__.e(1).then(__webpack_require__.bind(null,838))};default:return component}}({type:type},null))}var isLoadingEventType=function(event){var isPending="PENDING"===event.status,isExternalEvent=event.node&&"external"===event.node.type;return isPending&&isExternalEvent},isMissingValue=function(node,state){var currentValue=state[node.input.name],isUnresolved=currentValue===dist.symbols.UNRESOLVED;return null==currentValue||isUnresolved},components_FormModevue_type_script_lang_js_={data:function data(){return{nodes:[],state:{},events:[],transferStateDebounced:lodash_debounce_default()((function(upil){this.transferState(upil)}),200)}},props:{upil:{type:Object,required:!0},types:{type:Object,default:function _default(){return{}}},override:{type:Function,default:function _default(_,component){return component}}},watch:{upil:{immediate:!0,handler:function handler(upil){this.runSetup(upil)}},isMissingValues:{immediate:!0,handler:function handler(isMissingValues){this.$emit("update:isMissingValue",isMissingValues)}},initializingUpil:{immediate:!0,handler:function handler(initializingUpil){this.$emit("update:initializingUpil",initializingUpil),this.$emit("update:isMissingValue",this.isMissingValues)}}},computed:{missingValueNodes:function missingValueNodes(){var _this=this;return this.inputNodes.filter((function(n){return isMissingValue(n,_this.state)}))},isMissingValues:function isMissingValues(){return this.missingValueNodes&&0<this.missingValueNodes.length},initializingUpil:function initializingUpil(){return 0===this.events.length||this.events.some(isLoadingEventType)},inputNodes:function inputNodes(){return this.nodes.filter((function(n){return!!n.input&&!0!==n.reply}))},finalNodes:function finalNodes(){var _this2=this;return this.inputNodes.map((function(_ref4){var text=_ref4.text,args=_ref4.args,rest=Object(objectWithoutProperties.a)(_ref4,["text","args"]);return Object(objectSpread2.a)({component:_this2.override(Object(objectSpread2.a)({args:args},rest),calculateComponent(Object(objectSpread2.a)({args:args},rest))),isMissingValue:isMissingValue(rest,_this2.state),text:Object(utils.b)(_this2.state,args&&args.formText?args.formText:text,!1),args:args},rest)}))}},methods:{updateNodes:function updateNodes(nodes){this.nodes=nodes},transferState:function transferState(upil){var state=upil.UpilStore.getState();this.state=state.input,this.events=state.emittedEvents,this.updateNodes(state.nodes)},runSetup:function runSetup(upil){var _this3=this;this.transferStateDebounced(upil),upil.UpilStore.subscribe((function(){_this3.transferStateDebounced(upil)}))},calculateRules:function calculateRules(nodeWrapper){return nodeWrapper&&nodeWrapper.node&&nodeWrapper.node.input&&nodeWrapper.node.input.type&&this.types[nodeWrapper.node.input.type]||[]}}},componentNormalizer=(__webpack_require__(815),__webpack_require__(49)),FormMode=Object(componentNormalizer.a)(components_FormModevue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",_vm._l(_vm.finalNodes,(function(node){return _c("v-row",{key:node.id,class:{"upil-missing-value-node":node.isMissingValue,"upil-has-value-node":!node.isMissingValue},attrs:{"no-gutters":""}},[_c("v-col",{class:"elevation-"+(node.isMissingValue?10:0),attrs:{cols:"12"}},[_c("v-sheet",{attrs:{color:node.isMissingValue?"info darken-2":null,dark:node.isMissingValue}},[node.isMissingValue?_c("v-alert",{staticClass:"my-0",attrs:{dense:"",type:"info",tile:""}},[_vm._v("未記入")]):_c("div",{staticClass:"alert-placeholder"}),_vm._v(" "),_c("v-card-text",{staticClass:"pt-1"},[_c("v-row",{staticClass:"no-wrap",attrs:{justify:"center","no-gutters":""}},[_c("v-col",{staticClass:"upil-node-text",attrs:{cols:"12"}},[_vm._v(_vm._s(node.text))]),_vm._v(" "),_c("v-col",{attrs:{cols:"12"}},[_c("keep-alive",[_c(node.component,{tag:"component",attrs:{node:node,upil:_vm.upil,state:_vm.state,rules:_vm.calculateRules(node)}})],1)],1)],1)],1)],1)],1),_vm._v(" "),_c("v-col",{attrs:{cols:"12"}},[_c("v-divider")],1)],1)})),1)}),[],!1,null,"26e84cfc",null).exports,basic=(__webpack_exports__.default={title:"Formmode"},function(){var upil=new dist.UPILCore;return{components:{FormMode:FormMode},template:' <FormMode :upil="upil" />',data:function data(){return{upil:upil}},mounted:function mounted(){this.upil.startRaw('\n    DIALOG icecream\n      TEMPLATE \n      {\n        formText: "First Name"\n      }\n      "What\'s your first name?"\n      >>firstName\n      /TEMPLATE\n      TEMPLATE \n      {\n        formText: "Last Name"\n      }\n      "What\'s your last name?"\n      >>lastName\n      /TEMPLATE\n      TEMPLATE "Welcome ${firstName} ${lastName}"\n    /DIALOG\n    RUN icecream\n  ',{mode:"form",resetOnInputUpdate:!0})}}})},821:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"basic",(function(){return basic}));__webpack_require__(77),__webpack_require__(20),__webpack_require__(111),__webpack_require__(50),__webpack_require__(10),__webpack_require__(76);var objectSpread2=__webpack_require__(32),objectWithoutProperties=__webpack_require__(82),utils=__webpack_require__(48),dist=__webpack_require__(19),lodash_debounce=__webpack_require__(66),lodash_debounce_default=__webpack_require__.n(lodash_debounce),vue_scrollto=__webpack_require__(364),vue_scrollto_default=__webpack_require__.n(vue_scrollto);function calculateComponent(_ref3){var type=_ref3.type;return function componentByLabel(_ref,component){return _ref.label,component}({label:_ref3.label},function componentByType(_ref2,component){switch(_ref2.type){case"select":return function(){return __webpack_require__.e(3).then(__webpack_require__.bind(null,846))};case"multi-select":return function(){return __webpack_require__.e(2).then(__webpack_require__.bind(null,847))};case"template":return function(){return __webpack_require__.e(1).then(__webpack_require__.bind(null,838))};default:return component}}({type:type},null))}var isLoadingEventType=function(event){var isPending="PENDING"===event.status,isExternalEvent=event.node&&"external"===event.node.type;return isPending&&isExternalEvent},isMissingValue=function(node,state){var currentValue=state[node.input.name],isUnresolved=currentValue===dist.symbols.UNRESOLVED;return null==currentValue||isUnresolved},components_WizardModevue_type_script_lang_js_={data:function data(){return{nodes:[],state:{},events:[],transferStateDebounced:lodash_debounce_default()((function(upil){this.transferState(upil)}),200),currentNodeIndex:1}},props:{upil:{type:Object,required:!0},types:{type:Object,default:function _default(){return{}}},override:{type:Function,default:function _default(_,component){return component}}},watch:{upil:{immediate:!0,handler:function handler(upil){this.runSetup(upil)}},isMissingValues:{immediate:!0,handler:function handler(isMissingValues){this.$emit("update:isMissingValue",isMissingValues)}},initializingUpil:{immediate:!0,handler:function handler(initializingUpil){this.$emit("update:initializingUpil",initializingUpil),this.$emit("update:isMissingValue",this.isMissingValues)}},currentNodeIndex:function currentNodeIndex(){this.scrollToActiveHeader()}},computed:{missingValueNodes:function missingValueNodes(){var _this=this;return this.inputNodes.filter((function(n){return isMissingValue(n,_this.state)}))},isMissingValues:function isMissingValues(){return this.missingValueNodes&&0<this.missingValueNodes.length},initializingUpil:function initializingUpil(){return 0===this.events.length||this.events.some(isLoadingEventType)},inputNodes:function inputNodes(){return this.nodes.filter((function(n){return!!n.input&&!0!==n.reply}))},finalNodes:function finalNodes(){var _this2=this;return this.inputNodes.map((function(_ref4){var text=_ref4.text,args=_ref4.args,rest=Object(objectWithoutProperties.a)(_ref4,["text","args"]);return Object(objectSpread2.a)({component:_this2.override(Object(objectSpread2.a)({args:args},rest),calculateComponent(Object(objectSpread2.a)({args:args},rest))),isMissingValue:isMissingValue(rest,_this2.state),headerText:Object(utils.b)(_this2.state,args&&args.formText?args.formText:text,!1),text:Object(utils.b)(_this2.state,text,!1),args:args},rest)}))}},methods:{scrollToActiveHeader:function scrollToActiveHeader(){vue_scrollto_default.a.scrollTo(".v-stepper__step--active",300,{container:this.$refs.headerContainer,x:!0,y:!1})},prevStep:function prevStep(){this.currentNodeIndex=Math.max(this.currentNodeIndex-1,1)},nextStep:function nextStep(){this.currentNodeIndex=Math.min(this.currentNodeIndex+1,this.finalNodes.length)},updateNodes:function updateNodes(nodes){this.nodes=nodes},transferState:function transferState(upil){var state=upil.UpilStore.getState();this.state=state.input,this.events=state.emittedEvents,this.updateNodes(state.nodes)},runSetup:function runSetup(upil){var _this3=this;this.transferStateDebounced(upil),upil.UpilStore.subscribe((function(){_this3.transferStateDebounced(upil)}))},calculateRules:function calculateRules(nodeWrapper){return nodeWrapper&&nodeWrapper.node&&nodeWrapper.node.input&&nodeWrapper.node.input.type&&this.types[nodeWrapper.node.input.type]||[]}}},componentNormalizer=(__webpack_require__(817),__webpack_require__(49)),WizardMode=Object(componentNormalizer.a)(components_WizardModevue_type_script_lang_js_,(function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _vm.finalNodes&&_vm.finalNodes[0]?_c("div",{attrs:{id:"wizard-container"}},[_c("v-stepper",{model:{value:_vm.currentNodeIndex,callback:function($$v){_vm.currentNodeIndex=$$v},expression:"currentNodeIndex"}},[_c("v-stepper-header",{ref:"headerContainer"},[_vm._l(_vm.finalNodes,(function(node,index){return[_c("v-stepper-step",{key:node.id+"-header",attrs:{complete:!node.isMissingValue,step:index+1}},[_vm._v(_vm._s(node.headerText))]),_vm._v(" "),index!==_vm.finalNodes.length-1?_c("v-divider",{key:node.id+"-divider"}):_vm._e()]}))],2),_vm._v(" "),_c("v-container",[_c("v-stepper-items",_vm._l(_vm.finalNodes,(function(node,index){return _c("v-stepper-content",{key:node.id+"-content",attrs:{step:index+1}},[_c("v-row",{attrs:{justify:"center"}},[_c("v-col",{attrs:{cols:"12",md:"8",lg:"6"}},[_c("v-card-text",{staticClass:"pt-1"},[_c("v-row",{staticClass:"no-wrap",attrs:{justify:"center","no-gutters":""}},[_c("v-col",{staticClass:"upil-node-text",attrs:{cols:"12"}},[_vm._v("\n                    "+_vm._s(node.text)+"\n                  ")]),_vm._v(" "),_c("v-col",{attrs:{cols:"12"}},[_c("keep-alive",[_c(node.component,{tag:"component",attrs:{node:node,upil:_vm.upil,state:_vm.state,rules:_vm.calculateRules(node)}})],1)],1)],1)],1),_vm._v(" "),1!==_vm.currentNodeIndex?_c("v-btn",{attrs:{text:""},on:{click:_vm.prevStep}},[_vm._v("Back")]):_vm._e(),_vm._v(" "),_vm.currentNodeIndex!==_vm.finalNodes.length?_c("v-btn",{attrs:{color:"primary",disabled:node.isMissingValue},on:{click:_vm.nextStep}},[_vm._v("Continue")]):_vm._e()],1)],1)],1)})),1)],1)],1)],1):_vm._e()}),[],!1,null,"77315314",null).exports,basic=(__webpack_exports__.default={title:"WizardMode"},function(){var upil=new dist.UPILCore;return{components:{WizardMode:WizardMode},template:' <WizardMode :upil="upil" />',data:function data(){return{upil:upil}},mounted:function mounted(){this.upil.startRaw('\n    DIALOG icecream\n      TEMPLATE \n      {\n        formText: "First Name"\n      }\n      "What\'s your first name?"\n      >>firstName\n      /TEMPLATE\n      TEMPLATE \n      {\n        formText: "Last Name"\n      }\n      "What\'s your last name?"\n      >>lastName\n      /TEMPLATE\n      TEMPLATE "Welcome ${firstName} ${lastName}"\n    /DIALOG\n    RUN icecream\n  ',{mode:"form",resetOnInputUpdate:!0})}}})}},[[368,5,6]]]);
//# sourceMappingURL=main.b9a364bb6bca8ccd8bc7.bundle.js.map