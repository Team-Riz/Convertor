// --- Tab Switching ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(btn=>btn.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c=>c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// --- Dark/Light Mode ---
document.getElementById('modeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('dark');
});

// --- PDF Tools Demo ---
function convertPdfToWord(){
  const file=document.getElementById('pdfToWord').files[0];
  if(!file){alert("Select PDF first."); return;}
  const res=document.getElementById('pdfWordResult');
  res.innerText="Converting...";
  setTimeout(()=>{res.innerText="Your Word file is ready! (Demo)";},2000);
}
function convertWordToPdf(){
  const file=document.getElementById('wordToPdf').files[0];
  if(!file){alert("Select Word file first."); return;}
  const res=document.getElementById('wordPdfResult');
  res.innerText="Converting...";
  setTimeout(()=>{res.innerText="Your PDF file is ready! (Demo)";},2000);
}

// --- Calories ---
function calculateCalories(){
  const age=+document.getElementById('age').value;
  const weight=+document.getElementById('weight').value;
  const height=+document.getElementById('height').value;
  const gender=document.getElementById('gender').value;
  const activity=+document.getElementById('activity').value;
  if(!age||!weight||!height){alert("Fill all fields."); return;}
  const bmr=gender==='male'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  const maintenance=bmr*activity;
  const protein=(maintenance*0.3)/4;
  const carbs=(maintenance*0.4)/4;
  const fats=(maintenance*0.3)/9;
  document.getElementById('calorieResult').innerHTML=`
    <h3>Daily Calorie Breakdown</h3>
    <p><strong>Total Calories:</strong> ${maintenance.toFixed(0)} kcal/day</p>
    <p><strong>Protein:</strong> ${protein.toFixed(1)} g</p>
    <p><strong>Carbs:</strong> ${carbs.toFixed(1)} g</p>
    <p><strong>Fats:</strong> ${fats.toFixed(1)} g</p>
  `;
}

// --- Converters ---
const converterContainer=document.getElementById('converter-container');
const converters=[
  {name:"Length",icon:"fa-ruler",units:["Meter","Kilometer","Centimeter","Mile","Yard","Foot","Inch"],func:(val,from,to)=>{const f={Meter:1,Kilometer:1000,Centimeter:0.01,Mile:1609.34,Yard:0.9144,Foot:0.3048,Inch:0.0254};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Weight",icon:"fa-weight-scale",units:["Kilogram","Gram","Pound","Ounce"],func:(val,from,to)=>{const f={Kilogram:1,Gram:0.001,Pound:0.453592,Ounce:0.0283495};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Temperature",icon:"fa-thermometer-half",units:["Celsius","Fahrenheit","Kelvin"],func:(val,from,to)=>{let c=0;if(from==="Celsius")c=val;else if(from==="Fahrenheit")c=(val-32)*5/9;else c=val-273.15;if(to==="Celsius")return c.toFixed(2);if(to==="Fahrenheit")return (c*9/5+32).toFixed(2);if(to==="Kelvin")return (c+273.15).toFixed(2);}},
  {name:"Volume",icon:"fa-cube",units:["Liter","Milliliter","Gallon","Cubic Meter"],func:(val,from,to)=>{const f={Liter:1,Milliliter:0.001,Gallon:3.78541,"Cubic Meter":1000};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Speed",icon:"fa-tachometer-alt",units:["km/h","m/s","mph","knot"],func:(val,from,to)=>{const f={"km/h":1,"m/s":3.6,"mph":1.60934,"knot":1.852};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Area",icon:"fa-vector-square",units:["Square Meter","Square Kilometer","Square Mile","Hectare","Acre"],func:(val,from,to)=>{const f={"Square Meter":1,"Square Kilometer":1e6,"Square Mile":2.59e6,Hectare:10000,Acre:4046.86};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Time",icon:"fa-clock",units:["Second","Minute","Hour","Day","Week"],func:(val,from,to)=>{const f={Second:1,Minute:60,Hour:3600,Day:86400,Week:604800};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Currency",icon:"fa-dollar-sign",units:["USD","QAR","PKR","EUR"],func:(val,from,to)=>{const f={"USD":1,"QAR":0.27,"PKR":0.0055,"EUR":1.1};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Pressure",icon:"fa-tachometer-alt",units:["Pa","kPa","bar","atm"],func:(val,from,to)=>{const f={Pa:1,kPa:1000,bar:100000,atm:101325};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Energy",icon:"fa-bolt",units:["Joule","Calorie","kWh"],func:(val,from,to)=>{const f={Joule:1,Calorie:4.184,kWh:3.6e6};return (val*f[from]/f[to]).toFixed(2);}},
  {name:"Data Size",icon:"fa-database",units:["Byte","Kilobyte","Megabyte","Gigabyte","Terabyte"],func:(val,from,to)=>{const f={Byte:1,Kilobyte:1024,Megabyte:1048576,Gigabyte:1073741824,Terabyte:1099511627776};return (val*f[from]/f[to]).toFixed(2);}}
];

converters.forEach(c=>{
  const card=document.createElement('div');
  card.classList.add('converter-card');
  card.innerHTML=`
    <h3><i class="fa-solid ${c.icon}"></i> ${c.name} Converter</h3>
    <input type="number" placeholder="Enter Value" class="val">
    <select class="from">
      ${c.units.map(u=>`<option value="${u}">${u}</option>`).join('')}
    </select>
    <select class="to">
      ${c.units.map(u=>`<option value="${u}">${u}</option>`).join('')}
    </select>
    <button>Convert</button>
    <div class="result">Result: </div>
  `;
  const input=card.querySelector('.val');
  const fromSel=card.querySelector('.from');
  const toSel=card.querySelector('.to');
  const btn=card.querySelector('button');
  const resDiv=card.querySelector('.result');
  btn.addEventListener('click',()=>{
    const val=+input.value;
    if(isNaN(val)){alert("Enter a valid number."); return;}
    const result=c.func(val,fromSel.value,toSel.value);
    resDiv.innerText=`Result: ${result} ${toSel.value}`;
    resDiv.classList.add('show');
    setTimeout(()=>resDiv.classList.remove('show'),500);
  });
  converterContainer.appendChild(card);
});
