// SEARCH
function searchConverter() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let converters = document.querySelectorAll('.converter');
    converters.forEach(conv=>{
        let name=conv.getAttribute('data-name');
        if(name.includes(input)&&input!==''){
            conv.classList.add('highlight');
            conv.scrollIntoView({behavior:'smooth',block:'center'});
        } else {conv.classList.remove('highlight');}
    });
}

// FLY ICON
function animateIcon(iconId,inputId,resultId){
    const flyIcon=document.getElementById(iconId);
    const inputEl=document.getElementById(inputId);
    const resultEl=document.getElementById(resultId);
    const inputRect=inputEl.getBoundingClientRect();
    const resultRect=resultEl.getBoundingClientRect();
    flyIcon.innerHTML='<i class="fas fa-arrow-right"></i>';
    flyIcon.style.left=inputRect.left+"px";
    flyIcon.style.top=inputRect.top+"px";
    flyIcon.style.opacity=1;
    flyIcon.style.transform=`translate(${resultRect.left-inputRect.left}px,${resultRect.top-inputRect.top}px)`;
    setTimeout(()=>{flyIcon.style.opacity=0;flyIcon.style.transform='translate(0,0)';},800);
}

// ICON
function getIcon(type){
    switch(type){
        case 'length': return '<i class="fas fa-ruler"></i>';
        case 'weight': return '<i class="fas fa-weight-scale"></i>';
        case 'temperature': return '<i class="fas fa-thermometer-half"></i>';
        case 'volume': return '<i class="fas fa-cube"></i>';
        case 'speed': return '<i class="fas fa-tachometer-alt"></i>';
        case 'area': return '<i class="fas fa-vector-square"></i>';
        case 'time': return '<i class="fas fa-clock"></i>';
        case 'currency': return '<i class="fas fa-dollar-sign"></i>';
        default: return '<i class="fas fa-equals"></i>';
    }
}

// CONVERTERS (length, weight, temp, volume, speed, area, time) same as before

// ---------------------
// LIVE CURRENCY
let rates={}; // store latest rates
async function fetchRates(){
    try{
        const res = await fetch('https://api.exchangerate.host/latest?base=USD');
        const data = await res.json();
        rates=data.rates;
        console.log("Currency rates loaded");
    }catch(e){console.log("Failed to fetch rates",e);}
}
fetchRates();

function convertCurrency(){
    const val=parseFloat(document.getElementById('currencyValue').value);
    const from=document.getElementById('currencyFrom').value.toUpperCase();
    const to=document.getElementById('currencyTo').value.toUpperCase();
    if(isNaN(val))return alert("Enter a number!");
    if(!rates[from]||!rates[to])return alert("Currency not loaded yet!");
    const result=val*rates[to]/rates[from];
    document.getElementById('currencyResult').innerHTML=`${getIcon('currency')} ${result.toFixed(2)} ${to}`;
    animateIcon('currencyFly','currencyValue','currencyResult');
}
