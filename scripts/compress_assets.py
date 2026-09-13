#!/usr/bin/env python3
"""One-time asset compression for the Graphos site.

- Re-encodes all gallery JPEGs at quality 82 (progressive, optimized).
- Converts photographic PNGs (fully opaque) to JPEG, writing <name>.jpg
  and removing the old PNG so Next serves the smaller file.
- Optimizes logo PNGs in place (lossless palette/optimize pass).
The code references for converted files are updated by the caller.
"""

import sys
from pathlib import Path

from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"

JPEG_QUALITY = 80
MAX_DIMENSION = 1600

# Fully-opaque photographic PNGs that are safe to convert to JPEG.
CONVERT_TO_JPEG = [
    "homedesktop.png",
    "homemobile.png",
    "gallery/about.png",
    "gallery/haldi.png",
    "gallery/sangeeth.png",
]

# Logo PNGs: keep PNG, lossless optimize only.
OPTIMIZE_PNG = [
    "logo.png",
    "navibar.png",
]


def compress_jpeg(path: Path) -> bool:
    img = Image.open(path)
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")
    img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.LANCZOS)
    img.save(
        path,
        "JPEG",
        quality=JPEG_QUALITY,
        optimize=True,
        progressive=True,
    )
    return True


def convert_png_to_jpeg(path: Path) -> bool:
    img = Image.open(path)
    img.load()
    if "A" in img.getbands():
        alpha = img.getchannel("A")
        if alpha.getextrema() != (255, 255):
            print(f"SKIP (has transparency): {path.relative_to(PUBLIC)}")
            return False
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.LANCZOS)
    out = path.with_suffix(".jpg")
    img.save(out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    path.unlink()
    print(f"CONVERT: {path.relative_to(PUBLIC)} -> {out.name} ({out.stat().st_size // 1024} KB)")
    return True


def optimize_png(path: Path) -> bool:
    img = Image.open(path)
    img.load()
    img.save(path, "PNG", optimize=True)
    return True


def main() -> int:
    jobs = []

    for p in sorted(PUBLIC.rglob("*.jpg")):
        jobs.append((compress_jpeg, p))
    for name in CONVERT_TO_JPEG:
        p = PUBLIC / name
        if p.exists():
            jobs.append((convert_png_to_jpeg, p))
    for name in OPTIMIZE_PNG:
        p = PUBLIC / name
        if p.exists():
            jobs.append((optimize_png, p))

    for fn, p in jobs:
        try:
            fn(p)
        except Exception as exc:  # noqa: BLE001
            print(f"ERROR {p}: {exc}", file=sys.stderr)

    total = sum(f.stat().st_size for f in PUBLIC.rglob("*") if f.is_file())
    print(f"\npublic/ total: {total / (1024 * 1024):.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())