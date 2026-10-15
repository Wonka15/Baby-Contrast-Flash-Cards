# Contributing to Little Look

Welcome! You do not need to be an expert to make a small improvement.

## The project is intentionally simple

- `index.html` contains the page structure and accessible controls.
- `styles.css` contains layout, colors, tactile surfaces, and motion.
- `app.js` contains card data, SVG artwork, navigation, counting cards, and sound.
- `scripts/check-app.mjs` checks important links between the HTML and JavaScript.

There is no build step and no third-party dependency installation.

## A friendly first contribution

1. Open an issue describing the improvement you would like to make.
2. Create a branch for your change, or fork the repository.
3. Make one focused change at a time.
4. Preview the page on a phone-sized screen and a wider tablet/desktop screen.
5. Check touch, keyboard, sound mute, and reduced-motion behavior.
6. Run the checks below, then open a pull request describing what changed and how you tested it.

## Adding cards

- Baby patterns are listed in `BABY_PATTERN_NAMES` and drawn in `drawContrastDesign()`.
- Baby picture cards are listed in `BABY_EMOJIS`; keep their names in the mapping next to `BABY_CARDS` in the same order.
- Toddler letter stories live in the `alphabet` list inside `makeToddlerCards()`.
- Counting cards from 0 through 20 are generated from a loop in that same function.

Keep labels short and descriptions gentle. Use high-contrast infant artwork and welcoming toddler illustrations. Prefer extending the existing renderer over copying markup for each card.

## Code style

- Prefer descriptive names over unexplained abbreviations.
- Use small functions with one clear responsibility.
- Add comments when a decision or interaction might surprise a beginner; explain *why*, not just what the next line does.
- Avoid dependencies unless they solve a clear problem.
- Respect reduced-motion preferences and keep sound optional and quiet.
- Keep documentation in sync with the actual card counts and interactions.

## Run the checks

With Node.js installed, run these from the repository root:

```sh
node --check app.js
node scripts/check-app.mjs
```

GitHub Actions runs the same checks on pushes and pull requests.

## Manual testing checklist

- [ ] Baby mode shows 20 patterns and 20 picture cards.
- [ ] Toddler mode shows A–Z and numbers 0–20.
- [ ] Swipe, Back, Next, Surprise, double-tap, and Reverse work.
- [ ] The counter and progress bar match the selected collection.
- [ ] Sounds can be muted; music can be started and stopped.
- [ ] The layout works on a phone and tablet.
- [ ] The browser console has no new errors.

## Care and accessibility

This app is intended for shared play with a caregiver. Keep controls clear, respect reduced-motion preferences, and avoid claims that the app improves development or replaces professional advice.
