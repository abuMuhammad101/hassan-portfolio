// The home page work index, in story order. Public names only.
// `page` is the case-study slug once that page exists.
export interface WorkRow {
  id: string;
  name: string;
  tags: string[];
  angle: string;
  page?: string;
}

export const workIndex: WorkRow[] = [
  {
    id: "pilgrim-transport",
    name: "Pilgrim Transport Booking",
    tags: ["Web", "Travel"],
    angle: "An agent built the site. I gave back what people need from it.",
    page: "pilgrim-transport",
  },
  {
    id: "therapy-documentation",
    name: "Therapy Documentation Platform",
    tags: ["Healthcare", "Compliance"],
    angle:
      "A system-driven experience that still feels comfortable, built so the rules stop the slips that cause errors later.",
    page: "therapy-documentation",
  },
  {
    id: "clinical-copilot",
    name: "Clinical Copilot Overlay",
    tags: ["Healthcare", "AI copilot"],
    angle: "A copilot that cuts the noise: it appears when asked, adapts to the flow, and stays out of the way.",
    page: "clinical-copilot",
  },
  {
    id: "claims-agent-console",
    name: "Claims Agent Console",
    tags: ["Healthcare", "AI agents"],
    angle: "A multi-agent billing system kept legible and steerable for the people who answer for it.",
    page: "claims-agent-console",
  },
  {
    id: "clicker",
    name: "Clicker",
    tags: ["ERP", "Own product"],
    angle: "An ERP that makes sense: dense data in its most digestible shape, owned solo from schema to screen.",
    page: "clicker",
  },
  {
    id: "istyme",
    name: "isTyme",
    tags: ["Marketplace", "Mobile"],
    angle: "The power of minimal, in a marketplace rooted in the local and the human.",
  },
  {
    id: "quick-service-app",
    name: "Quick-Service Ordering App",
    tags: ["Mobile", "UX audit"],
    angle: "A UX audit that gave the team enough context to make the app ready to compete.",
    page: "quick-service-app",
  },
  {
    id: "hh-global",
    name: "HH Global",
    tags: ["E-commerce", "Shipped"],
    angle: "Sketch to ship, solo, for a US wholesale business.",
    page: "hh-global",
  },
];

export const beliefs = [
  {
    icon: "crosshair",
    text: "I solve the problem, not the tool.",
    note: "Tools, hype and skill boundaries don't decide the answer.",
    proof: ["pilgrim-transport", "quick-service-app"],
  },
  {
    icon: "steering-wheel",
    text: "I ship with agents; people stay in charge.",
    note: "They draft and I decide, the way a lead works with a fast team.",
    proof: ["clinical-copilot", "claims-agent-console"],
  },
  {
    icon: "compass",
    text: "I'm at home in ambiguity.",
    note: "Unclear briefs and new domains are where the work starts.",
    proof: ["clicker", "istyme"],
  },
  {
    icon: "signature",
    text: "I own the consequences.",
    note: "Including what goes wrong after it ships.",
    proof: ["therapy-documentation", "hh-global"],
  },
];
