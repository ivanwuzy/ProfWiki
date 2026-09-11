# ProfWiki

前沿科技人才知识库：连接高校、院系与实验室、人物、奖项和创业公司。

**在线阅读：[ProfWiki](https://ivanwuzy.github.io/ProfWiki/)** · [知识库索引](wiki/index.md)

## 编辑与发布

继续在 Obsidian 中编辑 `wiki/` 与 `raw/`。提交并推送至 `main` 后，GitHub Actions 自动使用 Quartz 构建并部署到 GitHub Pages。可以在仓库的 Actions 页面查看结果或手动运行发布。

网站只从 Git 已跟踪的 `wiki/`、`raw/`、`references/` 生成，保留目录层级和相对证据链接；不展示操作日志 `wiki/log.md`。网站首页在 `site/home.md`，保留组织目录、专题入口和知识图谱。本地会话、编辑器配置、`非同步文件/`、输出工作簿与模板不进入网站。GitHub 仓库本身仍包含已经提交的输出文件和模板。

网页副本自动补充标题、读取 `last_verified` 作为核验时间，并移除与页面标题重复的一级标题；原始 Markdown 不改写。组织页和观察池的 `## 待补证人才与组织线索` 小节仅保留本地，不进入网页副本。该规则只隐藏指定研究队列，不代表全库内容已经完成展示质量审查。

原始网页摘录的相对链接按已记录的来源 URL 还原；无法定位的本地链接显示“资料未发布”，构建日志会列出位置，避免生成无效的站内链接。网页渲染不替代事实核验。

## 本地预览

需要 Node.js 22+ 和 npm 10.9.2+：

```bash
cd site
npm ci
npm run serve
```

打开 `http://localhost:8080`。新增知识文件需要先 `git add`，再重新运行预览或构建命令。`npm run build` 生成静态文件到 `site/public/`；此目录无需提交。

构建引擎固定为 Quartz v4.5.2，详见 [来源与许可证说明](site/UPSTREAM.md)。知识库规则见 [AGENTS.md](AGENTS.md)。
