# Wmimo 官方网站与多页面文档中心

<div align="center">
  <img src="assets/images/app_icon_256.png" width="88" height="88" alt="Wmimo Logo" />
  <h3>现代化跨平台 Clash / Mihomo 客户端官方网站</h3>
  <p>极简主义设计 · 左右分栏实机展示 · 全套语义化 HTML 交互文档系统 · 零构建依赖</p>
</div>

---

## 🌟 页面架构与目录

### 1. 主站页面
- **[首页 (index.html)](index.html)**：极简左右分栏首屏、真实客户端实机运行视窗、4 大核心特性。
- **[下载中心 (download.html)](download.html)**：智能识别当前操作系统，提供 Windows、Linux 各大发行版与 Android 安装包直达。
- **[关于与赞助 (community.html)](community.html)**：APTOS USDT 赞助通道与开发者联系方式。

### 2. 使用文档系统 (`docs/`)
全套文档直接使用原生语义化 HTML 交互页面编写，支持即时搜索与主题/语言无缝切换：
- **[1. 快速上手指南 (docs/index.html)](docs/index.html)**
- **[2. 出站与分流模式 (docs/modes.html)](docs/modes.html)**
- **[3. TUN 虚拟网卡配置 (docs/tun.html)](docs/tun.html)**
- **[4. DNS 配置与 Fake-IP (docs/dns.html)](docs/dns.html)**
- **[5. 高级规则与进程分流 (docs/rules.html)](docs/rules.html)**
- **[6. 新一代协议与 NAT (docs/protocols.html)](docs/protocols.html)**
- **[7. 域名与协议嗅探器 (docs/sniffer.html)](docs/sniffer.html)**
- **[8. 策略组调度与自动容灾 (docs/groups.html)](docs/groups.html)**
- **[9. 局域网共享与主机代理 (docs/lan.html)](docs/lan.html)**
- **[10. 外部控制器与 Web 仪表盘 (docs/dashboard.html)](docs/dashboard.html)**
- **[11. 客户端生态导航 (docs/clients.html)](docs/clients.html)**
- **[12. 常见问题排查 (docs/faq.html)](docs/faq.html)**
- **[13. 从源码本地编译 (docs/build.html)](docs/build.html)**

---

## 🎨 视觉与交互规范

- **品牌主色**：天青蓝 `#00BCDF` / 高光蓝 `#38BDF8`；
- **微卡片体系**：18px 圆角与深空曜黑（`#0B0F19`）/ 极简浅色（`#F8FAFC`）双主题无缝秒切；
- **无冗余脚本**：纯净语义化 HTML5 + CSS + 模块化 ES6，首屏极速加载。

---

## 🚀 部署指引

将本目录推送到 GitHub 仓库并开启 **GitHub Pages** 或部署至 **Cloudflare Pages / Vercel**，无需任何构建步骤即可直接上线。
