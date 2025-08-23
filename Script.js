document.getElementById('datetime').innerText = new Date().toLocaleString();

// Length
function convertLength() {
    let val = parseFloat(document.getElementById('lengthInput').value);
    let unit = document.getElementById('lengthUnit').value;

    let meters = unit==='meter'?val:unit==='kilometer'?val*1000:val*1609.34;
    let km = meters/1000;
    let miles = meters/1609.34;

    document.getElementById('lengthResult').innerText = 
        `Meters: ${meters.toFixed(2)}, Kilometers: ${km.toFixed(4)}, Miles: ${miles.toFixed(4)}`;
}

// Weight
function convertWeight() {
    let val = parseFloat(document.getElementById('weightInput').value);
    let unit = document.getElementById('weightUnit').value;

    let kg = unit==='kilogram'?val:unit==='gram'?val/1000:val*0.453592;
    let g = kg*1000;
    let lb = kg/0.453592;

    document.getElementById('weightResult').innerText = 
        `Kilogram: ${kg.toFixed(2)}, Gram: ${g.toFixed(2)}, Pound: ${lb.toFixed(2)}`;
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

    document.getElementById('speedResult').
