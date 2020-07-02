import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import TruffleLogo from './truffle_logo.png'
import { email } from 'vee-validate/dist/rules'

const emailValidationRules = [
  (value) => (value && value.length > 0 ? true : 'Required'),
  (value) => (email.validate(value) ? true : 'Invalid email address'),
]

const types = {
  email: emailValidationRules,
}

export default { title: 'Chatmode' }

export const basic = () => {
  const simpleTemplate = `
    DIALOG icecream
      TEMPLATE 
      "What's your name?"
      >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN icecream
  `
  const upil = new UPILCore()
  return {
    components: {
      ChatMode,
    },
    template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo"/>`,
    data() {
      return {
        upil,
        TruffleLogo,
      }
    },
    mounted() {
      this.upil.startRaw(simpleTemplate)
    },
  }
}

export const emailValidation = () => {
  const simpleTemplate = `
    DIALOG icecream
      TEMPLATE 
      "What's your email?"
      >>email:email
      /TEMPLATE
      TEMPLATE "Thank you for your email (\${email})"
    /DIALOG
    RUN icecream
  `
  const upil = new UPILCore()
  return {
    components: {
      ChatMode,
    },
    template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :types="types"/>`,
    data() {
      return {
        upil,
        TruffleLogo,
        types,
      }
    },
    mounted() {
      this.upil.startRaw(simpleTemplate)
    },
  }
}
