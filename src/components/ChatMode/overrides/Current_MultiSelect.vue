<template>
  <v-select
    multiple
    class="upil-multi-select"
    full-width
    hide-details
    v-model="userInput"
    :items="simpleOptions"
    :label="labelOverride"
    background-color="primary"
    append-outer-icon="mdi-send"
    @click:append-outer="onSubmit"
    dense
  ></v-select>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    sendInput: {
      type: Function,
      required: false
    },
    labelOverride: {
      type: String,
      default: '選んでください'
    }
  },
  data () {
    return {
      userInput: ''
    }
  },
  computed: {
    simpleOptions () {
      return this.options.map(({ text, value: { value, name } }) => ({ text, value: name === undefined ? value : name }))
    }
  },
  methods: {
    getOriginalValues (userInput) {
      return userInput.map(i => this.options.find(o => (o.value.name === undefined ? o.value.value : o.value.name) === i))
        .map(i => i.value)
    },
    onSubmit () {
      if (this.userInput !== undefined) {
        this.sendInput(this.getOriginalValues(this.userInput))
      }
    }
  }
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
