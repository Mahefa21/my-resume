import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconExternalLink } from '../utils/icons.js'

function render() {
  const jobs = t('experience.jobs')
  const education = t('experience.education')
  const awards = t('experience.awards')

  document.querySelector('#experience').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">✦ ${t('nav.experience')}</div>
          <h2 class="section-title">${t('experience.title')}</h2>
          <div class="section-divider mx-auto"></div>
        </div>

        <div class="row g-5">

          <!-- Jobs Timeline -->
          <div class="col-lg-7" data-reveal data-delay="1">
            <div class="timeline">
              ${jobs.map(job => `
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-card">
                    <div class="timeline-header">
                      <div>
                        <div class="timeline-title">${job.title}</div>
                        <div class="timeline-company">${job.company}</div>
                        <div class="timeline-location">${job.location}</div>
                      </div>
                      <span class="timeline-badge">${job.period}</span>
                    </div>
                    <ul class="timeline-bullets">
                      ${job.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Education + Awards -->
          <div class="col-lg-5">

            <div data-reveal data-delay="2">
              <p class="skill-group-title mb-3">${t('experience.eduTitle')}</p>
              ${education.map(edu => `
                <div class="edu-card">
                  <div class="edu-degree">${edu.degree}</div>
                  <div class="edu-school">${edu.school}</div>
                  <div class="edu-period">${edu.period}</div>
                </div>
              `).join('')}
            </div>

            <div class="mt-4" data-reveal data-delay="3">
              <p class="skill-group-title mb-3">${t('experience.awardsTitle')}</p>
              ${awards.map(award => `
                <div class="award-card">
                  <div class="award-medal">${award.medal}</div>
                  <div>
                    <div class="award-title">${award.title}</div>
                    <div class="award-detail">${award.detail}</div>
                    ${award.link ? `
                      <a href="${award.link}" target="_blank" rel="noopener noreferrer" class="award-link">
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
