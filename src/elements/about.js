import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { tornEdge } from '../utils/tornEdge.js'

// One icon per entry of about.services (same order in fr.js / en.js).
const serviceIcons = [
  // Web development
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="9 10 7 12 9 14"/><polyline points="15 10 17 12 15 14"/></svg>`,
  // AI / document extraction
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/></svg>`,
  // Automation / back-office
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
]

function render() {
  const services = t('about.services')

  document.querySelector('#about').innerHTML = `
    <div class="section">
      ${tornEdge({ to: 'alt', variant: 1 })}
      <div class="container">
        <div class="help-split">

          <div class="service-stack">
            ${services.map((s, i) => `
              <div class="service-card" data-reveal="left" data-delay="${i + 1}">
                <span class="service-icon service-icon-${i + 1}">${serviceIcons[i] ?? ''}</span>
                <span>
                  <span class="service-title">${s.title}</span>
                  <span class="service-sub">${s.sub}</span>
                </span>
              </div>
            `).join('')}
          </div>

          <div class="help-content">
            <h2 class="section-title" data-reveal data-delay="1">${t('about.helpTitle')}</h2>
            <p class="help-lead" data-reveal data-delay="2">${t('about.title')}</p>
            <p class="body-text" data-reveal data-delay="2">${t('about.p1')}</p>
            <p class="body-text" data-reveal data-delay="3">${t('about.p2')}</p>

            <div class="help-stats" data-reveal data-delay="4">
              <div class="help-stat">
                <div class="help-stat-value">3+</div>
                <div class="help-stat-label">${t('about.yearsExp')}</div>
              </div>
              <div class="help-stat">
                <div class="help-stat-value">4+</div>
                <div class="help-stat-label">${t('about.projectsDone')}</div>
              </div>
              <div class="help-stat">
                <div class="help-stat-value">4+</div>
                <div class="help-stat-label">${t('about.companies')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `

  observeReveal()
}

render()
onLangChange(render)
