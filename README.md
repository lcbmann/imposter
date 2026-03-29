# Imposter

A lightweight, pass-the-phone party game. One player is secretly the Imposter, everyone else sees the secret word. Players reveal their role one at a time, say related words in turn, then vote out who they think the Imposter is.

## Features
- 3-8 player support with a single device.
- Built-in categories with hints.
- Custom categories saved locally in the browser.
- Optional settings to show the Imposter the category, a hint, both, or neither.
- Slightly biased imposter selection so the same player is less likely to be chosen twice in a row.
- Quick reshuffle to reuse the same word with a new Imposter.

## Getting started
Play online: https://lcbmann.github.io/imposter/

If you want to run it locally, open `index.html` in a modern browser. No build step is required.

## How to play
1. Choose the player count and optionally pick a category.
2. Decide whether the Imposter should see the category and/or hint.
3. Start the round and pass the phone:
   - Each player taps to reveal their role, then taps again to hide and hand off.
4. After everyone has seen their role, discuss and vote out one player. Crewmates win if they eject the Imposter; otherwise, the Imposter wins.

## Custom categories
1. Enter a category name.
2. Paste a word list with one entry per line.
3. Use `word | hint` if you want a custom hint for an entry.
4. Save the category and select it from the category menu.

If you run into trouble, share any console logs starting with `[Debug]`.
