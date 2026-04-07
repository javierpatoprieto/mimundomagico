#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Targeted gender-neutral marker fixes for all classic stories."""
import re
import sys

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

original = content

# ── gato-botas ────────────────────────────────────────────────────────────────
content = content.replace(
    'se las llevaba al rey como regalo de parte de "{childName}, el gran h\u00e9roe del reino".',
    'se las llevaba al rey como regalo de parte de "{childName}, {el/la} gran {hero/hero\u00edna} del reino".'
)

# ── sastrecillo-valiente ──────────────────────────────────────────────────────
content = content.replace(
    '{childName} recibi\u00f3 tierras, riquezas y el t\u00edtulo de hero\u00edna del reino.',
    '{childName} recibi\u00f3 tierras, riquezas y el t\u00edtulo de {hero/hero\u00edna} del reino.'
)
content = content.replace(
    'el sastrecillo m\u00e1s valiente del mundo vivi\u00f3 feliz para siempre.',
    '{el/la} {ni\u00f1o/ni\u00f1a} m\u00e1s valiente del mundo vivi\u00f3 feliz para siempre.'
)

# ── pinocho ───────────────────────────────────────────────────────────────────
content = content.replace(
    '{childName} era amiga de Pinocho desde siempre y lo acompa\u00f1\u00f3 en todas sus aventuras.',
    '{childName} siemp re hab\u00eda sido amig de Pinocho y {lo/la} acompa\u00f1\u00f3 en todas sus aventuras.'
)
# Fix typo above - be very careful
content = content.replace(
    '{childName} siemp re hab\u00eda sido amig de Pinocho y {lo/la} acompa\u00f1\u00f3 en todas sus aventuras.',
    '{childName} siempre hab\u00eda sido amigo de Pinocho y {lo/la} acompa\u00f1\u00f3 en todas sus aventuras.'
)
content = content.replace(
    'Pinocho la mir\u00f3 y le dijo:\n\u2014Gracias por no rendirte en buscarme. Eres mi mejor amiga.',
    'Pinocho {lo/la} mir\u00f3 y le dijo:\n\u2014Gracias por no rendirte en buscarme. Eres el mejor amigo del mundo.'
)

# ── ali-baba ──────────────────────────────────────────────────────────────────
content = content.replace(
    'viv\u00eda {childName}, un ni\u00f1o curioso y observador que amaba explorar los alrededores del mercado con su burro.',
    'viv\u00eda {childName}, {un/una} {ni\u00f1o/ni\u00f1a} curioso y observador que amaba explorar los alrededores del mercado con su burro.'
)

# ── tres-osos ─────────────────────────────────────────────────────────────────
content = content.replace(
    'ven\u00eda {childName}, una ni\u00f1a de cabello dorado y ojos curiosos como luceros.',
    'ven\u00eda {childName}, {un/una} {ni\u00f1o/ni\u00f1a} de ojos curiosos como luceros.'
)

# ── perseo-medusa ─────────────────────────────────────────────────────────────
content = content.replace(
    'Y as\u00ed, el h\u00e9roe m\u00e1s valiente del mundo demostr\u00f3 que la verdadera fuerza viene del coraz\u00f3n.',
    'Y as\u00ed, {el/la} {hero/hero\u00edna} m\u00e1s valiente del mundo demostr\u00f3 que la verdadera fuerza viene del coraz\u00f3n.'
)

# ── teseo-minotauro ───────────────────────────────────────────────────────────
content = content.replace(
    '\u2014\u00a1{childName} ha vuelto! \u00a1El h\u00e9roe ha vuelto!',
    '\u2014\u00a1{childName} ha vuelto! \u00a1{El/La} {hero/hero\u00edna} ha vuelto!'
)

# ── hercules-leon ─────────────────────────────────────────────────────────────
content = content.replace(
    'la leyenda de {childName}, el h\u00e9roe que us\u00f3 su fuerza para proteger, no para da\u00f1ar.',
    'la leyenda de {childName}, {el/la} {hero/hero\u00edna} que us\u00f3 su fuerza para proteger, no para da\u00f1ar.'
)

# ── juan-habichuelas ──────────────────────────────────────────────────────────
content = content.replace(
    '\u2014\u00a1FE FI FO FUM! \u00a1Huelo a un ni\u00f1o aqu\u00ed!',
    '\u2014\u00a1FE FI FO FUM! \u00a1Huelo a {un/una} {ni\u00f1o/ni\u00f1a} aqu\u00ed!'
)

# ── charlie-chocolate ─────────────────────────────────────────────────────────
content = content.replace(
    'Quiero que un ni\u00f1o con buen coraz\u00f3n sea el due\u00f1o de la magia.',
    'Quiero que {un/una} {ni\u00f1o/ni\u00f1a} con buen coraz\u00f3n sea el due\u00f1o de la magia.'
)

# ── don-quijote-ninos ─────────────────────────────────────────────────────────
content = content.replace(
    'podr\u00eda convertirse en el h\u00e9roe de cualquier historia.',
    'podr\u00eda convertirse en {el/la} {hero/hero\u00edna} de cualquier historia.'
)

# ── principe-rana ─────────────────────────────────────────────────────────────
content = content.replace(
    'viv\u00eda {childName}, una ni\u00f1a alegre y juguetona que amaba pasar las tardes junto al pozo del bosque.',
    'viv\u00eda {childName}, {un/una} {ni\u00f1o/ni\u00f1a} alegre y juguet\u00f3n que amaba pasar las tardes junto al pozo del bosque.'
)

# ── bella-bestia ──────────────────────────────────────────────────────────────
content = content.replace(
    'Un d\u00eda lleg\u00f3 al castillo {childName}, perdida entre los bosques nevados.',
    'Un d\u00eda, {childName} lleg\u00f3 al castillo tras adentrarse en los bosques nevados.'
)

# ── sirenita ──────────────────────────────────────────────────────────────────
# The story is about a mermaid princess - keep feminine as the role is intrinsically
# gendered (princesa del mar). OK to leave as-is.

# ── cenicienta ───────────────────────────────────────────────────────────────
content = content.replace(
    'viv\u00eda {childName}, la m\u00e1s trabajadora y bondadosa de todas las ni\u00f1as del reino.',
    'viv\u00eda {childName}, {un/una} {ni\u00f1o/ni\u00f1a} trabajador y bondadoso del reino.'
)

# ── hansel-gretel ─────────────────────────────────────────────────────────────
content = content.replace(
    '{childName} era muy lista. Antes de salir,',
    '{childName} era muy {listo/lista}. Antes de salir,'
)

# ── princ-feliz: check ───────────────────────────────────────────────────────
# "Era la cosa más bella que {childName} había visto nunca" - neutral ✓

# Now write
with open(r'lib\stories\index.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
print(f"Changes made: {original != content}")

# Verify remaining issues
story_pattern = re.compile(r"id: '([^']+)'.*?content: `(.*?)`", re.DOTALL)
remaining = []
for m in story_pattern.finditer(content):
    story_id = m.group(1)
    text = m.group(2)
    for pat, label in [
        (r'\buna ni\u00f1a\b', 'una ni\u00f1a'),
        (r'\bun ni\u00f1o\b', 'un ni\u00f1o'),
        (r'\bla ni\u00f1a\b', 'la ni\u00f1a'),
        (r'\bel ni\u00f1o\b', 'el ni\u00f1o'),
    ]:
        for hit in re.finditer(pat, text, re.IGNORECASE):
            start = max(0, hit.start()-80)
            end = min(len(text), hit.end()+80)
            ctx = text[start:end].replace('\n', ' ')
            remaining.append(f"[{story_id}] {label}: ...{ctx}...")

print(f"\nRemaining gender refs ({len(remaining)}):")
for r in remaining:
    print(f"  {r}")
