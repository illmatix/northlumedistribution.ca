import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import i18n, { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './i18n';
import './styles/main.css';

const SITE_URL = 'https://northlumedistribution.ca';

const pageRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: 'products',
    name: 'products',
    component: () => import('./pages/ProductsPage.vue'),
  },
  {
    path: 'contact',
    name: 'contact',
    component: () => import('./pages/ContactPage.vue'),
  },
  {
    path: 'privacy',
    name: 'privacy',
    component: () => import('./pages/PrivacyPage.vue'),
  },
  {
    path: 'terms',
    name: 'terms',
    component: () => import('./pages/TermsPage.vue'),
  },
];

const routes = [
  {
    path: '/:locale',
    children: [
      ...pageRoutes,
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('./pages/NotFoundPage.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: `/${DEFAULT_LOCALE}/`,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => `/${DEFAULT_LOCALE}${to.fullPath}`,
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

// ── Locale guard ──────────────────────────────────────────────────────────
router.beforeEach((to) => {
  const locale = to.params.locale;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return `/${DEFAULT_LOCALE}${to.fullPath}`;
  }

  i18n.global.locale.value = locale;
  document.documentElement.lang = locale === 'pt-br' ? 'pt-BR' : locale;
});

// ── SEO meta helpers ──────────────────────────────────────────────────────
function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function updateHreflangTags(to) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  const pathWithoutLocale = to.fullPath.replace(/^\/(en|fr|pt-br)/, '') || '/';

  for (const loc of SUPPORTED_LOCALES) {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = loc;
    link.href = `${SITE_URL}/${loc}${pathWithoutLocale}`;
    document.head.appendChild(link);
  }

  const xDefault = document.createElement('link');
  xDefault.rel = 'alternate';
  xDefault.hreflang = 'x-default';
  xDefault.href = `${SITE_URL}/${DEFAULT_LOCALE}${pathWithoutLocale}`;
  document.head.appendChild(xDefault);
}

// ── After each navigation: update meta, canonical, hreflang, OG, GA4 ────
router.afterEach((to) => {
  const locale = to.params.locale || DEFAULT_LOCALE;
  const routeName = to.name || 'home';
  const t = i18n.global.t;

  // Page title & description
  const titleKey = `seo.${routeName}_title`;
  const descKey = `seo.${routeName}_description`;
  const title = t(titleKey) !== titleKey ? t(titleKey) : 'North Lume Distribution';
  const description = t(descKey) !== descKey ? t(descKey) : '';

  document.title = title;
  if (description) {
    setMeta('description', description);
  }

  // Canonical URL
  const url = `${SITE_URL}${to.fullPath}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  // Open Graph
  setMeta('og:url', url, 'property');
  setMeta('og:title', title, 'property');
  if (description) {
    setMeta('og:description', description, 'property');
  }

  const ogLocaleMap = { en: 'en_US', fr: 'fr_CA', 'pt-br': 'pt_BR' };
  setMeta('og:locale', ogLocaleMap[locale] || 'en_US', 'property');

  // Hreflang
  updateHreflangTags(to);

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
app.use(i18n);
app.use(router);
app.mount('#app');
