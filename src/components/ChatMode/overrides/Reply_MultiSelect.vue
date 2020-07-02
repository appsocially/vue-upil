<template>
  <TextBubble :reply="reply">{{ eventValues }}</TextBubble>
</template>

<script>
import TextBubble from '@/components/ChatMode/components/TextBubble'

export default {
  components: {
    TextBubble,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    event: {
      type: Object,
      required: false,
    },
    reply: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    eventValues() {
      return this.event.value
        .map((v) => v.value)
        .map((v) => this.event.node.options.find((o) => o.value.value === v))
        .map((o) => o.text)
        .join(', ')
    },
  },
}
</script>

<style></style>
