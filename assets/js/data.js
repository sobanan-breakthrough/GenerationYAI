/* ============================================================
   GenerationYAI — static data
   Agency instrument, build milestones, matching layer, cohort.
   All cohort figures are clearly labelled ILLUSTRATIVE demo data.
   ============================================================ */

window.GY_DATA = {

  /* The agency / self-efficacy instrument.
     Mapped to Breakthrough's Learner Progress & Assessment Monitoring
     Framework — measured at entry and exit to capture distance travelled. */
  agencyStatements: [
    "I can learn to use new technology, even when it feels unfamiliar.",
    "I can build something useful with AI.",
    "When I get stuck, I can find a way to move forward.",
    "The future is something I can shape — not just something that happens to me.",
    "People like me belong in the AI-powered economy.",
    "I know what my next step could be."
  ],

  likertLabels: [
    { v: 1, t: "Not me" },
    { v: 2, t: "Rarely" },
    { v: 3, t: "Sometimes" },
    { v: 4, t: "Mostly" },
    { v: 5, t: "That's me" }
  ],

  /* The scaffolded build. The companion coaches through these; the UI
     ticks each one to make progress visible (the "agency meter"). */
  milestones: [
    { id: "purpose", label: "Named what your tool will help with" },
    { id: "audience", label: "Decided who it's for" },
    { id: "brain",    label: "Gave it its instructions (its 'brain')" },
    { id: "test",     label: "Tested your tool — and it worked" }
  ],

  /* Illustrative matching layer — surfaced after the build.
     Labelled as examples; real product connects to live opportunities. */
  matches: [
    { org: "BT", logo: "BT", role: "Digital Support Apprentice", fit: "Strong match", why: "You showed you can learn a new tool fast and explain it simply." },
    { org: "Cisco", logo: "C", role: "AI Operations Assistant", fit: "Good match", why: "You directed an AI system to do a real job — the core of the role." },
    { org: "Breakthrough", logo: "Y", role: "Community Tech Mentor (paid)", fit: "Open now", why: "Associates who build often come back to help the next cohort." }
  ],

  /* FUNDER DASHBOARD — illustrative demo cohort.
     Clearly framed as demonstration data, NOT reported outcomes. */
  cohort: {
    name: "Autumn 2026 — justice-experienced cohort",
    funder: "MoJ-linked social-value contract (illustrative)",
    size: 24,
    engaged: 96,            // % still engaged after start
    toolsBuilt: 22,
    progressed: 15,         // into work / learning / enterprise
    agencyBefore: 2.4,      // avg baseline (1-5)
    agencyAfter: 4.2,       // avg exit (1-5)
    // Per-associate agency deltas for the distribution strip (illustrative)
    deltas: [1.3,2.1,1.7,0.8,2.4,1.9,1.2,2.0,1.5,2.2,1.0,1.8,2.3,1.6,0.9,2.1,1.4,1.9,2.5,1.1,1.7,2.0,1.3,1.8]
  },

  /* Breakthrough's real track record (as stated in the venture briefing).
     Presented separately from the demo cohort. */
  trackRecord: [
    { n: "700+", k: "associates supported to date" },
    { n: "95%+", k: "stay engaged after graduation" },
    { n: "~1%", k: "reoffending among justice-experienced associates" },
    { n: "1,000+", k: "people reached across all programmes" }
  ],

  socialValue: [
    "Corporates and government fund cohorts of NEET or justice-experienced young people.",
    "Associates use GenerationYAI free — they never pay.",
    "Funders receive measurable social value and live outcome data.",
    "Measurement is embedded in the product, not bolted on as a survey."
  ],

  /* ---- CHALLENGE FIT: the problem, in numbers ---- */
  challenge: [
    { n: "1m+", k: "16–24s not in education, employment or training (UK, Jan–Mar 2026)" },
    { n: "13.5%", k: "of the age group — first time past a million since 2013" },
    { n: "2 gaps", k: "a skills gap and, less often addressed, an agency gap" }
  ],

  /* ---- DIFFERENTIATORS: why us, not the alternatives ---- */
  differentiators: [
    { t: "We start with agency", d: "Most tools teach skills or match jobs. We begin with the belief that you can participate — and measure the shift." },
    { t: "Impact embedded, not bolted on", d: "The agency measure is part of the core loop, captured live at entry and exit — not a separate survey." },
    { t: "Built by lived experience", d: "Led by people who came through the justice system and low socio-economic disadvantage. Designed from inside the experience." },
    { t: "Compounds with the models", d: "Built on frontier foundation models — as they get more capable, so does every associate's companion." }
  ],

  /* ---- RESPONSIBLE AI: assessed by the prize and its partners ---- */
  responsibleAI: [
    { t: "Learn to question AI, not defer to it", d: "Associates direct the AI themselves, so they learn to spot bias and understand how it reaches decisions." },
    { t: "Your data, your rights", d: "UK GDPR by design — we collect only what we need, and teach associates how to make a data subject access request." },
    { t: "A human in the loop", d: "Age-appropriate safeguarding for under-18s, with a person alerted when a young person needs one — not a product." },
    { t: "We don't train on your data", d: "Built on established third-party foundation models. We never train models on young people's data." }
  ],

  /* ---- COMMERCIAL VIABILITY: the model already earns ---- */
  pipeline: [
    { org: "BT via MoJ", v: "£120k", d: "Social-value commitment, from Sept 2025" },
    { org: "MoJ-linked", v: "£32k", d: "12-week programme for justice-experienced people" },
    { org: "Local authorities", v: "Commissioned", d: "Employability for care-experienced cohorts" }
  ],
  tailwinds: [
    "Corporate & procurement social-value obligations are rising.",
    "Government employment support is being devolved and expanded — Connect to Work across dozens of local areas.",
    "Commissioning budgets are moving closer to the young people we serve."
  ],

  /* ---- IMPACT: social-value proxy (illustrative, transparent basis) ----
     Proxy unit values are indicative, in the spirit of social-value
     costing (e.g. unit-cost databases). NOT audited figures. */
  proxy: {
    perProgression: 4200,   // £ proxy value of a move into work/learning/enterprise
    perEngagement: 350,     // £ proxy value of sustained engagement
    label: "Illustrative social-value proxy — indicative unit values, not audited."
  },

  /* ---- IMPACT: longitudinal follow-up (framework, demo values) ---- */
  longitudinal: [
    { when: "At exit", pct: 63, note: "in or actively pursuing work, learning or enterprise" },
    { when: "6 months", pct: 58, note: "sustained progression (follow-up)" },
    { when: "12 months", pct: 54, note: "sustained progression (follow-up)" }
  ],

  /* ---- The prize's eight priority areas, and how ONE loop addresses each.
     Each maps to a concrete part of the product, not a claim. ---- */
  focusAreas: [
    { icon: "📚", area: "Learning & education access", how: "Free, no prerequisites, plain language. The companion meets each associate where they are and teaches by building — not passive lessons." },
    { icon: "🔑", area: "Re-engaging young people (NEET)", how: "Agency-first re-engagement for NEET and justice-experienced young people. Funded by others, so it's always free at the point of use." },
    { icon: "🤖", area: "AI literacy & digital skills", how: "Associates build a real AI tool and learn to direct — and question — AI. Literacy by doing, the skill that compounds." },
    { icon: "🌍", area: "Digital access & inclusion", how: "Runs in any browser on a modest device and connection. Low barriers, plain language, inclusive by design — background doesn't decide access." },
    { icon: "💼", area: "Future of work & employability", how: "Every associate leaves with something they built and a progress passport — evidence of capability, not just a certificate." },
    { icon: "🤝", area: "Inclusive recruitment & hiring", how: "The passport gives employers a fairer signal than a CV, and the matching layer connects to partner apprenticeships and roles." },
    { icon: "🧭", area: "Careers guidance & mentoring", how: "The companion coaches and reflects real next steps live, with a human mentor in the loop when a person is what's needed." },
    { icon: "💛", area: "Wellbeing & essential support", how: "Strength-based throughout, agency and self-efficacy measured, and a human alerted when a young person needs support — not a product." }
  ]
};
