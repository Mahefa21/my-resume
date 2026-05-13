import { t, onLangChange } from '../i18n/index.js'
import { observeReveal } from '../utils/reveal.js'
import { iconMail } from '../utils/icons.js'

const encode = (data) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

function render() {
  const root = document.querySelector('#contact')
  if (!root) return

  root.innerHTML = `
    <div class="section">
      <div class="container">

        <div class="text-center" data-reveal data-delay="1">
          <div class="section-tag">✦ ${t('nav.contact')}</div>
          <h2 class="section-title">${t('contact.title').replace('contacter', '<span>contacter</span>').replace('touch', '<span>touch</span>')}</h2>
          <div class="section-divider mx-auto mb-3"></div>
          <p class="contact-subtitle">${t('contact.subtitle')}</p>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          class="contact-form glass-card"
          data-reveal data-delay="2"
          novalidate
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>Do not fill this out: <input name="bot-field" /></label>
          </p>

          <div class="contact-grid">
            <div class="contact-field">
              <label for="cf-name">${t('contact.nameLabel')}</label>
              <input id="cf-name" type="text" name="name" required
                     placeholder="${t('contact.namePlaceholder')}" autocomplete="name" />
            </div>
            <div class="contact-field">
              <label for="cf-email">${t('contact.emailLabel')}</label>
              <input id="cf-email" type="email" name="email" required
                     placeholder="${t('contact.emailPlaceholder')}" autocomplete="email" />
            </div>
          </div>

          <div class="contact-field">
            <label for="cf-subject">${t('contact.subjectLabel')}</label>
            <input id="cf-subject" type="text" name="subject" required
                   placeholder="${t('contact.subjectPlaceholder')}" />
          </div>

          <div class="contact-field">
            <label for="cf-message">${t('contact.messageLabel')}</label>
            <textarea id="cf-message" name="message" rows="6" required
                      placeholder="${t('contact.messagePlaceholder')}"></textarea>
          </div>

          <button type="submit" class="btn-primary-grad contact-submit">
            ${iconMail}
            <span class="submit-label">${t('contact.submit')}</span>
          </button>

          <div class="contact-status" role="status" aria-live="polite"></div>

          <p class="contact-direct">
            ${t('contact.directEmail')}
            <a href="mailto:raoelimahefacharly@gmail.com">raoelimahefacharly@gmail.com</a>
          </p>
        </form>

      </div>
    </div>
  `

  const form = root.querySelector('form.contact-form')
  const statusEl = root.querySelector('.contact-status')
  const submitBtn = form.querySelector('.contact-submit')
  const submitLabel = submitBtn.querySelector('.submit-label')
  const initialLabel = submitLabel.textContent

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    statusEl.textContent = ''
    statusEl.classList.remove('is-success', 'is-error')

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    submitBtn.disabled = true
    submitLabel.textContent = t('contact.submitting')

    const formData = new FormData(form)
    const data = {}
    formData.forEach((value, key) => { data[key] = value })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data),
      })
      if (!response.ok) throw new Error('Network response was not ok')

      statusEl.textContent = t('contact.success')
      statusEl.classList.add('is-success')
      form.reset()
    } catch (err) {
      statusEl.textContent = t('contact.error')
      statusEl.classList.add('is-error')
    } finally {
      submitBtn.disabled = false
      submitLabel.textContent = initialLabel
    }
  })

  observeReveal()
}

render()
onLangChange(render)
