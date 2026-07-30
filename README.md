# GenerationYAI

**A working prototype of _Break Through_ — the AI learning companion by [Breakthrough Social Enterprise](https://wearebreakthrough.co.uk).**

> People are not behind. Systems are.

GenerationYAI demonstrates Break Through's core loop in a single experience a panel can watch end to end:

1. **Build** — a live Claude companion sets a real, personal project and coaches an associate to build their **first AI tool**, then they talk to the tool they built ("I built this").
2. **Believe (agency)** — progress is made visible with an agency meter and milestones, turning "this isn't for me" into "I can build this."
3. **Measure** — a six-item self-efficacy check-in at entry and exit captures **distance travelled**, and a **Funder dashboard** shows the B2B2C social-value data. Impact is embedded in the product, not bolted on.

Built for the **AI & Social Mobility Challenge Prize** (Social Tech Trust) interview demo, and tailored for **young people in cities across the UK**.

## Four views

- **Home** — the problem (Challenge Fit), the build/believe/measure loop, differentiators, responsible AI, and how one product addresses all **eight** of the prize's priority areas.
- **Start building** — the live associate journey (below).
- **Pathway** — how the companion grows with a young person *through adulthood*, grounded in Breakthrough's **real, delivered AI Skills Bootcamp** curriculum and the **Silicocene** philosophy (from Sobanan Narenthiran's book).
- **Funder view** — the impact and commercial story: agency uplift, an illustrative social-value proxy, longitudinal follow-up, measurement rigour, the B2B2C model and pipeline, plus an AI-generated funder impact summary.

---

## Run it

It's a static site — no build step.

**Locally:**
```bash
cd GenerationYAI
python3 -m http.server 8000
# open http://localhost:8000
```

**Live:** deployed via GitHub Pages (see the repo's Pages settings for the URL).

## Connect the companion

GenerationYAI runs on a **live Claude model** using a bring-your-own-key model:

1. Click the **⚙ (settings)** button, top right.
2. Paste an Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/settings/keys)).
3. Choose a model (Sonnet 5 recommended) and **Test connection**.

Your key is stored **only in your browser** (`localStorage`) and sent **directly to Anthropic** — never to Breakthrough or any third party. See [`assets/js/api.js`](assets/js/api.js).

## Demo script (≈2 minutes)

1. **Home** — the belief ("People are not behind. Systems are."), the build/believe/measure loop, and the eight priority areas.
2. **Start building** → tap a **ready-made associate** (Marcus / Amara / Kai) for a one-tap demo, or set up manually.
3. **Baseline check-in** — six agency statements (the measurement instrument). Pre-filled if you used a persona.
4. **Build** — the companion coaches you to define a tool; idea chips and voice input help; milestones tick and the agency meter fills.
5. **Talk to what you built** — chat with your own tool. *This is the "I built this" moment* (confetti included).
6. **How far you've come** — retake the six statements + a reflection → **distance travelled** shown per statement.
7. **Progress passport** — what you built, agency uplift, matched next steps, an AI-written CV line, printable.
8. **Pathway** — show how it grows through adulthood, on the real curriculum + the Silicocene.
9. **Funder view** — the same story as social-value data, with this session's associate shown live; generate an impact summary.

## Structure

```
index.html            # shell, top bar, settings modal
assets/css/styles.css  # brand system (Yellow #FFD000, Work Sans)
assets/js/data.js      # agency instrument, milestones, personas, curriculum, Silicocene, cohort
assets/js/api.js       # Claude Messages API wrapper (BYO key)
assets/js/app.js        # router, state, the six-step journey, pathway, funder dashboard
```

## A note on data

- The **associate journey** uses live Claude responses and your own inputs.
- The **funder cohort figures** are clearly labelled **illustrative demo data**.
- The **track-record figures** (700+ associates, 95%+ engagement, ~1% reoffending, 1,000+ reached) are from Breakthrough's venture record.

---

_Breaking Barriers, Building Futures._
