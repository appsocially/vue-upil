<template>
  <keep-alive>
    <v-select
      :items="items"
      v-model="numericModel"
      :placeholder="labelOverride"
    />
  </keep-alive>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import { symbols } from '@appsocially/userpil-core'

export default {
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
    labelOverride: {
      type: String,
      default: '選んでください',
    },
    locale: {
      type: String,
    },
  },
  computed: {
    min() {
      return this.node && this.node.args && this.node.args.min
        ? this.node.args.min
        : 0
    },
    max() {
      return this.node && this.node.args && this.node.args.max
        ? this.node.args.max
        : 1
    },
    unit() {
      const i18nRoot = this.node.args && this.node.args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      if (localeKeys && localeKeys.unit) {
        return localeKeys.unit
      } else {
        return this.node && this.node.args && this.node.args.unit
          ? this.node.args.unit
          : ''
      }
    },
    items() {
      const range = Array.from(Array(this.max - this.min + 1).keys())
      return range.map((i) => ({
        text: `${i + this.min}${this.unit}`,
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
