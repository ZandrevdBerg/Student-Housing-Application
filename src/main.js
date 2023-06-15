import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'


import MapsView from './components/MapsView.vue'
import CreateListing from './components/CreateListing.vue'
// import './assets/main.css'

const pinia = createPinia()

const routes = [
    { path: "/Maps", component : MapsView},
    { path: "/", component : Home},
    {path: "/Create-Listing", component : CreateListing}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  //Check Router Before each

  
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
