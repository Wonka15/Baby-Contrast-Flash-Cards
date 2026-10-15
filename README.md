# Little Look — Baby Contrast Cards

A small, friendly, mobile-first card experience for shared moments with babies and toddlers. Built with plain HTML, CSS, and JavaScript so a new developer can read it, learn from it, and make it their own.

**Repository:** [Wonka15/Baby-Contrast-Flash-Cards](https://github.com/Wonka15/Baby-Contrast-Flash-Cards)

## What's included

### Baby mode — 100 cards
- **25 bold shape and pattern cards:** circles, squares, stripes, spirals, waves, checkerboards, and more.
- **25 nature cards:** flowers, leaves, plants, fruit, carrots, the sun, and the moon.
- **25 animal cards:** elephants, pandas, butterflies, turtles, whales, and more.
- **25 everyday cards:** cars, trains, toys, books, and familiar objects.

### Toddler mode
- All 26 letters of the alphabet, each paired with a little illustration.
- Numbers 0–20 with a friendly picture and a simple counting prompt.
- A separate mode switch makes it easy to grow the experience with your child.

### Interaction and atmosphere
- Swipe left/right to change cards; Back and Next buttons are also available.
- Double-tap a card to flip it. **Reverse** returns to the picture side.
- A Surprise button chooses another card.
- Soft, generated tones accompany card changes and flips; they can be muted.
- **Melody** plays an original, gentle synthesized tune with very quiet, generated stream-like ambience.
- Glass-inspired panels, subtle motion, responsive layout, and reduced-motion support.
- No account, analytics, external audio files, or JavaScript libraries are required.

> **Sound note:** Browsers generally require a tap before they allow sound. The first interaction may be the moment audio becomes available. Melody is synthesized in the browser; it is not a recording of classical music.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. To preview the app while editing, you can also use a local static server or the Live Server extension in your code editor.

The app is static: no server, build step, package installation, or API key is needed.

## Publish with GitHub Pages

1. Open the repository's **Settings** tab.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/(root)`, then save.
5. Wait for the deployment to finish. GitHub will show the website URL in the Pages section.

## Beginner-friendly code tour

| File | What it does |
| --- | --- |
| `index.html` | Page structure, buttons, card front/back, and the About dialog. |
| `styles.css` | Colors, glass effects, layout, responsive rules, and animations. |
| `app.js` | Card data, SVG shape drawing, navigation, flipping, and generated sounds. |

### Add a baby card

Open `app.js` and find `NATURE_CARDS`, `ANIMAL_CARDS`, or `EVERYDAY_CARDS`. Add another item in the same format:

```js
["Ladybird", "🐞", "A tiny beetle with spotted wings."]
```

The app combines the four baby collections automatically. For a new geometric pattern, add a card to `SHAPE_CARDS` and add its SVG drawing inside `drawPattern()`.

### Add a toddler letter or number

Find `makeToddlerCards()`. The `letters` list contains the alphabet; the number list is generated from 0 through 20. You can add translations or adjust the picture and description there.

### Prepare for Spanish

Text labels are gathered in `LANGUAGE_TEXT` near the top of `app.js`. This gives the app a single place to add Spanish interface labels later. Card names and descriptions can then be stored by language instead of being hard-coded into the UI.

## A gentle reminder for caregivers

Explore cards together, keep the device at a comfortable distance, and pause if your baby looks away or seems unsettled. A caregiver's face, voice, and interaction matter most. This app is for shared visual play, not medical advice or a replacement for developmental guidance.

## License

This project is distributed under the existing MIT license.