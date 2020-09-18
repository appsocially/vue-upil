<template>
  <v-row justify="end" align="center" no-gutters class="upil-time-input">
    <v-col cols="auto" class="flex-grow-1">
      <v-sheet class="pa-2 time-input-sheet">
        <v-row no-gutters>
          <v-col cols="auto" class="flex-grow-1" />
          <v-col cols="auto">
            <TimeInput
              :upil="upil"
              :node="rawNode"
              :state="state"
              :rules="rules"
              :locale="locale"
              @consume="onConsume"
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
import { VRow, VSheet, VCol, VBtn, VIcon } from 'vuetify/lib'
import TimeInput from '@/components/FormMode/time-input'
import formmodeWrapperMixin from './formmodeWrapperMixin'

export default {
  mixins: [formmodeWrapperMixin],
  components: {
    TimeInput,
    VRow,
    VSheet,
    VCol,
    VBtn,
    VIcon,
  },
}
</script>
