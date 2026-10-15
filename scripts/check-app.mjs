/*
 * Small, dependency-free repository checks.
 *
 * These checks catch common beginner mistakes before a change is published:
 * missing HTML IDs, accidental card-count changes, and documentation drift.
 * They are intentionally simple so a new contributor can understand them.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relativePath) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), "utf8");

const html = read("../index.html");
const app = read("../app.js");
const readme = read("../README.md");
const css = read("../styles.css");

function countMatches(text, expression) {
  return [...text.matchAll(expression)].length;
}

function section(source, expression, description) {
  const match = source.match(expression);
  assert.ok(match, `Could not find ${description} in app.js`);
  return match[1];
}

// HTML IDs must be unique so controls and assistive technology work reliably.
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "index.html contains duplicate IDs");

// Every literal getElementById() call must point to an element in index.html.
const referencedIds = new Set(
  [...app.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map((match) => match[1])
);
const missingIds = [...referencedIds].filter((id) => !ids.includes(id));
assert.deepEqual(missingIds, [], "app.js references HTML IDs that do not exist");

// Baby mode should keep its 20 patterns and 20 picture cards.
const patternData = section(
  app,
  /const BABY_PATTERN_NAMES = \[([\s\S]*?)\n\];/,
  "BABY_PATTERN_NAMES"
);
const emojiData = section(
  app,
  /const BABY_EMOJIS = \[([\s\S]*?)\];/,
  "BABY_EMOJIS"
);
assert.equal(countMatches(patternData, /^\s*\["/gm), 20, "Expected 20 baby patterns");
assert.equal(countMatches(emojiData, /"(?:[^"\\]|\\.)*"/g), 20, "Expected 20 baby picture cards");

// Toddler mode is the simple A–Z set: 26 letters paired with animal emojis.
const alphabetData = section(
  app,
  /const alphabet = \[([\s\S]*?)\n  \];/,
  "toddler alphabet"
);
assert.equal(countMatches(alphabetData, /^\s*\["[A-Z]",/gm), 26, "Expected A–Z toddler cards");
assert.match(app, /return alphabet\.map\(\(\[letter, animal, emoji\]/, "Each toddler letter should include an emoji");
assert.match(app, /className = "toddler-big-letter/, "Toddler cards should show large letters");
assert.match(app, /className = "toddler-big-emoji/, "Toddler cards should show animal emojis");

// The special AR-style deck contains the 26 requested animal emoji cards.
const arData = section(app, /const AR_ANIMALS = \[([\s\S]*?)\n\];/, "AR_ANIMALS");
assert.equal(countMatches(arData, /\["[A-Z]",\s*"[^"]+",\s*"[^"]+"\]/g), 26, "Expected 26 Animated Mode A–Z animal cards");
assert.deepEqual([...arData.matchAll(/\["([A-Z])",/g)].map((match) => match[1]), [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"], "Animated Mode must include every letter A–Z in order");
assert.match(html, /id="ar-mode-button"/, "Animated Mode button should be present");
assert.match(app, /function drawARFront\(card\)/, "AR cards should have their own visual renderer");
assert.match(app, /className = "ar-big-letter"/, "AR cards should show bold blue initials");
assert.match(app, /className = "ar-big-emoji"/, "Animated cards should show dimensional-style emojis");
assert.match(app, /function splashIntoWater\(\)/, "Animated Mode emojis should trigger the water dunk effect");
assert.match(css, /\.ar-water-ripple/, "Animated Mode should render water ripple effects");
assert.match(css, /@keyframes ar-emoji-dunk/, "Animated Mode should animate the emoji diving into water");
assert.match(app, /function handleDeviceMotion\(event\)/, "Animated Mode should detect device motion");
assert.match(app, /DeviceMotionEvent/, "Motion effects should be available on supported phones");
assert.match(app, /Enable shake effects/, "Animated Mode should provide an opt-in motion control");
assert.match(app, /triggerMotionBurst/, "Shaking should trigger extra splash effects");
// The explicit A–Z order assertion above is the source-of-truth regression check.

// Responsive safeguards for small iPhones, notches, touch targets, and landscape phones.
assert.match(html, /name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/, "Viewport should support modern phone safe areas");
assert.match(html, /apple-mobile-web-app-capable/, "iOS standalone display metadata should be present");
assert.match(css, /env\(safe-area-inset-bottom\)/, "Layout should respect the iPhone home-indicator safe area");
assert.match(css, /max-width: 360px/, "Very narrow phones should have a dedicated layout");
assert.match(css, /orientation: landscape/, "Short landscape screens should be supported");
assert.match(css, /pointer: coarse/, "Touch devices should get larger tap targets");
assert.match(css, /font-size: 16px/, "Form controls should avoid unwanted iOS zoom");

assert.match(app, /function addBabyStarLayer\(stage\)/, "Baby Mode should create a decorative star field");
assert.match(app, /baby-twinkle-star/, "Baby Mode stars should use their dedicated style");
assert.match(css, /@keyframes baby-star-flicker/, "Baby Mode stars should gently flicker");
assert.match(css, /prefers-reduced-motion: reduce/, "Star flicker should respect reduced-motion preferences");
assert.match(css, /\.baby-twinkle-star\.is-red/, "Star accents should use the high-contrast red option");

// The old character artwork, number deck, and card-reverse interaction are intentionally gone.
assert.doesNotMatch(app, /Oswald|drawToddlerArt|numberCards|toggleCardSide|reverseButton/i);
assert.doesNotMatch(html, /card-back|reverse-button|double-tap/i);
assert.doesNotMatch(readme, /Oswald|47 cards|reverse-side|numbers 0–20/i);
assert.ok(readme.includes("26 cards"), "README should document the 26 toddler cards");
assert.ok(readme.includes("40 cards"), "README should document the 40 baby cards");

console.log("✓ HTML IDs are unique and all JavaScript ID references exist.");
console.log("✓ Baby mode has 20 patterns and 20 picture cards.");
console.log("✓ Toddler mode has 26 letters paired with animal emojis.");
console.log("✓ Animated Mode has every letter A–Z paired with an animal, plus dunk and splash effects.");
console.log("✓ Character art, number deck, and reverse-card interaction are removed.");
