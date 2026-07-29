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
  ]
};
