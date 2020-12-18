<template>
  <v-card :color="cardColor" class="upil-text-bubble">
    <v-card-text px-3 class="preformatted grey--text text--lighten-3">
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
      return this.reply === true ? 'secondary' : 'primary'
    },
  },
}
</script>

<style scoped>
</style>
