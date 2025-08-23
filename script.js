// ---------------- TAB CONTROL ----------------
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ---------------- DARK/LIGHT MODE ----------------
const modeBtn = document.getElementById('modeToggle');
modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeBtn.innerHTML = document.body.classList.contains('dark-mode') ?
        '<i class="fa-solid fa-sun"></i> Light Mode' :
        '<i class="fa-solid fa-moon"></i> Dark Mode';
});

// ---------------- DATETIME ----------------
document.getElementById('datetime').innerText = new Date().toLocaleString();

// ---------------- CONVERTER FUNCTIONS ----------------

// LENGTH
function convertLength() {
    const val = parseFloat(document.getElementById('lengthInput').value);
    const unit = document.getElementById('lengthUnit').value;
    let result = 0;

    if (unit === 'meter->kilometer') result = val / 1000;
    else if (unit === 'kilometer->meter') result = val * 1000;
    else if (unit === 'meter->mile') result = val / 1609.34;
    else if (unit === 'mile->meter') result = val * 1609.34;

    document.getElementById('lengthResult').innerText = `Result: ${result.toFixed(2)}`;
}

// WEIGHT
function convertWeight() {
    const val = parseFloat(document.getElementById('weightInput').value);
    const unit = document.getElementById('weightUnit').value;
    let result = 0;

    if (unit === 'kg->g') result = val * 1000;
    else if (unit === 'g->kg') result = val / 1000;
    else if (unit === 'kg->lb') result = val * 2.20462;
    else if (unit === 'lb->kg') result = val / 2.20462;

    document.getElementById('weightResult').innerText = `Result: ${result.toFixed(2)}`;
}

// TEMPERATURE
function convertTemperature() {
    const val = parseFloat(document.getElementById('tempInput').value);
    const unit = document.getElementById('tempUnit').value;
    let result = 0;

    if (unit === 'c->f') result = val * 9 / 5 + 32;
    else if (unit === 'f->c') result = (val - 32) * 5 / 9;
    else if (unit === 'c->k') result = val + 273.15;
    else if (unit === 'k->c') result = val - 273.15;

    document.getElementById('tempResult').innerText = `Result: ${result.toFixed(2)}`;
}

// ---------------- CALORIES TAB ----------------
function calculateCalories() {
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (!age || !weight || !height) { alert("Enter all values"); return; }

    // BMR & Calories
    let bmr = (gender === "male") ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    let calories = bmr * activity;
    let protein = weight * 1.5;
    let fat = weight * 0.8;
    let carbs = (calories - (protein * 4 + fat * 9)) / 4;

    // BMI & Ideal Weight
    let heightM = height / 100;
    let bmi = (weight / (heightM * heightM)).toFixed(2);
    let idealWeight = ((gender === "male" ? 22 : 21) * (heightM * heightM)).toFixed(2);

    // Diet Plan suggestion
    let plan = "";
    if (calories < 1800) plan = "Increase intake: More proteins and carbs.";
    else if (calories < 2500) plan = "Maintain: Balanced diet of carbs, proteins, fats.";
    else plan = "Weight loss: Reduce calorie intake, more proteins, less fats.";

    // Display results
    document.getElementById('calorieResult').innerHTML = `
    <svg class="calorie-icon" width="40" height="40">
      <circle cx="20" cy="20" r="10" fill="#ff5722">
        <animate attributeName="r" values="10;15;10" dur="1s" repeatCount="indefinite"/>
      </circle>
    </svg>
    <div>
      <h3><i class="fa-solid fa-bolt"></i> Daily Requirements</h3>
      <p>Calories: ${calories.toFixed(2)} kcal</p>
      <p>Protein: ${protein.toFixed(2)} g</p>
      <p>Fat: ${fat.toFixed(2)} g</p>
      <p>Carbs: ${carbs.toFixed(2)} g</p>
    </div>`;

    document.getElementById('bmiResult').innerHTML = `
    <svg class="bmi-icon" width="40" height="40">
      <rect x="10" y="10" width="20" height="20" fill="#2196f3">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 20 20" to="360 20 20" dur="2s" repeatCount="indefinite"/>
      </rect>
    </svg>
    <div>
      <h3><i class="fa-solid fa-heart"></i> BMI & Ideal Weight</h3>
      <p>BMI: ${bmi}</p>
      <p>Ideal Weight: ${idealWeight} kg</p>
    </div>`;

    document.getElementById('dietPlan').innerHTML = `
    <svg class="diet-icon" width="40" height="40">
      <polygon points="20,5 25,35 15,35" fill="#4caf50">
        <animate attributeName="points" dur="2s" values="20,5 25,35 15,35;20,10 25,30 15,30;20,5 25,35 15,35" repeatCount="indefinite"/>
      </polygon>
    </svg>
    <div>
      <h3><i class="fa-solid fa-utensils"></i> Suggested Diet Plan</h3>
      <p>${plan}</p>
    </div>`;
}

// ---------------- PDF TO WORD (PLACEHOLDER) ----------------
function convertPdfToWord() { alert("PDF→Word conversion placeholder."); }
function convertWordToPdf() { alert("Word→PDF conversion placeholder."); }
