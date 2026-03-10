<template>
  <section class="flex min-h-[60vh] items-center justify-center py-24 sm:py-32">
    <div class="mx-auto max-w-xl px-6 text-center">
      <p class="text-6xl font-bold text-brand-500">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Page not found
      </h1>
      <p class="mt-4 text-lg leading-8 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Go home
        </router-link>
        <router-link
          to="/products"
          class="text-sm font-semibold text-gray-900 transition-colors hover:text-brand-600"
        >
          View products <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
