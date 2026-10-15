/*
 * Little Look — Baby Contrast Cards
 * ------------------------------------------------------------
 * Beginner guide:
 * 1. CARD DATA lives near the top of this file.
 * 2. renderCard() draws the selected card and updates its counter.
 * 3. moveCard() handles Back, Next, and horizontal swipe navigation.
 * 4. toggleCardSide() shows the card's reverse side.
 * 5. Sound effects are generated in the browser; no audio files or
 *    microphone permission are needed.
 *
 * To add a baby pattern, edit BABY_PATTERN_NAMES and drawContrastDesign().
 * To change the baby picture cards, edit BABY_EMOJIS and their names.
 * To add toddler letters or numbers, edit makeToddlerCards().
 * Interface translations belong in LANGUAGE_TEXT.
 */

"use strict";

/* Keep future translations in one place instead of scattering text
   throughout the code. English is the first supported language. */
const LANGUAGE_TEXT = {
  en: {
    babyCollection: "20 bold patterns + 20 high-contrast emoji cards",
    toddlerCollection: "A–Z + numbers 0–20",
    babyKicker: "THE FIRST COLLECTION",
    toddlerKicker: "GROWING TOGETHER",
    mute: "Mute",
    unmute: "Sound on"
  }
};
const language = LANGUAGE_TEXT.en;

/* The active infant collection is intentionally defined immediately below. */

/* Baby Mode is a focused 40-card collection: 20 distinct patterns, then 20 emoji cards. */
const BABY_PATTERN_NAMES = [
  ["Hypnotic rings","Nested circles pull the eye toward the center."],
  ["Checkerboard","Crisp black and white squares with red accents."],
  ["Double spirals","Two bold spirals curl in opposite directions."],
  ["Velvet waves","Flowing parallel waves ripple across the card."],
  ["Harlequin diamonds","Large diamonds alternate like a striking quilt."],
  ["Red sunburst","Sharp rays burst from a bold central circle."],
  ["Chessboard maze","A winding grid of black, white and red blocks."],
  ["Orbiting dots","Oversized dots travel along curved orbital paths."],
  ["Zigzag lightning","Angular chevrons march across the card."],
  ["Archway","Nested arches create a tunnel-like rhythm."],
  ["Concentric squares","Square frames repeat inward with red highlights."],
  ["Spiral staircase","Rotated bars form a graphic turning staircase."],
  ["Woven lattice","Crossing ribbons form a chunky woven pattern."],
  ["Polka-dot field","Bold circles in three sizes form a playful field."],
  ["Scalloped waves","Repeated scallops create a soft, rhythmic edge."],
  ["Target rings","Offset target rings make a dramatic bullseye."],
  ["Triangle tessellation","Alternating triangles create a faceted mosaic."],
  ["Checker spiral","A spiral path is built from alternating tiles."],
  ["Half-moon rhythm","Large crescents and circles alternate in bands."],
  ["Kaleidoscope","Mirrored geometric petals create a bold rosette."]
];
const BABY_EMOJIS = ["❤️","🤍","🖤","🔴","⚪","⚫","♥️","♦️","♠️","🐶","🐱","🐰","🐻","🌹","🍎","🍒","🍓","🐞","🐼","🦓"];
const BABY_CARDS = [
  ...BABY_PATTERN_NAMES.map(([name,description],index)=>({name,description,type:"pattern",art:"contrast",designIndex:index,group:"Baby Patterns"})),
  ...BABY_EMOJIS.map((emoji,index)=>({
    name:["Red heart","White heart","Black heart","Red circle","White circle","Black circle","Heart symbol","Diamond","Spade","Puppy","Kitten","Bunny","Bear","Rose","Apple","Cherries","Strawberry","Ladybug","Panda","Zebra"][index],
    icon:emoji,emoji,description:"A bold, easy-to-see picture in a black, white and red world.",
    type:"emoji",designIndex:index,group:"Baby Emojis"
  }))
];

/* Toddler mode combines a 26-card animal alphabet with numbers 0–20.
   Keeping the card data together makes the collection easy to expand. */
function makeToddlerCards() {
  const alphabet = [
    ["A","Ant","helping an ant carry a leaf","Oswald helps an ant carry a giant leaf."],
    ["B","Bear","sharing a berry picnic","Oswald shares berries with a bear."],
    ["C","Cat","playing a tiny drum","Oswald plays a drum while a cat dances."],
    ["D","Duck","sailing a paper boat","Oswald sails a paper boat beside a duck."],
    ["E","Elephant","painting with its trunk","Oswald paints a picture with an elephant."],
    ["F","Fox","flying a kite","Oswald flies a kite with a fox."],
    ["G","Giraffe","reaching for a balloon","Oswald helps a giraffe catch a balloon."],
    ["H","Hippo","blowing bubbles","Oswald blows bubbles with a hippo."],
    ["I","Iguana","watering a tiny garden","Oswald waters a garden with an iguana."],
    ["J","Jaguar","juggling colorful balls","Oswald juggles balls with a jaguar."],
    ["K","Kangaroo","bouncing over puddles","Oswald hops over puddles with a kangaroo."],
    ["L","Lion","reading a storybook","Oswald reads a story to a little lion."],
    ["M","Monkey","climbing a tree","Oswald climbs a tree with a monkey."],
    ["N","Narwhal","finding a shiny shell","Oswald finds a shell with a narwhal."],
    ["O","Owl","looking through a telescope","Oswald and an owl look at the stars."],
    ["P","Penguin","ice skating together","Oswald ice-skates with a penguin."],
    ["Q","Quail","planting a flower","Oswald plants a flower with a quail."],
    ["R","Rabbit","painting a rainbow","Oswald paints a rainbow with a rabbit."],
    ["S","Seal","balancing a beach ball","Oswald balances a beach ball with a seal."],
    ["T","Turtle","building a block tower","Oswald builds a tower with a turtle."],
    ["U","Unicorn","following a star trail","Oswald follows a trail of stars with a unicorn."],
    ["V","Vulture","making a paper airplane","Oswald folds a paper airplane with a vulture."],
    ["W","Whale","splashing in the sea","Oswald splashes beside a happy whale."],
    ["X","X-ray fish","discovering ocean shapes","Oswald discovers ocean shapes with an x-ray fish."],
    ["Y","Yak","sledding down a hill","Oswald sleds down a hill with a yak."],
    ["Z","Zebra","dancing to music","Oswald dances with a zebra."]
  ];
  const letterCards = alphabet.map(([letter, animal, activity, description], designIndex) => ({
    name: letter,
    icon: "",
    description,
    type: "letter",
    group: "Alphabet",
    symbol: letter,
    animal,
    activity,
    designIndex
  }));

  // A number card shows the numeral and that many easy-to-count apples.
  // Zero intentionally shows an empty basket instead of an apple.
  const numberCards = Array.from({ length: 21 }, (_, number) => ({
    name: String(number),
    icon: "",
    emoji: number === 0 ? "🧺" : "🍎",
    description: number === 0
      ? "Zero means there are no apples in the basket."
      : `Let's count ${number} ${number === 1 ? "apple" : "apples"} together.`,
    type: "number",
    group: "Numbers",
    symbol: String(number),
    animal: number === 1 ? "apple" : "apples",
    activity: "counting",
    designIndex: number,
    count: number
  }));

  return [...letterCards, ...numberCards];
}

/* DOM elements are collected here once, so the rest of the code can
   use clear names instead of repeating long document queries. */
const ui = {
  flashcard: document.getElementById("flashcard"),
  cardArea: document.getElementById("card-area"),
  artwork: document.getElementById("artwork"),
  word: document.getElementById("card-word"),
  label: document.getElementById("art-label"),
  count: document.getElementById("card-count"),
  collectionTitle: document.getElementById("collection-title"),
  collectionKicker: document.getElementById("collection-kicker"),
  progress: document.getElementById("progress-bar"),
  progressLabel: document.getElementById("progress-label"),
  previous: document.getElementById("previous-button"),
  next: document.getElementById("next-button"),
  surprise: document.getElementById("surprise-button"),
  melody: document.getElementById("melody-button"),
  soundToggle: document.getElementById("sound-toggle"),
  backFace: document.getElementById("card-back"),
  backTitle: document.getElementById("card-back-title"),
  backDescription: document.getElementById("card-back-description"),
  reverseButton: document.getElementById("reverse-button"),
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  playStyleButtons: [...document.querySelectorAll("[data-play-style]")],
  aboutDialog: document.getElementById("about-dialog")
};
const toddlerCards = makeToddlerCards();
let currentMode = "baby";
let playStyle = "play";
let watchTimer = null;
let currentCards = BABY_CARDS;
let currentIndex = 0;
let soundsEnabled = true;
let audioContext = null;
/* Return the AudioContext only after a real user action. This respects
   browsers that block sound until a tap or click. */
function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

/* A short, soft tone used for card navigation. */
function playTone(frequency = 660, duration = 0.11, volume = 0.035, wave = "sine") {
  if (!soundsEnabled) return;
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.02);
}

/* Radio player: direct streams play in the app; station pages get an in-app
   player frame plus a reliable open-station fallback if embedding is blocked. */
const RADIO_STATIONS = [
  {name:"KUSC Classical",subtitle:"Classical music · Los Angeles",url:"https://radiostationsusa.com/california/los-angeles/kusc-los-angeles/",stream:"https://playerservices.streamtheworld.com/api/livestream-redirect/KUSCMP128_SC",kind:"audio",art:"𝄞"},
  {name:"Disney Resorts Radio",subtitle:"Disney classics · iHeart",url:"https://www.iheart.com/live/disney-resorts-radio-9414",kind:"page",art:"✦"},
  {name:"CoComelon",subtitle:"Songs for little ones · iHeart",url:"https://www.iheart.com/artist/cocomelon-33660833",kind:"page",art:"♫"},
  {name:"YouTube music 1",subtitle:"Video 1 · YouTube",url:"https://youtu.be/f5a79JY1wlw",embedUrl:"https://www.youtube-nocookie.com/embed/f5a79JY1wlw?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 2",subtitle:"Video 2 · YouTube",url:"https://youtu.be/sfoEjiH91TE",embedUrl:"https://www.youtube-nocookie.com/embed/sfoEjiH91TE?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 3",subtitle:"Video 3 · YouTube",url:"https://youtu.be/PgyK0roqBSw",embedUrl:"https://www.youtube-nocookie.com/embed/PgyK0roqBSw?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 4",subtitle:"Video 4 · YouTube",url:"https://youtu.be/liWQdYS1hRk",embedUrl:"https://www.youtube-nocookie.com/embed/liWQdYS1hRk?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 5",subtitle:"Video 5 · YouTube",url:"https://youtu.be/hMg80RmpmJc",embedUrl:"https://www.youtube-nocookie.com/embed/hMg80RmpmJc?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 6",subtitle:"Video 6 · YouTube",url:"https://youtu.be/zAFAr2bRn1g",embedUrl:"https://www.youtube-nocookie.com/embed/zAFAr2bRn1g?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"},
  {name:"YouTube music 7",subtitle:"Video 7 · YouTube",url:"https://youtu.be/4owTdwvbyNA",embedUrl:"https://www.youtube-nocookie.com/embed/4owTdwvbyNA?autoplay=1&playsinline=1&rel=0",kind:"youtube",art:"♫"}
];
let selectedRadioIndex=0;
let radioIsPlaying=false;
const radioAudio=document.getElementById("radio-audio");
const radioFrame=document.getElementById("radio-frame");
function updateRadioUI() {
  const station = RADIO_STATIONS[selectedRadioIndex];
  const radioStatus = document.getElementById("radio-status");
  const radioPlayButton = document.getElementById("radio-play");
  const melodyButton = ui.melody;

  document.getElementById("radio-station-name").textContent = station.name;
  document.getElementById("radio-station-subtitle").textContent = station.subtitle;
  document.getElementById("radio-station-art").textContent = station.art;
  radioStatus.textContent = radioIsPlaying ? "Playing · " + station.name : "Ready to listen";

  // Keep both music controls in sync for people using touch, sight, or assistive tech.
  radioPlayButton.textContent = radioIsPlaying ? "Pause" : "Play";
  radioPlayButton.setAttribute(
    "aria-label",
    radioIsPlaying ? "Pause " + station.name : "Play " + station.name
  );
  melodyButton.setAttribute("aria-pressed", String(radioIsPlaying));
  melodyButton.setAttribute("aria-label", radioIsPlaying ? "Stop music" : "Play music");
  melodyButton.title = radioIsPlaying ? "Stop music" : "Play music";

  document.getElementById("radio-open").href = station.url;
  document.getElementById("radio-open").textContent =
    station.kind === "youtube"
      ? "Open on YouTube"
      : station.kind === "audio"
        ? "Open station website"
        : "Open full station player";
  document.getElementById("radio-volume-wrap").hidden = station.kind === "youtube";
  document.getElementById("radio-station").value = String(selectedRadioIndex);
  document.getElementById("radio-station-art").classList.toggle("radio-playing", radioIsPlaying);
}
function stopRadio(){
  radioAudio.pause();radioAudio.removeAttribute("src");radioAudio.load();
  radioFrame.src="about:blank";radioFrame.hidden=true;
  radioIsPlaying=false;updateRadioUI();
}
async function playRadio(){
  const station=RADIO_STATIONS[selectedRadioIndex];
  if(station.kind==="audio"){
    radioFrame.src="about:blank";radioFrame.hidden=true;
    radioAudio.src=station.stream;radioAudio.volume=Number(document.getElementById("radio-volume").value)/100;
    try{await radioAudio.play();radioIsPlaying=true;updateRadioUI();}
    catch(error){radioIsPlaying=false;updateRadioUI();document.getElementById("radio-status").textContent="Tap Open station website if playback is blocked";}
  }else{
    radioAudio.pause();radioAudio.removeAttribute("src");radioAudio.load();
    radioFrame.hidden=false;radioFrame.src=station.kind==="youtube"?station.embedUrl:station.url;
    radioIsPlaying=true;updateRadioUI();
    document.getElementById("radio-status").textContent=station.kind==="youtube"?"YouTube video loaded below · use its player controls":"Station player opened below · use Open full station player if needed";
  }
}
function chooseRadioStation(value){
  stopRadio();selectedRadioIndex=Number(value)||0;updateRadioUI();
}
function skipRadioStation(){
  const next=(selectedRadioIndex+1)%RADIO_STATIONS.length;
  chooseRadioStation(next);playRadio();
}
/* Twenty intentionally different hand-designed vector compositions. */
function drawContrastDesign(index) {
  const ns="http://www.w3.org/2000/svg",svg=document.createElementNS(ns,"svg");
  svg.setAttribute("viewBox","0 0 400 400");svg.setAttribute("role","img");
  svg.setAttribute("aria-label",BABY_PATTERN_NAMES[index]?.[0]||"High contrast pattern");
  const add=(tag,attrs)=>{const node=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,value));svg.appendChild(node);return node;};
  const black="#050505",white="#ffffff",red="#ed1028",colors=[black,white,red];
  add("rect",{x:0,y:0,width:400,height:400,fill:black});
  if(index===0){for(let r=194,n=0;r>8;r-=18,n++)add("circle",{cx:200,cy:200,r,fill:colors[n%3]});}
  else if(index===1){for(let y=0;y<400;y+=50)for(let x=0;x<400;x+=50)add("rect",{x,y,width:50,height:50,fill:(x/50+y/50)%2?white:black});add("path",{d:"M-20 320 L320 -20 L420 80 L80 420 Z",fill:red});}
  else if(index===2){for(let side=0;side<2;side++){let d="";for(let t=0;t<=Math.PI*7;t+=.09){const r=4+t*7.6,a=(side?Math.PI:0)+t,x=200+Math.cos(a)*r,y=200+Math.sin(a)*r;d+=(t===0?"M":" L")+x.toFixed(1)+" "+y.toFixed(1);}add("path",{d,fill:"none",stroke:side?red:white,"stroke-width":11,"stroke-linecap":"round"});}}
  else if(index===3){for(let row=0;row<12;row++){let d="M-5 "+(row*38);for(let x=0;x<=410;x+=5)d+=" L"+x+" "+(row*38+19*Math.sin(x/25+row*.7));add("path",{d,fill:"none",stroke:row%3===0?red:row%2?white:black,"stroke-width":10});}}
  else if(index===4){for(let y=-100;y<500;y+=100)for(let x=-100;x<500;x+=100)add("polygon",{points:(x+50)+","+y+" "+(x+100)+","+(y+50)+" "+(x+50)+","+(y+100)+" "+x+","+(y+50),fill:Math.abs((x+y)/100)%3===0?red:Math.abs((x+y)/100)%2?white:black,stroke:black,"stroke-width":5});}
  else if(index===5){for(let n=0;n<32;n++){const a=n*Math.PI/16,b=(n+.72)*Math.PI/16;add("path",{d:"M200 200 L"+(200+Math.cos(a)*290)+" "+(200+Math.sin(a)*290)+" L"+(200+Math.cos(b)*290)+" "+(200+Math.sin(b)*290)+" Z",fill:n%4===0?red:n%2?white:black});}add("circle",{cx:200,cy:200,r:58,fill:red,stroke:white,"stroke-width":12});}
  else if(index===6){for(let y=0;y<400;y+=40)for(let x=0;x<400;x+=40){const n=x/40+y/40;add("rect",{x,y,width:40,height:40,fill:n%2?white:black});if((x+y)%120===0)add("rect",{x:x+10,y:y+10,width:20,height:20,fill:red});}add("path",{d:"M20 20 H180 V100 H100 V260 H300 V180 H380",fill:"none",stroke:red,"stroke-width":15});}
  else if(index===7){add("circle",{cx:200,cy:200,r:115,fill:"none",stroke:white,"stroke-width":8});add("ellipse",{cx:200,cy:200,rx:175,ry:70,fill:"none",stroke:red,"stroke-width":9,transform:"rotate(-35 200 200)"});add("ellipse",{cx:200,cy:200,rx:175,ry:70,fill:"none",stroke:white,"stroke-width":7,transform:"rotate(55 200 200)"});[[200,85,23,red],[85,200,18,white],[315,200,25,red],[200,315,21,white],[75,105,15,red],[320,300,16,white]].forEach(([cx,cy,r,fill])=>add("circle",{cx,cy,r,fill}));}
  else if(index===8){for(let row=0;row<7;row++){const y=row*65-20;add("path",{d:"M-20 "+y+" L80 "+(y+45)+" L180 "+y+" L280 "+(y+45)+" L420 "+(y-5),fill:"none",stroke:row%3===0?red:white,"stroke-width":25,"stroke-linejoin":"miter"});}}
  else if(index===9){for(let n=0;n<9;n++){const w=390-n*42,top=35+n*19;add("path",{d:"M"+(200-w/2)+" 410 V"+(top+w/2)+" A"+(w/2)+" "+(w/2)+" 0 0 1 "+(200+w/2)+" "+(top+w/2)+" V410",fill:"none",stroke:n%3===0?red:n%2?white:black,"stroke-width":13});}}
  else if(index===10){for(let n=0;n<12;n++){const s=390-n*31;add("rect",{x:(400-s)/2,y:(400-s)/2,width:s,height:s,fill:"none",stroke:n%4===0?red:n%2?white:black,"stroke-width":12});}}
  else if(index===11){for(let n=0;n<13;n++){const s=360-n*25;add("rect",{x:(400-s)/2,y:(400-s)/2,width:s,height:18,fill:n%3===0?red:white,transform:"rotate("+(n*11)+" 200 200)"});}add("circle",{cx:200,cy:200,r:36,fill:black,stroke:red,"stroke-width":12});}
  else if(index===12){for(let n=-5;n<15;n++){const p=n*42;add("path",{d:"M"+p+" -20 L"+(p+420)+" 420",stroke:n%3===0?red:white,"stroke-width":22});add("path",{d:"M-20 "+p+" L420 "+(p+420),stroke:n%2?black:red,"stroke-width":12});}}
  else if(index===13){for(let y=35,row=0;y<420;y+=90,row++)for(let x=35+(row%2)*40;x<420;x+=90){const r=(row+Math.round(x/90))%4===0?33:22;add("circle",{cx:x,cy:y,r,fill:(row+Math.round(x/90))%3===0?red:white,stroke:black,"stroke-width":5});}}
  else if(index===14){for(let row=0;row<8;row++){let d="M-50 "+(row*55+25);for(let x=-50;x<=450;x+=50)d+=" Q"+(x+25)+" "+(row*55-15)+" "+(x+50)+" "+(row*55+25);add("path",{d,fill:"none",stroke:row%3===0?red:white,"stroke-width":14});}}
  else if(index===15){[[155,165],[270,245]].forEach(([cx,cy],j)=>{for(let n=0;n<7;n++)add("circle",{cx,cy,r:190-n*25,fill:(n+j)%3===0?red:(n+j)%2?white:black});});}
  else if(index===16){for(let y=0;y<400;y+=50)for(let x=0;x<400;x+=50){const flip=((x/50+y/50)%2)===0;add("polygon",{points:flip?x+","+(y+50)+" "+(x+25)+","+y+" "+(x+50)+","+(y+50):x+","+y+" "+(x+50)+","+y+" "+(x+25)+","+(y+50),fill:(x/50+y/50)%3===0?red:(x/50)%2?white:black,stroke:white,"stroke-width":2});}}
  else if(index===17){for(let y=0;y<400;y+=25)for(let x=0;x<400;x+=25){const dx=x+12.5-200,dy=y+12.5-200,angle=Math.atan2(dy,dx),radius=Math.hypot(dx,dy),phase=Math.floor((angle+Math.PI)*2+radius/22);if(phase%3!==0)add("rect",{x,y,width:23,height:23,fill:phase%2?white:red});}}
  else if(index===18){for(let row=0;row<7;row++)for(let col=0;col<5;col++){const cx=col*100+50,cy=row*65+30;add("circle",{cx,cy,r:33,fill:(row+col)%3===0?red:white});add("circle",{cx:cx+17,cy:cy-6,r:30,fill:black});}for(let y=15;y<400;y+=130)add("path",{d:"M0 "+y+" Q200 "+(y+95)+" 400 "+y,fill:"none",stroke:white,"stroke-width":7});}
  else {for(let n=0;n<16;n++){const a=n*Math.PI/8;add("ellipse",{cx:200+Math.cos(a)*78,cy:200+Math.sin(a)*78,rx:82,ry:26,fill:n%3===0?red:white,stroke:black,"stroke-width":4,transform:"rotate("+(n*22.5)+" "+(200+Math.cos(a)*78)+" "+(200+Math.sin(a)*78)+")"});}add("circle",{cx:200,cy:200,r:48,fill:red,stroke:white,"stroke-width":10});}
  return svg;
}

/* Original animal portraits use bold vector shapes for infant viewing. */
/* Toddler cards get a bold, chunky letter plus a hand-drawn vector
   companion. The letter remains the main event; the little illustration
   makes each card feel like a tiny picture-book page. */
/* Draw a distinct storybook scene for each letter. The Oswald-inspired
   rabbit keeps a recognizable silhouette while the animal, prop, and pose
   change from card to card. The optional color treatment is for toddler mode. */
function drawToddlerArt(card, colored = false) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", card.name + " — Oswald " + card.activity + " with a " + card.animal);
  const add = (tag, attrs) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    svg.appendChild(node); return node;
  };
  const ink = "#111111", paper = "#ffffff";
  const palette = ["#ef3340","#f4c542","#55b7a7","#7298e8","#d889c2","#f28c45"];
  const color = palette[card.designIndex % palette.length];
  const accent = colored ? color : "#ed1028";
  add("rect",{x:0,y:0,width:400,height:400,rx:28,fill:colored?"#fff2d8":"#fffdf8"});
  add("text",{x:28,y:155,"font-family":"Trebuchet MS,Arial,sans-serif","font-size":154,"font-weight":1000,fill:colored?color:ink,stroke:colored?"#fff2d8":"#fffdf8","stroke-width":2,"paint-order":"stroke"}).textContent = card.name;
  add("path",{d:"M18 345 Q110 329 205 344 T390 340",fill:"none",stroke:colored?"#b9d9a2":"#d8d8d2","stroke-width":7,"stroke-linecap":"round"});
  const cx=265, cy=245, ax=110, ay=291, prop=card.designIndex%8;
  // Each letter gets its own story prop: leaf, berry, drum, boat, paint, kite, and more.
  if(prop===0){add("path",{d:"M176 215 Q212 177 244 218 Q210 245 176 215Z",fill:colored?"#67a85d":paper,stroke:ink,"stroke-width":5});add("path",{d:"M178 216 L237 238",stroke:ink,"stroke-width":4});}
  if(prop===1){add("circle",{cx:210,cy:194,r:20,fill:accent,stroke:ink,"stroke-width":5});add("circle",{cx:224,cy:182,r:6,fill:paper});}
  if(prop===2){add("ellipse",{cx:215,cy:220,rx:26,ry:14,fill:colored?"#e3a34f":paper,stroke:ink,"stroke-width":5});add("path",{d:"M190 220 H240",stroke:ink,"stroke-width":4});}
  if(prop===3){add("path",{d:"M180 192 L222 218 L180 244Z",fill:accent,stroke:ink,"stroke-width":5});add("path",{d:"M180 192 V244",stroke:ink,"stroke-width":4});}
  if(prop===4){add("rect",{x:190,y:200,width:42,height:35,rx:5,fill:colored?"#f4c542":paper,stroke:ink,"stroke-width":5});add("path",{d:"M211 200 V235 M190 217 H232",stroke:ink,"stroke-width":4});}
  if(prop===5){add("path",{d:"M190 220 Q210 190 230 220 Q210 250 190 220Z",fill:accent,stroke:ink,"stroke-width":5});}
  if(prop===6){add("circle",{cx:212,cy:218,r:22,fill:colored?"#78bde7":paper,stroke:ink,"stroke-width":5});add("circle",{cx:204,cy:211,r:5,fill:ink});add("circle",{cx:220,cy:211,r:5,fill:ink});}
  if(prop===7){add("path",{d:"M190 235 L205 195 L220 235 L235 195",fill:"none",stroke:accent,"stroke-width":8,"stroke-linecap":"round","stroke-linejoin":"round"});}
  // Long ears, black body, white face and gloves keep the rabbit recognizable.
  const lean=(card.designIndex%3-1)*8;
  add("ellipse",{cx:cx-15,cy:cy+58,rx:39,ry:49,fill:ink});
  add("path",{d:`M${cx-20+lean} ${cy-30} Q${cx-56+lean} ${cy-118} ${cx-31+lean} ${cy-143} Q${cx-5+lean} ${cy-150} ${cx-5+lean} ${cy-35}Z`,fill:ink});
  add("path",{d:`M${cx+4-lean} ${cy-28} Q${cx+42-lean} ${cy-124} ${cx+57-lean} ${cy-112} Q${cx+72-lean} ${cy-96} ${cx+22-lean} ${cy-23}Z`,fill:ink});
  add("ellipse",{cx:cx+2,cy:cy-5,rx:43,ry:38,fill:paper,stroke:ink,"stroke-width":5});
  add("ellipse",{cx:cx-13,cy:cy-8,rx:5,ry:8,fill:ink});add("ellipse",{cx:cx+14,cy:cy-8,rx:5,ry:8,fill:ink});
  add("ellipse",{cx:cx+2,cy:cy+8,rx:7,ry:5,fill:ink});
  add("path",{d:`M${cx-8} ${cy+17} Q${cx+2} ${cy+25} ${cx+13} ${cy+16}`,fill:"none",stroke:ink,"stroke-width":3,"stroke-linecap":"round"});
  const armY=236+(card.designIndex%4)*7, leftHandY=armY-50+(card.designIndex%3)*18, rightHandY=armY-38+(card.designIndex%5)*10;
  add("path",{d:`M${cx-25} ${armY} Q${cx-65} ${armY-25} ${cx-72} ${leftHandY}`,fill:"none",stroke:ink,"stroke-width":13,"stroke-linecap":"round"});
  add("path",{d:`M${cx+22} ${armY} Q${cx+58} ${armY-12} ${cx+63} ${rightHandY}`,fill:"none",stroke:ink,"stroke-width":13,"stroke-linecap":"round"});
  add("circle",{cx:cx-73,cy:leftHandY,r:13,fill:paper,stroke:ink,"stroke-width":4});add("circle",{cx:cx+64,cy:rightHandY,r:13,fill:paper,stroke:ink,"stroke-width":4});
  add("path",{d:`M${cx-36} ${cy+86} L${cx-48} 337 M${cx+4} ${cy+88} L${cx+18} 337`,fill:"none",stroke:ink,"stroke-width":14,"stroke-linecap":"round"});
  add("ellipse",{cx:cx-54,cy:340,rx:21,ry:9,fill:ink});add("ellipse",{cx:cx+24,cy:340,rx:21,ry:9,fill:ink});
  // Draw the companion animal with a different silhouette/detail for its type.
  const a=card.animal, ac=colored?palette[(card.designIndex+2)%palette.length]:paper;
  if(a==="Ant"){
    add("circle",{cx:ax-17,cy:ay-10,r:13,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+5,cy:ay-10,r:16,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+31,cy:ay-10,r:21,fill:accent,stroke:ink,"stroke-width":4});
    add("path",{d:`M${ax-20} ${ay-26} l-10 -14 M${ax-9} ${ay-27} l3 -16 M${ax-6} ${ay+1} l-12 18 M${ax+5} ${ay+2} l-3 19 M${ax+20} ${ay+2} l12 17`,stroke:ink,"stroke-width":4,"stroke-linecap":"round"});
  } else if(["X-ray fish","Whale","Narwhal"].includes(a)){
    add("path",{d:`M${ax-42} ${ay} Q${ax} ${ay-37} ${ax+35} ${ay} Q${ax} ${ay+36} ${ax-42} ${ay}Z`,fill:ac,stroke:ink,"stroke-width":4});add("path",{d:`M${ax+30} ${ay} l24 -20 v40Z`,fill:accent,stroke:ink,"stroke-width":4});add("circle",{cx:ax-21,cy:ay-4,r:4,fill:ink});
    if(a==="Narwhal")add("path",{d:`M${ax-10} ${ay-23} l-28 -32 l38 25Z`,fill:paper,stroke:ink,"stroke-width":3});
    if(a==="Whale")add("path",{d:`M${ax-10} ${ay-25} q-15 -20 0 -25 q12 16 0 25`,fill:"none",stroke:accent,"stroke-width":4});
    if(a==="X-ray fish")add("path",{d:`M${ax-20} ${ay-15} L${ax+8} ${ay+15} M${ax-5} ${ay-20} L${ax+20} ${ay+10}`,stroke:ink,"stroke-width":3});
  } else if(["Duck","Quail","Penguin","Owl","Vulture"].includes(a)){
    add("ellipse",{cx:ax,cy:ay,rx:30,ry:26,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+15,cy:ay-22,r:18,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+20,cy:ay-25,r:3,fill:ink});
    if(a==="Duck"||a==="Vulture")add("path",{d:`M${ax+28} ${ay-20} l22 8 l-22 5Z`,fill:accent,stroke:ink,"stroke-width":3});
    if(a==="Penguin")add("ellipse",{cx:ax,cy:ay+5,rx:15,ry:18,fill:colored?paper:"#d9d9d9"});
    if(a==="Owl"){add("circle",{cx:ax+9,cy:ay-24,r:9,fill:paper,stroke:ink,"stroke-width":3});add("circle",{cx:ax+9,cy:ay-24,r:3,fill:ink});}
  } else {
    add("ellipse",{cx:ax,cy:ay+5,rx:34,ry:25,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+20,cy:ay-20,r:20,fill:ac,stroke:ink,"stroke-width":4});add("circle",{cx:ax+25,cy:ay-23,r:3.5,fill:ink});
    if(["Bear","Cat","Fox","Jaguar","Lion","Rabbit","Zebra","Yak"].includes(a))add("path",{d:`M${ax+5} ${ay-32} l-7 -20 l20 13 M${ax+25} ${ay-34} l10 -17 l5 25`,fill:ac,stroke:ink,"stroke-width":4,"stroke-linejoin":"round"});
    if(a==="Elephant"||a==="Hippo")add("path",{d:`M${ax+34} ${ay-8} Q${ax+54} ${ay+8} ${ax+37} ${ay+22}`,fill:"none",stroke:ink,"stroke-width":9,"stroke-linecap":"round"});
    if(a==="Giraffe")add("path",{d:`M${ax+3} ${ay-20} L${ax-3} ${ay-55} L${ax+15} ${ay-55}`,fill:"none",stroke:ac,"stroke-width":13,"stroke-linecap":"round"});
    if(a==="Turtle")add("path",{d:`M${ax-25} ${ay-7} Q${ax} ${ay-45} ${ax+25} ${ay-7}`,fill:accent,stroke:ink,"stroke-width":4});
    if(a==="Unicorn")add("path",{d:`M${ax+18} ${ay-37} l8 -24 l8 25Z`,fill:accent,stroke:ink,"stroke-width":3});
    if(a==="Kangaroo")add("ellipse",{cx:ax-4,cy:ay+5,rx:12,ry:15,fill:accent,stroke:ink,"stroke-width":3});
    if(a==="Zebra")for(let n=0;n<3;n++)add("path",{d:`M${ax-20+n*13} ${ay-12} l-7 15`,stroke:ink,"stroke-width":4});
    if(a==="Iguana")add("path",{d:`M${ax-25} ${ay-10} l-12 -10 l-12 8 l-12 -10`,fill:"none",stroke:ink,"stroke-width":4});
    if(a==="Monkey")add("path",{d:`M${ax-28} ${ay+10} q-35 -8 -22 -35`,fill:"none",stroke:ink,"stroke-width":5,"stroke-linecap":"round"});
  }
  return svg;
}

/* Toddler front: a huge colorful letter paired with a crisp system emoji.
   The emoji font comes from the device, so artwork stays sharp at every size. */
function drawToddlerFront(card) {
  // Letter cards use the hand-drawn story scene; counting cards use a clear grid.
  if (card.type === "letter") {
    const storyScene = drawToddlerArt(card, true);
    storyScene.classList.add("toddler-story-art");
    return storyScene;
  }

  const wrap = document.createElement("div");
  wrap.className = "toddler-hero";

  const mainSymbol = document.createElement("div");
  mainSymbol.className = "toddler-big-letter letter-color-" + (card.designIndex % 8);
  mainSymbol.textContent = card.name;
  wrap.appendChild(mainSymbol);

  if (card.type === "number") {
    // Show the quantity visually as well as the numeral.
    const objects = document.createElement("div");
    objects.className = "toddler-number-objects";
    objects.setAttribute("role", "img");
    objects.setAttribute(
      "aria-label",
      card.count === 0 ? "An empty basket: zero apples" : card.count + (card.count === 1 ? " apple" : " apples")
    );

    if (card.count === 0) {
      const basket = document.createElement("span");
      basket.textContent = "🧺";
      basket.setAttribute("aria-hidden", "true");
      objects.appendChild(basket);
    } else {
      for (let index = 0; index < card.count; index += 1) {
        const apple = document.createElement("span");
        apple.textContent = "🍎";
        apple.setAttribute("aria-hidden", "true");
        objects.appendChild(apple);
      }
    }
    wrap.appendChild(objects);
    return wrap;
  }

  const animal = document.createElement("div");
  animal.className = "toddler-big-emoji";
  animal.textContent = card.emoji;
  animal.setAttribute("role", "img");
  animal.setAttribute("aria-label", card.animal);
  wrap.appendChild(animal);
  return wrap;
}

/* Every card shares the same layout. Only the illustration and labels
   change. This makes adding cards much simpler than writing new HTML. */
/* Show the illustration side. Called on card changes and by the Reverse button. */
function showCardFront() {
  ui.flashcard.classList.remove("is-reversed");
  ui.backFace.hidden = true;
  ui.backFace.setAttribute("aria-hidden", "true");
  ui.flashcard.querySelector(".card-front").setAttribute("aria-hidden", "false");
}

/* The reverse side gives a caregiver a simple prompt to say out loud. */
function toggleCardSide() {
  const showingBack = !ui.flashcard.classList.contains("is-reversed");
  ui.flashcard.classList.toggle("is-reversed", showingBack);
  ui.backFace.hidden = !showingBack;
  ui.backFace.setAttribute("aria-hidden", String(!showingBack));
  ui.flashcard.querySelector(".card-front").setAttribute("aria-hidden", String(showingBack));
  if (showingBack) playTone(392, 0.1, 0.014, "sine");
}

/* Draw the selected card and synchronize its text, progress, and controls. */
function renderCard() {
  const card = currentCards[currentIndex];
  const isToddler = currentMode === "toddler";
  const isPattern = card.type === "pattern";
  const isBabyEmoji = currentMode === "baby" && card.type === "emoji";

  // Always return to the picture side when the selected card changes.
  showCardFront();

  ui.artwork.replaceChildren();
  ui.artwork.classList.toggle("emoji-art", isBabyEmoji);
  ui.artwork.classList.toggle("toddler-art", isToddler);
  ui.artwork.classList.toggle("animal-art", false);

  if (isToddler) {
    ui.artwork.appendChild(drawToddlerFront(card));
  } else if (isPattern) {
    ui.artwork.appendChild(drawContrastDesign(card.designIndex));
  } else if (isBabyEmoji) {
    const stage = document.createElement("div");
    stage.className = "baby-emoji-stage emoji-tone-" + (card.designIndex % 5);

    const emoji = document.createElement("span");
    emoji.className = "baby-emoji-symbol";
    emoji.textContent = card.emoji;
    emoji.setAttribute("role", "img");
    emoji.setAttribute("aria-label", card.name);
    stage.appendChild(emoji);
    ui.artwork.appendChild(stage);
  } else {
    const picture = document.createElement("span");
    picture.textContent = card.icon;
    picture.setAttribute("aria-hidden", "true");
    ui.artwork.appendChild(picture);
  }

  ui.word.textContent = isToddler
    ? card.type === "number" ? "Number " + card.name : card.name + " · " + card.animal
    : card.name;
  ui.label.textContent = isToddler
    ? card.type === "number" ? "COUNT TOGETHER" : "ABC ANIMAL ADVENTURES"
    : isPattern ? "20 UNIQUE HIGH-CONTRAST PATTERNS" : "";

  // Build the counter as text and a span instead of injecting HTML.
  const currentCount = document.createTextNode(String(currentIndex + 1).padStart(2, "0"));
  const totalCount = document.createElement("span");
  totalCount.textContent = " / " + currentCards.length;
  ui.count.replaceChildren(currentCount, totalCount);

  ui.progress.style.width = ((currentIndex + 1) / currentCards.length * 100) + "%";
  ui.progressLabel.textContent = isToddler ? "GROWING TOGETHER" : "A LITTLE AT A TIME";
  ui.previous.disabled = currentIndex === 0;
  ui.next.disabled = currentIndex === currentCards.length - 1;

  const accessibleCardName = isToddler
    ? card.type === "number"
      ? "Number " + card.name + ". " + card.description
      : card.name + ", " + card.animal
    : isPattern
      ? card.name + ", high-contrast pattern"
      : card.name + ", " + card.emoji;
  ui.flashcard.setAttribute("aria-label", accessibleCardName);

  // The reverse side is useful for grown-ups reading the prompt aloud.
  ui.backTitle.textContent = card.type === "number"
    ? "Let's count " + card.name
    : card.name;
  ui.backDescription.textContent = card.description;
}

/* Two tiny two-note sounds make Back and Next feel different.
   They use the browser's audio engine, so no sound files need downloading. */
function playNavigationSound(direction) {
  if (!soundsEnabled) return;
  const context = getAudioContext();
  if (!context) return;

  // Next rises like a little twinkle; Back makes a lower, bubbly plip-plop.
  const notes = direction > 0
    ? [{ frequency: 523.25, volume: 0.018 }, { frequency: 659.25, volume: 0.018 }]
    : [{ frequency: 740, volume: 0.016 }, { frequency: 490, volume: 0.020 }];
  const start = context.currentTime;
  notes.forEach((note, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const noteStart = start + index * 0.09;
    const duration = direction > 0 ? 0.12 : 0.10;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.frequency, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(note.volume, noteStart + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + duration + 0.015);
  });
}

/* Move to a card. The matching gentle sound only plays if the card changes. */
function moveCard(direction) {
  const nextIndex = Math.max(0, Math.min(currentCards.length - 1, currentIndex + direction));

  // At either end, keep the current card and do not play a misleading sound.
  if (nextIndex === currentIndex) return;

  currentIndex = nextIndex;
  renderCard();

  // Reading offsetWidth restarts the CSS arrival animation for the new card.
  ui.flashcard.classList.remove("card-changing");
  void ui.flashcard.offsetWidth;
  ui.flashcard.classList.add("card-changing");
  playNavigationSound(direction);
}
function chooseSurprise() {
  if (currentCards.length < 2) return;
  let pick = currentIndex;
  while (pick === currentIndex) pick = Math.floor(Math.random() * currentCards.length);
  currentIndex = pick;
  renderCard();
  playTone(784, 0.13, 0.022, "sine");
}

/* Watch mode advances gently; Play mode waits for a grown-up or child to interact. */
function setPlayStyle(style) {
  playStyle = style;
  ui.playStyleButtons.forEach(button => {
    const selected = button.dataset.playStyle === style;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (watchTimer) window.clearInterval(watchTimer);
  watchTimer = null;
  if (style === "watch") {
    watchTimer = window.setInterval(() => {
      if (currentIndex >= currentCards.length - 1) currentIndex = -1;
      currentIndex += 1;
      renderCard();
      ui.flashcard.classList.add("card-changing");
      playTone(523.25, 0.14, 0.012, "sine");
    }, 4200);
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && watchTimer) {
    window.clearInterval(watchTimer);
    watchTimer = null;
  } else if (!document.hidden && playStyle === "watch" && !watchTimer) {
    setPlayStyle("watch");
  }
});

/* Changing stages always starts the new collection at its first card. */
function setMode(mode) {
  currentMode = mode;
  currentCards = mode === "toddler" ? toddlerCards : BABY_CARDS;
  currentIndex = 0;

  ui.modeButtons.forEach(button => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  // Keep the collection heading in sync with the language and card data.
  ui.collectionTitle.textContent = mode === "toddler"
    ? language.toddlerCollection
    : language.babyCollection;
  ui.collectionKicker.textContent = mode === "toddler"
    ? language.toddlerKicker
    : language.babyKicker;

  renderCard();
  playTone(523.25, 0.12, 0.02);
}

ui.previous.addEventListener("click", () => moveCard(-1));
ui.next.addEventListener("click", () => moveCard(1));
ui.surprise.addEventListener("click", chooseSurprise);
ui.reverseButton.addEventListener("click", showCardFront);
ui.modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
ui.playStyleButtons.forEach(button => button.addEventListener("click", () => setPlayStyle(button.dataset.playStyle)));

/* Track a horizontal finger movement to change cards. Vertical movement
   is left alone so the page can still scroll naturally. */
let pointerStartX = 0;
let pointerStartY = 0;
let lastTapTime = 0;
let lastTapX = 0;
let lastTapY = 0;

/* Pointer events cover touchscreens, trackpads, and a mouse with one handler.
   Vertical movement remains available for normal page scrolling. */
ui.cardArea.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
});

ui.cardArea.addEventListener("pointerup", event => {
  // The Reverse button has its own click handler and is not a swipe/tap target.
  if (event.target.closest("button")) return;

  const deltaX = event.clientX - pointerStartX;
  const deltaY = event.clientY - pointerStartY;

  if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
    lastTapTime = 0;
    moveCard(deltaX < 0 ? 1 : -1);
    return;
  }

  // Two taps close together on the card reveal or hide its reverse side.
  const now = Date.now();
  const tapsAreClose = Math.hypot(event.clientX - lastTapX, event.clientY - lastTapY) < 32;
  if (now - lastTapTime < 360 && tapsAreClose) {
    lastTapTime = 0;
    toggleCardSide();
    return;
  }

  lastTapTime = now;
  lastTapX = event.clientX;
  lastTapY = event.clientY;
});

ui.cardArea.addEventListener("pointercancel", () => {
  pointerStartX = 0;
  pointerStartY = 0;
  lastTapTime = 0;
});
document.addEventListener("keydown", event => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  if (event.key === "ArrowRight") moveCard(1);
  if (event.key === "ArrowLeft") moveCard(-1);
  if (event.key === "Escape" && ui.aboutDialog.open) ui.aboutDialog.close();
});

/* Small card tones are optional; radio audio has its own player controls. */
ui.soundToggle.addEventListener("click", () => {
  soundsEnabled = !soundsEnabled;
  ui.soundToggle.textContent = soundsEnabled ? language.mute : language.unmute;
  ui.soundToggle.setAttribute("aria-pressed", String(soundsEnabled));
  if (soundsEnabled) playTone(523.25, 0.12, 0.02);
});
ui.melody.addEventListener("click", () => { if(radioIsPlaying) stopRadio(); else playRadio(); });
document.getElementById("radio-play").addEventListener("click", () => { if(radioIsPlaying) stopRadio(); else playRadio(); });
document.getElementById("radio-next").addEventListener("click", skipRadioStation);
document.getElementById("radio-station").addEventListener("change", event => chooseRadioStation(event.target.value));
document.getElementById("radio-volume").addEventListener("input", event => {
  radioAudio.volume=Number(event.target.value)/100;
  document.querySelector("#radio-volume + output").textContent=event.target.value+"%";
});
radioAudio.addEventListener("ended", () => { radioIsPlaying=false;updateRadioUI(); });
radioAudio.addEventListener("error", () => {
  radioIsPlaying=false;updateRadioUI();
  document.getElementById("radio-status").textContent="Stream unavailable here · try Open station website";
});
/* A tiny About dialog keeps explanatory copy out of the main experience. */
document.getElementById("about-button").addEventListener("click", () => ui.aboutDialog.showModal());
document.getElementById("close-about").addEventListener("click", () => ui.aboutDialog.close());
document.getElementById("done-about").addEventListener("click", () => ui.aboutDialog.close());
ui.aboutDialog.addEventListener("click", event => {
  if (event.target === ui.aboutDialog) ui.aboutDialog.close();
});

/* Start with the first card and show the selected radio station. */
renderCard();
updateRadioUI();
