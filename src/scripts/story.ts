/* Shared controller for the story widgets: chapters that advance on a timer
   while the widget is on screen, and that the reader can drive by tapping
   the glowing spot on the screen, the chapter list, or by swiping.
   Markup contract, all inside `root`:
     [data-panel]         optional; the visible one holds the chapters
     [data-ch]            chapter items; their button jumps there
     .bars span           optional story bars
     [data-shot]          anything shown only on its chapter (screens, spots, notes)
     [data-hot]           the tap spot: moves the story on
     [data-go="-1|1"]     previous / next
     .phone               swipe surface
     [data-play]          play / pause
     [data-count]         "02 / 05"
   Timers are CSS animations restarted by toggling `.tick` on root. */

export interface Story {
  show(i: number): void;
  readonly index: number;
}

interface Options {
  dur?: number;
  /** Called when the story moves past its last chapter. Return true if handled. */
  onEnd?: () => boolean;
}

export function initStory(root: HTMLElement, opts: Options = {}): Story {
  const dur = opts.dur ?? 5600;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0;
  let timer: number | undefined;
  let userStopped = false;

  root.style.setProperty("--dur", `${dur}ms`);
  const panel = () => root.querySelector<HTMLElement>("[data-panel]:not([hidden])") ?? root;
  const total = () => panel().querySelectorAll("[data-ch]").length || 1;

  const schedule = () => {
    clearTimeout(timer);
    if (root.dataset.playing === "true") timer = window.setTimeout(next, dur);
  };

  function show(i: number) {
    const p = panel();
    const n = total();
    idx = (i + n) % n;
    p.querySelectorAll<HTMLElement>("[data-ch]").forEach((li, k) => {
      li.classList.toggle("on", k === idx);
      li.classList.toggle("done", k < idx);
      const b = li.querySelector("button");
      if (b) {
        if (k === idx) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      }
    });
    p.querySelectorAll<HTMLElement>(".bars span").forEach((b, k) => {
      b.classList.toggle("on", k === idx);
      b.classList.toggle("done", k < idx);
    });
    p.querySelectorAll<HTMLElement>("[data-shot]").forEach((s) => s.classList.toggle("on", Number(s.dataset.shot) === idx));
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => (c.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`));
    root.classList.remove("tick");
    void root.offsetWidth;
    root.classList.add("tick");
    schedule();
  }

  function next() {
    if (idx + 1 >= total() && opts.onEnd?.()) return;
    show(idx + 1);
  }

  const setPlaying = (on: boolean) => {
    root.dataset.playing = String(on);
    root.querySelectorAll("[data-play]").forEach((b) => b.setAttribute("aria-label", on ? "Pause the story" : "Play the story"));
    if (on) show(idx);
    else {
      clearTimeout(timer);
      root.classList.remove("tick");
    }
  };

  root.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    const ch = t.closest<HTMLElement>("[data-ch] button");
    if (ch) {
      userStopped = true;
      setPlaying(false);
      const li = ch.closest<HTMLElement>("[data-ch]")!;
      show([...li.parentElement!.children].indexOf(li));
      return;
    }
    if (t.closest("[data-hot]")) return next();
    const go = t.closest<HTMLElement>("[data-go]");
    if (go) return Number(go.dataset.go) > 0 ? next() : show(idx - 1);
    if (t.closest("[data-play]")) {
      const on = root.dataset.playing !== "true";
      userStopped = !on;
      setPlaying(on);
    }
  });

  root.querySelectorAll<HTMLElement>(".phone").forEach((ph) => {
    let x0 = 0;
    ph.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    ph.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) next();
      else show(idx - 1);
    });
  });

  if (!reduce) {
    new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userStopped) setPlaying(true);
        else if (!e.isIntersecting && root.dataset.playing === "true") setPlaying(false);
      },
      { threshold: 0.45 },
    ).observe(root);
  }
  root.dataset.playing ??= "false";
  show(0);

  return {
    show,
    get index() {
      return idx;
    },
  };
}
