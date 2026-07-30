/* ============================================================
   GenerationYAI — application
   A working prototype of Break Through: build a real AI tool,
   build agency, and measure the shift — all in one loop.
   ============================================================ */

(function () {
  const D = window.GY_DATA;
  const API = window.GY_API;
  const app = document.getElementById("app");

  /* ---------------- State ---------------- */
  const LS = "gy_session";
  const blank = () => ({
    name: "", startingPoint: "", goal: "",
    step: 0,
    baseline: Array(D.agencyStatements.length).fill(null),
    exit: Array(D.agencyStatements.length).fill(null),
    milestones: { purpose: false, audience: false, brain: false, test: false },
    buildChat: [],   // visible transcript, starts with companion opening
    tool: null,      // { name, purpose, audience, personality, instructions }
    toolChat: [],    // visible transcript with the built tool
    reflection: "",  // qualitative distance travelled (their own words)
    exitDone: false,
    uplift: null
  });
  let S = load();

  function load() {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(LS) || "{}")); }
    catch { return blank(); }
  }
  function save() { localStorage.setItem(LS, JSON.stringify(S)); }
  function reset() { S = blank(); save(); location.hash = "#/"; }

  /* ---------------- Journey steps ---------------- */
  const STEPS = [
    { key: "welcome", label: "Welcome" },
    { key: "baseline", label: "Where you're starting" },
    { key: "build", label: "Build your tool" },
    { key: "tool", label: "Talk to what you built" },
    { key: "exit", label: "How far you've come" },
    { key: "passport", label: "Your progress passport" }
  ];

  /* ---------------- Helpers ---------------- */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const stripMarkers = t => String(t).replace(/\[\[[^\]]*\]\]/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const avg = arr => { const v = arr.filter(x => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; };
  const buildProgress = () => {
    const m = S.milestones; const done = ["purpose", "audience", "brain", "test"].filter(k => m[k]).length;
    return Math.round(done / 4 * 100);
  };
  function scrollLog() { const l = document.querySelector(".chat-log"); if (l) l.scrollTop = l.scrollHeight; }

  /* ---------------- Router ---------------- */
  function route() {
    const h = location.hash || "#/";
    document.querySelectorAll(".topnav a").forEach(a => a.classList.remove("active"));
    if (h.startsWith("#/journey")) { markNav("journey"); renderJourney(); }
    else if (h.startsWith("#/pathway")) { markNav("pathway"); renderPathway(); }
    else if (h.startsWith("#/funder")) { markNav("funder"); renderFunder(); }
    else { markNav("home"); renderHome(); }
    window.scrollTo(0, 0);
  }
  function markNav(k) { const a = document.querySelector(`.topnav a[data-nav="${k}"]`); if (a) a.classList.add("active"); }
  window.addEventListener("hashchange", route);

  /* =====================================================================
     HOME
     ===================================================================== */
  function renderHome() {
    const resumed = S.name && S.step > 0;
    app.innerHTML = `
    <section class="hero">
      <div class="wrap">
        <div>
          <span class="eyebrow">Breakthrough Social Enterprise</span>
          <h1>The AI companion that helps you build&nbsp;— and believe you can.</h1>
          <p class="lede">Wherever you're from — a block in London, an estate in Manchester, anywhere across the UK — GenerationYAI meets you where you are and teaches by building. You'll make a real AI tool of your own, see how far you've come, and take the next step. Always free for you.</p>
          <div class="hero-cta">
            <a class="btn btn-primary btn-lg" href="#/journey">${resumed ? "Continue building" : "Start building"} →</a>
            <a class="btn btn-ghost btn-lg" href="#/funder">See the impact view</a>
          </div>
          <div class="flex flex-wrap" style="margin-top:1.4rem">
            <span class="pill"><span class="dot"></span> Live AI companion</span>
            <span class="pill"><span class="dot"></span> Agency measured in-product</span>
            <span class="pill"><span class="dot"></span> Built with associates, not for them</span>
          </div>
        </div>
        <div class="belief">
          <span class="eyebrow" style="color:rgba(255,255,255,.6)">Our core belief</span>
          <p class="big">People are not behind.<br><strong>Systems are.</strong></p>
          <hr class="divider" style="background:rgba(255,255,255,.15)">
          <p class="muted" style="margin:0">The binding constraint isn't only skill — it's agency: the belief you can participate, and the tools to act on it. GenerationYAI builds both.</p>
        </div>
      </div>
    </section>

    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">How it works</span>
        <h2>One loop: build, believe, measure.</h2>
        <p>Most tools teach skills, or match people to jobs. We start with agency — and measure the shift as part of the core experience, not a bolted-on survey.</p>
      </div>
      <div class="grid grid-3">
        <div class="card pillar">
          <div class="num">1</div><h3>Build</h3>
          <p>A live AI companion sets a real, personal project and coaches you through it — until you've built something that works and is yours.</p>
        </div>
        <div class="card pillar">
          <div class="num">2</div><h3>Believe</h3>
          <p>Progress is made visible as you go. "This isn't for me" turns into "I built this" — and the next step feels possible.</p>
        </div>
        <div class="card pillar">
          <div class="num">3</div><h3>Measure</h3>
          <p>A short agency check-in at the start and end captures your <em>distance travelled</em> — confidence, capability, and what you'll do next.</p>
        </div>
      </div>

      <div class="challenge-band mt-2">
        <div>
          <span class="eyebrow" style="color:rgba(255,255,255,.6)">The challenge</span>
          <h2 style="color:#fff;max-width:20ch">A generation is being locked out of the AI economy.</h2>
          <p class="muted" style="color:rgba(255,255,255,.72)">The barrier isn't ability. It's structural — unequal access, thin networks, and a belief that "this isn't for people like me." As AI collapses the cost of building, the decisive question is who believes they're allowed to participate.</p>
        </div>
        <div class="grid grid-3" style="gap:1rem">
          ${D.challenge.map(c => `<div class="stat"><div class="n" style="color:var(--yellow)">${esc(c.n)}</div><div class="k" style="color:rgba(255,255,255,.7)">${esc(c.k)}</div></div>`).join("")}
        </div>
      </div>

      <div class="section-head mt-2">
        <span class="eyebrow">Why us, not the alternatives</span>
        <h2>What makes GenerationYAI different.</h2>
      </div>
      <div class="grid grid-2">
        ${D.differentiators.map(d => `<div class="card"><h3 style="font-size:1.05rem">${esc(d.t)}</h3><p class="mb-0 muted">${esc(d.d)}</p></div>`).join("")}
      </div>

      <div class="card mt-2">
        <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline">
          <div><span class="eyebrow">Responsible by design</span><h3 class="mb-0">AI used to liberate, not to defer to.</h3></div>
          <a class="link-quiet" href="#/funder">See the full approach →</a>
        </div>
        <div class="grid grid-2 mt-1">
          ${D.responsibleAI.map(r => `<div class="flex" style="align-items:flex-start;gap:.6rem"><span class="check">✓</span><div><strong style="font-size:.95rem">${esc(r.t)}</strong><div class="muted" style="font-size:.88rem">${esc(r.d)}</div></div></div>`).join("")}
        </div>
      </div>

      <div class="section-head mt-2">
        <span class="eyebrow">Built for young people in cities across the UK</span>
        <h2>One product, eight fronts.</h2>
        <p>The panel named eight priority areas. GenerationYAI is designed to move all of them at once — for young people in London, Manchester, Birmingham, Glasgow and every city in between — because in a young person's real life they were never separate problems.</p>
      </div>
      <div class="grid grid-2">
        ${D.focusAreas.map(f => `
          <div class="card focus-card">
            <div class="focus-ico">${f.icon}</div>
            <div><h3 style="font-size:1rem;margin-bottom:.15rem">${esc(f.area)}</h3>
            <p class="mb-0 muted" style="font-size:.9rem">${esc(f.how)}</p></div>
          </div>`).join("")}
      </div>

      <div class="card card-flat mt-2 stack">
        <div class="flex flex-wrap" style="justify-content:space-between">
          <div>
            <span class="eyebrow">The demo in 90 seconds</span>
            <h3 class="mb-0">Watch an associate go from arrival to "I built this."</h3>
          </div>
          <a class="btn btn-dark" href="#/journey">Run the journey →</a>
        </div>
        <p class="mb-0 muted">You'll set up as an associate, complete a baseline agency check-in, build your own AI tool with the companion, talk to the thing you built, then see your measured distance travelled and next steps. ${API.hasKey() ? "" : "First, connect a Claude key with the ⚙ button, top right."}</p>
      </div>
    </div>`;
    if (!API.hasKey()) flashSettingsHint();
  }

  /* =====================================================================
     JOURNEY shell + stepper + agency meter
     ===================================================================== */
  function renderJourney() {
    if (!STEPS[S.step]) S.step = 0;
    app.innerHTML = `
    <div class="wrap">
      <div class="journey">
        <aside class="rail">
          <div class="card" style="padding:1rem">
            <span class="eyebrow">Your journey</span>
            <ul class="stepper" id="stepper"></ul>
          </div>
          <div class="meter-card" style="margin-top:1rem">
            <h4>Agency meter</h4>
            <span class="muted">Progress you can see</span>
            <div class="meter-track"><div class="meter-fill" id="meterFill"></div></div>
            <span class="meter-val" id="meterVal">0%</span>
          </div>
          <button class="btn btn-ghost" style="width:100%;margin-top:1rem;font-size:.85rem" id="restartBtn">Start over</button>
        </aside>
        <section class="panel fade-in" id="panel"></section>
      </div>
    </div>`;
    document.getElementById("restartBtn").onclick = () => { if (confirm("Start the journey again from scratch?")) reset(); };
    renderStepper();
    updateMeter();
    renderStep();
  }

  function renderStepper() {
    const ul = document.getElementById("stepper");
    if (!ul) return;
    ul.innerHTML = STEPS.map((s, i) => {
      const cls = i < S.step ? "done" : i === S.step ? "current" : "";
      const tick = i < S.step ? "✓" : (i + 1);
      return `<li class="${cls}"><span class="tick">${tick}</span>${esc(s.label)}</li>`;
    }).join("");
  }

  function updateMeter() {
    const fill = document.getElementById("meterFill");
    const val = document.getElementById("meterVal");
    if (!fill) return;
    const p = buildProgress();
    fill.style.width = p + "%";
    val.textContent = p + "%";
  }

  function goStep(i) { S.step = Math.max(0, Math.min(STEPS.length - 1, i)); save(); renderStepper(); updateMeter(); renderStep(); window.scrollTo(0, 0); }

  function renderStep() {
    const key = STEPS[S.step].key;
    ({ welcome: stepWelcome, baseline: stepBaseline, build: stepBuild, tool: stepTool, exit: stepExit, passport: stepPassport })[key]();
  }

  /* ---------- Step 0: Welcome ---------- */
  function stepWelcome() {
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 1 of 6 · Welcome</span></div>
      <h2>Let's start with you.</h2>
      <p>No right answers here. This just helps your companion meet you where you are. You'll always be treated as an associate — a capable adult with something to build.</p>

      <div class="card demo-launcher no-print">
        <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline;gap:.5rem">
          <div><span class="eyebrow">Just here to look? Start in one tap</span><h3 class="mb-0" style="font-size:1.05rem">Step into a ready-made associate</h3></div>
        </div>
        <div class="grid grid-3 mt-1" style="gap:.7rem">
          ${D.personas.map((pn, i) => `
            <button class="persona" data-i="${i}">
              <strong>${esc(pn.name)}, ${pn.age}</strong>
              <span class="muted">${esc(pn.city)}</span>
              <span class="persona-goal">“${esc(pn.goal)}”</span>
            </button>`).join("")}
        </div>
      </div>

      <p class="center muted" style="margin:1.2rem 0 .6rem">— or set yourself up —</p>

      <div class="card stack">
        <div>
          <label class="field-label" for="nm">What should we call you?</label>
          <input class="text-input" id="nm" placeholder="First name or nickname" value="${esc(S.name)}" />
        </div>
        <div>
          <label class="field-label" for="sp">Where are you starting from with tech and AI?</label>
          <input class="text-input" id="sp" placeholder="e.g. never really used AI, not sure it's for me" value="${esc(S.startingPoint)}" />
        </div>
        <div>
          <label class="field-label" for="gl">What would you love to be able to do, or change?</label>
          <input class="text-input" id="gl" placeholder="e.g. get into work, start a brand, level up my content, help my ends" value="${esc(S.goal)}" />
        </div>
        <div class="flex" style="justify-content:flex-end">
          <button class="btn btn-primary" id="next0">Continue →</button>
        </div>
      </div>`;
    document.getElementById("next0").onclick = () => {
      S.name = document.getElementById("nm").value.trim() || "friend";
      S.startingPoint = document.getElementById("sp").value.trim();
      S.goal = document.getElementById("gl").value.trim();
      save(); goStep(1);
    };
    document.querySelectorAll(".persona").forEach(b => b.onclick = () => {
      const pn = D.personas[+b.dataset.i];
      S.name = pn.name; S.startingPoint = pn.start; S.goal = pn.goal;
      S.baseline = pn.baseline.slice();
      save(); goStep(1);
    });
  }

  /* ---------- Steps 1 & 4: Agency check-in ---------- */
  function renderLikert(which) {
    const answers = S[which];
    return D.agencyStatements.map((st, i) => `
      <div class="likert-item">
        <p>${esc(st)}</p>
        <div class="likert-scale" data-idx="${i}">
          ${D.likertLabels.map(l => `
            <label class="${answers[i] === l.v ? "sel" : ""}" data-v="${l.v}">
              <input type="radio" name="${which}-${i}" value="${l.v}" ${answers[i] === l.v ? "checked" : ""}>
              <span>${l.v}</span><br><span style="font-size:.7rem">${esc(l.t)}</span>
            </label>`).join("")}
        </div>
      </div>`).join("");
  }

  function wireLikert(which, onChange) {
    document.querySelectorAll(`.likert-scale`).forEach(scale => {
      const idx = +scale.dataset.idx;
      scale.querySelectorAll("label").forEach(lab => {
        lab.onclick = () => {
          S[which][idx] = +lab.dataset.v;
          scale.querySelectorAll("label").forEach(x => x.classList.remove("sel"));
          lab.classList.add("sel");
          save(); onChange && onChange();
        };
      });
    });
  }

  function stepBaseline() {
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 2 of 6 · Baseline check-in</span></div>
      <h2>How does this feel right now, ${esc(S.name)}?</h2>
      <p>There are no wrong answers — this is honest, and just for you. We'll ask the same six things at the end to show how far you've come.</p>
      <div class="card">
        ${renderLikert("baseline")}
      </div>
      <div class="flex mt-1" style="justify-content:space-between">
        <button class="btn btn-ghost" id="back1">← Back</button>
        <button class="btn btn-primary" id="next1" disabled>Meet your companion →</button>
      </div>`;
    const check = () => { document.getElementById("next1").disabled = S.baseline.some(x => x == null); };
    wireLikert("baseline", check); check();
    document.getElementById("back1").onclick = () => goStep(0);
    document.getElementById("next1").onclick = () => goStep(2);
  }

  /* ---------- Step 2: Build (companion-guided) ---------- */
  const BUILD_SYSTEM = () => `You are the GenerationYAI learning companion, made by Breakthrough Social Enterprise. You are coaching a young person (an "associate") to build their very first AI tool — a simple custom assistant they will actually use.

WHO YOU ARE TALKING TO: ${S.name}. Where they're starting from: "${S.startingPoint || "not sure AI is for them"}". What they want: "${S.goal || "not sure yet"}".

YOUR JOB: guide them, in plain warm language, to define ONE simple AI tool of their own. Coach them through three things, in this order, ONE at a time:
1) PURPOSE — what real thing should the tool help with? (tie it to something that matters to them)
2) AUDIENCE — who is it for? (themselves, or people like them)
3) BRAIN — how should it behave / what should it do and say?

WHO YOU'RE SPEAKING WITH: young people in cities across the UK, many from underserved communities — some NEET, some with justice or care experience. Be culturally aware and real. Draw examples from things that matter in their world (getting into work, money, starting a business or brand, music, content, sport, their area/community). Never force slang, never stereotype, never talk down — respect always.

HOW TO TALK:
- Warm, grounded, real. Speak to them as a capable adult, never as a child or a "student".
- Modern, natural British English. Plain words, short sentences. Match their energy without putting it on.
- Strength-based: reflect back their ideas as good ones. Turn "this isn't for me" into "you're already doing it".
- Keep every reply SHORT: 2–4 sentences, then ONE clear question. Never lecture, never list steps.
- Use their name occasionally.

MILESTONE TAGS (invisible to them): when the associate has, in their own words, settled one of the three, append the matching tag on its own final line. Emit each tag only ONCE, only when genuinely met:
[[MILESTONE:purpose]]  [[MILESTONE:audience]]  [[MILESTONE:brain]]
When all three are settled, also append [[READY]]. Never mention the tags or the word "milestone" in what they read.`;

  const KICKOFF = () => `[SESSION START. The associate ${S.name} has just arrived. Greet them warmly by name in 2 short sentences, name that you'll build a real AI tool together that is theirs, and ask the ONE first question to help them choose what it should help with — nudged by their goal ("${S.goal || "open"}"). Keep it under 4 sentences. Do not list steps.]`;

  function buildApiMessages(extra) {
    // Prepend the hidden kickoff/primer as messages[0] (role user) so the
    // transcript (which opens with the companion) alternates validly.
    const msgs = [{ role: "user", content: KICKOFF() }];
    S.buildChat.forEach(m => msgs.push({ role: m.role, content: m.content }));
    if (extra) msgs.push(extra);
    return msgs;
  }

  function stepBuild() {
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 3 of 6 · Build your first AI tool</span></div>
      <h2>Let's build something that's yours.</h2>
      <div class="milestones" id="ms"></div>
      <div class="card">
        <div class="chat">
          <div class="chat-log" id="log"></div>
          <div class="ideas no-print" id="ideas"></div>
          <div class="composer">
            <textarea id="ci" placeholder="Type your reply…" rows="1"></textarea>
            <button class="btn btn-ghost mic" id="mic" title="Talk instead of type" aria-label="Voice input">🎤</button>
            <button class="btn btn-primary" id="send">Send</button>
          </div>
        </div>
      </div>
      <div class="flex mt-1" style="justify-content:space-between">
        <button class="btn btn-ghost" id="backB">← Back</button>
        <button class="btn btn-dark hidden" id="toTool">Build my tool →</button>
      </div>`;
    renderMilestones();
    renderIdeas();
    wireMic("mic", "ci");
    document.getElementById("backB").onclick = () => goStep(1);
    document.getElementById("toTool").onclick = buildTheTool;

    const ci = document.getElementById("ci");
    ci.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendBuild(); } });
    ci.addEventListener("input", () => { ci.style.height = "auto"; ci.style.height = Math.min(ci.scrollHeight, 140) + "px"; });
    document.getElementById("send").onclick = sendBuild;

    // Render existing transcript, or open with a live greeting.
    if (S.buildChat.length === 0) {
      if (!API.hasKey()) { openSettings(); addBubble("log", "ai", "Connect a Claude key with the ⚙ button (top right) and I'll come to life — then we'll build your first AI tool together.", "Companion"); return; }
      openCompanion();
    } else {
      S.buildChat.forEach(m => addBubble("log", m.role === "assistant" ? "ai" : "user", stripMarkers(m.content), m.role === "assistant" ? "Companion" : S.name));
      maybeShowToTool();
    }
  }

  function renderMilestones() {
    const box = document.getElementById("ms");
    if (!box) return;
    box.innerHTML = D.milestones.map(m => `
      <div class="ms ${S.milestones[m.id] ? "done" : ""}">
        <span class="box">${S.milestones[m.id] ? "✓" : ""}</span>
        <span class="lbl">${esc(m.label)}</span>
      </div>`).join("");
  }

  function renderIdeas() {
    const box = document.getElementById("ideas");
    if (!box) return;
    const userTurns = S.buildChat.filter(m => m.role === "user").length;
    if (userTurns >= 1) { box.innerHTML = ""; return; }
    box.innerHTML = `<span class="ideas-label">Not sure? Tap an idea:</span>` +
      D.projectIdeas.map(t => `<button class="chip" type="button">${esc(t)}</button>`).join("");
    box.querySelectorAll(".chip").forEach(c => c.onclick = () => {
      const ci = document.getElementById("ci");
      ci.value = c.textContent; ci.focus();
      ci.dispatchEvent(new Event("input"));
    });
  }

  /* Voice input — "talk instead of type" (digital inclusion).
     Uses the Web Speech API; hides itself where unavailable. */
  function wireMic(btnId, taId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { btn.style.display = "none"; return; }
    let rec = null, on = false;
    btn.onclick = () => {
      if (on && rec) { rec.stop(); return; }
      rec = new SR(); rec.lang = "en-GB"; rec.interimResults = true; rec.continuous = false;
      const ta = document.getElementById(taId);
      const base = ta.value ? ta.value.trim() + " " : "";
      rec.onstart = () => { on = true; btn.classList.add("rec"); };
      rec.onerror = () => { on = false; btn.classList.remove("rec"); };
      rec.onend = () => { on = false; btn.classList.remove("rec"); };
      rec.onresult = e => {
        let t = ""; for (const r of e.results) t += r[0].transcript;
        ta.value = base + t; ta.dispatchEvent(new Event("input"));
      };
      try { rec.start(); } catch (_) {}
    };
  }

  function addBubble(logId, cls, text, who) {
    const log = document.getElementById(logId);
    if (!log) return null;
    const b = document.createElement("div");
    b.className = "msg " + cls;
    b.innerHTML = `<span class="who">${esc(who)}</span>`;
    const span = document.createElement("span");
    span.textContent = text;
    b.appendChild(span);
    log.appendChild(b);
    scrollLog();
    return b;
  }

  function addTyping(logId) {
    const log = document.getElementById(logId);
    const b = document.createElement("div");
    b.className = "msg ai";
    b.innerHTML = `<span class="typing"><span></span><span></span><span></span></span>`;
    log.appendChild(b); scrollLog();
    return b;
  }

  async function openCompanion() {
    const t = addTyping("log");
    try {
      const txt = await API.chat(buildApiMessages(), { system: BUILD_SYSTEM(), temperature: 0.7, max_tokens: 400 });
      t.remove();
      handleCompanionReply(txt);
    } catch (err) {
      t.remove();
      addBubble("log", "ai", API.friendly(err), "Companion");
    }
  }

  async function sendBuild() {
    const ci = document.getElementById("ci");
    const text = ci.value.trim();
    if (!text) return;
    if (!API.hasKey()) { openSettings(); return; }
    ci.value = ""; ci.style.height = "auto";
    document.getElementById("send").disabled = true;
    addBubble("log", "user", text, S.name);
    S.buildChat.push({ role: "user", content: text }); save();
    const t = addTyping("log");
    try {
      const txt = await API.chat(buildApiMessages(), { system: BUILD_SYSTEM(), temperature: 0.7, max_tokens: 400 });
      t.remove();
      handleCompanionReply(txt);
    } catch (err) {
      t.remove();
      addBubble("log", "ai", API.friendly(err), "Companion");
    } finally {
      document.getElementById("send").disabled = false;
      document.getElementById("ci").focus();
    }
  }

  function handleCompanionReply(raw) {
    // Detect milestone tags
    ["purpose", "audience", "brain"].forEach(k => {
      if (new RegExp(`\\[\\[MILESTONE:${k}\\]\\]`, "i").test(raw) && !S.milestones[k]) {
        S.milestones[k] = true;
      }
    });
    const clean = stripMarkers(raw);
    S.buildChat.push({ role: "assistant", content: raw }); save();
    addBubble("log", "ai", clean, "Companion");
    renderMilestones(); updateMeter();
    maybeShowToTool();
  }

  function maybeShowToTool() {
    const m = S.milestones;
    const assistantTurns = S.buildChat.filter(x => x.role === "assistant").length;
    const ready = (m.purpose && m.audience && m.brain) || assistantTurns >= 6;
    const btn = document.getElementById("toTool");
    if (btn && ready) btn.classList.remove("hidden");
  }

  const EXTRACT_SYSTEM = `You turn a coaching conversation into a working AI tool spec. Output ONLY valid minified JSON, no prose, no code fences. Keys:
"name": a short friendly name for the tool (2-4 words),
"purpose": one sentence on what it helps with,
"audience": who it's for (a few words),
"personality": 2-3 adjectives,
"instructions": the system prompt FOR the tool itself, written as its brief in second person ("You are…"), 3-6 sentences, warm and genuinely useful, reflecting everything the associate decided.`;

  async function buildTheTool() {
    const btn = document.getElementById("toTool");
    btn.disabled = true; btn.textContent = "Building your tool…";
    const messages = buildApiMessages({
      role: "user",
      content: "Based on everything we've decided together, produce the spec for my tool now."
    });
    try {
      const raw = await API.chat(messages, { system: EXTRACT_SYSTEM, temperature: 0.2, max_tokens: 600 });
      S.tool = parseTool(raw);
      S.milestones.brain = true;
      save();
      goStep(3);
    } catch (err) {
      btn.disabled = false; btn.textContent = "Build my tool →";
      addBubble("log", "ai", API.friendly(err), "Companion");
    }
  }

  function parseTool(raw) {
    try {
      const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
      const obj = JSON.parse(raw.slice(s, e + 1));
      return {
        name: obj.name || "My AI Helper",
        purpose: obj.purpose || "",
        audience: obj.audience || "",
        personality: obj.personality || "",
        instructions: obj.instructions || "You are a warm, helpful assistant built by an associate at Breakthrough. Help clearly and kindly, one step at a time."
      };
    } catch {
      return {
        name: "My AI Helper",
        purpose: S.goal || "helping with everyday things",
        audience: "me and people like me",
        personality: "warm, clear, encouraging",
        instructions: `You are a warm, encouraging assistant built by ${S.name}. Help with ${S.goal || "everyday tasks"} in plain language, one step at a time. Be genuinely useful and never condescending.`
      };
    }
  }

  /* ---------- Step 3: Talk to the tool you built ---------- */
  function toolApiMessages(extra) {
    const seed = { role: "user", content: "Introduce yourself in one or two friendly sentences and ask how you can help today." };
    const msgs = [seed];
    S.toolChat.forEach(m => msgs.push({ role: m.role, content: m.content }));
    if (extra) msgs.push(extra);
    return msgs;
  }

  function stepTool() {
    if (!S.tool) { goStep(2); return; }
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 4 of 6 · Talk to what you built</span></div>
      <h2>Meet “${esc(S.tool.name)}” — built by you.</h2>
      <p class="notice">✨ You just directed an AI to build a working tool. This is <strong>yours</strong>. Try it out — every message proves it works.</p>
      <div class="card" style="margin-top:1rem">
        <div class="flex" style="justify-content:space-between;align-items:flex-start">
          <div>
            <span class="tag">${esc(S.tool.audience || "for you")}</span>
            <span class="tag">${esc(S.tool.personality || "helpful")}</span>
          </div>
          <button class="btn btn-ghost" id="peek" style="font-size:.8rem">See its brain</button>
        </div>
        <p class="muted" id="brainBox" style="margin:.6rem 0 0;display:none;white-space:pre-wrap"></p>
        <div class="divider"></div>
        <div class="chat">
          <div class="chat-log" id="tlog"></div>
          <div class="composer">
            <textarea id="tci" placeholder="Ask your tool something…" rows="1"></textarea>
            <button class="btn btn-ghost mic" id="tmic" title="Talk instead of type" aria-label="Voice input">🎤</button>
            <button class="btn btn-primary" id="tsend">Send</button>
          </div>
        </div>
      </div>
      <div class="notice" style="margin-top:1rem">🧭 <strong>You're in charge of it.</strong> Notice what it gets right — and what it doesn't. Learning to question AI is part of the skill. Your messages stay in your browser, and you can clear them any time.</div>
      <div class="flex mt-1" style="justify-content:space-between">
        <button class="btn btn-ghost" id="backT">← Back to build</button>
        <button class="btn btn-primary" id="toExit">See how far I've come →</button>
      </div>`;

    const peek = document.getElementById("peek"), brainBox = document.getElementById("brainBox");
    peek.onclick = () => {
      const show = brainBox.style.display === "none";
      brainBox.style.display = show ? "block" : "none";
      brainBox.textContent = S.tool.instructions;
      peek.textContent = show ? "Hide its brain" : "See its brain";
    };
    document.getElementById("backT").onclick = () => goStep(2);
    document.getElementById("toExit").onclick = () => goStep(4);

    const tci = document.getElementById("tci");
    tci.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendTool(); } });
    tci.addEventListener("input", () => { tci.style.height = "auto"; tci.style.height = Math.min(tci.scrollHeight, 140) + "px"; });
    document.getElementById("tsend").onclick = sendTool;
    wireMic("tmic", "tci");

    if (S.toolChat.length === 0) { celebrate(); openTool(); }
    else S.toolChat.forEach(m => addBubble("tlog", m.role === "assistant" ? "ai tool" : "user", m.content, m.role === "assistant" ? S.tool.name : S.name));
  }

  /* A brief, tasteful confetti burst for the "I built this" moment. */
  function celebrate() {
    const colors = ["#FFD000", "#1A1A17", "#1F8A5B", "#FFE87A"];
    const wrap = document.createElement("div");
    wrap.className = "confetti";
    for (let i = 0; i < 40; i++) {
      const c = document.createElement("i");
      const left = 8 + (i * 83) % 84;          // deterministic spread (no Math.random)
      const delay = (i % 10) * 40;
      const dur = 1400 + (i % 6) * 220;
      c.style.cssText = `left:${left}%;background:${colors[i % 4]};animation-delay:${delay}ms;animation-duration:${dur}ms;transform:rotate(${(i * 47) % 360}deg)`;
      wrap.appendChild(c);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 2600);
  }

  async function openTool() {
    const t = addTyping("tlog");
    try {
      const txt = await API.chat(toolApiMessages(), { system: S.tool.instructions, temperature: 0.7, max_tokens: 500 });
      t.remove();
      S.toolChat.push({ role: "assistant", content: txt }); save();
      addBubble("tlog", "ai tool", txt, S.tool.name);
    } catch (err) { t.remove(); addBubble("tlog", "ai tool", API.friendly(err), S.tool.name); }
  }

  async function sendTool() {
    const tci = document.getElementById("tci");
    const text = tci.value.trim(); if (!text) return;
    if (!API.hasKey()) { openSettings(); return; }
    tci.value = ""; tci.style.height = "auto";
    document.getElementById("tsend").disabled = true;
    addBubble("tlog", "user", text, S.name);
    S.toolChat.push({ role: "user", content: text }); save();
    // First successful message = the "tested it" milestone.
    if (!S.milestones.test) { S.milestones.test = true; save(); updateMeter(); renderStepper(); }
    const t = addTyping("tlog");
    try {
      const txt = await API.chat(toolApiMessages(), { system: S.tool.instructions, temperature: 0.7, max_tokens: 600 });
      t.remove();
      S.toolChat.push({ role: "assistant", content: txt }); save();
      addBubble("tlog", "ai tool", txt, S.tool.name);
    } catch (err) { t.remove(); addBubble("tlog", "ai tool", API.friendly(err), S.tool.name); }
    finally { document.getElementById("tsend").disabled = false; document.getElementById("tci").focus(); }
  }

  /* ---------- Step 4: Exit check-in + distance travelled ---------- */
  function stepExit() {
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 5 of 6 · Where you are now</span></div>
      <h2>Same six things. How do they feel now?</h2>
      <p>You've built a real AI tool that's yours. Answer honestly — then we'll show your distance travelled.</p>
      <div class="card">${renderLikert("exit")}</div>
      <div class="card mt-1">
        <label class="field-label" for="refl" style="margin-top:0">In your own words — what feels different now? (optional)</label>
        <textarea class="text-input" id="refl" rows="2" placeholder="e.g. I didn't think I could build anything with AI. Turns out I can.">${esc(S.reflection)}</textarea>
      </div>
      <div class="flex mt-1" style="justify-content:space-between">
        <button class="btn btn-ghost" id="backE">← Back</button>
        <button class="btn btn-primary" id="seeDT" disabled>Show my distance travelled →</button>
      </div>
      <div id="dtResult" class="mt-2"></div>`;
    const check = () => { document.getElementById("seeDT").disabled = S.exit.some(x => x == null); };
    wireLikert("exit", check); check();
    document.getElementById("refl").addEventListener("input", e => { S.reflection = e.target.value; save(); });
    document.getElementById("backE").onclick = () => goStep(3);
    document.getElementById("seeDT").onclick = showDistance;
  }

  function showDistance() {
    const before = avg(S.baseline), after = avg(S.exit);
    const delta = after - before;
    S.exitDone = true; S.uplift = +delta.toFixed(2); save();
    const box = document.getElementById("dtResult");
    box.innerHTML = `
      <div class="card pad-lg fade-in">
        <span class="eyebrow">Distance travelled · measured in-product</span>
        <h3>Your agency moved from ${before.toFixed(1)} to ${after.toFixed(1)} out of 5.</h3>
        <p>That's the shift GenerationYAI is built to create — and to measure. Here it is, statement by statement.</p>
        ${D.agencyStatements.map((st, i) => {
          const b = S.baseline[i], a = S.exit[i], d = a - b;
          return `<div style="margin:.9rem 0">
            <div class="dt-row"><span style="font-weight:600;font-size:.92rem">${esc(st)}</span>
              <span class="delta-chip">${d > 0 ? "+" + d : d}</span></div>
            <div class="dt-bars">
              <div class="dt-bar before"><span style="width:${b / 5 * 100}%"></span></div>
              <div class="dt-bar after"><span style="width:${a / 5 * 100}%"></span></div>
            </div>
          </div>`;
        }).join("")}
        <p class="muted" style="margin-top:1rem">Grey = start · Yellow = now. This maps to Breakthrough's Learner Progress &amp; Assessment Monitoring Framework, captured at entry and exit.</p>
        <div class="flex" style="justify-content:flex-end;margin-top:1rem">
          <button class="btn btn-primary" id="toPass">Get my progress passport →</button>
        </div>
      </div>`;
    document.getElementById("toPass").onclick = () => goStep(5);
    box.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- Step 5: Passport + matching + next steps ---------- */
  function stepPassport() {
    const before = avg(S.baseline), after = avg(S.exit), delta = after - before;
    const p = document.getElementById("panel");
    p.innerHTML = `
      <div class="step-eyebrow"><span class="eyebrow">Step 6 of 6 · Your progress passport</span></div>
      <div class="passport">
        <span class="stamp">BUILT IT ✓</span>
        <span class="eyebrow">GenerationYAI · Breakthrough</span>
        <h2 style="margin:.2rem 0 .2rem">${esc(S.name)}'s progress passport</h2>
        <p class="muted" style="margin:0 0 1rem">Breaking Barriers, Building Futures</p>
        <div class="grid grid-3">
          <div class="stat"><div class="n bignum">${S.tool ? "1" : "0"}</div><div class="k">AI tool built &amp; tested</div></div>
          <div class="stat"><div class="n bignum">${after.toFixed(1)}<span style="font-size:1rem;color:var(--ink-3)">/5</span></div><div class="k">Agency now (was ${before.toFixed(1)})</div></div>
          <div class="stat"><div class="n" style="color:var(--good)">${delta >= 0 ? "+" : ""}${delta.toFixed(1)}</div><div class="k">Distance travelled</div></div>
        </div>
        <div class="divider"></div>
        <h3 style="font-size:1rem">What you built</h3>
        <p style="margin:.2rem 0"><strong>${esc(S.tool ? S.tool.name : "Your tool")}</strong> — ${esc(S.tool ? S.tool.purpose : "")}</p>
        <div>
          <span class="tag">Directed an AI system</span>
          <span class="tag">Wrote clear instructions</span>
          <span class="tag">Built &amp; tested a working tool</span>
          <span class="tag">AI literacy: doing, not watching</span>
        </div>
        ${S.reflection ? `<div class="reflection">“${esc(S.reflection)}”<span class="muted"> — ${esc(S.name)}, in their own words</span></div>` : ""}
      </div>

      <div class="card mt-2 no-print">
        <span class="eyebrow">Your next step · matching layer</span>
        <h3 class="mb-0">Real routes that fit what you've just shown.</h3>
        <p class="muted">Illustrative matches for the demo — the live product connects to current openings from partner employers.</p>
        <div class="stack">
          ${D.matches.map(m => `
            <div class="match">
              <div class="logo">${esc(m.logo)}</div>
              <div>
                <strong>${esc(m.role)}</strong> · ${esc(m.org)}
                <div class="muted" style="font-size:.88rem">${esc(m.why)}</div>
              </div>
              <span class="fit">${esc(m.fit)}</span>
            </div>`).join("")}
        </div>
        <div id="cvBox" class="mt-1"></div>
        <button class="btn btn-ghost mt-1" id="cvBtn">✍️ Write a line for my CV about this</button>
      </div>

      <div class="flex flex-wrap mt-2 no-print" style="justify-content:space-between">
        <div class="flex" style="gap:.5rem">
          <a class="btn btn-dark" href="#/funder">See this in the funder view →</a>
          <button class="btn btn-ghost" id="printPass">Print / save passport</button>
        </div>
        <button class="btn btn-ghost" id="again">Run it again</button>
      </div>`;

    document.getElementById("again").onclick = () => { if (confirm("Clear this session and start over?")) reset(); };
    document.getElementById("cvBtn").onclick = writeCV;
    document.getElementById("printPass").onclick = () => window.print();
  }

  async function writeCV() {
    if (!API.hasKey()) { openSettings(); return; }
    const btn = document.getElementById("cvBtn"), box = document.getElementById("cvBox");
    btn.disabled = true; btn.textContent = "Writing…";
    try {
      const txt = await API.chat([{
        role: "user",
        content: `Write ONE confident, honest CV bullet (max 30 words, first person implied, no hype) for ${S.name}, who used AI to design and build a working tool called "${S.tool ? S.tool.name : "an AI assistant"}" that ${S.tool ? S.tool.purpose : "helps people"}. Focus on the transferable skill. Return only the bullet, starting with a strong verb.`
      }], { temperature: 0.6, max_tokens: 120 });
      box.innerHTML = `<div class="notice">📄 <strong>For your CV:</strong> ${esc(txt.replace(/^[-•\s]+/, ""))}</div>`;
      btn.classList.add("hidden");
    } catch (err) {
      btn.disabled = false; btn.textContent = "✍️ Write a line for my CV about this";
      box.innerHTML = `<div class="notice warn">${esc(API.friendly(err))}</div>`;
    }
  }

  /* =====================================================================
     PATHWAY — a companion for the journey into adulthood + Silicocene
     ===================================================================== */
  function renderPathway() {
    const s = D.silicocene, cur = D.curriculum;
    app.innerHTML = `
    <section class="hero">
      <div class="wrap" style="display:block">
        <span class="eyebrow">More than a course · a companion for the journey</span>
        <h1 style="max-width:24ch">It doesn't stop at one tool. It grows with you.</h1>
        <p class="lede" style="max-width:58ch">GenerationYAI isn't a one-off intervention. It's a companion that stays with a young person as they grow into adulthood — from a first win, to fluency, to work, to a life they're steering. Learn by building, ethics woven through, the whole person supported.</p>
      </div>
    </section>

    <div class="wrap">
      <ol class="timeline">
        ${D.pathway.map(p => `
          <li class="tl ${p.now ? "tl-now" : ""}">
            <div class="tl-node">${p.stage}</div>
            <div class="tl-body card">
              <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline;gap:.4rem">
                <h3 class="mb-0">${esc(p.title)}</h3>
                ${p.now ? `<span class="pill"><span class="dot"></span> The demo starts here</span>` : `<span class="phase-tag">${esc(p.phase)}</span>`}
              </div>
              <p style="margin:.5rem 0 .6rem">${esc(p.what)}</p>
              <span class="agency-chip">Builds: ${esc(p.agency)}</span>
            </div>
          </li>`).join("")}
      </ol>

      <div class="card card-flat center mt-2">
        <h3 class="mb-0">Start at stage one.</h3>
        <p class="muted">Every journey begins with a first win. Take the one the panel would watch.</p>
        <a class="btn btn-primary" href="#/journey">Build your first AI tool →</a>
      </div>

      <div class="card mt-2">
        <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline;gap:.5rem">
          <div><span class="eyebrow">Not a prototype pretending · grounded in what we already deliver</span><h3 class="mb-0">The curriculum behind it: ${esc(cur.name)}</h3></div>
          <span class="pill"><span class="dot"></span> Already running</span>
        </div>
        <p class="muted">${esc(cur.meta)}. GenerationYAI turns a curriculum Breakthrough already delivers to associates into a companion that can scale it.</p>
        <div class="modgrid">
          ${cur.modules.map((m, i) => `<div class="mod"><span class="mod-n">${String(i + 1).padStart(2, "0")}</span>${esc(m)}</div>`).join("")}
        </div>
      </div>

      <div class="belief mt-2" style="background:var(--ink)">
        <span class="eyebrow" style="color:rgba(255,255,255,.6)">The thinking underneath · the Silicocene</span>
        <p class="big" style="max-width:40ch">“${esc(s.invitation)}”</p>
        <p style="color:rgba(255,255,255,.72);margin:0 0 .2rem;max-width:52ch">${esc(s.definition)}</p>
        <p class="muted" style="color:rgba(255,255,255,.55);margin:.6rem 0 0;font-size:.82rem">${esc(s.attribution)}</p>
        <hr class="divider" style="background:rgba(255,255,255,.15)">
        <div class="grid grid-2">
          ${s.principles.map(pr => `<div class="flex" style="align-items:flex-start;gap:.6rem"><span class="check">✦</span><div><strong style="color:#fff;font-size:.95rem">${esc(pr.t)}</strong><div style="color:rgba(255,255,255,.7);font-size:.88rem">${esc(pr.d)}</div></div></div>`).join("")}
        </div>
      </div>
    </div>`;
  }

  /* =====================================================================
     FUNDER / IMPACT DASHBOARD
     ===================================================================== */
  function renderFunder() {
    const c = D.cohort;
    const sv = D.proxy.perProgression * c.progressed + D.proxy.perEngagement * Math.round(c.size * c.engaged / 100);
    const svStr = "£" + Math.round(sv / 1000) + "k";
    const liveBanner = S.exitDone
      ? `<div class="notice" style="margin-bottom:1.4rem">🟢 <strong>Live:</strong> 1 associate completed the loop in this session — measured agency uplift <strong>${S.uplift >= 0 ? "+" : ""}${S.uplift}</strong> on the 5-point scale. In the real product, this flows into the cohort figures automatically.</div>`
      : "";
    app.innerHTML = `
    <div class="wrap">
      <span class="eyebrow">For funders &amp; commissioners</span>
      <h1 style="max-width:22ch">Impact you can see, because it's built into the product.</h1>
      <p class="lede" style="max-width:60ch">Corporates and government fund cohorts of NEET or justice-experienced young people. Associates use GenerationYAI free. Funders get measurable social value and live outcome data — captured as part of the core experience, not a bolted-on survey.</p>
      ${liveBanner}

      <div class="card card-flat" style="margin-top:1.4rem">
        <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline">
          <div><span class="eyebrow">Illustrative demo cohort</span><h3 class="mb-0">${esc(c.name)}</h3><span class="muted">${esc(c.funder)}</span></div>
          <span class="pill"><span class="dot"></span> Demonstration data</span>
        </div>
        <div class="grid grid-3 mt-1">
          <div class="stat"><div class="n">${c.size}</div><div class="k">associates on the cohort</div></div>
          <div class="stat"><div class="n">${c.engaged}%</div><div class="k">still engaged after start</div></div>
          <div class="stat"><div class="n">${c.toolsBuilt}</div><div class="k">real AI tools built</div></div>
        </div>
        <div class="divider"></div>
        <div class="grid grid-2">
          <div>
            <span class="eyebrow">Average agency — distance travelled</span>
            <h3 style="margin:.3rem 0">${c.agencyBefore} → ${c.agencyAfter} <span class="delta-chip">+${(c.agencyAfter - c.agencyBefore).toFixed(1)}</span></h3>
            <div class="dt-bar before" style="height:14px;margin:.4rem 0"><span style="width:${c.agencyBefore / 5 * 100}%"></span></div>
            <div class="dt-bar after" style="height:14px"><span style="width:${c.agencyAfter / 5 * 100}%"></span></div>
            <p class="muted" style="margin-top:.6rem">Measured entry vs exit on a 5-point self-efficacy scale, per associate.</p>
          </div>
          <div>
            <span class="eyebrow">Progression &amp; per-associate uplift</span>
            <h3 style="margin:.3rem 0">${c.progressed} of ${c.size} <span style="font-size:.9rem;color:var(--ink-3)">into work, learning or enterprise</span></h3>
            <div id="spark" style="display:flex;gap:3px;align-items:flex-end;height:70px;margin-top:.6rem"></div>
            <p class="muted" style="margin-top:.6rem">Each bar = one associate's measured agency uplift.</p>
          </div>
        </div>
      </div>

      <div class="grid grid-2 mt-2">
        <div class="belief" style="background:var(--ink)">
          <span class="eyebrow" style="color:rgba(255,255,255,.6)">Illustrative social-value proxy</span>
          <div class="n" style="font-size:2.8rem;font-weight:800;color:var(--yellow);line-height:1">${svStr}</div>
          <p class="muted" style="color:rgba(255,255,255,.72);margin:.4rem 0 0">Estimated social value generated by this cohort, from progression and sustained engagement. ${esc(D.proxy.label)}</p>
        </div>
        <div class="card">
          <span class="eyebrow">Longitudinal follow-up</span>
          <h3 style="margin:.2rem 0 .8rem">We track outcomes past the programme.</h3>
          <div class="stack" style="--s:.5rem">
            ${D.longitudinal.map(l => `
              <div class="dt-row" style="grid-template-columns:90px 1fr auto;align-items:center">
                <span style="font-weight:700;font-size:.9rem">${esc(l.when)}</span>
                <div class="dt-bar after" style="height:12px"><span style="width:${l.pct}%"></span></div>
                <span style="font-weight:700">${l.pct}%</span>
              </div>
              <div class="muted" style="font-size:.8rem;margin:-.2rem 0 .4rem 90px">${esc(l.note)}</div>`).join("")}
          </div>
          <p class="muted" style="font-size:.8rem;margin-top:.4rem">Framework shown with demo values — captured at exit, 6 and 12 months.</p>
        </div>
      </div>

      <div class="card mt-2">
        <span class="eyebrow">How we measure agency — rigour, not anecdote</span>
        <h3>A measure you can stand behind.</h3>
        <div class="grid grid-2 mt-1">
          ${D.methodology.map(m => `<div class="flex" style="align-items:flex-start;gap:.6rem"><span class="check">✓</span><div><strong style="font-size:.95rem">${esc(m.t)}</strong><div class="muted" style="font-size:.88rem">${esc(m.d)}</div></div></div>`).join("")}
        </div>
      </div>

      <div class="card mt-2" id="reportCard">
        <div class="flex flex-wrap" style="justify-content:space-between;align-items:baseline">
          <div><span class="eyebrow">Reporting, automated</span><h3 class="mb-0">Generate a funder-ready impact summary.</h3></div>
          <div class="flex" style="gap:.5rem">
            <button class="btn btn-ghost" id="printReport">Print / save PDF</button>
            <button class="btn btn-primary" id="genReport">✨ Generate summary</button>
          </div>
        </div>
        <p class="muted">The same data associates generate by using the product becomes the report a funder receives. Written live by Claude from this cohort's figures.</p>
        <div id="reportOut"></div>
      </div>

      <div class="grid grid-2 mt-2">
        <div class="card">
          <span class="eyebrow">Commercial model</span>
          <h3>Social value, sold B2B2C.</h3>
          <ul style="padding-left:1.1rem;color:var(--ink-2);margin:0 0 1rem">
            ${D.socialValue.map(s => `<li style="margin:.4rem 0">${esc(s)}</li>`).join("")}
          </ul>
          <span class="eyebrow">Already earning</span>
          <div class="stack" style="--s:.4rem;margin-top:.5rem">
            ${D.pipeline.map(p => `<div class="match"><div class="logo">£</div><div><strong>${esc(p.v)}</strong> · ${esc(p.org)}<div class="muted" style="font-size:.85rem">${esc(p.d)}</div></div></div>`).join("")}
          </div>
        </div>
        <div class="card">
          <span class="eyebrow">Why it scales</span>
          <h3>Tailwinds behind the model.</h3>
          <div class="stack" style="--s:.5rem">
            ${D.tailwinds.map(t => `<div class="flex" style="align-items:flex-start;gap:.6rem"><span class="check">↗</span><span style="font-size:.95rem">${esc(t)}</span></div>`).join("")}
          </div>
          <div class="divider"></div>
          <span class="eyebrow">Built on a real track record</span>
          <div class="grid grid-2 mt-1">
            ${D.trackRecord.map(t => `<div class="stat"><div class="n" style="font-size:1.6rem">${esc(t.n)}</div><div class="k">${esc(t.k)}</div></div>`).join("")}
          </div>
        </div>
      </div>

      <div class="card mt-2">
        <span class="eyebrow">Responsible AI</span>
        <h3>Used to liberate, not to defer to.</h3>
        <div class="grid grid-2 mt-1">
          ${D.responsibleAI.map(r => `<div class="flex" style="align-items:flex-start;gap:.6rem"><span class="check">✓</span><div><strong style="font-size:.95rem">${esc(r.t)}</strong><div class="muted" style="font-size:.88rem">${esc(r.d)}</div></div></div>`).join("")}
        </div>
      </div>

      <div class="card card-flat center mt-2">
        <h3 class="mb-0">Want to see how an associate gets here?</h3>
        <p class="muted">Run the journey the panel would watch — arrival to “I built this.”</p>
        <a class="btn btn-primary" href="#/journey">Run the associate journey →</a>
      </div>
    </div>`;

    // sparkline of deltas
    const spark = document.getElementById("spark");
    if (spark) {
      const max = Math.max(...c.deltas);
      spark.innerHTML = c.deltas.map(d => `<div title="+${d}" style="flex:1;background:var(--yellow);border-radius:3px 3px 0 0;height:${Math.max(8, d / max * 100)}%"></div>`).join("");
    }
    document.getElementById("printReport").onclick = () => window.print();
    document.getElementById("genReport").onclick = () => generateReport(c, svStr);
  }

  async function generateReport(c, svStr) {
    if (!API.hasKey()) { openSettings(); return; }
    const btn = document.getElementById("genReport"), out = document.getElementById("reportOut");
    btn.disabled = true; btn.textContent = "Writing…";
    const facts = `Cohort: ${c.name} (${c.funder}). Associates: ${c.size}. Engaged after start: ${c.engaged}%. Real AI tools built: ${c.toolsBuilt}. Average agency (self-efficacy, 1-5) rose from ${c.agencyBefore} to ${c.agencyAfter}. Into work/learning/enterprise: ${c.progressed} of ${c.size}. Illustrative social-value proxy: ${svStr}.`;
    try {
      const txt = await API.chat([{
        role: "user",
        content: `You are writing for Breakthrough Social Enterprise. Write a concise funder impact summary (about 120 words) for a corporate/government commissioner, in a warm, grounded, evidence-led voice (British English). Refer to young people as "associates". Emphasise distance travelled in agency and that measurement is embedded in the product. Do not overclaim; note figures are from a demonstration cohort. Use these figures only:\n${facts}\nReturn plain prose, no headings.`
      }], { temperature: 0.5, max_tokens: 400 });
      out.innerHTML = `<div class="report-body">${esc(txt).replace(/\n{2,}/g, "</p><p>").replace(/^/, "<p>") + "</p>"}</div>`;
      btn.textContent = "↻ Regenerate";
    } catch (err) {
      out.innerHTML = `<div class="notice warn">${esc(API.friendly(err))}</div>`;
      btn.textContent = "✨ Generate summary";
    } finally { btn.disabled = false; }
  }

  /* =====================================================================
     Settings modal
     ===================================================================== */
  const modal = document.getElementById("settingsModal");
  const keyInput = document.getElementById("apiKeyInput");
  const modelSelect = document.getElementById("modelSelect");
  const statusEl = document.getElementById("settingsStatus");

  function openSettings() {
    keyInput.value = API.getKey();
    modelSelect.value = API.getModel();
    statusEl.textContent = ""; statusEl.className = "status-line";
    modal.hidden = false;
    keyInput.focus();
  }
  function closeSettings() { modal.hidden = true; }

  document.getElementById("settingsBtn").onclick = openSettings;
  document.getElementById("settingsClose").onclick = closeSettings;
  modal.addEventListener("click", e => { if (e.target === modal) closeSettings(); });

  document.getElementById("settingsSave").onclick = () => {
    API.setKey(keyInput.value);
    API.setModel(modelSelect.value);
    statusEl.textContent = "Saved. Your companion is ready.";
    statusEl.className = "status-line ok";
    setTimeout(closeSettings, 700);
    if (location.hash.startsWith("#/journey")) route();
  };

  document.getElementById("settingsTest").onclick = async () => {
    API.setKey(keyInput.value); API.setModel(modelSelect.value);
    statusEl.textContent = "Testing…"; statusEl.className = "status-line";
    try {
      const r = await API.test();
      statusEl.textContent = /connected/i.test(r) ? "✓ Connected — the companion is live." : "✓ Connected.";
      statusEl.className = "status-line ok";
    } catch (err) {
      statusEl.textContent = "✕ " + API.friendly(err) + (err.detail ? ` (${err.detail})` : "");
      statusEl.className = "status-line err";
    }
  };

  function flashSettingsHint() {
    const b = document.getElementById("settingsBtn");
    b.animate([{ boxShadow: "0 0 0 0 rgba(255,208,0,.8)" }, { boxShadow: "0 0 0 12px rgba(255,208,0,0)" }],
      { duration: 1400, iterations: 3 });
  }

  /* ---------------- Boot ---------------- */
  route();
})();
