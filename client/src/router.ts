import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from "./components/pages/Index.vue";
import Messages from "./components/pages/Messages.vue";

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/messages', component: Messages}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;