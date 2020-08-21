import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export const decorators = [
  (story, {args}) => {
    const vuetifyObj = args.vuetify || {
      theme: {
        themes: {
            light: {
              primary: '#1976D2',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
            }
          }
        }
      }
    return {
      template: `
      <v-app><story/></v-app>
      `,
      vuetify: new Vuetify(vuetifyObj)
    } 
  }
]

