<template>
  <v-chip-group column v-model="selectValue" active-class="primary" class="upil-select-options">
    <v-chip v-for="{ text, value } in items" :key="value">{{ text }}</v-chip>
  </v-chip-group>
</template>

<script>
import { VChipGroup, VChip } from 'vuetify/lib'

export default {
  components: {
    VChipGroup,
    VChip,
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
      set(index) {
        /**
         * Index is undefined if currently selected value is re-selected
         */
        if (index !== undefined) {
          this.onSubmit(this.node.options[index].value)
        } else {
          this.onSubmit(this.upil.symbols.UNRESOLVED)
        }
      },
      get() {
        const index = this.upil.findOptionIndex(
          this.node.options,
          this.state[this.inputName]
        )
        return index
      },
    },
  },
  methods: {
    getOriginalValues() {
      const selectedOption = this.items.find()
      return selectedOption.value
    },
    onSubmit(input) {
      return this.upil.consume(this.node.event, input)
    },
  },
}
</script>

<style scoped>
.upil-select-options >>> .v-slide-group__wrapper {
  touch-action: auto !important;
}
</style>
