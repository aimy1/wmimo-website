# 域名与协议嗅探器 (Sniffer) 实战指南

在日常网络环境中，许多应用（如部分手机 App、游戏客户端或 Telegram）在发起网络请求时，往往直接向纯 IP 地址发起连接，而不会先发起明文 DNS 解析。这会导致所有基于域名的分流规则（如 `DOMAIN-SUFFIX`、`GEOSITE`）直接失效。

Wmimo 内置 Mihomo 的 **Sniffer（流量嗅探器）**，可在握手阶段自动提取真实域名，实现高精度智能分流。

---

## 🔍 嗅探器工作原理

当 TCP 或 UDP 数据流进入代理核心时，嗅探器会解析数据包的首部：
1. **TLS 流量**：从 `Client Hello` 数据包的 **SNI (Server Name Indication)** 扩展中提取真实域名；
2. **HTTP 流量**：从请求头的 `Host` 字段提取目标域名；
3. **QUIC 流量**：从 QUIC 握手包中嗅探目标主机名；
4. **重新触发分流**：嗅探成功后，核心会将原本的目标纯 IP 替换为真实域名，并**重新走一遍 `rules` 规则匹配**。

---

## 🛠️ 标准嗅探器配置示例

```yaml
sniffer:
  enable: true
  parse-pure-ip: true           # 是否对所有纯 IP 连接执行嗅探
  
  # 嗅探协议配置
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]

  # 强制使用嗅探结果重置目标地址的域名列表
  force-domain:
    - "+.netflix.com"
    - "+.nflxvideo.net"
    - "+.spotify.com"

  # 跳过嗅探的域名列表（避免证书固定或 Apple 推送服务异常）
  skip-domain:
    - "Mijia Cloud"
    - "dlg.io.mi.com"
    - "+.push.apple.com"
    - "+.apple.com"
```

---

## 📋 核心字段深入说明

| 字段名称 | 作用与推荐设置 |
| :--- | :--- |
| `enable` | 总开关，建议设为 `true`。 |
| `parse-pure-ip` | 开启后，哪怕应用直接连接 IP，也会尝试提取域名，大幅提升流媒体分流精准度。 |
| `override-destination` | 是否用嗅探出的域名完全覆盖原始目标 IP。 |
| `skip-domain` | 排除嗅探白名单，用于解决小米米家、Apple 推送通知等证书严格校验服务的冲突。 |

---

## 💡 适用场景与收益

- **流媒体解锁**：Netflix、Disney+ 经常使用动态纯 IP CDN，开启嗅探可确保所有 CDN 流量均精准命中流媒体解锁节点；
- **游戏客户端分流**：Steam、Epic、Riot 启动器中的内嵌 Web 视图可被准确识别；
- **防分流逃逸**：防止软件通过硬编码 IP 绕过代理规则。
