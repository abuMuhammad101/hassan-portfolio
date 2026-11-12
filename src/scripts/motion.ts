// Site motion: Lenis smooth scroll, GSAP scroll reveals, and the hero's
// construction-line draw-in. Everything is visible without this script, and
// nothing runs when the visitor prefers reduced motion.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ duration: 1.05 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

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

  // Hero construction lines: draw the lines, then pop the handles.
  document.querySelectorAll<HTMLElement>("[data-construct]").forEach((box) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(box.querySelectorAll(".line.h"), { scaleX: 0, duration: 0.7, stagger: 0.08 })
      .from(box.querySelectorAll(".line.v"), { scaleY: 0, duration: 0.5, stagger: 0.08 }, "-=0.45")
      .from(box.querySelectorAll(".handle"), { scale: 0, duration: 0.25, stagger: 0.04 }, "-=0.15");
  });
}
