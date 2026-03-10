import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ptBr from './locales/pt-br.json'
import es from './locales/es.json'

export const SUPPORTED_LOCALES = ['en', 'fr', 'pt-br', 'es']
export const DEFAULT_LOCALE = 'en'

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    fr,
    'pt-br': ptBr,
    es,
  },
})

export default i18n
