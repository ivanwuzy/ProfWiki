import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import TalentMapLink from "./components/TalentMapLink"

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
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        const labels: Record<string, string> = {
          wiki: "知识库", raw: "原始资料", references: "研究规范",
          universities: "高校", orgs: "院系与实验室", people: "人物",
          companies: "公司", awards: "奖项与竞赛", maps: "地图与观察池",
          questions: "待验证问题", sources: "来源摘录", assets: "图片资料",
          datasets: "数据集",
        }
        if (node.isFolder) node.displayName = labels[node.slugSegment] ?? node.displayName
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.ConditionalRender({
      component: TalentMapLink(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.DesktopOnly(Component.TableOfContents()),
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
      ],
    }),
    Component.Explorer({
      mapFn: (node) => {
        const labels: Record<string, string> = {
          wiki: "知识库", raw: "原始资料", references: "研究规范",
          universities: "高校", orgs: "院系与实验室", people: "人物",
          companies: "公司", awards: "奖项与竞赛", maps: "地图与观察池",
          questions: "待验证问题", sources: "来源摘录", assets: "图片资料",
          datasets: "数据集",
        }
        if (node.isFolder) node.displayName = labels[node.slugSegment] ?? node.displayName
      },
    }),
  ],
  right: [],
}
