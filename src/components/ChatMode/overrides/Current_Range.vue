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

export default {
  mixins: [formmodeWrapperMixin],
  components: {
    Range,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
  computed: {
    labelOverride() {
      const i18nRoot = this.rawNode.args && this.rawNode.args.i18n
      const localeKeys = i18nRoot ? i18nRoot[this.locale] : null
      if (localeKeys && localeKeys.formText) {
        return localeKeys.formText
      } else {
        return this.rawNode && this.rawNode.args && this.rawNode.args.formText
          ? this.rawNode.args.formText
          : ''
      }
    },
  },
}
</script>
