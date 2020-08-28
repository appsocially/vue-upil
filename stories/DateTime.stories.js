import TruffleLogo from './truffle_logo.png'
import { parse } from 'date-fns'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import { formatTextbox as formatDateTimeString } from '@/components/FormMode/date-time/utils'
import { isDate } from 'date-fns'

const transformTextVariables = ({ value, locale }) => {
  if (isDate(value)) {
    return formatDateTimeString(value, locale)
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
    return formatDateTimeString(value, locale)
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Date-Time Widget',
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

const dateTimeTemplate = (args) => {
  const birthdayTemplate = `
  DIALOG partySelector
    TEMPLATE date-time
    {
      formText: "Birthday party",
      i18n: {
        ja: {
          formText: "お誕生日パーティー",
          text: "お誕生日パーティーはいつ？",
          labelCancel: "キャンセル",
          hoursSelectLabel: "何時",
          minutesSelectlabel: "何分",
          unitHour: "時",
          unitMinute: "分"
        }
      }
    }
    "When is your birthday party?"
    >>partyDateTime
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "\${partyDateTime}はいいお誕生日パーティーの時間ですね～"
        }
      }
    }
    "\${partyDateTime} is a great time for a birthday party isn't it?"
    /TEMPLATE
  /DIALOG
  RUN partySelector
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

export const DateTimeEmpty = dateTimeTemplate.bind({})
// DateFormMode.args = { mode: 'FormMode' }

export const DateTimePreLoaded = dateTimeTemplate.bind({})
DateTimePreLoaded.args = {
  mode: 'FormMode',
  listeners: {
    'preload-input': async () => {
      return {
        partyDateTime: parse('2019-08-05:15:5', 'yyyy-MM-dd:H:m', new Date()),
      }
    },
  },
}

export const DateTimeChat = dateTimeTemplate.bind({})
DateTimeChat.args = {
  mode: 'ChatMode',
}

export const DateTimeChatJa = dateTimeTemplate.bind({})
DateTimeChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}
