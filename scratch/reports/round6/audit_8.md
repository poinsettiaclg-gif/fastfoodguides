# YMYL & Brand Safety Audit Report (Round 6)

## Overview
A strict codebase-wide audit was conducted for YMYL (Your Money or Your Life) risks, specifically targeting health claims, legal advice, dietary cures, and dangerous practices that could trigger Google AdSense rejections. 

## Findings & Violations

### Medical & Health Claims (YMYL)
- **`jack-in-the-box-tacos-made.md`** (Line 93): Explicit mention of **"celiac disease"**. Offering advice on how to advise customers with serious sensitivities.
- **`zaxbys-sauce-recipe.md`** (Line 122): Direct reference to **"celiac disease"** and advising customers to seek allergen info. 
- **`mcdonalds-land-air-sea.md`** (Line 104): Uses highly sensitive medical phrases: **"severe legal and medical liability"** and **"trigger an anaphylactic medical emergency"**. This is high-risk for automated AdSense bots.
- **`panda-express-wok-chef.md`** (Line 48): Mentions that **"Dehydration is a genuine medical concern"**.
- **`kfc-pressure-fryers.md`** (Line 62): Discusses 350-degree oil burns requiring **"medical attention"**.
- **`starbucks-medicine-ball.md`**: While it includes a disclaimer, it repeatedly uses terms like **"flu season," "Cold Buster," "Sick Tea,"** and **"Medicine Ball"**. AdSense bots may still flag the high density of health-related keywords.

### Legal Advice & Lawsuits
- **`subway-tuna.md`**: Deeply covers the "fake tuna" lawsuit. Repeated use of phrases like **"lawsuit," "concoctions," "fraud,"** and **"DNA testing"** could trigger libel and brand safety filters.
- **`arbys-meat-slicer.md`** (Line 59): Discusses that minors are **"legally prohibited"** and cites **"federal labor law under the Fair Labor Standards Act"**.

### Dangerous Practices
- **`burger-king-broiler-closing.md`**: Warns about a **"dangerous steam explosion"** and severe burns if cleaned improperly.
- **`arbys-meat-slicer.md`**: Explicitly discusses how dangerous commercial deli slicers are and the risk of taking a finger off.
- **`chipotle-guacamole.md`** (Line 67): Mentions the "whack and twist" avocado pitting method is **"exactly as dangerous as it sounds"** and cites "avocado hand injuries".

## Recommended Actions
1. **Scrub Specific Diseases:** Remove explicit mentions of "celiac disease" and "anaphylactic medical emergency." Replace them with generic terms like "severe allergen cross-contamination."
2. **Soften Legal Terminology:** In the Subway article, reduce the frequency of the word "lawsuit" to avoid automated brand safety strikes.
3. **Review Medical Terminology:** Ensure that any article discussing injuries (KFC, Panda Express) focuses strictly on the *operational procedure* rather than the medical treatment of the injuries.
