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

// COLLAPSIBLE SIDEBAR
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// SEARCH FUNCTIONALITY
const searchBox = document.getElementById("searchBox");
const converterList = document.getElementById("converterList");
const cards = converterList.getElementsByClassName("card");

searchBox.addEventListener("keyup", function () {
  const term = searchBox.value.toLowerCase();
  for (let i = 0; i < cards.length; i++) {
    const text = cards[i].innerText.toLowerCase();
    cards[i].style.display = text.includes(term) ? "block" : "none";
  }
});
