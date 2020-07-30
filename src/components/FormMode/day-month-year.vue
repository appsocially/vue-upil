<template>
  <keep-alive>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="computedDateFormatted"
          hide-hint
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateModel"
        no-title
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </keep-alive>
</template>

<script>
import { symbols } from '@appsocially/userpil-core'
import { formatISO, parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const formatAsDate = (date) => formatISO(date, { representation: 'date' })

const formatString = 'yyyy年MM月dd日(EEEEE)'
const formatTextbox = (date) => format(date, formatString, { locale: ja })

export default {
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
      inputValue: this.stateInputValue,
      menu: false,
      isValid: this.rules.length === 0,
      date: new Date(),
    }
  },
  computed: {
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === symbols.UNRESOLVED ? '' : inputValue
    },
    computedDateFormatted() {
      return this.date ? formatTextbox(this.date) : ''
    },
    dateModel: {
      get() {
        return this.date ? formatAsDate(this.date) : ''
      },
      set(value) {
        this.date = parseISO(value)
      },
    },
  },
  watch: {
    inputValue(inputValue) {
      this.onSubmit(inputValue)
    },
    stateInputValue: {
      immediate: true,
      handler(stateInputValue) {
        if (!this.inputValue) {
          this.inputValue = stateInputValue
        }
      },
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
