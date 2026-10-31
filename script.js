// The responsive menu is optional, so initialize it only when both controls exist.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

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