// Netlify Function — Chat proxy to Groq (free tier, Llama 3)
// Reads GROQ_API_KEY from Netlify environment variables.
//
// Receives: { messages: [{ role: 'user'|'assistant', content: string }], lang: 'fr'|'en' }
// Returns:  { reply: string }

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant' // fast, free, smart enough for portfolio Q&A

// --- Abuse protection ------------------------------------------------------
// This endpoint spends a paid API key on behalf of anonymous callers, so it is
// only useful to the portfolio itself: reject anything not sent by our own
// pages, and cap how fast a single client can burn quota.
// process.env.URL / DEPLOY_PRIME_URL are injected by Netlify, so branch deploys
// and a future custom domain keep working without editing this list.
const ALLOWED_ORIGINS = [
  'https://raoelimahefa.netlify.app',
  'http://localhost:5173', // vite dev
  'http://127.0.0.1:5173',
  'http://localhost:8888', // netlify dev
  process.env.URL,
  process.env.DEPLOY_PRIME_URL,
].filter(Boolean)

const isAllowedOrigin = (origin) => Boolean(origin) && ALLOWED_ORIGINS.includes(origin)

const RATE_LIMIT = { max: 10, windowMs: 60_000 } // 10 requests / minute / IP
const MAX_MESSAGES = 12
const MAX_CHARS_PER_MESSAGE = 2000
const MAX_BODY_BYTES = 32 * 1024

// Per-instance counter. Netlify recycles instances, so this is a speed bump
// rather than a hard quota — but it stops the trivial "hammer it in a loop" case.
const hits = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = hits.get(ip)

  if (!bucket || now - bucket.start > RATE_LIMIT.windowMs) {
    hits.set(ip, { start: now, count: 1 })
    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [key, value] of hits) {
        if (now - value.start > RATE_LIMIT.windowMs) hits.delete(key)
      }
    }
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT.max
}

function corsHeaders(origin) {
  if (!isAllowedOrigin(origin)) return { Vary: 'Origin' }
  return {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
  }
}

function json(payload, status, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}

// Portfolio context — embedded so the model can answer questions about Charly.
// This is hard-coded here (not imported from i18n) because Netlify functions
// run server-side and shouldn't bundle the whole client app.
const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in the personal portfolio of Charly RAOELIMAHEFA.
Your purpose is to answer questions visitors have about Charly: his skills, experience,
projects, education, and how to contact him. Be warm, concise (2-4 sentences typically),
and helpful. Always respond in the same language as the visitor (French or English).

If a question is not about Charly or his work, politely redirect to portfolio-related topics.
If you don't know something, tell the visitor to use the contact form or email
raoelimahefacharly@gmail.com directly.

=== ABOUT CHARLY ===
Full name: RAOELIMAHEFA Charly
Title: Développeur Full Stack
Based in: Antananarivo, Madagascar
Address: LOT AD 13 BIS Ambohitrarahaba, Antananarivo, Madagascar
Email: raoelimahefacharly@gmail.com
Phone / WhatsApp: +261 34 39 265 27
Website: https://raoelimahefa.netlify.app
GitHub: github.com/raoelimahefa
LinkedIn: linkedin.com/in/raoelimahefa
Years of experience: 4+

Mission: helping businesses solve real problems using AI. From document digitalization
to business process automation, Charly designs practical AI solutions using tools like
Ollama and Mistral AI alongside his strong web development background.

=== EXPERIENCE ===
1) Web Designer / Digital Marketing — Impact Production Group (IPG), Mauritius (Oct 2025 – Apr 2026)
   - Research, design and implementation of AI-powered solutions for operational challenges.
   - Built a digitalization system for import documentation using TrOCR, LayoutLM,
     Mistral AI via Ollama, Python, PostgreSQL — replacing legacy paper-based processes.
     IMPORTANT: this is document extraction (IDP) — OCR, layout-aware field extraction,
     then an LLM to structure the result. It is NOT retrieval-augmented generation:
     there is no embedding model, no vector store and no semantic search over a corpus.
     Never describe this work as RAG, even if a visitor suggests that word.
   - SEO optimization of the company website. Social media content planning.

2) Full Stack Ruby on Rails Developer — Top-Webgroup (Ineland LTD), Mauritius remote (Mar 2024 – Mar 2025)
   - SaaS platform: Ruby on Rails, Vue.js, Stimulus, Turbo, MySQL.
   - Performance improvements, refactoring, RSpec unit tests, new features.

3) Full Stack PHP / JavaScript Developer — Open Atlas, La Réunion remote (Jun 2022 – Feb 2024)
   - Developed the Communecter platform: PHP (Yii), JavaScript/jQuery, MongoDB.
   - UI/UX improvements, bug fixing, performance optimization.

4) Full Stack Node.js / React Developer — Ny Ask, Antananarivo, Madagascar (Jan – Sept 2021)
   - Logistics management platform: Node.js, React.js, PostgreSQL.
   - Back-office for inventory management. Barcode scanning system.

=== EDUCATION ===
- Master's Degree (Maîtrise) — IT Modelling and Engineering (M2I), EMIT / Université de Fianarantsoa, 2021 – 2023
- Bachelor's Degree (Licence) — Intranet & Internet Application Development (DA2I), EMIT, 2017 – 2020
- Scientific Baccalaureate (Series C), Lycée Saint François Xavier Antanimena, 2016 – 2017

=== SKILLS ===
Languages: Ruby (78%), JavaScript (80%), TypeScript (60%), PHP (60%), Python (65%)
Frameworks: Ruby on Rails, Vue.js, React.js, Stimulus.js, Laravel, Express.js, Node.js, Turbo
Databases: PostgreSQL, MySQL, MongoDB
Tools: Git, GitHub, GitLab, Bitbucket, Docker, VS Code, Jira, Figma, Canva
AI / ML: TrOCR, LayoutLM, Ollama, Mistral AI

Spoken languages: French (B2 upper-intermediate), English (B1 functional), Malagasy (native)

=== PROJECTS ===
1) Navigateur des Tiers-Lieux (Open Atlas / Communecter)
   Mapping & navigation platform for coworking spaces in France.
   Tech: Yii, JavaScript, jQuery, MongoDB. https://navigateur.tiers-lieux.org

2) Ekisphère (Open Atlas / Communecter)
   Collaborative online space for networking between local actors.
   Tech: Yii, JavaScript, jQuery, MongoDB.

3) Top-Webgroup Platform (Ineland LTD)
   SaaS platform for web agency management — maintenance and new features.
   Tech: Ruby on Rails, Stimulus, Vue.js, Turbo, MySQL. https://top-webgroup.com

4) EMIT School Website
   Contribution to the official EMIT website.
   Tech: Strapi, JavaScript, PostgreSQL. https://emit.mg

=== AWARDS ===
- 🥇 1st place — EMIHACK 2023 (Team NET-BUILDER, wine sales management website, EMIT)
- 🥉 3rd place — Inter-university Hackathon 2022 (Team KAODY-BUILDER, file sharing tool, TechZara)
`.trim()

export default async (request, context) => {
  const origin = request.headers.get('origin')
  const cors = corsHeaders(origin)

  if (request.method === 'OPTIONS') {
    if (!isAllowedOrigin(origin)) return new Response(null, { status: 403 })
    return new Response(null, {
      status: 204,
      headers: {
        ...cors,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'POST, OPTIONS' })
  }

  // Per the Fetch spec browsers send Origin on every non-GET/HEAD request,
  // including same-origin ones (verified in Chrome), so a POST without a known
  // Origin is not one of our pages. This is a speed bump, not authentication —
  // a scripted client can forge the header — but it stops drive-by use of the
  // endpoint as a free LLM, and the rate limit below covers the rest.
  if (!isAllowedOrigin(origin)) {
    return json({ error: 'Forbidden' }, 403)
  }

  const ip =
    context?.ip || request.headers.get('x-nf-client-connection-ip') || 'unknown'
  if (isRateLimited(ip)) {
    return json({ error: 'Too many requests' }, 429, {
      ...cors,
      'Retry-After': '60',
    })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    // Don't tell the caller which knob is missing.
    console.error('chat: GROQ_API_KEY is not configured')
    return json({ error: 'Service unavailable' }, 503, cors)
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: 'Payload too large' }, 413, cors)
  }

  let body
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid JSON' }, 400, cors)
  }

  const messages = Array.isArray(body?.messages) ? body.messages : []
  if (messages.length === 0) {
    return json({ error: 'No messages provided' }, 400, cors)
  }

  // Cap conversation length and message size, and only ever forward the two
  // roles we expect — a caller must not be able to inject its own system prompt.
  const trimmed = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }))

  if (trimmed.length === 0) {
    return json({ error: 'No messages provided' }, 400, cors)
  }

  const groqPayload = {
    model: MODEL,
    messages: [
      { role: 'system', content: PORTFOLIO_CONTEXT },
      ...trimmed,
    ],
    temperature: 0.5,
    max_tokens: 400,
    stream: false,
  }

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groqPayload),
      // Don't let a stalled upstream hold the function open for its full budget.
      signal: AbortSignal.timeout(20_000),
    })

    if (!groqRes.ok) {
      // Provider errors can echo back request details and quota state — log
      // them, but never hand them to the caller.
      console.error('chat: provider error', groqRes.status, (await groqRes.text()).slice(0, 500))
      return json({ error: 'Upstream error' }, 502, cors)
    }

    const data = await groqRes.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || ''

    return json({ reply }, 200, cors)
  } catch (err) {
    console.error('chat: internal error', err)
    return json({ error: 'Internal error' }, 500, cors)
  }
}
