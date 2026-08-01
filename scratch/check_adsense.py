import os
import re
import glob
from collections import Counter
import hashlib

def get_word_count(text):
    return len(re.findall(r'\b\w+\b', text))

def check_dangerous_content(text):
    dangerous_words = ['kill', 'murder', 'bomb', 'terrorist', 'drugs', 'heroin', 'cocaine', 'rape', 'porn', 'suicide']
    found = []
    text_lower = text.lower()
    for w in dangerous_words:
        if re.search(r'\b' + w + r'\b', text_lower):
            found.append(w)
    return found

def check_brand_safety(text):
    safety_words = ['lawsuit', 'food poisoning', 'sue', 'illegal', 'scam', 'fraud', 'roach', 'cockroach', 'maggot', 'vomit', 'boycott']
    found = []
    text_lower = text.lower()
    for w in safety_words:
        if re.search(r'\b' + w + r'\b', text_lower):
            found.append(w)
    return found

def check_keyword_stuffing(text, title):
    words = re.findall(r'\b\w+\b', text.lower())
    total_words = len(words)
    if total_words == 0:
        return False, []
    
    # Check frequency of title words
    title_words = [w for w in re.findall(r'\b\w+\b', title.lower()) if len(w) > 3]
    stuffed = []
    word_counts = Counter(words)
    for tw in title_words:
        if word_counts[tw] / total_words > 0.04:  # more than 4% of words is the same keyword
            stuffed.append(f"{tw} ({word_counts[tw]} times, {word_counts[tw]/total_words*100:.1f}%)")
            
    return len(stuffed) > 0, stuffed

def main():
    directory = 'src/content/articles'
    files = glob.glob(os.path.join(directory, '*.md'))
    
    print(f"Checking {len(files)} articles...")
    
    hashes = {}
    duplicates = []
    
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # extract body vs frontmatter
        parts = content.split('---')
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = '---'.join(parts[2:])
        else:
            frontmatter = ''
            body = content
            
        # Extract title from frontmatter
        title_match = re.search(r'title:\s*"(.*?)"', frontmatter)
        title = title_match.group(1) if title_match else os.path.basename(filepath)
        
        # 1. Thin Content
        word_count = get_word_count(body)
        if word_count < 800:
            print(f"THIN CONTENT: {os.path.basename(filepath)} - {word_count} words")
            
        # 2. Dangerous Content
        dang = check_dangerous_content(body)
        if dang:
            print(f"DANGEROUS CONTENT: {os.path.basename(filepath)} - Words found: {dang}")
            
        # 3. Brand Safety
        safe = check_brand_safety(body)
        if safe:
            print(f"BRAND SAFETY: {os.path.basename(filepath)} - Words found: {safe}")
            
        # 4. Keyword Stuffing
        is_stuffed, stuffed_words = check_keyword_stuffing(body, title)
        if is_stuffed:
            print(f"KEYWORD STUFFING: {os.path.basename(filepath)} - Words found: {stuffed_words}")
            
        # 5. Duplicate Content
        body_normalized = re.sub(r'\s+', '', body.lower())
        h = hashlib.md5(body_normalized.encode('utf-8')).hexdigest()
        if h in hashes:
            print(f"DUPLICATE CONTENT: {os.path.basename(filepath)} is a duplicate of {hashes[h]}")
        else:
            hashes[h] = os.path.basename(filepath)
            
if __name__ == '__main__':
    main()
