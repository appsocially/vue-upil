import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

const calculateUnit = (locale) => {
  switch (locale) {
    case 'ja':
      return '分'
    default:
      return ' minutes'
  }
}

const transformReplyVariables = ({
  node: {
    label,
    event: { value },
  },
  locale,
}) => {
  if (label === 'range') {
    const unit = calculateUnit(locale)
    return `${value}${unit}`
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Range Widget',
  args: {
    locale: 'en',
    mode: 'FormMode',
    min: 10,
    max: 20,
    step: 1,
    unit: ' minutes',
    listeners: {},
  },
  argTypes: {
    locale: {
      control: {
        type: 'radio',
        options: ['en', 'ja'],
      },
    },
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
    step: {
      control: {
        type: 'number',
        options: {
          min: 1,
          max: 100,
          step: 0.1,
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
    defaultValue: {
      type: 'string',
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
    template: `<component v-if="upil" :locale="locale" :i18n="i18n" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :transformTextVariables="transformTextVariables" :transformReplyVariables="transformReplyVariables"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
        i18n: {
          ja: {
            missingValue: '未記入',
            templateInputPlaceholder: '入力してください',
            selectInputPlaceholder: '選んでください',
            multiSelectInputPlaceholder: '選んでください',
          },
        },
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
              ${this.defaultValue ? `default: ${this.defaultValue},` : ''}
              step: ${this.step},
              unit: "${this.unit}",
              i18n: {
                ja: {
                  text: "何分掛かった？",
                  formText: "時間（分）",
                  unit: "分"
                }
              }
            }
            "How long did it take?"
            >>minutes
            /TEMPLATE
            TEMPLATE 
            {
              i18n: {
                ja: {
                  text: "\${minutes}はそんなに長くない！"
                }
              }
            }
            "\${minutes} isn't that long!"
            /TEMPLATE
          /DIALOG
          RUN range
          `
      },
      argsSignature() {
        return `${this.mode}-${this.min}-${this.max}-${this.unit}-${this.step}`
      },
      transformTextVariables() {
        return ({ value, key: variableName, locale }) => {
          if (variableName === 'minutes') {
            const unit = calculateUnit(locale)
            return `${value}${unit}`
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
export const RangeDefault = rangeTemplate.bind({})
RangeDefault.args = {
  defaultValue: 20,
}

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

export const RangeChat = rangeTemplate.bind({})
RangeChat.args = {
  mode: 'ChatMode',
}

export const RangeChatDefault = rangeTemplate.bind({})
RangeChatDefault.args = {
  mode: 'ChatMode',
  defaultValue: 20,
}

export const RangeChatJa = rangeTemplate.bind({})
RangeChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}

export const RangeStep = rangeTemplate.bind({})
RangeStep.args = {
  mode: 'FormMode',
  step: 0.1,
}
