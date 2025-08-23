// Display current date and time
document.getElementById('datetime').innerText = new Date().toLocaleString();

// Length Converter
function convertLength() {
    let val = parseFloat(document.getElementById('lengthInput').value);
    let unit = document.getElementById('lengthUnit').value;
    let result = 0;
    if (unit === 'meter') result = val;
    else if (unit === 'kilometer') result = val * 1000;
    else if (unit === 'mile') result = val * 1609.34;
    document.getElementById('lengthResult').innerText = `Result: ${result} meters`;
}

// Weight Converter
function convertWeight() {
    let val = parseFloat(document.getElementById('weightInput').value);
    let unit = document.getElementById('weightUnit').value;
    let result = 0;
    if (unit === 'kilogram') result = val;
    else if (unit === 'gram') result = val / 1000;
    else if (unit === 'pound') result = val * 0.453592;
    document.getElementById('weightResult').innerText = `Result: ${result.toFixed(2)} kg`;
}

// Temperature Converter
function convertTemperature() {
    let val = parseFloat(document.getElementById('tempInput').value);
    let unit = document.getElementById('tempUnit').value;
    let celsius = 0;
    if (unit === 'celsius') celsius = val;
    else if (unit === 'fahrenheit') celsius = (val - 32) * 5/9;
    else if (unit === 'kelvin') celsius = val - 273.15;
    document.getElementById('tempResult').innerText = `Result: ${celsius.toFixed(2)} °C`;
}

// Volume Converter
function convertVolume() {
    let val = parseFloat(document.getElementById('volumeInput').value);
    let unit = document.getElementById('volumeUnit').value;
    let liters = 0;
    if (unit === 'liter') liters = val;
    else if (unit === 'milliliter') liters = val / 1000;
    else if (unit === 'gallon') liters = val * 3.78541;
    document.getElementById('volumeResult').innerText = `Result: ${liters.toFixed(2)} liters`;
}

// Speed Converter
function convertSpeed() {
    let val = parseFloat(document.getElementById('speedInput').value);
    let unit = document.getElementById('speedUnit').value;
    let kmh = 0;
    if (unit === 'kmh') kmh = val;
    else if (unit === 'mph') kmh = val * 1.60934;
    else if (unit === 'ms') kmh = val * 3.6;
    document.getElementById('speedResult').innerText = `Result: ${kmh.toFixed(2)} km/h`;
}

// Area Converter
function convertArea() {
    let val = parseFloat(document.getElementById('areaInput').value);
    let unit = document.getElementById('areaUnit').value;
    let sqm = 0;
    if (unit === 'sqmeter') sqm = val;
    else if (unit === 'sqkilometer') sqm = val * 1e6;
    else if (unit === 'sqmile') sqm = val * 2.59e6;
    document.getElementById('areaResult').innerText = `Result: ${sqm.toFixed(2)} m²`;
}

// Time Converter
function convertTime() {
    let val = parseFloat(document.getElementById('timeInput').value);
    let unit = document.getElementById('timeUnit').value;
    let seconds = 0;
    if (unit === 'second') seconds = val;
    else if (unit === 'minute') seconds = val * 60;
    else if (unit === 'hour') seconds = val * 3600;
    document.getElementById('timeResult').innerText = `Result: ${seconds.toFixed(2)} seconds`;
}
