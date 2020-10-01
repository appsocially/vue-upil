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
  args: {
    mode: 'FormMode',
    listeners: {},
    locale: 'en',
    calendarType: 'calendar',
  },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    calendarType: {
      control: {
        type: 'radio',
        options: ['calendar', 'numeric'],
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
  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :i18n="i18n" :locale="locale" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :transformTextVariables="transformTextVariables" :transformReplyVariables="transformReplyVariables"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
        i18n: {
          ja: {
            missingValue: '未記入',
          },
        },
      }
    },
    computed: {
      birthdayTemplate() {
        return `
        DIALOG birthday
          TEMPLATE date
          {
            formText: "Birthdate",
            calendarType: "${this.calendarType}",
            i18n: {
              en: {
                yearSelectLabel: "year",
                monthSelectLabel: "month",
                daySelectLabel: "day"
              },
              ja: {
                formText: "お誕生日",
                text: "お誕生日はいつ？",
                unitYear: "年",
                unitMonth: "月",
                unitDay: "日",
                yearSelectPlaceholder: "何年",
                monthSelectPlaceholder: "何月",
                daySelectPlaceholder: "何日"
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
      },
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(this.birthdayTemplate, {})
        } else {
          this.upil.startRaw(this.birthdayTemplate, {
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
      birthdayTemplate() {
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

export const DateNumericForm = dateTemplate.bind({})
DateNumericForm.args = {
  calendarType: 'numeric',
}

export const DateNumericFormJa = dateTemplate.bind({})
DateNumericFormJa.args = {
  calendarType: 'numeric',
  locale: 'ja',
}

export const DateNumericChat = dateTemplate.bind({})
DateNumericChat.args = {
  mode: 'ChatMode',
  calendarType: 'numeric',
}

export const DateNumericChatJa = dateTemplate.bind({})
DateNumericChatJa.args = {
  mode: 'ChatMode',
  calendarType: 'numeric',
  locale: 'ja',
}
