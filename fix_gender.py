#!/usr/bin/env python3
"""Fix gender-neutral markers in story templates."""
import re

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We'll process the content field of each story using a function applied story-by-story
# Strategy: find each `content: \`...\`` block and apply replacements within it

def fix_story_content(text):
    """Apply gender-neutral marker replacements to a story content block."""
    
    # 1. "una niña" → "{un/una} {niño/niña}" (when referring to child protagonist - not "la niña de los ojos" etc.)
    # Be careful: only replace when it's clearly the protagonist
    # The protagonist is usually introduced as "vivía una niña..." or "nació una niña..."
    text = re.sub(r'\buna niña muy especial\b', '{un/una} {niño/niña} muy especial', text)
    text = re.sub(r'\buna niña alegre y juguetona\b', '{un/una} {niño/niña} alegre y jugueton{o/a}', text)
    text = re.sub(r'\buna niña de corazón tan puro\b', '{un/una} {niño/niña} de corazón tan puro', text)
    text = re.sub(r'\buna niña de ojos claros y corazón honesto\b', '{un/una} {niño/niña} de ojos claros y corazón honesto', text)
    text = re.sub(r'\buna niña pequeña sola\b', 'una niña pequeña sola', text)  # NOT the protagonist here
    
    # 2. "la niña" → "{el/la} {niño/niña}" when referring to protagonist (followed by verbs or adjectives about her)
    # Common protagonist patterns:
    text = re.sub(r'\bla niña más valiente\b', '{el/la} {niño/niña} más valiente', text)
    text = re.sub(r'\bla niña más\b', '{el/la} {niño/niña} más', text)
    text = re.sub(r'\bel niño más\b', '{el/la} {niño/niña} más', text)
    
    # 3. Standalone "la pequeña" / "el pequeño" referring to protagonist
    text = re.sub(r'\bla pequeña\b', '{el/la} {pequeño/pequeña}', text)
    text = re.sub(r'\bel pequeño\b', '{el/la} {pequeño/pequeña}', text)
    
    # 4. "era muy lista" → "era muy {listo/lista}"
    text = re.sub(r'\bera muy lista\b', 'era muy {listo/lista}', text)
    text = re.sub(r'\bmuy lista\b', 'muy {listo/lista}', text)
    
    # 5. Hero/heroine references about protagonist
    text = re.sub(r'\bnuestra heroína\b', '{el/la} {hero/heroína}', text)
    text = re.sub(r'\bnuestro héroe\b', '{el/la} {hero/heroína}', text)
    text = re.sub(r'\bla heroína del\b', '{el/la} {hero/heroína} del', text)
    text = re.sub(r'\bel héroe del\b', '{el/la} {hero/heroína} del', text)
    text = re.sub(r'\bla heroína\b', '{el/la} {hero/heroína}', text)
    
    # 6. Pronouns — standalone ella/él referring to protagonist
    # Only in sentence-start or clear standalone position
    text = re.sub(r'\bElla era\b', '{Él/Ella} era', text)
    text = re.sub(r'\bella era\b', '{él/ella} era', text)
    text = re.sub(r'\bÉl era\b', '{Él/Ella} era', text)
    text = re.sub(r'\bél era\b', '{él/ella} era', text)
    
    # 7. "la trabajadora y bondadosa de todas las niñas" → clear female ref
    # These are harder to fix generically - skip
    
    # 8. "querida" → "querido/a" - skip, too complex
    
    # 9. "la lista" alone
    text = re.sub(r'\bla lista\b', '{el/la} {listo/lista}', text)
    
    # 10. "más astuta" → skip as it's not in markers
    # "era astuta" → skip
    
    # 11. Common phrases with "niña" referring to protagonist
    # "la niña" at start of sentence or after comma, followed by action
    # This is tricky - let's do targeted replacements
    
    return text

# Extract content blocks and process them
# The pattern is: content: `...`  (backtick template literals)
# We need to find each content field and process within it

def process_content_block(match):
    full = match.group(0)
    # The actual template text (without the surrounding backticks)
    template = match.group(1)
    fixed = fix_story_content(template)
    return 'content: `' + fixed + '`'

# Match content: `...` blocks (non-greedy, DOTALL)
result = re.sub(r'content: `(.*?)`', process_content_block, content, flags=re.DOTALL)

with open(r'lib\stories\index.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print("Done! Applied gender-neutral markers.")

# Count changes
original_count = content.count('la niña') + content.count('la pequeña') + content.count('nuestro héroe') + content.count('nuestra heroína') + content.count('era muy lista')
new_count = result.count('{el/la} {niño/niña}') + result.count('{el/la} {pequeño/pequeña}') + result.count('{el/la} {hero/heroína}') + result.count('{listo/lista}')
print(f"Gender markers added/changed: ~{new_count}")
print(f"Original gendered terms remaining: {result.count(' la niña ') + result.count(' la pequeña ')}")
