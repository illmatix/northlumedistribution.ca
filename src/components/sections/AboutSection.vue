<template>
  <section ref="sectionRef" class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ t('about.title') }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          {{ t('about.p1') }}
        </p>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          {{ t('about.p2') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScrollReveal } from '@/composables/useScrollReveal';

const { t } = useI18n();

const sectionRef = ref(null);
useScrollReveal(sectionRef);
</script>
