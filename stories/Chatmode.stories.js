import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import TruffleLogo from './truffle_logo.png'

export default {
  title: 'Modes/Chatmode',
  args: {
    botTypingDurationInMsPerMessage: 0,
    templateText: '',
  },
  argTypes: {
    botTypingDurationInMsPerMessage: {
      control: {
        type: 'select',
        options: [0, 200, 400, 600, 800, 1000, 2000],
      },
    },
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
    template: ` <ChatMode v-if="upil" :upil="upil" :key="botTypingDurationInMsPerMessage" :avatar="TruffleLogo" :botTypingDurationInMsPerMessage="botTypingDurationInMsPerMessage" />`,
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
      botTypingDurationInMsPerMessage() {
        this.startUpil()
      },
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

export const BasicSelectPlaceholderOverride = chatmodeTemplate.bind({})
BasicSelectPlaceholderOverride.args = {
  templateText: `
      DIALOG favColor
        SELECT
          {
            placeholder: "Choose a color"
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

export const BasicTemplateMultipleLineReply = chatmodeTemplate.bind({})
BasicTemplateMultipleLineReply.args = {
  templateText: `
    DIALOG getName
      TEMPLATE "Hi I'm a chat bot!"
      TEMPLATE "These"
      TEMPLATE "are"
      TEMPLATE "multiple"
      TEMPLATE "separate"
      TEMPLATE "chats"
      TEMPLATE 
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN getName
  `,
}

export const SuperLongTemplates = chatmodeTemplate.bind({})
SuperLongTemplates.args = {
  templateText: `
    DIALOG getName
      TEMPLATE "AAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCC"
      TEMPLATE "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
      TEMPLATE "日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語"
      TEMPLATE "ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム "
      TEMPLATE 
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
      TEMPLATE "AAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCC"
      TEMPLATE "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
      TEMPLATE "日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語日本語"
      TEMPLATE "ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム ロレム イプサム "
    /DIALOG
    RUN getName
  `,
}
