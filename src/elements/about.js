import charlyImage from './../../src/assets/images/charly.png'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconWhatsapp, iconFacebook, iconMail } from '../utils/icons.js'

function render() {
  document.querySelector('#about').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="about-split">

          <!-- Left: Photo + Socials -->
          <div class="about-left" data-reveal="left" data-delay="1">
            <div class="about-photo-card">
              <img class="about-photo" src="${charlyImage}" alt="Charly RAOELIMAHEFA" />
              <div class="about-photo-border"></div>
            </div>
            <div class="about-socials">
              <a class="social-link-btn" target="_blank" href="https://wa.me/261343926527" aria-label="WhatsApp">
                ${iconWhatsapp}
              </a>
              <a class="social-link-btn" target="_blank" href="https://facebook.com/raoel.mahefa" aria-label="Facebook">
                ${iconFacebook}
              </a>
              <a class="social-link-btn" href="mailto:raoelimahefacharly@gmail.com" aria-label="Email">
                ${iconMail}
              </a>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="about-right">
            <div data-reveal data-delay="1">
              <div class="section-tag">✦ ${t('nav.about')}</div>
              <h2 class="section-title">${t('about.title').replace('moi', '<span>moi</span>').replace('me', '<span>me</span>')}</h2>
              <div class="section-divider mb-4"></div>
            </div>

            <p class="about-text" data-reveal data-delay="2">
              ${t('about.p1')}
            </p>
            <p class="about-text" data-reveal data-delay="3">
              ${t('about.p2')}
            </p>

            <!-- Stats Row -->
            <div class="about-stats" data-reveal data-delay="4">
              <div class="about-stat-item">
                <div class="stat-value">4+</div>
                <div class="stat-label">${t('about.yearsExp')}</div>
              </div>
              <div class="about-stat-divider"></div>
              <div class="about-stat-item">
                <div class="stat-value">4+</div>
                <div class="stat-label">${t('about.projectsDone')}</div>
              </div>
              <div class="about-stat-divider"></div>
              <div class="about-stat-item">
                <div class="stat-value">4</div>
                <div class="stat-label">${t('about.companies')}</div>
              </div>
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
