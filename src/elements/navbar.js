import logoImage from './../../src/assets/images/logos/cr-logo.webp'
import { t, getLang, setLang, onLangChange } from '../i18n/index.js'
import { initActiveNavbar } from '../handlers/activeNavbar.js'
import { getTheme, toggleTheme, onThemeChange } from '../utils/theme.js'
import { iconSun, iconMoon } from '../utils/icons.js'

function render() {
  const lang = getLang()
  const theme = getTheme()
  const themeIcon = theme === 'dark' ? iconSun : iconMoon

  document.querySelector('#navbar').innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container">

        <a class="navbar-brand" href="#banner" title="Charly RAOELIMAHEFA - Développeur Full Stack">
          <img class="brand-logo" src="${logoImage}" alt="CR logo - Charly RAOELIMAHEFA portfolio" width="36" height="36" />
          <span class="brand-name">Charly R.</span>
        </a>

        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navMenu"
          aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li class="nav-item">
              <a class="nav-link" href="#banner">${t('nav.home')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">${t('nav.about')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#experience">${t('nav.experience')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#skill">${t('nav.skills')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#achievement">${t('nav.projects')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">${t('nav.contact')}</a>
            </li>
          </ul>

          <div class="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0">
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark/light mode">
              ${themeIcon}
            </button>
            <div class="lang-switcher">
              <button class="lang-btn ${lang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
              <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  `

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang))
  })

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme)

  initActiveNavbar()
}

render()
onLangChange(render)
onThemeChange(render)
