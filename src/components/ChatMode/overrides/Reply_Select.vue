<template>
  <TextBubble :reply="node.reply">{{ selectedOption }}</TextBubble>
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
  },
  computed: {
    selectedOption() {
      const index = this.upil
        ? this.upil.findOptionIndex(this.node.options, this.node.event.value)
        : -1
      const selectedOption = this.node.options[index]
      return selectedOption.text
    },
  },
}
</script>

<style></style>
