import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

addDecorator(() => ({
  template: `
  <v-app><story/></v-app>
  `,
  vuetify: new Vuetify()
}))
