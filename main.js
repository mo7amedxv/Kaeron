const savedLang = localStorage.getItem("lang") || "ar";
const themeButtons = document.querySelectorAll(".theme-btn");

function applyTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

applyTheme(localStorage.getItem("theme") === "light");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("light-mode"));
  });
});
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

function toggleMenu(open) {
  mobileMenu.classList.toggle("active", open);
  hamburgerBtn.classList.toggle("active", open);
  hamburgerBtn.setAttribute("aria-expanded", open);
  mobileMenu.setAttribute("aria-hidden", !open);
  document.body.classList.toggle("menu-open", open);
}

hamburgerBtn.addEventListener("click", () => {
  toggleMenu(!mobileMenu.classList.contains("active"));
});
menuOverlay.addEventListener("click", () => toggleMenu(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});
// features
const featuresData = [
  { icon: '<i class="fa-solid fa-screwdriver-wrench"></i>', key: "builder" },
  { icon: '<i class="fa-solid fa-puzzle-piece"></i>', key: "compat" },
  { icon: '<i class="fa-solid fa-gauge-high"></i>', key: "bottleneck" },
  { icon: '<i class="fa-solid fa-chart-line"></i>', key: "fps" },
  { icon: '<i class="fa-solid fa-forward-fast"></i>', key: "futureProof" },
  { icon: '<i class="fa-solid fa-angles-up"></i>', key: "upgrade" },
  { icon: '<i class="fa-solid fa-scale-balanced"></i>', key: "compare" },
  { icon: '<i class="fa-solid fa-microchip"></i>', key: "assistant" },
];
const featuresContainer = document.getElementById("features-container");

function renderFeatures(lang) {
  const t = translations[lang] || translations.ar;
  const focusedIndex = Array.from(featuresContainer.children).indexOf(
    document.activeElement,
  );
  featuresContainer.innerHTML = "";

  featuresData.forEach((feature) => {
    const card = document.createElement("div");
    card.className = "feature-card card";
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="feature-icon card-icon">${feature.icon}</div>
      <h3 class="feature-heading card-title">${t[`features.${feature.key}.title`] ?? ""}</h3>
      <p class="feature-desc card-desc">${t[`features.${feature.key}.desc`] ?? ""}</p>
    `;
    featuresContainer.appendChild(card);
  });

  if (focusedIndex !== -1) {
    featuresContainer.children[focusedIndex]?.focus();
  }
}
const whyUsData = [
  { key: "scattered" },
  { key: "beginners" },
  { key: "database" },
];

const whyUsContainer = document.getElementById("why-us-container");

function renderWhyUs(lang) {
  const t = translations[lang] || translations.ar;
  const focusedIndex = Array.from(whyUsContainer.children).indexOf(
    document.activeElement,
  );
  whyUsContainer.innerHTML = "";

  whyUsData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card why-us-card";
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="card-icon why-us-number">${t[`whyus.${item.key}.number`] ?? ""}</div>
      <h3 class="card-title why-us-title">${t[`whyus.${item.key}.title`] ?? ""}</h3>
      <p class="card-desc why-us-desc">${t[`whyus.${item.key}.desc`] ?? ""}</p>
    `;
    whyUsContainer.appendChild(card);
  });

  if (focusedIndex !== -1) {
    whyUsContainer.children[focusedIndex]?.focus();
  }
}
document.getElementById("currentYear").textContent = new Date().getFullYear();
const MAX_FPS = 240; // reference scale used to size the FPS bar

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// Call this with any subset of fields to update the card.
function updateBenchmark(data) {
  if (data.gpu) {
    if (data.gpu.score != null) {
      document.getElementById("gpuValue").textContent = Number(
        data.gpu.score,
      ).toLocaleString("en-US");
    }
    if (data.gpu.name)
      document.getElementById("gpuName").textContent = data.gpu.name;
  }

  if (data.cpu) {
    if (data.cpu.score != null) {
      document.getElementById("cpuValue").textContent = Number(
        data.cpu.score,
      ).toLocaleString("en-US");
    }
    if (data.cpu.name)
      document.getElementById("cpuName").textContent = data.cpu.name;
  }

  if (data.bottleneckPercent != null) {
    const p = clamp(data.bottleneckPercent, 0, 100);
    document.getElementById("bottleneckBar").style.width = p + "%";
    const lang = document.documentElement.lang === "en" ? "en" : "ar";
    const labels = {
      ar: { excellent: "ممتاز", good: "جيد", high: "مرتفع" },
      en: { excellent: "Excellent", good: "Good", high: "High" },
    }[lang];
    const label =
      data.bottleneckLabel ||
      (p < 5 ? labels.excellent : p < 15 ? labels.good : labels.high);
    document.getElementById("bottleneckStatus").textContent =
      `${label} ✓ ${p.toFixed(1)}%`;
  }

  if (data.fps != null) {
    document.getElementById("fpsStatus").textContent =
      `FPS ${Math.round(data.fps)}`;
    document.getElementById("fpsBar").style.width =
      clamp((data.fps / MAX_FPS) * 100, 0, 100) + "%";
  }

  if (data.futureTotal != null && data.futureScore != null) {
    document.getElementById("futureStatus").textContent =
      `${data.futureTotal} / ${data.futureScore}`;
    document.getElementById("futureBar").style.width =
      clamp((data.futureScore / data.futureTotal) * 100, 0, 100) + "%";
  }
}

// ---- Demo only: simulates a live feed so you can see it move. ----
// Delete this block and use the fetch() example below for real data.
let liveState = {
  gpu: 34811,
  cpu: 41230,
  bottleneck: 2.4,
  fps: 148,
  future: 87,
};

function simulateLiveTick() {
  liveState.gpu = clamp(
    liveState.gpu + Math.round((Math.random() - 0.5) * 120),
    1000,
    99999,
  );
  liveState.cpu = clamp(
    liveState.cpu + Math.round((Math.random() - 0.5) * 150),
    1000,
    99999,
  );
  liveState.bottleneck = clamp(
    liveState.bottleneck + (Math.random() - 0.5) * 0.6,
    0,
    30,
  );
  liveState.fps = clamp(
    Math.round(liveState.fps + (Math.random() - 0.5) * 8),
    30,
    240,
  );
  liveState.future = clamp(
    Math.round(liveState.future + (Math.random() - 0.5) * 2),
    0,
    100,
  );

  updateBenchmark({
    gpu: { score: liveState.gpu },
    cpu: { score: liveState.cpu },
    bottleneckPercent: liveState.bottleneck,
    fps: liveState.fps,
    futureTotal: 100,
    futureScore: liveState.future,
  });
}

setInterval(simulateLiveTick, 2500);

const translations = {
  ar: {
    "site.title": "elkaeron",
    "meta.description":
      "منصة متكاملة لبناء تجميعات الحاسوب، فحص التوافق، تحليل الأداء الحقيقي، وتوقع معدل الإطارات — كل ذلك في مكانٍ واحد.",
    "og.title": "elKaeron | منصتك لبناء الحاسوب وتحليل الأداء",
    "og.description":
      "بنِ تجميعتك، افحص التوافق، وتوقّع أداءك — بدقة وبدون تحيّز.",

    "brand.sub": "PcBenchPro",

    "lang.select": "اختر اللغة",
    "lang.ar": "عربي",
    "lang.en": "EN",

    "theme.toggle": "تبديل المظهر",
    "nav.menu": "القائمة",

    "nav.builder": "مجمّع الجهاز",
    "nav.bottleneck": "فحص الاختناق",
    "nav.upgradePlan": "خطة الترقية",
    "nav.performanceForecast": "توقع الأداء",
    "nav.futureReady": "جهوزية المستقبل",
    "nav.compare": "مقارنة التجميعات",

    "auth.login": "دخول / تسجيل",

    // ─── Hero ───────────────────────────────────────────────
    "hero.title": "كل ما تحتاجه لجهازك في مكانٍ واحد",
    "hero.desc":
      "بنِ تجميعتك، افحص التوافق، وتوقّع الأداء — منصة واحدة متكاملة للمبتدئ والمحترف.",
    "hero.ctaPrimary": "ابدأ تجميعتك",
    "hero.ctaSecondary": "جرّب المساعد الذكي",

    // ─── Bench Widget ────────────────────────────────────────
    "bench.live": "تحليل حي",
    "bench.title": "Live Benchmark",
    "bench.gpuLabel": "GPU",
    "bench.cpuLabel": "CPU",
    "bench.bottleneck": "اختناق (Bottleneck)",
    "bench.bottleneckStatus": "ممتاز ✓ 2.4%",
    "bench.fpsLabel": "FPS — Cyberpunk 2077 · 1080p Ultra",
    "bench.fpsStatus": "FPS 148",
    "bench.futureLabel": "Future Proof Score",
    "bench.futureStatus": "100 / 87",

    // ─── Stats ───────────────────────────────────────────────
    "stats.plannedFeatures": "ميزة مخططة",
    "stats.databaseParts": "قطعة في الداتابيز",
    "stats.goal": "هدفنا عالمياً",
    "stats.supportedGames": "لعبة مدعومة",

    // ─── Section Titles ──────────────────────────────────────
    "whyus.title": "أين تُخفق المنصات الأخرى؟",
    "features.title": "استكشف المنصة",

    // ─── Features ────────────────────────────────────────────
    "features.builder.title": "ابنِ تجميعتك",
    "features.builder.desc": "اختَر قطعك وشاهد السعر الإجمالي يتحدّث لحظيًا.",

    "features.compat.title": "توافق مضمون",
    "features.compat.desc":
      "تحقّق من توافق جميع القطع قبل أن تنفق قرشاً واحداً.",

    "features.bottleneck.title": "اكتشف الاختناق",
    "features.bottleneck.desc": "اعرف أيّ قطعة تُعيق أداء جهازك بتحليل دقيق.",

    "features.fps.title": "توقّع الأداء مسبقاً",
    "features.fps.desc": "اعرف كم FPS ستحصل عليه في ألعابك المفضلة قبل الشراء.",

    "features.futureProof.title": "جاهز للمستقبل؟",
    "features.futureProof.desc":
      "اعرف كم سنةً يصمد جهازك أمام الألعاب والبرامج القادمة.",

    "features.upgrade.title": "مسار الترقية",
    "features.upgrade.desc": "طوِّر جهازك بالتدريج بأذكى طريقة وبأقل تكلفة.",

    "features.compare.title": "مقارنة التجميعات",
    "features.compare.desc":
      "قارن بين تجميعتين في الأداء والسعر واتخذ قرارك بثقة.",

    "features.assistant.title": "المساعد الذكي",
    "features.assistant.desc":
      "اسأل أيّ سؤال عن الهاردوير واحصل على إجابة فورية من مساعد متخصص.",

    // ─── Why Us Cards ────────────────────────────────────────
    "whyus.scattered.number": "١",
    "whyus.scattered.title": "أدوات مبعثرة",
    "whyus.scattered.desc":
      "التوافق في موقع، الأسعار في ثانٍ، والأداء في ثالث. لا منصة واحدة تجمع كل شيء.",

    "whyus.beginners.number": "٢",
    "whyus.beginners.title": "معقّدة على المبتدئ",
    "whyus.beginners.desc":
      "معظمها مصممة للمحترفين. أما المبتدئ فيجد نفسه ضائعاً بين المصادر.",

    "whyus.database.number": "٣",
    "whyus.database.title": "قطع غائبة عن السوق المحلي",
    "whyus.database.desc":
      "قطع متوفرة في أسواقنا لا تجدها في أي منصة، مما يُعيق البحث والمقارنة.",

    // ─── AI Proof Section ────────────────────────────────────
    "ai-proof.title": "جهازك المثالي يبدأ من هنا",
    "ai-proof.you": "أنت",
    "ai-proof.ai": "elKaeron AI",
    "ai-proof.msg1": "عندي ميزانية 20,000 جنيه — أنسب تجميعة ألعاب إيه؟",
    "ai-proof.reply1":
      "بناءً على ميزانيتك وأسعار السوق المصري الحالية: Ryzen 5 7600 + RX 7700 XT + 16GB DDR5. هتحصل على 120+ FPS في معظم الألعاب عند 1080p مع Future Proof Score 82/100. الاختناق 1.8% فقط. تحتاج تفاصيل؟",
    "ai-proof.msg2": "هل RTX 4070 بدلها هتكون أحسن؟",
    "ai-proof.reply2":
      "RTX 4070 هتدي +12% في Ray Tracing لكنها أغلى بـ4,500 جنيه وهتخرجك من الميزانية. لو الألعاب الحالية هدفك، RX 7700 XT أذكى. لو عندك مرونة في الميزانية، نقدر نبص على خيار تاني.",

    // ─── Footer ──────────────────────────────────────────────
    "footer.desc":
      "منصة متكاملة لبناء وفحص وتطوير أجهزة الحاسوب — بمعايير دقيقة وبيانات حقيقية.",
    "footer.tools": "الأدوات",
    "footer.company": "الشركة",
    "footer.support": "الدعم الفني",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "الشروط والأحكام",
    "footer.copy": "© elKaeron PcBenchPro. جميع الحقوق محفوظة.",
  },

  en: {
    "site.title": "elkaeron",
    "meta.description":
      "Build your PC, check compatibility, and forecast performance — all in one platform.",
    "og.title": "elKaeron | Build, Analyze & Optimize Your PC",
    "og.description":
      "PC builds, compatibility checks, and real performance analysis — unbiased, for everyone.",

    "brand.sub": "PcBenchPro",

    "lang.select": "Select language",
    "lang.ar": "عربي",
    "lang.en": "EN",

    "theme.toggle": "Toggle theme",
    "nav.menu": "Menu",

    "nav.builder": "PC Builder",
    "nav.bottleneck": "Bottleneck Check",
    "nav.upgradePlan": "Upgrade Plan",
    "nav.performanceForecast": "Performance Forecast",
    "nav.futureReady": "Future Ready",
    "nav.compare": "Build Comparison",

    "auth.login": "Sign in / Register",

    // ─── Hero ───────────────────────────────────────────────
    "hero.title": "Everything you need for your PC in one place",
    "hero.desc":
      "Build your rig, check compatibility, and forecast performance — one platform for beginners and pros alike.",
    "hero.ctaPrimary": "Start your build",
    "hero.ctaSecondary": "Try the AI assistant",

    // ─── Bench Widget ────────────────────────────────────────
    "bench.live": "Live analysis",
    "bench.title": "Live Benchmark",
    "bench.gpuLabel": "GPU",
    "bench.cpuLabel": "CPU",
    "bench.bottleneck": "Bottleneck",
    "bench.bottleneckStatus": "Excellent ✓ 2.4%",
    "bench.fpsLabel": "FPS — Cyberpunk 2077 · 1080p Ultra",
    "bench.fpsStatus": "FPS 148",
    "bench.futureLabel": "Future Proof Score",
    "bench.futureStatus": "100 / 87",

    // ─── Stats ───────────────────────────────────────────────
    "stats.plannedFeatures": "Planned features",
    "stats.databaseParts": "Parts in database",
    "stats.goal": "Our global goal",
    "stats.supportedGames": "Supported games",

    // ─── Section Titles ──────────────────────────────────────
    "whyus.title": "Where Others Fall Short",
    "features.title": "Explore the Platform",

    // ─── Features ────────────────────────────────────────────
    "features.builder.title": "PC Builder",
    "features.builder.desc":
      "Pick your parts and watch the total price update in real time.",

    "features.compat.title": "Guaranteed Compatibility",
    "features.compat.desc":
      "Verify every component works together before spending a single dollar.",

    "features.bottleneck.title": "Bottleneck Detector",
    "features.bottleneck.desc":
      "Find out exactly which part is holding your system back.",

    "features.fps.title": "Performance Forecast",
    "features.fps.desc":
      "Know your expected FPS in your favorite games before you buy.",

    "features.futureProof.title": "Future Ready?",
    "features.futureProof.desc":
      "See how many years your build can keep up with upcoming games and software.",

    "features.upgrade.title": "Upgrade Path",
    "features.upgrade.desc":
      "Level up your build gradually, smartly, and at minimum cost.",

    "features.compare.title": "Build Comparison",
    "features.compare.desc":
      "Compare two builds on performance and price — and decide with confidence.",

    "features.assistant.title": "Smart Assistant",
    "features.assistant.desc":
      "Ask any hardware question and get an instant answer from a specialized AI.",

    // ─── Why Us Cards ────────────────────────────────────────
    "whyus.scattered.number": "1",
    "whyus.scattered.title": "Tools are scattered",
    "whyus.scattered.desc":
      "Compatibility on one site, prices on another, benchmarks on a third. No single platform ties it all together.",

    "whyus.beginners.number": "2",
    "whyus.beginners.title": "Too complex for beginners",
    "whyus.beginners.desc":
      "Most platforms are built for power users. If it's your first build, you'll get lost between sources.",

    "whyus.database.number": "3",
    "whyus.database.title": "Local market parts go missing",
    "whyus.database.desc":
      "Parts widely available in local markets aren't listed on most platforms, making search and comparison a dead end.",

    // ─── AI Proof Section ────────────────────────────────────
    "ai-proof.title": "Your build, perfected",
    "ai-proof.you": "You",
    "ai-proof.ai": "elKaeron AI",
    "ai-proof.msg1":
      "I have a budget of 20,000 EGP — what's the best gaming build?",
    "ai-proof.reply1":
      "Based on your budget and current Egyptian market prices: Ryzen 5 7600 + RX 7700 XT + 16GB DDR5. You'll get 120+ FPS in most games at 1080p with a Future Proof Score of 82/100. Bottleneck is only 1.8%. Want the full breakdown?",
    "ai-proof.msg2": "Would an RTX 4070 be a better choice instead?",
    "ai-proof.reply2":
      "The RTX 4070 gives +12% in Ray Tracing but costs 4,500 EGP more and pushes you over budget. If current games are your target, the RX 7700 XT is the smarter pick. If you have some flexibility, we can explore another option.",

    // ─── Footer ──────────────────────────────────────────────
    "footer.desc":
      "Your all-in-one platform to build, check, and improve PC systems — with real data and zero bias.",
    "footer.tools": "Tools",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms and Conditions",
    "footer.copy": "© elKaeron PcBenchPro. All rights reserved.",
  },
};
function translatePage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = translations[lang]?.[key];

    if (value) el.textContent = value;
  });

  // aria-label support
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    const value = translations[lang]?.[key];

    if (value) el.setAttribute("aria-label", value);
  });
}
const langSelectors = document.querySelectorAll(".lang-selector");

langSelectors.forEach((select) => {
  select.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lang", lang);
    translatePage(lang);
    renderFeatures(lang);
    renderWhyUs(lang);
    simulateLiveTick();

    // sync all selects
    langSelectors.forEach((s) => (s.value = lang));
  });
});

langSelectors.forEach((s) => (s.value = savedLang));
translatePage(savedLang);
renderFeatures(savedLang);
renderWhyUs(savedLang);
simulateLiveTick();
