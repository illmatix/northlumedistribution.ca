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

  it('defines all expected routes', () => {
    const paths = routes.map((r) => r.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/products');
    expect(paths).toContain('/contact');
    expect(paths).toContain('/privacy');
    expect(paths).toContain('/terms');
  });

  it('has a catch-all 404 route', () => {
    const notFound = routes.find((r) => r.name === 'NotFound');
    expect(notFound).toBeDefined();
    expect(notFound.path).toBe('/:pathMatch(.*)*');
  });

  it('every route has a meta.title', () => {
    for (const route of routes) {
      expect(route.meta).toBeDefined();
      expect(typeof route.meta.title).toBe('string');
      expect(route.meta.title.length).toBeGreaterThan(0);
    }
  });

  it('all content routes have meta.description', () => {
    const contentRoutes = routes.filter(
      (r) => r.name !== 'NotFound' && r.path !== '/:pathMatch(.*)*',
    );
    for (const route of contentRoutes) {
      expect(route.meta.description).toBeDefined();
      expect(typeof route.meta.description).toBe('string');
    }
  });

  it('all route components are lazy-loaded', () => {
    for (const route of routes) {
      expect(typeof route.component).toBe('function');
    }
  });
});
