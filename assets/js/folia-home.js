/**
 * Wmimo Homepage Interactive Controller (folia-home.js)
 * Powers the Interactive Client Workbench Preview, Live Traffic Canvas,
 * Routing Topology Simulator, System Tray Shell Copy, and TUN Compare Slider.
 */

(function() {
  'use strict';

  function getLang() {
    if (window.WmimoI18n && typeof window.WmimoI18n.getCurrentLang === 'function') {
      return window.WmimoI18n.getCurrentLang();
    }
    return document.documentElement.getAttribute('data-lang') || 'zh';
  }

  // =========================================================================
  // 1. INTERACTIVE CLIENT WORKBENCH TABS, MODES & NODE SELECTION
  // =========================================================================
  let baseDownMB = 48.6;
  let baseUpMB = 11.4;
  let isTunActive = true;

  function initClientWorkbench() {
    // Sidebar View Tabs
    const navBtns = document.querySelectorAll('.client-nav-btn');
    const viewPanes = document.querySelectorAll('.client-view-pane');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');
        navBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        viewPanes.forEach(pane => {
          pane.classList.toggle('is-active', pane.id === `view-${targetView}`);
        });
      });
    });

    // Mode Segmented Control (Rule / Global / Direct)
    const modeBtns = document.querySelectorAll('.mode-seg-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        const mode = btn.getAttribute('data-mode');
        if (mode === 'direct') {
          baseDownMB = 18.2;
          baseUpMB = 4.5;
        } else if (mode === 'global') {
          baseDownMB = 54.8;
          baseUpMB = 14.2;
        } else {
          baseDownMB = 48.6;
          baseUpMB = 11.4;
        }
        updateLiveTelemetryNumbers();
      });
    });

    // TUN Live Toggle
    const tunBtn = document.getElementById('mockTunToggle');
    if (tunBtn) {
      tunBtn.addEventListener('click', () => {
        isTunActive = !isTunActive;
        tunBtn.classList.toggle('is-active', isTunActive);
        updateTunButtonText();
      });
    }

    // Node Selection
    const nodeItems = document.querySelectorAll('.mock-node-item');
    const sidebarNodeName = document.getElementById('sidebarActiveNodeName');
    const sidebarProto = document.getElementById('sidebarActiveProto');
    const sidebarPing = document.getElementById('sidebarActivePing');

    nodeItems.forEach(item => {
      item.addEventListener('click', () => {
        nodeItems.forEach(n => n.classList.remove('is-selected'));
        item.classList.add('is-selected');

        const nodeName = item.getAttribute('data-node');
        const proto = item.getAttribute('data-proto');
        const ping = item.getAttribute('data-ping');
        const dl = parseFloat(item.getAttribute('data-dl')) || 45.0;
        const ul = parseFloat(item.getAttribute('data-ul')) || 10.5;

        baseDownMB = dl;
        baseUpMB = ul;

        if (sidebarNodeName && nodeName) sidebarNodeName.textContent = nodeName;
        if (sidebarProto && proto) sidebarProto.textContent = proto;
        if (sidebarPing && ping) sidebarPing.textContent = `${ping} ms`;

        updateLiveTelemetryNumbers();
      });
    });

    // One-Click Latency Benchmark Button
    const retestBtn = document.getElementById('mockRetestBtn');
    if (retestBtn) {
      retestBtn.addEventListener('click', () => {
        const isEn = getLang() === 'en';
        retestBtn.textContent = isEn ? '⚡ Testing...' : '⚡ 测速中...';
        nodeItems.forEach(item => {
          const badge = item.querySelector('.mock-node-ping');
          const basePing = parseInt(item.getAttribute('data-ping') || '25', 10);
          if (badge) {
            badge.textContent = '...';
            setTimeout(() => {
              const jittered = Math.max(10, basePing + Math.floor((Math.random() - 0.5) * 8));
              badge.textContent = `${jittered} ms`;
              if (item.classList.contains('is-selected') && sidebarPing) {
                sidebarPing.textContent = `${jittered} ms`;
              }
            }, 260 + Math.random() * 260);
          }
        });
        setTimeout(() => {
          retestBtn.textContent = getLang() === 'en' ? '⚡ Benchmark' : '⚡ 一键测速';
        }, 620);
      });
    }

    // Topology Packet Simulator Button
    const simPacketBtn = document.getElementById('mockSimulatePacketBtn');
    const routingTable = document.getElementById('mockRoutingTable');
    if (simPacketBtn && routingTable) {
      const sampleFlows = [
        { proto: 'QUIC/443', target: 'claude.ai (SNI Sniffed)', rule: 'GEOSITE: anthropic', out: '🚀 香港 IEPL 专线 01 (16ms)', type: 'proxy' },
        { proto: 'TCP/443', target: 'registry-1.docker.io', rule: 'RULE-SET: developer', out: '🇯🇵 日本 东京 Anycast 02 (32ms)', type: 'proxy' },
        { proto: 'UDP/3478', target: 'discord.exe → voice.discord.media', rule: 'PROCESS-NAME: discord.exe', out: '🇸🇬 新加坡 CN2 GIA 01 (Full Cone)', type: 'proxy' },
        { proto: 'TCP/443', target: 'music.163.com', rule: 'GEOIP: CN', out: '⚡ DIRECT 本地物理网卡直连', type: 'direct' },
        { proto: 'TCP/443', target: 'huggingface.co', rule: 'GEOSITE: ai-hub', out: '🇺🇸 美西 圣何塞 BGP 03 (114ms)', type: 'proxy' }
      ];
      let flowIdx = 0;

      simPacketBtn.addEventListener('click', () => {
        const sample = sampleFlows[flowIdx % sampleFlows.length];
        flowIdx++;

        const row = document.createElement('div');
        row.className = 'topo-log-row';
        row.innerHTML = `
          <span class="log-proto">${sample.proto}</span>
          <span class="log-target">${sample.target}</span>
          <span class="log-rule">${sample.rule}</span>
          <span class="log-out ${sample.type}">${sample.out}</span>
        `;
        routingTable.prepend(row);
        while (routingTable.children.length > 4) {
          routingTable.removeChild(routingTable.lastElementChild);
        }
      });
    }
  }

  function updateTunButtonText() {
    const tunBtn = document.getElementById('mockTunToggle');
    if (!tunBtn) return;
    const labelSpan = tunBtn.querySelector('span:last-child');
    if (!labelSpan) return;
    const isEn = getLang() === 'en';
    if (isTunActive) {
      labelSpan.textContent = isEn ? 'TUN Adapter: ON' : 'TUN 虚拟网卡: 已开启';
    } else {
      labelSpan.textContent = isEn ? 'TUN Adapter: OFF' : 'TUN 虚拟网卡: 已关闭';
    }
  }

  function updateLiveTelemetryNumbers() {
    const dlEl = document.getElementById('mockDownSpeed');
    const ulEl = document.getElementById('mockUpSpeed');
    const connEl = document.getElementById('mockConnCount');

    const dlJitter = (baseDownMB + (Math.random() - 0.5) * 3.4).toFixed(1);
    const ulJitter = (baseUpMB + (Math.random() - 0.5) * 1.2).toFixed(1);
    const conns = 58 + Math.floor(Math.random() * 18);

    if (dlEl) dlEl.innerHTML = `${dlJitter} <small>MB/s</small>`;
    if (ulEl) ulEl.innerHTML = `${ulJitter} <small>MB/s</small>`;
    if (connEl) connEl.innerHTML = `${conns} <small>Conns</small>`;
  }

  // =========================================================================
  // 2. LIVE TRAFFIC SPARKLINE CANVAS (#homeTrafficCanvas)
  // =========================================================================
  function initTrafficCanvas() {
    const canvas = document.getElementById('homeTrafficCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MAX_POINTS = 32;
    const dlHistory = [];
    const ulHistory = [];

    for (let i = 0; i < MAX_POINTS; i++) {
      dlHistory.push(42 + Math.sin(i * 0.35) * 10 + Math.random() * 5);
      ulHistory.push(11 + Math.cos(i * 0.3) * 3 + Math.random() * 2);
    }

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(260, Math.floor(rect.width));
      const h = 145;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawTraffic(w, h);
    }

    function drawCurve(points, w, h, maxVal, strokeColor, fillTop, fillBottom) {
      if (points.length < 2) return;
      const padY = 12;
      const plotH = h - padY * 2;
      const stepX = w / (MAX_POINTS - 1);

      const coords = points.map((v, i) => ({
        x: i * stepX,
        y: padY + plotH * (1 - Math.min(1, Math.max(0, v / maxVal)))
      }));

      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      for (let i = 0; i < coords.length - 1; i++) {
        const xc = (coords[i].x + coords[i + 1].x) / 2;
        const yc = (coords[i].y + coords[i + 1].y) / 2;
        ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
      }
      const last = coords[coords.length - 1];
      ctx.lineTo(last.x, last.y);

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Fill area
      ctx.lineTo(last.x, h);
      ctx.lineTo(coords[0].x, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, fillTop);
      grad.addColorStop(1, fillBottom);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function drawTraffic(w, h) {
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // Subtle horizontal grid lines
      ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        const y = Math.round((h / 4) * r) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const maxScale = 75;
      drawCurve(
        ulHistory,
        w,
        h,
        maxScale,
        '#A855F7',
        isLight ? 'rgba(168, 85, 247, 0.22)' : 'rgba(168, 85, 247, 0.26)',
        'rgba(168, 85, 247, 0.0)'
      );
      drawCurve(
        dlHistory,
        w,
        h,
        maxScale,
        isLight ? '#0284C7' : '#00DAF5',
        isLight ? 'rgba(2, 132, 199, 0.24)' : 'rgba(0, 218, 245, 0.30)',
        'rgba(0, 218, 245, 0.0)'
      );
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setInterval(() => {
      if (document.hidden) return;
      const nextDl = Math.max(8, baseDownMB + Math.sin(Date.now() / 650) * 6 + (Math.random() - 0.5) * 5);
      const nextUl = Math.max(2, baseUpMB + Math.cos(Date.now() / 800) * 2.5 + (Math.random() - 0.5) * 2);
      dlHistory.push(nextDl);
      ulHistory.push(nextUl);
      if (dlHistory.length > MAX_POINTS) dlHistory.shift();
      if (ulHistory.length > MAX_POINTS) ulHistory.shift();

      const rect = canvas.parentElement.getBoundingClientRect();
      drawTraffic(Math.max(260, Math.floor(rect.width)), 145);
      updateLiveTelemetryNumbers();
    }, 1100);
  }

  // =========================================================================
  // 3. SYSTEM TRAY SHELL PROXY COPY INTERACTION
  // =========================================================================
  function initTrayCopyButton() {
    const copyBtn = document.getElementById('homeCopyEnvBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      const cmd = 'export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cmd).catch(() => {});
      }
      const isEn = getLang() === 'en';
      const msg = isEn
        ? 'Copied terminal proxy command: export https_proxy=http://127.0.0.1:7890'
        : '已复制终端代理指令: export https_proxy=http://127.0.0.1:7890';
      if (typeof window.showToast === 'function') {
        window.showToast(msg, 'success');
      }
    });
  }

  // =========================================================================
  // 4. INTERACTIVE TUN VS DIRECT COMPARISON SLIDER
  // =========================================================================
  function initTunCompareSlider() {
    const compareCard = document.getElementById('themeCompareCard');
    const compareOverlay = document.getElementById('themeCompareOverlay');
    const compareDivider = document.getElementById('themeCompareDivider');

    if (!compareCard || !compareOverlay || !compareDivider) return;

    let isDragging = false;
    let currentPct = 52;

    function setSliderPct(pct) {
      currentPct = Math.max(8, Math.min(92, pct));
      compareOverlay.style.clipPath = `inset(0 ${(100 - currentPct).toFixed(2)}% 0 0)`;
      compareDivider.style.left = `${currentPct.toFixed(2)}%`;
      compareDivider.setAttribute('aria-valuenow', String(Math.round(currentPct)));
    }

    function updateFromClientX(clientX) {
      const rect = compareCard.getBoundingClientRect();
      if (!rect.width) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setSliderPct(pct);
    }

    compareCard.addEventListener('pointerdown', (e) => {
      isDragging = true;
      updateFromClientX(e.clientX);
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      updateFromClientX(e.clientX);
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
    });

    compareDivider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSliderPct(currentPct - 5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSliderPct(currentPct + 5);
      }
    });

    setSliderPct(52);
  }

  // =========================================================================
  // INITIALIZE ALL
  // =========================================================================
  function init() {
    initClientWorkbench();
    initTrafficCanvas();
    initTrayCopyButton();
    initTunCompareSlider();

    window.addEventListener('wmimo-lang-change', () => {
      updateTunButtonText();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
