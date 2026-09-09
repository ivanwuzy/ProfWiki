import { existsSync } from "node:fs"
import path from "node:path"
import { Root } from "hast"
import { visit } from "unist-util-visit"
import { QuartzTransformerPlugin } from "../quartz/plugins/types"

// Source excerpts retain their original relative URLs. Resolve them against the
// recorded source, while keeping real vault links relative to the published site.
export const PublishLinks: QuartzTransformerPlugin = () => ({
  name: "PublishLinks",
  htmlPlugins(ctx) {
    return [() => (tree: Root, file) => {
      const relativePath = file.data.relativePath ?? ""
      const base = path.dirname(file.data.filePath!)
      const content = path.resolve(ctx.argv.directory)
      const sourceUrl = file.data.frontmatter?.publishSourceUrl
      visit(tree, "element", (node) => {
        const key = node.tagName === "a" ? "href" : node.tagName === "img" ? "src" : null
        if (!key) return
        const url = node.properties[key]
        if (typeof url !== "string" || !url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return
        const pathname = decodeURIComponent(url.split(/[?#]/)[0])
        const target = path.resolve(base, pathname)
        if (target.startsWith(content + path.sep) && existsSync(target)) return

        // Some archived excerpts moved one level deeper after their links were
        // written. An explicit vault-root folder gives an unambiguous correction.
        const rootRelative = pathname.replace(/^(?:\.\.\/)+/, "")
        const rootTarget = path.resolve(content, rootRelative)
        if (/^(?:wiki|raw|references)\//.test(rootRelative) && rootTarget.startsWith(content + path.sep) && existsSync(rootTarget)) {
          node.properties[key] = path.relative(base, rootTarget).split(path.sep).join("/") + (url.match(/[?#].*$/)?.[0] ?? "")
          return
        }

        if (relativePath.startsWith("raw/") && typeof sourceUrl === "string") {
          node.properties[key] = new URL(url, sourceUrl).href
          return
        }

        // A local-only/missing source must not become a broken public hyperlink.
        console.warn(`[PublishLinks] Unpublished target in ${relativePath}: ${url}`)
        node.tagName = "span"
        node.children = key === "src"
          ? [{ type: "text", value: `${node.properties.alt || "图片"}（资料未发布）` }]
          : [...node.children, { type: "text", value: "（资料未发布）" }]
        node.properties = { className: ["unpublished-reference"], title: `原始链接：${url}` }
      })
    }]
  },
})
