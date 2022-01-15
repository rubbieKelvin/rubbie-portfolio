import Home from '../pages/Home.vue'
import Project from '../pages/Project.vue'
import HireMe from '../pages/HireMe.vue'
import Page404 from '../pages/404.vue'

import {createRouter, createWebHistory} from 'vue-router'

export const router = createRouter({
    routes: [
        {component: Home, path: "/"},
        {component: HireMe, path: "/hire"},
        {component: Project, path: "/project/:project/"},
        // ...
        {component: Page404, path: '/:catchAll(.*)'}
    ],
    history: createWebHistory(),
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})