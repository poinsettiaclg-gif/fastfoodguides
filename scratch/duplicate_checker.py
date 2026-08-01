import os
import glob
import re
from collections import defaultdict

def check_sentences():
    articles_path = 'src/content/articles/*.md'
    secret_menus_path = 'src/content/secret_menus/*.md'
    
    files = glob.glob(articles_path) + glob.glob(secret_menus_path)
    
    sentences_seen = defaultdict(list)
    
    for f in files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
            
        parts = content.split('---')
        if len(parts) >= 3:
            body = parts[2]
        else:
            body = content
            
        # Remove markdown elements roughly
        text = re.sub(r'#.*', '', body)
        text = re.sub(r'\[.*?\]\(.*?\)', '', text)
        text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
        text = re.sub(r'<.*?>', '', text)
        
        # Split into sentences roughly
        sentences = re.split(r'(?<=[.!?])\s+', text)
        for s in sentences:
            s_clean = ' '.join(s.split())
            if len(s_clean) > 80: # long sentences only
                sentences_seen[s_clean].append(f)
                
    print("=== DUPLICATE SENTENCES (Length > 80, in >1 file) ===")
    dup_s = {s: fs for s, fs in sentences_seen.items() if len(set(fs)) > 1}
    for s, fs in sorted(dup_s.items(), key=lambda x: len(set(x[1])), reverse=True):
        print(f"\nFound in {len(set(fs))} files:")
        print(f"Text: {s}")
        print(f"Files: {', '.join(os.path.basename(f) for f in set(fs))}")

if __name__ == '__main__':
    check_sentences()
