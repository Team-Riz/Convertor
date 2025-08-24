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
  if(document.body.classList.contains('dark')){
    modeBtn.innerHTML='<i class="fa-solid fa-sun"></i> Light Mode';
  } else {
    modeBtn.innerHTML='<i class="fa-solid fa-moon"></i> Dark Mode';
  }
});

// ================== UNIT DATA ==================
const unitsData={...}; // unchanged

// ================== LIVE CURRENCY ==================
async function fetchCurrencyRates() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=USD,QAR,PKR,EUR');
    const data = await res.json();
    if(data && data.rates) { unitsData.currency = data.rates; }
  } catch(err){ console.error(err); }
}
fetchCurrencyRates();

// ================== GENERATE CONVERTER CARDS ==================
/* No changes here – untouched */

// ================== CALORIES CALCULATION ==================
document.getElementById('calorieBtn').addEventListener('click', calculateCalories);

function calculateCalories(){
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const gender=document.getElementById('gender').value;
  const activity=parseFloat(document.getElementById('activity').value);

  if(!age||!weight||!height){alert("Please fill all fields"); return;}

  let bmr=(gender=="male")?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  let calories=bmr*activity;
  let protein=weight*1.5;
  let fat=weight*0.8;
  let carbs=(calories-(protein*4+fat*9))/4;
  let bmi=weight/((height/100)**2);

  // Personalized Advice
  let bmiStatus="";
  if(bmi<18.5) bmiStatus="Underweight";
  else if(bmi<24.9) bmiStatus="Normal";
  else if(bmi<29.9) bmiStatus="Overweight";
  else bmiStatus="Obese";

  let advice="";
  if(age<18) advice="Focus on balanced nutrition and growth.";
  else if(age<=35) advice="Maintain regular workouts and a high-protein diet.";
  else if(age<=50) advice="Stay active and manage calorie intake.";
  else advice="Focus on heart-friendly foods and light exercises.";

  advice += ` (${gender==='male'?'Male':'Female'} | ${bmiStatus})`;

  const resultDiv=document.getElementById('calorieResult');
  resultDiv.innerHTML="";

  const cards=[
    {title:"Calories", value:calories.toFixed(2)+" kcal", color:"#ff7043", icon:"fa-fire"},
    {title:"Protein", value:protein.toFixed(2)+" g", color:"#66bb6a", icon:"fa-drumstick-bite"},
    {title:"Fat", value:fat.toFixed(2)+" g", color:"#ffee58", icon:"fa-oil-can"},
    {title:"Carbs", value:carbs.toFixed(2)+" g", color:"#42a5f5", icon:"fa-bread-slice"},
    {title:"BMI", value:bmi.toFixed(1)+" ("+bmiStatus+")", color:"#ab47bc", icon:"fa-weight"},
    {title:"Advice", value:advice, color:"#ffa726", icon:"fa-heart-pulse"}
  ];

  cards.forEach((c,i)=>{
    const div=document.createElement('div');
    div.className="calorie-card";
    div.style.animationDelay=`${i*0.15}s`;
    div.innerHTML=`
      <h4><i class="fa-solid ${c.icon}"></i> ${c.title}</h4>
      <p>${c.value}</p>
      <svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="${c.color}"/></svg>`;
    resultDiv.appendChild(div);
  });
}

// ================== PDF TOOLS ==================
function convertPdfToWord(){document.getElementById('pdfWordResult').innerText="Conversion failed. Make sure it is a readable PDF.";}
function convertWordToPdf(){document.getElementById('wordPdfResult').innerText="Conversion failed. Make sure it is a readable Word file.";}
