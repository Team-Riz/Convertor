// Year & DateTime
document.getElementById("year").textContent = new Date().getFullYear();
function updateDateTime() {
  document.getElementById("datetime").textContent =
    new Date().toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Dark mode
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// SEARCH FUNCTION
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

// ---------- CONVERSION FUNCTIONS ----------

// LENGTH
function convertLength() {
  const input = parseFloat(document.getElementById("lengthInput").value);
  const from = document.getElementById("lengthFrom").value;
  const to = document.getElementById("lengthTo").value;
  if (isNaN(input)) return (document.getElementById("lengthResult").textContent = "Enter a value!");

  const conversionRates = {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.000621371,
  };

  const meters = input / conversionRates[from];
  const result = meters * conversionRates[to];
  document.getElementById("lengthResult").textContent = `Result: ${result.toFixed(4)} ${to}`;
}

// WEIGHT
function convertWeight() {
  const input = parseFloat(document.getElementById("weightInput").value);
  const from = document.getElementById("weightFrom").value;
  const to = document.getElementById("weightTo").value;
  if (isNaN(input)) return (document.getElementById("weightResult").textContent = "Enter a value!");

  const conversionRates = {
    kg: 1,
    g: 1000,
    lb: 2.20462,
    oz: 35.274,
  };

  const kg = input / conversionRates[from];
  const result = kg * conversionRates[to];
  document.getElementById("weightResult").textContent = `Result: ${result.toFixed(4)} ${to}`;
}

// TEMPERATURE
function convertTemperature() {
  const input = parseFloat(document.getElementById("tempInput").value);
  const from = document.getElementById("tempFrom").value;
  const to = document.getElementById("tempTo").value;
  if (isNaN(input)) return (document.getElementById("tempResult").textContent = "Enter a value!");

  let celsius;
  if (from === "c") celsius = input;
  else if (from === "f") celsius = (input - 32) * (5 / 9);
  else if (from === "k") celsius = input - 273.15;

  let result;
  if (to === "c") result = celsius;
  else if (to === "f") result = celsius * (9 / 5) + 32;
  else if (to === "k") result = celsius + 273.15;

  document.getElementById("tempResult").textContent = `Result: ${result.toFixed(2)}° ${to.toUpperCase()}`;
}

// VOLUME
function convertVolume() {
  const input = parseFloat(document.getElementById("volumeInput").value);
  const from = document.getElementById("volumeFrom").value;
  const to = document.getElementById("volumeTo").value;
  if (isNaN(input)) return (document.getElementById("volumeResult").textContent = "Enter a value!");

  const conversionRates = {
    l: 1,
    ml: 1000,
    gal: 0.264172,
    m3: 0.001,
  };

  const liters = input / conversionRates[from];
  const result = liters * conversionRates[to];
  document.getElementById("volumeResult").textContent = `Result: ${result.toFixed(4)} ${to}`;
}
