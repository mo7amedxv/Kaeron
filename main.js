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
