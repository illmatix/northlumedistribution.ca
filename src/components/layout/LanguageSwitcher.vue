<template>
  <div ref="dropdownRef" class="relative text-sm">
    <button
      type="button"
      class="flex items-center gap-1 rounded-md px-2 py-1 font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      {{ currentLabel }}
      <svg
        class="h-4 w-4 transition-transform"
        :class="{ 'rotate-180': open }"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-1 w-28 rounded-md border border-gray-100 bg-white py-1 shadow-lg"
      role="listbox"
    >
      <router-link
        v-for="loc in locales"
        :key="loc.code"
        :to="switchLocalePath(loc.code)"
        role="option"
        :aria-selected="loc.code === currentLocale"
        class="block px-3 py-1.5 font-medium transition-colors"
        :class="
          loc.code === currentLocale
            ? 'bg-brand-50 text-brand-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        "
        @click="open = false"
      >
        {{ loc.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const dropdownRef = ref(null)

const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'pt-br', label: 'Português' },
  { code: 'es', label: 'Español' },
]

const currentLocale = computed(() => route.params.locale || 'en')
const currentLabel = computed(() => locales.find((l) => l.code === currentLocale.value)?.label || 'English')

function switchLocalePath(code) {
  const pathWithoutLocale = route.fullPath.replace(/^\/(en|fr|pt-br|es)/, '')
  return `/${code}${pathWithoutLocale || '/'}`
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
