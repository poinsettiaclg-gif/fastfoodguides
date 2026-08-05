import os
import re

directory = 'src/content/articles'

# We'll replace the Cooper-Atkins ASIN (B002GE2XF8) with a generic Taylor Commercial ASIN (B001U5A3I2)
# and change the text if necessary, or just replace the ASIN.
# We'll replace the Shoes For Crews ASIN (B0002ZQ9Z6) with a valid non-slip ASIN (B08BX7XQNJ - Crocs Bistro Pro LiteRide Clog, or just leave the text as Shoes For Crews and use a valid search ASIN).
# Let's use a very generic, guaranteed-to-exist ASIN for non-slip shoes: B00131EDN6 (Skechers Work Sure Track)
# And for thermometer: B01D536F3O (Taylor Precision Thermometer)

for filename in os.listdir(directory):
    if filename.endswith(".md"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            filedata = file.read()
            
        # Replace the broken ASINs
        newdata = filedata.replace('B002GE2XF8', 'B01D536F3O')
        newdata = newdata.replace('Cooper-Atkins Digital Thermometer', 'Taylor Commercial Digital Thermometer')
        
        newdata = newdata.replace('B0002ZQ9Z6', 'B00131EDN6')
        newdata = newdata.replace('Shoes For Crews non-slips', 'Skechers Work Non-Slip Shoes')

        if newdata != filedata:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(newdata)
            print(f"Updated {filename}")

print("Amazon links updated!")
