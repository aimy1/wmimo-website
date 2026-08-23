/**
 * Wmimo Official Website - Lightweight Client-Side i18n Engine
 * Supports Simplified Chinese (zh) and English (en) with zero-FOUC state persistence
 */

(function() {
  const STORAGE_KEY = 'wmimo_lang';

  // Comprehensive Bilingual Dictionary
  const translations = {
    zh: {
      // Navigation
      'nav.home': '首页',
      'nav.download': '下载',
      'nav.download_center': '下载中心',
      'nav.docs': '使用文档',
      'nav.about': '关于与赞助',
      'nav.github': 'GitHub 仓库',
      'nav.theme_toggle': '切换主题',
      'nav.lang_toggle': 'Switch to English',
      'nav.lang_code': 'EN',
      'nav.mobile_lang': 'English / 简体中文',
      'nav.menu': '菜单',
      'nav.download_app': '下载客户端',

      // Hero Section (Home)
      'hero.tag': '🚀 Wmimo v1.0.33 正式发布',
      'hero.title_pre': '极速、优雅、强大的',
      'hero.title_grad': '跨平台网络代理客户端',
      'hero.subtitle': '基于 Flutter 与 Mihomo 核心打造。提供全协议网络支持、TUN 虚拟网卡系统级接管、全功能系统托盘与 18px 微卡片设计美学。',
      'hero.btn_download': '下载客户端',
      'hero.btn_docs': '快速上手',
      'hero.meta_auto_detect': '⚡ 自动适配当前系统：',
      'hero.meta_fallback': '主流桌面与移动端操作系统适配',

      // Feature Cards (Home)
      'feat.core_title': '⚡ 高性能 Mihomo 核心',
      'feat.core_desc': '深度整合 Meta 协议栈，全面支持 Hysteria 2、TUIC、VLESS Reality 等新一代低延迟协议。多核并发高吞吐，超低内存开销。',
      'feat.tun_title': '🛡️ TUN 虚拟网卡底层接管',
      'feat.tun_desc': '在系统底层创建虚拟网卡驱动，接管全局流量。完美支持命令行、游戏客户端与各类原生应用，内置 Fake-IP 防 DNS 污染。',
      'feat.tray_title': '🔀 全功能系统托盘',
      'feat.tray_desc': '常驻系统托盘动态展示上下行实时网速，右键菜单一键切换分流模式（Rule/Global/Direct）、一键测速与复制终端代理指令。',
      'feat.ui_title': '🎨 现代化 18px 微卡片设计',
      'feat.ui_desc': '遵循统一的天青蓝品牌设计语言，18px 经典圆角微卡片体系。原生支持浅色与深空暗黑双主题无缝秒切，100% 覆盖 9 种语言。',

      // Contact Section (Home)
      'contact.title': '📬 交流反馈与联系开发者',
      'contact.desc': '如果您在使用中发现 Bug、有新功能提案或商务交流，欢迎随时通过邮件联系。',
      'contact.btn_copy': '复制邮箱',
      'contact.copied': '联系邮箱已复制',

      // Footer
      'footer.brand_desc': '基于 Flutter 与 Mihomo 核心打造的现代化跨平台全协议网络代理客户端。',
      'footer.nav_title': '页面导航',
      'footer.support_title': '联系与支持',
      'footer.copyright': '© 2026 Wmimo Project. Open source under GPL-3.0 License.',

      // Download Page
      'dl.hero_title': '下载 Wmimo 客户端',
      'dl.hero_subtitle': '为 Windows、Linux 和 Android 平台量身打造的官方正式发行版本。轻巧稳定，原生适配。',
      'dl.badge_latest': '最新正式版 v1.0.33',
      'dl.smart_rec_title': '推荐下载：Wmimo for {os}',
      'dl.smart_rec_meta': '{pkg} · 架构: x64/arm64 · 官方构建产物',
      'dl.smart_rec_btn': '直接下载 {ext}',
      'dl.win_title': 'Windows 平台',
      'dl.win_sub': '原生支持 Windows 10 / 11 系统的 x64 架构与高通骁龙 ARM64 架构',
      'dl.win_badge': '4 个软件包 · x64 / ARM64',
      'dl.linux_title': 'Linux 各大发行版',
      'dl.linux_sub': '已为 Debian、Ubuntu、Fedora、RHEL、openSUSE、Arch Linux 及通用发行版打包',
      'dl.linux_badge': '4 个软件包 · 全发行版适配',
      'dl.android_title': 'Android 移动端',
      'dl.android_sub': '为 64 位旗舰手机、32 位老旧电视盒子、模拟器平板提供量身定制的独立 APK',
      'dl.android_badge': '4 个安装包 · 全 CPU 架构',
      'dl.direct_download': '直链下载',
      'dl.guide_title': '💡 如何选择正确的安装包格式？',
      'dl.guide_win_title': 'Windows 用户',
      'dl.guide_win_desc': '推荐首选 <strong>.exe 标准安装程序</strong>（内置开机自启、快捷方式与静默更新）；若无管理员权限或希望随身携带，可下载 <strong>.zip 便携绿色包</strong> 解压即用。',
      'dl.guide_linux_title': 'Linux 用户',
      'dl.guide_linux_desc': 'Ubuntu / Debian 系请下载 <strong>.deb</strong>；Arch 系使用 <strong>.pkg.tar.zst</strong>；Fedora / RHEL / openSUSE 用户选择 <strong>.rpm</strong>；其他发行版可直接使用 <strong>.tar.gz</strong> 解压运行。',
      'dl.guide_android_title': 'Android 用户',
      'dl.guide_android_desc': '99% 近年主流手机请直接选择 <strong>arm64-v8a</strong>；若不确定手机处理器或为老旧电视盒子，可下载 <strong>Universal 通用包</strong>。',
      'dl.sha_title': '🔒 软件包 SHA-256 校验说明',
      'dl.sha_desc': '为了确保下载文件的完整性与安全性，建议在安装前核对哈希值：',
      'dl.sha_copied': '校验指令已复制',

      // Community & Sponsor Page
      'community.hero_title': '关于与赞助支持',
      'community.hero_subtitle': 'Wmimo 遵循开源协议分发，感谢社区中的每一位贡献者与支持者',
      'community.sponsor_title': '💖 赞助与支持',
      'community.sponsor_desc': '如果 Wmimo 帮助到了你，欢迎请作者喝杯咖啡，支持项目的持续维护与多平台适配。',
      'community.crypto_currency': '币种：<code>USDT</code> | 网络：<code>APTOS</code>',
      'community.btn_copy_addr': '复制地址',
      'community.addr_copied': '已复制收款地址',
      'community.dev_email_label': '📬 开发者联系邮箱：',
      'community.btn_send_email': '发送邮件',
      'community.thanks_title': '🙏 致谢名单',
      'community.thanks_1_title': '🌟 GooRingX (vowe)',
      'community.thanks_1_desc': '杰出的开源贡献、设计思路与灵感指导。',
      'community.thanks_2_title': '🚀 MetaCubeX (Mihomo)',
      'community.thanks_2_desc': '提供顶级高性能、全协议通用的通用代理核心。',
      'community.thanks_3_title': '💙 Flutter 团队与社区',
      'community.thanks_3_desc': '跨平台 UI 框架支持。',
      'community.license_title': '开源许可证',
      'community.license_desc': '本项目基于 <strong>GPL-3.0</strong> 开源许可证分发与使用。',
      'community.btn_view_license': '查看 LICENSE 文本',

      // Docs Center (Common)
      'docs.search_placeholder': '搜索文档章节...',
      'docs.search_empty': '无匹配文档章节',
      'docs.group_quickstart': '快速起步',
      'docs.item_quickstart': '快速上手指南',
      'docs.group_core': '核心功能与配置',
      'docs.item_modes': '出站与分流模式',
      'docs.item_tun': 'TUN 虚拟网卡',
      'docs.item_dns': 'DNS 与 Fake-IP 防污染',
      'docs.item_rules': '高级规则与进程分流',
      'docs.item_protocols': '新一代协议与 NAT',
      'docs.item_sniffer': '域名与协议嗅探器 (Sniffer)',
      'docs.item_groups': '策略组调度与自动容灾',
      'docs.item_lan': '局域网共享与游戏主机代理',
      'docs.item_dashboard': '外部控制器与 Web 仪表盘',
      'docs.group_ecosystem': '生态与常见问题',
      'docs.item_clients': '客户端生态导航',
      'docs.item_faq': '常见问题排查 (FAQ)',
      'docs.item_build': '从源码本地编译',
      'docs.pag_prev': '上一篇',
      'docs.pag_next': '下一篇',

      // Toast & Modals & Helpers
      'toast.copied': '已成功复制到剪贴板',
      'toast.code_copied': '代码已复制',
      'toast.theme_dark': '已切换至深色主题',
      'toast.theme_light': '已切换至浅色主题',
      'toast.lang_switched': '已切换为中文',
      'modal.notice_title': '服务维护与更新提示',
      'modal.notice_greeting': '尊敬的用户：',
      'modal.notice_p1': '受近期主服务器维护影响，客户端内置的<strong>在线更新通道暂时无法提供服务</strong>。',
      'modal.notice_highlight': '🚀 获取最新构建版本（v1.0.33）及各平台安装包，还请直接前往 <strong>GitHub Releases</strong> 官方页面下载。',
      'modal.notice_footer_note': '* 服务恢复后将第一时间恢复应用内静默升级通道，给您带来的不便敬请谅解。',
      'modal.dont_show_7d': '7天内不再提示',
      'modal.btn_ack': '我已知晓',
      'modal.btn_github': '前往 GitHub 下载',
      'btn.back_to_top': '回到顶部'
    },

    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.download': 'Download',
      'nav.download_center': 'Downloads',
      'nav.docs': 'Documentation',
      'nav.about': 'About & Sponsor',
      'nav.github': 'GitHub Repo',
      'nav.theme_toggle': 'Toggle Theme',
      'nav.lang_toggle': '切换为中文',
      'nav.lang_code': '中',
      'nav.mobile_lang': '简体中文 / English',
      'nav.menu': 'Menu',
      'nav.download_app': 'Download App',

      // Hero Section (Home)
      'hero.tag': '🚀 Wmimo v1.0.33 Released',
      'hero.title_pre': 'Fast, Elegant, Powerful',
      'hero.title_grad': 'Cross-Platform Proxy Client',
      'hero.subtitle': 'Crafted with Flutter & Mihomo Core. Features full-protocol networking, system-level TUN virtual NIC take-over, full-featured system tray, and clean 18px micro-card aesthetics.',
      'hero.btn_download': 'Download Client',
      'hero.btn_docs': 'Quick Start',
      'hero.meta_auto_detect': '⚡ Auto-detected System: ',
      'hero.meta_fallback': 'Built for desktop and mobile operating systems',

      // Feature Cards (Home)
      'feat.core_title': '⚡ Mihomo Core Inside',
      'feat.core_desc': 'Deeply integrated with Meta protocol stack, supporting Hysteria 2, TUIC, VLESS Reality and next-gen low-latency protocols with minimal memory footprint.',
      'feat.tun_title': '🛡️ Low-level TUN Mode',
      'feat.tun_desc': 'Creates a virtual network adapter at the OS level to capture global traffic seamlessly. Supports terminal CLI, games, and native apps with built-in Fake-IP.',
      'feat.tray_title': '🔀 Full-Featured Tray',
      'feat.tray_desc': 'Real-time network speed display in taskbar tray. Instant right-click menu to switch routing modes (Rule/Global/Direct), benchmark latency, and copy proxy commands.',
      'feat.ui_title': '🎨 Modern 18px System',
      'feat.ui_desc': 'Refined cyan brand design language with consistent 18px rounded micro-cards. Seamless switching between Light and Deep Obsidian Dark themes.',

      // Contact Section (Home)
      'contact.title': '📬 Feedback & Developer Contact',
      'contact.desc': 'Have bug reports, feature suggestions, or business inquiries? Feel free to reach out via email anytime.',
      'contact.btn_copy': 'Copy Email',
      'contact.copied': 'Email address copied to clipboard',

      // Footer
      'footer.brand_desc': 'A modern, cross-platform, full-protocol network proxy client built with Flutter and Mihomo core.',
      'footer.nav_title': 'Navigation',
      'footer.support_title': 'Contact & Support',
      'footer.copyright': '© 2026 Wmimo Project. Open source under GPL-3.0 License.',

      // Download Page
      'dl.hero_title': 'Download Wmimo Client',
      'dl.hero_subtitle': 'Official production release binaries tailored for Windows, Linux, and Android. Lightweight, secure, and native.',
      'dl.badge_latest': 'Latest Stable Release v1.0.33',
      'dl.smart_rec_title': 'Recommended Download: Wmimo for {os}',
      'dl.smart_rec_meta': '{pkg} · Architecture: x64/arm64 · Official Release',
      'dl.smart_rec_btn': 'Download {ext}',
      'dl.win_title': 'Windows Platform',
      'dl.win_sub': 'Native support for Windows 10 / 11 x64 and Snapdragon ARM64 architectures',
      'dl.win_badge': '4 Packages · x64 / ARM64',
      'dl.linux_title': 'Linux Distributions',
      'dl.linux_sub': 'Packaged for Debian, Ubuntu, Fedora, RHEL, openSUSE, Arch Linux, and generic distributions',
      'dl.linux_badge': '4 Packages · All Distros',
      'dl.android_title': 'Android Mobile',
      'dl.android_sub': 'Dedicated standalone APKs tailored for 64-bit flagships, legacy 32-bit TV boxes, and emulators',
      'dl.android_badge': '4 Packages · All CPU Architectures',
      'dl.direct_download': 'Direct Download',
      'dl.guide_title': '💡 How to choose the right package format?',
      'dl.guide_win_title': 'Windows Users',
      'dl.guide_win_desc': 'We recommend the <strong>.exe Standard Installer</strong> (includes auto-start, shortcuts, and background updates); or download the <strong>.zip Portable Package</strong> for portable non-admin use.',
      'dl.guide_linux_title': 'Linux Users',
      'dl.guide_linux_desc': 'Use <strong>.deb</strong> for Ubuntu/Debian; <strong>.pkg.tar.zst</strong> for Arch; <strong>.rpm</strong> for Fedora/RHEL/openSUSE; and <strong>.tar.gz</strong> for generic portable execution.',
      'dl.guide_android_title': 'Android Users',
      'dl.guide_android_desc': '99% of modern smartphones should choose <strong>arm64-v8a</strong>. If you are unsure of your processor or using an older TV box, download the <strong>Universal APK</strong>.',
      'dl.sha_title': '🔒 Package SHA-256 Checksum Guide',
      'dl.sha_desc': 'To verify file integrity and authenticity, verify the SHA-256 checksum before running:',
      'dl.sha_copied': 'Verification command copied',

      // Community & Sponsor Page
      'community.hero_title': 'About & Sponsorship',
      'community.hero_subtitle': 'Wmimo is distributed under open-source license. Thanks to every contributor and supporter in the community.',
      'community.sponsor_title': '💖 Support & Sponsorship',
      'community.sponsor_desc': 'If Wmimo helped you, feel free to buy the author a coffee to support ongoing maintenance and cross-platform enhancements.',
      'community.crypto_currency': 'Currency: <code>USDT</code> | Network: <code>APTOS</code>',
      'community.btn_copy_addr': 'Copy Address',
      'community.addr_copied': 'Payment address copied',
      'community.dev_email_label': '📬 Developer Contact Email: ',
      'community.btn_send_email': 'Send Email',
      'community.thanks_title': '🙏 Acknowledgements',
      'community.thanks_1_title': '🌟 GooRingX (vowe)',
      'community.thanks_1_desc': 'Outstanding open-source contributions, design ideas, and inspirational guidance.',
      'community.thanks_2_title': '🚀 MetaCubeX (Mihomo)',
      'community.thanks_2_desc': 'Top-tier high-performance universal proxy core supporting modern protocols.',
      'community.thanks_3_title': '💙 Flutter Team & Community',
      'community.thanks_3_desc': 'Cross-platform UI framework and ecosystem support.',
      'community.license_title': 'Open Source License',
      'community.license_desc': 'This project is distributed and licensed under the <strong>GPL-3.0</strong> license.',
      'community.btn_view_license': 'View LICENSE Text',

      // Docs Center (Common)
      'docs.search_placeholder': 'Search documentation sections...',
      'docs.search_empty': 'No matching documentation sections',
      'docs.group_quickstart': 'Getting Started',
      'docs.item_quickstart': 'Quick Start Guide',
      'docs.group_core': 'Core Features & Config',
      'docs.item_modes': 'Outbound & Routing Modes',
      'docs.item_tun': 'TUN Virtual Adapter',
      'docs.item_dns': 'DNS & Fake-IP Resolution',
      'docs.item_rules': 'Advanced Rules & Process Routing',
      'docs.item_protocols': 'Next-Gen Protocols & NAT',
      'docs.item_sniffer': 'Sniffer & Domain Sniffing',
      'docs.item_groups': 'Proxy Groups & Failover',
      'docs.item_lan': 'LAN Sharing & Console Proxy',
      'docs.item_dashboard': 'External Controller & Web Dashboard',
      'docs.group_ecosystem': 'Ecosystem & FAQs',
      'docs.item_clients': 'Client Ecosystem Navigation',
      'docs.item_faq': 'Troubleshooting & FAQ',
      'docs.item_build': 'Build from Source',
      'docs.pag_prev': 'Previous',
      'docs.pag_next': 'Next',

      // Toast & Modals & Helpers
      'toast.copied': 'Copied to clipboard successfully',
      'toast.code_copied': 'Code copied to clipboard',
      'toast.theme_dark': 'Switched to Dark Theme',
      'toast.theme_light': 'Switched to Light Theme',
      'toast.lang_switched': 'Switched to English',
      'modal.notice_title': 'Service Notice & Update Advisory',
      'modal.notice_greeting': 'Dear Users:',
      'modal.notice_p1': 'Due to recent server maintenance, the in-app <strong>online update channel is temporarily unavailable</strong>.',
      'modal.notice_highlight': '🚀 To obtain the latest release (v1.0.33) and platform packages, please download directly from official <strong>GitHub Releases</strong>.',
      'modal.notice_footer_note': '* In-app silent updates will be restored immediately once server migration finishes.',
      'modal.dont_show_7d': "Don't show again for 7 days",
      'modal.btn_ack': 'Got It',
      'modal.btn_github': 'Go to GitHub Releases',
      'btn.back_to_top': 'Back to Top'
    }
  };

  /**
   * Determine current active language
   */
  function getCurrentLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') return stored;
    } catch (e) {}

    // Auto detect from browser preference
    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.toLowerCase().startsWith('zh')) {
        return 'zh';
      }
    }
    return 'zh'; // Default to Simplified Chinese
  }

  /**
   * Translate key with fallback
   */
  function t(key, lang) {
    const l = lang || getCurrentLang();
    const dict = translations[l] || translations.zh;
    return dict[key] || (translations.zh && translations.zh[key]) || key;
  }

  /**
   * Apply translations to all matching DOM elements
   */
  function applyTranslations(lang) {
    const l = lang || getCurrentLang();
    document.documentElement.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    document.documentElement.setAttribute('data-lang', l);

    // 1. Text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = t(key, l);
      }
    });

    // 2. HTML elements
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) {
        el.innerHTML = t(key, l);
      }
    });

    // 3. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', t(key, l));
      }
    });

    // 4. Titles / Tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', t(key, l));
      }
    });

    // 5. Aria Labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        el.setAttribute('aria-label', t(key, l));
      }
    });

    // Update language toggle button UI
    updateLangToggleUI(l);

    // Dispatch global event for other components (e.g. os-detector)
    window.dispatchEvent(new CustomEvent('wmimo-lang-change', { detail: { lang: l } }));
  }

  /**
   * Update the visual state of language toggle buttons
   */
  function updateLangToggleUI(lang) {
    const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
    langToggleBtns.forEach(btn => {
      const codeLabel = btn.querySelector('.lang-code-label');
      if (codeLabel) {
        codeLabel.textContent = lang === 'zh' ? 'EN' : '中';
      }
      btn.setAttribute('title', lang === 'zh' ? 'Switch to English' : '切换为简体中文');
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为简体中文');
    });

    const mobileLangBtns = document.querySelectorAll('.mobile-lang-btn');
    mobileLangBtns.forEach(btn => {
      const textSpan = btn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = lang === 'zh' ? 'English' : '简体中文';
      }
    });
  }

  /**
   * Change current language and persist to localStorage
   */
  function setLanguage(lang, notify = true) {
    const targetLang = lang === 'en' ? 'en' : 'zh';
    try {
      localStorage.setItem(STORAGE_KEY, targetLang);
    } catch (e) {}

    applyTranslations(targetLang);

    if (notify && typeof window.showToast === 'function') {
      window.showToast(t('toast.lang_switched', targetLang), 'success');
    }
  }

  /**
   * Toggle between zh and en
   */
  function toggleLanguage() {
    const current = getCurrentLang();
    const next = current === 'zh' ? 'en' : 'zh';
    setLanguage(next, true);
  }

  /**
   * Initialize language switcher event listeners
   */
  function initLanguage() {
    const currentLang = getCurrentLang();
    applyTranslations(currentLang);

    // Header Language Toggle Buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });

    // Mobile Drawer Language Toggle Buttons
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });
  }

  // Expose global API
  window.WmimoI18n = {
    getCurrentLang,
    setLanguage,
    toggleLanguage,
    t,
    applyTranslations,
    initLanguage
  };

  // Auto initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }
})();
