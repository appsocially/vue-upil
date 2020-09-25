<template>
  <v-row align="center" no-gutters class="upil-range">
    <v-col cols="auto" class="flex-grow-1">
      <Range
        :upil="upil"
        :node="rawNode"
        :state="state"
        :rules="rules"
        :labelOverride="labelOverride"
        :locale="locale"
        @consume="onConsume"
      />
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
import Range from '@/components/FormMode/range'
import formmodeWrapperMixin from './formmodeWrapperMixin'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [formmodeWrapperMixin, widgeti18nMixin],
  components: {
    Range,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
  computed: {
    labelOverride() {
      return this.localeArgLookup('formText') || ''
    },
  },
}
</script>
