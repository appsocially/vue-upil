<template>
  <v-row no-gutters class="mx-1" justify="start" align="end">
    <v-col cols="auto">
      <v-select
        class="date-part-input"
        :placeholder="yearsSelectLabel"
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
        :disabled="monthsSelectedDisabled"
        class="date-part-input"
        :placeholder="monthsSelectlabel"
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
        :disabled="daysSelectedDisabled"
        class="date-part-input"
        :placeholder="daysSelectlabel"
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
  endOfYear,
  startOfYear,
  startOfMonth,
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
  },
  data() {
    return {
      baseDate: new Date(),
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
        Number.isInteger(this.daysModel)
      )
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
        const dateWithYear = set(this.baseDate, { year: this.yearsModel })
        const minMonthThisYear = max([this.minDate, startOfYear(dateWithYear)])
        const maxMonthThisYear = min([this.maxDate, endOfYear(dateWithYear)])
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
        const dateWithYearMonth = set(this.baseDate, {
          year: this.yearsModel,
          month: this.monthsModel,
        })
        const minDayThisMonth = max([
          this.minDate,
          startOfMonth(dateWithYearMonth),
        ])
        const maxDayThisMonth = min([
          this.maxDate,
          endOfMonth(dateWithYearMonth),
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
      return this.stateInputValue ? this.stateInputValue.years : null
    },
    stateMonths() {
      return this.stateInputValue ? this.stateInputValue.months : null
    },
    stateDays() {
      return this.stateInputValue ? this.stateInputValue.days : null
    },
    yearsSelectLabel() {
      return this.localeArgLookup('yearsSelectLabel') || 'year'
    },
    monthsSelectlabel() {
      return this.localeArgLookup('monthsSelectlabel') || 'months'
    },
    daysSelectlabel() {
      return this.localeArgLookup('daysSelectlabel') || 'days'
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
    isValidDateSelected(isValidDateSelected) {
      if (isValidDateSelected) {
        this.submit()
      }
    },
  },
  methods: {
    submit() {
      this.$emit('consume', {
        event: this.node.event,
        value: {
          years: this.yearsModel,
          months: this.monthsModel,
          days: this.daysModel,
        },
      })
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
  max-width: 100px;
}
</style>
