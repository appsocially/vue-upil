export default {
  props: {
    i18n: {
      type: Object,
    },
    locale: {
      type: String,
      default: null,
    },
  },
  computed: {
    i18nKeys() {
      const i18n = this.i18n || {}
      return i18n[this.locale]
    },
  },
  methods: {
    calculateVariable({ args }) {
      const i18nRoot = args && args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      const optionsLookup = localeKeys ? localeKeys.options : null
      if (optionsLookup) {
        return (dataKey, variableValue) => {
          const lookupMap = optionsLookup[dataKey]
          return lookupMap ? lookupMap[variableValue] : variableValue
        }
      } else {
        return (_, variableValue) => variableValue
      }
    },
    calculateText({ text, args }) {
      const i18nRoot = args && args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      return localeKeys && localeKeys.text ? localeKeys.text : text
    },
    calculateFormText({ args }) {
      const locale = this.locale
      const { i18n: i18nRoot = null, formText: baseFormText } = args || {}
      if (locale && i18nRoot) {
        const { formText = null } = i18nRoot[this.locale] || {}
        return formText ? formText : baseFormText
      } else {
        const { formText = null } = args || {}
        return formText ? formText : baseFormText
      }
    },
    calculateOptions({ options, args }) {
      const i18nRoot = args && args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      if (options && localeKeys && localeKeys.options) {
        return options.map(({ text, value }) => {
          const localeText = localeKeys.options[value.value]
          return {
            value,
            text: localeText ? localeText : text,
          }
        })
      } else {
        return options
      }
    },
  },
}
