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

// ================== UNIT CONVERTER DATA ==================
const unitsData={
  length:{"meter":1,"kilometer":1000,"centimeter":0.01,"mile":1609.34},
  weight:{"kg":1,"g":0.001,"lb":0.453592,"oz":0.0283495},
  temperature:{"celsius":"c","fahrenheit":"f","kelvin":"k"}
};

// ================== GENERATE CARDS ==================
const converters=[
  {title:"Length", icon:"fa-ruler", units:Object.keys(unitsData.length)},
  {title:"Weight", icon:"fa-weight-scale", units:Object.keys(unitsData.weight)},
  {title:"Temperature", icon:"fa-thermometer-half", units:Object.keys(unitsData.temperature)}
];

const container=document.getElementById('converter-container');
converters.forEach(conv=>{
  const card=document.createElement('div'); card.className="converter-card";
  card.innerHTML=`
    <h3><i class="fa-solid ${conv.icon}"></i> ${conv.title} Converter</h3>
    <div class="icon-container">
      <svg width="50" height="50"><circle cx="25" cy="25" r="10" fill="#2196f3"><animate attributeName="r" values="10;20;10" dur="1.5s" repeatCount="indefinite"/></circle></svg>
    </div>
    <input type="number" class="input-val" placeholder="Enter value">
    <select class="unit-from">${conv.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <select class="unit-to">${conv.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <button class="calc-btn">Calculate</button>
    <div class="result"></div>
  `;
  container.appendChild(card);
});

// ================== CALCULATE ==================
container.addEventListener('click', e=>{
  if(e.target.classList.contains('calc-btn')){
    const card=e.target.closest('.converter-card');
    const val=parseFloat(card.querySelector('.input-val').value);
    const from=card.querySelector('.unit-from').value;
    const to=card.querySelector('.unit-to').value;
    let res=convert(val,from,to,card.querySelector('h3').innerText);
    const resDiv=card.querySelector('.result');
    resDiv.innerText=`Result: ${res}`;
    resDiv.classList.add('show');
    setTimeout(()=>resDiv.classList.remove('show'),800);
  }
});

// ================== BIDIRECTIONAL CONVERT FUNCTION ==================
function convert(val,from,to,title){
  if(isNaN(val)) return "Enter a number";
  title=title.toLowerCase();
  if(title.includes("length")){
    return (val*unitsData.length[from]/unitsData.length[to]).toFixed(2)+" "+to;
  } else if(title.includes("weight")){
    return (val*unitsData.weight[from]/unitsData.weight[to]).toFixed(2)+" "+to;
  } else if(title.includes("temperature")){
    let c=0;
    if(from=="celsius") c=val;
    else if(from=="fahrenheit") c=(val-32)*5/9;
    else if(from=="kelvin") c=val-273.15;
    let result=0;
    if(to=="celsius") result=c;
    else if(to=="fahrenheit") result=c*9/5+32;
    else if(to=="kelvin") result=c+273.15;
    return result.toFixed(2)+" "+to;
  }
  return val;
}

// ================== SEARCH ==================
document.getElementById('searchBtn').addEventListener('click',()=>{
  const q=document.getElementById('searchInput').value.toLowerCase();
  const cards=document.querySelectorAll('.converter-card');
  cards.forEach(c=>{
    if(c.querySelector('h3').innerText.toLowerCase().includes(q)){
      c.style.transform="scale(1.1)";
      c.scrollIntoView({behavior:"smooth", block:"center"});
    } else c.style.transform="scale(1)";
  });
});

// ================== CALORIES ==================
function calculateCalories(){
  const age=parseFloat(document.getElementById('age').value);
  const weight=parseFloat(document.getElementById('weight').value);
  const height=parseFloat(document.getElementById('height').value);
  const gender=document.getElementById('gender').value;
  const activity=parseFloat(document.getElementById('activity').value);
  if(!age||!weight||!height){alert("Enter all values"); return;}
  let bmr=(gender=="male")?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  let calories=bmr*activity;
  let protein=weight*1.5;
  let fat=weight*0.8;
  let carbs=(calories-(protein*4+fat*9))/4;
  document.getElementById('calorieResult').innerHTML=`
    <h3><i class="fa-solid fa-bolt"></i> Daily Requirements</h3>
    <p>Calories: ${calories.toFixed(2)} kcal</p>
    <p>Protein: ${protein.toFixed(2)} g</p>
    <p>Fat: ${fat.toFixed(2)} g</p>
    <p>Carbs: ${carbs.toFixed(2)} g</p>
  `;
}

// ================== PDF TOOLS ==================
function convertPdfToWord(){document.getElementById('pdfWordResult').innerText="Conversion failed. Use a valid PDF.";}
function convertWordToPdf(){document.getElementById('wordPdfResult').innerText="Conversion failed. Use a valid Word file.";}
