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

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("olympicon-theme") === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Unable to load the saved theme preference.", error);
  }
  setTheme(savedTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme !== "dark";
    setTheme(isDark);

    try {
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
    mapButton.addEventListener("click", () => {
      mapFrame.src = mapSrc;
      mapContainer.classList.add("is-loaded");
    });
  }
}