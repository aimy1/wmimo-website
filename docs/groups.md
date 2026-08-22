# 策略组实战：延迟优选、自动容灾与负载均衡

策略组（Proxy Groups）是代理规则体系的核心调度大脑。Wmimo 支持通过定义不同类型的策略组，实现**自动寻找最低延迟节点**、**主备节点无缝故障转移**以及**多节点并发负载均衡**。

---

## 🔀 常用策略组类型横向对比

| 策略组类型 | 调度算法 | 核心机制 | 最佳应用场景 |
| :--- | :--- | :--- | :--- |
| **`select`** | 手动选择 | 用户在界面或托盘手动点选当前出站节点 | 通用日常主力节点、指定地区出口 |
| **`url-test`** | 自动测速优选 | 后台定时向目标 URL 发起测速，永远选用延迟最低的节点 | 网页浏览、追求极致即时响应 |
| **`fallback`** | 自动故障容灾 | 按列表顺序使用第一个可用节点，当前节点故障时顺位切换 | 长期挂机、爬虫脚本、不允许频繁切 IP 的办公 |
| **`load-balance`** | 负载均衡 | 按照散列算法（`consistent-hashing`）或轮询将流量分流到多个节点 | 多连接大文件高速并发下载、PT下载 |
| **`relay`** | 链式多跳代理 | 数据包按顺序经过前置机 A -> 落地机 B -> 目标网站 | 国内中转加速、高级隐私防护 |

---

## 🛠️ 标准策略组 YAML 配置示例

```yaml
proxy-groups:
  # 1. 手动主选择组
  - name: 🎯 节点选择
    type: select
    proxies:
      - ⚡ 自动优选
      - 🛡️ 故障转移
      - 🚀 香港 01
      - 🚀 日本 01
      - 🚀 美国 01
      - DIRECT

  # 2. 延迟最低自动优选 (url-test)
  - name: ⚡ 自动优选
    type: url-test
    url: https://cp.cloudflare.com/generate_204
    interval: 300       # 每 300 秒后台测速一次
    tolerance: 50       # 容差 50ms（避免微小延迟波动导致频繁切节点）
    proxies:
      - 🚀 香港 01
      - 🚀 日本 01
      - 🚀 新加坡 01

  # 3. 自动故障转移主备组 (fallback)
  - name: 🛡️ 故障转移
    type: fallback
    url: https://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
      - 🚀 香港 01      # 默认优先主力节点
      - 🚀 日本 01      # 第一备用节点
      - 🚀 美国 01      # 第二备用兜底节点

  # 4. 负载均衡组 (load-balance)
  - name: ⚖️ 负载均衡
    type: load-balance
    strategy: consistent-hashing   # 一致性哈希，确保同一目标站点走同一节点
    url: https://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
      - 🚀 香港 01
      - 🚀 香港 02
      - 🚀 香港 03
```

---

## 💡 生产环境避坑建议

1. **测速目标 URL 建议**：
   - 推荐使用轻量级、全球 Anycast CDN 节点：`https://cp.cloudflare.com/generate_204` 或 `http://www.gstatic.com/generate_204`；
   - 避免使用含有重定向的大网页，以免消耗过多测速流量。
2. **容差设置 (`tolerance`)**：
   - 在 `url-test` 中建议设置 `tolerance: 50`。如果两个节点延迟相差小于 50ms，核心不会频繁切换节点，有效避免网页 TCP 会话中断。
