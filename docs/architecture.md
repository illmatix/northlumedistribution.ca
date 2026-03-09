# Architecture

## Overview

North Lume Distribution is a static single-page application (SPA) built with Vue 3 and deployed to GitHub Pages. It serves as a marketing site and product catalog for a distribution company operating across Canada, USA, and Brazil.

## Tech Stack

| Layer       | Technology                      |
|-------------|---------------------------------|
| Framework   | Vue 3 (Composition API)         |
| Build       | Vite 5                          |
| Styling     | TailwindCSS 4                   |
| Routing     | vue-router 4 (history mode)     |
| Hosting     | GitHub Pages                    |
| DNS/CDN     | Cloudflare                      |
| Contact     | Web3Forms API                   |
| Analytics   | Google Analytics 4              |

## Project Structure

```
src/
├── main.js              # App entry — router config, SEO hooks, GA4 tracking
├── App.vue              # Root component — header + router-view + footer
├── pages/               # Route-level views (lazy-loaded)
│   ├── HomePage.vue
│   ├── ProductsPage.vue
│   └── ContactPage.vue
├── components/
│   ├── layout/          # AppHeader, AppFooter
│   ├── sections/        # Page sections (Hero, About, Featured, CTA)
│   └── products/        # CatalogImage, ImageLightbox
├── composables/         # Vue composables (useJsonLd)
├── data/                # Static product data (brands.json)
└── styles/              # TailwindCSS entry point
```

## Routing

Three routes, all lazy-loaded for code splitting:

| Path        | Component         | Description              |
|-------------|-------------------|--------------------------|
| `/`         | HomePage          | Landing page             |
| `/products` | ProductsPage      | Product catalog browser  |
| `/contact`  | ContactPage       | Contact form             |

History mode is used (no `#` in URLs). A `404.html` copy of `index.html` is generated at build time to handle SPA routing on GitHub Pages.

## Data Flow

Product data is stored statically in `src/data/brands.json` — there is no backend API. The JSON file contains 8 categories with 28 brands, each with metadata and catalog image references.

Product images live in `public/images/products/<brand-slug>/` as pre-processed WebP files.

## SEO Strategy

- **Meta tags**: Managed via route `meta` objects and a `router.afterEach` hook that updates `<title>`, description, canonical URL, and Open Graph tags on each navigation.
- **JSON-LD**: Injected dynamically via the `useJsonLd` composable. Schemas include Organization, WebSite, BreadcrumbList, and ItemList.
- **Static files**: `robots.txt`, `sitemap.xml`, and `llms.txt` are served from `public/`.

## Build Output

Vite produces the `dist/` directory with:
- Hashed JS/CSS bundles
- A `vendor-vue` chunk (vue + vue-router separated for caching)
- All `public/` assets copied as-is
- Source maps enabled

## Deployment Pipeline

Push to `main` triggers a GitHub Actions workflow that:
1. Installs dependencies via Yarn (with corepack for Yarn 4)
2. Builds the site
3. Copies `index.html` → `404.html` for SPA fallback
4. Deploys to GitHub Pages

Custom domain (`northlumedistribution.ca`) is configured via `public/CNAME` and Cloudflare DNS.
