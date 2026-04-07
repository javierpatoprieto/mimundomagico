#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Final check for gendered references to {childName} in stories."""
import re

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)

# Patterns that definitly refer to {childName} when in proximity
protagonist_feminine = [
    (r'\bla\s+{childName}\b', 'la + childName'),
    (r'{childName}[^.!?\n]{0,30}\b(rodeada|sola|asustada|perdida|lista|astuta|feliz\b.*ella|contenta|querida|amiga)\b', 'feminine adj/noun near childName'),
    (r'\bella\b[^.!?\n]{0,50}{childName}', 'ella ... childName'),
    (r'{childName}[^.!?\n]{0,50}\bella\b[^.!?\n]{0,50}(era|fue|llegó|salió|corrió|encontró)', 'ella following childName leading to verb'),
]

# Check with lookahead for childName context
check_patterns = [
    # Clearly about {childName}
    r'(?<={childName}[^.!?]{0,80})\b(rodeada|asustada|perdida|lista|astuta|decidida|querida|amiga de {childName}|sola(?= y))\b',
]

# Manual spot check approach
critical_patterns = [
    (r'\bla\b[^.!?\n]{0,30}\b{childName}\b', 'la X childName'),
    (r'{childName}[^.!?\n]{0,20}\bsola\b', 'childName... sola'),
    (r'{childName}[^.!?\n]{0,20}\bquerida\b', 'childName...querida'),
    (r'{childName}[^.!?\n]{0,30}\brodeada\b', 'childName...rodeada'),
    (r'\bsola\b[^.!?\n]{0,30}{childName}', 'sola...childName'),
]

issues = []
for m in story_pattern.finditer(content):
    story_id = m.group(1)
    text = m.group(2)
    
    for pat, label in critical_patterns:
        for hit in re.finditer(pat, text, re.IGNORECASE):
            ctx = text[max(0,hit.start()-60):min(len(text),hit.end()+60)].replace('\n', ' ')
            issues.append(f"[{story_id}] {label}: ...{ctx}...")

print(f"Potential issues: {len(issues)}")
for issue in issues:
    print(f"  {issue}")

# Also check for any remaining {o/a} non-markers that may have been accidentally introduced
if '{o/a}' in content or '{or/ora}' in content:
    print("\nWARNING: Non-standard markers found!")
    for m in re.finditer(r'\{o/a\}|\{or/ora\}', content):
        start = max(0, m.start()-80)
        end = min(len(content), m.end()+80)
        print(f"  ...{content[start:end].replace(chr(10), ' ')}...")
else:
    print("\nNo non-standard markers found. ✓")

# Count gender markers used
markers = {
    '{niño/niña}': content.count('{niño/niña}'),
    '{el/la}': content.count('{el/la}'),
    '{un/una}': content.count('{un/una}'),
    '{él/ella}': content.count('{él/ella}'),
    '{lo/la}': content.count('{lo/la}'),
    '{del/de la}': content.count('{del/de la}'),
    '{al/a la}': content.count('{al/a la}'),
    '{hero/heroína}': content.count('{hero/heroína}'),
    '{pequeño/pequeña}': content.count('{pequeño/pequeña}'),
    '{listo/lista}': content.count('{listo/lista}'),
    '{El/La}': content.count('{El/La}'),
}
print("\nGender markers usage:")
for marker, count in markers.items():
    if count > 0:
        print(f"  {marker}: {count}")
