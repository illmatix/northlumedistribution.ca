#!/usr/bin/env python3
"""
Convert NorthLume Catalogue 2026.pdf pages into branded WebP images.

Usage:
    python3 scripts/process-catalog.py [path/to/catalog.pdf]

Defaults to "NorthLume Catalogue 2026.pdf" in the project root.

Requirements: pdftoppm (poppler-utils), Python 3 + Pillow
"""

import os
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_PDF = PROJECT_ROOT / "NorthLume Catalogue 2026.pdf"
TMP_DIR = PROJECT_ROOT / "scripts" / "tmp"
OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "products"
DPI = 200
WEBP_QUALITY = 85

# Footer dimensions (fraction of page height)
FOOTER_CROP_RATIO = 0.058  # ~5.8% of page height
FOOTER_CROP_RATIO_PAGE21 = 0.10  # Page 21 has overlapping dual footers

# Pages to skip (duplicates)
SKIP_PAGES = {37, 48, 50}

# Page-to-brand mapping
PAGE_BRAND_MAP = {
    range(1, 5): "volt",        # 1-4  Volt Evolution
    range(5, 6): "volt",        # 5    Volt Fast Charge
    range(6, 9): "volt",        # 6-8  Volt Designer
    range(9, 11): "volt",       # 9-10 Volt Elite
    range(11, 12): "tech-361",
    range(12, 13): "sour-rockstar",
    range(13, 14): "gorilla-squeeze",
    range(14, 15): "tnt-sour-stix",
    range(15, 16): "squeeze-team-heroes",
    range(16, 18): "cheeky-monkey",
    range(18, 19): "bones",
    range(19, 20): "die-cast-cars",
    range(20, 22): "3d-minis-creatures",
    range(22, 23): "charm-buddies",
    range(23, 24): "cool-tats",
    range(24, 26): "sticker-kraze",
    range(26, 27): "bag-swag",
    range(27, 28): "keysteez",
    range(28, 29): "retro-rattlers",
    range(29, 30): "fancy-fannys",
    range(30, 31): "card-guard",
    range(31, 32): "campers",
    range(32, 34): "warp-worm",
    range(34, 39): "zaks-jerky",
    range(39, 47): "the-butcher",
    range(47, 48): "kokum",
    range(49, 50): "kokum",
}


def get_brand_for_page(page_num: int) -> str | None:
    """Return the brand slug for a given page number, or None to skip."""
    if page_num in SKIP_PAGES:
        return None
    for page_range, brand in PAGE_BRAND_MAP.items():
        if page_num in page_range:
            return brand
    return None


def find_font(size: int) -> ImageFont.FreeTypeFont:
    """Find the Inter SemiBold font, falling back to other options."""
    font_paths = [
        "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf",
        "/usr/share/fonts/opentype/inter/Inter-Bold.otf",
        "/usr/share/fonts/opentype/inter/InterDisplay-Medium.otf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default(size=size)


def find_font_regular(size: int) -> ImageFont.FreeTypeFont:
    """Find a regular-weight font for the email text."""
    font_paths = [
        "/usr/share/fonts/opentype/inter/Inter-Regular.otf",
        "/usr/share/fonts/opentype/inter/Inter-Medium.otf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            return ImageFont.truetype(fp, size)
    return ImageFont.load_default(size=size)


def convert_pdf_to_pngs(pdf_path: Path) -> list[Path]:
    """Convert PDF to per-page PNG files using pdftoppm."""
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    prefix = TMP_DIR / "page"

    print(f"Converting PDF to PNG at {DPI} DPI...")
    subprocess.run(
        [
            "pdftoppm",
            "-png",
            "-r", str(DPI),
            str(pdf_path),
            str(prefix),
        ],
        check=True,
    )

    # pdftoppm outputs page-01.png, page-02.png, etc.
    pages = sorted(TMP_DIR.glob("page-*.png"))
    print(f"  Generated {len(pages)} page images")
    return pages


def extract_page_number(png_path: Path) -> int:
    """Extract page number from pdftoppm filename like page-01.png."""
    stem = png_path.stem  # e.g. "page-01"
    num_str = stem.split("-")[-1]
    return int(num_str)


def replace_footer(img: Image.Image, page_num: int) -> Image.Image:
    """Crop the Zaks footer and draw a North Lume branded footer."""
    width, height = img.size

    # Determine crop ratio
    crop_ratio = FOOTER_CROP_RATIO_PAGE21 if page_num == 21 else FOOTER_CROP_RATIO
    footer_height = int(height * crop_ratio)
    content_height = height - footer_height

    # Crop off the old footer
    img_cropped = img.crop((0, 0, width, content_height))

    # Create new image with replacement footer
    new_img = Image.new("RGB", (width, height), (255, 255, 255))
    new_img.paste(img_cropped, (0, 0))

    # Draw the new footer bar
    draw = ImageDraw.Draw(new_img)
    footer_y = content_height

    # Dark background bar
    bar_color = (7, 42, 74)  # brand-950: #072a4a
    draw.rectangle([(0, footer_y), (width, height)], fill=bar_color)

    # Font sizing relative to footer height
    font_size = max(int(footer_height * 0.38), 12)
    font_bold = find_font(font_size)
    font_regular = find_font_regular(font_size)

    # Vertical center of footer bar
    text_y = footer_y + (footer_height - font_size) // 2

    # Left: email
    padding_x = int(width * 0.025)
    email_text = "To order email: orders@northlumedistribution.ca"
    draw.text((padding_x, text_y), email_text, fill=(255, 255, 255), font=font_regular)

    # Right: brand wordmark
    brand_text = "North Lume Distribution"
    bbox = draw.textbbox((0, 0), brand_text, font=font_bold)
    brand_width = bbox[2] - bbox[0]
    draw.text(
        (width - padding_x - brand_width, text_y),
        brand_text,
        fill=(255, 255, 255),
        font=font_bold,
    )

    return new_img


def process_catalog(pdf_path: Path) -> int:
    """Main processing pipeline. Returns the number of images generated."""
    if not pdf_path.exists():
        print(f"ERROR: PDF not found at {pdf_path}")
        print("Usage: python3 scripts/process-catalog.py [path/to/catalog.pdf]")
        sys.exit(1)

    # Step 1: Convert PDF to PNGs
    png_files = convert_pdf_to_pngs(pdf_path)

    # Step 2: Process each page
    count = 0
    for png_path in png_files:
        page_num = extract_page_number(png_path)
        brand = get_brand_for_page(page_num)

        if brand is None:
            print(f"  Skipping page {page_num} (duplicate)")
            continue

        # Load and process
        img = Image.open(png_path)
        img = replace_footer(img, page_num)

        # Save as WebP
        brand_dir = OUTPUT_DIR / brand
        brand_dir.mkdir(parents=True, exist_ok=True)
        out_path = brand_dir / f"page-{page_num:02d}.webp"
        img.save(str(out_path), "WEBP", quality=WEBP_QUALITY)
        print(f"  Page {page_num:2d} -> {brand}/page-{page_num:02d}.webp")
        count += 1

    # Clean up tmp PNGs
    print("Cleaning up temporary files...")
    for f in TMP_DIR.glob("page-*.png"):
        f.unlink()
    if TMP_DIR.exists() and not any(TMP_DIR.iterdir()):
        TMP_DIR.rmdir()

    return count


def main():
    pdf_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PDF
    pdf_path = pdf_path.resolve()

    print(f"Processing: {pdf_path}")
    print(f"Output:     {OUTPUT_DIR}")
    print()

    count = process_catalog(pdf_path)

    print()
    print(f"Done! Generated {count} WebP images.")


if __name__ == "__main__":
    main()
