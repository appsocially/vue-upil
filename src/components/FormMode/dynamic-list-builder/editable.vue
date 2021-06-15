<template>
  <v-card>
    <v-text-field
      hide-details
      v-model="newItemText"
      class="mx-1"
      append-outer-icon="mdi-plus"
      @click:append-outer="addItem"
    />
    <v-list>
      <template v-for="(input, index) in inputValue">
        <v-list-item :key="`listitem-${index}`">
          <v-list-item-content>
            <v-list-item-title>
              <template v-if="editingIndex === index">
                <v-text-field
                  class="mr-1"
                  hide-details
                  solo-inverted
                  v-model="editItemTextField"
                />
              </template>
              <template v-else>
                {{ input }}
              </template>
            </v-list-item-title>
          </v-list-item-content>
          <template v-if="editingIndex === index">
            <v-list-item-action @click="editingIndex = null">
              <v-btn large icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action @click="saveEditItem">
              <v-btn large icon>
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
          <template v-else>
            <v-list-item-action @click="editItem(index)">
              <v-btn large icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action @click="removeItem(index)">
              <v-btn large icon>
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider
          v-if="index < inputValue.length - 1"
          :key="`divider-${index}`"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import {
  VTextField,
  VDivider,
  VCard,
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemAction,
  VIcon,
  VBtn,
} from 'vuetify/lib'
import widgeti18nMixin from '@/components/widgeti18nMixin'

const isNonEmptyString = (input) => (input || '').trim() !== ''

export default {
  mixins: [widgeti18nMixin],
  components: {
    VCard,
    VTextField,
    VDivider,
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
      editItemTextField: '',
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
      if (isNonEmptyString(this.newItemText)) {
        this.editingIndex = null
        if (Array.isArray(this.inputValue)) {
          this.inputValue = [this.newItemText.trim()].concat(this.inputValue)
        } else {
          this.inputValue = [this.newItemText.trim()]
        }
      }
      this.newItemText = ''
    },
    removeItem(index) {
      this.editingIndex = null
      this.inputValue = this.inputValue.filter((_, i) => i !== index)
    },
    editItem(index) {
      this.editItemTextField = this.inputValue[index]
      this.editingIndex = index
    },
    saveEditItem() {
      if (isNonEmptyString(this.editItemTextField)) {
        this.inputValue = this.inputValue.map((item, i) =>
          i === this.editingIndex ? this.editItemTextField.trim() : item
        )
        this.editingIndex = null
      }
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
