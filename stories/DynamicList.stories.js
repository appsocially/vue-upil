import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'Dynamic-list Widget',
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
  DIALOG jobsSearch
    TEMPLATE dynamic-list
    {
      formText: "Job Openings",
      i18n: {
        ja: {
          formText: "募集中の職種",
          text: "今回募集する職種を教えてください。",
          placeholder: "カンマで区切ると選択肢が出来上がります"
        }
      }
    }
    "Please list your available job types"
    >>jobTypes
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "\${jobTypes}を見つけたらいいね！"
        }
      }
    }
    "I hope you find success in your search for \${jobTypes}!"
    /TEMPLATE
  /DIALOG
  RUN jobsSearch
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :locale="locale" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" />`,
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

// export const DateTimePreLoaded = dateTimeTemplate.bind({})
// DateTimePreLoaded.args = {
//   mode: 'FormMode',
//   listeners: {
//     'preload-input': async () => {
//       return {
//         partyDateTime: parse('2019-08-05:15:5', 'yyyy-MM-dd:H:m', new Date()),
//       }
//     },
//   },
// }

export const DateTimeChat = dateTimeTemplate.bind({})
DateTimeChat.args = {
  mode: 'ChatMode',
}

export const DateTimeChatJa = dateTimeTemplate.bind({})
DateTimeChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}
