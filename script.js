// ================== TAB CONTROL ==================
const tabs=document.querySelectorAll('.tab-btn');
const contents=document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c=>c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ================== DARK/LIGHT MODE ==================
const modeBtn=document.getElementById('modeToggle');
modeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  // Show the *next* action on the button
  if(document.body.classList.contains('dark')){
    modeBtn.innerHTML='<i class="fa-solid fa-sun"></i> Light Mode';
  } else {
    modeBtn.innerHTML='<i class="fa-solid fa-moon"></i> Dark Mode';
  }
});

// ================== UNIT DATA (unchanged) ==================
const unitsData={
  length:{meter:1,kilometer:1000,centimeter:0.01,mile:1609.34,yard:0.9144,inch:0.0254,foot:0.3048},
  weight:{kg:1,g:0.001,lb:0.453592,oz:0.0283495,ton:1000},
  temperature:{celsius:"c",fahrenheit:"f",kelvin:"k"},
  volume:{liter:1,milliliter:0.001,gallon:3.78541,pint:0.473176,cup:0.24},
  speed:{kmh:1,mph:1.60934,ms:3.6,knot:1.852},
  area:{sqm:1,sqkm:1e6,sqmi:2.59e6,sqft:0.092903,acre:4046.86},
  time:{second:1,minute:60,hour:3600,day:86400,week:604800},
  currency:{USD:1,QAR:3.64,PKR:280,EUR:0.92},
  energy:{joule:1,kcal:4184,kwh:3600000},
  pressure:{pascal:1,bar:100000,psi:6894.76},
  datasize:{byte:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776}
};

// ================== LIVE CURRENCY ==================
async function fetchCurrencyRates() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=USD,QAR,PKR,EUR');
    const data = await res.json();
    if(data && data.rates) { unitsData.currency = data.rates; }
  } catch(err){ console.error(err); }
}
fetchCurrencyRates();

// ================== GENERATE CONVERTER CARDS (unchanged) ==================
const converters=[
  {title:"Length", icon:"fa-ruler", units:Object.keys(unitsData.length)},
  {title:"Weight", icon:"fa-weight-scale", units:Object.keys(unitsData.weight)},
  {title:"Temperature", icon:"fa-thermometer-half", units:Object.keys(unitsData.temperature)},
  {title:"Volume", icon:"fa-cube", units:Object.keys(unitsData.volume)},
  {title:"Speed", icon:"fa-tachometer-alt", units:Object.keys(unitsData.speed)},
  {title:"Area", icon:"fa-vector-square", units:Object.keys(unitsData.area)},
  {title:"Time", icon:"fa-clock", units:Object.keys(unitsData.time)},
  {title:"Currency", icon:"fa-dollar-sign", units:Object.keys(unitsData.currency)},
  {title:"Energy", icon:"fa-bolt", units:Object.keys(unitsData.energy)},
  {title:"Pressure", icon:"fa-gauge-high", units:Object.keys(unitsData.pressure)},
  {title:"Data Size", icon:"fa-database", units:Object.keys(unitsData.datasize)}
];
const container=document.getElementById('converter-container');
converters.forEach(conv=>{
  const card=document.createElement('div'); card.className="converter-card";
  card.innerHTML=`
    <h3><i class="fa-solid ${conv.icon}"></i> ${conv.title} Converter</h3>
    <div class="icon-container">
      <svg class="anim-icon" width="50" height="50"><circle cx="25" cy="25" r="10" fill="#2196f3"/></svg>
    </div>
    <input type="number" placeholder="Enter value" class="conv-input">
    <select class="from-unit">${conv.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <select class="to-unit">${conv.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <button class="calc-btn"><i class="fa-solid fa-calculator"></i> Calculate</button>
    <div class="result"></div>
  `;
  container.appendChild(card);
});

// Conversion logic (unchanged)
function convertValue(key,val,from,to){
  if(key==="temperature"){
    let c=0;
    if(from==="celsius") c=val;
    else if(from==="fahrenheit") c=(val-32)*5/9;
    else if(from==="kelvin") c=val-273.15;
    if(to==="celsius") return c.toFixed(2);
    if(to==="fahrenheit") return (c*9/5+32).toFixed(2);
    if(to==="kelvin") return (c+273.15).toFixed(2);
  } else if(key==="currency") {
    if(unitsData.currency[from] && unitsData.currency[to]){
      return (val*unitsData.currency[to]/unitsData.currency[from]).toFixed(2);
    } else return "N/A";
  } else {
    return (val*unitsData[key][from]/unitsData[key][to]).toFixed(2);
  }
}
document.querySelectorAll('.converter-card').forEach((card,i)=>{
  const key=converters[i].title.toLowerCase();
  const btn=card.querySelector('.calc-btn');
  const input=card.querySelector('.conv-input');
  const fromSel=card.querySelector('.from-unit');
  const toSel=card.querySelector('.to-unit');
  const resDiv=card.querySelector('.result');
  const icon=card.querySelector('.anim-icon');
  btn.addEventListener('click',()=>{
    const val=parseFloat(input.value);
    if(isNaN(val)){alert("Enter valid number"); return;}
    const result=convertValue(key,val,fromSel.value,toSel.value);
    resDiv.innerHTML=`Result: ${result} ${toSel.value}`;
    resDiv.classList.add('show');
    icon.style.animation="spin 1s linear";
    setTimeout(()=>{icon.style.animation="";},1000);
  });
});

// ================== SEARCH (unchanged) ==================
document.getElementById('searchBtn').addEventListener('click',()=>{
  const q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.converter-card').forEach(card=>{
    if(card.querySelector('h3').innerText.toLowerCase().includes(q)){
      card.style.transform="scale(1.1)";
      card.scrollIntoView({behavior:"smooth", block:"center"});
    } else card.style.transform="scale(1)";
  });
});

// ================== HEALTH & NUTRITION ==================
document.getElementById('calorieBtn').addEventListener('click', calculateCalories);

function calculateCalories(){
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const gender=document.getElementById('gender').value;
  const activity=parseFloat(document.getElementById('activity').value);
  if(!age||!weight||!height){alert("Enter all values"); return;}

  // BMR (Mifflin-St Jeor)
  const bmr=(gender==="male")? (10*weight + 6.25*height - 5*age + 5)
                            : (10*weight + 6.25*height - 5*age - 161);

  const tdee=bmr*activity; // maintenance calories
  // Macro suggestions (per day)
  const proteinG = (weight*1.8);      // ~1.6–2.2 g/kg → show range below
  const fatG     = (weight*0.8);      // ~0.6–1.0 g/kg
  const carbsG   = (tdee - (proteinG*4 + fatG*9))/4;

  // BMI and status
  const bmi=weight/((height/100)**2);
  let bmiStatus="";
  if(bmi<18.5) bmiStatus="Underweight";
  else if(bmi<24.9) bmiStatus="Normal";
  else if(bmi<29.9) bmiStatus="Overweight";
  else bmiStatus="Obese";

  // Ideal weight range from BMI 18.5–24.9
  const h2=(height/100)**2;
  const idealMin=(18.5*h2);
  const idealMax=(24.9*h2);

  // Water intake (~35 ml/kg)
  const waterLiters=(weight*0.035);

  // Age/Gender advice
  let adviceAge="";
  if(age<18) adviceAge="Prioritize balanced growth (consult guardian/doctor for plans).";
  else if(age<=35) adviceAge="Build consistency: strength + cardio, high-protein diet.";
  else if(age<=50) adviceAge="Focus on recovery, mobility, protein, and fiber.";
  else adviceAge="Heart-friendly diet, light resistance training, and daily walks.";
  const advice = `${gender==='male'?'Male':'Female'} • ${bmiStatus}. ${adviceAge}`;

  const resultDiv=document.getElementById('calorieResult');
  resultDiv.innerHTML="";

  const cards=[
    {title:"BMR", value:`${bmr.toFixed(0)} kcal`, sub:"Basal Metabolic Rate", color:"#ffab91", icon:"fa-bed"},
    {title:"TDEE (Maintain)", value:`${tdee.toFixed(0)} kcal`, sub:"Daily calories to maintain weight", color:"#ff7043", icon:"fa-gauge"},
    {title:"Cut (≈ -500 kcal)", value:`${Math.max(tdee-500,1200).toFixed(0)} kcal`, sub:"Approx. 0.5 kg / week", color:"#ef9a9a", icon:"fa-down-long"},
    {title:"Bulk (≈ +300 kcal)", value:`${(tdee+300).toFixed(0)} kcal`, sub:"Lean muscle gain target", color:"#a5d6a7", icon:"fa-up-long"},
    {title:"Protein (day)", value:`${proteinG.toFixed(0)} g`, sub:`Range: ${(weight*1.6).toFixed(0)}–${(weight*2.2).toFixed(0)} g`, color:"#66bb6a", icon:"fa-drumstick-bite"},
    {title:"Fat (day)", value:`${fatG.toFixed(0)} g`, sub:`Range: ${(weight*0.6).toFixed(0)}–${(weight*1.0).toFixed(0)} g`, color:"#ffee58", icon:"fa-oil-can"},
    {title:"Carbs (day)", value:`${Math.max(0,carbsG).toFixed(0)} g`, sub:"Remainder after protein & fat", color:"#42a5f5", icon:"fa-bread-slice"},
    {title:"BMI", value:`${bmi.toFixed(1)} (${bmiStatus})`, sub:`Ideal weight: ${idealMin.toFixed(1)}–${idealMax.toFixed(1)} kg`, color:"#ab47bc", icon:"fa-scale-balanced"},
    {title:"Water", value:`${waterLiters.toFixed(1)} L`, sub:"~35 ml per kg body weight", color:"#80deea", icon:"fa-droplet"},
    {title:"Advice", value:advice, sub:"Personalized by age, gender & BMI", color:"#ffa726", icon:"fa-heart-pulse"}
  ];

  cards.forEach((c,i)=>{
    const div=document.createElement('div');
    div.className="calorie-card";
    div.style.animationDelay=`${i*0.08}s`;
    div.innerHTML=`
      <h4><i class="fa-solid ${c.icon}"></i> ${c.title}</h4>
      <p>${c.value}</p>
      ${c.sub?`<small>${c.sub}</small>`:""}
      <svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="${c.color}"/></svg>`;
    resultDiv.appendChild(div);
  });

  // Save latest TDEE for food summary progress
  window.__LAST_TDEE__ = tdee;
}

// ================== FOOD CALORIES CALCULATOR ==================
const foodsDB = {
  "boiled rice":       {kcal:130, protein:2.4, carbs:28.0, fat:0.3},
  "chicken breast":    {kcal:165, protein:31.0, carbs:0.0,  fat:3.6},
  "beef (lean)":       {kcal:200, protein:26.0, carbs:0.0,  fat:10.0},
  "egg (whole)":       {kcal:155, protein:13.0, carbs:1.1,  fat:11.0},
  "milk (whole)":      {kcal:61,  protein:3.2, carbs:4.8,  fat:3.3},
  "apple":             {kcal:52,  protein:0.3, carbs:14.0, fat:0.2},
  "banana":            {kcal:89,  protein:1.1, carbs:23.0, fat:0.3},
  "oats":              {kcal:389, protein:16.9,carbs:66.3, fat:6.9},
  "almonds":           {kcal:579, protein:21.2,carbs:21.6, fat:49.9},
  "peanut butter":     {kcal:588, protein:25.0,carbs:20.0, fat:50.0},
  "salmon":            {kcal:208, protein:20.0,carbs:0.0,  fat:13.0},
  "tuna (canned)":     {kcal:132, protein:29.0,carbs:0.0,  fat:1.0},
  "potato (boiled)":   {kcal:87,  protein:1.9, carbs:20.0, fat:0.1},
  "sweet potato":      {kcal:86,  protein:1.6, carbs:20.0, fat:0.1},
  "broccoli":          {kcal:34,  protein:2.8, carbs:7.0,  fat:0.4},
  "white bread":       {kcal:265, protein:9.0, carbs:49.0, fat:3.2},
  "brown bread":       {kcal:252, protein:9.0, carbs:41.0, fat:3.5},
  "chapati (roti)":    {kcal:297, protein:9.6, carbs:56.0, fat:4.0},
  "biryani (chicken)": {kcal:215, protein:9.0, carbs:28.0, fat:7.0},
  "shawarma (chicken)":{"kcal":240,"protein":14.0,"carbs":20.0,"fat":12.0}
};

// Populate datalist
const foodListEl = document.getElementById('foodList');
Object.keys(foodsDB).sort().forEach(name=>{
  const opt=document.createElement('option'); opt.value=name; foodListEl.appendChild(opt);
});

const foodTbody=document.getElementById('foodTbody');
const foodSearch=document.getElementById('foodSearch');
const foodGram=document.getElementById('foodGram');
const addFoodBtn=document.getElementById('addFoodBtn');
let foodLog=[];

addFoodBtn.addEventListener('click', addFoodRow);
foodSearch.addEventListener('keydown', e=>{ if(e.key==='Enter') addFoodRow(); });
foodGram.addEventListener('keydown', e=>{ if(e.key==='Enter') addFoodRow(); });

function addFoodRow(){
  const name=(foodSearch.value||"").trim().toLowerCase();
  const grams=parseFloat(foodGram.value);
  if(!name || isNaN(grams) || grams<=0){
    alert('Select a food and enter grams > 0');
    return;
  }
  const base = foodsDB[name];
  if(!base){
    // allow custom food with kcal only (per 100g)
    const customKcal = prompt('Food not in list. Enter kcal per 100g for "'+name+'":', '100');
    const kcal100 = parseFloat(customKcal);
    if(isNaN(kcal100)){ alert('Invalid kcal'); return; }
    foodLog.push({name, grams, kcal: kcal100*grams/100, protein:0, carbs:0, fat:0});
  } else {
    foodLog.push({
      name, grams,
      kcal: base.kcal*grams/100,
      protein: base.protein*grams/100,
      carbs: base.carbs*grams/100,
      fat: base.fat*grams/100
    });
  }
  foodSearch.value=""; foodGram.value="";
  renderFoodTable();
}

function renderFoodTable(){
  foodTbody.innerHTML="";
  let totG=0, totK=0, totP=0, totC=0, totF=0;

  foodLog.forEach((row,idx)=>{
    totG += row.grams;
    totK += row.kcal;
    totP += row.protein;
    totC += row.carbs;
    totF += row.fat;

    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td style="text-transform:capitalize">${row.name}</td>
      <td>${row.grams.toFixed(0)}</td>
      <td>${row.kcal.toFixed(0)}</td>
      <td>${row.protein.toFixed(1)}</td>
      <td>${row.carbs.toFixed(1)}</td>
      <td>${row.fat.toFixed(1)}</td>
      <td><button class="food-row-remove" data-idx="${idx}"><i class="fa-solid fa-trash"></i></button></td>
    `;
    foodTbody.appendChild(tr);
  });

  // Totals
  document.getElementById('totG').innerText = totG.toFixed(0);
  document.getElementById('totKcal').innerText = totK.toFixed(0);
  document.getElementById('totP').innerText = totP.toFixed(1);
  document.getElementById('totC').innerText = totC.toFixed(1);
  document.getElementById('totF').innerText = totF.toFixed(1);

  // Remove listeners
  document.querySelectorAll('.food-row-remove').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const idx=parseInt(e.currentTarget.dataset.idx);
      foodLog.splice(idx,1);
      renderFoodTable();
    });
  });

  // Summary vs TDEE
  const tdee = window.__LAST_TDEE__;
  const summaryEl = document.getElementById('foodSummary');
  if(tdee){
    const pct = Math.min(100, Math.round((totK / tdee) * 100));
    summaryEl.innerHTML = `
      <strong>Daily Progress:</strong> ${totK.toFixed(0)} / ${tdee.toFixed(0)} kcal (${pct}%)
      <div style="margin-top:8px; width:100%; height:10px; border-radius:8px; background:#e3f2fd; overflow:hidden;">
        <div style="height:100%; width:${pct}%; background:#42a5f5;"></div>
      </div>
    `;
  } else {
    summaryEl.innerHTML = `Tip: Calculate your <strong>TDEE</strong> above to see progress versus your daily target.`;
  }
}

// ================== PDF TOOLS ==================
function convertPdfToWord(){
  const el=document.getElementById('pdfWordResult');
  el.classList.remove('muted');
  el.textContent="Conversion failed. Make sure it is a readable PDF.";
}
function convertWordToPdf(){
  const el=document.getElementById('wordPdfResult');
  el.classList.remove('muted');
  el.textContent="Conversion failed. Make sure it is a readable Word file.";
}

// ================== Small animation keyframe ==================
const style = document.createElement('style');
style.innerHTML = `@keyframes spin {from{transform:rotate(0)} to{transform:rotate(360deg)}}`;
document.head.appendChild(style);
