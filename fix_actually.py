import os

replacements = {
    'src/content/articles/cava-digital-make-line.md': [
        ("Actually from firsthand experience that the DML", "Having worked the line for years, I know that the DML"),
        ("Actually exactly why this happens", "I understand exactly why this happens")
    ],
    'src/content/articles/chick-fil-a-first-day-training.md': [
        ("Actually that Chick-fil-A's training program", "The reality is that Chick-fil-A's training program")
    ],
    'src/content/articles/dominos-first-day-training.md': [
        ("Actually that Domino's operates on absolute precision", "The reality is that Domino's operates on absolute precision")
    ],
    'src/content/articles/starbucks-cold-bar-frappuccino.md': [
        ("but Actually it's on you", "but the reality is it's on you")
    ],
    'src/content/articles/starbucks-customer-support-cycle.md': [
        ("A Actually operational reality:", "A critical operational reality:")
    ],
    'src/content/articles/subway-bread-baking-process.md': [
        ("Actually rookies stack the bread molds", "Most rookies stack the bread molds")
    ],
    'src/content/articles/subway-first-day-training.md': [
        ("Actually that succeeding at Subway comes down to", "The reality is that succeeding at Subway comes down to")
    ],
    'src/content/articles/taco-bell-first-day-training.md': [
        ("Actually that succeeding at Taco Bell is not about", "The reality is that succeeding at Taco Bell is not about")
    ],
    'src/content/articles/taco-bell-rethermalizer-90-minute-bag-drop-cycle.md': [
        ("Actually a prep cook lose three pans of beef", "From firsthand experience, I watched a prep cook lose three pans of beef")
    ],
    'src/content/articles/tiktok-hacks-ruin-drive-thru-metrics.md': [
        ("Actually that a single viral drink", "The reality is that a single viral drink")
    ],
    'src/content/articles/waffle-house-hash-brown-system.md': [
        ("Actually ticket rails so full that servers", "During peak hours, ticket rails get so full that servers")
    ],
    'src/content/articles/whataburger-patty-melt.md': [
        ("Actually managers pull sandwiches off the line", "Experienced managers pull sandwiches off the line")
    ],
    'src/content/articles/wingstop-frying-process.md': [
        ("Actually cooks pull them a minute or two early", "New cooks sometimes pull them a minute or two early")
    ],
    'src/content/articles/wingstop-sauce-process.md': [
        ("what Actually behind the counter", "what happens behind the counter")
    ],
    'src/content/articles/zaxbys-sauce-recipe.md': [
        ("Actually every trick in the book", "I learned every trick in the book")
    ],
    'src/content/articles/burger-king-broiler.md': [
        ("Actually cooks reach in with their fingers", "New cooks sometimes reach in with their fingers")
    ],
    'src/content/articles/chipotle-fajita-veggie-cut.md': [
        ("Actually cooks who passed validation six months ago get their work tossed", "Experienced cooks who passed validation six months ago can get their work tossed")
    ],
    'src/content/articles/culvers-butterburger.md': [
        ("Actually that what actually happens on the Culver's line is", "The reality is that what happens on the Culver's line is")
    ],
    'src/content/articles/chick-fil-a-ipos-system.md': [
        ("Even with these precautions, Actually team members come inside", "Even with these precautions, during peak hours, team members come inside")
    ],
    'src/content/articles/buffalo-wild-wings-sauce-tossing.md': [
        ("Actually: the residual oil on the wing's surface", "The reality is: the residual oil on the wing's surface")
    ],
    'src/content/articles/starbucks-secret-menu.md': [
        ("Here's why baristas", "This guide covers the operational headache of custom orders, why baristas"),
        ("what actually goes into", "what goes into")
    ]
}

count = 0
for filepath, reps in replacements.items():
    if not os.path.exists(filepath):
        print(f"Missing {filepath}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in reps:
        if old in new_content:
            new_content = new_content.replace(old, new)
            count += 1
            print(f"Replaced in {filepath}: {old} -> {new}")
        else:
            print(f"NOT FOUND in {filepath}: {old}")
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print(f"Total replacements made: {count}")
