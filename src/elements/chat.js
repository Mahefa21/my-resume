import { iconWhatsapp, iconMessenger } from '../utils/icons.js'

const WHATSAPP_URL = 'https://wa.me/261343926527'
const MESSENGER_URL = 'https://m.me/raoel.mahefa'

function ensureRoot() {
  let root = document.getElementById('chat-widget-root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'chat-widget-root'
    document.body.appendChild(root)
  }
  return root
}

function render() {
  const root = ensureRoot()

  root.innerHTML = `
    <div class="floating-contact">
      <a class="floating-contact-btn floating-contact-whatsapp" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        ${iconWhatsapp}
      </a>
      <a class="floating-contact-btn floating-contact-messenger" href="${MESSENGER_URL}" target="_blank" rel="noopener noreferrer" aria-label="Messenger">
        ${iconMessenger}
      </a>
    </div>
  `
}

render()
