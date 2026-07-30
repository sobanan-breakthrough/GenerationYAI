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
  ],

  /* ---- GAMIFICATION: elemental companion creatures. Each represents an
     element and a strength; it grows and evolves as the associate learns.
     Three evolution stages, driven by XP earned across the journey. ---- */
  elements: [
    { key: "fire",  name: "Ember",  animal: "fox",   emoji: "🔥",
      strength: "Drive", blurb: "Passion and momentum — you get started and keep going.",
      c: { body: "#FF7A3C", belly: "#FFDCC2", dark: "#E24A1E", glow: "#FFB020", feat: "#FF5A2E" } },
    { key: "earth", name: "Root",   animal: "bear",  emoji: "🌱",
      strength: "Grit", blurb: "Grounded and persistent — you build things that last.",
      c: { body: "#6FBF59", belly: "#DDF0CC", dark: "#3F8F3A", glow: "#9BE86F", feat: "#4CAF50" } },
    { key: "water", name: "Ripple", animal: "otter", emoji: "💧",
      strength: "Flow", blurb: "Adaptable and calm — you find a way around anything.",
      c: { body: "#3FA9E0", belly: "#CFEBFB", dark: "#1F7FC0", glow: "#7FDFF5", feat: "#6FD0F0" } },
    { key: "air",   name: "Gust",   animal: "owl",   emoji: "🌬️",
      strength: "Curiosity", blurb: "Ideas and questions — you see what others miss.",
      c: { body: "#8FC3EC", belly: "#EAF5FD", dark: "#5E95C8", glow: "#CFE8FA", feat: "#FFFFFF" } },
    { key: "ether", name: "Nova",   animal: "star-deer", emoji: "✨",
      strength: "Vision", blurb: "Purpose and imagination — the spirit of the Silicocene.",
      c: { body: "#8A6FE0", belly: "#E9DEFB", dark: "#5E45B0", glow: "#C9A8FF", feat: "#F5C542" } }
  ],
  evoStages: [
    { min: 0,  name: "Spark",     note: "just hatched" },
    { min: 35, name: "Kindred",   note: "growing with you" },
    { min: 75, name: "Ascended",  note: "fully evolved" }
  ],
  /* XP awarded at each moment of progress (totals ~100 across the journey). */
  xp: { baseline: 15, milestone: 10, built: 15, tested: 15, exit: 25 },

  /* ---- CAREER NAVIGATOR: motivations, needs, and route archetypes.
     The AI builds context from these + conversation, then maps routes. ---- */
  motivations: [
    { k: "money",        emoji: "💷", label: "Money in my pocket" },
    { k: "independence", emoji: "🔑", label: "My own independence" },
    { k: "prove",        emoji: "💪", label: "Prove I can do it" },
    { k: "family",       emoji: "👨‍👩‍👧", label: "Support my family" },
    { k: "structure",    emoji: "🌅", label: "Structure — get out the house" },
    { k: "purpose",      emoji: "❤️", label: "Do something I care about" },
    { k: "freshstart",   emoji: "🌱", label: "A fresh start" },
    { k: "unsure",       emoji: "🤔", label: "Not sure yet — help me work it out" }
  ],
  needs: [
    { k: "soon",     label: "Money coming in soon" },
    { k: "flexible", label: "Flexible hours" },
    { k: "local",    label: "Close to home or remote" },
    { k: "noexp",    label: "No experience needed" },
    { k: "wellbeing",label: "Works around my head" },
    { k: "caring",   label: "Around looking after someone" },
    { k: "nocv",     label: "I haven't got a CV yet" }
  ],
  /* Archetypes the AI draws on when mapping routes (it personalises these). */
  routeArchetypes: [
    { k: "income",  title: "Get earning soon", note: "roles you can start with little/no experience" },
    { k: "earnlearn", title: "Earn while you learn", note: "apprenticeships & traineeships — wage + a qualification" },
    { k: "learnfirst", title: "Build skills first", note: "short free courses like our AI Skills Bootcamp, then apply" },
    { k: "buildown", title: "Build your own thing", note: "self-employment, a brand, freelancing, content" },
    { k: "steady",  title: "Steady yourself first", note: "proper support around you, so the rest can follow" }
  ],

  /* ---- Ready-made associates for an instant, reliable live demo.
     Real-feeling urban UK youth; baselines start low on agency. ---- */
  personas: [
    { name: "Marcus", city: "Birmingham", age: 19, el: "fire",
      start: "Never really used AI — didn't think it was for someone like me",
      goal: "Start my own clothing brand",
      baseline: [3, 2, 2, 2, 1, 2] },
    { name: "Amara", city: "London", age: 17, el: "air",
      start: "Used ChatGPT a bit for college, but that's it",
      goal: "Get into a job in tech — I just don't know how",
      baseline: [3, 3, 2, 2, 2, 2] },
    { name: "Kai", city: "Manchester", age: 20, el: "ether",
      start: "Not for people like me — I've got a record",
      goal: "Prove I can build something, and show my little brother it's possible",
      baseline: [2, 2, 2, 1, 1, 1] }
  ],

  /* Quick project ideas — chips that spark the build. */
  projectIdeas: [
    "A helper for my clothing brand",
    "Something to help me find work",
    "A tutor for my college work",
    "A tool to plan my content",
    "Help writing my CV",
    "A budgeting buddy"
  ],

  /* ---- SILICOCENE: the philosophy underneath the product.
     From "The Silicocene: A New Epoch in History" by Sobanan Narenthiran (2024). ---- */
  silicocene: {
    definition: "The epoch after the Anthropocene. Where the last age was defined by extraction — of resources, of labour, of human potential — the Silicocene can be defined by co-evolution, ethics and collective empowerment.",
    invitation: "If intelligence is no longer scarce, if energy can be clean, if knowledge can be free — what excuse remains for leaving anyone behind?",
    attribution: "From The Silicocene: A New Epoch in History, by Sobanan Narenthiran, Breakthrough's founder — who first learned about the future of technology from a prison cell. It is not a prediction. It is an invitation.",
    principles: [
      { t: "Technology is never neutral", d: "It always lands somewhere, on someone. For those with capital and networks each wave is a ladder; for those without, a wall. We change who it lands on." },
      { t: "Equity is a precondition, not charity", d: "In the Silicocene, including the excluded isn't a nice-to-have added at the end — it's a design requirement from the start." },
      { t: "You don't need to live in Silicon Valley", d: "From a block in London to an estate in Manchester — the future belongs to builders everywhere, not just a postcode." },
      { t: "Where job skills meet soul skills", d: "Technological fluency and inner work — purpose, resilience, values — grow together. We equip the whole person, not just the worker." }
    ]
  },

  /* ---- THE PATHWAY: GenerationYAI grows with a young person, from a
     first win into adulthood. Mapped to the four-phase arc that runs through
     Breakthrough's real programmes: Foundation → Fluency → Application →
     Transition — plus the whole-person support that surrounds it. ---- */
  pathway: [
    { stage: "01", title: "Meet you where you are", now: true, phase: "Foundation",
      what: "Purpose first. Like week one of our bootcamp — Ikigai, a letter to your future self, a personal plan — then your first real win: build an AI tool that's yours, and watch \"this isn't for me\" become \"I built this.\"",
      agency: "Belief that you can start." },
    { stage: "02", title: "Fluency & ethics", phase: "Core learning",
      what: "Real fluency with AI: prompt and context engineering, generative AI and branding — and how to question it. AI ethics runs throughout, co-designed with IBM and CGI, so you lead the technology, not the other way round.",
      agency: "Judgement — you direct AI, and you know your rights." },
    { stage: "03", title: "Build a body of work", phase: "Application",
      what: "Automations, marketing and content, real projects that matter to you — collected into a portfolio you own. Learn by building something real, not by watching lessons.",
      agency: "Proof — evidence of what you can do." },
    { stage: "04", title: "Work-ready", phase: "Transition",
      what: "Strategy and business planning, pitching with AI and human connection, CV audits and mock interviews with real employers — and a progress passport that speaks for you.",
      agency: "Readiness — you can walk into the room." },
    { stage: "05", title: "Into opportunity", phase: "Transition",
      what: "Presentation day, then a next step you chose: genuine apprenticeships and jobs with real employers, or support to start your own thing.",
      agency: "Momentum — you're moving." },
    { stage: "06", title: "For life, not one programme", phase: "Belonging",
      what: "Money, wellbeing and navigating adult systems — the inner work for outer change. And the door stays open: 95%+ of associates stay in the community, and around a third of our team first came through it.",
      agency: "Belonging — you're not on your own." }
  ],

  /* ---- The real, delivered curriculum behind the product.
     Breakthrough's AI Skills Bootcamp — a UK Skills Bootcamp provision. ---- */
  curriculum: {
    name: "AI Skills Bootcamp",
    meta: "A real, delivered UK Skills Bootcamp · 10 weeks · learn-by-building · ethics throughout",
    modules: [
      "AI foundations & personal planning",
      "Prompt & context engineering",
      "Generative AI & branding",
      "AI ethics (co-designed with IBM & CGI)",
      "AI automations & productivity",
      "AI in marketing & content",
      "Strategy & business planning with AI",
      "Pitching with AI & human connection",
      "Careers & employability",
      "Presentation day & progression"
    ]
  },

  /* ---- Measurement rigour: how we measure agency ---- */
  methodology: [
    { t: "A self-efficacy scale", d: "Six items adapted from established general self-efficacy research — the belief you can act and reach goals, a validated driver of social mobility." },
    { t: "Entry and exit, every time", d: "Captured at the start and end of the loop for every associate — so distance travelled is measured, not assumed." },
    { t: "Embedded, not surveyed", d: "The check-in is part of the experience, which is why completion is near-total rather than the low return of a bolt-on survey." },
    { t: "Triangulated", d: "The quantitative shift sits alongside what was built, qualitative reflection, and 6- and 12-month progression follow-up." }
  ]
};
