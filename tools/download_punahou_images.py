#!/usr/bin/env python3
"""Download the images from Kasin's Google Sites Punahou pages.

Run from the portfolio-site folder:  python3 tools/download_punahou_images.py
Uses only the Python standard library. Google Sites image links expire, so this
script always reads the live page first to get fresh links.

Images are numbered in page order, matching the [IMAGE n] markers in each
assets-raw/punahou/<section>/<page>/PAGE.md, and saved to an images/ folder
next to that PAGE.md.
"""
import os, re, sys, urllib.request
from html.parser import HTMLParser

SITE = "https://sites.google.com/view/kasinitosato/punahou-school/"
PAGES = """ke-kilohana/waikiki-zootopia ke-kilohana/citizen-sand-filter ke-kilohana/articulated-cart
gsd/toy-project gsd/value-sculpture gsd/jewelry-box gsd/why-i-care-about-climate-change
lanakila-express/solar-charger lanakila-express/couplings lanakila-express/tracks
engineering-iii/go-kart engineering-iii/sign engineering-iii/toolbox engineering-iii/coaster engineering-iii/toys-from-trash
extra-work/it-help extra-work/kalani-special-needs-program extra-work/jr-robotics-ta
competency-tests/adobe-illustrator competency-tests/rhino-tutorials competency-tests/cad-certification
competency-tests/mill-test competency-tests/lathe-test""".split()
WIDTH = "w2400"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126 Safari/537.36"}
IMG_HOST = re.compile(r"sitesv-images|googleusercontent|ggpht")
URL_IN_STYLE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")
SKIP_TAGS = {"nav", "header", "footer", "script", "style", "noscript"}
SKIP_ROLES = {"navigation", "banner", "contentinfo"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class Collector(HTMLParser):
    """Collect image URLs in document order, skipping nav/header/footer (same rules used to number PAGE.md)."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []  # True for elements that start a skipped subtree
        self.skip_depth = 0
        self.images, self.seen = [], set()

    def _add(self, url):
        if not url or not IMG_HOST.search(url):
            return
        base = re.sub(r"=[^/]*$", "", url)
        if base in self.seen:
            return
        self.seen.add(base)
        self.images.append(base)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        skipping_here = tag in SKIP_TAGS or a.get("role") in SKIP_ROLES
        if self.skip_depth == 0 and not skipping_here:
            m = URL_IN_STYLE.search(a.get("style") or "")
            if m:
                self._add(m.group(1))
            if tag == "img":
                self._add(a.get("src") or a.get("data-src") or "")
        if tag in VOID:
            return
        self.stack.append(skipping_here)
        if skipping_here:
            self.skip_depth += 1

    def handle_startendtag(self, tag, attrs):
        a = dict(attrs)
        if self.skip_depth == 0:
            m = URL_IN_STYLE.search(a.get("style") or "")
            if m:
                self._add(m.group(1))
            if tag == "img":
                self._add(a.get("src") or a.get("data-src") or "")

    def handle_endtag(self, tag):
        if tag in VOID or not self.stack:
            return
        if self.stack.pop():
            self.skip_depth -= 1


def image_urls(html):
    c = Collector()
    c.feed(html)
    return c.images


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read(), r.headers.get("Content-Type", "")


def ext_for(ctype):
    return {"image/png": ".png", "image/gif": ".gif", "image/webp": ".webp"}.get(ctype.split(";")[0].strip(), ".jpg")


def main():
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets-raw", "punahou")
    total = 0
    for page in PAGES:
        html, _ = fetch(SITE + page)
        urls = image_urls(html.decode("utf-8", "replace"))
        outdir = os.path.join(root, page, "images")
        os.makedirs(outdir, exist_ok=True)
        for i, u in enumerate(urls, 1):
            try:
                data, ctype = fetch(f"{u}={WIDTH}")
                with open(os.path.join(outdir, f"{i:02d}{ext_for(ctype)}"), "wb") as f:
                    f.write(data)
                total += 1
            except Exception as e:  # keep going if one image fails
                print(f"  ! {page} image {i}: {e}", file=sys.stderr)
        print(f"{page}: {len(urls)} images")
    print(f"Done: {total} images saved under assets-raw/punahou/*/*/images/")


if __name__ == "__main__":
    main()
