// --- Tab Switching ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// --- Light/Dark Mode Toggle ---
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// --- PDF to Word (Demo) ---
async function convertPdfToWord() {
  const file = document.getElementById('pdfToWord').files[0];
  if (!file) return alert("Select PDF first.");
  document.getElementById('pdfWordResult').innerText = "Converting...";
  setTimeout(() => {
    document.getElementById('pdfWordResult').innerText = "Your Word file is ready! (Demo)";
  }, 2000);
}

// --- Word to PDF (Demo) ---
async function convertWordToPdf() {
  const file = document.getElementById('wordToPdf').files[0];
  if (!file) return alert("Select Word file first.");
  document.getElementById('wordPdfResult').innerText = "Converting...";
  setTimeout(() => {
    document.getElementById('wordPdfResult').innerText = "Your PDF file is ready! (Demo)";
  }, 2000);
}

// --- Calories Calculator ---
function calculateCalories() {
  const age = +document.getElementById('age').value;
  const weight = +document.getElementById('weight').value;
  const height = +document.getElementById('height').value;
  const gender = document.getElementById('gender').value;
  const activity = +document.getElementById('activity').value;

  if (!age || !weight || !height) return alert("Fill all fields.");

  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const maintenance = bmr * activity;
  const protein = (maintenance * 0.3) / 4;
  const carbs = (maintenance * 0.4) / 4;
  const fats = (maintenance * 0.3) / 9;

  document.getElementById('calorieResult').innerHTML = `
    <h3>Daily Calorie Breakdown</h3>
    <p><strong>Total Calories:</strong> ${maintenance.toFixed(0)} kcal/day</p>
    <p><strong>Protein:</strong> ${protein.toFixed(1)} g</p>
    <p><strong>Carbs:</strong> ${carbs.toFixed(1)} g</p>
    <p><strong>Fats:</strong> ${fats.toFixed(1)} g</p>
  `;
}

// --- Converters (All Units + Bidirectional) ---
const converterContainer = document.getElementById('converter-container');

const converters = [
  // Length
  {name:"Length", icon:"fa-ruler", units:["Meter","Kilometer","Centimeter","Mile","Yard","Foot","Inch"],
   func:(val,from,to)=>{const f={Meter:1,Kilometer:1000,Centimeter:0.01,Mile:1609.34,Yard:0.9144,Foot:0.3048,Inch:0.0254};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Weight
  {name:"Weight", icon:"fa-weight-scale", units:["Kilogram","Gram","Pound","Ounce"],
   func:(val,from,to)=>{const f={Kilogram:1,Gram:0.001,Pound:0.453592,Ounce:0.0283495};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Temperature
  {name:"Temperature", icon:"fa-thermometer-half", units:["Celsius","Fahrenheit","Kelvin"],
   func:(val,from,to)=>{let c=0;if(from==="Celsius")c=val;else if(from==="Fahrenheit")c=(val-32)*5/9;else c=val-273.15;if(to==="Celsius")return c.toFixed(2);if(to==="Fahrenheit")return (c*9/5+32).toFixed(2);if(to==="Kelvin")return (c+273.15).toFixed(2);}
  },
  // Volume
  {name:"Volume", icon:"fa-cube", units:["Liter","Milliliter","Gallon","Cubic Meter"],
   func:(val,from,to)=>{const f={Liter:1,Milliliter:0.001,Gallon:3.78541,"Cubic Meter":1000};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Speed
  {name:"Speed", icon:"fa-tachometer-alt", units:["km/h","m/s","mph","knot"],
   func:(val,from,to)=>{const f={"km/h":1,"m/s":3.6,"mph":1.60934,"knot":1.852};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Area
  {name:"Area", icon:"fa-vector-square", units:["Square Meter","Square Kilometer","Square Mile","Hectare","Acre"],
   func:(val,from,to)=>{const f={"Square Meter":1,"Square Kilometer":1e6,"Square Mile":2.59e6,Hectare:10000,Acre:4046.86};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Time
  {name:"Time", icon:"fa-clock", units:["Second","Minute","Hour","Day","Week"],
   func:(val,from,to)=>{const f={Second:1,Minute:60,Hour:3600,Day:86400,Week:604800};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Currency
  {name:"Currency", icon:"fa-dollar-sign", units:["USD","QAR","PKR","EUR","GBP"],
   func:(val,from,to)=>{const f={USD:1,QAR:3.64,PKR:280,EUR:0.93,GBP:0.81};return (val*f[to]/f[from]).toFixed(2);}
  },
  // Pressure
  {name:"Pressure", icon:"fa-gauge", units:["Pascal","Bar","Atmosphere","Psi"],
   func:(val,from,to)=>{const f={Pascal:1,Bar:100000,Atmosphere:101325,Psi:6894.76};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Energy
  {name:"Energy", icon:"fa-bolt", units:["Joule","Calorie","kWh","Kilojoule"],
   func:(val,from,to)=>{const f={Joule:1,Calorie:4.184,kWh:3.6e6,Kilojoule:1000};return (val*f[from]/f[to]).toFixed(2);}
  },
  // Data Size
  {name:"Data Size", icon:"fa-database", units:["Bit","Byte","Kilobyte","Megabyte","Gigabyte"],
   func:(val,from,to)=>{const f={Bit:1,Byte:8,Kilobyte:8192,Megabyte:8388608,Gigabyte:8589934592};return (val*f[from]/f[to]).toFixed(2);}
  }
];

converters.forEach((conv,idx)=>{
  const div = document.createElement('div');
  div.className='converter-card';
  div.innerHTML=`
    <h3><i class="fa-solid ${conv.icon}"></i> ${conv.name}</h3>
    <input type="number" id="val-${idx}" placeholder="Enter value" />
    <select id="from-${idx}"></select>
    <select id="to-${idx}"></select>
    <button id="btn-${idx}">Convert</button>
    <div class="result" id="res-${idx}"></div>
  `;
  converterContainer.appendChild(div);

  const fromSelect = document.getElementById(`from-${idx}`);
  const toSelect = document.getElementById(`to-${idx}`);
  conv.units.forEach(u=>{fromSelect.innerHTML+=`<option value="${u}">${u}</option>`;toSelect.innerHTML+=`<option value="${u}">${u}</option>`;});

  document.getElementById(`btn-${idx}`).addEventListener('click',()=>{
    const val=parseFloat(document.getElementById(`val-${idx}`).value);
    const from=fromSelect.value;
    const to=toSelect.value;
    if(isNaN(val)){alert("Enter valid number");return;}
    const res=conv.func(val,from,to);
    document.getElementById(`res-${idx}`).innerHTML=`<strong>${res} ${to}</strong>`;
  });
});
