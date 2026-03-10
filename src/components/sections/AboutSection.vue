<template>
  <section ref="sectionRef" class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Who We Are
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          North Lume Distribution is a distributor with over 8 years of experience in the market,
          supplying high-quality products to gas stations, convenience stores, supermarkets, and
          retail businesses across Canada, the USA, and Brazil.
        </p>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          Our mission is to provide reliable distribution, competitive prices, and consistent supply
          for our partners. Whether you're a growing brand looking for wider reach or an established
          company seeking a dependable distribution partner, we tailor our solutions to fit your
          business.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useScrollReveal } from '@/composables/useScrollReveal';

const sectionRef = ref(null);
useScrollReveal(sectionRef);
</script>
