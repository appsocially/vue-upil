<template>
  <v-select
    class="upil-select"
    full-width
    hide-details
    v-model="userInput"
    :items="items"
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
    },
    upil: {
      type: Object
    }
  },
  data () {
    return {
      userInput: undefined
    }
  },
  computed: {
    items () {
      return this.options.map(({ text, value }) => ({ text, value: JSON.stringify(value) }))
    }
  },
  methods: {
    onSubmit () {
      if (this.userInput !== undefined) {
        this.sendInput(JSON.parse(this.userInput))
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
