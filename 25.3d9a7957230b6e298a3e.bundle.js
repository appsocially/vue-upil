(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1040:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(10),__webpack_require__(96);var widgeti18nMixin=__webpack_require__(985),calendarTypeMap={calendar:"CalendarDate",numeric:"NumericDate"},FormMode_datevue_type_script_lang_js_={mixins:[widgeti18nMixin.a],components:{CalendarDate:function CalendarDate(){return Promise.all([__webpack_require__.e(0),__webpack_require__.e(2),__webpack_require__.e(12),__webpack_require__.e(31)]).then(__webpack_require__.bind(null,1108))},NumericDate:function NumericDate(){return Promise.all([__webpack_require__.e(0),__webpack_require__.e(1),__webpack_require__.e(2),__webpack_require__.e(3),__webpack_require__.e(15)]).then(__webpack_require__.bind(null,1092))}},computed:{calendarType:function calendarType(){return calendarTypeMap[this.localeArgLookup("calendarType")||calendarTypeMap.calendar]}}},componentNormalizer=__webpack_require__(95),component=Object(componentNormalizer.a)(FormMode_datevue_type_script_lang_js_,(function(){var _h=this.$createElement;return(this._self._c||_h)(this.calendarType,this._g(this._b({tag:"component"},"component",Object.assign({},this.$props,this.$attrs),!1),this.$listeners))}),[],!1,null,null,null);__webpack_exports__.default=component.exports},985:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a={props:{locale:{type:String},node:{type:Object},rawNode:{type:Object}},computed:{baseNode:function baseNode(){return this.rawNode||this.node},localeKeys:function localeKeys(){var i18nRoot=this.baseNode.args&&this.baseNode.args.i18n;return i18nRoot?i18nRoot[this.locale]:null}},methods:{localeArgLookup:function localeArgLookup(argName){return this.localeKeys&&this.localeKeys[argName]?this.localeKeys[argName]:this.baseNode&&this.baseNode.args&&void 0!==this.baseNode.args[argName]?this.baseNode.args[argName]:null}}}}}]);
//# sourceMappingURL=25.3d9a7957230b6e298a3e.bundle.js.map