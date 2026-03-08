import cvFR from './../../src/assets/documents/CV-RAOELIMAHEFA-Charly-FR.pdf'
import cvEN from './../../src/assets/documents/CV-RAOELIMAHEFA-Charly-EN.pdf'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconDownload, iconMail, iconChevronDown } from '../utils/icons.js'
// Lazy-load Three.js so it doesn't block initial page render
const loadThreeBg = () => import('../utils/three-bg.js')

let cleanupThree = null

function animateName(el) {
  const text = el.textContent
  el.innerHTML = ''
  let charIndex = 0

  // Split into lines, each letter gets a span
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) el.appendChild(document.createElement('br'))
    for (const char of line) {
      const span = document.createElement('span')
      span.className = 'name-char'
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.animationDelay = `${0.4 + charIndex * 0.05}s`
      el.appendChild(span)
      charIndex++
    }
  })
}

function render() {
  // Cleanup previous Three.js scene
  if (cleanupThree) {
    cleanupThree()
    cleanupThree = null
  }

  document.querySelector('#banner').innerHTML = `
    <div class="container banner-content">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-8 py-5">

          <p class="banner-greeting" data-reveal data-delay="1">${t('banner.greeting')}</p>

          <h1 class="banner-name" id="animatedName" data-reveal data-delay="2">
            RAOELIMAHEFA
Charly
          </h1>

          <p class="banner-role" data-reveal data-delay="3">${t('banner.role')}</p>
          <p class="banner-stack" data-reveal data-delay="4">${t('banner.stack')}</p>

          <div class="banner-actions" data-reveal data-delay="5">
            <a href="${cvFR}" download="CV-RAOELIMAHEFA-Charly-FR.pdf" class="btn-primary-grad">
              ${iconDownload}
              ${t('banner.downloadFR')}
            </a>

            <a href="${cvEN}" download="CV-RAOELIMAHEFA-Charly-EN.pdf" class="btn-outline-grad">
              ${iconDownload}
              ${t('banner.downloadEN')}
            </a>

            <a href="mailto:raoelimahefacharly@gmail.com" class="btn-ghost">
              ${iconMail}
              ${t('banner.contact')}
            </a>
          </div>

        </div>
      </div>
    </div>

    <a href="#about" class="scroll-indicator">
      <span>${t('banner.scroll')}</span>
      ${iconChevronDown}
    </a>
  `

  // Animate the name letters
  const nameEl = document.getElementById('animatedName')
  if (nameEl) animateName(nameEl)

  // Init Three.js background (lazy loaded)
  const banner = document.querySelector('#banner')
  if (banner) {
    loadThreeBg().then(({ initThreeBg }) => {
      cleanupThree = initThreeBg(banner)
    })
  }

  observeReveal()
}

render()
onLangChange(render)
