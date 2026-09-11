// Flat-colored SVG divider dropped at the bottom of a `.section`. The fill
// color is set purely in CSS (see `.section-wave path` in style.css) so it
// automatically alternates with the section background and follows the
// light/dark theme — this markup only supplies the shape.
export const sectionWave = `
  <svg class="section-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0,32 C240,60 480,4 720,18 C960,32 1200,58 1440,26 L1440,60 L0,60 Z"></path>
  </svg>
`
