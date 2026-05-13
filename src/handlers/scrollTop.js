import { t, onLangChange } from '../i18n/index.js'

// Two floating arrows:
//   • "scroll down" hint — visible near the top, invites the user to scroll.
//   • "scroll to top"   — visible once scrolled past the first viewport.
// Both use a long-arrow design and a vertical label.

const THRESHOLD = 400 // px past the top before swapping hints

const ARROW_DOWN_SVG = `
  <svg class="scroll-hint-arrow" viewBox="0 0 12 56" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 4 L6 54" />
    <path d="M2 48 L6 54 L10 48" />
  </svg>
`

const ARROW_UP_SVG = `
  <svg class="scroll-hint-arrow" viewBox="0 0 12 56" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 54 L6 4" />
    <path d="M2 8 L6 4 L10 8" />
  </svg>
`

let downBtn, topBtn

function renderLabels() {
  if (downBtn) {
    downBtn.setAttribute('aria-label', t('scrollHint.downAria'))
    downBtn.querySelector('.scroll-hint-label').textContent = t('scrollHint.down')
  }
  if (topBtn) {
    topBtn.setAttribute('aria-label', t('scrollHint.topAria'))
    topBtn.querySelector('.scroll-hint-label').textContent = t('scrollHint.top')
  }
}

function smoothScroll(top) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
}

function init() {
  // Down hint — sits centered at the bottom of the banner
  downBtn = document.createElement('button')
  downBtn.className = 'scroll-hint scroll-hint--down'
  downBtn.type = 'button'
  downBtn.innerHTML = `
    <span class="scroll-hint-label">${t('scrollHint.down')}</span>
    ${ARROW_DOWN_SVG}
  `
  downBtn.setAttribute('aria-label', t('scrollHint.downAria'))
  downBtn.addEventListener('click', () => {
    const target = document.querySelector('#about') || document.querySelector('main section')
    if (target) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    } else {
      smoothScroll(window.innerHeight)
    }
  })

  // Top button — bottom-right, but offset to not clash with the chat FAB
  topBtn = document.createElement('button')
  topBtn.className = 'scroll-hint scroll-hint--top'
  topBtn.type = 'button'
  topBtn.innerHTML = `
    ${ARROW_UP_SVG}
    <span class="scroll-hint-label">${t('scrollHint.top')}</span>
  `
  topBtn.setAttribute('aria-label', t('scrollHint.topAria'))
  topBtn.addEventListener('click', () => smoothScroll(0))

  document.body.appendChild(downBtn)
  document.body.appendChild(topBtn)

  // Throttled scroll listener via rAF
  let ticking = false
  const update = () => {
    const past = window.scrollY > THRESHOLD
    downBtn.classList.toggle('is-visible', !past)
    topBtn.classList.toggle('is-visible', past)
    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }, { passive: true })

  // Start with down hint visible
  downBtn.classList.add('is-visible')
  update()

  // Refresh labels on language change
  onLangChange(renderLabels)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
