<template>
  <v-select
    multiple
    class="upil-multi-select"
    full-width
    hide-details="auto"
    v-model="userInput"
    :items="simpleOptions"
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
  },
  data() {
    return {
      userInput: '',
    }
  },
  computed: {
    hint() {
      return this.localeArgLookup('hint')
    },
    placeholder() {
      return this.localeArgLookup('placeholder') || this.placeholderText
    },
    simpleOptions() {
      return this.options.map(({ text, value: { value, name } }) => ({
        text,
        value: name === undefined ? value : name,
      }))
    },
  },
  methods: {
    getOriginalValues(userInput) {
      return userInput
        .map((i) =>
          this.options.find(
            (o) =>
              (o.value.name === undefined ? o.value.value : o.value.name) === i
          )
        )
        .map((i) => i.value)
    },
    onSubmit() {
      if (this.userInput !== undefined) {
        this.sendInput(this.getOriginalValues(this.userInput))
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
