# 清华大学具身人才地图（HTML）

以 `outputs/清华人才地图-研究主线与身份版-20260910/清华人才地图_研究主线与身份优化版_20260910.pptx` 同批生成的矢量图和最终布局数据转换。保留原版布局及内容，不自动同步后续知识库事实更新。

- `index.html`：内嵌原版SVG及搜索坐标，无外部数据请求。
- `style.css`、`app.js`：响应式界面、搜索、院系定位、缩放拖动和节点详情。
- 本地可直接打开 `index.html`；将以上三个文件放在同一目录。
- 161位主体人物、10位背景人物、45个实验室标签、98个公司关联气泡（公司可重复出现在不同核心人物附近）。
- 历史参与、待核和实验室中文释义标记沿用指定版本，不将“未公开创业”解释为确定没有创业。

Quartz `npm run build` 最后通过 `site/scripts/publish-talent-map.mjs` 白名单复制三个文件至 `site/public/talent-map/`，与GitHub Pages统一发布。首页右侧由 `site/components/TalentMapLink.tsx` 提供入口。在线地址：<https://ivanwuzy.github.io/ProfWiki/talent-map/>。
