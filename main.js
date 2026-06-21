const themeButtons = document.querySelectorAll(".theme-btn");

function applyTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);

  themeButtons.forEach((btn) => {
    const icon = btn.querySelector("i");
    if (!icon) return;
    icon.classList.toggle("fa-sun", isLight);
    icon.classList.toggle("fa-moon", !isLight);
  });

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
    desc: "بناء تجميعة كاملة من الصفر",
  },
  {
    icon: '<i class="fa-solid fa-puzzle-piece"></i>',
    title: "التوافقية",
    desc: "فحص توافق جميع القطع",
  },
  {
    icon: '<i class="fa-solid fa-gauge-high"></i>',
    title: "عنق الزجاجة",
    desc: "تحليل الاختناق CPU/GPU",
  },
  {
    icon: '<i class="fa-solid fa-chart-line"></i>',
    title: "توقع الأداء",
    desc: "توقع معدل الإطارات (FPS) في الألعاب",
  },
  {
    icon: '<i class="fa-solid fa-forward-fast"></i>',
    title: "الاستمرارية المستقبلية",
    desc: "مؤشر الاستمرارية ومقاومة الزمن",
  },
  {
    icon: '<i class="fa-solid fa-angles-up"></i>',
    title: "مسار الترقية",
    desc: "مسار ترقية ذكي تدريجي",
  },
  {
    icon: '<i class="fa-solid fa-scale-balanced"></i>',
    title: "مقارنة التجميعات",
    desc: "مقارنة تجميعات كاملة",
  },
  {
    icon: '<i class="fa-solid fa-microchip"></i>',
    title: "المساعد الذكي",
    desc: "مساعد ذكي متخصص بالهاردوير",
  },
];
const featuresContainer = document.getElementById("features-container");

featuresData.forEach((feature) => {
  const card = document.createElement("div");
  card.className = "feature-card";

  card.innerHTML = `
    <div class="feature-icon">${feature.icon}</div>
    <h3 class="feature-heading">${feature.title}</h3>
    <p class="feature-desc">${feature.desc}</p>
  `;

  featuresContainer.appendChild(card);
});
document.getElementById("currentYear").textContent = new Date().getFullYear();
