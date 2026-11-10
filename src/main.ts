// main.ts
import VNetworkGraph from "v-network-graph"
import { createApp } from "vue"
import "v-network-graph/lib/style.css"
import App from "./App.vue"
import './index.css'

const app = createApp(App)

app.use(VNetworkGraph)
app.mount("#app")