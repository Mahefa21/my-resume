const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)

export function observeReveal() {
  document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => observer.observe(el))
}
