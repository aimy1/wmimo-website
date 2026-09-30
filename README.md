<div align="center">
  <img src="assets/images/app_icon_256.png" width="96" height="96" alt="Wmimo Logo" style="border-radius: 16px;" />
  <h1>Wmimo 官方网站与知识库中心</h1>
  <p><strong>Proxy Reimagined · 极速 · 纯粹 · 优雅的现代化跨平台网络代理客户端官方门户</strong></p>

  <p>
    <a href="https://github.com/aimy1/Wmimo/releases/latest"><img src="https://img.shields.io/badge/Release-v1.1.7-00BCDF?style=flat-square&logo=github&logoColor=white" alt="Release Version" /></a>
    <a href="https://www.gnu.org/licenses/gpl-3.0.html"><img src="https://img.shields.io/badge/License-GPL--3.0-0284C7?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20ES6-00DAF5?style=flat-square" alt="Tech Stack" />
    <img src="https://img.shields.io/badge/Design-Geometric%20Micro--Card-10B981?style=flat-square" alt="Design System" />
    <img src="https://img.shields.io/badge/Theme-Obsidian%20Dark-0F172A?style=flat-square" alt="Theme" />
  </p>

  <p>
    <a href="#-核心理念与特性">核心理念</a> •
    <a href="#-站点页面与功能架构">页面架构</a> •
    <a href="#-技术文档知识库矩阵">技术文档</a> •
    <a href="#-设计规范与工程原则">设计规范</a> •
    <a href="#-本地运行与调试">本地运行</a> •
    <a href="#-全球免费一键部署">部署指引</a>
  </p>
</div>

---

## 📖 项目简介

本仓库是 **Wmimo** 官方官方门户与知识库系统的完整源码。涵盖产品展示主页、多架构全平台客户端下载中心、轻量高精度在线网络测速台以及全协议技术实战知识库。

全站基于纯原生现代化 Web 标准打造，遵循 **零构建依赖（Zero-Build Architecture）** 原则，开箱即用，无需 Node/Webpack/Vite 繁复编译打包。全站严格贯彻**极简曜黑科技美学（Deep Obsidian `#0A0E17`）** 与 **Wmimo 天青主色（Celestial Cyan `#00BCDF`）**，统一采用现代几何微圆角体系（杜绝胶囊化设计），呈现纯粹、专业、丝滑的视觉与操作体验。

---

## 🌟 核心理念与特性

- 🛡️ **100% 自由开源 · 纯粹透明**：
  - 核心遵循 GNU GPL-3.0 开源协议，全透明公开，不含任何后门、闭源私货与侵入式遥测。
- 🍃 **零商业广告 · 隐私至上**：
  - 全站绝无第三方营销广告，不搜集用户追踪日志，还原网络工具应有的纯净克制。
- ⚡ **零构建依赖，极致轻快**：
  - 纯净语义化 HTML5 + CSS3 Design Tokens + 原生模块化 JavaScript，秒级加载与极低维护成本。
- 🎯 **精炼极简在线测速仪**：
  - 去除厚重机械轴心与多余动画，采用轻量半透明细线指针与高精度刻度，支持动态延迟、抖动与丢包诊断。
- 💻 **全架构下载中心与智能识别**：
  - 自动识别访客客户端操作系统与处理器架构，提供 Windows（标准安装/便携包）、Linux（Deb/RPM/Arch/Tarball）及 Android 4 架构 APK 极速直链下载。
- 🌐 **全站 100% 无刷新中英双语 (i18n)**：
  - 原生轻量双语词典驱动，所有文案、导航标签与文档均支持一键无闪烁瞬时切换。
- 📱 **响应式几何卡片体系**：
  - 严谨统一的微圆角几何设计（`6px` / `8px` / `10px` / `12px` / `14px`），在桌面端、平板与移动端均呈现一致优雅的排版。

---

## 🧭 站点页面与功能架构

| 页面文件 | 页面定位 | 核心模块与功能亮点 |
|---|---|---|
| [`index.html`](index.html) | **官网主页** | 核心特性展示、全平台运行视图、TUN 虚拟网卡对比、快速上手指引与全站统一吸顶导航 |
| [`download.html`](download.html) | **下载中心** | 访客操作系统智能识别、推荐安装包首屏直达、全架构安装包筛选矩阵与 SHA-256 校验说明 |
| [`speedtest.html`](speedtest.html) | **在线测速** | 极简高精度轻量细线测速表盘、实时延迟与抖动监测、下行速率曲线图与多节点测速 |
| [`community.html`](community.html) | **关于与赞助** | 项目初心与四大支柱、开源基石致敬、多样化非资金支持方式、Aptos USDT 随心赞助通道与开源 FAQ |
| [`docs/index.html`](docs/index.html) | **知识库中心** | 15 篇体系化技术专栏、实时侧边栏搜索过滤、流畅锚点导航、一键代码复制与双语阅读 |

---

## 📚 技术文档知识库矩阵 (`docs/`)

知识库包含 15 篇深度图文教程，由浅入深覆盖从快速入门到内核级调优：

```
docs/
├── index.html          # [01] 快速上手指南 (Quick Start Guide)
├── modes.html          # [02] 出站分流模式详解 (Rule / Global / Direct)
├── tun.html            # [03] TUN 虚拟网卡配置与全局接管 (Wintun / VpnService)
├── dns.html            # [04] 现代 DNS 解析与 Fake-IP 缓存防污染最佳实践
├── rules.html          # [05] 高级路由分流规则与进程级路由 (PROCESS-NAME)
├── protocols.html      # [06] 下一代网络协议矩阵 (Hysteria 2 / TUIC v5 / VLESS Reality)
├── sniffer.html        # [07] TLS SNI 与 HTTP Host 域名嗅探器 (Sniffer)
├── groups.html         # [08] 策略组调度、自动优选与故障容灾 (Fallback / URL-Test)
├── lan.html            # [09] 局域网共享与主机互联 (Switch / PS5 / Xbox)
├── dashboard.html      # [10] 外部 RESTful 控制器与 Web 仪表盘联动
├── subscriptions.html  # [11] 订阅自动更新与 Rule Providers 远程规则集
├── clients.html        # [12] 跨平台客户端生态全景导航
├── faq.html            # [13] 常见问题排查与网络回环修复 (FAQ)
├── build.html          # [14] 从源码本地编译 (Flutter + Mihomo 构建指南)
└── dev-guide.html      # [15] 跨平台代理客户端开发实战指南 (内核、TUN/VPN、防回环、Platform Adapter)
```

---

## 🎨 设计规范与工程原则 (Design System)

全站严格执行基于 CSS 自定义属性的设计令牌（Tokens），杜绝魔数与样式割裂：

```css
:root {
  /* 基础曜黑底色体系 */
  --bg-app: #0A0E17;                  /* 应用全局深曜黑背景 */
  --bg-card: #121929;                 /* 标准微卡片底色 */
  --bg-card-elevated: #162035;        /* 悬浮/激活卡片底色 */
  --border-color: rgba(255, 255, 255, 0.08); /* 极细精致描边 */

  /* 品牌天青光感色彩体系 */
  --brand-primary: #00BCDF;           /* Wmimo 天青主品牌色 */
  --brand-cyan: #00DAF5;              /* 科技荧光青 */
  --brand-gradient: linear-gradient(135deg, #00BCDF 0%, #0284C7 100%);

  /* 几何微圆角规范（严格非胶囊） */
  --radius-sm: 8px;                   /* 徽章与标签微圆角 */
  --radius-md: 12px;                  /* 次级卡片圆角 */
  --radius-card: 14px;                /* 主体微卡片统一样式圆角 */
  --radius-btn: 8px;                  /* 按钮交互微圆角 */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', Consolas, Monaco, monospace;
}
```

> **设计准则**：
> - 坚决不使用任何 `border-radius: 999px` 胶囊药丸结构，全页面统一采用现代几何微圆角矩形。
> - 避免冗余无意义的装饰性动画与玩具化交互，保持基础设施网络工具应有的沉稳与利落。

---

## 📁 目录结构树

```text
wmimo-website/
├── assets/
│   ├── css/
│   │   ├── tokens.css          # 全局设计令牌（色彩、间距、字体、阴影）
│   │   ├── base.css            # 基础排版重置与全站公用基类
│   │   ├── components.css      # 吸顶 Header、移动抽屉、按钮、四列 Footer、Toast 气泡
│   │   ├── home.css            # 首页精炼组件与对比滑块专属样式
│   │   ├── pages.css           # 下载中心、在线测速与关于赞助页面专用样式
│   │   └── docs.css            # 知识库专用双栏侧边栏与排版样式
│   ├── js/
│   │   ├── main.js             # 吸顶检测、移动端折叠导航、平滑锚点、代码一键复制
│   │   ├── i18n.js             # 全站无刷新中英双语国际化词典与渲染管线
│   │   ├── speedtest.js        # 极简高精度测速引擎与轻量刻度渲染
│   │   ├── os-detector.js      # 智能系统与处理器架构嗅探器
│   │   └── docs-engine.js      # 知识库章节动态渲染与搜索过滤引擎
│   └── images/
│       ├── app_icon_128.png    # 客户端高清图标 (128x128)
│       ├── app_icon_256.png    # 客户端高清图标 (256x256)
│       ├── app_icon_512.png    # 客户端高清图标 (512x512)
│       ├── donate_qr.png       # Aptos USDT 赞助收款二维码
│       └── tray.png            # 客户端托盘菜单示意图
├── docs/                       # 15 篇体系化实战技术文档
├── index.html                  # 现代化官方首页
├── download.html               # 官方全平台安装包下载中心
├── speedtest.html              # 极简在线实时网络测速台
├── community.html              # 关于 Wmimo 与开源随心赞助中枢
├── mautoupdate.json            # 官方客户端自动检查更新元数据 (v1.1.7)
├── mconfig.json                # 客户端配置预设模板
├── 跨平台代理客户端开发实战指南.md   # 50章跨平台客户端实战开发专著源文
├── server.js                   # 零依赖本地轻量调试服务器
└── README.md                   # 本说明文件
```

---

## 💻 本地运行与调试

全站纯静态零构建依赖，下载源码即可瞬间预览：

### 方案 1：使用内置 Node.js 服务（推荐）
```bash
node server.js
```
启动后在浏览器打开：👉 **`http://127.0.0.1:3000/`**

### 方案 2：使用 Python 3 内置轻量服务
```bash
python -m http.server 3000
```
在浏览器打开：`http://localhost:3000/`

### 方案 3：使用 VS Code Live Server 插件
在 VS Code 中右键点击 `index.html`，选择 **"Open with Live Server"** 即可实现即时预览。

---

## 🚀 全球免费一键部署

本站为纯静态 Web 应用，可在全球主流云原生平台免费秒级上线：

<details>
<summary><b>1. GitHub Pages（官方推荐）</b></summary>

1. 进入仓库 **Settings** -> **Pages**。
2. **Build and deployment** 下的 **Source** 选择 `Deploy from a branch`。
3. Branch 选择 `main` 分支，路径选择 `/ (root)`，点击 **Save**。
4. 稍等 1~2 分钟即可通过 `https://<username>.github.io/<repo>/` 访问。
</details>

<details>
<summary><b>2. Cloudflare Pages</b></summary>

1. 登录 Cloudflare Dashboard，选择 **Workers & Pages** -> **Create application** -> **Pages**。
2. 连接 GitHub 仓库 `wmimo-website`。
3. **Build settings**：
   - Framework preset: `None`
   - Build command: （留空）
   - Build output directory: `/`
4. 点击 **Save and Deploy** 即可获得全球 Anycast CDN 极速加速。
</details>

<details>
<summary><b>3. Vercel / Netlify</b></summary>

- **Vercel**：点击 `Add New Project`，直接导入 GitHub 仓库，无需填写任何构建命令，直接点击 `Deploy`。
- **Netlify**：选择 `Import an existing project`，Publish directory 设置为 `.`，点击发布。
</details>

<details>
<summary><b>4. Nginx / Docker 生产部署</b></summary>

简单 Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        expires 1d;
        add_header Cache-Control "public, no-transform";
    }

    location ~* \.(json|html)$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }
}
```
</details>

---

## 🤝 参与贡献与联系方式

欢迎提交 Issue 或 Pull Request 协助改进官方网站与文档中心！

- 🐛 **提交 Bug 或改进建议**：[GitHub Issues](https://github.com/aimy1/wmimo-website/issues)
- 💡 **Wmimo 客户端主仓库**：[aimy1/Wmimo](https://github.com/aimy1/Wmimo)
- 📬 **开发者直联邮箱**：[aisaniya@proton.me](mailto:aisaniya@proton.me)

---

## 📄 开源许可证

本项目遵循 [GNU General Public License v3.0 (GPL-3.0)](https://www.gnu.org/licenses/gpl-3.0.html) 开放源代码。
Copyleft © 2026 Wmimo Project. All rights reserved.
