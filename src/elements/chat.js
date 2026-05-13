import { t, getLang, onLangChange } from '../i18n/index.js'

const STATE = {
  open: false,
  messages: [], // { role: 'user'|'assistant', content: string }
  loading: false,
}

const CHAT_ENDPOINT = '/api/chat'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatMessage(text) {
  // Minimal Markdown: line breaks + basic bold/italic.
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

function ensureRoot() {
  let root = document.getElementById('chat-widget-root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'chat-widget-root'
    document.body.appendChild(root)
  }
  return root
}

function scrollToBottom() {
  const log = document.querySelector('.chat-log')
  if (log) log.scrollTop = log.scrollHeight
}

function render() {
  const root = ensureRoot()

  const messagesHTML = STATE.messages.map((m) => `
    <div class="chat-msg chat-msg-${m.role}">
      <div class="chat-bubble">${formatMessage(m.content)}</div>
    </div>
  `).join('')

  const typingHTML = STATE.loading ? `
    <div class="chat-msg chat-msg-assistant">
      <div class="chat-bubble chat-typing">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
    </div>
  ` : ''

  const showSuggestions = STATE.messages.length === 1 && !STATE.loading

  root.innerHTML = `
    <button class="chat-fab ${STATE.open ? 'is-open' : ''}" aria-label="${t('chat.fab')}" aria-expanded="${STATE.open}">
      ${STATE.open ? `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      ` : `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="chat-fab-label">${t('chat.fab')}</span>
        <span class="chat-fab-dot"></span>
      `}
    </button>

    <div class="chat-panel ${STATE.open ? 'is-open' : ''}" role="dialog" aria-label="${t('chat.title')}">
      <header class="chat-header">
        <div class="chat-header-avatar">CR</div>
        <div class="chat-header-text">
          <div class="chat-header-title">${t('chat.title')}</div>
          <div class="chat-header-subtitle">${t('chat.subtitle')}</div>
        </div>
      </header>

      <div class="chat-log" role="log" aria-live="polite">
        ${messagesHTML}
        ${typingHTML}
      </div>

      ${showSuggestions ? `
        <div class="chat-suggestions">
          <button class="chat-suggestion" data-q="${escapeHtml(t('chat.suggestion1'))}">${t('chat.suggestion1')}</button>
          <button class="chat-suggestion" data-q="${escapeHtml(t('chat.suggestion2'))}">${t('chat.suggestion2')}</button>
          <button class="chat-suggestion" data-q="${escapeHtml(t('chat.suggestion3'))}">${t('chat.suggestion3')}</button>
        </div>
      ` : ''}

      <form class="chat-input-row" autocomplete="off">
        <input
          type="text"
          class="chat-input"
          placeholder="${t('chat.placeholder')}"
          aria-label="${t('chat.placeholder')}"
          ${STATE.loading ? 'disabled' : ''}
        />
        <button type="submit" class="chat-send" aria-label="${t('chat.send')}" ${STATE.loading ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>

      <div class="chat-foot">${t('chat.poweredBy')}</div>
    </div>
  `

  bindEvents()
  scrollToBottom()
}

function bindEvents() {
  const fab = document.querySelector('.chat-fab')
  const form = document.querySelector('.chat-input-row')
  const input = document.querySelector('.chat-input')

  fab?.addEventListener('click', toggleOpen)

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = input.value.trim()
    if (!value) return
    input.value = ''
    sendUserMessage(value)
  })

  document.querySelectorAll('.chat-suggestion').forEach((btn) => {
    btn.addEventListener('click', () => sendUserMessage(btn.dataset.q))
  })

  if (STATE.open && !STATE.loading) {
    setTimeout(() => input?.focus(), 80)
  }
}

function toggleOpen() {
  STATE.open = !STATE.open
  // Inject greeting on first open
  if (STATE.open && STATE.messages.length === 0) {
    STATE.messages.push({ role: 'assistant', content: t('chat.greeting') })
  }
  render()
}

async function sendUserMessage(text) {
  STATE.messages.push({ role: 'user', content: text })
  STATE.loading = true
  render()

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: STATE.messages.filter((m) => m.role !== 'assistant' || STATE.messages.indexOf(m) !== 0), // skip greeting
        lang: getLang(),
      }),
    })

    if (!res.ok) throw new Error('Bad response')
    const data = await res.json()
    const reply = data?.reply?.trim()
    if (!reply) throw new Error('Empty reply')

    STATE.messages.push({ role: 'assistant', content: reply })
  } catch (err) {
    STATE.messages.push({ role: 'assistant', content: t('chat.error') })
  } finally {
    STATE.loading = false
    render()
  }
}

// Initial mount + re-render on lang change
render()
onLangChange(() => {
  // Reset greeting if it's the only message, so it shows in the new language
  if (STATE.messages.length === 1 && STATE.messages[0].role === 'assistant') {
    STATE.messages = [{ role: 'assistant', content: t('chat.greeting') }]
  }
  render()
})
