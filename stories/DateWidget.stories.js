import TruffleLogo from './truffle_logo.png'
import { parseISO } from 'date-fns'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import { formatTextbox as formatDateString } from '@/components/FormMode/date/utils'
import { isDate } from 'date-fns'

const transformTextVariables = ({ value, locale }) => {
  if (isDate(value)) {
    return formatDateString(value, locale)
  } else {
    return value
  }
}

const transformReplyVariables = ({
  node: {
    event: { value },
  },
  locale,
}) => {
  if (isDate(value)) {
    return formatDateString(value, locale)
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Date Widget',
  args: { mode: 'FormMode', listeners: {}, locale: 'en' },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    locale: {
      control: {
        type: 'radio',
        options: ['en', 'ja'],
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
        formText: "Birthdate",
        i18n: {
          ja: {
            formText: "お誕生日",
            text: "お誕生日はいつ？"
          }
        }
      }
      "When is your birthday?"
      >>birthday
      /TEMPLATE
      TEMPLATE 
      {
        i18n: {
          ja: {
            text: "\${birthday}はいいお誕生日ですね～"
          }
        }
      }
      "\${birthday} is a great birthday isn't it?"
      /TEMPLATE
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
    template: `<component v-if="upil" :locale="locale" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :transformTextVariables="transformTextVariables" :transformReplyVariables="transformReplyVariables"/>`,
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

export const DateChat = dateTemplate.bind({})
DateChat.args = {
  mode: 'ChatMode',
}

export const DateChatJa = dateTemplate.bind({})
DateChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}
