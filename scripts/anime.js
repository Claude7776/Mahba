// animate-visible.js
(function () {
  if (typeof window === 'undefined') return;

  const rootMargin = '0px 0px -8% 0px'; // trigger slightly before full visibility
  const threshold = 0.12;

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        observer.unobserve(el); // one-shot: animate once
      }
    });
  }, { root: null, rootMargin, threshold });

  // auto-bind any container with class animate-on-visible
  document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.animate-on-visible');
    nodes.forEach(n => io.observe(n));
  });
})();
