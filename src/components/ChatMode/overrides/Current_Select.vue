<template>
  <v-select
    class="upil-select"
    full-width
    hide-details="auto"
    v-model="userInput"
    :items="items"
    :label="placeholder"
    append-outer-icon="mdi-send"
    @click:append-outer="onSubmit"
    :messages="hint"
    dense
  ></v-select>
</template>

<script>
import { VSelect } from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [widgeti18nMixin],
  components: {
    VSelect,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    sendInput: {
      type: Function,
      required: false,
    },
    placeholderText: {
      type: String,
    },
    upil: {
      type: Object,
    },
  },
  data() {
    return {
      userInput: undefined,
    }
  },
  computed: {
    hint() {
      return this.localeArgLookup('hint')
    },
    placeholder() {
      return this.localeArgLookup('placeholder') || this.placeholderText
    },
    items() {
      return this.options.map(({ text, value }) => ({
        text,
        value: JSON.stringify(value),
      }))
    },
  },
  methods: {
    onSubmit() {
      if (this.userInput !== undefined) {
        this.sendInput(JSON.parse(this.userInput))
      }
    },
  },
}
</script>

<style scoped>
/* .select >>> .v-select__slot > .v-label {
  color: white !important;
}
.select >>> .v-select__selection {
  color: white;
} */
</style>
