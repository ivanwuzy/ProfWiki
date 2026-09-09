# Quartz 来源

此目录基于 [Quartz v4.5.2](https://github.com/jackyzha0/quartz/tree/v4.5.2)，提交 `4923affa7722dfc751f1074348e6dad214fe0c08`。
上游代码及其 MIT 许可证保留在 `quartz/` 和 `LICENSE.txt`。该许可证仅适用于 Quartz；知识库和摘录资料的权利不因此改变。

ProfWiki 定制位于 `quartz.config.ts`、`quartz.layout.ts`、`quartz/styles/custom.scss`、`home.md`、`plugins/` 与 `scripts/`。

`quartz/plugins/transformers/latex.ts` 增加 `singleDollarTextMath` 选项，网站关闭单美元符号数学解析，避免融资金额被误渲染；双美元符号公式仍可使用。依赖锁文件已更新，并将 `sharp` 与 `toml` 升级到修复安全公告的版本。
