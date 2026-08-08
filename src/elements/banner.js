// CV PDFs served as static assets from /public (not bundled)
const cvFR = '/CV-RAOELIMAHEFA-Charly-FR.pdf'
const cvEN = '/CV-RAOELIMAHEFA-Charly-EN.pdf'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconDownload, iconMail } from '../utils/icons.js'
import { circleLabel } from '../utils/circleLabel.js'
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
    if (lineIdx > 0) {
      // A real space before the <br>, otherwise the heading's text content reads
      // "RAOELIMAHEFACharly" to crawlers and the brand query stops matching.
      // Trailing whitespace before a line break is not rendered.
      el.appendChild(document.createTextNode(' '))
      el.appendChild(document.createElement('br'))
    }
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
        <div class="col-lg-7 py-5">

          <div class="banner-status" data-reveal data-delay="1">
            ${circleLabel(t('banner.greeting'))}
          </div>

          <!-- Single H1 for the whole page, and it carries the keywords: the
               name and the role are both visible text inside it. -->
          <h1 class="banner-heading">
            <span class="banner-name" id="animatedName" data-reveal data-delay="2">
              RAOELIMAHEFA
Charly
            </span>
            <span class="banner-role" data-reveal data-delay="3">${t('banner.role')}</span>
          </h1>

          <p class="banner-tagline" data-reveal data-delay="3">${t('banner.tagline')}</p>

          <div class="banner-actions" data-reveal data-delay="4">
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

        <div class="col-lg-5 d-none d-lg-flex justify-content-center">
          <div class="hero-visual" data-reveal="scale" data-delay="3">
            <!-- Flat design dropped the soft-glow look these relied on
                 (filter: blur()) — a solid, unblurred disc in its place would
                 look like a stray shape pasted behind the card, so they're
                 kept in the markup but switched off via Bootstrap's d-none
                 rather than a custom CSS rule. -->
            <div class="hero-orb hero-orb-1 d-none"></div>
            <div class="hero-orb hero-orb-2 d-none"></div>
            <div class="hero-code-block">
              <div class="code-line"><span class="code-keyword">const</span> <span class="code-var">developer</span> = {</div>
              <div class="code-line code-indent"><span class="code-prop">name</span>: <span class="code-string">"Charly"</span>,</div>
              <div class="code-line code-indent"><span class="code-prop">role</span>: <span class="code-string">"Full Stack"</span>,</div>
              <div class="code-line code-indent"><span class="code-prop">passion</span>: <span class="code-string">"Building"</span>,</div>
              <div class="code-line code-indent"><span class="code-prop">coffee</span>: <span class="code-bool">true</span>,</div>
              <div class="code-line">};</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `

  // Animate the name letters
  const nameEl = document.getElementById('animatedName')
  if (nameEl) animateName(nameEl)

  // Init Three.js background — skip on mobile or if user prefers reduced motion,
  // and defer until browser is idle to preserve LCP/FCP on desktop.
  const banner = document.querySelector('#banner')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  if (banner && !prefersReducedMotion && !isMobile) {
    const startThree = () => {
      loadThreeBg().then(({ initThreeBg }) => {
        cleanupThree = initThreeBg(banner)
      })
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(startThree, { timeout: 2500 })
    } else {
      setTimeout(startThree, 1500)
    }
  }

  observeReveal()
}

render()
onLangChange(render)
