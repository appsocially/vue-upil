<template>
  <keep-alive>
    <v-textarea
      v-model="inputValue"
      :rows="1"
      :rules="rules"
      :messages="hint"
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
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [textInputMixin, widgeti18nMixin],
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
  computed: {
    hint(){
      return this.localeArgLookup('hint')
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
