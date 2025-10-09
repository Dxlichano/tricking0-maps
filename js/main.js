/* =====================================================
   Dali Verse — Main JS (Cinematic Minimal)
   ===================================================== */

// THEME SYSTEM
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themes = ["theme-gradient", "theme-dark", "theme-light"];
let currentTheme = 0;

// Load saved theme
const savedTheme = localStorage.getItem("dali-theme");
if (savedTheme && themes.includes(savedTheme)) {
  body.className = savedTheme;
  currentTheme = themes.indexOf(savedTheme);
} else {
  body.className = "theme-gradient";
}

// Cycle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    body.classList.add(themes[currentTheme]);
    localStorage.setItem("dali-theme", themes[currentTheme]);
  });
}

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
  const scrollY = window.scrollY;
  const heroHeight = hero.offsetHeight;

  // When scrolled past 20% of hero, start fading
  if (scrollY > heroHeight * 0.2) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});
