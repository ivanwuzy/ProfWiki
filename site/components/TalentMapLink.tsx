import { pathToRoot } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor } from "../quartz/components/types"

const TalentMapLink: QuartzComponent = ({ fileData }) => (
  <a class="talent-map-link" href={`${pathToRoot(fileData.slug!)}/talent-map/`} data-router-ignore>
    <span>清华大学具身人才地图 ↗</span>
    <small>院系 · 实验室 · 人才 · 创业公司</small>
    <strong>打开交互地图 →</strong>
  </a>
)
TalentMapLink.css = `
.talent-map-link{display:flex;flex-direction:column;gap:10px;padding:18px;border-radius:12px;background:#173c53;color:#fff!important;text-decoration:none;border:1px solid #315b70;transition:background .15s}
.talent-map-link:hover{background:#245570}
.talent-map-link span{font-size:1rem;font-weight:600}
.talent-map-link small{font-size:.75rem;color:#c9dce8}
.talent-map-link strong{font-size:.8rem;color:#9be0e3}
`
export default (() => TalentMapLink) satisfies QuartzComponentConstructor
