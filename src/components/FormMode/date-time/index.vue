<template>
  <keep-alive>
    <v-menu
      id="menu"
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="false"
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
      <v-sheet>
        <div>
          <v-row no-gutters>
            <v-col cols="12">
              <v-date-picker
                v-model="tempDateModel"
                :locale="locale"
                no-title
              ></v-date-picker>
            </v-col>
          </v-row>
          <v-row no-gutters class="mx-1" justify="space-around">
            <v-col cols="5">
              <v-select
                placeholder="何時"
                :items="hoursItems"
                v-model="tempHoursModel"
              />
            </v-col>
            <v-col cols="5">
              <v-select
                placeholder="何分"
                :items="minutesItems"
                v-model="tempMinutesModel"
              />
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row dense class="mx-1" justify="end">
            <v-col cols="auto">
              <v-btn text @click="onCancel">キャンセル</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn color="primary" @click="onSubmit" :disabled="!dateTime"
                >OK</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-menu>
  </keep-alive>
</template>

<script>
import {
  VMenu,
  VTextField,
  VDatePicker,
  VRow,
  VCol,
  VBtn,
  VSelect,
  VSheet,
} from 'vuetify/lib'
import { symbols } from '@appsocially/userpil-core'
import { parseISO, parse, getHours, getMinutes } from 'date-fns'
import { formatAsDate, formatTextbox } from './utils'

export default {
  components: {
    VMenu,
    VTextField,
    VDatePicker,
    VRow,
    VCol,
    VBtn,
    VSelect,
    VSheet,
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
      tempDate: null,
      tempHours: null,
      tempMinutes: null,
      hoursRaw: Array.from(Array(24).keys()),
      minutesRaw: Array.from(Array(60).keys()),
    }
  },
  computed: {
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
      return this.dateTime ? formatTextbox(this.dateTime, this.locale) : ''
    },
    tempDateModel: {
      get() {
        return this.tempDate ? formatAsDate(this.tempDate) : this.stateDate
      },
      set(value) {
        this.tempDate = parseISO(value)
      },
    },
    tempHoursModel: {
      get() {
        return this.tempHours ? this.tempHours : this.stateHours
      },
      set(value) {
        this.tempHours = value
      },
    },
    tempMinutesModel: {
      get() {
        return this.tempMinutes ? this.tempMinutes : this.stateMinutes
      },
      set(value) {
        this.tempMinutes = value
      },
    },
    stateDate() {
      return !this.stateInputValue ||
        this.stateInputValue === symbols.UNRESOLVED
        ? null
        : formatAsDate(this.stateInputValue)
    },
    stateHours() {
      return !this.stateInputValue ||
        this.stateInputValue === symbols.UNRESOLVED
        ? null
        : getHours(this.stateInputValue)
    },
    stateMinutes() {
      return !this.stateInputValue ||
        this.stateInputValue === symbols.UNRESOLVED
        ? null
        : getMinutes(this.stateInputValue)
    },
    dateTimeString() {
      const hasDateTime =
        this.tempDateModel &&
        this.tempHoursModel !== null &&
        this.tempMinutesModel !== null
      if (hasDateTime) {
        return hasDateTime
          ? `${this.tempDateModel}:${this.tempHoursModel}:${this.tempMinutesModel}`
          : null
      } else {
        return null
      }
    },
    dateTime() {
      return this.dateTimeString
        ? parse(this.dateTimeString, 'yyyy-MM-dd:k:m', new Date())
        : null
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
      if (this.dateTime) {
        this.$emit('consume', { event: this.node.event, value: this.dateTime })
        this.menu = false
      }
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
