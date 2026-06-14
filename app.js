/* ============================================================
   FizioKG — homepage (vanilla JS port of the Claude Design prototype)
   Single dependency-free build. All section markup + interactivity.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- tiny DOM helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- icons (line style) ---------- */
  // Base line-icon builder. `d` => single path; `inner` => raw child markup.
  function ico({ d = "", size = 26, sw = 1.5, vb = 24, cls = "", inner = "" } = {}) {
    return (
      `<svg ${cls ? `class="${cls}" ` : ""}width="${size}" height="${size}" ` +
      `viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="${sw}" ` +
      `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
      (d ? `<path d="${d}"/>` : inner) +
      `</svg>`
    );
  }

  const UI = {
    arrow: (p) => ico({ ...p, d: "M5 12h14M13 6l6 6-6 6" }),
    arrowDown: (p) => ico({ ...p, d: "M12 5v14M6 13l6 6 6-6" }),
    phone: (p) => ico({ ...p, d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-1z" }),
    pin: (p) => ico({ ...p, inner: `<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>` }),
    clock: (p) => ico({ ...p, inner: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>` }),
    star: (p) => ico({ ...p, d: "M12 4l2.3 4.8 5.2.7-3.8 3.6.9 5.1L12 15.8 7.4 18.2l.9-5.1-3.8-3.6 5.2-.7z" }),
    check: (p) => ico({ ...p, d: "M5 12.5l4.5 4.5L19 6.5" }),
    quote: (p) => ico({ ...p, inner: `<path d="M9 7c-2.5 1-4 3-4 6h3a1.5 1.5 0 0 1 0 3H6a2 2 0 0 1-2-2v-2c0-3.3 2-6 5-7zM19 7c-2.5 1-4 3-4 6h3a1.5 1.5 0 0 1 0 3h-2a2 2 0 0 1-2-2v-2c0-3.3 2-6 5-7z"/>` }),
  };

  const TherapyIcons = {
    elektro: (p) => ico({ ...p, d: "M3 12h4l2-6 4 12 2-6h6" }),
    ultrazvuk: (p) => ico({ ...p, inner: `<path d="M6 9v6"/><path d="M9.5 6.5v11"/><path d="M13 9c2.2 1.6 2.2 4.4 0 6"/><path d="M16 6.5c4 3 4 8 0 11"/><path d="M19 4.5c5.4 4 5.4 11 0 15"/>` }),
    manualna: (p) => ico({ ...p, inner: `<path d="M8 13V7.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 11.5V6.5a1.5 1.5 0 0 1 3 0V12"/><path d="M14 11.5a1.5 1.5 0 0 1 3 0V14c0 3.3-2.2 6-5.5 6S6 17.3 6 14v-1.5a1.4 1.4 0 0 1 2-1.3"/>` }),
    magnet: (p) => ico({ ...p, inner: `<path d="M7 4v8a5 5 0 0 0 10 0V4"/><path d="M5 4h4M15 4h4"/><path d="M7 8h2M15 8h2"/>` }),
    kinezi: (p) => ico({ ...p, inner: `<circle cx="13" cy="5" r="2"/><path d="M13 8v5l4 3"/><path d="M13 11l-4 2-2 5"/><path d="M13 13l3 6"/>` }),
    laser: (p) => ico({ ...p, inner: `<path d="M4 20L20 4"/><path d="M14 4h6v6"/><path d="M9 13l2 2"/><path d="M6.5 10.5l1.5 1.5"/>` }),
  };

  /* ---------- wordmark ---------- */
  function logoMarkup(onDark = true) {
    const ink = onDark ? "var(--text-on-dark)" : "var(--text-on-light)";
    return (
      `<a href="#top" class="logo" aria-label="FizioKG" style="color:${ink}">` +
      `<svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">` +
      `<path d="M16 3c-4 3.4-4 7.2 0 10.6 4 3.4 4 7.2 0 10.6" stroke="var(--mint)" stroke-width="2" stroke-linecap="round" fill="none"/>` +
      `<path d="M16 4.6c3.4 1 5 2.6 5 4.6M16 27.4c-3.4-1-5-2.6-5-4.6" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" fill="none"/>` +
      `<circle cx="16" cy="16" r="2.1" fill="var(--mint)"/></svg>` +
      `<span class="logo__txt">Fizio<span class="logo__kg">KG</span></span></a>`
    );
  }

  /* ============================================================
     TOP NAV
     ============================================================ */
  function topNavMarkup() {
    return (
      `<header class="topnav" id="topnav">` +
      logoMarkup(true) +
      `<nav class="topnav__links">` +
      `<a href="#navigator">Gde vas boli</a>` +
      `<a href="#terapije">Terapije</a>` +
      `<a href="#tim">Tim</a>` +
      `<a href="#kontakt">Kontakt</a>` +
      `</nav>` +
      `<div class="topnav__cta">` +
      `<a href="tel:+38134000000" class="topnav__phone" aria-label="Pozovite" style="color:var(--mint)">${UI.phone({ size: 18 })}</a>` +
      `<a href="#kontakt" class="btn btn--mint">Zakaži pregled</a>` +
      `</div></header>`
    );
  }

  /* ============================================================
     HERO (variant A — breathing motion line + kinetic title)
     ============================================================ */
  const HERO_COPY = {
    eyebrow: "Fizioterapija · Kragujevac",
    sub: "Stručna fizioterapija i rehabilitacija u Kragujevcu. Vraćamo vas pokretu — bez bola, korak po korak.",
    primary: "Zakaži pregled",
    secondary: "Istraži terapije",
    stats: [["1200+", "pacijenata"], ["15", "godina iskustva"], ["12", "vrsta terapija"]],
  };

  function motionLineMarkup() {
    const wave = "M-60 470 C 250 360, 470 580, 740 470 S 1190 330, 1520 450";
    return (
      `<div class="motionline" aria-hidden="true">` +
      `<svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">` +
      `<path class="ml-faint" pathLength="100" d="M-60 250 C 240 180, 470 360, 740 270 S 1180 150, 1520 250"/>` +
      `<path class="ml-base" d="${wave}"/>` +
      `<path class="ml-glow" pathLength="100" d="${wave}"/>` +
      `<path class="ml-glow ml-glow--2" pathLength="100" d="${wave}"/>` +
      `</svg></div>`
    );
  }

  const FLOATERS = [
    { t: "Bol", x: "9%", y: "30%", d: 0.0, s: 40 },
    { t: "Ukočenost", x: "70%", y: "20%", d: 1.4, s: 27 },
    { t: "Napetost", x: "60%", y: "74%", d: 2.6, s: 31 },
    { t: "Išijas", x: "33%", y: "91%", d: 0.7, s: 24 },
    { t: "Umor", x: "85%", y: "58%", d: 3.4, s: 22 },
  ];
  function floatWordsMarkup() {
    return (
      `<div class="floatwords" aria-hidden="true">` +
      FLOATERS.map((f) =>
        `<span class="floatword" style="left:${f.x};top:${f.y};font-size:${f.s}px;--fd:${f.d}s">${f.t}</span>`
      ).join("") +
      `</div>`
    );
  }

  function kineticTitleMarkup() {
    const w = (txt, i, extra = "") => `<span class="kword ${extra}" style="--i:${i}">${txt}</span>`;
    return (
      `<h1 class="hero__title kinetic">` +
      `<span class="kline">${w("Telo", 0)}${w("govori.", 1)}</span>` +
      `<span class="kline">${w("Mi", 2)}` +
      `<span class="kword kword--accent" style="--i:3">slušamo.` +
      `<svg class="kunder" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true">` +
      `<path pathLength="100" d="M4 11 C 54 17, 150 4, 216 10"/></svg>` +
      `</span></span></h1>`
    );
  }

  function heroStatsMarkup() {
    return (
      `<div class="hero__stats">` +
      HERO_COPY.stats.map(([n, l]) => `<div class="hero__stat"><b>${n}</b><span>${l}</span></div>`).join("") +
      `</div>`
    );
  }
  function heroCtasMarkup() {
    return (
      `<div class="hero__ctas">` +
      `<a href="#kontakt" class="btn btn--mint">${HERO_COPY.primary} ${UI.arrow({ size: 18, cls: "arr" })}</a>` +
      `<a href="#terapije" class="btn btn--outline">${HERO_COPY.secondary}</a>` +
      `</div>`
    );
  }
  function heroPhotoMarkup(tag = "Topla, stručna nega") {
    // Real responsive image: fluidly fills the 4:5 slot via object-fit, loads
    // eagerly (above the fold), and removes itself if the file is missing so the
    // gradient placeholder shows. Add hero-800/1200/1600 variants + srcset later
    // for resolution switching; a single hero.jpg already scales to any viewport.
    return (
      `<div class="photo hero__photo">` +
      `<img class="photo__img" src="hero.jpg" ` +
      `alt="Fizioterapeut radi sa pacijentom u toploj, stručnoj atmosferi" ` +
      `sizes="(max-width: 880px) 90vw, 45vw" ` +
      `loading="eager" fetchpriority="high" decoding="async" ` +
      `onerror="this.remove()">` +
      `<div class="photo__grain"></div><span class="photo__tag">${tag}</span></div>`
    );
  }

  function heroMarkup() {
    return (
      `<section class="section--dark hero heroA" id="top">` +
      `<div class="hero__bgglow"></div>` +
      motionLineMarkup() +
      floatWordsMarkup() +
      `<div class="wrap">` +
      `<div class="hero__left">` +
      `<div class="hero__eyebrow heroin" style="--d:60ms"><span class="eyebrow">${HERO_COPY.eyebrow}</span></div>` +
      kineticTitleMarkup() +
      `<p class="hero__sub heroin" style="--d:880ms">${HERO_COPY.sub}</p>` +
      `<div class="heroin" style="--d:1020ms">${heroCtasMarkup()}</div>` +
      `<div class="heroin" style="--d:1160ms">${heroStatsMarkup()}</div>` +
      `</div>` +
      `<div class="hero__photo-wrap heroin" style="--d:420ms">` +
      heroPhotoMarkup() +
      `<div class="hero__badge"><span class="ic">${UI.check({ size: 20, sw: 2.4 })}</span>` +
      `<div><b>4.9</b><span>prosečna ocena pacijenata</span></div></div>` +
      `</div>` +
      `</div>` +
      `<div class="hero__scroll">skrolujte ${UI.arrowDown({ size: 18 })}</div>` +
      `</section>`
    );
  }

  /* ============================================================
     ANATOMSKI NAVIGATOR
     ============================================================ */
  const ZONES = {
    vrat: { label: "Vrat", blurb: "Tenzija i ukočenost koji zrače ka glavi i ramenima.",
      conditions: ["Ukočenost vrata", "Cervikalni sindrom", "Tenzione glavobolje"],
      therapies: ["Manualna terapija", "Laser terapija", "Elektroterapija (TENS)"], dot: [100, 70] },
    ramena: { label: "Ramena", blurb: "Ograničen pokret i bol pri podizanju ruke.",
      conditions: ["Bol u ramenu", "Smrznuto rame", "Impingement sindrom"],
      therapies: ["Manualna terapija", "Ultrazvučna terapija", "Kineziterapija"], dot: [60, 108] },
    ruka: { label: "Lakat i šaka", blurb: "Preopterećenje tetiva i nervna kompresija.",
      conditions: ["Teniski lakat", "Sindrom karpalnog tunela", "Tendinitis"],
      therapies: ["Ultrazvučna terapija", "Laser terapija", "Elektroterapija (TENS)"], dot: [165, 190] },
    ledja: { label: "Donja leđa", blurb: "Najčešći razlog dolaska — bol koji se širi ka nozi.",
      conditions: ["Išijas", "Lumbago", "Diskus hernija"],
      therapies: ["Manualna terapija", "Magnetna terapija", "Kineziterapija"], dot: [100, 196] },
    kuk: { label: "Kuk", blurb: "Bol u preponama i ograničena pokretljivost.",
      conditions: ["Artroza kuka", "Burzitis", "Bol u preponama"],
      therapies: ["Magnetna terapija", "Kineziterapija", "Manualna terapija"], dot: [134, 250] },
    koleno: { label: "Koleno", blurb: "Rehabilitacija nakon povrede i hronični bol.",
      conditions: ["Rehabilitacija kolena", "Artroza kolena", "Povreda meniskusa"],
      therapies: ["Kineziterapija", "Magnetna terapija", "Laser terapija"], dot: [118, 356] },
    stopalo: { label: "Stopalo i skočni zglob", blurb: "Bol pri prvom koraku i posledice uganuća.",
      conditions: ["Petni trn", "Plantarni fasciitis", "Uganuće zgloba"],
      therapies: ["Ultrazvučna terapija", "Laser terapija", "Elektroterapija (TENS)"], dot: [82, 452] },
  };
  const ZONE_KEYS = Object.keys(ZONES);
  const QUICK = [
    ["Išijas", "ledja"], ["Bol u ramenu", "ramena"],
    ["Rehabilitacija kolena", "koleno"], ["Ukočenost vrata", "vrat"],
  ];
  const HALF =
    "M100 16 C112 16 122 26 122 41 C122 53 117 61 110 65 C110 71 110 77 117 81 " +
    "C132 85 151 93 158 113 C164 132 167 161 167 191 C167 206 163 212 157 212 " +
    "C152 212 150 205 149 193 C147 167 145 142 139 127 C134 117 127 113 119 113 " +
    "C121 140 123 166 127 193 C130 214 133 232 133 253 C133 276 130 302 127 332 " +
    "C125 362 123 401 122 437 C121 455 120 464 117 469 C114 473 109 474 106 471 " +
    "C104 468 104 462 104 452 C105 420 106 382 105 344 C104 322 103 304 102 296 " +
    "C101 291 100 289 100 286 L100 16 Z";

  function bodyFigureMarkup(active) {
    const zones = ZONE_KEYS.map((key, i) => {
      const z = ZONES[key];
      const [x, y] = z.dot;
      const on = active === key;
      return (
        `<g class="zone${on ? " zone--on" : ""}" data-zone="${key}" role="button" tabindex="0" ` +
        `style="--zd:${(i * 0.42).toFixed(2)}s" aria-label="${z.label}" aria-pressed="${on}">` +
        `<circle class="zone__hit" cx="${x}" cy="${y}" r="22"/>` +
        (on ? `<circle class="zone__glow" cx="${x}" cy="${y}" r="20" fill="url(#dotglow)"/>` : "") +
        (on ? `<circle class="zone__beat" cx="${x}" cy="${y}" r="9"/>` : "") +
        `<circle class="zone__halo" cx="${x}" cy="${y}" r="13" fill="url(#dotglow)"/>` +
        `<circle class="zone__ring" cx="${x}" cy="${y}" r="9"/>` +
        `<circle class="zone__dot" cx="${x}" cy="${y}" r="5"/></g>`
      );
    }).join("");

    return (
      `<svg class="bodysvg" viewBox="0 0 200 490" aria-label="Mapa tela" role="group">` +
      `<defs>` +
      `<linearGradient id="bodyfill" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="#5d8a6c"/><stop offset="0.5" stop-color="#41694b"/><stop offset="1" stop-color="#2c4b34"/></linearGradient>` +
      `<radialGradient id="dotglow" cx="0.5" cy="0.5" r="0.5">` +
      `<stop offset="0" stop-color="#9FE1CB" stop-opacity="0.55"/>` +
      `<stop offset="1" stop-color="#9FE1CB" stop-opacity="0"/></radialGradient></defs>` +
      `<g class="bodyform"><circle cx="100" cy="40" r="25"/>` +
      `<path d="${HALF}"/><path d="${HALF}" transform="matrix(-1 0 0 1 200 0)"/></g>` +
      `<path class="spine" d="M100 66 V 462"/>` +
      `<path class="spine-pulse" pathLength="100" d="M100 66 V 462"/>` +
      `<path class="spine-pulse spine-pulse--2" pathLength="100" d="M100 66 V 462"/>` +
      `<g class="branch-slot">${branchMarkup(active)}</g>` +
      zones +
      `</svg>`
    );
  }
  function branchMarkup(active) {
    const [bx, by] = ZONES[active].dot;
    if (Math.abs(bx - 100) < 2) return "";
    return (
      `<g class="branch"><line class="branch__line" x1="100" y1="${by}" x2="${bx}" y2="${by}"/>` +
      `<circle class="branch__node" cx="100" cy="${by}" r="2.4"/></g>`
    );
  }

  function navPanelMarkup(active) {
    const z = ZONES[active];
    const num = ZONE_KEYS.indexOf(active) + 1;
    return (
      `<div class="nav-panel__head">` +
      `<div class="nav-panel__num">0${num}<span>/07</span></div>` +
      `<div class="nav-panel__live">` +
      `<svg class="ekg" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">` +
      `<path pathLength="100" d="M0 17 H30 l5 -12 6 24 5 -16 4 8 H64 l5 -10 6 18 4 -8 H120"/></svg>` +
      `<span class="nav-panel__livelbl">signal uživo</span></div></div>` +
      `<h3 class="nav-panel__title">${z.label}</h3>` +
      `<p class="nav-panel__blurb">${z.blurb}</p>` +
      `<div class="nav-panel__block"><span class="nav-panel__lbl">Česti problemi</span>` +
      `<div class="pillrow">${z.conditions.map((c) => `<span class="pill pill--cond">${c}</span>`).join("")}</div></div>` +
      `<div class="nav-panel__block"><span class="nav-panel__lbl">Preporučene terapije</span>` +
      `<div class="pillrow">${z.therapies.map((t) => `<span class="pill pill--ther">${UI.check({ size: 14, sw: 2 })}${t}</span>`).join("")}</div></div>` +
      `<a href="#kontakt" class="btn btn--mint nav-panel__cta">Zakaži pregled za ovaj predeo ${UI.arrow({ size: 18, cls: "arr" })}</a>`
    );
  }

  function navigatorMarkup() {
    const active = "ledja";
    return (
      `<div class="section section--dark" id="navigator">` +
      `<div class="wrap">` +
      `<div class="nav-head reveal"><span class="eyebrow">Anatomski navigator</span>` +
      `<h2 class="h-sec">Gde vas boli?</h2>` +
      `<p class="nav-sub">Ne morate znati naziv terapije. Pokažite gde osećate bol — mi vam predlažemo pravi tretman.</p></div>` +
      `<div class="nav-grid reveal" style="--d:120ms">` +
      `<div class="nav-figure" id="navFigure">${bodyFigureMarkup(active)}` +
      `<span class="nav-figure__hint">Izaberite predeo tela</span></div>` +
      `<div class="nav-panel" id="navPanel">${navPanelMarkup(active)}</div>` +
      `</div>` +
      `<div class="quickrow reveal" style="--d:200ms"><span class="quickrow__lbl">Često traženo:</span>` +
      QUICK.map(([label, key]) =>
        `<button class="pill pill--quick${key === active ? " is-active" : ""}" data-quick="${key}">${label}</button>`
      ).join("") +
      `</div>` +
      `</div></div>`
    );
  }

  function wireNavigator() {
    const section = $("#navigator");
    let active = "ledja";

    const setActive = (key) => {
      if (!ZONES[key]) return;
      active = key;
      // update zone classes + glow/beat overlays
      $$(".zone", section).forEach((g) => {
        const k = g.dataset.zone;
        const on = k === active;
        g.classList.toggle("zone--on", on);
        g.setAttribute("aria-pressed", String(on));
        // rebuild dynamic glow/beat children to match React's conditional render
        g.querySelectorAll(".zone__glow, .zone__beat").forEach((n) => n.remove());
        if (on) {
          const [x, y] = ZONES[k].dot;
          const ring = g.querySelector(".zone__ring");
          ring.insertAdjacentHTML("beforebegin",
            `<circle class="zone__glow" cx="${x}" cy="${y}" r="20" fill="url(#dotglow)"/>` +
            `<circle class="zone__beat" cx="${x}" cy="${y}" r="9"/>`);
        }
      });
      // restart the branch draw animation by replacing the slot contents
      const slot = $(".branch-slot", section);
      if (slot) slot.innerHTML = branchMarkup(active);
      // re-render panel (restarts panelfade)
      $("#navPanel", section).innerHTML = navPanelMarkup(active);
      // sync quick pills
      $$(".pill--quick", section).forEach((b) => b.classList.toggle("is-active", b.dataset.quick === active));
    };

    section.addEventListener("click", (e) => {
      const zone = e.target.closest(".zone");
      if (zone) { setActive(zone.dataset.zone); return; }
      const quick = e.target.closest(".pill--quick");
      if (quick) setActive(quick.dataset.quick);
    });
    section.addEventListener("keydown", (e) => {
      const zone = e.target.closest(".zone");
      if (zone && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setActive(zone.dataset.zone); }
    });
  }

  /* ============================================================
     REZULTATI (chart + count-up + patient stories)
     ============================================================ */
  const WK = ["1", "2", "3", "4", "5", "6"];
  const CHART_X = [40, 120, 200, 280, 360, 440];
  const PAIN = [44, 74, 120, 162, 198, 226];
  const MOVE = [228, 196, 150, 108, 70, 46];
  const pathOf = (ys) => "M" + CHART_X.map((x, i) => `${x} ${ys[i]}`).join(" L");

  function recoveryChartMarkup() {
    return (
      `<div class="chart-card reveal">` +
      `<div class="chart-card__head"><span class="chart-card__lbl">Putanja oporavka</span>` +
      `<div class="chart-legend">` +
      `<span class="chart-legend__i chart-legend__i--pain">Bol</span>` +
      `<span class="chart-legend__i chart-legend__i--move">Pokretljivost</span></div></div>` +
      `<svg class="chart" viewBox="0 0 480 268" preserveAspectRatio="xMidYMid meet" role="img" ` +
      `aria-label="Grafikon: bol opada, pokretljivost raste tokom šest nedelja terapije">` +
      [40, 100, 160, 220].map((y) => `<line class="chart-grid" x1="40" y1="${y}" x2="448" y2="${y}"/>`).join("") +
      `<path class="chartline chartline--move" pathLength="100" d="${pathOf(MOVE)}"/>` +
      `<path class="chartline chartline--pain chartline--2" pathLength="100" d="${pathOf(PAIN)}"/>` +
      CHART_X.map((x, i) => `<circle class="chartdot chartdot--pain" cx="${x}" cy="${PAIN[i]}" r="3.4" style="--i:${i}"/>`).join("") +
      CHART_X.map((x, i) => `<circle class="chartdot chartdot--move" cx="${x}" cy="${MOVE[i]}" r="3.4" style="--i:${i}"/>`).join("") +
      WK.map((w, i) => `<text class="chart-x" x="${CHART_X[i]}" y="258" text-anchor="middle">Ned. ${w}</text>`).join("") +
      `</svg>` +
      `<div class="chart-foot">` +
      `<span><b>−78%</b> prosečan bol</span>` +
      `<span><b>+64%</b> pokretljivost</span>` +
      `<span class="chart-foot__note">prosek za 6 nedelja terapije</span></div></div>`
    );
  }

  const RSTATS = [
    { n: 1200, suffix: "+", label: "zadovoljnih pacijenata", sub: "od 2011. do danas" },
    { n: 15, suffix: "", label: "godina iskustva", sub: "u Kragujevcu" },
    { n: 12, suffix: "", label: "vrsta terapija", sub: "pod jednim krovom" },
  ];
  const RTESTI = [
    { q: "Posle tri nedelje terapije išijas je nestao. Prvi put posle godinu dana spavam bez bolova.",
      n: "Marija J.", r: "Lumbalni sindrom", res: "Bez bolova posle 3 nedelje", a: "M" },
    { q: "Rehabilitacija kolena posle operacije išla je brže nego što sam očekivao. Ljubazni i temeljni.",
      n: "Nenad P.", r: "Rehabilitacija kolena", res: "Pun pokret za 6 nedelja", a: "N" },
  ];

  function resultsMarkup() {
    const stats = RSTATS.map((s, i) =>
      `<div class="rstat" style="--d:${i * 60}ms">` +
      `<b class="rstat__num" data-count="${s.n}" data-suffix="${s.suffix}">0<span class="rstat__suf">${s.suffix}</span></b>` +
      `<span class="rstat__lbl">${s.label}</span>` +
      (s.sub ? `<span class="rstat__sub">${s.sub}</span>` : "") +
      `</div>`
    ).join("");

    const testi = RTESTI.map((t, i) =>
      `<figure class="testi-card reveal" style="--d:${i * 110}ms">` +
      `<span class="testi-card__cond">${t.r}</span>` +
      `<div class="qico">${UI.quote({ size: 30 })}</div>` +
      `<blockquote>${t.q}</blockquote>` +
      `<div class="testi-card__res"><span class="testi-card__resic">${UI.check({ size: 15, sw: 2.4 })}</span>${t.res}</div>` +
      `<figcaption class="testi-foot"><span class="avatar">${t.a}</span>` +
      `<div><b>${t.n}</b><span class="stars">${[0, 1, 2, 3, 4].map(() => UI.star({ size: 13, sw: 0 })).join("")}</span></div>` +
      `</figcaption></figure>`
    ).join("");

    return (
      `<section class="section section--light" id="rezultati"><div class="wrap">` +
      `<div class="sec-head reveal"><span class="eyebrow">Dokazani rezultati</span>` +
      `<h2 class="h-sec">Oporavak koji se <em>meri</em></h2>` +
      `<p>Petnaest godina rada sa pacijentima svih uzrasta — od sportskih povreda do hronične rehabilitacije. Brojke koje stoje iza svakog plana.</p></div>` +
      `<div class="results-feature">${recoveryChartMarkup()}` +
      `<div class="results-stats reveal" style="--d:120ms">${stats}</div></div>` +
      `<div class="testi-row">${testi}</div>` +
      `</div></section>`
    );
  }

  function wireCountUps() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $$(".rstat__num").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const render = (v) => {
        el.innerHTML = `${v.toLocaleString("sr-RS")}<span class="rstat__suf">${suffix}</span>`;
      };
      if (reduce) { render(target); return; }
      let done = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            done = true; io.disconnect();
            const start = performance.now();
            const dur = 1500;
            const tick = (now) => {
              const p = Math.min(1, (now - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              render(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  }

  /* ============================================================
     TERAPIJE (expanding panels)
     ============================================================ */
  const THERAPIES = [
    { ic: "elektro", n: "Elektroterapija", d: "TENS i EMS za ublažavanje bola i jačanje oslabljenih mišića.", t: "TENS / EMS",
      meta: [["Trajanje", "15–20 min"], ["Seansi", "6–10"]], good: ["Bol u leđima", "Slabost mišića", "Išijas"] },
    { ic: "ultrazvuk", n: "Ultrazvučna terapija", d: "Duboko zagrevanje tkiva koje ubrzava regeneraciju i smanjuje ukočenost.", t: "Ultrazvuk",
      meta: [["Trajanje", "10–15 min"], ["Seansi", "5–8"]], good: ["Tendinitis", "Ožiljno tkivo", "Ukočenost"] },
    { ic: "manualna", n: "Manualna terapija", d: "Mobilizacija zglobova i oslobađanje mekih tkiva rukama terapeuta.", t: "Hands-on",
      meta: [["Trajanje", "30–45 min"], ["Seansi", "4–8"]], good: ["Blokade kičme", "Vrat i ramena", "Glavobolje"] },
    { ic: "magnet", n: "Magnetna terapija", d: "Pulsno magnetno polje smanjuje upalu i podstiče zarastanje kostiju.", t: "PEMF",
      meta: [["Trajanje", "20–30 min"], ["Seansi", "8–12"]], good: ["Prelomi", "Artroza", "Upale zglobova"] },
    { ic: "kinezi", n: "Kineziterapija", d: "Vođene vežbe za pokret, snagu i pravilno držanje — temelj svakog oporavka.", t: "Pokret",
      meta: [["Trajanje", "40–60 min"], ["Seansi", "8–16"]], good: ["Loše držanje", "Posle operacije", "Stabilnost"] },
    { ic: "laser", n: "Laser terapija", d: "Ciljana svetlosna energija smanjuje bol i upalu na nivou ćelije.", t: "Laser",
      meta: [["Trajanje", "8–12 min"], ["Seansi", "5–10"]], good: ["Akutni bol", "Otok", "Sportske povrede"] },
  ];

  function therapiesMarkup() {
    const panels = THERAPIES.map((th, i) => {
      const Icon = TherapyIcons[th.ic];
      const on = i === 0;
      return (
        `<div class="tpanel${on ? " tpanel--on" : ""}" data-idx="${i}" tabindex="0" role="button" ` +
        `aria-pressed="${on}" aria-label="${th.n}">` +
        `<div class="tpanel__rail">` +
        `<span class="tpanel__num">0${i + 1}</span>` +
        `<span class="tpanel__railic">${Icon({ size: 22 })}</span>` +
        `<span class="tpanel__name">${th.n}</span></div>` +
        `<div class="tpanel__body">` +
        `<span class="tpanel__ghost" aria-hidden="true">${Icon({ size: 340 })}</span>` +
        `<span class="tpanel__bignum" aria-hidden="true">0${i + 1}</span>` +
        `<div class="tpanel__top"><span class="tpanel__ic">${Icon({ size: 30 })}</span>` +
        `<span class="tpanel__tag">${th.t}</span></div>` +
        `<div class="tpanel__content"><h3>${th.n}</h3><p>${th.d}</p>` +
        `<ul class="tpanel__good">${th.good.map((g) => `<li>${UI.check({ size: 14, sw: 2.6 })} ${g}</li>`).join("")}</ul>` +
        `<div class="tpanel__meta">` +
        th.meta.map(([k, v]) => `<div class="tpanel__metaitem"><b>${v}</b><span>${k}</span></div>`).join("") +
        `<a href="#kontakt" class="tpanel__cta" data-cta>Zakaži ${UI.arrow({ size: 18, cls: "arr" })}</a>` +
        `</div></div></div></div>`
      );
    }).join("");

    return (
      `<section class="section section--dark" id="terapije"><div class="wrap">` +
      `<div class="sec-head reveal"><span class="eyebrow">Naše terapije</span>` +
      `<h2 class="h-sec">Dvanaest pristupa, <em>jedan cilj</em></h2>` +
      `<p>Svaki plan kombinujemo prema vašoj dijagnozi — od akutne faze do potpunog povratka funkciji.</p></div>` +
      `<div class="ther-panels reveal" id="therPanels">${panels}</div>` +
      `</div></section>`
    );
  }

  function wireTherapies() {
    const wrap = $("#therPanels");
    const setActive = (idx) => {
      $$(".tpanel", wrap).forEach((p) => {
        const on = Number(p.dataset.idx) === idx;
        p.classList.toggle("tpanel--on", on);
        p.setAttribute("aria-pressed", String(on));
      });
    };
    wrap.addEventListener("mouseover", (e) => {
      const p = e.target.closest(".tpanel");
      if (p) setActive(Number(p.dataset.idx));
    });
    wrap.addEventListener("click", (e) => {
      if (e.target.closest("[data-cta]")) { e.stopPropagation(); return; }
      const p = e.target.closest(".tpanel");
      if (p) setActive(Number(p.dataset.idx));
    });
    wrap.addEventListener("focusin", (e) => {
      const p = e.target.closest(".tpanel");
      if (p) setActive(Number(p.dataset.idx));
    });
  }

  /* ============================================================
     TIM (editorial staggered cards)
     ============================================================ */
  const TEAM = [
    { n: "Dr Ana Kovačević", r: "Diplomirani fizioterapeut", y: "15 god.", tag: "Manualna terapija",
      p: "Specijalista za manuelnu terapiju i rehabilitaciju kičme.", q: "Svaki oporavak počinje slušanjem." },
    { n: "Miloš Ranković", r: "Sportski fizioterapeut", y: "10 god.", tag: "Sport i zglobovi",
      p: "Radi sa sportistima i povredama zglobova — strpljiv vodič kroz svaku fazu povratka.", q: "Strpljenje je deo terapije." },
    { n: "Jovana Ilić", r: "Kineziterapeut", y: "8 god.", tag: "Kineziterapija",
      p: "Osmišljava programe vežbi koji se uklapaju u stvarni život pacijenta, ne obrnuto.", q: "Vežba mora da stane u tvoj dan." },
  ];
  function teamMarkup() {
    const cards = TEAM.map((m, i) =>
      `<article class="tm-card reveal" style="--d:${i * 100}ms">` +
      `<div class="tm-card__photo photo"><div class="photo__grain"></div>` +
      `<span class="tm-card__idx">0${i + 1}</span><span class="tm-card__tag">${m.tag}</span></div>` +
      `<div class="tm-card__body"><h3>${m.n}</h3>` +
      `<div class="tm-card__role">${m.r} · <span>${m.y}</span></div>` +
      `<p>${m.p}</p><blockquote class="tm-card__q">„${m.q}”</blockquote></div></article>`
    ).join("");
    return (
      `<section class="section section--light" id="tim"><div class="wrap">` +
      `<div class="sec-head reveal"><span class="eyebrow">Naš tim</span>` +
      `<h2 class="h-sec">Ljudi koji vas <em>vode</em></h2>` +
      `<p>Stručni, pristupačni i posvećeni svakom koraku oporavka — od prvog pregleda do povratka u formu.</p></div>` +
      `<div class="team-grid">${cards}</div></div></section>`
    );
  }

  /* ============================================================
     KONTAKT (3-step guided booking) + info
     ============================================================ */
  const PROBLEMS = [
    "Bol u leđima / išijas", "Vrat i ramena", "Koleno",
    "Sportska povreda", "Rehabilitacija posle operacije", "Nešto drugo",
  ];
  const TIMES = ["08:00", "09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"];
  const DOW = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
  const MON = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
  const STEPS = ["Tegoba", "Termin", "Podaci"];

  function upcomingDays(n) {
    const out = []; const base = new Date(); let i = 0;
    while (out.length < n) {
      const c = new Date(base); c.setDate(base.getDate() + i); i++;
      if (c.getDay() === 0) continue; // nedeljom zatvoreno
      out.push({
        key: `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`,
        dow: DOW[c.getDay()], day: c.getDate(), mon: MON[c.getMonth()],
        full: `${DOW[c.getDay()]} ${c.getDate()}. ${MON[c.getMonth()]}`,
      });
    }
    return out;
  }
  function isTaken(dayKey, idx) {
    let s = idx * 7;
    for (let k = 0; k < dayKey.length; k++) s += dayKey.charCodeAt(k);
    return s % 4 === 0;
  }

  const DAYS = upcomingDays(6);

  function contactMarkup() {
    const hours = [["Ponedeljak – Petak", "08 – 20h", false], ["Subota", "09 – 14h", false], ["Nedelja", "Zatvoreno", true]];
    return (
      `<section class="section section--dark" id="kontakt"><div class="wrap">` +
      `<div class="sec-head reveal"><span class="eyebrow">Zakaži pregled</span>` +
      `<h2 class="h-sec">Telo vam već govori. <em>Javite se.</em></h2>` +
      `<p>Rezervišite termin za nepun minut — javljamo se istog dana da potvrdimo.</p></div>` +
      `<div class="contact-grid">` +
      `<div class="booking reveal" id="booking"></div>` +
      `<div class="cinfo reveal" style="--d:120ms">` +
      `<div class="cmap" role="img" aria-label="Mapa lokacije ordinacije">` +
      `<div class="cmap__road1"></div><div class="cmap__road2"></div>` +
      `<div class="cmap__pin">${UI.pin({ size: 34, sw: 1.6 })}</div>` +
      `<span class="cmap__label">FizioKG · centar grada</span>` +
      `<a href="https://maps.google.com/?q=Kragujevac" target="_blank" rel="noopener" class="cmap__link">Otvori u mapama ${UI.arrow({ size: 15 })}</a></div>` +
      `<div class="cdetails">` +
      `<div class="cdetail"><span class="cdetail__ic">${UI.pin({ size: 20 })}</span><div><b>Adresa</b><span>Kralja Aleksandra 24, Kragujevac</span></div></div>` +
      `<div class="cdetail"><span class="cdetail__ic">${UI.phone({ size: 20 })}</span><div><b>Telefon</b><span>034 / 123 456 · 060 123 4567</span></div></div>` +
      `<div class="cdetail"><span class="cdetail__ic">${UI.clock({ size: 20 })}</span>` +
      `<div style="width:100%"><b>Radno vreme</b><div class="hours" style="margin-top:8px">` +
      hours.map(([day, h, closed]) =>
        `<div class="hours-row${closed ? " hours-row--closed" : ""}"><span>${day}</span><span>${h}</span></div>`
      ).join("") +
      `</div></div></div>` +
      `</div></div>` +
      `</div></div></section>`
    );
  }

  function wireBooking() {
    const root = $("#booking");
    const state = { step: 0, problem: "", day: null, time: "", name: "", phone: "", msg: "", sent: false };

    const canNext = () => [!!state.problem, !!(state.day && state.time), !!(state.name && state.phone)][state.step];

    function stepperMarkup() {
      return (
        `<div class="bk-steps">` +
        STEPS.map((s, i) => {
          const cls = "bk-step" + (i === state.step ? " bk-step--active" : "") + (i < state.step ? " bk-step--done" : "");
          const num = i < state.step ? UI.check({ size: 15, sw: 2.6 }) : "0" + (i + 1);
          return `<div class="${cls}"><span class="bk-step__num">${num}</span><span class="bk-step__lbl">${s}</span>${i < 2 ? `<span class="bk-step__bar"></span>` : ""}</div>`;
        }).join("") +
        `</div>`
      );
    }

    function stageMarkup() {
      if (state.step === 0) {
        return (
          `<h3 class="bk-h">Šta vas muči?</h3><div class="bk-chips">` +
          PROBLEMS.map((p) => `<button type="button" class="bk-chip${state.problem === p ? " is-sel" : ""}" data-problem="${p}">${p}</button>`).join("") +
          `</div>`
        );
      }
      if (state.step === 1) {
        const days = DAYS.map((day) =>
          `<button type="button" class="bk-day${state.day && state.day.key === day.key ? " is-sel" : ""}" data-day="${day.key}">` +
          `<span class="bk-day__dow">${day.dow}</span><span class="bk-day__num">${day.day}</span><span class="bk-day__mon">${day.mon}</span></button>`
        ).join("");
        const times = TIMES.map((t, i) => {
          const taken = state.day && isTaken(state.day.key, i);
          const dis = !state.day || taken;
          return `<button type="button" class="bk-time${state.time === t ? " is-sel" : ""}${taken ? " is-taken" : ""}"${dis ? " disabled" : ""} data-time="${t}">${t}</button>`;
        }).join("");
        return (
          `<h3 class="bk-h">Izaberite dan</h3><div class="bk-days">${days}</div>` +
          `<h3 class="bk-h bk-h--sub">${state.day ? "Slobodni termini" : "Prvo izaberite dan"}</h3>` +
          `<div class="bk-times${state.day ? "" : " bk-times--off"}">${times}</div>`
        );
      }
      return (
        `<h3 class="bk-h">Vaši podaci</h3><div class="bk-fields">` +
        `<div class="field"><label>Ime i prezime</label><input type="text" data-field="name" placeholder="npr. Marko Marković" value="${escapeAttr(state.name)}"></div>` +
        `<div class="field"><label>Telefon</label><input type="tel" data-field="phone" placeholder="06x xxx xxxx" value="${escapeAttr(state.phone)}"></div>` +
        `<div class="field"><label>Poruka <span class="field__opt">(opciono)</span></label><textarea data-field="msg" placeholder="Ukratko opišite tegobe…">${escapeHtml(state.msg)}</textarea></div>` +
        `</div>`
      );
    }

    function footMarkup() {
      const summary =
        (state.problem ? `<span class="bk-tagsum">${state.problem}</span>` : "") +
        (state.day ? `<span class="bk-tagsum">${state.day.full}</span>` : "") +
        (state.time ? `<span class="bk-tagsum bk-tagsum--time">${state.time}</span>` : "") +
        (!state.problem ? `<span class="bk-summary__empty">Vaš termin se gradi ovde…</span>` : "");
      const nextLabel = state.step < 2
        ? `Dalje ${UI.arrow({ size: 18, cls: "arr" })}`
        : `Potvrdi zakazivanje ${UI.check({ size: 18, sw: 2.4 })}`;
      return (
        `<div class="bk-foot"><div class="bk-summary">${summary}</div>` +
        `<div class="bk-nav">` +
        (state.step > 0 ? `<button type="button" class="btn btn--outline" data-act="back">Nazad</button>` : "") +
        `<button type="button" class="btn btn--mint" data-act="next"${canNext() ? "" : " disabled"}>${nextLabel}</button>` +
        `</div></div>`
      );
    }

    function doneMarkup() {
      const first = (state.name.split(" ")[0]) || "vidimo se";
      return (
        `<div class="bk-done"><span class="bk-done__ic">${UI.check({ size: 34, sw: 2.4 })}</span>` +
        `<h3>Termin rezervisan</h3>` +
        `<p>Hvala, ${escapeHtml(first)}. Javljamo se na <b>${escapeHtml(state.phone)}</b> istog dana da potvrdimo.</p>` +
        `<div class="bk-done__card">` +
        `<div><span>Tegoba</span><b>${escapeHtml(state.problem)}</b></div>` +
        `<div><span>Termin</span><b>${state.day ? state.day.full : ""} · ${state.time}</b></div></div>` +
        `<button type="button" class="btn btn--outline" data-act="reset">Zakaži još jedan</button></div>`
      );
    }

    function render() {
      if (state.sent) { root.innerHTML = doneMarkup(); return; }
      root.innerHTML = stepperMarkup() + `<div class="bk-stage">${stageMarkup()}</div>` + footMarkup();
    }

    // Event delegation. Text-input typing updates state WITHOUT re-render (keeps focus),
    // only toggling the Next button's disabled state.
    root.addEventListener("click", (e) => {
      const t = e.target;
      const chip = t.closest("[data-problem]");
      if (chip) { state.problem = chip.dataset.problem; render(); return; }
      const day = t.closest("[data-day]");
      if (day) { state.day = DAYS.find((x) => x.key === day.dataset.day); state.time = ""; render(); return; }
      const time = t.closest("[data-time]:not([disabled])");
      if (time) { state.time = time.dataset.time; render(); return; }
      const act = t.closest("[data-act]");
      if (!act) return;
      const a = act.dataset.act;
      if (a === "back") { state.step = Math.max(0, state.step - 1); render(); }
      else if (a === "next") {
        if (!canNext()) return;
        if (state.step < 2) { state.step++; render(); } else { state.sent = true; render(); }
      } else if (a === "reset") {
        Object.assign(state, { step: 0, problem: "", day: null, time: "", name: "", phone: "", msg: "", sent: false });
        render();
      }
    });
    root.addEventListener("input", (e) => {
      const f = e.target.closest("[data-field]");
      if (!f) return;
      state[f.dataset.field] = f.value;
      const nextBtn = root.querySelector('[data-act="next"]');
      if (nextBtn) nextBtn.disabled = !canNext();
    });

    render();
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function footerMarkup() {
    return (
      `<footer class="foot"><div class="wrap">` +
      logoMarkup(true) +
      `<span class="foot__tag">Telo govori. Mi slušamo.</span>` +
      `<small>© 2026 FizioKG · Kragujevac, Srbija</small>` +
      `</div></footer>`
    );
  }

  /* ---------- escaping helpers ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  /* ============================================================
     SCROLL REVEAL (progressive enhancement)
     ============================================================ */
  function armReveal() {
    const root = document.documentElement;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });

    const observe = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

    requestAnimationFrame(() => {
      $$(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.classList.add("in");
      });
      root.classList.add("js");
      observe();
    });

    setTimeout(() => {
      $$(".reveal:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      });
    }, 1400);
  }

  /* ============================================================
     MOUNT
     ============================================================ */
  function mount() {
    const root = $("#root");
    root.innerHTML =
      topNavMarkup() +
      `<main>` +
      heroMarkup() +
      navigatorMarkup() +
      resultsMarkup() +
      therapiesMarkup() +
      teamMarkup() +
      contactMarkup() +
      `</main>` +
      footerMarkup();

    // top nav scroll state
    const nav = $("#topnav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    wireNavigator();
    wireTherapies();
    wireBooking();
    wireCountUps();
    armReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
