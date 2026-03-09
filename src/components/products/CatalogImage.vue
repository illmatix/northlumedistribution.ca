<template>
  <button
    type="button"
    class="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
    @click="$emit('click')"
  >
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="block w-full transition-transform duration-200 group-hover:scale-[1.02]"
    />
  </button>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
})

defineEmits(['click'])
</script>
