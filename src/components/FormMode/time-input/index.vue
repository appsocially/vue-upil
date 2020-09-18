<template>
  <v-row no-gutters class="mx-1" justify="start" align="end">
    <v-col cols="auto">
      <v-select
        class="time-input"
        :placeholder="hoursSelectLabel"
        :items="hoursItems"
        v-model="hoursModel"
        hide-details
        dense
      />
    </v-col>
    <v-col cols="auto" class="mx-1 text-h5">
      {{ unitSeparator }}
    </v-col>
    <v-col cols="auto">
      <v-select
        :disabled="minutesSelectedDisabled"
        class="time-input"
        :placeholder="minutesSelectlabel"
        :items="minutesItems"
        v-model="minutesModel"
        hide-details
        dense
      />
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol, VSelect } from 'vuetify/lib'
import { symbols } from '@appsocially/userpil-core'
import widgeti18nMixin from '@/components/widgeti18nMixin'
import {
  endOfDay,
  startOfDay,
  getHours,
  set,
  eachHourOfInterval,
  isWithinInterval,
} from 'date-fns'

const createDateFromTimeInput = (timeInput, baseDate) => {
  const { hours, minutes } = timeInput || {}
  return Number.isInteger(hours) && Number.isInteger(minutes)
    ? set(baseDate, { hours, minutes })
    : null
}

export default {
  mixins: [widgeti18nMixin],
  components: {
    VRow,
    VCol,
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
    locale: {
      type: String,
    },
  },
  data() {
    return {
      baseDate: startOfDay(new Date()),
      isValid: this.rules.length === 0,
      tempHours: null,
      tempMinutes: null,
      minutesRaw: Array.from(Array(60).keys()),
    }
  },
  computed: {
    hoursItems() {
      return eachHourOfInterval({ start: this.minDate, end: this.maxDate })
        .map((hourDate) => getHours(hourDate))
        .map((i) => ({
          text: `${i}${this.unitHour}`.padStart(2 + this.unitHour.length, 0),
          value: i,
        }))
    },
    minutesItems() {
      return this.minutesRaw
        .filter((i) => {
          const potentialMinuteDate = set(this.baseDate, {
            hours: this.hoursModel,
            minutes: i,
          })
          return isWithinInterval(potentialMinuteDate, {
            start: this.minDate,
            end: this.maxDate,
          })
        })
        .map((i) => ({
          text: `${i}${this.unitMinute}`.padStart(
            2 + this.unitMinute.length,
            0
          ),
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
    minutesSelectedDisabled() {
      return !Number.isInteger(this.hoursModel)
    },
    hoursModel: {
      get() {
        return Number.isInteger(this.tempHours)
          ? this.tempHours
          : this.stateHours
      },
      set(value) {
        this.tempHours = value
        this.checkSubmit()
      },
    },
    minutesModel: {
      get() {
        return Number.isInteger(this.tempMinutes)
          ? this.tempMinutes
          : this.stateMinutes
      },
      set(value) {
        this.tempMinutes = value
        this.checkSubmit()
      },
    },
    stateHours() {
      return this.stateInputValue ? this.stateInputValue.hours : null
    },
    stateMinutes() {
      return this.stateInputValue ? this.stateInputValue.minutes : null
    },
    hoursSelectLabel() {
      return this.localeArgLookup('hoursSelectLabel') || 'hour'
    },
    minutesSelectlabel() {
      return this.localeArgLookup('minutesSelectlabel') || 'minutes'
    },
    unitHour() {
      return this.localeArgLookup('unitHour') || ''
    },
    unitMinute() {
      return this.localeArgLookup('unitMinute') || ''
    },
    unitSeparator() {
      return this.localeArgLookup('unitSeparator') || ':'
    },
    timeInputMax() {
      return (this.node.args || {}).timeInputMax
    },
    timeInputMin() {
      return (this.node.args || {}).timeInputMin
    },
    maxDate() {
      return (
        createDateFromTimeInput(this.timeInputMax, this.baseDate) ||
        endOfDay(this.baseDate)
      )
    },
    minDate() {
      return (
        createDateFromTimeInput(this.timeInputMin, this.baseDate) ||
        startOfDay(this.baseDate)
      )
    },
  },
  watch: {
    stateInputValue: {
      immediate: true,
      handler(stateInputValue) {
        if (stateInputValue) {
          this.resetTempValues()
        }
      },
    },
  },
  methods: {
    checkSubmit() {
      if (
        Number.isInteger(this.hoursModel) &&
        Number.isInteger(this.minutesModel)
      ) {
        this.$emit('consume', {
          event: this.node.event,
          value: { hours: this.hoursModel, minutes: this.minutesModel },
        })
      }
    },
    resetTempValues() {
      this.tempHours = null
      this.tempMinutes = null
    },
  },
}
</script>

<style scoped>
.time-input {
  max-width: 100px;
}
</style>
