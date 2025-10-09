/* =====================================================
   Dali Verse — Main JS (Cinematic Minimal v2)
   ===================================================== */

// THEME SYSTEM
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

// Updated theme list — Dark default + new stylish ones
const themes = [
  "theme-dark",
  "theme-core",
  "theme-neon",
  "theme-aurora",
  "theme-solar",
];
let currentTheme = 0;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("dali-theme");
if (savedTheme && themes.includes(savedTheme)) {
  body.className = savedTheme;
  currentTheme = themes.indexOf(savedTheme);
} else {
  body.className = "theme-dark";
  localStorage.setItem("dali-theme", "theme-dark");
}

// Cycle through themes on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    body.classList.add(themes[currentTheme]);
    localStorage.setItem("dali-theme", themes[currentTheme]);
    updateThemeButton(themes[currentTheme]);
  });
}

// Change theme button glow to match active theme
function updateThemeButton(theme) {
  if (!themeToggle) return;
  let glowColor;
  switch (theme) {
    case "theme-dark":
      glowColor = "#ff1a8f";
      break;
    case "theme-neon":
      glowColor = "#00ffff";
      break;
    case "theme-aurora":
      glowColor = "#00aaff";
      break;
    case "theme-solar":
      glowColor = "#ff4fa0";
      break;
    default:
      glowColor = "#ffffff";
  }
  themeToggle.style.boxShadow = `0 0 15px ${glowColor}`;
  themeToggle.style.color = glowColor;
}
updateThemeButton(body.className); // Initialize glow

// SMOOTH SCROLLING
const navLinks = document.querySelectorAll(".nav-right a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// HERO FADE ON SCROLL
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // When scrolled past 20% of hero, start fading
  if (scrollY > heroHeight * 0.2) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});
