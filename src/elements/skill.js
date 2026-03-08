import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'

const programmingLangs = [
  { name: 'Ruby', pct: 78 },
  { name: 'JavaScript', pct: 80 },
  { name: 'TypeScript', pct: 60 },
  { name: 'PHP', pct: 60 },
]

const frameworks = ['Ruby on Rails', 'Vue.js', 'React.js', 'Stimulus.js', 'Laravel', 'Express.js', 'Node.js', 'Turbo']

const databases = ['MySQL', 'PostgreSQL', 'MongoDB']

const tools = ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Docker', 'VS Code', 'Jira', 'Figma', 'Canva']

const spokenLangs = [
  { key: 'french',   dots: 4, levelKey: 'intermediate' },
  { key: 'english',  dots: 3, levelKey: 'functional' },
  { key: 'malagasy', dots: 5, levelKey: 'native' },
]

function dotsHTML(filled) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="ldot ${i < filled ? 'on' : ''}"></span>`
  ).join('')
}

function render() {
  document.querySelector('#skill').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">✦ ${t('nav.skills')}</div>
          <h2 class="section-title">${t('skills.title').replace('compétences', '<span>compétences</span>').replace('skills', '<span>skills</span>')}</h2>
          <div class="section-divider mx-auto"></div>
        </div>

        <div class="row g-4">

          <!-- Programming Languages -->
          <div class="col-lg-4" data-reveal data-delay="1">
            <div class="glass-card p-4 h-100">
              <p class="skill-group-title">${t('skills.languages')}</p>
              ${programmingLangs.map(s => `
                <div class="skill-bar-row">
                  <div class="skill-bar-label">
                    <span>${s.name}</span>
                    <span style="color:var(--text-muted)">${s.pct}%</span>
                  </div>
                  <div class="skill-bar-track">
                    <div class="skill-bar-fill" data-width="${s.pct}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Frameworks -->
          <div class="col-lg-4" data-reveal data-delay="2">
            <div class="glass-card p-4 h-100">
              <p class="skill-group-title">${t('skills.frameworks')}</p>
              <div class="tag-list">
                ${frameworks.map(f => `<span class="skill-tag">${f}</span>`).join('')}
              </div>

              <p class="skill-group-title mt-4">${t('skills.databases')}</p>
              <div class="tag-list">
                ${databases.map(d => `<span class="skill-tag">${d}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Tools & Languages -->
          <div class="col-lg-4" data-reveal data-delay="3">
            <div class="glass-card p-4 h-100">
              <p class="skill-group-title">${t('skills.tools')}</p>
              <div class="tag-list mb-4">
                ${tools.map(tool => `<span class="skill-tag">${tool}</span>`).join('')}
              </div>

              <p class="skill-group-title">${t('skills.spoken')}</p>
              ${spokenLangs.map(l => `
                <div class="lang-spoken-item">
                  <div>
                    <div class="lang-name">${t('skills.' + l.key)}</div>
                    <div class="lang-level">${t('skills.' + l.levelKey)}</div>
                  </div>
                  <div class="lang-dots">${dotsHTML(l.dots)}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `

  // Animate skill bars on reveal
  observeReveal()
  animateBars()
}

function animateBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target
        fill.style.width = fill.dataset.width + '%'
        observer.unobserve(fill)
      }
    })
  }, { threshold: 0.2 })

  document.querySelectorAll('.skill-bar-fill[data-width]').forEach(el => observer.observe(el))
}

render()
onLangChange(render)
