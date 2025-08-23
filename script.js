// ------------------------
// FLY ANIMATION
// ------------------------
function animateFly(id) {
    let icon = document.getElementById(id);
    icon.style.opacity = 1;
    icon.style.transform = 'translate(0, -50px)';
    setTimeout(() => {
        icon.style.opacity = 0;
        icon.style.transform = 'translate(0,0)';
    }, 800);
}

// ------------------------
// SEARCH FUNCTION
// ------------------------
function searchConverter() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let converters = document.querySelectorAll('.converter');
    converters.forEach(conv => {
        if (conv.dataset.name.includes(input) && input !== '') {
            conv.classList.add('highlight');
            conv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            conv.classList.remove('highlight');
        }
    });
}

// ------------------------
// LENGTH
// ------------------------
const lengthRates = { meter:1, kilometer:1000, centimeter:0.01, mile:1609.34, foot:0.3048, inch:0.0254 };
function convertLength() {
    let val = parseFloat(document.getElementById('lengthValue').value);
    let from = document.getElementById('lengthFrom').value;
    let to = document.getElementById('lengthTo').value;
    let result = val * lengthRates[from]/lengthRates[to];
    document.getElementById('lengthResult').innerText = result.toFixed(2)+' '+to;
    animateFly('lengthFly');
}

// ------------------------
// WEIGHT
// ------------------------
const weightRates = { kilogram:1, gram:0.001, pound:0.453592, ounce:0.0283495 };
function convertWeight() {
    let val = parseFloat(document.getElementById('weightValue').value);
    let from = document.getElementById('weightFrom').value;
    let to = document.getElementById('weightTo').value;
    let result = val * weightRates[from]/weightRates[to];
    document.getElementById('weightResult').innerText = result.toFixed(2)+' '+to;
    animateFly('weightFly');
}

// ------------------------
// TEMPERATURE
// ------------------------
function convertTemperature() {
    let val = parseFloat(document.getElementById('tempValue').value);
    let from = document.getElementById('tempFrom').value;
    let to = document.getElementById('tempTo').value;
    let celsius = (from==='celsius')?val:(from==='fahrenheit')?(val-32)*5/9:val-273.15;
    let result = (to==='celsius')?celsius:(to==='fahrenheit')?celsius*9/5+32:celsius+273.15;
    document.getElementById('tempResult').innerText = result.toFixed(2)+' '+to;
    animateFly('tempFly');
}

// ------------------------
// VOLUME
// ------------------------
const volumeRates = { liter:1, milliliter:0.001, gallon:3.78541, cup:0.24 };
function convertVolume() {
    let val = parseFloat(document.getElementById('volumeValue').value);
    let from = document.getElementById('volumeFrom').value;
    let to = document.getElementById('volumeTo').value;
    let result = val * volumeRates[from]/volumeRates[to];
    document.getElementById('volumeResult').innerText = result.toFixed(2)+' '+to;
    animateFly('volumeFly');
}

// ------------------------
// SPEED
// ------------------------
const speedRates = { kmh:1, mph:1.60934, ms:3.6 };
function convertSpeed() {
    let val = parseFloat(document.getElementById('speedValue').value);
    let from = document.getElementById('speedFrom').value;
    let to = document.getElementById('speedTo').value;
    let result = val*speedRates[from]/speedRates[to];
    document.getElementById('speedResult').innerText = result.toFixed(2)+' '+to;
    animateFly('speedFly');
}

// ------------------------
// AREA
// ------------------------
const areaRates = { sqmeter:1, sqkilometer:1e6, sqmile:2.59e6, sqyard:0.836127 };
function convertArea() {
    let val = parseFloat(document.getElementById('areaValue').value);
    let from = document.getElementById('areaFrom').value;
    let to = document.getElementById('areaTo').value;
    let result = val*areaRates[from]/areaRates[to];
    document.getElementById('areaResult').innerText = result.toFixed(2)+' '+to;
    animateFly('areaFly');
}

// ------------------------
// TIME
// ------------------------
const timeRates = { second:1, minute:60, hour:3600 };
function convertTime() {
    let val = parseFloat(document.getElementById('timeValue').value);
    let from = document.getElementById('timeFrom').value;
    let to = document.getElementById('timeTo').value;
    let result = val*timeRates[from]/timeRates[to];
    document.getElementById('timeResult').innerText = result.toFixed(2)+' '+to;
    animateFly('timeFly');
}

// ------------------------
// LIVE CURRENCY
// ------------------------
async function convertCurrency() {
    let val = parseFloat(document.getElementById('currencyValue').value);
    let from = document.getElementById('currencyFrom').value;
    let to = document.getElementById('currencyTo').value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/latest/${from}`);
        const data = await response.json();
        if (data.result === "success") {
            const rate = data.conversion_rates[to];
            const result = val * rate;
            document.getElementById('currencyResult').innerText = result.toFixed(2)+' '+to;
            animateFly('currencyFly');
        } else {
            document.getElementById('currencyResult').innerText = 'Currency conversion failed';
        }
    } catch (error) {
        document.getElementById('currencyResult').innerText = 'Error fetching rates';
    }
}
