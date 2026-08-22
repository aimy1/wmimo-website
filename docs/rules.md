# 高级路由规则与进程级分流配置指南

Wmimo 依托 Mihomo 强大的规则引擎，支持域名后缀、IP 网段、Geo 数据库、远程规则集（Rule Provider）以及**本地系统进程名分流 (`PROCESS-NAME`)**。

---

## 🎯 规则匹配基本机制

1. **自上而下逐条匹配**：数据包到达时，核心会从 `rules` 列表的第一条开始逐项检查，一旦命中某条规则立即执行对应的策略组或动作，**不再继续向下匹配**；
2. **兜底规则 (`MATCH`)**：通常作为规则列表的最后一行，所有未被前方任何规则捕获的流量都将走此出站（如 `MATCH,🎯 节点选择` 或 `MATCH,DIRECT`）。

---

## 📋 常用规则类型对照表

| 规则类型 | 语法示例 | 说明 |
| :--- | :--- | :--- |
| **`DOMAIN-SUFFIX`** | `DOMAIN-SUFFIX,google.com,Proxy` | 匹配域名及其所有子域名（如 `mail.google.com`）。 |
| **`DOMAIN-KEYWORD`** | `DOMAIN-KEYWORD,github,Proxy` | 只要域名中包含该关键字即命中。 |
| **`DOMAIN`** | `DOMAIN,v2ex.com,Proxy` | 精确完整匹配该域名。 |
| **`GEOSITE`** | `GEOSITE,bilibili,DIRECT` | 基于 Mihomo GeoSite 标签库匹配。 |
| **`GEOIP`** | `GEOIP,CN,DIRECT` | 根据目标 IP 的物理地理位置归属匹配。 |
| **`IP-CIDR`** | `IP-CIDR,192.168.0.0/16,DIRECT,no-resolve` | IP 网段匹配，`no-resolve` 表示不触发域名反向解析。 |
| **`PROCESS-NAME`** | `PROCESS-NAME,steam.exe,DIRECT` | 匹配 Windows / Linux / macOS 发起请求的进程可执行文件名。 |
| **`RULE-SET`** | `RULE-SET,telegram,Proxy` | 引用 `rule-providers` 中定义的远程/本地规则集。 |
| **`MATCH`** | `MATCH,FinalProxy` | 最终兜底规则。 |

---

## 🎮 实战：针对应用进程专属分流 (`PROCESS-NAME`)

在 Windows 或 Linux 桌面端，您可以让特定游戏、下载工具或通讯软件走专属节点，无需关心其复杂的后台 CDN 域名：

```yaml
rules:
  # 游戏客户端直连或走低延迟专线
  - PROCESS-NAME,steam.exe,DIRECT
  - PROCESS-NAME,steamwebhelper.exe,DIRECT
  - PROCESS-NAME,epicgameslauncher.exe,DIRECT
  
  # Telegram 走专属代理组
  - PROCESS-NAME,telegram.exe,TelegramGroup
  - PROCESS-NAME,Telegram.exe,TelegramGroup
  
  # 局域网与国内直连
  - GEOIP,private,DIRECT,no-resolve
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  
  # 其余走默认代理
  - MATCH,Proxy
```

---

## 🧩 逻辑复合规则 (`AND`, `OR`, `NOT`)

Mihomo 允许将多个条件通过逻辑关系组合，实现极度精细的过滤控制：

```yaml
rules:
  # 仅当目标是 CN IP 且发往 80/443 端口时才直连
  - AND,((GEOIP,CN),(DST-PORT,443)),DIRECT
  
  # 排除特定域名的同时匹配网段
  - AND,((NOT,((DOMAIN,custom.direct.com))),(IP-CIDR,10.0.0.0/8)),Proxy
```

---

## 📦 远程规则集 (`rule-providers`)

为了保持主配置简洁，可使用 `rule-providers` 自动订阅社区维护的高性能规则包（支持 `.mrs` 二进制格式与 `.yaml` 格式）：

```yaml
rule-providers:
  reject:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt"
    path: ./ruleset/reject.yaml
    interval: 86400

  telegram:
    type: http
    behavior: ipcidr
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/telegramcidr.txt"
    path: ./ruleset/telegram.yaml
    interval: 86400

rules:
  - RULE-SET,reject,REJECT
  - RULE-SET,telegram,Proxy
  - MATCH,DIRECT
```
