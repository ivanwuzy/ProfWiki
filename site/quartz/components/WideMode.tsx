// @ts-ignore
import wideModeScript from "./scripts/widemode.inline"
import styles from "./styles/widemode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const WideMode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  const title = cfg.locale?.startsWith("zh") ? "宽屏模式" : "Wide mode"
  const label = cfg.locale?.startsWith("zh") ? "宽屏" : "Wide"

  return (
    <button
      class={classNames(displayClass, "widemode")}
      aria-label={title}
      aria-pressed="false"
      title={title}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M9 12H3" />
        <path d="M6 9l-3 3 3 3" />
        <path d="M15 12h6" />
        <path d="M18 9l3 3-3 3" />
      </svg>
      <span>{label}</span>
    </button>
  )
}

WideMode.beforeDOMLoaded = wideModeScript
WideMode.css = styles

export default (() => WideMode) satisfies QuartzComponentConstructor
