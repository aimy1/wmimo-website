# Wmimo 官方网站与多页面文档中心

<div align="center">
  <img src="assets/images/app_icon_256.png" width="96" height="96" alt="Wmimo Logo" />
  <h2>Wmimo 官方网站与知识库中心</h2>
  <p><strong>极速 · 优雅 · 强大的现代化跨平台 Clash / Mihomo 客户端官网</strong></p>

  <p>
    <a href="https://github.com/aimy1/Wmimo/releases/latest"><img src="https://img.shields.io/badge/Release-v1.0.33-00BCDF?style=flat-square&logo=github" alt="Release Version" /></a>
    <a href="https://github.com/aimy1/wmimo-website/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-GPL--3.0-blue?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20ES6-38BDF8?style=flat-square" alt="Tech Stack" />
    <img src="https://img.shields.io/badge/Design-18px%20Micro--Card-10B981?style=flat-square" alt="Design System" />
  </p>
</div>

---

## 📖 项目简介

本仓库为 **Wmimo** 代理客户端的官方展示网站与完整使用文档中心。项目采用轻量级原生 Web 技术栈构建，无任何臃肿的前端打包依赖（Zero Build Pipeline），具有极快的首屏加载速度、完善的语义化结构以及出色的交互体验。

- ⚡ **零构建依赖**：基于纯净语义化 HTML5、现代 CSS3 设计系统（Design Tokens）与模块化 ES6 编写，开箱即用。
- 🎨 **现代化微卡片体系**：遵循天青蓝品牌主色（`#00BCDF` / `#38BDF8`），提供 18px 经典圆角微卡片体系。
- 🌓 **无缝双主题**：支持深空曜黑（`#0B0F19`）与极简浅色（`#F8FAFC`）双主题秒切，记忆用户偏好并自动响应系统设置。
- 🌐 **全站双语国际化 (i18n)**：全站主页、下载中心、赞助页及 14 篇技术文档均提供 100% 覆盖的中英双语切换。
- 📱 **响应式自适应**：完美适配桌面大屏（4K/2K/1080P）、平板以及移动端设备。

---

## 🌟 页面架构与目录

### 1. 主站核心页面
- **[首页 (`index.html`)](index.html)**：左右分栏首屏设计、精美客户端实机展示视窗、4 大核心特性卡片与联系通道。
- **[下载中心 (`download.html`)](download.html)**：自动嗅探识别用户操作系统，提供 Windows（x64 / ARM64）、Linux 各大发行版（Deb / RPM / Arch / AppImage）以及 Android 安装包直达。
- **[关于与赞助 (`community.html`)](community.html)**：项目开源协议说明、APTOS USDT 赞助通道、开发者联系方式与交流反馈。

### 2. 技术文档系统 (`docs/`)
全套文档采用语义化 HTML 编写，内嵌快速检索过滤、左侧自适应侧边栏与上下章节一键串联：

| # | 章节名称 | 核心内容 | 对应页面 |
|---|---|---|---|
| 01 | **快速上手指南** | 快速配置、订阅导入、节点选择与基本运行 | [`docs/index.html`](docs/index.html) |
| 02 | **出站与分流模式** | Rule 规则分流、Global 全局代理与 Direct 直连详解 | [`docs/modes.html`](docs/modes.html) |
| 03 | **TUN 虚拟网卡配置** | Wintun 驱动、系统级流量接管与 UDP 转发 | [`docs/tun.html`](docs/tun.html) |
| 04 | **DNS 配置与 Fake-IP** | 递归解析、防 DNS 污染、Fake-IP 缓存与回退 DNS | [`docs/dns.html`](docs/dns.html) |
| 05 | **高级规则与进程分流** | PROCESS-NAME、DOMAIN-SUFFIX、IP-CIDR 等规则体系 | [`docs/rules.html`](docs/rules.html) |
| 06 | **新一代协议与 NAT** | Hysteria 2、TUIC v5、VLESS Reality、ShadowTLS 与 FullCone NAT | [`docs/protocols.html`](docs/protocols.html) |
| 07 | **协议与域名嗅探 (Sniffer)** | TLS SNI / HTTP Host 动态嗅探与分流重定向 | [`docs/sniffer.html`](docs/sniffer.html) |
| 08 | **策略组调度与自动容灾** | url-test 自动测速、fallback 容灾故障转移与 load-balance | [`docs/groups.html`](docs/groups.html) |
| 09 | **局域网共享与主机代理** | Allow-LAN、Mixed-Port、PS5 / Switch / Xbox 主机联网代理 | [`docs/lan.html`](docs/lan.html) |
| 10 | **外部控制器与 Web 仪表盘** | RESTful API 控制器、Secret 鉴权与 Yacd / Metacubexd 接入 | [`docs/dashboard.html`](docs/dashboard.html) |
| 11 | **订阅管理与远程规则集** | Proxy Providers 节点池、Rule Providers 规则集与 GeoData 自动更新 | [`docs/subscriptions.html`](docs/subscriptions.html) |
| 12 | **客户端生态导航** | 各平台常用 GUI 客户端对比与生态推荐 | [`docs/clients.html`](docs/clients.html) |
| 13 | **常见问题排查 (FAQ)** | 端口冲突、证书异常、回环死循环排查方案 | [`docs/faq.html`](docs/faq.html) |
| 14 | **从源码本地编译** | Flutter 开发环境配置、Mihomo 内核打包与 CI 构建 | [`docs/build.html`](docs/build.html) |

---

## 🛠️ 项目结构

```text
wmimo-website/
├── assets/
│   ├── css/
│   │   ├── base.css            # 全局重置与基础排版
│   │   ├── tokens.css          # 色彩、字体、间距、圆角与暗黑主题变量
│   │   ├── components.css      # 按钮、卡片、导航栏、侧边栏通用组件
│   │   ├── home.css            # 首页左右分栏与特性布局
│   │   └── docs.css            # 文档中心专用排版与代码高亮块
│   ├── js/
│   │   ├── main.js             # 主题切换、回到顶部、代码复制、弹窗交互
│   │   ├── i18n.js             # 纯前端无刷新中英双语词典与动态渲染引擎
│   │   └── os-detector.js      # 智能操作系统嗅探与一键推荐下载
│   └── images/                 # 图标、客户端界面预览与系统徽标
├── docs/                       # 14 篇完整技术文档 HTML 文件
├── index.html                  # 官方网站首页
├── download.html               # 官方客户端下载中心
├── community.html              # 关于、开源赞助与反馈通道
├── server.js                   # 本地轻量级预览 HTTP 服务器
└── README.md                   # 项目说明文档
```

---

## 💻 本地预览与调试

由于项目使用纯前端原生技术，无需安装复杂的 npm 构建工具链：

### 方法 1：使用内置 Node.js 脚本（推荐）
```bash
node server.js
```
访问浏览器：`http://localhost:8089/`

### 方法 2：使用 Python 内置服务器
```bash
# Python 3
python -m http.server 8089
```

### 方法 3：使用 VS Code Live Server
在 VS Code 中安装 **Live Server** 插件，右键 `index.html` 点击 **"Open with Live Server"** 即可。

---

## 🚀 部署指引

本站为纯静态资源，可直接无缝部署到各大托管服务商：

- **GitHub Pages**：进入仓库 `Settings` -> `Pages` -> Source 选择 `Deploy from a branch` (main / root) 即可。
- **Cloudflare Pages**：直接连接 GitHub 仓库，Build command 留空，Output directory 设为 `/`。
- **Vercel / Netlify**：直接导入仓库，无需任何构建步骤。
- **Nginx / Caddy**：将整个目录拷贝至 Web 根路径即可。

---

## 📬 交流反馈

- 官方仓库：[https://github.com/aimy1/Wmimo](https://github.com/aimy1/Wmimo)
- 开发者邮箱：[aisaniya@proton.me](mailto:aisaniya@proton.me)

---

## 📄 开源许可证

本项目基于 [GPL-3.0 License](LICENSE) 协议开源。
