import ChatMode from '@/components/ChatMode'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import { setupListeners } from '@/utils'
import { UPILCore } from '@appsocially/userpil-core'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { email } from 'vee-validate/dist/rules'
import TruffleLogo from './truffle_logo.png'

const requiredMessageChooser = (locale) => {
  switch (locale) {
    case 'ja':
      return '必須項目です'
    default:
      return 'Required'
  }
}

const invalidEmailAddressChooser = (locale) => {
  switch (locale) {
    case 'ja':
      return '有効なメールアドレスではありません'
    default:
      return 'Invalid email address'
  }
}

const invalidPhoneNumberChooser = (locale) => {
  switch (locale) {
    case 'ja':
      return '有効な電話番号ではありません'
    default:
      return 'Invalid phone number'
  }
}

const emailValidationRules = (locale) => [
  (value) =>
    value && value.length > 0 ? true : requiredMessageChooser(locale),
  (value) =>
    email.validate(value) ? true : invalidEmailAddressChooser(locale),
]

const phoneValidationRules = (locale) => [
  (value) =>
    value && value.length > 0 ? true : requiredMessageChooser(locale),
  (value) =>
    isMobilePhone(value) ? true : invalidPhoneNumberChooser(locale),
]

const types = {
  email: emailValidationRules,
  phone: phoneValidationRules,
}

export default {
  title: 'Validation',
  args: { mode: 'FormMode', listeners: {}, locale: 'en' },
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
    locale: {
      control: {
        type: 'radio',
        options: ['en', 'ja'],
      },
    },
  },
}

const emailValidationTemplate = (args) => {
  const birthdayTemplate = `
  DIALOG getEmail
    TEMPLATE
    {
      formText: "Email",
      inputType: "email",
      i18n: {
        ja: {
          formText: "メール",
          text: "メール教えてください。"
        }
      }
    }
    "Please enter your email address"
    >>customerEmail:email
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "\${customerEmail}がかっこいい！"
        }
      }
    }
    "\${customerEmail} is such a cool email address!"
    /TEMPLATE
    /DIALOG
  RUN getEmail
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :types="types" :locale="locale" :i18n="i18n"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
        types,
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

const phoneValidationTemplate = (args) => {
  const birthdayTemplate = `
  DIALOG getPhone
    TEMPLATE
    {
      formText: "Phone",
      inputType: "phone",
      i18n: {
        ja: {
          formText: "電話番号",
          text: "電話番号教えてください。"
        }
      }
    }
    "Please enter your phone address"
    >>customerPhone:phone
    /TEMPLATE
    TEMPLATE 
    {
      i18n: {
        ja: {
          text: "\${customerPhone}がかっこいい！"
        }
      }
    }
    "\${customerPhone} is such a cool phone number!"
    /TEMPLATE
    /DIALOG
  RUN getPhone
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :types="types" :locale="locale" :i18n="i18n"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
        types,
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

export const EmailValidationForm = emailValidationTemplate.bind({})

export const EmailValidationChat = emailValidationTemplate.bind({})
EmailValidationChat.args = {
  mode: 'ChatMode',
}

export const EmailValidationChatJa = emailValidationTemplate.bind({})
EmailValidationChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}


export const PhoneValidationChat = phoneValidationTemplate.bind({})
PhoneValidationChat.args = {
  mode: 'ChatMode',
}

export const PhoneValidationChatJa = phoneValidationTemplate.bind({})
PhoneValidationChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}