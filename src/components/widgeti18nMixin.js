export default {
  props: {
    locale: {
      type: String,
    },
    node: {
      type: Object,
    },
    rawNode: {
      type: Object,
    },
  },
  computed: {
    /**
     * Since this mixin is used in both chatmode and formmode, we're not sure which
     * type of node will be passed in, so this will normalize it
     */
    baseNode() {
      return this.rawNode || this.node
    },
    localeKeys() {
      const i18nRoot = this.baseNode.args && this.baseNode.args.i18n
      return i18nRoot ? i18nRoot[this.locale] : null
    },
  },
  methods: {
    localeArgLookup(argName) {
      if (this.localeKeys && this.localeKeys[argName]) {
        return this.localeKeys[argName]
      } else {
        return this.baseNode &&
          this.baseNode.args &&
          this.baseNode.args[argName] !== undefined
          ? this.baseNode.args[argName]
          : null
      }
    },
  },
}
