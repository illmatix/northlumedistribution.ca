<template>
  <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Products</h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      North Lume Distribution carries a wide range of products across multiple categories. Browse
      our catalog to see what we can bring to your shelves.
    </p>

    <!-- Search & Filters -->
    <div class="mt-10 space-y-4">
      <!-- Search input -->
      <div class="relative">
        <svg class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search products, brands, categories..."
          class="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <button
          v-if="search"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="search = ''"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Category pills -->
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
          :class="!activeCategory ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          @click="activeCategory = null; activeBrand = null"
        >
          All Categories
        </button>
        <button
          v-for="cat in brandsData.categories"
          :key="cat.slug"
          type="button"
          class="rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
          :class="activeCategory === cat.slug ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          @click="selectCategory(cat.slug)"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Brand pills (shown when a category is active or search is empty) -->
      <div v-if="visibleBrandPills.length > 1" class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium transition-colors"
          :class="!activeBrand ? 'border-accent-500 bg-accent-50 text-accent-700' : 'bg-white text-gray-600 hover:bg-gray-50'"
          @click="activeBrand = null"
        >
          All Brands
        </button>
        <button
          v-for="brand in visibleBrandPills"
          :key="brand.slug"
          type="button"
          class="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium transition-colors"
          :class="activeBrand === brand.slug ? 'border-accent-500 bg-accent-50 text-accent-700' : 'bg-white text-gray-600 hover:bg-gray-50'"
          @click="activeBrand = activeBrand === brand.slug ? null : brand.slug"
        >
          {{ brand.name }}
        </button>
      </div>

      <!-- Active filter summary -->
      <div v-if="activeCategory || activeBrand || search" class="flex items-center gap-2 text-sm text-gray-500">
        <span>{{ filteredBrandCount }} {{ filteredBrandCount === 1 ? 'brand' : 'brands' }} found</span>
        <button
          type="button"
          class="ml-1 text-brand-600 hover:text-brand-700 hover:underline"
          @click="clearFilters"
        >
          Clear all
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="mt-12 space-y-16">
      <template v-for="category in filteredCategories" :key="category.slug">
        <section v-if="category.brands.length">
          <button
            type="button"
            class="flex w-full items-center gap-3 text-left"
            @click="toggle(category.slug)"
          >
            <svg
              class="h-5 w-5 shrink-0 text-gray-400 transition-transform"
              :class="{ 'rotate-90': expanded[category.slug] }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <h2 class="text-2xl font-bold text-gray-900">{{ category.name }}</h2>
            <span class="text-sm text-gray-400">({{ category.brands.length }})</span>
          </button>

          <div v-show="expanded[category.slug]" class="mt-8 space-y-12">
            <div
              v-for="brand in category.brands"
              :id="brand.slug"
              :key="brand.slug"
              class="scroll-mt-24"
            >
              <h3 class="text-xl font-semibold text-gray-900">{{ brand.name }}</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600">{{ brand.description }}</p>
              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <CatalogImage
                  v-for="(page, pageIdx) in brand.pages"
                  :key="page.src"
                  :src="page.src"
                  :alt="page.alt"
                  @click="openLightbox(brand, pageIdx)"
                />
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- No results -->
      <div v-if="filteredBrandCount === 0" class="py-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p class="mt-4 text-lg font-medium text-gray-900">No products found</p>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
        <button
          type="button"
          class="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          @click="clearFilters"
        >
          Clear all filters
        </button>
      </div>
    </div>

    <ImageLightbox
      :open="lightbox.open"
      :src="lightbox.src"
      :alt="lightbox.alt"
      :current="lightbox.index"
      :total="lightbox.total"
      @close="closeLightbox"
      @prev="prevImage"
      @next="nextImage"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import brandsData from '@/data/brands.json'
import { trackEvent } from '@/composables/useAnalytics'
import CatalogImage from '@/components/products/CatalogImage.vue'
import ImageLightbox from '@/components/products/ImageLightbox.vue'
import { useJsonLd } from '@/composables/useJsonLd'

const route = useRoute()

// ── JSON-LD: BreadcrumbList ─────────────────────────────────────────────
useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://northlumedistribution.ca/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: 'https://northlumedistribution.ca/products',
    },
  ],
})

// ── JSON-LD: ItemList with all brands ───────────────────────────────────
const allBrands = brandsData.categories.flatMap((cat) =>
  cat.brands.map((brand) => ({
    '@type': 'Product',
    name: brand.name,
    description: brand.description,
    image: `https://northlumedistribution.ca${brand.pages[0].src}`,
    url: `https://northlumedistribution.ca/products#${brand.slug}`,
    category: cat.name,
  })),
)

useJsonLd({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'North Lume Distribution Products',
  numberOfItems: allBrands.length,
  itemListElement: allBrands.map((brand, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: brand,
  })),
})

// ── Filters ─────────────────────────────────────────────────────────────
const search = ref('')
const activeCategory = ref(null)
const activeBrand = ref(null)

function selectCategory(slug) {
  if (activeCategory.value === slug) {
    activeCategory.value = null
  } else {
    activeCategory.value = slug
    activeBrand.value = null
    const cat = brandsData.categories.find((c) => c.slug === slug)
    if (cat) trackEvent('category_filter', { category: cat.name })
  }
}

function clearFilters() {
  search.value = ''
  activeCategory.value = null
  activeBrand.value = null
}

// Brand pills to show — scoped to selected category or all
const visibleBrandPills = computed(() => {
  const cats = activeCategory.value
    ? brandsData.categories.filter((c) => c.slug === activeCategory.value)
    : brandsData.categories
  return cats.flatMap((c) => c.brands)
})

// Filtered categories based on search + pill selection
const filteredCategories = computed(() => {
  const q = search.value.toLowerCase().trim()

  return brandsData.categories
    .filter((cat) => !activeCategory.value || cat.slug === activeCategory.value)
    .map((cat) => ({
      ...cat,
      brands: cat.brands.filter((brand) => {
        if (activeBrand.value && brand.slug !== activeBrand.value) return false
        if (!q) return true
        return (
          brand.name.toLowerCase().includes(q) ||
          brand.description.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q) ||
          brand.slug.toLowerCase().includes(q)
        )
      }),
    }))
})

const filteredBrandCount = computed(() =>
  filteredCategories.value.reduce((sum, cat) => sum + cat.brands.length, 0),
)

// ── Expand / Collapse ───────────────────────────────────────────────────
const expanded = reactive(
  Object.fromEntries(brandsData.categories.map((c) => [c.slug, true])),
)

function toggle(slug) {
  expanded[slug] = !expanded[slug]
}

// ── Lightbox ────────────────────────────────────────────────────────────
const lightbox = reactive({
  open: false,
  src: '',
  alt: '',
  index: 0,
  total: 0,
  pages: [],
})

function openLightbox(brand, index) {
  lightbox.pages = brand.pages
  lightbox.total = brand.pages.length
  lightbox.index = index
  lightbox.src = brand.pages[index].src
  lightbox.alt = brand.pages[index].alt
  lightbox.open = true
  trackEvent('product_image_view', { brand_name: brand.name })
}

function closeLightbox() {
  lightbox.open = false
}

function prevImage() {
  lightbox.index = (lightbox.index - 1 + lightbox.total) % lightbox.total
  lightbox.src = lightbox.pages[lightbox.index].src
  lightbox.alt = lightbox.pages[lightbox.index].alt
}

function nextImage() {
  lightbox.index = (lightbox.index + 1) % lightbox.total
  lightbox.src = lightbox.pages[lightbox.index].src
  lightbox.alt = lightbox.pages[lightbox.index].alt
}

// ── Search tracking (debounced) ──────────────────────────────────────────
let searchTimeout = null
watch(search, (val) => {
  clearTimeout(searchTimeout)
  const q = val.trim()
  if (q.length >= 2) {
    searchTimeout = setTimeout(() => {
      trackEvent('product_search', { search_term: q })
    }, 1000)
  }
})

// ── Hash anchor scroll + search query param ─────────────────────────────
onMounted(() => {
  if (route.query.q) {
    search.value = route.query.q
  }
  if (route.hash) {
    // If hash matches a brand, select its category + brand
    for (const cat of brandsData.categories) {
      const brand = cat.brands.find((b) => `#${b.slug}` === route.hash)
      if (brand) {
        activeCategory.value = cat.slug
        activeBrand.value = brand.slug
        break
      }
    }
    requestAnimationFrame(() => {
      const el = document.querySelector(route.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }
})
</script>
