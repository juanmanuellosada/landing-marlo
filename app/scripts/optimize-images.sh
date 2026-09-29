#!/usr/bin/env bash
# =============================================================================
# optimize-images.sh
# Converts and optimizes raster images for the landing page.
#
# Usage:
#   bash app/scripts/optimize-images.sh          # from repo root
#   bash scripts/optimize-images.sh              # from app/
#
# Requirements: ImageMagick 7+ ("magick" command) must be in PATH.
#
# Idempotent: each output file is skipped if it already exists.
# Pass --force to overwrite all existing outputs.
#
# What it does:
#   1. Backs up originals to public/images/_originals/ (never overwrites backups)
#   2. Converts testimonio WebPs (3375px) → 1350px WebP + -480 and -960 variants
#   3. Converts testimonio-14.png → testimonio-14.webp (same variants)
#   4. Converts proyectos PNGs → WebP + -320 and -640 variants
#   5. Converts kit PNGs → WebP at 1200px max
#   6. Converts hero/about JPGs → WebP with responsive variants
# =============================================================================

set -euo pipefail

# Detect script location and resolve IMAGES_DIR
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Script lives at app/scripts/, so IMAGES_DIR is two levels up + public/images
IMAGES_DIR="$(cd "${SCRIPT_DIR}/../public/images" && pwd)"
ORIGINALS_DIR="${IMAGES_DIR}/_originals"

FORCE=0
[[ "${1:-}" == "--force" ]] && FORCE=1

# ── Helpers ─────────────────────────────────────────────────────────────────

need() {
  if ! command -v magick &>/dev/null; then
    echo "ERROR: 'magick' (ImageMagick 7) is required but not found." >&2
    echo "Install: https://imagemagick.org/script/download.php" >&2
    exit 1
  fi
}

# Convert src → dst if dst doesn't exist (or --force).
# Additional magick args follow.
encode() {
  local src="$1" dst="$2"
  shift 2
  if [[ -f "$dst" && "$FORCE" -eq 0 ]]; then
    echo "  skip (exists): $dst"
    return 0
  fi
  mkdir -p "$(dirname "$dst")"
  magick "$src" "$@" -define webp:method=6 "$dst"
  echo "  → $dst ($(du -sh "$dst" | cut -f1))"
}

# ── Backup originals ─────────────────────────────────────────────────────────

backup() {
  local src="$1" dst="$2"
  if [[ -f "$dst" ]]; then
    return 0  # never overwrite backups
  fi
  mkdir -p "$(dirname "$dst")"
  cp "$src" "$dst"
  echo "  backed up: $dst"
}

# ── Main ─────────────────────────────────────────────────────────────────────

need

echo ""
echo "=== 1. Testimonios (screenshot carrusel) ==="

TDIR="${IMAGES_DIR}/testimonios"
TORIG="${ORIGINALS_DIR}/testimonios"

# Back up original testimonio-14.png (the only PNG)
if [[ -f "${TDIR}/testimonio-14.png" ]]; then
  backup "${TDIR}/testimonio-14.png" "${TORIG}/testimonio-14.png"
fi
# Back up current WebP originals (pre-resize)
for f in "${TDIR}"/testimonio-*.webp; do
  [[ -f "$f" ]] || continue
  fname="$(basename "$f")"
  # Only back up base files (no -480 / -960 variants)
  [[ "$fname" =~ -[0-9]+\.webp$ ]] && continue
  backup "$f" "${TORIG}/${fname}"
done

# Convert testimonio-14.png → base, -480, -960 WebP
if [[ -f "${TDIR}/testimonio-14.png" ]]; then
  encode "${TDIR}/testimonio-14.png" "${TDIR}/testimonio-14.webp" -resize 1350x\> -quality 82
  encode "${TDIR}/testimonio-14.png" "${TDIR}/testimonio-14-480.webp" -resize 480x\> -quality 80
  encode "${TDIR}/testimonio-14.png" "${TDIR}/testimonio-14-960.webp" -resize 960x\> -quality 81
elif [[ -f "${TORIG}/testimonio-14.png" ]]; then
  # Fallback: read from backup
  encode "${TORIG}/testimonio-14.png" "${TDIR}/testimonio-14.webp" -resize 1350x\> -quality 82
  encode "${TORIG}/testimonio-14.png" "${TDIR}/testimonio-14-480.webp" -resize 480x\> -quality 80
  encode "${TORIG}/testimonio-14.png" "${TDIR}/testimonio-14-960.webp" -resize 960x\> -quality 81
fi

# Re-encode testimonio 1–13 WebPs from originals
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13; do
  orig="${TORIG}/testimonio-${n}.webp"
  if [[ ! -f "$orig" ]]; then
    echo "  WARNING: original not found for testimonio-${n}, skipping"
    continue
  fi
  encode "$orig" "${TDIR}/testimonio-${n}.webp"      -resize 1350x\> -quality 82
  encode "$orig" "${TDIR}/testimonio-${n}-480.webp"  -resize 480x\> -quality 80
  encode "$orig" "${TDIR}/testimonio-${n}-960.webp"  -resize 960x\> -quality 81
done

echo ""
echo "=== 2. Proyectos logos ==="

PDIR="${IMAGES_DIR}/proyectos"
PORIG="${ORIGINALS_DIR}/proyectos"

for n in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25; do
  orig="${PDIR}/${n}.png"
  [[ -f "$orig" ]] || orig="${PORIG}/${n}.png"
  if [[ ! -f "$orig" ]]; then
    echo "  WARNING: ${n}.png not found, skipping"
    continue
  fi
  backup "$orig" "${PORIG}/${n}.png"
  encode "$orig" "${PDIR}/${n}.webp"      -quality 85
  encode "$orig" "${PDIR}/${n}-320.webp"  -resize 320x320 -quality 83
  encode "$orig" "${PDIR}/${n}-640.webp"  -resize 640x640 -quality 84
done

echo ""
echo "=== 3. Kit images ==="

RORIG="${ORIGINALS_DIR}/root"
for kit in kit-digital-estrategia kit-organizacion-freelancer; do
  orig="${IMAGES_DIR}/${kit}.png"
  [[ -f "$orig" ]] || orig="${RORIG}/${kit}.png"
  if [[ ! -f "$orig" ]]; then
    echo "  WARNING: ${kit}.png not found, skipping"
    continue
  fi
  backup "$orig" "${RORIG}/${kit}.png"
  encode "$orig" "${IMAGES_DIR}/${kit}.webp" -resize 1200x1200\> -quality 85
done

echo ""
echo "=== 4. Hero / About photos ==="

for jpg in foto-perfil foto-camara; do
  orig="${IMAGES_DIR}/${jpg}.jpg"
  [[ -f "$orig" ]] || orig="${RORIG}/${jpg}.jpg"
  if [[ ! -f "$orig" ]]; then
    echo "  WARNING: ${jpg}.jpg not found, skipping"
    continue
  fi
  backup "$orig" "${RORIG}/${jpg}.jpg"
done

# foto-perfil: full (1034px) + 480w
encode "${RORIG}/foto-perfil.jpg" "${IMAGES_DIR}/foto-perfil.webp"      -quality 85
encode "${RORIG}/foto-perfil.jpg" "${IMAGES_DIR}/foto-perfil-480.webp"  -resize 480x\> -quality 82

# foto-camara: full (1200px max) + 480w + 960w
encode "${RORIG}/foto-camara.jpg" "${IMAGES_DIR}/foto-camara.webp"      -resize 1200x\> -quality 85
encode "${RORIG}/foto-camara.jpg" "${IMAGES_DIR}/foto-camara-480.webp"  -resize 480x\> -quality 82
encode "${RORIG}/foto-camara.jpg" "${IMAGES_DIR}/foto-camara-960.webp"  -resize 960x\> -quality 84

echo ""
echo "Done. Originals are in: ${ORIGINALS_DIR}"
echo "Delete _originals/ once you have verified quality."
