<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-brand-950 py-20 sm:py-24">
    <!-- Wave top -->
    <div class="absolute inset-x-0 -top-px" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
        class="block h-8 w-full sm:h-12"
      >
        <path d="M0 0h1440v24C1200 48 960 48 720 24 480 0 240 0 0 24V0z" fill="white" />
      </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="grid grid-cols-2 gap-8 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.key" class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20">
            <component :is="stat.icon" class="h-6 w-6 text-accent-400" />
          </div>
          <dd class="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {{ stat.value }}
          </dd>
          <dt class="mt-2 text-sm leading-6 text-brand-200">{{ t(`stats.${stat.key}`) }}</dt>
        </div>
      </dl>
    </div>

    <!-- Wave bottom -->
    <div class="absolute inset-x-0 -bottom-px" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
        class="block h-8 w-full sm:h-12"
      >
        <path d="M1440 48H0V24C240 0 480 0 720 24 960 48 1200 48 1440 24v24z" fill="white" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScrollReveal } from '@/composables/useScrollReveal';

const { t } = useI18n();

const sectionRef = ref(null);
useScrollReveal(sectionRef);

// Inline SVG icon components
const CalendarIcon = {
  render: () =>
    h(
      'svg',
      { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
        }),
      ],
    ),
};

const CubeIcon = {
  render: () =>
    h(
      'svg',
      { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25',
        }),
      ],
    ),
};

const GlobeIcon = {
  render: () =>
    h(
      'svg',
      { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418',
        }),
      ],
    ),
};

const SquaresIcon = {
  render: () =>
    h(
      'svg',
      { fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
        }),
      ],
    ),
};

const stats = [
  { value: '8+', key: 'years', icon: CalendarIcon },
  { value: '23+', key: 'products', icon: CubeIcon },
  { value: '3', key: 'countries', icon: GlobeIcon },
  { value: '7', key: 'categories', icon: SquaresIcon },
];
</script>
