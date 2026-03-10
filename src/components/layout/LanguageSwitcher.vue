<template>
  <div class="flex items-center gap-1 text-sm">
    <router-link
      v-for="loc in locales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="rounded px-2 py-1 font-medium transition-colors"
      :class="
        loc.code === currentLocale
          ? 'bg-brand-50 text-brand-600'
          : 'text-gray-500 hover:text-gray-700'
      "
    >
      {{ loc.label }}
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'pt-br', label: 'PT' },
]

const currentLocale = computed(() => route.params.locale || 'en')

function switchLocalePath(code) {
  const pathWithoutLocale = route.fullPath.replace(/^\/(en|fr|pt-br)/, '')
  return `/${code}${pathWithoutLocale || '/'}`
}
</script>
