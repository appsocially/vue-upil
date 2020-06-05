import FormMode from '@/components/FormMode'
import { UPILCore } from '@appsocially/userpil-core'

export default { title: 'Formmode' }

export const basic = () => {
  const simpleTemplate = `
    DIALOG icecream
      TEMPLATE 
      {
        formText: "Name"
      }
      "What's your name?"
      >>name
      /TEMPLATE
      TEMPLATE "Welcome \${name}"
    /DIALOG
    RUN icecream
  `
  const upil = new UPILCore()
  return {
    components: {
      FormMode
    },
    template: ` <FormMode :upil="upil" />`,
    data() {
      return {
        upil
      }
    },
    mounted() {
      this.upil.startRaw(simpleTemplate, {
        mode: 'form',
        resetOnInputUpdate: true
      })
    }
  }
}
