import * as THREE from 'three'

export function initThreeBg(container) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 50

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.inset = '0'
  renderer.domElement.style.zIndex = '0'
  renderer.domElement.style.pointerEvents = 'none'
  container.prepend(renderer.domElement)

  // ── Floating particles ──
  const PARTICLE_COUNT = 180
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const speeds = new Float32Array(PARTICLE_COUNT)

  const primary = new THREE.Color(0x38bdf8)
  const secondary = new THREE.Color(0x818cf8)

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    positions[i3]     = (Math.random() - 0.5) * 100
    positions[i3 + 1] = (Math.random() - 0.5) * 100
    positions[i3 + 2] = (Math.random() - 0.5) * 60

    const mix = Math.random()
    const c = primary.clone().lerp(secondary, mix)
    colors[i3]     = c.r
    colors[i3 + 1] = c.g
    colors[i3 + 2] = c.b

    speeds[i] = 0.02 + Math.random() * 0.06
  }

  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMat = new THREE.PointsMaterial({
    size: 0.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const particles = new THREE.Points(particleGeo, particleMat)
  scene.add(particles)

  // ── Connection lines between nearby particles ──
  const lineGeo = new THREE.BufferGeometry()
  const MAX_LINES = 400
  const linePositions = new Float32Array(MAX_LINES * 6)
  const lineColors = new Float32Array(MAX_LINES * 6)
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
  lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const lines = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lines)

  // ── Cursor bubbles ──
  const bubbles = []
  const bubbleGeo = new THREE.SphereGeometry(1, 16, 16)
  const mouse = new THREE.Vector2(0, 0)
  let lastBubbleTime = 0

  function onMouseMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    const now = performance.now()
    if (now - lastBubbleTime < 60) return // throttle
    lastBubbleTime = now

    const mix = Math.random()
    const color = primary.clone().lerp(secondary, mix)

    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(bubbleGeo, mat)
    const scale = 0.3 + Math.random() * 0.7
    mesh.scale.set(scale, scale, scale)

    // Position in 3D from mouse coords
    mesh.position.x = mouse.x * 40
    mesh.position.y = mouse.y * 25
    mesh.position.z = -5 + Math.random() * 10

    mesh.userData = {
      life: 0,
      maxLife: 1.5 + Math.random() * 1,
      vy: 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 2,
    }

    scene.add(mesh)
    bubbles.push(mesh)
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })

  // ── Resize ──
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize, { passive: true })

  // ── Animate ──
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const dt = clock.getDelta()
    const t = clock.getElapsedTime()

    // Float particles
    const pos = particleGeo.attributes.position.array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3 + 1] += speeds[i] * 8 * dt
      pos[i3]     += Math.sin(t * 0.3 + i) * 0.02

      // Wrap around
      if (pos[i3 + 1] > 55)  pos[i3 + 1] = -55
      if (pos[i3 + 1] < -55) pos[i3 + 1] = 55
    }
    particleGeo.attributes.position.needsUpdate = true

    // Slowly rotate particle system
    particles.rotation.y += dt * 0.02
    particles.rotation.x += dt * 0.005

    // Update lines between close particles
    let lineIdx = 0
    const lp = lineGeo.attributes.position.array
    const lc = lineGeo.attributes.color.array
    const threshold = 15

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_LINES; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_LINES; j++) {
        const i3 = i * 3, j3 = j * 3
        const dx = pos[i3] - pos[j3]
        const dy = pos[i3+1] - pos[j3+1]
        const dz = pos[i3+2] - pos[j3+2]
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)

        if (dist < threshold) {
          const alpha = 1 - dist / threshold
          const idx = lineIdx * 6

          lp[idx]   = pos[i3];   lp[idx+1] = pos[i3+1]; lp[idx+2] = pos[i3+2]
          lp[idx+3] = pos[j3];   lp[idx+4] = pos[j3+1]; lp[idx+5] = pos[j3+2]

          lc[idx] = 0.22 * alpha; lc[idx+1] = 0.74 * alpha; lc[idx+2] = 0.97 * alpha
          lc[idx+3] = 0.51 * alpha; lc[idx+4] = 0.55 * alpha; lc[idx+5] = 0.97 * alpha

          lineIdx++
        }
      }
    }

    // Clear unused lines
    for (let i = lineIdx * 6; i < MAX_LINES * 6; i++) {
      lp[i] = 0; lc[i] = 0
    }
    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)

    // Animate bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i]
      const ud = b.userData
      ud.life += dt

      b.position.y += ud.vy * dt
      b.position.x += ud.vx * dt
      b.scale.multiplyScalar(1 - dt * 0.4)
      b.material.opacity = 0.35 * (1 - ud.life / ud.maxLife)

      if (ud.life >= ud.maxLife) {
        scene.remove(b)
        b.material.dispose()
        bubbles.splice(i, 1)
      }
    }

    renderer.render(scene, camera)
  }

  animate()

  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
}
