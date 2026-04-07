#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check for any remaining protagonist-specific gendered references."""
import re

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)

issues = []
for m in story_pattern.finditer(content):
    story_id = m.group(1)
    text = m.group(2)
    
    # Look for feminine pronouns/adjectives that might describe {childName}
    patterns = [
        r'\bella\b(?! no\b)',  # "ella" standalone (not "ella no" which has context)
        r'\blista\b',  # "lista" adj
        r'\bastuta\b',  # "astuta"  
        r'\bvaliente\b',  # neutral but check
        r'\bquerida\b',  # "querida"
        r'\bsola\b',  # "sola"
        r'\bperdida\b',  # "perdida"
        r'\bcontenta\b',  # "contenta"
    ]
    
    for pat in patterns:
        for hit in re.finditer(pat, text, re.IGNORECASE):
            start = max(0, hit.start()-100)
            end = min(len(text), hit.end()+100)
            ctx = text[start:end].replace('\n', ' ')
            # Only show if close to {childName}
            if '{childName}' in text[max(0,hit.start()-200):min(len(text),hit.end()+200)]:
                issues.append(f"[{story_id}] '{hit.group()}': ...{ctx}...")

# Deduplicate and show
seen = set()
for issue in issues:
    key = issue[:80]
    if key not in seen:
        seen.add(key)
        print(issue)
