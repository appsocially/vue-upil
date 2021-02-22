<template>
  <div v-if="finalNodes && finalNodes[0]" id="wizard-container">
    <v-stepper v-model="currentNodeIndex">
      <v-stepper-header ref="headerContainer">
        <template v-for="(node, index) in finalNodes">
          <v-stepper-step
            :key="`${node.id}-header`"
            :complete="!node.isMissingValue"
            :step="index + 1"
            >{{ node.headerText }}</v-stepper-step
          >

          <v-divider
            v-if="index !== finalNodes.length - 1"
            :key="`${node.id}-divider`"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-container>
        <v-stepper-items>
          <v-stepper-content
            v-for="(node, index) in finalNodes"
            :key="`${node.id}-content`"
            :step="index + 1"
          >
            <v-row justify="center">
              <v-col cols="12" md="8" lg="6">
                <v-card-text class="pt-1">
                  <v-row justify="center" no-gutters class="no-wrap">
                    <v-col cols="12" class="upil-node-text">
                      {{ node.text }}
                    </v-col>
                    <v-col cols="12">
                      <keep-alive>
                        <component
                          :is="node.component"
                          :node="node"
                          :upil="upil"
                          :state="state"
                          :locale="locale"
                          :rules="calculateRules(node)"
                        />
                      </keep-alive>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-btn @click="prevStep" text v-if="currentNodeIndex !== 1"
                  >Back</v-btn
                >
                <v-btn
                  color="primary"
                  v-if="currentNodeIndex !== finalNodes.length"
                  :disabled="node.isMissingValue"
                  @click="nextStep"
                  >Continue</v-btn
                >
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-container>
    </v-stepper>
  </div>
</template>

<script>
import {
  VRow,
  VCol,
  VCardText,
  VDivider,
  VStepper,
  VStepperStep,
  VStepperHeader,
  VStepperItems,
  VStepperContent,
  VBtn,
} from 'vuetify/lib'
import { substituteNodeText } from '@/utils'
import VueScrollTo from 'vue-scrollto'
import { calculateComponent } from '@/components/FormMode/widget-selection'
import formmodeMixin, {
  isMissingValue,
} from '@/components/FormMode/formmodeMixin'

export default {
  mixins: [formmodeMixin],
  components: {
    VRow,
    VCol,
    VCardText,
    VDivider,
    VStepper,
    VStepperStep,
    VStepperHeader,
    VStepperItems,
    VStepperContent,
    VBtn,
  },
  data() {
    return {
      currentNodeIndex: 1,
    }
  },
  watch: {
    currentNodeIndex() {
      this.scrollToActiveHeader()
    },
  },
  computed: {
    finalNodes() {
      return this.inputNodes.map(({ text, args, options, ...rest }) => {
        const formText = this.calculateFormText({ args })
        const baseText = this.calculateText({ args, text })
        return {
          component: this.override(
            { args, ...rest },
            calculateComponent({ args, ...rest })
          ),
          isMissingValue: isMissingValue(rest, this.state, this.upil),
          headerText: substituteNodeText({
            inputState: this.state,
            text: formText ? formText : baseText,
            searchForLinks: false,
            transformTextVariables: this.transformTextVariables,
            calculateVariable: this.calculateVariable({ args }),
          }),
          text: substituteNodeText({
            inputState: this.state,
            text: baseText,
            searchForLinks: false,
            transformTextVariables: this.transformTextVariables,
            calculateVariable: this.calculateVariable({ args }),
          }),
          options: this.calculateOptions({ options, args }),
          args,
          ...rest,
        }
      })
    },
  },
  methods: {
    scrollToActiveHeader() {
      VueScrollTo.scrollTo('.v-stepper__step--active', 300, {
        container: this.$refs.headerContainer,
        x: true,
        y: false,
      })
    },
    prevStep() {
      this.currentNodeIndex = Math.max(this.currentNodeIndex - 1, 1)
    },
    nextStep() {
      this.currentNodeIndex = Math.min(
        this.currentNodeIndex + 1,
        this.finalNodes.length
      )
    },
  },
}
</script>

<style scoped>
#wizard-container {
  width: 100%;
  height: 100%;
}

#wizard-container > .v-stepper {
  width: 100%;
  height: 100%;
}

#wizard-container >>> .v-stepper__header {
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
}

#wizard-container >>> .v-stepper__step {
  min-width: max-content;
}

#wizard-container >>> .v-stepper__header .v-divider {
  min-width: 20px;
}
</style>
