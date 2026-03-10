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
          {{ t('cookie_consent.message') }}
          <router-link :to="localePath('/privacy')" class="font-medium text-brand-600 hover:text-brand-500">
            {{ t('cookie_consent.privacy_link') }}
          </router-link>
        </p>
        <div class="flex shrink-0 gap-3">
          <button
            type="button"
            class="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            @click="decline"
          >
            {{ t('cookie_consent.decline') }}
          </button>
          <button
            type="button"
            class="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500"
            @click="accept"
          >
            {{ t('cookie_consent.accept') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useConsent } from '@/composables/useConsent';
import { useLocalePath } from '@/composables/useLocalePath';

const { t } = useI18n();
const localePath = useLocalePath();
const { consent, accept, decline } = useConsent();
</script>
