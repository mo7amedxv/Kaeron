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
      "اكتشف كل ما يخص عالم الكمبيوتر في PcBench Builder. مراجعات لأحدث قطع الهاردوير، تجميعات كمبيوتر للألعاب والعمل، شروحات صيانة، وحلول لأشهر مشاكل التشغيل والويندوز.",
    "og.title": "elkaeron | دليلك الشامل لعالم الكمبيوتر والتقنية",
    "og.description":
      "مراجعات هاردوير، تجميعات كمبيوتر، وشروحات صيانة مبسطة تناسب المبتدئين والمحترفين.",

    "brand.sub": "PcBenchPro",

    "lang.select": "اختر اللغة",
    "lang.ar": "العربية",
    "lang.en": "English",

    "theme.toggle": "تبديل المظهر",
    "nav.menu": "القائمة",

    "nav.builder": "مجمّع الجهاز",
    "nav.bottleneck": "فحص الاختناق",
    "nav.upgradePlan": "خطة الترقية",
    "nav.performanceForecast": "توقع الأداء",
    "nav.futureReady": "جهوزية المستقبل",
    "nav.compare": "مقارنة التجميعات",

    "auth.login": "دخول / تسجيل",

    "hero.title": "كل ما تحتاجه لجهازك في مكان واحد",
    "hero.desc":
      "المنصة العالمية لمحترفي وهواة PC بناء التجميعات، فحص التوافق، تحليل الأداء الحقيقي، توقع الـ FPS، كل شيء في مكان واحد،",
    "hero.ctaPrimary": "ابدأ تجميعتك",
    "hero.ctaSecondary": "جرب الـمساعد الذكي",

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

    "stats.plannedFeatures": "ميزة مخططة",
    "stats.databaseParts": "قطعة في الداتابيز",
    "stats.goal": "هدفنا عالمياً",
    "stats.supportedGames": "لعبة مدعومة",

    "whyus.title": "لماذا لا تكفي المواقع الأخرى؟",
    "features.title": "اكتشف إمكانيات المنصة",

    "features.builder.title": "مُنشئ التجميعات",
    "features.builder.desc":
      "أنشئ تجميعة حاسوب كاملة من الصفر مع اختيار جميع القطع ومتابعة السعر الإجمالي لحظيًا.",
    "features.compat.title": "التوافقية",
    "features.compat.desc":
      "تحقق من توافق جميع المكونات لضمان عمل التجميعة بكفاءة وتجنب أي مشاكل قبل الشراء.",
    "features.bottleneck.title": "عنق الزجاجة",
    "features.bottleneck.desc":
      "اكتشف الاختناق المحتمل بين المعالج وكرت الشاشة واحصل على تحليل دقيق للأداء.",
    "features.fps.title": "توقع الأداء",
    "features.fps.desc":
      "تعرّف على معدل الإطارات المتوقع (FPS) في ألعابك المفضلة قبل شراء القطع.",
    "features.futureProof.title": "الاستمرارية المستقبلية",
    "features.futureProof.desc":
      "قيّم مدى قدرة تجميعتك على مواكبة الألعاب والبرامج المستقبلية لسنوات قادمة.",
    "features.upgrade.title": "مسار الترقية",
    "features.upgrade.desc":
      "احصل على خطة ترقية ذكية وتدريجية تساعدك على تطوير تجميعتك بأفضل طريقة ممكنة.",
    "features.compare.title": "مقارنة التجميعات",
    "features.compare.desc":
      "قارن بين تجميعتين كاملتين من حيث الأداء والسعر والمواصفات لاتخاذ القرار الأفضل.",
    "features.assistant.title": "المساعد الذكي",
    "features.assistant.desc":
      "اسأل أي سؤال عن الهاردوير واحصل على إجابات فورية من مساعد متخصص بالقطع والتوافق.",

    "whyus.scattered.number": "١",
    "whyus.scattered.title": "الأدوات متفرقة",
    "whyus.scattered.desc":
      "تقوم بالتحقق من التوافق في موقع، وتقارن الأسعار في موقع آخر، وتبحث عن اختبارات الأداء في موقع ثالث، دون وجود منصة واحدة تجمع كل ذلك في تجربة متكاملة.",
    "whyus.beginners.number": "٢",
    "whyus.beginners.title": "صعوبة الاستخدام للمبتدئين",
    "whyus.beginners.desc":
      "معظم المنصات مصممة للمستخدمين المتقدمين فقط. وإذا كانت هذه أول تجميعة لك، فقد تواجه صعوبة وتحتاج إلى استشارة عدة مصادر قبل اتخاذ قرارك.",
    "whyus.database.number": "٣",
    "whyus.database.title": "نقص قاعدة بيانات القطع",
    "whyus.database.desc":
      "الكثير من القطع الحديثة أو المتوفرة في أسواقنا غير مدرجة في معظم المنصات، مما يجعل عملية البحث والمقارنة محدودة وصعبة خارج أشهر الموديلات.",

    "footer.desc":
      "منصتك الشاملة لتجميع وفحص وتطوير أجهزة الكمبيوتر، بمعايير دقيقة وبيانات حقيقية.",
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
      "Discover everything about computers in PcBench Builder. Reviews of the latest hardware, PC builds for gaming and work, maintenance guides, and fixes for common boot and Windows issues.",
    "og.title": "elkaeron | Your complete guide to computers and tech",
    "og.description":
      "Hardware reviews, PC builds, and simplified maintenance guides for beginners and professionals.",

    "brand.sub": "PcBenchPro",

    "lang.select": "Select language",
    "lang.ar": "Arabic",
    "lang.en": "English",

    "theme.toggle": "Toggle theme",
    "nav.menu": "Menu",

    "nav.builder": "PC Builder",
    "nav.bottleneck": "Bottleneck Check",
    "nav.upgradePlan": "Upgrade Plan",
    "nav.performanceForecast": "Performance Forecast",
    "nav.futureReady": "Future Ready",
    "nav.compare": "Build Comparison",

    "auth.login": "Sign in / Register",

    "hero.title": "Everything you need for your PC in one place",
    "hero.desc":
      "The global platform for PC enthusiasts and builders: compatibility checks, real performance analysis, FPS prediction, and more — all in one place.",
    "hero.ctaPrimary": "Start your build",
    "hero.ctaSecondary": "Try our assistant",

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

    "stats.plannedFeatures": "Planned features",
    "stats.databaseParts": "Parts in database",
    "stats.goal": "Our global goal",
    "stats.supportedGames": "Supported games",

    "whyus.title": "Why are other websites not enough?",
    "features.title": "Explore the platform’s capabilities",

    "features.builder.title": "PC Builder",
    "features.builder.desc":
      "Build a complete PC from scratch, choosing every part while tracking the total price in real time.",
    "features.compat.title": "Compatibility",
    "features.compat.desc":
      "Check that all components are compatible to keep your build running smoothly and avoid issues before buying.",
    "features.bottleneck.title": "Bottleneck",
    "features.bottleneck.desc":
      "Detect potential bottlenecks between your CPU and GPU and get an accurate performance analysis.",
    "features.fps.title": "Performance Forecast",
    "features.fps.desc":
      "Find out the expected frame rate (FPS) in your favorite games before buying parts.",
    "features.futureProof.title": "Future Readiness",
    "features.futureProof.desc":
      "Evaluate how well your build can keep up with upcoming games and software for years to come.",
    "features.upgrade.title": "Upgrade Path",
    "features.upgrade.desc":
      "Get a smart, gradual upgrade plan to help you improve your build in the best possible way.",
    "features.compare.title": "Build Comparison",
    "features.compare.desc":
      "Compare two complete builds in performance, price, and specs to make the best decision.",
    "features.assistant.title": "Smart Assistant",
    "features.assistant.desc":
      "Ask any hardware question and get instant answers from an assistant specialized in parts and compatibility.",

    "whyus.scattered.number": "1",
    "whyus.scattered.title": "Tools are scattered",
    "whyus.scattered.desc":
      "You check compatibility on one site, compare prices on another, and look for benchmarks on a third — with no single platform bringing it all together.",
    "whyus.beginners.number": "2",
    "whyus.beginners.title": "Hard to use for beginners",
    "whyus.beginners.desc":
      "Most platforms are built for advanced users only. If this is your first build, you may struggle and need several sources before deciding.",
    "whyus.database.number": "3",
    "whyus.database.title": "Incomplete parts database",
    "whyus.database.desc":
      "Many newer or locally available parts are missing from most platforms, making search and comparison limited outside the most popular models.",

    "footer.desc":
      "Your all-in-one platform to build, check, and improve PC systems with precise standards and real data.",
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
