import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'i18n',
  args: { mode: 'FormMode', locale: 'en', listeners: {} },
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
  },
}

const basicI18nTemplate = (args) => {
  const themeTemplate = `
  DIALOG getName
    TEMPLATE 
      {
        formText: "Name",
        i18n: {
          ja: {
            formText: "名前",
            text: "お名前は？"
          }
        }
      }
      "What's your name?"
      >>name
    /TEMPLATE
    TEMPLATE 
      "Welcome \${name}"
    /TEMPLATE
  /DIALOG
  RUN getName
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `
          <component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :locale="locale" :i18n="i18n"/>
    `,
    data() {
      return {
        upil: null,
        TruffleLogo,
        items: ['en', 'ja'],
        i18n: {
          ja: {
            missingValue: '未記入',
          },
        },
      }
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(themeTemplate, {})
        } else {
          this.upil.startRaw(themeTemplate, {
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

export const EnglishFormMode = basicI18nTemplate.bind({})
EnglishFormMode.args = {
  locale: 'en',
}

export const JapaneseFormMode = basicI18nTemplate.bind({})
JapaneseFormMode.args = {
  locale: 'ja',
}

export const EnglishWizardMode = basicI18nTemplate.bind({})
EnglishWizardMode.args = {
  locale: 'en',
  mode: 'WizardMode',
}

export const JapaneseWizardMode = basicI18nTemplate.bind({})
JapaneseWizardMode.args = {
  locale: 'ja',
  mode: 'WizardMode',
}

export const EnglishChatMode = basicI18nTemplate.bind({})
EnglishChatMode.args = {
  locale: 'en',
  mode: 'ChatMode',
}

export const JapaneseChatMode = basicI18nTemplate.bind({})
JapaneseChatMode.args = {
  locale: 'ja',
  mode: 'ChatMode',
}
