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
    modeBtn.innerHTML='<i class="fa-solid fa-moon"></i> Dark Mode';
  } else {
    modeBtn.innerHTML='<i class="fa-solid fa-sun"></i> Light Mode';
  }
});

// ================== UNIT DATA & FETCH ==================
const unitsData={/* previous unit definitions */};
async function fetchCurrencyRates(){/* previous fetch code */} fetchCurrencyRates();

// ================== GENERATE CONVERTER CARDS ==================
const converters=[/* previous converters list */];
// ... previous card generation code ...

// ================== CONVERSION FUNCTION ==================
function convertValue(key,val,from,to){/* previous conversion code */}

// ================== ADD CALCULATION EVENTS ==================
/* previous event code */

// ================== SEARCH ==================
document.getElementById('searchBtn').addEventListener('click',()=>{/* previous search code */});

// ================== CALORIES ==================
function calculateCalories(){
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const gender=document.getElementById('gender').value;
  const activity=parseFloat(document.getElementById('activity').value);
  if(!age||!weight||!height){alert("Enter all values"); return;}

  // BMR & Calories
  let bmr=(gender=="male")?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  let calories=bmr*activity;
  let protein=weight*1.5;
  let fat=weight*0.8;
  let carbs=(calories-(protein*4+fat*9))/4;

  // BMI
  let bmi=weight/((height/100)*(height/100));
  let bmiStatus="";
  if(bmi<18.5) bmiStatus="Underweight";
  else if(bmi<25) bmiStatus="Normal";
  else if(bmi<30) bmiStatus="Overweight";
  else bmiStatus="Obese";

  // Gender & Age advice
  let genderAdv=(gender=="male")?"Maintain muscle mass with protein-rich diet.":"Focus on iron & calcium intake.";
  let ageAdv="";
  if(age<18) ageAdv="Growth stage, ensure balanced nutrition.";
  else if(age<40) ageAdv="Maintain active lifestyle.";
  else if(age<60) ageAdv="Include moderate exercises & healthy diet.";
  else ageAdv="Focus on joint care & light activity.";

  // Diet & Exercise suggestions
  let diet="",exercise="";
  if(bmiStatus==="Underweight"){ diet="High calorie meals, nuts, smoothies"; exercise="Light strength training";}
  else if(bmiStatus==="Normal"){ diet="Balanced diet with proteins & veggies"; exercise="Mix of cardio & strength";}
  else if(bmiStatus==="Overweight"){ diet="Low carb, high fiber meals"; exercise="Cardio 30-60 min daily";}
  else{ diet="Consult nutritionist"; exercise="Light exercises & walking";}

  // Render results in small cards
  const resDiv=document.getElementById('calorieResult');
  resDiv.innerHTML="";
  const results=[
    {title:"Calories", value:`${calories.toFixed(2)} kcal`},
    {title:"Protein", value:`${protein.toFixed(2)} g`},
    {title:"Fat", value:`${fat.toFixed(2)} g`},
    {title:"Carbs", value:`${carbs.toFixed(2)} g`},
    {title:"BMI", value:`${bmi.toFixed(2)} (${bmiStatus})`},
    {title:"Gender Advice", value:genderAdv},
    {title:"Age Advice", value:ageAdv},
    {title:"Diet Suggestion", value:diet},
    {title:"Exercise Suggestion", value:exercise}
  ];
  results.forEach(r=>{
    const card=document.createElement('div'); card.className="cal-card";
    card.innerHTML=`<svg class="cal-icon"><circle cx="20" cy="20" r="15"/></svg><h4>${r.title}</h4><p>${r.value}</p>`;
    resDiv.appendChild(card);
  });
}

// ================== PDF TOOLS ==================
function convertPdfToWord(){document.getElementById('pdfWordResult').innerText="Conversion failed. Make sure it is a readable PDF.";}
function convertWordToPdf(){document.getElementById('wordPdfResult').innerText="Conversion failed. Make sure it is a readable Word file.";}
