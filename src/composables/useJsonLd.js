import { onMounted, onUnmounted, isRef, watch } from 'vue'

export function useJsonLd(schema) {
  let el = null

  function update(data) {
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
  }

  onMounted(() => {
    if (isRef(schema)) {
      update(schema.value)
      watch(schema, (val) => update(val))
    } else {
      update(schema)
    }
  })

  onUnmounted(() => {
    if (el) {
      document.head.removeChild(el)
      el = null
    }
  })
}
