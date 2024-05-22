let totalMass = 0;
let totalCost = 0;
let partCount = 0;
let statusbar = document.getElementById('stat');
let mechWindow = $(".mechWindow")[0];
const mClassOptionDOM = 
    `<option value="1">Superlight</option>
    <option value="2">Lightweight</option>
    <option value="3">Striker</option>
    <option value="4">Mediumstriker</option>
    <option value="5">Heavy Striker</option>
    <option value="6">Mediumweight</option>
    <option value="7">Light Heavy</option>
    <option value="8">Medium Heavy</option>
    <option value="9">Armored Heavy</option>
    <option value="10">Super Heavy</option>
    <option value="11">Mega Heavy</option>` 
let meck = [];
addLimb("T");

function howManyParts(x) {
    let y = 0;
    for (let c = 0; c < meck.length; c++) {
        if (meck[c].subtype == x) y++;
    }
    if (y == 0) {
        for (let c = 0; c < meck.length; c++) {
            for (let c2 = 0; c2 < meck[c].contains.length; c2++) {
                if (!(meck[c].contains[c2] == null)) {
                    if (meck[c].contains[c2].subtype == x) y++;
                } else continue;
            }
        }
    }
    return y;
}
function getLimbByID(x) {
    for (let c=0; c < meck.length; c++) {
        if (meck[c].id == x) return meck[c];
    }
}
function getEquipByCode(x) {
    
}

function addLimb(limb) {
    if (limb != "T") partCount++;
    let tex = 
        `<div id='limbWindow${partCount}' class="limbWindow">
            <form name="limb${partCount}" onchange="updLimb(getLimbByID(${partCount}))">
                <div class="limbShell">
                    <div class="limbCore" id="baseLimb${partCount}">
                        <p>
                            <button type="button" onclick='delLimb(${partCount})'>Х</button>
                            <input name='title'>
                        </p>
                        <select name="mclass">${mClassOptionDOM}</select>
                        <select name="type" hidden>
                            <option value="W">Wheels</option>
                            <option value="T">Treads</option>
                        </select>
                        <p id='status${partCount}'></p>
                    </div>
                    <div class="armorBlock" id="limbArmor${partCount}">
                        <p id="emptyArmorLabel${partCount}">Put some armor here</p>
                    </div>
                </div>
            </form>
            <div id="equipList${partCount}">
                <p id="emptyEquipLabel${partCount}">Put equipement here</p>
            </div>
        </div>`;
    mechWindow.insertAdjacentHTML('beforeend', tex); 
    let curHTMLEll = $(`#limbWindow${partCount}`)[0];;
    curHTMLEll.status = $(`#status${partCount}`)[0];
    curHTMLEll.baseLimb = $(`#baseLimb${partCount}`)[0];
    curHTMLEll.limbArmor = $(`#limbArmor${partCount}`)[0];
    curHTMLEll.equipList = $(`#equipList${partCount}`)[0];
    curHTMLEll.form = document.forms[`limb${partCount}`]
    let ell = {
        id: partCount,
        type: 'limb',
        mclass: 1,
        contains: [],
        armor: {},
        inGUI: $(`#limbWindow${partCount}`)[0],
    };
    switch(limb) {
        case 'T':
            ell.name = 'Torso';
            ell.subtype = 'limbT';
            ell.inGUI.getElementsByTagName('button')[0].remove();
            break
        case 'H':
            ell.name = 'Head' + howManyParts('limbH');
            ell.subtype = 'limbH';
            break
        case 'A':
            ell.name = 'Arm' + howManyParts('limbA');
            ell.subtype = 'limbA';
            break
        case 'L':
            ell.name = 'Leg' + howManyParts('limbL');
            ell.subtype = 'limbL';
            break
        case 'W':
            ell.name = 'Wing' + howManyParts('limbW');
            ell.subtype = 'limbW';
            break
        case 'P':
            ell.name = 'Pod' + howManyParts('limbP');
            ell.subtype = 'limbP';
            break
        case 'O':
            ell.name = 'Pod' + howManyParts('limbO');
            ell.subtype = 'limbO';
            ell.inGUI.form['type'].hidden = false;
            break
    }

    ell.inGUI.ondragover = fuckDef;
    ell.inGUI.limbArmor.ondrop = addArmor;
    ell.inGUI.equipList.ondrop = addEquip;
    ell.inGUI.form.elements["title"] = ell.name;
    meck.push(ell);
    updLimb(getLimbByID(partCount));
}
function addArmor(event) {
    event.preventDefault();
    data = event.dataTransfer.getData("text/plain");
    if (data == "armor") {
        let limbID = this.id.slice(9);
        let tex = 
            `<div id="armor${limbID}" style="border:initial" onchange="updArmor('${limbID}')">
                <p><button type="button" onclick='delArmor(${limbID})'>X</button><b>Armor</b></p>
                <p>
                    <select name="armorClass" >
                        ${mClassOptionDOM}
                    </select>
                    <select name="armorType">
                        <option value="0">Ablative</option>
                        <option value="1" selected>Standart</option>
                        <option value="2">Alpha</option>
                        <option value="4">Beta</option>
                        <option value="8">Gamma</option>
                    </select>
                </p>
                <p>
                    R.A.M.:
                    <select name="armorRAM">
                        <option value="N/A">N/A</option>
                        <option value="1/5">1/5</option>
                        <option value="1/4">1/4</option>
                        <option value="1/3">1/3</option>
                        <option value="1/2">1/2</option>
                    </select>
                </p>
                <p id="armorStatus${limbID}"></p>
            </div>`;
        this.where = getLimbByID(limbID);
        this.insertAdjacentHTML('beforeend', tex);
        $(`#emptyArmorLabel${limbID}`)[0].hidden = true;
        this.where.armor.inGUI = $(`#armor${limbID}`)[0];
        updArmor(limbID);
    } 
}
function addEquip(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let x = this;
    switch (data) {
        case 'beam': addBeam(event, x); break;
    }
}
function addBeam(event, who) {
    let curLimb = getLimbByID(Number(who.id.slice(9)));
    $(`#emptyEquipLabel${partCount}`).hide();
    let curEquipId = curLimb.contains.length;
    let equipCode = `${curLimb.id}_${curEquipId}`
    if (curEquipId == 0) {
        $('#emptyEquipLabel').hide();
    }
    let tex = 
        `<form name = "equip${equipCode}" onchange="updBeam('${equipCode}')">
            <div>
                <p>
                    <button type="button" onclick="delEquip('${equipCode}')">Х</button>
                    <b>Beam Weapon</b>
                </p>
                <p id="status${equipCode}"></p>
                <p>
                    Damage:
                    <select name="damage">
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
                    <select name="range">
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
                    <select name="accuracy">
                        <option value = "0.6">-2</option>
                        <option value = "0.8">-1</option>
                        <option value = "0.9">0</option>
                        <option value = "1" selected>+1</option>
                        <option value = "1.5">+2</option>
                        <option value = "2">+3</option>
                    </select>
                    Warm-up Time:
                    <select name="warmup">
                        <option value = "1">0</option>
                        <option value = "0.9">1</option>
                        <option value = "0.7">2</option>
                        <option value = "0.6">3</option>
                    </select>
                    Shots:
                    <select name="shots">
                        <option value = "1">∞</option>
                        <option value = "0.9">10</option>
                        <option value = "0.8">5</option>
                        <option value = "0.7">3</option>
                        <option value = "0.6">2</option>
                        <option value = "0.5">1</option>
                        <option value = "0.33">0</option>
                    </select>
                    Wide Angle:
                    <select name="angle">
                        <option value = "1">N/A</option>
                        <option value = "2">Hex</option>
                        <option value = "3">60°</option>
                        <option value = "5">180°</option>
                        <option value = "7">300°</option>
                        <option value = "9">360°</option>
                    </select>
                    Burst:
                    <select name="burst">
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
                    Clip-fed: <input name="clip" type="checkbox" >
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
                    Fragile: <input name="fragile" type="checkbox"> 
                    Long Range: <input name="longrange" type="checkbox"> 
                    Hydro: <input name="hydro" type="checkbox"> 
                    Mega-Beam: <input name="mega" type="checkbox"> 
                    Disruptor: <input name="disruptor" type="checkbox"> 
                </p>
            </div>
        </form>`;
    who.insertAdjacentHTML('beforeend', tex);
    meck[curLimb.id].contains[curEquipId] = {
        type: 'weapon', 
        subtype: 'beam', 
        cp: 0, 
        kills: 0, 
        conected: document.forms[`equip${equipCode}`]
    };
    updBeam(equipCode);
}

function updLimb(x) {
    mclass = Number(x.inGUI.form.elements['mclass'].value);
    switch (x.subtype) {
        case 'limbT':
            x.cost = mclass * 2;
            x.space = mclass * 2;
            x.kills = mclass * 2;
            x.mclass = mclass;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t`;
            break
        case 'limbH':
            x.cost = mclass;
            x.space = mclass;
            x.kills = mclass;
            x.mclass = mclass;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t`; 
            break
        case 'limbA':
            x.cost = mclass + 1;
            x.space = mclass + 1;
            x.kills = mclass + 1;
            x.plusDmg = Math.floor((mclass-1)/3);
            x.throw = Math.floor(mclass/2)+1;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t, +${x.plusDmg} Damage, ${x.throw} throw distance`;  
            break
        case 'limbL':
            x.cost = mclass + 1;
            x.space = mclass + 1;
            x.kills = mclass + 1;
            x.mclass = mclass;
            x.plusDmg = Math.floor((mclass-1)/2);
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t, +${x.plusDmg} Damage`;
            break
        case 'limbW':
            x.cost = mclass;
            x.space = mclass;
            x.kills = mclass;
            x.mclass = mclass;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t`;
            break
        case 'limbP':
            x.cost = mclass;
            x.space = mclass * 2;
            x.kills = 0;
            x.mclass = mclass;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t`;
            break
        case 'limbO':
            let n = 1;
            if (x.inGUI.form['type'].value == "T") n=2;
            x.cost = mclass * n;
            x.space = mclass * n;
            x.kills = mclass * n;
            x.mclass = mclass;
            x.inGUI.status.innerHTML = `Cost: ${x.cost} CP, Weight: ${x.kills/2}t`;
            break
    }
    updTotal();
}
function updArmor(x) {;
    y = getLimbByID(x);
    let mclass = Number(y.inGUI.form['armorClass'].value);
    let mdc = Number(y.inGUI.form[`armorType`].value);
    let costmod1 = 1;
    switch (mdc) {
        case 0: costmod1 = 0.5; break;
        case 1: costmod1 = 1; break;
        case 2: costmod1 = 1.25; break;
        case 4: costmod1 = 1.5; break;
        case 8: costmod1 = 2.0; break;
    }
    let mram = y.inGUI.form['armorRAM'].value;
    let costmod2 = 1;
    let mpen = 0;
    switch (mram) {
        case 'N/A': costmod2 = 1; mpen = 0; break;
        case '1/5': costmod2 = 1.5; mpen = 1; break;
        case '1/4': costmod2 = 1.8; mpen = 0.8; break;
        case '1/3': costmod2 = 2.2; mpen = 0.75; break;
        case '1/2': costmod2 = 2.5; mpen = 0.66; break;
    }
    y.armor.class = mclass;
    y.armor.dc = mdc;
    y.armor.ram = mram;
    y.armor.sp = Math.ceil(mclass - (mclass * mpen));
    y.armor.mass = mclass/2;
    y.armor.cost = mclass * costmod1 * costmod2;
    let curDesc = $(`#armorStatus${y.id}`)[0];
    curDesc.innerHTML = `SP: ${y.armor.sp} | DC: ${mdc} | Cost: ${y.armor.cost} | Mass: ${y.armor.mass}`;
    updTotal();
}
function updBeam(x) {
    let c = x.indexOf('_'); //cashe variable
    let whatLimb = x.slice(0, c);
    let whatEq = x.slice(c+1);
    let newa = meck[whatLimb].contains[whatEq];
    let formdata = newa.conected.elements;
    newa.cp = 0;

    newa.range = formdata.damage.value;
    c = newa.range.indexOf('_');
    newa.damage = Number(newa.range.slice(0, c));
    newa.cp = newa.damage * 1.5;
    newa.range = Number(newa.range.slice(c+1));

    newa.rangemod = formdata.range.value;
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
    newa.accuracy = Number(formdata.accuracy.value);
    newa.warmup = Number(formdata.warmup.value);
    newa.shots = Number(formdata.shots.value);
    newa.angle = Number(formdata.angle.value);
    newa.burst = Number(formdata.burst.value);
    newa.cp = newa.cp * newa.rangemod * newa.accuracy * newa.warmup * newa.shots * newa.angle * newa.burst;

    newa.clip = formdata.clip.checked;
    if (newa.clip) newa.cp *= 0.9;
    newa.target = formdata.target.value;
    switch (newa.target) {
        case 'standart' : break;
        case 'am' : break;
        case 'ap' : break;
        case 'amap' : newa.cp *= 1.8; break;
        case 'vam' : newa.cp *= 1.8; break;
        case 'vap' : newa.cp *= 1.8; break;
        case 'vamap' : newa.cp *= 2.6; break;
    }
    newa.fragile = formdata.fragile.checked;
    newa.longrange = formdata.longrange.checked;
    if (newa.longrange) newa.cp *= 1.33;
    newa.hydro = formdata.hydro.checked;
    if (newa.hydro) newa.cp *= 0.2;
    newa.mega = formdata.mega.checked;
    if (newa.mega) newa.cp *= 10;
    newa.disruptor = formdata.disruptor.checked;
    if (newa.disruptor) newa.cp *= 2;

    newa.cp = mektonRounding(newa.cp);
    console.log(meck[whatLimb].contains[whatEq]); 
    $(`#status${x}`)[0].innerHTML = newa.cp + ' CP, Range: ' + newa.range + '';
    updTotal();
}

function delLimb(x) {
    for (let c = 0; c < meck.length; c++) {
        if (meck[c].id == x) meck.splice(c, 1);
    }
    $(`#limbWindow${x}`).remove();
    updTotal();
}
function delArmor(x) {
    for (let c = 0; c < meck.length; c++) {
        if (meck[c].id == x) meck[c].armor = {};
    }
    $(`#armor${x}`)[0].remove();
    $(`#emptyArmorLabel${x}`)[0].hidden = false;
    updTotal();
}
function delEquip(x) {
    let c = x.indexOf('_'); //cashe variable
    let whatLimb = x.slice(0, c);
    let whatEq = x.slice(c+1);
    meck[whatLimb].contains[whatEq].conected.remove();
    meck[whatLimb].contains.splice(whatEq, 1);
    if (meck[whatLimb].contains.length == 0) $(`#emptyEquipLabel${partCount}`).show(); 
    updTotal();
}

function updTotal() {
    totalCost = 0;
    totalMass = 0;
    for (let c = 0; c < meck.length; c++) {
        totalMass += meck[c].kills/2;
        totalCost += meck[c].cost;
        if (meck[c].armor.cost!=null) {
            totalCost += meck[c].armor.cost;
            totalMass += meck[c].armor.mass;
        } 
        if (meck[c].contains.length != 0) {
            for (let c2 = 0; c2 < meck[c].contains.length; c2++) {
                totalCost += meck[c].contains[c2].cp;
                totalMass += meck[c].contains[c2].kills;
            }
        }
    }
    statusbar.innerHTML = `Cost: ${totalCost} CP, Mass: ${totalMass}t`;
}

function fuckDef(event) {
    event.preventDefault();
}
function farParent(x, n) {
    for (let c = 0; c < n; c++) {
        x = x.parentNode;
    }
    return x;
}
function mektonRounding(x) {
    let y = (Math.ceil(x*10)/10);
    return y;
}