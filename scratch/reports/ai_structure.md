# AI Structure Report

## Overview
A review of the articles in `src/content/articles` reveals that while the AI successfully avoided the explicitly banned phrases (e.g., "Here is exactly how", "In conclusion", "Delve into"), it over-indexed on the suggested examples provided in the `AGENTS.md` prompt rules. This resulted in highly repetitive paragraph structures and robotic transitions across multiple articles.

## Repetitive Paragraph Structures and Transitions
The rule requested the AI to write like a "tired kitchen manager" and provided three examples. Instead of varying the language, the AI rigidly reused these exact phrases:

**1. "The reality of the line is..."**
Found in:
- `burger-king-whopper-build-process.md`
- `dairy-queen-grill-and-chill-flow.md`
- `mcdonalds-round-egg-process.md`
- `wendys-baked-potato-process.md`

**2. "What actually happens..."**
Found in:
- `burger-king-whopper-build-process.md`
- `chick-fil-a-first-day-training.md`
- `chipotle-fajita-veggie-cut.md`
- `chipotle-massive-burrito-rolling.md`
- `dairy-queen-blizzard-flip.md`
- `dairy-queen-grill-and-chill-flow.md`
- `five-guys-fry-calibration.md`
- `ihop-pancake-batter.md`
- `mcdonalds-first-day-training.md`
- `mcdonalds-round-egg-process.md`
- `shake-shack-smash-burger.md`
- `wingstop-frying-process.md`

**3. "Step by step, this is the workflow"**
Found in:
- `burger-king-whopper-build-process.md`
- `dairy-queen-grill-and-chill-flow.md`
- `dominos-20-bank-rule.md`
- `wendys-baked-potato-process.md`

## Identical Concluding Sentences
The AI also leaned heavily on a few specific templates to conclude articles or major sections, making the endings feel identical and formulaic:

**1. "... is a rite of passage."**
Found in:
- `chipotle-fajita-veggie-cut.md`
- `kfc-gravy-crackling-process.md`
- `long-john-silvers-fryer.md`
- `mcdonalds-pos-crash.md`
- `sonic-carhops-roller-skate.md`
- `starbucks-first-day-training.md`
- `starbucks-pump-ratios-memorize.md`
- `waffle-house-hash-brown-system.md`
- `wendys-baked-potato-process.md`

**2. "... without breaking a sweat."**
Found in:
- `bojangles-biscuit-process.md`
- `burger-king-whopper-build-process.md`
- `chipotle-grill-validation.md`

**3. "... is a balancing act."**
Found in:
- `bojangles-biscuit-process.md`
- `dairy-queen-grill-and-chill-flow.md`
- `mcdonalds-round-egg-process.md`
- `starbucks-drive-thru-dto-dtr.md`

## Conclusion
The generation prompt should be updated to clarify that the provided gritty phrases are merely examples and should not be used verbatim. The AI needs stronger negative prompting against repeating its own synthetic transitions ("rite of passage", "without breaking a sweat").
