import { execFileSync } from "node:child_process"
import { mkdir, readFile, writeFile, copyFile, rm, stat } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const site = fileURLToPath(new URL("../", import.meta.url))
const root = path.resolve(site, "..")
const content = path.join(site, "content")
// Publish only tracked knowledge material, never local conversations or private folders.
const files = execFileSync("git", ["ls-files", "-z", "--", "wiki", "raw", "references"], {
  cwd: root,
  encoding: "utf8",
}).split("\0").filter(Boolean)
const dates = new Map()
const history = execFileSync("git", ["-c", "core.quotepath=false", "log", "--format=@date:%cI", "--name-only", "--", "wiki", "raw", "references"], { cwd: root, encoding: "utf8" })
let date
for (const line of history.split("\n")) {
  if (line.startsWith("@date:")) date = line.slice(6)
  else if (line && date && !dates.has(line)) dates.set(line, date)
}

await rm(content, { recursive: true, force: true })
await mkdir(content, { recursive: true })
let notes = 0
for (const file of files) {
  if (path.basename(file).startsWith(".") || file === "wiki/log.md") continue
  const destination = path.join(content, file)
  await mkdir(path.dirname(destination), { recursive: true })
  if (!file.endsWith(".md")) {
    await copyFile(path.join(root, file), destination)
    continue
  }
  const original = await readFile(path.join(root, file), "utf8")
  const parsed = matter(original)
  const heading = parsed.content.match(/^#\s+(.+)$/m)
  parsed.data.title ??= heading?.[1] ?? path.basename(file, ".md")
  if (file.startsWith("raw/")) {
    const source = original.match(/(?:^|\n)[>\s*-]*(?:Source|URL|来源(?:链接)?)[：:]\s*(https?:\/\/[^\s<>]+)/i)
    const sourceUrl = parsed.data.source_url ?? parsed.data.url ?? source?.[1]
    if (typeof sourceUrl === "string" && /^https?:\/\//.test(sourceUrl)) {
      parsed.data.publishSourceUrl = sourceUrl
    }
  }
  if (parsed.data.last_verified && !parsed.data.modified) {
    parsed.data.modified = parsed.data.last_verified
  }
  parsed.data.modified ??= original.match(/(?:^|\n)[>\s*-]*(?:Updated|Collected):\s*(\d{4}-\d{2}-\d{2})/i)?.[1]
    ?? dates.get(file) ?? (await stat(path.join(root, file))).mtime.toISOString()
  // Quartz renders the title separately; remove its duplicate in the web copy only.
  let body = parsed.content.replace(/^#\s+.+\r?\n/m, "")
  if (file === "wiki/index.md") {
    parsed.data.title = "知识库总索引"
    const labels = { universities: "高校", maps: "地图与观察池", people: "人物", orgs: "院系与实验室", awards: "奖项与竞赛", companies: "公司", questions: "待验证问题" }
    body = body.replace(/^## (\w+)$/gm, (match, key) => `## ${labels[key] ?? key}`)
      .replaceAll("| Article | Summary | Updated |", "| 文章 | 摘要 | 更新日期 |")
  }
  await writeFile(destination, matter.stringify(body, parsed.data))
  notes++
}
// Quartz creates folder pages from Markdown; image-only evidence needs an index.
const imageFolders = new Map()
for (const file of files.filter((name) => /^raw\/assets\/.*\.(png|jpe?g|webp|gif)$/i.test(name))) {
  const folder = path.dirname(file)
  if (!imageFolders.has(folder)) imageFolders.set(folder, [])
  imageFolders.get(folder).push(path.basename(file))
}
for (const [folder, images] of imageFolders) {
  if (files.includes(`${folder}/index.md`)) continue
  const body = images.sort().map((name) => `![${name}](${encodeURIComponent(name)})`).join("\n\n")
  await writeFile(path.join(content, folder, "index.md"), matter.stringify(body, { title: path.basename(folder) }))
}
await copyFile(path.join(site, "home.md"), path.join(content, "index.md"))
console.log(`Prepared ${notes} Markdown pages plus homepage from tracked wiki/, raw/, references/.`)
