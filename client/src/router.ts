import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router';
import HelloWorld from "./components/pages/Index.vue";
import Messages from "./components/pages/Messages.vue";

const routes = [
    {path: '/', component: HelloWorld, name: 'home'},
    {path: '/messages', component: Messages, name: 'messages'}
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const loggedIn = window.localStorage.getItem('token');

    const authPage = 'home';
    const publicPages = [authPage];

    if (!loggedIn && !publicPages.includes(to.name as string)) {
        next({name: authPage});
    } else if (loggedIn && publicPages.includes(to.name as string)) {
        next({name: 'messages'});
    } else {
        next();
    }
});

export default router;