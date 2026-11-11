// main.ts
import VNetworkGraph from "v-network-graph"
import { createApp } from "vue"
import { createPinia } from 'pinia'
import "v-network-graph/lib/style.css"
import App from "./App.vue"
import './index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VNetworkGraph)
app.mount("#app")