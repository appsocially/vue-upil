<template>
  <v-row align="center" no-gutters>
    <v-col cols="auto" class="flex-grow-1">
      <v-sheet class="pa-2 time-input-sheet">
        <v-row no-gutters>
          <v-col cols="auto" class="flex-grow-1" v-if="isNumeric" />
          <v-col cols="auto" :class="{ 'flex-grow-1': isCalendar }">
            <Date
              :upil="upil"
              :node="rawNode"
              :state="state"
              :rules="rules"
              :locale="locale"
              @consume="onConsume"
              reduceHeight
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="auto" class="flex-shrink-1">
      <v-btn icon :disabled="!canConsume" @click="onSend">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol, VBtn, VIcon } from 'vuetify/lib'
import Date from '@/components/FormMode/date'
import formmodeWrapperMixin from './formmodeWrapperMixin'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [formmodeWrapperMixin, widgeti18nMixin],
  components: {
    Date,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
  computed: {
    calendarType() {
      return this.localeArgLookup('calendarType') || 'calendar'
    },
    isCalendar() {
      return this.calendarType === 'calendar'
    },
    isNumeric() {
      return this.calendarType === 'numeric'
    },
  },
}
</script>
