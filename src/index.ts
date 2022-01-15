import './styles/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './routes'

createApp(App).use(router).use(store).mount('#app')
