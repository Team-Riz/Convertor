// DARK / LIGHT MODE TOGGLE
const modeBtn = document.getElementById('modeToggle');
modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        modeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        modeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// SEARCH FUNCTION
function searchConverter(){
    const search = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.converter').forEach(c => {
        c.classList.remove('highlight');
        if(c.dataset.name.includes(search)){
            c.classList.add('highlight');
        }
    });
}

// UTILITY TO SHOW FLYING ICON
function flyIcon(id){
    const icon = document.getElementById(id);
    icon.style.opacity = 1;
    setTimeout(()=>{icon.style.opacity=0;}, 800);
}

// ========== CONVERTERS ==========

// LENGTH
function convertLength(){
    let val = parseFloat(document.getElementById('lengthValue').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;
    const rates = { meter:1, kilometer:1000, centimeter:0.01, mile:1609.34, foot:0.3048, inch:0.0254};
    let result = val * rates[from] / rates[to];
    document.getElementById('lengthResult').innerText = `${result.toFixed(2)} ${to}`;
    flyIcon('lengthFly');
}

// WEIGHT
function convertWeight(){
    let val = parseFloat(document.getElementById('weightValue').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;
    const rates = { kilogram:1, gram:0.001, pound:0.453592, ounce:0.0283495 };
    let result = val * rates[from] / rates[to];
    document.getElementById('weightResult').innerText = `${result.toFixed(2)} ${to}`;
    flyIcon('weightFly');
}

// TEMPERATURE
function convertTemperature(){
    let val = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;
    let celsius=0;
    if(from==='celsius') celsius=val;
    else if(from==='fahrenheit') celsius=(val-32)*5/9;
    else if(from==='kelvin') celsius=val-273.15;
    let result=0;
    if(to==='celsius') result=celsius;
    else if(to==='fahrenheit') result=celsius*9/5+32;
    else if(to==='kelvin') result=celsius+273.15;
    document.getElementById('tempResult').innerText = `${result.toFixed(2)} ${to}`;
    flyIcon('tempFly');
}

// VOLUME
function convertVolume(){
    let val=parseFloat(document.getElementById('volumeValue').value);
    const from=document.getElementById('volumeFrom').value;
    const to=document.getElementById('volumeTo').value;
    const rates={liter:1,milliliter:0.001,gallon:3.78541,cup:0.24};
    let result=val*rates[from]/rates[to];
    document.getElementById('volumeResult').innerText=`${result.toFixed(2)} ${to}`;
    flyIcon('volumeFly');
}

// SPEED
function convertSpeed(){
    let val=parseFloat(document.getElementById('speedValue').value);
    const from=document.getElementById('speedFrom').value;
    const to=document.getElementById('speedTo').value;
    const rates={kmh:1,mph:1.60934,ms:3.6};
    let result=val*rates[from]/rates[to];
    document.getElementById('speedResult').innerText=`${result.toFixed(2)} ${to}`;
    flyIcon('speedFly');
}

// AREA
function convertArea(){
    let val=parseFloat(document.getElementById('areaValue').value);
    const from=document.getElementById('areaFrom').value;
    const to=document.getElementById('areaTo').value;
    const rates={sqmeter:1,sqkilometer:1e6,sqmile:2.59e6,sqyard:0.836127};
    let result=val*rates[from]/rates[to];
    document.getElementById('areaResult').innerText=`${result.toFixed(2)} ${to}`;
    flyIcon('areaFly');
}

// TIME
function convertTime(){
    let val=parseFloat(document.getElementById('timeValue').value);
    const from=document.getElementById('timeFrom').value;
    const to=document.getElementById('timeTo').value;
    const rates={second:1,minute:60,hour:3600};
    let result=val*rates[from]/rates[to];
    document.getElementById('timeResult').innerText=`${result.toFixed(2)} ${to}`;
    flyIcon('timeFly');
}

// CURRENCY (Example static rates, can be replaced with API)
function convertCurrency(){
    let val=parseFloat(document.getElementById('currencyValue').value);
    const from=document.getElementById('currencyFrom').value;
    const to=document.getElementById('currencyTo').value;
    const rates={USD:1,QAR:0.27,PKR:0.0063,EUR:1.1}; // base USD
    let result=val*rates[from]/rates[to];
    document.getElementById('currencyResult').innerText=`${result.toFixed(2)} ${to}`;
    flyIcon('currencyFly');
}
