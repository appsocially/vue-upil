<template>
  <v-row align="center" no-gutters>
    <v-col cols="auto" class="flex-grow-1">
      <Date
        :node="rawNode"
        :state="state"
        :rules="rules"
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
import { symbols } from '@appsocially/userpil-core'

export default {
  components: {
    Date,
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
