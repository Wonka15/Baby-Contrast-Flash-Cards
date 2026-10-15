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
const arData = section(app, /const AR_ANIMALS = \[([\\s\\S]*?)\\n\];/, "AR_ANIMALS");
assert.equal(countMatches(arData, /^\\s*\\["/gm), 26, "Expected 26 AR animal cards");
assert.match(html, /id="ar-mode-button"/, "AR Mode Deck button should be present");
assert.match(app, /function drawARFront\(card\)/, "AR cards should have their own visual renderer");
assert.match(app, /className = "ar-big-letter"/, "AR cards should show bold blue initials");
assert.match(app, /className = "ar-big-emoji"/, "AR cards should show dimensional-style emojis");

// The old character artwork, number deck, and card-reverse interaction are intentionally gone.
assert.doesNotMatch(app, /Oswald|drawToddlerArt|numberCards|toggleCardSide|reverseButton/i);
assert.doesNotMatch(html, /card-back|reverse-button|double-tap/i);
assert.doesNotMatch(readme, /Oswald|47 cards|reverse-side|numbers 0–20/i);
assert.ok(readme.includes("26 cards"), "README should document the 26 toddler cards");
assert.ok(readme.includes("40 cards"), "README should document the 40 baby cards");

console.log("✓ HTML IDs are unique and all JavaScript ID references exist.");
console.log("✓ Baby mode has 20 patterns and 20 picture cards.");
console.log("✓ Toddler mode has 26 letters paired with animal emojis.");
console.log("✓ AR Mode Deck has 26 requested animals and its own 3D-style renderer.");
console.log("✓ Character art, number deck, and reverse-card interaction are removed.");
