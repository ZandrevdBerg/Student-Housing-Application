import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


import MapsView from './components/MapsView.vue'
// import './assets/main.css'

const routes = [
    { path: "/Maps", component : MapsView},
    { path: "/", component : Home}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  
const app = createApp(App)

app.use(router)

app.mount('#app')
