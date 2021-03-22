<template>
  <keep-alive>
    <v-textarea
      v-model="inputValue"
      :rows="1"
      :rules="rules"
      @update:error="onUpdateError"
      auto-grow
      @compositionstart="waitingOnIme = true"
      @compositionend="compositionEnded"
    />
  </keep-alive>
</template>

<script>
import { VTextarea } from 'vuetify/lib'
import textInputMixin from './text-input-mixin'

export default {
  mixins: [textInputMixin],
  components: {
    VTextarea,
  },
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isValid: this.rules.length === 0,
    }
  },
  watch: {
    inputValue(inputValue) {
      this.onSubmit(inputValue)
    },
  },
  methods: {
    onUpdateError(hasError) {
      this.isValid = !hasError
    },
  },
}
</script>

<style></style>
