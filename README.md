# Imposter

Current version: `v2.1.0`

A lightweight, pass-the-phone party game. One player is secretly the Imposter, everyone else sees the secret word. Players reveal their role one at a time, say related words in turn, then vote out who they think the Imposter is.

## Features
- 3-12 player support with a single device.
- Built-in categories with hints.
- Includes `CS:GO` category.
- Custom categories saved locally in the browser.
- Enter-to-add custom word builder with automatic token splitting.
- Optional settings to show the Imposter the category, a hint, both, or neither.
- Optional controls for multiple imposters, used-word reset, and custom-category enable/disable.
- Setup and role-reveal are separate screens so players do not see setup controls during pass-around.
- Slightly biased imposter selection so the same player is less likely to be chosen twice in a row.
- Used-word tracking with reset button to avoid frequent repeats until reset.
- Quick reshuffle to reuse the same word with a new Imposter assignment.

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
2. Type words and press Enter (or click Add).
3. Words split automatically by spaces, commas, semicolons, and new lines.
4. Use quotes to keep multi-word terms together, e.g. `"new york" "bomb site"`.
5. Optional hint format per entry: `word|hint` or `"multi word|hint text"`.
6. Repeat until your chip list has at least two words, then save.

If you run into trouble, share any console logs starting with `[Debug]`.
