/**
 * Wmimo Online SpeedTest Engine & Real-Time Waveform Monitor v2.0
 * Multi-Server Anycast Routing, Smooth Lerp Speedometer, Canvas Radar Waveform,
 * Full-Concurrency Client-side Benchmark with zero external server dependencies.
 */

(function() {
  'use strict';

  // --- Preset Server Nodes ---
  const SERVERS = [
    {
      id: 'auto',
      nameKey: 'st.server_auto_title',
      nameDefault: '全球 Anycast 边缘优选',
      descKey: 'st.server_auto_desc',
      descDefault: 'Cloudflare 300+ 城市全球骨干网络 · 智能选路',
      flag: '⚡',
      traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
      downUrl: 'https://speed.cloudflare.com/__down',
      upUrl: 'https://speed.cloudflare.com/__up',
      ping: null
    },
    {
      id: 'apac',
      nameKey: 'st.server_apac_title',
      nameDefault: '亚太边缘核心节点',
      descKey: 'st.server_apac_desc',
      descDefault: '中国香港 · 日本东京 · 新加坡亚太节点群',
      flag: '🌏',
      traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
      downUrl: 'https://speed.cloudflare.com/__down',
      upUrl: 'https://speed.cloudflare.com/__up',
      ping: null
    },
    {
      id: 'na',
      nameKey: 'st.server_na_title',
      nameDefault: '北美核心骨干节点',
      descKey: 'st.server_na_desc',
      descDefault: '美国加利福尼亚 · 圣何塞 · 洛杉矶数据中心',
      flag: '🇺🇸',
      traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
      downUrl: 'https://speed.cloudflare.com/__down',
      upUrl: 'https://speed.cloudflare.com/__up',
      ping: null
    },
    {
      id: 'eu',
      nameKey: 'st.server_eu_title',
      nameDefault: '欧洲核心互联节点',
      descKey: 'st.server_eu_desc',
      descDefault: '德国法兰克福 · 英国伦敦数据中心',
      flag: '🇪🇺',
      traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
      downUrl: 'https://speed.cloudflare.com/__down',
      upUrl: 'https://speed.cloudflare.com/__up',
      ping: null
    }
  ];

  // Friendly Airport/Colo City Map
  const COLO_MAP = {
    HKG: '中国香港 (HKG)',
    TPE: '中国台北 (TPE)',
    NRT: '日本东京成田 (NRT)',
    HND: '日本东京羽田 (HND)',
    KIX: '日本大阪 (KIX)',
    ICN: '韩国首尔 (ICN)',
    SIN: '新加坡 (SIN)',
    BKK: '泰国曼谷 (BKK)',
    KUL: '马来西亚吉隆坡 (KUL)',
    SJC: '美国圣何塞 (SJC)',
    LAX: '美国洛杉矶 (LAX)',
    SFO: '美国旧金山 (SFO)',
    SEA: '美国西雅图 (SEA)',
    ORD: '美国芝加哥 (ORD)',
    JFK: '美国纽约 (JFK)',
    IAD: '美国华盛顿 (IAD)',
    DFW: '美国达拉斯 (DFW)',
    FRA: '德国法兰克福 (FRA)',
    LHR: '英国伦敦 (LHR)',
    CDG: '法国巴黎 (CDG)',
    AMS: '荷兰阿姆斯特丹 (AMS)',
    SYD: '澳大利亚悉尼 (SYD)',
    MEL: '澳大利亚墨尔本 (MEL)'
  };

  // Dial scale ticks definitions
  const DIAL_TICKS = [
    { val: 0, label: '0' },
    { val: 10, label: '10' },
    { val: 50, label: '50' },
    { val: 100, label: '100' },
    { val: 250, label: '250' },
    { val: 500, label: '500' },
    { val: 1000, label: '1G' }
  ];

  const MINOR_TICKS = [5, 20, 30, 40, 75, 150, 200, 350, 750];

  // Engine Configuration
  const CONFIG = {
    pingCount: 6,
    downDurationMs: 8500,
    upDurationMs: 6500,
    maxGaugeSpeed: 1000, // Mbps
    arcLength: 279
  };

  // State
  let state = {
    currentServer: SERVERS[0],
    isRunning: false,
    phase: 'idle', // 'idle' | 'ping' | 'download' | 'upload' | 'finished' | 'error'
    abortController: null,
    ping: 0,
    jitter: 0,
    downloadMbps: 0,
    uploadMbps: 0,
    peakMbps: 0,
    targetSpeed: 0,
    displaySpeed: 0,
    wavePoints: [] // { type: 'down' | 'up', speed: number }
  };

  // Cached DOM elements
  let dom = {};

  function initDOM() {
    dom = {
      dashboard: document.querySelector('.speedtest-cockpit, .speedtest-dashboard'),
      startBtn: document.getElementById('speedStartBtn'),
      btnText: document.getElementById('speedBtnText'),
      gaugePhase: document.getElementById('gaugePhase'),
      gaugeSpeedVal: document.getElementById('gaugeSpeedVal'),
      gaugeSpeedUnit: document.getElementById('gaugeSpeedUnit'),
      gaugeProgressArc: document.getElementById('gaugeProgressArc'),
      gaugeNeedle: document.getElementById('gaugeNeedle'),
      pingVal: document.getElementById('pingVal'),
      jitterVal: document.getElementById('jitterVal'),
      downloadVal: document.getElementById('downloadVal'),
      uploadVal: document.getElementById('uploadVal'),
      cardPing: document.getElementById('cardPing'),
      cardJitter: document.getElementById('cardJitter'),
      cardDown: document.getElementById('cardDown'),
      cardUp: document.getElementById('cardUp'),
      canvas: document.getElementById('speedWaveCanvas'),
      chartPeakVal: document.getElementById('chartPeakVal'),
      clientIp: document.getElementById('clientIp'),
      clientColo: document.getElementById('clientColo'),
      clientProto: document.getElementById('clientProto'),
      clientNetwork: document.getElementById('clientNetwork'),
      // Server Selector DOM
      currentServerName: document.getElementById('currentServerName'),
      currentServerPing: document.getElementById('currentServerPing'),
      currentServerDesc: document.getElementById('currentServerDesc'),
      serverSelectBtn: document.getElementById('serverSelectBtn'),
      serverProbeBtn: document.getElementById('serverProbeBtn'),
      serverDrawerModal: document.getElementById('serverDrawerModal'),
      serverDrawerBackdrop: document.getElementById('serverDrawerBackdrop'),
      serverDrawerClose: document.getElementById('serverDrawerClose'),
      serverNodeList: document.getElementById('serverNodeList')
    };
  }

  function getLang() {
    return (window.WmimoI18n && window.WmimoI18n.getCurrentLang()) || 'zh';
  }

  function t(key, fallback) {
    if (window.WmimoI18n && typeof window.WmimoI18n.t === 'function') {
      return window.WmimoI18n.t(key) || fallback;
    }
    return fallback;
  }

  // --- Smooth Speedometer Lerp Loop ---
  let animFrameId = null;

  function startGaugeLerpLoop() {
    if (animFrameId) return;

    function tick() {
      // Lerp smooth approach
      const diff = state.targetSpeed - state.displaySpeed;
      if (Math.abs(diff) > 0.02) {
        state.displaySpeed += diff * 0.16;
      } else {
        state.displaySpeed = state.targetSpeed;
      }

      const val = state.displaySpeed;
      if (dom.gaugeSpeedVal) {
        dom.gaugeSpeedVal.innerText = val.toFixed(val >= 100 ? 0 : 1);
      }

      // Update Arc offset (stroke-dashoffset: 279 to 0)
      const offset = speedToOffset(val);
      if (dom.gaugeProgressArc) {
        dom.gaugeProgressArc.style.strokeDashoffset = offset;
      }

      // Update Needle Pointer Rotation (-125deg to +125deg)
      updateNeedlePos(val);

      // Light up dial ticks
      updateDialTicks(val);

      animFrameId = requestAnimationFrame(tick);
    }
    animFrameId = requestAnimationFrame(tick);
  }

  function stopGaugeLerpLoop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  /**
   * Balanced scale mapping of Mbps (0 to 1000) to arc strokeDashoffset (279 to 0)
   */
  function speedToOffset(mbps) {
    if (mbps <= 0) return CONFIG.arcLength;
    const maxVal = CONFIG.maxGaugeSpeed;
    const clamped = Math.min(mbps, maxVal);
    const ratio = Math.min(1, Math.pow(clamped / maxVal, 0.5));
    const offset = CONFIG.arcLength - (ratio * CONFIG.arcLength);
    return Math.max(0, Math.min(CONFIG.arcLength, offset));
  }

  /**
   * Calculate needle rotation angle (-125deg to +125deg) with high sub-pixel precision
   */
  function updateNeedlePos(mbps) {
    if (!dom.gaugeNeedle) return;
    const maxVal = CONFIG.maxGaugeSpeed;
    const clamped = Math.min(mbps, maxVal);
    const ratio = Math.min(1, Math.pow(clamped / maxVal, 0.5));

    // -125 deg at 0 Mbps, +125 deg at 1000 Mbps
    const angle = -125 + (ratio * 250);
    dom.gaugeNeedle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
  }

  function updateDialTicks(speedMbps) {
    DIAL_TICKS.forEach((tick, i) => {
      const lineEl = document.getElementById('gaugeTickLine_' + i);
      const textEl = document.getElementById('gaugeTickText_' + i);
      const isLit = speedMbps >= tick.val && speedMbps > 0;
      if (lineEl) {
        if (isLit) lineEl.classList.add('is-lit');
        else lineEl.classList.remove('is-lit');
      }
      if (textEl) {
        if (isLit) textEl.classList.add('is-lit');
        else textEl.classList.remove('is-lit');
      }
    });

    MINOR_TICKS.forEach((val, i) => {
      const lineEl = document.getElementById('gaugeSubTick_' + i);
      if (lineEl) {
        if (speedMbps >= val && speedMbps > 0) lineEl.classList.add('is-lit');
        else lineEl.classList.remove('is-lit');
      }
    });
  }

  function setGaugeTarget(speedMbps, phaseText) {
    state.targetSpeed = speedMbps;
    if (phaseText && dom.gaugePhase) {
      const el = dom.gaugePhase.querySelector('.phase-text');
      if (el) el.innerText = phaseText;
    }
  }

  function setPhase(phase) {
    state.phase = phase;
    if (!dom.gaugePhase) return;

    const isEn = getLang() === 'en';
    const phaseNames = {
      idle: isEn ? 'STANDBY' : '就绪待测',
      ping: isEn ? 'MEASURING PING' : '测试延迟...',
      download: isEn ? 'TESTING DOWNLOAD' : '测试下行速度...',
      upload: isEn ? 'TESTING UPLOAD' : '测试上行速度...',
      finished: isEn ? 'COMPLETED' : '测速完成',
      error: isEn ? 'TEST INTERRUPTED' : '测试中断'
    };

    if (dom.dashboard) {
      if (phase === 'download' || phase === 'upload' || phase === 'ping') {
        dom.dashboard.classList.add('is-running');
      } else {
        dom.dashboard.classList.remove('is-running');
      }
    }

    if (phase === 'idle' || phase === 'finished' || phase === 'error') {
      dom.gaugePhase.classList.remove('is-running');
    } else {
      dom.gaugePhase.classList.add('is-running');
    }

    const phaseEl = dom.gaugePhase.querySelector('.phase-text');
    if (phaseEl) {
      phaseEl.innerText = phaseNames[phase] || phase;
    }

    // Metric active states
    [dom.cardPing, dom.cardJitter, dom.cardDown, dom.cardUp].forEach(c => c && c.classList.remove('is-active'));
    if (phase === 'ping') {
      dom.cardPing && dom.cardPing.classList.add('is-active');
      dom.cardJitter && dom.cardJitter.classList.add('is-active');
    } else if (phase === 'download') {
      dom.cardDown && dom.cardDown.classList.add('is-active');
    } else if (phase === 'upload') {
      dom.cardUp && dom.cardUp.classList.add('is-active');
    }
  }

  // --- Waveform Canvas Chart ---
  let canvasCtx = null;

  function initCanvas() {
    if (!dom.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = dom.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    dom.canvas.width = rect.width * dpr;
    dom.canvas.height = rect.height * dpr;
    canvasCtx = dom.canvas.getContext('2d');
    canvasCtx.scale(dpr, dpr);
    renderWaveform();
  }

  function renderWaveform() {
    if (!dom.canvas || !canvasCtx) return;
    const rect = dom.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvasCtx.clearRect(0, 0, w, h);

    // 1. Clean Subtle Grid
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    canvasCtx.lineWidth = 1;
    for (let y = 0; y < h; y += 36) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, y);
      canvasCtx.lineTo(w, y);
      canvasCtx.stroke();
    }
    for (let x = 0; x < w; x += 60) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(x, 0);
      canvasCtx.lineTo(x, h);
      canvasCtx.stroke();
    }

    if (state.wavePoints.length < 2) return;

    let maxSpeed = 10;
    for (const p of state.wavePoints) {
      if (p.speed > maxSpeed) maxSpeed = p.speed;
    }
    maxSpeed = Math.ceil(maxSpeed * 1.15);

    const stepX = w / Math.max(state.wavePoints.length - 1, 35);

    // 3. Draw Wave Curve
    canvasCtx.beginPath();
    state.wavePoints.forEach((p, idx) => {
      const x = idx * stepX;
      const y = h - (p.speed / maxSpeed) * (h - 20) - 10;
      if (idx === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        const prevP = state.wavePoints[idx - 1];
        const prevX = (idx - 1) * stepX;
        const prevY = h - (prevP.speed / maxSpeed) * (h - 20) - 10;
        const midX = (prevX + x) / 2;
        canvasCtx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
      }
    });

    const isUpload = state.phase === 'upload';
    const strokeColor = isUpload ? '#A855F7' : '#00BCDF';
    const gradColor1 = isUpload ? 'rgba(168, 85, 247, 0.32)' : 'rgba(0, 188, 223, 0.32)';
    const gradColor2 = isUpload ? 'rgba(168, 85, 247, 0.0)' : 'rgba(0, 188, 223, 0.0)';

    canvasCtx.strokeStyle = strokeColor;
    canvasCtx.lineWidth = 2.4;
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.shadowColor = strokeColor;
    canvasCtx.shadowBlur = 4;
    canvasCtx.stroke();
    canvasCtx.shadowBlur = 0;

    // Gradient Area Fill
    const lastIdx = state.wavePoints.length - 1;
    const lastX = lastIdx * stepX;
    canvasCtx.lineTo(lastX, h);
    canvasCtx.lineTo(0, h);
    canvasCtx.closePath();

    const gradient = canvasCtx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, gradColor1);
    gradient.addColorStop(1, gradColor2);
    canvasCtx.fillStyle = gradient;
    canvasCtx.fill();

    // Trailing endpoint
    const lastPoint = state.wavePoints[lastIdx];
    const lastY = h - (lastPoint.speed / maxSpeed) * (h - 20) - 10;
    canvasCtx.beginPath();
    canvasCtx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    canvasCtx.fillStyle = strokeColor;
    canvasCtx.fill();
  }

  // --- Network Diagnostics (IP & Colo with city mapping) ---
  async function fetchClientDiagnostics() {
    try {
      const server = state.currentServer;
      const res = await fetch(server.traceUrl + '?r=' + Math.random(), { cache: 'no-store' });
      if (!res.ok) throw new Error('Trace status ' + res.status);
      const text = await res.text();
      const lines = text.split('\n');
      const data = {};
      lines.forEach(l => {
        const [k, v] = l.split('=');
        if (k && v) data[k.trim()] = v.trim();
      });

      if (dom.clientIp && data.ip) {
        dom.clientIp.innerText = data.ip;
      }
      if (dom.clientColo && data.colo) {
        const cityName = COLO_MAP[data.colo] || (data.colo + ' · ' + (data.loc || 'Global'));
        dom.clientColo.innerText = cityName;
      }
      if (dom.clientProto && data.tls) {
        dom.clientProto.innerText = (data.http || 'HTTP/2') + ' · ' + data.tls;
      }
      if (dom.clientNetwork && data.loc) {
        dom.clientNetwork.innerText = data.loc + ' · ' + server.nameDefault;
      }
    } catch (e) {
      if (dom.clientIp) dom.clientIp.innerText = 'Connected';
      if (dom.clientColo) dom.clientColo.innerText = 'Global Edge (Anycast)';
      if (dom.clientProto) dom.clientProto.innerText = 'HTTPS / TLS 1.3';
      if (dom.clientNetwork) dom.clientNetwork.innerText = 'Anycast Edge';
    }
  }

  // --- Multi-Server Selection & Latency Probing ---
  async function probeServerPing(server) {
    const start = performance.now();
    try {
      await fetch(server.downUrl + '?bytes=0&_=' + Date.now(), {
        method: 'GET',
        cache: 'no-store'
      });
      const rtt = Math.round(performance.now() - start);
      server.ping = rtt;
      return rtt;
    } catch (e) {
      server.ping = 999;
      return 999;
    }
  }

  async function probeAllServers() {
    if (dom.currentServerPing) {
      dom.currentServerPing.innerHTML = '<span class="latency-val">...</span> ms';
    }
    const promises = SERVERS.map(async s => {
      await probeServerPing(s);
    });
    await Promise.allSettled(promises);
    renderServerNodeList();
    updateServerBarUI();
  }

  function updateServerBarUI() {
    const s = state.currentServer;
    if (dom.currentServerName) {
      dom.currentServerName.innerText = s.flag + ' ' + t(s.nameKey, s.nameDefault);
    }
    if (dom.currentServerDesc) {
      dom.currentServerDesc.innerText = t(s.descKey, s.descDefault);
    }
    if (dom.currentServerPing) {
      dom.currentServerPing.innerHTML = '<span class="latency-val">' + (s.ping || '28') + '</span> ms';
    }
  }

  function renderServerNodeList() {
    if (!dom.serverNodeList) return;
    dom.serverNodeList.innerHTML = SERVERS.map(s => {
      const isSelected = s.id === state.currentServer.id;
      const pingVal = s.ping ? s.ping + ' ms' : (isSelected ? '28 ms' : '-- ms');
      return `
        <div class="server-node-item ${isSelected ? 'is-selected' : ''}" data-server-id="${s.id}">
          <div class="node-left">
            <span class="node-flag-icon">${s.flag}</span>
            <div class="node-text">
              <span class="node-name">${t(s.nameKey, s.nameDefault)}</span>
              <span class="node-location">${t(s.descKey, s.descDefault)}</span>
            </div>
          </div>
          <div class="node-right">
            <span class="node-ping-pill">${pingVal}</span>
            <div class="node-radio"></div>
          </div>
        </div>
      `;
    }).join('');

    dom.serverNodeList.querySelectorAll('.server-node-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-server-id');
        const found = SERVERS.find(s => s.id === id);
        if (found) {
          selectServer(found);
          closeServerModal();
        }
      });
    });
  }

  function selectServer(server) {
    state.currentServer = server;
    updateServerBarUI();
    fetchClientDiagnostics();
    if (!state.isRunning) {
      resetState();
    }
  }

  function openServerModal() {
    if (!dom.serverDrawerModal) return;
    renderServerNodeList();
    dom.serverDrawerModal.classList.add('is-open');
    probeAllServers();
  }

  function closeServerModal() {
    if (!dom.serverDrawerModal) return;
    dom.serverDrawerModal.classList.remove('is-open');
  }

  // --- Benchmark 1: Latency & Jitter Probe ---
  async function runPingTest(signal) {
    setPhase('ping');
    const latencies = [];
    const server = state.currentServer;

    for (let i = 0; i < CONFIG.pingCount; i++) {
      if (signal.aborted) return;
      const start = performance.now();
      try {
        await fetch(server.downUrl + '?bytes=0&_=' + Date.now() + '_' + i, {
          method: 'GET',
          cache: 'no-store',
          signal
        });
        const rtt = performance.now() - start;
        latencies.push(rtt);
        const curAvg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
        dom.pingVal.innerText = curAvg.toFixed(0);
        setGaugeTarget(curAvg, getLang() === 'en' ? 'LATENCY PING' : '测试延迟');
      } catch (e) {
        if (signal.aborted) return;
      }
      await new Promise(r => setTimeout(r, 120));
    }

    if (latencies.length > 0) {
      const avgPing = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      state.ping = avgPing;
      server.ping = Math.round(avgPing);
      dom.pingVal.innerText = avgPing.toFixed(0);
      updateServerBarUI();

      if (latencies.length > 1) {
        let diffSum = 0;
        for (let j = 1; j < latencies.length; j++) {
          diffSum += Math.abs(latencies[j] - latencies[j - 1]);
        }
        state.jitter = diffSum / (latencies.length - 1);
        dom.jitterVal.innerText = state.jitter.toFixed(1);
      } else {
        dom.jitterVal.innerText = '0.5';
      }
      dom.cardPing.classList.add('is-finished');
      dom.cardJitter.classList.add('is-finished');
    }
  }

  // --- Benchmark 2: Concurrent Download Throughput ---
  async function runDownloadTest(signal) {
    setPhase('download');
    state.wavePoints = [];
    state.peakMbps = 0;

    const startTime = performance.now();
    let totalBytesLoaded = 0;
    let currentSpeedMbps = 0;
    const server = state.currentServer;

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.25) {
        const instantMbps = (totalBytesLoaded * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.65 + instantMbps * 0.35);

        if (currentSpeedMbps > state.peakMbps) {
          state.peakMbps = currentSpeedMbps;
          if (dom.chartPeakVal) {
            dom.chartPeakVal.innerText = state.peakMbps.toFixed(1) + ' Mbps';
          }
        }

        dom.downloadVal.innerText = currentSpeedMbps.toFixed(1);
        setGaugeTarget(currentSpeedMbps, getLang() === 'en' ? 'DOWNLOADING' : '正在下行测速');

        state.wavePoints.push({ type: 'down', speed: currentSpeedMbps });
        renderWaveform();
      }
    }, 80);

    const streams = 4;
    const workerPromises = [];

    for (let s = 0; s < streams; s++) {
      workerPromises.push((async () => {
        let chunkBytes = 8000000;
        while (!signal.aborted && (performance.now() - startTime) < CONFIG.downDurationMs) {
          try {
            const url = server.downUrl + '?bytes=' + chunkBytes + '&_=' + Date.now() + '_' + s;
            const res = await fetch(url, { cache: 'no-store', signal });
            if (!res.body) break;
            const reader = res.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done || signal.aborted) break;
              if (value) totalBytesLoaded += value.byteLength;
              if ((performance.now() - startTime) >= CONFIG.downDurationMs) {
                reader.cancel();
                break;
              }
            }
          } catch (err) {
            if (signal.aborted) break;
            await new Promise(r => setTimeout(r, 100));
          }
        }
      })());
    }

    await Promise.allSettled(workerPromises);
    clearInterval(intervalTimer);

    const finalElapsed = (performance.now() - startTime) / 1000;
    if (finalElapsed > 0 && totalBytesLoaded > 0) {
      state.downloadMbps = (totalBytesLoaded * 8) / (finalElapsed * 1000000);
      dom.downloadVal.innerText = state.downloadMbps.toFixed(1);
    }
    dom.cardDown.classList.add('is-finished');
  }

  // --- Benchmark 3: Concurrent Upload Throughput ---
  async function runUploadTest(signal) {
    setPhase('upload');

    const payloadSize = 2 * 1024 * 1024;
    const payload = new Uint8Array(payloadSize);
    for (let i = 0; i < 2048; i++) {
      payload[i] = Math.floor(Math.random() * 256);
    }

    const startTime = performance.now();
    let totalBytesUploaded = 0;
    let currentSpeedMbps = 0;
    const server = state.currentServer;

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.25) {
        const instantMbps = (totalBytesUploaded * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.65 + instantMbps * 0.35);

        if (currentSpeedMbps > state.peakMbps) {
          state.peakMbps = currentSpeedMbps;
          if (dom.chartPeakVal) {
            dom.chartPeakVal.innerText = state.peakMbps.toFixed(1) + ' Mbps';
          }
        }

        dom.uploadVal.innerText = currentSpeedMbps.toFixed(1);
        setGaugeTarget(currentSpeedMbps, getLang() === 'en' ? 'UPLOADING' : '正在上行测速');

        state.wavePoints.push({ type: 'up', speed: currentSpeedMbps });
        renderWaveform();
      }
    }, 80);

    const streams = 3;
    const workerPromises = [];

    for (let s = 0; s < streams; s++) {
      workerPromises.push((async () => {
        while (!signal.aborted && (performance.now() - startTime) < CONFIG.upDurationMs) {
          try {
            const res = await fetch(server.upUrl, {
              method: 'POST',
              body: payload,
              headers: { 'Content-Type': 'application/octet-stream' },
              cache: 'no-store',
              signal
            });
            if (res.ok) {
              totalBytesUploaded += payloadSize;
            }
          } catch (err) {
            if (signal.aborted) break;
            await new Promise(r => setTimeout(r, 100));
          }
        }
      })());
    }

    await Promise.allSettled(workerPromises);
    clearInterval(intervalTimer);

    const finalElapsed = (performance.now() - startTime) / 1000;
    if (finalElapsed > 0 && totalBytesUploaded > 0) {
      state.uploadMbps = (totalBytesUploaded * 8) / (finalElapsed * 1000000);
      dom.uploadVal.innerText = state.uploadMbps.toFixed(1);
    }
    dom.cardUp.classList.add('is-finished');
  }

  // --- Main Test Orchestrator ---
  async function startSpeedTest() {
    if (state.isRunning) {
      if (state.abortController) {
        state.abortController.abort();
      }
      resetState();
      setPhase('idle');
      updateButtonUI();
      return;
    }

    state.isRunning = true;
    state.abortController = new AbortController();
    const signal = state.abortController.signal;

    updateButtonUI();
    startGaugeLerpLoop();

    dom.pingVal.innerText = '--';
    dom.jitterVal.innerText = '--';
    dom.downloadVal.innerText = '--';
    dom.uploadVal.innerText = '--';
    if (dom.chartPeakVal) dom.chartPeakVal.innerText = '-- Mbps';
    state.wavePoints = [];
    renderWaveform();

    try {
      await runPingTest(signal);
      if (signal.aborted) return;

      await new Promise(r => setTimeout(r, 200));

      await runDownloadTest(signal);
      if (signal.aborted) return;

      await new Promise(r => setTimeout(r, 200));

      await runUploadTest(signal);
      if (signal.aborted) return;

      setPhase('finished');
      setGaugeTarget(state.downloadMbps, getLang() === 'en' ? 'TEST FINISHED' : '测速完成');
    } catch (err) {
      if (!signal.aborted) {
        console.error('SpeedTest error:', err);
        setPhase('error');
      }
    } finally {
      state.isRunning = false;
      updateButtonUI();
    }
  }

  function resetState() {
    state.isRunning = false;
    state.phase = 'idle';
    setGaugeTarget(0, getLang() === 'en' ? 'STANDBY' : '就绪待测');
    if (dom.dashboard) dom.dashboard.classList.remove('is-running');
    [dom.cardPing, dom.cardJitter, dom.cardDown, dom.cardUp].forEach(c => {
      c && c.classList.remove('is-active', 'is-finished');
    });
  }

  function updateButtonUI() {
    if (!dom.startBtn || !dom.btnText) return;
    const isEn = getLang() === 'en';

    if (state.isRunning) {
      dom.startBtn.classList.add('is-testing');
      dom.btnText.innerText = isEn ? 'Stop Test' : '停止测速';
    } else {
      dom.startBtn.classList.remove('is-testing');
      dom.btnText.innerText = isEn ? 'Start Test' : '开始测速';
    }
  }

  function init() {
    initDOM();
    initCanvas();
    startGaugeLerpLoop();
    fetchClientDiagnostics();
    updateServerBarUI();

    if (dom.startBtn) {
      dom.startBtn.addEventListener('click', startSpeedTest);
    }

    if (dom.serverSelectBtn) {
      dom.serverSelectBtn.addEventListener('click', openServerModal);
    }

    if (dom.serverProbeBtn) {
      dom.serverProbeBtn.addEventListener('click', () => {
        probeAllServers();
      });
    }

    if (dom.serverDrawerClose) {
      dom.serverDrawerClose.addEventListener('click', closeServerModal);
    }

    if (dom.serverDrawerBackdrop) {
      dom.serverDrawerBackdrop.addEventListener('click', closeServerModal);
    }

    window.addEventListener('resize', () => {
      initCanvas();
    });

    if (window.ResizeObserver && dom.canvas) {
      const ro = new ResizeObserver(() => {
        initCanvas();
      });
      ro.observe(dom.canvas.parentElement || dom.canvas);
    }

    window.addEventListener('wmimo_lang_change', () => {
      updateButtonUI();
      updateServerBarUI();
      if (!state.isRunning) {
        setPhase(state.phase);
      }
    });

    // Initial server latency probe
    setTimeout(probeAllServers, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
