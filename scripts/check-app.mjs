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

// HTML IDs must be unique. Duplicate IDs make selectors and assistive
// technology unreliable, especially when the same control appears twice.
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "index.html contains duplicate IDs");

// Every literal getElementById() call must point to an element in index.html.
const referencedIds = new Set(
  [...app.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map((match) => match[1])
);
const missingIds = [...referencedIds].filter((id) => !ids.includes(id));
assert.deepEqual(missingIds, [], "app.js references HTML IDs that do not exist");

// The baby collections should stay at 20 patterns and 20 picture cards.
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

// Toddler mode contains 26 letter stories and generated counting cards from 0 to 20.
const alphabetData = section(
  app,
  /const alphabet = \[([\s\S]*?)\n  \];/,
  "toddler alphabet"
);
assert.equal(countMatches(alphabetData, /^\s*\["[A-Z]",/gm), 26, "Expected A–Z toddler cards");
assert.match(app, /Array\.from\(\{ length: 21 \}/, "Expected 21 counting cards (0–20)");
assert.match(app, /return \[\.\.\.letterCards, \.\.\.numberCards\]/, "Toddler cards should include letters and numbers");

// Keep the reverse side, documentation, and card-count claims from drifting apart.
assert.ok(html.includes('id="card-back"'), "The reverse side must exist in index.html");
assert.ok(html.includes('id="reverse-button"'), "The Reverse button must exist in index.html");
assert.ok(app.includes("function toggleCardSide()"), "Double-tap reverse behavior must exist in app.js");
assert.ok(readme.includes("40 cards"), "README should document the 40 baby cards");
assert.ok(readme.includes("47 cards"), "README should document the 47 toddler cards");

console.log("✓ HTML IDs are unique and all JavaScript ID references exist.");
console.log("✓ Baby mode has 20 patterns and 20 picture cards.");
console.log("✓ Toddler mode has 26 letters and numbers 0–20 (47 cards total).");
console.log("✓ Reverse-side interaction and README card counts are present.");
