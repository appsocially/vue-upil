export default {
  props: {
    locale: {
      type: String,
    },
  },
  computed: {
    localeKeys() {
      const i18nRoot = this.node.args && this.node.args.i18n
      return i18nRoot ? i18nRoot[this.locale] : null
    },
  },
  methods: {
    localeArgLookup(argName) {
      if (this.localeKeys && this.localeKeys[argName]) {
        return this.localeKeys[argName]
      } else {
        return this.node &&
          this.node.args &&
          this.node.args[argName] !== undefined
          ? this.node.args[argName]
          : null
      }
    },
  },
}
