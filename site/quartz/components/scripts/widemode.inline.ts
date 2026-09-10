const wideModeStorageKey = "wide-mode"
let isWideMode = localStorage.getItem(wideModeStorageKey) === "on"
let activeScroller: HTMLElement | undefined

document.documentElement.setAttribute("wide-mode", isWideMode ? "on" : "off")

function hasHorizontalOverflow(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth + 4
}

function isVisibleInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return (
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  )
}

function getScrollableContainers() {
  return Array.from(document.querySelectorAll<HTMLElement>(".table-container, pre")).filter(
    hasHorizontalOverflow,
  )
}

function findActiveScroller() {
  if (
    activeScroller &&
    document.body.contains(activeScroller) &&
    hasHorizontalOverflow(activeScroller) &&
    isVisibleInViewport(activeScroller)
  ) {
    return activeScroller
  }

  let bestElement: HTMLElement | undefined
  let bestScore = 0

  for (const element of getScrollableContainers()) {
    const rect = element.getBoundingClientRect()
    const visibleWidth = Math.max(
      0,
      Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
    )
    const visibleHeight = Math.max(
      0,
      Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
    )
    const score = visibleWidth * visibleHeight + (element.scrollWidth - element.clientWidth)

    if (score > bestScore) {
      bestElement = element
      bestScore = score
    }
  }

  activeScroller = bestElement
  return activeScroller
}

function updateWideModeButtons() {
  for (const button of document.getElementsByClassName("widemode")) {
    if (button instanceof HTMLButtonElement) {
      button.setAttribute("aria-pressed", String(isWideMode))
    }
  }
}

function updateWideScrollRail() {
  const rail = document.querySelector<HTMLElement>(".wide-scroll-rail")
  if (!rail || !isWideMode) {
    rail?.removeAttribute("data-visible")
    return
  }

  const scroller = findActiveScroller()
  const track = rail.querySelector<HTMLElement>(".wide-scroll-track")
  const thumb = rail.querySelector<HTMLElement>(".wide-scroll-thumb")
  if (!scroller || !track || !thumb || !hasHorizontalOverflow(scroller)) {
    rail.removeAttribute("data-visible")
    return
  }

  rail.setAttribute("data-visible", "true")
  const maxScroll = scroller.scrollWidth - scroller.clientWidth
  const trackWidth = track.clientWidth
  if (maxScroll <= 0 || trackWidth <= 0) {
    rail.removeAttribute("data-visible")
    return
  }

  const thumbWidth = Math.max(44, trackWidth * (scroller.clientWidth / scroller.scrollWidth))
  const thumbLeft = (scroller.scrollLeft / maxScroll) * Math.max(0, trackWidth - thumbWidth)
  thumb.style.width = `${thumbWidth}px`
  thumb.style.transform = `translateX(${thumbLeft}px)`
}

function setWideMode(enabled: boolean) {
  isWideMode = enabled
  const mode = isWideMode ? "on" : "off"
  document.documentElement.setAttribute("wide-mode", mode)
  localStorage.setItem(wideModeStorageKey, mode)
  updateWideModeButtons()
  requestAnimationFrame(updateWideScrollRail)
}

function ensureFloatingButton() {
  let button = document.querySelector<HTMLButtonElement>(".wide-mode-floating-button")
  if (!button) {
    button = document.createElement("button")
    button.className = "wide-mode-floating-button"
    button.type = "button"
    document.body.appendChild(button)
  }

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  icon.setAttribute("viewBox", "0 0 24 24")
  icon.setAttribute("aria-hidden", "true")
  icon.setAttribute("fill", "none")
  icon.setAttribute("stroke", "currentColor")
  icon.setAttribute("stroke-width", "2")
  icon.setAttribute("stroke-linecap", "round")
  icon.setAttribute("stroke-linejoin", "round")

  for (const d of ["M4 5h16v14H4z", "M9 12H3", "M6 9l-3 3 3 3", "M15 12h6", "M18 9l3 3-3 3"]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", d)
    icon.appendChild(path)
  }

  const label = document.createElement("span")
  label.textContent = "退出宽屏模式"
  button.replaceChildren(icon, label)
  button.setAttribute("aria-label", "退出宽屏模式")
  return button
}

function ensureWideScrollRail() {
  let rail = document.querySelector<HTMLElement>(".wide-scroll-rail")
  if (!rail) {
    rail = document.createElement("div")
    rail.className = "wide-scroll-rail"
    rail.setAttribute("aria-hidden", "true")

    const track = document.createElement("div")
    track.className = "wide-scroll-track"

    const thumb = document.createElement("div")
    thumb.className = "wide-scroll-thumb"

    track.appendChild(thumb)
    rail.appendChild(track)
    document.body.appendChild(rail)
  }

  return rail
}

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("a, button, input, textarea, select, label"))
  )
}

function bindScrollableContainer(element: HTMLElement, resizeObserver: ResizeObserver) {
  const refreshActive = () => {
    activeScroller = element
    requestAnimationFrame(updateWideScrollRail)
  }

  const refreshRail = () => requestAnimationFrame(updateWideScrollRail)

  let pointerId: number | undefined
  let startX = 0
  let startScrollLeft = 0

  const stopDragging = () => {
    if (pointerId !== undefined) {
      if (element.hasPointerCapture(pointerId)) {
        element.releasePointerCapture(pointerId)
      }
      pointerId = undefined
    }
    element.classList.remove("is-dragging")
  }

  const startDragging = (event: PointerEvent) => {
    if (
      !isWideMode ||
      event.button !== 0 ||
      !hasHorizontalOverflow(element) ||
      isInteractiveTarget(event.target)
    ) {
      return
    }

    activeScroller = element
    pointerId = event.pointerId
    startX = event.clientX
    startScrollLeft = element.scrollLeft
    element.setPointerCapture(pointerId)
  }

  const moveDragging = (event: PointerEvent) => {
    if (pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - startX
    if (Math.abs(deltaX) > 3) {
      element.classList.add("is-dragging")
      element.scrollLeft = startScrollLeft - deltaX
      event.preventDefault()
      updateWideScrollRail()
    }
  }

  element.addEventListener("mouseenter", refreshActive)
  element.addEventListener("focusin", refreshActive)
  element.addEventListener("scroll", refreshRail, { passive: true })
  element.addEventListener("pointerdown", startDragging)
  element.addEventListener("pointermove", moveDragging)
  element.addEventListener("pointerup", stopDragging)
  element.addEventListener("pointercancel", stopDragging)
  resizeObserver.observe(element)

  window.addCleanup(() => {
    element.removeEventListener("mouseenter", refreshActive)
    element.removeEventListener("focusin", refreshActive)
    element.removeEventListener("scroll", refreshRail)
    element.removeEventListener("pointerdown", startDragging)
    element.removeEventListener("pointermove", moveDragging)
    element.removeEventListener("pointerup", stopDragging)
    element.removeEventListener("pointercancel", stopDragging)
    stopDragging()
  })
}

function refreshScrollableContainers() {
  for (const element of Array.from(
    document.querySelectorAll<HTMLElement>(".table-container, pre"),
  )) {
    element.classList.toggle("wide-scrollable", hasHorizontalOverflow(element))
  }

  requestAnimationFrame(updateWideScrollRail)
}

function bindWideScrollRail(rail: HTMLElement) {
  const track = rail.querySelector<HTMLElement>(".wide-scroll-track")
  if (!track) {
    return
  }

  const moveScrollerTo = (clientX: number) => {
    const scroller = findActiveScroller()
    if (!scroller || !hasHorizontalOverflow(scroller)) {
      return
    }

    const rect = track.getBoundingClientRect()
    const maxScroll = scroller.scrollWidth - scroller.clientWidth
    const thumbWidth = Math.max(44, rect.width * (scroller.clientWidth / scroller.scrollWidth))
    const availableWidth = Math.max(1, rect.width - thumbWidth)
    const nextLeft = Math.min(Math.max(clientX - rect.left - thumbWidth / 2, 0), availableWidth)
    scroller.scrollLeft = (nextLeft / availableWidth) * maxScroll
    updateWideScrollRail()
  }

  const onPointerDown = (event: PointerEvent) => {
    if (!isWideMode) {
      return
    }

    rail.classList.add("is-dragging")
    rail.setPointerCapture(event.pointerId)
    moveScrollerTo(event.clientX)
    event.preventDefault()

    const onPointerMove = (moveEvent: PointerEvent) => moveScrollerTo(moveEvent.clientX)
    const stopRailDragging = () => {
      rail.classList.remove("is-dragging")
      if (rail.hasPointerCapture(event.pointerId)) {
        rail.releasePointerCapture(event.pointerId)
      }
      rail.removeEventListener("pointermove", onPointerMove)
      rail.removeEventListener("pointerup", stopRailDragging)
      rail.removeEventListener("pointercancel", stopRailDragging)
    }

    rail.addEventListener("pointermove", onPointerMove)
    rail.addEventListener("pointerup", stopRailDragging)
    rail.addEventListener("pointercancel", stopRailDragging)
  }

  rail.addEventListener("pointerdown", onPointerDown)
  window.addCleanup(() => rail.removeEventListener("pointerdown", onPointerDown))
}

document.addEventListener("nav", () => {
  const switchWideMode = () => setWideMode(!isWideMode)

  for (const wideModeButton of document.getElementsByClassName("widemode")) {
    wideModeButton.addEventListener("click", switchWideMode)
    window.addCleanup(() => wideModeButton.removeEventListener("click", switchWideMode))
  }

  const floatingButton = ensureFloatingButton()
  floatingButton.addEventListener("click", switchWideMode)
  window.addCleanup(() => floatingButton.removeEventListener("click", switchWideMode))

  const rail = ensureWideScrollRail()
  bindWideScrollRail(rail)

  const resizeObserver = new ResizeObserver(refreshScrollableContainers)
  for (const element of Array.from(
    document.querySelectorAll<HTMLElement>(".table-container, pre"),
  )) {
    bindScrollableContainer(element, resizeObserver)
  }
  window.addCleanup(() => resizeObserver.disconnect())

  const onScrollOrResize = () => requestAnimationFrame(updateWideScrollRail)
  window.addEventListener("scroll", onScrollOrResize, { passive: true })
  window.addEventListener("resize", refreshScrollableContainers)
  window.addCleanup(() => {
    window.removeEventListener("scroll", onScrollOrResize)
    window.removeEventListener("resize", refreshScrollableContainers)
  })

  setWideMode(isWideMode)
  refreshScrollableContainers()
})
