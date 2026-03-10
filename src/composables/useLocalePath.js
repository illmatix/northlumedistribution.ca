import { useRoute } from 'vue-router'

export function useLocalePath() {
  const route = useRoute()
  return (path) => `/${route.params.locale || 'en'}${path}`
}
