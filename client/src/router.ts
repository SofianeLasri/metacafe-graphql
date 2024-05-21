import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router';
import Home from "./components/pages/Index.vue";
import Messages from "./components/pages/Messages.vue";
import Logout from "~@/components/pages/Logout.vue";
import Setup from "~@/components/pages/Setup.vue";
import Dashboard from "~@/components/pages/Dashboard.vue";

const routes = [
    {path: '/', component: Home, name: 'home'},
    {path: '/messages', component: Messages, name: 'messages'},
    {path: '/dashboard', component: Dashboard, name: 'dashboard'},
    {path: '/logout', component: Logout, name: 'logout'},
    {path: '/setup', component: Setup, name: 'setup'}
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
        next({name: 'dashboard'});
    } else {
        next();
    }
});

export default router;