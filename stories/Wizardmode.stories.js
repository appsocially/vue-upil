import WizardMode from '@/components/WizardMode'
import { UPILCore } from '@appsocially/userpil-core'

export default { title: 'WizardMode' }

export const basic = () => {
  const simpleTemplate = `
    DIALOG icecream
      TEMPLATE 
      {
        formText: "First Name"
      }
      "What's your first name?"
      >>firstName
      /TEMPLATE
      TEMPLATE 
      {
        formText: "Last Name"
      }
      "What's your last name?"
      >>lastName
      /TEMPLATE
      TEMPLATE "Welcome \${firstName} \${lastName}"
    /DIALOG
    RUN icecream
  `
  const upil = new UPILCore()
  return {
    components: {
      WizardMode,
    },
    template: ` <WizardMode :upil="upil" />`,
    data() {
      return {
        upil,
      }
    },
    mounted() {
      this.upil.startRaw(simpleTemplate, {
        mode: 'form',
        resetOnInputUpdate: true,
      })
    },
  }
}
