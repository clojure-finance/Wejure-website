"""Checks every internal link and #anchor of the built site.

Run after `lein run` (or `clojure -M:build`):

    python3 dev/check_links.py public/Wejure-website

Prints each link whose page or anchor is missing, and duplicate ids, then a
summary; exits 1 if there are problems.
"""
import os
import posixpath
import re
import sys
from html.parser import HTMLParser

root = sys.argv[1]
prefix = '/Wejure-website'


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links = [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        for k in ('href', 'src'):
            if a.get(k):
                self.links.append(a[k])


def url_dir(file):
    """The URL of the folder that holds a built file, ending in /."""
    rel = os.path.relpath(os.path.dirname(file), root)
    return prefix + '/' if rel == '.' else f'{prefix}/{rel}/'


pages = {}
for d, _, fs in os.walk(root):
    for f in fs:
        if f.endswith('.html'):
            p = os.path.join(d, f)
            pages[p] = Page()
            pages[p].feed(open(p, encoding='utf-8').read())

problems = links = 0
for p, page in sorted(pages.items()):
    dup = {i for i in page.ids if page.ids.count(i) > 1}
    if dup:
        print('DUP-ID', p, dup)
        problems += 1
    for link in page.links:
        if re.match(r'^(https?:|mailto:|//)', link):
            continue
        links += 1
        path, _, frag = link.partition('#')
        if path == '':
            target = p
        else:
            full = path if path.startswith('/') else posixpath.normpath(posixpath.join(url_dir(p), path))
            if full != prefix and not full.startswith(prefix + '/'):
                print('OUTSIDE', p, link)
                problems += 1
                continue
            rel = full[len(prefix):].lstrip('/')
            target = os.path.join(root, rel)
            if rel == '' or os.path.isdir(target):
                target = os.path.join(target, 'index.html')
        if not os.path.exists(target):
            print('MISSING', p, link)
            problems += 1
            continue
        if frag and target.endswith('.html') and frag not in pages[target].ids:
            print('NOANCHOR', p, link)
            problems += 1
print('pages', len(pages), 'links', links, 'problems', problems)
sys.exit(1 if problems else 0)
