import TruffleLogo from './truffle_logo.png'
import { parse } from 'date-fns'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

const padTime = (timeNum) => `${timeNum}`.padStart(2, 0)

const formatTimeInputValue = (timeInputValue) => {
  return `${padTime(timeInputValue.hours)}:${padTime(timeInputValue.minutes)}`
}

const transformTextVariables = ({ value, key, locale }) => {
  if (key === 'meetingsStart' || key === 'meetingsEnd') {
    return formatTimeInputValue(value, locale)
  } else {
    return value
  }
}

const transformReplyVariables = ({
  node: {
    event: { value },
    label,
  },
  locale,
}) => {
  if (label === 'time-input') {
    return formatTimeInputValue(value, locale)
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Time-Input Widget',
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
  DIALOG meetingTime
    TEMPLATE time-input
    {
      formText: "Meetings start time",
      i18n: {
        ja: {
          formText: "ミーティング時間の開始",
          text: "ミーティング時間はいつから始まる？",
          hoursSelectLabel: "何時",
          unitHour: "時",
          minutesSelectlabel: "何分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings start?"
    >>meetingsStart
    /TEMPLATE
    TEMPLATE time-input
    {
      formText: "Meetings end time",
      i18n: {
        ja: {
          formText: "ミーティング時間のお終い",
          text: "ミーティング時間はいつまで続く？",
          hoursSelectLabel: "時間",
          unitHour: "時",
          minutesSelectlabel: "分",
          unitMinute: "分"
        }
      }
    }
    "When do your meetings end?"
    >>meetingsEnd
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "ミーティング時間が\${meetingsStart}から\${meetingsEnd}まではけっこう長いんでしょう～"
        }
      }
    }
    "From \${meetingsStart} to \${meetingsEnd} is a pretty long time don't you think?" 
    /TEMPLATE
  /DIALOG
  RUN meetingTime
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
