<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-accent-950 py-24 sm:py-32"
  >
    <!-- Layer 1: Dot pattern -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.15]"
      aria-hidden="true"
      :style="{ backgroundImage: dotPattern, backgroundSize: '24px 24px' }"
    ></div>

    <!-- Layer 2: Floating geometric shapes -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute -left-16 top-1/4 h-64 w-64 animate-float rounded-full bg-accent-500/[0.07] blur-2xl"
      ></div>
      <div
        class="absolute -right-20 top-1/3 h-80 w-80 animate-float-slow rounded-full bg-brand-400/[0.08] blur-2xl"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 h-48 w-48 animate-float-slower rounded-full bg-accent-400/[0.06] blur-xl"
      ></div>
    </div>

    <!-- Layer 2.5: World map -->
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]" aria-hidden="true">
      <img src="/images/world.svg" alt="" class="h-full w-full object-contain" />
    </div>

    <!-- Layer 3: Gradient overlay for depth -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-950/0 via-brand-950/30 to-brand-950/60"
      aria-hidden="true"
    ></div>

    <!-- Layer 4: Content -->
    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-brand-100">
          {{ t('hero.subtitle') }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
            :to="localePath('/contact')"
            class="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            @click="trackCta('get_in_touch')"
          >
            {{ t('hero.cta_primary') }}
          </router-link>
          <router-link
            :to="localePath('/products')"
            class="text-sm font-semibold leading-6 text-brand-200 transition-colors hover:text-white"
            @click="trackCta('view_products')"
          >
            {{ t('hero.cta_secondary') }} <span aria-hidden="true">&rarr;</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="absolute inset-x-0 -bottom-px" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
        class="block h-8 w-full sm:h-12"
      >
        <path d="M0 48h1440V24C1200 0 960 0 720 24 480 48 240 48 0 24v24z" fill="white" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScrollReveal } from '@/composables/useScrollReveal';
import { useLocalePath } from '@/composables/useLocalePath';
import { trackEvent } from '@/composables/useAnalytics';

const { t } = useI18n();
const localePath = useLocalePath();

const sectionRef = ref(null);
useScrollReveal(sectionRef, { threshold: 0.1 });

function trackCta(label) {
  trackEvent('cta_click', { event_label: label, location: 'hero' });
}

const dotPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%2314b8a6'/%3E%3C/svg%3E")`;
</script>
