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

  card.innerHTML = `
    <div class="card-icon why-us-number">${item.number}</div>
    <h3 class="card-title why-us-title">${item.title}</h3>
    <p class="card-desc why-us-desc">${item.desc}</p>
  `;
  whyUsContainer.appendChild(card);
});
document.getElementById("currentYear").textContent = new Date().getFullYear();
