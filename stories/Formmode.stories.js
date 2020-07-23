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

export const longer = () => {
  const longerTemplate = `
  DIALOG mainDialog
  TEMPLATE "Welcome to our job application bot!"
  TEMPLATE
    {
      formText: "First name"
    }
    "What's your first name?"
    >>firstname
  /TEMPLATE
  TEMPLATE
    {
      formText: "Last name"
    }
    "What's your last name?"
    >>lastname
  /TEMPLATE
  SELECT
    {
      formText: "Target job"
    }
    "\${firstname} \${lastname}, what job do you want to apply for?"
    -"Janitor"
    -"Chef"
    >>selectedJob
  /SELECT
  IF selectedJob == "Janitor"
    TEMPLATE
      {
        formText: "Favorite vacuum"
      }
      "What is your favorite brand of vacuum?"
      >>favoriteVacuum
    /TEMPLATE
    ELSE
      TEMPLATE
      {
        formText: "Favorite dish"
      }
      "What is your favorite dish to make?"
      >>favoriteDish
    /TEMPLATE
  /IF
  TEMPLATE "Thank you for your application!"
/DIALOG
RUN mainDialog
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
      this.upil.startRaw(longerTemplate, {
        mode: 'form',
        resetOnInputUpdate: true,
      })
    },
  }
}
