import debounce from 'lodash.debounce'

export default {
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
  data() {
    return {
      inputValue: this.stateInputValue,
      waitingOnIme: false,
      onSubmit: debounce(function (input) {
        if (this.isValid && !this.waitingOnIme) {
          const trimmedInput = (input || '').trim()
          const finalInput =
            !trimmedInput || trimmedInput === ''
              ? this.upil.symbols.UNRESOLVED
              : trimmedInput
          if (finalInput !== this.stateInputValue) {
            return this.upil.consume(this.node.event, finalInput)
          }
        }
      }, 100),
    }
  },
  computed: {
    inputName() {
      return this.node.input.name
    },
    stateInputValue() {
      const inputValue = this.state[this.inputName]
      return inputValue === this.upil.symbols.UNRESOLVED ? '' : inputValue
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
  },
  methods: {
    compositionEnded() {
      this.waitingOnIme = false
      this.onSubmit(this.inputValue)
    },
  },
}
