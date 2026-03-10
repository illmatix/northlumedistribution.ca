<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      @click.self="$emit('close')"
      @keydown.escape="$emit('close')"
    >
      <!-- Close button -->
      <button
        type="button"
        class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        :aria-label="t('lightbox.close')"
        @click="$emit('close')"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Prev button -->
      <button
        v-if="total > 1"
        type="button"
        class="absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        :aria-label="t('lightbox.previous')"
        @click="$emit('prev')"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Image -->
      <img
        :src="src"
        :alt="alt"
        class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
      />

      <!-- Next button -->
      <button
        v-if="total > 1"
        type="button"
        class="absolute right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        :aria-label="t('lightbox.next')"
        @click="$emit('next')"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Counter -->
      <div v-if="total > 1" class="absolute bottom-4 text-sm text-white/70">
        {{ current + 1 }} / {{ total }}
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  open: { type: Boolean, required: true },
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  current: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
})

const emit = defineEmits(['close', 'prev', 'next'])

function onKeydown(e) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)
</script>
