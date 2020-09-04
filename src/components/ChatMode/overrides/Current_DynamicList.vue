<template>
  <v-row align="center" class="flex-nowrap" no-gutters>
    <v-col cols="auto" class="flex-grow-1 dynamic-list-wrapper">
      <DynamicListBuilder
        :node="rawNode"
        :state="state"
        :rules="rules"
        :locale="locale"
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
import { symbols } from '@appsocially/userpil-core'

export default {
  components: {
    DynamicListBuilder,
    VRow,
    VCol,
    VBtn,
    VIcon,
  },
  props: {
    rawNode: {
      type: Object,
      required: true,
    },
    upil: {
      type: Object,
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
  },
  data() {
    return {
      inputValue: null,
      event: null,
    }
  },
  computed: {
    canConsume() {
      return this.hasValue && this.event
    },
    hasValue() {
      return this.inputValue && this.inputValue !== symbols.UNRESOLVED
    },
  },
  methods: {
    onConsume({ event, value }) {
      this.inputValue = value
      this.event = event
    },
    onSend() {
      this.$emit('consume', { event: this.event, value: this.inputValue })
    },
  },
}
</script>

<style scoped>
.dynamic-list-wrapper {
  max-width: calc(100% - 40px);
}
</style>
