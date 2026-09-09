# 命名、链接、索引与日志规则

本文件按需读取：当你创建文件、写链接、更新 `wiki/index.md` 或 `wiki/log.md` 时使用。

## 目录规则

- `raw/` 保存不可变原始资料。
- `wiki/` 保存编译后的知识文章。
- `wiki/` 只使用一层主题目录：`wiki/<topic>/<article>.md`。
- 不要创建 `wiki/<topic>/<subtopic>/<article>.md`。
- `templates/` 和 `references/` 不属于 wiki 文章，不写入 `wiki/index.md`。

## 文件命名

- 文件名使用短横线或清晰中文名，避免空格。
- 高校：`清华大学.md`、`香港科技大学.md`，使用官方中文校名。
- 人物：`张三_清华自动化系.md`；同名时追加角色或方向。
- 组织：`清华大学自动化系.md`、`清华大学智能产业研究院AIR.md`。
- 奖项/竞赛：`清华大学特等奖学金.md`、`清华大学挑战杯.md`。
- 公司：使用常用简称，如 `星环聚能.md`；工商全称写在正文或 YAML。

## 链接规则

- wiki 文章内使用标准 Markdown 相对链接。
- 同目录链接：`[张三](张三_清华自动化系.md)`。
- 跨目录链接：`[某公司](../companies/某公司.md)`。
- Raw 证据链接从 `wiki/<topic>/` 指向 `raw/` 时使用两级返回：`../../raw/sources/<file>.md`。
- 不把 Obsidian `[[wikilink]]` 作为主链接格式。
- 只有真实关系才链接；单纯对比、背景参照、推荐阅读默认不链接。
- `wiki/universities/` 下的高校页是组织层入口：`../orgs/*.md` 链接只写给 `tier: 1` 的院系/研究院，`tier: 2` 及更深的实验室/课题组不在高校页直接出现，改由对应 `tier: 1` 组织页自己的"下属实验室/课题组"小节链接；高校页另写 `../awards/*.md` 链接；不链接人物、公司、地图、问题页。
- 组织页（`wiki/orgs/`）之间的同目录链接（如某 `tier: 1` 院系链接自己的 `tier: 2` 实验室）沿用第 25 行的同目录写法：`[实验室名](实验室文件名.md)`。

## Karpathy 证据块

编译后的 wiki 页面在标题后保留：

```markdown
> Sources: 清华大学新闻网, 2026-06-11
> Raw: [来源标题](../../raw/sources/2026-06-11-source-title.md)
```

没有 raw 文件时，先使用正文“证据”表记录链接；正式 ingest 时应补齐 raw。

## 索引规则

每次新增或实质更新 wiki 文章，都更新 `wiki/index.md`：

```markdown
## people

清华前沿科技人才、创业者、教授、学生和产业研究员。

| Article | Summary | Updated |
|---------|---------|---------|
| [张三](people/张三_清华自动化系.md) | 一句话摘要。 | 2026-06-11 |
```

`Updated` 是知识内容更新日期，不是文件系统时间。

## 日志规则

每次 ingest/archive/lint 后追加 `wiki/log.md`：

```markdown
## [2026-06-11] ingest | <primary article title>
- Updated: <cascade-updated article title>
```

普通查询不写日志。

