<template>
  <v-combobox
    class="upil-dynamic-list px-1"
    full-width
    hide-details
    solo
    v-model="inputValue"
    :label="placeholder"
    :delimiters="[',', '、']"
    small-chips
    multiple
    dense
    autofocus
    ref="input"
  >
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        class="dynamic-list-builder-chip"
        v-bind="attrs"
        :input-value="selected"
        label
        small
      >
        <span class="pr-2">{{ item }}</span>
        <v-icon small @click="parent.selectItem(item)">mdi-close</v-icon>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { VCombobox, VChip, VIcon } from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [widgeti18nMixin],
  components: {
    VCombobox,
    VChip,
    VIcon,
  },
  props: {
    node: {
      type: Object,
      required: true,
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
    upil: {
      type: Object,
    },
  },
  data() {
    return {
      inputValue: this.stateInputValue,
    }
  },
  computed: {
    placeholder() {
      return (
        this.localeArgLookup('placeholder') ||
        'Please enter a comma-separated list'
      )
    },
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === this.upil.symbols.UNRESOLVED ? [] : inputValue
    },
  },
  watch: {
    stateInputValue: {
      immediate: true,
      handler(stateInputValue) {
        if (!this.inputValue) {
          this.inputValue = stateInputValue
        }
      },
    },
    inputValue(inputValue) {
      const value =
        !inputValue || inputValue.length === 0
          ? this.upil.symbols.UNRESOLVED
          : inputValue
      this.$emit('consume', { event: this.node.event, value })
    },
  },
}
</script>

<style scoped>
.upil-dynamic-list >>> .v-input__append-inner {
  visibility: hidden;
}

.upil-dynamic-list .dynamic-list-builder-chip {
  margin: 2px;
}
</style>
