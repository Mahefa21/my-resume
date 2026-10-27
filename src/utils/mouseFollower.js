import gsap from 'gsap'

/**
 * GSAP Mouse Follower with Velocity Skew
 * Smooth blob with background layer and velocity-based deformation
 */

export function initMouseFollower() {
  // A trailing blob only makes sense with a real pointer. On touch screens
  // (phones, tablets) there is no hover, so it would just sit frozen over the
  // text; skip it entirely, as well as for people who asked for less motion.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!canHover || reduceMotion) return null

  // Create container
  const container = document.createElement('div')
  container.id = 'mouse-follower-container'
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.4s ease;
  `
  document.body.appendChild(container)

  // Create foreground blob
  const fgBlob = document.createElement('div')
  fgBlob.className = 'blob-foreground'
  fgBlob.style.cssText = `
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    pointer-events: none;
    z-index: 2;
  `

  container.appendChild(fgBlob)

  // Update colors based on theme
  function updateColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

    // Logo palette: one amber dot, kept faint so it never fights the text.
    fgBlob.style.background = isDark ? 'rgba(232, 163, 61, 0.4)' : 'rgba(232, 163, 61, 0.35)'
    fgBlob.style.boxShadow = 'none'
  }

  updateColors()

  // Listen for theme changes
  const observer = new MutationObserver(() => {
    updateColors()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Track mouse position
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let prevMouseX = mouseX
  let prevMouseY = mouseY

  let seen = false
  document.addEventListener('mousemove', (e) => {
    prevMouseX = mouseX
    prevMouseY = mouseY
    mouseX = e.clientX
    mouseY = e.clientY
    // Stay invisible until the pointer is really there, not parked mid-screen.
    if (!seen) {
      seen = true
      state.fgX = mouseX
      state.fgY = mouseY
      container.style.opacity = '1'
    }
  })
  document.documentElement.addEventListener('mouseleave', () => {
    container.style.opacity = '0'
    seen = false
  })

  // Animation state
  const state = {
    fgX: mouseX,
    fgY: mouseY,
    skewX: 0,
    rotationFg: 0,
  }

  // GSAP ticker for smooth animation
  gsap.ticker.add(() => {
    // Smooth follow with easing
    state.fgX += (mouseX - state.fgX) * 0.15
    state.fgY += (mouseY - state.fgY) * 0.15

    // Calculate velocity for skew effect
    const vx = mouseX - prevMouseX
    const vy = mouseY - prevMouseY
    const angle = Math.atan2(vy, vx) * 180 / Math.PI

    // Velocity-based skew (smooth easing)
    const targetSkew = Math.max(-20, Math.min(20, vx * 0.8))
    state.skewX += (targetSkew - state.skewX) * 0.15

    // Rotation based on movement
    state.rotationFg += angle * 0.08

    // Update foreground blob position and transform
    gsap.set(fgBlob, {
      x: state.fgX - 18,
      y: state.fgY - 18,
      rotation: state.rotationFg % 360,
      skewX: state.skewX,
      transformOrigin: '50% 50%',
    })
  })

  // Hide on mobile
  if (window.innerWidth < 768) {
    container.style.display = 'none'
  }

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      container.style.display = 'none'
    } else {
      container.style.display = 'block'
    }
  })

  return { container, fgBlob }
}
