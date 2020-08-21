import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'
import './theming.css'

export default {
  title: 'Theming',
  args: { mode: 'FormMode', themed: false, listeners: {} },
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
      <component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" />
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

export const VuetifyThemeOverride = themingTemplate.bind({})
VuetifyThemeOverride.args = {
  vuetify: {
    theme: {
      themes: {
        light: {
          info: '#FF5722',
          primary: '#D81B60',
        },
      },
    },
  },
}

export const CSSOverride = themingTemplate.bind({})
CSSOverride.args = {
  themed: true,
}
