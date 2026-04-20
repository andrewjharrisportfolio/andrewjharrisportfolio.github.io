/**
 * loader.js
 * =========
 * Full-screen terminal boot-sequence loading screen for index.html.
 * Plays once per browser session via sessionStorage.
 * Completely self-contained — no dependencies on main.js or site-data.js.
 */
(function () {

  // ── Skip if already played this session ───────────────────
  if (sessionStorage.getItem('hdd-loaded')) return;
  sessionStorage.setItem('hdd-loaded', '1');

  // ── Inject styles ─────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    /* ── Loader overlay ── */
    #hdd-loader {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #020408;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.55s ease;
    }
    #hdd-loader.hdd-fade-out {
      opacity: 0;
      pointer-events: none;
    }

    /* ── Scrolling grid lines (mirrors main.js canvas grid) ── */
    #hdd-loader-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,229,255,0.028) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,255,0.028) 1px, transparent 1px);
      background-size: 60px 60px;
      animation: hddGridScroll 3s linear infinite;
    }
    @keyframes hddGridScroll {
      from { background-position: 0 0; }
      to   { background-position: 0 60px; }
    }

    /* ── CRT scanlines ── */
    #hdd-loader-scan {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.07) 2px,
        rgba(0,0,0,0.07) 4px
      );
      pointer-events: none;
    }

    /* ── Floating particles ── */
    .hdd-ptcl {
      position: absolute;
      border-radius: 50%;
      animation: hddFloat linear infinite;
      opacity: 0;
    }
    @keyframes hddFloat {
      0%   { transform: translateY(105vh) scale(0.6); opacity: 0; }
      8%   { opacity: 0.65; }
      88%  { opacity: 0.45; }
      100% { transform: translateY(-8vh)  scale(1.3); opacity: 0; }
    }

    /* ── Terminal window ── */
    #hdd-terminal {
      position: relative;
      z-index: 2;
      width: min(580px, 92vw);
      background: rgba(6, 13, 20, 0.97);
      border: 1px solid rgba(0, 229, 255, 0.38);
      border-radius: 8px;
      box-shadow:
        0 0 0 1px rgba(0, 229, 255, 0.06),
        0 0 40px rgba(0, 229, 255, 0.18),
        0 0 100px rgba(0, 229, 255, 0.06),
        inset 0 0 32px rgba(0, 0, 0, 0.55);
      overflow: hidden;
      font-family: 'Share Tech Mono', 'Courier New', monospace;
    }

    /* ── Terminal header bar ── */
    #hdd-terminal-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 10px 14px;
      background: rgba(10, 21, 32, 0.98);
      border-bottom: 1px solid rgba(0, 229, 255, 0.16);
      user-select: none;
    }
    .hdd-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .hdd-dot-r { background: #ff5f57; box-shadow: 0 0 5px #ff5f5766; }
    .hdd-dot-y { background: #febc2e; box-shadow: 0 0 5px #febc2e66; }
    .hdd-dot-g { background: #28c840; box-shadow: 0 0 5px #28c84066; }
    #hdd-bar-title {
      flex: 1;
      text-align: center;
      font-size: 0.68rem;
      color: rgba(0, 229, 255, 0.38);
      letter-spacing: 0.14em;
    }

    /* ── Terminal body ── */
    #hdd-terminal-body {
      padding: 22px 24px 28px;
      min-height: 175px;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    /* ── Output lines ── */
    .hdd-line {
      font-size: 0.83rem;
      color: rgba(0, 229, 255, 0.72);
      line-height: 1.7;
      letter-spacing: 0.04em;
      min-height: 1.4em;
    }

    /* ── Inline typing cursor ── */
    .hdd-cur {
      display: inline-block;
      width: 8px;
      height: 0.88em;
      background: #00e5ff;
      vertical-align: text-bottom;
      margin-left: 1px;
      box-shadow: 0 0 7px rgba(0, 229, 255, 0.85);
      animation: hddBlink 0.72s step-end infinite;
    }
    @keyframes hddBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    /* ── Brand name (cyan glow) ── */
    .hdd-brand-name {
      color: #00e5ff;
      text-shadow:
        0 0 8px  rgba(0, 229, 255, 0.95),
        0 0 22px rgba(0, 229, 255, 0.55),
        0 0 45px rgba(0, 229, 255, 0.20);
    }

    /* ── Access granted (green) ── */
    .hdd-granted {
      color: #00ff88;
      text-shadow:
        0 0 10px rgba(0, 255, 136, 0.75),
        0 0 25px rgba(0, 255, 136, 0.35);
    }
  `;
  document.head.appendChild(styleEl);

  // ── Build loader DOM ───────────────────────────────────────
  const loader = document.createElement('div');
  loader.id = 'hdd-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = `
    <div id="hdd-loader-grid"></div>
    <div id="hdd-loader-scan"></div>
    <div id="hdd-terminal">
      <div id="hdd-terminal-bar">
        <span class="hdd-dot hdd-dot-r"></span>
        <span class="hdd-dot hdd-dot-y"></span>
        <span class="hdd-dot hdd-dot-g"></span>
        <span id="hdd-bar-title">HDD_SECURE_BOOT &nbsp;—&nbsp; v2.4.1</span>
      </div>
      <div id="hdd-terminal-body"></div>
    </div>
  `;

  // Floating particles
  const ptclColors = [
    'rgba(0,229,255,',
    'rgba(0,255,136,',
    'rgba(178,77,255,'
  ];
  for (let i = 0; i < 20; i++) {
    const p   = document.createElement('div');
    p.className = 'hdd-ptcl';
    const col  = ptclColors[Math.floor(Math.random() * ptclColors.length)];
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = [
      'left:'              + (Math.random() * 100) + '%',
      'width:'             + size + 'px',
      'height:'            + size + 'px',
      'background:'        + col + '0.7)',
      'box-shadow:0 0 '   + (size * 3) + 'px ' + col + '0.5)',
      'animation-duration:'+ (Math.random() * 6 + 5) + 's',
      'animation-delay:'   + (Math.random() * 4)     + 's'
    ].join(';');
    loader.appendChild(p);
  }

  document.body.prepend(loader);
  // Lock scroll while loader is visible
  document.documentElement.style.overflow = 'hidden';

  // ── Utilities ──────────────────────────────────────────────
  const rand  = (lo, hi) => Math.random() * (hi - lo) + lo;
  const sleep = (ms)     => new Promise(r => setTimeout(r, ms));

  // ── Type a single line char-by-char ───────────────────────
  const termBody = document.getElementById('hdd-terminal-body');

  function typeLine(text, opts = {}) {
    return new Promise(resolve => {
      const el = document.createElement('div');
      el.className = 'hdd-line' + (opts.green ? ' hdd-granted' : '');
      termBody.appendChild(el);

      // Blinking cursor trails the typing
      const cur = document.createElement('span');
      cur.className = 'hdd-cur';
      el.appendChild(cur);

      let i = 0;

      function tick() {
        if (i >= text.length) {
          cur.remove();
          // Apply brand styling after full line is typed
          if (opts.brand) {
            el.innerHTML =
              '&gt; <span class="hdd-brand-name">HarrisDigitalDefense</span>_';
          }
          resolve();
          return;
        }

        cur.insertAdjacentText('beforebegin', text[i]);
        i++;

        // Punctuation characters get a slightly longer pause
        const isPunct = /[.,!?_;]/.test(text[i - 1]);
        setTimeout(tick, isPunct ? rand(55, 95) : rand(18, 40));
      }

      tick();
    });
  }

  // ── Boot sequence definition ───────────────────────────────
  // Timings tuned for ~4.5 s total before fade-out
  async function runLoader() {
    await typeLine('> initializing system...');
    await sleep(72);

    await typeLine('> loading modules...');
    await sleep(72);

    await typeLine('> establishing secure connection...');
    await sleep(72);

    await typeLine('> HarrisDigitalDefense_', { brand: true });
    await sleep(520);   // dramatic pause before access granted

    await typeLine('> access granted', { green: true });
    await sleep(700);   // hold on final state

    // ── Fade out & clean up ──────────────────────────────────
    loader.classList.add('hdd-fade-out');
    loader.addEventListener('transitionend', () => {
      loader.remove();
      styleEl.remove();
      document.documentElement.style.overflow = '';
    }, { once: true });
  }

  runLoader();

}());
