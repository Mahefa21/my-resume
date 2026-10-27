import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { tornEdge } from '../utils/tornEdge.js'
import { iconExternalLink } from '../utils/icons.js'

function render() {
  const jobs = t('experience.jobs')
  const education = t('experience.education')
  const awards = t('experience.awards')

  document.querySelector('#experience').innerHTML = `
    <div class="section section-alt">
      ${tornEdge({ to: 'bg', variant: 2 })}
      <div class="container">

        <h2 class="section-title text-center mb-5" data-reveal>${t('experience.title')}</h2>

        <!-- Three-column timeline: where/when on the left, the axis in the
             middle, what was done on the right. Jobs are listed newest first,
             so the first one is the current position. -->
        <div class="tl-panel" data-reveal data-delay="1">
          <ol class="tl">
            ${jobs.map((job, i) => `
              <li class="tl-item${i === 0 ? ' is-current' : ''}">
                <div class="tl-when">
                  <div class="tl-company">${job.company}</div>
                  <div class="tl-period">${job.period}</div>
                  <div class="tl-location">${job.location}</div>
                </div>
                <span class="tl-dot" aria-hidden="true"></span>
                <div class="tl-what">
                  <div class="tl-role">
                    ${job.title}
                    ${i === 0 ? `<span class="tl-live">${t('experience.current')}</span>` : ''}
                  </div>
                  <ul class="tl-bullets">
                    ${job.bullets.map(b => `<li>${b}</li>`).join('')}
                  </ul>
                </div>
              </li>
            `).join('')}
          </ol>
        </div>

        <div class="exp-extra">
          <div data-reveal data-delay="1">
            <h3 class="group-title">${t('experience.eduTitle')}</h3>
            <ol class="tl tl-compact">
              ${education.map(edu => `
                <li class="tl-item">
                  <div class="tl-when">
                    <div class="tl-period">${edu.period}</div>
                  </div>
                  <span class="tl-dot" aria-hidden="true"></span>
                  <div class="tl-what">
                    <div class="tl-role">${edu.degree}</div>
                    <div class="tl-school">${edu.school}</div>
                  </div>
                </li>
              `).join('')}
            </ol>
          </div>

          <div data-reveal data-delay="2">
            <h3 class="group-title">${t('experience.awardsTitle')}</h3>
            <div class="award-stack">
              ${awards.map(award => `
                <div class="award-card">
                  <div class="award-medal">${award.medal}</div>
                  <div>
                    <div class="award-title">${award.title}</div>
                    <div class="award-detail">${award.detail}</div>
                    ${award.link ? `
                      <a href="${award.link}" target="_blank" rel="noopener noreferrer" class="link-accent">
                        ${iconExternalLink} ${award.linkText}
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
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
