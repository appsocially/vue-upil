import TruffleLogo from './truffle_logo.png'
import { parse } from 'date-fns'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'Widgets/Date-Time Widget',
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

const dateTimeTemplate = (args) => {
  const birthdayTemplate = `
  DIALOG birthday
    TEMPLATE date-time
    {
      formText: "Birthday party"
    }
    "When is your birthday party?"
    >>birthday
    /TEMPLATE
  /DIALOG
  RUN birthday
  `

  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo"/>`,
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

export const DateTimeEmpty = dateTimeTemplate.bind({})
// DateFormMode.args = { mode: 'FormMode' }

export const DateTimePreLoaded = dateTimeTemplate.bind({})
DateTimePreLoaded.args = {
  mode: 'FormMode',
  listeners: {
    'preload-input': async () => {
      return {
        birthday: parse('2019-08-05:15:5', 'yyyy-MM-dd:k:m', new Date()),
      }
    },
  },
}
