/**
 * Wmimo Online SpeedTest Engine & Real-Time Waveform Monitor
 * Fully client-side, zero server dependencies, cross-browser CORS compliant.
 * Supports dynamic i18n re-rendering and HiDPI canvas rendering.
 */

(function() {
  'use strict';

  // Config & Endpoints
  const CONFIG = {
    traceUrl: 'https://speed.cloudflare.com/cdn-cgi/trace',
    downUrl: 'https://speed.cloudflare.com/__down',
    upUrl: 'https://speed.cloudflare.com/__up',
    pingCount: 6,
    downDurationMs: 8500,
    upDurationMs: 6500,
    maxGaugeSpeed: 1000 // Mbps
  };

  // State
  let state = {
    isRunning: false,
    phase: 'idle', // 'idle' | 'ping' | 'download' | 'upload' | 'finished' | 'error'
    abortController: null,
    ping: 0,
    jitter: 0,
    downloadMbps: 0,
    uploadMbps: 0,
    wavePoints: [] // { type: 'down' | 'up', speed: number }
  };

  // DOM Elements cache
  let dom = {};

  function initDOM() {
    dom = {
      startBtn: document.getElementById('speedStartBtn'),
      btnText: document.getElementById('speedBtnText'),
      gaugePhase: document.getElementById('gaugePhase'),
      gaugeSpeedVal: document.getElementById('gaugeSpeedVal'),
      gaugeSpeedUnit: document.getElementById('gaugeSpeedUnit'),
      gaugeProgressArc: document.getElementById('gaugeProgressArc'),
      pingVal: document.getElementById('pingVal'),
      jitterVal: document.getElementById('jitterVal'),
      downloadVal: document.getElementById('downloadVal'),
      uploadVal: document.getElementById('uploadVal'),
      cardPing: document.getElementById('cardPing'),
      cardJitter: document.getElementById('cardJitter'),
      cardDown: document.getElementById('cardDown'),
      cardUp: document.getElementById('cardUp'),
      canvas: document.getElementById('speedWaveCanvas'),
      clientIp: document.getElementById('clientIp'),
      clientColo: document.getElementById('clientColo'),
      clientProto: document.getElementById('clientProto'),
      clientNetwork: document.getElementById('clientNetwork')
    };
  }

  // --- Helpers & Math ---
  function getLang() {
    return (window.WmimoI18n && window.WmimoI18n.getCurrentLang()) || 'zh';
  }

  /**
   * Logarithmic mapping of Mbps to arc offset (0 to 440)
   */
  function speedToOffset(mbps) {
    if (mbps <= 0) return 440;
    const maxVal = CONFIG.maxGaugeSpeed;
    const clamped = Math.min(mbps, maxVal);
    const ratio = Math.min(1, Math.log10(1 + (clamped / maxVal) * 9));
    const offset = 440 - (ratio * 440);
    return Math.max(0, Math.min(440, offset));
  }

  function updateGauge(speedMbps, phaseText) {
    if (dom.gaugeSpeedVal) {
      dom.gaugeSpeedVal.innerText = speedMbps.toFixed(speedMbps >= 100 ? 0 : 1);
    }
    if (dom.gaugeProgressArc) {
      dom.gaugeProgressArc.style.strokeDashoffset = speedToOffset(speedMbps);
    }
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

    // Draw Subtle Grid
    canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    canvasCtx.lineWidth = 1;
    for (let y = 0; y < h; y += 35) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, y);
      canvasCtx.lineTo(w, y);
      canvasCtx.stroke();
    }

    if (state.wavePoints.length < 2) return;

    let maxSpeed = 10;
    for (const p of state.wavePoints) {
      if (p.speed > maxSpeed) maxSpeed = p.speed;
    }
    maxSpeed = Math.ceil(maxSpeed * 1.15);

    const stepX = w / Math.max(state.wavePoints.length - 1, 30);

    canvasCtx.beginPath();
    state.wavePoints.forEach((p, idx) => {
      const x = idx * stepX;
      const y = h - (p.speed / maxSpeed) * (h - 15) - 8;
      if (idx === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        const prevP = state.wavePoints[idx - 1];
        const prevX = (idx - 1) * stepX;
        const prevY = h - (prevP.speed / maxSpeed) * (h - 15) - 8;
        const midX = (prevX + x) / 2;
        canvasCtx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
      }
    });

    const strokeColor = state.phase === 'upload' ? '#A855F7' : '#00BCDF';
    const gradColor1 = state.phase === 'upload' ? 'rgba(168, 85, 247, 0.28)' : 'rgba(0, 188, 223, 0.28)';
    const gradColor2 = state.phase === 'upload' ? 'rgba(168, 85, 247, 0.0)' : 'rgba(0, 188, 223, 0.0)';

    canvasCtx.strokeStyle = strokeColor;
    canvasCtx.lineWidth = 2.5;
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.shadowColor = strokeColor;
    canvasCtx.shadowBlur = 8;
    canvasCtx.stroke();
    canvasCtx.shadowBlur = 0;

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

    const lastPoint = state.wavePoints[lastIdx];
    const lastY = h - (lastPoint.speed / maxSpeed) * (h - 15) - 8;
    canvasCtx.beginPath();
    canvasCtx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    canvasCtx.fillStyle = '#FFFFFF';
    canvasCtx.shadowColor = strokeColor;
    canvasCtx.shadowBlur = 10;
    canvasCtx.fill();
    canvasCtx.shadowBlur = 0;
  }

  // --- Network Diagnostics (IP & Colo) ---
  async function fetchClientDiagnostics() {
    try {
      const res = await fetch(CONFIG.traceUrl + '?r=' + Math.random(), { cache: 'no-store' });
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
        dom.clientColo.innerText = data.colo + ' (' + (data.loc || 'Global') + ')';
      }
      if (dom.clientProto && data.tls) {
        dom.clientProto.innerText = (data.http || 'HTTP/2') + ' · ' + data.tls;
      }
      if (dom.clientNetwork && data.loc) {
        dom.clientNetwork.innerText = data.loc + ' · Anycast CDN';
      }
    } catch (e) {
      if (dom.clientIp) dom.clientIp.innerText = 'Connected';
      if (dom.clientColo) dom.clientColo.innerText = 'Global Edge';
      if (dom.clientProto) dom.clientProto.innerText = 'HTTPS / TLS';
      if (dom.clientNetwork) dom.clientNetwork.innerText = 'Direct / Proxy';
    }
  }

  // --- Benchmark 1: Latency & Jitter Probe ---
  async function runPingTest(signal) {
    setPhase('ping');
    const latencies = [];

    for (let i = 0; i < CONFIG.pingCount; i++) {
      if (signal.aborted) return;
      const start = performance.now();
      try {
        await fetch(CONFIG.downUrl + '?bytes=0&_=' + Date.now() + '_' + i, {
          method: 'GET',
          cache: 'no-store',
          signal
        });
        const rtt = performance.now() - start;
        latencies.push(rtt);
        const curAvg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
        dom.pingVal.innerText = curAvg.toFixed(0);
        updateGauge(curAvg, getLang() === 'en' ? 'LATENCY PING' : '测试延迟');
      } catch (e) {
        if (signal.aborted) return;
      }
      await new Promise(r => setTimeout(r, 120));
    }

    if (latencies.length > 0) {
      const avgPing = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      state.ping = avgPing;
      dom.pingVal.innerText = avgPing.toFixed(0);

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

    const startTime = performance.now();
    let totalBytesLoaded = 0;
    let currentSpeedMbps = 0;

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.3) {
        const instantMbps = (totalBytesLoaded * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.7 + instantMbps * 0.3);

        dom.downloadVal.innerText = currentSpeedMbps.toFixed(1);
        updateGauge(currentSpeedMbps, getLang() === 'en' ? 'DOWNLOADING' : '正在下行测速');

        state.wavePoints.push({ type: 'down', speed: currentSpeedMbps });
        renderWaveform();
      }
    }, 90);

    const streams = 4;
    const workerPromises = [];

    for (let s = 0; s < streams; s++) {
      workerPromises.push((async () => {
        let chunkBytes = 8000000;
        while (!signal.aborted && (performance.now() - startTime) < CONFIG.downDurationMs) {
          try {
            const url = CONFIG.downUrl + '?bytes=' + chunkBytes + '&_=' + Date.now() + '_' + s;
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

    const intervalTimer = setInterval(() => {
      const elapsedSec = (performance.now() - startTime) / 1000;
      if (elapsedSec > 0.3) {
        const instantMbps = (totalBytesUploaded * 8) / (elapsedSec * 1000000);
        currentSpeedMbps = currentSpeedMbps === 0 ? instantMbps : (currentSpeedMbps * 0.7 + instantMbps * 0.3);
        dom.uploadVal.innerText = currentSpeedMbps.toFixed(1);
        updateGauge(currentSpeedMbps, getLang() === 'en' ? 'UPLOADING' : '正在上行测速');

        state.wavePoints.push({ type: 'up', speed: currentSpeedMbps });
        renderWaveform();
      }
    }, 90);

    const streams = 3;
    const workerPromises = [];

    for (let s = 0; s < streams; s++) {
      workerPromises.push((async () => {
        while (!signal.aborted && (performance.now() - startTime) < CONFIG.upDurationMs) {
          try {
            const res = await fetch(CONFIG.upUrl, {
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

    dom.pingVal.innerText = '--';
    dom.jitterVal.innerText = '--';
    dom.downloadVal.innerText = '--';
    dom.uploadVal.innerText = '--';
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
      updateGauge(state.downloadMbps, getLang() === 'en' ? 'TEST FINISHED' : '测速完成');
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
    updateGauge(0, getLang() === 'en' ? 'STANDBY' : '就绪待测');
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
    fetchClientDiagnostics();

    if (dom.startBtn) {
      dom.startBtn.addEventListener('click', startSpeedTest);
    }

    window.addEventListener('resize', () => {
      initCanvas();
    });

    window.addEventListener('wmimo-lang-change', () => {
      updateButtonUI();
      if (!state.isRunning) {
        setPhase(state.phase);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
