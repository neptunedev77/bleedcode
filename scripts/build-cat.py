"""Builds the cat assets from design/mockup/gato_v4.png.

- public/mascot/gato.png : sprite with a light outer outline and a rim light,
  cropped so the feet are on the bottom edge (no ground line, no empty rows).
- public/favicon.svg      : the cat's head as crisp pixel rects.
- public/apple-touch-icon.png, public/og.png : raster versions.

Run: python scripts/build-cat.py
"""
from PIL import Image

SRC = 'design/mockup/gato_v4.png'
OUTLINE = (92, 86, 102, 255)   # light grey-violet ring around the silhouette
RIM = (88, 74, 112, 255)         # brighter version of the sprite's left highlight
OLD_RIM = (0x2e, 0x26, 0x3a)
BG = (0x12, 0x12, 0x15, 255)

src = Image.open(SRC).convert('RGBA')
w, h = src.size

# drop the ground line (row 43) and anything below it
body = src.crop((0, 0, w, 43))
# recolour the existing left highlight so it reads on a dark background
px = body.load()
for y in range(body.height):
    for x in range(body.width):
        r, g, b, a = px[x, y]
        if a and (r, g, b) == OLD_RIM:
            px[x, y] = RIM

# crop to content, then pad 1px for the outline
box = body.getbbox()
body = body.crop(box)
cat = Image.new('RGBA', (body.width + 2, body.height + 1), (0, 0, 0, 0))
cat.paste(body, (1, 1))
cp = cat.load()
opaque = lambda x, y: 0 <= x < cat.width and 0 <= y < cat.height and cp[x, y][3] > 0
ring = [
    (x, y)
    for y in range(cat.height)
    for x in range(cat.width)
    if not opaque(x, y) and any(opaque(x + dx, y + dy) for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)))
]
for x, y in ring:
    cp[x, y] = OUTLINE
cat.save('public/mascot/gato.png', optimize=True)
print('cat', cat.size)

# favicon: the head (top rows), squared
head_rows = 15
head = cat.crop((0, 0, cat.width, head_rows))
hb = head.getbbox()
head = head.crop(hb)
side = max(head.size)
sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
sq.paste(head, ((side - head.width) // 2, (side - head.height) // 2))

def to_svg(img):
    p = img.load()
    rects = {}
    for y in range(img.height):
        x = 0
        while x < img.width:
            c = p[x, y]
            if c[3] == 0:
                x += 1
                continue
            start = x
            while x < img.width and p[x, y] == c:
                x += 1
            rects.setdefault('#%02x%02x%02x' % c[:3], []).append(f'M{start} {y}h{x - start}v1h-{x - start}z')
    paths = ''.join(f'<path fill="{col}" d="{"".join(d)}"/>' for col, d in rects.items())
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {img.width} {img.height}" '
            f'shape-rendering="crispEdges">{paths}</svg>\n')

open('public/favicon.svg', 'w').write(to_svg(sq))
print('favicon', sq.size)

def framed(img, size, scale, bg=BG):
    out = Image.new('RGBA', size, bg)
    big = img.resize((img.width * scale, img.height * scale), Image.NEAREST)
    out.alpha_composite(big, ((size[0] - big.width) // 2, (size[1] - big.height) // 2))
    return out

framed(sq, (180, 180), 180 // side).convert('RGB').save('public/apple-touch-icon.png', optimize=True)
framed(cat, (1200, 630), 12).convert('RGB').save('public/og.png', optimize=True)
