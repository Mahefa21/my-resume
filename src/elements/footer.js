import { t, onLangChange } from '../i18n/index.js'

function render() {
  document.querySelector('#footer').innerHTML = `
    <footer>
      <div class="container">
        <ul class="footer-nav">
          <li><a href="#banner">${t('nav.home')}</a></li>
          <li><a href="#about">${t('nav.about')}</a></li>
          <li><a href="#experience">${t('nav.experience')}</a></li>
          <li><a href="#skill">${t('nav.skills')}</a></li>
          <li><a href="#achievement">${t('nav.projects')}</a></li>
        </ul>
        <div class="footer-divider"></div>
        <p class="footer-copy">
          ${t('footer.copyright')} &nbsp;·&nbsp;
          ${t('footer.madeWith')} <span class="footer-heart">♥</span> ${t('footer.and')} ☕
        </p>
      </div>
    </footer>
  `
}

render()
onLangChange(render)
