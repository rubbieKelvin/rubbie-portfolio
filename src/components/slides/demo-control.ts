/** Sync a <DemoControl> with the demo's current state (0-based). */
export function updateDemoControl(button: HTMLElement, state: number) {
  const dots = button.querySelectorAll("[data-dot]");
  const done = state >= dots.length - 1;
  dots.forEach((dot, i) => dot.classList.toggle("is-on", i <= state));
  button.toggleAttribute("data-done", done);
  button.setAttribute("aria-label", done ? "Replay the demo" : "Advance the demo");
}

/**
 * Let the deck's space bar step this slide. `step()` takes the next step and returns
 * true, or returns false when there's nothing left so the deck moves to the next slide.
 */
export function onAdvance(el: HTMLElement, step: () => boolean) {
  el.closest(".slide")!.addEventListener("slide:advance", (e) => {
    if (step()) e.preventDefault();
  });
}
