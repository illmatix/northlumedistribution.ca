import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Vue app to prevent full app mount
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    createApp: vi.fn(() => ({
      use: vi.fn(),
      mount: vi.fn(),
    })),
  };
});

describe('route configuration', () => {
  let routes;

  beforeEach(async () => {
    vi.resetModules();

    // Mock createRouter to capture routes
    vi.doMock('vue-router', () => ({
      createRouter: vi.fn((config) => {
        routes = config.routes;
        return {
          afterEach: vi.fn(),
          beforeEach: vi.fn(),
          install: vi.fn(),
        };
      }),
      createWebHistory: vi.fn(),
    }));

    await import('@/main.js');
  });

  it('defines a locale-prefixed parent route', () => {
    const localeRoute = routes.find((r) => r.path === '/:locale');
    expect(localeRoute).toBeDefined();
    expect(localeRoute.children).toBeDefined();
    expect(localeRoute.children.length).toBeGreaterThan(0);
  });

  it('defines all expected child routes under /:locale', () => {
    const localeRoute = routes.find((r) => r.path === '/:locale');
    const childPaths = localeRoute.children.map((r) => r.path);
    expect(childPaths).toContain('');
    expect(childPaths).toContain('products');
    expect(childPaths).toContain('contact');
    expect(childPaths).toContain('privacy');
    expect(childPaths).toContain('terms');
  });

  it('has a catch-all 404 route under /:locale', () => {
    const localeRoute = routes.find((r) => r.path === '/:locale');
    const notFound = localeRoute.children.find((r) => r.name === 'NotFound');
    expect(notFound).toBeDefined();
    expect(notFound.path).toBe(':pathMatch(.*)*');
  });

  it('redirects bare / to /en/', () => {
    const rootRedirect = routes.find((r) => r.path === '/');
    expect(rootRedirect).toBeDefined();
    expect(rootRedirect.redirect).toBe('/en/');
  });

  it('all page route components are lazy-loaded', () => {
    const localeRoute = routes.find((r) => r.path === '/:locale');
    for (const child of localeRoute.children) {
      expect(typeof child.component).toBe('function');
    }
  });
});
