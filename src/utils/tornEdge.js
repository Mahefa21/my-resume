// Torn, dry-brush divider used at the bottom of every section. It is painted
// in the NEXT section's background color, so it reads as that section tearing
// up into the current one. Each variant has its own outline and noise seed so
// consecutive sections never repeat the same tear.
//
//   tornEdge({ to: 'bg' | 'alt', variant: 0..4 })

const SHAPES = [
  'M-20 52 C 120 30, 240 62, 380 44 S 640 22, 780 46 S 1040 66, 1220 38 L1220 120 L-20 120 Z',
  'M-20 40 C 160 64, 300 30, 470 48 S 760 70, 900 40 S 1100 30, 1220 54 L1220 120 L-20 120 Z',
  'M-20 58 C 90 44, 220 34, 330 50 S 560 66, 700 36 S 980 24, 1220 50 L1220 120 L-20 120 Z',
  'M-20 34 C 140 50, 260 66, 420 52 S 700 26, 860 50 S 1080 62, 1220 32 L1220 120 L-20 120 Z',
  'M-20 50 C 180 36, 320 60, 520 40 S 820 34, 960 58 S 1140 44, 1220 46 L1220 120 L-20 120 Z',
]

const SEEDS = [3, 11, 19, 27, 41]

// Filter ids must be unique in the document; sections re-render on language
// change, so a plain counter is simpler than tracking which ids are live.
let uid = 0

export function tornEdge({ to = 'bg', variant = 0 } = {}) {
  const i = Math.abs(variant) % SHAPES.length
  const id = `tornRough-${uid++}`
  return `
    <svg class="torn-edge torn-edge--to-${to}" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id="${id}" x="0" y="-20%" width="100%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.12" numOctaves="3" seed="${SEEDS[i]}" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>
      <path filter="url(#${id})" fill="currentColor" d="${SHAPES[i]}" />
    </svg>
  `
}
