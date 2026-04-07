#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)

# Patterns that are CLEARLY about the child protagonist (childName nearby + adj in subject position)
feminine_adj_patterns = [
    r'{childName}[^.!?]*\b(rodeada|sola|perdida|asustada|contenta|emocionada|feliz|triste|sentada|parada|lista|astuta|decidida|determinada|preocupada)\b',
    r'\b(rodeada|perdida|asustada|contenta|emocionada|sentada|lista|astuta|decidida|determinada|preocupada)\b[^.!?]*{childName}',
]

found = []
for m in story_pattern.finditer(content):
    story_id = m.group(1)
    text = m.group(2)
    for pat in feminine_adj_patterns:
        for hit in re.finditer(pat, text, re.IGNORECASE | re.DOTALL):
            ctx = hit.group()[:200].replace('\n', ' ')
            found.append(f"[{story_id}] {ctx}")

print(f"Found {len(found)} potential issues:")
for f_item in found[:30]:
    print(f"  {f_item}")
