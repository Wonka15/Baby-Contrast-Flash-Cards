/*
 * Little Look — Baby Contrast Cards
 * ------------------------------------------------------------
 * Beginner guide:
 * 1. CARD COLLECTIONS are the words and pictures shown in the app.
 * 2. renderCard() updates the card when a new one is chosen.
 * 3. moveCard() handles swipe, Back, and Next navigation.
 * 4. sound helpers create soft sounds in the browser—no audio files
 *    are downloaded, and no microphone permission is needed.
 *
 * To add a new baby card, add one item to BABY_CARDS below.
 * To add a toddler letter or number, edit makeToddlerCards().
 * Spanish labels can be added later in the LANGUAGE_TEXT object.
 */

"use strict";

/* Keep future translations in one place instead of scattering text
   throughout the code. English is the first supported language. */
const LANGUAGE_TEXT = {
  en: {
    babyMode: "Baby", toddlerMode: "Toddler",
    babyCollection: "20 bold patterns + 20 high-contrast emoji cards",
    toddlerCollection: "A–Z with colorful animal emojis",
    babyKicker: "THE FIRST COLLECTION", toddlerKicker: "GROWING TOGETHER",
    look: "LOOK CLOSELY", backPrompt: "Can you find one together?",
next: "Next card", previous: "Back",
    mute: "Mute", unmute: "Sound on", melody: "Melody"
  }
};
const language = LANGUAGE_TEXT.en;

/* Each item is: name, icon, short description, type, and artwork style.
   "pattern" cards draw their art with SVG. "picture" cards use emoji
   illustrations, which keeps this starter project easy to maintain. */
const SHAPE_CARDS = [
  ["Circle","●","Round and smooth, with no corners.","pattern","rings"],
  ["Square","■","Four equal sides and four corners.","pattern","square"],
  ["Triangle","▲","Three sides meet at three corners.","pattern","triangle"],
  ["Diamond","◆","A tilted shape with four sides.","pattern","diamond"],
  ["Star","★","A bright shape with five points.","pattern","star"],
  ["Heart","♥","A shape that reminds us of love.","pattern","heart"],
  ["Oval","⬭","A stretched-out, round shape.","pattern","oval"],
  ["Rectangle","▰","A long shape with four corners.","pattern","rectangle"],
  ["Spiral","◉","A line that curls around and around.","pattern","spiral"],
  ["Waves","〰","Lines that rise and fall gently.","pattern","waves"],
  ["Stripes","▥","A row of bold light and dark bands.","pattern","stripes"],
  ["Checkerboard","▦","Squares alternate from dark to light.","pattern","checker"],
  ["Zigzag","〽","A line with playful, pointy turns.","pattern","zigzag"],
  ["Big dots","●","Large dots stand out on the page.","pattern","dots"],
  ["Little dots","⠿","Tiny dots make a repeating pattern.","pattern","tinyDots"],
  ["Arches","∩","Curves sit inside one another.","pattern","arches"],
  ["Sunburst","☼","Lines spread out from the middle.","pattern","burst"],
  ["Half and half","◐","One circle, split into two sides.","pattern","half"],
  ["Concentric rings","◎","Rings travel from outside to inside.","pattern","rings"],
  ["Cross","✚","Two simple bars make a cross.","pattern","cross"],
  ["Crescent","☾","A curved sliver like a little moon.","pattern","moon"],
  ["Hexagon","⬡","A shape with six sides.","pattern","hexagon"],
  ["Woven lines","▤","Lines cross over and under.","pattern","woven"],
  ["Spots","⠶","A playful scatter of dark spots.","pattern","spots"],
  ["Fan","✺","Curved rays open like a paper fan.","pattern","fan"]
].map(([name, icon, description, type, art]) => ({name, icon, description, type, art, group:"Shapes"}));

const NATURE_CARDS = [
  ["Sun","☀️","A warm sun brightens the day."],["Moon","🌙","A quiet moon lights the night."],
  ["Cloud","☁️","A fluffy cloud drifts through the sky."],["Rainbow","🌈","Colors arc across the sky."],
  ["Starry sky","🌟","Little stars sparkle in the dark."],["Flower","🌼","A flower opens its petals."],
  ["Sunflower","🌻","A sunny flower with a big center."],["Tulip","🌷","A tulip grows on a tall green stem."],
  ["Rose","🌹","Soft petals fold around the center."],["Blossom","🌸","A tiny blossom opens in spring."],
  ["Daisy","🌼","Bright petals surround a sunny middle."],["Leaf","🍃","A leaf dances in the breeze."],
  ["Fern","🌿","Little leaflets grow along a frond."],["Sprout","🌱","A new plant peeks out of the soil."],
  ["Tree","🌳","A leafy tree gives shade."],["Pine tree","🌲","A tall evergreen reaches up."],
  ["Cactus","🌵","A desert plant stores water."],["Carrot","🥕","A crunchy orange root grows underground."],
  ["Apple","🍎","A crisp fruit grows on a tree."],["Banana","🍌","A yellow fruit is easy to hold."],
  ["Strawberry","🍓","A little red berry has tiny seeds."],["Orange","🍊","A round citrus fruit smells fresh."],
  ["Pear","🍐","A sweet fruit with a curvy shape."],["Watermelon","🍉","A juicy melon has a green rind."],
  ["Mushroom","🍄","A little mushroom has a cap and stem."]
].map(([name, icon, description]) => ({name,icon,description,type:"picture",group:"Nature"}));

const ANIMAL_CARDS = [
  ["Elephant","🐘","A gentle giant with a long trunk."],["Lion","🦁","A lion has a fluffy mane."],
  ["Giraffe","🦒","A tall animal with a long neck."],["Zebra","🦓","Bold stripes cover a zebra."],
  ["Monkey","🐒","A playful monkey likes to climb."],["Bear","🐻","A bear has round ears and soft fur."],
  ["Panda","🐼","A panda has black and white patches."],["Fox","🦊","A fox has pointy ears and a bushy tail."],
  ["Rabbit","🐰","A bunny has long ears."],["Cat","🐱","A cat has whiskers and soft paws."],
  ["Dog","🐶","A friendly pup loves company."],["Mouse","🐭","A tiny mouse has round ears."],
  ["Owl","🦉","An owl has big eyes."],["Duck","🦆","A duck paddles across the pond."],
  ["Penguin","🐧","A penguin waddles in a little tuxedo."],["Turtle","🐢","A turtle carries a shell."],
  ["Frog","🐸","A frog can hop and splash."],["Fish","🐠","A bright fish swims through water."],
  ["Whale","🐳","A whale is a huge ocean mammal."],["Dolphin","🐬","A dolphin leaps through the sea."],
  ["Octopus","🐙","An octopus has eight arms."],["Butterfly","🦋","A butterfly has patterned wings."],
  ["Bee","🐝","A bee visits flowers."],["Ladybug","🐞","A ladybug has spotted wings."],
  ["Snail","🐌","A snail carries its shell along."]
].map(([name,icon,description])=>({name,icon,description,type:"picture",group:"Animals"}));

const EVERYDAY_CARDS = [
  ["Car","🚗","A little car rolls along the road."],["Bus","🚌","A bus carries people together."],
  ["Train","🚂","A train travels along its tracks."],["Bicycle","🚲","Two wheels make a bicycle."],
  ["Airplane","✈️","An airplane travels high in the sky."],["Boat","⛵","A boat floats on the water."],
  ["Ball","⚽","A ball can roll, bounce, and play."],["Kite","🪁","A kite dances in the wind."],
  ["Teddy bear","🧸","A cuddly bear is a classic friend."],["Toy blocks","🧱","Blocks stack into towers."],
  ["Book","📚","Books are full of stories."],["Crayon","🖍️","A crayon makes colorful marks."],
  ["Umbrella","☂️","An umbrella helps keep the rain away."],["House","🏠","A home is a place to feel safe."],
  ["Clock","🕒","A clock helps us notice time."],["Cup","🥤","A cup can hold a drink."],
  ["Spoon","🥄","A spoon helps with little meals."],["Sock","🧦","A cozy sock keeps a foot warm."],
  ["Hat","🧢","A hat sits on top of the head."],["Shoe","👟","Shoes help protect our feet."],
  ["Key","🔑","A key can open a lock."],["Lamp","💡","A lamp brings light into a room."],
  ["Gift","🎁","A gift is a little surprise."],["Drum","🥁","A drum makes a soft beat."],
  ["Music","🎵","A little melody can make us smile."]
].map(([name,icon,description])=>({name,icon,description,type:"picture",group:"Everyday"}));

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
const BABY_EMOJIS = ["❤️","🤍","🖤","🔴","⚪","⚫","♥️","♦️","♠️","🃏","🥁","🎈","🌹","🍎","🍒","🍓","🐞","🐙","🐼","🦓"];
const BABY_CARDS = [
  ...BABY_PATTERN_NAMES.map(([name,description],index)=>({name,description,type:"pattern",art:"contrast",designIndex:index,group:"Baby Patterns"})),
  ...BABY_EMOJIS.map((emoji,index)=>({
    name:["Red heart","White heart","Black heart","Red circle","White circle","Black circle","Heart symbol","Diamond","Spade","Joker","Drum","Balloon","Rose","Apple","Cherries","Strawberry","Ladybug","Octopus","Panda","Zebra"][index],
    icon:emoji,emoji,description:"A bold, easy-to-see picture in a black, white and red world.",
    type:"emoji",designIndex:index,group:"Baby Emojis"
  }))
];

/* Toddler mode grows with your child: all 26 letters plus numbers 0–20.
   This is intentionally separate from the infant card set. */
/* Toddler mode is a 26-card picture-book alphabet: every letter pairs Oswald
   with a different animal and a simple action children can name aloud. */
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
  const animalEmojis = ["🐜","🐻","🐱","🦆","🐘","🦊","🦒","🦛","🦎","🐆","🦘","🦁","🐵","🦄","🦉","🐧","🐦","🐰","🦭","🐢","🦄","🦅","🐳","🐠","🐂","🦓"];
  return alphabet.map(([letter,animal,activity,description], designIndex) => ({
    name: letter, icon: "", emoji: animalEmojis[designIndex], description,
    type: "letter", group: "Alphabet", symbol: letter, animal, activity, designIndex
  }));
}

/* DOM elements are collected here once, so the rest of the code can
   use clear names instead of repeating long document queries. */
const ui = {
  flashcard: document.getElementById("flashcard"),
  cardArea: document.getElementById("card-area"),
  artwork: document.getElementById("artwork"),
  backdrop: document.getElementById("art-backdrop"),
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
  aboutDialog: document.getElementById("about-dialog")
};
const toddlerCards = makeToddlerCards();
let currentMode = "baby";
let playStyle = "play";
let watchTimer = null;
let currentCards = BABY_CARDS;
let currentIndex = 0;
let soundsEnabled = true;
let touchStartX = 0;
let touchStartY = 0;
let audioContext = null;
let melodyTimer = null;
let streamSource = null;
let streamGain = null;
let melodyGain = null;
let melodyStep = 0;
let activeMusicPreset = 0;
let musicNoiseSource = null;
let musicNoiseGain = null;
const MUSIC_PRESETS = [{name:"Classical-inspired",description:"A gentle original piano-like melody"},{name:"Soothing nature",description:"Soft rain-like ambience and airy tones"},{name:"Baby lullaby",description:"A slow, simple music-box lullaby"}];

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
  {name:"Fun Kids Naps",subtitle:"Gentle nap-time music",url:"https://www.funkidslive.com/player/naps/",kind:"page",art:"☾"},
  {name:"WFMT Classical",subtitle:"Classical music · Chicago",url:"https://www.wfmt.com/listen",stream:"https://stream.wfmt.com/main-mp3",kind:"audio",art:"𝄢"}
];
let selectedRadioIndex=0;
let radioIsPlaying=false;
const radioAudio=document.getElementById("radio-audio");
const radioFrame=document.getElementById("radio-frame");
function updateRadioUI(){
  const station=RADIO_STATIONS[selectedRadioIndex];
  document.getElementById("radio-station-name").textContent=station.name;
  document.getElementById("radio-station-subtitle").textContent=station.subtitle;
  document.getElementById("radio-station-art").textContent=station.art;
  document.getElementById("radio-status").textContent=radioIsPlaying?"Playing · "+station.name:"Ready to listen";
  document.getElementById("radio-play").textContent=radioIsPlaying?"Pause":"Play";
  document.getElementById("radio-play").setAttribute("aria-label",radioIsPlaying?"Pause "+station.name:"Play "+station.name);
  document.getElementById("radio-open").href=station.url;
  document.getElementById("radio-open").textContent=station.kind==="audio"?"Open station website":"Open full station player";
  document.getElementById("radio-station").value=String(selectedRadioIndex);
  document.getElementById("radio-station-art").classList.toggle("radio-playing",radioIsPlaying);
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
    radioFrame.hidden=false;radioFrame.src=station.url;
    radioIsPlaying=true;updateRadioUI();
    document.getElementById("radio-status").textContent="Station player opened below · use Open full station player if needed";
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
function drawAnimalFace(name, colored = false) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", colored ? "Color animal portrait: " + name : "High contrast animal portrait: " + name);
  const add = (tag, attrs) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    svg.appendChild(node);
    return node;
  };
  const ink = "#050505";
  const paper = "#ffffff";
  const accent = "#ed1028";
  const fur = colored ? ({"Lion":"#e9ae48","Elephant":"#8fb8c8","Giraffe":"#f0c85b","Zebra":"#f7f4eb","Monkey":"#bd8058","Bear":"#a77a58","Panda":"#f7f4eb","Fox":"#e98949","Rabbit":"#f6eee6","Cat":"#d7b5a0","Dog":"#cba77a","Mouse":"#b9a5bd","Owl":"#b58a61","Duck":"#f5d65a","Penguin":"#f5f5ef","Turtle":"#80b878","Frog":"#7cbe76","Fish":"#65bdd0","Whale":"#6ea9d6","Dolphin":"#8ac8d7","Octopus":"#d88ab5","Butterfly":"#b19ae5","Bee":"#f0c84b","Ladybug":"#df665c","Snail":"#d8ad7e"})[name] || "#c7c7c7" : paper;
  const is = (...names) => names.includes(name);
  add("rect", {x:0,y:0,width:400,height:400,rx:34,fill:colored ? "#a90018" : ink});
  // Distinct silhouettes give each familiar animal its own recognizable outline.
  if (is("Lion")) add("circle",{cx:200,cy:190,r:145,fill:colored?"#c87932":ink});
  if (is("Elephant")) { add("ellipse",{cx:200,cy:250,rx:43,ry:90,fill:fur,stroke:ink,"stroke-width":8}); add("ellipse",{cx:105,cy:160,rx:43,ry:60,fill:fur,stroke:ink,"stroke-width":8}); add("ellipse",{cx:295,cy:160,rx:43,ry:60,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Giraffe")) { add("path",{d:"M125 315 L130 130 Q200 70 270 130 L275 315Z",fill:fur,stroke:ink,"stroke-width":8}); add("path",{d:"M145 95 L130 55 M255 95 L270 55",stroke:ink,"stroke-width":12,"stroke-linecap":"round"}); }
  else if (is("Zebra")) { add("path",{d:"M95 145 Q200 65 305 145 L290 290 Q200 350 110 290Z",fill:fur,stroke:ink,"stroke-width":8}); for(let x=120;x<300;x+=48) add("path",{d:`M${x} 120 l-25 75 30 15 -20 70`,fill:"none",stroke:ink,"stroke-width":17}); }
  else if (is("Rabbit")) { add("ellipse",{cx:155,cy:85,rx:34,ry:78,fill:fur,stroke:ink,"stroke-width":8}); add("ellipse",{cx:245,cy:85,rx:34,ry:78,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Fox")) { add("path",{d:"M75 170 L95 65 L170 120 M230 120 L305 65 L325 170",fill:fur,stroke:ink,"stroke-width":9,"stroke-linejoin":"round"}); }
  else if (is("Cat")) { add("path",{d:"M85 170 L95 65 L175 125 M225 125 L305 65 L315 170",fill:fur,stroke:ink,"stroke-width":9,"stroke-linejoin":"round"}); }
  else if (is("Bear") || is("Panda") || is("Koala")) { add("circle",{cx:105,cy:115,r:42,fill:is("Panda")?ink:fur,stroke:ink,"stroke-width":8}); add("circle",{cx:295,cy:115,r:42,fill:is("Panda")?ink:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Owl")) { add("circle",{cx:130,cy:175,r:68,fill:colored?"#c79b66":ink}); add("circle",{cx:270,cy:175,r:68,fill:colored?"#c79b66":ink}); }
  else if (is("Duck")) { add("path",{d:"M275 205 Q350 170 350 220 Q330 250 275 240Z",fill:accent,stroke:ink,"stroke-width":7}); }
  else if (is("Turtle")) { add("ellipse",{cx:200,cy:245,rx:125,ry:70,fill:colored?"#5b9b63":ink,stroke:ink,"stroke-width":8}); add("circle",{cx:320,cy:230,r:35,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Fish") || is("Whale") || is("Dolphin")) { add("path",{d:"M65 205 Q180 95 295 205 Q180 315 65 205Z",fill:fur,stroke:ink,"stroke-width":8}); add("path",{d:"M285 205 L355 150 L355 260Z",fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Octopus")) { for(let i=0;i<6;i++){const x=95+i*42;add("path",{d:`M200 240 Q${x} 280 ${x-12} 335`,fill:"none",stroke:fur,"stroke-width":22,"stroke-linecap":"round"});} }
  else if (is("Butterfly")) { add("ellipse",{cx:130,cy:170,rx:78,ry:65,fill:colored?"#b5a0e7":ink}); add("ellipse",{cx:270,cy:170,rx:78,ry:65,fill:colored?"#ed9ebd":ink}); }
  else if (is("Bee")) { add("ellipse",{cx:200,cy:215,rx:95,ry:62,fill:colored?"#f1c744":paper,stroke:ink,"stroke-width":9}); add("path",{d:"M160 160 V270 M220 155 V275",stroke:ink,"stroke-width":19}); }
  else if (is("Ladybug")) { add("ellipse",{cx:200,cy:215,rx:105,ry:85,fill:accent,stroke:ink,"stroke-width":9}); add("path",{d:"M200 135 V295",stroke:ink,"stroke-width":8}); [[155,185],[245,185],[155,240],[245,240]].forEach(([cx,cy])=>add("circle",{cx,cy,r:13,fill:ink})); }
  else if (is("Frog")) { add("circle",{cx:140,cy:115,r:45,fill:fur,stroke:ink,"stroke-width":8}); add("circle",{cx:260,cy:115,r:45,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Penguin")) { add("ellipse",{cx:200,cy:210,rx:112,ry:135,fill:ink}); add("ellipse",{cx:200,cy:235,rx:70,ry:95,fill:paper}); }
  else if (is("Monkey")) { add("circle",{cx:105,cy:150,r:37,fill:fur,stroke:ink,"stroke-width":8}); add("circle",{cx:295,cy:150,r:37,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Mouse")) { add("circle",{cx:125,cy:120,r:45,fill:fur,stroke:ink,"stroke-width":8}); add("circle",{cx:275,cy:120,r:45,fill:fur,stroke:ink,"stroke-width":8}); }
  else if (is("Lion")) { add("circle",{cx:105,cy:190,r:32,fill:colored?"#e9ae48":ink}); add("circle",{cx:295,cy:190,r:32,fill:colored?"#e9ae48":ink}); }
  else if (is("Elephant")) { add("path",{d:"M250 200 Q310 225 280 290 Q260 325 230 295",fill:"none",stroke:fur,"stroke-width":42,"stroke-linecap":"round"}); }
  else { add("circle",{cx:105,cy:145,r:35,fill:fur,stroke:ink,"stroke-width":8}); add("circle",{cx:295,cy:145,r:35,fill:fur,stroke:ink,"stroke-width":8}); }
  // Head, muzzle and large eyes stay bold enough to read on a small screen.
  add("ellipse",{cx:200,cy:205,rx:112,ry:118,fill:fur,stroke:ink,"stroke-width":9});
  if (is("Panda")) { add("ellipse",{cx:151,cy:188,rx:32,ry:43,fill:ink,transform:"rotate(25 151 188)"}); add("ellipse",{cx:249,cy:188,rx:32,ry:43,fill:ink,transform:"rotate(-25 249 188)"}); }
  else { add("ellipse",{cx:151,cy:190,rx:25,ry:32,fill:ink}); add("ellipse",{cx:249,cy:190,rx:25,ry:32,fill:ink}); }
  add("circle",{cx:158,cy:181,r:7,fill:paper}); add("circle",{cx:256,cy:181,r:7,fill:paper});
  add("ellipse",{cx:200,cy:246,rx:55,ry:37,fill:colored?"#fff0d7":paper,stroke:ink,"stroke-width":6});
  add("path",{d:"M185 239 Q200 254 215 239",fill:"none",stroke:ink,"stroke-width":7,"stroke-linecap":"round"});
  add("path",{d:"M200 253 V266 Q185 281 171 269 M200 266 Q215 281 229 269",fill:"none",stroke:ink,"stroke-width":6,"stroke-linecap":"round"});
  add("circle",{cx:120,cy:238,r:13,fill:accent,opacity:colored?.8:.95}); add("circle",{cx:280,cy:238,r:13,fill:accent,opacity:colored?.8:.95});
  if (is("Giraffe")) [[140,150],[260,155],[125,240],[270,255]].forEach(([cx,cy])=>add("circle",{cx,cy,r:13,fill:colored?"#c88e34":ink}));
  if (is("Zebra")) [120,155,260,290].forEach((x,i)=>add("path",{d:`M${x} 120 l-18 40 18 12 -15 30`,fill:"none",stroke:ink,"stroke-width":12}));
  return svg;
}

/* Toddler cards get a bold, chunky letter plus a hand-drawn vector
   companion. The letter remains the main event; the little illustration
   makes each card feel like a tiny picture-book page. */
/* Draw an original storybook scene for each letter. Oswald is shown in
   the early black-and-white 1927 style, with long ears and white gloves.
   Each card changes the animal, prop, and pose. */
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
  const wrap = document.createElement("div");
  wrap.className = "toddler-hero";
  const letter = document.createElement("div");
  letter.className = "toddler-big-letter letter-color-" + (card.designIndex % 8);
  letter.textContent = card.name;
  const emoji = document.createElement("div");
  emoji.className = "toddler-big-emoji";
  emoji.textContent = card.emoji;
  emoji.setAttribute("role", "img");
  emoji.setAttribute("aria-label", card.animal);
  wrap.append(letter, emoji);
  return wrap;
}

/* Every card shares the same layout. Only the illustration and labels
   change. This makes adding cards much simpler than writing new HTML. */
function renderCard() {
  const card=currentCards[currentIndex],isToddler=currentMode==="toddler",isPattern=card.type==="pattern",isBabyEmoji=currentMode==="baby"&&card.type==="emoji";
  ui.artwork.replaceChildren();ui.artwork.classList.toggle("emoji-art",isBabyEmoji);ui.artwork.classList.toggle("toddler-art",isToddler);ui.artwork.classList.toggle("animal-art",false);
  if(isToddler){
    ui.artwork.appendChild(drawToddlerFront(card));
    const badge=document.createElement("span");badge.className="toddler-count-badge number-color-"+(card.designIndex%8);badge.textContent=String(Math.min(card.designIndex+1,25));badge.setAttribute("aria-label","Number "+badge.textContent);ui.artwork.appendChild(badge);ui.artwork.style.fontSize="";
  }else if(isPattern){ui.artwork.appendChild(drawContrastDesign(card.designIndex));ui.artwork.style.fontSize="";}
  else if(isBabyEmoji){
    const stage=document.createElement("div");stage.className="baby-emoji-stage emoji-tone-"+(card.designIndex%5);
    const emoji=document.createElement("span");emoji.className="baby-emoji-symbol";emoji.textContent=card.emoji;emoji.setAttribute("role","img");emoji.setAttribute("aria-label",card.name);stage.appendChild(emoji);ui.artwork.appendChild(stage);ui.artwork.style.fontSize="";
  }else{const picture=document.createElement("span");picture.textContent=card.icon;picture.setAttribute("aria-hidden","true");ui.artwork.appendChild(picture);ui.artwork.style.fontSize="";}
  ui.word.textContent=isToddler?card.name+" · "+card.animal:card.name;
  ui.label.textContent=isToddler?"ABC ANIMAL ADVENTURES":isPattern?"20 UNIQUE HIGH-CONTRAST PATTERNS":"20 HIGH-CONTRAST EMOJI CARDS";
  ui.count.innerHTML=String(currentIndex+1).padStart(2,"0")+' <span>/ '+currentCards.length+"</span>";
  ui.progress.style.width=((currentIndex+1)/currentCards.length*100)+"%";ui.progressLabel.textContent=isToddler?"GROWING TOGETHER":"A LITTLE AT A TIME";
  ui.previous.disabled=currentIndex===0;ui.next.disabled=currentIndex===currentCards.length-1;
  ui.flashcard.setAttribute("aria-label",isToddler?card.name+", "+card.animal+", number "+Math.min(card.designIndex+1,25):isPattern?card.name+", high-contrast pattern":card.name+", "+card.emoji);
}

/* Move to a card. Direction determines the soft swipe sound pitch. */
function moveCard(direction) {
  const nextIndex = Math.max(0, Math.min(currentCards.length - 1, currentIndex + direction));
  if (nextIndex === currentIndex) return;
  currentIndex = nextIndex;
  renderCard();
  ui.flashcard.classList.remove("card-changing");
  void ui.flashcard.offsetWidth; // Restart the small arrival animation.
  ui.flashcard.classList.add("card-changing");
  playTone(direction > 0 ? 659.25 : 587.33, 0.10, 0.022, "sine");
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
  ui.collectionTitle.textContent = mode === "toddler" ? language.toddlerCollection : "20 unique patterns + 20 emoji cards";
  ui.collectionKicker.textContent = mode === "toddler" ? language.toddlerKicker : language.babyKicker;
  renderCard();
  playTone(523.25, 0.12, 0.02);
}

ui.previous.addEventListener("click", () => moveCard(-1));
ui.next.addEventListener("click", () => moveCard(1));
ui.surprise.addEventListener("click", chooseSurprise);
ui.modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
ui.playStyleButtons.forEach(button => button.addEventListener("click", () => setPlayStyle(button.dataset.playStyle)));

/* Track a horizontal finger movement to change cards. Vertical movement
   is left alone so the page can still scroll naturally. */
ui.cardArea.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, {passive:true});
ui.cardArea.addEventListener("touchend", event => {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) moveCard(dx < 0 ? 1 : -1);
}, {passive:true});
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
