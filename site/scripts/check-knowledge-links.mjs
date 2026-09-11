// Read-only checks for source Markdown, including citations hidden by HTML fallbacks.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"
import { remark } from "remark"
import gfm from "remark-gfm"
import frontmatter from "remark-frontmatter"
import Slugger from "github-slugger"

const root = fileURLToPath(new URL("../../", import.meta.url))
const wiki = path.join(root, "wiki")
const parser = remark().use(gfm).use(frontmatter)
const files = fs.readdirSync(wiki, { recursive: true })
  .filter((f) => f.endsWith(".md") && f !== "log.md")
const pages = new Map()
const failures = []
const tracked = process.argv.includes("--publish")
  ? new Set(execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0"))
  : null
const text = (n) => n.value ?? n.children?.map(text).join("") ?? ""
const walk = (n, fn) => { fn(n); for (const c of n.children ?? []) walk(c, fn) }
const fail = (file, line, reason) => failures.push(`${file}:${line}: ${reason}`)

for (const file of files) {
  const source = fs.readFileSync(path.join(wiki, file), "utf8")
  const tree = parser.parse(source)
  const page = { source, tree, links: [], headings: new Set(), footnotes: new Set(), definitions: new Map() }
  const slugger = new Slugger()
  walk(tree, (n) => {
    if (n.type === "heading") page.headings.add(slugger.slug(text(n)))
    if (n.type === "footnoteDefinition") page.footnotes.add(n.identifier)
    if (n.type === "definition") page.definitions.set(n.identifier, n.url)
  })
  walk(tree, (n) => {
    if (["link", "image", "linkReference", "imageReference"].includes(n.type)) {
      const url = n.url ?? page.definitions.get(n.identifier)
      if (url) page.links.push({ url, line: n.position.start.line })
    }
    if (n.type === "footnoteReference" && !page.footnotes.has(n.identifier)) {
      fail(file, n.position.start.line, `Missing footnote: ${n.identifier}`)
    }
  })
  // Markdown can silently render an invalid destination with spaces as plain text.
  source.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\[[^\]\n]+\]\(([^)\n]*\.md(?:#[^)\n]*)?)\)/g)) {
      if (m[1].includes(" ")) fail(file, i + 1, `Unencoded space in Markdown target: ${m[1]}`)
    }
  })
  pages.set(file, page)
}

let checked = 0
for (const [file, page] of pages) {
  for (const { url, line } of page.links) {
    checked++
    if (/^https?:\/\//.test(url)) {
      if (/[）；。]$/.test(url) || /[）；].*https?:\/\//.test(url)) {
        fail(file, line, `Punctuation swallowed into URL: ${url}`)
      }
      continue
    }
    if (/^[a-z][a-z\d+.-]*:/i.test(url)) continue
    const [pathname, fragment] = url.split("#")
    const target = path.resolve(wiki, path.dirname(file), decodeURIComponent(pathname.split("?")[0]) || path.basename(file))
    if (!fs.existsSync(target)) fail(file, line, `Missing target: ${url}`)
    else if (tracked && fs.statSync(target).isFile() && !tracked.has(path.relative(root, target))) {
      fail(file, line, `Target exists locally but is not tracked for publication: ${url}`)
    }
    if (target === path.join(wiki, file) && !fragment) fail(file, line, `Self-link without anchor: ${url}`)
    const targetPage = pages.get(path.relative(wiki, target))
    if (fragment && targetPage && !targetPage.headings.has(decodeURIComponent(fragment))) {
      fail(file, line, `Missing heading: ${url}`)
    }
  }
}

const indexed = new Set(pages.get("index.md").links.map(({ url }) => decodeURIComponent(url.split("#")[0])))
for (const file of files) {
  if (file !== "index.md" && !indexed.has(file)) fail("index.md", 1, `Article absent from index: ${file}`)
}
for (const failure of failures) console.error(failure)
console.log(`Checked ${files.length - 1} articles, index, and ${checked} links; ${failures.length} failures. External HTTP status not checked.`)
process.exitCode = failures.length ? 1 : 0
