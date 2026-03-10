import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.gtag;
    delete window.dataLayer;
    document.querySelectorAll('script[src*="googletagmanager"]').forEach((s) => s.remove());
    vi.resetModules();
  });

  it('returns null consent when no localStorage value', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { consent } = useConsent();

    expect(consent.value).toBeNull();
  });

  it('does not load GA4 when no prior consent', async () => {
    await import('@/composables/useConsent');

    expect(window.gtag).toBeUndefined();
  });

  it('accept() sets consent to accepted in localStorage', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { accept } = useConsent();

    accept();

    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
  });

  it('accept() updates the reactive consent value', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { consent, accept } = useConsent();

    accept();

    expect(consent.value).toBe('accepted');
  });

  it('accept() loads GA4 and creates gtag function', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { accept } = useConsent();

    accept();

    expect(typeof window.gtag).toBe('function');
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it('accept() injects gtag script tag', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { accept } = useConsent();

    accept();

    const script = document.querySelector('script[src*="googletagmanager"]');
    expect(script).not.toBeNull();
    expect(script.src).toContain('G-HX3R7GECKL');
  });

  it('decline() sets consent to declined in localStorage', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { decline } = useConsent();

    decline();

    expect(localStorage.getItem('cookie_consent')).toBe('declined');
  });

  it('decline() updates the reactive consent value', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { consent, decline } = useConsent();

    decline();

    expect(consent.value).toBe('declined');
  });

  it('decline() does not load GA4', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { decline } = useConsent();

    decline();

    expect(window.gtag).toBeUndefined();
  });

  it('loads GA4 automatically when localStorage has accepted', async () => {
    localStorage.setItem('cookie_consent', 'accepted');

    await import('@/composables/useConsent');

    expect(typeof window.gtag).toBe('function');
  });

  it('does not load GA4 when localStorage has declined', async () => {
    localStorage.setItem('cookie_consent', 'declined');

    await import('@/composables/useConsent');

    expect(window.gtag).toBeUndefined();
  });

  it('calling accept() twice does not inject duplicate scripts', async () => {
    const { useConsent } = await import('@/composables/useConsent');
    const { accept } = useConsent();

    accept();
    accept();

    const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
    expect(scripts.length).toBe(1);
  });
});
