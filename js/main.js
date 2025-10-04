/* main.js - theme toggle and small helpers */
(function () {
  // Elements
  const themeToggleElems = document.querySelectorAll(".theme-toggle");
  const yearEls = document.querySelectorAll(
    "#year,#year2,#year3,#year4,#year5"
  );

  // Set current year
  const y = new Date().getFullYear();
  yearEls.forEach((e) => {
    if (e) e.textContent = y;
  });

  // Theme handling
  const THEMES = ["light", "dark", "gradient"];
  let current = localStorage.getItem("daliverse-theme") || "light";

  function applyTheme(name) {
    document.body.classList.remove("theme-dark", "theme-gradient");
    if (name === "dark") document.body.classList.add("theme-dark");
    if (name === "gradient") document.body.classList.add("theme-gradient");
    // update toggle icon (simple)
    themeToggleElems.forEach((t) => {
      t.textContent = name === "light" ? "☀️" : name === "dark" ? "🌙" : "🎨";
    });
    localStorage.setItem("daliverse-theme", name);
  }

  // toggle cycle: light -> dark -> gradient -> light
  function cycleTheme() {
    if (current === "light") current = "dark";
    else if (current === "dark") current = "gradient";
    else current = "light";
    applyTheme(current);
  }

  // Hook toggles
  themeToggleElems.forEach((el) => {
    el.addEventListener("click", cycleTheme);
  });

  // initial apply
  applyTheme(current);

  // Simple mobile menu (toggle placeholder)
  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document
        .querySelectorAll(".nav-right a")
        .forEach(
          (a) => (a.style.display = a.style.display === "block" ? "" : "block")
        );
    });
  }
})();
