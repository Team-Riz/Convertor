// Update footer year & live date-time
document.getElementById("year").textContent = new Date().getFullYear();
function updateDateTime() {
  document.getElementById("datetime").textContent =
    new Date().toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// DARK MODE TOGGLE
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
