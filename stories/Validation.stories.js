import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import { email } from 'vee-validate/dist/rules'

const emailValidationRules = [
  (value) => (value && value.length > 0 ? true : 'Required'),
  (value) => (email.validate(value) ? true : 'Invalid email address'),
]

const types = {
  email: emailValidationRules,
}

export default {
  title: 'Validation',
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

const emailValidationTemplate = (args) => {
  const birthdayTemplate = `
  DIALOG getEmail
    TEMPLATE
    {
      formText: "Email"
    }
    "Please enter your email address"
    >>customerEmail:email
    /TEMPLATE
    TEMPLATE "\${customerEmail} is such a cool email address!"
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
    template: `<component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :types="types"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
        types,
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

export const EmailValidation = emailValidationTemplate.bind({})
