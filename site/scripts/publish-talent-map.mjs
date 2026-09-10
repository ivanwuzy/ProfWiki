import { mkdir, copyFile, writeFile } from "node:fs/promises"
const source = new URL("../../talent-map/", import.meta.url)
const target = new URL("../public/talent-map/", import.meta.url)
await mkdir(target, { recursive: true })
// Explicit allowlist: publish only the standalone map, never source evidence or outputs.
for (const file of ["index.html", "style.css", "app.js"]) {
  await copyFile(new URL(file, source), new URL(file, target))
}
console.log("Published standalone talent map to public/talent-map/")

// Keep legacy root bookmarks pointed at the single Wiki home.
await writeFile(new URL("../public/index.html", import.meta.url), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>ProfWiki</title>
<meta http-equiv="refresh" content="0;url=./wiki/">
<link rel="canonical" href="https://ivanwuzy.github.io/ProfWiki/wiki/">
</head><body><a href="./wiki/">进入 Wiki 首页</a></body></html>
`)
