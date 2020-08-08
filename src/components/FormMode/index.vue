<template>
  <div>
    <v-row
      no-gutters
      v-for="node in finalNodes"
      :key="node.id"
      :class="{
        'upil-missing-value-node': node.isMissingValue,
        'upil-has-value-node': !node.isMissingValue,
      }"
    >
      <v-col cols="12" :class="`elevation-${node.isMissingValue ? 10 : 0}`">
        <v-sheet
          :color="node.isMissingValue ? 'info darken-2' : null"
          :dark="node.isMissingValue"
        >
          <v-alert
            dense
            type="info"
            class="my-0"
            tile
            v-if="node.isMissingValue"
            >未記入</v-alert
          >
          <div class="alert-placeholder" v-else />
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
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <v-divider />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { VRow, VCol, VCardText, VSheet, VDivider, VAlert } from 'vuetify/lib'
import { substituteNodeText } from '@/utils'
import { symbols } from '@appsocially/userpil-core'
import debounce from 'lodash.debounce'
import { calculateComponent } from './widget-selection'

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
  components: {
    VRow,
    VCol,
    VCardText,
    VSheet,
    VDivider,
    VAlert,
  },
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
    finalNodes() {
      return this.inputNodes.map(({ text, args, ...rest }) => ({
        component: this.override(
          { args, ...rest },
          calculateComponent({ args, ...rest })
        ),
        isMissingValue: isMissingValue(rest, this.state),
        text: substituteNodeText(
          this.state,
          args && args.formText ? args.formText : text,
          false
        ),
        args,
        ...rest,
      }))
    },
  },
  methods: {
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
