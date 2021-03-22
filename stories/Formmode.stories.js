import FormMode from '@/components/FormMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'Modes/Formmode',
  args: {
    templateText: '',
    listeners: {},
  },
  argTypes: {
    templateText: {
      control: {
        type: 'text',
      },
    },
    listeners: {
      type: 'object',
    },
  },
}

const formmodeTemplate = (args) => {
  return {
    props: Object.keys(args),
    components: {
      FormMode,
    },
    template: ` <FormMode v-if="upil" :upil="upil" key="Template"/>`,
    data() {
      return {
        upil: null,
      }
    },
    methods: {
      startUpil() {
        this.upil = new UPILCore()
        setupListeners({ upil: this.upil, listeners: this.listeners })

        this.upil.startRaw(this.templateText, {
          mode: 'form',
          resetOnInputUpdate: true,
        })
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

export const BasicTemplate = formmodeTemplate.bind({})
BasicTemplate.args = {
  templateText: `
    DIALOG getName
      TEMPLATE 
        {
          formText: "First Name"
        }
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN getName
  `,
}

export const PreloadedTemplate = formmodeTemplate.bind({})
PreloadedTemplate.args = {
  templateText: `
    DIALOG getName
      TEMPLATE 
        {
          formText: "First Name"
        }
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN getName
  `,
  listeners: {
    'preload-input': async () => {
      return {
        name: 'John Doe',
      }
    },
  },
}

export const BasicSelect = formmodeTemplate.bind({})
BasicSelect.args = {
  templateText: `
      DIALOG favColor
        SELECT
          {
            formText: "Favorite color"
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

export const PreloadedSelect = formmodeTemplate.bind({})
PreloadedSelect.args = {
  templateText: `
      DIALOG favColor
        SELECT
          {
            formText: "Favorite color"
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
  listeners: {
    'preload-input': async () => {
      return {
        color: 'green',
      }
    },
  },
}

export const BasicMultiSelect = formmodeTemplate.bind({})
BasicMultiSelect.args = {
  templateText: `
      DIALOG favColor
        MULTI_SELECT
          {
            formText: "Favorite colors"
          }
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

export const PreloadedMultiSelect = formmodeTemplate.bind({})
PreloadedMultiSelect.args = {
  templateText: `
      DIALOG favColor
        MULTI_SELECT
          {
            formText: "Favorite colors"
          }
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
  listeners: {
    'preload-input': async () => {
      return {
        colors: ['green', 'blue'],
      }
    },
  },
}

export const VariableInFormText = formmodeTemplate.bind({})
VariableInFormText.args = {
  templateText: `
    DIALOG getName
      TEMPLATE 
        {
          formText: "First Name"
        }
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
      TEMPLATE 
        {
          formText: "\${name} please enter your age"
        }
        "What's your age?"
        >>age
      /TEMPLATE
      TEMPLATE "\${age} is not that old!"
      /DIALOG
    RUN getName
  `,
}
