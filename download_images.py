import os
import requests
from duckduckgo_search import DDGS
from PIL import Image
from io import BytesIO

categories = {
    "generic-fryer": "commercial deep fryer kitchen real photo",
    "generic-grill": "commercial flat top grill restaurant kitchen real photo",
    "generic-pos": "restaurant POS system screen point of sale real photo",
    "generic-prep": "commercial kitchen stainless steel prep table real photo",
    "generic-walk-in": "restaurant walk in cooler interior real photo",
    "generic-drive-thru": "drive thru window fast food real photo",
    "generic-coffee": "commercial espresso machine coffee shop real photo",
    "generic-baking": "commercial oven baking kitchen real photo",
    "generic-exterior": "fast food restaurant exterior day real photo",
    "generic-bag": "brown paper takeout bag fast food real photo"
}

output_dir = "src/assets/images/general"
os.makedirs(output_dir, exist_ok=True)

ddgs = DDGS()

for prefix, query in categories.items():
    print(f"Searching for {prefix}...")
    try:
        results = list(ddgs.images(query, max_results=10, safesearch="on"))
        count = 0
        for i, result in enumerate(results):
            if count >= 3:
                break
            image_url = result.get("image")
            if not image_url:
                continue
            
            try:
                response = requests.get(image_url, timeout=10)
                if response.status_code == 200:
                    img = Image.open(BytesIO(response.content))
                    # Convert to webp
                    filename = f"{prefix}-{count + 1}.webp"
                    filepath = os.path.join(output_dir, filename)
                    # Convert to RGB if it's RGBA or P to save as WebP properly sometimes
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    # Resize to a reasonable dimension (e.g. max 1200x800) to keep size down
                    img.thumbnail((1200, 1200))
                    img.save(filepath, "WEBP", quality=80)
                    print(f"  Saved {filename}")
                    count += 1
            except Exception as e:
                print(f"  Failed to download/process {image_url}: {e}")
    except Exception as e:
        print(f"Search failed for {query}: {e}")

print("Done downloading images.")
