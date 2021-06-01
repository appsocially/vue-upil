<template>
  <div>
    <v-row
      no-gutters
      v-for="node in finalNodes"
      :key="node.id"
      :class="{
        'upil-missing-value-node': isMissingValue(node),
        'upil-has-value-node': !isMissingValue(node),
      }"
    >
      <v-col cols="12" :class="`elevation-${isMissingValue(node) ? 10 : 0}`">
        <v-sheet
          v-bind="
            calculateMissingValueContainerAttributes
              ? calculateMissingValueContainerAttributes({
                  node,
                  isMissingValue: isMissingValue(node),
                })
              : {}
          "
        >
          <v-alert
            dense
            tile
            v-if="isMissingValue(node)"
            v-bind="
              calculateMissingValueAlertAttributes
                ? calculateMissingValueAlertAttributes({
                    node,
                    isMissingValue: isMissingValue(node),
                  })
                : {}
            "
            >{{ finalMissingValueText }}</v-alert
          >
          <div class="alert-placeholder" v-else />
          <v-card-text class="pt-1">
            <v-row justify="center" no-gutters class="no-wrap">
              <v-col cols="12" class="upil-node-text">{{ node.text }}</v-col>
              <v-col cols="12">
                <component
                  @consume="onConsume"
                  :is="node.component"
                  :node="node"
                  :upil="upil"
                  :state="state"
                  :locale="locale"
                  :rules="node.rules"
                />
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
import formmodeMixin from './formmodeMixin'

const defaultMissingValueContainerAttributes = ({ isMissingValue }) => {
  return {
    dark: isMissingValue,
    color: isMissingValue ? 'info darken-2' : undefined,
  }
}

const defaultMissingValueAlertAttributes = () => {
  return {
    type: 'info',
    class: 'my-0',
  }
}

export default {
  mixins: [formmodeMixin],
  components: {
    VRow,
    VCol,
    VCardText,
    VSheet,
    VDivider,
    VAlert,
  },
  props: {
    calculateMissingValueContainerAttributes: {
      type: Function,
      default: defaultMissingValueContainerAttributes,
    },
    calculateMissingValueAlertAttributes: {
      type: Function,
      default: defaultMissingValueAlertAttributes,
    },
  },
  computed: {
    finalNodes() {
      return this.inputNodes.map(({ text, args, options, node, ...rest }) => ({
        component: this.calculateComponent(node),
        text: substituteNodeText({
          inputState: this.state,
          text: this.calculateFormText({ args })
            ? this.calculateFormText({ args })
            : this.calculateText({ text, args }),
          searchForLinks: false,
          transformTextVariables: this.transformTextVariables,
          calculateVariable: this.calculateVariable({ args }),
        }),
        options: this.calculateOptions({ options, args }),
        args,
        rules: this.calculateRules(node),
        node,
        ...rest,
      }))
    },
  },
}
</script>

<style scoped>
.alert-placeholder {
  height: 40px;
}
</style>
