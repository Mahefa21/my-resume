// Renders a label whose first letters sit inside a solid trapezoid tag while
// the rest of the word runs out of it — "(Bon)jour, je suis", "(Com)pétences".
// Name kept as "circle" even though the shape is now a trapezoid (see the CSS
// rules below it) — renaming would only touch call sites for no behavior change.
//
// The cut must land *inside* a word: a tag wrapped around "À p" (space
// included) or "Hi," (comma included) reads as a mistake rather than a device.
// So the head stops at the first space, which is why FR "À propos" keeps just
// "À" as its head.

const MAX_HEAD = 3

export function splitForCircle(label) {
  const text = String(label ?? '').trim()
  let head = text.slice(0, MAX_HEAD)
  const space = head.indexOf(' ')
  if (space > 0) head = head.slice(0, space)
  return { head, tail: text.slice(head.length) }
}

// `extraClass` styles the typography (size, letter-spacing); the circle itself
// is sized in em, so it follows whatever font-size that class sets.
export function circleLabel(label, extraClass = '') {
  const { head, tail } = splitForCircle(label)
  return `<span class="circle-label ${extraClass}">` +
    `<span class="circle-label-head">${head}</span>` +
    `<span class="circle-label-tail">${tail}</span>` +
    `</span>`
}
