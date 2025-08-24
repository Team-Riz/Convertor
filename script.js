/* ===== TAB NAVIGATION ===== */
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        tabContents.forEach(tc => tc.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

/* ===== UNIVERSAL CONVERTER FUNCTION ===== */
function setupConverter(cardId, calculateFn) {
    const card = document.getElementById(cardId);
    const btn = card.querySelector('button');
    const resultEl = card.querySelector('.result');

    btn.addEventListener('click', () => {
        const result = calculateFn(card);
        resultEl.textContent = result;
        resultEl.classList.add('show');
        setTimeout(() => resultEl.classList.remove('show'), 800);
    });
}

/* ===== EXAMPLE LENGTH CONVERTER ===== */
setupConverter('lengthCard', (card) => {
    const val = parseFloat(card.querySelector('input').value);
    const from = card.querySelector('select[name="from"]').value;
    const to = card.querySelector('select[name="to"]').value;
    if (isNaN(val)) return 'Enter a number';
    const m = {m:1, cm:0.01, km:1000, ft:0.3048}[from];
    const m2 = {m:1, cm:0.01, km:1000, ft:0.3048}[to];
    return (val*m/m2).toFixed(4);
});

/* ===== CALORIE CALCULATOR ===== */
const calorieForm = document.querySelector('.calorie-form');
const calorieGrid = document.querySelector('.calorie-result-grid');

if(calorieForm){
    calorieForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = calorieForm.querySelector('input[name="food"]').value;
        const cal = calorieForm.querySelector('input[name="calories"]').value;
        if(!name || !cal) return;
        const card = document.createElement('div');
        card.className = 'calorie-card';
        card.innerHTML = `<h4>${name}</h4><p>${cal} kcal</p>`;
        calorieGrid.appendChild(card);
        calorieForm.reset();
    });
}

/* ===== NUTRITION TABLE ===== */
const nutritionTableBody = document.querySelector('#nutritionTable tbody');
const addNutritionBtn = document.getElementById('addNutritionBtn');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');

addNutritionBtn?.addEventListener('click', () => {
    const name = document.querySelector('#nutritionName').value;
    const cal = document.querySelector('#nutritionCal').value;
    if(!name || !cal) return;
    const row = document.createElement('tr');
    row.innerHTML = `<td>${name}</td><td>${cal}</td><td><button class="danger">Delete</button></td>`;
    nutritionTableBody.appendChild(row);
    row.querySelector('button').addEventListener('click', () => row.remove());
    document.querySelector('#nutritionName').value='';
    document.querySelector('#nutritionCal').value='';
});

downloadCsvBtn?.addEventListener('click', () => {
    let csv = 'Name,Calories\n';
    nutritionTableBody.querySelectorAll('tr').forEach(tr=>{
        const cols = tr.querySelectorAll('td');
        csv += `${cols[0].textContent},${cols[1].textContent}\n`;
    });
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nutrition.csv';
    a.click();
    URL.revokeObjectURL(url);
});

/* ===== YOUTUBE / MEDIA TOOLS ===== */
const mediaContainer = document.querySelector('.media-container');
if(mediaContainer){
    const btns = mediaContainer.querySelectorAll('button');
    btns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            alert(`${btn.textContent} functionality placeholder`);
        });
    });
}

/* ===== DARK / LIGHT MODE TOGGLE ===== */
const darkToggle = document.getElementById('darkToggle');
darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

/* ===== ABOUT TAB SCROLL ANIMATIONS ===== */
const featureCards = document.querySelectorAll('.feature-card');
function showFeaturesOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if(cardTop < triggerBottom){
            card.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', showFeaturesOnScroll);
showFeaturesOnScroll(); // trigger on page load

/* ===== UTILITY: SETUP OTHER CONVERTERS HERE ===== */
// Example: weightCard, speedCard, etc.
