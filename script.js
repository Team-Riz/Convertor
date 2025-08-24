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

// ================== GENERATE CONVERTER CARDS (unchanged visuals) ==================
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

// ================== CONVERSION FUNCTION ==================
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

// ================== ADD CALCULATION EVENTS ==================
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

// ================== CALORIES (personal) ==================
document.getElementById('calorieBtn').addEventListener('click', calculateCalories);
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
  let bmi=weight/((height/100)**2);

  const resultDiv=document.getElementById('calorieResult');
  resultDiv.innerHTML="";

  const cards=[
    {title:"Calories", value:calories.toFixed(2)+" kcal", color:"#ff7043", icon:"fa-fire"},
    {title:"Protein", value:protein.toFixed(2)+" g", color:"#66bb6a", icon:"fa-drumstick-bite"},
    {title:"Fat", value:fat.toFixed(2)+" g", color:"#ffee58", icon:"fa-oil-can"},
    {title:"Carbs", value:carbs.toFixed(2)+" g", color:"#42a5f5", icon:"fa-bread-slice"},
    {title:"BMI", value:bmi.toFixed(1), color:"#ab47bc", icon:"fa-weight"},
    {title:"Advice", value:`${gender==='male'?'Male':'Female'} age ${age} advice: maintain healthy lifestyle`, color:"#ffa726", icon:"fa-heart-pulse"}
  ];

  cards.forEach(c=>{
    const div=document.createElement('div'); div.className="calorie-card";
    div.innerHTML=`<h4>${c.title}</h4><p>${c.value}</p><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="${c.color}"/></svg>`;
    resultDiv.appendChild(div);
  });
}

// ================== FOOD CALORIES (expanded dataset) ==================
// kcal per 100g (approx). Large but trimmed to keep file size reasonable.
// You can add more items by appending to this object.
const foodData = {
  // Fruits
  "Apple":52,"Banana":89,"Orange":47,"Grapes":69,"Pear":57,"Peach":39,"Pineapple":50,"Mango":60,"Papaya":43,"Kiwi":61,"Strawberries":33,"Blueberries":57,"Raspberries":52,"Blackberries":43,"Cherry":63,"Watermelon":30,"Cantaloupe":34,"Honeydew":36,"Pomegranate":83,"Guava":68,"Lychee":66,"Apricot":48,"Plum":46,"Fig":74,"Dates":282,"Avocado":160,
  // Vegetables
  "Tomato":18,"Cucumber":16,"Carrot":41,"Onion":40,"Garlic":149,"Broccoli":34,"Cauliflower":25,"Spinach":23,"Kale":49,"Lettuce":15,"Bell Pepper":26,"Mushrooms":22,"Zucchini":17,"Eggplant":25,"Sweet Corn":86,"Green Peas":81,"Sweet Potato":86,"Potato":77,"Okra":33,"Beetroot":43,"Cabbage":25,"Asparagus":20,"Celery":16,"Pumpkin":26,
  // Grains & Cereals
  "White Rice (cooked)":130,"Brown Rice (cooked)":123,"Basmati Rice (cooked)":121,"Quinoa (cooked)":120,"Oats (dry)":389,"Oatmeal (cooked)":71,"Wheat Bread":265,"White Bread":266,"Multigrain Bread":250,"Pasta (cooked)":131,"Spaghetti (cooked)":158,"Noodles (cooked)":138,"Couscous (cooked)":112,"Barley (cooked)":123,"Cornflakes":357,"Granola":471,"Rice Cakes":387,"Tortilla (wheat)":313,"Chapati":297,"Paratha":330,
  // Legumes & Pulses
  "Lentils (boiled)":116,"Chickpeas (boiled)":164,"Kidney Beans (boiled)":127,"Black Beans (boiled)":132,"Pinto Beans (boiled)":143,"Green Gram/Moong (boiled)":105,"Soybeans (boiled)":173,"Split Peas (boiled)":118,"Hummus":166,"Falafel":333,
  // Nuts & Seeds
  "Almonds":579,"Peanuts":567,"Cashews":553,"Walnuts":654,"Pistachios":562,"Hazelnuts":628,"Macadamia":718,"Pecans":691,"Pine Nuts":673,"Chia Seeds":486,"Flax Seeds":534,"Pumpkin Seeds":559,"Sesame Seeds":573,"Sunflower Seeds":584,"Coconut (fresh)":354,"Peanut Butter":588,"Almond Butter":614,"Tahini":595,
  // Dairy & Eggs
  "Milk (whole)":61,"Milk (skimmed)":34,"Yogurt (plain)":59,"Greek Yogurt":97,"Cheddar Cheese":403,"Mozzarella":300,"Paneer":321,"Butter":717,"Ghee":900,"Ice Cream":207,"Egg (whole)":155,"Egg White":52,"Egg Yolk":322,
  // Meats & Fish
  "Chicken Breast (roasted)":165,"Chicken Thigh (roasted)":209,"Chicken Wings (fried)":290,"Turkey (roasted)":189,"Beef (lean grilled)":250,"Mutton (cooked)":294,"Lamb Chop (grilled)":282,"Pork Loin (roasted)":242,"Bacon":541,"Sausage":301,"Ham":145,"Salami":336,
  "Salmon":208,"Tuna (in water)":132,"Sardines (in oil)":208,"Mackerel":205,"Tilapia":129,"Shrimp (boiled)":99,"Crab":97,"Lobster":89,"Cod":82,
  // Oils & Fats
  "Olive Oil":884,"Canola Oil":884,"Vegetable Oil":884,"Coconut Oil":892,"Mayonnaise":680,"Margarine":717,
  // Sweets & Snacks
  "Sugar":387,"Honey":304,"Jam":278,"Chocolate (dark)":546,"Chocolate (milk)":535,"Candy":394,"Cookies":502,"Cake (sponge)":297,"Doughnut":452,"Muffin":377,"Croissant":406,"Brownie":466,"Ice Lolly":95,"Popcorn (air-popped)":387,"Chips (potato)":536,"Nachos/Tortilla Chips":489,"Pretzels":380,"Biscuits (plain)":430,
  // Beverages
  "Black Coffee":2,"Latte (whole milk)":66,"Tea (plain)":1,"Orange Juice":45,"Apple Juice":46,"Cola":42,"Energy Drink":45,"Lemonade":40,"Milkshake":112,"Beer":43,"Red Wine":85,"White Wine":82,
  // Breakfast & Common Dishes
  "Idli":58,"Dosa (plain)":168,"Sambar":60,"Upma":110,"Poha":130,"Paratha (aloo)":260,"Biryani (chicken)":173,"Biryani (veg)":154,"Pulao (veg)":151,"Fried Rice (egg)":163,"Fried Rice (chicken)":168,"Kebab (seekh)":250,"Shawarma (chicken)":183,"Burger (beef)":295,"Burger (chicken)":263,"Pizza (cheese)":266,"Pizza (pepperoni)":298,"Pasta Alfredo":220,"Pasta Arrabbiata":140,"Mac & Cheese":164,"Lasagna":135,"Sandwich (egg)":200,"Sandwich (chicken)":230,"Sandwich (veg)":160,"French Fries":312,"Mashed Potato":88,"Garlic Bread":350,
  // Sauces & Condiments
  "Ketchup":112,"Mustard":66,"Soy Sauce":53,"Barbecue Sauce":150,"Hot Sauce":10,"Chutney (mint)":70,"Chutney (tamarind)":180,"Pickle (mixed)":120,
  // More fruits/veg for coverage
  "Dragon Fruit":60,"Star Fruit":31,"Jackfruit":95,"Custard Apple":94,"Durian":147,"Persimmon":81,"Nectarine":44,"Cranberries":46,"Prunes":240,"Raisins":299,
  "Arugula":25,"Bok Choy":13,"Brussels Sprouts":43,"Leeks":61,"Turnip":28,"Radish":16,"Yam":118,"Lotus Root":74
};

const foodSelect=document.getElementById('foodSelect');
function populateFoodSelect(list=Object.keys(foodData)){
  foodSelect.innerHTML="";
  list.forEach(f=>{
    const opt=document.createElement('option');
    opt.value=f; opt.innerText=f;
    foodSelect.appendChild(opt);
  });
}
populateFoodSelect();

document.getElementById('foodSearch').addEventListener('input',(e)=>{
  const q=e.target.value.toLowerCase();
  const filtered = Object.keys(foodData).filter(f=>f.toLowerCase().includes(q));
  populateFoodSelect(filtered);
});

document.getElementById('foodCalcBtn').addEventListener('click',()=>{
  const food=foodSelect.value;
  const qty=parseFloat(document.getElementById('foodQty').value);
  if(!food || isNaN(qty)){alert("Select food and enter quantity"); return;}
  const calPer100=foodData[food];
  const totalCal=(calPer100*qty/100).toFixed(2);

  const resultDiv=document.getElementById('calorieResult');
  const div=document.createElement('div'); div.className="calorie-card";
  div.innerHTML=`<h4>${food} Calories</h4><p>${totalCal} kcal</p><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="#ff7043"/></svg>`;
  resultDiv.appendChild(div);
});

// ================== EXPORT CSV ==================
document.getElementById('exportCSVBtn').addEventListener('click',()=>{
  const rows = [];
  document.querySelectorAll('#calorieResult .calorie-card').forEach(card=>{
    const title = card.querySelector('h4').innerText.replace(/,/g,';');
    const value = card.querySelector('p').innerText.replace(/,/g,';');
    rows.push([title, value]);
  });
  if(rows.length===0){alert("No data to export"); return;}
  let csvContent = "data:text/csv;charset=utf-8,Title,Value\n";
  rows.forEach(r=>{csvContent+=r.join(",")+"\n";});
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "calorie_results.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// ================== CLOUDCONVERT PDF ↔ WORD ==================
const apiKeyInput = document.getElementById('ccApiKey');
const sandboxCheckbox = document.getElementById('useSandbox');

const ccBase = () => sandboxCheckbox.checked
  ? 'https://api.sandbox.cloudconvert.com/v2'
  : 'https://api.cloudconvert.com/v2';

async function ccCreateJob(spec, apiKey){
  const res = await fetch(`${ccBase()}/jobs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(spec)
  });
  if(!res.ok){
    const errText = await res.text();
    throw new Error(`Job create failed: ${res.status} ${errText}`);
  }
  return res.json();
}

async function ccUploadToS3(uploadForm, file){
  const formData = new FormData();
  Object.entries(uploadForm.parameters).forEach(([k,v])=>formData.append(k,v));
  formData.append('file', file);
  const up = await fetch(uploadForm.url, { method: 'POST', body: formData });
  if(!(up.status===201 || up.ok)) throw new Error(`Upload failed: ${up.status}`);
}

async function ccPollForExport(apiKey, jobId, onProgress){
  // Poll job until export/url is finished; return download URLs
  for(let i=0;i<90;i++){ // ~3 minutes (90 * 2s)
    const res = await fetch(`${ccBase()}/jobs/${jobId}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    if(!res.ok) throw new Error(`Polling failed: ${res.status}`);
    const job = await res.json();
    const tasks = job.data?.tasks || [];
    const conv = tasks.find(t=>t.operation==='convert');
    if(onProgress && conv?.status) onProgress(conv.status, conv.percent ?? 0);

    const exp = tasks.find(t=>t.operation==='export/url' && t.status==='finished');
    if(exp && exp.result && Array.isArray(exp.result.files) && exp.result.files.length){
      return exp.result.files.map(f=>f.url);
    }
    const failedTask = tasks.find(t=>t.status==='error');
    if(failedTask) throw new Error(failedTask.message || 'Conversion error');
    await new Promise(r=>setTimeout(r,2000));
  }
  throw new Error('Timed out waiting for conversion.');
}

async function convertPdfToWord(){
  const apiKey = apiKeyInput.value.trim();
  if(!apiKey){ alert('Enter CloudConvert API Key'); return; }
  const file = document.getElementById('pdfInput').files[0];
  if(!file){ alert('Select a PDF file'); return; }
  const out = document.getElementById('pdfWordResult');
  out.innerText = 'Creating job...';

  try{
    // 1) Create job
    const spec = {
      tasks: {
        'import-1': { operation: 'import/upload' },
        'pdftoword': {
          operation: 'convert',
          input_format: 'pdf',
          output_format: 'docx',
          engine: 'pdftron-pdf2word',
          input: ['import-1'],
          images_ocr: true
        },
        'export-1': { operation: 'export/url', input: ['pdftoword'], inline: false }
      },
      tag: 'webapp'
    };
    const jobResp = await ccCreateJob(spec, apiKey);
    const jobId = jobResp.data.id;
    const importTask = jobResp.data.tasks.find(t=>t.name==='import-1' || t.operation==='import/upload');
    if(!importTask?.result?.form) throw new Error('Upload form missing from job response.');

    out.innerText = 'Uploading file...';
    // 2) Upload
    await ccUploadToS3(importTask.result.form, file);

    out.innerText = 'Converting (this may take a moment)...';
    // 3) Poll for export URLs
    const urls = await ccPollForExport(apiKey, jobId, (status, pct)=>{
      out.innerText = `Converting... (${status}${pct?` ${pct}%`:''})`;
    });

    // 4) Download
    const a = document.createElement('a');
    a.href = urls[0];
    a.download = file.name.replace(/\.pdf$/i,'.docx');
    document.body.appendChild(a);
    a.click();
    a.remove();
    out.innerText = 'Done! Your download should start automatically.';
  }catch(err){
    console.error(err);
    document.getElementById('pdfWordResult').innerText = `Conversion failed: ${err.message}`;
  }
}

async function convertWordToPdf(){
  const apiKey = apiKeyInput.value.trim();
  if(!apiKey){ alert('Enter CloudConvert API Key'); return; }
  const file = document.getElementById('wordInput').files[0];
  if(!file){ alert('Select a Word file'); return; }
  const out = document.getElementById('wordPdfResult');
  out.innerText = 'Creating job...';

  try{
    // 1) Create job
    const spec = {
      tasks: {
        'import-1': { operation: 'import/upload' },
        'doctopdf': {
          operation: 'convert',
          input_format: file.name.toLowerCase().endsWith('.doc') ? 'doc' : 'docx',
          output_format: 'pdf',
          input: ['import-1']
        },
        'export-1': { operation: 'export/url', input: ['doctopdf'], inline: false }
      },
      tag: 'webapp'
    };
    const jobResp = await ccCreateJob(spec, apiKey);
    const jobId = jobResp.data.id;
    const importTask = jobResp.data.tasks.find(t=>t.name==='import-1' || t.operation==='import/upload');
    if(!importTask?.result?.form) throw new Error('Upload form missing from job response.');

    out.innerText = 'Uploading file...';
    // 2) Upload
    await ccUploadToS3(importTask.result.form, file);

    out.innerText = 'Converting...';
    // 3) Poll
    const urls = await ccPollForExport(apiKey, jobId);

    // 4) Download
    const a = document.createElement('a');
    a.href = urls[0];
    a.download = file.name.replace(/\.(docx?|rtf)$/i,'.pdf');
    document.body.appendChild(a);
    a.click();
    a.remove();
    out.innerText = 'Done! Your download should start automatically.';
  }catch(err){
    console.error(err);
    document.getElementById('wordPdfResult').innerText = `Conversion failed: ${err.message}`;
  }
}

// Buttons
document.getElementById('pdfBtn').addEventListener('click', convertPdfToWord);
document.getElementById('wordBtn').addEventListener('click', convertWordToPdf);
