import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent } from '@/composables/useAnalytics';

describe('trackEvent', () => {
  let gtagSpy;

  beforeEach(() => {
    gtagSpy = vi.fn();
    window.gtag = gtagSpy;
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('calls window.gtag with event name and params', () => {
    trackEvent('cta_click', { event_label: 'get_in_touch' });

    expect(gtagSpy).toHaveBeenCalledWith('event', 'cta_click', {
      event_label: 'get_in_touch',
    });
  });

  it('passes empty params by default', () => {
    trackEvent('page_scroll');

    expect(gtagSpy).toHaveBeenCalledWith('event', 'page_scroll', {});
  });

  it('does nothing when gtag is not defined', () => {
    delete window.gtag;

    expect(() => trackEvent('test_event')).not.toThrow();
  });

  it('does nothing when gtag is not a function', () => {
    window.gtag = 'not a function';

    expect(() => trackEvent('test_event')).not.toThrow();
  });
});
