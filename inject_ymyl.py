import os

ymyl_medical = [
    'bojangles-biscuit-process.md', 'cava-assembly-line.md', 'cava-digital-make-line.md',
    'chick-fil-a-breading-process.md', 'chick-fil-a-waffle-fry-station.md', 'chipotle-makeline-training.md',
    'crumbl-cookies-weekly-logistics.md', 'culvers-butterburger.md', 'fast-food-hacks-never-order.md',
    'first-day-fast-food-what-to-expect.md', 'five-guys-burger-build.md', 'five-guys-first-day-training.md',
    'five-guys-fry-calibration.md', 'hardees-biscuit-maker-shift.md', 'ihop-pancake-batter.md',
    'jack-in-the-box-tacos-made.md', 'krispy-kreme-hot-light.md', 'panda-express-leftover-food.md',
    'papa-johns-dough-slapping.md', 'papa-johns-dough-spinner.md', 'sweetgreen-mixing-station.md',
    'tiktok-hacks-ruin-drive-thru-metrics.md', 'zaxbys-sauce-recipe.md', 'chipotle-quesarito.md',
    'mcdonalds-land-air-sea.md', 'taco-bell-superman-burrito.md'
]
ymyl_food_safety = [
    'jersey-mikes-hot-sub-grill.md', 'mcdonalds-fresh-beef-grill-process.md', 'starbucks-morning-rush.md',
    'dennys-grand-slam-build.md', 'five-guys-morning-meat-prep.md', 'long-john-silvers-fryer.md',
    'taco-bell-rethermalizer-90-minute-bag-drop-cycle.md', 'wendys-clamshell-grill.md', 'wingstop-sauce-process.md',
    'mcdonalds-neapolitan-shake.md', 'mcdonalds-ice-cream-machine-truth.md'
]
ymyl_legal = [
    'burger-king-broiler.md', 'chick-fil-a-ipos-drive-thru.md', 'kfc-pressure-fryers.md', 'mcdonalds-fry-station.md',
    'mcdonalds-ice-cream-machine.md', 'panda-express-wok-chef.md', 'sonic-carhops-roller-skate.md',
    'subway-tuna.md', 'wendys-first-day-training.md'
]

def inject_disclaimer(file_name, disclaimer_type):
    for d in ['src/content/articles', 'src/content/secret_menus']:
        path = os.path.join(d, file_name)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'disclaimerType:' not in content:
                # Insert right before the first relatedArticles or heroImage or faq
                if '\nheroImage:' in content:
                    new_content = content.replace('\nheroImage:', f'\ndisclaimerType: {disclaimer_type}\nheroImage:', 1)
                elif '\nfaq:' in content:
                    new_content = content.replace('\nfaq:', f'\ndisclaimerType: {disclaimer_type}\nfaq:', 1)
                elif '\nrelatedArticles:' in content:
                    new_content = content.replace('\nrelatedArticles:', f'\ndisclaimerType: {disclaimer_type}\nrelatedArticles:', 1)
                else:
                    new_content = content.replace('\n---', f'\ndisclaimerType: {disclaimer_type}\n---', 2)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Injected {disclaimer_type} into {file_name}")

for f in ymyl_medical: inject_disclaimer(f, 'medical')
for f in ymyl_food_safety: inject_disclaimer(f, 'food_safety')
for f in ymyl_legal: inject_disclaimer(f, 'legal')

print("Done injecting disclaimers.")
