import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'

const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`

const programmingLangs = [
  { name: 'Ruby', pct: 78, color: '#e74c3c', icon: devicon('ruby/ruby-original.svg') },
  { name: 'JavaScript', pct: 80, color: '#f7df1e', icon: devicon('javascript/javascript-original.svg') },
  { name: 'TypeScript', pct: 60, color: '#3178c6', icon: devicon('typescript/typescript-original.svg') },
  { name: 'PHP', pct: 60, color: '#777bb4', icon: devicon('php/php-original.svg') },
  { name: 'Python', pct: 65, color: '#3776ab', icon: devicon('python/python-original.svg') },
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
  { name: 'HuggingFace Transformers', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
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
  const c = 2 * Math.PI * r
  const offset = c - (lang.pct / 100) * c
  return `
    <div class="skill-circle-item">
      <div class="skill-circle-wrap">
        <svg class="skill-circle-svg" viewBox="0 0 100 100">
          <circle class="skill-circle-bg" cx="50" cy="50" r="${r}" />
          <circle class="skill-circle-fill" cx="50" cy="50" r="${r}"
            stroke="${lang.color}"
            stroke-dasharray="${c}"
            stroke-dashoffset="${c}"
            data-target-offset="${offset}" />
        </svg>
        <div class="skill-circle-label">
          <img src="${lang.icon}" alt="${lang.name}" class="skill-circle-icon" />
        </div>
      </div>
      <div class="skill-circle-name">${lang.name}</div>
      <div class="skill-circle-pct">${lang.pct}%</div>
    </div>
  `
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
                    <img src="${f.icon}" alt="${f.name}" class="skill-icon-img" />
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
                    <img src="${d.icon}" alt="${d.name}" class="skill-icon-img" />
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
                  <img src="${tool.icon}" alt="${tool.name}" class="marquee-icon" />
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
  animateCircles()
  animateBars()
}

function animateCircles() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target
        circle.style.strokeDashoffset = circle.dataset.targetOffset
        observer.unobserve(circle)
      }
    })
  }, { threshold: 0.3 })

  document.querySelectorAll('.skill-circle-fill').forEach(el => observer.observe(el))
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
