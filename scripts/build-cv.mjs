// Builds the CV (FR + EN) from the site's own i18n data, then prints it to PDF
// with headless Chrome:  npm run cv
//
// Single source of truth: experience, education, awards and project texts come
// from src/i18n/{fr,en}.js, so the CV never drifts from the portfolio.
// Output: src/assets/documents/cv-{fr,en}.html  and  the two PDFs, written to
// public/ (what the site links to) and src/assets/documents/ (kept in sync).
import { readFileSync, writeFileSync, copyFileSync, mkdtempSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const docs = join(root, 'src/assets/documents')
const chrome = process.env.CHROME || 'google-chrome'

const photo = readFileSync(join(root, 'src/assets/images/charly-cutout.webp')).toString('base64')

const contact = {
  email: 'raoelimahefacharly@gmail.com',
  phone: '+261 34 62 498 33',
  web: 'raoelimahefa.netlify.app',
}

// Torn amber stroke from the site (--brush in style.css), used under section titles.
const brush = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 14' preserveAspectRatio='none'%3E%3Cfilter id='r' filterUnits='userSpaceOnUse' x='0' y='0' width='120' height='14'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.09' numOctaves='2' seed='5'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='7'/%3E%3C/filter%3E%3Cpath filter='url(%23r)' d='M6 8 C 32 5, 74 10, 114 6' fill='none' stroke='%23e8a33d' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E")`

// Projects worth a line on the CV (same names in both languages).
const projectNames = ['Harly Cars', 'Catalogue Bliss Holiday', 'Navigateur des Tiers-Lieux', 'Washy']

const copy = {
  fr: {
    lang: 'fr',
    role: 'Développeur Full Stack',
    roleSub: 'TypeScript / PHP / Ruby &amp; IA',
    location: 'Antananarivo, Madagascar',
    summary:
      'Développeur full stack avec <strong>3 ans et plus</strong> d\'expérience en <strong>Ruby on Rails</strong>, <strong>React</strong> et <strong>extraction documentaire par IA</strong> (OCR, LayoutLM). Je conçois des applications web robustes et maintenables, en télétravail comme en présentiel, de la plateforme SaaS aux outils d\'automatisation. Rigoureux, autonome et orienté qualité.',
    now: 'Aujourd\'hui',
    h: {
      skills: 'Compétences clés',
      exp: 'Expérience professionnelle',
      projects: 'Projets en production',
      edu: 'Formation',
      awards: 'Distinctions &amp; hackathons',
    },
    skills: [
      ['Langages', 'Ruby, JavaScript, TypeScript, PHP, Python'],
      ['Frameworks', 'Ruby on Rails, Vue.js, React.js, Stimulus.js, Laravel, Express.js, Node.js, Hono.js, React Refine'],
      ['IA &amp; ML', 'TrOCR, LayoutLM, Ollama, Mistral AI'],
      ['Bases de données', 'MySQL, PostgreSQL, MongoDB'],
      ['Cloud &amp; outils', 'Cloudflare (Workers, Pages), Docker, Git, GitHub, GitLab, Jira, Figma'],
      ['Langues', 'Français, Anglais, Malgache'],
    ],
  },
  en: {
    lang: 'en',
    role: 'Full Stack Developer',
    roleSub: 'TypeScript / PHP / Ruby &amp; AI',
    location: 'Antananarivo, Madagascar',
    summary:
      'Full stack developer with <strong>3+ years</strong> of experience in <strong>Ruby on Rails</strong>, <strong>React</strong> and <strong>AI document extraction</strong> (OCR, LayoutLM). I build robust, maintainable web applications, remote or on-site, from SaaS platforms to automation tools. Rigorous, autonomous and quality-driven.',
    now: 'Present',
    h: {
      skills: 'Key skills',
      exp: 'Professional experience',
      projects: 'Projects in production',
      edu: 'Education',
      awards: 'Awards &amp; hackathons',
    },
    skills: [
      ['Programming', 'Ruby, JavaScript, TypeScript, PHP, Python'],
      ['Frameworks', 'Ruby on Rails, Vue.js, React.js, Stimulus.js, Laravel, Express.js, Node.js, Hono.js, React Refine'],
      ['AI &amp; ML', 'TrOCR, LayoutLM, Ollama, Mistral AI'],
      ['Databases', 'MySQL, PostgreSQL, MongoDB'],
      ['Cloud &amp; tools', 'Cloudflare (Workers, Pages), Docker, Git, GitHub, GitLab, Jira, Figma'],
      ['Languages', 'French, English, Malagasy'],
    ],
  },
}

const icon = {
  mail: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  globe: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
}

// Palette = the site's tokens (src/style.css): logo slate + one amber accent.
const css = `
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --slate: #3c3f55;
      --ink: #23253a;
      --muted: #5e6178;
      --soft: #e6e7ee;
      --alt: #eaebf2;
      --amber: #e8a33d;
      --amber-text: #a8691a;
    }

    html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    body {
      font-family: 'Hanken Grotesk', 'Segoe UI', Arial, sans-serif;
      color: var(--ink);
      font-size: 9.6pt;
      line-height: 1.45;
      background: #fff;
    }

    /* Margins come from @page so page 2 gets the same top margin as page 1. */
    @page { size: A4; margin: 12mm 15mm 12mm; }

    /* Single column on purpose: ATS parsers read PDF text by position, and a
       sidebar layout comes out interleaved with the main column. No
       letter-spacing anywhere either: Chrome prints it as one positioning
       command per glyph, and pdftotext reads those gaps as word breaks
       ("CONTACT" -> "C O N T A C T"). Entry headers are plain block flow, not
       flex, so break-inside: avoid is honoured and nothing gets detached. */

    .header {
      display: flex;
      align-items: center;
      gap: 7mm;
      background: var(--alt);
      border-radius: 5mm;
      padding: 6mm 7mm;
      margin-bottom: 6mm;
      break-inside: avoid;
    }

    .avatar {
      width: 33mm;
      height: 33mm;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--slate);
      box-shadow: 0 0 0 1.1mm #fff;
      overflow: hidden;
    }
    .avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center 12%; display: block; }

    .who { flex: 1; min-width: 0; }
    .name { font-size: 24pt; font-weight: 800; line-height: 1.05; color: var(--ink); }
    .role {
      display: inline-block;
      margin-top: 2.4mm;
      padding-bottom: 1.8mm;
      font-size: 11.5pt;
      font-weight: 700;
      color: var(--slate);
      background: ${brush} 0 100% / 100% 2.4mm no-repeat;
    }

    .role-sub { margin-top: 1.2mm; font-size: 9.6pt; font-weight: 500; color: var(--muted); }

    .contact { font-size: 9pt; color: var(--muted); text-align: right; flex-shrink: 0; }
    .contact div { display: flex; align-items: center; justify-content: flex-end; gap: 1.6mm; margin: 0.9mm 0; }
    .contact svg { color: var(--slate); flex-shrink: 0; }

    .summary {
      border-left: 1.2mm solid var(--amber);
      padding: 0.5mm 0 0.5mm 4mm;
      margin-bottom: 5.5mm;
      font-size: 9.8pt;
      color: var(--muted);
      line-height: 1.55;
      break-inside: avoid;
    }
    strong { font-weight: 700; color: var(--ink); }

    .section { margin-bottom: 5mm; }

    .section-title {
      position: relative;
      font-size: 10.2pt;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--slate);
      border-bottom: 0.3mm solid var(--soft);
      padding-bottom: 1.6mm;
      margin-bottom: 3.2mm;
      break-after: avoid;
    }
    .section-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1mm;
      width: 17mm;
      height: 2.1mm;
      background: ${brush} 0 50% / 100% 100% no-repeat;
    }

    .skill-line { margin-bottom: 1.2mm; color: var(--muted); }
    .skill-line b { color: var(--slate); font-weight: 700; }

    .entry {
      margin-bottom: 4mm;
      padding-left: 3.6mm;
      border-left: 0.5mm solid var(--soft);
      break-inside: avoid;
    }
    .entry:last-child { margin-bottom: 0; }
    .edu { margin-bottom: 2.4mm; }
    .entry.page-start { break-before: page; }
    .entry-title { font-size: 10.6pt; font-weight: 700; color: var(--slate); }
    .entry-title .co { font-weight: 600; color: var(--amber-text); }
    .entry-meta { font-size: 8.6pt; color: var(--muted); margin-top: 0.3mm; }
    .entry ul { margin: 1.6mm 0 0 4mm; }
    .entry li { margin-bottom: 0.9mm; padding-left: 0.6mm; }
    .entry li::marker { color: var(--amber); }

    .entry-school { color: var(--muted); font-size: 9.2pt; }

    .project { margin-bottom: 3.2mm; break-inside: avoid; }
    .project:last-child { margin-bottom: 0; }
    .project-name { font-weight: 700; color: var(--slate); }
    .project-name .co { font-weight: 600; color: var(--amber-text); }
    .project-desc { color: var(--muted); font-size: 9.2pt; }
    .project-meta { font-size: 8.6pt; color: var(--muted); }
    .project-meta a { color: var(--slate); text-decoration: none; font-weight: 600; }

    .award { margin-bottom: 2.4mm; break-inside: avoid; }
    .award:last-child { margin-bottom: 0; }
    .award-title { font-weight: 700; color: var(--slate); }
    .award-detail { font-size: 8.8pt; color: var(--muted); }
`


function html(c, d) {
  const jobs = d.experience.jobs
  const projects = projectNames
    .map((n) => d.projects.items.find((p) => p.name === n))
    .filter(Boolean)

  const entries = jobs
    .map((job, i) => `
    <div class="entry${i === pageBreakAt ? ' page-start' : ''}">
      <div class="entry-title">${job.title} <span class="co">· ${job.company}</span></div>
      <div class="entry-meta">${i === 0 ? job.period.replace(/(Aujourd'hui|Present)/, c.now) : job.period} | ${job.location}</div>
      <ul>${job.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    </div>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CV - RAOELIMAHEFA Charly</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap">
<style>${css}</style>
</head>
<body>

  <header class="header">
    <div class="avatar"><img src="data:image/webp;base64,${photo}" alt="Charly RAOELIMAHEFA"></div>
    <div class="who">
      <div class="name">RAOELIMAHEFA Charly</div>
      <div class="role">${c.role}</div>
      <div class="role-sub">${c.roleSub}</div>
    </div>
    <div class="contact">
      <div><span>${contact.email}</span>${icon.mail}</div>
      <div><span>${contact.phone}</span>${icon.phone}</div>
      <div><span>${c.location}</span>${icon.pin}</div>
      <div><span>${contact.web}</span>${icon.globe}</div>
    </div>
  </header>

  <p class="summary">${c.summary}</p>

  <section class="section">
    <div class="section-title">${c.h.skills}</div>
    ${c.skills.map(([k, v]) => `<div class="skill-line"><b>${k} :</b> ${v}</div>`).join('\n    ')}
  </section>

  <section class="section">
    <div class="section-title">${c.h.exp}</div>${entries}
  </section>

  <section class="section">
    <div class="section-title">${c.h.projects}</div>
    ${projects.map((p) => `<div class="project">
      <div class="project-name">${p.name} <span class="co">· ${p.employer}</span></div>
      <div class="project-desc">${p.description}</div>
      <div class="project-meta">${p.tech.join(', ')} | <a href="${p.link}">${p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></div>
    </div>`).join('\n    ')}
  </section>

  <section class="section">
    <div class="section-title">${c.h.edu}</div>
    ${d.experience.education.map((e) => `<div class="entry edu">
      <div class="entry-title">${e.degree}</div>
      <div class="entry-meta">${e.school} | ${e.period}</div>
    </div>`).join('\n    ')}
  </section>

  <section class="section">
    <div class="section-title">${c.h.awards}</div>
    ${d.experience.awards.map((a) => `<div class="award">
      <div class="award-title">${a.title}</div>
      <div class="award-detail">${a.detail}</div>
    </div>`).join('\n    ')}
  </section>

</body>
</html>
`
}

// Index of the job that starts page 2 (tuned so no entry is ever split).
const pageBreakAt = Number(process.env.CV_BREAK ?? -1)

for (const lang of ['fr', 'en']) {
  const d = (await import(pathToFileURL(join(root, `src/i18n/${lang}.js`)))).default
  const file = join(docs, `cv-${lang}.html`)
  writeFileSync(file, html(copy[lang], d))

  const pdf = join(docs, `CV-RAOELIMAHEFA-Charly-${lang.toUpperCase()}.pdf`)
  const profile = mkdtempSync(join(tmpdir(), 'cv-chrome-'))
  execFileSync(chrome, [
    '--headless=new', '--no-sandbox', '--disable-gpu',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${pdf}`,
    pathToFileURL(file).href,
  ], { stdio: 'ignore' })
  copyFileSync(pdf, join(root, 'public', `CV-RAOELIMAHEFA-Charly-${lang.toUpperCase()}.pdf`))
  console.log(`cv-${lang}: ${file.replace(root + '/', '')} -> PDF`)
}
