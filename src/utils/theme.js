let currentTheme = localStorage.getItem('theme') || 'dark'

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
