import FormMode from '@/components/FormMode'
import { UPILCore } from '@appsocially/userpil-core'

export default { title: 'Formmode' }

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
      FormMode,
    },
    template: ` <FormMode :upil="upil" />`,
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
