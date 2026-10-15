# Little Look — Baby Contrast Cards

**Current version: 1.5.0** · [Changelog](CHANGELOG.md)

A calm, mobile-first flash-card app for sharing visual discoveries with babies and playful learning with toddlers. It is built with plain HTML, CSS, and JavaScript so a new developer can read the source and make it their own.

**Live app:** https://wonka15.github.io/Baby-Contrast-Flash-Cards/  
**Repository:** https://github.com/Wonka15/Baby-Contrast-Flash-Cards

## What's in the app

### Baby mode — 40 cards
- **20 original high-contrast patterns** drawn as SVG, using deep black, bright white, and strong red accents.
- **20 picture cards** featuring simple symbols, everyday fruit, and animals.
- A clear card counter, progress bar, Back and Next buttons, and a Surprise button.

### Toddler mode — 26 cards
- The complete **A–Z alphabet**, with one large colorful letter and a matching animal emoji on each card.
- Familiar animals such as an ant, bear, cat, elephant, giraffe, monkey, rabbit, turtle, whale, and zebra.
- Simple cards with no character artwork or extra number deck.

### Animated Mode — 26 dimensional-style animal cards
- A compact **Animated Mode** button opens a special set featuring the 26 requested animals, in the requested order.
- Each card pairs a bold blue initial with a native device emoji, glossy highlights, layered shadows, and twinkling blue diamond accents.
- This is a visual 3D-style effect built with CSS and system emoji—not a camera-based augmented-reality experience or custom 3D model.

### Touch, sound, and music
- Swipe horizontally or use Back and Next to navigate.
- Surprise chooses a different card.
- Gentle navigation sounds can be muted.
- The music panel includes station pages and YouTube embeds. External playback depends on the provider, browser, and network; use the station link if an embed does not play.
- Responsive glass-inspired styling, visible keyboard focus, and reduced-motion support.

Baby Mode also has a small animated star field: stars are white with a few red accents, outlined for contrast, and become still when reduced motion is enabled.

### Device-friendly layout

The interface adapts to narrow iPhones, larger iPhones, iPads, and Android phones such as Google Pixel. Styles account for display cutouts and the home-indicator safe area, keep touch targets comfortable, avoid iOS form-field zoom, and adjust the card for short landscape screens. These are responsive safeguards; actual device/browser testing is still recommended before calling the release fully verified.

## A small, important note for caregivers

Explore together and keep the screen at a comfortable distance. Pause if your baby looks away or seems unsettled. Your voice, face, and interaction matter most; this app is for shared visual play, not medical advice or a replacement for developmental guidance.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. For a more realistic preview while editing, use any local static web server.

The card app itself needs no build step, package installation, API key, or backend service. Choosing a radio station may connect to that provider or to YouTube.

## Publish with GitHub Pages

1. Open the repository's **Settings** tab.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/(root)`, then save.
5. Wait for the deployment workflow to finish. GitHub shows the published URL in the Pages settings.

## Beginner-friendly code tour

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, collection controls, music player, and About dialog. |
| `styles.css` | Layout, colors, tactile controls, responsive rules, and animations. |
| `app.js` | Card data, high-contrast SVG patterns, A–Z emoji cards, Animated Mode, navigation, and sound. |
| `scripts/check-app.mjs` | Dependency-free checks for card counts and HTML/JavaScript references. |
| `.github/workflows/checks.yml` | Runs the JavaScript syntax check and repository checks on pushes and pull requests. |
| `.github/workflows/deploy-pages.yml` | Publishes the static site to GitHub Pages. |

### Add a baby pattern

1. Add a name and description to `BABY_PATTERN_NAMES` in `app.js`.
2. Add a matching drawing branch to `drawContrastDesign()` using that card's index.
3. Run the repository checks before committing.

### Change a baby picture card

Edit `BABY_EMOJIS` and the matching names in the `BABY_CARDS` mapping. Keep both lists the same length so each picture gets the intended name.

### Change a toddler letter

Edit the `alphabet` list inside `makeToddlerCards()`. Each entry contains the letter, animal name, and emoji.

### Prepare for Spanish

Interface labels are grouped in `LANGUAGE_TEXT` near the top of `app.js`. Card descriptions are currently written in English; full Spanish support will also need translated card names and prompts.

## Checks

The repository includes a lightweight Node.js check with no third-party dependencies:

```sh
node --check app.js
node scripts/check-app.mjs
```

## License

This project is distributed under the existing MIT license.
