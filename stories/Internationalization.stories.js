import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'

export default {
  title: 'i18n',
  args: {
    mode: 'FormMode',
    locale: 'en',
    upilScript: `
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
    `,
  },
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
            templateInputPlaceholder: '入力してください',
            selectInputPlaceholder: '選んでください',
            multiSelectInputPlaceholder: '選んでください',
          },
        },
      }
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(this.upilScript, {})
        } else {
          this.upil.startRaw(this.upilScript, {
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

export const EnglishChatModeSelect = basicI18nTemplate.bind({})
EnglishChatModeSelect.args = {
  locale: 'en',
  mode: 'ChatMode',
  upilScript: `
  DIALOG favColor
    SELECT
      {
        formText: "Favorite Color",
        i18n: {
          ja: {
            formText: "一番好きな色",
            text: "一番好きな色を選んでください",
            options: {
              red: "赤",
              blue: "青",
              green: "緑"
            }
          }
        }
      }
      "Please choose your favorite color"
      -("Red", "red")
      -("Blue", "blue")
      -("Green", "green")
      >>color
    /SELECT
    TEMPLATE "\${color} is a great color!"
  /DIALOG
  RUN favColor
  `,
}

export const JapaneseChatModeSelect = basicI18nTemplate.bind({})
JapaneseChatModeSelect.args = {
  ...EnglishChatModeSelect.args,
  locale: 'ja',
}

export const EnglishChatModeMultiSelect = basicI18nTemplate.bind({})
EnglishChatModeMultiSelect.args = {
  locale: 'en',
  mode: 'ChatMode',
  upilScript: `
  DIALOG favColors
    MULTI_SELECT
      {
        formText: "Favorite Colors",
        i18n: {
          ja: {
            formText: "一番好きな色",
            text: "一番好きな色を選んでください",
            options: {
              red: "赤",
              blue: "青",
              green: "緑"
            }
          }
        }
      }
      "Please tell us your favorite colors!"
      -("Red", "red")
      -("Blue", "blue")
      -("Green", "green")
      >>color
    /MULTI_SELECT
    TEMPLATE "Those are great colors!"
  /DIALOG
  RUN favColors
  `,
}

export const JapaneseChatModeMultiSelect = basicI18nTemplate.bind({})
JapaneseChatModeMultiSelect.args = {
  ...EnglishChatModeMultiSelect.args,
  locale: 'ja',
}
