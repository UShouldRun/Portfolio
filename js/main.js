(function () {

  const html = document.documentElement;
  const THEME_KEY = 'portfolio-theme';

  function getTheme() {
    return (
      localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    );
  }

  html.setAttribute('data-theme', getTheme());

  document.addEventListener('DOMContentLoaded', function () {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0)
      return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  });

})();
