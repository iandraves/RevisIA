let q1 = document.getElementById("q1");
let q2 = document.getElementById("q2");
let info = document.getElementById("info");
let main = document.getElementById("main");
let category1 = document.getElementById("category1");
let category2 = document.getElementById("category2");
let images = document.getElementById("images");
images.addEventListener("removed", isComplete);
let section = 0;
let race = null;
const harmless = ["./img/harmless/backpack.png", "./img/harmless/keychain.png", "./img/harmless/notebook.png", "./img/harmless/toothbrush.png", "./img/harmless/umbrella.png", "./img/harmless/wallet.png"];
const weapons = ["./img/weapons/automaticrifle.png", "./img/weapons/brassknuckles.png", "./img/weapons/dynamite.png", "./img/weapons/handgun.png", "./img/weapons/knife.png", "./img/weapons/shotgun.png"];
const black = ["./img/black/f14.jpg", "./img/black/f23.jpg", "./img/black/f56.jpg", "./img/black/m14.jpg", "./img/black/m23.jpg", "./img/black/m56.jpg"];
const white = ["./img/white/f2.jpg", "./img/white/f3.jpg", "./img/white/f6.jpg", "./img/white/m1.jpg", "./img/white/m4.jpg", "./img/white/m6.jpg"];

function begin() {
    hideShow(q2, main);
    genLevel();
}

function genLevel(){
    // Reset current level
    category1.innerHTML = "";
    category2.innerHTML = "";
    images.innerHTML = "";

    // Random categories
    let rightSide = Math.floor(Math.random() * 2);
    if (rightSide == 0) {
        category1.innerHTML += getWhiteCategory();
        category2.innerHTML += getBlackCategory();
    } else {
        category1.innerHTML += getBlackCategory();
        category2.innerHTML += getWhiteCategory();
    }

    // Random images
    let harmlessChosen = [];
    let weaponsChosen = [];
    for (let i = 0; i < 6; i++) {
        let weapon = Math.floor(Math.random() * 2);
        if (weapon == 1) {
            let randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
            while (inList(randomWeapon, weaponsChosen)) {
                randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
            }
            weaponsChosen.push(randomWeapon);
            
            weaponsChosen.push(randomWeapon);
            images.innerHTML += '<img class="uk-margin uk-width-1-2" src="'+ randomWeapon +'">';
        } else {
            let randomHarmless = harmless[Math.floor(Math.random() * harmless.length)];
            while (inList(randomHarmless, harmlessChosen)) {
                randomHarmless = harmless[Math.floor(Math.random() * harmless.length)];
            }
            harmlessChosen.push(randomHarmless);

            images.innerHTML += '<img class="uk-margin uk-width-1-2" src="'+ randomHarmless +'">';
        }
    }
}

function isComplete() {
    if (images.innerHTML == "") {
        genLevel();
    }
};

function inList(el, list) {
    if (list.length != 0) {
        for (i in list) {
            if (el == list[i]) {
                return true;
            }
        }
    }
    
    return false;
}

function getWhiteCategory() {
    let toAppend = "";
    let randomWhite = white[Math.floor(Math.random() * white.length)];

    if (race == "white") {
        toAppend = '<img class="uk-margin uk-align-center" src="'+ randomWhite +'">'
            + '<h4 class="uk-text-center">Harmless</h4>'
            + '<div uk-sortable="group: sortable-group">'
            + '</div>';
    } else {
        toAppend = '<img class="uk-margin uk-align-center" src="'+ randomWhite +'">'
            + '<h4 class="uk-text-center">Weapons</h4>'
            + '<div uk-sortable="group: sortable-group">'
            + '</div>';
    }

    return toAppend;
}

function getBlackCategory() {
    let toAppend = "";
    let randomBlack = black[Math.floor(Math.random() * black.length)];

    if (race == "white") {
        toAppend = '<img class="uk-margin uk-align-center" src="'+ randomBlack +'">'
            + '<h4 class="uk-text-center">Weapons</h4>'
            + '<div uk-sortable="group: sortable-group">'
            + '</div>';
    } else {
        toAppend = '<img class="uk-margin uk-align-center" src="'+ randomBlack +'">'
            + '<h4 class="uk-text-center">Harmless</h4>'
            + '<div uk-sortable="group: sortable-group">'
            + '</div>';
    }

    return toAppend;
}

function nextSection() {
    switch (section) {
        case 0:
            hideShow(q1, q2);
            section++;
            break;
        case 1:
            UIkit.modal(info).show();
            genLevel();
        default:
            break;
    }
}

function setWhite() {
    race = "white";
    nextSection();
}

function setBlack() {
    race = "black";
    nextSection();
}

function hideShow(e1, e2) {
    e1.classList.add("uk-hidden");
    e2.classList.remove("uk-hidden");
}