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
          hide-details
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
        :locale="locale"
      ></v-date-picker>
    </v-menu>
  </keep-alive>
</template>

<script>
import { VMenu, VTextField, VDatePicker } from 'vuetify/lib'
import { symbols } from '@appsocially/userpil-core'
import { parseISO } from 'date-fns'
import { formatAsDate, formatTextbox } from './utils'

export default {
  components: {
    VMenu,
    VTextField,
    VDatePicker,
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
    locale: {
      type: String,
    },
  },
  data() {
    return {
      menu: false,
      isValid: this.rules.length === 0,
      date: null,
    }
  },
  computed: {
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === symbols.UNRESOLVED ? null : inputValue
    },
    computedDateFormatted() {
      return this.date ? formatTextbox(this.date, this.locale) : ''
    },
    dateModel: {
      get() {
        return this.date ? formatAsDate(this.date) : null
      },
      set(value) {
        this.date = parseISO(value)
      },
    },
  },
  watch: {
    date(date) {
      this.onSubmit(date)
    },
    stateInputValue: {
      immediate: true,
      handler(stateInputValue) {
        if (!this.date) {
          this.date = stateInputValue
        }
      },
    },
  },
  methods: {
    onUpdateError(hasError) {
      this.isValid = !hasError
    },
    onSubmit(date) {
      const submitValue = date ? date : symbols.UNRESOLVED
      this.$emit('consume', { event: this.node.event, value: submitValue })
    },
  },
}
</script>

<style></style>
