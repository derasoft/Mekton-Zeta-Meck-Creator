equip = [];


function addBeam() {
    equipCode = equip.length;
    let tex = `<form name="equip${equipCode}" onchange="updBeam('${equipCode}')">
            <div>
                <p>
                    <button onclick='delEquip(farParent(this, 6))'>Х</button>
                    <b>Beam Weapon</b>
                </p>
                <p id="status_equip${equipCode}"></p>
                <p>
                    Damage:
                    <select id="damage" >
                        <option value = "1_4">1 dmg | Range 4</option>
                        <option value = "2_6">2 dmg | Range 6</option>
                        <option value = "3_7">3 dmg | Range 7</option>
                        <option value = "4_8">4 dmg | Range 8</option>
                        <option value = "5_9">5 dmg | Range 9</option>
                        <option value = "6_10">6 dmg | Range 10</option>
                        <option value = "7_11">7 dmg | Range 11</option>
                        <option value = "8_11">8 dmg | Range 11</option>
                        <option value = "9_12">9 dmg | Range 12</option>
                        <option value = "10_13">10 dmg | Range 13</option>
                        <option value = "11_13">11 dmg | Range 13</option>
                        <option value = "12_14">12 dmg | Range 14</option>
                        <option value = "13_14">13 dmg | Range 14</option>
                        <option value = "14_15">14 dmg | Range 15</option>
                        <option value = "15_15">15 dmg | Range 15</option>
                        <option value = "16_16">16 dmg | Range 16</option>
                        <option value = "17_16">17 dmg | Range 16</option>
                        <option value = "18_17">18 dmg | Range 17</option>
                        <option value = "19_17">19 dmg | Range 17</option>
                        <option value = "20_18">20 dmg | Range 18</option>
                    </select>
                    Range:
                    <select id="range">
                        <option value = "0.62">25%</option>
                        <option value = "0.75">50%</option>
                        <option value = "0.88">75%</option>
                        <option value = "1" selected>100%</option>
                        <option value = "1.12">125%</option>
                        <option value = "1.25">150%</option>
                        <option value = "1.38">175%</option>
                        <option value = "1.5">200%</option>
                        <option value = "1.75">250%</option>
                        <option value = "2">300%</option>
                    </select>
                    Accuracy:
                    <select id="accuracy">
                        <option value = "0.6">-2</option>
                        <option value = "0.8">-1</option>
                        <option value = "0.9">0</option>
                        <option value = "1" selected>+1</option>
                        <option value = "1.5">+2</option>
                        <option value = "2">+3</option>
                    </select>
                    Warm-up Time:
                    <select id="warmup">
                        <option value = "1">0</option>
                        <option value = "0.9">1</option>
                        <option value = "0.7">2</option>
                        <option value = "0.6">3</option>
                    </select>
                    Shots:
                    <select id="shots">
                        <option value = "1">∞</option>
                        <option value = "0.9">10</option>
                        <option value = "0.8">5</option>
                        <option value = "0.7">3</option>
                        <option value = "0.6">2</option>
                        <option value = "0.5">1</option>
                        <option value = "0.33">0</option>
                    </select>
                    Wide Angle:
                    <select id="angle">
                        <option value = "1">N/A</option>
                        <option value = "2">Hex</option>
                        <option value = "3">60°</option>
                        <option value = "5">180°</option>
                        <option value = "7">300°</option>
                        <option value = "9">360°</option>
                    </select>
                    Burst:
                    <select id="burst">
                        <option value = "1">1</option>
                        <option value = "1.5">2</option>
                        <option value = "2">3</option>
                        <option value = "2.5">4</option>
                        <option value = "3">5</option>
                        <option value = "3.5">6</option>
                        <option value = "4">7</option>
                        <option value = "4.5">8</option>
                        <option value = "5">∞</option>
                    </select>
                </p>
                <p>
                    Clip-fed: <input id="clip" type="checkbox">
                    Target: Standart <input type="radio" name="target" value="standart" checked>
                </p>
                <table>
                    <tr>
                        <td>Anti-Missle <input type="radio" name="target" value="am"></td>
                        <td>Anti-Personel <input type="radio" name="target" value="ap"></td>
                        <td>Anti-Missle & Anti-Personel <input type="radio" name="target" value="amap"></td>
                    </tr>
                    <tr>
                        <td>Variable <input type="radio" name="target" value="vam"></td>
                        <td>Variable <input type="radio" name="target" value="vap"></td>
                        <td>All-Purpouse <input type="radio" name="target" value="vamap"></td>
                    </tr>
                </table>
                <p> 
                    Fragile: <input id="fragile" type="checkbox"> 
                    Long Range: <input id="longrange" type="checkbox"> 
                    Hydro: <input id="hydro" type="checkbox"> 
                    Mega-Beam: <input id="mega" type="checkbox"> 
                    Disruptor: <input id="disruptor" type="checkbox"> 
                </p>
            </div>
        </form>`
    document.body.insertAdjacentHTML('beforeend', tex);
    equip[equipCode] = document.forms[`equip${equipCode}`];
    equip[equipCode]

    updBeam(equipCode);
}

function updBeam(x) {
    prop = equip[x]
    let newa = {};
    newa.cp = 0;

    newa.range = prop.elements.damage.value;
    c = newa.range.indexOf('_');
    newa.damage = Number(newa.range.slice(0, c));
    newa.cp = newa.damage * 1.5;
    newa.range = Number(newa.range.slice(c+1));

    newa.rangemod = prop.elements.range.value;
    switch (newa.rangemod) {
        case '0.62': newa.range = Math.ceil(newa.range * 0.25); break;
        case '0.75': newa.range = Math.ceil(newa.range * 0.5); break;
        case '0.88': newa.range = Math.ceil(newa.range * 0.75); break;
        case '1': break;
        case '1.12': newa.range = Math.ceil(newa.range * 1.25); break;
        case '1.25': newa.range = Math.ceil(newa.range * 1.5); break;
        case '1.38': newa.range = Math.ceil(newa.range * 1.75); break;
        case '1.5': newa.range *= 2; break;
        case '1.75': newa.range = Math.ceil(newa.range * 2.5); break;
        case '2': newa.range *= 3; break;
    }
    newa.accuracy = Number(prop.elements.accuracy.value);  
    newa.warmup = Number(prop.elements.warmup.value);
    newa.shots = Number(prop.elements.shots.value);
    newa.angle = Number(prop.elements.angle.value);
    newa.burst = Number(prop.elements.burst.value);
    newa.cp = newa.cp * newa.rangemod * newa.accuracy * newa.warmup * newa.shots * newa.angle * newa.burst;

    newa.clip = prop.elements.clip.checked;
    if (newa.clip) newa.cp *= 0.9;
    newa.target = prop.elements.target.value;
    switch (newa.target) {
        case 'standart' : break;
        case 'am' : break;
        case 'ap' : break;
        case 'amap' : newa.cp *= 1.8; break;
        case 'vam' : newa.cp *= 1.8; break;
        case 'vap' : newa.cp *= 1.8; break;
        case 'vamap' : newa.cp *= 2.6; break;
    }
    newa.fragile = prop.elements.fragile.checked;
    newa.longrange = prop.elements.longrange.checked;
    if (newa.longrange) newa.cp *= 1.33;
    newa.hydro = prop.elements.hydro.checked;
    if (newa.hydro) newa.cp *= 0.2;
    newa.mega = prop.elements.mega.checked;
    if (newa.mega) newa.cp *= 10;
    newa.disruptor = prop.elements.disruptor.checked;
    if (newa.disruptor) newa.cp *= 2;

    newa.cp = mektonRounding(newa.cp);
    $(`#status_equip${x}`)[0].innerHTML = newa.cp + ' CP, Range: ' + newa.range + '';
}

function mektonRounding(x) {
    let y = (Math.ceil(x*10)/10);
    return y;
}