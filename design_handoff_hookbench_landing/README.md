# Handoff: Hookbench Landing Page

## Overview

Marketing landing page for **Hookbench** — a LeetCode-style platform where developers solve daily React puzzles (broken hooks, gnarly re-renders, suspense bugs). The page introduces the product, demos the puzzle UI with an interactive widget, lists tracks, shows the leaderboard, and converts visitors to "solve today's puzzle."

## About the Design Files

The files in this bundle (`reference/`) are **design references created in HTML/JSX-as-script** — prototypes showing intended look and behavior, not production code to copy directly. Your task is to **recreate them in the target React + TypeScript + Vite codebase** using plain CSS files (one `.css` per `.tsx`) — not to ship the HTML or port the inline-style JSX wholesale.

The original prototype uses Babel-transpiled inline JSX with inline `style={{}}` objects. Translate these to clean TSX components with `className` references and matching `.css` files.

## Fidelity

**High-fidelity.** All colors, type scales, spacing, copy, and interactions are final. Recreate pixel-perfectly. The only deliberately open question is the iconography for `<Logo>` and difficulty dots — keep the existing SVG approach.

## Target Stack

- **React 18** + **TypeScript** + **Vite**
- **Plain CSS** — one `.css` file per `.tsx` component, co-located, imported at top of the TSX file
- **No CSS-in-JS, no Tailwind, no styled-components**
- **Theming via CSS custom properties** + a `data-theme="ink" | "paper"` attribute on `<html>`
- **Paper = light mode (`prefers-color-scheme: light`)**, **Ink = dark mode (`prefers-color-scheme: dark`)**, with a manual toggle override

## Suggested File Tree

```
src/
├── App.tsx
├── App.css
├── main.tsx
├── index.css                        # Global resets + :root tokens for both themes
├── theme/
│   ├── ThemeProvider.tsx            # Honors prefers-color-scheme + manual override
│   └── useTheme.ts
├── components/
│   ├── Logo.tsx + Logo.css
│   ├── Nav.tsx + Nav.css            # Sticky nav w/ scroll-progress bar
│   ├── Button.tsx + Button.css
│   ├── Chip.tsx + Chip.css
│   ├── DiffDot.tsx + DiffDot.css
│   ├── SectionHeader.tsx + SectionHeader.css
│   ├── Container.tsx + Container.css
│   ├── PuzzleWidget.tsx + PuzzleWidget.css
│   ├── CodeBlock.tsx + CodeBlock.css         # tokenizer + spans
│   └── Footer.tsx + Footer.css
└── sections/
    ├── Hero.tsx + Hero.css                   # Variants: split | stacked | command
    ├── LogoStrip.tsx + LogoStrip.css
    ├── HowItWorks.tsx + HowItWorks.css
    ├── Tracks.tsx + Tracks.css
    ├── Leaderboard.tsx + Leaderboard.css
    └── FooterCTA.tsx + FooterCTA.css
```

---

## Design Tokens

Put these in `src/index.css` as CSS custom properties under both themes. Components reference them via `var(--token)` only — never hardcode colors.

### Color tokens

```css
:root {
  /* Type */
  --font-sans: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 7px;
  --radius-lg: 12px;
  --radius-xl: 14px;

  /* Spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 10px;
  --space-4: 14px;
  --space-5: 18px;
  --space-6: 22px;
  --space-7: 28px;
  --space-8: 40px;
  --space-9: 60px;
  --space-10: 90px;

  /* Page max width */
  --max-width: 1280px;
}

/* Default dark theme — Ink */
:root,
[data-theme="ink"] {
  --bg-0:        #14161a;  /* page bg */
  --bg-1:        #1b1e23;  /* card / surface */
  --bg-2:        #23272f;  /* nav glass / nested surface */
  --line:        #2c3038;
  --line-soft:   #23272e;
  --text:        #ebe7dd;
  --text-dim:    #9da3ad;
  --text-mute:   #6a7280;
  --accent:      #c98a5b;  /* clay / amber-ochre */
  --accent-ink:  #1a1814;  /* text-on-accent */
  --accent-2:    #7f9b86;  /* moss (easy / pass) */
  --pass:        #7f9b86;
  --fail:        #b8645e;
  --warn:        #c98a5b;
  --chrome:      #6a7280;
  --nav-glass:   rgba(20, 22, 26, 0.72);
}

/* Light theme — Paper */
[data-theme="paper"] {
  --bg-0:        #efeae0;
  --bg-1:        #f8f4ea;
  --bg-2:        #e6dfce;
  --line:        #cfc6ad;
  --line-soft:   #ddd5c0;
  --text:        #1d1a13;
  --text-dim:    #5b5446;
  --text-mute:   #867d6c;
  --accent:      #1f5d4e;  /* forest teal */
  --accent-ink:  #f8f4ea;
  --accent-2:    #a04428;  /* brick */
  --pass:        #1f5d4e;
  --fail:        #a04428;
  --warn:        #9c6f1c;
  --chrome:      #867d6c;
  --nav-glass:   rgba(255, 255, 255, 0.78);
}

/* OS-level pref → Paper when light */
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --bg-0:        #efeae0;
    --bg-1:        #f8f4ea;
    --bg-2:        #e6dfce;
    --line:        #cfc6ad;
    --line-soft:   #ddd5c0;
    --text:        #1d1a13;
    --text-dim:    #5b5446;
    --text-mute:   #867d6c;
    --accent:      #1f5d4e;
    --accent-ink:  #f8f4ea;
    --accent-2:    #a04428;
    --pass:        #1f5d4e;
    --fail:        #a04428;
    --warn:        #9c6f1c;
    --chrome:      #867d6c;
    --nav-glass:   rgba(255, 255, 255, 0.78);
  }
}
```

### Theme provider behavior

`ThemeProvider.tsx` should:
1. Read `localStorage["hb-theme"]` on mount (`"ink" | "paper" | null`)
2. If null, fall back to `prefers-color-scheme` (dark → ink, light → paper)
3. Set `<html data-theme="...">` and persist on change
4. Expose `useTheme()` → `{ theme, setTheme, toggle }`

Listen for `matchMedia("(prefers-color-scheme: dark)")` changes so the page reacts when the OS theme changes (only if user hasn't overridden via `localStorage`).

### Typography

| Use | Family | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| H1 (split) | Space Grotesk | 62 | 600 | −1.8 | 1.02 |
| H1 (stacked) | Space Grotesk | 70 | 600 | −2.2 | 1.02 |
| H1 (command) | Space Grotesk | 58 | 600 | −1.6 | 1.04 |
| H2 (section) | Space Grotesk | 38 | 600 | −0.8 | 1.08 |
| H3 (footer CTA) | Space Grotesk | 30 | 600 | −0.6 | 1.1 |
| Body large | Space Grotesk | 17.5 | 400 | 0 | 1.55 |
| Body | Space Grotesk | 14–16 | 400–500 | 0 | 1.5–1.55 |
| Eyebrow | JetBrains Mono | 12 | 500 | 1.6, uppercase | 1 |
| Mono caption | JetBrains Mono | 11–11.5 | 500 | 0.2–1.4 | 1 |
| Code | JetBrains Mono | 12.5 | 400 | 0 | 1.65 |
| Button | Space Grotesk | 14.5 (compact 13) | 600 | −0.1 | 1 |

Use `text-wrap: balance` on H1/H2 and `text-wrap: pretty` on long paragraphs.

Load fonts via Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Components

### `<Logo>`

Original mark — bracket + workbench dot. **Do not use the React atom/orbit shape.**

Props: `size?: number = 22`, `withWordmark?: boolean = true`.

SVG path (32×32 viewBox):
```html
<svg viewBox="0 0 32 32" fill="none">
  <path d="M20 5 L11 5 Q5 5 5 11 L5 21 Q5 27 11 27 L20 27"
        stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none" />
  <path d="M16 16 H24" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="26" cy="16" r="3" fill="currentColor" />
</svg>
```

The `<svg>` itself uses `color: var(--accent)`. The wordmark "Hookbench" sits next to it: Space Grotesk 600, 17px, −0.2 letter-spacing, `color: var(--text)`. Gap between mark and wordmark: 9px.

### `<Nav>` (sticky, with scroll-progress hairline)

- `position: sticky; top: 0; z-index: 10;`
- Background: `var(--nav-glass)` with `backdrop-filter: blur(14px)`
- Bottom border: `1px solid var(--line-soft)`
- Inner row: max-width 1280, padding `16px 40px`, `display: flex; justify-content: space-between; align-items: center;`
- Left: `<Logo />`
- Center: nav links `["Puzzles", "Tracks", "Leaderboard", "Pricing"]` — gap 28px, 14px Space Grotesk 500. First link is `var(--text)`, rest `var(--text-dim)`.
- Right: "Sign in" text link (13.5px, dim) + primary compact `<Button>Start solving</Button>`, gap 12px.
- **Scroll-progress hairline** at the bottom: absolutely positioned 2px high. Width = scroll percentage. Background: `var(--accent)` (flat, no gradient, no glow).

```ts
// Wire scroll progress:
const [progress, setProgress] = useState(0);
useEffect(() => {
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    setProgress(max > 0 ? h.scrollTop / max : 0);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

### `<Button>`

Props: `variant?: "primary" | "ghost" | "secondary" = "primary"`, `compact?: boolean`, `mono?: boolean`.

| Variant | Background | Color | Border |
|---|---|---|---|
| primary | `var(--accent)` | `var(--accent-ink)` | none |
| ghost | transparent | `var(--text)` | `inset 0 0 0 1px var(--line)` (box-shadow) |
| secondary | `var(--bg-2)` | `var(--text)` | `inset 0 0 0 1px var(--line)` |

Padding: `12px 18px` (compact: `8px 14px`). Radius 7px. Font: Space Grotesk 600 14.5px (compact 13). When `mono`, swap to JetBrains Mono 500. `transition: transform .15s ease; cursor: pointer; border: none;`

### `<Chip>`

Inline-flex pill. Mono 11.5px, letter-spacing 0.2, padding `5px 10px`, radius 999.
Background `color-mix(in srgb, var(--accent) 10%, transparent)` (or use a `--chip-bg-accent` token). Color: `var(--accent)`. Box-shadow inset `0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent)`.

Tones: `"accent" | "warn" | "muted"` swap the source color.

### `<DiffDot>`

7×7 circle. `level: "easy" | "medium" | "hard"` → `var(--accent-2)` / `var(--warn)` / `var(--fail)`.

### `<SectionHeader>`

Eyebrow (mono uppercase `var(--accent)` 12px, letter-spacing 1.6, margin-bottom 14px) → H2 (38px, 600, −0.8, balance) → optional sub paragraph (16px / 1.55 / `var(--text-dim)`, max-width 580, margin-top 14px, pretty).

`align?: "left" | "center" = "left"`. When centered, max-width 720 mx-auto.

### `<Container>`

`max-width: 1280px; margin: 0 auto; padding: 0 60px;`

---

## Sections

### Hero (3 variants — select via prop or routing)

Variants: `"split" | "stacked" | "command"`. The primary direction is **split**; the other two are alternates kept for marketing experiments.

**Split:**
- Container, padding `64px 60px 40px`
- 2-col CSS grid `1fr 1.1fr`, gap 56, align center
- Left: `<Chip>● Today's puzzle live · 02:14:41 left</Chip>` → H1 (62px, 3 lines, the third line wraps in a span colored `var(--accent)`) → sub paragraph (max-width 460) → button row (primary + ghost) → stats row (3 cells, gap 28: "240+ puzzles", "18.4k solvers", "3 min avg solve" — number 22px 600, label mono uppercase 12px text-mute)
- Right: `<PuzzleWidget />`

**Stacked:** Single column centered, max-width 760. H1 70px on three lines, accent inline. PuzzleWidget centered below at max-width 900.

**Command:** Replaces puzzle widget with a command-palette mock — see `reference/direction-a.jsx` `HeroCommand()`. Mono input row at top with blinking caret animation, 4 result rows below (puzzle id / title / tag / difficulty). First row is "selected" — background tinted with `color-mix(in srgb, var(--accent) 6%, transparent)`.

### `<LogoStrip>`

Single row, padding `40px 0 14px`, top border `1px solid var(--line-soft)`, margin-top 80.
- Left label: mono uppercase 11.5px text-mute, "devs from"
- Six wordmarks: `["vercel","linear","figma","stripe","notion","retool"]` — Space Grotesk 600 17px, `var(--text-mute)`, opacity 0.85, letter-spacing −0.3
- Justify-content space-between

### `<HowItWorks>`

`SectionHeader`: eyebrow "The loop" / title "Solve. Learn. Ship better React." / sub "Bite-sized puzzles modeled on the bugs you actually hit at work. Three minutes a day stacks up fast."

3-column grid below, gap 18, padding-top 48. Each card: `padding: 24px 22px; border-radius: 12px; background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--line);`

Cards:
1. `01` · **Pick a puzzle** · "Hooks, state, perf, suspense, server components — daily drop, plus 240+ in the archive."
2. `02` · **Edit in-browser** · "Real React in a sandbox. No setup. Hit Run, watch tests turn green."
3. `03` · **Compare solutions** · "See how others solved it. Three idiomatic ways, ranked by readability and bundle size."

Number is mono 12px `var(--accent)` margin-bottom 22. Title 19/600/−0.3. Body 14 / 1.55 / `var(--text-dim)`.

### `<Tracks>`

Header: SectionHeader (eyebrow "Tracks", title "Pick what you want to get sharper at.") on the left + right-aligned link "Browse all 240 puzzles →" (mono 13, `var(--accent)`).

3-column grid, gap 14, padding-top 44. Cards same shell as HowItWorks. Inside each:
- Glyph cell: 28×28, radius 6, `var(--bg-2)`, `var(--accent)`, mono 13/700, with inset 1px line. Sitting next to track name (16/600). Gap 10.
- Blurb: 13.5 / 1.5 / text-dim, min-height 38
- Footer row: top border `1px solid var(--line-soft)`, padding-top 14, justify-between. Left: "{count} puzzles" mono 11.5 text-mute. Right: three `<DiffDot>` (easy/medium/hard) gap 4.

Tracks data:
```ts
const TRACKS = [
  { name: 'Hooks & lifecycles', glyph: 'h',   count: 42, blurb: 'useEffect deps, custom hooks, stale closures, refs vs state.' },
  { name: 'State & reducers',   glyph: 's',   count: 38, blurb: 'Lifting state, derived state, when (not) to reach for a reducer.' },
  { name: 'Rendering & perf',   glyph: 'p',   count: 31, blurb: 'Memo, key correctness, list virtualization, the offending parent.' },
  { name: 'Forms & inputs',     glyph: 'f',   count: 24, blurb: 'Controlled vs uncontrolled, validation, async submit, focus rings.' },
  { name: 'Suspense & data',    glyph: 'd',   count: 28, blurb: 'Race conditions, cache invalidation, optimistic UI, error boundaries.' },
  { name: 'Server components',  glyph: 'rsc', count: 19, blurb: 'Boundary placement, payload size, "use client" smell tests.' },
];
```

### `<Leaderboard>` section

2-column grid `1fr 1fr`, gap 60, align center.

Left column: SectionHeader (eyebrow "Leaderboard", title "Climb against 18,400 React devs.", sub "Daily, weekly and all-time boards. Streaks count. So does elegant code — peer-rated solutions earn a multiplier.") + button row (`See your rank →` primary, `How scoring works` ghost).

Right column: leaderboard card.
- Shell: `var(--bg-1)`, inset 1px line, radius 12, overflow hidden
- Header row: padding `14px 18px`, border-bottom `1px solid var(--line-soft)`, justify-between. Left: mono uppercase 11px text-mute "This week · global". Right: "● live" 11.5px `var(--accent)`.
- 5 rows, grid `40px 1fr 80px 70px 80px`, padding `13px 18px`, gap 10, mono 13:
  - Rank (zero-padded 2 digits, `var(--text-mute)`, top rank uses `var(--accent)`, 600 weight)
  - `@handle` (Space Grotesk 14, weight 500, you-row 600 in `var(--accent)`. If `you`, append `(you)` in mono 11 text-mute)
  - "{solved} solved" text-dim 12
  - "{streak}d streak" `var(--warn)` 12
  - XP right-aligned, `var(--text)`
  - When `you`, row background `color-mix(in srgb, var(--accent) 6%, transparent)`

```ts
const ROWS = [
  { rank: 1, who: 'm.cho',    solved: 218, streak: 47, xp: 14820, top: true },
  { rank: 2, who: 'devereux', solved: 211, streak: 32, xp: 14210 },
  { rank: 3, who: 'priya.k',  solved: 209, streak: 41, xp: 13960 },
  { rank: 4, who: 'fern_io',  solved: 204, streak: 18, xp: 13420 },
  { rank: 5, who: 'you',      solved: 138, streak:  6, xp:  9120, you: true },
];
```

### `<FooterCTA>`

Single panel: padding `54px 56px`, radius 14, `var(--bg-1)`, inset 1px line, flex space-between, gap 40.
- Left: H3 30/600/−0.6 "One puzzle a day. Your React stops being squishy." + p 15 text-dim "Free forever for the daily puzzle. Pro unlocks the archive, hints, and peer-rated solutions."
- Right: button row — primary "Start today's puzzle" + ghost "See pricing"

### `<Footer>`

Top border `1px solid var(--line-soft)`, padding `36px 0 48px`, margin-top 20. Inner Container, flex space-between align-center, gap 30:
- Left: `<Logo />`
- Middle: 5 links `["Puzzles","Pricing","Changelog","Discord","Privacy"]` — Space Grotesk 13 `var(--text-dim)`, gap 24
- Right: "v2026.5 · built in San Francisco" mono 12 `var(--text-mute)`

---

## `<PuzzleWidget>` — the interactive piece

Stateful component with **3 stages**:

```ts
type Stage = 0 | 1 | 2;  // idle (broken code) | running | passed (fixed code)
```

Transitions:
- **Idle → Running** when "Run tests" button is clicked
- **Running → Passed** after 900ms (`setTimeout`)
- **Passed → Idle** when "↻ Reset" button is clicked

### Layout (window-chrome card)

Shell: `var(--bg-1)`, inset 1px line, radius 12, overflow hidden, mono font.

**Header bar** (`var(--bg-2)`, padding `11px 14px`, bottom 1px line-soft):
- 3 traffic-light dots 9×9 radius 99 at 55% opacity, colors `var(--fail) / var(--warn) / var(--pass)`, gap 6
- File label (mono 11.5 text-mute, margin-left 6): `puzzles/use-state-loop · ` + `Counter.jsx` in text-dim
- Right side: `<DiffDot level="easy" />` + "easy · 4 min" 11px text-dim

**Prompt bar** (padding `12px 18px`, bottom 1px line-soft, Space Grotesk):
- Mono uppercase 11.5 text-mute letter-spacing 1.2 margin-bottom 4: "Puzzle #014"
- 15/500 text: "Fix the infinite render loop."

**Body grid** (`1fr 280px`, single column when `compact`):
- **Left:** `<pre>` with syntax-highlighted code. Padding `16px 18px`, 12.5/1.65, whitespace-pre. Shows `BROKEN` source when stage < 2, `FIXED` when stage === 2.
- **Right:** tests panel. Background `var(--bg-0)`, left border 1px line-soft, padding `14px 16px`.
  - Header: "TESTS" uppercase 10.5 text-mute letter-spacing 0.6 ↔ counter — "0 / 3" (idle) / "running…" (warn) / "3 / 3 passing" (pass)
  - 3 test rows, gap 8: 14×14 status square (radius 4, bg 12% color tint, color = status color, font 10/700) + text. Status: idle "✕" in fail color, running "·" in warn, passed "✓" in pass.
  - When passed, a confirmation pill below: `padding: 10px 12px; border-radius: 6px; color: var(--pass); inset 0 0 0 1px color-mix(var(--pass) 20%, transparent); background: color-mix(var(--pass) 6%, transparent);` text "Nice. +20 XP · streak 4 days"

**Footer bar** (`var(--bg-2)`, padding `10px 14px`, top 1px line-soft, flex space-between):
- Left status text (mono 11): idle "hint: dependency array · setter callback" / running "vitest · running 3 specs…" in warn / passed "solved in 47s · top 18% today" in pass
- Right button:
  - Idle / running: `▷ Run tests` (or `· · ·` when running, disabled). Style: mono 12 weight 600, padding `7px 12px`, radius 6, `var(--accent)` bg, `var(--accent-ink)` text. Translate Y -1 on hover when not running.
  - Passed: `↻ Reset` — ghost style (transparent, text-dim, inset 1px line)

### Code content

```ts
const BROKEN = `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <button>{count}</button>;
}`;

const FIXED = `function Counter() {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(c => c + 1);

  return <button onClick={onClick}>{count}</button>;
}`;

const TESTS = [
  { name: 'renders a button with count', passWhenFixed: true },
  { name: 'increments on click',         passWhenFixed: true },
  { name: 'does not loop on render',     passWhenFixed: true },
];
```

### `<CodeBlock>` syntax highlighter

Hand-rolled token-class regex (no Prism). The token map:

| Token | Color token | Notes |
|---|---|---|
| keyword | `var(--accent)` | `function const let var return if else for while import from export default useState useEffect useRef useMemo useCallback useReducer React` |
| function/ident | `var(--text)` | lowercase identifiers |
| jsx tag / Capitalized ident | `var(--accent-2)` | `<Counter`, `</button`, `React` |
| string | `var(--warn)` | `"…" '…' \`…\`` |
| number | `var(--warn)` | |
| comment | `var(--text-mute)` | `// …` |
| operator | `var(--text-mute)` | `{}()[];,.=+-*/<>!?:&\|` |
| whitespace | `var(--text-dim)` | passthrough |

Regex from the reference, port verbatim:
```ts
const RE = /(\/\/.*?$)|(["'`].*?["'`])|(\b\d+\b)|(<\/?[A-Za-z][A-Za-z0-9]*)|([A-Za-z_][A-Za-z0-9_]*)|([{}()\[\];,.=+\-*/<>!?:&|])|(\s+)/gms;
```

---

## Interactions & Behavior

- **Nav scroll progress** updates on `scroll` (passive listener)
- **Nav sticky:** never collapses, stays visible
- **PuzzleWidget Run** transitions idle → running → passed (900ms hold). Disabled during running. **Reset** returns to idle.
- **Button hover:** translate-Y -1px transform on the PuzzleWidget Run button only; site-wide `<Button>` gets a subtle background filter (you can use `:hover { filter: brightness(1.05); }`).
- **Theme switch:** `localStorage["hb-theme"]` overrides OS pref; both modes are first-class. Add an unobtrusive theme toggle in the nav (a small sun/moon icon button, ghost variant).
- **All transitions:** `.15s ease` for transforms, default for everything else.

## State Management

Only `<PuzzleWidget>` and `<ThemeProvider>` need state. No global store needed.

- `useState<Stage>` and `useRef` for the run timeout in PuzzleWidget
- `useState<"ink" | "paper">` and `localStorage` sync in ThemeProvider
- Cleanup the run timer on unmount

## Responsive

The reference is designed at 1280px desktop. Below that, suggested breakpoints (not in the reference — judgment call):
- `<1100`: hero collapses to single column (split → stacked layout), puzzle widget below
- `<900`: tracks grid 2 cols
- `<700`: tracks/howitworks/leaderboard grids 1 col, nav links → hamburger or hidden, FooterCTA stacks vertically
- Stat row in hero wraps

## Assets

- **Logo:** inline SVG — see `<Logo>` section above. No external image needed.
- **Fonts:** Space Grotesk + JetBrains Mono via Google Fonts. Both are open-license.
- **Icons:** none used. The track glyphs are short text strings (`h`, `s`, `p`, `f`, `d`, `rsc`) — keep this; do not swap in an icon set.
- **No raster images** are required for the page itself.

## Copy

All copy in this README is final and ready to ship. If you tweak it, keep:
- Friendly, second-person tone
- No exclamation marks
- Mono for any technical strings, ids, file paths
- "Pro" not "Premium"

## Files in this Bundle

`reference/` contains the working HTML prototype. Open `Landing Page.html` in a browser to see the exact target rendering; toggle palette and hero layout via the Tweaks panel (right edge).

- `Landing Page.html` — entry point, loads everything
- `brand.jsx` — theme definitions, Logo, Nav, Button, Chip, DiffDot, SectionHeader, Container
- `puzzle-widget.jsx` — PuzzleWidget + Code highlighter + tokenizer
- `direction-a.jsx` — page composition + 3 hero variants + Leaderboard + Footer
- `app.jsx` — top-level App, theme switching, tweaks wiring
- `tweaks-panel.jsx` — dev-time UI for switching palette/layout (not needed in production)

The prototype uses inline `style={{}}` for everything — translate these into the matching `.css` file per component. Use the design tokens above so light/dark switches "just work."

---

## Verification Checklist

- [ ] Both Ink (dark) and Paper (light) themes look correct, switch via `<html data-theme>` attribute
- [ ] OS `prefers-color-scheme` chooses the right default
- [ ] `localStorage["hb-theme"]` override persists across reloads
- [ ] Sticky nav stays pinned, progress bar tracks scroll
- [ ] PuzzleWidget Run → tests turn green after ~900ms, code morphs from broken → fixed
- [ ] PuzzleWidget Reset returns to idle state
- [ ] All accent colors come from CSS tokens (no hardcoded `#c98a5b` etc. outside `index.css`)
- [ ] No gradient text, no glow shadows, no neon mint
- [ ] Logo is the bracket-hook glyph, NOT a React atom shape
- [ ] Buttons keyboard-focusable with visible focus ring (add `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`)
