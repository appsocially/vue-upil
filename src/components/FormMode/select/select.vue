<template>
  <v-select v-model="selectValue" :items="items" :messages="hint" />
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
    node: {
      type: Object,
      required: true,
    },
    upil: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hint(){
      return this.localeArgLookup('hint')
    },
    items() {
      return this.node.options.map(({ text, value }) => ({
        text,
        value: JSON.stringify(value),
      }))
    },
    inputName() {
      return this.node.input.name
    },
    selectValue: {
      set(value) {
        this.onSubmit(value)
      },
      get() {
        const index = this.upil.findOptionIndex(
          this.node.options,
          this.state[this.inputName]
        )
        return this.items[index]
      },
    },
  },
  methods: {
    getOriginalValues() {
      const selectedOption = this.items.find()
      return selectedOption.value
    },
    onSubmit(input) {
      return this.upil.consume(this.node.event, JSON.parse(input))
    },
  },
}
</script>

<style></style>
