class AppSidebar extends HTMLElement {
  connectedCallback() {
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/', 1);
    const prefix = isHomePage ? '' : '../';

    this.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-brand">
          <h1>Henrique Teixeira</h1>
          <p>CS · Porto, Portugal</p>
        </div>

        <nav class="sidebar-nav" aria-label="Main navigation">
          <a href="${prefix}">Home</a>
          <a href="${prefix}experience/">Experience</a>
          <a href="${prefix}projects/">Projects</a>
          <a href="${prefix}education/">Education</a>
          <a href="${prefix}blog/">Blog</a>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-socials">
            <a 
              href="https://github.com/ushouldrun"
              target="_blank" rel="noopener" aria-label="GitHub"
            >
              <svg 
                viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="
                  M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35
                  0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 
                  0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4
                "/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/henrique-teixeira-52461b294/"
              target="_blank" rel="noopener" aria-label="LinkedIn"
            >
              <svg 
                viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

            <a href="mailto:henrique.dsteixeira.dev@gmail.com" aria-label="Email">
              <svg 
                viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>

            <a 
              href="${prefix}assets/Henrique_Teixeira_CV.pdf" 
              download="Henrique_Teixeira_CV.pdf" 
              class="cv-download" 
              aria-label="Download CV"
            >
              <svg 
                viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>

          <div class="sidebar-actions">
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
              <svg class="icon-moon" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>

              <svg class="icon-sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
          </div>

        </div>
      </aside>
    `;

    // 2. Wire up Interactive Features Immediately
    this.initThemeToggle();
    this.initMobileNav();
    this.initActiveLink();
  }

  initThemeToggle() {
    const html = document.documentElement;

    const toggle = this.querySelector('#theme-toggle');
    if (!toggle)
      return;

    toggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
    });
  }

  initMobileNav() {
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const sidebar = this.querySelector('.sidebar');
    if (!mobileToggle || !sidebar)
      return;

    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    this.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768)
          sidebar.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (
        window.innerWidth <= 768 && 
        sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        e.target !== mobileToggle
      ) {
        sidebar.classList.remove('open');
      }
    });
  }

  initActiveLink() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const currentFolder = pathSegments.pop() || 'home';

    this.querySelectorAll('.sidebar-nav a').forEach(link => {
      const href = link.getAttribute('href');
      const hrefSegments = href.split('/').filter(Boolean);
      const targetFolder = hrefSegments.pop() || 'home';

      if (currentFolder === targetFolder) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('app-sidebar', AppSidebar);
