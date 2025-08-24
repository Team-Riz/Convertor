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
  if(document.body.classList.contains('dark')){
    modeBtn.innerHTML='<i class="fa-solid fa-moon"></i> Dark Mode';
  } else {
    modeBtn.innerHTML='<i class="fa-solid fa-sun"></i> Light Mode';
  }
});

// ================== UNIT DATA (Converters - unchanged) ==================
const unitsData = {
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

// ================== LIVE CURRENCY (best effort) ==================
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

// ================== CONVERSION FUNCTION (unchanged) ==================
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

// ================== ADD CALCULATION EVENTS (unchanged) ==================
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

// ================== CALORIES (unchanged) ==================
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
    {title:"Calories (TDEE)", value:calories.toFixed(0)+" kcal", color:"#ff7043", icon:"fa-fire"},
    {title:"Protein Target", value:protein.toFixed(0)+" g", color:"#66bb6a", icon:"fa-drumstick-bite"},
    {title:"Fat Target", value:fat.toFixed(0)+" g", color:"#ffee58", icon:"fa-oil-can"},
    {title:"Carbs Target", value:carbs.toFixed(0)+" g", color:"#42a5f5", icon:"fa-bread-slice"},
    {title:"BMI", value:bmi.toFixed(1), color:"#ab47bc", icon:"fa-weight"},
    {title:"Advice", value:`${gender==='male'?'Male':'Female'} age ${age}: stay active & hydrated`, color:"#ffa726", icon:"fa-heart-pulse"}
  ];

  cards.forEach(c=>{
    const div=document.createElement('div'); div.className="calorie-card";
    div.innerHTML=`<h4>${c.title}</h4><p>${c.value}</p><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="12" fill="${c.color}"/></svg>`;
    resultDiv.appendChild(div);
  });
}

// ================== NUTRITION: Food DB + CSV (same as before) ==================
const FOOD_DB = [
  {name:"Apple", per100g:52, serving_g:182, category:"Fruits"},
  {name:"Banana", per100g:89, serving_g:118, category:"Fruits"},
  {name:"Orange", per100g:47, serving_g:131, category:"Fruits"},
  {name:"Grapes", per100g:69, serving_g:92, category:"Fruits"},
  {name:"Mango", per100g:60, serving_g:165, category:"Fruits"},
  {name:"Watermelon", per100g:30, serving_g:280, category:"Fruits"},
  {name:"Strawberries", per100g:32, serving_g:144, category:"Fruits"},
  {name:"Blueberries", per100g:57, serving_g:148, category:"Fruits"},
  {name:"Dates (Deglet)", per100g:282, serving_g:24, category:"Fruits"},
  {name:"Avocado", per100g:160, serving_g:150, category:"Fruits"},
  {name:"Tomato", per100g:18, serving_g:123, category:"Vegetables"},
  {name:"Cucumber", per100g:15, serving_g:104, category:"Vegetables"},
  {name:"Carrot", per100g:41, serving_g:61, category:"Vegetables"},
  {name:"Broccoli", per100g:34, serving_g:91, category:"Vegetables"},
  {name:"Spinach", per100g:23, serving_g:30, category:"Vegetables"},
  {name:"Potato (boiled)", per100g:87, serving_g:173, category:"Vegetables"},
  {name:"Sweet Potato (baked)", per100g:90, serving_g:130, category:"Vegetables"},
  {name:"Onion", per100g:40, serving_g:110, category:"Vegetables"},
  {name:"Eggplant (grilled)", per100g:35, serving_g:100, category:"Vegetables"},
  {name:"Chicken Breast (grilled)", per100g:165, serving_g:120, category:"Protein"},
  {name:"Chicken Thigh (grilled)", per100g:209, serving_g:120, category:"Protein"},
  {name:"Beef (lean, grilled)", per100g:250, serving_g:120, category:"Protein"},
  {name:"Lamb (grilled)", per100g:294, serving_g:120, category:"Protein"},
  {name:"Fish (hamour, grilled)", per100g:130, serving_g:120, category:"Protein"},
  {name:"Shrimp (boiled)", per100g:99, serving_g:100, category:"Protein"},
  {name:"Egg (boiled)", per100g:155, serving_g:50, category:"Protein"},
  {name:"Paneer", per100g:321, serving_g:60, category:"Dairy"},
  {name:"Tofu (firm)", per100g:76, serving_g:85, category:"Protein"},
  {name:"Lentils (cooked)", per100g:116, serving_g:198, category:"Legumes"},
  {name:"Chickpeas (cooked)", per100g:164, serving_g:164, category:"Legumes"},
  {name:"Rajma / Kidney Beans (cooked)", per100g:127, serving_g:175, category:"Legumes"},
  {name:"White Rice (cooked)", per100g:130, serving_g:158, category:"Grains"},
  {name:"Brown Rice (cooked)", per100g:111, serving_g:195, category:"Grains"},
  {name:"Basmati Rice (cooked)", per100g:121, serving_g:158, category:"Grains"},
  {name:"Chapati (medium)", per100g:297, serving_g:40, category:"Grains"},
  {name:"Paratha (plain)", per100g:330, serving_g:80, category:"Grains"},
  {name:"Naan (plain)", per100g:310, serving_g:90, category:"Grains"},
  {name:"Pasta (cooked)", per100g:157, serving_g:140, category:"Grains"},
  {name:"Bread (white slice)", per100g:265, serving_g:25, category:"Grains"},
  {name:"Bread (brown slice)", per100g:247, serving_g:25, category:"Grains"},
  {name:"Chicken Biryani", per100g:179, serving_g:250, category:"Meals"},
  {name:"Mutton Biryani", per100g:205, serving_g:250, category:"Meals"},
  {name:"Beef Biryani", per100g:210, serving_g:250, category:"Meals"},
  {name:"Vegetable Biryani", per100g:150, serving_g:250, category:"Meals"},
  {name:"Chicken Kabsa", per100g:185, serving_g:300, category:"Meals"},
  {name:"Mandi (Chicken)", per100g:190, serving_g:300, category:"Meals"},
  {name:"Machboos (Chicken)", per100g:195, serving_g:300, category:"Meals"},
  {name:"Harees", per100g:120, serving_g:200, category:"Meals"},
  {name:"Shawarma (Chicken wrap)", per100g:220, serving_g:250, category:"Meals"},
  {name:"Shawarma (Beef wrap)", per100g:250, serving_g:250, category:"Meals"},
  {name:"Falafel (fried)", per100g:333, serving_g:50, category:"Meals"},
  {name:"Hummus", per100g:166, serving_g:100, category:"Meals"},
  {name:"Tabbouleh", per100g:120, serving_g:150, category:"Meals"},
  {name:"Fattoush", per100g:95, serving_g:150, category:"Meals"},
  {name:"Mutabbal / Baba Ganoush", per100g:120, serving_g:90, category:"Meals"},
  {name:"Butter Chicken", per100g:230, serving_g:200, category:"Meals"},
  {name:"Chicken Karahi", per100g:190, serving_g:220, category:"Meals"},
  {name:"Chicken Tikka (2 pcs)", per100g:160, serving_g:140, category:"Meals"},
  {name:"Beef Seekh Kebab", per100g:260, serving_g:120, category:"Meals"},
  {name:"Mutton Korma", per100g:260, serving_g:220, category:"Meals"},
  {name:"Dal Tadka", per100g:140, serving_g:200, category:"Meals"},
  {name:"Chana Masala", per100g:180, serving_g:200, category:"Meals"},
  {name:"Aloo Gobi", per100g:120, serving_g:200, category:"Meals"},
  {name:"Palak Paneer", per100g:190, serving_g:200, category:"Meals"},
  {name:"Baqala (Foul Medames)", per100g:110, serving_g:180, category:"Meals"},
  {name:"Burger (beef, single)", per100g:250, serving_g:200, category:"Fast Food"},
  {name:"Cheeseburger", per100g:280, serving_g:200, category:"Fast Food"},
  {name:"Chicken Burger", per100g:240, serving_g:200, category:"Fast Food"},
  {name:"French Fries", per100g:312, serving_g:117, category:"Fast Food"},
  {name:"Pizza (Margherita)", per100g:266, serving_g:125, category:"Fast Food"},
  {name:"Pizza (Pepperoni)", per100g:300, serving_g:125, category:"Fast Food"},
  {name:"Shish Tawook Sandwich", per100g:220, serving_g:250, category:"Fast Food"},
  {name:"Samosa (veg)", per100g:262, serving_g:40, category:"Snacks"},
  {name:"Samosa (meat)", per100g:310, serving_g:45, category:"Snacks"},
  {name:"Pakora", per100g:315, serving_g:50, category:"Snacks"},
  {name:"Spring Roll", per100g:250, serving_g:50, category:"Snacks"},
  {name:"Popcorn (salted)", per100g:387, serving_g:20, category:"Snacks"},
  {name:"Chips (potato)", per100g:536, serving_g:28, category:"Snacks"},
  {name:"Mixed Nuts (roasted)", per100g:607, serving_g:28, category:"Snacks"},
  {name:"Chocolate Bar (milk)", per100g:535, serving_g:45, category:"Snacks"},
  {name:"Biscuits (digestive)", per100g:475, serving_g:25, category:"Snacks"},
  {name:"Oatmeal (cooked)", per100g:68, serving_g:234, category:"Breakfast"},
  {name:"Cornflakes", per100g:357, serving_g:30, category:"Breakfast"},
  {name:"Pancake (plain)", per100g:227, serving_g:80, category:"Breakfast"},
  {name:"Scrambled Eggs", per100g:148, serving_g:100, category:"Breakfast"},
  {name:"Greek Yogurt (plain)", per100g:59, serving_g:170, category:"Dairy"},
  {name:"Whole Milk", per100g:61, serving_g:244, category:"Dairy"},
  {name:"Laban / Ayran", per100g:43, serving_g:250, category:"Dairy"},
  {name:"Cheddar Cheese", per100g:403, serving_g:28, category:"Dairy"},
  {name:"Butter", per100g:717, serving_g:14, category:"Dairy"},
  {name:"Karak Tea (sweet)", per100g:80, serving_g:200, category:"Beverage"},
  {name:"Milk Tea (sweet)", per100g:60, serving_g:220, category:"Beverage"},
  {name:"Black Tea (no sugar)", per100g:1, serving_g:240, category:"Beverage"},
  {name:"Arabic Coffee (no sugar)", per100g:1, serving_g:30, category:"Beverage"},
  {name:"Latte (whole milk)", per100g:54, serving_g:350, category:"Beverage"},
  {name:"Fresh Orange Juice", per100g:45, serving_g:240, category:"Beverage"},
  {name:"Cola (regular)", per100g:42, serving_g:355, category:"Beverage"},
  {name:"Cola (diet)", per100g:1, serving_g:355, category:"Beverage"},
  {name:"Mango Lassi (sweet)", per100g:110, serving_g:250, category:"Beverage"},
  {name:"Kunafa", per100g:360, serving_g:120, category:"Dessert"},
  {name:"Gulab Jamun (1 pc)", per100g:285, serving_g:50, category:"Dessert"},
  {name:"Baklava", per100g:430, serving_g:60, category:"Dessert"},
  {name:"Ice Cream (vanilla)", per100g:207, serving_g:66, category:"Dessert"},
];

const foodSelect = document.getElementById('foodSelect');
function populateFoodSelect() {
  const sorted = [...FOOD_DB].sort((a,b)=> a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  foodSelect.innerHTML = sorted.map(f => `<option value="${f.name}">${f.name} — ${f.category}</option>`).join('');
}
populateFoodSelect();

const foodSearch = document.getElementById('foodSearch');
foodSearch.addEventListener('input', ()=>{
  const q = foodSearch.value.toLowerCase();
  const filtered = FOOD_DB.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q));
  foodSelect.innerHTML = filtered.map(f => `<option value="${f.name}">${f.name} — ${f.category}</option>`).join('');
  if(!foodSelect.value && filtered[0]) foodSelect.value = filtered[0].name;
});

const foodTbody = document.getElementById('foodTbody');
const grandTotalCell = document.getElementById('grandTotalCell');
let foodRows = [];

document.getElementById('addFoodBtn').addEventListener('click', ()=>{
  const name = foodSelect.value;
  const qty = parseFloat(document.getElementById('foodQty').value || '1');
  const unit = document.getElementById('foodUnit').value;

  if(!name || isNaN(qty) || qty <= 0) { alert('Enter a valid food and quantity'); return; }
  const item = FOOD_DB.find(f => f.name === name);
  if(!item) { alert('Food not found'); return; }

  let perLabel, totalKcal;
  if(unit === 'g'){
    perLabel = `${item.per100g} per 100g`;
    totalKcal = (item.per100g * (qty/100));
  } else {
    const servingG = item.serving_g || 100;
    const kcalPerServing = item.per100g * (servingG/100);
    perLabel = `${Math.round(kcalPerServing)} per serving (~${servingG}g)`;
    totalKcal = kcalPerServing * qty;
  }

  const rowId = crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
  const row = {id: rowId, name, qty, unit, perLabel, total: Math.round(totalKcal)};
  foodRows.push(row);
  drawFoodTable();
});

function drawFoodTable(){
  foodTbody.innerHTML = foodRows.map(r => `
    <tr data-id="${r.id}">
      <td>${r.name}</td>
      <td>${r.qty}</td>
      <td>${r.unit}</td>
      <td>${r.perLabel}</td>
      <td>${r.total}</td>
      <td><button class="danger small delRowBtn" title="Remove"><i class="fa-solid fa-trash"></i></button></td>
    </tr>
  `).join('');

  document.querySelectorAll('.delRowBtn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const tr = e.target.closest('tr');
      const id = tr.getAttribute('data-id');
      foodRows = foodRows.filter(r => r.id !== id);
      drawFoodTable();
    });
  });

  const total = foodRows.reduce((s,r)=> s + r.total, 0);
  grandTotalCell.textContent = total;
}

document.getElementById('clearFoodBtn').addEventListener('click', ()=>{
  if(confirm('Clear all foods?')) {
    foodRows = [];
    drawFoodTable();
  }
});

document.getElementById('downloadCsvBtn').addEventListener('click', ()=>{
  if(foodRows.length === 0){ alert('No items to export.'); return; }
  const header = ['Food','Quantity','Unit','Kcal Per Unit','Total Kcal'];
  const rows = foodRows.map(r => [r.name, r.qty, r.unit, r.perLabel, r.total]);
  const csv = [header, ...rows].map(line => line.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nutrition_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ================== YOUTUBE TOOLS ==================
const ytFetchBtn = document.getElementById('ytFetchBtn');
const ytUrlInput = document.getElementById('ytUrl');
const ytResult = document.getElementById('ytResult');
const ytIdText = document.getElementById('ytIdText');
const thumbGrid = document.getElementById('thumbGrid');
const ytTitleWrap = document.getElementById('ytTitleWrap');
const buildLinksBtn = document.getElementById('buildLinksBtn');
const clipStart = document.getElementById('clipStart');
const clipEnd = document.getElementById('clipEnd');
const watchLink = document.getElementById('watchLink');
const watchOpen = document.getElementById('watchOpen');
const embedLink = document.getElementById('embedLink');
const embedOpen = document.getElementById('embedOpen');

function parseYouTubeId(url){
  try {
    // direct ID
    if(/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;

    const u = new URL(url);
    if(u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1).split('/')[0];
    }
    if(u.searchParams.get('v')) {
      return u.searchParams.get('v');
    }
    const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if(m) return m[1];
  } catch(e) {}
  return null;
}

function buildThumbCard(label, url){
  return `
    <div class="thumb-card">
      <img src="${url}" alt="${label}" onerror="this.closest('.thumb-card').style.display='none'">
      <div class="thumb-actions">
        <a href="${url}" download>Download</a>
        <a href="${url}" target="_blank">Open</a>
      </div>
    </div>
  `;
}

async function tryFetchTitle(oembedUrl){
  try {
    const res = await fetch(oembedUrl);
    if(!res.ok) return null;
    const json = await res.json();
    if(json && json.title) return json.title;
  } catch(e){ /* CORS may block; ignore */ }
  return null;
}

ytFetchBtn.addEventListener('click', async ()=>{
  const raw = ytUrlInput.value.trim();
  const id = parseYouTubeId(raw);
  if(!id){ alert('Please paste a valid YouTube URL or 11-char video ID.'); return; }

  ytIdText.textContent = id;
  ytResult.classList.remove('yt-hidden');

  // Thumbnails
  const base = `https://img.youtube.com/vi/${id}`;
  const thumbs = [
    {label:'maxresdefault', url:`${base}/maxresdefault.jpg`},
    {label:'sddefault',     url:`${base}/sddefault.jpg`},
    {label:'hqdefault',     url:`${base}/hqdefault.jpg`},
    {label:'mqdefault',     url:`${base}/mqdefault.jpg`},
    {label:'default',       url:`${base}/default.jpg`}
  ];
  thumbGrid.innerHTML = thumbs.map(t => buildThumbCard(t.label, t.url)).join('');

  // Title via oEmbed (may be blocked by CORS; best-effort)
  ytTitleWrap.innerHTML = '';
  const oe = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  const title = await tryFetchTitle(oe);
  if(title){
    ytTitleWrap.innerHTML = `<strong>Title:</strong> ${title}`;
  }

  // Reset links & QR
  watchLink.value = `https://www.youtube.com/watch?v=${id}`;
  watchOpen.href = watchLink.value;
  embedLink.value = `https://www.youtube.com/embed/${id}`;
  embedOpen.href = embedLink.value;
  renderQR(watchLink.value);
});

function toSeconds(s){
  if(!s) return null;
  if(/^\d+$/.test(s)) return parseInt(s,10);
  const parts = s.split(':').map(n=>parseInt(n,10));
  if(parts.some(isNaN)) return null;
  if(parts.length === 3) return parts[0]*3600 + parts[1]*60 + parts[2];
  if(parts.length === 2) return parts[0]*60 + parts[1];
  if(parts.length === 1) return parts[0];
  return null;
}

function renderQR(text){
  const box = document.getElementById('qrcode');
  box.innerHTML = '';
  new QRCode(box, {
    text,
    width: 170,
    height: 170,
  });
}

buildLinksBtn.addEventListener('click', ()=>{
  const id = ytIdText.textContent.trim();
  if(!id){ alert('Fetch a video first.'); return; }

  const s = toSeconds(clipStart.value.trim());
  const e = toSeconds(clipEnd.value.trim());

  // Watch link: supports start param via t= (end not supported on watch)
  const wl = new URL(`https://www.youtube.com/watch?v=${id}`);
  if(Number.isInteger(s) && s >= 0) wl.searchParams.set('t', String(s));
  watchLink.value = wl.toString();
  watchOpen.href = wl.toString();

  // Embed link: supports start & end
  const el = new URL(`https://www.youtube.com/embed/${id}`);
  if(Number.isInteger(s) && s >= 0) el.searchParams.set('start', String(s));
  if(Number.isInteger(e) && e >= 0) el.searchParams.set('end', String(e));
  el.searchParams.set('autoplay', '1');
  embedLink.value = el.toString();
  embedOpen.href = el.toString();

  renderQR(watchLink.value);
});

// Copy buttons
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.copy-btn');
  if(!btn) return;
  const selector = btn.getAttribute('data-copy');
  const input = document.querySelector(selector);
  if(!input) return;
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand('copy');
  btn.textContent = 'Copied!';
  setTimeout(()=>{ btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 1200);
});
