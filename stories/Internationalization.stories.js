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

/**
 * Since i18n.ja.text is missing it should fallback to default text even for ja locale
 */
export const JapaneseChatModeTranslationFallback = basicI18nTemplate.bind({})
JapaneseChatModeTranslationFallback.args = {
  locale: 'ja',
  mode: 'ChatMode',
  upilScript: `
  DIALOG getName
    TEMPLATE 
      {
        formText: "Name",
        i18n: {
          ja: {
            formText: "お名前"
          }
        }
      }
      "お名前は？"
      >>name
    /TEMPLATE
    TEMPLATE 
      "\${name}ようこそ"
    /TEMPLATE
  /DIALOG
  RUN getName
`,
}

export const EnglishFormModeSelect = basicI18nTemplate.bind({})
EnglishFormModeSelect.args = {
  locale: 'en',
  mode: 'FormMode',
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
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "\${color}はいい色だね！",
          options: {
            color: {
              red: "赤",
              blue: "青",
              green: "緑"
            }
          }
        }
      }
    }
    "\${color} is a great color!"
    /TEMPLATE 
  /DIALOG
  RUN favColor
  `,
}

export const JapaneseFormModeSelect = basicI18nTemplate.bind({})
JapaneseFormModeSelect.args = {
  ...EnglishFormModeSelect.args,
  locale: 'ja',
}

export const EnglishWizardModeSelect = basicI18nTemplate.bind({})
EnglishWizardModeSelect.args = {
  ...EnglishFormModeSelect.args,
  mode: 'WizardMode',
}

export const JapaneseWizardModeSelect = basicI18nTemplate.bind({})
JapaneseWizardModeSelect.args = {
  ...JapaneseFormModeSelect.args,
  mode: 'WizardMode',
}

export const EnglishChatModeSelect = basicI18nTemplate.bind({})
EnglishChatModeSelect.args = {
  ...EnglishFormModeSelect.args,
  mode: 'ChatMode',
}

export const JapaneseChatModeSelect = basicI18nTemplate.bind({})
JapaneseChatModeSelect.args = {
  ...EnglishChatModeSelect.args,
  locale: 'ja',
}
