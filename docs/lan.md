# 局域网共享与 Switch / PS5 / 智能电视代理指南

通过开启 Wmimo 的 **局域网共享（Allow LAN）** 功能，您可以将运行 Wmimo 的 Windows、Linux 电脑或 Android 设备作为家庭局域网内的网络代理服务器。

无需在游戏主机（Nintendo Switch、PS5、Xbox）或智能电视（Apple TV、Android TV）上安装任何第三方软件，只需填入电脑内网 IP 与代理端口，即可全屋共享代理加速。

---

## 🚀 步骤一：在 Wmimo 中开启局域网共享

在 Wmimo 客户端界面设置中勾选 **「允许局域网连接 (Allow LAN)」**，或在配置文件中配置：

```yaml
port: 7890             # HTTP 代理端口
socks-port: 7891       # SOCKS5 代理端口
mixed-port: 7890       # 混合代理端口（推荐使用此端口）
allow-lan: true        # 允许局域网其他设备连接
bind-address: "*"      # 监听所有网卡接口
```

---

## 🔍 步骤二：获取当前主机的局域网 IP

确保运行 Wmimo 的主机与需要代理的设备连接在同一个 WiFi / 路由器局域网下：
- **Windows 用户**：按 `Win + R` 输入 `cmd`，运行 `ipconfig`，查看 `IPv4 地址`（如 `192.168.1.100`）；
- **Linux 用户**：终端运行 `ip a` 或 `hostname -I`；
- **Android 用户**：在系统 WiFi 设置中查看当前 IP 地址。

---

## 🎮 步骤三：在终端设备上配置代理

### 1. Nintendo Switch 配置
1. 进入 Switch **「设置 (Settings)」** -> **「互联网 (Internet)」** -> **「互联网设置」**；
2. 点击当前连接的 WiFi，选择 **「更改设置」**；
3. 找到 **「代理服务器设置 (Proxy Settings)」**，由“关闭”改为 **「自动 / 手动」**；
4. 填写参数：
   - **服务器 (Server)**：填写运行 Wmimo 的电脑 IP（如 `192.168.1.100`）
   - **端口 (Port)**：填写 `7890`
5. 保存并连接，即可在 eShop 高速下载与联机加速。

### 2. PlayStation 5 (PS5) / Xbox 配置
1. 进入主机 **「设定」** -> **「网络」** -> **「设定网际网络连接」**；
2. 选择当前 WiFi 或有线网络，按 Options 键选择 **「进阶设定」**；
3. 找到 **「Proxy 服务器」**，选择 **「使用」**；
4. 输入电脑的 IP 与端口 `7890`，点击保存。

### 3. Apple TV / 智能电视 / 手机平板
- 在 WiFi 详情设置页面中，滑动至底部找到 **HTTP 代理**，选择 **手动**，填入服务器 IP 与端口 `7890` 即可。

---

## 🛡️ 防火墙放行故障排查

如果在其他设备上配置后无法联网：
1. **Windows Defender 防火墙拦截**：
   - 进入 Windows 防火墙设置，允许 `wmimo.exe` 与 `wmimoService.exe` 在「专用网络」和「公用网络」中通行；
2. **AP 隔离**：检查路由器后台是否开启了「AP 隔离 (AP Isolation)」，若开启请关闭，否则局域网设备间无法互相通信。
