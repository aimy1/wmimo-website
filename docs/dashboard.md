# 外部控制器与 Web 仪表盘 (Dashboard) 对接

Wmimo 内置 Mihomo 的 **RESTful API 控制器（External Controller）**。通过开放该接口，开发者与高级用户可以使用任何主流开源 Web 控制面板（如 **MetaCubeXD**, **YACD**, **Zashboard**）进行远程可视化监控、节点测速与实时连接追踪。

---

## ⚙️ 步骤一：开启 External Controller

在配置文件中确认外部控制器端口与访问密钥（Secret）：

```yaml
external-controller: 127.0.0.1:9090     # 控制器监听地址与端口
secret: "your_password_here"            # 访问授权密钥（若留空则无需认证）
```

> 🔒 **安全提醒**：如果需要通过局域网远程管理（如 `0.0.0.0:9090`），请务必设置强密码 `secret`，防止内网未经授权的恶意访问。

---

## 🖥️ 步骤二：推荐 Web 仪表盘及连接方式

### 1. MetaCubeXD（官方推荐，功能最全）
- **在线访问**：`https://metacubex.github.io/metacubexd/`
- **连接配置**：
  - **API 地址**：`http://127.0.0.1:9090`
  - **Secret**：填入您配置的密钥
- **核心特色**：原生深度支持 Mihomo 的高级规则查看、Rule-Provider 列表、出站握手详情与内存监控。

### 2. YACD (Yet Another Clash Dashboard)
- **在线访问**：`https://yacd.haishan.me/`
- **连接配置**：填入 `http://127.0.0.1:9090` 与密钥即可进入。

### 3. Zashboard (现代化极简设计)
- **在线访问**：`https://zashboard.pages.dev/`
- **核心特色**：支持精美的暗黑毛玻璃界面与移动端自适应。

---

## 📊 仪表盘高阶功能

1. **实时连接分析 (Connections)**：
   - 实时查看每一个 TCP/UDP 连接的发起源进程、目标域名、上行/下行实时速率、连接存活时间与路由命中规则；
   - 支持点击 **「关闭连接」** 立即切断特定异常下载或高流量连接。
2. **节点批量精准测速**：
   - 一键对全部节点发起并行延迟测试，支持按延迟高低、地区、节点名称快速排序。
3. **Mihomo 运行时日志 (Logs)**：
   - 实时查看 Debug / Info / Warning / Error 日志流，快速排查配置错误。
