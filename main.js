/**
 * main.js
 * =======
 * Shared JavaScript for all pages.
 * - Animated canvas background (grid, matrix rain, particles, scan beam)
 * - Navigation: active link highlighting, hamburger toggle
 * - Project card rendering (used by index.html and projects.html)
 * - Filter bar generation and logic (projects.html only)
 * - Certification grid rendering (certifications.html)
 * - Training card rendering (training.html)
 * - Contact link rendering (contact.html)
 */

/* ═══════════════════════════════════════════════════════════
   1. CANVAS BACKGROUND
   ═══════════════════════════════════════════════════════════ */

(function initBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, animId;

  // ── Config ────────────────────────────────────────────────
  const GRID_SPACING  = 60;
  const GRID_SPEED    = 0.25; // px/frame
  const GRID_COLOR    = 'rgba(0, 229, 255, 0.028)';

  const RAIN_TERMS    = [
    'DETECT','ANALYZE','RESPOND','SIEM','FIREWALL','PCAP',
    'MITRE','THREAT','IOC','TTPs','SPLUNK','ZEEK','SURICATA',
    'FORENSIC','MALWARE','PHISHING','C2','BEACON','EXFIL',
    'LATERAL','PERSIST','ESCALATE','PIVOT','YARA','SIGMA',
    'SOC','NIST','INCIDENT','TRIAGE','HUNT','INTEL','VULN',
    'PATCH','HASH','MD5','SHA256','CVE','EXPLOIT','PAYLOAD'
  ];
  const RAIN_COLS     = Math.floor(window.innerWidth / 18);
  const RAIN_SPEED    = 0.4;
  const RAIN_OPACITY  = 0.045;

  const PARTICLE_COUNT = 35;
  const PARTICLE_COLORS = ['rgba(0,229,255,', 'rgba(0,255,136,', 'rgba(178,77,255,'];

  // ── State ─────────────────────────────────────────────────
  let gridOffset    = 0;
  let rainDrops     = [];
  let rainPositions = [];
  let particles     = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initRain();
    initParticles();
  }

  // ── Matrix Rain ───────────────────────────────────────────
  function initRain() {
    const cols     = Math.floor(W / 18);
    rainDrops     = Array.from({ length: cols }, () => Math.random() * H);
    rainPositions = Array.from({ length: cols }, (_, i) => i * 18);
  }

  function drawRain() {
    ctx.font = '11px "Share Tech Mono", monospace';
    ctx.fillStyle = `rgba(0,229,255,${RAIN_OPACITY})`;
    rainDrops.forEach((y, i) => {
      const term = RAIN_TERMS[Math.floor(Math.random() * RAIN_TERMS.length)];
      ctx.fillText(term.charAt(0), rainPositions[i], y);
      rainDrops[i] += RAIN_SPEED + Math.random() * 0.3;
      if (rainDrops[i] > H + 20 && Math.random() > 0.97) {
        rainDrops[i] = -20;
      }
    });
  }

  // ── Grid Lines ────────────────────────────────────────────
  function drawGrid() {
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth   = 1;

    // Vertical lines
    const startX = -GRID_SPACING + ((gridOffset * 0) % GRID_SPACING);
    for (let x = startX; x < W + GRID_SPACING; x += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // Horizontal lines (scrolling downward)
    const startY = -(GRID_SPACING - (gridOffset % GRID_SPACING));
    for (let y = startY; y < H + GRID_SPACING; y += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    gridOffset = (gridOffset + GRID_SPEED) % GRID_SPACING;
  }

  // ── Particles ─────────────────────────────────────────────
  function initParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => spawnParticle(true));
  }

  function spawnParticle(random = false) {
    const colorBase = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    return {
      x:       Math.random() * W,
      y:       random ? Math.random() * H : H + 10,
      vx:      (Math.random() - 0.5) * 0.3,
      vy:      -(0.2 + Math.random() * 0.5),
      r:       1 + Math.random() * 2,
      alpha:   0.1 + Math.random() * 0.35,
      colorBase,
      life:    0,
      maxLife: 200 + Math.random() * 300
    };
  }

  function drawParticles() {
    particles.forEach((p, i) => {
      p.x    += p.vx;
      p.y    += p.vy;
      p.life += 1;

      const fade = p.life < 30
        ? p.life / 30
        : p.life > p.maxLife - 30
          ? (p.maxLife - p.life) / 30
          : 1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.colorBase + (p.alpha * fade) + ')';
      ctx.fill();

      if (p.life >= p.maxLife || p.y < -10) {
        particles[i] = spawnParticle(false);
      }
    });
  }

  // ── Hexagonal Overlay ─────────────────────────────────────
  function hexPath(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function drawHexGrid() {
    const r = 40;
    const colW = r * 1.732;
    const rowH = r * 1.5;
    ctx.strokeStyle = 'rgba(0,229,255,0.018)';
    ctx.lineWidth = 1;
    for (let row = -1; row < H / rowH + 2; row++) {
      for (let col = -1; col < W / colW + 2; col++) {
        const cx = col * colW + (row % 2 === 0 ? colW / 2 : 0);
        const cy = row * rowH;
        hexPath(cx, cy, r - 2);
        ctx.stroke();
      }
    }
  }

  // ── Main Loop ─────────────────────────────────────────────
  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawHexGrid();
    drawGrid();
    drawRain();
    drawParticles();
    animId = requestAnimationFrame(loop);
  }

  // Reduce particle count on smaller screens for performance
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    loop();
  });

  resize();
  loop();
})();

/* ═══════════════════════════════════════════════════════════
   2. NAVIGATION
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Active link highlighting ───────────────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === filename ||
      (filename === '' && href === 'index.html') ||
      (filename === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // ── Hamburger toggle ──────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded',
        navLinks.classList.contains('open').toString()
      );
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Run page-specific initializers ────────────────────────
  if (typeof pageInit === 'function') pageInit();
});

/* ═══════════════════════════════════════════════════════════
   3. TAG CLASSIFICATION
   Maps tool names to CSS tag color classes
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   WRITE-UP CATEGORY COLOR MAP
   Maps category names to hex and rgba values for card theming
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_COLOR_MAP = {
  'DFIR':                  { hex: '#b24dff', rgba: 'rgba(178,77,255,' },
  'Malware Analysis':      { hex: '#ff3d5a', rgba: 'rgba(255,61,90,'  },
  'Threat Hunting':        { hex: '#00e5ff', rgba: 'rgba(0,229,255,'  },
  'Incident Response':     { hex: '#00ff88', rgba: 'rgba(0,255,136,'  },
  'Detection Engineering': { hex: '#00e5ff', rgba: 'rgba(0,229,255,'  },
  'SOC Analysis':          { hex: '#00ff88', rgba: 'rgba(0,255,136,'  },
  'Career':                { hex: '#00ff88', rgba: 'rgba(0,255,136,'  },
};

const TAG_CLASS_MAP = {
  // SIEM / Log tools → cyan
  'Splunk': 'tag-siem', 'SPL': 'tag-siem', 'Azure Sentinel': 'tag-siem',
  'KQL': 'tag-siem', 'SIEM': 'tag-siem', 'ELK': 'tag-siem',
  'Elastic': 'tag-siem', 'Regex': 'tag-siem', 'Sigma': 'tag-siem',

  // Network / Protocol tools → green
  'Wireshark': 'tag-network', 'Tcpdump': 'tag-network', 'Zeek': 'tag-network',
  'Suricata': 'tag-network', 'Snort': 'tag-network', 'Nmap': 'tag-network',
  'Netcat': 'tag-network', 'Zeek/Bro': 'tag-network',

  // Forensics / Malware / Vuln scanning → purple
  'Volatility': 'tag-forensic', 'Volatility3': 'tag-forensic',
  'Strings': 'tag-forensic',
  'FTK Imager': 'tag-forensic',
  'Autopsy': 'tag-forensic', 'Sysinternals': 'tag-forensic',
  'YARA': 'tag-forensic', 'Any.run': 'tag-forensic',
  'VirusTotal': 'tag-forensic', 'Sandbox': 'tag-forensic',
  'Email Header Analysis': 'tag-forensic',
  'Nessus': 'tag-forensic', 'Nessus Essentials': 'tag-forensic',
  'Patch Management': 'tag-forensic',

  // Cloud / Azure → cyan (SIEM family)
  'Microsoft Azure': 'tag-siem', 'Microsoft Sentinel': 'tag-siem',
  'Azure Logic Apps': 'tag-siem', 'Microsoft Log Analytics workspace': 'tag-siem',
  'Windows Remote Desktop Client': 'tag-default',

  // Threat intel / Attack frameworks / Offensive tools → red
  'MITRE ATT&CK': 'tag-threat', 'Metasploit': 'tag-threat',
  'OSINT Tools': 'tag-threat', 'Threat Intelligence Feeds': 'tag-threat',
  'TheHive': 'tag-threat', 'EDR': 'tag-threat',
  'Atomic Red Team': 'tag-threat', 'Kali Linux': 'tag-threat',
  'Crowbar': 'tag-threat',
  'Shodan': 'tag-threat', 'GeoIP Watchlist': 'tag-threat',
  'NIST Cybersecurity Framework (CSF)': 'tag-threat',

  // Network / Infrastructure → green
  'pfSense': 'tag-network', 'Network Segmentation': 'tag-network',
  'VMware': 'tag-network', 'Docker Desktop': 'tag-network', 'Docker': 'tag-network',

  // Monitoring / Endpoint → cyan (SIEM family)
  'Sysmon': 'tag-siem', 'PowerShell': 'tag-siem', 'Linux CLI': 'tag-siem',
  'Splunk Enterprise': 'tag-siem',

  // Incident response / frameworks / offensive tools → red
  'PICERL Framework': 'tag-threat', 'D3FEND Matrix': 'tag-threat',
  'DVWA': 'tag-threat', 'Hydra': 'tag-threat',
  'WSL2 / Ubuntu': 'tag-default',
  // SIEM / XDR
  'Wazuh': 'tag-siem',

  // Identity & Access / Windows infra → default (handled below)
};

function getTagClass(tool) {
  return TAG_CLASS_MAP[tool] || 'tag-default';
}

/* ═══════════════════════════════════════════════════════════
   4. PROJECT CARD RENDERER
   ═══════════════════════════════════════════════════════════ */

function buildProjectCard(project) {
  const card = document.createElement('a');
  card.className = 'project-card';
  card.href      = `/projects/${project.slug}/`;
  card.target    = '_blank';
  card.rel       = 'noopener';
  card.setAttribute('data-tools', project.tools.join(',').toLowerCase());

  const tagsHTML = project.tools
    .map(t => `<span class="tag ${getTagClass(t)}">${t}</span>`)
    .join('');

  card.innerHTML = `
    <div class="card-thumb">
      <span class="card-category">${project.category}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name">${project.name}</h3>
      <p class="card-desc">${project.description}</p>
      <div class="card-tags">${tagsHTML}</div>
      <span class="card-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
        </svg>
        View on GitHub &rarr;
      </span>
    </div>
  `;

  return card;
}

/* ═══════════════════════════════════════════════════════════
   5. HOME PAGE — Featured Projects
   ═══════════════════════════════════════════════════════════ */

function initHomePage() {
  const container = document.getElementById('featured-projects');
  if (!container) return;

  fetch('projects.json')
    .then(r => r.json())
    .then(projects => {
      const featured = projects.filter(p => p.featured);
      featured.forEach(p => container.appendChild(buildProjectCard(p)));
    })
    .catch(err => console.warn('Could not load projects.json', err));

  // Inject stats from SITE_DATA
  if (typeof SITE_DATA !== 'undefined') {
    const bar = document.getElementById('stats-bar');
    if (bar) {
      bar.innerHTML = SITE_DATA.stats.map(s => `
        <div class="stat-card" data-color="${s.color}">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }

    // Inject about text
    const aboutEl = document.getElementById('about-text');
    if (aboutEl) aboutEl.textContent = SITE_DATA.about;

    // Inject hero content
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = SITE_DATA.hero.name;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.textContent = SITE_DATA.hero.title;

    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline) heroTagline.textContent = SITE_DATA.hero.tagline;

    // Inject featured write-ups
    const writeupsContainer = document.getElementById('featured-writeups');
    if (writeupsContainer) {
      const featured = (SITE_DATA.writeups || []).filter(w => w.featured);
      featured.forEach(entry => writeupsContainer.appendChild(buildWriteupCard(entry)));
    }

    // Inject featured training
    const trainingContainer = document.getElementById('featured-training');
    if (trainingContainer) {
      const featured = SITE_DATA.training.filter(t => t.featured);
      featured.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'training-card';
        const tagsHTML = entry.tools
          .map(t => `<span class="tag ${getTagClass(t)}">${t}</span>`)
          .join('');
        card.innerHTML = `
          <h3 class="training-name">${entry.name}</h3>
          <div class="card-tags">${tagsHTML}</div>
          <p class="training-desc">${entry.description}</p>
        `;
        trainingContainer.appendChild(card);
      });
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   6. PROJECTS PAGE — Full Grid + Filters
   ═══════════════════════════════════════════════════════════ */

function initProjectsPage() {
  const grid      = document.getElementById('projects-grid');
  const filterBar = document.getElementById('filter-bar');
  if (!grid || !filterBar) return;

  fetch('projects.json')
    .then(r => r.json())
    .then(projects => {
      // Render all cards
      projects.forEach(p => grid.appendChild(buildProjectCard(p)));

      // Collect unique tools across all projects
      const allTools = [...new Set(projects.flatMap(p => p.tools))].sort();

      // Build filter buttons
      allTools.forEach(tool => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = tool;
        btn.dataset.tool = tool.toLowerCase();
        btn.addEventListener('click', () => toggleFilter(btn, tool, grid));
        filterBar.appendChild(btn);
      });
    })
    .catch(err => console.warn('Could not load projects.json', err));
}

let activeFilters = new Set();

function toggleFilter(btn, tool, grid) {
  const key = tool.toLowerCase();
  if (activeFilters.has(key)) {
    activeFilters.delete(key);
    btn.classList.remove('active');
  } else {
    activeFilters.add(key);
    btn.classList.add('active');
  }
  applyFilters(grid);
}

function applyFilters(grid) {
  const cards = grid.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (activeFilters.size === 0) {
      card.classList.remove('hidden');
      return;
    }
    const cardTools = card.dataset.tools.split(',');
    const matches   = [...activeFilters].every(f =>
      cardTools.some(ct => ct.includes(f))
    );
    card.classList.toggle('hidden', !matches);
  });
}

/* ═══════════════════════════════════════════════════════════
   7. CERTIFICATIONS PAGE
   ═══════════════════════════════════════════════════════════ */

function initCertificationsPage() {
  const grid = document.getElementById('cert-grid');
  if (!grid || typeof SITE_DATA === 'undefined') return;

  SITE_DATA.certifications.forEach(cert => {
    const a = document.createElement('a');
    a.className = 'cert-card';
    a.href      = cert.credlyUrl;
    a.target    = '_blank';
    a.rel       = 'noopener';

    // Use real badge image if imageUrl is set, otherwise fall back to abbr text
    const badgeInner = cert.imageUrl
      ? `<img class="cert-badge-img" src="${cert.imageUrl}" alt="${cert.name} badge" loading="lazy" />`
      : `<span class="cert-abbr">${cert.abbr}</span>`;

    // Always show abbr label; for image badges it appears below the circle
    const abbrLabel = cert.imageUrl
      ? `<span class="cert-abbr">${cert.abbr}</span>`
      : '';

    // Coursera certs link to a verify page, not Credly
    const verifyLabel = cert.credlyUrl.includes('coursera.org')
      ? 'Verify on Coursera ↗'
      : cert.credlyUrl.includes('learn.microsoft.com')
        ? 'Verify on Microsoft Learn ↗'
        : 'Verify on Credly ↗';

    a.innerHTML = `
      <div class="cert-badge-circle">${badgeInner}</div>
      ${abbrLabel}
      <span class="cert-name">${cert.name}</span>
      <span class="cert-verify-label">${verifyLabel}</span>
    `;
    grid.appendChild(a);
  });
}

/* ═══════════════════════════════════════════════════════════
   8. TRAINING PAGE
   ═══════════════════════════════════════════════════════════ */

function initTrainingPage() {
  const grid = document.getElementById('training-grid');
  if (!grid || typeof SITE_DATA === 'undefined') return;

  SITE_DATA.training.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'training-card';
    const tagsHTML = entry.tools
      .map(t => `<span class="tag ${getTagClass(t)}">${t}</span>`)
      .join('');
    card.innerHTML = `
      <h3 class="training-name">${entry.name}</h3>
      <div class="card-tags">${tagsHTML}</div>
      <p class="training-desc">${entry.description}</p>
    `;
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════════
   9. WRITE-UPS PAGE
   ═══════════════════════════════════════════════════════════ */

function buildWriteupCard(entry) {
  const cat = CATEGORY_COLOR_MAP[entry.category] || { hex: '#00e5ff', rgba: 'rgba(0,229,255,' };

  const card = document.createElement('a');
  card.className = 'writeup-card';
  card.href      = `/writeups/${entry.slug}/`;
  card.target    = '_blank';
  card.rel       = 'noopener';
  card.setAttribute('role', 'listitem');
  card.style.borderTopColor = cat.hex;

  const tagsHTML = entry.tools
    .map(t => `<span class="tag ${getTagClass(t)}">${t}</span>`)
    .join('');

  card.innerHTML = `
    <div class="writeup-card-header">
      <span class="writeup-category" style="color:${cat.hex};border-color:${cat.rgba}0.3);background:${cat.rgba}0.06)">${entry.category}</span>
      <span class="writeup-date">${entry.date}</span>
    </div>
    <h3 class="writeup-title">${entry.title}</h3>
    <p class="writeup-summary">${entry.summary}</p>
    <div class="card-tags">${tagsHTML}</div>
    <span class="writeup-read-more" style="color:${cat.hex}">Read Write-Up &rarr;</span>
  `;

  card.addEventListener('mouseenter', () => {
    card.style.boxShadow  = `0 8px 30px ${cat.rgba}0.18), 0 0 0 1px ${cat.rgba}0.25)`;
    card.style.borderColor = `${cat.rgba}0.3)`;
    card.style.borderTopColor = cat.hex;
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow   = '';
    card.style.borderColor = '';
    card.style.borderTopColor = cat.hex;
  });

  return card;
}

function initWriteupsPage() {
  const grid = document.getElementById('writeup-grid');
  if (!grid || typeof SITE_DATA === 'undefined') return;

  if (!SITE_DATA.writeups || SITE_DATA.writeups.length === 0) {
    grid.innerHTML = `<p class="writeup-empty">// No write-ups published yet — check back soon.</p>`;
    return;
  }

  SITE_DATA.writeups.forEach(entry => grid.appendChild(buildWriteupCard(entry)));
}

/* ═══════════════════════════════════════════════════════════
   10. INTERNSHIP PAGE
   ═══════════════════════════════════════════════════════════ */

const INTERNSHIP_CATEGORY_COLOR = {
  'Overview':              { hex: '#00e5ff', cls: 'tag-siem'    },
  'Threat Hunting':        { hex: '#00ff88', cls: 'tag-threat'  },
  'Compliance':            { hex: '#b24dff', cls: 'tag-forensic'},
  'Vulnerability Management': { hex: '#ff9d00', cls: 'tag-network'}
};

function buildInternshipCard(entry) {
  const color = INTERNSHIP_CATEGORY_COLOR[entry.category] || { hex: '#00e5ff', cls: 'tag-siem' };

  const card = document.createElement('a');
  card.className = 'project-card';
  card.href      = `/internship/${entry.slug}/`;
  card.target    = '_blank';
  card.rel       = 'noopener';
  card.setAttribute('role', 'listitem');

  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-title">${entry.name}</h3>
      <span class="card-category" style="color:${color.hex}">${entry.category}</span>
    </div>
    <p class="card-desc">${entry.description}</p>
    <span class="card-link" style="color:${color.hex}">View on GitHub &rarr;</span>
  `;

  return card;
}

function initInternshipPage() {
  const grid = document.getElementById('internship-grid');
  if (!grid || typeof SITE_DATA === 'undefined') return;

  if (!SITE_DATA.internship || SITE_DATA.internship.length === 0) {
    grid.innerHTML = `<p class="writeup-empty">// No internship entries yet — check back soon.</p>`;
    return;
  }

  SITE_DATA.internship.forEach(entry => grid.appendChild(buildInternshipCard(entry)));
}

/* ═══════════════════════════════════════════════════════════
   12. CONTACT PAGE
   ═══════════════════════════════════════════════════════════ */

function initContactPage() {
  const linksEl = document.getElementById('contact-links');
  if (!linksEl || typeof SITE_DATA === 'undefined') return;

  const { email, linkedin, github } = SITE_DATA.contact;

  const buttons = [
    {
      href:  `mailto:${email}`,
      cls:   'email',
      icon:  '✉',
      label: email,
      tag:   'EMAIL'
    },
    {
      href:  linkedin,
      cls:   '',
      icon:  'in',
      label: 'LinkedIn Profile',
      tag:   'LINKEDIN'
    },
    {
      href:  github,
      cls:   'github',
      icon:  '⌥',
      label: 'GitHub Portfolio',
      tag:   'GITHUB'
    }
  ];

  linksEl.innerHTML = buttons.map(b => `
    <a class="contact-btn ${b.cls}" href="${b.href}" target="${b.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener">
      <span class="contact-btn-label">
        <span class="contact-btn-icon">${b.icon}</span>
        <span>${b.label}</span>
      </span>
      <span class="contact-btn-arrow">→</span>
    </a>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════
   13. PAGE ROUTER
   Called by DOMContentLoaded in the nav init block above.
   Each HTML page sets window.PAGE_ID before loading main.js
   ═══════════════════════════════════════════════════════════ */

function pageInit() {
  switch (window.PAGE_ID) {
    case 'home':           initHomePage();           break;
    case 'projects':       initProjectsPage();       break;
    case 'writeups':       initWriteupsPage();       break;
    case 'certifications': initCertificationsPage(); break;
    case 'training':       initTrainingPage();       break;
    case 'internship':     initInternshipPage();     break;
    case 'contact':        initContactPage();        break;
  }
}
