import navigatorImage from './../../src/assets/images/navigator.webp'
import ekitiaImage from './../../src/assets/images/ekitia.webp'
import topImage from './../../src/assets/images/nounoutop.webp'
import emitSite from './../../src/assets/images/emit.webp'
import aegImage from './../../src/assets/images/aeg.webp'
import washyImage from './../../src/assets/images/washy.webp'
import blissHolidayImage from './../../src/assets/images/bliss-holiday.webp'
import harlyCarsImage from './../../src/assets/images/harly-cars.webp'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { tornEdge } from '../utils/tornEdge.js'
import { iconArrowRight } from '../utils/icons.js'

// Index-matched to projects.items in src/i18n/*.js — position here must
// mirror position there exactly, or images/descriptions pair up wrong.
// Harly Cars is first: most recent project (2026), so it's also
// the featured one (it gets the wide card in the grid below).
const projectImages = [harlyCarsImage, blissHolidayImage, washyImage, aegImage, navigatorImage, ekitiaImage, topImage, emitSite]

// Card fills cycle through the logo palette; see .work-card.tone-* in style.css.
const TONES = ['slate', 'soft', 'deep', 'amber']

function render() {
  const projects = t('projects.items')

  document.querySelector('#achievement').innerHTML = `
    <div class="section section-alt">
      ${tornEdge({ to: 'bg', variant: 4 })}
      <div class="container">

        <div class="works-head" data-reveal>
          <h2 class="section-title">${t('projects.title')}</h2>
          <a class="link-accent" href="mailto:raoelimahefacharly@gmail.com">${t('projects.more')} ${iconArrowRight}</a>
        </div>

        <div class="works-grid">
          ${projects.map((project, i) => `
            <article class="work-card tone-${TONES[i % TONES.length]}${i === 0 ? ' is-featured' : ''}" data-reveal data-delay="${(i % 3) + 1}">
              <div class="work-head">
                <div class="work-employer">${project.employer}</div>
                <h3 class="work-name">${project.name}</h3>
              </div>
              <div class="work-shot">
                <img src="${projectImages[i]}" alt="${project.name} — projet réalisé par Charly RAOELIMAHEFA" loading="lazy" decoding="async" />
              </div>
              <p class="work-desc">${project.description}</p>
              <div class="work-tech">
                ${project.tech.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
              </div>
              <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="work-link">
                ${t('projects.visitSite')} ${iconArrowRight}
              </a>
            </article>
          `).join('')}
        </div>

      </div>
    </div>
  `

  observeReveal()
}

render()
onLangChange(render)
