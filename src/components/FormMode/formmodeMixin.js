import debounce from 'lodash.debounce'
import i18nMixin from '@/components/i18nMixin'
import { observableDiff, applyChange } from 'deep-diff'
import Vue from 'vue'

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

const handleNewProperty = (thisNodes, path, rhs) => {
  const lastIndex = path.length - 1
  const finalObject = path.reduce((memo, val, index) => {
    if (index !== lastIndex) {
      return memo[val]
    } else {
      return memo
    }
  }, thisNodes)

  Vue.set(finalObject, path[lastIndex], rhs)
}

const handleNewElement = (thisNodes, path, index, rhs) => {
  const finalObject = path.reduce((memo, val) => {
    return memo[val]
  }, thisNodes)

  finalObject.splice(index, 0, rhs)
}

const handleDeleteElement = (thisNodes, path, index) => {
  const finalObject = path.reduce((memo, val) => {
    return memo[val]
  }, thisNodes)

  finalObject.splice(index, 1)
}

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
    updateNodes(nodes) {
      observableDiff(this.nodes, nodes, (d) => {
        // console.log('d', d)
        if (d.kind === 'A') {
          const {
            index,
            item: { kind, rhs },
            path,
          } = d
          switch (kind) {
            case 'N': {
              if (path) {
                handleNewElement(this.nodes, path, index, rhs)
              } else {
                this.nodes.splice(index, 0, nodes[index])
              }
              break
            }

            case 'D': {
              if (path) {
                handleDeleteElement(this.nodes, path, index)
              } else {
                this.nodes.splice(index, 1)
              }
              break
            }
          }
        } else if (d.kind === 'N') {
          handleNewProperty(this.nodes, d.path, d.rhs)
        } else {
          applyChange(this.nodes, nodes, d)
        }
      })
    },
    transferState(upil) {
      const state = upil.UpilStore.getState()
      this.patchState(state.input)
      this.events = state.emittedEvents
      this.updateNodes(state.nodes)
    },
    patchState(stateInput) {
      observableDiff(this.state, stateInput, (d) => {
        // console.log('state d', d)
        if (d.kind === 'N') {
          handleNewProperty(this.state, d.path, d.rhs)
        } else {
          applyChange(this.state, stateInput, d)
        }
      })
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
