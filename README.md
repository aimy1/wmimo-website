<div align="center">
  <img src="assets/images/app_icon_256.png" width="108" height="108" alt="Wmimo Logo" style="border-radius: 22px; box-shadow: 0 12px 30px rgba(0, 188, 223, 0.25);" />
  <h1>Wmimo 官方网站与知识库中心</h1>
  <p><strong>Proxy Reimagined · 极速 · 优雅 · 强大的现代化跨平台网络代理客户端官网</strong></p>

  <p>
    <a href="https://github.com/aimy1/Wmimo/releases/latest"><img src="https://img.shields.io/badge/Release-v1.1.6-00BCDF?style=for-the-badge&logo=github&logoColor=white" alt="Release Version" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-GPL--3.0-0284C7?style=for-the-badge" alt="License" /></a>
    <img src="https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20ES6-00DAF5?style=for-the-badge" alt="Tech Stack" />
    <img src="https://img.shields.io/badge/Design-18px%20Micro--Card-10B981?style=for-the-badge" alt="Design System" />
    <img src="https://img.shields.io/badge/Theme-Obsidian%20Dark-1E293B?style=for-the-badge" alt="Theme" />
  </p>

  <p>
    <a href="#-核心特性">核心特性</a> •
    <a href="#-站点页面与功能导航">页面导航</a> •
    <a href="#-文档知识库矩阵">技术文档</a> •
    <a href="#-设计系统规范">设计规范</a> •
    <a href="#-本地运行与调试">本地运行</a> •
    <a href="#-部署指引">一键部署</a>
  </p>
</div>

---

## 📖 项目简介

本仓库为 **Wmimo** 官方展示网站、跨平台客户端下载中心、在线实时测速台及技术知识库系统。基于纯原生现代 Web 技术栈打造，**零构建依赖（Zero Build Pipeline）**，开箱即用，兼具极速首屏响应、高保真动效与严苛的视觉设计美学。

全站围绕 **曜黑科技美学（Deep Obsidian `#0A0E17`）** 与 **天青蓝（Celestial Cyan `#00BCDF`）** 品牌主色构建，完美融合了 Folia 视差动效、高刷平滑动画、高保真测速仪表盘与微圆角卡片体系。

---

## 🌟 核心特性

- ⚡ **零构建依赖，极致轻快**：纯净语义化 HTML5 + CSS3 Design Tokens + 原生模块化 JavaScript，无需 Node/Webpack/Vite 繁复编译打包，秒速加载与极速维护。
- 🐱 **Folia 灵动视差与猫咪吉祥物**：
  - 动态猫咪粒子背景漂浮系统，伴随鼠标与页面滚动呈现立体纵深与天青色光晕。
  - 巨型动感排版（Kinetic Typography）与 3D 扇形堆叠卡片（Stacked Cards）滚动交互。
- 🎚️ **TUN 虚拟网卡双向拖拽对比滑块**：
  - 沉浸式拖拽对比组件，直观对比操作系统级透明接管与常规直连在延迟、丢包与协议穿透上的巨大飞跃。
- 🎯 **激光刻度高保真在线测速仪**：
  - 双极坐标激光刻度弧、平滑阻尼插值指针、高刷动态雷达脉冲图，集成全球 Anycast 边缘测速节点与实时网络诊断。
- 💻 **全架构下载中心与智能识别**：
  - 自动嗅探访客系统架构（Windows x64 / ARM64、Linux Deb / RPM / Arch / Tarball、Android 全架构 APK），直链秒下。
- 🌐 **100% 全站中英双语无刷新切换 (i18n)**：
  - 原生双语词典引擎，一键无刷新瞬时重绘所有页面文案、导航标签与文档内容。
- 📱 **全终端响应式自适应**：
  - 从移动端汉堡抽屉抽拉导航，到 4K 超宽带鱼屏，均具备精准网格与字体缩放。

---

## 🧭 站点页面与功能导航

| 页面文件 | 页面名称 | 核心交互与亮点功能 |
|---|---|---|
| [`index.html`](index.html) | **官网首页** | Folia 灵动视差、猫咪吉祥物粒子、3D 叠卡展示、TUN 拖拽对比滑块、全站统一吸顶栏 |
| [`download.html`](download.html) | **下载中心** | 自动操作系统嗅探、精选推荐安装包、多平台架构直链筛选器（Windows / Linux / Android） |
| [`speedtest.html`](speedtest.html) | **在线网络测速** | 航空激光刻度表盘、动态频谱波形图、多边缘节点并行延迟探测、抖动与丢包诊断 |
| [`community.html`](community.html) | **关于与赞助** | 开源协议详解、全球交流群组、APTOS USDT / 赞助通道、开发者直联邮箱 |
| [`docs/index.html`](docs/index.html) | **知识库中心** | 14 篇完整跨平台技术专栏、即时搜索过滤、章节平滑串联、一键复制代码块 |

---

## 📚 文档知识库矩阵 (`docs/`)

完整包含 14 篇深度图文教程，涵盖从零基础上手到内核级网络调优：

```
docs/
├── index.html          # [01] 快速上手指南 (Quick Start)
├── modes.html          # [02] 出站分流模式 (Rule / Global / Direct)
├── tun.html            # [03] TUN 虚拟网卡配置与系统接管 (Wintun)
├── dns.html            # [04] 现代 DNS 解析与 Fake-IP 缓存防污染
├── rules.html          # [05] 高级路由分流与进程级过滤规则
├── protocols.html      # [06] 下一代协议矩阵 (Hysteria 2 / TUIC / Reality)
├── sniffer.html        # [07] TLS SNI 与 HTTP Host 域名嗅探器
├── groups.html         # [08] 策略组调度、自动优选与故障容灾 (Fallback)
├── lan.html            # [09] 局域网共享与主机互联 (Switch / PS5 / Xbox)
├── dashboard.html      # [10] 外部 RESTful 控制器与 Web 仪表盘
├── subscriptions.html  # [11] 订阅自动更新与 Rule Providers 规则集
├── clients.html        # [12] 跨平台客户端生态全景导航
├── faq.html            # [13] 常见问题排查与回环故障修复
└── build.html          # [14] 从源码编译 (Flutter + Mihomo 完整构建流程)
```

---

## 🎨 设计系统规范 (Design System)

全站严格执行基于 CSS 自定义属性的设计令牌（Tokens），保证视觉一致性：

```css
:root {
  /* 基础曜黑底色体系 */
  --bg-app: #0A0E17;                  /* 应用全局深曜黑背景 */
  --bg-card: #121929;                 /* 标准卡片底色 */
  --bg-card-elevated: #162035;        /* 悬浮/激活卡片底色 */
  --border-color: rgba(255, 255, 255, 0.08); /* 极细精致边框 */

  /* 品牌天青光感色彩体系 */
  --brand-primary: #00BCDF;           /* Wmimo 天青主品牌色 */
  --brand-cyan: #00DAF5;              /* 科技荧光青 */
  --brand-gradient: linear-gradient(135deg, #00BCDF 0%, #0284C7 100%);

  /* 几何与排版圆角规范 */
  --radius-card: 18px;                /* 微卡片统一样式圆角 */
  --radius-btn: 14px;                 /* 按钮操作微圆角 */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

---

## 📁 目录结构树

```text
wmimo-website/
├── assets/
│   ├── css/
│   │   ├── tokens.css          # 全局设计变量（色彩、间距、字体、阴影）
│   │   ├── base.css            # 基础排版重置与全站公用基类
│   │   ├── components.css      # 吸顶 Header、移动抽屉、按钮、四列 Footer、Toast 气泡
│   │   ├── home.css            # 首页 Folia 视差动效、猫咪粒子、对比滑块专属样式
│   │   ├── pages.css           # 下载中心与在线测速页面专用组件样式
│   │   └── docs.css            # 文档知识库专用侧边栏与排版样式
│   ├── js/
│   │   ├── main.js             # 吸顶检测、移动端折叠导航、平滑锚点、代码一键复制
│   │   ├── folia-home.js       # 首页视差计算、猫咪粒子池、3D 叠卡与对比滑块引擎
│   │   ├── i18n.js             # 全站无刷新中英双语国际化词典与渲染管线
│   │   ├── speedtest.js        # 测速引擎核心、高刷仪表盘动画与动态雷达波绘制
│   │   └── os-detector.js      # 智能系统嗅探与一键匹配推荐下载器
│   └── images/
│       ├── app_icon_128.png    # 客户端高清图标 (128x128)
│       ├── app_icon_256.png    # 客户端高清图标 (256x256)
│       └── cat_icon.png        # Wmimo 官方白色猫咪吉祥物矢量图
├── docs/                       # 14 篇体系化技术实战文档
├── index.html                  # 现代化官方首页
├── download.html               # 官方全平台安装包下载中心
├── speedtest.html              # 在线实时网络性能测速平台
├── community.html              # 开源社群、赞助通道与交流反馈
├── mautoupdate.json            # 官方客户端自动检查更新元数据 (v1.1.6)
├── server.js                   # 零依赖本地轻量调试服务器
├── LICENSE                     # GPL-3.0 开源授权协议
└── README.md                   # 本说明文件
```

---

## 💻 本地运行与调试

项目完全无需 `npm install` 安装庞大依赖库，下载即可运行：

### 方案 1：使用内置 Node.js 服务（推荐）
```bash
node server.js
```
控制台将输出启动信息，在浏览器中打开：
👉 **`http://127.0.0.1:3000/`**

### 方案 2：使用 Python 3 内置轻量服务
```bash
python -m http.server 3000
```
在浏览器中打开：`http://localhost:3000/`

### 方案 3：使用 VS Code Live Server 插件
在 VS Code 中安装 **Live Server** 扩展，右键点击 `index.html`，选择 **"Open with Live Server"** 即可支持热更新预览。

---

## 🚀 部署指引

本站为纯静态 Web 应用，可在全球各大云原生平台 **秒级免费上线**：

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
4. 点击 **Save and Deploy** 即可获得全球 Anycast CDN 高速加速。
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

## 🤝 贡献与反馈

欢迎提交 Issue 或 Pull Request 协助改进官方网站与文档中心！

- 🐛 **提交 Bug 或改进建议**：[GitHub Issues](https://github.com/aimy1/wmimo-website/issues)
- 💡 **Wmimo 客户端主仓库**：[aimy1/Wmimo](https://github.com/aimy1/Wmimo)
- 📮 **安全与业务联系**：[aisaniya@proton.me](mailto:aisaniya@proton.me)

---

## 📄 开源许可证

本项目遵循 [GNU General Public License v3.0 (GPL-3.0)](LICENSE) 开放源代码。
Copyleft © 2026 Wmimo Project. All rights reserved.
