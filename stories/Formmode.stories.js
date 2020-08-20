import { parseISO, parse } from 'date-fns'
import FormMode from '@/components/FormMode'
import { UPILCore } from '@appsocially/userpil-core'
import { setupListeners } from '@/utils'

export default {
  title: 'Modes/Formmode',
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

// export const basic = () => {
//   const simpleTemplate = `
//     DIALOG icecream
//       TEMPLATE
//       {
//         formText: "First Name"
//       }
//       "What's your first name?"
//       >>firstName
//       /TEMPLATE
//       TEMPLATE
//       {
//         formText: "Last Name"
//       }
//       "What's your last name?"
//       >>lastName
//       /TEMPLATE
//       TEMPLATE "Welcome \${firstName} \${lastName}"
//     /DIALOG
//     RUN icecream
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(simpleTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const dateWidget = () => {
//   const birthdayTemplate = `
//     DIALOG birthday
//       TEMPLATE date
//       {
//         formText: "Birthdate"
//       }
//       "What is your birthday?"
//       >>birthday
//       /TEMPLATE
//     /DIALOG
//     RUN birthday
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(birthdayTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const dateWidgetPreloaded = () => {
//   const birthdayTemplate = `
//     DIALOG birthday
//       TEMPLATE date
//       {
//         formText: "Birthdate"
//       }
//       "What is your birthday?"
//       >>birthday
//       /TEMPLATE
//     /DIALOG
//     RUN birthday
//   `

//   const listeners = {
//     'preload-input': async () => {
//       return {
//         birthday: parseISO('2001-01-01'),
//       }
//     },
//   }

//   const upil = new UPILCore()
//   setupListeners({ upil, listeners })

//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(birthdayTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const dateTimeWidget = () => {
//   const birthdayTemplate = `
//     DIALOG birthday
//       TEMPLATE date-time
//       {
//         formText: "Birthday party"
//       }
//       "When is your birthday party?"
//       >>birthday
//       /TEMPLATE
//     /DIALOG
//     RUN birthday
//   `

//   const upil = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(birthdayTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const dateTimeWidgetPreloaded = () => {
//   const birthdayTemplate = `
//     DIALOG birthday
//       TEMPLATE date-time
//       {
//         formText: "Birthday party"
//       }
//       "When is your birthday party?"
//       >>birthday
//       /TEMPLATE
//     /DIALOG
//     RUN birthday
//   `

//   const listeners = {
//     'preload-input': async () => {
//       return {
//         birthday: parse('2019-08-05:15:5', 'yyyy-MM-dd:k:m', new Date()),
//       }
//     },
//   }

//   const upil = new UPILCore()
//   setupListeners({ upil, listeners })

//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(birthdayTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const range = () => {
//   const rangeTemplate = `
//     DIALOG range
//       TEMPLATE range
//       {
//         formText: "Minutes",
//         min: 10,
//         max: 20,
//         unit: "分"
//       }
//       "How long did it take?"
//       >>minutes
//       /TEMPLATE
//     /DIALOG
//     RUN range
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(rangeTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const rangePreloaded = () => {
//   const rangeTemplate = `
//     DIALOG range
//       TEMPLATE range
//       {
//         formText: "Minutes",
//         min: 10,
//         max: 20,
//         unit: "分"
//       }
//       "How long did it take?"
//       >>minutes
//       /TEMPLATE
//     /DIALOG
//     RUN range
//   `

//   const listeners = {
//     'preload-input': async () => {
//       return {
//         minutes: 15,
//       }
//     },
//   }

//   const upil = new UPILCore()
//   setupListeners({ upil, listeners })

//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(rangeTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const longer = () => {
//   const longerTemplate = `
//   DIALOG mainDialog
//   TEMPLATE "Welcome to our job application bot!"
//   TEMPLATE
//     {
//       formText: "First name"
//     }
//     "What's your first name?"
//     >>firstname
//   /TEMPLATE
//   TEMPLATE
//     {
//       formText: "Last name"
//     }
//     "What's your last name?"
//     >>lastname
//   /TEMPLATE
//   SELECT
//     {
//       formText: "Target job"
//     }
//     "\${firstname} \${lastname}, what job do you want to apply for?"
//     -"Janitor"
//     -"Chef"
//     >>selectedJob
//   /SELECT
//   IF selectedJob == "Janitor"
//     TEMPLATE
//       {
//         formText: "Favorite vacuum"
//       }
//       "What is your favorite brand of vacuum?"
//       >>favoriteVacuum
//     /TEMPLATE
//     ELSE
//       TEMPLATE
//       {
//         formText: "Favorite dish"
//       }
//       "What is your favorite dish to make?"
//       >>favoriteDish
//     /TEMPLATE
//   /IF
//   TEMPLATE "Thank you for your application!"
// /DIALOG
// RUN mainDialog
//   `
//   const upil = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: ` <FormMode :upil="upil" />`,
//     data() {
//       return {
//         upil,
//       }
//     },
//     mounted() {
//       this.upil.startRaw(longerTemplate, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }

// export const doubleFormMode = () => {
//   const longerTemplate1 = `
//   DIALOG mainDialog
//   TEMPLATE "Welcome to our job application bot!"
//   TEMPLATE
//     {
//       formText: "First name1"
//     }
//     "What's your first name?"
//     >>firstname
//   /TEMPLATE
//   TEMPLATE
//     {
//       formText: "Last name1"
//     }
//     "What's your last name?"
//     >>lastname
//   /TEMPLATE
//   SELECT
//     {
//       formText: "Target job1"
//     }
//     "\${firstname} \${lastname}, what job do you want to apply for?"
//     -"Janitor"
//     -"Chef"
//     >>selectedJob
//   /SELECT
//   IF selectedJob == "Janitor"
//     TEMPLATE
//       {
//         formText: "Favorite vacuum1"
//       }
//       "What is your favorite brand of vacuum?"
//       >>favoriteVacuum
//     /TEMPLATE
//     ELSE
//       TEMPLATE
//       {
//         formText: "Favorite dish1"
//       }
//       "What is your favorite dish to make?"
//       >>favoriteDish
//     /TEMPLATE
//   /IF
//   TEMPLATE "Thank you for your application!"
// /DIALOG
// RUN mainDialog
//   `
//   const longerTemplate2 = `
//   DIALOG mainDialog
//   TEMPLATE "Welcome to our job application bot!"
//   TEMPLATE
//     {
//       formText: "First name2"
//     }
//     "What's your first name?"
//     >>firstname
//   /TEMPLATE
//   TEMPLATE
//     {
//       formText: "Last name2"
//     }
//     "What's your last name?"
//     >>lastname
//   /TEMPLATE
//   SELECT
//     {
//       formText: "Target job2"
//     }
//     "\${firstname} \${lastname}, what job do you want to apply for?"
//     -"Janitor"
//     -"Chef"
//     >>selectedJob
//   /SELECT
//   IF selectedJob == "Janitor"
//     TEMPLATE
//       {
//         formText: "Favorite vacuum2"
//       }
//       "What is your favorite brand of vacuum?"
//       >>favoriteVacuum
//     /TEMPLATE
//     ELSE
//       TEMPLATE
//       {
//         formText: "Favorite dish2"
//       }
//       "What is your favorite dish to make?"
//       >>favoriteDish
//     /TEMPLATE
//   /IF
//   TEMPLATE "Thank you for your application!"
// /DIALOG
// RUN mainDialog
//   `
//   const upil1 = new UPILCore()
//   const upil2 = new UPILCore()
//   return {
//     components: {
//       FormMode,
//     },
//     template: `
//     <div>
//       <v-sheet color="orange" class="pa-3">
//         <FormMode :upil="upil1" />
//       </v-sheet>
//     <br/><br/>
//       <v-sheet color="green" class="pa-3">
//         <FormMode :upil="upil2" />
//       </v-sheet>
//     </div>
//     `,
//     data() {
//       return {
//         upil1,
//         upil2,
//       }
//     },
//     mounted() {
//       this.upil1.startRaw(longerTemplate1, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//       this.upil2.startRaw(longerTemplate2, {
//         mode: 'form',
//         resetOnInputUpdate: true,
//       })
//     },
//   }
// }
