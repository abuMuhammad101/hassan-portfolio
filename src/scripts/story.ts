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

  // The named cursor, when the story has one: before each chapter ends it
  // glides to what the person would tap next, rests, and taps it.
  const ghost = root.querySelector<HTMLElement>("[data-ghost]");
  let gt: number[] = [];
  let lit: HTMLElement | null = null;
  const light = (el: HTMLElement | null) => {
    lit?.removeAttribute("data-ghost-on");
    lit = el;
    el?.setAttribute("data-ghost-on", "");
  };
  const hideGhost = () => {
    gt.forEach(clearTimeout);
    gt = [];
    ghost?.classList.remove("on");
    light(null);
  };
  const target = () =>
    [...panel().querySelectorAll<HTMLElement>("[data-hot]")]
      .filter((el) => el.closest(".on, [data-hot].on") && el.getClientRects().length && getComputedStyle(el).visibility !== "hidden")
      .pop() ?? null;
  const glide = () => {
    const el = target();
    const host = ghost?.offsetParent as HTMLElement | null;
    if (!ghost || !el || !host) return;
    const r = el.getBoundingClientRect();
    const h = host.getBoundingClientRect();
    ghost.style.transform = `translate(${r.left - h.left + r.width / 2}px, ${r.top - h.top + r.height / 2}px)`;
    ghost.classList.add("on");
    gt.push(window.setTimeout(() => light(el), 600));
    gt.push(
      window.setTimeout(() => {
        ghost.classList.remove("click");
        void ghost.offsetWidth;
        ghost.classList.add("click");
        el.setAttribute("data-ghost-press", "");
        window.setTimeout(() => el.removeAttribute("data-ghost-press"), 200);
      }, 1100),
    );
  };

  const schedule = () => {
    clearTimeout(timer);
    gt.forEach(clearTimeout);
    gt = [];
    light(null);
    if (root.dataset.playing !== "true") return;
    timer = window.setTimeout(next, dur);
    if (ghost) gt.push(window.setTimeout(glide, Math.max(400, dur - 1500)));
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
      hideGhost();
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
