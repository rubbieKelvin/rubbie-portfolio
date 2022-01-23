import Home from '../pages/Home.vue'
import Project from '../pages/Project.vue'
import HireMe from '../pages/HireMe.vue'
import Page404 from '../pages/404.vue'

import {createRouter, createWebHistory} from 'vue-router'

export const removeGeneratedMetaTags = () => {
    Array.from(document.querySelectorAll('[data-router-controlled]')).map(el => el.parentNode.removeChild(el));
}

export const addMetaTags = (metaTags) => {
    metaTags.map(tagDef => {
        const tag = document.createElement('meta');
    
        Object.keys(tagDef).forEach(key => {
          tag.setAttribute(key, tagDef[key]);
        });
    
        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-router-controlled', '');
    
        return tag;
      })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));
}

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
        return { top: 0, behavior: "smooth"}
    },
});

router.beforeEach((to, from, next) => {
    removeGeneratedMetaTags();
    next();
})