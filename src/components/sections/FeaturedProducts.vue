<template>
  <section ref="sectionRef" class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ t('featured.title') }}
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          {{ t('featured.subtitle') }}
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4"
      >
        <router-link
          v-for="brand in featured"
          :key="brand.slug"
          :to="localePath(`/products#${brand.slug}`)"
          class="group rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
          @click="trackEvent('featured_product_click', { brand_name: brand.name, category: brand.categorySlug })"
        >
          <div class="overflow-hidden rounded-t-2xl">
            <img
              :src="brand.pages[0].src"
              :alt="brand.name"
              loading="lazy"
              decoding="async"
              class="block aspect-[4/3] w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-900">{{ brand.name }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ t(`categories.${brand.categorySlug}`) }}</p>
            <p class="mt-2 text-sm leading-6 text-gray-600">{{ t(`brands.${brand.slug}.description`) }}</p>
          </div>
        </router-link>
      </div>
      <div class="mt-12 text-center">
        <router-link
          :to="localePath('/products')"
          class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-500"
        >
          {{ t('featured.view_all') }} <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useLocalePath } from '@/composables/useLocalePath'
import { trackEvent } from '@/composables/useAnalytics'
import brandsData from '@/data/brands.json'

const { t } = useI18n()
const localePath = useLocalePath()

const sectionRef = ref(null)
useScrollReveal(sectionRef)

// Collect all featured brands with their category slug
const allFeatured = brandsData.categories.flatMap((cat) =>
  cat.brands
    .filter((b) => b.featured)
    .map((b) => ({ ...b, categorySlug: cat.slug })),
)

// Pick 4 random brands (shuffled on each page load)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const featured = shuffle(allFeatured).slice(0, 4)
</script>
