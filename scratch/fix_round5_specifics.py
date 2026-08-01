import os

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Subway Tuna
replace_in_file(
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\subway-tuna.md",
    [
        ("protein mix", "tuna"),
        ("Protein mix", "Tuna"),
        ("legal inquiries", "lawsuit"),
        ("Legal inquiries", "Lawsuit"),
        ("The lawsuit's", "The lawsuit's") # Catch grammar fix if needed
    ]
)

# 2. Dunkin Flavor Shot vs Swirl
# Need to remove H2: ## Surviving the 6 AM to 9 AM Starbucks Morning Rush: How the Bar Stays Afloat
replace_in_file(
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\dunkin-flavor-shot-vs-swirl.md",
    [
        ("## Surviving the 6 AM to 9 AM Starbucks Morning Rush: How the Bar Stays Afloat\n", ""),
        ("save you from remaking dozens of drinks during the [Starbucks Morning Rush: How the Bar Stays Afloat](/articles/starbucks-morning-rush/).", "save you from remaking dozens of drinks during the morning rush.")
    ]
)

# 3. Subway Wrap Folding
replace_in_file(
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\subway-wrap-folding.md",
    [
        ("Use [the Subway](/articles/subway-bain-fill-line-rule/)", "Use the standard")
    ]
)

# 4. Starbucks Secret Menu
replace_in_file(
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\articles\starbucks-secret-menu.md",
    [
        ("7. Does Starbucks Actually Have a 'Secret Menu'", "Does Starbucks Actually Have a 'Secret Menu'")
    ]
)

print("Specific replacements complete.")
