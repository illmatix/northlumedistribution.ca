# Product Catalog Guide

## Data Structure

All product data lives in `src/data/brands.json`. The structure is:

```json
{
  "categories": [
    {
      "name": "Category Name",
      "slug": "category-slug",
      "brands": [
        {
          "name": "Brand Name",
          "slug": "brand-slug",
          "description": "Short description of the brand/product.",
          "featured": false,
          "pages": [
            {
              "src": "/images/products/brand-slug/page-01.webp",
              "alt": "Descriptive alt text"
            }
          ]
        }
      ]
    }
  ]
}
```

## Current Categories

| Category              | Brands |
|-----------------------|--------|
| Electronics & Tech    | 2      |
| Candy & Confections   | 5      |
| Food & Snacks         | 3      |
| Toys & Novelties      | 3      |
| Accessories           | 8      |
| Pet                   | 1      |
| Outdoor               | 1      |

## Adding a New Brand

1. **Add catalog images** to `public/images/products/<brand-slug>/`:
   - Use WebP format for best compression
   - Name pages sequentially: `page-01.webp`, `page-02.webp`, etc.
   - If converting from PDF, use the scripts below

2. **Update `src/data/brands.json`**:
   - Add the brand object to the appropriate category's `brands` array
   - Set `featured: true` if it should appear on the home page (the FeaturedProducts section randomly picks 4 featured brands)
   - Include all page image references in the `pages` array

3. **Verify** by running `yarn dev` and checking `/products`

## Adding a New Category

1. Add a new category object to the `categories` array in `brands.json`
2. Include a `name`, `slug`, and `brands` array
3. The ProductsPage will automatically pick it up

## Image Processing Scripts

### From Individual PDF Flyers

```bash
# Edit scripts/convert-flyers.sh to add your brand mapping, then:
bash scripts/convert-flyers.sh
```

This script:
- Converts PDF pages to PNG at 300 DPI
- Crops the original footer
- Resizes to max 1600px wide
- Adds a branded footer bar with contact email and logo
- Outputs WebP at quality 85

**Requirements:** `pdftoppm` (poppler-utils), ImageMagick

### From Master Catalog PDF

```bash
yarn process-catalog
# or: python3 scripts/process-catalog.py
```

This script:
- Processes a multi-page catalog PDF
- Maps specific pages to brands via `PAGE_BRAND_MAP`
- Adds branded footer with company info
- Outputs per-brand WebP images

**Requirements:** Python 3, Pillow, `pdftoppm` (poppler-utils)

### Generating Brand Assets (Favicons, OG Image)

```bash
yarn generate-assets
# or: python3 scripts/generate-brand-assets.py
```

Generates favicon PNGs, apple-touch-icon, and Open Graph image using brand colors and the diamond mark.

**Requirements:** Python 3, Pillow

## Deep Linking

Products support hash-based deep links:
- `/products#brand-slug` — scrolls to and highlights a specific brand
- `/products?q=search+term` — pre-fills the search field

These are used by the FeaturedProducts section on the home page.
