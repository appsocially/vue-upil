<template>
  <v-textarea
    class="upil-template"
    :rows="1"
    v-model="userInput"
    :placeholder="placeholder"
    solo
    append-outer-icon="mdi-send"
    @click:append-outer="onSubmit"
    @keydown.enter="onUserEnter"
    hide-details="auto"
    :rules="rules"
    @update:error="onUpdateError"
    :type="inputType"
    :messages="hint"
  />
</template>

<script>
import { VTextarea } from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [widgeti18nMixin],
  components: {
    VTextarea,
  },
  props: {
    input: {
      type: Object,
      required: false,
    },
    sendInput: {
      type: Function,
      required: false,
    },
    placeholderText: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      userInput: '',
      isValid: this.rules.length === 0,
    }
  },
  computed: {
    placeholder() {
      return this.localeArgLookup('placeholder') || this.placeholderText
    },
    hint() {
      return this.localeArgLookup('hint')
    },
    inputType() {
      return this.localeArgLookup('inputType') || ''
    },
    hasRules() {
      return this.rules.length > 0
    },
    // hasError (){
    //   return this.rules.every(r=>r(this.userInput))
    // }
  },
  methods: {
    onUpdateError(hasError) {
      this.isValid = !hasError
    },
    onSubmit() {
      const userInput = this.userInput.trim()
      if (userInput && this.isValid) {
        this.sendInput(userInput)
      }
    },
    onUserEnter(event) {
      if (event.metaKey || event.ctrlKey) {
        this.onSubmit()
      }
    },
  },
  mounted() {
    if (this.hasRules) {
      this.$emit('adjust:height', 25)
    }
  },
}
</script>

<style></style>
