import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import {
  SimulationNodeDatum,
  SimulationLinkDatum,
  Simulation,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceLink,
  forceCollide,
  forceRadial,
  zoomIdentity,
  select,
  drag,
  zoom,
} from "d3"
import { Text, Graphics, Application, Container, Circle } from "pixi.js"
import { Group as TweenGroup, Tween as Tweened } from "@tweenjs/tween.js"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { D3Config } from "../Graph"

type GraphicsInfo = {
  color: string
  gfx: Graphics
  alpha: number
  active: boolean
}

type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
  __initialDragPos?: {
    x: number
    y: number
    fx: number | null | undefined
    fy: number | null | undefined
  }
} & SimulationNodeDatum

type SimpleLinkData = {
  source: SimpleSlug
  target: SimpleSlug
}

type LinkData = {
  source: NodeData
  target: NodeData
} & SimulationLinkDatum<NodeData>

type LinkRenderData = GraphicsInfo & {
  simulationData: LinkData
}

type NodeRenderData = GraphicsInfo & {
  simulationData: NodeData
  label: Text
}

const localStorageKey = "graph-visited"
const graphVisualSettingsKey = "graph-visual-settings"
const graphVisualControlsCollapsedKey = "graph-visual-controls-collapsed"
const graphTouchSelectModeKey = "graph-touch-select-mode"
let graphNodeSearchQuery = ""
// Keep every published node; colors reflect this vault's topic directories.
const graphNodeColors: Record<string, string> = {
  companies: "#64748b",
  people: "#3b82f6",
  universities: "#ef4444",
  orgs: "#f97316",
  awards: "#a855f7",
  maps: "#22c55e",
  questions: "#eab308",
}

function graphNodeColor(id: SimpleSlug) {
  return graphNodeColors[id.startsWith("wiki/") ? id.split("/")[1] : ""] ?? "#9ca3af"
}

function getVisited(): Set<SimpleSlug> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"))
}

function addToVisited(slug: SimpleSlug) {
  const visited = getVisited()
  visited.add(slug)
  localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
}

type TweenNode = {
  update: (time: number) => void
  stop: () => void
}

type GraphVisualSettings = {
  fontSize: number
  labelOpacity: number
  opacityScale: number
  linkOpacity: number
  linkThickness: number
}

const defaultGraphVisualSettings: GraphVisualSettings = {
  fontSize: 0.45,
  labelOpacity: 0.65,
  opacityScale: 2.7,
  linkOpacity: 1,
  linkThickness: 1.1,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function readGraphVisualSettings(): GraphVisualSettings {
  const parsed = JSON.parse(
    localStorage.getItem(graphVisualSettingsKey) ?? "{}",
  ) as Partial<GraphVisualSettings>

  return {
    fontSize: clamp(parsed.fontSize ?? defaultGraphVisualSettings.fontSize, 0.35, 1.4),
    labelOpacity: clamp(parsed.labelOpacity ?? defaultGraphVisualSettings.labelOpacity, 0.1, 1),
    opacityScale: clamp(parsed.opacityScale ?? defaultGraphVisualSettings.opacityScale, 0.2, 4),
    linkOpacity: clamp(parsed.linkOpacity ?? defaultGraphVisualSettings.linkOpacity, 0.05, 1),
    linkThickness: clamp(parsed.linkThickness ?? defaultGraphVisualSettings.linkThickness, 0.3, 4),
  }
}

function writeGraphVisualSettings(settings: GraphVisualSettings) {
  localStorage.setItem(graphVisualSettingsKey, JSON.stringify(settings))
}

function emitGraphVisualSettings(settings: GraphVisualSettings) {
  document.dispatchEvent(new CustomEvent("graphvisualsettingschange", { detail: settings }))
}

function readGraphTouchSelectMode(): boolean {
  const saved = localStorage.getItem(graphTouchSelectModeKey)
  return saved === null ? true : saved === "true"
}

function writeGraphTouchSelectMode(enabled: boolean) {
  localStorage.setItem(graphTouchSelectModeKey, String(enabled))
}

function emitGraphTouchSelectMode(enabled: boolean) {
  document.dispatchEvent(new CustomEvent("graphtouchselectmodechange", { detail: enabled }))
}

function emitGraphNodeSearch(query: string) {
  document.dispatchEvent(new CustomEvent("graphnodesearchchange", { detail: query }))
}

function normalizeGraphSearch(value: string) {
  return value.trim().toLocaleLowerCase()
}

async function renderGraph(graph: HTMLElement, fullSlug: FullSlug) {
  const slug = simplifySlug(fullSlug)
  removeAllChildren(graph)

  let {
    drag: enableDrag,
    zoom: enableZoom,
    depth,
    scale,
    repelForce,
    centerForce,
    linkDistance,
    fontSize,
    opacityScale,
    removeTags,
    showTags,
    focusOnHover,
    enableRadial,
    enableNavigation = true,
    labelOpacity = 1,
    linkOpacity = 1,
    linkThickness = 1,
  } = JSON.parse(graph.dataset["cfg"]!) as D3Config
  const savedVisualSettings = readGraphVisualSettings()
  fontSize = savedVisualSettings.fontSize
  labelOpacity = savedVisualSettings.labelOpacity
  opacityScale = savedVisualSettings.opacityScale
  linkOpacity = savedVisualSettings.linkOpacity
  linkThickness = savedVisualSettings.linkThickness

  const data: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )
  const links: SimpleLinkData[] = []
  const tags: SimpleSlug[] = []
  const validLinks = new Set(data.keys())

  const tweens = new Map<string, TweenNode>()
  for (const [source, details] of data.entries()) {
    const outgoing = details.links ?? []

    for (const dest of outgoing) {
      if (validLinks.has(dest)) {
        links.push({ source: source, target: dest })
      }
    }

    if (showTags) {
      const localTags = details.tags
        .filter((tag) => !removeTags.includes(tag))
        .map((tag) => simplifySlug(("tags/" + tag) as FullSlug))

      tags.push(...localTags.filter((tag) => !tags.includes(tag)))

      for (const tag of localTags) {
        links.push({ source: source, target: tag })
      }
    }
  }

  const neighbourhood = new Set<SimpleSlug>()
  const wl: (SimpleSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
  if (depth >= 0) {
    while (depth >= 0 && wl.length > 0) {
      // compute neighbours
      const cur = wl.shift()!
      if (cur === "__SENTINEL") {
        depth--
        wl.push("__SENTINEL")
      } else {
        neighbourhood.add(cur)
        const outgoing = links.filter((l) => l.source === cur)
        const incoming = links.filter((l) => l.target === cur)
        wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source))
      }
    }
  } else {
    validLinks.forEach((id) => {
      neighbourhood.add(id)
    })
    if (showTags) {
      tags.forEach((tag) => {
        neighbourhood.add(tag)
      })
    }
  }

  const nodes = [...neighbourhood].map((url) => {
    const text = url.startsWith("tags/") ? "#" + url.substring(5) : (data.get(url)?.title ?? url)
    return {
      id: url,
      text,
      tags: data.get(url)?.tags ?? [],
    }
  })
  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes,
    links: links
      .filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target))
      .map((l) => ({
        source: nodes.find((n) => n.id === l.source)!,
        target: nodes.find((n) => n.id === l.target)!,
      })),
  }

  let width = graph.offsetWidth
  let height = Math.max(graph.offsetHeight, 250)

  // we virtualize the simulation and use pixi to actually render it
  const simulation: Simulation<NodeData, LinkData> = forceSimulation<NodeData>(graphData.nodes)
    .force("charge", forceManyBody().strength(-100 * repelForce))
    .force("center", forceCenter().strength(centerForce))
    .force("link", forceLink(graphData.links).distance(linkDistance))
    .force("collide", forceCollide<NodeData>((n) => nodeRadius(n)).iterations(3))

  const radius = (Math.min(width, height) / 2) * 0.8
  if (enableRadial) simulation.force("radial", forceRadial(radius).strength(0.2))

  // precompute style prop strings as pixi doesn't support css variables
  const cssVars = [
    "--secondary",
    "--tertiary",
    "--gray",
    "--light",
    "--lightgray",
    "--dark",
    "--darkgray",
    "--bodyFont",
  ] as const
  const computedStyleMap = cssVars.reduce(
    (acc, key) => {
      acc[key] = getComputedStyle(document.documentElement).getPropertyValue(key)
      return acc
    },
    {} as Record<(typeof cssVars)[number], string>,
  )

  // calculate color
  const color = (d: NodeData) => {
    return graphNodeColor(d.id)
  }

  function nodeRadius(d: NodeData) {
    const numLinks = graphData.links.filter(
      (l) => l.source.id === d.id || l.target.id === d.id,
    ).length
    return 2 + Math.sqrt(numLinks)
  }

  let hoveredNodeId: string | null = null
  let pinnedNodeId: string | null = null
  let hoveredNeighbours: Set<string> = new Set()
  let searchQuery = normalizeGraphSearch(graphNodeSearchQuery)
  let searchHighlightPaused = false
  let searchMatchedNodeIds: Set<SimpleSlug> = new Set()
  const linkRenderData: LinkRenderData[] = []
  const nodeRenderData: NodeRenderData[] = []
  function updateHoverInfo(newHoveredId: string | null) {
    hoveredNodeId = newHoveredId

    if (newHoveredId === null) {
      hoveredNeighbours = new Set()
      for (const n of nodeRenderData) {
        n.active = false
      }

      for (const l of linkRenderData) {
        l.active = false
      }
    } else {
      hoveredNeighbours = new Set()
      for (const l of linkRenderData) {
        const linkData = l.simulationData
        if (linkData.source.id === newHoveredId || linkData.target.id === newHoveredId) {
          hoveredNeighbours.add(linkData.source.id)
          hoveredNeighbours.add(linkData.target.id)
        }

        l.active = linkData.source.id === newHoveredId || linkData.target.id === newHoveredId
      }

      for (const n of nodeRenderData) {
        n.active = hoveredNeighbours.has(n.simulationData.id)
      }
    }
  }

  let dragStartTime = 0
  let dragStartPointer = { x: 0, y: 0 }
  let maxDragDistance = 0
  let dragging = false
  let currentTransform = zoomIdentity
  const clickDragTolerance = 5

  function zoomLabelOpacity() {
    const scaleOpacity = Math.max((currentTransform.k * opacityScale - 1) / 3.75, 0)
    return clamp(scaleOpacity * labelOpacity, 0, labelOpacity)
  }

  function renderLinks() {
    tweens.get("link")?.stop()
    const tweenGroup = new TweenGroup()

    for (const l of linkRenderData) {
      let alpha = 1

      if (isSearchHighlightActive()) {
        alpha = 0.12
      }
      // if we are hovering over a node, we want to highlight the immediate neighbours
      // with full alpha and the rest with default alpha
      else if (hoveredNodeId) {
        alpha = l.active ? 1 : 0.2
      }

      l.color =
        !isSearchHighlightActive() && l.active
          ? computedStyleMap["--gray"]
          : computedStyleMap["--lightgray"]
      tweenGroup.add(new Tweened<LinkRenderData>(l).to({ alpha }, 200))
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("link", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderLabels() {
    tweens.get("label")?.stop()
    const tweenGroup = new TweenGroup()

    const defaultScale = 1 / scale
    const activeScale = defaultScale * 1.1
    for (const n of nodeRenderData) {
      const prominent = isProminentLabel(n)
      n.label.style.fontWeight = prominent ? "700" : "400"

      if (prominent) {
        tweenGroup.add(
          new Tweened<Text>(n.label).to(
            {
              alpha: labelOpacity,
              scale: { x: activeScale, y: activeScale },
            },
            100,
          ),
        )
      } else {
        tweenGroup.add(
          new Tweened<Text>(n.label).to(
            {
              alpha: Math.min(n.label.alpha, labelOpacity),
              scale: { x: defaultScale, y: defaultScale },
            },
            100,
          ),
        )
      }
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("label", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderNodes() {
    tweens.get("hover")?.stop()

    const tweenGroup = new TweenGroup()
    for (const n of nodeRenderData) {
      let alpha = 1

      if (isSearchHighlightActive()) {
        alpha = searchMatchedNodeIds.has(n.simulationData.id) ? 1 : 0.16
      }
      // if we are hovering over a node, we want to highlight the immediate neighbours
      else if (hoveredNodeId !== null && focusOnHover) {
        alpha = n.active ? 1 : 0.2
      }

      tweenGroup.add(new Tweened<Graphics>(n.gfx, tweenGroup).to({ alpha }, 200))
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("hover", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderPixiFromD3() {
    renderNodes()
    renderLinks()
    renderLabels()
  }

  function isProminentLabel(node: NodeRenderData) {
    if (isSearchHighlightActive()) {
      return searchMatchedNodeIds.has(node.simulationData.id)
    }

    return hoveredNodeId === node.simulationData.id || node.active
  }

  function isSearchHighlightActive() {
    return searchQuery !== "" && !searchHighlightPaused
  }

  function updateSearchInfo(query: string, shouldRender = true) {
    searchQuery = normalizeGraphSearch(query)
    searchHighlightPaused = false
    searchMatchedNodeIds = new Set()

    if (searchQuery) {
      for (const node of graphData.nodes) {
        const searchableText = `${node.text} ${node.id}`.toLocaleLowerCase()
        if (searchableText.includes(searchQuery)) {
          searchMatchedNodeIds.add(node.id)
        }
      }
    }

    if (shouldRender) {
      renderPixiFromD3()
    }
  }

  function navigateToNode(nodeId: SimpleSlug) {
    const targ = resolveRelative(fullSlug, nodeId)
    window.spaNavigate(new URL(targ, window.location.toString()))
  }

  function handleNodePress(nodeId: SimpleSlug) {
    if (isSearchHighlightActive()) {
      searchHighlightPaused = true
      pinnedNodeId = nodeId
      updateHoverInfo(nodeId)
      if (!dragging) {
        renderPixiFromD3()
      }
      return
    }

    if (readGraphTouchSelectMode()) {
      if (pinnedNodeId !== nodeId) {
        pinnedNodeId = nodeId
        updateHoverInfo(nodeId)
        if (!dragging) {
          renderPixiFromD3()
        }
        return
      }
    }

    navigateToNode(nodeId)
  }

  function clearPinnedNode() {
    pinnedNodeId = null
    updateHoverInfo(null)
    const inactiveLabelOpacity = zoomLabelOpacity()
    for (const node of nodeRenderData) {
      node.label.alpha = inactiveLabelOpacity
    }
    renderPixiFromD3()
  }

  function restoreSearchHighlight() {
    searchHighlightPaused = false
    pinnedNodeId = null
    updateHoverInfo(null)
    renderPixiFromD3()
  }

  function nodeAtPointer(x: number, y: number): NodeData | undefined {
    const graphX = (x - currentTransform.x) / currentTransform.k - width / 2
    const graphY = (y - currentTransform.y) / currentTransform.k - height / 2
    let bestNode: NodeData | undefined
    let bestDistance = Infinity

    for (const node of graphData.nodes) {
      if (node.x === undefined || node.y === undefined) continue

      const distance = Math.hypot(node.x - graphX, node.y - graphY)
      const hitRadius = nodeRadius(node) + 4 / currentTransform.k
      if (distance <= hitRadius && distance < bestDistance) {
        bestNode = node
        bestDistance = distance
      }
    }

    return bestNode
  }

  let blankPointerStart: { x: number; y: number; time: number } | null = null

  tweens.forEach((tween) => tween.stop())
  tweens.clear()

  const app = new Application()
  await app.init({
    width,
    height,
    antialias: true,
    autoStart: false,
    autoDensity: true,
    backgroundAlpha: 0,
    preference: "webgl",
    resolution: window.devicePixelRatio,
    eventMode: "static",
  })
  graph.appendChild(app.canvas)

  let touchPress: { id: number; nodeId: SimpleSlug; x: number; y: number; time: number } | null =
    null
  const handleCanvasPointerDown = (event: PointerEvent) => {
    if (event.pointerType === "touch" && enableNavigation) {
      const node = nodeAtPointer(event.offsetX, event.offsetY)
      touchPress = node
        ? {
            id: event.pointerId,
            nodeId: node.id,
            x: event.offsetX,
            y: event.offsetY,
            time: Date.now(),
          }
        : null
    }
    if ((!readGraphTouchSelectMode() || pinnedNodeId === null) && searchQuery === "") {
      blankPointerStart = null
      return
    }

    blankPointerStart = nodeAtPointer(event.offsetX, event.offsetY)
      ? null
      : { x: event.offsetX, y: event.offsetY, time: Date.now() }
  }

  const handleCanvasPointerUp = (event: PointerEvent) => {
    if (event.pointerType === "touch" && touchPress?.id === event.pointerId) {
      const press = touchPress
      touchPress = null
      if (
        Date.now() - press.time < 500 &&
        Math.hypot(event.offsetX - press.x, event.offsetY - press.y) <= clickDragTolerance
      ) {
        handleNodePress(press.nodeId)
        blankPointerStart = null
        return
      }
    }
    if (
      !blankPointerStart ||
      ((!readGraphTouchSelectMode() || pinnedNodeId === null) && searchQuery === "")
    ) {
      blankPointerStart = null
      return
    }

    const pressDuration = Date.now() - blankPointerStart.time
    const pressDistance = Math.hypot(
      event.offsetX - blankPointerStart.x,
      event.offsetY - blankPointerStart.y,
    )
    if (
      pressDuration < 500 &&
      pressDistance <= clickDragTolerance &&
      nodeAtPointer(event.offsetX, event.offsetY) === undefined
    ) {
      if (searchQuery) {
        restoreSearchHighlight()
      } else {
        clearPinnedNode()
      }
    }
    blankPointerStart = null
  }

  app.canvas.addEventListener("pointerdown", handleCanvasPointerDown)
  app.canvas.addEventListener("pointerup", handleCanvasPointerUp)

  const stage = app.stage
  stage.interactive = false

  const labelsContainer = new Container<Text>({
    zIndex: 3,
    isRenderGroup: true,
  })
  const nodesContainer = new Container<Graphics>({
    zIndex: 2,
    isRenderGroup: true,
  })
  const linkContainer = new Container<Graphics>({
    zIndex: 1,
    isRenderGroup: true,
  })
  stage.addChild(nodesContainer, labelsContainer, linkContainer)

  for (const n of graphData.nodes) {
    const nodeId = n.id

    const label = new Text({
      interactive: false,
      eventMode: "none",
      text: n.text,
      alpha: 0,
      anchor: { x: 0.5, y: 0 },
      style: {
        fontSize: fontSize * 15,
        fill: computedStyleMap["--dark"],
        fontFamily: computedStyleMap["--bodyFont"],
        fontWeight: "400",
      },
      resolution: window.devicePixelRatio * 4,
    })
    label.scale.set(1 / scale)

    let oldLabelOpacity = 0
    const isTagNode = nodeId.startsWith("tags/")
    const gfx = new Graphics({
      interactive: true,
      label: nodeId,
      eventMode: "static",
      hitArea: new Circle(0, 0, nodeRadius(n)),
      cursor: "pointer",
    })
      .circle(0, 0, nodeRadius(n))
      .fill({ color: isTagNode ? computedStyleMap["--light"] : color(n) })
      .on("pointerover", (e) => {
        updateHoverInfo(e.target.label)
        oldLabelOpacity = label.alpha
        if (!dragging) {
          renderPixiFromD3()
        }
      })
      .on("pointerleave", () => {
        const fallbackNodeId = readGraphTouchSelectMode() ? pinnedNodeId : null
        updateHoverInfo(fallbackNodeId)
        if (fallbackNodeId !== nodeId) {
          label.alpha = oldLabelOpacity
        }
        if (!dragging) {
          renderPixiFromD3()
        }
      })

    if (isTagNode) {
      gfx.stroke({ width: 2, color: computedStyleMap["--tertiary"] })
    }

    nodesContainer.addChild(gfx)
    labelsContainer.addChild(label)

    const nodeRenderDatum: NodeRenderData = {
      simulationData: n,
      gfx,
      label,
      color: color(n),
      alpha: 1,
      active: false,
    }

    nodeRenderData.push(nodeRenderDatum)
  }

  updateSearchInfo(graphNodeSearchQuery, false)

  for (const l of graphData.links) {
    const gfx = new Graphics({ interactive: false, eventMode: "none" })
    linkContainer.addChild(gfx)

    const linkRenderDatum: LinkRenderData = {
      simulationData: l,
      gfx,
      color: computedStyleMap["--lightgray"],
      alpha: 1,
      active: false,
    }

    linkRenderData.push(linkRenderDatum)
  }

  if (enableNavigation && enableDrag) {
    select<HTMLCanvasElement, NodeData | undefined>(app.canvas).call(
      drag<HTMLCanvasElement, NodeData | undefined>()
        // Touch taps use pointer events; touch pan/pinch remains handled by zoom.
        .touchable(() => false)
        .container(() => app.canvas)
        .subject((event) => nodeAtPointer(event.x, event.y))
        .on("start", function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(1).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
          event.subject.__initialDragPos = {
            x: event.subject.x,
            y: event.subject.y,
            fx: event.subject.fx,
            fy: event.subject.fy,
          }
          dragStartTime = Date.now()
          dragStartPointer = { x: event.x, y: event.y }
          maxDragDistance = 0
          dragging = true
        })
        .on("drag", function dragged(event) {
          const initPos = event.subject.__initialDragPos
          event.subject.fx = initPos.x + (event.x - initPos.x) / currentTransform.k
          event.subject.fy = initPos.y + (event.y - initPos.y) / currentTransform.k
          maxDragDistance = Math.max(
            maxDragDistance,
            Math.hypot(event.x - dragStartPointer.x, event.y - dragStartPointer.y),
          )
        })
        .on("end", function dragended(event) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
          dragging = false

          // Treat only short, near-stationary presses as navigation clicks.
          if (Date.now() - dragStartTime < 500 && maxDragDistance <= clickDragTolerance) {
            const node = graphData.nodes.find((n) => n.id === event.subject.id) as NodeData
            handleNodePress(node.id)
          }
        }),
    )
  } else if (enableNavigation) {
    for (const node of nodeRenderData) {
      node.gfx.on("click", () => {
        handleNodePress(node.simulationData.id)
      })
    }
  }

  if (enableZoom) {
    select<HTMLCanvasElement, NodeData>(app.canvas).call(
      zoom<HTMLCanvasElement, NodeData>()
        .extent((): [[number, number], [number, number]] => [
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({ transform }) => {
          currentTransform = transform
          stage.scale.set(transform.k, transform.k)
          stage.position.set(transform.x, transform.y)

          // zoom adjusts opacity of labels too
          let scaleOpacity = zoomLabelOpacity()

          for (const node of nodeRenderData) {
            if (!isProminentLabel(node)) {
              node.label.alpha = scaleOpacity
            }
          }
        }),
    )
  }

  function applyVisualSettings(settings: GraphVisualSettings) {
    fontSize = settings.fontSize
    labelOpacity = settings.labelOpacity
    opacityScale = settings.opacityScale
    linkOpacity = settings.linkOpacity
    linkThickness = settings.linkThickness

    const defaultScale = 1 / scale
    const activeScale = defaultScale * 1.1
    for (const node of nodeRenderData) {
      const prominent = isProminentLabel(node)
      node.label.style.fontSize = fontSize * 15
      node.label.style.fontWeight = prominent ? "700" : "400"
      node.label.scale.set(prominent ? activeScale : defaultScale)
      node.label.alpha = prominent ? labelOpacity : zoomLabelOpacity()
    }
    renderLinks()
  }

  const handleVisualSettingsChange = (event: Event) => {
    applyVisualSettings((event as CustomEvent<GraphVisualSettings>).detail)
  }
  document.addEventListener("graphvisualsettingschange", handleVisualSettingsChange)

  const handleTouchSelectModeChange = (event: Event) => {
    const enabled = (event as CustomEvent<boolean>).detail
    if (!enabled && pinnedNodeId !== null) {
      clearPinnedNode()
    }
  }
  document.addEventListener("graphtouchselectmodechange", handleTouchSelectModeChange)

  const handleGraphNodeSearchChange = (event: Event) => {
    updateSearchInfo((event as CustomEvent<string>).detail)
  }
  document.addEventListener("graphnodesearchchange", handleGraphNodeSearchChange)

  let stopAnimation = false
  function animate(time: number) {
    if (stopAnimation) return
    for (const n of nodeRenderData) {
      const { x, y } = n.simulationData
      if (!x || !y) continue
      const nodeX = x + width / 2
      const nodeY = y + height / 2
      n.gfx.position.set(nodeX, nodeY)
      if (n.label) {
        const labelOffset = nodeRadius(n.simulationData) + 4
        n.label.position.set(nodeX, nodeY + labelOffset)
      }
    }

    for (const l of linkRenderData) {
      const linkData = l.simulationData
      l.gfx.clear()
      l.gfx.moveTo(linkData.source.x! + width / 2, linkData.source.y! + height / 2)
      l.gfx.lineTo(linkData.target.x! + width / 2, linkData.target.y! + height / 2).stroke({
        alpha: l.alpha * linkOpacity,
        width: linkThickness,
        color: l.color,
      })
    }

    tweens.forEach((t) => t.update(time))
    app.renderer.render(stage)
    requestAnimationFrame(animate)
  }

  const resizeObserver = new ResizeObserver(() => {
    const nextWidth = graph.offsetWidth
    const nextHeight = Math.max(graph.offsetHeight, 250)
    if (nextWidth <= 0 || (width === nextWidth && height === nextHeight)) return
    width = nextWidth
    height = nextHeight
    app.renderer.resize(width, height)
    if (enableRadial) {
      simulation.force("radial", forceRadial(Math.min(width, height) * 0.4).strength(0.2))
      simulation.alpha(0.3).restart()
    }
  })
  resizeObserver.observe(graph)
  requestAnimationFrame(animate)
  return () => {
    resizeObserver.disconnect()
    simulation.stop()
    tweens.forEach((tween) => tween.stop())
    stopAnimation = true
    app.canvas.removeEventListener("pointerdown", handleCanvasPointerDown)
    app.canvas.removeEventListener("pointerup", handleCanvasPointerUp)
    document.removeEventListener("graphvisualsettingschange", handleVisualSettingsChange)
    document.removeEventListener("graphtouchselectmodechange", handleTouchSelectModeChange)
    document.removeEventListener("graphnodesearchchange", handleGraphNodeSearchChange)
    app.destroy()
  }
}

let localGraphCleanups: (() => void)[] = []
let globalGraphCleanups: (() => void)[] = []

function cleanupLocalGraphs() {
  for (const cleanup of localGraphCleanups) {
    cleanup()
  }
  localGraphCleanups = []
}

function cleanupGlobalGraphs() {
  for (const cleanup of globalGraphCleanups) {
    cleanup()
  }
  globalGraphCleanups = []
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  addToVisited(simplifySlug(slug))

  const graphControlContainers = [
    ...document.getElementsByClassName("global-graph-outer"),
  ] as HTMLElement[]
  const graphControls = [...document.querySelectorAll<HTMLInputElement>("[data-graph-control]")]
  const graphResetButtons = [...document.getElementsByClassName("global-graph-reset")]
  const graphCollapseButtons = [
    ...document.getElementsByClassName("global-graph-controls-collapse"),
  ]
  const graphGearButtons = [...document.getElementsByClassName("global-graph-controls-gear")]
  const graphTouchSelectButtons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-graph-touch-select-mode]"),
  ]
  const graphNodeSearchInputs = [
    ...document.querySelectorAll<HTMLInputElement>("[data-graph-node-search]"),
  ]

  function syncGraphControls(settings: GraphVisualSettings) {
    for (const control of graphControls) {
      const key = control.dataset.graphControl as keyof GraphVisualSettings
      control.value = String(settings[key])
    }
  }

  function setGraphControlsCollapsed(collapsed: boolean) {
    localStorage.setItem(graphVisualControlsCollapsedKey, String(collapsed))
    for (const container of graphControlContainers) {
      container.classList.toggle("controls-collapsed", collapsed)
    }
  }

  function syncGraphTouchSelectButtons(enabled: boolean) {
    for (const button of graphTouchSelectButtons) {
      button.setAttribute("aria-pressed", String(enabled))
    }
  }

  function syncGraphNodeSearchInputs(query: string) {
    for (const input of graphNodeSearchInputs) {
      input.value = query
    }
  }

  syncGraphControls(readGraphVisualSettings())
  syncGraphTouchSelectButtons(readGraphTouchSelectMode())
  syncGraphNodeSearchInputs(graphNodeSearchQuery)
  setGraphControlsCollapsed(localStorage.getItem(graphVisualControlsCollapsedKey) === "true")

  const handleGraphControlInput = (event: Event) => {
    const control = event.currentTarget as HTMLInputElement
    const key = control.dataset.graphControl as keyof GraphVisualSettings
    const settings = readGraphVisualSettings()
    settings[key] = Number(control.value)
    writeGraphVisualSettings(settings)
    syncGraphControls(settings)
    emitGraphVisualSettings(settings)
  }
  for (const control of graphControls) {
    control.addEventListener("input", handleGraphControlInput)
  }

  const handleGraphTouchSelectToggle = () => {
    const enabled = !readGraphTouchSelectMode()
    writeGraphTouchSelectMode(enabled)
    syncGraphTouchSelectButtons(enabled)
    emitGraphTouchSelectMode(enabled)
  }
  for (const button of graphTouchSelectButtons) {
    button.addEventListener("click", handleGraphTouchSelectToggle)
  }

  const handleGraphNodeSearchInput = (event: Event) => {
    graphNodeSearchQuery = (event.currentTarget as HTMLInputElement).value
    syncGraphNodeSearchInputs(graphNodeSearchQuery)
    emitGraphNodeSearch(graphNodeSearchQuery)
  }
  for (const input of graphNodeSearchInputs) {
    input.addEventListener("input", handleGraphNodeSearchInput)
  }

  const handleGraphReset = () => {
    const settings = { ...defaultGraphVisualSettings }
    writeGraphVisualSettings(settings)
    syncGraphControls(settings)
    emitGraphVisualSettings(settings)
  }
  for (const button of graphResetButtons) {
    button.addEventListener("click", handleGraphReset)
  }

  const handleGraphCollapse = () => setGraphControlsCollapsed(true)
  for (const button of graphCollapseButtons) {
    button.addEventListener("click", handleGraphCollapse)
  }

  const handleGraphExpand = () => setGraphControlsCollapsed(false)
  for (const button of graphGearButtons) {
    button.addEventListener("click", handleGraphExpand)
  }

  async function renderLocalGraph() {
    cleanupLocalGraphs()
    const localGraphContainers = document.getElementsByClassName("graph-container")
    for (const container of localGraphContainers) {
      localGraphCleanups.push(await renderGraph(container as HTMLElement, slug))
    }
  }

  await renderLocalGraph()
  const handleThemeChange = () => {
    void renderLocalGraph()
  }

  document.addEventListener("themechange", handleThemeChange)
  window.addCleanup(() => {
    document.removeEventListener("themechange", handleThemeChange)
  })

  const containers = [...document.getElementsByClassName("global-graph-outer")] as HTMLElement[]
  let graphOpenGeneration = 0
  let returnFocus: HTMLElement | null = null
  for (const container of containers) registerEscapeHandler(container, hideGlobalGraph)
  async function renderGlobalGraph() {
    if (containers.some((container) => container.classList.contains("active"))) return
    const generation = ++graphOpenGeneration
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const slug = getFullSlug(window)
    for (const container of containers) {
      container.classList.add("active")
      const sidebar = container.closest(".sidebar") as HTMLElement
      if (sidebar) {
        sidebar.style.zIndex = "1"
      }

      const graphContainer = container.querySelector(".global-graph-container") as HTMLElement
      if (graphContainer) {
        container.querySelector<HTMLButtonElement>(".global-graph-close")?.focus()
        const cleanup = await renderGraph(graphContainer, slug)
        if (generation !== graphOpenGeneration || !container.isConnected) cleanup()
        else globalGraphCleanups.push(cleanup)
      }
    }
  }

  function hideGlobalGraph() {
    if (!containers.some((container) => container.classList.contains("active"))) return
    graphOpenGeneration++
    cleanupGlobalGraphs()
    if (returnFocus?.isConnected) returnFocus.focus()
    for (const container of containers) {
      container.classList.remove("active")
      const sidebar = container.closest(".sidebar") as HTMLElement
      if (sidebar) {
        sidebar.style.zIndex = ""
      }
    }
  }

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      const anyGlobalGraphOpen = containers.some((container) =>
        container.classList.contains("active"),
      )
      anyGlobalGraphOpen ? hideGlobalGraph() : renderGlobalGraph()
    }
  }

  const openGlobalGraphFromIcon = (event: Event) => {
    event.stopPropagation()
    void renderGlobalGraph()
  }

  const containerIcons = document.getElementsByClassName("global-graph-icon")
  Array.from(containerIcons).forEach((icon) => {
    icon.addEventListener("click", openGlobalGraphFromIcon)
    window.addCleanup(() => icon.removeEventListener("click", openGlobalGraphFromIcon))
  })

  const graphEntries = document.getElementsByClassName("global-graph-entry")
  const openGlobalGraphFromEntry = () => {
    void renderGlobalGraph()
  }
  const openGlobalGraphFromEntryKeyboard = (event: Event) => {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      event.preventDefault()
      void renderGlobalGraph()
    }
  }

  Array.from(graphEntries).forEach((entry) => {
    entry.addEventListener("click", openGlobalGraphFromEntry)
    entry.addEventListener("keydown", openGlobalGraphFromEntryKeyboard)
    window.addCleanup(() => {
      entry.removeEventListener("click", openGlobalGraphFromEntry)
      entry.removeEventListener("keydown", openGlobalGraphFromEntryKeyboard)
    })
  })

  const closeButtons = document.getElementsByClassName("global-graph-close")
  Array.from(closeButtons).forEach((button) => {
    button.addEventListener("click", hideGlobalGraph)
    window.addCleanup(() => button.removeEventListener("click", hideGlobalGraph))
  })

  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => {
    document.removeEventListener("keydown", shortcutHandler)
    for (const control of graphControls) {
      control.removeEventListener("input", handleGraphControlInput)
    }
    for (const button of graphResetButtons) {
      button.removeEventListener("click", handleGraphReset)
    }
    for (const button of graphCollapseButtons) {
      button.removeEventListener("click", handleGraphCollapse)
    }
    for (const button of graphGearButtons) {
      button.removeEventListener("click", handleGraphExpand)
    }
    for (const button of graphTouchSelectButtons) {
      button.removeEventListener("click", handleGraphTouchSelectToggle)
    }
    for (const input of graphNodeSearchInputs) {
      input.removeEventListener("input", handleGraphNodeSearchInput)
    }
    cleanupLocalGraphs()
    cleanupGlobalGraphs()
  })
})
