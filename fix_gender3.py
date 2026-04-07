#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix remaining protagonist-specific gendered references."""

with open(r'lib\stories\index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

original = content

# ── caperucita-roja ──────────────────────────────────────────────────────────
# "era astuta" → rephrase to avoid gender issue
content = content.replace(
    'Pero {childName} tambi\u00e9n era astuta. Cuando lleg\u00f3 a la casita',
    'Pero {childName} tambi\u00e9n era muy {listo/lista}. Cuando lleg\u00f3 a la casita'
)

# ── blancanieves ──────────────────────────────────────────────────────────────
# "Sola y asustada, {childName} corrió" → gender-neutral rephrase
content = content.replace(
    'Sola y asustada, {childName} corri\u00f3 hasta que encontr\u00f3',
    'Asustado, {childName} corri\u00f3 hasta que encontr\u00f3'
)
# "Asustado" is masculine — use a rephrase that's neutral:
content = content.replace(
    'Asustado, {childName} corri\u00f3 hasta que encontr\u00f3',
    'Sin saber qu\u00e9 hacer, {childName} corri\u00f3 hasta que encontr\u00f3'
)

# ── cenicienta ────────────────────────────────────────────────────────────────
# "dejando a {childName} sola con un cubo y una escoba"
content = content.replace(
    'dejando a {childName} sola con un cubo y una escoba.',
    'dejando a {childName} solo con un cubo y una escoba.'
)
# "solo" is masculine — rephrase:
content = content.replace(
    'dejando a {childName} solo con un cubo y una escoba.',
    'dejando a {childName} atr\u00e1s, con un cubo y una escoba.'
)
# "El príncipe no pudo apartar los ojos de ella"
content = content.replace(
    'El pr\u00edncipe no pudo apartar los ojos de ella y bailaron juntos toda la noche.',
    'El pr\u00edncipe no pudo apartar los ojos de {childName} y bailaron juntos toda la noche.'
)

# ── bella-durmiente ───────────────────────────────────────────────────────────
# "{childName} creció rodeada de amor y aprendió a ser valiente, curiosa y amable"
content = content.replace(
    '{childName} creci\u00f3 rodeada de amor y aprendi\u00f3 a ser valiente, curiosa y amable con todos.',
    '{childName} creci\u00f3 rodeado de amor y aprendi\u00f3 a ser valiente, curioso y amable con todos.'
)
# "rodeado/curioso" are masculine — rephrase again:
content = content.replace(
    '{childName} creci\u00f3 rodeado de amor y aprendi\u00f3 a ser valiente, curioso y amable con todos.',
    '{childName} creci\u00f3 entre amor y aprendi\u00f3 a ser valiente, con mucha curiosidad y amabilidad hacia todos.'
)

# ── pulgarcita ────────────────────────────────────────────────────────────────
# "la madriguera de un topo rico que quería casarse con ella"
content = content.replace(
    '{childName} encontr\u00f3 refugio en la madriguera de un topo rico que quer\u00eda casarse con ella, pero viv\u00eda en la oscuridad bajo la tierra.',
    '{childName} encontr\u00f3 refugio en la madriguera de un topo rico que quer\u00eda casarse con {childName}, pero que viv\u00eda en la oscuridad bajo la tierra.'
)
# "pequeñas hadas del tamaño de ella"
content = content.replace(
    'hasta un prado lleno de flores gigantes donde viv\u00edan peque\u00f1as hadas del tama\u00f1o de ella.',
    'hasta un prado lleno de flores gigantes donde viv\u00edan peque\u00f1as hadas del mismo tama\u00f1o que {childName}.'
)

# ── sirenita ──────────────────────────────────────────────────────────────────
# "Las olas del mar la recibieron de vuelta" — story is about a mermaid princess
# The protagonist is playing the role of a mermaid princess
# "la recibieron" → make neutral-ish but the story frame is intrinsically female
# Let's keep the mermaid story feminine as the role is gendered (princesa del mar)
# The personalizeStory function will handle "el niño/la niña" patterns already

# ── gigante-egoista ───────────────────────────────────────────────────────────
# "Y detrás de ella, uno a uno, entraron los demás niños"
content = content.replace(
    'Un d\u00eda, {childName} se col\u00f3 por un agujerito en el muro. Y detr\u00e1s de ella, uno a uno, entraron los dem\u00e1s ni\u00f1os.',
    'Un d\u00eda, {childName} se col\u00f3 por un agujerito en el muro. Y detr\u00e1s, uno a uno, entraron los dem\u00e1s ni\u00f1os.'
)

# ── bella-bestia ──────────────────────────────────────────────────────────────
# "Ante ella apareció un joven príncipe" — ella refers to {childName}
content = content.replace(
    'Las l\u00e1grimas de {childName} cayeron sobre la Bestia... y el hechizo se rompi\u00f3. Ante ella apareci\u00f3 un joven pr\u00edncipe con ojos llenos de gratitud.',
    'Las l\u00e1grimas de {childName} cayeron sobre la Bestia... y el hechizo se rompi\u00f3. Ante {childName} apareci\u00f3 un joven pr\u00edncipe con ojos llenos de gratitud.'
)

# ── isla-tesoro ───────────────────────────────────────────────────────────────
# "{childName} era listo y observador. Escondido en un barril"
# "Escondido" is masculine - fix
content = content.replace(
    '{childName} era listo y observador. Escondido en un barril de manzanas, escuch\u00f3 los planes secretos de los piratas.',
    '{childName} era {listo/lista} y observador. Oculto en un barril de manzanas, escuch\u00f3 los planes secretos de los piratas.'
)
# "Oculto" is also masculine, rephrase:
content = content.replace(
    '{childName} era {listo/lista} y observador. Oculto en un barril de manzanas, escuch\u00f3 los planes secretos de los piratas.',
    '{childName} era {listo/lista} y muy observador. Mientras se escond\u00eda en un barril de manzanas, escuch\u00f3 los planes secretos de los piratas.'
)

# ── don-quijote-ninos ─────────────────────────────────────────────────────────
# Already fixed

# ── Additional: tortuga-liebre ────────────────────────────────────────────────
# "vivía {childName}, una tortuga con el corazón más valiente del mundo"
# "una tortuga" is feminine but it refers to {childName} playing as a turtle
# The turtle story has {childName} AS the turtle - this is the role. Keep as story character.

# ── tres-cerditos ─────────────────────────────────────────────────────────────
# "el más pequeño y valiente era {childName}" - neutral (no gender in 'valiente')
# Already OK

# ── Also check for "rodeada" in other stories ──────────────────────────────────

print("Applying fixes...")

with open(r'lib\stories\index.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Done! Changed: {original != content}")
changes = sum(1 for a, b in zip(original, content) if a != b)
print(f"Characters changed: ~{abs(len(content) - len(original))} net chars difference")
