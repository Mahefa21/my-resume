// CV PDFs served as static assets from /public (not bundled)
const cvFR = '/CV-RAOELIMAHEFA-Charly-FR.pdf'
const cvEN = '/CV-RAOELIMAHEFA-Charly-EN.pdf'
// Background removed (made from charly.png with an ImageMagick flood fill from
// the edges) so the portrait sits directly on the brush stroke.
import charlyImage from './../../src/assets/images/charly-cutout.webp'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconDownload } from '../utils/icons.js'
import { tornEdge } from '../utils/tornEdge.js'

// Painted stroke behind the portrait: a few thick round-capped strokes, then
// (none low enough to show through the portrait's faded bottom),
// roughened by a turbulence displacement so the edges read as a dry brush
// rather than vector lines. Purely decorative, hidden from assistive tech.
const brushStroke = `
  <svg class="hero-brush" viewBox="0 0 400 420" aria-hidden="true" focusable="false">
    <defs>
      <filter id="brushRough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="22" />
      </filter>
    </defs>
    <g filter="url(#brushRough)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M70 120 C150 60 250 40 330 70" stroke-width="54" />
      <path d="M40 230 C140 150 260 120 360 150" stroke-width="64" />
      <path d="M60 330 C160 260 270 240 350 270" stroke-width="58" />
    </g>
  </svg>
`

const iconCode = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`

function render() {
  document.querySelector('#banner').innerHTML = `
    <div class="container hero">

      <div class="hero-left">
        <!-- Single H1 for the whole page; it carries the full name and the role
             as visible text so the keywords stay where crawlers expect them. -->
        <h1 class="hero-title" data-reveal data-delay="1">
          <span class="hero-hello">${t('banner.greeting')}</span>
          <span class="hero-name">Charly</span>
          <span class="hero-fullname">RAOELIMAHEFA Charly · ${t('banner.role')}</span>
        </h1>

        <a class="hero-mail" href="mailto:raoelimahefacharly@gmail.com" data-reveal data-delay="2">raoelimahefacharly@gmail.com</a>

        <div class="hero-actions" data-reveal data-delay="3">
          <a href="${cvFR}" download="CV-RAOELIMAHEFA-Charly-FR.pdf" class="btn-pill btn-pill-solid">
            ${iconDownload} ${t('banner.downloadFR')}
          </a>
          <a href="${cvEN}" download="CV-RAOELIMAHEFA-Charly-EN.pdf" class="btn-pill btn-pill-outline">
            ${iconDownload} ${t('banner.downloadEN')}
          </a>
        </div>

        <div class="hero-years" data-reveal data-delay="4">
          <span class="hero-years-num">3+</span>
          <span class="hero-years-label">${t('about.yearsExp')}</span>
        </div>
      </div>

      <div class="hero-visual" data-reveal="scale" data-delay="2">
        <!-- Fixed-ratio stage: brush and portrait are sized in % of it,
             so they keep the same composition at every screen width. -->
        <div class="hero-stage">
          ${brushStroke}
          <div class="hero-portrait">
            <img src="${charlyImage}" alt="Portrait de Charly RAOELIMAHEFA, développeur full stack" width="600" height="620" fetchpriority="high" decoding="async" />
          </div>
        </div>
      </div>

      <div class="hero-right">
        <p class="hero-tagline" data-reveal data-delay="3">${t('banner.tagline')}</p>

        <div class="hero-badge" data-reveal data-delay="4">
          <span class="hero-badge-icon">${iconCode}</span>
          <span class="hero-badge-text">
            <strong>${t('banner.role')}</strong>
            ${t('banner.stack')}
          </span>
        </div>
      </div>

    </div>
    ${tornEdge({ to: 'bg', variant: 0 })}
  `

  observeReveal()
}

render()
onLangChange(render)
