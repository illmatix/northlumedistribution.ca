<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="consent === null"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        class="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-lg sm:flex-row sm:gap-6"
      >
        <p class="text-sm leading-6 text-gray-600">
          We use cookies and Google Analytics to understand how visitors use our site. No personal
          data is sold or shared.
          <router-link to="/privacy" class="font-medium text-brand-600 hover:text-brand-500">
            Privacy Policy
          </router-link>
        </p>
        <div class="flex shrink-0 gap-3">
          <button
            type="button"
            class="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            @click="decline"
          >
            Decline
          </button>
          <button
            type="button"
            class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500"
            @click="accept"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useConsent } from '@/composables/useConsent';

const { consent, accept, decline } = useConsent();
</script>
