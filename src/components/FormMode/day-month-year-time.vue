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
      <div>
        <v-row no-gutters>
          <v-col cols="12">
            <v-date-picker
              v-model="dateModel"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mx-1"
          justify="space-around"
          v-if="timeEnabled"
        >
          <v-col cols="5">
            <v-select placeholder="何時" :items="hoursItems" v-model="hours" />
          </v-col>
          <v-col cols="5">
            <v-select
              placeholder="何分"
              :items="minutesItems"
              v-model="minutes"
            />
          </v-col>
        </v-row>
      </div>
    </v-menu>
  </keep-alive>
</template>

<script>
import { symbols } from '@appsocially/userpil-core'
import { formatISO, parseISO, parse, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

const formatAsDate = (date) => formatISO(date, { representation: 'date' })

const formatStringDateOnly = 'yyyy年MM月dd日(EEEEE)'
const formatStringDateTime = 'yyyy年MM月dd日(EEEEE) @ HH:mm'
const formatTextbox = (date, timeEnabled = false) =>
  format(date, timeEnabled ? formatStringDateTime : formatStringDateOnly, {
    locale: ja,
  })

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
      menu: false,
      isValid: this.rules.length === 0,
      date: null,
      hours: null,
      minutes: null,
      hoursRaw: Array.from(Array(24).keys()),
      minutesRaw: Array.from(Array(60).keys()),
    }
  },
  computed: {
    timeEnabled() {
      return this.node && this.node.args && this.node.args.time
    },
    hoursItems() {
      return this.hoursRaw.map((i) => ({
        text: `${i}時`.padStart(3, 0),
        value: i,
      }))
    },
    minutesItems() {
      return this.minutesRaw.map((i) => ({
        text: `${i}分`.padStart(3, 0),
        value: i,
      }))
    },
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === symbols.UNRESOLVED ? null : inputValue
    },
    computedDateFormatted() {
      return this.dateTime ? formatTextbox(this.dateTime, this.timeEnabled) : ''
    },
    dateModel: {
      get() {
        return this.date ? formatAsDate(this.date) : null
      },
      set(value) {
        this.date = parseISO(value)
      },
    },
    dateTimeString() {
      const hasDateTime =
        this.date && this.hours !== null && this.minutes !== null
      if (hasDateTime) {
        const hoursPadded = `${this.hours}`.padStart(2, 0)
        const minutesPadded = `${this.minutes}`.padStart(2, 0)
        return hasDateTime
          ? `${this.dateModel}:${hoursPadded}:${minutesPadded}`
          : null
      } else {
        return null
      }
    },
    dateTime() {
      return this.dateTimeString
        ? parse(this.dateTimeString, 'yyyy-MM-dd:HH:mm', new Date())
        : null
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
      this.upil.consume(this.node.event, submitValue)
    },
  },
}
</script>

<style></style>
