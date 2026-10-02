/**
 * Plays a scripted "run" over highlighted <Code lang> blocks on a slide:
 * the executing line is highlighted with three loading dots, taken locks show a
 * padlock that shakes when someone else tries it, and stuck lines turn accent.
 * Styles live in global.css (.line.is-running, .run-dots, .run-lock, .run-play).
 *
 * The play button toggles ▶ (run) / ↺ (reset); leaving or re-entering the slide resets it.
 */

/** one line, or every line of a statement that spans several */
type Lines = HTMLElement | HTMLElement[];

type Api = {
  /** highlight a statement as executing, with loading dots after its first line */
  run: (lines: Lines) => void;
  /** the statement has completed */
  finish: (lines: Lines) => void;
  /** a lock was taken by this statement: show a padlock after its first line, named `id` */
  lock: (lines: Lines, id: string) => void;
  /** someone else is trying lock `id`: it turns accent and shakes */
  contend: (id: string) => void;
  /** this statement will never complete */
  stick: (lines: Lines) => void;
};

const all = (lines: Lines) => (Array.isArray(lines) ? lines : [lines]);

type Options = {
  root: HTMLElement;
  play: HTMLButtonElement;
  label: string;
  stepMs?: number;
  /** returns the steps, in order; each runs stepMs after the previous one */
  steps: (api: Api) => (() => void)[];
};

export function codeBlocks(root: HTMLElement) {
  return Array.from(root.querySelectorAll("pre")).map((pre) =>
    Array.from(pre.querySelectorAll<HTMLElement>(".line")),
  );
}

function dots() {
  const el = document.createElement("span");
  el.className = "run-dots";
  el.setAttribute("aria-hidden", "true");
  el.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
  return el;
}

function padlock(id: string) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 20");
  svg.setAttribute("class", "run-lock");
  svg.setAttribute("aria-hidden", "true");
  svg.dataset.lock = id;
  svg.innerHTML =
    '<path d="M3.5,8 V5.5 a4.5,4.5 0 0 1 9,0 V8" fill="none" stroke="currentColor" stroke-width="2" />' +
    '<rect x="1" y="8" width="14" height="11" rx="2" fill="currentColor" />';
  return svg;
}

export function codeRun({ root, play, label, stepMs = 900, steps }: Options) {
  const section = root.closest<HTMLElement>(".slide")!;
  let timers: number[] = [];

  const api: Api = {
    run(lines) {
      all(lines).forEach((line) => line.classList.add("is-running"));
      all(lines)[0].append(dots());
    },
    finish(lines) {
      all(lines).forEach((line) => {
        line.classList.remove("is-running");
        line.querySelector(".run-dots")?.remove();
      });
    },
    lock(lines, id) {
      all(lines)[0].append(padlock(id));
    },
    contend(id) {
      root.querySelector(`.run-lock[data-lock="${id}"]`)?.classList.add("is-contended");
    },
    stick(lines) {
      all(lines).forEach((line) => line.classList.add("is-stuck"));
    },
  };

  function setButton(done: boolean) {
    play.textContent = done ? "↺" : "▶";
    play.disabled = false;
    play.setAttribute("aria-label", done ? "Reset" : label);
  }

  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
    root.querySelectorAll<HTMLElement>(".line").forEach((line) => {
      api.finish(line);
      line.classList.remove("is-stuck");
    });
    root.querySelectorAll(".run-lock").forEach((el) => el.remove());
    setButton(false);
  }

  play.addEventListener("click", () => {
    const replay = play.textContent === "↺";
    reset();
    // don't keep focus, so space/arrows stay with the deck
    play.blur();
    if (replay) return;
    play.disabled = true;
    const list = steps(api);
    list.forEach((step, i) => timers.push(window.setTimeout(step, i * stepMs)));
    timers.push(window.setTimeout(() => setButton(true), (list.length - 1) * stepMs));
  });

  section.addEventListener("slide:enter", reset);
  section.addEventListener("slide:leave", reset);
  reset();
}
