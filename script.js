// ================== TAB CONTROL ==================
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c=>c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');

    // Trigger About cards animation if About tab
    if(tab.dataset.tab==="tabAbout"){
      document.querySelectorAll('.about-card').forEach((c,i)=>{
        setTimeout(()=>{ c.classList.add('show'); }, i*200);
      });
    }
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

// ================== UNIT DATA ==================
const unitsData = {
  length:{meter:1,kilometer:1000,centimeter:0.01,mile:1609.34,yard:0.9144,inch:0.0254,foot:0.3048},
  weight:{kg:1,g:0.001,lb:0.453592,oz:0.0283495,ton:1000},
  temperature:{celsius:"c",fahrenheit:"f",kelvin:"k"},
  volume:{liter:1,milliliter:0.001,gallon:3.78541,quart:0.946353,pint:0.473176,cup:0.24}
};

// ================== GENERATE CONVERTER CARDS ==================
const converterContainer = document.getElementById('converter-container');
for(let type in unitsData){
  const card = document.createElement('div');
  card.classList.add('converter-card');
  card.innerHTML=`
    <h3>${type.charAt(0).toUpperCase()+type.slice(1)} Converter</h3>
    <input type="number" placeholder="Enter value" class="inputVal">
    <select class="fromUnit"></select>
    <select class="toUnit"></select>
    <button>Convert</button>
    <div class="result"></div>
  `;
  converterContainer.appendChild(card);

  const input = card.querySelector('.inputVal');
  const from = card.querySelector('.fromUnit');
  const to = card.querySelector('.toUnit');
  const resultDiv = card.querySelector('.result');
  for(let u in unitsData[type]){
    const opt1 = document.createElement('option'); opt1.value=u; opt1.textContent=u; from.appendChild(opt1);
    const opt2 = document.createElement('option'); opt2.value=u; opt2.textContent=u; to.appendChild(opt2);
  }

  card.querySelector('button').addEventListener('click',()=>{
    let val=parseFloat(input.value);
    if(type==="temperature"){
      let res;
      if(from.value==="celsius"){
        res = to.value==="fahrenheit"?val*9/5+32:to.value==="kelvin"?val+273.15:val;
      } else if(from.value==="fahrenheit"){
        res = to.value==="celsius"? (val-32)*5/9 : to.value==="kelvin"? (val-32)*5/9+273.15:val;
      } else{
        res = to.value==="celsius"? val-273.15: to.value==="fahrenheit"? (val-273.15)*9/5+32:val;
      }
      resultDiv.textContent=res.toFixed(2);
    } else {
      let res = val * unitsData[type][from.value] / unitsData[type][to.value];
      resultDiv.textContent=res.toFixed(4);
    }
    resultDiv.classList.add('show');
    setTimeout(()=>resultDiv.classList.remove('show'),1000);
  });
}
