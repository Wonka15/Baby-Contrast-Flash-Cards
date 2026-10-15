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
    babyCollection: "Shapes & little things",
    toddlerCollection: "Letters & numbers",
    babyKicker: "THE FIRST COLLECTION", toddlerKicker: "GROWING TOGETHER",
    look: "LOOK CLOSELY", backPrompt: "Can you find one together?",
    flipHint: "TAP TWICE TO TURN", next: "Next card", previous: "Back",
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

/* This collection contains 100 baby cards: 25 patterns, 25 nature cards,
   25 animals, and 25 familiar objects. */
const BABY_CARDS = [...SHAPE_CARDS,...NATURE_CARDS,...ANIMAL_CARDS,...EVERYDAY_CARDS];

/* Toddler mode grows with your child: all 26 letters plus numbers 0–20.
   This is intentionally separate from the infant card set. */
function makeToddlerCards() {
  const letters = [
    ["A","🍎","A is for apple."],["B","🐻","B is for bear."],["C","🚗","C is for car."],
    ["D","🦕","D is for dinosaur."],["E","🐘","E is for elephant."],["F","🌸","F is for flower."],
    ["G","🦒","G is for giraffe."],["H","🏠","H is for house."],["I","🍦","I is for ice cream."],
    ["J","🫙","J is for jar."],["K","🪁","K is for kite."],["L","🦁","L is for lion."],
    ["M","🌙","M is for moon."],["N","🥜","N is for nut."],["O","🐙","O is for octopus."],
    ["P","🐧","P is for penguin."],["Q","👸","Q is for queen."],["R","🌈","R is for rainbow."],
    ["S","☀️","S is for sun."],["T","🐢","T is for turtle."],["U","☂️","U is for umbrella."],
    ["V","🎻","V is for violin."],["W","🐳","W is for whale."],["X","🎼","X marks the spot."],
    ["Y","🧶","Y is for yarn."],["Z","🦓","Z is for zebra."]
  ].map(([letter,icon,description])=>({name:letter,icon,description,type:"letter",group:"Alphabet",symbol:letter}));
  const numbers = Array.from({length:21},(_,number)=>({
    name:String(number),icon:["⭐","🐞","🍓","🦋","🌼"][number%5],
    description:number===0?"Zero means none.":number===1?"One little friend.":`Let's count to ${number} together.`,
    type:"number",group:"Numbers",symbol:String(number),number
  }));
  return [...letters,...numbers];
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
  backSymbol: document.getElementById("back-symbol"),
  backTitle: document.getElementById("back-title"),
  backDescription: document.getElementById("back-description"),
  progress: document.getElementById("progress-bar"),
  progressLabel: document.getElementById("progress-label"),
  previous: document.getElementById("previous-button"),
  next: document.getElementById("next-button"),
  reverse: document.getElementById("reverse-button"),
  surprise: document.getElementById("surprise-button"),
  melody: document.getElementById("melody-button"),
  soundToggle: document.getElementById("sound-toggle"),
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  aboutDialog: document.getElementById("about-dialog")
};
const toddlerCards = makeToddlerCards();
let currentMode = "baby";
let currentCards = BABY_CARDS;
let currentIndex = 0;
let soundsEnabled = true;
let lastTapTime = 0;
let touchStartX = 0;
let touchStartY = 0;
let audioContext = null;
let melodyTimer = null;
let streamSource = null;
let streamGain = null;
let melodyGain = null;
let melodyStep = 0;

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

/* A short, soft tone used for card swipes and reversing a card. */
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

/* Generate quiet "stream" ambience from filtered noise. No audio file
   or external streaming service is used. Volume stays deliberately low. */
function startStreamAmbience() {
  const context = getAudioContext();
  if (!context || streamSource) return;
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) channel[i] = (Math.random() * 2 - 1) * 0.22;
  streamSource = context.createBufferSource();
  streamSource.buffer = buffer;
  streamSource.loop = true;
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 650;
  streamGain = context.createGain();
  streamGain.gain.value = 0.012;
  streamSource.connect(filter);
  filter.connect(streamGain);
  streamGain.connect(context.destination);
  streamSource.start();
}

/* Play an original, slow, music-box-like tune. This is synthesized in
   the browser rather than embedding copyrighted classical recordings. */
function playMelodyNote() {
  if (!melodyGain || !audioContext) return;
  const notes = [523.25,659.25,783.99,659.25,587.33,698.46,659.25,523.25,493.88,587.33,659.25,587.33];
  const frequency = notes[melodyStep % notes.length];
  melodyStep++;
  const oscillator = audioContext.createOscillator();
  const noteGain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  noteGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.08);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.25);
  oscillator.connect(noteGain);
  noteGain.connect(melodyGain);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.3);
}
function startMelody() {
  const context = getAudioContext();
  if (!context || melodyTimer) return;
  melodyGain = context.createGain();
  melodyGain.gain.value = 0.45;
  melodyGain.connect(context.destination);
  startStreamAmbience();
  playMelodyNote();
  melodyTimer = window.setInterval(playMelodyNote, 1250);
  ui.melody.setAttribute("aria-pressed", "true");
  ui.melody.setAttribute("aria-label", "Stop gentle melody");
}
function stopMelody() {
  if (melodyTimer) window.clearInterval(melodyTimer);
  melodyTimer = null;
  if (melodyGain) {
    const oldGain = melodyGain;
    oldGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.12);
    window.setTimeout(() => { try { oldGain.disconnect(); } catch (_) {} }, 600);
  }
  melodyGain = null;
  if (streamSource) {
    try { streamSource.stop(); streamSource.disconnect(); } catch (_) {}
    streamSource = null;
  }
  if (streamGain) { try { streamGain.disconnect(); } catch (_) {} streamGain = null; }
  ui.melody.setAttribute("aria-pressed", "false");
  ui.melody.setAttribute("aria-label", "Play gentle melody");
}

/* Draw a pattern using simple SVG primitives. SVG keeps the art sharp
   on retina screens and makes the shapes easy for new developers to edit. */
function drawPattern(style) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", style + " pattern");
  const add = (tag, attrs) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    svg.appendChild(node);
    return node;
  };
  const ink = "#30372b", cream = "#fffdf6", green = "#b7cf98";
  add("rect", {x:0,y:0,width:400,height:400,rx:24,fill:cream});
  if (style === "rings" || style === "oval") {
    [165,132,99,66,33].forEach((r,i)=>add("circle",{cx:200,cy:200,r,fill:i%2?cream:ink}));
    if(style==="oval") svg.lastChild.setAttribute("ry","25");
  } else if (style === "square" || style === "rectangle" || style === "checker" || style === "woven") {
    if(style==="checker" || style==="woven"){
      for(let y=0;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2===0)add("rect",{x:x*50,y:y*50,width:50,height:50,fill:ink});
      if(style==="woven") for(let y=25;y<400;y+=50)add("path",{d:`M0 ${y} H400`,stroke:green,"stroke-width":10});
    } else add("rect",{x:style==="square"?65:25,y:style==="square"?65:100,width:style==="square"?270:350,height:style==="square"?270:200,rx:style==="square"?0:8,fill:ink});
  } else if (style === "triangle" || style === "diamond" || style === "hexagon" || style === "star" || style === "heart" || style === "moon") {
    const paths = {
      triangle:"200,48 350,330 50,330",diamond:"200,38 350,200 200,362 50,200",
      hexagon:"110,45 290,45 365,200 290,355 110,355 35,200",
      star:"200,30 242,145 365,150 270,228 300,350 200,280 100,350 130,228 35,150 158,145",
      heart:"M200 345 C170 310 45 220 55 125 C65 35 170 45 200 120 C230 45 335 35 345 125 C355 220 230 310 200 345",
      moon:"M260 48 C125 60 90 280 250 345 C100 360 35 240 65 145 C95 60 180 25 260 48"
    };
    add("polygon",{points:paths[style],fill:style==="heart"?"#d98e83":ink});
  } else if (style === "stripes") {
    for(let x=0;x<400;x+=48)add("rect",{x,y:0,width:24,height:400,fill:ink});
  } else if (style === "zigzag") {
    for(let y=60;y<400;y+=85){let d=`M0 ${y}`;for(let x=0;x<=400;x+=40)d+=` L${x} ${y-28}` ;add("path",{d,fill:"none",stroke:ink,"stroke-width":15,"stroke-linejoin":"round"});}
  } else if (style === "waves") {
    for(let y=40;y<420;y+=52){let d=`M0 ${y}`;for(let x=0;x<=400;x+=8)d+=` L${x} ${y+Math.sin(x/400*Math.PI*4)*17}`;add("path",{d,fill:"none",stroke:ink,"stroke-width":10,"stroke-linecap":"round"});}
  } else if (style === "spiral") {
    let d="";for(let t=0;t<=1050;t+=4){const a=t*.035,r=3+t*.12;d+=(t?"L":"M")+(200+Math.cos(a)*r).toFixed(1)+" "+(200+Math.sin(a)*r).toFixed(1)+" ";}
    add("path",{d,fill:"none",stroke:ink,"stroke-width":13,"stroke-linecap":"round"});
  } else if (style === "dots" || style === "tinyDots" || style === "spots") {
    const step=style==="tinyDots"?25:style==="spots"?95:70;
    for(let y=step/2;y<400;y+=step)for(let x=step/2;x<400;x+=step){const r=style==="tinyDots"?4:style==="spots"?22:13+((x+y)%3)*5;add("circle",{cx:x,cy:y,r,fill:(Math.floor(x/step)+Math.floor(y/step))%2?green:ink});}
  } else if (style === "arches" || style === "fan") {
    for(let i=0;i<7;i++){const width=340-i*42,x=(400-width)/2;add("path",{d:`M${x} 350 V${220-i*17} A${width/2} ${width/2} 0 0 1 ${x+width} ${220-i*17} V350`,fill:"none",stroke:i%2?green:ink,"stroke-width":18,"stroke-linejoin":"round"});}
  } else if (style === "burst") {
    for(let i=0;i<24;i++){const a=i*Math.PI/12;add("line",{x1:200+Math.cos(a)*30,y1:200+Math.sin(a)*30,x2:200+Math.cos(a)*170,y2:200+Math.sin(a)*170,stroke:ink,"stroke-width":i%2?7:13,"stroke-linecap":"round"});}
    add("circle",{cx:200,cy:200,r:35,fill:green});
  } else if (style === "half") {
    add("circle",{cx:200,cy:200,r:150,fill:cream,stroke:ink,"stroke-width":8});
    add("path",{d:"M200 50 A150 150 0 0 0 200 350 Z",fill:ink});
  } else if (style === "cross") {
    add("rect",{x:155,y:45,width:90,height:310,rx:15,fill:ink});add("rect",{x:45,y:155,width:310,height:90,rx:15,fill:ink});
  } else if (style === "fan") {
    for(let i=0;i<9;i++)add("path",{d:`M200 355 L${30+i*42} 80 Q200 20 ${370-i*42} 80 Z`,fill:i%2?green:ink,opacity:.85});
  } else {
    [55,125,195,265,335].forEach((x,i)=>add("circle",{cx:x,cy:200,r:22,fill:i%2?green:ink}));
  }
  return svg;
}

/* Every card shares the same layout. Only the illustration and labels
   change. This makes adding cards much simpler than writing new HTML. */
function renderCard() {
  const card = currentCards[currentIndex];
  const isPattern = card.type === "pattern";
  ui.artwork.replaceChildren();
  ui.artwork.classList.toggle("emoji-art", !isPattern);
  if (isPattern) {
    ui.artwork.appendChild(drawPattern(card.art));
    ui.artwork.style.fontSize = "";
  } else {
    const picture = document.createElement("span");
    picture.textContent = card.icon;
    picture.setAttribute("aria-hidden", "true");
    ui.artwork.appendChild(picture);
    ui.artwork.style.fontSize = card.type === "letter" || card.type === "number" ? "clamp(100px,28vw,190px)" : "";
  }
  ui.word.textContent = card.name;
  ui.label.textContent = currentMode === "toddler" ? card.group.toUpperCase() : card.group.toUpperCase();
  ui.backSymbol.textContent = card.symbol || card.icon;
  ui.backTitle.textContent = card.type === "letter" ? `Letter ${card.name}` : card.type === "number" ? `Number ${card.name}` : card.name;
  ui.backDescription.textContent = card.description;
  ui.count.innerHTML = `${String(currentIndex + 1).padStart(2,"0")} <span>/ ${currentCards.length}</span>`;
  ui.progress.style.width = `${((currentIndex + 1) / currentCards.length) * 100}%`;
  ui.progressLabel.textContent = currentMode === "toddler" ? "GROWING TOGETHER" : "A LITTLE AT A TIME";
  ui.previous.disabled = currentIndex === 0;
  ui.next.disabled = currentIndex === currentCards.length - 1;
  ui.flashcard.classList.remove("is-flipped");
  ui.flashcard.setAttribute("aria-label", `${card.name}. Double tap to turn the card over.`);
}

/* Keep the flip animation in one function so both double-tap and the
   Reverse button behave consistently. */
function flipCard(forceFront = false) {
  const shouldFlip = forceFront ? false : !ui.flashcard.classList.contains("is-flipped");
  ui.flashcard.classList.toggle("is-flipped", shouldFlip);
  if (shouldFlip) playTone(523.25, 0.16, 0.025, "sine");
  else playTone(392, 0.13, 0.022, "sine");
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
  ui.collectionTitle.textContent = mode === "toddler" ? language.toddlerCollection : language.babyCollection;
  ui.collectionKicker.textContent = mode === "toddler" ? language.toddlerKicker : language.babyKicker;
  renderCard();
  playTone(523.25, 0.12, 0.02);
}

/* Tap twice quickly to flip. A single tap does not accidentally turn the
   card over, so a parent can tap once before swiping to the next card.
   Keyboard activation remains available through Enter or Space. */
ui.flashcard.addEventListener("pointerup", event => {
  if (event.pointerType === "mouse") return;
  const now = Date.now();
  if (now - lastTapTime < 360) {
    flipCard();
    lastTapTime = 0;
  } else {
    lastTapTime = now;
  }
});
ui.flashcard.addEventListener("dblclick", event => {
  event.preventDefault();
  flipCard();
});
ui.flashcard.addEventListener("click", event => {
  if (event.detail === 0) flipCard(); // Keyboard activation, not a pointer tap.
});
ui.reverse.addEventListener("click", () => flipCard(true));
ui.previous.addEventListener("click", () => moveCard(-1));
ui.next.addEventListener("click", () => moveCard(1));
ui.surprise.addEventListener("click", chooseSurprise);
ui.modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));

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

/* Card sounds and background melody have separate controls. */
ui.soundToggle.addEventListener("click", () => {
  soundsEnabled = !soundsEnabled;
  ui.soundToggle.textContent = soundsEnabled ? language.mute : language.unmute;
  ui.soundToggle.setAttribute("aria-pressed", String(soundsEnabled));
  if (soundsEnabled) playTone(523.25, 0.12, 0.02);
});
ui.melody.addEventListener("click", () => {
  if (melodyTimer) stopMelody();
  else startMelody();
});

/* A tiny About dialog keeps explanatory copy out of the main experience. */
document.getElementById("about-button").addEventListener("click", () => ui.aboutDialog.showModal());
document.getElementById("close-about").addEventListener("click", () => ui.aboutDialog.close());
document.getElementById("done-about").addEventListener("click", () => ui.aboutDialog.close());
ui.aboutDialog.addEventListener("click", event => {
  if (event.target === ui.aboutDialog) ui.aboutDialog.close();
});

/* Start quietly. Browsers only allow generated audio after the first
   user gesture, so sounds begin when a parent first changes a card. */
renderCard();
