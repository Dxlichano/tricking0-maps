// ======================================================
// Dali Verse — Main Script
// Handles theme switching, dropdown controls, and motion FX
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Dropdown creation
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = `
    <button class="dropdown-item" id="cycleTheme">Cycle Theme</button>
    <button class="dropdown-item" id="toggleFX">Toggle Motion FX</button>
  `;
  themeToggle.insertAdjacentElement("afterend", dropdown);

  const dropdownItems = dropdown.querySelectorAll(".dropdown-item");
  let dropdownOpen = false;

  // Themes list
  const themes = [
    "theme-dark-neon",
    "theme-violet",
    "theme-cyberblue",
    "theme-solarflare",
    "theme-nebula",
  ];
  let currentTheme = localStorage.getItem("theme") || "theme-dark-neon";
  body.classList.add(currentTheme);

  // Motion FX setup
  let fxEnabled = localStorage.getItem("motionFX") === "true";
  let cursorGlow = null;

  const enableFX = () => {
    if (cursorGlow) return;
    cursorGlow = document.createElement("div");
    cursorGlow.classList.add("cursor-glow");
    body.appendChild(cursorGlow);

    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.transform = `translate(${e.clientX - 10}px, ${
        e.clientY - 10
      }px)`;
    });

    body.classList.add("motion-fx");
  };

  const disableFX = () => {
    if (cursorGlow) {
      cursorGlow.remove();
      cursorGlow = null;
    }
    body.classList.remove("motion-fx");
  };

  if (fxEnabled) enableFX();

  // Toggle dropdown visibility
  themeToggle.addEventListener("click", () => {
    dropdownOpen = !dropdownOpen;
    dropdown.style.display = dropdownOpen ? "flex" : "none";
  });

  // Dropdown actions
  dropdown.querySelector("#cycleTheme").addEventListener("click", () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    body.classList.remove(currentTheme);
    currentTheme = themes[nextIndex];
    body.classList.add(currentTheme);
    localStorage.setItem("theme", currentTheme);
  });

  dropdown.querySelector("#toggleFX").addEventListener("click", () => {
    fxEnabled = !fxEnabled;
    localStorage.setItem("motionFX", fxEnabled);
    if (fxEnabled) enableFX();
    else disableFX();
  });

  // Hide dropdown when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (!themeToggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
      dropdownOpen = false;
    }
  });

  // Basic dropdown styling injection
  const style = document.createElement("style");
  style.textContent = `
    .dropdown {
      display: none;
      position: absolute;
      right: 2rem;
      top: 3.5rem;
      background: rgba(10, 10, 15, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      backdrop-filter: blur(10px);
      flex-direction: column;
      z-index: 1000;
    }
    .dropdown-item {
      padding: 0.6rem 1rem;
      color: var(--text-color);
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: 0.2s;
      font-family: var(--font-body);
    }
    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--accent);
      text-shadow: var(--accent-glow);
    }
  `;
  document.head.appendChild(style);
});
