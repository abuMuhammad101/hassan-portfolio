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

  // Section titles rise in a beat after their label.
  document.querySelectorAll<HTMLElement>(".band-title").forEach((el) => {
    if (el.getBoundingClientRect().top < fold) return;
    gsap.from(el, {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
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

  // Phone: as each belief card slides over the one before, that one settles
  // back a little, like a deck being dealt.
  gsap.matchMedia().add("(max-width: 700px)", () => {
    const cards = [...document.querySelectorAll<HTMLElement>("[data-belief]")];
    cards.slice(0, -1).forEach((card, i) => {
      gsap.to(card, {
        scale: 0.94,
        "--dim": 1,
        ease: "none",
        scrollTrigger: { trigger: cards[i + 1], start: "top bottom-=80", end: "top top+=140", scrub: true },
      });
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

  // First arrival: the opening screen sets itself, line by line. Only on the
  // first page of a visit; after that, page-to-page transitions take over.
  let first = true;
  try {
    first = !sessionStorage.getItem("arrived");
    sessionStorage.setItem("arrived", "1");
  } catch {}
  if (first) {
    const order = [
      ".hero .crumbs, .early .crumbs",
      ".headline h1 .lead",
      ".headline h1 .rest",
      ".hero .vt-title, .early h1",
      ".hero .angle, .early .angle",
      ".hero-grid .intro",
      ".hero-grid .ledger",
      ".hero .facts, .early .facts",
    ];
    const els = order.flatMap((sel) => [...document.querySelectorAll<HTMLElement>(sel)]).filter((el) => el.getBoundingClientRect().top < window.innerHeight);
    if (els.length) {
      gsap.from(els, { opacity: 0, y: 16, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.05, clearProps: "opacity,transform" });
    }
  }

  // Hero construction lines: draw the lines, then pop the handles.
  document.querySelectorAll<HTMLElement>("[data-construct]").forEach((box) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(box.querySelectorAll(".line.h"), { scaleX: 0, duration: 0.7, stagger: 0.08 })
      .from(box.querySelectorAll(".line.v"), { scaleY: 0, duration: 0.5, stagger: 0.08 }, "-=0.45")
      .from(box.querySelectorAll(".handle"), { scale: 0, duration: 0.25, stagger: 0.04 }, "-=0.15");
  });
}
