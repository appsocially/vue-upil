import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import TruffleLogo from './truffle_logo.png'
import { email } from 'vee-validate/dist/rules'
import { formatTextbox as formatDateString } from '@/components/FormMode/date/utils'
import { isDate } from 'date-fns'
import { setupListeners } from '@/utils'

// const emailValidationRules = [
//   (value) => (value && value.length > 0 ? true : 'Required'),
//   (value) => (email.validate(value) ? true : 'Invalid email address'),
// ]

// const types = {
//   email: emailValidationRules,
// }

// const transformTextVariables = ({ value, key: variableName }) => {
//   if (isDate(value)) {
//     return formatDateString(value)
//   } else if (variableName === 'minutes') {
//     return `${value}分`
//   } else {
//     return value
//   }
// }

// const transformReplyVariables = ({
//   node: {
//     label,
//     event: { value },
//     args,
//   },
// }) => {
//   if (isDate(value)) {
//     return formatDateString(value)
//   } else if (label === 'range') {
//     const unit = args && args.unit ? args.unit : ''
//     return `${value}${unit}`
//   } else {
//     return value
//   }
// }

export default {
  title: 'Chatmode',
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
    DIALOG icecream
      TEMPLATE 
      "What's your name?"
      >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN icecream
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

// export const emailValidation = () => {
//   const simpleTemplate = `
//     DIALOG icecream
//       TEMPLATE
//       "What's your email?"
//       >>email:email
//       /TEMPLATE
//       TEMPLATE "Thank you for your email (\${email})"
//     /DIALOG
//     RUN icecream
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       ChatMode,
//     },
//     template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :types="types"/>`,
//     data() {
//       return {
//         upil,
//         TruffleLogo,
//         types,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(simpleTemplate)
//     },
//   }
// }

// export const date = () => {
//   const simpleTemplate = `
//     DIALOG pickDate
//       TEMPLATE date
//       "When is your birthday?"
//       >>date
//       /TEMPLATE
//       TEMPLATE "Great, excited to see you on \${date}"
//     /DIALOG
//     RUN pickDate
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       ChatMode,
//     },
//     template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :transformReplyVariables="transformReplyVariables" :transformTextVariables="transformTextVariables"/>`,
//     data() {
//       return {
//         upil,
//         TruffleLogo,
//         transformTextVariables,
//         transformReplyVariables,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(simpleTemplate)
//     },
//   }
// }

// export const range = () => {
//   const simpleTemplate = `
//   DIALOG range
//     TEMPLATE range
//     {
//       formText: "Minutes",
//       min: 10,
//       max: 20,
//       unit: "分"
//     }
//     "How long did it take?"
//     >>minutes
//     /TEMPLATE
//     TEMPLATE "\${minutes} huh? That seems like a reasonable amount of time"
//   /DIALOG
//   RUN range
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       ChatMode,
//     },
//     template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :transformTextVariables="transformTextVariables" :transformReplyVariables="transformReplyVariables"/>`,
//     data() {
//       return {
//         upil,
//         TruffleLogo,
//         transformTextVariables,
//         transformReplyVariables,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(simpleTemplate)
//     },
//   }
// }

// export const dateTime = () => {
//   const simpleTemplate = `
//   DIALOG birthday
//     TEMPLATE date-time
//     {
//       formText: "Birthday party"
//     }
//     "When is your birthday party?"
//     >>birthday
//     /TEMPLATE
//   /DIALOG
//   RUN birthday
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       ChatMode,
//     },
//     template: ` <ChatMode :upil="upil" key="Template" :avatar="TruffleLogo" :transformReplyVariables="transformReplyVariables" :transformTextVariables="transformTextVariables"/>`,
//     data() {
//       return {
//         upil,
//         TruffleLogo,
//         transformTextVariables,
//         transformReplyVariables,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(simpleTemplate)
//     },
//   }
// }
