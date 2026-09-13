#!/usr/bin/env python3
"""Download Instagram images and reels (posts) into a specific folder.

Usage:
    python3 insta_downloader.py <url-or-shortcode> [-o OUT_DIR] [-u USERNAME] [-p PASSWORD]
    python3 insta_downloader.py https://www.instagram.com/reel/ABC123/
    python3 insta_downloader.py ABC123 -o downloads

Notes:
    - Works with post/reel/image URLs or a bare shortcode.
    - Login (-u/-p) is optional but recommended for private profiles
      and to reduce the chance of being rate-limited.
    - The script downloads the media (images/videos) plus captions to OUT_DIR.
"""

import argparse
import sys
from pathlib import Path

import instaloader


def extract_shortcode(value: str) -> str:
    """Return the shortcode from a full URL, or the value itself if it is one."""
    value = value.strip()
    if value.startswith("http"):
        # URL like https://www.instagram.com/p/ABC123/ or /reel/ABC123/
        parts = [p for p in value.rstrip("/").split("/") if p]
        for part in reversed(parts):
            if part not in ("p", "reel", "tv", "reels"):
                return part
    return value


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download Instagram images and reels into a folder."
    )
    parser.add_argument(
        "target",
        help="Instagram post/reel URL or shortcode, e.g. https://www.instagram.com/reel/ABC123/",
    )
    parser.add_argument(
        "-o", "--output",
        default="/media/leki/NANDHAN/sairam",
        help="Destination folder (default: /media/leki/NANDHAN/sairam)",
    )
    parser.add_argument("-u", "--username", help="Instagram username (optional, for login)")
    parser.add_argument("-p", "--password", help="Instagram password (optional, for login)")
    parser.add_argument(
        "--keep-metadata",
        action="store_true",
        help="Keep JSON metadata files (default: remove them)",
    )
    args = parser.parse_args()

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    loader = instaloader.Instaloader(
        download_videos=True,
        download_video_thumbnails=False,
        download_comments=False,
        save_metadata=False,
        post_metadata_txt_pattern="",
        dirname_pattern=str(out_dir),
    )

    if args.username:
        try:
            loader.login(args.username, args.password)
            print("Logged in.")
        except instaloader.exceptions.BadCredentialsException:
            print("Login failed: bad credentials.", file=sys.stderr)
            return 1

    shortcode = extract_shortcode(args.target)
    print(f"Downloading post {shortcode} into {out_dir} ...")

    try:
        post = instaloader.Post.from_shortcode(loader.context, shortcode)
        loader.download_post(post, target=shortcode)
    except instaloader.exceptions.InstaloaderException as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
