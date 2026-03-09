<template>
  <header class="border-b border-gray-100 bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
      <router-link to="/" class="flex items-center gap-2">
        <img src="@/assets/images/logo.svg" alt="North Lume Distribution" class="h-8 w-auto" />
      </router-link>

      <!-- Desktop nav -->
      <div class="hidden items-center gap-8 md:flex">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
          active-class="text-brand-700"
        >
          {{ link.label }}
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <button
        class="rounded-md p-2 text-gray-600 hover:bg-gray-50 md:hidden"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile nav -->
    <div v-if="mobileMenuOpen" class="border-t border-gray-100 md:hidden">
      <div class="space-y-1 px-6 py-4">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-600"
          active-class="bg-brand-50 text-brand-700"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
];
</script>
