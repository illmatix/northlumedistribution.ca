<template>
  <footer class="border-t border-gray-100 bg-gray-50">
    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div>
          <img src="@/assets/images/logo.svg" alt="North Lume Distribution" class="h-7 w-auto" />
        </div>
        <div class="mt-4 flex gap-6 md:mt-0">
          <router-link
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm text-gray-500 transition-colors hover:text-brand-600"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-200 pt-8">
        <p class="text-center text-sm text-gray-400">
          &copy; {{ currentYear }} North Lume Distribution. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const footerLinks = [
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
];
</script>
