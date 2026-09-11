import {
  QuartzComponent,
  QuartzComponentConstructor,
} from "../quartz/components/types";

const documentUrl =
  "https://agirobot.feishu.cn/wiki/Cfipwh9bviYLFOkg4kLcIXB6nyf?from=from_copylink";
const documentHint = "跳转到飞书文档，需要智元飞书账号登录";
const actions = [
  { label: "使用说明", href: documentUrl, hint: documentHint },
  { label: "申请本地版本", href: documentUrl, hint: documentHint },
  {
    label: "提交新情报",
    href: "https://agirobot.feishu.cn/share/base/form/shrcnbyYD14DBuxOsezlzUVIRPg?from=navigation",
    hint: "跳转到飞书问卷",
  },
];

const HomeActions: QuartzComponent = () => (
  <nav class="home-actions" aria-label="Wiki 服务入口">
    {actions.map(({ label, href, hint }) => (
      <a
        key={label}
        href={href}
        title={hint}
        aria-label={`${label}：${hint}`}
        target="_blank"
        rel="noopener noreferrer"
        data-router-ignore
      >
        {label}
      </a>
    ))}
  </nav>
);

HomeActions.css = `
.home-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;width:100%;flex-shrink:0}
.home-actions a{display:flex;align-items:center;justify-content:center;box-sizing:border-box;min-height:40px;padding:8px 3px;border:1px solid var(--lightgray);border-radius:8px;background:var(--highlight);color:var(--secondary);font-size:.75rem;line-height:1.4;text-align:center;white-space:nowrap;text-decoration:none}
.home-actions a:hover{background:var(--lightgray);border-color:var(--secondary)}
.home-actions a:focus-visible{outline:2px solid var(--secondary);outline-offset:3px}
`;

export default (() => HomeActions) satisfies QuartzComponentConstructor;
