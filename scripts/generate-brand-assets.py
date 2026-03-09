#!/usr/bin/env python3
"""Generate PNG brand assets (favicons + OG image) from the brand identity."""

import math
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow is required: pip install Pillow")
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

# Brand colors
BRAND_950 = (7, 42, 74)
BRAND_500 = (12, 147, 235)
BRAND_300 = (124, 200, 253)
ACCENT_500 = (20, 184, 166)
WHITE = (255, 255, 255)


def draw_diamond(draw, cx, cy, radius, fill, opacity=1.0):
    """Draw a diamond (rotated square) centered at (cx, cy)."""
    points = [
        (cx, cy - radius),
        (cx + radius, cy),
        (cx, cy + radius),
        (cx - radius, cy),
    ]
    if opacity < 1.0:
        r, g, b = fill
        a = int(255 * opacity)
        draw.polygon(points, fill=(r, g, b, a))
    else:
        draw.polygon(points, fill=fill)


def generate_icon(size):
    """Generate the diamond icon mark at a given size."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx = cy = size / 2
    outer_r = size * 0.47
    inner_r = size * 0.28
    dot_r = size * 0.08

    draw_diamond(draw, cx, cy, outer_r, BRAND_500)
    draw_diamond(draw, cx, cy, inner_r, ACCENT_500, opacity=0.7)
    draw.ellipse(
        [cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r],
        fill=(255, 255, 255, 230),
    )
    return img


def generate_favicons():
    """Generate favicon PNGs at 16, 32, and 180px."""
    for size, name in [(16, "favicon-16x16.png"), (32, "favicon-32x32.png"), (180, "apple-touch-icon.png")]:
        img = generate_icon(size)
        # Apple touch icon needs a solid background
        if size == 180:
            bg = Image.new("RGBA", (size, size), BRAND_950 + (255,))
            bg.paste(img, (0, 0), img)
            img = bg
        img.save(PUBLIC / name)
        print(f"  Created {name} ({size}x{size})")


def draw_dot_pattern(draw, width, height, spacing=24, radius=1.5, color=ACCENT_500, opacity=0.07):
    """Draw a subtle dot grid pattern."""
    a = int(255 * opacity)
    fill = color + (a,)
    for y in range(0, height, spacing):
        for x in range(0, width, spacing):
            cx = x + spacing // 2
            cy = y + spacing // 2
            draw.ellipse(
                [cx - radius, cy - radius, cx + radius, cy + radius],
                fill=fill,
            )


def generate_og_image():
    """Generate a 1200x630 Open Graph image."""
    w, h = 1200, 630
    img = Image.new("RGBA", (w, h), BRAND_950 + (255,))
    draw = ImageDraw.Draw(img)

    # Subtle dot pattern
    draw_dot_pattern(draw, w, h)

    # Diamond mark centered
    mark_size = 80
    cx, cy_mark = w // 2, h // 2 - 60
    draw_diamond(draw, cx, cy_mark, mark_size * 0.47, BRAND_500)
    draw_diamond(draw, cx, cy_mark, mark_size * 0.28, ACCENT_500, opacity=0.7)
    dot_r = mark_size * 0.08
    draw.ellipse(
        [cx - dot_r, cy_mark - dot_r, cx + dot_r, cy_mark + dot_r],
        fill=(255, 255, 255, 230),
    )

    # Text — try to load Inter, fall back to default
    try:
        font_title = ImageFont.truetype("Inter-Bold.ttf", 36)
    except OSError:
        try:
            font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
        except OSError:
            font_title = ImageFont.load_default()

    try:
        font_sub = ImageFont.truetype("Inter-Medium.ttf", 18)
    except OSError:
        try:
            font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        except OSError:
            font_sub = ImageFont.load_default()

    # Title
    title = "North Lume Distribution"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw = bbox[2] - bbox[0]
    draw.text(((w - tw) // 2, cy_mark + 55), title, fill=WHITE + (255,), font=font_title)

    # Tagline
    tagline = "Product Distribution  |  Canada  |  USA  |  Brazil"
    bbox = draw.textbbox((0, 0), tagline, font=font_sub)
    tw = bbox[2] - bbox[0]
    draw.text(((w - tw) // 2, cy_mark + 105), tagline, fill=BRAND_300 + (255,), font=font_sub)

    # Accent gradient bar at bottom
    bar_h = 4
    for x in range(w):
        t = x / w
        r = int(BRAND_500[0] * (1 - t) + ACCENT_500[0] * t)
        g = int(BRAND_500[1] * (1 - t) + ACCENT_500[1] * t)
        b = int(BRAND_500[2] * (1 - t) + ACCENT_500[2] * t)
        draw.line([(x, h - bar_h), (x, h)], fill=(r, g, b, 255))

    img = img.convert("RGB")
    img.save(PUBLIC / "og-image.png", quality=90)
    print("  Created og-image.png (1200x630)")


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    print("Generating brand assets...")
    generate_favicons()
    generate_og_image()
    print("Done!")
