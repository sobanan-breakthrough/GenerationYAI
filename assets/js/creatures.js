/* ============================================================
   Break Through — elemental companion creatures
   Self-contained cute SVG art, themed by element, evolving by
   stage (1 Spark → 2 Kindred → 3 Ascended). No external assets.
   ============================================================ */

window.GY_creature = (function () {

  // Per-element head feature, drawn on top of the round body.
  function feature(key, c, stage) {
    const big = stage >= 3;
    switch (key) {
      case "fire": // flame tuft
        return `<g class="cr-flame">
          <path d="M70 6 C 82 20, 80 30, 70 34 C 60 30, 58 20, 70 6 Z" fill="${c.feat}"/>
          <path d="M70 14 C 77 24, 76 30, 70 33 C 64 30, 63 24, 70 14 Z" fill="${c.glow}"/>
          ${big ? `<path d="M52 16 C 58 24, 57 30, 51 32 C 46 29, 46 22, 52 16 Z" fill="${c.feat}" opacity=".85"/>
                   <path d="M88 16 C 94 24, 93 30, 87 32 C 82 29, 82 22, 88 16 Z" fill="${c.feat}" opacity=".85"/>` : ""}
        </g>`;
      case "earth": // sprout
        return `<g>
          <rect x="68" y="14" width="4" height="20" rx="2" fill="#7A5230"/>
          <path d="M70 20 C 56 14, 50 22, 54 30 C 66 32, 70 26 70 20 Z" fill="${c.feat}"/>
          <path d="M70 24 C 84 18, 90 26, 86 34 C 74 36, 70 30 70 24 Z" fill="${c.glow}"/>
          ${big ? `<circle cx="70" cy="10" r="4" fill="#FF7AA8"/><circle cx="70" cy="10" r="1.6" fill="#FFF"/>` : ""}
        </g>`;
      case "water": // droplet crest
        return `<g class="cr-drop">
          <path d="M70 6 C 80 22, 84 30, 70 36 C 56 30, 60 22, 70 6 Z" fill="${c.feat}"/>
          <ellipse cx="66" cy="24" rx="3" ry="5" fill="#FFFFFF" opacity=".7"/>
          ${big ? `<circle cx="50" cy="30" r="4" fill="${c.glow}" opacity=".8"/><circle cx="90" cy="30" r="4" fill="${c.glow}" opacity=".8"/>` : ""}
        </g>`;
      case "air": // little top swirl
        return `<g>
          <path d="M58 22 C 58 10, 78 10, 78 22 C 78 30, 66 30, 66 24 C 66 20, 72 20, 72 23" fill="none" stroke="${c.dark}" stroke-width="3" stroke-linecap="round"/>
          ${big ? `<circle cx="52" cy="18" r="2.4" fill="#fff"/><circle cx="86" cy="20" r="2" fill="#fff"/>` : ""}
        </g>`;
      case "ether": // star crown
      default:
        return `<g class="cr-stars">
          ${star(70, 12, big ? 9 : 7, c.feat)}
          ${star(52, 22, 5, c.feat)}
          ${star(88, 22, 5, c.feat)}
          ${big ? star(70, 30, 4, "#FFF") : ""}
        </g>`;
    }
  }

  function star(cx, cy, r, fill) {
    let p = "";
    for (let i = 0; i < 10; i++) {
      const ang = Math.PI / 5 * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.42;
      p += (i ? "L" : "M") + (cx + Math.cos(ang) * rad).toFixed(1) + " " + (cy + Math.sin(ang) * rad).toFixed(1) + " ";
    }
    return `<path d="${p}Z" fill="${fill}"/>`;
  }

  // Wings — air has them from stage 1; others gain them at stage 3.
  function wings(key, c, stage) {
    const show = key === "air" ? stage >= 1 : stage >= 3;
    if (!show) return "";
    const fill = key === "air" ? c.feat : c.glow;
    return `<g class="cr-wings" opacity="${key === "air" ? 1 : .9}">
      <path d="M34 74 C 10 60, 10 92, 36 92 C 30 84, 30 80, 34 74 Z" fill="${fill}" stroke="${c.dark}" stroke-width="1.5"/>
      <path d="M106 74 C 130 60, 130 92, 104 92 C 110 84, 110 80, 106 74 Z" fill="${fill}" stroke="${c.dark}" stroke-width="1.5"/>
    </g>`;
  }

  function sparkles(stage) {
    if (stage < 3) return "";
    const pts = [[24, 40], [116, 46], [30, 96], [110, 98], [70, 118]];
    return `<g class="cr-sparkle">` + pts.map((p, i) =>
      `<path d="M${p[0]} ${p[1] - 5} L${p[0] + 1.6} ${p[1] - 1.6} L${p[0] + 5} ${p[1]} L${p[0] + 1.6} ${p[1] + 1.6} L${p[0]} ${p[1] + 5} L${p[0] - 1.6} ${p[1] + 1.6} L${p[0] - 5} ${p[1]} L${p[0] - 1.6} ${p[1] - 1.6} Z" fill="#FFD000" opacity="${0.5 + (i % 3) * 0.15}" style="animation-delay:${i * 180}ms"/>`
    ).join("") + `</g>`;
  }

  /**
   * Build the creature SVG.
   * @param {object} el   element object from GY_DATA.elements
   * @param {number} stage 1|2|3
   * @param {number} size  pixel size
   */
  function build(el, stage, size) {
    const c = el.c;
    const auraOp = stage === 1 ? 0 : stage === 2 ? 0.2 : 0.42;
    const floatCls = stage >= 3 ? "cr-float" : "";
    const bodyScale = stage === 1 ? 0.86 : stage === 2 ? 0.94 : 1;
    return `
<svg class="creature stage${stage} ${floatCls}" viewBox="0 0 140 140" width="${size}" height="${size}" role="img" aria-label="${el.name}, ${el.animal} companion, stage ${stage}">
  <defs>
    <radialGradient id="aura-${el.key}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="${auraOp}"/>
      <stop offset="70%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle class="cr-aura" cx="70" cy="72" r="66" fill="url(#aura-${el.key})"/>
  ${sparkles(stage)}
  <ellipse cx="70" cy="126" rx="${28 * bodyScale}" ry="6" fill="#000" opacity=".08"/>
  <g class="cr-core" transform="translate(70 78) scale(${bodyScale}) translate(-70 -78)">
    ${wings(el.key, c, stage)}
    <!-- feet -->
    <ellipse cx="56" cy="112" rx="9" ry="6" fill="${c.dark}"/>
    <ellipse cx="84" cy="112" rx="9" ry="6" fill="${c.dark}"/>
    <!-- body -->
    <path d="M70 40 C 40 40, 30 66, 32 86 C 34 106, 52 116, 70 116 C 88 116, 106 106, 108 86 C 110 66, 100 40, 70 40 Z" fill="${c.body}" stroke="${c.dark}" stroke-width="2.5"/>
    <!-- belly -->
    <ellipse cx="70" cy="92" rx="24" ry="20" fill="${c.belly}"/>
    <!-- ears (little) -->
    <ellipse cx="46" cy="50" rx="10" ry="12" fill="${c.body}" stroke="${c.dark}" stroke-width="2"/>
    <ellipse cx="94" cy="50" rx="10" ry="12" fill="${c.body}" stroke="${c.dark}" stroke-width="2"/>
    ${feature(el.key, c, stage)}
    <!-- face -->
    <ellipse cx="57" cy="74" rx="7" ry="8" fill="#fff"/>
    <ellipse cx="83" cy="74" rx="7" ry="8" fill="#fff"/>
    <circle cx="58" cy="76" r="3.6" fill="#1A1A17"/>
    <circle cx="82" cy="76" r="3.6" fill="#1A1A17"/>
    <circle cx="59.4" cy="74.6" r="1.3" fill="#fff"/>
    <circle cx="83.4" cy="74.6" r="1.3" fill="#fff"/>
    <ellipse cx="47" cy="86" rx="4.5" ry="3" fill="#FF9DA0" opacity=".7"/>
    <ellipse cx="93" cy="86" rx="4.5" ry="3" fill="#FF9DA0" opacity=".7"/>
    <path d="M64 86 Q70 92 76 86" fill="none" stroke="#1A1A17" stroke-width="2.2" stroke-linecap="round"/>
  </g>
</svg>`;
  }

  return build;
})();
