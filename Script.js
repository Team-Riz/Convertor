document.getElementById('datetime').innerText = new Date().toLocaleString();

// Length
function convertLength() {
    let val = parseFloat(document.getElementById('lengthInput').value);
    let unit = document.getElementById('lengthUnit').value;
    let meters = unit==='meter'?val:unit==='kilometer'?val*1000:val*1609.34;
    let km = meters/1000;
    let miles = meters/1609.34;
    document.getElementById('lengthResult').innerText = `Meters: ${meters.toFixed(2)}, Kilometers: ${km.toFixed(4)}, Miles: ${miles.toFixed(4)}`;
}

// Weight
function convertWeight() {
    let val = parseFloat(document.getElementById('weightInput').value);
    let unit = document.getElementById('weightUnit').value;
    let kg = unit==='kilogram'?val:unit==='gram'?val/1000:val*0.453592;
    let g = kg*1000;
    let lb = kg/0.453592;
    document.getElementById('weightResult').innerText = `Kilogram: ${kg.toFixed(2)}, Gram: ${g.toFixed(2)}, Pound: ${lb.toFixed(2)}`;
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
    let ml = l*1000;
    let gal = l/3.78541;
    document.getElementById('volumeResult').innerText = `${l.toFixed(2)} L, ${ml.toFixed(2)} mL, ${gal.toFixed(2)} gal`;
}

// Speed
function convertSpeed() {
    let val = parseFloat(document.getElementById('speedInput').value);
    let unit = document.getElementById('speedUnit').value;
    let kmh = unit==='kmh'?val:unit==='mph'?val*1.60934:val*3.6;
    let mph = kmh/1.60934;
    let ms = kmh/3.6;
    document.getElementById('speedResult').innerText = `${kmh.toFixed(2)} km/h, ${mph.toFixed(2)} mph, ${ms.toFixed(2)} m/s`;
}

// Area
function convertArea() {
    let val = parseFloat(document.getElementById('areaInput').value);
    let unit = document.getElementById('areaUnit').value;
    let sqm = unit==='sqmeter'?val:unit==='sqkilometer'?val*1e6:val*2.59e6;
    let sqkm = sqm/1e6;
    let sqmile = sqm/2.59e6;
    document.getElementById('areaResult').innerText = `${sqm.toFixed(2)} m², ${sqkm.toFixed(4)} km², ${sqmile.toFixed(4)} mi²`;
}

// Time
function convertTime() {
    let val = parseFloat(document.getElementById('timeInput').value);
    let unit = document.getElementById('timeUnit').value;
    let sec = unit==='second'?val:unit==='minute'?val*60:val*3600;
    let min = sec/60;
    let hr = sec/3600;
    document.getElementById('timeResult').innerText = `${sec.toFixed(2)} s, ${min.toFixed(2)} min, ${hr.toFixed(2)} hr`;
}

// Currency (example rates)
function convertCurrency() {
    let val = parseFloat(document.getElementById('currencyInput').value);
    let unit = document.getElementById('currencyUnit').value;
    const usdToQar = 3.64, usdToEur = 0.91;
    let usd = unit==='usd'?val:unit==='qar'?val/usdToQar:val/usdToEur;
    let qar = usd*usdToQar;
    let eur = usd*usdToEur;
    document.getElementById('currencyResult').innerText = `USD: ${usd.toFixed(2)}, QAR: ${qar.toFixed(2)}, EUR: ${eur.toFixed(2)}`;
}

// Energy
function convertEnergy() {
    let val = parseFloat(document.getElementById('energyInput').value);
    let unit = document.getElementById('energyUnit').value;
    let joule = unit==='joule'?val:unit==='calorie'?val*4.184:val*3.6e6;
    let cal = joule/4.184;
    let kwh = joule/3.6e6;
    document.getElementById('energyResult').innerText = `${joule.toFixed(2)} J, ${cal.toFixed(2)} cal, ${kwh.toFixed(4)} kWh`;
}

// Data Storage
function convertData() {
    let val = parseFloat(document.getElementById('dataInput').value);
    let unit = document.getElementById('dataUnit').value;
    let bytes = unit==='byte'?val:unit==='kb'?val*1024:unit==='mb'?val*1024*1024:val*1024*1024*1024;
    let kb = bytes/1024;
    let mb = bytes/(1024*1024);
    let gb = bytes/(1024*1024*1024);
    document.getElementById('dataResult').innerText = `${bytes.toFixed(0)}
