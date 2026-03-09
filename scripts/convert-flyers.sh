#!/usr/bin/env bash
set -euo pipefail

# Convert PDF flyers to branded WebP images
# Usage: bash scripts/convert-flyers.sh

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RAW_DIR="$PROJECT_DIR/raw_product_pdfs"
OUT_BASE="$PROJECT_DIR/public/images/products"
LOGO_SVG="/tmp/northlume-logo-white.svg"
TMP="/tmp/flyer-convert"

mkdir -p "$TMP"

# ── Helper: process a single source image into branded WebP ──────────────
# Usage: process_image <input_png_or_jpg> <output_webp> <crop_percent>
process_image() {
  local input="$1"
  local output="$2"
  local crop_pct="${3:-9.5}"

  local height width crop_px
  height=$(magick identify -format "%h" "$input")
  width=$(magick identify -format "%w" "$input")
  crop_px=$(echo "$height * $crop_pct / 100" | bc | cut -d. -f1)

  # Crop footer
  magick "$input" -gravity South -chop "0x${crop_px}" "$TMP/cropped.png"

  # Resize to max 1600px wide
  magick "$TMP/cropped.png" -resize '1600x>' "$TMP/resized.png"
  local out_w
  out_w=$(magick identify -format "%w" "$TMP/resized.png")

  # Footer bar (50px tall)
  local footer_h=50
  magick -size "${out_w}x${footer_h}" xc:'#1e293b' \
    -font DejaVu-Sans -pointsize 16 -fill white \
    -gravity West -annotate +20+0 'orders@northlumedistribution.ca  |  northlumedistribution.ca' \
    "$TMP/footer-base.png"

  # Render logo
  magick -background none -density 300 "$LOGO_SVG" -resize x30 "$TMP/logo.png"

  # Composite logo on right
  magick "$TMP/footer-base.png" "$TMP/logo.png" \
    -gravity East -geometry +20+0 -composite "$TMP/footer.png"

  # Stack image + footer, output WebP
  mkdir -p "$(dirname "$output")"
  magick "$TMP/resized.png" "$TMP/footer.png" -append -quality 85 "$output"

  echo "  → $(basename "$output") ($(magick identify -format '%wx%h' "$output"))"
}

# ── Helper: convert PDF page to PNG ──────────────────────────────────────
# Usage: pdf_to_png <pdf_path> <output_prefix> [page_number]
# page_number is 1-based; if omitted, uses -singlefile for single page
pdf_to_png() {
  local pdf="$1"
  local prefix="$2"
  local page="${3:-}"

  if [ -z "$page" ]; then
    pdftoppm -png -r 300 -singlefile "$pdf" "$prefix"
  else
    local first=$((page - 1))
    local last=$((page - 1))
    pdftoppm -png -r 300 -f "$first" -l "$last" -singlefile "$pdf" "$prefix"
  fi
}

echo "=== Converting PDF flyers to branded WebP ==="
echo ""

# ── 1. Volt Elite (page-01) ──────────────────────────────────────────────
echo "[volt] Volt Elite V3..."
pdf_to_png "$RAW_DIR/VOLT ELITE V3 FLYER - Price.pdf" "$TMP/volt-elite"
process_image "$TMP/volt-elite.png" "$OUT_BASE/volt/page-01.webp" 9.5

# ── 2. Volt Evolution (page-02) — JPEG source ───────────────────────────
echo "[volt] Volt Evolution..."
# JPEG has a small footer bar at the bottom (~5%)
process_image "$RAW_DIR/WhatsApp Image 2026-03-09 at 4.07.30 PM.jpeg" "$OUT_BASE/volt/page-02.webp" 5

# Remove old volt pages 03-10
for i in $(seq -w 3 10); do
  rm -f "$OUT_BASE/volt/page-$i.webp"
done

# ── 3. Tech 361 ──────────────────────────────────────────────────────────
echo "[tech-361] Tech 361..."
pdf_to_png "$RAW_DIR/TECH 361_FLYER.pdf" "$TMP/tech361"
process_image "$TMP/tech361.png" "$OUT_BASE/tech-361/page-01.webp" 9.5
rm -f "$OUT_BASE/tech-361/page-11.webp"

# ── 4. Gorilla Squeeze (Novelty Candy p1) ────────────────────────────────
echo "[gorilla-squeeze] Gorilla Squeeze Duo..."
pdf_to_png "$RAW_DIR/Novelty Candy Flyers Compressed Lion.pdf" "$TMP/novelty-gorilla" 1
process_image "$TMP/novelty-gorilla.png" "$OUT_BASE/gorilla-squeeze/page-01.webp" 7
rm -f "$OUT_BASE/gorilla-squeeze/page-13.webp"

# ── 5. Sour Rockstar (Novelty Candy p2) ─────────────────────────────────
echo "[sour-rockstar] Sour Rockstar Roll Licker..."
pdf_to_png "$RAW_DIR/Novelty Candy Flyers Compressed Lion.pdf" "$TMP/novelty-rockstar" 2
process_image "$TMP/novelty-rockstar.png" "$OUT_BASE/sour-rockstar/page-01.webp" 7
rm -f "$OUT_BASE/sour-rockstar/page-12.webp"

# ── 6. Cheeky Monkey ────────────────────────────────────────────────────
echo "[cheeky-monkey] Cheeky Monkey Candy..."
pdf_to_png "$RAW_DIR/Cheeky Monkey Candy Flyer.pdf" "$TMP/cheeky-monkey"
process_image "$TMP/cheeky-monkey.png" "$OUT_BASE/cheeky-monkey/page-01.webp" 9.5
rm -f "$OUT_BASE/cheeky-monkey/page-16.webp" "$OUT_BASE/cheeky-monkey/page-17.webp"

# ── 7. Zaks Jerky — page-01 (Traditional 120g) ──────────────────────────
echo "[zaks-jerky] Zaks Traditional 120g..."
pdf_to_png "$RAW_DIR/ZAKS-120G-Traditional BJ-96pc ShipperKit-Z-e.pdf" "$TMP/zaks-traditional"
process_image "$TMP/zaks-traditional.png" "$OUT_BASE/zaks-jerky/page-01.webp" 9.5

# ── 8. Zaks Jerky — page-02 (Beef Jerky general) ────────────────────────
echo "[zaks-jerky] Zaks Beef Jerky..."
pdf_to_png "$RAW_DIR/Zaks Beef Jerky - Flyer.pdf" "$TMP/zaks-general"
process_image "$TMP/zaks-general.png" "$OUT_BASE/zaks-jerky/page-02.webp" 9.5
rm -f "$OUT_BASE/zaks-jerky/page-34.webp" "$OUT_BASE/zaks-jerky/page-35.webp" \
      "$OUT_BASE/zaks-jerky/page-36.webp" "$OUT_BASE/zaks-jerky/page-38.webp"

# ── 9. The Butcher ──────────────────────────────────────────────────────
echo "[the-butcher] The Butcher 90g..."
pdf_to_png "$RAW_DIR/2025 Butcher 90g Beef Jerky & Shipper Flyer.pdf" "$TMP/butcher"
process_image "$TMP/butcher.png" "$OUT_BASE/the-butcher/page-01.webp" 9.5
for i in 39 40 41 42 43 44 45 46; do
  rm -f "$OUT_BASE/the-butcher/page-$i.webp"
done

# ── 10. Die Cast Cars ───────────────────────────────────────────────────
echo "[die-cast-cars] Die Cast Cars..."
pdf_to_png "$RAW_DIR/Die Cast Cars - Flyer.pdf" "$TMP/die-cast"
process_image "$TMP/die-cast.png" "$OUT_BASE/die-cast-cars/page-01.webp" 9.5
rm -f "$OUT_BASE/die-cast-cars/page-19.webp"

# ── 11. 3D Minis & Creatures (2 pages) ──────────────────────────────────
echo "[3d-minis-creatures] 3D Creatures page 1..."
pdf_to_png "$RAW_DIR/3D_Creatures_Flyer-V3_s-1.pdf" "$TMP/3d-p1" 1
process_image "$TMP/3d-p1.png" "$OUT_BASE/3d-minis-creatures/page-01.webp" 9.5

echo "[3d-minis-creatures] 3D Creatures page 2..."
pdf_to_png "$RAW_DIR/3D_Creatures_Flyer-V3_s-1.pdf" "$TMP/3d-p2" 2
process_image "$TMP/3d-p2.png" "$OUT_BASE/3d-minis-creatures/page-02.webp" 9.5
rm -f "$OUT_BASE/3d-minis-creatures/page-20.webp" "$OUT_BASE/3d-minis-creatures/page-21.webp"

# ── 12. Charm Buddies ───────────────────────────────────────────────────
echo "[charm-buddies] Charm Buddies..."
pdf_to_png "$RAW_DIR/Bag_Charms_Flyer-V3.pdf" "$TMP/charm-buddies"
process_image "$TMP/charm-buddies.png" "$OUT_BASE/charm-buddies/page-01.webp" 9.5
rm -f "$OUT_BASE/charm-buddies/page-22.webp"

# ── 13. Cool Tats ───────────────────────────────────────────────────────
echo "[cool-tats] Cool Tats..."
pdf_to_png "$RAW_DIR/Cool Tats Shipper Display 120pc - Flyer.pdf" "$TMP/cool-tats"
process_image "$TMP/cool-tats.png" "$OUT_BASE/cool-tats/page-01.webp" 9.5
rm -f "$OUT_BASE/cool-tats/page-23.webp"

# ── 14. Sticker Kraze ──────────────────────────────────────────────────
echo "[sticker-kraze] Sticker Kraze Bamboo..."
pdf_to_png "$RAW_DIR/Sticker Kraze Bamboo - Flyer (CAN).pdf" "$TMP/sticker-kraze"
process_image "$TMP/sticker-kraze.png" "$OUT_BASE/sticker-kraze/page-01.webp" 9.5
rm -f "$OUT_BASE/sticker-kraze/page-24.webp" "$OUT_BASE/sticker-kraze/page-25.webp"

# ── 15. Retro Rattlers ─────────────────────────────────────────────────
echo "[retro-rattlers] Retro Rattlers..."
pdf_to_png "$RAW_DIR/Retro Rattlers Sunglasses - 48pc Floor Shipper.pdf" "$TMP/retro-rattlers"
process_image "$TMP/retro-rattlers.png" "$OUT_BASE/retro-rattlers/page-01.webp" 9.5
rm -f "$OUT_BASE/retro-rattlers/page-28.webp"

# ── 16. Bones Premium Pet Treats ────────────────────────────────────────
echo "[bones] Bones Premium Pet Treats..."
pdf_to_png "$RAW_DIR/2025 CAN Bones_Cow& Pig Ear flyer.pdf" "$TMP/bones"
process_image "$TMP/bones.png" "$OUT_BASE/bones/page-01.webp" 9.5
rm -f "$OUT_BASE/bones/page-18.webp"

# ── 17. Campers Campfire Sticks ─────────────────────────────────────────
echo "[campers] Campers Campfire Sticks..."
pdf_to_png "$RAW_DIR/CAMPERS Campfire Stick 55pcs Flyer FINAL.pdf" "$TMP/campers"
process_image "$TMP/campers.png" "$OUT_BASE/campers/page-01.webp" 9.5
rm -f "$OUT_BASE/campers/page-31.webp"

echo ""
echo "=== Done! All flyers converted ==="
echo ""

# Verify all output files
echo "Verifying output files:"
for dir in volt tech-361 gorilla-squeeze sour-rockstar cheeky-monkey zaks-jerky the-butcher \
           die-cast-cars 3d-minis-creatures charm-buddies cool-tats sticker-kraze \
           retro-rattlers bones campers; do
  echo -n "  $dir: "
  ls "$OUT_BASE/$dir"/page-*.webp 2>/dev/null | xargs -I{} basename {} | tr '\n' ' '
  echo ""
done

# Cleanup
rm -rf "$TMP"
