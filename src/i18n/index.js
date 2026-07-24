import fr from './fr.js'
import en from './en.js'

const translations = { fr, en }
const SUPPORTED = ['fr', 'en']
const DEFAULT_LANG = 'fr'

// Always validate against the supported list rather than indexing `translations`
// with a stored value: keys like `__proto__` or `constructor` would otherwise
// resolve to inherited Object members instead of a locale.
const isSupported = (lang) => SUPPORTED.includes(lang)

let currentLang = isSupported(localStorage.getItem('lang'))
  ? localStorage.getItem('lang')
  : DEFAULT_LANG

export const t = (key) => {
  const parts = key.split('.')
  let val = translations[currentLang]
  for (const part of parts) {
    val = val?.[part]
  }
  return val ?? key
}

export const getLang = () => currentLang

// Single source of truth for absolute URLs. Change here if a custom domain
// replaces the netlify.app subdomain.
const SITE_URL = 'https://raoelimahefa.netlify.app'

// The FR version owns the bare URL; EN lives on ?lang=en.
const urlForLang = (lang) => (lang === 'fr' ? `${SITE_URL}/` : `${SITE_URL}/?lang=${lang}`)

const setMeta = (selector, attr, value) => {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

const syncDocumentMeta = () => {
  document.documentElement.lang = currentLang

  // Point the canonical at the *current* language. Leaving it pinned to the FR
  // URL told search engines the EN page was a duplicate, which contradicted our
  // own hreflang tags and kept the English version out of the index entirely.
  setMeta('link[rel="canonical"]', 'href', urlForLang(currentLang))
  setMeta('meta[property="og:url"]', 'content', urlForLang(currentLang))

  // Title + description follow the active language
  const title = t('meta.title')
  if (title && title !== 'meta.title') {
    document.title = title
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[name="twitter:title"]', 'content', title)
  }

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
  if (!isSupported(lang)) return
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
if (isSupported(urlLang)) {
  currentLang = urlLang
  localStorage.setItem('lang', urlLang)
}
syncDocumentMeta()
