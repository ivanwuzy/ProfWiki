import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const HomeButton: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  return (
    <a
      class={classNames(displayClass, "home-button")}
      href={`${pathToRoot(fileData.slug!)}/wiki/`}
      aria-label="返回 Wiki 首页"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
      <span>返回 Wiki 首页</span>
    </a>
  )
}

HomeButton.css = `
.home-button {
  align-items: center;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  box-sizing: border-box;
  color: var(--dark);
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  gap: 0.45rem;
  justify-content: center;
  line-height: 1.2;
  padding: 0.55rem 0.75rem;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
  width: 100%;
}

.home-button:hover {
  background-color: var(--highlight);
  border-color: var(--secondary);
  color: var(--tertiary);
}

.home-button svg {
  flex: 0 0 auto;
}

@media all and (max-width: 800px) {
  .home-button {
    flex: 0 0 auto;
    margin: 0 0.75rem;
    padding: 0.45rem 0.65rem;
    width: auto;
  }
}
`

export default (() => HomeButton) satisfies QuartzComponentConstructor
