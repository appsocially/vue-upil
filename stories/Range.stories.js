import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

const transformReplyVariables = ({
  node: {
    label,
    event: { value },
    args,
  },
}) => {
  if (label === 'range') {
    const unit = args && args.unit ? args.unit : ''
    return `${value}${unit}`
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Range Widget',
  args: { mode: 'FormMode', min: 10, max: 20, unit: '分', listeners: {} },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    min: {
      control: {
        type: 'number',
        options: {
          min: 0,
          max: 100,
          step: 1,
        },
      },
    },
    max: {
      control: {
        type: 'number',
        options: {
          min: 0,
          max: 100,
          step: 1,
        },
      },
    },
    unit: {
      control: {
        type: 'text',
      },
    },
    listeners: {
      type: 'object',
    },
  },
}

const rangeTemplate = (args) => {
  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :transformTextVariables="transformTextVariables" :transformReplyVariables="transformReplyVariables"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
      }
    },
    computed: {
      rangeTemplate() {
        return `
          DIALOG range
            TEMPLATE range
            {
              formText: "Minutes",
              min: ${this.min ? this.min : '10'},
              max: ${this.max ? this.max : '20'},
              unit: "${this.unit ? this.unit : '分'}"
            }
            "How long did it take?"
            >>minutes
            /TEMPLATE
            TEMPLATE "\${minutes} isn't that long!"
          /DIALOG
          RUN range
          `
      },
      argsSignature() {
        return `${this.mode}-${this.min}-${this.max}-${this.unit}`
      },
      transformTextVariables() {
        return ({ value, key: variableName }) => {
          if (variableName === 'minutes') {
            return `${value}${this.unit}`
          } else {
            return value
          }
        }
      },
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(this.rangeTemplate, {})
        } else {
          this.upil.startRaw(this.rangeTemplate, {
            mode: 'form',
            resetOnInputUpdate: true,
          })
        }
      },
      transformReplyVariables,
    },
    mounted() {
      this.startUpil()
    },
    watch: {
      argsSignature() {
        this.startUpil()
      },
    },
  }
}

export const RangeEmpty = rangeTemplate.bind({})

export const RangePreLoaded = rangeTemplate.bind({})
RangePreLoaded.args = {
  mode: 'FormMode',
  listeners: {
    'preload-input': async () => {
      return {
        minutes: 15,
      }
    },
  },
}
