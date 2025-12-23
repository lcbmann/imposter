# Imposter

A lightweight, pass-the-phone party game. One player is secretly the Imposter, everyone else sees the secret word. Players reveal their role one at a time, say related words in turn, then vote out who they think the Imposter is.

## Features
- 3–8 player support with a single device.
- Built-in categories (Food, Animals, Travel, Sports, Movies) with hints.
- Optional settings to show the Imposter the category, a hint, both, or neither.
- Quick reshuffle to reuse the same word with a new Imposter.

## Getting started
Open `index.html` in a modern browser. No build step is required, so it works on GitHub Pages out of the box.

## How to play
1. Choose the player count and optionally pick a category.
2. Decide whether the Imposter should see the category and/or hint.
3. Start the round and pass the phone (Step 2 appears after you start):
   - Each player taps to reveal their role, then taps again to hide and hand off.
4. After everyone has seen their role, discuss and vote out one player. Crewmates win if they eject the Imposter; otherwise, the Imposter wins.

If you run into trouble, share any console logs (starting with `[Debug]`) so we can help diagnose quickly.

### Mobile tips
- Landscape mode gives bigger tap targets during reveals.
- Sticky headers and safe-area padding keep controls readable on small screens.
