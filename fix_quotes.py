import glob
for f in glob.glob(r'c:\Users\Poins\.gemini\antigravity\scratch\fastfoodguides.com\src\content\secret_menus\*.md'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace("\\'", "'")
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
