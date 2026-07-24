import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { circleLabel } from '../utils/circleLabel.js'

// Pinned on purpose: `@latest` resolves to whatever is at the repo HEAD, so the
// CDN could serve different bytes than the ones reviewed here. Bump manually.
const DEVICON_VERSION = 'v2.16.0'
const devicon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@${DEVICON_VERSION}/icons/${name}`

const programmingLangs = [
  { name: 'Ruby', icon: devicon('ruby/ruby-original.svg') },
  { name: 'JavaScript', icon: devicon('javascript/javascript-original.svg') },
  { name: 'TypeScript', icon: devicon('typescript/typescript-original.svg') },
  { name: 'PHP', icon: devicon('php/php-original.svg') },
  { name: 'Python', icon: devicon('python/python-original.svg') },
]

const frameworks = [
  { name: 'Ruby on Rails', icon: devicon('rails/rails-plain.svg') },
  { name: 'Vue.js', icon: devicon('vuejs/vuejs-original.svg') },
  { name: 'React.js', icon: devicon('react/react-original.svg') },
  { name: 'Stimulus.js', icon: devicon('javascript/javascript-original.svg') },
  { name: 'Laravel', icon: devicon('laravel/laravel-original.svg') },
  { name: 'Express.js', icon: devicon('express/express-original.svg') },
  { name: 'Node.js', icon: devicon('nodejs/nodejs-original.svg') },
  { name: 'Turbo', icon: devicon('ruby/ruby-original.svg') },
]

const databases = [
  { name: 'MySQL', icon: devicon('mysql/mysql-original.svg') },
  { name: 'PostgreSQL', icon: devicon('postgresql/postgresql-original.svg') },
  { name: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
]

const tools = [
  { name: 'Git', icon: devicon('git/git-original.svg') },
  { name: 'GitHub', icon: devicon('github/github-original.svg') },
  { name: 'GitLab', icon: devicon('gitlab/gitlab-original.svg') },
  { name: 'Bitbucket', icon: devicon('bitbucket/bitbucket-original.svg') },
  { name: 'Docker', icon: devicon('docker/docker-original.svg') },
  { name: 'VS Code', icon: devicon('vscode/vscode-original.svg') },
  { name: 'Jira', icon: devicon('jira/jira-original.svg') },
  { name: 'Figma', icon: devicon('figma/figma-original.svg') },
  { name: 'Canva', icon: devicon('canva/canva-original.svg') },
  { name: 'Ollama', icon: 'https://ollama.com/public/ollama.png' },
  { name: 'Mistral AI', icon: devicon('python/python-original.svg') },
]

const spokenLangs = [
  { key: 'french',   pct: 80, levelKey: 'intermediate', flag: '🇫🇷' },
  { key: 'english',  pct: 60, levelKey: 'functional', flag: '🇬🇧' },
  { key: 'malagasy', pct: 100, levelKey: 'native', flag: '🇲🇬' },
]

function circleHTML(lang) {
  const r = 42
  return `
    <div class="skill-circle-item">
      <div class="skill-circle-wrap">
        <svg class="skill-circle-svg" viewBox="0 0 100 100">
          <circle class="skill-circle-bg" cx="50" cy="50" r="${r}" />
        </svg>
        <div class="skill-circle-label">
          <img src="${lang.icon}" alt="${lang.name} — compétence de Charly RAOELIMAHEFA" class="skill-circle-icon" width="48" height="48" loading="lazy" decoding="async" />
        </div>
      </div>
      <div class="skill-circle-name">${lang.name}</div>
    </div>
  `
}

function render() {
  document.querySelector('#skill').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">${circleLabel(t('nav.skills'))}</div>
          <h2 class="section-title">${t('skills.title')}</h2>
          <div class="section-divider mx-auto"></div>
        </div>

        <!-- Programming Languages — Circular Progress -->
        <div data-reveal data-delay="1">
          <p class="skill-group-title text-center mb-4">${t('skills.languages')}</p>
          <div class="skill-circles-row">
            ${programmingLangs.map(l => circleHTML(l)).join('')}
          </div>
        </div>

        <!-- Frameworks & Databases — Logo Cards -->
        <div class="skills-cards-section" data-reveal data-delay="2">
          <div class="skills-cards-row">
            <div class="skills-cards-col">
              <p class="skill-group-title mb-3">${t('skills.frameworks')}</p>
              <div class="skill-icon-grid">
                ${frameworks.map(f => `
                  <div class="skill-icon-card glass-card">
                    <img src="${f.icon}" alt="${f.name}" class="skill-icon-img" width="40" height="40" loading="lazy" decoding="async" />
                    <div class="skill-icon-name">${f.name}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="skills-cards-col">
              <p class="skill-group-title mb-3">${t('skills.databases')}</p>
              <div class="skill-icon-grid skill-icon-grid-3">
                ${databases.map(d => `
                  <div class="skill-icon-card glass-card">
                    <img src="${d.icon}" alt="${d.name}" class="skill-icon-img" width="40" height="40" loading="lazy" decoding="async" />
                    <div class="skill-icon-name">${d.name}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Tools — Logo Marquee -->
        <div class="skills-marquee-section" data-reveal data-delay="3">
          <p class="skill-group-title text-center mb-3">${t('skills.tools')}</p>
          <div class="marquee-wrap">
            <div class="marquee-track">
              ${[...tools, ...tools].map(tool => `
                <span class="marquee-item">
                  <img src="${tool.icon}" alt="${tool.name}" class="marquee-icon" width="28" height="28" loading="lazy" decoding="async" />
                  ${tool.name}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Spoken Languages — Flag + Bars -->
        <div class="skills-spoken-section" data-reveal data-delay="4">
          <p class="skill-group-title text-center mb-4">${t('skills.spoken')}</p>
          <div class="spoken-bars-grid">
            ${spokenLangs.map(l => `
              <div class="spoken-bar-card glass-card">
                <div class="spoken-bar-header">
                  <span class="spoken-bar-name">
                    <span class="spoken-flag">${l.flag}</span>
                    ${t('skills.' + l.key)}
                  </span>
                  <span class="spoken-bar-level">${t('skills.' + l.levelKey)}</span>
                </div>
                <div class="spoken-bar-track">
                  <div class="spoken-bar-fill" data-width="${l.pct}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `

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

  document.querySelectorAll('.spoken-bar-fill[data-width]').forEach(el => observer.observe(el))
}

render()
onLangChange(render)
