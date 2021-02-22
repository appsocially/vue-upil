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
            >{{ finalMissingValueText }}</v-alert
          >
          <div class="alert-placeholder" v-else />
          <v-card-text class="pt-1">
            <v-row justify="center" no-gutters class="no-wrap">
              <v-col cols="12" class="upil-node-text">{{ node.text }}</v-col>
              <v-col cols="12">
                <keep-alive>
                  <component
                    :key="`${node.id}-widget`"
                    @consume="onConsume"
                    :is="node.component"
                    :node="node"
                    :upil="upil"
                    :state="state"
                    :locale="locale"
                    :rules="node.rules"
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
import { calculateComponent } from './widget-selection'
import formmodeMixin, { isMissingValue } from './formmodeMixin'

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
  computed: {
    finalNodes() {
      return this.inputNodes.map(({ text, args, options, node, ...rest }) => ({
        component: this.override(
          { args, ...rest },
          calculateComponent({ args, ...rest })
        ),
        isMissingValue: isMissingValue(rest, this.state, this.upil),
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
