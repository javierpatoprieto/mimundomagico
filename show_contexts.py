#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)
matches = {m.group(1): m.group(2) for m in story_pattern.finditer(content)}

issues = {
    'patito-feo': [r'ella no'],
    'tortuga-liebre': [r'heroína'],
    'gato-botas': [r'héroe'],
    'sastrecillo-valiente': [r'heroína'],
    'pinocho': [r'un niño', r'ella no'],
    'ali-baba': [r'un niño'],
    'tres-osos': [r'una niña'],
    'rumpelstiltskin': [r'heroína'],
    'pequena-cerillera': [r'la niña', r'una niña', r'ella no'],
    'rey-midas': [r'la niña'],
    'perseo-medusa': [r'héroe'],
    'teseo-minotauro': [r'héroe'],
    'hercules-leon': [r'el niño', r'un niño', r'héroe'],
    'conejo-terciopelo': [r'ella no'],
    'principito': [r'un niño'],
    'libro-selva': [r'ella no'],
    'juan-habichuelas': [r'un niño'],
    'donde-monstruos': [r'el pequeño'],
    'charlie-chocolate': [r'un niño'],
    'don-quijote-ninos': [r'héroe'],
    'sinbad-marino': [r'la pequeña'],
}

for story_id, pats in issues.items():
    if story_id not in matches:
        print(f"NOT FOUND: {story_id}")
        continue
    text = matches[story_id]
    for pat in pats:
        for hit in re.finditer(pat, text, re.IGNORECASE):
            start = max(0, hit.start()-100)
            end = min(len(text), hit.end()+100)
            ctx = text[start:end].replace('\n', ' ')
            print(f"\n[{story_id}] match='{hit.group()}':")
            print(f"  ...{ctx}...")
