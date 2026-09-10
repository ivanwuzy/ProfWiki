import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
  focusOnHover?: boolean
  enableRadial?: boolean
  enableNavigation?: boolean
  labelOpacity?: number
  linkOpacity?: number
  linkThickness?: number
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
  globalGraphPreview: boolean
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    scale: 1.1,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.45,
    opacityScale: 2.7,
    showTags: false,
    removeTags: [],
    focusOnHover: false,
    enableRadial: false,
    enableNavigation: true,
    labelOpacity: 0.65,
    linkOpacity: 1,
    linkThickness: 1.1,
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.2,
    linkDistance: 30,
    fontSize: 0.45,
    opacityScale: 2.7,
    showTags: false,
    removeTags: [],
    focusOnHover: true,
    enableRadial: true,
    enableNavigation: true,
    labelOpacity: 0.65,
    linkOpacity: 1,
    linkThickness: 1.1,
  },
  globalGraphPreview: false,
}

export default ((opts?: Partial<GraphOptions>) => {
  const Graph: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    const globalGraphPreview = opts?.globalGraphPreview ?? defaultOptions.globalGraphPreview
    const previewGraph = globalGraphPreview
      ? { ...globalGraph, drag: false, zoom: false, enableNavigation: false }
      : { ...localGraph, enableNavigation: false }
    return (
      <div class={classNames(displayClass, "graph")}>
        <h3>{i18n(cfg.locale).components.graph.title}</h3>
        <div
          class={[
            "graph-outer",
            "global-graph-entry",
            globalGraphPreview ? "global-graph-preview" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          role="button"
          tabIndex={0}
          aria-label="打开全局知识图谱"
        >
          <div class="graph-container" data-cfg={JSON.stringify(previewGraph)}></div>
          <span class="global-graph-icon" aria-hidden="true">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 55 55"
              fill="currentColor"
              xmlSpace="preserve"
            >
              <path
                d="M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17
                s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4
                c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562
                C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829
                c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91
                v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4
                s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665
                C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2
                S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4
                s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2
                s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z"
              />
            </svg>
          </span>
        </div>
        <div class="global-graph-outer" role="dialog" aria-modal="true" aria-label="关系图谱">
          <button
            class="global-graph-close"
            type="button"
            aria-label="关闭知识图谱"
            title="关闭知识图谱"
          >
            X
          </button>
          <section class="global-graph-controls" aria-label="图谱显示设置">
            <div class="global-graph-controls-header">
              <h3>图谱视觉</h3>
              <div class="global-graph-controls-actions">
                <button
                  class="global-graph-reset"
                  type="button"
                  aria-label="恢复默认图谱视觉设置"
                  title="恢复默认"
                >
                  ↺
                </button>
                <button
                  class="global-graph-controls-collapse"
                  type="button"
                  aria-label="收起图谱视觉面板"
                  title="收起"
                >
                  −
                </button>
              </div>
            </div>
            <button
              class="global-graph-touch-toggle"
              type="button"
              data-graph-touch-select-mode
              aria-pressed="true"
              title="开启后，点击节点先选中，再次点击同一节点打开页面"
            >
              首次点击选中，再次点击打开
            </button>
            <label class="global-graph-search">
              <span>搜索节点</span>
              <input
                type="search"
                data-graph-node-search
                aria-label="搜索节点名称"
                autocomplete="off"
                placeholder="输入节点名称"
              />
            </label>
            <label>
              <span>文字字体大小</span>
              <input type="range" data-graph-control="fontSize" min="0.35" max="1.4" step="0.05" />
            </label>
            <label>
              <span>文字透明度</span>
              <input type="range" data-graph-control="labelOpacity" min="0.1" max="1" step="0.05" />
            </label>
            <label>
              <span>文字缩放可视度</span>
              <input type="range" data-graph-control="opacityScale" min="0.2" max="4" step="0.1" />
            </label>
            <label>
              <span>连线粗细</span>
              <input type="range" data-graph-control="linkThickness" min="0.3" max="4" step="0.1" />
            </label>
            <label>
              <span>连线透明度</span>
              <input type="range" data-graph-control="linkOpacity" min="0.05" max="1" step="0.05" />
            </label>
          </section>
          <button
            class="global-graph-controls-gear"
            type="button"
            aria-label="展开图谱视觉面板"
            title="图谱视觉"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.23.36.42.7.6 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.52 1Z" />
            </svg>
          </button>
          <div class="global-graph-container" data-cfg={JSON.stringify(globalGraph)}></div>
        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor
