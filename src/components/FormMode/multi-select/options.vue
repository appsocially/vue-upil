<template>
  <v-chip-group
    column
    multiple
    v-model="selectValue"
    active-class="primary"
    class="upil-multi-select-options"
  >
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
      set(indexArray) {
        /**
         * Index is undefined if currently selected value is re-selected
         */
        if (Array.isArray(indexArray) && indexArray.length > 0) {
          this.onSubmit(
            indexArray.map((index) => this.node.options[index].value)
          )
        } else {
          this.onSubmit(this.upil.symbols.UNRESOLVED)
        }
      },
      get() {
        const currentState = this.state[this.inputName]
        if (Array.isArray(currentState) && currentState.length > 0) {
          return currentState.map((value) =>
            this.upil.findOptionIndex(this.node.options, value)
          )
        } else {
          return []
        }
      },
    },
  },
  methods: {
    onSubmit(input) {
      return this.upil.consume(this.node.event, input)
    },
  },
}
</script>

<style scoped>
.upil-multi-select-options >>> .v-slide-group__wrapper {
  touch-action: auto !important;
}
</style>
