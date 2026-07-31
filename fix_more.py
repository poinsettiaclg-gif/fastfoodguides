import os

replacements = {
    'src/content/articles/five-guys-fry-calibration.md': [
        ("The opening manager is Actually responsible", "The opening manager is entirely responsible")
    ],
    'src/content/articles/jersey-mikes-mikes-way.md': [
        ("it's Actually to understand:", "it's critical to understand:")
    ],
    'src/content/articles/jimmy-johns-freaky-fast.md': [
        ("Actually what happens when a store falls behind", "I have witnessed what happens when a store falls behind")
    ],
    'src/content/articles/mcdonalds-q-ing-oven.md': [
        ("piece of Actually kitchen equipment", "piece of essential kitchen equipment")
    ],
    'src/content/articles/mcdonalds-uhc-cabinet.md': [
        ("Actually that the UHC is the absolute heartbeat", "I know that the UHC is the absolute heartbeat")
    ],
    'src/content/articles/papa-johns-dough-slapping.md': [
        ("Setting the 'edge lock' (a defined border) is Actually.", "Setting the 'edge lock' (a defined border) is critical.")
    ],
    'src/content/articles/starbucks-tiktok-hacks-debunked.md': [
        ("Actually that the internet's obsession", "I know that the internet's obsession")
    ]
}

count = 0
for filepath, reps in replacements.items():
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in reps:
        if old in new_content:
            new_content = new_content.replace(old, new)
            count += 1
            print(f"Replaced: {old}")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print(f'Fixed {count} more issues')
