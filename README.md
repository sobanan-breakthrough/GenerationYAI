# Break Through

**The AI learning companion by [Breakthrough Social Enterprise](https://wearebreakthrough.co.uk) — a working prototype.**

> People are not behind. Systems are.

**Live:** https://sobanan-breakthrough.github.io/GenerationYAI/

<sub>The repo and URL still use the original working title `GenerationYAI`; the product is **Break Through**.</sub>

![Walkthrough of Break Through](docs/walkthrough.gif)

*90-second walkthrough: an associate (Marcus) arrives, checks in, builds his own AI tool with the live companion, sees his measured distance travelled, gets his progress passport and mapped career routes — and the same session flows into the funder view.*

Break Through demonstrates its core loop in a single experience a panel can watch end to end:

1. **Build** — a live Claude companion sets a real, personal project and coaches an associate to build their **first AI tool**, then they talk to the tool they built ("I built this").
2. **Believe (agency)** — progress is made visible with an agency meter, milestones, and an **elemental companion creature** that evolves as they learn.
3. **Measure** — a six-item self-efficacy check-in at entry and exit captures **distance travelled**, and a **Funder dashboard** shows the B2B2C social-value data. Impact is embedded in the product, not bolted on.

Built for the **AI & Social Mobility Challenge Prize** (Social Tech Trust), tailored for **young people in cities across the UK** — informed by research into the NEET experience (dark-first UI, plain non-jargon voice, visible privacy, low-pressure interactions, mobile bottom nav).

## Five views

| Nav | What it shows |
|---|---|
| **Home** | The problem (Challenge Fit), the build/believe/measure loop, differentiators, responsible AI, all **eight** priority areas |
| **Start building** | The live 6-step associate journey (companion pick → baseline → build → talk to your tool → distance travelled → passport) |
| **Where next** | The **Career Navigator**: motivations/needs discovery → live AI context-building ("What I understand about you") → personalised route mapping |
| **Pathway** | How the companion grows with a young person *through adulthood*, on the **real 10-week AI Skills Bootcamp** curriculum and the **Silicocene** (Sobanan Narenthiran, 2024) |
| **Funder view** | Agency uplift, social-value proxy, longitudinal follow-up, measurement rigour, B2B2C model + pipeline, AI-generated impact summary |

---

## Run it

Static site — **no build step, no dependencies**.

```bash
cd GenerationYAI
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` in a browser.

## Connect the companion (required for live AI)

1. Click **⚙** (top right) → paste an Anthropic API key ([get one](https://console.anthropic.com/settings/keys)).
2. **Test connection** → **Save**. It persists in that browser.

The key lives **only in your browser** (`localStorage`) and goes **directly to Anthropic** — never to us or any server. See [`assets/js/api.js`](assets/js/api.js). **Never commit a key to this repo — it's public.**

## Developing

### Where things live

```
index.html              shell: top bar, bottom nav (mobile), settings modal, script includes
assets/css/styles.css   design system — dark-first tokens in :root, light theme under
                        :root[data-theme="light"]; components below
assets/js/data.js       ALL content/config: agency statements, milestones, XP values,
                        elements & evolution stages, personas, project ideas, motivations/
                        needs/route archetypes (navigator), curriculum, Silicocene, cohort,
                        focus areas, methodology
assets/js/creatures.js  GY_creature(element, stage, size) → SVG string for the companion art
assets/js/api.js        GY_API — Claude Messages API wrapper (key storage, chat(), friendly errors)
assets/js/app.js        everything else: hash router (#/ #/journey #/navigator #/pathway
                        #/funder), state (localStorage "gy_session"), the six journey steps,
                        career navigator, funder dashboard, theme toggle, settings modal
```

### Key conventions

- **State** is one object (`S`) persisted to `localStorage.gy_session` on every change (`save()`). `blank()` defines the shape. Clear it (or "Start over") to reset.
- **Routing** is hash-based; each view is a `render*()` function that replaces `#app`'s innerHTML and wires its own handlers. Add a view: add a nav link (`data-nav`), a route branch in `route()`, and a render function.
- **Content changes** (copy, personas, curriculum, XP tuning, route archetypes) almost always belong in `data.js`, not `app.js`.
- **Theming**: dark is the default. Add colours as CSS variables in **both** `:root` and `:root[data-theme="light"]`. Never hardcode a hex in components; use `var(--…)`. Text on yellow uses `var(--on-accent)`.
- **Cache-busting**: asset URLs carry `?v=N` in `index.html`. **Bump N whenever you change CSS/JS**, or browsers/CDN may serve stale files.
- **AI prompts** live in `app.js` as `BUILD_SYSTEM`, `EXTRACT_SYSTEM`, `NAV_SYSTEM`, `ROUTES_SYSTEM` — the companion's voice rules are inside them (plain British English, short turns, one question, no jargon/slang, milestone/context tags).
- **Companion tone rules** (from NEET research): no "empower/journey/potential/thrive", no hype, no forced slang, privacy stated plainly, nothing that feels like school or the jobcentre.

### Deploying

Push to `main` → GitHub Pages builds automatically (~30–60s):

```bash
git add -A && git commit -m "…" && git push origin main
```

Check: repo → Settings → Pages, or `gh api repos/sobanan-breakthrough/GenerationYAI/pages/builds/latest`.

## Demo script (≈2 minutes)

1. **Home** — the belief ("People are not behind. Systems are."), the loop, the eight areas.
2. **Start building** → tap **Marcus** (one-tap persona) → baseline check-in (pre-filled, low).
3. **Build** — the live companion coaches him to define his tool; milestones tick, creature gains XP.
4. **Talk to what you built** — Brand Buddy answers. *The "I built this" moment* (confetti).
5. **How far you've come** → **distance travelled** per statement (grey → yellow bars).
6. **Progress passport** — evolved companion, +uplift, Brand Buddy, matched next steps, CV line.
7. **Where next** — the context panel builds live as he talks; **mapped routes** with first steps.
8. **Funder view** — the same session appears in the live banner; generate the impact summary.

## A note on data

- The **associate journey** uses live Claude responses and your own inputs.
- The **funder cohort figures** are clearly labelled **illustrative demo data**.
- The **track-record figures** (700+ associates, 95%+ engagement, ~1% reoffending, 1,000+ reached) are from Breakthrough's venture record.
- The walkthrough GIF uses a staged session so every screen shows realistic content without an API key.

---

_Breaking Barriers, Building Futures._
