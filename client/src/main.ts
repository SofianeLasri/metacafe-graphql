import { createApp } from 'vue'
import './scss/app.scss'
import App from './App.vue'
import router from "./router.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(router); // Utilisez le routeur
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');