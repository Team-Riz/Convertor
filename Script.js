// Search functionality
function searchConverter() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let converters = document.querySelectorAll('.converter');
    converters.forEach(conv => {
        let name = conv.getAttribute('data-name');
        if(name.includes(input) && input !== '') {
            conv.classList.add('highlight');
            conv.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else {
            conv.classList.remove('highlight');
        }
    });
}

// ======= Conversion Functions =======

// Length conversions in meters as base
function convertLength() {
    const val = parseFloat(document.getElementById('lengthValue').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        mile: 1609.34,
        foot: 0.3048,
        inch: 0.0254
    };
    const result = val * map[from] / map[to];
    document.getElementById('lengthResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Weight conversions in kilograms as base
function convertWeight() {
    const val = parseFloat(document.getElementById('weightValue').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        kilogram: 1,
        gram: 0.001,
        pound: 0.453592,
        ounce: 0.0283495
    };
    const result = val * map[from] / map[to];
    document.getElementById('weightResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Temperature conversions
function convertTemperature() {
    const val = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    let celsius;
    if(from==='celsius') celsius = val;
    else if(from==='fahrenheit') celsius = (val-32)*5/9;
    else celsius = val - 273.15;

    let result;
    if(to==='celsius') result = celsius;
    else if(to==='fahrenheit') result = celsius*9/5+32;
    else result = celsius + 273.15;

    document.getElementById('tempResult').innerText = `${result.toFixed(2)} ${to}`;
}

// Volume conversions in liters as base
function convertVolume() {
    const val = parseFloat(document.getElementById('volumeValue').value);
    const from = document.getElementById('volumeFrom').value;
    const to = document.getElementById('volumeTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        liter: 1,
        milliliter: 0.001,
        gallon: 3.78541,
        cup: 0.24
    };
    const result = val * map[from] / map[to];
    document.getElementById('volumeResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Speed conversions in km/h as base
function convertSpeed() {
    const val = parseFloat(document.getElementById('speedValue').value);
    const from = document.getElementById('speedFrom').value;
    const to = document.getElementById('speedTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        kmh:1,
        mph:1.60934,
        ms:3.6
    };
    const result = val * map[from] / map[to];
    document.getElementById('speedResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Area conversions in m² as base
function convertArea() {
    const val = parseFloat(document.getElementById('areaValue').value);
    const from = document.getElementById('areaFrom').value;
    const to = document.getElementById('areaTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        sqmeter:1,
        sqkilometer:1e6,
        sqmile:2.59e6,
        sqyard:0.836127
    };
    const result = val * map[from] / map[to];
    document.getElementById('areaResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Time conversions in seconds as base
function convertTime() {
    const val = parseFloat(document.getElementById('timeValue').value);
    const from = document.getElementById('timeFrom').value;
    const to = document.getElementById('timeTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const map = {
        second:1,
        minute:60,
        hour:3600
    };
    const result = val * map[from] / map[to];
    document.getElementById('timeResult').innerText = `${result.toFixed(4)} ${to}`;
}

// Currency conversions base USD (example rates)
function convertCurrency() {
    const val = parseFloat(document.getElementById('currencyValue').value);
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    if(isNaN(val)) return alert("Enter a number!");

    const rates = {
        usd:1,
        qar:3.64,
        pkr:284,
        eur:0.92
    };

    const result = val * rates[to]/rates[from];
    document.getElementById('currencyResult').innerText = `${result.toFixed(2)} ${to.toUpperCase()}`;
}
