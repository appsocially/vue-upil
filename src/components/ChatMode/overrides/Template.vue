<template>
  <TextBubble :reply="node.reply">
    <span class="text-node" v-html="output" />
  </TextBubble>
</template>

<script>
import TextBubble from '@/components/ChatMode/components/TextBubble'

export default {
  components: {
    TextBubble,
  },
  props: {
    node: {
      type: Object,
    },
    upil: {
      type: Object,
    },
    state: {
      type: Object,
    },
    transform: {
      type: Function,
      default: ({ node }) => node.event.value,
    },
  },
  computed: {
    output() {
      return this.node.reply === true
        ? this.transform({
            node: this.node,
            upil: this.upil,
            state: this.state,
          })
        : this.node.text
    },
  },
}
</script>

<style scoped>
.text-node >>> .linkified {
  color: white;
}
</style>
