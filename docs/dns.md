# DNS 配置与 Fake-IP 防污染解析最佳实践

DNS（域名系统）是网络代理客户端中最关键的基础组件。Wmimo 基于 Mihomo 核心，默认采用业界先进的 **`Fake-IP` 增强模式**，彻底解决了本地 DNS 污染与解析延迟问题。

---

## ⚡ 为什么优先推荐 Fake-IP 模式？

传统的 `redir-host` 模式在请求网页时，必须先在本地向远端 DNS 服务器发起查询，获取到真实 IP 后再与代理核心匹配分流。这种方式存在两大痛点：
1. **本地 DNS 污染**：未经加密的 DNS 请求极易被中间节点劫持并返回虚假 IP；
2. **高连接延迟**：每次发起新连接都需要等待 50~200ms 的远程 DNS 查询往返。

### 🚀 Fake-IP 工作原理
在 Fake-IP 模式下，当系统或应用向 Wmimo 发起域名解析请求时：
1. **即时应答**：Wmimo 内置 DNS 立即从预设地址池（如 `198.18.0.0/16`）中分配一个虚构的内部保留 IP 并返回给应用（耗时 < 1ms）；
2. **连接映射**：应用随后向该 Fake-IP 发起 TCP/UDP 握手，Wmimo 截获请求并在核心内部自动还原原始目标域名；
3. **远程精准解析**：如果该流量命中代理规则，目标域名直接在远端出站节点上进行本地解析与连接，**完全杜绝本地 DNS 污染与 DNS 泄露**。

---

## 🛠️ 标准双向防污染 DNS 配置示例

以下是经过生产环境验证的标准推荐 DNS 配置结构：

```yaml
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  
  # Fake-IP 过滤清单（确保特定内网与系统服务获取真实 IP）
  fake-ip-filter:
    - "*.lan"
    - "*.local"
    - "localhost.ptlogin2.qq.com"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - "time.*.com"
    - "ntp.*.com"

  # 默认无策略命中时使用的解析服务器
  nameserver:
    - 223.5.5.5
    - 119.29.29.29

  # 国内直连加速与分流策略
  nameserver-policy:
    "geosite:cn,private":
      - 223.5.5.5
      - 119.29.29.29
    "geosite:geolocation-!cn":
      - "https://1.1.1.1/dns-query#Proxy"
      - "https://8.8.8.8/dns-query#Proxy"
```

---

## 📋 配置字段深入解析

| 字段参数 | 说明与推荐值 |
| :--- | :--- |
| `enhanced-mode` | 解析模式，推荐 `fake-ip`（兼容性与速度最佳）。 |
| `fake-ip-range` | 虚构保留 IP 池，默认推荐 `198.18.0.1/16`。 |
| `fake-ip-filter` | 排除使用 Fake-IP 的域名列表，如 Windows 网络连通性测试、NTP 时间同步等。 |
| `nameserver-policy` | 基于 `GEOSITE` 标签的域名分流解析策略，确保国内域名走国内 DNS，国外域名走代理加密 DoH。 |
| `direct-nameserver` | 用于解析直连出站节点域名的 DNS，防止节点域名本身因 DNS 循环依赖而无法连通。 |

---

## ❓ 常见 DNS 排查技巧

### 1. 国内网页打开慢或部分应用网络异常
- **原因**：可能将国内域名误路由到了海外加密 DNS 解析，返回了海外 CDN 节点；
- **解决**：确保 `nameserver-policy` 中配置了 `"geosite:cn": [223.5.5.5, 119.29.29.29]`。

### 2. 切换网络环境后需要清理缓存
- 在 Windows 终端运行：
  ```powershell
  ipconfig /flushdns
  ```
