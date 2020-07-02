<template>
  <v-card :color="cardColor" class="upil-text-bubble">
    <v-card-text px-3 class="break-all preformatted grey--text text--lighten-3">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
.break-all {
  word-break: break-all;
}
</style>
