// ================== TAB CONTROL ==================
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c=>c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ================== DARK/LIGHT MODE ==================
const modeBtn = document.getElementById('modeToggle');
modeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const icon = modeBtn.querySelector('i');
  if(document.body.classList.contains('dark')){
    modeBtn.innerHTML='<i class="fa-solid fa-moon"></i> Dark Mode';
  } else {
    modeBtn.innerHTML='<i class="fa-solid fa-sun"></i> Light Mode';
  }
});

// ================== CONVERTER CARDS ==================
const converters = [
  {title:"Length", icon:"fa-ruler", units:["meter","kilometer","mile","centimeter"]},
  {title:"Weight", icon:"fa-weight-scale", units:["kg","g","lb","oz"]},
  {title:"Temperature", icon:"fa-thermometer-half", units:["celsius","fahrenheit","kelvin"]},
  {title:"Volume", icon:"fa-cube", units:["liter","milliliter","gallon","m3"]},
  {title:"Speed", icon:"fa-tachometer-alt", units:["km/h","m/s","mph"]},
  {title:"Area", icon:"fa-vector-square", units:["m2","km2","mi2","hectare"]},
  {title:"Time", icon:"fa-clock", units:["second","minute","hour","day"]},
  {title:"Currency", icon:"fa-dollar-sign", units:["USD-QAR","QAR-USD","USD-EUR","EUR-USD"]},
  {title:"Pressure", icon:"fa-tachometer-alt", units:["Pa","kPa","bar","atm"]},
  {title:"Energy", icon:"fa-bolt", units:["Joule","kJ","Calorie","kCal"]},
  {title:"Data Size", icon:"fa-database", units:["B","KB","MB","GB"]},
];

const container = document.getElementById('converter-container');
converters.forEach(conv=>{
  const card = document.createElement('div'); card.className="converter-card";
  card.innerHTML=`
    <h3><i class="fa-solid ${conv.icon}"></i> ${conv.title}</h3>
    <input type="number" placeholder="Enter value" class="input-val">
    <select class="unit-select">${conv.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <button class="calc-btn">Calculate</button>
    <div class="result"></div>
  `;
  container.appendChild(card);
});

container.addEventListener('click', e=>{
  if(e.target.classList.contains('calc-btn')){
    const card = e.target.closest('.converter-card');
    const val = parseFloat(card.querySelector('.input-val').value);
    const unit = card.querySelector('.unit-select').value;
    let res = convert(val,unit,card.querySelector('h3').innerText);
    const resDiv = card.querySelector('.result');
    resDiv.innerText = `Result: ${res}`;
    resDiv.classList.add('show');
    setTimeout(()=>resDiv.classList.remove('show'),800);
  }
});

// ================== SIMPLE CONVERT FUNCTION ==================
function convert(val,unit,title){
  if(isNaN(val)) return "Enter a number";
  // Example bidirectional conversions (expandable)
  switch(title.toLowerCase()){
    case "length":
      if(unit=="meter") return (val*1).toFixed(2)+" m";
      if(unit=="kilometer") return (val*1000).toFixed(2)+" m";
      if(unit=="mile") return (val*1609.34).toFixed(2)+" m";
      if(unit=="centimeter") return (val/100).toFixed(2)+" m";
      break;
    case "weight":
      if(unit=="kg") return val.toFixed(2)+" kg";
      if(unit=="g") return (val/1000).toFixed(2)+" kg";
      if(unit=="lb") return (val*0.453592).toFixed(2)+" kg";
      if(unit=="oz") return (val*0.0283495).toFixed(2)+" kg";
      break;
    case "temperature":
      if(unit=="celsius") return val.toFixed(2)+" °C";
      if(unit=="fahrenheit") return ((val-32)*5/9).toFixed(2)+" °C";
      if(unit=="kelvin") return (val-273.15).toFixed(2)+" °C";
      break;
    default: return val;
  }
}

// ================== SEARCH FUNCTION ==================
document.getElementById('searchBtn').addEventListener('click', ()=>{
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.converter-card');
  cards.forEach(c=>{
    if(c.querySelector('h3').innerText.toLowerCase().includes(query)){
      c.style.transform="scale(1.1)";
      c.scrollIntoView({behavior:"smooth",block:"center"});
    } else {
      c.style.transform="scale(1)";
    }
  });
});

// ================== CALORIES ==================
function calculateCalories(){
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const gender=document.getElementById('gender').value;
  const activity=parseFloat(document.getElementById('activity').value);
  if(!age||!weight||!height) {alert("Enter all values"); return;}
  let bmr=(gender=="male")? 10*weight +6.25*height -5*age +5 : 10*weight +6.25*height -5*age -161;
  let calories=bmr*activity;
  let protein=weight*1.5;
  let fat=weight*0.8;
  let carbs=(calories - (protein*4+fat*9))/4;
  document.getElementById('calorieResult').innerHTML=`
    <h3><i class="fa-solid fa-bolt"></i> Daily Requirements</h3>
    <p>Calories: ${calories.toFixed(2)} kcal</p>
    <p>Protein: ${protein.toFixed(2)} g</p>
    <p>Fat: ${fat.toFixed(2)} g</p>
    <p>Carbs: ${carbs.toFixed(2)} g</p>
  `;
}

// ================== PDF TOOLS (DEMO) ==================
function convertPdfToWord(){document.getElementById('pdfWordResult').innerText="Conversion failed. Use a valid PDF.";}
function convertWordToPdf(){document.getElementById('wordPdfResult').innerText="Conversion failed. Use a valid Word file.";}
