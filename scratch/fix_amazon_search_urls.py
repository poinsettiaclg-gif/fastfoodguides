import os

directory = 'src/content/articles'

for filename in os.listdir(directory):
    if filename.endswith(".md"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            filedata = file.read()
            
        newdata = filedata.replace('https://amazon.com/dp/B01D536F3O?tag=fastfoodguide-20', 'https://www.amazon.com/s?k=commercial+digital+thermometer&tag=fastfoodguide-20')
        newdata = newdata.replace('https://amazon.com/dp/B00131EDN6?tag=fastfoodguide-20', 'https://www.amazon.com/s?k=non+slip+work+shoes&tag=fastfoodguide-20')

        if newdata != filedata:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(newdata)
            print(f"Updated {filename}")

print("Amazon links changed to search URLs!")
