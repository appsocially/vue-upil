<template>
  <TextBubble :reply="reply">
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
    text: {
      type: String,
      required: true,
    },
    reply: {
      type: Boolean,
      default: false,
    },
    event: {
      type: Object,
      required: false,
    },
  },
  computed: {
    output() {
      return this.reply === true ? this.event.value : this.text
    },
  },
}
</script>

<style scoped>
.text-node >>> .linkified {
  color: white;
}
</style>
