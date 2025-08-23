// ===================== Tabs =====================
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    tabContents.forEach(c => {
      c.classList.remove('active');
      if(c.id === target) c.classList.add('active');
    });
  });
});

// ===================== Dark/Light Mode =====================
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
  } else {
    modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
  }
});

// ===================== Converters =====================
const converterContainer = document.getElementById('converter-container');
const converters = [
  {name:"Length",icon:"fa-ruler",units:["Meter","Kilometer","Centimeter","Millimeter","Mile","Yard","Foot","Inch"],func:(val,from,to)=>{const f={"Meter":1,"Kilometer":1000,"Centimeter":0.01,"Millimeter":0.001,"Mile":1609.34,"Yard":0.9144,"Foot":0.3048,"Inch":0.0254};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Weight",icon:"fa-weight-scale",units:["Kilogram","Gram","Milligram","Pound","Ounce"],func:(val,from,to)=>{const f={"Kilogram":1,"Gram":0.001,"Milligram":0.000001,"Pound":0.453592,"Ounce":0.0283495};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Temperature",icon:"fa-thermometer-half",units:["Celsius","Fahrenheit","Kelvin"],func:(val,from,to)=>{let c=0;if(from==="Celsius") c=val; else if(from==="Fahrenheit") c=(val-32)*5/9; else c=val-273.15; if(to==="Celsius") return c.toFixed(2); else if(to==="Fahrenheit") return (c*9/5+32).toFixed(2); else return (c+273.15).toFixed(2);}},
  {name:"Volume",icon:"fa-cube",units:["Liter","Milliliter","Gallon","Cubic Meter"],func:(val,from,to)=>{const f={"Liter":1,"Milliliter":0.001,"Gallon":3.78541,"Cubic Meter":1000}; return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Speed",icon:"fa-tachometer-alt",units:["km/h","m/s","mph"],func:(val,from,to)=>{const f={"km/h":1,"m/s":3.6,"mph":1.60934}; return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Area",icon:"fa-vector-square",units:["m²","km²","mi²","ft²","yd²"],func:(val,from,to)=>{const f={"m²":1,"km²":1e6,"mi²":2.59e6,"ft²":0.092903,"yd²":0.836127};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Time",icon:"fa-clock",units:["Second","Minute","Hour","Day","Week"],func:(val,from,to)=>{const f={"Second":1,"Minute":60,"Hour":3600,"Day":86400,"Week":604800};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Currency",icon:"fa-dollar-sign",units:["USD","QAR","PKR","EUR"],func:(val,from,to)=>{const f={"USD":1,"QAR":0.27,"PKR":0.0055,"EUR":1.1}; return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Pressure",icon:"fa-tachometer-alt",units:["Pa","kPa","bar","atm"],func:(val,from,to)=>{const f={Pa:1,kPa:1000,bar:100000,atm:101325}; return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Energy",icon:"fa-bolt",units:["Joule","Calorie","kWh"],func:(val,from,to)=>{const f={Joule:1,Calorie:4.184,kWh:3.6e6}; return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Data Size",icon:"fa-database",units:["Byte","Kilobyte","Megabyte","Gigabyte","Terabyte"],func:(val,from,to)=>{const f={Byte:1,Kilobyte:1024,Megabyte:1048576,Gigabyte:1073741824,Terabyte:1099511627776}; return (val*f[from]/f[to]).toFixed(2);}}
];

converters.forEach(c=>{
  const card=document.createElement('div');
  card.classList.add('converter-card');
  card.innerHTML=`
    <h3><i class="fa-solid ${c.icon}"></i> ${c.name} Converter</h3>
    <input type="number" placeholder="Enter value" class="val">
    <select class="from">${c.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <select class="to">${c.units.map(u=>`<option value="${u}">${u}</option>`).join('')}</select>
    <button><i class="fa-solid fa-calculator"></i> Convert</button>
    <div class="result">Result: </div>
  `;
  const input=card.querySelector('.val');
  const fromSel=card.querySelector('.from');
  const toSel=card.querySelector('.to');
  const btn=card.querySelector('button');
  const resDiv=card.querySelector('.result');
  btn.addEventListener('click',()=>{
    const val=+input.value;
    if(isNaN(val)){alert("Enter a valid number"); return;}
    const result=c.func(val,fromSel.value,toSel.value);
    resDiv.innerText=`Result: ${result} ${toSel.value}`;
    resDiv.classList.add('show');
    setTimeout(()=>resDiv.classList.remove('show'),500);
  });
  converterContainer.appendChild(card);
});

// ===================== Search Functionality =====================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
function highlightConverter() {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.converter-card');
  cards.forEach(card=>{
    const title = card.querySelector('h3').innerText.toLowerCase();
    if(query && title.includes(query)){
      card.style.transform = "scale(1.05)";
      card.style.boxShadow = "0 15px 30px rgba(0,0,0,0.3)";
      card.scrollIntoView({behavior:"smooth", block:"center"});
    } else {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    }
  });
}
searchBtn.addEventListener('click', highlightConverter);
searchInput.addEventListener('keyup', e=>{
  if(e.key === "Enter") highlightConverter();
  if(searchInput.value==="") highlightConverter();
});

// ===================== Calories =====================
function calculateCalories() {
  const age = +document.getElementById('age').value;
  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const gender = document.getElementById('gender').value;
  const activity = +document.getElementById('activity').value;
  if(!age || !weight || !height){alert("Fill all fields"); return;}
  let bmr=0;
  if(gender==="male") bmr=88.36 + (13.4*weight)+(4.8*height)-(5.7*age);
  else bmr=447.6 + (9.2*weight)+(3.1*height)-(4.3*age);
  const calories = Math.round(bmr*activity);
  const protein = (weight*1.5).toFixed(1);
  const fat = (weight*0.8).toFixed(1);
  const carbs = ((calories-(protein*4+fat*9))/4).toFixed(1);
  const resultDiv = document.getElementById('calorieResult');
  resultDiv.innerHTML = `
    <h3><i class="fa-solid fa-bolt"></i> Daily Requirements</h3>
    <p>Calories: ${calories} kcal</p>
    <p>Protein: ${protein} g</p>
    <p>Fat: ${fat} g</p>
    <p>Carbs: ${carbs} g</p>
  `;
}

// ===================== PDF Tools (Demo) =====================
function convertPdfToWord(){document.getElementById('pdfWordResult').innerText="Conversion failed. Use a valid PDF.";}
function convertWordToPdf(){document.getElementById('wordPdfResult').innerText="Conversion failed. Use a valid Word file.";}
