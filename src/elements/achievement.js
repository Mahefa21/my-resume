import navigatorImage from './../../src/assets/images/navigator.png'
import ekitiaImage from './../../src/assets/images/ekitia.png'
import topImage from './../../src/assets/images/nounoutop.png'
import emitSite from './../../src/assets/images/emit.png'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'

const projectImages = [navigatorImage, ekitiaImage, topImage, emitSite]

function render() {
  const projects = t('projects.items')

  document.querySelector('#achievement').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">✦ ${t('nav.projects')}</div>
          <h2 class="section-title">${t('projects.title').replace('réalisations', '<span>réalisations</span>').replace('projects', '<span>projects</span>')}</h2>
          <div class="section-divider mx-auto"></div>
        </div>

        <!-- Featured Project -->
        ${projects.length > 0 ? `
          <div class="project-featured" data-reveal data-delay="1">
            <div class="glass-card project-featured-card">
              <div class="project-featured-img">
                <img src="${projectImages[0]}" alt="${projects[0].name}" />
                <div class="project-featured-overlay"></div>
              </div>
              <div class="project-featured-content">
                <div class="project-employer">${projects[0].employer}</div>
                <div class="project-name project-name-lg">${projects[0].name}</div>
                <p class="project-description">${projects[0].description}</p>
                <div class="project-tech">
                  ${projects[0].tech.map(tag => `<span class="tech-badge">${tag}</span>`).join('')}
                </div>
                <a href="${projects[0].link}" target="_blank" rel="noopener noreferrer" class="btn-primary-grad btn-sm-grad">
                  ${t('projects.visitSite')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Other Projects Grid -->
        <div class="projects-grid">
          ${projects.slice(1).map((project, i) => `
            <div class="projects-grid-item" data-reveal data-delay="${i + 2}">
              <div class="project-card glass-card">
                <div class="project-card-img-wrap">
                  <img src="${projectImages[i + 1]}" alt="${project.name}" />
                  <div class="project-card-img-overlay"></div>
                </div>
                <div class="project-card-body">
                  <div class="project-employer">${project.employer}</div>
                  <div class="project-name">${project.name}</div>
                  <p class="project-description">${project.description}</p>
                  <div class="project-tech">
                    ${project.tech.map(tag => `<span class="tech-badge">${tag}</span>`).join('')}
                  </div>
                  <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    ${t('projects.visitSite')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="text-center mt-5" data-reveal>
          <a href="mailto:raoelimahefacharly@gmail.com" class="btn-primary-grad">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            ${t('banner.contact')}
          </a>
        </div>

      </div>
    </div>
  `

  observeReveal()
}

render()
onLangChange(render)
