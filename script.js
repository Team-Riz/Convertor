// ========== DARK / LIGHT MODE ========== //
const modeBtn = document.getElementById('modeToggle');
modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  modeBtn.innerHTML = document.body.classList.contains('dark-mode')
    ? '<i class="fas fa-sun"></i> Light Mode'
    : '<i class="fas fa-moon"></i> Dark Mode';
});

// ========== TABS ========== //
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPages = document.querySelectorAll('.tab-page');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPages.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});

// ========== SEARCH & HIGHLIGHT ========== //
const searchInput = document.getElementById('searchInput');
document.getElementById('searchBtn').addEventListener('click', searchConverter);
function searchConverter(){
  const term = (searchInput.value || '').trim().toLowerCase();
  // Clear all highlights
  document.querySelectorAll('.converter').forEach(c => c.classList.remove('highlight'));
  if(!term){ return; }

  // Find match in the currently visible tab
  const activePage = document.querySelector('.tab-page.active');
  const matches = Array.from(activePage.querySelectorAll('.converter'))
    .filter(c => (c.dataset.name || '').toLowerCase().includes(term));

  if(matches.length){
    const top = matches[0];
    top.classList.add('highlight');
    top.scrollIntoView({behavior:'smooth', block:'center'});
  }
}

// ========== FLY ICON ========== //
function flyIcon(id){
  const ic = document.getElementById(id);
  ic.style.opacity = 1;
  setTimeout(() => ic.style.opacity = 0, 800);
}

// ========== UNIT CONVERTERS (2 decimals) ========== //
// LENGTH
function convertLength(){
  const val = parseFloat(document.getElementById('lengthValue').value || '0');
  const from = document.getElementById('lengthFrom').value;
  const to   = document.getElementById('lengthTo').value;
  const rate = { meter:1, kilometer:1000, centimeter:0.01, mile:1609.34, foot:0.3048, inch:0.0254 };
  const res = val * rate[from] / rate[to];
  document.getElementById('lengthResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('lengthFly');
}

// WEIGHT
function convertWeight(){
  const val = parseFloat(document.getElementById('weightValue').value || '0');
  const from = document.getElementById('weightFrom').value;
  const to   = document.getElementById('weightTo').value;
  const rate = { kilogram:1, gram:0.001, pound:0.453592, ounce:0.0283495 };
  const res = val * rate[from] / rate[to];
  document.getElementById('weightResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('weightFly');
}

// TEMPERATURE
function convertTemperature(){
  const val = parseFloat(document.getElementById('tempValue').value || '0');
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

  document.getElementById('tempResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('tempFly');
}

// VOLUME
function convertVolume(){
  const val = parseFloat(document.getElementById('volumeValue').value || '0');
  const from = document.getElementById('volumeFrom').value;
  const to   = document.getElementById('volumeTo').value;
  const rate = { liter:1, milliliter:0.001, gallon:3.78541, cup:0.24 };
  const res = val * rate[from] / rate[to];
  document.getElementById('volumeResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('volumeFly');
}

// SPEED
function convertSpeed(){
  const val = parseFloat(document.getElementById('speedValue').value || '0');
  const from = document.getElementById('speedFrom').value;
  const to   = document.getElementById('speedTo').value;
  const rate = { kmh:1, mph:1.60934, ms:3.6 };
  const res = val * rate[from] / rate[to];
  document.getElementById('speedResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('speedFly');
}

// AREA
function convertArea(){
  const val = parseFloat(document.getElementById('areaValue').value || '0');
  const from = document.getElementById('areaFrom').value;
  const to   = document.getElementById('areaTo').value;
  const rate = { sqmeter:1, sqkilometer:1e6, sqmile:2.59e6, sqyard:0.836127 };
  const res = val * rate[from] / rate[to];
  document.getElementById('areaResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('areaFly');
}

// TIME
function convertTime(){
  const val = parseFloat(document.getElementById('timeValue').value || '0');
  const from = document.getElementById('timeFrom').value;
  const to   = document.getElementById('timeTo').value;
  const rate = { second:1, minute:60, hour:3600 };
  const res = val * rate[from] / rate[to];
  document.getElementById('timeResult').innerText = isFinite(res) ? `${res.toFixed(2)} ${to}` : '—';
  flyIcon('timeFly');
}

// ========== CURRENCY (LIVE with fallback) ========== //
// Uses open.er-api.com (no key). Falls back to static if blocked/offline.
async function convertCurrency(){
  const val = parseFloat(document.getElementById('currencyValue').value || '0');
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
    // Fallback static rates (base USD)
    const fallback = { USD:1, QAR:3.64, PKR:278, EUR:0.92, GBP:0.78, INR:83, AUD:1.49, CAD:1.36 };
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

// ========== PDF → WORD (.docx) ========== //
// Uses pdf.js to extract text, then docx to generate a .docx file
const pdfBtn = document.getElementById('pdfConvertBtn');
const pdfStatus = document.getElementById('pdfStatus');
const pdfFly = document.getElementById('pdfFly');
const pdfDownloadWrap = document.getElementById('pdfDownloadWrap');

// Configure pdf.js worker (required)
if (window['pdfjsLib']) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
}

pdfBtn.addEventListener('click', async () => {
  const fileInput = document.getElementById('pdfFile');
  const file = fileInput.files && fileInput.files[0];
  if(!file){
    pdfStatus.textContent = 'Please choose a PDF file first.';
    return;
  }

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
      const strings = content.items.map(i => i.str);
      // Very basic line join; for better formatting you'd group y-coordinates
      const text = strings.join(' ');
      paragraphs.push({ text, page: pageNum });
    }

    pdfStatus.textContent = 'Building Word document…';

    const { Document, Packer, Paragraph, HeadingLevel, PageBreak } = window.docx;

    const docChildren = [];
    paragraphs.forEach((p, idx) => {
      if (idx === 0) {
        docChildren.push(new Paragraph({
          text: `Extracted from PDF (${file.name})`,
          heading: HeadingLevel.HEADING_2
        }));
      } else {
        // Page break between pages
        docChildren.push(new Paragraph({ children:[new PageBreak()] }));
      }
      docChildren.push(new Paragraph({ text: `--- Page ${p.page} ---` }));
      docChildren.push(new Paragraph({ text: p.text || '' }));
    });

    const doc = new Document({ sections: [{ children: docChildren }] });
    const blob = await Packer.toBlob(doc);

    const outName = file.name.replace(/\.pdf$/i, '') + '_converted.docx';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = outName;
    a.className = 'download-link';
    a.innerHTML = `<i class="fas fa-download"></i> Download ${outName}`;
    pdfDownloadWrap.innerHTML = '';
    pdfDownloadWrap.appendChild(a);

    pdfStatus.textContent = 'Done! Your .docx is ready.';
    pdfFly.style.opacity = 1; setTimeout(()=> pdfFly.style.opacity = 0, 800);
  }catch(err){
    console.error(err);
    pdfStatus.textContent = 'Conversion failed. Make sure it is a readable PDF.';
  }
});
