import logoImage from './../../src/assets/images/logos/cr-logo.webp'
import { t, onLangChange } from '../i18n/index.js'
import { iconWhatsapp, iconFacebook, iconMail } from '../utils/icons.js'

function render() {
  document.querySelector('#footer').innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">

          <div class="footer-cta">
            <p class="footer-cta-title">${t('footer.ctaTitle')}</p>
            <p class="footer-cta-start">
              ${t('footer.ctaStart')}
              <a href="mailto:raoelimahefacharly@gmail.com">${t('footer.ctaHi')}</a>
            </p>
            <div class="footer-socials">
              <a class="social-btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/261346249833" aria-label="WhatsApp">
                ${iconWhatsapp}
              </a>
              <a class="social-btn" target="_blank" rel="noopener noreferrer" href="https://facebook.com/raoel.mahefa" aria-label="Facebook">
                ${iconFacebook}
              </a>
              <a class="social-btn" href="mailto:raoelimahefacharly@gmail.com" aria-label="Email">
                ${iconMail}
              </a>
            </div>
          </div>

          <div>
            <div class="footer-col-title">${t('footer.info')}</div>
            <ul class="footer-list">
              <li><a href="mailto:raoelimahefacharly@gmail.com">raoelimahefacharly@gmail.com</a></li>
              <li><a href="https://wa.me/261346249833" target="_blank" rel="noopener noreferrer">+261 34 62 498 33</a></li>
              <li>${t('footer.location')}</li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Navigation</div>
            <ul class="footer-list">
              <li><a href="#banner">${t('nav.home')}</a></li>
              <li><a href="#about">${t('nav.about')}</a></li>
              <li><a href="#experience">${t('nav.experience')}</a></li>
              <li><a href="#skill">${t('nav.skills')}</a></li>
              <li><a href="#achievement">${t('nav.projects')}</a></li>
            </ul>
          </div>

        </div>

        <div class="footer-bottom">
          <a class="footer-brand" href="#banner">
            <img src="${logoImage}" alt="" width="30" height="30" />
            <span>Charly</span>
          </a>
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
