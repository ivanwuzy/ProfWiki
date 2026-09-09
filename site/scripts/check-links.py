"""Check generated HTML links/assets against the GitHub Pages project base path."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import sys

PUBLIC = Path(__file__).resolve().parents[1] / "public"
BASE = "https://ivanwuzy.github.io/ProfWiki/"


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if value and ((key == "href" and tag in ("a", "link")) or (key == "src" and tag in ("img", "script", "iframe", "audio", "video"))):
                self.urls.append(value)


failures = []
checked = 0
pages = list(PUBLIC.rglob("*.html"))
assert pages and (PUBLIC / "index.html").exists(), "No generated homepage"
for page in pages:
    parser = Links()
    parser.feed(page.read_text())
    relative = page.relative_to(PUBLIC).as_posix()
    page_url = urljoin(BASE, relative.removesuffix("index.html") if relative.endswith("/index.html") or relative == "index.html" else relative.removesuffix(".html"))
    for href in parser.urls:
        if href.startswith("#"):
            continue
        url = urlsplit(urljoin(page_url, href))
        if url.scheme not in ("http", "https") or url.netloc != "ivanwuzy.github.io":
            continue
        target_path = unquote(url.path)
        if target_path == "/ProfWiki":
            target_path += "/"
        if not target_path.startswith("/ProfWiki/"):
            failures.append((relative, href, "outside project base path"))
            continue
        target = PUBLIC / target_path.removeprefix("/ProfWiki/")
        checked += 1
        if not (target.is_file() or Path(str(target) + ".html").is_file() or (target / "index.html").is_file()):
            failures.append((relative, href, "missing target"))

for failure in failures[:50]:
    print("BROKEN:", *failure, sep=" | ")
print(f"Checked {len(pages)} pages and {checked} local links/assets; {len(failures)} failures.")
sys.exit(bool(failures))
