import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import TruffleLogo from './truffle_logo.png'

export default {
  title: 'Modes/Chatmode',
  args: {
    templateText: '',
  },
  argTypes: {
    templateText: {
      control: {
        type: 'text',
      },
    },
  },
}

const chatmodeTemplate = (args) => {
  return {
    props: Object.keys(args),
    components: {
      ChatMode,
    },
    template: ` <ChatMode v-if="upil" :upil="upil" key="Template" :avatar="TruffleLogo"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
      }
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()

        this.upil.startRaw(this.templateText, {})
      },
    },
    mounted() {
      this.startUpil()
    },
    watch: {
      templateText() {
        this.startUpil()
      },
    },
  }
}

export const BasicTemplate = chatmodeTemplate.bind({})
BasicTemplate.args = {
  templateText: `
    DIALOG getName
      TEMPLATE 
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN getName
  `,
}

export const BasicSelect = chatmodeTemplate.bind({})
BasicSelect.args = {
  templateText: `
      DIALOG favColor
        SELECT
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

export const BasicMultiSelect = chatmodeTemplate.bind({})
BasicMultiSelect.args = {
  templateText: `
      DIALOG favColor
        MULTI_SELECT
          "Please choose all of your favorite colors"
          -("Color red", "red")
          -("Color blue", "blue")
          -("Color green", "green")
          >>colors
        /MULTI_SELECT
        TEMPLATE "Those are all great colors!"
      /DIALOG
      RUN favColor
  `,
}
