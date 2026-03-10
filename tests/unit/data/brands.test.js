import { describe, it, expect } from 'vitest';
import brandsData from '@/data/brands.json';

describe('brands.json data integrity', () => {
  it('has categories array', () => {
    expect(Array.isArray(brandsData.categories)).toBe(true);
    expect(brandsData.categories.length).toBeGreaterThan(0);
  });

  it('every category has name, slug, and brands', () => {
    for (const cat of brandsData.categories) {
      expect(cat).toHaveProperty('name');
      expect(cat).toHaveProperty('slug');
      expect(cat).toHaveProperty('brands');
      expect(typeof cat.name).toBe('string');
      expect(typeof cat.slug).toBe('string');
      expect(Array.isArray(cat.brands)).toBe(true);
    }
  });

  it('every brand has name, slug, description, featured, and pages', () => {
    for (const cat of brandsData.categories) {
      for (const brand of cat.brands) {
        expect(brand).toHaveProperty('name');
        expect(brand).toHaveProperty('slug');
        expect(brand).toHaveProperty('description');
        expect(brand).toHaveProperty('featured');
        expect(brand).toHaveProperty('pages');
        expect(typeof brand.name).toBe('string');
        expect(typeof brand.slug).toBe('string');
        expect(typeof brand.description).toBe('string');
        expect(typeof brand.featured).toBe('boolean');
        expect(Array.isArray(brand.pages)).toBe(true);
        expect(brand.pages.length).toBeGreaterThan(0);
      }
    }
  });

  it('every page has src and alt', () => {
    for (const cat of brandsData.categories) {
      for (const brand of cat.brands) {
        for (const page of brand.pages) {
          expect(page).toHaveProperty('src');
          expect(page).toHaveProperty('alt');
          expect(typeof page.src).toBe('string');
          expect(typeof page.alt).toBe('string');
        }
      }
    }
  });

  it('has no duplicate category slugs', () => {
    const slugs = brandsData.categories.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has no duplicate brand slugs across all categories', () => {
    const slugs = brandsData.categories.flatMap((c) => c.brands.map((b) => b.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has at least one featured brand', () => {
    const featured = brandsData.categories.flatMap((c) => c.brands.filter((b) => b.featured));
    expect(featured.length).toBeGreaterThan(0);
  });

  it('all image src paths start with /', () => {
    for (const cat of brandsData.categories) {
      for (const brand of cat.brands) {
        for (const page of brand.pages) {
          expect(page.src).toMatch(/^\//);
        }
      }
    }
  });
});
