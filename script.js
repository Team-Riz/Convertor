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

// ================== UNIT DATA ==================
const unitsData={
  length:{meter:1,kilometer:1000,centimeter:0.01,mile:1609.34,yard:0.9144,inch:0.0254,foot:0.3048},
  weight:{kg:1,g:0.001,lb:0.453592,oz:0.0283495,ton:1000},
  temperature:{celsius:"c",fahrenheit:"f",kelvin:"k"},
  volume:{liter:1,milliliter:0.001,gallon:3.78541,pint:0.473176,cup:0.24},
  speed:{kmh:1,mph:1.60934,ms:3.6,knot:1.852},
  area:{sqm:1,sqkm:1e6,sqmi:2.59e6, sqft:0.092903,acre:4046.86},
  time:{second:1,minute:60,hour:3600,day:86400,week:604800},
  currency:{USD:1,QAR:3.64,PKR:280,EUR:0.92},
  energy:{joule:1,kcal:4184,kwh:3600000},
  pressure:{pascal:1,bar:100000,psi:6894.76},
  datasize:{byte:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776}
};

// ================== GENERATE CARDS ==================
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
    const title=card.querySelector('h3').innerText;
    const res=convert(val,from,to,title);
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
  for(let key in unitsData){
    if(title.includes(key)){
      if(key=="temperature"){
        let c=0;
        if(from=="celsius") c=val;
        else if(from=="fahrenheit") c=(val-32)*5/9;
        else if(from=="kelvin") c=val-273.15;
        if(to=="celsius") return c.toFixed(2);
        if(to=="fahrenheit") return (c*9/5+32).toFixed(2);
        if(to=="kelvin") return (c+273.15).toFixed(2);
      } else {
        const res=val*unitsData[key][from]/unitsData[key][to];
        return res.toFixed(2);
      }
    }
  }
  return "N/A";
}

// ================== SEARCH ==================
document.getElementById('searchBtn').addEventListener('click',()=>{
  const q=document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.converter-card').forEach(card=>{
    if(card.querySelector('h3').innerText.toLowerCase().includes(q)){
      card.style.transform="scale(1.1)";
      card.scrollIntoView({behavior:"smooth", block:"center"});
    } else card.style.transform="scale(1)";
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
