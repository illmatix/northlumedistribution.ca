# Development Guide

## Prerequisites

- **Node.js** >= 18.0.0
- **Corepack** enabled (`corepack enable`) — this activates Yarn 4
- No global Yarn install needed; corepack handles it

## Getting Started

```bash
# Enable corepack (one-time)
corepack enable

# Install dependencies
yarn install

# Start dev server
yarn dev
```

The dev server runs at `http://localhost:5173`.

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `yarn dev`        | Start Vite dev server                |
| `yarn build`      | Production build to `dist/`          |
| `yarn test`       | Run unit tests in watch mode         |
| `yarn test:run`   | Run unit tests once                  |
| `yarn lint`       | Check code with ESLint               |
| `yarn lint:fix`   | Auto-fix ESLint issues               |
| `yarn format`     | Format code with Prettier            |
| `yarn e2e`        | Run Playwright end-to-end tests      |

## Code Style

- **ESLint 9** with flat config (`eslint.config.js`)
- **Prettier** for formatting (`.prettierrc.json`)
- **lint-staged + Husky** enforce linting on commit
- **Tailwind plugin** for Prettier auto-sorts utility classes

Key rules:
- `no-unused-vars`: warn (underscore-prefixed params ignored)
- `no-console`: warn (console.warn/error allowed)
- `vue/multi-word-component-names`: off

## Conventions

- All components use `<script setup>` with Composition API
- TailwindCSS utility classes for styling — no custom CSS
- Path alias `@` maps to `src/` (e.g., `import brands from '@/data/brands.json'`)
- Route-level components live in `src/pages/`
- Reusable components live in `src/components/` organized by domain

## Testing

### Unit Tests (Vitest)

```bash
yarn test        # watch mode
yarn test:run    # single run
```

- Test files: `tests/**/*.{test,spec}.{js,ts}`
- Environment: jsdom
- Setup: `tests/setup.js`
- Globals enabled (no need to import `describe`/`test`/`expect`)

### End-to-End Tests (Playwright)

```bash
yarn e2e
```

- Test directory: `tests/e2e/`
- Browsers: Chromium, Firefox, WebKit (desktop + mobile)
- Auto-starts dev server on port 5173
- Screenshots/video captured on first retry

## Adding Products

See [Product Catalog Guide](./product-catalog.md).
