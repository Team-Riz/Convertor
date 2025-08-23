document.getElementById('datetime').innerText = new Date().toLocaleString();

// Length
function convertLength() {
    let val = parseFloat(document.getElementById('lengthInput').value);
    let unit = document.getElementById('lengthUnit').value;
    let meters = unit === 'meter' ? val : unit === 'kilometer' ? val*1000 : val*1609.34;
    document.getElementById('lengthResult').innerText = 
        `Meters: ${meters.toFixed(2)}, Kilometers: ${(meters/1000).toFixed(4)}, Miles: ${(meters/1609.34).toFixed(4)}`;
}

// Weight
function convertWeight() {
    let val = parseFloat(document.getElementById('weightInput').value);
    let unit = document.getElementById('weightUnit').value;
    let kg = unit === 'kilogram' ? val : unit==='gram' ? val/1000 : val*0.453592;
    document.getElementById('weightResult').innerText = 
        `Kg: ${kg.toFixed(2)}, g: ${(kg*1000).toFixed(2)}, Lb: ${(kg/0.453592).toFixed(2)}`;
}

// Temperature
function convertTemperature() {
    let val = parseFloat(document.getElementById('tempInput').value);
    let unit = document.getElementById('tempUnit').value;
    let c = unit==='celsius'?val:unit==='fahrenheit'?(val-32)*5/9:val-273.15;
    let f = c*9/5+32;
    let k = c+273.15;
    document.getElementById('tempResult').innerText = `${c.toFixed(2)} °C, ${f.toFixed(2)} °F, ${k.toFixed(2)} K`;
}

// Volume
function convertVolume() {
    let val = parseFloat(document.getElementById('volumeInput').value);
    let unit = document.getElementById('volumeUnit').value;
    let l = unit==='liter'?val:unit==='milliliter'?val/1000:val*3.78541;
    document.getElementById('volumeResult').innerText = `${l.toFixed(2)} L, ${(l*1000).toFixed(2)} mL, ${(l/3.78541).toFixed(2)} gal`;
}

// Speed
function convertSpeed() {
    let val = parseFloat(document.getElementById('speedInput').value);
    let unit = document.getElementById('speedUnit').value;
    let kmh = unit==='kmh'?val:unit==='mph'?val*1.60934:val*3.6;
    document.getElementById('speedResult').innerText = `${kmh.toFixed(2)} km/h, ${(kmh/1.60934).toFixed(2)} mph, ${(kmh/3.6).toFixed(2)} m/s`;
}

// Area
function convertArea() {
    let val = parseFloat(document.getElementById('areaInput').value);
    let unit = document.getElementById('areaUnit').value;
    let sqm = unit==='sqmeter'?val:unit==='sqkilometer'?val*1e6:val*2.59e6;
    document.getElementById('areaResult').innerText = `${sqm.toFixed(2)} m², ${(sqm/1e6).toFixed(4)} km², ${(sqm/2.59e6).toFixed(4)} mi²`;
}

// Time
function convertTime() {
    let val = parseFloat(document.getElementById('timeInput').value);
    let unit = document.getElementById('timeUnit').value;
    let s = unit==='second'?val:unit==='minute'?val*60:val*3600;
    document.getElementById('timeResult').innerText = `${s.toFixed(2)} sec, ${(s/60).toFixed(2)} min, ${(s/3600).toFixed(2)} hr`;
}

// Currency (example rates: 1 USD = 0.91 EUR = 3.64 QAR)
function convertCurrency() {
    let val = parseFloat(document.getElementById('currencyInput').value);
    let unit = document.getElementById('currencyUnit').value;
    let usd = unit==='usd'?val:unit==='eur'?val/0.91:val/3.64;
    document.getElementById('currencyResult').innerText = `USD: ${usd.toFixed(2)}, EUR: ${(usd*0.91).toFixed(2)}, QAR: ${(usd*3.64).toFixed(2)}`;
}

// Energy
function convertEnergy() {
    let val = parseFloat(document.getElementById('energyInput').value);
    let unit = document.getElementById('energyUnit').value;
    let joule = unit==='joule'?val:unit==='calorie'?val*4.184:val*3.6e6;
    document.getElementById('energyResult').innerText = `J: ${joule.toFixed(2)}, cal: ${(joule/4.184).toFixed(2)}, kWh: ${(joule/3.6e6).toFixed(4)}`;
}

// Data Storage
function convertData() {
    let val = parseFloat(document.getElementById('dataInput').value);
    let unit = document.getElementById('dataUnit').value;
    let bytes = unit==='byte'?val:unit==='kb'?val*1024:unit==='mb'?val*1024*1024:val*1024*1024*1024;
    document.getElementById('dataResult').innerText = 
        `B: ${bytes}, KB: ${(bytes/1024).toFixed(2)}, MB: ${(bytes/1024/1024).toFixed(2)}, GB: ${(bytes/1024/1024/1024).toFixed(2)}`;
}
