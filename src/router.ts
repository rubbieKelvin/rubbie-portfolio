import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/index.vue"),
    },
    {
      path: "/projects",
      name: "Projects",
      component: () => import("@/pages/projects.vue"),
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import("@/pages/faq.vue"),
    },
    {
      path: "/blog",
      name: "Articles",
      component: () => import("@/pages/articles.vue"),
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/pages/contacts.vue"),
    },
  ],
});
