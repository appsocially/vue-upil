(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1005:function(module,__webpack_exports__,__webpack_require__){"use strict";var VCard=__webpack_require__(294),components_VCard=__webpack_require__(982),components_TextBubblevue_type_script_lang_js_={components:{VCard:VCard.a,VCardText:components_VCard.a},props:{reply:{type:Boolean,default:!1}},computed:{cardColor:function cardColor(){return!0===this.reply?"secondary":"primary"}}},componentNormalizer=__webpack_require__(95),component=Object(componentNormalizer.a)(components_TextBubblevue_type_script_lang_js_,(function(){var _h=this.$createElement,_c=this._self._c||_h;return _c("v-card",{staticClass:"upil-text-bubble",attrs:{color:this.cardColor}},[_c("v-card-text",{staticClass:"preformatted grey--text text--lighten-3",attrs:{"px-3":""}},[this._t("default")],2)],1)}),[],!1,null,"4175b72c",null);__webpack_exports__.a=component.exports},1096:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(143),__webpack_require__(308),__webpack_require__(36);var overrides_Reply_MultiSelectvue_type_script_lang_js_={components:{TextBubble:__webpack_require__(1005).a},props:{node:{type:Object}},computed:{eventValues:function eventValues(){var _this=this;return this.node.event.value.map((function(v){return v.value})).map((function(v){return _this.node.event.node.options.find((function(o){return o.value.value===v}))})).map((function(o){return o.text})).join(", ")}}},componentNormalizer=__webpack_require__(95),component=Object(componentNormalizer.a)(overrides_Reply_MultiSelectvue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)("TextBubble",{attrs:{reply:this.node.reply}},[this._v(this._s(this.eventValues))])}),[],!1,null,null,null);__webpack_exports__.default=component.exports}}]);
//# sourceMappingURL=28.3d9a7957230b6e298a3e.bundle.js.map