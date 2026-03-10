import { describe, it, expect, beforeEach } from 'vitest';
import { createApp, defineComponent, ref, nextTick } from 'vue';
import { useJsonLd } from '@/composables/useJsonLd';

function mountWithJsonLd(schema) {
  const host = document.createElement('div');
  document.body.appendChild(host);

  const app = createApp(
    defineComponent({
      setup() {
        useJsonLd(schema);
        return () => null;
      },
    }),
  );
  app.mount(host);
  return { app, host };
}

function getJsonLdScripts() {
  return document.querySelectorAll('script[type="application/ld+json"]');
}

describe('useJsonLd', () => {
  beforeEach(() => {
    // Clean up any leftover script tags
    getJsonLdScripts().forEach((s) => s.remove());
  });

  it('creates a script tag with JSON-LD data on mount', () => {
    const schema = { '@type': 'Organization', name: 'Test' };
    const { app } = mountWithJsonLd(schema);

    const scripts = getJsonLdScripts();
    expect(scripts.length).toBe(1);
    expect(JSON.parse(scripts[0].textContent)).toEqual(schema);

    app.unmount();
  });

  it('removes the script tag on unmount', () => {
    const { app } = mountWithJsonLd({ '@type': 'WebSite' });

    expect(getJsonLdScripts().length).toBe(1);

    app.unmount();

    expect(getJsonLdScripts().length).toBe(0);
  });

  it('works with a ref and updates when ref changes', async () => {
    const schema = ref({ '@type': 'Organization', name: 'Original' });
    const { app } = mountWithJsonLd(schema);

    expect(JSON.parse(getJsonLdScripts()[0].textContent).name).toBe('Original');

    schema.value = { '@type': 'Organization', name: 'Updated' };
    await nextTick();

    expect(JSON.parse(getJsonLdScripts()[0].textContent).name).toBe('Updated');

    app.unmount();
  });
});
