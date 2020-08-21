import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'i18n',
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

const basicI18nTemplate = (args) => {
  const themeTemplate = `
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
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `
      <div>
      <v-select
        v-model="locale"
        :items="items"
        label="Language"
      />
        <component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :locale="locale"/>
      </div>
    `,
    data() {
      return {
        upil: null,
        TruffleLogo,
        items: [
          { text: 'en', value: null },
          { text: 'ja', value: 'ja' },
        ],
        locale: null,
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

export const Basic = basicI18nTemplate.bind({})
