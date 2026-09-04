const menu = document.querySelector(".menu-toggle");
const links = document.querySelector("#nav-links");
menu?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
document.querySelectorAll("#nav-links a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  menu?.setAttribute("aria-expanded","false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
