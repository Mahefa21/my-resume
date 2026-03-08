import charlyImage from './../../src/assets/images/charly.png'
import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconWhatsapp, iconFacebook, iconMail } from '../utils/icons.js'

function render() {
  document.querySelector('#about').innerHTML = `
    <div class="section">
      <div class="container">

        <div class="row align-items-center g-5">

          <!-- Photo -->
          <div class="col-lg-4 text-center" data-reveal="left">
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

          <!-- Text -->
          <div class="col-lg-8">
            <div data-reveal data-delay="1">
              <div class="section-tag">✦ ${t('nav.about')}</div>
              <h2 class="section-title">${t('about.title').replace('moi', '<span>moi</span>').replace('me', '<span>me</span>')}</h2>
              <div class="section-divider mb-4"></div>
            </div>

            <p class="mb-3" style="color:var(--text-muted); font-size:14.5px; line-height:1.8;" data-reveal data-delay="2">
              ${t('about.p1')}
            </p>
            <p class="mb-4" style="color:var(--text-muted); font-size:14.5px; line-height:1.8;" data-reveal data-delay="3">
              ${t('about.p2')}
            </p>

            <!-- Stats -->
            <div class="row g-3" data-reveal data-delay="4">
              <div class="col-4">
                <div class="stat-card">
                  <div class="stat-value">4+</div>
                  <div class="stat-label">${t('about.yearsExp')}</div>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-card">
                  <div class="stat-value">4+</div>
                  <div class="stat-label">${t('about.projectsDone')}</div>
                </div>
              </div>
              <div class="col-4">
                <div class="stat-card">
                  <div class="stat-value">4</div>
                  <div class="stat-label">${t('about.companies')}</div>
                </div>
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
