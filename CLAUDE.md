# AGENTS.md

本知识库使用已安装的 Agent Skill `karpathy-llm-wiki` 作为主工作流规范。本文件只放每次都需要载入的本地规则；细节按需阅读 `references/` 和 `templates/`。

## 项目目标

本库用于追踪重点高校的前沿科技人才、奖项/竞赛、院系/实验室、创业信号和公司之间的关系。重点领域包括 AI、具身智能/机器人、脑机接口、核聚变/先进能源，以及明显受益于 AI 的交叉学科。

覆盖范围不限于清华大学：清华是首批完整覆盖的高校，香港科技大学等其他重点高校会逐步纳入。每所高校在 `wiki/universities/` 有一个总览入口页，其院系、实验室、奖项仍分别放在 `wiki/orgs/` 和 `wiki/awards/`。

## 本地结构

- `raw/`：不可变原始资料，只新增，不改写原意。
- `wiki/`：编译后的知识文章，使用一层主题目录：`wiki/<topic>/<article>.md`。
- `wiki/index.md`：全局索引。
- `wiki/log.md`：追加式操作日志。
- `templates/`：本库页面模板，不属于 wiki 文章。
- `references/`：按需查询的本地细则，不要每次全量载入。

当前 wiki 主题目录：

- `wiki/universities/`：高校总览入口页，每所重点高校一页。
- `wiki/maps/`：观察池、已创业地图、奖项入口、方向地图。
- `wiki/people/`：教授、学生、校友、创业者、产业研究员。
- `wiki/orgs/`：院系、研究院、实验室、课题组。
- `wiki/awards/`：奖项和竞赛，保留独立页。
- `wiki/companies/`：高校关联公司和创业项目。
- `wiki/questions/`：冲突、不确定性和待验证问题。

## 每次都要遵守

- 主要用中文写作；英文官方名称、英文简称、论文/项目术语保留原文。
- 使用标准 Markdown 相对链接，不把 Obsidian `[[wikilink]]` 作为主链接格式。
- 只给稳定实体建页；新闻、论文、专利、融资事件、任职事件默认不建独立页。
- 奖项/竞赛页保留独立页面，用于承接长期覆盖和 T2/T3 长尾人才线索。
- 关键判断必须能追溯证据；不确定信息写成待验证，不写成结论。
- `wiki/universities/` 下的高校页只链接该校 `wiki/orgs/` 中 `tier: 1` 的院系/研究院和 `wiki/awards/` 的关键奖项，不直接链接 `tier: 2` 及更深的实验室/课题组，也不链接人物、公司等其他实体；`tier: 2` 及更深层级由对应 `tier: 1` 组织页自己的"下属实验室/课题组"小节承接。
- 新增其他高校的组织、奖项、人物页时，在 YAML `tags` 中带上学校标识（如 `tsinghua`、`hkust`），便于按校筛选。
- 禁止记录私人手机号、私人邮箱、住址、身份证、家庭成员、非公开群聊、朋友圈、内部通讯录、未授权简历全文等敏感或非公开信息。


## 何时读取按需文件

- 创建或升级人物/组织/公司/奖项页面：读 `references/entity-and-page-rules.md`，再套用对应 `templates/tmpl-*.md`。
- 新增或维护高校总览页：套用 `templates/tmpl-university.md`，只回填 orgs/awards 链接。
- 维护奖项、竞赛、观察池覆盖度：读 `references/award-competition-workflow.md`。
- 判断来源等级、置信度、隐私边界：读 `references/source-and-privacy-policy.md`。
- 命名文件、写相对链接、更新索引和日志：读 `references/naming-links-and-index.md`。
- 选择首批入口或方向覆盖范围：读 `references/priority-entry-list.md`。
- 需要完整项目规划背景时：读 `tsinghua_frontier_talent_wiki_plan.md`。

## 工作流

- Ingest：按 `karpathy-llm-wiki`，先保存到 `raw/`，再编译或合并到 `wiki/`，随后更新 `wiki/index.md` 和 `wiki/log.md`。
- Query：先读 `wiki/index.md` 定位文章，再读相关页面回答；普通查询不写文件。
- Archive：只有用户明确要求保存回答时，才归档为新的 wiki 页面，并更新索引和日志。
- Lint：可自动修复确定性问题；事实矛盾、陈旧结论、孤立页面等启发式问题只报告，除非用户要求修改。

