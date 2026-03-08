// Cache busting version - update this to force localStorage reset
const THEME_VERSION = '2.0'
const versionKey = 'theme_version'

// Check if localStorage version is outdated
const storedVersion = localStorage.getItem(versionKey)
if (storedVersion !== THEME_VERSION) {
  // Outdated version - clear old theme and use light as default
  localStorage.removeItem('theme')
  localStorage.setItem(versionKey, THEME_VERSION)
}

// Initialize theme - default to light mode
let currentTheme = 'light'

// Check if user previously saved a theme preference
const storedTheme = localStorage.getItem('theme')
if (storedTheme === 'dark') {
  // Only use dark if explicitly saved by user after this update
  currentTheme = 'dark'
} else if (storedTheme === 'light') {
  currentTheme = 'light'
} else {
  // First time or old data - default to light and save it
  localStorage.setItem('theme', 'light')
}

export const getTheme = () => currentTheme

export function setTheme(theme) {
  currentTheme = theme
  localStorage.setItem('theme', theme)
  document.documentElement.dataset.theme = theme
  document.dispatchEvent(new CustomEvent('themeChange', { detail: theme }))
}

export function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
}

export function onThemeChange(callback) {
  document.addEventListener('themeChange', callback)
}

// Apply stored theme on init
document.documentElement.dataset.theme = currentTheme
