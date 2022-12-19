import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import translationRU from "locales/ru/translation.json"
import translationENG from "locales/en/translation.json"

// the translations
const resources = {
  ru: {
    translation: translationRU,
  },
  eng: {
    translation: translationENG,
  },
}

const language = localStorage.getItem("I18N_LANGUAGE")
if (!language) {
  const browserLang = window.navigator.userLanguage || window.navigator.language;
  let lang;
  if (browserLang) {
    lang = browserLang.split('-')[0];
  }
  localStorage.setItem("I18N_LANGUAGE", lang || 'en');
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
