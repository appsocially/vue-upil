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
    calculateText({ text, args }) {
      const i18nRoot = args && args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      return localeKeys ? localeKeys.text : text
    },
    calculateFormText({ args }) {
      const locale = this.locale
      const { i18n: i18nRoot = null } = args || {}
      if (locale && i18nRoot) {
        const { formText = null } = i18nRoot[this.locale] || {}
        return formText
      } else {
        const { formText = null } = args || {}
        return formText
      }
    },
  },
}
