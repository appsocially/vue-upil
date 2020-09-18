<template>
  <v-row align="center" no-gutters>
    <v-col cols="auto" class="flex-grow-1">
      <DateTime
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
import DateTime from '@/components/FormMode/date-time'
import formmodeWrapperMixin from './formmodeWrapperMixin'

export default {
  mixins: [formmodeWrapperMixin],
  components: {
    DateTime,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
}
</script>
