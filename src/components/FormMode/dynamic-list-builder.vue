<template>
  <v-combobox
    class="upil-dynamic-list px-1"
    :dark="dark"
    full-width
    hide-details
    solo
    v-model="userInput"
    :label="labelOverride"
    :delimiters="[',', '、']"
    small-chips
    multiple
    dense
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
    <template v-if="!immediate" v-slot:append-outer>
      <v-icon :dark="dark" @click="onSubmit">mdi-send</v-icon>
    </template>
  </v-combobox>
</template>

<script>
import widgeti18nMixin from '@/components/widgeti18nMixin'
export default {
  mixins: [widgeti18nMixin],
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
  },
  data() {
    return {
      userInput: [].concat(this.initialValues),
    }
  },
  computed: {
    placeholder() {
      return (
        this.localeArgLookup('placeholder') ||
        'Please enter a comma-separated list'
      )
    },
  },
  watch: {
    userInput() {
      this.$emit('consume', { event: this.node.event, value: this.dateTime })
    },
  },
  methods: {
    onSubmit() {
      if (this.userInput.length > 0) {
        this.sendInput(this.userInput)
      }
    },
  },
}
</script>

<style scoped>
.upil-dynamic-list >>> .v-input__append-inner {
  visibility: hidden;
}
</style>
