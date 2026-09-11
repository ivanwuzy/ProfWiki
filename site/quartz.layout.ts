import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import TalentMapLink from "./components/TalentMapLink"
import HomeActions from "./components/HomeActions"
import type { Options as ExplorerOptions } from "./quartz/components/Explorer"

// Explorer serializes this function for the browser, so keep its data inside the function.
const explorerSort: ExplorerOptions["sortFn"] = (a, b) => {
  if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
  if (a.isFolder && b.isFolder) {
    const folderOrder: Record<string, number> = {
      "wiki/index": 0,
      "raw/index": 1,
      "references/index": 2,
      "wiki/universities/index": 0,
      "wiki/orgs/index": 1,
      "wiki/companies/index": 2,
      "wiki/people/index": 3,
      "wiki/awards/index": 4,
      "wiki/maps/index": 5,
      "wiki/questions/index": 6,
    }
    const difference = (folderOrder[a.slug] ?? 100) - (folderOrder[b.slug] ?? 100)
    if (difference !== 0) return difference
  }
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

const localGraph = Component.Graph()
const globalGraphPreview = Component.Graph({ globalGraphPreview: true })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ivanwuzy/ProfWiki",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.WideMode() },
      ],
    }),
    Component.HomeButton(),
    Component.Explorer({
      sortFn: explorerSort,
      mapFn: (node) => {
        const labels: Record<string, string> = {
          wiki: "知识库",
          raw: "原始资料",
          references: "研究规范",
          universities: "高校",
          orgs: "院系与实验室",
          people: "人物",
          companies: "公司",
          awards: "奖项与竞赛",
          maps: "地图与观察池",
          questions: "待验证问题",
          sources: "来源摘录",
          assets: "图片资料",
          datasets: "数据集",
        }
        if (node.isFolder) node.displayName = labels[node.slugSegment] ?? node.displayName
      },
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: HomeActions(),
      condition: (page) => page.fileData.slug === "index" || page.fileData.slug === "wiki/index",
    }),
    Component.ConditionalRender({
      component: globalGraphPreview,
      condition: (page) => page.fileData.slug === "index" || page.fileData.slug === "wiki/index",
    }),
    Component.ConditionalRender({
      component: localGraph,
      condition: (page) => page.fileData.slug !== "index" && page.fileData.slug !== "wiki/index",
    }),
    Component.ConditionalRender({
      component: TalentMapLink(),
      condition: (page) => page.fileData.slug === "index" || page.fileData.slug === "wiki/index",
    }),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.WideMode() },
      ],
    }),
    Component.HomeButton(),
    Component.Explorer({
      sortFn: explorerSort,
      mapFn: (node) => {
        const labels: Record<string, string> = {
          wiki: "知识库",
          raw: "原始资料",
          references: "研究规范",
          universities: "高校",
          orgs: "院系与实验室",
          people: "人物",
          companies: "公司",
          awards: "奖项与竞赛",
          maps: "地图与观察池",
          questions: "待验证问题",
          sources: "来源摘录",
          assets: "图片资料",
          datasets: "数据集",
        }
        if (node.isFolder) node.displayName = labels[node.slugSegment] ?? node.displayName
      },
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: HomeActions(),
      condition: (page) => page.fileData.slug === "wiki/index",
    }),
    globalGraphPreview,
    Component.ConditionalRender({
      component: TalentMapLink(),
      condition: (page) => page.fileData.slug === "wiki/index",
    }),
  ],
}
