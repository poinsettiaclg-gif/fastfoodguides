import os

replacements = {
    'src/content/articles/dominos-gas.md': [
        ("Actually rookies show up in lifted trucks", "Many rookies show up in lifted trucks")
    ],
    'src/content/articles/dominos-makeline-routing.md': [
        ("Actually that surviving a Friday night dinner rush at Domino's", "I know that surviving a Friday night dinner rush at Domino's")
    ],
    'src/content/articles/dominos-oven-tender-role.md': [
        ("Actually dehydration hit Tenders faster than they expected,", "I have seen dehydration hit Tenders faster than they expected,")
    ],
    'src/content/articles/firehouse-subs-steaming-process.md': [
        ("one of the smartest things Actually in the sandwich segment.", "one of the smartest things I have seen in the sandwich segment.")
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
