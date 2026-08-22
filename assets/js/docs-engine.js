/**
 * Docs Center Interactive Engine
 * Handles instant search filtering, TOC active scroll spy, and smooth anchor scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  initDocsSearch();
  initTocScrollSpy();
  initSidebarActiveState();
});

/* ==========================================================================
   Instant Search for Docs
   ========================================================================== */
function initDocsSearch() {
  const searchInput = document.getElementById('docsSearchInput');
  const sections = document.querySelectorAll('.docs-section');
  const navItems = document.querySelectorAll('.docs-nav-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (!query) {
      // Reset visibility
      sections.forEach(sec => sec.style.display = '');
      navItems.forEach(item => item.style.display = '');
      return;
    }

    let matchCount = 0;

    sections.forEach(section => {
      const text = section.innerText.toLowerCase();
      const id = section.getAttribute('id');
      const isMatch = text.includes(query);

      section.style.display = isMatch ? '' : 'none';
      if (isMatch) matchCount++;

      // Filter sidebar nav items
      navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${id}`) {
          item.style.display = isMatch ? '' : 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   TOC (Table of Contents) Scroll Spy
   ========================================================================== */
function initTocScrollSpy() {
  const sections = document.querySelectorAll('.docs-section');
  const tocLinks = document.querySelectorAll('.toc-link');
  const sidebarLinks = document.querySelectorAll('.docs-nav-item a');

  if (!sections.length || !tocLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      tocLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      sidebarLinks.forEach(link => {
        const parent = link.closest('.docs-nav-item');
        if (link.getAttribute('href') === `#${currentId}`) {
          parent?.classList.add('active');
        } else {
          parent?.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   Sidebar active state on click
   ========================================================================== */
function initSidebarActiveState() {
  const sidebarItems = document.querySelectorAll('.docs-nav-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
