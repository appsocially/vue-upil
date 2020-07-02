<template>
  <TextBubble :reply="reply">{{ selectedOption }}</TextBubble>
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
    upil: {
      type: Object,
    },
  },
  computed: {
    selectedOption() {
      const index = this.upil
        ? this.upil.findOptionIndex(this.options, this.event.value)
        : -1
      const selectedOption = this.options[index]
      return selectedOption.text
    },
  },
}
</script>

<style></style>
