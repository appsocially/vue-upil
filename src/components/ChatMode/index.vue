<template>
  <UpilProvider
    :override="_override"
    :overrideCurrent="_overrideCurrent"
    :transformTextVariables="transformTextVariables"
    :upil="upil"
    :listeners="listeners"
    :searchForLinks="searchForLinks"
    @update:current="onUpdateCurrent"
    @update:currentEvent="$emit('update:currentEvent', $event)"
    @eventWithLabel="$emit('eventWithLabel', $event)"
  >
    <template v-slot="{ allNodes, currentNode, scenarioEnded, state }">
      <div>
        <div
          v-resize="calculateWindowHeight"
          :style="wrapperStyle"
          id="conversation-container"
          ref="conversationContainer"
        >
          <v-row justify="space-around" class="flex-wrap">
            <v-col>
              <transition-group
                @enter="scrollToBottom"
                name="bubbles"
                tag="div"
                class="v-content__wrap fill-height"
              >
                <v-col
                  class="my-1 bubble-container"
                  cols="12"
                  v-for="{ node, componentType } in allNodes"
                  :data-side="fromUser(node) ? 'user' : 'bot'"
                  :key="node.id"
                >
                  <v-row
                    dense
                    :class="{
                      'pa-1': true,
                      'flex-row-reverse': fromUser(node),
                    }"
                  >
                    <v-col cols="auto" v-if="!fromUser(node)">
                      <img height="40" width="40" :src="avatar" mr-1 />
                    </v-col>
                    <v-col class="chat-bubble" cols="auto">
                      <component
                        v-bind="node"
                        :is="componentType"
                        :upil="upil"
                        :state="state"
                        @consume="onConsume"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </transition-group>
            </v-col>
          </v-row>

          <div id="bottom-bar" v-if="!removeBottomBar && currentNode">
            <component
              v-bind="currentNode.node"
              :is="currentNode.componentType"
              :rawNode="currentNode.rawNode"
              :rules="calculateRules(currentNode)"
              :upil="upil"
              :state="state"
              @consume="onConsume"
              @adjust:height="onAdjustHeight"
            />
          </div>
        </div>
        <slot
          name="external"
          :allNodes="allNodes"
          :currentNode="currentNode"
          :scenarioEnded="scenarioEnded"
          :state="state"
          @consume="onConsume"
        ></slot>
      </div>
    </template>
  </UpilProvider>
</template>

<script>
import { VCol, VRow } from 'vuetify/lib'
import { Resize } from 'vuetify/lib/directives'
import UpilProvider from '@/components/UpilProvider'
import { NODE_TYPES } from '@/enums'
import debounce from 'lodash.debounce'
import goTo from 'vuetify/es5/services/goto'

const defaultStatementComponentsMap = {
  [NODE_TYPES.TEMPLATE]: () => import('./overrides/Template'),
  [NODE_TYPES.SELECT]: () => import('./overrides/Template'),
  [NODE_TYPES.MULTISELECT]: () => import('./overrides/Template'),
}

const defaultReplyComponentsMap = {
  [NODE_TYPES.TEMPLATE]: () => import('./overrides/Template'),
  [NODE_TYPES.SELECT]: () => import('./overrides/Reply_Select'),
  [NODE_TYPES.MULTISELECT]: () => import('./overrides/Reply_MultiSelect'),
}

export default {
  components: {
    VCol,
    VRow,
    UpilProvider,
  },
  directives: {
    Resize,
  },
  data() {
    return {
      userInput: '',
      // calculatedHeight: '100vh',
      windowHeight: null,
      currentNodeAdditionalHeight: 0,
    }
  },
  props: {
    upil: {
      type: Object,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    override: {
      type: Function,
      default: (context, node, component) => component,
    },
    overrideCurrent: {
      type: Function,
      default: (context, node, component) => component,
    },
    listeners: {
      type: Object,
      default: () => ({}),
    },
    wrapperStyleOverride: {
      type: Object,
      default: () => null,
    },
    removeBottomBar: {
      type: Boolean,
      default: false,
    },
    searchForLinks: {
      type: Boolean,
      default: true,
    },
    types: {
      type: Object,
      default: () => ({}),
    },
    transformTextVariables: {
      type: Function,
      default: (value) => value,
    },
  },
  computed: {
    wrapperStyle() {
      return this.wrapperStyleOverride
        ? this.wrapperStyleOverride
        : { height: `calc(${this.calculatedHeight} - 56px - 70px)` }
    },
    calculatedHeight() {
      const extraIOSHeight = CSS.supports('(-webkit-overflow-scrolling: touch)')
        ? 60
        : 0
      return `${
        (this.windowHeight || '100vh') -
        extraIOSHeight -
        this.currentNodeAdditionalHeight
      }px`
    },
  },
  mounted() {
    this.calculateWindowHeight()
  },
  methods: {
    _overrideCurrent(context, node, component) {
      const { scenarioEnded } = context
      if (scenarioEnded) {
        return () => import('./overrides/Current_Finished')
      } else {
        const byTypeComponent = this.calculateCurrentComponentByType(
          context,
          node,
          component
        )

        const byLabelComponent = this.calculateCurrentComponentByLabel(
          context,
          node,
          byTypeComponent
        )

        return this.overrideCurrent(context, node, byLabelComponent)
      }
    },
    calculateCurrentComponentByType(context, node) {
      switch (node.type) {
        case NODE_TYPES.SELECT:
          return () => import('./overrides/Current_Select')
        case NODE_TYPES.MULTISELECT:
          return () => import('./overrides/Current_MultiSelect')
        default:
          return () => import('./overrides/Current_Template')
      }
    },
    calculateCurrentComponentByLabel(context, node, component) {
      switch (node.label) {
        case 'date':
          return () => import('./overrides/Current_Date')
        default:
          return component
      }
    },
    _override(context, node, component) {
      const { reply, type } = node
      const internalComponentType =
        reply === true
          ? this.calculateReplyComponentByLabel(
              context,
              node,
              defaultReplyComponentsMap[type]
            )
          : defaultStatementComponentsMap[type]
      const finalComponent = internalComponentType || component
      return this.override(context, node, finalComponent)
    },
    calculateReplyComponentByLabel(context, node, component) {
      switch (node.label) {
        case 'date':
          return () => import('./overrides/Reply_Date')
        default:
          return component
      }
    },
    fromUser(node) {
      return node.reply === true
    },
    chatbubbleColor(node) {
      return this.fromUser(node) ? 'secondary' : 'primary'
    },
    scrollToBottom: debounce(function () {
      this.$nextTick(() => {
        const conversationContainer = this.$refs.conversationContainer
        if (conversationContainer) {
          const duration =
            conversationContainer.scrollHeight - conversationContainer.scrollTop
          goTo(conversationContainer.scrollHeight, {
            duration,
            easing: 'easeInOutCubic',
            container: conversationContainer,
          })
        }
      })
    }, 100),
    calculateWindowHeight() {
      this.windowHeight = window.innerHeight
    },
    onUpdateCurrent() {
      this.currentNodeAdditionalHeight = 0
    },
    onAdjustHeight(height) {
      this.currentNodeAdditionalHeight = height
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
</script>

<style scoped>
.bubbles-enter-active,
.bubbles-leave-active {
  transition: all 0.2s;
}

.bubbles-enter[data-side='bot'],
.bubbles-leave-to[data-side='bot'] {
  opacity: 0;
  transform: translateX(-100vw);
}

.bubbles-enter[data-side='user'],
.bubbles-leave-to[data-side='user'] {
  opacity: 0;
  transform: translateX(100vw);
}

.bottom-container {
  align-self: flex-end;
}
.break-all {
  word-break: break-all;
}
#conversation-container >>> .preformatted {
  white-space: pre-line;
}

/* #conversation-container >>> *::selection {
  background: yellow;
}

#conversation-container >>> * {
  -webkit-tap-highlight-color: yellow;
} */

#conversation-container >>> .v-sheet {
  border-radius: 15px;
}

#conversation-container >>> .v-card__text {
  padding: 10px;
}

#conversation-container {
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  /* height: calc(100vh - 56px - 70px) */
}

.chat-bubble {
  max-width: 70vw;
}

.bubble-container {
  position: relative;
}

#bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 15px;
  transition: padding-bottom 0.5s;
}

/* Prevents IOS keyboard bar from hiding text input */
@supports (-webkit-overflow-scrolling: touch) {
  #bottom-bar {
    padding-bottom: 20px;
  }

  #bottom-bar:focus-within {
    padding-bottom: 60px;
    transition: padding-bottom 0.5s;
  }
}
</style>
