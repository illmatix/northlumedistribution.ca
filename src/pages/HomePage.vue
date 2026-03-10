<template>
  <div>
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <FeaturedProducts />
    <ContactSection />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import StatsSection from '@/components/sections/StatsSection.vue';
import FeaturedProducts from '@/components/sections/FeaturedProducts.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import { trackEvent } from '@/composables/useAnalytics';

const thresholds = [25, 50, 75, 100];
const fired = new Set();

function onScroll() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;
  const percent = Math.round((window.scrollY / docHeight) * 100);

  for (const t of thresholds) {
    if (percent >= t && !fired.has(t)) {
      fired.add(t);
      trackEvent('scroll_depth', { percent: t, page: 'home' });
    }
  }

  if (fired.size === thresholds.length) {
    window.removeEventListener('scroll', onScroll);
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
