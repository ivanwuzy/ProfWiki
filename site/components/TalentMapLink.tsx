import { pathToRoot } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor } from "../quartz/components/types"

// Add future university entries here with their own branding and published map URL.
const universityMaps = [
  {
    name: "清华大学",
    english: "TSINGHUA UNIVERSITY",
    description: "具身人才地图",
    href: "talent-map/",
    // Official white logo: https://www.tsinghua.edu.cn/image/logo180.png
    logo: "static/tsinghua-logo.png",
    color: "#660874",
    light: "#873b94",
    dark: "#390b49",
  },
]

const TalentMapLink: QuartzComponent = ({ fileData }) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <section class="university-map-links" aria-label="高校人才地图">
      <h3>高校人才地图</h3>
      <div class="university-map-list">
        {universityMaps.map((university) => (
          <a
            class="talent-map-link"
            href={`${root}/${university.href}`}
            data-router-ignore
            aria-label={`${university.name}${university.description}，打开交互地图`}
            style={`--university-color:${university.color};--university-light:${university.light};--university-dark:${university.dark}`}
          >
            <span class="university-map-brand">
              <span class="university-map-seal" aria-hidden="true">
                <img src={`${root}/${university.logo}`} alt="" width="180" height="58" />
              </span>
              <span class="university-map-name">
                <strong>{university.name}</strong>
                <small>{university.english}</small>
              </span>
            </span>
            <span class="university-map-action">
              <span>{university.description}</span>
              <span class="university-map-arrow" aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
TalentMapLink.css = `
.university-map-links{min-width:0;flex-shrink:0}
.university-map-links h3{font-size:.9rem;margin:0 0 12px;color:var(--dark);letter-spacing:.04em}
.university-map-list{display:grid;gap:12px}
a.talent-map-link{position:relative;isolation:isolate;display:flex;flex-direction:column;gap:15px;overflow:hidden;padding:19px 18px 14px;border-radius:14px;background:linear-gradient(125deg,var(--university-light) -45%,var(--university-color) 40%,var(--university-dark) 115%);color:#fff!important;text-decoration:none;border:1px solid #ffffff24;box-shadow:inset 0 1px 0 #ffffff30,0 5px 16px #390b491a;transition:transform .2s,box-shadow .2s}
a.talent-map-link::before{content:"";position:absolute;z-index:-1;width:170px;height:170px;right:-95px;top:-98px;border:1px solid #ffffff14;border-radius:50%;box-shadow:0 0 0 25px #ffffff05,0 0 0 50px #ffffff04;pointer-events:none}
a.talent-map-link:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 #ffffff38,0 9px 22px #390b492e}
a.talent-map-link:focus-visible{outline:3px solid #b98ac6;outline-offset:4px}
.university-map-brand{display:flex;align-items:center;gap:12px}
.university-map-seal{display:block;flex:0 0 44px;width:44px;height:44px;overflow:hidden;opacity:.96}
.university-map-seal img{content-visibility:visible;display:block;width:136.55px;height:44px;max-width:none;margin:0;border-radius:0}
.university-map-name{display:flex;flex-direction:column;gap:5px;min-width:0}
.university-map-name strong{font-size:1.12rem;font-weight:600;letter-spacing:.12em;line-height:1.3;color:#fff}
.university-map-name small{font-size:.55rem;font-weight:500;letter-spacing:.09em;color:#e5cce9;white-space:nowrap}
.university-map-action{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:12px;border-top:1px solid #ffffff26;font-size:.8rem;font-weight:500;letter-spacing:.05em;color:#f1e4f4}
.university-map-arrow{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#ffffff12;border:1px solid #ffffff20;font-size:1rem;transition:background .2s}
a.talent-map-link:hover .university-map-arrow{background:#ffffff26}
.page > #quartz-body .sidebar.right:has(.university-map-links){flex-direction:column}
.page > #quartz-body .sidebar.right > .university-map-links{max-height:none;width:100%}
@media(prefers-reduced-motion:reduce){a.talent-map-link,.university-map-arrow{transition:none}a.talent-map-link:hover{transform:none}}
`
export default (() => TalentMapLink) satisfies QuartzComponentConstructor
