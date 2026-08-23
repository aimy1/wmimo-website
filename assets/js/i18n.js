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

      // Community & Sponsor Page (Indie Dev Energy Station)
      'community.hero_badge': '☕ 独立开发者的咖啡能量站',
      'community.hero_title': '用一杯咖啡，为开源创新注入无限动力',
      'community.hero_subtitle': 'Wmimo 始终坚持 100% 自由开源、零商业广告与全平台免费。您的每一份赞助与鼓励，都将直接用于服务器运行、多架构设备适配与持续功能迭代。',
      'community.dialogue_name': '开发者心声 · 点击互动',
      'community.btn_poke': '💡 换一句',
      'community.sponsor_title': '💖 加密货币赞助通道',
      'community.sponsor_desc': '如果 Wmimo 提升了您的网络与工作效率，欢迎请作者喝杯咖啡，支持项目的长期健康发展。',
      'community.crypto_currency': '<span>币种：<code>USDT</code></span> <span>·</span> <span>网络：<code>APTOS</code> (极低手续费)</span>',
      'community.btn_copy_addr': '复制地址',
      'community.addr_copied': '收款地址已复制到剪贴板，非常感谢您的支持！',
      'community.dev_email_label': '📬 开发者联系邮箱：',
      'community.btn_send_email': '发送邮件',
      'community.tiers_title': '☕ 赞助档位与支持方向',
      'community.tier1_name': '单份浓缩 (Espresso)',
      'community.tier1_price': '约 1.5 USDT',
      'community.tier1_buff1': '⚡ 助力 1 次紧急 Bug 修复与代码重构',
      'community.tier1_buff2': '🛠️ 维持日常工单响应与社区维护',
      'community.tier1_quote': '“一滴浓缩咖啡因，点亮深夜的代码灵感。”',
      'community.tier2_name': '特调拿铁 (Craft Latte)',
      'community.tier2_price': '约 3.0 USDT',
      'community.tier2_buff1': '🚀 覆盖多平台 CI/CD 自动化构建开销',
      'community.tier2_buff2': '✨ 加速新功能与协议特性研发排期',
      'community.tier2_quote': '“充足的热量与动力，为全平台稳定打包护航。”',
      'community.tier3_name': '烘焙能量包 (Pastry Pack)',
      'community.tier3_price': '约 10.0 USDT',
      'community.tier3_buff1': '💖 支持核心底层优化与测试真机购置',
      'community.tier3_buff2': '🌟 赞助者长期感谢与心愿功能优先评估',
      'community.tier3_quote': '“感谢每一位同行者，让优质开源工具走得更远。”',
      'community.qa_title': '💡 赞助说明与开源承诺',
      'community.q1_title': '赞助会包含特权或区别对待吗？',
      'community.q1_ans': '不会。Wmimo 坚持 100% 自由开源，所有核心功能、性能与更新对全球所有用户完全开放和平等。',
      'community.q2_title': '为什么优先采用 Aptos 网络 USDT？',
      'community.q2_ans': 'Aptos 链上单笔转账手续费低至 $0.0001，几近于零损耗，能让您的赞助资金 100% 真正到达开发者手中。',
      'community.q3_title': '不进行赞助同样可以正常使用吗？',
      'community.q3_ans': '当然可以！开源的初衷就是分享与互助。在 GitHub 为项目点亮一颗 🌟 Star 或向朋友推荐，同样是对我们极大的支持！',
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

      // Docs Article Content Translations
      'doc_qs.title': "快速上手指南",
      'doc_qs.subtitle': "只需 3 步，即可在 1 分钟内完成 Wmimo 的配置并畅享极速网络体验。",
      'doc_qs.steps_title': "🚀 3 步快速配置流程",
      'doc_qs.step1_title': "下载并安装客户端",
      'doc_qs.step1_desc': "前往 <a href=\"../download.html\">下载中心</a> 获取适配您操作系统的最新安装包（Windows 安装包 `.exe` / Linux `.AppImage` / Android APK）。",
      'doc_qs.step2_title': "导入订阅配置",
      'doc_qs.step2_desc': "打开 Wmimo 侧边栏进入 <strong>“配置管理”</strong>，点击右上角加号 <code>+</code>，选择 <strong>“从 URL 导入”</strong> 并粘贴您的订阅链接。",
      'doc_qs.step3_title': "选择节点并开启代理",
      'doc_qs.step3_desc': "在 <strong>“代理节点”</strong> 列表中选择心仪的节点，回到仪表盘点击 <strong>“启动代理”</strong> 或开启系统代理即可。",
      'doc_qs.import_methods_title': "📥 支持的配置导入方式",
      'doc_qs.import_url': "<strong>URL 订阅导入</strong>：支持标准的 Clash / Mihomo 订阅链接，支持设置后台定时自动刷新；",
      'doc_qs.import_qr': "<strong>二维码扫描</strong>：支持摄像头扫描二维码或从剪贴板图片识别；",
      'doc_qs.import_local': "<strong>本地文件导入</strong>：直接导入本地已有的 <code>.yaml</code> 配置文件；",
      'doc_qs.import_patch': "<strong>配置补丁 (Profile Patch)</strong>：在不改动原订阅的前提下，追加自定义的分流规则与 DNS 策略。",
      'doc_qs.next_title': "出站与分流模式 →",
      'doc_modes.title': "出站与分流模式详解",
      'doc_modes.subtitle': "了解 Wmimo 的三种核心出站模式以及如何根据需求灵活切换。",
      'doc_modes.h2_modes': "⚙️ 三大出站模式",
      'doc_modes.th_name': "模式名称",
      'doc_modes.th_mechanism': "工作机制",
      'doc_modes.th_scenario': "适用场景",
      'doc_modes.rule_name': "规则分流 (Rule)",
      'doc_modes.rule_desc': "根据内置规则库智能分流：国内域名/IP 直连，海外请求经由代理转发",
      'doc_modes.rule_scene': "日常主力使用（强烈推荐）",
      'doc_modes.global_name': "全局代理 (Global)",
      'doc_modes.global_desc': "所有非局域网流量均强制通过用户选定的单一节点发出",
      'doc_modes.global_scene': "特定海外网络调试或排障",
      'doc_modes.direct_name': "直接连接 (Direct)",
      'doc_modes.direct_desc': "所有流量直接走本地物理网卡发出，不经由任何代理服务器",
      'doc_modes.direct_scene': "访问纯国内服务或临时停用代理",
      'doc_modes.h2_speed': "⚡ 节点测速与智能选路",
      'doc_modes.speed_p': "在 <strong>“代理节点”</strong> 列表中，点击右上角 <strong>“一键测速”</strong> 按钮可对当前策略组内的所有节点进行并发延迟测试。",
      'doc_modes.tag_green': "<strong>绿色标签 (< 80ms)</strong>：低延迟优质节点；",
      'doc_modes.tag_yellow': "<strong>黄色标签 (80ms ~ 180ms)</strong>：中等延迟正常节点；",
      'doc_modes.tag_red': "<strong>红色标签 (> 180ms 或 Timeout)</strong>：高延迟或不可用节点。",
      'doc_modes.prev_title': "← 快速上手指南",
      'doc_modes.next_title': "TUN 虚拟网卡 →",
      'doc_tun.title': "TUN 虚拟网卡模式配置",
      'doc_tun.subtitle': "了解 TUN 虚拟网卡的工作原理以及在各操作系统下的权限配置要求。",
      'doc_tun.h2_overview': "🛡️ TUN 模式概述",
      'doc_tun.overview_desc': "传统系统代理仅能接管支持 HTTP/Socks5 协议的浏览器应用，而 <strong>TUN 模式</strong> 在操作系统底层创建虚拟网络设备（L3 Virtual Network Device），接管全系统的 IP 层数据包。",
      'doc_tun.bullet_apps': "<strong>全应用支持</strong>：无缝支持命令行工具（git, curl, docker）、游戏客户端与系统级服务；",
      'doc_tun.bullet_dns': "<strong>智能防污染</strong>：内置 Fake-IP / Redir-Host DNS 引擎，彻底解决 DNS 污染；",
      'doc_tun.bullet_lan': "<strong>局域网直连</strong>：自动绕过局域网 IP 与国内白名单，不影响本地网络设备互访。",
      'doc_tun.h2_win': "🪟 Windows 配置",
      'doc_tun.win_desc': "在 Wmimo 设置中直接开启 <strong>“TUN 虚拟网卡模式”</strong> 开关。当系统弹出 UAC 提权提示时，点击“是”允许加载 Wintun 驱动即可。",
      'doc_tun.h2_linux': "🐧 Linux 权限设置",
      'doc_tun.linux_desc': "在 Linux 下，TUN 虚拟网卡创建需要 <code>CAP_NET_ADMIN</code> 权限。您可以通过终端执行以下指令完成提权：",
      'doc_tun.h2_android': "📱 Android 移动端",
      'doc_tun.android_desc': "Android 系统由系统级 <strong>VpnService</strong> 原生驱动，首次连接时在弹出的系统 VPN 授权提示中点击“确定”即可。",
      'doc_tun.prev_title': "← 出站与分流模式",
      'doc_tun.next_title': "DNS 与 Fake-IP →",
      'doc_dns.title': "DNS 配置与 Fake-IP 防污染解析最佳实践",
      'doc_dns.subtitle': "深入解析 Wmimo 默认采用的 Fake-IP 增强模式机制与国内直连分流配置。",
      'doc_dns.h2_why': "⚡ 为什么优先推荐 Fake-IP 模式？",
      'doc_dns.why_desc': "传统的 <code>redir-host</code> 模式必须先在本地发起远程 DNS 查询，不仅存在 50~200ms 的额外等待，未加密的 DNS 还极易被旁路节点篡改或记录。",
      'doc_dns.callout_title': "🚀 Fake-IP 工作原理：",
      'doc_dns.callout_body': "当应用发起域名请求时，Wmimo 内置 DNS 立即在本地从预留池（如 <code>198.18.0.0/16</code>）返回一个虚拟 IP（耗时 < 1ms）。当应用向该 IP 发起连接时，Wmimo 拦截并还原原始域名，由远端代理节点直接在本地完成目标域名的真实解析，<strong>彻底杜绝本地 DNS 污染与 DNS 泄露</strong>。",
      'doc_dns.h2_config': "🛠️ 标准双向防污染 DNS 配置示例",
      'doc_dns.h2_table': "📋 关键配置字段说明",
      'doc_dns.th_field': "字段参数",
      'doc_dns.th_desc': "说明与推荐配置",
      'doc_dns.f_enhanced_desc': "DNS 增强模式，推荐设置为 <code>fake-ip</code>。",
      'doc_dns.f_range_desc': "虚拟保留 IP 网段，默认 <code>198.18.0.1/16</code>。",
      'doc_dns.f_policy_desc': "基于 GeoSite 标签的分流解析：国内域名走国内 DNS，海外域名走加密 DoH。",
      'doc_dns.f_filter_desc': "排除列表，保证局域网服务与 NTP 时间服务能够拿到真实物理 IP。",
      'doc_dns.prev_title': "← TUN 虚拟网卡",
      'doc_dns.next_title': "高级规则与进程分流 →",
      'doc_rules.title': "高级路由规则与进程级分流配置指南",
      'doc_rules.subtitle': "掌握 Mihomo 规则语法，实现针对游戏、通讯软件与域名的精准出站分流。",
      'doc_rules.h2_principles': "🎯 规则匹配原则",
      'doc_rules.principle_topdown': "<strong>自上而下匹配</strong>：一旦某一条规则命中，核心立即将流量分配到指定策略组并停止向下匹配；",
      'doc_rules.principle_match': "<strong>兜底策略 (MATCH)</strong>：写在规则列表最底部，捕获所有未被前方显式规则捕获的剩余流量。",
      'doc_rules.h2_process': "🎮 实战：针对应用进程名称分流 (PROCESS-NAME)",
      'doc_rules.process_desc': "无需搜集应用复杂的 CDN 域名或 IP 段，直接按桌面可执行程序名称（<code>.exe</code> / Linux 进程名）精准分流：",
      'doc_rules.h2_table': "🧩 常用规则类型速查",
      'doc_rules.th_keyword': "规则关键字",
      'doc_rules.th_example': "语法示例",
      'doc_rules.th_desc': "说明",
      'doc_rules.r_suffix_desc': "匹配主域名及其所有二级、三级子域名。",
      'doc_rules.r_keyword_desc': "只要域名包含该关键字即命中。",
      'doc_rules.r_geosite_desc': "基于 GeoSite 预打包域名列表。",
      'doc_rules.r_geoip_desc': "根据目标 IP 地理归属分流。",
      'doc_rules.r_logic_desc': "多条件复合逻辑运算。",
      'doc_rules.prev_title': "← DNS 与 Fake-IP",
      'doc_rules.next_title': "新一代协议与 NAT →",
      'doc_proto.title': "新一代网络协议与 Full Cone NAT 指南",
      'doc_proto.subtitle': "详解 Hysteria 2、TUIC v5、VLESS Reality 协议优势及游戏全锥型 NAT 优化。",
      'doc_proto.h2_compare': "⚡ 新一代协议横向对比",
      'doc_proto.th_name': "协议名称",
      'doc_proto.th_transport': "传输机制",
      'doc_proto.th_advantage': "核心优势",
      'doc_proto.th_scenario': "最佳场景",
      'doc_proto.hy2_trans': "基于 UDP (QUIC Brutal)",
      'doc_proto.hy2_adv': "突破 TCP 丢包退避限制，自动拥塞感知，晚高峰带宽压榨",
      'doc_proto.hy2_scene': "跨国高丢包、恶劣弱网、大文件高速下载",
      'doc_proto.tuic_trans': "基于 UDP (0-RTT QUIC)",
      'doc_proto.tuic_adv': "握手延迟极低，连接复用性能优异",
      'doc_proto.tuic_scene': "移动端多基站频繁切换、网页高频冲浪",
      'doc_proto.vless_trans': "基于 TCP/TLS",
      'doc_proto.vless_adv': "消除自签名证书特征，直接借用目标权威站点 TLS 证书",
      'doc_proto.vless_scene': "严苛封锁环境、长期稳定办公",
      'doc_proto.h2_nat': "🎮 Full Cone NAT（全锥型 NAT）游戏联机优化",
      'doc_proto.nat_p1': "在开启 Wmimo 的 TUN 虚拟网卡模式进行外服主机与 PC 联机游戏时，NAT 类型直接决定了能否顺利与队友建立 P2P 直连。",
      'doc_proto.nat_callout_title': "为什么需要 Full Cone NAT？",
      'doc_proto.nat_callout_body': "普通的对称型 NAT（Symmetric NAT / Type D）会为每个连接分配不同的公网端口，导致游戏内无法直连。开启 <code>endpoint-independent-nat: true</code> 后，公网映射端口保持恒定，游戏内 NAT 类型可自动提升至 <strong>Open (Type A)</strong>。",
      'doc_proto.prev_title': "← 高级规则与进程分流",
      'doc_proto.next_title': "域名与协议嗅探器 →",
      'doc_sniff.title': "域名与协议嗅探器 (Sniffer) 实战指南",
      'doc_sniff.subtitle': "从 TLS SNI、HTTP 与 QUIC 首包中自动提取真实目标域名，解决纯 IP 流量无法命中分流规则的问题。",
      'doc_sniff.h2_how': "🔍 嗅探器工作原理",
      'doc_sniff.how_desc': "部分移动应用或游戏在联网时直接向目标 IP 发起请求，导致域名分流规则失效。Sniffer 能在 TCP/UDP 握手阶段截获首包，解析真实域名并<strong>重新触发规则匹配</strong>。",
      'doc_sniff.h2_config': "🛠️ 标准嗅探器配置示例",
      'doc_sniff.prev_title': "← 新一代协议与 NAT",
      'doc_sniff.next_title': "策略组调度与自动容灾 →",
      'doc_grp.title': "策略组实战：延迟优选、自动容灾与负载均衡",
      'doc_grp.subtitle': "掌握 Proxy Groups 调度逻辑，实现最低延迟节点自动选择与节点故障无感切换。",
      'doc_grp.h2_types': "🔀 常用策略组类型横向对比",
      'doc_grp.th_type': "策略组类型",
      'doc_grp.th_algo': "调度算法",
      'doc_grp.th_mech': "核心机制",
      'doc_grp.th_scene': "最佳场景",
      'doc_grp.t_select_algo': "手动指定",
      'doc_grp.t_select_mech': "用户在界面手动点选出口节点",
      'doc_grp.t_select_scene': "日常主力地区选择",
      'doc_grp.t_urltest_algo': "延迟优选",
      'doc_grp.t_urltest_mech': "后台定时发起真实测速，自动切到最低延迟节点",
      'doc_grp.t_urltest_scene': "网页高速冲浪",
      'doc_grp.t_fallback_algo': "故障容灾",
      'doc_grp.t_fallback_mech': "始终使用第一可用节点，断连时顺位自动切换",
      'doc_grp.t_fallback_scene': "远程办公、挂机程序",
      'doc_grp.t_lb_algo': "负载均衡",
      'doc_grp.t_lb_mech': "一致性哈希或轮询并发分流",
      'doc_grp.t_lb_scene': "大文件多线程高速下载",
      'doc_grp.h2_yaml': "🛠️ 标准策略组 YAML 配置示例",
      'doc_grp.prev_title': "← 域名与协议嗅探器",
      'doc_grp.next_title': "局域网共享与主机代理 →",
      'doc_lan.title': "局域网共享与 Switch / PS5 / 智能电视代理指南",
      'doc_lan.subtitle': "将运行 Wmimo 的电脑或手机作为局域网代理网关，免客户端为家庭多设备加速。",
      'doc_lan.h2_step1': "🚀 步骤一：开启局域网共享",
      'doc_lan.h2_step2': "🎮 步骤二：主机与电视配置代理",
      'doc_lan.switch_desc': "<strong>Nintendo Switch</strong>：进入「互联网设置」-> 选择当前 WiFi ->「更改设置」-> 启用「代理服务器」，输入运行 Wmimo 电脑的 IP 与端口 <code>7890</code>；",
      'doc_lan.ps5_desc': "<strong>PS5 / Xbox</strong>：进入「网络设定」->「进阶设定」->「Proxy 服务器」，填入 IP 与端口 <code>7890</code>；",
      'doc_lan.tv_desc': "<strong>Apple TV / 智能电视</strong>：在 WiFi 详细信息中配置 HTTP 代理为「手动」。",
      'doc_lan.prev_title': "← 策略组调度与自动容灾",
      'doc_lan.next_title': "外部控制器与 Web 仪表盘 →",
      'doc_dash.title': "外部控制器与 Web 仪表盘 (Dashboard) 对接",
      'doc_dash.subtitle': "开放 RESTful API，对接 MetaCubeXD、YACD 与 Zashboard 实现实时连接追踪与监控。",
      'doc_dash.h2_enable': "⚙️ 开启 External Controller",
      'doc_dash.h2_web': "🖥️ 推荐主流 Web 仪表盘",
      'doc_dash.meta_desc': "<strong>MetaCubeXD（官方推荐）</strong>：<code>https://metacubex.github.io/metacubexd/</code> - 深度支持 Mihomo 特性。",
      'doc_dash.yacd_desc': "<strong>YACD Dashboard</strong>：<code>https://yacd.haishan.me/</code> - 经典易用。",
      'doc_dash.zash_desc': "<strong>Zashboard</strong>：<code>https://zashboard.pages.dev/</code> - 极简现代化毛玻璃界面。",
      'doc_dash.prev_title': "← 局域网共享与主机代理",
      'doc_dash.next_title': "客户端生态导航 →",
      'doc_cli.title': "Clash / Mihomo 客户端生态导航",
      'doc_cli.subtitle': "汇总主流的 Clash 与 Mihomo 客户端生态项目，方便您查找与对比选型。",
      'doc_cli.callout_tip': "<strong>⚠️ 温馨提示：</strong> 已停更的客户端通常不再维护内核，无法兼容 Hysteria 2、TUIC、VLESS Reality 等新协议，建议迁移至活跃维护、更安全美观的新客户端。",
      'doc_cli.h2_table': "📊 Clash / Mihomo 客户端汇总表",
      'doc_cli.th_client': "客户端",
      'doc_cli.th_status': "状态",
      'doc_cli.th_repo': "仓库 / 链接",
      'doc_cli.prev_title': "← 外部控制器与 Web 仪表盘",
      'doc_cli.next_title': "常见问题排查 (FAQ) →",
      'doc_faq.title': "常见问题排查 (FAQ)",
      'doc_faq.subtitle': "收集了用户在使用 Wmimo 过程中最常见的问题与解决方案。",
      'doc_faq.q1_title': "1. 导入订阅时提示连接超时？",
      'doc_faq.q1_desc': "• 检查订阅链接是否能够通过本地浏览器直接下载；<br>• 确认当前运营商 DNS 是否能够解析订阅服务器域名；<br>• 可尝试在设置中配置自定义 DNS（如 <code>223.5.5.5</code> / <code>119.29.29.29</code>）后重试。",
      'doc_faq.q2_title': "2. 开启 TUN 模式后无法打开网页？",
      'doc_faq.q2_desc': "• 检查是否与其他 VPN 或虚拟网卡工具（如其他代理客户端）同时运行产生了路由冲突；<br>• 退出其他代理工具，在 Wmimo 中关闭 TUN 并重新开启一次；<br>• 检查防火墙是否拦截了 <code>wmimo-core</code> 进程的网络出站请求。",
      'doc_faq.q3_title': "3. Linux AppImage 无法在 Ubuntu 24.04 运行？",
      'doc_faq.q3_desc': "Ubuntu 24.04 默认不再附带旧版 libfuse2 库。通过终端安装即可正常运行：",
      'doc_faq.q4_title': "4. 订阅更新后节点没有刷新？",
      'doc_faq.q4_desc': "进入 <strong>“配置管理”</strong>，点击对应订阅配置右侧的刷新图标手动触发一次全量拉取。",
      'doc_faq.prev_title': "← 客户端生态导航",
      'doc_faq.next_title': "从源码本地编译 →",
      'doc_bld.title': "从源码本地编译构建",
      'doc_bld.subtitle': "本文档指导开发者配置本地开发环境并从源码编译 Wmimo 各平台客户端产物。",
      'doc_bld.h2_env': "🛠️ 环境要求",
      'doc_bld.env_win': "<strong>Windows</strong>: Visual Studio 2022 C++ 桌面开发工作负载",
      'doc_bld.env_linux': "<strong>Linux</strong>: <code>gtk3</code>, <code>clang</code>, <code>cmake</code>, <code>ninja-build</code>",
      'doc_bld.h2_quickstart': "⚡ 快速开始",
      'doc_bld.h2_release': "📦 编译 Release 版本",
      'doc_bld.release_p': "针对不同目标平台，运行对应构建命令：",
      'doc_bld.prev_title': "← 常见问题排查 (FAQ)",

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

      // Community & Sponsor Page (Indie Dev Energy Station)
      'community.hero_badge': '☕ Indie Developer\'s Coffee Station',
      'community.hero_title': 'Fuel Open-Source Innovation with a Cup of Coffee',
      'community.hero_subtitle': 'Wmimo is committed to 100% free open-source, zero ads, and multi-platform accessibility. Your support directly funds server bandwidth, test devices, and late-night development.',
      'community.dialogue_name': 'Developer Voice · Click to Interact',
      'community.btn_poke': '💡 Refresh',
      'community.sponsor_title': '💖 Crypto Sponsorship Channel',
      'community.sponsor_desc': 'If Wmimo has improved your workflow and connectivity, consider buying the author a coffee to support long-term open-source maintenance.',
      'community.crypto_currency': '<span>Token: <code>USDT</code></span> <span>·</span> <span>Network: <code>APTOS</code> (Near-zero fees)</span>',
      'community.btn_copy_addr': 'Copy Address',
      'community.addr_copied': 'Address copied to clipboard. Thank you so much for your support!',
      'community.dev_email_label': '📬 Developer Email: ',
      'community.btn_send_email': 'Send Email',
      'community.tiers_title': '☕ Sponsorship Tiers & Impact',
      'community.tier1_name': 'Single Espresso',
      'community.tier1_price': '≈ 1.5 USDT',
      'community.tier1_buff1': '⚡ Powers an urgent bug fix & code refactor',
      'community.tier1_buff2': '🛠️ Keeps daily issue triage & community support active',
      'community.tier1_quote': '"A shot of caffeine sparking late-night coding breakthroughs."',
      'community.tier2_name': 'Craft Latte',
      'community.tier2_price': '≈ 3.0 USDT',
      'community.tier2_buff1': '🚀 Funds multi-platform CI/CD build pipelines',
      'community.tier2_buff2': '✨ Accelerates roadmap for new features & protocol support',
      'community.tier2_quote': '"Sustained energy powering stable releases across all OSes."',
      'community.tier3_name': 'Pastry Energy Pack',
      'community.tier3_price': '≈ 10.0 USDT',
      'community.tier3_buff1': '💖 Supports low-level optimization & physical test devices',
      'community.tier3_buff2': '🌟 Permanent gratitude & priority wishlist review',
      'community.tier3_quote': '"Thank you to every companion making open-source sustainable."',
      'community.qa_title': '💡 Open-Source Commitment & FAQ',
      'community.q1_title': 'Are there any locked features or VIP privileges?',
      'community.q1_ans': 'No. Wmimo is 100% free and open-source. All features, protocols, and performance updates are accessible equally to everyone.',
      'community.q2_title': 'Why USDT on Aptos Network?',
      'community.q2_ans': 'Aptos on-chain transfer fees are less than $0.0001 (virtually zero loss), ensuring 100% of your generous gift reaches development directly.',
      'community.q3_title': 'Can I use Wmimo completely for free without donating?',
      'community.q3_ans': 'Absolutely! Open-source is all about sharing. Starring the project on 🌟 GitHub or sharing it with friends is already tremendous support!',
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

      // Docs Article Content Translations
      'doc_qs.title': "Quick Start Guide",
      'doc_qs.subtitle': "Get Wmimo up and running with network proxy in under 1 minute with 3 easy steps.",
      'doc_qs.steps_title': "🚀 3-Step Quick Configuration",
      'doc_qs.step1_title': "Download & Install Client",
      'doc_qs.step1_desc': "Head over to the <a href=\"../download.html\">Download Center</a> to grab the official package for your OS (Windows .exe / Linux .deb / Android APK).",
      'doc_qs.step2_title': "Import Subscription Profile",
      'doc_qs.step2_desc': "Open Wmimo, navigate to <strong>Profile Management</strong> in the sidebar, click the plus icon <code>+</code>, select <strong>Import from URL</strong> and paste your subscription link.",
      'doc_qs.step3_title': "Select Node & Enable Proxy",
      'doc_qs.step3_desc': "Choose your preferred node in the <strong>Proxy Nodes</strong> tab, then switch to Overview and toggle on <strong>Start Proxy</strong> or System Proxy.",
      'doc_qs.import_methods_title': "📥 Supported Profile Import Methods",
      'doc_qs.import_url': "<strong>URL Subscription Import</strong>: Full support for standard Clash / Mihomo subscription links with configurable background auto-refresh;",
      'doc_qs.import_qr': "<strong>QR Code Scanning</strong>: Scan QR codes directly with your camera or recognize codes from clipboard images;",
      'doc_qs.import_local': "<strong>Local File Import</strong>: Import existing local <code>.yaml</code> configuration files instantly;",
      'doc_qs.import_patch': "<strong>Profile Patch</strong>: Append custom routing rules and DNS policies without altering upstream subscription profiles.",
      'doc_qs.next_title': "Outbound & Routing Modes →",
      'doc_modes.title': "Outbound & Routing Modes Guide",
      'doc_modes.subtitle': "Understand the three core outbound modes in Wmimo and switch between them effortlessly.",
      'doc_modes.h2_modes': "⚙️ Three Core Outbound Modes",
      'doc_modes.th_name': "Mode Name",
      'doc_modes.th_mechanism': "Mechanism",
      'doc_modes.th_scenario': "Best Scenario",
      'doc_modes.rule_name': "Rule Routing (Rule)",
      'doc_modes.rule_desc': "Smart routing based on rules: Domestic traffic connects directly, foreign traffic routes through proxies.",
      'doc_modes.rule_scene': "Everyday primary use (Highly Recommended)",
      'doc_modes.global_name': "Global Proxy (Global)",
      'doc_modes.global_desc': "All non-LAN traffic is forcefully routed through a single selected proxy node.",
      'doc_modes.global_scene': "Foreign network debugging or troubleshooting",
      'doc_modes.direct_name': "Direct Connection (Direct)",
      'doc_modes.direct_desc': "All traffic connects directly through local physical network without passing any proxy.",
      'doc_modes.direct_scene': "Accessing local services or temporarily disabling proxy",
      'doc_modes.h2_speed': "⚡ Latency Benchmark & Smart Routing",
      'doc_modes.speed_p': "In the <strong>Proxy Nodes</strong> view, click <strong>Benchmark Latency</strong> to run concurrent latency tests across all nodes in the active group.",
      'doc_modes.tag_green': "<strong>Green Tag (< 80ms)</strong>: Low-latency premium node;",
      'doc_modes.tag_yellow': "<strong>Yellow Tag (80ms ~ 180ms)</strong>: Medium latency standard node;",
      'doc_modes.tag_red': "<strong>Red Tag (> 180ms or Timeout)</strong>: High latency or unreachable node.",
      'doc_modes.prev_title': "← Quick Start Guide",
      'doc_modes.next_title': "TUN Virtual NIC →",
      'doc_tun.title': "TUN Virtual Network Adapter Mode",
      'doc_tun.subtitle': "Learn how TUN mode captures system-level traffic and setup required OS permissions.",
      'doc_tun.h2_overview': "🛡️ TUN Mode Overview",
      'doc_tun.overview_desc': "Traditional system proxies only handle HTTP/Socks5 browser traffic, while <strong>TUN Mode</strong> creates an L3 Virtual Network Adapter to capture all IP packets system-wide.",
      'doc_tun.bullet_apps': "<strong>Global App Support</strong>: Seamlessly proxies CLI tools (git, curl, docker), game launchers, and system background services;",
      'doc_tun.bullet_dns': "<strong>Anti-Pollution DNS</strong>: Built-in Fake-IP / Redir-Host engine to eliminate DNS pollution and DNS leaks completely;",
      'doc_tun.bullet_lan': "<strong>LAN Passthrough</strong>: Automatically bypasses local subnet IPs and domestic whitelists without interrupting local device discovery.",
      'doc_tun.h2_win': "🪟 Windows Configuration",
      'doc_tun.win_desc': "Simply toggle on <strong>TUN Virtual NIC Mode</strong> in Wmimo settings. Click Yes when the UAC prompt appears to allow loading the Wintun driver.",
      'doc_tun.h2_linux': "🐧 Linux Permissions Setup",
      'doc_tun.linux_desc': "Under Linux, creating a TUN network device requires <code>CAP_NET_ADMIN</code> capability. Run the following command in terminal:",
      'doc_tun.h2_android': "📱 Android Mobile",
      'doc_tun.android_desc': "On Android, TUN is driven by the native <strong>VpnService</strong>. Simply grant VPN permissions when the system dialog appears.",
      'doc_tun.prev_title': "← Outbound & Routing Modes",
      'doc_tun.next_title': "DNS & Fake-IP →",
      'doc_dns.title': "DNS & Fake-IP Anti-Pollution Best Practices",
      'doc_dns.subtitle': "Deep dive into the Fake-IP enhanced mode mechanism and domestic direct split DNS routing in Wmimo.",
      'doc_dns.h2_why': "⚡ Why Fake-IP is Recommended",
      'doc_dns.why_desc': "Traditional <code>redir-host</code> mode must perform remote DNS lookups before connecting, adding 50-200ms of latency while exposing unencrypted queries to ISP inspection.",
      'doc_dns.callout_title': "🚀 How Fake-IP Works:",
      'doc_dns.callout_body': "When an app queries a domain, Wmimo instantly returns a synthetic IP from a reserved pool (e.g. <code>198.18.0.0/16</code>) in < 1ms. When the connection starts, Wmimo resolves the original domain on the remote proxy node, <strong>completely eliminating DNS leaks and local poisoning</strong>.",
      'doc_dns.h2_config': "🛠️ Standard Anti-Pollution DNS Configuration Example",
      'doc_dns.h2_table': "📋 Key Configuration Fields",
      'doc_dns.th_field': "Parameter Field",
      'doc_dns.th_desc': "Description & Recommendation",
      'doc_dns.f_enhanced_desc': "Enhanced DNS mode, recommended to set to <code>fake-ip</code>.",
      'doc_dns.f_range_desc': "Reserved virtual IP CIDR pool, defaults to <code>198.18.0.1/16</code>.",
      'doc_dns.f_policy_desc': "GeoSite-based split resolution: Domestic domains use local DNS, foreign domains use encrypted DoH.",
      'doc_dns.f_filter_desc': "Exclusion whitelist ensuring local LAN and NTP time services receive real IPs.",
      'doc_dns.prev_title': "← TUN Virtual NIC",
      'doc_dns.next_title': "Advanced Rules & Process Routing →",
      'doc_rules.title': "Advanced Routing Rules & Process-Level Routing Guide",
      'doc_rules.subtitle': "Master Mihomo rule syntax for pinpoint outbound traffic dispatching across games, messaging apps, and domains.",
      'doc_rules.h2_principles': "🎯 Rule Matching Principles",
      'doc_rules.principle_topdown': "<strong>Top-Down Matching</strong>: When a rule matches, traffic is immediately dispatched to the target group and evaluation stops;",
      'doc_rules.principle_match': "<strong>Catch-All Policy (MATCH)</strong>: Placed at the bottom of the ruleset to handle all unmatched traffic.",
      'doc_rules.h2_process': "🎮 Practical: Process-Name Based Routing (PROCESS-NAME)",
      'doc_rules.process_desc': "No need to scrape complex CDN domains or IP blocks—dispatch traffic directly by executable process name (<code>.exe</code> / Linux binary name):",
      'doc_rules.h2_table': "🧩 Common Rule Types Cheat Sheet",
      'doc_rules.th_keyword': "Rule Keyword",
      'doc_rules.th_example': "Syntax Example",
      'doc_rules.th_desc': "Description",
      'doc_rules.r_suffix_desc': "Matches the root domain and all its subdomains.",
      'doc_rules.r_keyword_desc': "Matches whenever the domain contains the specified substring.",
      'doc_rules.r_geosite_desc': "Matches against pre-compiled GeoSite domain lists.",
      'doc_rules.r_geoip_desc': "Routes based on target IP geographical country code.",
      'doc_rules.r_logic_desc': "Multi-conditional composite boolean logic.",
      'doc_rules.prev_title': "← DNS & Fake-IP",
      'doc_rules.next_title': "Next-Gen Protocols & NAT →",
      'doc_proto.title': "Next-Gen Network Protocols & Full Cone NAT Guide",
      'doc_proto.subtitle': "Detailed comparison of Hysteria 2, TUIC v5, VLESS Reality, and Full Cone NAT gaming optimizations.",
      'doc_proto.h2_compare': "⚡ Next-Gen Protocol Comparison",
      'doc_proto.th_name': "Protocol Name",
      'doc_proto.th_transport': "Transport Mechanism",
      'doc_proto.th_advantage': "Core Advantages",
      'doc_proto.th_scenario': "Best Scenario",
      'doc_proto.hy2_trans': "UDP-based (QUIC Brutal)",
      'doc_proto.hy2_adv': "Bypasses TCP backoff penalties, aggressive congestion sensing, peak-hour bandwidth saturation",
      'doc_proto.hy2_scene': "High packet loss routes, weak networks, high-speed large downloads",
      'doc_proto.tuic_trans': "UDP-based (0-RTT QUIC)",
      'doc_proto.tuic_adv': "Ultra-low 0-RTT handshake latency, superior connection multiplexing",
      'doc_proto.tuic_scene': "Frequent mobile cell handovers, high-frequency web browsing",
      'doc_proto.vless_trans': "TCP/TLS-based",
      'doc_proto.vless_adv': "Eliminates self-signed certificate fingerprints by borrowing authority TLS certs",
      'doc_proto.vless_scene': "Strict firewall environments, long-term stable office workflows",
      'doc_proto.h2_nat': "🎮 Full Cone NAT Gaming Optimization",
      'doc_proto.nat_p1': "When playing online games via TUN mode on foreign servers, your NAT type determines whether you can form direct P2P connections with party members.",
      'doc_proto.nat_callout_title': "Why Full Cone NAT is Essential:",
      'doc_proto.nat_callout_body': "Standard Symmetric NAT (Type D) assigns different ports for every outbound connection, breaking P2P multiplayer. Enabling <code>endpoint-independent-nat: true</code> keeps public ports constant, elevating your in-game NAT type to <strong>Open (Type A)</strong>.",
      'doc_proto.prev_title': "← Advanced Rules & Process Routing",
      'doc_proto.next_title': "Domain & Protocol Sniffer →",
      'doc_sniff.title': "Domain & Protocol Sniffer Guide",
      'doc_sniff.subtitle': "Extract real target domain names from TLS SNI, HTTP, and QUIC handshakes to route raw IP requests accurately.",
      'doc_sniff.h2_how': "🔍 How Sniffer Works",
      'doc_sniff.how_desc': "Certain mobile apps and games initiate requests directly to IP addresses, bypassing domain rules. Sniffer intercepts initial handshake packets to extract genuine hostnames and <strong>re-evaluate routing rules</strong>.",
      'doc_sniff.h2_config': "🛠️ Standard Sniffer Configuration Example",
      'doc_sniff.prev_title': "← Next-Gen Protocols & NAT",
      'doc_sniff.next_title': "Proxy Groups & Failover →",
      'doc_grp.title': "Proxy Groups: Auto-Failover & Load Balancing",
      'doc_grp.subtitle': "Master Proxy Groups scheduling logic for automatic lowest-latency selection and seamless failover.",
      'doc_grp.h2_types': "🔀 Common Proxy Group Types Comparison",
      'doc_grp.th_type': "Group Type",
      'doc_grp.th_algo': "Algorithm",
      'doc_grp.th_mech': "Mechanism",
      'doc_grp.th_scene': "Best Scenario",
      'doc_grp.t_select_algo': "Manual Selection",
      'doc_grp.t_select_mech': "User manually clicks the desired outbound node in UI",
      'doc_grp.t_select_scene': "Everyday regional node selection",
      'doc_grp.t_urltest_algo': "Lowest Latency",
      'doc_grp.t_urltest_mech': "Periodically pings test endpoints to automatically switch to the fastest node",
      'doc_grp.t_urltest_scene': "High-speed web browsing",
      'doc_grp.t_fallback_algo': "Health Fallback",
      'doc_grp.t_fallback_mech': "Always uses the first available node, automatically failing over down the list",
      'doc_grp.t_fallback_scene': "Remote work, persistent daemons, uninterrupted streams",
      'doc_grp.t_lb_algo': "Load Balance",
      'doc_grp.t_lb_mech': "Consistent hashing or round-robin multi-path load balancing",
      'doc_grp.t_lb_scene': "Multi-threaded large file downloads",
      'doc_grp.h2_yaml': "🛠️ Standard Proxy Groups YAML Configuration",
      'doc_grp.prev_title': "← Domain & Protocol Sniffer",
      'doc_grp.next_title': "LAN Sharing & Console Proxy →",
      'doc_lan.title': "LAN Sharing & Console / Smart TV Proxy Guide",
      'doc_lan.subtitle': "Turn your PC or phone running Wmimo into a local network gateway to proxy consoles and TVs clientlessly.",
      'doc_lan.h2_step1': "🚀 Step 1: Enable LAN Sharing",
      'doc_lan.h2_step2': "🎮 Step 2: Configure Proxy on Consoles & TVs",
      'doc_lan.switch_desc': "<strong>Nintendo Switch</strong>: Go to Internet Settings -> Current Wi-Fi -> Change Settings -> Enable Proxy Server -> Enter Wmimo PC's IP and port <code>7890</code>;",
      'doc_lan.ps5_desc': "<strong>PS5 / Xbox</strong>: Navigate to Network Settings -> Advanced Settings -> Proxy Server -> Enter Wmimo PC's IP and port <code>7890</code>;",
      'doc_lan.tv_desc': "<strong>Apple TV / Smart TVs</strong>: In Wi-Fi details, set HTTP Proxy to Manual and enter your PC IP and port.",
      'doc_lan.prev_title': "← Proxy Groups & Failover",
      'doc_lan.next_title': "External Controller & Web Dashboard →",
      'doc_dash.title': "External Controller & Web Dashboard Guide",
      'doc_dash.subtitle': "Expose RESTful APIs to connect MetaCubeXD, YACD, and Zashboard for real-time connection tracking.",
      'doc_dash.h2_enable': "⚙️ Enable External Controller",
      'doc_dash.h2_web': "🖥️ Recommended Web Dashboards",
      'doc_dash.meta_desc': "<strong>MetaCubeXD (Recommended)</strong>: <code>https://metacubex.github.io/metacubexd/</code> - Full Mihomo feature support.",
      'doc_dash.yacd_desc': "<strong>YACD Dashboard</strong>: <code>https://yacd.haishan.me/</code> - Classic and user-friendly.",
      'doc_dash.zash_desc': "<strong>Zashboard</strong>: <code>https://zashboard.pages.dev/</code> - Modern sleek glassmorphism interface.",
      'doc_dash.prev_title': "← LAN Sharing & Console Proxy",
      'doc_dash.next_title': "Client Ecosystem Navigation →",
      'doc_cli.title': "Clash / Mihomo Client Ecosystem Navigation",
      'doc_cli.subtitle': "Comprehensive directory of active and classic Clash/Mihomo clients for cross-platform comparison.",
      'doc_cli.callout_tip': "<strong>⚠️ Friendly Reminder:</strong> Deprecated clients no longer receive kernel updates and cannot support Hysteria 2, TUIC, or Reality. We recommend migrating to actively maintained clients.",
      'doc_cli.h2_table': "📊 Clash / Mihomo Clients Summary Table",
      'doc_cli.th_client': "Client",
      'doc_cli.th_status': "Status",
      'doc_cli.th_repo': "Repository / Link",
      'doc_cli.prev_title': "← External Controller & Web Dashboard",
      'doc_cli.next_title': "Troubleshooting & FAQ →",
      'doc_faq.title': "Frequently Asked Questions (FAQ)",
      'doc_faq.subtitle': "Common troubleshooting tips and solutions when using Wmimo.",
      'doc_faq.q1_title': "1. Connection timeout when importing subscription?",
      'doc_faq.q1_desc': "• Check if the subscription URL can be downloaded directly in your browser;<br>• Verify if your local ISP DNS can resolve the subscription domain;<br>• Configure custom DNS (e.g. <code>223.5.5.5</code> / <code>1.1.1.1</code>) in settings and retry.",
      'doc_faq.q2_title': "2. Cannot open web pages after enabling TUN mode?",
      'doc_faq.q2_desc': "• Ensure no other VPN or virtual adapter tools are running simultaneously causing route conflicts;<br>• Close conflicting software, toggle TUN off and back on in Wmimo;<br>• Check if your firewall is blocking outbound connections from the <code>wmimo-core</code> process.",
      'doc_faq.q3_title': "3. Linux AppImage fails to launch on Ubuntu 24.04?",
      'doc_faq.q3_desc': "Ubuntu 24.04 no longer includes legacy libfuse2 by default. Install it via terminal to launch AppImages:",
      'doc_faq.q4_title': "4. Nodes did not refresh after updating profile?",
      'doc_faq.q4_desc': "Go to <strong>Profile Management</strong> and click the refresh icon next to the profile to trigger a full manual pull.",
      'doc_faq.prev_title': "← Client Ecosystem Navigation",
      'doc_faq.next_title': "Build from Source →",
      'doc_bld.title': "Build & Compile from Source",
      'doc_bld.subtitle': "Step-by-step guide for developers to setup build environments and compile Wmimo across platforms.",
      'doc_bld.h2_env': "🛠️ Prerequisites & Environment",
      'doc_bld.env_win': "<strong>Windows</strong>: Visual Studio 2022 Desktop C++ workload",
      'doc_bld.env_linux': "<strong>Linux</strong>: <code>gtk3</code>, <code>clang</code>, <code>cmake</code>, <code>ninja-build</code>",
      'doc_bld.h2_quickstart': "⚡ Quick Start",
      'doc_bld.h2_release': "📦 Compile Release Binaries",
      'doc_bld.release_p': "Run the corresponding build command for your target operating system:",
      'doc_bld.prev_title': "← Troubleshooting & FAQ",

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
