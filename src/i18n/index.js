import i18next from 'i18next'
import en from './locales/en.json'
import vn from './locales/vn.json'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vn',
    debug: false,
    localeDetection: false,
    resources: {
      en: {
        translation: en
      },
      vn: {
        translation: vn
      }
    }
  })

export default i18next
