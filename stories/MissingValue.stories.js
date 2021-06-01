import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import './theming.css'

export default {
  title: 'MissingValue Style Override',
  args: {
    mode: 'FormMode',
    themed: false,
    listeners: {},
  },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    themed: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const themingTemplate = (args) => {
  const themeTemplate = `
  DIALOG getName
    TEMPLATE 
      "What's your name?"
      >>name
    /TEMPLATE
    TEMPLATE "Welcome \${name}"
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
    <div :id="themed ? 'themed' : null">
      <component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :calculateMissingValueContainerAttributes="calculateMissingValueContainerAttributes || undefined" :calculateMissingValueAlertAttributes="calculateMissingValueAlertAttributes || undefined" />
    </div>
    `,
    data() {
      return {
        upil: null,
        TruffleLogo,
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

export const SimpleOverride = themingTemplate.bind({})
SimpleOverride.args = {
  calculateMissingValueContainerAttributes: ({ isMissingValue }) => ({
    color: isMissingValue ? 'grey lighten-3' : undefined,
  }),
  calculateMissingValueAlertAttributes: () => ({
    icon: 'mdi-alert-circle-outline',
    class: 'my-0 grey lighten-2',
  }),
}

export const PurpleOrangeLight = themingTemplate.bind({})
PurpleOrangeLight.args = {
  calculateMissingValueContainerAttributes: ({ isMissingValue }) => ({
    color: isMissingValue ? 'purple lighten-3' : undefined,
  }),
  calculateMissingValueAlertAttributes: () => ({
    icon: 'mdi-alert-circle-outline',
    class: 'my-0 orange lighten-2',
  }),
}

export const PurpleOrangeDark = themingTemplate.bind({})
PurpleOrangeDark.args = {
  calculateMissingValueContainerAttributes: ({ isMissingValue }) => ({
    color: isMissingValue ? 'purple darken-2' : undefined,
    dark: isMissingValue,
  }),
  calculateMissingValueAlertAttributes: () => ({
    icon: 'mdi-alert-circle-outline',
    class: 'my-0 orange darken-3',
    dark: true,
  }),
}
