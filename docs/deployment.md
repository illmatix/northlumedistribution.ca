# Deployment

## Overview

The site is deployed to **GitHub Pages** via a GitHub Actions workflow, with DNS managed by **Cloudflare**.

## Automatic Deployment

Every push to the `main` branch triggers `.github/workflows/deploy.yml`, which:

1. Checks out the code
2. Enables corepack (for Yarn 4)
3. Sets up Node.js 20 with Yarn cache
4. Installs dependencies (`yarn install --immutable`)
5. Builds the site (`yarn build`)
6. Copies `dist/index.html` → `dist/404.html` (SPA routing fallback)
7. Uploads and deploys to GitHub Pages

Deployments typically complete in under 60 seconds.

## SPA Routing on GitHub Pages

GitHub Pages doesn't natively support SPA routing — requests to `/products` or `/contact` would 404. The workaround:

- At build time, `index.html` is copied to `404.html`
- When GitHub Pages can't find a matching file, it serves `404.html`
- Vue Router picks up the URL and renders the correct page

## Custom Domain

### GitHub Pages Config

- `public/CNAME` contains `northlumedistribution.ca` — this file is copied to `dist/` on build
- In GitHub repo settings: **Settings → Pages → Custom domain** is set to `northlumedistribution.ca`

### Cloudflare DNS

Two CNAME records point to GitHub Pages:

| Type  | Name  | Content              | Proxy |
|-------|-------|----------------------|-------|
| CNAME | `@`   | `illmatix.github.io` | DNS only (gray cloud) |
| CNAME | `www` | `illmatix.github.io` | DNS only (gray cloud) |

**Important:** Proxy must be **DNS only** (gray cloud, not orange). GitHub Pages needs direct access for Let's Encrypt HTTPS certificate issuance.

## HTTPS

GitHub Pages automatically provisions a Let's Encrypt certificate once DNS resolves correctly. This can take up to 15 minutes after initial DNS setup. Enforce HTTPS is enabled in GitHub Pages settings.

## Manual Deployment

If you need to build locally:

```bash
yarn build
# dist/ contains the production site
```

The `dist/` directory can be served by any static file host.

## Troubleshooting

| Issue | Solution |
|-------|---------|
| 404 on page refresh | Verify `404.html` exists in `dist/` |
| HTTPS not working | Ensure Cloudflare proxy is **off** (gray cloud) |
| Build fails in CI | Check `yarn install --immutable` — `yarn.lock` must be committed |
| Old content after deploy | Check Actions tab for successful completion; hard refresh browser |
| DNS not resolving | Verify CNAME records in Cloudflare; allow up to 48h for propagation |
