# CLAUDE.md — North Lume Distribution

## Project Overview

Static marketing site for North Lume Distribution, a product distribution company serving Canada, USA, and Brazil.

## Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build:** Vite 5
- **Styling:** TailwindCSS 4 (with `@tailwindcss/forms` and `@tailwindcss/typography`)
- **Routing:** vue-router 4 (history mode)
- **Testing:** Vitest (unit), Playwright (e2e)
- **Linting:** ESLint 9 + Prettier + lint-staged + Husky

## Key Directories

```
index.html          # App shell, GA4, JSON-LD (Organization + WebSite)
public/             # Static assets: favicons, images, robots.txt, sitemap.xml, llms.txt
src/
  main.js           # App entry, router config, per-page meta/SEO hooks
  App.vue           # Root component (NavBar + RouterView + Footer)
  pages/            # Route-level views: HomePage, ProductsPage, ContactPage
  components/       # Reusable UI components (sections/, products/)
  composables/      # Vue composables (useJsonLd.js)
  data/             # Static data (brands.json — product catalog)
  styles/           # TailwindCSS entry (main.css)
```

## Commands

```bash
yarn dev            # Start dev server
yarn build          # Production build
yarn test           # Run unit tests (watch mode)
yarn test:run       # Run unit tests once
yarn lint           # ESLint check
yarn lint:fix       # ESLint auto-fix
yarn format         # Prettier format
yarn e2e            # Playwright e2e tests
```

## Conventions

- Use Vue 3 `<script setup>` and Composition API exclusively
- TailwindCSS utility classes for all styling — no custom CSS unless necessary
- No heavy dependencies — keep the bundle light
- Product data lives in `src/data/brands.json` — update there to add/remove products
- SEO meta tags are managed via route `meta` objects + `router.afterEach` hook in `src/main.js`
- JSON-LD structured data uses `src/composables/useJsonLd.js` composable

---

## Behavioral Guidelines

### 1. Think Before Coding
State assumptions explicitly. If requirements are ambiguous, ask before implementing. Understand the problem fully before writing code.

### 2. Simplicity First
Write the minimum code needed to solve the problem. No speculative features, no premature abstractions, no "just in case" code. Three similar lines are better than a clever abstraction used once.

### 3. Surgical Changes
Touch only what's needed. Match existing code style, indentation, and naming conventions. Don't refactor surrounding code unless asked. Don't add comments, types, or docstrings to unchanged code.

### 4. Goal-Driven Execution
Define what success looks like before starting. Verify the solution works (build, tests, manual check). If something breaks, fix the root cause — don't patch around it.
