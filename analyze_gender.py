#!/usr/bin/env python3
import re

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find story id and content pairs
story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)
matches = list(story_pattern.finditer(content))

patterns_to_check = [
    (r'la niña', 'la niña'),
    (r'el niño', 'el niño'),
    (r'una niña', 'una niña'),
    (r'un niño', 'un niño'),
    (r'la pequeña', 'la pequeña'),
    (r'el pequeño', 'el pequeño'),
    (r'muy lista', 'muy lista'),
    (r'muy listo', 'muy listo'),
    (r'heroína', 'heroína'),
    (r'héroe', 'héroe'),
    (r'ella era', 'ella era'),
    (r'él era', 'él era'),
    (r'ella no', 'ella no'),
    (r'él no', 'él no'),
]

for m in matches:
    story_id = m.group(1)
    text = m.group(2)
    hits = []
    for pat, label in patterns_to_check:
        found = re.findall(pat, text, re.IGNORECASE)
        if found:
            hits.append(f'{label}({len(found)})')
    if hits:
        print(f"{story_id}: {', '.join(hits)}")
