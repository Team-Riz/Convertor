/* ========== INITIALIZE ========== */
// theme (light/dark)
const modeToggle = document.getElementById('modeToggle');
(function initTheme(){
  const saved = localStorage.getItem('site-theme') || 'light';
  if(saved === 'dark'){ document.body.classList.add('dark'); modeToggle.innerHTML = '<i class="fas fa-sun"></i>'; }
  else { document.body.classList.remove('dark'); modeToggle.innerHTML = '<i class="fas fa-moon"></i>'; }
})();
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
  modeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
    // scroll to top of main for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// search
document.getElementById('searchBtn').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') doSearch();
});
function doSearch(){
  const q = (document.getElementById('searchInput').value||'').trim().toLowerCase();
  document.querySelectorAll('.converter').forEach(c => c.classList.remove('highlight'));
  if(!q) return;
  const active = document.querySelector('.tab-page.active');
  const convs = Array.from(active.querySelectorAll('.converter'));
  const found = convs.find(c => (c.dataset.name||'').toLowerCase().includes(q));
  if(found){
    found.classList.add('highlight');
    found.scrollIntoView({ behavior:'smooth', block:'center' });
  }
}

/* ========== UTILS ========== */
function safeNum(n){ const v = parseFloat(n); return Number.isFinite(v) ? v : NaN; }
function fmt2(n){ return Number.isFinite(n) ? n.toFixed(2) : '—'; }

/* ==== CONVERTERS ==== */

/* LENGTH (base meter) */
function convertLength(){
  const val = safeNum(document.getElementById('lengthValue').value);
  const from = document.getElementById('lengthFrom').value;
  const to = document.getElementById('lengthTo').value;
  const base = {
    meter:1, kilometer:1000, centimeter:0.01, millimeter:0.001,
    mile:1609.344, yard:0.9144, foot:0.3048, inch:0.0254
  };
  const res = val * base[from] / base[to];
  document.getElementById('lengthResult').innerText = `${fmt2(res)} ${to}`;
}

/* WEIGHT (base kilogram) */
function convertWeight(){
  const val = safeNum(document.getElementById('weightValue').value);
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;
  const base = { kilogram:1, gram:0.001, milligram:0.000001, pound:0.45359237, ounce:0.028349523125 };
  const res = val * base[from] / base[to];
  document.getElementById('weightResult').innerText = `${fmt2(res)} ${to}`;
}

/* TEMPERATURE */
function convertTemperature(){
  const val = safeNum(document.getElementById('tempValue').value);
  const from = document.getElementById('tempFrom').value;
  const to = document.getElementById('tempTo').value;
  let c;
  if(from === 'celsius') c = val;
  else if(from === 'fahrenheit') c = (val - 32) * 5/9;
  else c = val - 273.15;
  let out;
  if(to === 'celsius') out = c;
  else if(to === 'fahrenheit') out = c * 9/5 + 32;
  else out = c + 273.15;
  document.getElementById('tempResult').innerText = `${fmt2(out)} ${to}`;
}

/* VOLUME (base liter) */
function convertVolume(){
  const val = safeNum(document.getElementById('volumeValue').value);
  const from = document.getElementById('volumeFrom').value;
  const to = document.getElementById('volumeTo').value;
  const L = {
    liter:1, milliliter:0.001, gallon:3.785411784, quart:0.946352946,
    pint:0.473176473, cup:0.2365882365, tablespoon:0.01478676478125, teaspoon:0.00492892159375
  };
  const res = val * L[from] / L[to];
  document.getElementById('volumeResult').innerText = `${fmt2(res)} ${to}`;
}

/* SPEED (base km/h) */
function convertSpeed(){
  const val = safeNum(document.getElementById('speedValue').value);
  const from = document.getElementById('speedFrom').value;
  const to = document.getElementById('speedTo').value;
  const KMH = { kmh:1, mph:1.609344, ms:3.6, knot:1.852 };
  const res = val * KMH[from] / KMH[to];
  document.getElementById('speedResult').innerText = `${fmt2(res)} ${to}`;
}

/* AREA (base m^2) */
function convertArea(){
  const val = safeNum(document.getElementById('areaValue').value);
  const from = document.getElementById('areaFrom').value;
  const to = document.getElementById('areaTo').value;
  const M2 = {
    sqmeter:1, sqkilometer:1e6, sqmile:2_589_988.110336,
    sqyard:0.83612736, sqfoot:0.09290304, hectare:10000, acre:4046.8564224
  };
  const res = val * M2[from] / M2[to];
  document.getElementById('areaResult').innerText = `${fmt2(res)} ${to}`;
}

/* TIME (base second) */
function convertTime(){
  const val = safeNum(document.getElementById('timeValue').value);
  const from = document.getElementById('timeFrom').value;
  const to = document.getElementById('timeTo').value;
  const S = { second:1, minute:60, hour:3600, day:86400 };
  const res = val * S[from] / S[to];
  document.getElementById('timeResult').innerText = `${fmt2(res)} ${to}`;
}

/* PRESSURE */
function convertPressure(){
  const val = safeNum(document.getElementById('pressureValue').value);
  const from = document.getElementById('pressureFrom').value;
  const to = document.getElementById('pressureTo').value;
  // base Pascal
  const P = {
    pascal:1, bar:100000, psi:6894.757293168, atm:101325
  };
  const res = val * P[from] / P[to];
  document.getElementById('pressureResult').innerText = `${fmt2(res)} ${to}`;
}

/* ENERGY */
function convertEnergy(){
  const val = safeNum(document.getElementById('energyValue').value);
  const from = document.getElementById('energyFrom').value;
  const to = document.getElementById('energyTo').value;
  // base Joule
  const E = {
    joule:1, calorie:4.184, kcal:4184, kwh:3.6e6
  };
  const res = val * E[from] / E[to];
  document.getElementById('energyResult').innerText = `${fmt2(res)} ${to}`;
}

/* DATA SIZE (decimal) */
function convertData(){
  const val = safeNum(document.getElementById('dataValue').value);
  const from = document.getElementById('dataFrom').value;
  const to = document.getElementById('dataTo').value;
  const D = { B:1, KB:1e3, MB:1e6, GB:1e9, TB:1e12 };
  const res = val * D[from] / D[to];
  document.getElementById('dataResult').innerText = `${fmt2(res)} ${to}`;
}

/* CURRENCY - live via open.er-api.com fallback to static */
async function convertCurrency(){
  const val = safeNum(document.getElementById('currencyValue').value);
  const from = document.getElementById('currencyFrom').value;
  const to = document.getElementById('currencyTo').value;
  const note = document.getElementById('currencyNote');
  try{
    const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`);
    const data = await res.json();
    if(data && data.result === 'success' && data.rates && data.rates[to]){
      const rate = data.rates[to];
      const out = val * rate;
      document.getElementById('currencyResult').innerText = `${fmt2(out)} ${to}`;
      note.innerText = `Live: 1 ${from} = ${rate.toFixed(4)} ${to}`;
      return;
    }
    throw new Error('Bad response');
  }catch(e){
    // fallback static
    const fallback = { USD:1, QAR:3.64, PKR:278, EUR:0.92, GBP:0.78, INR:83, AUD:1.49, CAD:1.36, SAR:3.75, AED:3.67 };
    const fFrom = fallback[from], fTo = fallback[to];
    if(fFrom && fTo){
      const out = val * (fTo / fFrom);
      document.getElementById('currencyResult').innerText = `${fmt2(out)} ${to}`;
      note.innerText = 'Fallback static rates (offline).';
    } else {
      document.getElementById('currencyResult').innerText = 'Conversion unavailable';
      note.innerText = 'Unknown currency code';
    }
  }
}

/* ========== FILES: PDF → DOCX & DOCX → PDF (client-side) ========== */
if(window['pdfjsLib']){
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
}
const pdfBtn = document.getElementById('pdfConvertBtn');
const pdfStatus = document.getElementById('pdfStatus');
const pdfDownloadWrap = document.getElementById('pdfDownloadWrap');

pdfBtn.addEventListener('click', async ()=>{
  const file = (document.getElementById('pdfFile').files || [])[0];
  if(!file){ pdfStatus.innerText = 'Please choose a PDF file first.'; return; }
  pdfStatus.innerText = 'Reading PDF...';
  pdfDownloadWrap.innerHTML = '';
  try{
    const ab = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
    const pages = [];
    for(let p=1; p<=pdf.numPages; p++){
      pdfStatus.innerText = `Extracting page ${p} / ${pdf.numPages}...`;
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const lines = {};
      for(const item of content.items){
        const y = Math.round(item.transform[5]);
        lines[y] = (lines[y] || '') + item.str + ' ';
      }
      const sorted = Object.keys(lines).sort((a,b)=>b-a).map(k => lines[k].trim());
      pages.push({ page:p, text: sorted.join('\n') });
    }

    pdfStatus.innerText = 'Building .docx...';
    const { Document, Packer, Paragraph, HeadingLevel, PageBreak } = window.docx;
    const children = [];
    children.push(new Paragraph({ text: `Extracted from: ${file.name}`, heading: HeadingLevel.HEADING_2 }));
    pages.forEach((pg, idx) => {
      if(idx>0) children.push(new Paragraph({ children:[ new PageBreak() ] }));
      children.push(new Paragraph({ text: `--- Page ${pg.page} ---` }));
      pg.text.split('\n').forEach(line => children.push(new Paragraph({ text: line })));
    });
    const doc = new Document({ sections: [{ children }]});
    const blob = await Packer.toBlob(doc);
    const outName = file.name.replace(/\.pdf$/i,'') + '_converted.docx';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download = outName; a.innerText = `Download ${outName}`; a.className='download-link';
    pdfDownloadWrap.appendChild(a);
    pdfStatus.innerText = 'Done — download created.';
  }catch(err){
    console.error(err);
    pdfStatus.innerText = 'Conversion failed. Use text-based (not scanned) PDFs.';
  }
});

/* DOCX -> PDF */
const docBtn = document.getElementById('docConvertBtn');
const docStatus = document.getElementById('docStatus');

docBtn.addEventListener('click', async ()=>{
  const file = (document.getElementById('docFile').files || [])[0];
  if(!file){ docStatus.innerText = 'Please choose a .docx file.'; return; }
  docStatus.innerText = 'Reading .docx...';
  try{
    const ab = await file.arrayBuffer();
    const result = await window.mammoth.convertToHtml({ arrayBuffer: ab });
    const html = result.value;
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.innerHTML = html;
    docStatus.innerText = 'Rendering PDF...';
    const opt = { margin:10, filename: file.name.replace(/\.docx$/i,'.pdf'), html2canvas:{ scale:2 }, jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' } };
    await html2pdf().set(opt).from(container).save();
    docStatus.innerText = 'Done — PDF downloaded.';
  }catch(err){
    console.error(err);
    docStatus.innerText = 'Conversion failed. Only simple .docx content supported.';
  }
});

/* ========== CALORIES (ADVANCED) ========== */
document.getElementById('macroPreset').addEventListener('change',(e)=>{
  const v = e.target.value;
  const customDiv = document.getElementById('customMacros');
  if(v === 'custom'){ customDiv.style.display = 'block'; }
  else customDiv.style.display = 'none';
});
document.getElementById('calcCaloriesBtn').addEventListener('click', calculateCalories);

function calculateCalories(){
  const age = safeNum(document.getElementById('calAge').value);
  const sex = document.getElementById('calSex').value;
  const weight = safeNum(document.getElementById('calWeight').value); // kg
  const height = safeNum(document.getElementById('calHeight').value); // cm
  const activity = parseFloat(document.getElementById('calActivity').value);
  const goal = document.getElementById('calGoal').value;

  if(!age || !weight || !height){ alert('Please provide age, weight and height.'); return; }

  // BMR - Mifflin-St Jeor
  let bmr = 10*weight + 6.25*height - 5*age + (sex==='male' ? 5 : -161);
  // TDEE = BMR * activity
  const tdee = bmr * activity;

  // Goal adjustment
  let goalCalories = tdee;
  if(goal === 'lose') goalCalories = tdee * 0.8; // -20%
  else if(goal === 'gain') goalCalories = tdee * 1.15; // +15%

  // macros
  let protPct, carbPct, fatPct;
  const preset = document.getElementById('macroPreset').value;
  if(preset === 'balanced'){ protPct=30; carbPct=40; fatPct=30; }
  else if(preset === 'lowcarb'){ protPct=30; carbPct=20; fatPct=50; }
  else if(preset === 'highcarb'){ protPct=20; carbPct=60; fatPct=20; }
  else {
    protPct = safeNum(document.getElementById('protPct').value) || 30;
    carbPct = safeNum(document.getElementById('carbPct').value) || 40;
    fatPct = safeNum(document.getElementById('fatPct').value) || 30;
  }

  // If protein method per kg selected, override protein grams
  const protMethod = document.getElementById('proteinMethod').value;
  let protGrams;
  if(protMethod === 'perkg'){
    protGrams = 1.6 * weight; // 1.6 g per kg
    // compute rest of macros using percentages for carbs/fat with remaining calories
    const protCalories = protGrams * 4;
    const remainingCalories = goalCalories - protCalories;
    // allocate carbs/fat by ratio of carbPct:fatPct
    const totalPct = carbPct + fatPct;
    const carbsCalories = remainingCalories * (carbPct / totalPct);
    const fatsCalories  = remainingCalories * (fatPct / totalPct);
    const carbGrams = carbsCalories / 4;
    const fatGrams  = fatsCalories / 9;
    showCalResults(bmr, tdee, goalCalories, protGrams, carbGrams, fatGrams, protPct, carbPct, fatPct);
    return;
  } else {
    // use percent-based macros
    const protCalories = goalCalories * (protPct/100);
    const carbCalories = goalCalories * (carbPct/100);
    const fatCalories  = goalCalories * (fatPct/100);
    protGrams = protCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams  = fatCalories / 9;
    showCalResults(bmr, tdee, goalCalories, protGrams, carbGrams, fatGrams, protPct, carbPct, fatPct);
    return;
  }
}

function showCalResults(bmr, tdee, goalCalories, protGrams, carbGrams, fatGrams, protPct, carbPct, fatPct){
  const maintain = tdee;
  const lose20 = tdee * 0.8;
  const gain15 = tdee * 1.15;
  const el = document.getElementById('calResult');
  el.innerHTML = `
    <strong>BMR:</strong> ${fmt2(bmr)} kcal/day<br/>
    <strong>TDEE (maintenance):</strong> ${fmt2(maintain)} kcal/day<br/>
    <strong>Goal calories:</strong> ${fmt2(goalCalories)} kcal/day<br/>
    <hr/>
    <strong>Macros (percent):</strong> P ${protPct}% | C ${carbPct}% | F ${fatPct}%<br/>
    <strong>Macros (grams):</strong> Protein ${fmt2(protGrams)} g · Carbs ${fmt2(carbGrams)} g · Fat ${fmt2(fatGrams)} g<br/>
    <em>Protein per kg:</em> ${(fmt2(protGrams / (safeNum(document.getElementById('calWeight').value)||1)))} g/kg<br/>
    <hr/>
    <strong>Examples:</strong><br/>
    Maintain: ${fmt2(maintain)} kcal · Lose (-20%): ${fmt2(lose20)} kcal · Gain (+15%): ${fmt2(gain15)} kcal
  `;
}

/* ========== Hook up convert buttons to allow keyboard Enter to trigger as well ========== */
/* We'll add simple key listeners: press Enter in an input triggers its convert button when focused */
document.querySelectorAll('.controls input').forEach(inp=>{
  inp.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      // find nearest card and click its button
      const card = inp.closest('.card');
      if(!card) return;
      const btn = card.querySelector('button');
      if(btn) btn.click();
    }
  });
});

/* End of script.js */
