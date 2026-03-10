<template>
  <div class="mx-auto max-w-3xl px-6 py-16 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ t('legal.privacy_title') }}</h1>
    <p class="mt-4 text-sm text-gray-500">{{ t('legal.last_updated') }}</p>

    <!-- eslint-disable-next-line vue/no-v-html -- Build-time import, not user content -->
    <div class="prose prose-gray mt-10 max-w-none" v-html="content"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const legalContent = import.meta.glob('@/i18n/legal/privacy.*.html', { query: '?raw', eager: true })

const content = computed(() => {
  const key = Object.keys(legalContent).find((k) => k.includes(`privacy.${locale.value}.html`))
  return key ? legalContent[key].default : ''
})
</script>
