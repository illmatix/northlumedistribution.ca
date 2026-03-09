# North Lume Distribution

Marketing site and product catalog for **North Lume Distribution** — a product distribution company serving Canada, USA, and Brazil.

**Live site:** [northlumedistribution.ca](https://northlumedistribution.ca)

## Features

- Product catalog with search, category filtering, and image lightbox
- Contact form (Web3Forms)
- Responsive design (mobile, tablet, desktop)
- SEO optimized (meta tags, JSON-LD, sitemap, Open Graph)
- Google Analytics 4
- Automatic deployment via GitHub Actions

## Quick Start

```bash
# Enable Yarn 4 via corepack (one-time)
corepack enable

# Install dependencies
yarn install

# Start dev server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command           | Description                     |
|-------------------|---------------------------------|
| `yarn dev`        | Start dev server                |
| `yarn build`      | Production build                |
| `yarn test`       | Unit tests (watch mode)         |
| `yarn test:run`   | Unit tests (single run)         |
| `yarn lint`       | ESLint check                    |
| `yarn lint:fix`   | ESLint auto-fix                 |
| `yarn format`     | Prettier format                 |
| `yarn e2e`        | Playwright end-to-end tests     |

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5** (build tooling)
- **TailwindCSS 4** (styling)
- **vue-router 4** (client-side routing)
- **Vitest** + **Playwright** (testing)
- **GitHub Pages** + **Cloudflare** (hosting & DNS)

## Project Structure

```
src/
├── main.js          # App entry, router, SEO hooks
├── App.vue          # Root layout
├── pages/           # Route views (Home, Products, Contact)
├── components/      # Reusable UI components
├── composables/     # Vue composables (useJsonLd)
├── data/            # Product catalog (brands.json)
└── styles/          # TailwindCSS entry
```

## Managing Products

Product data lives in [`src/data/brands.json`](src/data/brands.json). To add a brand:

1. Add WebP catalog images to `public/images/products/<brand-slug>/`
2. Add the brand entry to the appropriate category in `brands.json`
3. Set `featured: true` to show it on the home page

See [docs/product-catalog.md](docs/product-catalog.md) for full details and image processing scripts.

## Deployment

Pushing to `main` automatically builds and deploys to GitHub Pages via GitHub Actions.

See [docs/deployment.md](docs/deployment.md) for DNS, HTTPS, and troubleshooting details.

## Documentation

- [Architecture](docs/architecture.md) — tech stack, structure, and design decisions
- [Development Guide](docs/development.md) — setup, scripts, conventions, and testing
- [Product Catalog](docs/product-catalog.md) — managing products and processing images
- [Deployment](docs/deployment.md) — CI/CD, DNS, HTTPS, and troubleshooting
- [SEO & Structured Data](docs/seo.md) — meta tags, JSON-LD, analytics, and crawlability

## License

See [LICENSE](LICENSE).
