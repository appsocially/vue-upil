<template>
  <keep-alive>
    <v-select :items="items" v-model="numericModel" />
  </keep-alive>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import { symbols } from '@appsocially/userpil-core'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [widgeti18nMixin],
  components: {
    VSelect,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    min() {
      return this.localeArgLookup('min') || 0
    },
    max() {
      return this.localeArgLookup('max') || 1
    },
    items() {
      const range = Array.from(Array(this.max - this.min + 1).keys())
      return range.map((i) => ({
        text: `${i + this.min}${this.localeArgLookup('unit') || ''}`,
        value: i + this.min,
      }))
    },
    numericModel: {
      get() {
        return this.stateInputValue
      },
      set(value) {
        this.$emit('consume', { event: this.node.event, value })
      },
    },
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === symbols.UNRESOLVED ? null : inputValue
    },
  },
}
</script>

<style></style>
