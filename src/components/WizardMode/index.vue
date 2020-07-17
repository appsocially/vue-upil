<template>
  <div v-if="finalNodes && finalNodes[0]">
    <v-stepper v-model="currentNodeIndex">
      <v-stepper-header>
        <template v-for="(node, index) in finalNodes">
          <v-stepper-step
            :key="`${node.id}-header`"
            :complete="!node.isMissingValue"
            :step="index+1"
          >{{node.headerText}}</v-stepper-step>

          <v-divider :key="`${node.id}-divider`"></v-divider>
        </template>
      </v-stepper-header>
      <v-container>
        <v-stepper-items>
          <v-stepper-content
            v-for="(node, index) in finalNodes"
            :key="`${node.id}-content`"
            :step="index+1"
          >
            <v-row justify="center">
              <v-col cols="12" md="8" lg="6">
                <v-card-text class="pt-1">
                  <v-row justify="center" no-gutters class="no-wrap">
                    <v-col cols="12" class="upil-node-text">{{ node.text }}</v-col>
                    <v-col cols="12">
                      <keep-alive>
                        <component
                          :is="node.component"
                          :node="node"
                          :upil="upil"
                          :state="state"
                          :rules="calculateRules(node)"
                        />
                      </keep-alive>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-btn @click="prevStep" text v-if="currentNodeIndex !== 1">Back</v-btn>
                <v-btn
                  color="primary"
                  v-if="currentNodeIndex !== finalNodes.length"
                  :disabled="node.isMissingValue"
                  @click="nextStep"
                >Continue</v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-container>
    </v-stepper>
  </div>
</template>

<script>
import { substituteNodeText } from '@/utils'
import { symbols } from '@appsocially/userpil-core'
import debounce from 'lodash.debounce'

function componentByLabel({ label }, component) {
  switch (label) {
    default:
      return component
  }
}

function componentByType({ type }, component) {
  switch (type) {
    case 'select':
      return () => import('@/components/FormMode/select')
    case 'multi-select':
      return () => import('@/components/FormMode/multi-select')
    case 'template':
      return () => import('@/components/FormMode/text-input')
    default:
      return component
  }
}

function calculateComponent({ type, label }) {
  const byTypeComponent = componentByType({ type }, null)
  return componentByLabel({ label }, byTypeComponent)
}

const isLoadingEventType = (event) => {
  const isPending = event.status === 'PENDING'
  const isExternalEvent = event.node && event.node.type === 'external'

  return isPending && isExternalEvent
}

const isMissingValue = (node, state) => {
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
      currentNodeIndex: 1,
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
    }
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
    finalNodes() {
      return this.inputNodes.map(({ text, args, ...rest }) => ({
        component: this.override(
          { args, ...rest },
          calculateComponent({ args, ...rest })
        ),
        isMissingValue: isMissingValue(rest, this.state),
        headerText: substituteNodeText(
          this.state,
          args && args.formText ? args.formText : text,
          false
        ),
        text: substituteNodeText(
          this.state,
          text,
          false
        ),
        args,
        ...rest,
      }))
    },
  },
  methods: {
    prevStep(){
      this.currentNodeIndex = Math.max(this.currentNodeIndex - 1, 1)
    },
    nextStep(){
      this.currentNodeIndex = Math.min(this.currentNodeIndex + 1, this.finalNodes.length)
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
  },
}
</script>

<style scoped>
.alert-placeholder {
  height: 40px;
}
</style>
