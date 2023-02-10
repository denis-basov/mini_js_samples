const toggle = document.querySelector("#toggle");
const open = document.querySelector("#open");
const modal = document.querySelector("#modal");
const close = document.querySelector("#close");

// Toggle navigation
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal
open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// Hide modal
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// Hide modal on outside click
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});
