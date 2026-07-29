/* ============================================================
   GenerationYAI — Claude API wrapper (bring-your-own-key)
   Calls the Anthropic Messages API directly from the browser.
   The key lives only in this browser's localStorage and is sent
   straight to Anthropic — never to Breakthrough or anyone else.
   ============================================================ */

window.GY_API = (function () {
  const LS_KEY = "gy_api_key";
  const LS_MODEL = "gy_model";
  const ENDPOINT = "https://api.anthropic.com/v1/messages";
  const DEFAULT_MODEL = "claude-sonnet-5";

  function getKey()   { return localStorage.getItem(LS_KEY) || ""; }
  function setKey(k)  { localStorage.setItem(LS_KEY, (k || "").trim()); }
  function getModel() { return localStorage.getItem(LS_MODEL) || DEFAULT_MODEL; }
  function setModel(m){ localStorage.setItem(LS_MODEL, m || DEFAULT_MODEL); }
  function hasKey()   { return getKey().length > 10; }

  /**
   * Send a conversation to Claude.
   * @param {Array} messages  [{role:'user'|'assistant', content:'...'}]
   * @param {Object} opts      { system, model, max_tokens, temperature }
   * @returns {Promise<string>} assistant text
   */
  async function chat(messages, opts = {}) {
    const key = getKey();
    if (!key) {
      const e = new Error("NO_KEY");
      e.code = "NO_KEY";
      throw e;
    }

    const body = {
      model: opts.model || getModel(),
      max_tokens: opts.max_tokens || 1024,
      messages
    };
    if (opts.system) body.system = opts.system;
    if (typeof opts.temperature === "number") body.temperature = opts.temperature;

    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify(body)
      });
    } catch (netErr) {
      const e = new Error("NETWORK");
      e.code = "NETWORK";
      e.detail = netErr.message;
      throw e;
    }

    if (!res.ok) {
      let detail = "";
      try { const j = await res.json(); detail = j.error?.message || JSON.stringify(j); }
      catch { detail = await res.text().catch(() => ""); }
      const e = new Error("API_" + res.status);
      e.code = "API_" + res.status;
      e.status = res.status;
      e.detail = detail;
      throw e;
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("\n")
      .trim();
    return text || "(The companion had nothing to add there — try rephrasing.)";
  }

  /** A cheap round-trip to confirm the key works. */
  async function test() {
    return chat(
      [{ role: "user", content: "Reply with exactly the word: connected" }],
      { max_tokens: 16, temperature: 0 }
    );
  }

  /** Turn an API error into a warm, associate-friendly line. */
  function friendly(err) {
    switch (err.code) {
      case "NO_KEY":   return "Connect a Claude key (⚙ top right) to bring your companion to life.";
      case "NETWORK":  return "Couldn't reach Claude — check the connection and try again.";
      case "API_401":  return "That API key wasn't accepted. Add a valid one in settings (⚙).";
      case "API_429":  return "Claude is busy right now (rate limit). Give it a moment and try again.";
      case "API_400":  return "Something in that request wasn't quite right — try again.";
      default:
        if (err.code && err.code.startsWith("API_5")) return "Claude had a temporary problem. Try again in a moment.";
        return "Something went wrong reaching the companion. Try again.";
    }
  }

  return { getKey, setKey, getModel, setModel, hasKey, chat, test, friendly, DEFAULT_MODEL };
})();
