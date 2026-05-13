import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Note: this project requires Node 18+ with the
// `--experimental-global-webcrypto` flag (set in package.json scripts) so that
// workbox-build can hash precache entries. Netlify build env handles this too.

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // We already maintain public/site.webmanifest by hand — don't let the
      // plugin regenerate it. It would just emit a service worker.
      manifest: false,
      workbox: {
        // Pre-cache the JS/CSS/HTML/font bundle for instant offline reloads.
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,webp,ico}'],
        // Keep individual entries reasonable (max 4 MB each)
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        // Don't intercept the chat function or anything under /api
        navigateFallbackDenylist: [/^\/api\//, /^\/\.netlify\//],
        runtimeCaching: [
          // Large PDFs (CVs) — keep the previous version around for offline use,
          // but always try the network first to surface updates.
          {
            urlPattern: /\.pdf$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'cv-pdfs',
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          // Google Fonts
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // External icons (devicons CDN, HuggingFace, Ollama logo, etc.)
          {
            urlPattern: ({ url }) =>
              url.origin === 'https://cdn.jsdelivr.net' ||
              url.origin === 'https://huggingface.co' ||
              url.origin === 'https://ollama.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'external-icons',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      // Dev mode: keep SW disabled while developing to avoid stale cache headaches
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
