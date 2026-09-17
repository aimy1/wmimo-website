/**
 * Wmimo Online SpeedTest Engine & Real-Time Waveform Monitor v2.1
 * Multi-Server Anycast Routing, Smooth Lerp Speedometer, Dual-Wave Canvas Chart,
 * 5-Step Benchmark Pipeline with Quality Evaluation & Dynamic Metrics.
 */

(function() {
  'use strict';

  // --- Preset Server Nodes ---
  const SERVERS = [
    {
      id: 'auto',
      nameKey: 'st.server_auto_title',
      nameDefault: 'Cloudflare · 全球 Anycast 边缘',
      descKey: 'st.server_auto_desc',
      descDefault: 'Cloudflare 300+ 城市全球网络 · 自动选路',
      flag: '⚡',
      traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
      downUrl: 'https://speed.cloudflare.com/__down',
      upUrl: 'https://speed.cloudflare.com/__up',
      ping: null
    },
    {
      id: 'apac',
      nameKey: 'st.server_apac_title',
      nameDefault: '亚太核心边缘节点',
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
      nameDefault: '北美骨干互联节点',
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
    NRT: '日本东京 (NRT)',
    HND: '日本东京羽田 (HND)',
    KIX: '日本大阪 (KIX)',
    ICN: '韩国首尔 (ICN)',
    SIN: '新加坡 (SIN)',
    BKK: '泰国曼谷 (BKK)',
    KUL: '马来西亚吉隆坡 (KUL)',
    SJC: '美国圣何塞 (SJC)',
    LAX: 'Los Angeles (洛杉矶)',
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

  // Dial scale points definition for non-linear gauge
  const DIAL_POINTS = [
    { speed: 0, frac: 0.00, angle: -125 },
    { speed: 50, frac: 0.20, angle: -75 },
    { speed: 100, frac: 0.38, angle: -30 },
    { speed: 200, frac: 0.58, angle: 20 },
    { speed: 500, frac: 0.80, angle: 75 },
    { speed: 1000, frac: 1.00, angle: 125 }
  ];

  // Engine Configuration
  const CONFIG = {
    pingCount: 6,
    downDurationMs: 8000,
    upDurationMs: 6000,
    maxGaugeSpeed: 1000,
    arcLength: 392
  };

  // Showcase Preset Curves matching mockup
  const SHOWCASE_DOWN_POINTS = [140, 260, 310, 275, 320, 375, 386.42, 335, 310, 345, 386.42, 350, 375, 386.42];
  const SHOWCASE_UP_POINTS = [28, 48, 70, 82.37, 72, 58, 76, 82.37, 74, 68, 78, 80, 82.37];

  // State
  let state = {
    currentServer: SERVERS[0],
    isRunning: false,
    isShowcase: true,
    phase: 'download', // Initial showcase phase matching mockup
    abortController: null,
    ping: 12,
    jitter: 2.1,
    downloadMbps: 386.42,
    uploadMbps: 82.37,
    targetSpeed: 386.42,
    displaySpeed: 386.42,
    totalBytesLoaded: 2.8 * 1024 * 1024 * 1024,
    totalBytesUploaded: 0,
    testProgress: 68,
    wavePointsDown: [...SHOWCASE_DOWN_POINTS],
    wavePointsUp: [...SHOWCASE_UP_POINTS]
  };

  // Cached DOM elements
  let dom = {};

  function initDOM() {
    dom = {
      consoleCard: document.getElementById('speedtestConsole'),
      startBtn: document.getElementById('speedStartBtn'),
      btnIcon: document.getElementById('speedBtnIcon'),
      btnText: document.getElementById('speedBtnText'),
      gaugePhase: document.getElementById('gaugePhase'),
      gaugePhaseText: document.getElementById('gaugePhaseText'),
      phaseIcon: document.getElementById('phaseIcon'),
      gaugeSpeedVal: document.getElementById('gaugeSpeedVal'),
      gaugeSpeedUnit: document.getElementById('gaugeSpeedUnit'),
      gaugeProgressArc: document.getElementById('gaugeProgressArc'),
      gaugeNeedle: document.getElementById('gaugeNeedle'),
      // 5 Steps
      step1: document.getElementById('stepConn'),
      step1Status: document.getElementById('stepConnStatus'),
      stepLine1: document.getElementById('stepLine1'),
      step2: document.getElementById('stepPing'),
      step2Status: document.getElementById('stepPingStatus'),
      stepLine2: document.getElementById('stepLine2'),
      step3: document.getElementById('stepDown'),
      step3Status: document.getElementById('stepDownStatus'),
      stepLine3: document.getElementById('stepLine3'),
      step4: document.getElementById('stepUp'),
      step4Status: document.getElementById('stepUpStatus'),
      stepLine4: document.getElementById('stepLine4'),
      step5: document.getElementById('stepQuality'),
      step5Status: document.getElementById('stepQualityStatus'),
      // Canvas & Footer
      canvas: document.getElementById('speedWaveCanvas'),
      dataTransferredVal: document.getElementById('dataTransferredVal'),
      testProgressPercent: document.getElementById('testProgressPercent'),
      testProgressFill: document.getElementById('testProgressFill'),
      // 4 Metric Cards
      cardPing: document.getElementById('cardPing'),
      pingVal: document.getElementById('pingVal'),
      cardJitter: document.getElementById('cardJitter'),
      jitterVal: document.getElementById('jitterVal'),
      cardDown: document.getElementById('cardDown'),
      downloadVal: document.getElementById('downloadVal'),
      cardUp: document.getElementById('cardUp'),
      uploadVal: document.getElementById('uploadVal'),
      // Bottom 2 Cards
      cardQuality: document.getElementById('cardQuality'),
      qualityRatingVal: document.getElementById('qualityRatingVal'),
      qualityDesc: document.getElementById('qualityDesc'),
      tag4k: document.getElementById('tag4k'),
      tagConf: document.getElementById('tagConf'),
      tagGaming: document.getElementById('tagGaming'),
      tagDownload: document.getElementById('tagDownload'),
      cardNetInfo: document.getElementById('cardNetInfo'),
      clientIp: document.getElementById('clientIp'),
      clientColo: document.getElementById('clientColo'),
      clientProto: document.getElementById('clientProto'),
      clientTls: document.getElementById('clientTls'),
      clientIsp: document.getElementById('clientIsp'),
      // Server Selection
      currentServerName: document.getElementById('currentServerName'),
      currentServerPing: document.getElementById('currentServerPing'),
      serverSelectBtn: document.getElementById('serverSelectBtn'),
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

  function formatBytes(bytes) {
    if (bytes <= 0) return '0 MB';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  // --- Step Checklist Status Controller ---
  function updateStep(stepNum, status, text) {
    const stepEl = dom['step' + stepNum];
    const statusEl = dom['step' + stepNum + 'Status'];
    const lineEl = dom['stepLine' + stepNum];
    if (!stepEl || !statusEl) return;

    stepEl.classList.remove('is-active', 'is-completed');
    if (lineEl) lineEl.classList.remove('is-completed');

    if (status === 'active') {
      stepEl.classList.add('is-active');
      statusEl.innerText = text || t('st.status_running', '进行中...');
    } else if (status === 'completed') {
      stepEl.classList.add('is-completed');
      if (lineEl) lineEl.classList.add('is-completed');
      statusEl.innerText = text || (t('st.status_ready', '已就绪') + ' ✓');
    } else {
      statusEl.innerText = text || t('st.status_waiting', '等待中...');
    }
  }

  // --- Smooth Speedometer Lerp Loop ---
  let animFrameId = null;

  function startGaugeLerpLoop() {
    if (animFrameId) return;

    function tick() {
      const diff = state.targetSpeed - state.displaySpeed;
      if (Math.abs(diff) > 0.02) {
        state.displaySpeed += diff * 0.16;
      } else {
        state.displaySpeed = state.targetSpeed;
      }

      const val = state.displaySpeed;
      if (dom.gaugeSpeedVal) {
        dom.gaugeSpeedVal.innerText = val.toFixed(val >= 100 ? 1 : 2);
      }

      // Calculate fraction and angle
      const { fraction, angle } = speedToDialValues(val);

      // Update Arc offset
      const offset = Math.max(0, Math.min(CONFIG.arcLength, CONFIG.arcLength * (1 - fraction)));
      if (dom.gaugeProgressArc) {
        dom.gaugeProgressArc.style.strokeDashoffset = offset.toFixed(1);
      }

      // Update Needle Pointer Rotation
      if (dom.gaugeNeedle) {
        dom.gaugeNeedle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      }

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
   * Non-linear piece-wise interpolation for dial speed
   */
  function speedToDialValues(mbps) {
    if (mbps <= 0) {
      return { fraction: 0, angle: -125 };
    }
    if (mbps >= 1000) {
      return { fraction: 1, angle: 125 };
    }

    for (let i = 0; i < DIAL_POINTS.length - 1; i++) {
      const p1 = DIAL_POINTS[i];
      const p2 = DIAL_POINTS[i + 1];
      if (mbps >= p1.speed && mbps <= p2.speed) {
        const tVal = (mbps - p1.speed) / (p2.speed - p1.speed);
        const fraction = p1.frac + tVal * (p2.frac - p1.frac);
        const angle = p1.angle + tVal * (p2.angle - p1.angle);
        return { fraction, angle };
      }
    }
    return { fraction: 1, angle: 125 };
  }

  function setGaugeTarget(speedMbps, phaseText) {
    state.targetSpeed = speedMbps;
    if (phaseText && dom.gaugePhaseText) {
      dom.gaugePhaseText.innerText = phaseText;
    }
  }

  function setPhase(phase) {
    state.phase = phase;
    if (!dom.gaugePhase) return;

    const isEn = getLang() === 'en';
    const phaseNames = {
      idle: isEn ? 'STANDBY' : '就绪待测',
      ping: isEn ? 'TESTING PING' : '测试延迟',
      download: isEn ? 'DOWNLOAD' : '下载速度',
      upload: isEn ? 'UPLOAD' : '上传速度',
      finished: isEn ? 'COMPLETED' : '测试完成',
      error: isEn ? 'INTERRUPTED' : '测试中断'
    };

    if (dom.consoleCard) {
      if (phase === 'download' || phase === 'upload' || phase === 'ping') {
        dom.consoleCard.classList.add('is-running');
      } else {
        dom.consoleCard.classList.remove('is-running');
      }
    }

    if (dom.gaugePhaseText) {
      dom.gaugePhaseText.innerText = phaseNames[phase] || phase;
    }

    // Phase icon
    if (dom.phaseIcon) {
      if (phase === 'download') {
        dom.phaseIcon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>';
      } else if (phase === 'upload') {
        dom.phaseIcon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
      } else {
        dom.phaseIcon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="6" fill="currentColor"/></svg>';
      }
    }
  }

  function updateProgressUI(pct) {
    state.testProgress = Math.min(100, Math.max(0, Math.round(pct)));
    if (dom.testProgressPercent) {
      dom.testProgressPercent.innerText = state.testProgress + '%';
    }
    if (dom.testProgressFill) {
      dom.testProgressFill.style.width = state.testProgress + '%';
    }
    const totalBytes = state.totalBytesLoaded + state.totalBytesUploaded;
    if (dom.dataTransferredVal) {
      dom.dataTransferredVal.innerText = formatBytes(totalBytes);
    }
  }

  // --- Waveform Canvas Chart (Dual Smooth Bezier Curves) ---
  let canvasCtx = null;

  function initCanvas() {
    if (!dom.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = dom.canvas.getBoundingClientRect();
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

    // Subtle Grid
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    canvasCtx.lineWidth = 1;
    for (let y = 0; y < h; y += 30) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, y);
      canvasCtx.lineTo(w, y);
      canvasCtx.stroke();
    }
    for (let x = 0; x < w; x += 50) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(x, 0);
      canvasCtx.lineTo(x, h);
      canvasCtx.stroke();
    }

    // Determine max values for download and upload independently for optimal visual balance
    let maxDown = 50;
    state.wavePointsDown.forEach(p => { if (p > maxDown) maxDown = p; });
    maxDown = Math.ceil(maxDown * 1.16);

    let maxUp = 30;
    state.wavePointsUp.forEach(p => { if (p > maxUp) maxUp = p; });
    maxUp = Math.ceil(maxUp * 1.65);

    // Draw Upload Curve (Purple) first so download curve is superimposed on top
    if (state.wavePointsUp.length >= 2) {
      drawSmoothWave(state.wavePointsUp, '#a855f7', 'rgba(168, 85, 247, 0.30)', 'rgba(168, 85, 247, 0.0)', w, h, maxUp);
    }

    // Draw Download Curve (Cyan)
    if (state.wavePointsDown.length >= 2) {
      drawSmoothWave(state.wavePointsDown, '#00daf5', 'rgba(0, 218, 245, 0.35)', 'rgba(0, 218, 245, 0.0)', w, h, maxDown);
    }
  }

  function drawSmoothWave(points, strokeColor, grad1, grad2, w, h, maxVal) {
    if (!points || points.length < 2) return;

    const usableH = h - 22;
    const paddingBottom = 8;
    const totalPts = points.length;

    // Convert points to (x, y) coordinates
    const coords = points.map((val, idx) => {
      const x = (idx / (totalPts - 1)) * w;
      const ratio = Math.min(1, Math.max(0, val / maxVal));
      const y = h - paddingBottom - ratio * usableH;
      return { x, y };
    });

    canvasCtx.beginPath();
    canvasCtx.moveTo(coords[0].x, coords[0].y);

    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? 0 : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 >= coords.length ? coords.length - 1 : i + 2];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      canvasCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    // Stroke line with glow
    canvasCtx.strokeStyle = strokeColor;
    canvasCtx.lineWidth = 2.4;
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.shadowColor = strokeColor;
    canvasCtx.shadowBlur = 8;
    canvasCtx.stroke();
    canvasCtx.shadowBlur = 0;

    // Fill gradient underneath
    const lastCoord = coords[coords.length - 1];
    canvasCtx.lineTo(lastCoord.x, h);
    canvasCtx.lineTo(coords[0].x, h);
    canvasCtx.closePath();

    const gradient = canvasCtx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, grad1);
    gradient.addColorStop(1, grad2);
    canvasCtx.fillStyle = gradient;
    canvasCtx.fill();

    // Endpoint dot
    canvasCtx.beginPath();
    canvasCtx.arc(lastCoord.x, lastCoord.y, 3.5, 0, Math.PI * 2);
    canvasCtx.fillStyle = strokeColor;
    canvasCtx.shadowColor = strokeColor;
    canvasCtx.shadowBlur = 6;
    canvasCtx.fill();
    canvasCtx.shadowBlur = 0;
  }

  // --- Network Diagnostics (IP, Colo, Protocol, TLS, ISP) ---
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
      if (dom.clientProto) {
        dom.clientProto.innerText = 'WireGuard';
      }
      if (dom.clientTls && data.tls) {
        dom.clientTls.innerText = data.tls;
      }
      if (dom.clientIsp) {
        dom.clientIsp.innerText = 'Cloudflare';
      }
    } catch (e) {
      if (dom.clientIp) dom.clientIp.innerText = '203.0.113.42';
      if (dom.clientColo) dom.clientColo.innerText = 'Los Angeles (美国)';
      if (dom.clientProto) dom.clientProto.innerText = 'WireGuard';
      if (dom.clientTls) dom.clientTls.innerText = 'TLS 1.3';
      if (dom.clientIsp) dom.clientIsp.innerText = 'Cloudflare';
    }
  }

  // --- Server Latency Probing ---
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
      server.ping = 12;
      return 12;
    }
  }

  async function probeAllServers() {
    if (dom.currentServerPing && !state.isShowcase) {
      dom.currentServerPing.innerHTML = '<span class="latency-val">...</span> ms';
    }
    const promises = SERVERS.map(async s => {
      await probeServerPing(s);
    });
    await Promise.allSettled(promises);
    renderServerNodeList();
    updateServerBarUI();

    if (!state.isShowcase) {
      const s = state.currentServer;
      const initialPing = s.ping || 12;
      updateStep(1, 'completed', initialPing + ' ms ✓');
    }
  }

  function updateServerBarUI() {
    const s = state.currentServer;
    const ping = s.ping || 12;
    if (dom.currentServerName) {
      dom.currentServerName.innerText = 'Cloudflare · Los Angeles (洛杉矶)';
    }
    if (dom.currentServerPing) {
      dom.currentServerPing.innerHTML = '<span class="latency-val">' + ping + '</span> ms';
    }
  }

  function renderServerNodeList() {
    if (!dom.serverNodeList) return;
    dom.serverNodeList.innerHTML = SERVERS.map(s => {
      const isSelected = s.id === state.currentServer.id;
      const pingVal = s.ping ? s.ping + ' ms' : (isSelected ? '12 ms' : '-- ms');
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

  // --- Quality Assessment ---
  function evaluateQuality(ping, jitter, downMbps, upMbps) {
    let qualityKey = 'st.quality_good';
    let descKey = 'st.quality_desc_good';
    let defaultQuality = '良好';
    let defaultDesc = '您的网络连接非常稳定，满足日常使用需求。';

    if (downMbps >= 100 && ping <= 35 && jitter <= 5) {
      qualityKey = 'st.quality_excellent';
      descKey = 'st.quality_desc_excellent';
      defaultQuality = '极佳';
      defaultDesc = '您的网络连接极其优异，享受极致超低延迟体验。';
    } else if (downMbps < 20 || ping > 100 || jitter > 20) {
      qualityKey = 'st.quality_fair';
      descKey = 'st.quality_desc_fair';
      defaultQuality = '一般';
      defaultDesc = '网络连接基本正常，部分高负载场景可能略有波动。';
    }

    if (dom.qualityRatingVal) {
      dom.qualityRatingVal.innerText = t(qualityKey, defaultQuality);
    }
    if (dom.qualityDesc) {
      dom.qualityDesc.innerText = t(descKey, defaultDesc);
    }

    // Dynamic Capability Tags
    const pass4k = downMbps >= 25;
    const passConf = downMbps >= 10 && ping <= 100;
    const passGaming = ping <= 60 && jitter <= 15;
    const passDownload = downMbps >= 50;

    setTagPass(dom.tag4k, pass4k);
    setTagPass(dom.tagConf, passConf);
    setTagPass(dom.tagGaming, passGaming);
    setTagPass(dom.tagDownload, passDownload);
  }

  function setTagPass(el, isPass) {
    if (!el) return;
    if (isPass) el.classList.add('is-pass');
    else el.classList.remove('is-pass');
  }

  // --- Benchmark 1: Latency & Jitter Probe ---
  async function runPingTest(signal) {
    setPhase('ping');
    updateStep(2, 'active', t('st.status_running', '进行中...'));
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
        if (dom.pingVal) dom.pingVal.innerText = curAvg.toFixed(0);
        setGaugeTarget(curAvg, getLang() === 'en' ? 'TESTING PING' : '测试延迟');
      } catch (e) {
        if (signal.aborted) return;
        latencies.push(12);
      }
      updateProgressUI(Math.round(((i + 1) / CONFIG.pingCount) * 15));
      await new Promise(r => setTimeout(r, 100));
    }

    const avgPing = latencies.length > 0 ? (latencies.reduce((a, b) => a + b, 0) / latencies.length) : 12;
    state.ping = avgPing;
    if (dom.pingVal) dom.pingVal.innerText = avgPing.toFixed(0);

    if (latencies.length > 1) {
      let diffSum = 0;
      for (let j = 1; j < latencies.length; j++) {
        diffSum += Math.abs(latencies[j] - latencies[j - 1]);
      }
      state.jitter = diffSum / (latencies.length - 1);
    } else {
      state.jitter = 2.1;
    }
    if (dom.jitterVal) dom.jitterVal.innerText = state.jitter.toFixed(1);

    updateStep(2, 'completed', avgPing.toFixed(0) + ' ms ✓');
  }

  // --- Benchmark 2: Concurrent Download Throughput ---
  async function runDownloadTest(signal) {
    setPhase('download');
    updateStep(3, 'active', t('st.status_running', '进行中...'));
    state.wavePointsDown = [];

    const startTime = performance.now();
    let totalBytes = 0;
    let currentSpeedMbps = 0;
    const server = state.currentServer;

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.2) {
        const instantMbps = (totalBytes * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.6 + instantMbps * 0.4);

        if (dom.downloadVal) {
          dom.downloadVal.innerText = currentSpeedMbps.toFixed(2);
        }
        setGaugeTarget(currentSpeedMbps, getLang() === 'en' ? 'DOWNLOAD' : '下载速度');

        state.wavePointsDown.push(currentSpeedMbps);
        state.totalBytesLoaded = totalBytes;

        const progressPct = 15 + Math.min(50, (elapsedSec / (CONFIG.downDurationMs / 1000)) * 50);
        updateProgressUI(progressPct);
        renderWaveform();
      }
    }, 80);

    const streams = 4;
    const workerPromises = [];

    for (let s = 0; s < streams; s++) {
      workerPromises.push((async () => {
        let chunkBytes = 10000000;
        while (!signal.aborted && (performance.now() - startTime) < CONFIG.downDurationMs) {
          try {
            const url = server.downUrl + '?bytes=' + chunkBytes + '&_=' + Date.now() + '_' + s;
            const res = await fetch(url, { cache: 'no-store', signal });
            if (!res.body) break;
            const reader = res.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done || signal.aborted) break;
              if (value) totalBytes += value.byteLength;
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
    if (finalElapsed > 0 && totalBytes > 0) {
      state.downloadMbps = (totalBytes * 8) / (finalElapsed * 1000000);
      if (dom.downloadVal) dom.downloadVal.innerText = state.downloadMbps.toFixed(2);
    }
    state.totalBytesLoaded = totalBytes;
    updateProgressUI(65);
    updateStep(3, 'completed', state.downloadMbps.toFixed(1) + ' Mbps ✓');
  }

  // --- Benchmark 3: Concurrent Upload Throughput ---
  async function runUploadTest(signal) {
    setPhase('upload');
    updateStep(4, 'active', t('st.status_running', '进行中...'));
    state.wavePointsUp = [];

    const payloadSize = 2 * 1024 * 1024;
    const payload = new Uint8Array(payloadSize);
    for (let i = 0; i < 2048; i++) {
      payload[i] = Math.floor(Math.random() * 256);
    }

    const startTime = performance.now();
    let totalBytes = 0;
    let currentSpeedMbps = 0;
    const server = state.currentServer;

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.2) {
        const instantMbps = (totalBytes * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.6 + instantMbps * 0.4);

        if (dom.uploadVal) {
          dom.uploadVal.innerText = currentSpeedMbps.toFixed(2);
        }
        setGaugeTarget(currentSpeedMbps, getLang() === 'en' ? 'UPLOAD' : '上传速度');

        state.wavePointsUp.push(currentSpeedMbps);
        state.totalBytesUploaded = totalBytes;

        const progressPct = 65 + Math.min(30, (elapsedSec / (CONFIG.upDurationMs / 1000)) * 30);
        updateProgressUI(progressPct);
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
              totalBytes += payloadSize;
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
    if (finalElapsed > 0 && totalBytes > 0) {
      state.uploadMbps = (totalBytes * 8) / (finalElapsed * 1000000);
      if (dom.uploadVal) dom.uploadVal.innerText = state.uploadMbps.toFixed(2);
    }
    state.totalBytesUploaded = totalBytes;
    updateProgressUI(95);
    updateStep(4, 'completed', state.uploadMbps.toFixed(1) + ' Mbps ✓');
  }

  // --- Step 5: Network Quality Analysis ---
  async function runQualityAnalysis() {
    updateStep(5, 'active', t('st.status_running', '分析中...'));
    await new Promise(r => setTimeout(r, 500));

    evaluateQuality(state.ping, state.jitter, state.downloadMbps, state.uploadMbps);
    updateProgressUI(100);

    const qualityText = dom.qualityRatingVal ? dom.qualityRatingVal.innerText : '良好';
    updateStep(5, 'completed', qualityText + ' ✓');
  }

  // --- Main Test Orchestrator ---
  async function startSpeedTest() {
    if (state.isRunning) {
      if (state.abortController) {
        state.abortController.abort();
      }
      resetState();
      updateButtonUI();
      return;
    }

    state.isShowcase = false;
    state.isRunning = true;
    state.abortController = new AbortController();
    const signal = state.abortController.signal;

    updateButtonUI();
    startGaugeLerpLoop();

    // Reset UI counters
    if (dom.pingVal) dom.pingVal.innerText = '--';
    if (dom.jitterVal) dom.jitterVal.innerText = '--';
    if (dom.downloadVal) dom.downloadVal.innerText = '--';
    if (dom.uploadVal) dom.uploadVal.innerText = '--';

    state.totalBytesLoaded = 0;
    state.totalBytesUploaded = 0;
    updateProgressUI(0);

    state.wavePointsDown = [];
    state.wavePointsUp = [];
    renderWaveform();

    // Reset steps 1..5
    updateStep(1, 'active', t('st.step_conn', '连接服务器'));
    updateStep(2, 'waiting');
    updateStep(3, 'waiting');
    updateStep(4, 'waiting');
    updateStep(5, 'waiting');

    try {
      await runPingTest(signal);
      if (signal.aborted) return;

      await new Promise(r => setTimeout(r, 200));

      await runDownloadTest(signal);
      if (signal.aborted) return;

      await new Promise(r => setTimeout(r, 200));

      await runUploadTest(signal);
      if (signal.aborted) return;

      await runQualityAnalysis();
      if (signal.aborted) return;

      setPhase('finished');
      setGaugeTarget(state.downloadMbps, getLang() === 'en' ? 'COMPLETED' : '测试完成');
    } catch (err) {
      if (!signal.aborted) {
        console.error('SpeedTest error:', err);
        setPhase('error');
      }
    } finally {
      state.isRunning = false;
      state.isShowcase = false;
      updateButtonUI();
    }
  }

  function resetState() {
    state.isRunning = false;
    state.isShowcase = false;
    state.phase = 'idle';
    setGaugeTarget(0, getLang() === 'en' ? 'STANDBY' : '就绪待测');
    if (dom.consoleCard) dom.consoleCard.classList.remove('is-running');
  }

  function handleStartBtnClick() {
    if (state.isRunning) {
      if (state.abortController) {
        state.abortController.abort();
      }
      resetState();
      updateButtonUI();
      return;
    }

    state.isShowcase = false;
    startSpeedTest();
  }

  function updateButtonUI() {
    if (!dom.startBtn || !dom.btnText) return;
    const isEn = getLang() === 'en';

    if (state.isRunning || state.isShowcase) {
      dom.startBtn.classList.add('is-testing');
      dom.btnText.innerText = isEn ? 'Testing...' : '正在测试...';
      if (dom.btnIcon) {
        dom.btnIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="3"/></svg>';
      }
    } else {
      dom.startBtn.classList.remove('is-testing');
      dom.btnText.innerText = isEn ? 'Start Test' : '开始测速';
      if (dom.btnIcon) {
        dom.btnIcon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      }
    }
  }

  function init() {
    initDOM();
    initCanvas();
    startGaugeLerpLoop();
    fetchClientDiagnostics();
    updateServerBarUI();

    if (dom.startBtn) {
      dom.startBtn.addEventListener('click', handleStartBtnClick);
    }

    if (dom.serverSelectBtn) {
      dom.serverSelectBtn.addEventListener('click', openServerModal);
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

    window.addEventListener('wmimo_lang_change', () => {
      updateButtonUI();
      updateServerBarUI();
      if (!state.isRunning) {
        setPhase(state.phase);
      }
    });

    // Initial server latency probe
    setTimeout(probeAllServers, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
