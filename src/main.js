import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './styles/main.css';

const SITE_URL = 'https://northlumedistribution.ca';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
    meta: {
      title: 'North Lume Distribution | Product Distribution Across Canada, USA & Brazil',
      description:
        'North Lume Distribution - Your trusted partner in product distribution across Canada, USA, and Brazil.',
    },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./pages/ProductsPage.vue'),
    meta: {
      title: 'Our Products | North Lume Distribution',
      description:
        'Browse our full catalog of products across electronics, candy, snacks, toys, accessories, pet treats, and outdoor gear.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./pages/ContactPage.vue'),
    meta: {
      title: 'Contact Us | North Lume Distribution',
      description:
        'Get in touch to learn how North Lume Distribution can support your product distribution needs across Canada, USA, and Brazil.',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      title: '404 — Page Not Found | North Lume Distribution',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  },
});

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

router.afterEach((to) => {
  const { title, description } = to.meta;
  const url = `${SITE_URL}${to.fullPath}`;

  document.title = title || 'North Lume Distribution';

  if (description) {
    setMeta('description', description);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Open Graph
  setMeta('og:url', url, 'property');
  setMeta('og:title', title || 'North Lume Distribution', 'property');
  if (description) {
    setMeta('og:description', description, 'property');
  }

  // GA4 virtual pageview
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: url,
      page_path: to.fullPath,
    });
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
