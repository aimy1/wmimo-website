/**
 * Wmimo Official Website - Advanced Interactive Animation & UI Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderScroll();
  initMobileNav();
  initToast();
  initCodeCopy();
  initBackToTop();
  initScrollReveal();
  initSpotlight();
  initMagneticHover();
  initStatCounters();
  initDocsSidebarFilter();
  initAssetsFilter();
});





/* ==========================================================================
   Cursor Spotlight Engine (No 3D Tilt/Deflection)
   ========================================================================== */
function initSpotlight() {
  const spotlightElements = document.querySelectorAll('.spotlight-card, .feature-card, .platform-card, .screenshot-wrapper, .download-featured-card, .card');

  spotlightElements.forEach(el => {
    // Add spotlight class if not already present
    el.classList.add('spotlight-card');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight coordinates
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   Scroll-Driven Stagger Reveal Engine
   ========================================================================== */
function initScrollReveal() {
  // Automatically tag content elements if not explicitly tagged
  const targets = document.querySelectorAll(
    '.feature-card, .platform-card, .stat-item, .hero-content > *, .page-hero > *, .docs-article > h2, .docs-article > .callout, .docs-article > .code-block-wrapper, .docs-table-wrapper'
  );

  targets.forEach((el, i) => {
    if (!el.classList.contains('reveal-on-scroll')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   Magnetic Hover Micro-Interaction for Primary Buttons
   ========================================================================== */
function initMagneticHover() {
  const buttons = document.querySelectorAll('.btn-primary');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Subtle attraction
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* ==========================================================================
   Number Counters Animation for Stats
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number, .featured-stat-val');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el) {
  const text = el.innerText.trim();
  const match = text.match(/^([\D]*)(\d+[\.\d]*)(.*)$/);
  if (!match) return;

  const prefix = match[1] || '';
  const targetNum = parseFloat(match[2]);
  const suffix = match[3] || '';
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = (targetNum * easeOut).toFixed(targetNum % 1 === 0 ? 0 : 1);

    el.innerText = `${prefix}${currentVal}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.innerText = text;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   Back to Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top-btn';
  btn.setAttribute('aria-label', window.WmimoI18n ? window.WmimoI18n.t('btn.back_to_top') : '回到顶部');
  btn.setAttribute('title', window.WmimoI18n ? window.WmimoI18n.t('btn.back_to_top') : '回到顶部');
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Theme Management (Locked to Dark Mode)
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
  try {
    localStorage.removeItem('wmimo_theme');
  } catch (e) {}
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', 'dark');
  try {
    localStorage.removeItem('wmimo_theme');
  } catch (e) {}
}

function syncThemeUI(theme) {
  // Theme is locked to dark
}


/* ==========================================================================
   Mobile Hamburger Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  function closeDrawer() {
    drawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   Global Toast Notification System
   ========================================================================== */
let toastContainer = null;

function initToast() {
  toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = 'info', duration = 2500) {
  if (!toastContainer) initToast();

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00BCDF" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`;
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

// Global copy helper
window.copyToClipboard = function(text, successMsg = '已成功复制到剪贴板') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, 'success');
  } catch (err) {
    showToast('复制失败，请手动选择复制', 'error');
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   Header Scroll State (Sleek Glassmorphic Floating Bar)
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function update() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ==========================================================================
   Code Copy Buttons with Animated Visual Feedback
   ========================================================================== */
function initCodeCopy() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block-wrapper');
      if (!codeBlock) return;
      const code = codeBlock.querySelector('code, pre')?.innerText || '';
      
      const copySuccessMsg = window.WmimoI18n ? window.WmimoI18n.t('toast.code_copied') : '代码已复制';
      window.copyToClipboard(code.trim(), copySuccessMsg);
      
      const originalText = btn.innerText;
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>${copySuccessMsg}</span>`;
      btn.classList.add('copied');

      setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('copied');
      }, 2000);
    });
  });
}

/* ==========================================================================
   Documentation Sidebar In-Place Search Filter (No Popup Modal)
   ========================================================================== */
function initDocsSidebarFilter() {
  const searchInput = document.getElementById('sidebarSearchInput');
  const clearBtn = document.getElementById('sidebarSearchClear');
  const emptyMsg = document.getElementById('sidebarSearchEmpty');
  const navGroups = document.querySelectorAll('.docs-sidebar .docs-nav-group');
  const navItems = document.querySelectorAll('.docs-sidebar .docs-nav-item');

  if (!searchInput) return;

  function performFilter(query) {
    const q = query.trim().toLowerCase();

    if (!q) {
      if (clearBtn) clearBtn.style.display = 'none';
      if (emptyMsg) emptyMsg.style.display = 'none';
      navItems.forEach(item => item.style.display = '');
      navGroups.forEach(group => group.style.display = '');
      return;
    }

    if (clearBtn) clearBtn.style.display = 'flex';

    let totalMatches = 0;

    navGroups.forEach(group => {
      let groupMatches = 0;
      const items = group.querySelectorAll('.docs-nav-item');
      
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const href = item.querySelector('a')?.getAttribute('href')?.toLowerCase() || '';
        
        if (text.includes(q) || href.includes(q)) {
          item.style.display = '';
          groupMatches++;
          totalMatches++;
        } else {
          item.style.display = 'none';
        }
      });

      if (groupMatches > 0) {
        group.style.display = '';
      } else {
        group.style.display = 'none';
      }
    });

    if (emptyMsg) {
      emptyMsg.style.display = totalMatches === 0 ? 'block' : 'none';
    }
  }

  searchInput.addEventListener('input', (e) => {
    performFilter(e.target.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performFilter('');
      searchInput.focus();
    });
  }

  // Clear search on Escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performFilter('');
      searchInput.blur();
    }
  });
}


/* ==========================================================================
   GitHub Releases Style Assets Category Filter
   ========================================================================== */
function initAssetsFilter() {
  const filterBtns = document.querySelectorAll('.gh-filter-btn');
  const rows = document.querySelectorAll('.gh-asset-row');
  if (!filterBtns.length || !rows.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const cat = btn.getAttribute('data-filter');
      rows.forEach(row => {
        const rowCat = row.getAttribute('data-platform');
        if (cat === 'all' || rowCat === cat) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}




