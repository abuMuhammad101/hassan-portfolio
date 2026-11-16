/* Shared controller for the story widgets: chapters that advance on a timer
   while the widget is on screen, with tap, swipe and keyboard control.
   Markup contract, all inside `root`:
     [data-ch]            chapter items (the visible panel's)
     [data-ch] button     jumps to that chapter and stops autoplay
     .bars span           optional story bars
     [data-shot]          screens to show for each chapter (index)
     [data-go="-1|1"]     previous / next taps
     .phone               swipe surface
     [data-play]          play / pause toggle
   Timers are CSS animations restarted by toggling `.tick` on root. */

export interface Story {
  show(i: number): void;
  readonly index: number;
}

export function initStory(root: HTMLElement, opts: { dur?: number; mirrored?: () => boolean } = {}): Story {
  const dur = opts.dur ?? 5200;
  const mirrored = opts.mirrored ?? (() => false);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0;
  let timer: number | undefined;
  let userStopped = false;

  root.style.setProperty("--dur", `${dur}ms`);
  const panel = () => root.querySelector<HTMLElement>("[data-panel]:not([hidden])") ?? root;

  const schedule = () => {
    clearTimeout(timer);
    if (root.dataset.playing === "true") timer = window.setTimeout(() => show(idx + 1), dur);
  };

  function show(i: number) {
    const p = panel();
    const items = [...p.querySelectorAll<HTMLElement>("[data-ch]")];
    const n = items.length || 1;
    idx = (i + n) % n;
    items.forEach((li, k) => {
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
    root.classList.remove("tick");
    void root.offsetWidth;
    root.classList.add("tick");
    schedule();
  }

  const setPlaying = (on: boolean) => {
    root.dataset.playing = String(on);
    root.querySelector("[data-play]")?.setAttribute("aria-label", on ? "Pause the story" : "Play the story");
    if (on) show(idx);
    else clearTimeout(timer);
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
    const go = t.closest<HTMLElement>("[data-go]");
    if (go) {
      // A mirrored stage reads right to left: its left half moves forward.
      show(idx + Number(go.dataset.go) * (mirrored() ? -1 : 1));
      return;
    }
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
      const fwd = mirrored() ? dx > 0 : dx < 0;
      show(idx + (fwd ? 1 : -1));
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
