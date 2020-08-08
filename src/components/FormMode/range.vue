<template>
  <keep-alive>
    <v-select :items="items" v-model="numericModel" />
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
    upil: {
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
  data() {
    return {
      menu: false,
      isValid: this.rules.length === 0,
      tempDate: null,
      tempDuration: null,
    }
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
      return this.node && this.node.args && this.node.args.unit
        ? this.node.args.unit
        : ''
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
        this.upil.consume(this.node.event, value)
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
  watch: {
    stateInputValue: {
      immediate: true,
      handler(stateInputValue) {
        if (stateInputValue) {
          this.resetTempValues(stateInputValue)
        }
      },
    },
  },
  methods: {
    onUpdateError(hasError) {
      this.isValid = !hasError
    },
    onSubmit() {
      this.upil.consume(this.node.event, this.dateTime)
    },
    onCancel() {
      this.resetTempValues()
      this.menu = false
    },
    resetTempValues() {
      this.tempDate = null
      this.tempHours = null
      this.tempMinutes = null
    },
  },
}
</script>

<style></style>
