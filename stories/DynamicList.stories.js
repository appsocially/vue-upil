import TruffleLogo from './truffle_logo.png'
import FormMode from '@/components/FormMode'
import WizardMode from '@/components/WizardMode'
import ChatMode from '@/components/ChatMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

const commaChooser = (locale) => {
  switch (locale) {
    case 'ja':
      return '、'
    default:
      return ', '
  }
}

const transformReplyVariables = ({
  node: {
    event: { value },
    label,
  },
  locale,
}) => {
  if (label === 'dynamic-list') {
    return value.join(commaChooser(locale))
  } else {
    return value
  }
}

const transformTextVariables = ({ value, key, locale }) => {
  if (key === 'jobTypes') {
    if (locale === 'ja') {
      return value.join(commaChooser(locale))
    } else {
      return value.join(commaChooser(locale))
    }
  } else {
    return value
  }
}

export default {
  title: 'Widgets/Dynamic-list Widget',
  args: { mode: 'FormMode', listeners: {}, locale: 'en', editable: false },
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['FormMode', 'WizardMode', 'ChatMode'],
      },
    },
    editable: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
    locale: {
      control: {
        type: 'radio',
        options: ['en', 'ja'],
      },
    },
    listeners: {
      type: 'object',
    },
  },
}

const dynamicListTemplate = (args) => {
  return {
    props: Object.keys(args),
    components: {
      FormMode,
      WizardMode,
      ChatMode,
    },
    template: `<component v-if="upil" :locale="locale" :is="mode" :upil="upil" :key="mode" :avatar="TruffleLogo" :transformReplyVariables="transformReplyVariables" :transformTextVariables="transformTextVariables"/>`,
    data() {
      return {
        upil: null,
        TruffleLogo,
      }
    },
    computed: {
      birthdayTemplate() {
        return `
        DIALOG jobsSearch
          TEMPLATE dynamic-list
          {
            formText: "Job Openings",
            editable: ${this.editable},
            i18n: {
              ja: {
                formText: "募集中の職種",
                text: "今回募集する職種を教えてください。",
                placeholder: "カンマで区切ると選択肢が出来上がります"
              }
            }
          }
          "Please list your available job types"
          >>jobTypes
          /TEMPLATE
          TEMPLATE 
          {
            i18n: {
              ja: {
                text: "\${jobTypes}を見つけたらいいね！"
              }
            }
          }
          "I hope you find success in your search for \${jobTypes}!"
          /TEMPLATE
        /DIALOG
        RUN jobsSearch
        `
      },
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        if (this.mode === 'ChatMode') {
          this.upil.startRaw(this.birthdayTemplate, {})
        } else {
          this.upil.startRaw(this.birthdayTemplate, {
            mode: 'form',
            resetOnInputUpdate: true,
          })
        }
      },
      transformReplyVariables,
      transformTextVariables,
    },
    mounted() {
      this.startUpil()
    },
    watch: {
      mode() {
        this.startUpil()
      },
      editable() {
        this.startUpil()
      },
    },
  }
}

export const DynamicListEmpty = dynamicListTemplate.bind({})
DynamicListEmpty.args = { mode: 'FormMode' }

export const DynamicListPreLoaded = dynamicListTemplate.bind({})
DynamicListPreLoaded.args = {
  mode: 'FormMode',
  listeners: {
    'preload-input': async () => {
      return {
        jobTypes: ['Kitchen', 'Chef', 'Line Cook'],
      }
    },
  },
}

export const DynamicListChat = dynamicListTemplate.bind({})
DynamicListChat.args = {
  mode: 'ChatMode',
}

export const DynamicListChatJa = dynamicListTemplate.bind({})
DynamicListChatJa.args = {
  mode: 'ChatMode',
  locale: 'ja',
}
