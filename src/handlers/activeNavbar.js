export function initActiveNavbar() {
  function setActiveLink() {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('#navbar .nav-link')
    let current = ''

    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        current = section.id
      }
    })

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    })
  }

  window.addEventListener('scroll', setActiveLink, { passive: true })
  setActiveLink()
}
