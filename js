document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector("#nav-links");

  if (menu && links) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.querySelectorAll("#nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Make all content visible
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
});
