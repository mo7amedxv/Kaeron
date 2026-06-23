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
  {
    icon: '<i class="fa-solid fa-screwdriver-wrench"></i>',
    title: "مُنشئ التجميعات",
    desc: "أنشئ تجميعة حاسوب كاملة من الصفر مع اختيار جميع القطع ومتابعة السعر الإجمالي لحظيًا.",
  },
  {
    icon: '<i class="fa-solid fa-puzzle-piece"></i>',
    title: "التوافقية",
    desc: "تحقق من توافق جميع المكونات لضمان عمل التجميعة بكفاءة وتجنب أي مشاكل قبل الشراء.",
  },
  {
    icon: '<i class="fa-solid fa-gauge-high"></i>',
    title: "عنق الزجاجة",
    desc: "اكتشف الاختناق المحتمل بين المعالج وكرت الشاشة واحصل على تحليل دقيق للأداء.",
  },
  {
    icon: '<i class="fa-solid fa-chart-line"></i>',
    title: "توقع الأداء",
    desc: "تعرّف على معدل الإطارات المتوقع (FPS) في ألعابك المفضلة قبل شراء القطع.",
  },
  {
    icon: '<i class="fa-solid fa-forward-fast"></i>',
    title: "الاستمرارية المستقبلية",
    desc: "قيّم مدى قدرة تجميعتك على مواكبة الألعاب والبرامج المستقبلية لسنوات قادمة.",
  },
  {
    icon: '<i class="fa-solid fa-angles-up"></i>',
    title: "مسار الترقية",
    desc: "احصل على خطة ترقية ذكية وتدريجية تساعدك على تطوير تجميعتك بأفضل طريقة ممكنة.",
  },
  {
    icon: '<i class="fa-solid fa-scale-balanced"></i>',
    title: "مقارنة التجميعات",
    desc: "قارن بين تجميعتين كاملتين من حيث الأداء والسعر والمواصفات لاتخاذ القرار الأفضل.",
  },
  {
    icon: '<i class="fa-solid fa-microchip"></i>',
    title: "المساعد الذكي",
    desc: "اسأل أي سؤال عن الهاردوير واحصل على إجابات فورية من مساعد متخصص بالقطع والتوافق.",
  },
];
const featuresContainer = document.getElementById("features-container");

featuresData.forEach((feature) => {
  const card = document.createElement("div");
  card.className = "feature-card card";
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <div class="feature-icon card-icon">${feature.icon}</div>
    <h3 class="feature-heading card-title">${feature.title}</h3>
    <p class="feature-desc card-desc">${feature.desc}</p>
  `;

  featuresContainer.appendChild(card);
});
const whyUsData = [
  {
    number: "١",
    title: "الأدوات متفرقة",
    desc: "تقوم بالتحقق من التوافق في موقع، وتقارن الأسعار في موقع آخر، وتبحث عن اختبارات الأداء في موقع ثالث، دون وجود منصة واحدة تجمع كل ذلك في تجربة متكاملة.",
  },
  {
    number: "٢",
    title: "صعوبة الاستخدام للمبتدئين",
    desc: "معظم المنصات مصممة للمستخدمين المتقدمين فقط. وإذا كانت هذه أول تجميعة لك، فقد تواجه ارتباكًا وتحتاج إلى استشارة عدة مصادر قبل اتخاذ قرارك.",
  },
  {
    number: "٣",
    title: "نقص قاعدة بيانات القطع",
    desc: "الكثير من القطع الحديثة أو المتوفرة في أسواقنا غير مدرجة في معظم المنصات، مما يجعل عملية البحث والمقارنة محدودة وصعبة خارج أشهر الموديلات.",
  },
];

const whyUsContainer = document.getElementById("why-us-container");

whyUsData.forEach((item) => {
  const card = document.createElement("div");
  card.className = "card why-us-card";
  card.setAttribute("tabindex", "0");
  card.innerHTML = `
    <div class="card-icon why-us-number">${item.number}</div>
    <h3 class="card-title why-us-title">${item.title}</h3>
    <p class="card-desc why-us-desc">${item.desc}</p>
  `;
  whyUsContainer.appendChild(card);
});
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
    const label =
      data.bottleneckLabel || (p < 5 ? "ممتاز" : p < 15 ? "جيد" : "مرتفع");
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

// ---- Real usage: replace the simulation above with something like ----
// async function fetchLiveBenchmark() {
//   const res = await fetch('/api/benchmark/live');
//   const data = await res.json();
//   updateBenchmark(data);
// }
// setInterval(fetchLiveBenchmark, 3000);
