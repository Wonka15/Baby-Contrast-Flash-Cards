/*
 * Little Look — Baby Contrast Cards
 * ------------------------------------------------------------
 * Beginner guide:
 * 1. CARD DATA lives near the top of this file.
 * 2. renderCard() draws the selected card and updates its counter.
 * 3. moveCard() handles Back, Next, and horizontal swipe navigation.
 * 5. Sound effects are generated in the browser; no audio files or
 *    microphone permission are needed.
 *
 * To add a baby pattern, edit BABY_PATTERN_NAMES and drawContrastDesign().
 * To change the baby picture cards, edit BABY_EMOJIS and their names.
 * To change toddler letter-and-emoji cards, edit makeToddlerCards().
 * Interface translations belong in LANGUAGE_TEXT.
 */

"use strict";

/* Keep future translations in one place instead of scattering text
   throughout the code. English is the first supported language. */
const LANGUAGE_TEXT = {
  en: {
    babyCollection: "20 bold patterns + 20 high-contrast emoji cards",
    toddlerCollection: "A–Z animal emojis",
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

/* Toddler mode is a simple A–Z alphabet: one large colorful letter
   paired with a familiar animal emoji. Keep each entry easy to scan. */
function makeToddlerCards() {
  const alphabet = [
    ["A", "Ant", "🐜"],
    ["B", "Bear", "🐻"],
    ["C", "Cat", "🐱"],
    ["D", "Duck", "🦆"],
    ["E", "Elephant", "🐘"],
    ["F", "Fox", "🦊"],
    ["G", "Giraffe", "🦒"],
    ["H", "Hippo", "🦛"],
    ["I", "Iguana", "🦎"],
    ["J", "Jaguar", "🐆"],
    ["K", "Kangaroo", "🦘"],
    ["L", "Lion", "🦁"],
    ["M", "Monkey", "🐒"],
    ["N", "Narwhal", "🐳"],
    ["O", "Owl", "🦉"],
    ["P", "Penguin", "🐧"],
    ["Q", "Quail", "🐦"],
    ["R", "Rabbit", "🐰"],
    ["S", "Seal", "🦭"],
    ["T", "Turtle", "🐢"],
    ["U", "Unicorn", "🦄"],
    ["V", "Vulture", "🦅"],
    ["W", "Whale", "🐋"],
    ["X", "X-ray fish", "🐟"],
    ["Y", "Yak", "🐂"],
    ["Z", "Zebra", "🦓"]
  ];

  return alphabet.map(([letter, animal, emoji], designIndex) => ({
    name: letter,
    icon: emoji,
    emoji,
    animal,
    description: letter + " is for " + animal + ".",
    type: "letter",
    group: "Alphabet",
    symbol: letter,
    designIndex
  }));
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
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  playStyleButtons: [...document.querySelectorAll("[data-play-style]")],
  aboutDialog: document.getElementById("about-dialog"),
  arModeButton: document.getElementById("ar-mode-button")
};
const toddlerCards = makeToddlerCards();

/* Animated Mode uses the exact 26 animals requested. The browser's native
   emoji artwork gets layered shadows and highlights for a 3D-style look. */
const AR_ANIMALS = [
  // Each card is explicitly paired with its alphabet letter, A through Z.
  ["A", "Alligator", "🐊"], ["B", "Bear", "🐻"], ["C", "Cat", "🐱"],
  ["D", "Dog", "🐶"], ["E", "Elephant", "🐘"], ["F", "Fox", "🦊"],
  ["G", "Giraffe", "🦒"], ["H", "Hippo", "🦛"], ["I", "Iguana", "🦎"],
  ["J", "Jaguar", "🐆"], ["K", "Kangaroo", "🦘"], ["L", "Lion", "🦁"],
  ["M", "Monkey", "🐒"], ["N", "Narwhal", "🐋"], ["O", "Owl", "🦉"],
  ["P", "Penguin", "🐧"], ["Q", "Quail", "🐦"], ["R", "Rabbit", "🐰"],
  ["S", "Snake", "🐍"], ["T", "Tiger", "🐯"], ["U", "Unicorn", "🦄"],
  ["V", "Vulture", "🦅"], ["W", "Whale", "🐳"], ["X", "X-ray fish", "🐠"],
  ["Y", "Yak", "🐂"], ["Z", "Zebra", "🦓"]
];
function makeARCards() {
  return AR_ANIMALS.map(([letter, animal, emoji], designIndex) => ({
    name: letter + " is for " + animal,
    animal,
    emoji,
    icon: emoji,
    symbol: letter,
    description: letter + " is for " + animal + " in Animated Mode.",
    type: "ar",
    group: "Animated Mode",
    designIndex
  }));
}
const arCards = makeARCards();
let currentMode = "baby";
let playStyle = "play";
let watchTimer = null;
let currentCards = BABY_CARDS;
let currentIndex = 0;
let soundsEnabled = true;
let audioContext = null;
let motionEffectsEnabled = false;
let lastMotionBurstAt = 0;
let lastGravity = null;
let motionBurstTimer = null;
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
/* Decorative stars are limited to white and red to preserve Baby Mode's
   strict high-contrast palette. Positions are fixed so they feel calm and familiar. */
function addBabyStarLayer(stage) {
  const positions = [
    [10, 13, 19], [25, 8, 13], [48, 13, 16], [74, 9, 12],
    [89, 22, 18], [9, 43, 12], [91, 52, 13], [14, 75, 17],
    [31, 91, 12], [53, 86, 19], [76, 91, 14], [88, 73, 16],
    [35, 27, 10], [68, 37, 12], [27, 61, 11], [72, 67, 10]
  ];
  const layer = document.createElement("div");
  layer.className = "baby-star-layer";
  layer.setAttribute("aria-hidden", "true");
  positions.forEach(([left, top, size], index) => {
    const star = document.createElement("span");
    star.className = "baby-twinkle-star" + (index % 4 === 0 ? " is-red" : "");
    star.textContent = "★";
    star.style.left = left + "%";
    star.style.top = top + "%";
    star.style.setProperty("--star-size", size + "px");
    star.style.setProperty("--star-delay", ((index % 6) * -0.43) + "s");
    layer.appendChild(star);
  });
  stage.appendChild(layer);
}

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

/* Toddler cards pair a bold, colorful letter with a crisp device emoji.
   Using system emoji keeps the pictures sharp without extra image files. */
function drawToddlerFront(card) {
  const wrap = document.createElement("div");
  wrap.className = "toddler-hero";

  const letter = document.createElement("div");
  letter.className = "toddler-big-letter letter-color-" + (card.designIndex % 8);
  letter.textContent = card.name;
  wrap.appendChild(letter);

  const animal = document.createElement("div");
  animal.className = "toddler-big-emoji";
  animal.textContent = card.emoji;
  animal.setAttribute("role", "img");
  animal.setAttribute("aria-label", card.animal);
  wrap.appendChild(animal);

  return wrap;
}

/* A dedicated hero layout gives the special deck a bright blue initial,
   dimensional emoji shadows, and decorative diamond sparkles. */
function drawARFront(card) {
  const wrap = document.createElement("div");
  wrap.className = "ar-hero";

  // Scatter a small constellation of differently shaped, colored gems.
  // CSS gives each sparkle its own timing so the card feels alive, not noisy.
  const sparkleDesigns = [
    ["✦", "ar-sparkle-blue", "ar-sparkle-a"],
    ["◇", "ar-sparkle-violet", "ar-sparkle-b"],
    ["✧", "ar-sparkle-pink", "ar-sparkle-c"],
    ["◆", "ar-sparkle-teal", "ar-sparkle-d"],
    ["✦", "ar-sparkle-gold", "ar-sparkle-e"],
    ["⋆", "ar-sparkle-blue", "ar-sparkle-f"],
    ["✧", "ar-sparkle-violet", "ar-sparkle-g"],
    ["◇", "ar-sparkle-pink", "ar-sparkle-h"],
    ["✴", "ar-sparkle-teal", "ar-sparkle-i"],
    ["✦", "ar-sparkle-gold", "ar-sparkle-j"]
  ];
  sparkleDesigns.forEach(([shape, color, position]) => {
    const sparkle = document.createElement("span");
    sparkle.className = "ar-card-sparkle " + color + " " + position;
    sparkle.setAttribute("aria-hidden", "true");
    sparkle.textContent = shape;
    wrap.appendChild(sparkle);
  });

  const letter = document.createElement("div");
  letter.className = "ar-big-letter";
  letter.textContent = card.symbol;
  letter.setAttribute("aria-hidden", "true");
  wrap.appendChild(letter);

  const animal = document.createElement("div");
  animal.className = "ar-big-emoji";
  animal.textContent = card.emoji;
  animal.setAttribute("role", "button");
  animal.setAttribute("tabindex", "0");
  animal.setAttribute("aria-label", "Tap " + card.animal + " to dunk into water");
  animal.setAttribute("aria-pressed", "false");
  wrap.appendChild(animal);

  // A little pool sits behind the emoji. Tapping the animal makes it dive,
  // throws up droplets, and sends a ripple across the water.
  const water = document.createElement("div");
  water.className = "ar-water-effect";
  water.setAttribute("aria-hidden", "true");
  const ripple = document.createElement("span");
  ripple.className = "ar-water-ripple";
  water.appendChild(ripple);
  for (let dropIndex = 0; dropIndex < 8; dropIndex += 1) {
    const drop = document.createElement("span");
    drop.className = "ar-water-drop ar-water-drop-" + (dropIndex + 1);
    water.appendChild(drop);
  }
  wrap.appendChild(water);

  let splashTimer;
  function splashIntoWater() {
    // Restart cleanly if a child taps more than once during the splash.
    window.clearTimeout(splashTimer);
    wrap.classList.remove("water-dunking");
    void wrap.offsetWidth;
    wrap.classList.add("water-dunking");
    // A tiny two-note glissando makes a soft, water-like plip only on touch.
    if (soundsEnabled) {
      playTone(880, 0.07, 0.018, "sine");
      window.setTimeout(() => playTone(620, 0.12, 0.014, "sine"), 55);
    }
    animal.setAttribute("aria-pressed", "true");
    splashTimer = window.setTimeout(() => {
      wrap.classList.remove("water-dunking");
      animal.setAttribute("aria-pressed", "false");
    }, 1250);
  }
  animal.addEventListener("click", splashIntoWater);
  animal.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      splashIntoWater();
    }
  });

  const caption = document.createElement("div");
  caption.className = "ar-animal-name";
  caption.textContent = card.animal;
  wrap.appendChild(caption);

  // Motion permission must be requested from a direct tap on iOS Safari.
  const motionButton = document.createElement("button");
  motionButton.className = "ar-motion-button";
  motionButton.type = "button";
  motionButton.textContent = motionEffectsEnabled ? "Shake effects on" : "Enable shake effects";
  motionButton.setAttribute("aria-label", "Enable motion-controlled splash effects");
  motionButton.addEventListener("click", async () => {
    const MotionEvent = window.DeviceMotionEvent;
    if (!MotionEvent) {
      motionButton.textContent = "Tap for extra effects";
      triggerMotionBurst(wrap);
      return;
    }
    try {
      if (typeof MotionEvent.requestPermission === "function") {
        const permission = await MotionEvent.requestPermission();
        if (permission !== "granted") {
          motionButton.textContent = "Tap for extra effects";
          return;
        }
      }
      motionEffectsEnabled = true;
      motionButton.textContent = "Shake effects on";
      motionButton.classList.add("is-enabled");
      if (!window.__littleLookMotionListenerAdded) {
        window.addEventListener("devicemotion", handleDeviceMotion, { passive: true });
        window.__littleLookMotionListenerAdded = true;
      }
    } catch {
      motionButton.textContent = "Tap for extra effects";
    }
  });
  wrap.appendChild(motionButton);

  return wrap;
}

/* Shake detection is deliberately thresholded and throttled so ordinary
   hand movement does not overwhelm little learners with constant effects. */
function triggerMotionBurst(hero) {
  if (!hero || currentMode !== "ar") return;
  // Movement shakes the animal and gently animates decorations; it never dunks it.
  hero.classList.remove("motion-burst");
  void hero.offsetWidth;
  hero.classList.add("motion-burst");
  window.clearTimeout(motionBurstTimer);
  motionBurstTimer = window.setTimeout(() => hero.classList.remove("motion-burst"), 520);
}

function handleDeviceMotion(event) {
  if (!motionEffectsEnabled || currentMode !== "ar" || document.hidden) return;
  const hero = ui.artwork.querySelector(".ar-hero");
  if (!hero) return;

  // Gravity direction makes stars and gems drift with the phone's tilt.
  const tilt = event.accelerationIncludingGravity;
  if (tilt && Number.isFinite(tilt.x) && Number.isFinite(tilt.y)) {
    const dx = Math.max(-1, Math.min(1, tilt.x / 9.81));
    const dy = Math.max(-1, Math.min(1, tilt.y / 9.81));
    hero.style.setProperty("--motion-x", (dx * 18).toFixed(1) + "px");
    hero.style.setProperty("--motion-y", (dy * 18).toFixed(1) + "px");
  }

  // Prefer gravity-free acceleration to detect a real shake, not a normal tilt.
  let strength = 0;
  if (event.acceleration && Number.isFinite(event.acceleration.x)) {
    const { x = 0, y = 0, z = 0 } = event.acceleration;
    strength = Math.sqrt(x * x + y * y + z * z);
  } else if (event.accelerationIncludingGravity) {
    const { x = 0, y = 0, z = 0 } = event.accelerationIncludingGravity;
    const current = { x, y, z };
    if (lastGravity) {
      strength = Math.sqrt(
        (x - lastGravity.x) ** 2 +
        (y - lastGravity.y) ** 2 +
        (z - lastGravity.z) ** 2
      );
    }
    lastGravity = current;
  }

  const now = Date.now();
  if (strength > 12 && now - lastMotionBurstAt >= 260) {
    lastMotionBurstAt = now;
    triggerMotionBurst(hero);
  }
}

/* Every card shares the same layout. Only the illustration and labels
   change. This makes adding cards much simpler than writing new HTML. */
/* Draw the selected card and synchronize its text, progress, and controls. */
function renderCard() {
  const card = currentCards[currentIndex];
  const isToddler = currentMode === "toddler";
  const isAR = currentMode === "ar";
  const isPattern = card.type === "pattern";
  const isBabyEmoji = currentMode === "baby" && card.type === "emoji";

  ui.artwork.replaceChildren();
  ui.artwork.classList.toggle("emoji-art", isBabyEmoji);
  ui.artwork.classList.toggle("toddler-art", isToddler);
  ui.artwork.classList.toggle("ar-art", isAR);
  ui.artwork.classList.toggle("animal-art", false);

  if (isAR) {
    ui.artwork.appendChild(drawARFront(card));
  } else if (isToddler) {
    ui.artwork.appendChild(drawToddlerFront(card));
  } else if (isPattern) {
    const stage = document.createElement("div");
    stage.className = "baby-pattern-stage";
    stage.appendChild(drawContrastDesign(card.designIndex));
    addBabyStarLayer(stage);
    ui.artwork.appendChild(stage);
  } else if (isBabyEmoji) {
    const stage = document.createElement("div");
    stage.className = "baby-emoji-stage emoji-tone-" + (card.designIndex % 5);
    addBabyStarLayer(stage);

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

  ui.word.textContent = isAR
    ? card.animal
    : isToddler ? card.name + " · " + card.animal : card.name;
  ui.label.textContent = isAR
    ? "ANIMATED MODE · TAP TO SPLASH"
    : isToddler
      ? "ABC ANIMAL FRIENDS"
      : isPattern ? "20 UNIQUE HIGH-CONTRAST PATTERNS" : "";

  // Build the counter as text and a span instead of injecting HTML.
  const currentCount = document.createTextNode(String(currentIndex + 1).padStart(2, "0"));
  const totalCount = document.createElement("span");
  totalCount.textContent = " / " + currentCards.length;
  ui.count.replaceChildren(currentCount, totalCount);

  ui.progress.style.width = ((currentIndex + 1) / currentCards.length * 100) + "%";
  ui.progressLabel.textContent = isAR ? "SPARKLE · EXPLORE · DISCOVER" : isToddler ? "GROWING TOGETHER" : "A LITTLE AT A TIME";
  ui.previous.disabled = currentIndex === 0;
  ui.next.disabled = currentIndex === currentCards.length - 1;

  const accessibleCardName = isAR
    ? card.animal + ", animated emoji card, letter " + card.symbol + ". Tap the emoji for a water splash"
    : isToddler
      ? card.name + ", " + card.animal
      : isPattern
        ? card.name + ", high-contrast pattern"
        : card.name + ", " + card.emoji;
  ui.flashcard.setAttribute("aria-label", accessibleCardName);

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
  currentCards = mode === "ar" ? arCards : mode === "toddler" ? toddlerCards : BABY_CARDS;
  currentIndex = 0;

  ui.modeButtons.forEach(button => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  // Keep the special-deck button and collection heading in sync with the mode.
  const isAR = mode === "ar";
  ui.arModeButton.classList.toggle("active", isAR);
  ui.arModeButton.setAttribute("aria-pressed", String(isAR));
  ui.collectionTitle.textContent = isAR
    ? "26 dimensional animal emojis"
    : mode === "toddler" ? language.toddlerCollection : language.babyCollection;
  ui.collectionKicker.textContent = isAR
    ? "ANIMATED ANIMAL COLLECTION"
    : mode === "toddler" ? language.toddlerKicker : language.babyKicker;

  renderCard();
  playTone(523.25, 0.12, 0.02);
}

ui.previous.addEventListener("click", () => moveCard(-1));
ui.next.addEventListener("click", () => moveCard(1));
ui.surprise.addEventListener("click", chooseSurprise);
ui.modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
ui.arModeButton.addEventListener("click", () => setMode("ar"));
ui.playStyleButtons.forEach(button => button.addEventListener("click", () => setPlayStyle(button.dataset.playStyle)));

/* Track a horizontal finger movement to change cards. Vertical movement
   is left alone so the page can still scroll naturally. */
let pointerStartX = 0;
let pointerStartY = 0;

/* Pointer events cover touchscreens, trackpads, and a mouse with one handler.
   Vertical movement remains available for normal page scrolling. */
ui.cardArea.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;
  pointerStartX = event.clientX;
  pointerStartY = event.clientY;
});

ui.cardArea.addEventListener("pointerup", event => {
  const deltaX = event.clientX - pointerStartX;
  const deltaY = event.clientY - pointerStartY;

  if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
    moveCard(deltaX < 0 ? 1 : -1);
  }
});

ui.cardArea.addEventListener("pointercancel", () => {
  pointerStartX = 0;
  pointerStartY = 0;
});
document.addEventListener("keydown", event => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  if (event.key === "ArrowRight") moveCard(1);
  if (event.key === "ArrowLeft") moveCard(-1);
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
