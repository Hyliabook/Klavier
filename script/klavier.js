
let svgCanvas = document.querySelector("#pianoCanvas");
let svgNS = "http://www.w3.org/2000/svg";

const WHITE_WIDTH = 109;
const WHITE_HEIGHT = 332;

const BLACK_WIDTH = WHITE_WIDTH / 2;
const BLACK_HEIGHT = WHITE_HEIGHT * .6666;

const PIANO_CORNER_X = 20;
const PIANO_CORNER_Y = 20;

const NOTES = ["c","d","e","f","g","a","b","c2"];

window.onload = setup;
window.onmouseup = resetKeys;


let playedNotes = "";

let ode = false;

function setup(){

    drawPiano();

}

function drawPiano()
{
    drawWhite();
    drawBlack();
}

function drawWhite()
{
    let xPos = PIANO_CORNER_X;
    let yPos = PIANO_CORNER_Y;

    for(let x=0;x<8;x++)
    {
        let key = document.createElementNS(svgNS, "rect");

        key.setAttributeNS(null, "x", xPos.toString());
        key.setAttributeNS(null, "y", yPos.toString());
        key.setAttributeNS(null, "width", (WHITE_WIDTH / ((x == 7) ? 2 : 1)).toString());
        key.setAttributeNS(null, "height", WHITE_HEIGHT.toString());
        key.setAttributeNS(null, "fill", "url(#whiteGrad)");
        key.setAttributeNS(null, "stroke", "black");
        key.setAttributeNS(null, "note", NOTES[x]);
        key.setAttributeNS(null, "class", "white");

        key.onmousedown = clickKey;

        svgCanvas.appendChild(key);

        xPos += WHITE_WIDTH;
    }

}

function drawBlack()
{
    let xPos = PIANO_CORNER_X - WHITE_WIDTH/4;
    let yPos = PIANO_CORNER_Y;
    
    for(let x=0;x<8;x++)
    {
        if(x!=0 && x!=3 && x!=7)
        {
            let key = document.createElementNS(svgNS, "rect");

        key.setAttributeNS(null, "x", xPos.toString());
        key.setAttributeNS(null, "y", yPos.toString());
        key.setAttributeNS(null, "width", (BLACK_WIDTH.toString()));
        key.setAttributeNS(null, "height", BLACK_HEIGHT.toString());
        key.setAttributeNS(null, "fill", "url(#blackGrad)");
        key.setAttributeNS(null, "stroke", "black");
        key.setAttributeNS(null, "note", NOTES[x-1] + "s");
        key.setAttributeNS(null, "class", "black");

        key.onmousedown = clickKey;

        svgCanvas.appendChild(key);

        }

        xPos += WHITE_WIDTH;
    }

}

function clickKey(e)
{

    let note = e.target.getAttributeNS(null,"note");
    let keyColor = e.target.getAttributeNS(null,"class");
    playKey(note);

    e.target.setAttributeNS(null,"fill","url(#" + keyColor + "Grad_pressed)");

    playedNotes += (" " + note);
    
}

function playKey(note)
{
    let playedKey = new Audio("./assets/sound/" + note + ".wav");
    playedKey.play();
}

function resetKeys(e)
{
    let whiteKeys = document.querySelectorAll(".white");

    for(let x=0;x<whiteKeys.length;x++)
        whiteKeys[x].setAttributeNS(null,"fill","url(#whiteGrad)");

    let blackKeys = document.querySelectorAll(".black");

    for(let x=0;x<blackKeys.length;x++)
        blackKeys[x].setAttributeNS(null,"fill", "url(#blackGrad)");

        checkSolution();
}

function checkSolution()
{
    if(playedNotes.includes("e b gs a a gs a gs fs e e b gs a a b c2 b as a g f"))
        todokete();
    

    if(playedNotes.includes("e e f g g f e d c c d e e d d"))
        elysium();

    if(playedNotes.includes("c c d e e d d") && ode)
    {
        window.location = "https://docs.google.com/document/d/1LJbxkGU1DxQ9MZHp8s0z7-iSOpkOzzBMKS8pjxrgNqc/edit?usp=sharing";
    }
    
}

function todokete()
{
    let snow = new Audio("./assets/sound/s.wav");
    snow.play();
    playedNotes = "";

    svgCanvas.setAttributeNS(null,"style","background-color: rgba(255, 94, 0, 0.938);")
    
    let snowInfoTxt = ["SNOW HALATION",
                       "COMPOSED BY: Yamada Takahiro",  
                       "WRITTEN BY: Hata Aki",
                       "ARRANGED BY: Nakanishi Ryousuke",
                       "PIANO ARRANGEMENT BY: Animenz",
                       "PERFORMED BY: Mu\'s<br>",
                       "RELEASE DATE: 12/22/2010<br>",
                       "LENGTH: 4:20"];

    let xPos = PIANO_CORNER_X;
    let yPos = PIANO_CORNER_Y + WHITE_HEIGHT + 50;
    let yshift = 40;

    for(let x=0;x<snowInfoTxt.length;x++)
    {
        let snowInfo = document.createElementNS(svgNS, "text");
        snowInfo.innerHTML = snowInfoTxt[x];
        snowInfo.setAttributeNS(null,"x", xPos.toString());
        snowInfo.setAttributeNS(null,"y",yPos.toString());
        snowInfo.setAttributeNS(null,"id", "snowText");

        if(x == snowInfoTxt.length - 1)
        snowInfo.setAttributeNS(null,"id","blaze");

        console.log(snowInfo);
        svgCanvas.appendChild(snowInfo);

        yPos += yshift;
    }

   
                       
   
}

function elysium()
{
    let joy = new Audio("./assets/sound/o.wav");
    joy.play();
    joy.loop = true;

    playedNotes = "";

    ode = true;

    let ger = [
        "Freude, schöner Götterfunken,",
        "Tochter aus Elysium",
        "Wir betreten feuertrunken,",
        "Himmlische, dein Heiligtum!",
        "Deine Zauber binden wieder",
        "Was die Mode streng geteilt",
        "Alle Menschen werden Brüder",
        "Wo dein sanfter Flügel weilt",
        "",
        "Deine Zauber binden wieder",
        "Was die Mode streng geteilt",
        "Alle Menschen werden Brüder",
        "Wo dein sanfter Flügel weilt"
    ];

    let eng = [
        "Joy, beautiful spark of the Gods,",
        "Daughter of Elysium",
        "We enter, drunken with fire",
        "Holy one, thy sanctuary!",
        "Your magic binds, ",
        "What the sword of custom had strictly divided!",
        "All Men will become brothers,",
        "Where your gentle Wing abides!",
        "",
        "Your magic binds, ",
        "What the sword of custom had strictly divided!",
        "All Men will become brothers,",
        "Where your gentle Wing abides!"
    ]

    let xPos = PIANO_CORNER_X;
    let yPos = PIANO_CORNER_Y + WHITE_HEIGHT+ 40;

    let leading = 50;

    for(let x=0;x<ger.length;x++)
    {
        let gerText = document.createElementNS(svgNS, "text");

        gerText.setAttributeNS(null, "id", "odeTextGer");
        gerText.setAttributeNS(null, "x", xPos.toString());
        gerText.setAttributeNS(null, "y", yPos.toString());
        gerText.innerHTML = ger[x];

        svgCanvas.appendChild(gerText);

        yPos += leading;
    }

    yPos = (PIANO_CORNER_Y + 40 + WHITE_HEIGHT)+20;

    for(let x=0;x<eng.length;x++)
    {
        let engText = document.createElementNS(svgNS, "text");

        engText.setAttributeNS(null, "id", "odeTextEng");
        engText.setAttributeNS(null, "x", xPos.toString());
        engText.setAttributeNS(null, "y", yPos.toString());
        engText.innerHTML = eng[x];

        svgCanvas.appendChild(engText);

        yPos += leading;
    }
}
class Point
{

    constructor(xPar,yPar)
    {
        this.x = xPar;
        this.y = yPar;
    }

    shift(amountX, amountY) {

        this.x += amountX;
        this.y += amountY;
        
    }
}
