import { createApp } from 'vue'
import './assets/style/style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { router } from './router/router.ts'
import { createPinia } from 'pinia'

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'system',
  },
})

createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
