// The responsive menu is optional, so initialize it only when both controls exist.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  const setTheme = (isDark) => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.setAttribute("title", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.querySelector("span").textContent = isDark ? "☀" : "☾";
  };

  let savedTheme;
  let savedThemeAt;
  try {
    savedTheme = localStorage.getItem("olympicon-theme");
    savedThemeAt = Number(localStorage.getItem("olympicon-theme-updated-at"));
  } catch (error) {
    console.error("Unable to load the saved theme preference.", error);
  }
  // On a later page load, ignore saved choices older than an hour and use the system preference instead.
  const currentTime = Date.now();
  const hasRecentSavedTheme =
    (savedTheme === "dark" || savedTheme === "light") &&
    Number.isFinite(savedThemeAt) &&
    savedThemeAt <= currentTime &&
    currentTime - savedThemeAt < 60 * 60 * 1000;
  const initialTheme = hasRecentSavedTheme
    ? savedTheme
    : typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  setTheme(initialTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme !== "dark";
    const applyTheme = () => setTheme(isDark);

    // Use the animated transition when supported, but respect reduced-motion preferences.
    if (
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }

    try {
      localStorage.setItem("olympicon-theme-updated-at", String(Date.now()));
      localStorage.setItem("olympicon-theme", isDark ? "dark" : "light");
    } catch (error) {
      console.error("Unable to save the theme preference.", error);
    }
  });
}

if (menuToggle && mainNav) {

  // Keep the visual menu state and button accessibility state in sync.
  menuToggle.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  mainNav.querySelectorAll("a").forEach(link => {

    // Close the menu after a visitor chooses a destination.
    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    });

  });

  document.addEventListener("keydown", (event) => {

    // Escape dismisses the open menu for keyboard users.
    if (event.key === "Escape") {

      mainNav.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  });

}

const mapContainer = document.querySelector(".venue-map");

if (mapContainer) {
  const mapButton = mapContainer.querySelector(".map-load-button");
  const mapFrame = mapContainer.querySelector("iframe");
  const mapSrc = mapContainer.dataset.mapSrc;

  if (mapButton && mapFrame && mapSrc) {
    // Assigning the iframe URL here defers the third-party request until an explicit click.
    mapButton.addEventListener("click", () => {
      mapFrame.src = mapSrc;
      mapContainer.classList.add("is-loaded");
    });
  }
}