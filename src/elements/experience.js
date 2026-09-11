import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconExternalLink } from '../utils/icons.js'
import { circleLabel } from '../utils/circleLabel.js'
import { sectionWave } from '../utils/sectionWave.js'

function render() {
  const jobs = t('experience.jobs')
  const education = t('experience.education')
  const awards = t('experience.awards')

  document.querySelector('#experience').innerHTML = `
    <div class="section">
      ${sectionWave}
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">${circleLabel(t('nav.experience'))}</div>
          <h2 class="section-title">${t('experience.title')}</h2>
        </div>

        <!-- Zigzag timeline: full width so cards can alternate left/right of
             a central axis without a sidebar competing for space. Numbered
             markers (01, 02...) replace the old plain dot. -->
        <div class="timeline" data-reveal data-delay="1">
          ${jobs.map((job, i) => `
            <div class="timeline-item">
              <div class="timeline-dot">${String(i + 1).padStart(2, '0')}</div>
              <div class="timeline-card glass-card">
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

        <!-- Education + Awards: below the timeline, side by side. -->
        <div class="exp-footer-grid">

          <div data-reveal data-delay="2">
            <p class="skill-group-title mb-3">${t('experience.eduTitle')}</p>
            <div class="edu-stack">
              ${education.map(edu => `
                <div class="edu-card glass-card">
                  <div class="edu-degree">${edu.degree}</div>
                  <div class="edu-school">${edu.school}</div>
                  <div class="edu-period">${edu.period}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div data-reveal data-delay="3">
            <p class="skill-group-title mb-3">${t('experience.awardsTitle')}</p>
            ${awards.map(award => `
              <div class="award-card glass-card">
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
  `

  observeReveal()
}

render()
onLangChange(render)
