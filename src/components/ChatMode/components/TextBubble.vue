<template>
  <v-card :color="cardColor" class="upil-text-bubble v-sheet--outlined">
    <v-card-text px-3 :class="{
      'break-all': true,
      'preformatted': true,
      'black--text': !reply,
      'white--text': !!reply,
    }">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
import { VCard, VCardText } from 'vuetify/lib'

export default {
  components: {
    VCard,
    VCardText,
  },
  props: {
    reply: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardColor() {
      return this.reply === true ? '#E73F87' : '#F1F0F0'
    },
  },
}
</script>

<style scoped>
.break-all {
  word-break: break-all;
}
</style>
