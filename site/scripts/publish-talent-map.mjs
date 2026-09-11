import { mkdir, copyFile, writeFile } from "node:fs/promises"
const source = new URL("../../talent-map/", import.meta.url)
const target = new URL("../public/talent-map/", import.meta.url)
await mkdir(target, { recursive: true })
// Explicit allowlist: publish only the standalone map, never source evidence or outputs.
for (const file of ["index.html", "style.css", "app.js"]) {
  await copyFile(new URL(file, source), new URL(file, target))
}
console.log("Published standalone talent map to public/talent-map/")

const hongKongSource = new URL("../../hong-kong-talent-map/", import.meta.url)
const hongKongTarget = new URL("../public/hong-kong-talent-map/", import.meta.url)
await mkdir(hongKongTarget, { recursive: true })
for (const file of ["index.html", "style.css", "app.js", "data.js"]) {
  await copyFile(new URL(file, hongKongSource), new URL(file, hongKongTarget))
}
console.log("Published Hong Kong talent map to public/hong-kong-talent-map/")

// Keep legacy root bookmarks pointed at the single Wiki home.
await writeFile(new URL("../public/index.html", import.meta.url), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>ProfWiki</title>
<meta http-equiv="refresh" content="0;url=./wiki/">
<link rel="canonical" href="https://ivanwuzy.github.io/ProfWiki/wiki/">
</head><body><a href="./wiki/">进入 Wiki 首页</a></body></html>
`)

// Preserve bookmarks for maps that were renamed or merged into an organization.
const mapRedirects = [
  ["已创业地图", "./高校关联公司与产业关系", "高校关联公司与产业关系"],
  ["清华大学交叉信息研究院高潜观察池", "./清华大学交叉信息研究院研究与创业网络", "清华大学交叉信息研究院研究与创业网络"],
  ["清华大学智能产业研究院AIR高潜观察池", "../orgs/清华大学智能产业研究院AIR", "清华大学智能产业研究院"],
]
await mkdir(new URL("../public/wiki/maps/", import.meta.url), { recursive: true })
for (const [oldName, destination, title] of mapRedirects) {
  const canonical = new URL(destination, "https://ivanwuzy.github.io/ProfWiki/wiki/maps/").href
  await writeFile(new URL(`../public/wiki/maps/${oldName}.html`, import.meta.url), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>${title}</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${destination}">
<link rel="canonical" href="${canonical}">
</head><body><a href="${destination}">${title}</a></body></html>
`)
}

// The former collection index is now part of the actual college page.
// Keep its public bookmark without adding a synthetic organization to the graph.
await mkdir(new URL("../public/wiki/orgs/", import.meta.url), { recursive: true })
await writeFile(new URL("../public/wiki/orgs/清华大学人工智能学院课题组总入口.html", import.meta.url), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><title>清华大学人工智能学院</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=./清华大学人工智能学院CollegeAI">
<link rel="canonical" href="https://ivanwuzy.github.io/ProfWiki/wiki/orgs/清华大学人工智能学院CollegeAI">
</head><body><a href="./清华大学人工智能学院CollegeAI">课题组入口已合并至清华大学人工智能学院</a></body></html>
`)
