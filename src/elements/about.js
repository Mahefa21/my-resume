import charlyImage from './../../src/assets/images/charly.png'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconWhatsapp, iconFacebook, iconMail } from '../utils/icons.js'

function render() {
  document.querySelector('#about').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center mb-5" data-reveal>
          <div class="section-tag">✦ ${t('nav.about')}</div>
          <h2 class="section-title">${t('about.title').replace('moi', '<span>moi</span>').replace('me', '<span>me</span>')}</h2>
          <div class="section-divider mx-auto"></div>
        </div>

        <!-- Bento Grid -->
        <div class="bento-grid about-bento">

          <!-- Photo Card -->
          <div class="bento-item bento-photo" data-reveal="left" data-delay="1">
            <div class="glass-card bento-card h-100 d-flex flex-column align-items-center justify-content-center p-4">
              <div class="profile-wrap d-inline-block">
                <div class="profile-ring"></div>
                <div class="profile-ring-mask"></div>
                <img class="profile-img" src="${charlyImage}" alt="Charly RAOELIMAHEFA" />
              </div>
              <div class="social-links justify-content-center mt-4">
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
          </div>

          <!-- Bio Card -->
          <div class="bento-item bento-bio" data-reveal data-delay="2">
            <div class="glass-card bento-card h-100 p-4">
              <p class="bento-bio-text">
                ${t('about.p1')}
              </p>
              <p class="bento-bio-text mb-0">
                ${t('about.p2')}
              </p>
            </div>
          </div>

          <!-- Stat Cards -->
          <div class="bento-item bento-stat" data-reveal="scale" data-delay="2">
            <div class="glass-card bento-card h-100 bento-stat-inner">
              <div class="stat-value">4+</div>
              <div class="stat-label">${t('about.yearsExp')}</div>
            </div>
          </div>

          <div class="bento-item bento-stat" data-reveal="scale" data-delay="3">
            <div class="glass-card bento-card h-100 bento-stat-inner">
              <div class="stat-value">4+</div>
              <div class="stat-label">${t('about.projectsDone')}</div>
            </div>
          </div>

          <div class="bento-item bento-stat" data-reveal="scale" data-delay="4">
            <div class="glass-card bento-card h-100 bento-stat-inner">
              <div class="stat-value">4</div>
              <div class="stat-label">${t('about.companies')}</div>
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
