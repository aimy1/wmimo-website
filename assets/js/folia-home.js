/**
 * Wmimo Homepage Interactive Controller (folia-home.js)
 * Powers the Real Client Dual-Theme Showcase Stage (Dual / Split / Dark / Light)
 * and the System Tray Shell Copy interaction.
 */

(function() {
  'use strict';

  function getLang() {
    if (window.WmimoI18n && typeof window.WmimoI18n.getCurrentLang === 'function') {
      return window.WmimoI18n.getCurrentLang();
    }
    return document.documentElement.getAttribute('data-lang') || 'zh';
  }

  // =========================================================================
  // 1. REAL CLIENT DUAL-THEME SHOWCASE STAGE (Dual / Split / Dark / Light)
  // =========================================================================
  function initAppShowcaseStage() {
    const stage = document.getElementById('appShowcaseStage');
    const modeBtns = document.querySelectorAll('.sc-mode-btn');
    const cardDark = document.getElementById('shotCardDark');
    const cardLight = document.getElementById('shotCardLight');
    const splitContainer = document.getElementById('shotSplitContainer');
    const splitOverlay = document.getElementById('shotSplitOverlay');
    const splitDivider = document.getElementById('shotSplitDivider');

    if (!stage) return;

    function syncFrontCardWithSiteTheme() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (cardDark && cardLight) {
        cardDark.classList.toggle('is-front', !isLight);
        cardLight.classList.toggle('is-front', isLight);
      }
    }

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-sc-mode') || 'dual';
        modeBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        stage.className = `app-showcase-stage mode-${mode}`;
      });
    });

    if (cardDark && cardLight) {
      cardDark.addEventListener('click', () => {
        cardDark.classList.add('is-front');
        cardLight.classList.remove('is-front');
      });
      cardLight.addEventListener('click', () => {
        cardLight.classList.add('is-front');
        cardDark.classList.remove('is-front');
      });
    }

    // Pixel-aligned 371x785 Split Slider
    if (splitContainer && splitOverlay && splitDivider) {
      let dragging = false;
      let splitPct = 50;

      const setSplit = (pct) => {
        splitPct = Math.max(5, Math.min(95, pct));
        splitOverlay.style.clipPath = `inset(0 ${(100 - splitPct).toFixed(2)}% 0 0)`;
        splitDivider.style.left = `${splitPct.toFixed(2)}%`;
        splitDivider.setAttribute('aria-valuenow', String(Math.round(splitPct)));
      };

      const updateSplitFromX = (clientX) => {
        const rect = splitContainer.getBoundingClientRect();
        if (!rect.width) return;
        setSplit(((clientX - rect.left) / rect.width) * 100);
      };

      splitContainer.addEventListener('pointerdown', (e) => {
        dragging = true;
        updateSplitFromX(e.clientX);
      });
      window.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        updateSplitFromX(e.clientX);
      });
      window.addEventListener('pointerup', () => {
        dragging = false;
      });
      splitDivider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setSplit(splitPct - 5); }
        if (e.key === 'ArrowRight') { e.preventDefault(); setSplit(splitPct + 5); }
      });

      setSplit(50);
    }

    syncFrontCardWithSiteTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'data-theme') {
          syncFrontCardWithSiteTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  }

  // =========================================================================
  // 2. SYSTEM TRAY SHELL PROXY COPY INTERACTION
  // =========================================================================
  function initTrayCopyButton() {
    const copyBtn = document.getElementById('homeCopyEnvBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      const cmd = 'export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cmd).catch(() => {});
      }
      const isEn = getLang() === 'en';
      const msg = isEn
        ? 'Copied terminal proxy command: export https_proxy=http://127.0.0.1:7890'
        : '已复制终端代理指令: export https_proxy=http://127.0.0.1:7890';
      if (typeof window.showToast === 'function') {
        window.showToast(msg, 'success');
      }
    });
  }

  // =========================================================================
  // 3. AMBIENT FLOATING CAT LOGOS (Slow Floating & Gentle Parallax Response)
  // =========================================================================
  function initFloatingCatsParallax() {
    const container = document.querySelector('.home-floating-cats');
    if (!container) return;

    const cats = container.querySelectorAll('.cat-float-item');
    if (!cats.length) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const factors = [0.03, 0.05, 0.025, 0.04, 0.06, 0.035, 0.02, 0.07, 0.045, 0.055, 0.03, 0.08];

    function update() {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      cats.forEach((cat, idx) => {
        const factor = factors[idx % factors.length];
        const shiftX = (currentX * factor * 60).toFixed(2);
        const shiftY = (currentY * factor * 60).toFixed(2);
        cat.style.setProperty('--mx', `${shiftX}px`);
        cat.style.setProperty('--my', `${shiftY}px`);
      });

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    }

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  function initHome() {
    initAppShowcaseStage();
    initTrayCopyButton();
    initFloatingCatsParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
  } else {
    initHome();
  }
})();

