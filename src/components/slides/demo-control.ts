/** Sync a <DemoControl> with the demo's current state (0-based). */
export function updateDemoControl(button: HTMLElement, state: number) {
  const dots = button.querySelectorAll("[data-dot]");
  const done = state >= dots.length - 1;
  dots.forEach((dot, i) => dot.classList.toggle("is-on", i <= state));
  button.toggleAttribute("data-done", done);
  button.setAttribute("aria-label", done ? "Replay the demo" : "Advance the demo");
}
