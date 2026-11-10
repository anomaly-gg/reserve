"""Builds the redirect pages (index/owner/404.html) with go.js INLINED (a 404 can be served at any depth, where a relative
<script src> would not resolve), then copies the whole set to ../redirect-goa/ (the goa repo's gh-pages branch).
    python build.py
"""
import os, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
js = open(os.path.join(HERE, "go.js"), encoding="utf-8").read()
page = ('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<meta name="robots" content="noindex"><meta name="theme-color" content="#0d0f14"><title>NETPIX Goa</title>\n'
        '<style>html,body{margin:0;background:#0d0f14;color:#8a93a6;font:16px system-ui,sans-serif}p{text-align:center;margin-top:40vh}a{color:#eef1f6}</style>\n'
        '</head><body><p>Opening <a href="https://netpix-goa.xpropics.workers.dev/">NETPIX Goa</a>…</p>\n<script>\n' + js + '</script></body></html>\n')
for n in ("index.html", "owner.html", "404.html"):
    open(os.path.join(HERE, n), "w", encoding="utf-8", newline="\n").write(page)
other = os.path.join(os.path.dirname(HERE), "redirect-goa")
os.makedirs(other, exist_ok=True)
for n in ("index.html", "owner.html", "404.html", "sw.js"):
    shutil.copy2(os.path.join(HERE, n), os.path.join(other, n))
print("built + copied to redirect-goa/")
