<template>
  <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-5">
      <!-- Left column: Contact info -->
      <div class="lg:col-span-2">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Get in touch to learn how North Lume Distribution can support your product distribution
          needs across Canada, USA, and Brazil.
        </p>
        <dl class="mt-10 space-y-4 text-base leading-7 text-gray-600">
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Email</span>
              <svg
                class="h-7 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </dt>
            <dd>
              <a class="hover:text-brand-600" href="mailto:hello@northlumedistribution.ca">
                hello@northlumedistribution.ca
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Right column: Form or success message -->
      <div class="lg:col-span-3">
        <!-- Success state -->
        <div
          v-if="formState === 'success'"
          role="status"
          class="rounded-lg bg-accent-50 px-6 py-12 text-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-accent-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 class="mt-4 text-lg font-semibold text-accent-700">Message Sent!</h2>
          <p class="mt-2 text-accent-700">
            Thank you for reaching out. We'll get back to you shortly.
          </p>
          <button
            type="button"
            class="mt-6 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            @click="resetForm"
          >
            Send another message
          </button>
        </div>

        <!-- Form -->
        <form v-else class="space-y-6" @submit.prevent="submitForm">
          <!-- Error banner -->
          <div
            v-if="formState === 'error'"
            role="alert"
            class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {{ errorMessage }}
          </div>

          <div>
            <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div class="mt-2.5">
              <input
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                minlength="2"
                :disabled="formState === 'submitting'"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div class="mt-2.5">
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :disabled="formState === 'submitting'"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">
              Phone <span class="font-normal text-gray-500">(optional)</span>
            </label>
            <div class="mt-2.5">
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                :disabled="formState === 'submitting'"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div class="mt-2.5">
              <textarea
                id="message"
                v-model="form.message"
                name="message"
                rows="4"
                required
                minlength="10"
                :disabled="formState === 'submitting'"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>

          <!-- Honeypot -->
          <div class="hidden" aria-hidden="true">
            <input type="checkbox" name="botcheck" tabindex="-1" />
          </div>

          <div>
            <button
              type="submit"
              :disabled="formState === 'submitting'"
              class="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ formState === 'submitting' ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useJsonLd } from '@/composables/useJsonLd'

const WEB3FORMS_KEY = 'afda8128-785c-42ec-82d7-a9726ba8d835'

const formState = ref('idle')
const errorMessage = ref('')
const form = reactive({ name: '', email: '', phone: '', message: '' })

async function submitForm() {
  formState.value = 'submitting'
  errorMessage.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        subject: `New contact from ${form.name} — North Lume Distribution`,
      }),
    })

    const data = await response.json()

    if (data.success) {
      formState.value = 'success'
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submission', {
          event_category: 'contact',
          event_label: 'contact_form',
        })
      }
    } else {
      formState.value = 'error'
      errorMessage.value = data.message || 'Something went wrong. Please try again.'
    }
  } catch {
    formState.value = 'error'
    errorMessage.value = 'Network error. Please check your connection and try again.'
  }
}

function resetForm() {
  formState.value = 'idle'
  errorMessage.value = ''
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}

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
      name: 'Contact',
      item: 'https://northlumedistribution.ca/contact',
    },
  ],
})
</script>
