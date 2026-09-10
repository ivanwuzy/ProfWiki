import { forceCenter, forceLink, forceManyBody, forceSimulation } from "d3"
import type { SimulationNodeDatum } from "d3"
import { graphNodeColor, isGraphNodeVisible } from "../util/graphPolicy"
import { simplifySlug } from "../util/path"
import type { QuartzComponentProps } from "./types"

// Cache the settled layout across pages in a build, without running a browser simulation.
const thumbnails = new WeakMap<
  QuartzComponentProps["allFiles"],
  ReturnType<typeof buildThumbnail>
>()

function buildThumbnail(allFiles: QuartzComponentProps["allFiles"]) {
  const nodes = allFiles
    .filter((file) => file.slug && isGraphNodeVisible(file.slug))
    .map(
      (file) =>
        ({ id: simplifySlug(file.slug!), degree: 0 }) as SimulationNodeDatum & {
          id: string
          degree: number
        },
    )
    .sort((a, b) => a.id.localeCompare(b.id))
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const links: {
    source: (typeof nodes)[number]
    target: (typeof nodes)[number]
  }[] = []
  const seen = new Set<string>()
  for (const file of allFiles) {
    const source = file.slug && byId.get(simplifySlug(file.slug))
    if (!source) continue
    for (const id of file.links ?? []) {
      const target = byId.get(id)
      const key = [source.id, id].sort().join("\0")
      if (!target || target === source || seen.has(key)) continue
      seen.add(key)
      source.degree++
      target.degree++
      links.push({ source, target })
    }
  }
  const simulation = forceSimulation(nodes)
    .force("charge", forceManyBody().strength(-35))
    .force("link", forceLink(links).distance(22))
    .force("center", forceCenter(0, 0))
    .stop()
  simulation.tick(160)
  const extent = Math.max(
    1,
    ...nodes.map((node) => Math.max(Math.abs(node.x!), Math.abs(node.y!))),
  )
  const scale = 180 / extent
  return { nodes, links, scale }
}

export default function GraphThumbnail({
  allFiles,
}: Pick<QuartzComponentProps, "allFiles">) {
  let thumbnail = thumbnails.get(allFiles)
  if (!thumbnail) {
    thumbnail = buildThumbnail(allFiles)
    thumbnails.set(allFiles, thumbnail)
  }
  const { nodes, links, scale } = thumbnail
  const x = (node: SimulationNodeDatum) => 200 + node.x! * scale
  const y = (node: SimulationNodeDatum) => 200 + node.y! * scale
  return (
    <svg class="graph-thumbnail" viewBox="0 0 400 400" aria-hidden="true">
      <g stroke="var(--lightgray)" stroke-width="0.8" opacity="0.7">
        {links.map(({ source, target }) => (
          <line x1={x(source)} y1={y(source)} x2={x(target)} y2={y(target)} />
        ))}
      </g>
      {nodes.map((node) => (
        <circle
          cx={x(node)}
          cy={y(node)}
          r={Math.min(9, 2.5 + Math.sqrt(node.degree) * 0.65)}
          fill={graphNodeColor(node.id)}
        />
      ))}
    </svg>
  )
}
