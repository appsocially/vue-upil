<template>
  <v-row align="center" class="flex-nowrap" no-gutters>
    <v-col cols="auto" class="flex-grow-1 dynamic-list-wrapper">
      <DynamicListBuilder
        :upil="upil"
        :node="rawNode"
        :state="state"
        :rules="rules"
        :locale="locale"
        :isChatMode="true"
        @consume="onConsume"
      />
    </v-col>
    <v-col cols="auto" class="">
      <v-btn icon :disabled="!canConsume" @click="onSend">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol, VBtn, VIcon } from 'vuetify/lib'
import DynamicListBuilder from '@/components/FormMode/dynamic-list-builder'
import formmodeWrapperMixin from './formmodeWrapperMixin'

export default {
  mixins: [formmodeWrapperMixin],
  components: {
    DynamicListBuilder,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
}
</script>

<style scoped>
.dynamic-list-wrapper {
  max-width: calc(100% - 40px);
}
</style>
