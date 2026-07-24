#!/usr/bin/env node
// Ping IndexNow so Bing (and Yandex, Naver, Seznam) re-crawl within minutes
// instead of waiting for their own schedule. Google does not participate.
//
//   node scripts/indexnow.js
//
// The key below must stay in sync with the file public/<KEY>.txt, which is what
// the search engines fetch to verify we own the domain.

const KEY = '2e8ec0ece7bdbe14e87d10e860964113'
const HOST = 'raoelimahefa.netlify.app'

const urls = [`https://${HOST}/`, `https://${HOST}/?lang=en`]

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
})

// 200 = accepted, 202 = accepted but key still being validated.
if (res.ok) {
  console.log(`IndexNow: ${res.status} — ${urls.length} URL(s) soumise(s)`)
} else {
  console.error(`IndexNow: échec ${res.status} — ${(await res.text()).slice(0, 200)}`)
  process.exit(1)
}
