// Collapsed breadcrumb: ⋯ button toggles the middle-items menu.
document.querySelectorAll(".st-crumb__menu-wrap").forEach((wrap) => {
  const btn = wrap.querySelector(".st-crumb__more");
  const menu = wrap.querySelector(".st-crumb__menu");
  const set = (open) => { menu.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", open); };
  btn.addEventListener("click", () => set(!menu.classList.contains("is-open")));
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) set(false); });
  wrap.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
});
