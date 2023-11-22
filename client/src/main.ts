import { createApp } from 'vue'
import './scss/app.scss'
import App from './App.vue'
import router from "./router.ts";

const app = createApp(App);

app.use(router); // Utilisez le routeur

app.mount('#app');