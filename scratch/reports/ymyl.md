# YMYL Disclaimer Audit Report

This report analyzes health and safety articles for the presence and accuracy of their `disclaimerType` in the frontmatter. We checked for keywords indicating YMYL (Your Money or Your Life) topics such as *undercooked*, *raw meat*, *food poisoning*, *foodborne*, *lawsuit*, and *e. coli*.

## Missing Disclaimers
The following articles discuss YMYL topics but are completely missing a `disclaimerType`:
- `panda-express-leftover-food.md` (Topic: food poisoning)

## Potentially Misclassified Disclaimers
Many articles are currently tagged with `disclaimerType: medical` when they actually relate to food safety (e.g., handling raw meat, undercooked food, or foodborne illness) or are tagged with `legal` incorrectly.

### Should likely be `food_safety`
These are currently tagged as `medical`:
- `buffalo-wild-wings-sauce-tossing.md` (Topic: undercooked)
- `chipotle-grill-validation.md` (Topic: undercooked/raw meat/e. coli)
- `five-guys-first-day-training.md` (Topic: raw meat)
- `five-guys-fry-calibration.md` (Topic: undercooked)
- `five-guys-no-freezers.md` (Topic: raw meat)
- `ihop-pancake-batter.md` (Topic: undercooked)
- `jack-in-the-box-tacos-made.md` (Topic: raw meat)
- `mcdonalds-nugget-process.md` (Topic: undercooked)
- `subway-bain-fill-line-rule.md` (Topic: foodborne illness)
- `wendys-4-corner-press.md` (Topic: raw meat)
- `wendys-baked-potato-process.md` (Topic: undercooked)
- `white-castle-slider-steam-grill.md` (Topic: undercooked)
- `wingstop-frying-process.md` (Topic: foodborne illness)

These are currently tagged as `legal` but are primarily about food safety/kitchen hazards:
- `burger-king-broiler.md` (Topic: undercooked/injury)
- `panda-express-wok-chef.md` (Topic: raw meat/injury)
- `wendys-first-day-training.md` (Topic: raw meat)

### Correctly Tagged (For Reference)
These articles appear to have appropriate tags based on their content:

**Food Safety (`food_safety`)**
- `five-guys-morning-meat-prep.md` (Topic: raw meat)
- `jersey-mikes-hot-sub-grill.md` (Topic: raw meat/undercooked)
- `kfc-pressure-fryers.md` (Topic: lawsuit/safety/injury)
- `wendys-clamshell-grill.md` (Topic: undercooked)

**Legal (`legal`)**
- `mcdonalds-fry-station.md` (Topic: lawsuit)
- `mcdonalds-ice-cream-machine.md` (Topic: lawsuit)
- `pizza-delivery-driver-accident.md` (Topic: lawsuit)
- `sonic-carhops-roller-skate.md` (Topic: lawsuit/injury)
- `subway-tuna.md` (Topic: lawsuit)
