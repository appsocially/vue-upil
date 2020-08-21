<template>
  <TextBubble :reply="node.reply">{{ eventValues }}</TextBubble>
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
  },
  computed: {
    eventValues() {
      return this.node.event.value
        .map((v) => v.value)
        .map((v) =>
          this.node.event.node.options.find((o) => o.value.value === v)
        )
        .map((o) => o.text)
        .join(', ')
    },
  },
}
</script>

<style></style>
