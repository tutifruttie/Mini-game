console.log("werkt dit?")

const karakter = document.querySelector(".karakter")
const etenBtn = document.getElementById("eten")
const slapenBtn = document.getElementById("slapen")
const raveBtn = document.getElementById("rave")
const energieMeter = document.getElementById("energie")
const rustMeter = document.getElementById("rust")
const statustekst = document.getElementById("status")
const etenObject = document.getElementById("eten-object")
const levelTekst = document.getElementById("level")
const raveAudio = document.getElementById("rave-audio")
const mond = document.querySelector(".mond")

let etenClicks = 0;
const maxEtenClicks = 5;
let etenTimer;
const etenTimeLimit = 10000;

let slapenClicks = 0;
let raveClicks = 0;
const maxClicks = 5;

// toont het eten object en maakt het klikbaar
etenObject.textContent = "🍏";

// hoeveel meter per appel
const energiePerAppel = energieMeter.max / maxEtenClicks;

function setWitTekst(actief) {
    if (actief) {
        document.body.classList.add("wit-tekst");
    } else {
        document.body.classList.remove("wit-tekst");
    }
}

// Plaatst eten object willekeurig
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://stackoverflow.com/questions/20274606/how-to-place-several-elements-randomly-on-page
function plaatsEtenObject() {
    const width = window.innerWidth - 50
    const height = window.innerHeight - 50

    const randomX = Math.floor(Math.random() * width)
    const randomY = Math.floor(Math.random() * height)

    etenObject.style.left = randomX + "px"
    etenObject.style.top = randomY + "px"
    etenObject.style.display = "block"
}  
//https://www.w3schools.com/jsref/jsref_min.asp
//https://www.w3schools.com/jsref/jsref_parsefloat.asp
etenObject.onclick = () => {
    etenClicks++;
    energieMeter.value = Math.min(energieMeter.max, parseFloat(energieMeter.value) + energiePerAppel)

statustekst.textContent = "Eten (" + etenClicks + "/" + maxEtenClicks + ")"

    if (etenClicks < maxEtenClicks) {
        plaatsEtenObject();
    } else {
        clearTimeout(etenTimer);
        statustekst.textContent = "Eten voltooid!"
        etenObject.style.display = "none"

        levelTekst.textContent = "Level 2"

        // automatisch naar slapen scherm
        gaNaarSlapenScherm()
    }

}
//start de timer voor het eten spel//
function startEtenTimer() {
    etenClicks = 0
    energieMeter.value = 0
    setWitTekst(false);
    plaatsEtenObject();

    etenTimer = setTimeout(() => {
        etenObject.style.display = "none"

        document.body.style.backgroundColor = "black"
        document.body.style.backgroundImage = "none"
        karakter.style.display = "none"

        statustekst.textContent = "GAME OVER"
        setWitTekst(true)

        energieMeter.value = 0

        disableButtons()
    }, etenTimeLimit)
}

function gaNaarSlapenScherm() {
    clearTimeout(etenTimer)
    etenObject.style.display = "none"

    document.body.style.backgroundImage = "url('https://static.vecteezy.com/ti/gratis-vector/p1/16826327-vol-maan-en-sterrenhemel-achtergrond-mooi-blauw-nacht-lucht-met-maan-illustratie-vector.jpg')";
    document.body.style.backgroundColor = "black"
    karakter.style.display = "block"
    karakter.classList.add("sleep")
    karakter.classList.remove("groei","rave")

    setWitTekst(true)
    statustekst.textContent = "Je bent moe, ga slapen"
}

function gaNaarRaveScherm() {
    document.body.style.backgroundImage = "url('https://static.vecteezy.com/ti/gratis-vector/p1/2653091-abstract-blauw-paars-gloeiend-halftoon-glitter-effect-met-dot-radiaal-patroon-en-gloeiende-lichten-op-donkere-achtergrond-modern-futuristisch-technologie-concept-vector.jpg')";
    karakter.classList.add("rave")
    karakter.classList.remove("sleep","groei")

    setWitTekst(true);
    statustekst.textContent = "RAVE MODE!"
    levelTekst.textContent = "Level 3"
}

// Buttons tijdelijk uitschakelen
//https://coreui.io/blog/how-to-disable-a-button-in-javascript/
function disableButtons() {
    etenBtn.disabled = true
    slapenBtn.disabled = true
    raveBtn.disabled = true
}

etenBtn.onclick = function() {
    document.body.style.backgroundImage = "url('https://static.vecteezy.com/ti/gratis-vector/p1/1750807-lichtgroene-achtergrond-in-veelhoekige-stijl-vector.jpg')";
    karakter.classList.add("groei")
    karakter.classList.remove("sleep","rave")

    setWitTekst(false)
    startEtenTimer()

    levelTekst.textContent = "Level 1"
    raveAudio.pause()
    raveAudio.currentTime = 0
}

slapenBtn.onclick = function() {
    if (etenClicks < maxEtenClicks) {
        statustekst.textContent = "Je moet eerst eten voltooien!"
        return
    }
    document.body.style.backgroundImage = "url('https://static.vecteezy.com/ti/gratis-vector/p1/16826327-vol-maan-en-sterrenhemel-achtergrond-mooi-blauw-nacht-lucht-met-maan-illustratie-vector.jpg')";
    karakter.classList.add("sleep")
    karakter.classList.remove("groei","rave")

    if (slapenClicks < maxClicks) {
        rustMeter.value = parseInt(rustMeter.value) + 1
        slapenClicks++
        statustekst.textContent = "Slapen... (" + slapenClicks + "/" + maxClicks + ")"
        levelTekst.textContent = "Level 2"
    }

    if (slapenClicks === maxClicks) {
        statustekst.textContent = "Slaap klaar!"
        setWitTekst(true)
        slapenBtn.disabled = true

        // Gaat automatisch naar scherm 3
        gaNaarRaveScherm()
    }
    raveAudio.pause()
    raveAudio.currentTime = 0
}

raveBtn.onclick = function() {
    if (etenClicks < maxEtenClicks || slapenClicks < maxClicks) {
        statustekst.textContent = "Je moet eerst eten en slapen voltooien!"
        return
    }

    document.body.style.backgroundImage = "url('https://static.vecteezy.com/ti/gratis-vector/p1/2653091-abstract-blauw-paars-gloeiend-halftoon-glitter-effect-met-dot-radiaal-patroon-en-gloeiende-lichten-op-donkere-achtergrond-modern-futuristisch-technologie-concept-vector.jpg')";
    
    karakter.classList.add("rave")
    karakter.classList.remove("groei","sleep")

    setWitTekst(true)
    statustekst.textContent = "RAVE MODE 🎧"

    levelTekst.textContent = "level 3"

    //  muziek starten
    const raveAudio = document.getElementById("rave-audio")
    raveAudio.play()
    raveAudio.currentTime = 0
}
