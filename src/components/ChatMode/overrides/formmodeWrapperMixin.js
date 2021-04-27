const formmodeWrapperMixin = {
  props: {
    rawNode: {
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
      inputValue: null,
      event: null,
    }
  },
  computed: {
    canConsume() {
      return this.hasValue && this.event
    },
    hasValue() {
      return (
        this.inputValue !== null &&
        this.inputValue !== undefined &&
        this.inputValue !== this.upil.symbols.UNRESOLVED
      )
    },
  },
  methods: {
    onConsume({ event, value }) {
      this.inputValue = value
      this.event = event
    },
    onSend() {
      this.$emit('consume', { event: this.event, value: this.inputValue })
    },
  },
}

export default formmodeWrapperMixin
