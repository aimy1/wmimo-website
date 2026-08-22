# 新一代网络协议与 Full Cone NAT 指南

Wmimo 内置最新的 Mihomo Alpha 核心，不仅兼容传统 Shadowsocks / VMess / Trojan 协议，更原生深度支持新一代抗弱网拥塞协议（**Hysteria 2**、**TUIC v5**）以及防主动探测协议（**VLESS Reality**）。

---

## ⚡ 新一代协议横向对比

| 协议类型 | 底层传输机制 | 核心优势 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Hysteria 2** | 基于 UDP (QUIC Brutal 算法) | 极速抗丢包，自动拥塞感知，晚高峰带宽压榨 | 跨国高丢包、恶劣弱网、大流量下载 |
| **TUIC v5** | 基于 UDP (0-RTT QUIC) | 握手延迟极低，连接复用性能优异 | 移动网络频繁切换、网页高频浏览 |
| **VLESS Reality** | 基于 TCP/TLS | 消除自签名证书指纹，直接借用目标权威站点 TLS 证书 | 严苛封锁环境、长期稳定办公 |
| **Shadowsocks** | TCP / UDP | 极简高吞吐，CPU 开销最低 | 局域网转发、低配路由器与嵌入式设备 |

---

## 🚀 Hysteria 2 协议深度解析

Hysteria 2 是近年来网络代理领域的突破性协议，其最大特点是采用了定制的 **Brutal 拥塞控制算法**：

1. **突破传统 TCP 丢包退避限制**：普通 TCP 遇到 5% 丢包时吞吐量会骤降 50% 以上，而 Hysteria 2 能在高达 20%~30% 的高丢包环境下依然跑满预定带宽；
2. **端口跳跃 (Port Hopping)**：支持服务端与客户端约定动态端口范围，有效规避针对固定 UDP 端口的 QoS 限速；
3. **原生支持 UDP 转发与游戏加速**。

---

## 🛡️ VLESS Reality 伪装机制

传统的 TLS 代理（如 Trojan、VMess+TLS）需要申请独立域名并配置 SSL 证书。如果域名或证书暴露，很容易被中间审查系统主动嗅探或封锁。

**Reality** 改变了这一逻辑：
- **借用目标真实网站**（如 `www.apple.com`、`www.microsoft.com`、`gateway.icloud.com`）；
- 客户端握手时通过预设的 `public-key` 与 `short-id` 验证身份；
- 中间人审查发起探测时，服务端直接原样转发被借用目标站点的真实证书与握手内容，**彻底消除代理特征**。

---

## 🎮 Full Cone NAT（全锥型 NAT）与联机优化

在使用 Wmimo 的 TUN 模式进行外服游戏联机时，NAT 类型决定了您与其他玩家建立 P2P 直连的能力。

### 为什么需要 Full Cone NAT？
- **Symmetric NAT (对称型 / NAT Type D)**：每个连接分配不同外网端口，极难与其他玩家打通 P2P，容易出现联机搜不到房间或延迟飙高；
- **Full Cone NAT (全锥型 / NAT Type A)**：外网任意主机均可向已映射的端口发送数据，联机成功率 100%。

### 🛠️ Wmimo 配置开启
在配置文件或 Wmimo 的 TUN 高级设置中，确保包含：
```yaml
tun:
  enable: true
  stack: system
  endpoint-independent-nat: true  # 开启 Full Cone NAT 穿透支持
  auto-route: true
```
开启后，游戏内的 NAT 状态通常会从 `Strict / Moderate` 提升为 `Open (Type A)`。
