/* =====================================================
   Dali Verse - Main JS (Cinematic Single Page)
   ===================================================== */

// THEME HANDLING
const themeToggle = document.getElementById("themeToggle");
const themes = [
  "theme-dark-neon",
  "theme-violet",
  "theme-cyberblue",
  "theme-solarflare",
  "theme-nebula",
];
let currentTheme = 0;

// Load saved theme
const savedTheme = localStorage.getItem("dali-theme");
if (savedTheme && themes.includes(savedTheme)) {
  document.body.className = savedTheme;
  currentTheme = themes.indexOf(savedTheme);
}

// Theme cycle on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.remove(themes[currentTheme]);
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.classList.add(themes[currentTheme]);
    localStorage.setItem("dali-theme", themes[currentTheme]);
  });
}

// NAVIGATION ACTIVE LINK ON SCROLL
const navLinks = document.querySelectorAll(".nav-right a");
const sections = document.querySelectorAll("section, header");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const sectionTop = sec.offsetTop - 150;
    if (scrollY >= sectionTop) current = sec.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// OPTIONAL: SMOOTH SCROLLING
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

// CLEAN MOTION FX HANDLING (DISABLED BUT READY)
let motionFXEnabled = false; // Currently off
const cursorGlow = document.createElement("div");
cursorGlow.classList.add("cursor-glow");
document.body.appendChild(cursorGlow);

if (motionFXEnabled) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.transform = `translate(${e.clientX - 10}px, ${
      e.clientY - 10
    }px)`;
  });
} else {
  cursorGlow.style.display = "none";
}

// FUTURE-READY: HERO PARTICLES OR AUDIO CAN BE ADDED HERE
// Example placeholder for later expansion:
// function initParticles() { /* particle code here */ }
// function toggleAudio() { /* ambient sound control here */ }
