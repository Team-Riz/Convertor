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

// LENGTH
function convertLength(){
    const val=parseFloat(document.getElementById('lengthValue').value);
    const from=document.getElementById('lengthFrom').value;
    const to=document.getElementById('lengthTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={meter:1,kilometer:1000,centimeter:0.01,mile:1609.34,foot:0.3048,inch:0.0254};
    const result = val*map[from]/map[to];
    document.getElementById('lengthResult').innerHTML=`${getIcon('length')} ${result.toFixed(2)} ${to}`;
    animateIcon('lengthFly','lengthValue','lengthResult');
}

// WEIGHT
function convertWeight(){
    const val=parseFloat(document.getElementById('weightValue').value);
    const from=document.getElementById('weightFrom').value;
    const to=document.getElementById('weightTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={kilogram:1,gram:0.001,pound:0.453592,ounce:0.0283495};
    const result=val*map[from]/map[to];
    document.getElementById('weightResult').innerHTML=`${getIcon('weight')} ${result.toFixed(2)} ${to}`;
    animateIcon('weightFly','weightValue','weightResult');
}

// TEMPERATURE
function convertTemperature(){
    const val=parseFloat(document.getElementById('tempValue').value);
    const from=document.getElementById('tempFrom').value;
    const to=document.getElementById('tempTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    let c;
    if(from==='celsius') c=val;
    else if(from==='fahrenheit') c=(val-32)*5/9;
    else c=val-273.15;
    let result;
    if(to==='celsius') result=c;
    else if(to==='fahrenheit') result=c*9/5+32;
    else result=c+273.15;
    document.getElementById('tempResult').innerHTML=`${getIcon('temperature')} ${result.toFixed(2)} ${to}`;
    animateIcon('tempFly','tempValue','tempResult');
}

// VOLUME
function convertVolume(){
    const val=parseFloat(document.getElementById('volumeValue').value);
    const from=document.getElementById('volumeFrom').value;
    const to=document.getElementById('volumeTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={liter:1,milliliter:0.001,gallon:3.78541,cup:0.24};
    const result=val*map[from]/map[to];
    document.getElementById('volumeResult').innerHTML=`${getIcon('volume')} ${result.toFixed(2)} ${to}`;
    animateIcon('volumeFly','volumeValue','volumeResult');
}

// SPEED
function convertSpeed(){
    const val=parseFloat(document.getElementById('speedValue').value);
    const from=document.getElementById('speedFrom').value;
    const to=document.getElementById('speedTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={kmh:1,mph:1.60934,ms:3.6};
    const result=val*map[from]/map[to];
    document.getElementById('speedResult').innerHTML=`${getIcon('speed')} ${result.toFixed(2)} ${to}`;
    animateIcon('speedFly','speedValue','speedResult');
}

// AREA
function convertArea(){
    const val=parseFloat(document.getElementById('areaValue').value);
    const from=document.getElementById('areaFrom').value;
    const to=document.getElementById('areaTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={sqmeter:1,sqkilometer:1e6,sqmile:2.59e6,sqyard:0.836127};
    const result=val*map[from]/map[to];
    document.getElementById('areaResult').innerHTML=`${getIcon('area')} ${result.toFixed(2)} ${to}`;
    animateIcon('areaFly','areaValue','areaResult');
}

// TIME
function convertTime(){
    const val=parseFloat(document.getElementById('timeValue').value);
    const from=document.getElementById('timeFrom').value;
    const to=document.getElementById('timeTo').value;
    if(isNaN(val)) return alert("Enter a number!");
    const map={second:1,minute:60,hour:3600};
    const result=val*map[from]/map[to];
    document.getElementById('timeResult').innerHTML=`${getIcon('time')} ${result.toFixed(2)} ${to}`;
    animateIcon('timeFly','timeValue','timeResult');
}

// CURRENCY LIVE
let rates={};
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
    if(isNaN(val)) return alert("Enter a number!");
    if(!rates[from]||!rates[to]) return alert("Currency rates not loaded yet!");
    const result=val*rates[to]/rates[from];
    document.getElementById('currencyResult').innerHTML=`${getIcon('currency')} ${result.toFixed(2)} ${to}`;
    animateIcon('currencyFly','currencyValue','currencyResult');
}
