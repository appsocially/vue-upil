<template>
  <v-card>
    <v-text-field
      v-model="newItemText"
      class="mx-1"
      append-outer-icon="mdi-plus"
      @click:append-outer="addItem"
    ></v-text-field>
    <v-list>
      <template v-for="(input, index) in stateInputValue">
        <v-list-item :key="`listitem-${index}`">
          <v-list-item-content>
            <v-list-item-title>
              {{ input }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn large icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action @click="removeItem(index)">
            <v-btn large icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < stateInputValue.length - 1"
          :key="`divider-${index}`"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import {
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemAction,
  VIcon,
  VBtn,
} from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

export default {
  mixins: [widgeti18nMixin],
  components: {
    VList,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemAction,
    VIcon,
    VBtn,
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
      newItemText: '',
      editingIndex: null,
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
  methods: {
    addItem() {
      const isNonEmptyString =
        this.newItemText !== null && this.newItemText !== ''
      if (isNonEmptyString) {
        if (Array.isArray(this.inputValue)) {
          this.inputValue.push(this.newItemText)
        } else {
          this.inputValue = [this.newItemText]
        }
        this.newItemText = ''
      }
    },
    removeItem(index) {
      this.inputValue.splice(index, 1)
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
