// import { ChatBot } from '../dist/vue-userpil-plugin.common'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import TruffleLogo from './truffle_logo.png'

// const { ChatMode } = ChatBot

export default { title: 'Basic' }

export const basic = () => {
  const simpleTemplate = `
    DIALOG icecream
      TEMPLATE 
      "What's your name?"
      >>name
      /TEMPLATE
      TEMPLATE "Welcome ${name}"
    /DIALOG
    RUN icecream
  `
  const upil = new UPILCore()
  return {
    components: {
      ChatMode
    },
    template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo"/>`,
    data() {
      return {
        upil,
        TruffleLogo
      }
    },
    mounted() {
      this.upil.startRaw(simpleTemplate)
    }
  }
}
