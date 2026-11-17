// Site motion: Lenis smooth scroll, GSAP scroll reveals, and the hero's
// construction-line draw-in. Everything is visible without this script, and
// nothing runs when the visitor prefers reduced motion.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

// A belief link opens the work row it points to.
function openTarget() {
  const el = location.hash.startsWith("#work-") ? document.querySelector(location.hash) : null;
  const d = el?.querySelector("details");
  if (d) d.open = true;
}
window.addEventListener("hashchange", openTarget);
openTarget();

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Smooth wheel scrolling on desktop only. Phones and tablets keep their own
  // momentum scrolling, which is smoother than anything layered on top of it.
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!touch) {
    const lenis = new Lenis({ duration: 1.05 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    // Keeps scroll-linked reveals steady when the mobile address bar resizes the page.
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  // Reveal: only elements below the first screen animate, so the first view
  // is complete at rest.
  const fold = window.innerHeight * 0.9;
  document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < fold) return;
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Headings: each word rises out of its own line as the heading arrives.
  // Headings already on screen play straight away; the split is undone after.
  document.querySelectorAll<HTMLElement>(".band-title, .end-title, .sh em").forEach((el) => {
    SplitText.create(el, {
      type: "words",
      mask: "words",
      wordsClass: "sw",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          yPercent: 110,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => self.revert(),
        }),
    });
  });

  // Folders: the two screens slide up out of the pocket as the card arrives.
  document.querySelectorAll<HTMLElement>(".folder").forEach((folder) => {
    if (folder.getBoundingClientRect().top < fold) return;
    gsap.from(folder.querySelectorAll(".sheet"), {
      top: 84,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.15,
      scrollTrigger: { trigger: folder, start: "top 88%", once: true },
    });
  });

  // Case pages: the stage settles into place as it comes into view.
  document.querySelectorAll<HTMLElement>(".proof .widget").forEach((el) => {
    if (el.getBoundingClientRect().top < fold) return;
    gsap.from(el, {
      opacity: 0,
      y: 28,
      scale: 0.985,
      duration: 1,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  // Arrival, on every load: the headline rises word by word, then the
  // words around it, the buttons, the screens and the facts settle in.
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  const h1 = document.querySelector<HTMLElement>(".top h1, .hero h1, .early h1");
  if (h1) {
    const split = SplitText.create(h1, { type: "words", mask: "words", wordsClass: "sw" });
    intro.from(split.words, { yPercent: 115, duration: 1, stagger: 0.06, ease: "expo.out", onComplete: () => split.revert() }, 0.05);
  }
  const q = (sel: string) => [...document.querySelectorAll<HTMLElement>(sel)].filter((el) => el.getBoundingClientRect().top < window.innerHeight);
  const add = (sel: string, vars: gsap.TweenVars, at: number) => {
    const els = q(sel);
    if (els.length) intro.from(els, { opacity: 0, clearProps: "opacity,transform,filter", ...vars }, at);
  };
  add(".hero .crumbs, .early .crumbs", { y: 10, duration: 0.6 }, 0.1);
  add(".top .intro p, .hero .angle, .early .angle", { y: 16, duration: 0.8 }, 0.35);
  add(".top .cta > *", { y: 12, scale: 0.94, duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 0.5);
  add(".hero .meta, .early .facts", { y: 14, duration: 0.7 }, 0.55);
  add(".stage .win", { y: 60, scale: 0.94, filter: "blur(6px)", duration: 1.2, stagger: 0.12, ease: "expo.out" }, 0.55);
  add(".hero .facts li", { y: 18, duration: 0.8, stagger: 0.1 }, 0.95);

  // Figures count up and the product dots pop in when they come into view.
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, {
      v: end,
      duration: 1.4,
      delay: 0.9,
      ease: "power2.out",
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
  document.querySelectorAll<HTMLElement>(".dots").forEach((d) => {
    gsap.from(d.children, { scale: 0, duration: 0.45, stagger: 0.06, delay: 1.2, ease: "back.out(3)", scrollTrigger: { trigger: d, start: "top 92%", once: true } });
  });

  // Hero construction lines: draw the lines, then pop the handles.
  document.querySelectorAll<HTMLElement>("[data-construct]").forEach((box) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(box.querySelectorAll(".line.h"), { scaleX: 0, duration: 0.7, stagger: 0.08 })
      .from(box.querySelectorAll(".line.v"), { scaleY: 0, duration: 0.5, stagger: 0.08 }, "-=0.45")
      .from(box.querySelectorAll(".handle"), { scale: 0, duration: 0.25, stagger: 0.04 }, "-=0.15");
  });
}
