// ===== Theme (remember choice) =====
const modeBtn = document.getElementById('modeToggle');
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') document.body.classList.add('dark-mode');
  modeBtn.innerHTML = document.body.classList.contains('dark-mode')
    ? '<i class="fas fa-sun"></i> Light Mode'
    : '<i class="fas fa-moon"></i> Dark Mode';
})();
modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const dark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  modeBtn.innerHTML = dark
    ? '<i class="fas fa-sun"></i> Light Mode'
    : '<i class="fas fa-moon"></i> Dark Mode';
});

// ===== Tabs =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPages = document.querySelectorAll('.tab-page');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPages.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
    // Update URL hash
    location.hash = btn.dataset.target.replace('tab-','');
  });
});
// open from hash (if present)
(function openHash(){
  const hash = location.hash.replace('#','');
  if(!hash) return;
  const btn = Array.from(tabButtons).find(b => b.dataset.target === `tab-${hash}`);
  if(btn) btn.click();
})();

// ===== Search & highlight (active tab only) =====
const searchInput = document.getElementById('searchInput');
document.getElementById('searchBtn').addEventListener('click', searchConverter);
function searchConverter(){
  const term = (searchInput.value || '').trim().toLowerCase();
  document.querySelectorAll('.converter').forEach(c => c.classList.remove('highlight'));
  if(!term){ return; }
  const activePage = document.querySelector('.tab-page.active');
  const matches = Array.from(activePage.querySelectorAll('.converter'))
    .filter(c => (c.dataset.name || '').toLowerCase().includes(term));
  if(matches.length){
    const top = matches[0];
    top.classList.add('highlight');
    top.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

// ===== Utility: fly icon =====
function flyIcon(id){
  const ic = document.getElementById(id);
  ic.style.opacity = 1;
  setTimeout(() => ic.style.opacity = 0, 800);
}

// ===== Helpers =====
function safeNum(value){ return Number.isFinite(value) ? value : NaN; }
function outText(el, num, unit){
  el.innerText = Number.isFinite(num) ? `${num.toFixed(2)} ${unit}` : '—';
}

// ===== Unit Converters (2 decimals) =====
// Length (base: meter)
function convertLength(){
  const val = safeNum(parseFloat(document.getElementById('lengthValue').value));
  const from = document.getElementById('lengthFrom').value;
  const to   = document.getElementById('lengthTo').value;
  const m = { meter:1, kilometer:1000, centimeter:0.01, millimeter:0.001, mile:1609.344, yard:0.9144, foot:0.3048, inch:0.0254 };
  const res = val * m[from] / m[to];
  outText(document.getElementById('lengthResult'), res, to);
  flyIcon('lengthFly');
}

// Weight (base: kilogram)
function convertWeight(){
  const val = safeNum(parseFloat(document.getElementById('weightValue').value));
  const from = document.getElementById('weightFrom').value;
  const to   = document.getElementById('weightTo').value;
  const kg = { kilogram:1, gram:0.001, milligram:0.000001, pound:0.45359237, ounce:0.028349523125 };
  const res = val * kg[from] / kg[to];
  outText(document.getElementById('weightResult'), res, to);
  flyIcon('weightFly');
}

// Temperature (convert via Celsius pivot)
function convertTemperature(){
  const val = safeNum(parseFloat(document.getElementById('tempValue').value));
  const from = document.getElementById('tempFrom').value;
  const to   = document.getElementById('tempTo').value;

  let c;
  if(from==='celsius') c = val;
  else if(from==='fahrenheit') c = (val - 32) * 5/9;
  else c = val - 273.15;

  let res;
  if(to==='celsius') res = c;
  else if(to==='fahrenheit') res = c * 9/5 + 32;
  else res = c + 273.15;

  outText(document.getElementById('tempResult'), res, to);
  flyIcon('tempFly');
}

// Volume (base: liter; US measures)
function convertVolume(){
  const val = safeNum(parseFloat(document.getElementById('volumeValue').value));
  const from = document.getElementById('volumeFrom').value;
  const to   = document.getElementById('volumeTo').value;
  const L = {
    liter:1,
    milliliter:0.001,
    gallon:3.785411784,  // US gallon
    quart:0.946352946,   // US
    pint:0.473176473,    // US
    cup:0.2365882365,    // US
    tablespoon:0.01478676478125, // US
    teaspoon:0.00492892159375    // US
  };
  const res = val * L[from] / L[to];
  outText(document.getElementById('volumeResult'), res, to);
  flyIcon('volumeFly');
}

// Speed (base: km/h)
function convertSpeed(){
  const val = safeNum(parseFloat(document.getElementById('speedValue').value));
  const from = document.getElementById('speedFrom').value;
  const to   = document.getElementById('speedTo').value;
  const KMH = { kmh:1, mph:1.609344, ms:3.6, knot:1.852 };
  const res = val * KMH[from] / KMH[to];
  outText(document.getElementById('speedResult'), res, to);
  flyIcon('speedFly');
}

// Area (base: square meter)
function convertArea(){
  const val = safeNum(parseFloat(document.getElementById('areaValue').value));
  const from = document.getElementById('areaFrom').value;
  const to   = document.getElementById('areaTo').value;
  const m2 = {
    sqmeter:1,
    sqkilometer:1e6,
    sqmile:2_589_988.110336,
    sqyard:0.83612736,
    sqfoot:0.09290304,
    hectare:10_000,
    acre:4046.8564224
  };
  const res = val * m2[from] / m2[to];
  outText(document.getElementById('areaResult'), res, to);
  flyIcon('areaFly');
}

// Time (base: second)
function convertTime(){
  const val = safeNum(parseFloat(document.getElementById('timeValue').value));
  const from = document.getElementById('timeFrom').value;
  const to   = document.getElementById('timeTo').value;
  const s = { second:1, minute:60, hour:3600, day:86400 };
  const res = val * s[from] / s[to];
  outText(document.getElementById('timeResult'), res, to);
  flyIcon('timeFly');
}

// ===== Currency (live with fallback) =====
async function convertCurrency(){
  const val = safeNum(parseFloat(document.getElementById('currencyValue').value));
  const from = document.getElementById('currencyFrom').value;
  const to   = document.getElementById('currencyTo').value;
  const note = document.getElementById('currencyNote');

  try{
    const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`);
    const data = await res.json();
    if(data && data.result === 'success' && data.rates && data.rates[to]){
      const rate = data.rates[to];
      const out = val * rate;
      document.getElementById('currencyResult').innerText = `${out.toFixed(2)} ${to}`;
      note.textContent = `Live rate: 1 ${from} = ${rate.toFixed(4)} ${to}`;
      flyIcon('currencyFly');
      return;
    }
    throw new Error('Bad response');
  }catch(e){
    // Fallback static rates (rough; adjust as you like)
    const fallback = { USD:1, QAR:3.64, PKR:278, EUR:0.92, GBP:0.78, INR:83, AUD:1.49, CAD:1.36, SAR:3.75, AED:3.67 };
    const usdFrom = fallback[from];
    const usdTo = fallback[to];
    if(usdFrom && usdTo){
      const out = val * (usdTo / usdFrom);
      document.getElementById('currencyResult').innerText = `${out.toFixed(2)} ${to}`;
      note.textContent = 'Fallback static rates (offline).';
      flyIcon('currencyFly');
    }else{
      document.getElementById('currencyResult').innerText = 'Conversion unavailable.';
      note.textContent = 'Unknown currency code.';
    }
  }
}

// ===== Files: PDF → Word (No API; text extraction) =====
if (window['pdfjsLib']) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
}
const pdfBtn = document.getElementById('pdfConvertBtn');
const pdfStatus = document.getElementById('pdfStatus');
const pdfDownloadWrap = document.getElementById('pdfDownloadWrap');

pdfBtn.addEventListener('click', async () => {
  const file = (document.getElementById('pdfFile').files || [])[0];
  if(!file){ pdfStatus.textContent = 'Please choose a PDF file first.'; return; }

  pdfStatus.textContent = 'Reading PDF…';
  pdfDownloadWrap.innerHTML = '';

  try{
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;

    const paragraphs = [];
    for(let pageNum=1; pageNum<=pdf.numPages; pageNum++){
      pdfStatus.textContent = `Extracting text from page ${pageNum} of ${pdf.numPages}…`;
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      // Group by Y position to form lines
      const lines = {};
      for(const item of content.items){
        const y = Math.round(item.transform[5]); // y position
        lines[y] = (lines[y] || '') + item.str + ' ';
      }
      const sorted = Object.keys(lines).sort((a,b)=>b-a).map(k => lines[k].trim());
      paragraphs.push({ text: sorted.join('\n') || '', page: pageNum });
    }

    pdfStatus.textContent = 'Building Word document…';
    const { Document, Packer, Paragraph, HeadingLevel, PageBreak } = window.docx;

    const docChildren = [];
    docChildren.push(new Paragraph({ text: `Extracted from PDF (${file.name})`, heading: HeadingLevel.HEADING_2 }));
    paragraphs.forEach((p, idx) => {
      if(idx>0) docChildren.push(new Paragraph({ children:[new PageBreak()] }));
      docChildren.push(new Paragraph({ text: `--- Page ${p.page} ---` }));
      p.text.split('\n').forEach(line => docChildren.push(new Paragraph({ text: line })));
    });

    const doc = new Document({ sections: [{ children: docChildren }] });
    const blob = await Packer.toBlob(doc);

    const outName = file.name.replace(/\.pdf$/i, '') + '_converted.docx';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = outName;
    a.className = 'download-link';
    a.innerHTML = `<i class="fas fa-download"></i> Download ${outName}`;
    pdfDownloadWrap.appendChild(a);

    pdfStatus.textContent = 'Done! Your .docx is ready.';
    document.getElementById('pdfFly').style.opacity = 1; setTimeout(()=> document.getElementById('pdfFly').style.opacity = 0, 800);
  }catch(err){
    console.error(err);
    pdfStatus.textContent = 'Conversion failed. Use text-based (not scanned) PDFs.';
  }
});

// ===== Files: Word (.docx) → PDF (No API; basic) =====
const docBtn = document.getElementById('docConvertBtn');
const docStatus = document.getElementById('docStatus');
const docDownloadWrap = document.getElementById('docDownloadWrap');

docBtn.addEventListener('click', async () => {
  const file = (document.getElementById('docFile').files || [])[0];
  if(!file){ docStatus.textContent = 'Please choose a .docx file.'; return; }

  docStatus.textContent = 'Reading .docx…';
  docDownloadWrap.innerHTML = '';

  try{
    const arrayBuffer = await file.arrayBuffer();
    // Convert .docx -> HTML
    const result = await window.mammoth.convertToHtml({arrayBuffer});
    const html = result.value; // HTML string

    // Make printable container
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.innerHTML = html;

    docStatus.textContent = 'Rendering PDF…';
    const opt = {
      margin:       10,
      filename:     file.name.replace(/\.docx$/i,'') + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    await html2pdf().set(opt).from(container).save();

    docStatus.textContent = 'Done! Your PDF downloaded.';
    document.getElementById('docFly').style.opacity = 1; setTimeout(()=> document.getElementById('docFly').style.opacity = 0, 800);
  }catch(err){
    console.error(err);
    docStatus.textContent = 'Conversion failed. Only .docx is supported, complex layouts may differ.';
  }
});
