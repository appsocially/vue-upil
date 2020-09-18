<template>
  <v-row align="center" no-gutters>
    <v-col cols="auto" class="flex-grow-1">
      <Date
        :upil="upil"
        :node="rawNode"
        :state="state"
        :rules="rules"
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
import Date from '@/components/FormMode/date'
import formmodeWrapperMixin from './formmodeWrapperMixin'

export default {
  mixins: [formmodeWrapperMixin],
  components: {
    Date,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
}
</script>
