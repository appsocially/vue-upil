<template>
  <TextBubble :reply="reply">{{ dateValue }}</TextBubble>
</template>

<script>
import TextBubble from '@/components/ChatMode/components/TextBubble'
import { formatTextbox } from '@/components/FormMode/date/utils'

export default {
  components: {
    TextBubble,
  },
  props: {
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
    dateValue() {
      return formatTextbox(this.event.value)
    },
  },
}
</script>

<style></style>
