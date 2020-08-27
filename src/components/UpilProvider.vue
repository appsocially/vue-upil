<template>
  <span>
    <slot
      :history="history"
      :allNodes="allNodes"
      :currentNode="currentNode"
      :sendInput="upil.consume"
      :scenarioEnded="scenarioEnded"
      :state="stateWrapper.inputState"
    />
  </span>
</template>

<script>
import { consume, state, NODE_TYPES } from '@/enums'
import { substituteNodeText, setupListeners } from '@/utils'
import { defaultListeners } from '@/defaultListeners'
import debounce from 'lodash.debounce'
import i18nMixin from '@/components/i18nMixin'

const defaultStatementComponentsMap = {
  // [NODE_TYPES.TEMPLATE]: () => import('@/components/DefaultTemplate'),
  // [NODE_TYPES.SELECT]: () => import('@/components/DefaultSelect'),
  // [NODE_TYPES.MULTISELECT]: () => import('@/components/DefaultMultiSelect'),
  // [NODE_TYPES.GROUP]: () => import('@/components/DefaultGroup')
}

const defaultReplyComponentsMap = {
  // [NODE_TYPES.TEMPLATE]: () => import('@/components/DefaultReplyTemplate'),
  // [NODE_TYPES.SELECT]: () => import('@/components/DefaultReplySelect'),
  // [NODE_TYPES.MULTISELECT]: () => import('@/components/DefaultReplyMultiSelect')
}

export default {
  mixins: [i18nMixin],
  props: {
    upil: {
      Object: true,
      required: true,
    },
    override: {
      type: Function,
      default: (context, node, component) => component,
    },
    overrideCurrent: {
      type: Function,
      // default: () => () => import('@/components/DefaultTemplate')
      default: () => () => null,
    },
    transformTextVariables: {
      type: Function,
      default: ({ value }) => value,
    },
    listeners: {
      type: Object,
      default: () => ({}),
    },
    searchForLinks: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      [consume]: this.upil.consume,
      [state]: this.stateWrapper,
    }
  },
  data() {
    return {
      emittedEvents: [],
      nodes: [],
      stateWrapper: {
        inputState: {},
      },
      store: null,
      listenerUnsubscribeArray: [],
      scenarioEnded: false,
    }
  },
  computed: {
    allNodes() {
      const all = this.nodes ? this.nodes.map((n) => this.setupNode(n)) : []
      return all
    },
    history() {
      return this.allNodes.slice(0, this.allNodes.length - 1)
    },
    currentNode() {
      const currentNode = this.allNodes
        .concat([])
        .reverse()
        .find((n) => n.reply !== true && n.node.input)
      return currentNode ? this.setupNode(currentNode.rawNode, true) : null
    },
    currentEventWithLabel() {
      const currentEvent = this.currentEvent
      if (currentEvent) {
        const currentEvent = this.emittedEvents[this.emittedEvents.length - 1]
        const hasLabel =
          currentEvent && currentEvent.node && currentEvent.node.label
        return hasLabel ? currentEvent : null
      } else {
        return null
      }
    },
    currentEvent() {
      const hasEmittedEvent =
        this.emittedEvents && this.emittedEvents.length > 0
      return hasEmittedEvent
        ? this.emittedEvents[this.emittedEvents.length - 1]
        : null
    },
  },
  watch: {
    currentNode: {
      immediate: true,
      handler(currentNode) {
        this.$emit('update:current', currentNode)
      },
    },
    currentEvent: {
      immediate: true,
      handler(currentEvent) {
        this.$emit('update:currentEvent', {
          event: currentEvent,
          inputState: this.stateWrapper.inputState,
        })
      },
    },
    upil: {
      immediate: true,
      handler(upil, oldUpil) {
        if (upil && upil !== oldUpil) {
          this.runSetup(upil)
        }
      },
    },
    currentEventWithLabel: {
      immediate: true,
      handler(currentEventWithLabel) {
        if (currentEventWithLabel) {
          return this.$emit('eventWithLabel', {
            event: currentEventWithLabel,
            inputState: this.stateWrapper.inputState,
          })
        }
      },
    },
  },
  methods: {
    transferState() {
      this.emittedEvents = this.store.getState().emittedEvents
      this.stateWrapper.inputState = this.store.getState().input
      this.updateNodes(this.store.getState().nodes)
    },
    updateNodes: debounce(function (nodes) {
      this.nodes = nodes
    }, 100),
    calculateComponentType(node, current = false) {
      const { reply } = node
      const asStatementComponent = current || reply !== true
      const componentType = asStatementComponent
        ? this.calculateStatementComponent(node)
        : this.calculateReplyComponent(node)
      if (current) {
        return this.overrideCurrent(
          { scenarioEnded: this.scenarioEnded },
          node,
          componentType
        )
      } else {
        return this.override(
          { scenarioEnded: this.scenarioEnded },
          node,
          componentType
        )
      }
    },
    calculateReplyComponent(node) {
      const { type, label } = node
      return defaultReplyComponentsMap[label] || defaultReplyComponentsMap[type]
    },
    calculateStatementComponent(node) {
      const { type, label } = node
      return (
        defaultStatementComponentsMap[label] ||
        defaultStatementComponentsMap[type]
      )
    },
    setupNode(node, current = false) {
      const { type } = node

      const componentType = this.calculateComponentType(node, current)

      if (!componentType) {
        throw new Error(`Can't find a suitable component`, node)
      }

      if (type === NODE_TYPES.GROUP) {
        const { nodes, ...rest } = node
        const newNodes = nodes.map((n) => this.setupNode(n))
        return {
          node: {
            nodes: newNodes,
            ...rest,
          },
          rawNode: node,
          componentType,
        }
      } else {
        const { text, args, id, reply, options, ...rest } = node
        return {
          node: {
            sendInput: this.createSendInput(node),
            text: substituteNodeText({
              inputState: this.stateWrapper.inputState,
              text: this.calculateText({ text, args }),
              searchForLinks: this.searchForLinks,
              transformTextVariables: this.transformTextVariables,
              calculateVariable: this.calculateVariable({ args }),
            }),
            id: reply === true ? `${id}-r` : id,
            reply,
            options: this.calculateOptions({ options, args }),
            ...rest,
          },
          rawNode: node,
          args,
          componentType,
        }
      }
    },
    createSendInput({ event }) {
      return (input) => this.upil.consume(event, input)
    },
    runSetup(upil) {
      this.store = upil.UpilStore
      // Setup listeners
      setupListeners({ listeners: defaultListeners(this.$data), upil })
      this.listenerUnsubscribeArray = setupListeners({
        listeners: this.listeners,
        upil,
      })

      // Begin state syncing between upil core and provider
      this.transferState()
      this.store.subscribe(() => {
        this.transferState()
      })
    },
  },
}
</script>
