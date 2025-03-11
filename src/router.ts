import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/index.vue"),
      meta: {
        title: "Rubbie Kelvin | Software Developer",
        description: "Rubbie Kelvin's portfolio showcasing software development skills and projects.",
        keywords: "Rubbie Kelvin, software developer, portfolio, web development"
      }
    },
    {
      path: "/projects",
      name: "Projects",
      component: () => import("@/pages/projects.vue"),
      meta: {
        title: "Projects | Rubbie Kelvin",
        description: "Explore the software development projects created by Rubbie Kelvin.",
        keywords: "projects, software development, web applications, Rubbie Kelvin"
      }
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import("@/pages/faq.vue"),
      meta: {
        title: "FAQ | Rubbie Kelvin",
        description: "Frequently asked questions about Rubbie Kelvin and his development work.",
        keywords: "FAQ, questions, Rubbie Kelvin, software development"
      }
    },
    {
      path: "/blog",
      name: "Articles",
      component: () => import("@/pages/articles.vue"),
      meta: {
        title: "Blog | Rubbie Kelvin",
        description: "Articles and thoughts on software development by Rubbie Kelvin.",
        keywords: "blog, articles, software development, web development, Rubbie Kelvin"
      }
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/pages/contacts.vue"),
      meta: {
        title: "Contact | Rubbie Kelvin",
        description: "Get in touch with Rubbie Kelvin for collaboration or inquiries.",
        keywords: "contact, Rubbie Kelvin, hire, collaboration"
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/404.vue"),
      meta: {
        title: "Page Not Found | Rubbie Kelvin",
        description: "The page you are looking for does not exist."
      }
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guard for updating document title and meta tags
router.beforeEach((to, _from, next) => {
  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title as string;
  } else {
    document.title = "Rubbie Kelvin | Portfolio";
  }
  
  // Update meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    if (to.meta.description) {
      descriptionMeta.setAttribute('content', to.meta.description as string);
    } else {
      descriptionMeta.setAttribute('content', "Portfolio of Rubbie Kelvin showcasing software development projects and skills.");
    }
  }
  
  // Update meta keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta && to.meta.keywords) {
    keywordsMeta.setAttribute('content', to.meta.keywords as string);
  }
  
  // Update Open Graph tags
  let ogTitleMeta = document.querySelector('meta[property="og:title"]');
  let ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
  let ogUrlMeta = document.querySelector('meta[property="og:url"]');
  
  if (ogTitleMeta) {
    if (to.meta.title) {
      ogTitleMeta.setAttribute('content', to.meta.title as string);
    } else {
      ogTitleMeta.setAttribute('content', "Rubbie Kelvin | Portfolio");
    }
  }
  
  if (ogDescriptionMeta) {
    if (to.meta.description) {
      ogDescriptionMeta.setAttribute('content', to.meta.description as string);
    } else {
      ogDescriptionMeta.setAttribute('content', "Portfolio of Rubbie Kelvin showcasing software development projects and skills.");
    }
  }
  
  if (ogUrlMeta) {
    ogUrlMeta.setAttribute('content', window.location.origin + to.path);
  }
  
  next();
});
