import { symbols } from '@appsocially/userpil-core'
import debounce from 'lodash.debounce'

const isLoadingEventType = (event) => {
  const isPending = event.status === 'PENDING'
  const isExternalEvent = event.node && event.node.type === 'external'

  return isPending && isExternalEvent
}

export const isMissingValue = (node, state) => {
  const currentValue = state[node.input.name]
  const missingState = currentValue === undefined || currentValue === null
  const isUnresolved = currentValue === symbols.UNRESOLVED
  return missingState || isUnresolved
}

export default {
  data() {
    return {
      nodes: [],
      state: {},
      events: [],
      /**
       * If we debounce the method directly, then all
       * instances of this component will share the same method, and thus
       * it will be debounced across all instances of this component
       */
      transferStateDebounced: debounce(function (upil) {
        this.transferState(upil)
      }, 200),
    }
  },
  props: {
    upil: {
      type: Object,
      required: true,
    },
    types: {
      type: Object,
      default: () => ({}),
    },
    override: {
      type: Function,
      default: (_, component) => component,
    },
    locale: {
      type: String,
      default: null,
    },
    missingValueText: {
      type: String,
      default: 'Missing Value',
    },
    i18n: {
      type: Object,
    },
  },
  watch: {
    upil: {
      immediate: true,
      handler(upil) {
        this.runSetup(upil)
      },
    },
    isMissingValues: {
      immediate: true,
      handler(isMissingValues) {
        this.$emit('update:isMissingValue', isMissingValues)
      },
    },
    initializingUpil: {
      immediate: true,
      handler(initializingUpil) {
        this.$emit('update:initializingUpil', initializingUpil)
        this.$emit('update:isMissingValue', this.isMissingValues)
      },
    },
  },
  computed: {
    missingValueNodes() {
      return this.inputNodes.filter((n) => isMissingValue(n, this.state))
    },
    isMissingValues() {
      return this.missingValueNodes && this.missingValueNodes.length > 0
    },
    initializingUpil() {
      return this.events.length === 0 || this.events.some(isLoadingEventType)
    },
    inputNodes() {
      return this.nodes.filter((n) => !!n.input && n.reply !== true)
    },
    i18nKeys() {
      const i18n = this.i18n || {}
      return i18n[this.locale]
    },
    finalMissingValueText() {
      return this.i18nKeys ? this.i18nKeys.missingValue : this.missingValueText
    },
  },
  methods: {
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
    calculateText({ text, args }) {
      const i18nRoot = args && args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      return localeKeys ? localeKeys.text : text
    },
    updateNodes(nodes) {
      this.nodes = nodes
    },
    transferState(upil) {
      const state = upil.UpilStore.getState()
      this.state = state.input
      this.events = state.emittedEvents
      this.updateNodes(state.nodes)
    },
    runSetup(upil) {
      // Begin state syncing between upil core and provider
      this.transferStateDebounced(upil)
      upil.UpilStore.subscribe(() => {
        this.transferStateDebounced(upil)
      })
    },
    calculateRules(nodeWrapper) {
      const hasInputType =
        nodeWrapper &&
        nodeWrapper.node &&
        nodeWrapper.node.input &&
        nodeWrapper.node.input.type
      if (hasInputType) {
        return this.types[nodeWrapper.node.input.type] || []
      } else {
        return []
      }
    },
    onConsume({ event, value }) {
      this.upil.consume(event, value)
    },
  },
}
