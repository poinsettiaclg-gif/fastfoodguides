import os
import re

files = [
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\layouts\BlogPost.astro",
    r"c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\layouts\SecretMenu.astro"
]

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Fix Astro.site to Astro.site || Astro.url.origin
    content = content.replace("Astro.site ?", "Astro.site || Astro.url.origin ?")
    content = content.replace("Astro.site)", "(Astro.site || Astro.url.origin))")
    content = content.replace("Astro.site.href", "(Astro.site || Astro.url.origin).toString()")
    
    # Remove inline style stacking margin
    content = content.replace('<div style="margin: 3rem 0;">', '<div>')
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Layouts patched.")
