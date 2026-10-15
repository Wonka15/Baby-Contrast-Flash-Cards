# Contributing to Little Look

Welcome! You do not need to be an expert to make a small improvement.

## The project is intentionally simple

- `index.html` describes the page and its controls.
- `styles.css` controls colors, layout, glass effects, and animation.
- `app.js` contains the card collections and interaction logic.

There is no build step and no dependency installation.

## A friendly first contribution

1. Open an issue describing the change you would like to make.
2. Create a branch for your change, or fork the repository.
3. Make one small change at a time.
4. Preview the page in a browser on both a narrow phone-sized screen and a wider screen.
5. Check that buttons work with touch and keyboard.
6. Open a pull request explaining what changed and how you tested it.

## Adding cards

Keep names short and descriptions gentle. Use age-appropriate, welcoming imagery. For a new baby illustration, add a row to one of the collections in `app.js`. For a new geometric design, add the card to `SHAPE_CARDS` and draw it in `drawPattern()`.

## Code style

- Prefer descriptive names over unexplained abbreviations.
- Add a short comment when a function or interaction might be surprising to a beginner.
- Reuse the existing card renderer rather than copying the HTML for every card.
- Avoid adding dependencies unless they solve a clear problem.
- Respect reduced-motion preferences and keep audio optional and quiet.

## Testing checklist

- [ ] Baby mode shows its cards and the counter is correct.
- [ ] Toddler mode switches to letters and numbers.
- [ ] Swipe, Back, Next, Surprise, double-tap, and Reverse work.
- [ ] Sounds can be muted; Melody can be started and stopped.
- [ ] The layout works on a phone and tablet.
- [ ] The browser console has no new errors.

## Care and accessibility

The app is intended for shared play with a caregiver. Keep controls clear, respect reduced-motion preferences, and avoid claims that the app improves development or replaces professional advice.