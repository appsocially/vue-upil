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

export const doubleFormMode = () => {
  const longerTemplate1 = `
  DIALOG mainDialog
  TEMPLATE "Welcome to our job application bot!"
  TEMPLATE
    {
      formText: "First name1"
    }
    "What's your first name?"
    >>firstname
  /TEMPLATE
  TEMPLATE
    {
      formText: "Last name1"
    }
    "What's your last name?"
    >>lastname
  /TEMPLATE
  SELECT
    {
      formText: "Target job1"
    }
    "\${firstname} \${lastname}, what job do you want to apply for?"
    -"Janitor"
    -"Chef"
    >>selectedJob
  /SELECT
  IF selectedJob == "Janitor"
    TEMPLATE
      {
        formText: "Favorite vacuum1"
      }
      "What is your favorite brand of vacuum?"
      >>favoriteVacuum
    /TEMPLATE
    ELSE
      TEMPLATE
      {
        formText: "Favorite dish1"
      }
      "What is your favorite dish to make?"
      >>favoriteDish
    /TEMPLATE
  /IF
  TEMPLATE "Thank you for your application!"
/DIALOG
RUN mainDialog
  `
  const longerTemplate2 = `
  DIALOG mainDialog
  TEMPLATE "Welcome to our job application bot!"
  TEMPLATE
    {
      formText: "First name2"
    }
    "What's your first name?"
    >>firstname
  /TEMPLATE
  TEMPLATE
    {
      formText: "Last name2"
    }
    "What's your last name?"
    >>lastname
  /TEMPLATE
  SELECT
    {
      formText: "Target job2"
    }
    "\${firstname} \${lastname}, what job do you want to apply for?"
    -"Janitor"
    -"Chef"
    >>selectedJob
  /SELECT
  IF selectedJob == "Janitor"
    TEMPLATE
      {
        formText: "Favorite vacuum2"
      }
      "What is your favorite brand of vacuum?"
      >>favoriteVacuum
    /TEMPLATE
    ELSE
      TEMPLATE
      {
        formText: "Favorite dish2"
      }
      "What is your favorite dish to make?"
      >>favoriteDish
    /TEMPLATE
  /IF
  TEMPLATE "Thank you for your application!"
/DIALOG
RUN mainDialog
  `
  const upil1 = new UPILCore()
  const upil2 = new UPILCore()
  return {
    components: {
      FormMode,
    },
    template: ` 
    <div>
      <v-sheet color="orange" class="pa-3">
        <FormMode :upil="upil1" />
      </v-sheet>
    <br/><br/>
      <v-sheet color="green" class="pa-3">
        <FormMode :upil="upil2" />
      </v-sheet>
    </div>
    `,
    data() {
      return {
        upil1,
        upil2,
      }
    },
    mounted() {
      this.upil1.startRaw(longerTemplate1, {
        mode: 'form',
        resetOnInputUpdate: true,
      })
      this.upil2.startRaw(longerTemplate2, {
        mode: 'form',
        resetOnInputUpdate: true,
      })
    },
  }
}
