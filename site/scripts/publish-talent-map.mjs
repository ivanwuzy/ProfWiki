import { mkdir, copyFile } from "node:fs/promises"
const source = new URL("../../talent-map/", import.meta.url)
const target = new URL("../public/talent-map/", import.meta.url)
await mkdir(target, { recursive: true })
// Explicit allowlist: publish only the standalone map, never source evidence or outputs.
for (const file of ["index.html", "style.css", "app.js"]) {
  await copyFile(new URL(file, source), new URL(file, target))
}
console.log("Published standalone talent map to public/talent-map/")
