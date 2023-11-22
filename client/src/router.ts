import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from "./components/Index.vue";

const routes = [
    { path: '/', component: HelloWorld },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;