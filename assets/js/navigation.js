/**
 * ClaraElen — Navegación Sticky, ScrollSpy y Menú Móvil
 */
export function initNavigation() {
  const navbar = document.getElementById('header');
  const navLinks = document.querySelectorAll('.ce-navbar .nav-link[href^="#"]');
  const navbarCollapse = document.getElementById('navbarNav');

  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 36);

    const scrollPos = window.scrollY + 135;
    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const section = document.querySelector(targetId);
      if (!section) return;

      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}
