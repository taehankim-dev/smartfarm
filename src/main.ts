import '@customStyles/reset.css'
import '@customStyles/index.css'
// import "/"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import iconBase from '@/assets/IconBase.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('icon-base', iconBase)

app.mount('#app')
