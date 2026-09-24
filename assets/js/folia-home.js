/**
 * Folia Aesthetic Parallax & Interactive Engine for Wmimo Homepage
 * Implements smooth kinetic typography, ambient floating orbs,
 * 28-item geometric cluster, 56 twinkling stars, scroll progress transforms,
 * stacked cards fan-out, and interactive before/after comparison slider.
 */

(function() {
  'use strict';

  // State
  let scrollY = 0;
  let winHeight = window.innerHeight || 1000;
  let isDraggingCompare = false;
  let compareRatio = 50; // 0 - 100%
  let compareContainer = null;
  let compareDivider = null;
  let compareOverlay = null;

  // Geometric shapes config (28 items)
  const GEO_TYPES = ['geo-circle-hollow', 'geo-square-hollow', 'geo-cat', 'geo-dots'];
  const geoItems = Array.from({ length: 28 }, (_, i) => {
    const type = GEO_TYPES[i % GEO_TYPES.length];
    const sizeBase = 46 + (i % 5) * 28;
    return {
      id: 'geo-' + i,
      type: type,
      top: `${4 + (i * 9) % 88}%`,
      left: `${2 + (i * 13) % 94}%`,
      width: `${sizeBase}px`,
      height: `${sizeBase}px`,
      opacity: type === 'geo-cat' ? (0.16 + (i % 4) * 0.05).toFixed(3) : (0.07 + (i % 4) * 0.035).toFixed(3),
      parallaxX: ((i % 7 - 3) * 0.07).toFixed(3),
      parallaxY: (-0.16 + (i % 6) * 0.1).toFixed(3),
      rotateSpeed: ((i % 8 - 4) * 0.12).toFixed(3),
      scale: (0.8 + (i % 5) * 0.1).toFixed(2),
      el: null
    };
  });

  // Stars config (56 items)
  const starItems = Array.from({ length: 56 }, (_, i) => ({
    id: 'star-' + i,
    top: `${(i * 11) % 98}%`,
    left: `${(i * 17) % 98}%`,
    parallaxX: ((i % 6 - 3) * 0.035).toFixed(3),
    parallaxY: (-0.08 - (i % 7) * 0.04).toFixed(3),
    phase: i * 0.6,
    el: null
  }));

  // Scroll Progress Normalizer: 0 when scrollY <= start%, 1 when scrollY >= end%
  function getScrollProgress(startPercent, endPercent) {
    if (winHeight === 0) return 0;
    const startPx = (startPercent / 100) * winHeight;
    const endPx = (endPercent / 100) * winHeight;
    if (scrollY <= startPx) return 0;
    if (scrollY >= endPx) return 1;
    return (scrollY - startPx) / (endPx - startPx);
  }

  // Dynamic Viewport-Relative Section Progress Calculator
  // Returns 0 when section enters from bottom, 1 when comfortably in view,
  // clamped to [0, 1] so content stays rock-solid legible once revealed.
  function getSectionProgress(el, startFactor = 0.88, endFactor = 0.35) {
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const startY = winHeight * startFactor;
    const endY = winHeight * endFactor;
    if (rect.top >= startY) return 0;
    if (rect.top <= endY) return 1;
    return (startY - rect.top) / (startY - endY);
  }

  // DOM Elements cache
  let glow1, glow2, glow3, glow4;
  let typos = [];
  let heroSection;
  let s1Section, section1Text, section1Visual, section1Deco;
  let s2Section, section2Text, section2Visual, section2Deco, s2Cards = [];
  let s3Section, section3Text, section3Visual, section3Deco, s3Cards = [];
  let s4Section, section4Wrap, section4Compare;
  let s5Section, section5Text, section5Visual, section5Deco, s5Cards = [];
  let s6Section, section6Wrap;

  function initDOM() {
    const bgContainer = document.getElementById('fumeBackground');
    if (!bgContainer) return;

    // Cache Glows
    glow1 = document.querySelector('.glow-1');
    glow2 = document.querySelector('.glow-2');
    glow3 = document.querySelector('.glow-3');
    glow4 = document.querySelector('.glow-4');

    // Build Geometric Clusters
    const geoFrag = document.createDocumentFragment();
    geoItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'geo geo-cluster ' + item.type;
      div.style.top = item.top;
      div.style.left = item.left;
      div.style.width = item.width;
      div.style.height = item.height;
      div.style.opacity = item.opacity;
      div.style.setProperty('--geo-size', item.triangleSize);
      item.el = div;
      geoFrag.appendChild(div);
    });
    bgContainer.appendChild(geoFrag);

    // Build Stars
    const starFrag = document.createDocumentFragment();
    starItems.forEach(star => {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.top = star.top;
      s.style.left = star.left;
      star.el = s;
      starFrag.appendChild(s);
    });
    bgContainer.appendChild(starFrag);

    // Cache Typos
    for (let i = 1; i <= 8; i++) {
      const el = document.querySelector('.typo-' + i);
      if (el) typos.push(el);
    }

    // Cache Sections
    heroSection = document.querySelector('.hero-section');

    const s1 = document.getElementById('section-core');
    if (s1) {
      s1Section = s1;
      section1Text = s1.querySelector('.text-content');
      section1Visual = s1.querySelector('.visual-content');
      section1Deco = s1.querySelector('.feature-deco');
    }

    const s2 = document.getElementById('section-clean');
    if (s2) {
      s2Section = s2;
      section2Text = s2.querySelector('.text-content');
      section2Visual = s2.querySelector('.visual-content');
      section2Deco = s2.querySelector('.feature-deco');
      s2Cards = [s2.querySelector('.card-1'), s2.querySelector('.card-2'), s2.querySelector('.card-3')];
    }

    const s3 = document.getElementById('section-platform');
    if (s3) {
      s3Section = s3;
      section3Text = s3.querySelector('.text-content');
      section3Visual = s3.querySelector('.visual-content');
      section3Deco = s3.querySelector('.feature-deco');
      s3Cards = [s3.querySelector('.card-1'), s3.querySelector('.card-2'), s3.querySelector('.card-3')];
    }

    const s4 = document.getElementById('section-tun');
    if (s4) {
      s4Section = s4;
      section4Wrap = s4.querySelector('.feature-container-center');
      section4Compare = s4.querySelector('.theme-compare');
    }

    const s5 = document.getElementById('section-protocols');
    if (s5) {
      s5Section = s5;
      section5Text = s5.querySelector('.text-content');
      section5Visual = s5.querySelector('.visual-content');
      section5Deco = s5.querySelector('.feature-deco');
      s5Cards = [s5.querySelector('.card-1'), s5.querySelector('.card-2'), s5.querySelector('.card-3')];
    }

    const s6 = document.getElementById('section-cta');
    if (s6) {
      s6Section = s6;
      section6Wrap = s6.querySelector('.feature-container-center');
    }

    // Setup Compare Slider
    initCompareSlider();

    // Setup Preview Rotator
    initPreviewRotator();

    // Check for ?scroll= or ?section= query param for previewing/deep linking
    const urlParams = new URLSearchParams(window.location.search);
    const targetScroll = parseInt(urlParams.get('scroll'));
    const targetSection = urlParams.get('section');
    if (!isNaN(targetScroll)) {
      window.scrollTo(0, targetScroll);
      scrollY = targetScroll;
    } else if (targetSection) {
      const secEl = document.getElementById('section-' + targetSection) ||
                    document.querySelector('.' + targetSection) ||
                    document.querySelector(targetSection);
      if (secEl) {
        secEl.scrollIntoView({ behavior: 'instant', block: targetSection === 'footer' ? 'end' : 'center' });
        scrollY = window.scrollY || window.pageYOffset || 0;
      }
    }

    // Trigger initial render
    onResize();
    onScroll();
  }

  function initCompareSlider() {
    compareContainer = document.querySelector('.theme-compare');
    if (!compareContainer) return;

    compareDivider = compareContainer.querySelector('.theme-compare-divider');
    compareOverlay = compareContainer.querySelector('.theme-compare-overlay');

    function updateSlider(clientX) {
      if (!compareContainer) return;
      const rect = compareContainer.getBoundingClientRect();
      if (rect.width <= 0) return;
      const offset = clientX - rect.left;
      let ratio = (offset / rect.width) * 100;
      ratio = Math.max(0, Math.min(100, ratio));
      compareRatio = ratio;

      if (compareDivider) compareDivider.style.left = ratio + '%';
      if (compareOverlay) compareOverlay.style.clipPath = `inset(0 ${100 - ratio}% 0 0)`;
    }

    function onPointerDown(e) {
      isDraggingCompare = true;
      const x = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      if (x !== null) updateSlider(x);
    }

    function onPointerMove(e) {
      if (!isDraggingCompare) return;
      const x = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      if (x !== null) updateSlider(x);
    }

    function onPointerUp() {
      isDraggingCompare = false;
    }

    compareContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    compareContainer.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);
  }

  function initPreviewRotator() {
    const rotator = document.querySelector('.preview-rotator');
    if (!rotator) return;
    const slides = rotator.querySelectorAll('.preview-slide');
    if (slides.length <= 1) return;

    let activeIdx = 0;
    setInterval(() => {
      slides[activeIdx].classList.remove('active');
      activeIdx = (activeIdx + 1) % slides.length;
      slides[activeIdx].classList.add('active');
    }, 3200);
  }

  function onResize() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    winHeight = window.innerHeight || 1000;
  }

  let ticking = false;
  function onScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        renderFrame();
        ticking = false;
      });
      ticking = true;
    }
  }

  function renderFrame() {
    const sy = scrollY;

    // 1. Ambient Glow Orbs
    if (glow1) glow1.style.transform = `translateY(${sy * 0.38}px) translateX(${Math.sin(sy * 0.0028) * 90}px)`;
    if (glow2) glow2.style.transform = `translateY(${sy * 0.22}px) translateX(${Math.cos(sy * 0.0022) * 75}px)`;
    if (glow3) glow3.style.transform = `translateY(${sy * -0.28}px) translateX(${Math.sin(sy * 0.0014) * -60}px)`;
    if (glow4) glow4.style.transform = `translateY(${sy * 0.12}px)`;

    // 2. Geometric Clusters (28 items)
    for (let i = 0; i < geoItems.length; i++) {
      const g = geoItems[i];
      if (g.el) {
        const tx = sy * g.parallaxX;
        const ty = sy * g.parallaxY;
        const rot = sy * g.rotateSpeed;
        g.el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${g.scale})`;
      }
    }

    // 3. Twinkling Stars (56 items)
    for (let i = 0; i < starItems.length; i++) {
      const s = starItems[i];
      if (s.el) {
        const tx = sy * s.parallaxX;
        const ty = sy * s.parallaxY;
        const op = 0.08 + Math.abs(Math.sin(sy * 0.008 + s.phase)) * 0.35;
        s.el.style.transform = `translate(${tx}px, ${ty}px)`;
        s.el.style.opacity = op.toFixed(2);
      }
    }

    // 4. Kinetic Typography (8 items)
    if (typos[0]) typos[0].style.transform = `translateY(${sy * 0.22}px) translateX(${sy * 0.05}px)`;
    if (typos[1]) typos[1].style.transform = `translateY(${sy * 0.38}px) translateX(${sy * -0.05}px)`;
    if (typos[2]) typos[2].style.transform = `translateY(${sy * 0.16}px)`;
    if (typos[3]) typos[3].style.transform = `translateY(${sy * 0.32}px)`;
    if (typos[4]) typos[4].style.transform = `translateY(${sy * 0.12}px) translateX(${sy * -0.02}px)`;
    if (typos[5]) typos[5].style.transform = `translateY(${sy * 0.26}px) translateX(${sy * 0.03}px)`;
    if (typos[6]) typos[6].style.transform = `translateY(${sy * 0.08}px)`;
    if (typos[7]) typos[7].style.transform = `translateY(${sy * -0.03}px) translateX(${sy * 0.02}px)`;

    // 5. Hero Section
    if (heroSection) {
      const heroP = Math.min(1, Math.max(0, sy / (winHeight * 0.55)));
      heroSection.style.opacity = (1 - heroP).toFixed(3);
      heroSection.style.transform = `translateY(${sy * 0.3}px)`;
    }

    // 6. Section 1 (Core / Smart Routing)
    const p1 = getSectionProgress(s1Section, 0.88, 0.38);
    const p1v = getSectionProgress(s1Section, 0.82, 0.32);
    if (section1Text) {
      section1Text.style.opacity = p1.toFixed(3);
      section1Text.style.transform = `translateX(${((1 - p1) * -80).toFixed(1)}px)`;
    }
    if (section1Visual) {
      section1Visual.style.opacity = p1v.toFixed(3);
      section1Visual.style.transform = `translateX(${((1 - p1v) * 80).toFixed(1)}px) scale(${(0.85 + p1v * 0.15).toFixed(3)})`;
    }
    if (section1Deco) section1Deco.style.transform = `rotate(${sy * 0.1}deg)`;

    // 7. Section 2 (Clean / Stacked Cards)
    const p2 = getSectionProgress(s2Section, 0.90, 0.40);
    if (section2Text) {
      section2Text.style.opacity = p2.toFixed(3);
      section2Text.style.transform = `translateX(${((1 - p2) * 80).toFixed(1)}px)`;
    }
    if (section2Deco) section2Deco.style.transform = `rotate(${sy * -0.1}deg)`;

    const c1p = getSectionProgress(s2Section, 0.92, 0.46);
    const c2p = getSectionProgress(s2Section, 0.85, 0.38);
    const c3p = getSectionProgress(s2Section, 0.78, 0.30);
    if (s2Cards[0]) {
      s2Cards[0].style.opacity = c1p.toFixed(3);
      s2Cards[0].style.transform = `translateY(${((1 - c1p) * 80).toFixed(1)}px) rotate(${((c1p) * -6).toFixed(1)}deg)`;
    }
    if (s2Cards[1]) {
      s2Cards[1].style.opacity = c2p.toFixed(3);
      s2Cards[1].style.transform = `translate(${((1 - c2p) * 40).toFixed(1)}px, ${((1 - c2p) * 120).toFixed(1)}px) rotate(0deg)`;
    }
    if (s2Cards[2]) {
      s2Cards[2].style.opacity = c3p.toFixed(3);
      s2Cards[2].style.transform = `translate(${((1 - c3p) * 80).toFixed(1)}px, ${((1 - c3p) * 160).toFixed(1)}px) rotate(${((c3p) * 6).toFixed(1)}deg)`;
    }

    // 8. Section 3 (Platform / Stacked Cards)
    const p3 = getSectionProgress(s3Section, 0.90, 0.40);
    if (section3Text) {
      section3Text.style.opacity = p3.toFixed(3);
      section3Text.style.transform = `translateX(${((1 - p3) * -80).toFixed(1)}px)`;
    }
    if (section3Deco) section3Deco.style.transform = `rotate(${sy * 0.08}deg)`;

    const c31p = getSectionProgress(s3Section, 0.92, 0.46);
    const c32p = getSectionProgress(s3Section, 0.85, 0.38);
    const c33p = getSectionProgress(s3Section, 0.78, 0.30);
    if (s3Cards[0]) {
      s3Cards[0].style.opacity = c31p.toFixed(3);
      s3Cards[0].style.transform = `translateY(${((1 - c31p) * 80).toFixed(1)}px) rotate(${((c31p) * -6).toFixed(1)}deg)`;
    }
    if (s3Cards[1]) {
      s3Cards[1].style.opacity = c32p.toFixed(3);
      s3Cards[1].style.transform = `translate(${((1 - c32p) * 40).toFixed(1)}px, ${((1 - c32p) * 120).toFixed(1)}px) rotate(0deg)`;
    }
    if (s3Cards[2]) {
      s3Cards[2].style.opacity = c33p.toFixed(3);
      s3Cards[2].style.transform = `translate(${((1 - c33p) * 80).toFixed(1)}px, ${((1 - c33p) * 160).toFixed(1)}px) rotate(${((c33p) * 6).toFixed(1)}deg)`;
    }

    // 9. Section 4 (TUN Comparison Center)
    const p4 = getSectionProgress(s4Section, 0.90, 0.44);
    const p4c = getSectionProgress(s4Section, 0.84, 0.36);
    if (section4Wrap) {
      section4Wrap.style.opacity = p4.toFixed(3);
      section4Wrap.style.transform = `translateY(${((1 - p4) * 80).toFixed(1)}px)`;
    }
    if (section4Compare) {
      section4Compare.style.opacity = p4c.toFixed(3);
      section4Compare.style.transform = `translateY(${((1 - p4c) * 40).toFixed(1)}px) scale(${(0.92 + p4c * 0.08).toFixed(3)})`;
    }

    // 10. Section 5 (Protocols / Stacked Cards)
    const p5 = getSectionProgress(s5Section, 0.90, 0.40);
    if (section5Text) {
      section5Text.style.opacity = p5.toFixed(3);
      section5Text.style.transform = `translateX(${((1 - p5) * 80).toFixed(1)}px)`;
    }
    if (section5Deco) section5Deco.style.transform = `rotate(${sy * -0.1}deg)`;

    const c51p = getSectionProgress(s5Section, 0.92, 0.46);
    const c52p = getSectionProgress(s5Section, 0.85, 0.38);
    const c53p = getSectionProgress(s5Section, 0.78, 0.30);
    if (s5Cards[0]) {
      s5Cards[0].style.opacity = c51p.toFixed(3);
      s5Cards[0].style.transform = `translateY(${((1 - c51p) * 80).toFixed(1)}px) rotate(${((c51p) * -6).toFixed(1)}deg)`;
    }
    if (s5Cards[1]) {
      s5Cards[1].style.opacity = c52p.toFixed(3);
      s5Cards[1].style.transform = `translate(${((1 - c52p) * 40).toFixed(1)}px, ${((1 - c52p) * 120).toFixed(1)}px) rotate(0deg)`;
    }
    if (s5Cards[2]) {
      s5Cards[2].style.opacity = c53p.toFixed(3);
      s5Cards[2].style.transform = `translate(${((1 - c53p) * 80).toFixed(1)}px, ${((1 - c53p) * 160).toFixed(1)}px) rotate(${((c53p) * 6).toFixed(1)}deg)`;
    }

    // 11. Section 6 (Bottom CTA)
    const p6 = getSectionProgress(s6Section, 0.92, 0.48);
    if (section6Wrap) {
      section6Wrap.style.opacity = p6.toFixed(3);
      section6Wrap.style.transform = `translateY(${((1 - p6) * 60).toFixed(1)}px)`;
    }
  }

  // Bind Listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOM);
  } else {
    initDOM();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    onResize();
    onScroll();
  }, { passive: true });

})();
