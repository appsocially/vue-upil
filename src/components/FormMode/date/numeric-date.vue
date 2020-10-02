<template>
  <v-row no-gutters class="mx-1" justify="start" align="end">
    <v-col cols="auto">
      <v-select
        :filled="!reduceHeight"
        class="date-part-input"
        :label="yearSelectLabel"
        :placeholder="yearSelectPlaceholder"
        :items="yearsItems"
        v-model="yearsModel"
        hide-details
        dense
      />
    </v-col>
    <v-col cols="auto" class="mx-3 text-h5">
      {{ unitSeparator }}
    </v-col>
    <v-col cols="auto">
      <v-select
        :filled="!reduceHeight"
        :disabled="monthsSelectedDisabled"
        class="date-part-input"
        :label="monthSelectLabel"
        :placeholder="monthSelectPlaceholder"
        :items="monthsItems"
        v-model="monthsModel"
        hide-details
        dense
      />
    </v-col>
    <v-col cols="auto" class="mx-3 text-h5">
      {{ unitSeparator }}
    </v-col>
    <v-col cols="auto">
      <v-select
        :filled="!reduceHeight"
        :disabled="daysSelectedDisabled"
        class="date-part-input"
        :label="daySelectLabel"
        :placeholder="daySelectPlaceholder"
        :items="daysItems"
        v-model="daysModel"
        hide-details
        dense
      />
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol, VSelect } from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'
import {
  isEqual,
  endOfYear,
  startOfYear,
  startOfMonth,
  startOfDay,
  endOfMonth,
  getYear,
  getMonth,
  getDate,
  set,
  sub,
  parseISO,
  eachYearOfInterval,
  eachMonthOfInterval,
  eachDayOfInterval,
  min,
  max,
} from 'date-fns'

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
    upil: {
      type: Object,
    },
    reduceHeight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      baseDate: startOfDay(new Date()),
      isValid: this.rules.length === 0,
      tempYears: null,
      tempMonths: null,
      tempDays: null,
    }
  },
  computed: {
    isValidDateSelected() {
      return (
        Number.isInteger(this.yearsModel) &&
        Number.isInteger(this.monthsModel) &&
        Number.isInteger(this.daysModel) &&
        this.yearsItems.map((item) => item.value).includes(this.yearsModel) &&
        this.monthsItems.map((item) => item.value).includes(this.monthsModel) &&
        this.daysItems.map((item) => item.value).includes(this.daysModel)
      )
    },
    currentSetDate() {
      return set(this.baseDate, {
        year: this.yearsModel,
        month: this.monthsModel,
        date: this.daysModel,
      })
    },
    yearsItems() {
      return eachYearOfInterval({ start: this.minDate, end: this.maxDate })
        .map(getYear)
        .map((i) => ({
          text: `${i}${this.unitYear}`,
          value: i,
        }))
        .reverse()
    },
    monthsItems() {
      if (!this.monthsSelectedDisabled) {
        const minMonthThisYear = max([
          this.minDate,
          startOfYear(this.currentSetDate),
        ])
        const maxMonthThisYear = min([
          this.maxDate,
          endOfYear(this.currentSetDate),
        ])
        return eachMonthOfInterval({
          start: minMonthThisYear,
          end: maxMonthThisYear,
        })
          .map(getMonth)
          .map((i) => ({
            text: `${i + 1}${this.unitMonth}`.padStart(
              2 + this.unitMonth.length,
              0
            ),
            value: i,
          }))
      } else {
        return []
      }
    },
    daysItems() {
      if (!this.daysSelectedDisabled) {
        const minDayThisMonth = max([
          this.minDate,
          min([startOfMonth(this.currentSetDate), this.maxDate]),
        ])
        const maxDayThisMonth = min([
          this.maxDate,
          max([endOfMonth(this.currentSetDate), this.minDate]),
        ])
        return eachDayOfInterval({
          start: minDayThisMonth,
          end: maxDayThisMonth,
        })
          .map(getDate)
          .map((i) => ({
            text: `${i}${this.unitDay}`.padStart(2 + this.unitDay.length, 0),
            value: i,
          }))
      } else {
        return []
      }
    },
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === this.upil.symbols.UNRESOLVED ? null : inputValue
    },
    monthsSelectedDisabled() {
      return !Number.isInteger(this.yearsModel)
    },
    daysSelectedDisabled() {
      return !Number.isInteger(this.monthsModel)
    },
    yearsModel: {
      get() {
        return Number.isInteger(this.tempYears)
          ? this.tempYears
          : this.stateYears
      },
      set(value) {
        this.tempYears = value
      },
    },
    monthsModel: {
      get() {
        return Number.isInteger(this.tempMonths)
          ? this.tempMonths
          : this.stateMonths
      },
      set(value) {
        this.tempMonths = value
      },
    },
    daysModel: {
      get() {
        return Number.isInteger(this.tempDays) ? this.tempDays : this.stateDays
      },
      set(value) {
        this.tempDays = value
      },
    },
    stateYears() {
      return this.stateInputValue ? getYear(this.stateInputValue) : null
    },
    stateMonths() {
      return this.stateInputValue ? getMonth(this.stateInputValue) : null
    },
    stateDays() {
      return this.stateInputValue ? getDate(this.stateInputValue) : null
    },
    yearSelectLabel() {
      return this.localeArgLookup('yearSelectLabel') || ''
    },
    monthSelectLabel() {
      return this.localeArgLookup('monthSelectLabel') || ''
    },
    daySelectLabel() {
      return this.localeArgLookup('daySelectLabel') || ''
    },
    yearSelectPlaceholder() {
      return this.localeArgLookup('yearSelectPlaceholder') || ''
    },
    monthSelectPlaceholder() {
      return this.localeArgLookup('monthSelectPlaceholder') || ''
    },
    daySelectPlaceholder() {
      return this.localeArgLookup('daySelectPlaceholder') || ''
    },
    unitYear() {
      return this.localeArgLookup('unitYear') || ''
    },
    unitMonth() {
      return this.localeArgLookup('unitMonth') || ''
    },
    unitDay() {
      return this.localeArgLookup('unitDay') || ''
    },
    unitSeparator() {
      return this.localeArgLookup('unitSeparator') || ''
    },
    maxDate() {
      return this.localeArgLookup('maxDate')
        ? parseISO(this.localeArgLookup('maxDate'))
        : this.baseDate
    },
    minDate() {
      return this.localeArgLookup('minDate')
        ? parseISO(this.localeArgLookup('minDate'))
        : sub(this.baseDate, { years: 150 })
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
    currentSetDate(currentSetDate, oldSetDate) {
      /**
       * Only submit if the dates aren't equal
       */
      const changedFromNoDateToDate = currentSetDate && !oldSetDate
      const bothDatesButNotEqual =
        currentSetDate && oldSetDate && !isEqual(currentSetDate, oldSetDate)
      const shouldSubmit = changedFromNoDateToDate || bothDatesButNotEqual
      if (shouldSubmit) {
        this.submit()
      }
    },
  },
  methods: {
    submit() {
      if (this.isValidDateSelected) {
        this.$emit('consume', {
          event: this.node.event,
          value: this.currentSetDate,
        })
      }
    },
    resetTempValues() {
      this.tempYears = null
      this.tempMonths = null
      this.tempDays = null
    },
  },
}
</script>

<style scoped>
.date-part-input {
  max-width: 150px;
}
</style>
