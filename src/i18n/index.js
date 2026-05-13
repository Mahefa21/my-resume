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

const syncDocumentMeta = () => {
  document.documentElement.lang = currentLang

  // Title + description follow the active language
  const title = t('meta.title')
  if (title && title !== 'meta.title') document.title = title

  const desc = t('meta.description')
  if (desc && desc !== 'meta.description') {
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', desc)
    const og = document.querySelector('meta[property="og:description"]')
    if (og) og.setAttribute('content', desc)
    const tw = document.querySelector('meta[name="twitter:description"]')
    if (tw) tw.setAttribute('content', desc)
  }

  // OG locale mirrors the active language
  const ogLocale = document.querySelector('meta[property="og:locale"]')
  if (ogLocale) ogLocale.setAttribute('content', currentLang === 'fr' ? 'fr_FR' : 'en_US')
}

export const setLang = (lang) => {
  if (!translations[lang]) return
  currentLang = lang
  localStorage.setItem('lang', lang)
  syncDocumentMeta()
  document.dispatchEvent(new CustomEvent('langChange', { detail: lang }))
}

export const onLangChange = (callback) => {
  document.addEventListener('langChange', callback)
}

// Apply stored language on init (URL param overrides localStorage for SEO)
const urlLang = new URLSearchParams(window.location.search).get('lang')
if (urlLang && translations[urlLang]) {
  currentLang = urlLang
  localStorage.setItem('lang', urlLang)
}
syncDocumentMeta()
