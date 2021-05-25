import WizardMode from '@/components/WizardMode'
import { UPILCore } from '@appsocially/userpil-core'

export default {
  title: 'Modes/Wizardmode',
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

const wizardmodeTemplate = (args) => {
  return {
    props: Object.keys(args),
    components: {
      WizardMode,
    },
    template: ` <WizardMode v-if="upil" :upil="upil" key="Template"/>`,
    data() {
      return {
        upil: null,
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

export const BasicTemplate = wizardmodeTemplate.bind({})
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

export const BasicTemplateWithHint = wizardmodeTemplate.bind({})
BasicTemplateWithHint.args = {
  templateText: `
    DIALOG getName
      TEMPLATE 
        {
          formText: "First Name",
          hint: "First name only"
        }
        "What's your name?"
        >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN getName
  `,
}

export const BasicSelect = wizardmodeTemplate.bind({})
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

export const BasicSelectWithHint = wizardmodeTemplate.bind({})
BasicSelectWithHint.args = {
  templateText: `
      DIALOG favColor
        SELECT
          {
            formText: "Favorite color",
            hint: "Only one favorite color"
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

export const BasicMultiSelect = wizardmodeTemplate.bind({})
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

export const BasicMultiSelectWithHint = wizardmodeTemplate.bind({})
BasicMultiSelectWithHint.args = {
  templateText: `
      DIALOG favColor
        MULTI_SELECT
          {
            formText: "Favorite colors",
            hint: "One or more favorite colors!"
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

export const VariableInWizardText = wizardmodeTemplate.bind({})
VariableInWizardText.args = {
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
