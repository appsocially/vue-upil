import debounce from 'lodash.debounce'
import i18nMixin from '@/components/i18nMixin'

const isLoadingEventType = (event) => {
  const isPending = event.status === 'PENDING'
  const isExternalEvent = event.node && event.node.type === 'external'

  return isPending && isExternalEvent
}

export const isMissingValue = (node, state, upil) => {
  const currentValue = state[node.input.name]
  const missingState = currentValue === undefined || currentValue === null
  const isUnresolved = currentValue === upil.symbols.UNRESOLVED
  return missingState || isUnresolved
}

import { calculateComponent } from './widget-selection'

export default {
  mixins: [i18nMixin],
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
    missingValueText: {
      type: String,
      default: 'Missing Value',
    },
    locale: {
      type: String,
    },
    transformTextVariables: {
      type: Function,
      default: ({ value }) => value,
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
      return this.inputNodes.filter((n) =>
        isMissingValue(n, this.state, this.upil)
      )
    },
    isMissingValues() {
      return this.missingValueNodes && this.missingValueNodes.length > 0
    },
    initializingUpil() {
      return (
        !this.upil ||
        this.events.length === 0 ||
        this.events.some(isLoadingEventType)
      )
    },
    inputNodes() {
      return this.nodes.filter((n) => !!n.input && n.reply !== true)
    },
    finalMissingValueText() {
      return this.i18nKeys ? this.i18nKeys.missingValue : this.missingValueText
    },
  },
  methods: {
    calculateComponent(node) {
      return this.override(node, calculateComponent(node))
    },
    isMissingValue(node) {
      this.missingValueNodes.some((n) => n.id === node.id)
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
    calculateRules(node) {
      const hasInputType = node && node.input && node.input.type
      if (hasInputType) {
        const rules = this.types[node.input.type] || []
        if (Array.isArray(rules)) {
          return rules
        } else {
          return rules(this.locale)
        }
      } else {
        return []
      }
    },
    onConsume({ event, value }) {
      this.upil.consume(event, value)
    },
  },
}
