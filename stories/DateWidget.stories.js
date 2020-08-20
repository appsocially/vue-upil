import TruffleLogo from './truffle_logo.png'
import { parseISO } from 'date-fns'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import { formatTextbox as formatDateString } from '@/components/FormMode/date/utils'
import { isDate } from 'date-fns'

const transformTextVariables = ({ value, key: variableName }) => {
  if (isDate(value)) {
    return formatDateString(value)
  } else if (variableName === 'minutes') {
    return `${value}分`
  } else {
    return value
  }
}

const transformReplyVariables = ({
  node: {
    label,
    event: { value },
    args,
  },
}) => {
  if (isDate(value)) {
    return formatDateString(value)
  } else if (label === 'range') {
    const unit = args && args.unit ? args.unit : ''
    return `${value}${unit}`
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Date Widget',
  args: { mode: 'FormMode', listeners: {} },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    listeners: {
      type: 'object',
    },
  },
}

const dateTemplate = (args) => {
  const birthdayTemplate = `
    DIALOG birthday
      TEMPLATE date
      {
        formText: "Birthdate"
      }
      "When is your birthday?"
      >>birthday
      /TEMPLATE
      TEMPLATE "\${birthday} is a great birthday isn't it?"
    /DIALOG
    RUN birthday
  `

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
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(birthdayTemplate, {})
        } else {
          this.upil.startRaw(birthdayTemplate, {
            mode: 'form',
            resetOnInputUpdate: true,
          })
        }
      },
      transformTextVariables,
      transformReplyVariables,
    },
    mounted() {
      this.startUpil()
    },
    watch: {
      mode() {
        this.startUpil()
      },
    },
  }
}

export const DateEmpty = dateTemplate.bind({})
// DateFormMode.args = { mode: 'FormMode' }

export const DatePreLoaded = dateTemplate.bind({})
DatePreLoaded.args = {
  mode: 'FormMode',
  listeners: {
    'preload-input': async () => {
      return {
        birthday: parseISO('2001-01-01'),
      }
    },
  },
}
