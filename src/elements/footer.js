import { t, onLangChange } from '../i18n/index.js'
import { iconWhatsapp, iconFacebook, iconMail } from '../utils/icons.js'

function render() {
  document.querySelector('#footer').innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">

          <div class="footer-brand">
            <div class="footer-logo-text">Charly R.</div>
            <p class="footer-tagline">Full Stack Web Developer</p>
            <div class="footer-socials">
              <a class="social-link-btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/261343926527" aria-label="WhatsApp">
                ${iconWhatsapp}
              </a>
              <a class="social-link-btn" target="_blank" rel="noopener noreferrer" href="https://facebook.com/raoel.mahefa" aria-label="Facebook">
                ${iconFacebook}
              </a>
              <a class="social-link-btn" href="mailto:raoelimahefacharly@gmail.com" aria-label="Email">
                ${iconMail}
              </a>
            </div>
          </div>

          <div class="footer-links-col">
            <div class="footer-col-title">Navigation</div>
            <ul class="footer-nav-list">
              <li><a href="#banner">${t('nav.home')}</a></li>
              <li><a href="#about">${t('nav.about')}</a></li>
              <li><a href="#experience">${t('nav.experience')}</a></li>
              <li><a href="#skill">${t('nav.skills')}</a></li>
              <li><a href="#achievement">${t('nav.projects')}</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <div class="footer-col-title">Contact</div>
            <ul class="footer-nav-list">
              <li><a href="mailto:raoelimahefacharly@gmail.com">raoelimahefacharly@gmail.com</a></li>
              <li><a href="https://wa.me/261343926527" target="_blank" rel="noopener noreferrer">+261 34 39 265 27</a></li>
            </ul>
          </div>

        </div>

        <div class="footer-bottom">
          <div class="footer-divider"></div>
          <p class="footer-copy">
            ${t('footer.copyright')} &nbsp;·&nbsp;
            ${t('footer.madeWith')} <span class="footer-heart">♥</span> ${t('footer.and')} ☕
          </p>
        </div>
      </div>
    </footer>
  `
}

render()
onLangChange(render)
