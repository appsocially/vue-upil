<template>
  <keep-alive>
    <v-select
      menu-props="auto"
      :items="items"
      v-model="numericModel"
      :label="labelOverride"
    />
  </keep-alive>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

// https://stackoverflow.com/questions/9539513/is-there-a-reliable-way-in-javascript-to-obtain-the-number-of-decimal-places-of
function decimalPlaces(n) {
  function hasFraction(n) {
    return Math.abs(Math.round(n) - n) > 1e-10
  }

  let count = 0
  // multiply by increasing powers of 10 until the fractional part is ~ 0
  while (hasFraction(n * 10 ** count) && isFinite(10 ** count)) count++
  return count
}

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
    upil: {
      type: Object,
    },
    labelOverride: {
      type: String,
      default: '',
    },
  },
  computed: {
    min() {
      return this.localeArgLookup('min') || 0
    },
    max() {
      return this.localeArgLookup('max') || 1
    },
    default() {
      return this.localeArgLookup('default')
    },
    step() {
      return this.localeArgLookup('step') || 1
    },
    items() {
      const fixedLength = decimalPlaces(this.step)
      const totalItems = Math.ceil((this.max - this.min + 1) / this.step)
      const range = Array.from(Array(totalItems).keys())
      return range.map((i) => ({
        text: `${(i * this.step + this.min).toFixed(fixedLength)}${
          this.localeArgLookup('unit') || ''
        }`,
        value: i * this.step + this.min,
      }))
    },
    numericModel: {
      get() {
        return this.stateInputValue || this.default
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
      return inputValue === this.upil.symbols.UNRESOLVED ? null : inputValue
    },
  },
}
</script>

<style></style>
