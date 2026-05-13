// Netlify Function — Chat proxy to Groq (free tier, Llama 3)
// Reads GROQ_API_KEY from Netlify environment variables.
//
// Receives: { messages: [{ role: 'user'|'assistant', content: string }], lang: 'fr'|'en' }
// Returns:  { reply: string }

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant' // fast, free, smart enough for portfolio Q&A

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
GitHub: github.com/raoelimahefa-charly
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

export default async (request) => {
  // CORS — allow same-origin only by default (Netlify handles this in production)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const messages = Array.isArray(body.messages) ? body.messages : []
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Basic abuse protection: cap conversation length and message size
  const trimmed = messages
    .slice(-12) // keep last 12 turns max
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000), // 2000 chars per message
    }))

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
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return new Response(
        JSON.stringify({ error: 'LLM provider error', detail: errText.slice(0, 200) }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const data = await groqRes.json()
    const reply = data?.choices?.[0]?.message?.content?.trim() || ''

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal error', detail: String(err).slice(0, 200) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
