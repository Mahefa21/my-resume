import { t } from '../i18n/index.js'

// Apply the localized "Loading" text as soon as the module runs
const loaderText = document.querySelector('#loader .loader-text')
if (loaderText) {
  const label = t('loader.text')
  if (label && label !== 'loader.text') loaderText.textContent = label
}

window.addEventListener('load', () => {
  const loader = document.getElementById('loader')
  if (!loader) return

  // Let the bar animation finish (~1.8s) before fading out
  setTimeout(() => {
    loader.classList.add('hidden')
    loader.addEventListener('transitionend', () => loader.remove(), { once: true })
  }, 1900)
})
