import fr from './fr.js'
import en from './en.js'

const translations = { fr, en }

let currentLang = localStorage.getItem('lang') || 'fr'

export const t = (key) => {
  const parts = key.split('.')
  let val = translations[currentLang]
  for (const part of parts) {
    val = val?.[part]
  }
  return val ?? key
}

export const getLang = () => currentLang

export const setLang = (lang) => {
  if (!translations[lang]) return
  currentLang = lang
  localStorage.setItem('lang', lang)
  document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA'
  document.dispatchEvent(new CustomEvent('langChange', { detail: lang }))
}

export const onLangChange = (callback) => {
  document.addEventListener('langChange', callback)
}

// Apply stored language on init
document.documentElement.lang = currentLang === 'fr' ? 'fr-CA' : 'en-CA'
