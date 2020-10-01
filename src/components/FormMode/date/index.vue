<template>
  <component
    :is="calendarType"
    v-bind="{ ...$props, ...$attrs, ...$listeners }"
  />
</template>

<script>
import widgeti18nMixin from '@/components/widgeti18nMixin'

const calendarTypeMap = {
  calendar: 'CalendarDate',
  numeric: 'NumericDate',
}

export default {
  mixins: [widgeti18nMixin],
  components: {
    CalendarDate: () => import('./calendar-date'),
    NumericDate: () => import('./numeric-date'),
  },
  computed: {
    calendarType() {
      return calendarTypeMap[
        this.localeArgLookup('calendarType') || calendarTypeMap.calendar
      ]
    },
  },
}
</script>

<style></style>
