# TUN 虚拟网卡模式配置

了解 TUN 虚拟网卡的工作原理以及在各操作系统下的权限配置要求。

---

## 🛡️ TUN 模式概述

传统系统代理仅能接管支持 HTTP/Socks5 协议的浏览器应用，而 **TUN 模式** 在操作系统底层创建虚拟网络设备（L3 Virtual Network Device），接管全系统的 IP 层数据包。

- **全应用支持**：无缝支持命令行工具（git, curl, docker）、游戏客户端与系统级后台服务；
- **智能防污染**：内置 Fake-IP / Redir-Host DNS 引擎，彻底解决 DNS 污染；
- **局域网直连**：自动绕过局域网 IP 与国内白名单，不影响本地设备互访。

---

## 🪟 Windows 配置

在 Wmimo 设置中直接开启 **“TUN 模式”** 开关。当系统弹出 UAC 提权提示时，点击“是”允许加载 Wintun 驱动即可。

---

## 🐧 Linux 权限设置

在 Linux 下，TUN 虚拟网卡创建需要 `CAP_NET_ADMIN` 权限。您可以通过终端执行以下指令完成提权：

```bash
sudo setcap cap_net_admin,cap_net_bind_service=+ep /path/to/wmimo-core
```

---

## 📱 Android 移动端

Android 系统由系统级 **VpnService** 原生驱动，首次连接时在弹出的系统 VPN 授权提示中点击“确定”即可。
