import gsap from 'gsap'

/**
 * GSAP Mouse Follower with Velocity Skew
 * Smooth blob with background layer and velocity-based deformation
 */

export function initMouseFollower() {
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
  `
  document.body.appendChild(container)

  // Create background blob
  const bgBlob = document.createElement('div')
  bgBlob.className = 'blob-background'
  bgBlob.style.cssText = `
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    pointer-events: none;
    z-index: 1;
  `

  // Create foreground blob
  const fgBlob = document.createElement('div')
  fgBlob.className = 'blob-foreground'
  fgBlob.style.cssText = `
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    pointer-events: none;
    z-index: 2;
  `

  container.appendChild(bgBlob)
  container.appendChild(fgBlob)

  // Update colors based on theme
  function updateColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

    if (isDark) {
      bgBlob.style.background = 'rgba(56, 189, 248, 0.35)'
      bgBlob.style.boxShadow = '0 0 40px rgba(56, 189, 248, 0.4)'

      fgBlob.style.background = 'rgba(129, 140, 248, 0.5)'
      fgBlob.style.boxShadow = '0 0 30px rgba(129, 140, 248, 0.5), inset -5px -5px 15px rgba(0, 0, 0, 0.3)'
    } else {
      bgBlob.style.background = 'rgba(129, 140, 248, 0.25)'
      bgBlob.style.boxShadow = '0 0 40px rgba(129, 140, 248, 0.3)'

      fgBlob.style.background = 'rgba(56, 189, 248, 0.4)'
      fgBlob.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.4), inset -5px -5px 15px rgba(0, 0, 0, 0.1)'
    }
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

  document.addEventListener('mousemove', (e) => {
    prevMouseX = mouseX
    prevMouseY = mouseY
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Animation state
  const state = {
    bgX: mouseX,
    bgY: mouseY,
    fgX: mouseX,
    fgY: mouseY,
    skewX: 0,
    rotationBg: 0,
    rotationFg: 0,
  }

  // GSAP ticker for smooth animation
  gsap.ticker.add(() => {
    // Smooth follow with easing
    // Background blob slower tracking
    state.bgX += (mouseX - state.bgX) * 0.08
    state.bgY += (mouseY - state.bgY) * 0.08

    // Foreground blob faster tracking
    state.fgX += (mouseX - state.fgX) * 0.15
    state.fgY += (mouseY - state.fgY) * 0.15

    // Calculate velocity for skew effect
    const vx = mouseX - prevMouseX
    const vy = mouseY - prevMouseY
    const distance = Math.hypot(vx, vy)
    const angle = Math.atan2(vy, vx) * 180 / Math.PI

    // Velocity-based skew (smooth easing)
    const targetSkew = Math.max(-20, Math.min(20, vx * 0.8))
    state.skewX += (targetSkew - state.skewX) * 0.15

    // Rotation based on movement
    state.rotationBg += angle * 0.04
    state.rotationFg += angle * 0.08

    // Update background blob position and transform
    gsap.set(bgBlob, {
      x: state.bgX - 40,
      y: state.bgY - 40,
      rotation: state.rotationBg % 360,
      skewX: state.skewX * 0.4,
      transformOrigin: '50% 50%',
    })

    // Update foreground blob position and transform
    gsap.set(fgBlob, {
      x: state.fgX - 25,
      y: state.fgY - 25,
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

  return { container, bgBlob, fgBlob }
}
