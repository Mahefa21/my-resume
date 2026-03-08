window.addEventListener('load', () => {
  const loader = document.getElementById('loader')
  if (!loader) return

  // Let the bar animation finish (~1.8s) before fading out
  setTimeout(() => {
    loader.classList.add('hidden')
    loader.addEventListener('transitionend', () => loader.remove(), { once: true })
  }, 1900)
})
