/**
 * Smart OS Detection, Direct Release Asset Engine & Download Center Controller for Wmimo
 * Version: v1.3.5.1521
 * Supports dynamic i18n re-rendering, platform/arch filtering, and one-click SHA-256 copy
 */

(function() {
  'use strict';

  const RELEASE_TAG = 'v1.3.5.1521';
  const BASE_URL = `https://github.com/aimy1/Wmimo/releases/download/${RELEASE_TAG}`;

  // Standard Official SVG Brand Logos
  const SVG_ICONS = {
    Windows: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#00A4EF"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.802"/></svg>`,
    Linux: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#FCC624"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/></svg>`,
    Android: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#3DDC84"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1368 1.0989L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>`,
    macOS: `<svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.66 1.39-.56.65-.99 1.72-.88 2.76 1.02.08 2.05-.53 2.62-1.28z"/></svg>`
  };

  function getLang() {
    if (window.WmimoI18n && typeof window.WmimoI18n.getCurrentLang === 'function') {
      return window.WmimoI18n.getCurrentLang();
    }
    return document.documentElement.getAttribute('data-lang') || 'zh';
  }

  function detectOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.userAgentData?.platform || window.navigator.platform || '';

    if (/android/i.test(userAgent)) {
      return {
        os: 'Android',
        svg: SVG_ICONS.Android,
        pkgZh: 'ARM64 APK (主流手机推荐)',
        pkgEn: 'ARM64 APK (Recommended for most phones)',
        descZh: 'Android 8.0+ · VpnService 原生构建 · 支持分应用代理',
        descEn: 'Android 8.0+ · Native VpnService · Per-App Proxy Support',
        file: `Wmimo-Android-arm64-v8a-${RELEASE_TAG}.apk`,
        url: `${BASE_URL}/Wmimo-Android-arm64-v8a-${RELEASE_TAG}.apk`,
        ext: '.apk',
        size: '45.15 MB',
        sha: 'f1736f2fd958d8107f4616b11f236c9803b4dee55da9d3cd6650cb527dfbfc76',
        altUrl: `${BASE_URL}/Wmimo-Android-universal-${RELEASE_TAG}.apk`,
        altZh: '获取全架构通用版 (Universal APK)',
        altEn: 'Download Universal APK'
      };
    }

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return {
        os: 'iOS / iPadOS',
        svg: SVG_ICONS.macOS,
        pkgZh: 'Universal IPA (TrollStore / 巨魔 / 自签)',
        pkgEn: 'Universal IPA (TrollStore / Sideload)',
        descZh: 'iOS 15.0+ · NetworkExtension 架构 · 免越狱 TrollStore / 自签安装',
        descEn: 'iOS 15.0+ · NetworkExtension · TrollStore & Sideload Ready',
        file: `Wmimo-iOS-universal-${RELEASE_TAG}.ipa`,
        url: `${BASE_URL}/Wmimo-iOS-universal-${RELEASE_TAG}.ipa`,
        ext: '.ipa',
        size: '19.61 MB',
        sha: 'eb88639de14b004b6d05c7458d584efd0edbfc4553e58b058fffe9d4227ec325',
        altUrl: '#platform-ios',
        altZh: '查看 iOS 安装说明',
        altEn: 'View iOS Details'
      };
    }

    if (/Mac|MacIntel|Macintosh/i.test(userAgent) || /Mac/i.test(platform)) {
      return {
        os: 'macOS',
        svg: SVG_ICONS.macOS,
        pkgZh: 'Universal DMG (Apple Silicon & Intel)',
        pkgEn: 'Universal DMG (Apple Silicon & Intel)',
        descZh: 'macOS 12.0+ · Universal 双架构原生 · 支持状态栏速率与 utun 网卡',
        descEn: 'macOS 12.0+ · Universal Binary (M1–M4 & Intel) · Native utun Adapter',
        file: `Wmimo-macOS-universal-${RELEASE_TAG}.dmg`,
        url: `${BASE_URL}/Wmimo-macOS-universal-${RELEASE_TAG}.dmg`,
        ext: '.dmg',
        size: '89.20 MB',
        sha: '7121fe954ecb1bceb818cc4f645c285ce1406958994ebfdb9ad30a89190101f5',
        altUrl: `${BASE_URL}/Wmimo-macOS-universal-${RELEASE_TAG}.zip`,
        altZh: '获取免挂载归档包 (.zip)',
        altEn: 'Download App Archive (.zip)'
      };
    }

    if (/Linux/i.test(platform) || /Linux/i.test(userAgent)) {
      return {
        os: 'Linux',
        svg: SVG_ICONS.Linux,
        pkgZh: 'Debian / Ubuntu 安装包 (.deb)',
        pkgEn: 'Debian / Ubuntu Package (.deb)',
        descZh: 'Ubuntu / Debian / Mint (x64) · 原生系统托盘与 TUN 路由隔离',
        descEn: 'Ubuntu / Debian / Mint (x64) · Native System Tray & TUN Routing',
        file: `Wmimo-Linux-x64-${RELEASE_TAG}.deb`,
        url: `${BASE_URL}/Wmimo-Linux-x64-${RELEASE_TAG}.deb`,
        ext: '.deb',
        size: '37.71 MB',
        sha: '27298199bbd19a3d2cb7e9ff0cce28459e964d990102dc467a72b6ec85e80180',
        altUrl: `${BASE_URL}/Wmimo-Linux-x64-${RELEASE_TAG}.AppImage`,
        altZh: '获取通用单文件版 (.AppImage)',
        altEn: 'Download Portable (.AppImage)'
      };
    }

    // Default Windows x64
    return {
      os: 'Windows',
      svg: SVG_ICONS.Windows,
      pkgZh: 'Windows x64 安装程序 (.exe)',
      pkgEn: 'Windows x64 Installer (.exe)',
      descZh: 'Windows 10 / 11 (64-bit) · 标准安装程序 (.exe) · 内置 Wintun 驱动与静默更新',
      descEn: 'Windows 10 / 11 (64-bit) · Standard Installer (.exe) · Built-in Wintun & Auto-Update',
      file: `Wmimo-Windows-x64-Setup-${RELEASE_TAG}.exe`,
        url: `${BASE_URL}/Wmimo-Windows-x64-Setup-${RELEASE_TAG}.exe`,
        ext: '.exe',
        size: '36.79 MB',
        sha: '7b42a1bd63de248a70102cbbbc6c65d2e350e3c551b380936ae088c198de3596',
      altUrl: `${BASE_URL}/Wmimo-Windows-x64-${RELEASE_TAG}.zip`,
      altZh: '获取便携免安装版 (.zip)',
      altEn: 'Download Portable (.zip)'
    };
  }

  function applyOSDetection() {
    const detected = detectOS();
    const isEn = getLang() === 'en';
    const pkgText = isEn ? detected.pkgEn : detected.pkgZh;

    // Update Hero Download Button on Homepage
    const heroBtn = document.getElementById('heroDownloadBtn');
    const heroNote = document.getElementById('heroDownloadNote');
    if (heroBtn) {
      heroBtn.href = detected.url;
    }
    if (heroNote) {
      const prefix = isEn ? '⚡ Auto-detected: ' : '⚡ 自动适配当前系统：';
      heroNote.innerHTML = `<span>${prefix}<strong>${detected.os}</strong>（${pkgText}）</span>`;
    }

    // Update Smart OS Console on Download page
    const smartCard = document.getElementById('smartOsCard');
    if (smartCard) {
      const osIcon = smartCard.querySelector('.smart-os-icon');
      const osTitle = smartCard.querySelector('.smart-os-title');
      const osMeta = smartCard.querySelector('.smart-os-meta');
      const osBtn = smartCard.querySelector('.smart-os-btn');
      const altBtn = document.getElementById('smartOsAltBtn');
      const shaCode = document.getElementById('smartOsShaCode');
      const shaBtn = document.getElementById('smartOsShaBtn');

      if (osIcon) osIcon.innerHTML = detected.svg;
      if (osTitle) {
        osTitle.textContent = isEn
          ? `Recommended: Wmimo for ${detected.os}`
          : `推荐下载：Wmimo for ${detected.os}`;
      }
      if (osMeta) {
        osMeta.textContent = isEn ? detected.descEn : detected.descZh;
      }
      if (osBtn) {
        osBtn.href = detected.url;
        const btnDlText = isEn
          ? `Direct Download ${detected.ext} (${detected.size})`
          : `直接下载 ${detected.ext} (${detected.size})`;
        osBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> <span>${btnDlText}</span>`;
      }
      if (altBtn) {
        altBtn.href = detected.altUrl;
        altBtn.innerHTML = `<span>${isEn ? detected.altEn : detected.altZh}</span>`;
      }
      if (shaCode && detected.sha) {
        shaCode.textContent = `${detected.sha.slice(0, 16)}...${detected.sha.slice(-12)}`;
      }
      if (shaBtn && detected.sha) {
        shaBtn.setAttribute('data-sha', detected.sha);
      }
    }
  }

  // =========================================================================
  // DOWNLOAD PAGE INTERACTIVE FILTERS & CLIPBOARD HELPERS
  // =========================================================================
  function initDownloadCenterControls() {
    const stack = document.getElementById('dlPlatformsStack');
    if (!stack) return;

    const platTabs = document.querySelectorAll('.dl-plat-tab[data-plat-target]');
    const platSections = document.querySelectorAll('.dl-plat-section[data-plat]');
    const archBtns = document.querySelectorAll('.dl-arch-btn[data-arch-filter]');
    const linuxArchBtns = document.querySelectorAll('.dl-linux-arch-btn[data-linux-arch]');
    const linuxGrid = document.getElementById('linuxPkgGrid');

    let activePlat = 'all';
    let activeArch = 'all';

    function applyFilters() {
      platSections.forEach(sec => {
        const platName = sec.getAttribute('data-plat');
        const matchesPlat = activePlat === 'all' || platName === activePlat;

        // Filter cards inside section by architecture
        const cards = sec.querySelectorAll('.dl-pkg-card');
        let visibleCards = 0;
        cards.forEach(card => {
          const cardArch = card.getAttribute('data-arch') || 'all';
          const matchesArch = activeArch === 'all' || cardArch === activeArch || cardArch === 'universal';
          card.hidden = !matchesArch;
          if (matchesArch) visibleCards++;
        });

        sec.hidden = !(matchesPlat && visibleCards > 0);
      });
    }

    platTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        activePlat = tab.getAttribute('data-plat-target') || 'all';
        platTabs.forEach(t => t.classList.toggle('is-active', t === tab));
        applyFilters();
      });
    });

    archBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeArch = btn.getAttribute('data-arch-filter') || 'all';
        archBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        // Also sync Linux local arch pills if applicable
        linuxArchBtns.forEach(lb => {
          lb.classList.toggle('is-active', lb.getAttribute('data-linux-arch') === (activeArch === 'universal' ? 'all' : activeArch));
        });
        applyFilters();
      });
    });

    // Dedicated Linux x64 / ARM64 switcher inside Linux section header
    if (linuxGrid && linuxArchBtns.length) {
      linuxArchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetLinuxArch = btn.getAttribute('data-linux-arch') || 'all';
          linuxArchBtns.forEach(b => b.classList.toggle('is-active', b === btn));
          linuxGrid.querySelectorAll('.dl-pkg-card').forEach(card => {
            const cArch = card.getAttribute('data-arch');
            card.hidden = !(targetLinuxArch === 'all' || cArch === targetLinuxArch);
          });
        });
      });
    }

    // Check URL hash on load (e.g., #platform-windows, #platform-macos, etc.)
    function checkUrlHash() {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#platform-')) {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            targetEl.classList.add('is-highlighted');
            setTimeout(() => targetEl.classList.remove('is-highlighted'), 2200);
          }, 120);
        }
      }
    }
    checkUrlHash();
    window.addEventListener('hashchange', checkUrlHash);

    // One-click SHA-256 copy buttons
    document.querySelectorAll('.copy-sha-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sha = btn.getAttribute('data-sha');
        if (!sha) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(sha).catch(() => {});
        }
        const isEn = getLang() === 'en';
        const msg = isEn
          ? `Copied SHA-256: ${sha.slice(0, 12)}...`
          : `已复制 SHA-256 校验值: ${sha.slice(0, 12)}...`;
        if (typeof window.showToast === 'function') {
          window.showToast(msg, 'success');
        }
      });
    });

    // One-click terminal command copy buttons
    document.querySelectorAll('.copy-cmd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (!cmd) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(cmd).catch(() => {});
        }
        const isEn = getLang() === 'en';
        const msg = isEn ? 'Terminal command copied to clipboard' : '终端指令已复制到剪贴板';
        if (typeof window.showToast === 'function') {
          window.showToast(msg, 'success');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyOSDetection();
    initDownloadCenterControls();
  });
  window.addEventListener('wmimo-lang-change', applyOSDetection);
})();
