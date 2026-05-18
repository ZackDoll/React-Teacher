// Hookbench brand atoms with swappable theme.
// 3 grounded palettes — no neon glow, no gradient text. Tweak switches them at runtime.

const THEMES = {
  // Warm dark — like a worn leather notebook. No glow.
  ink: {
    name: 'ink',
    bg0: '#14161a',
    bg1: '#1b1e23',
    bg2: '#23272f',
    line: '#2c3038',
    lineSoft: '#23272e',
    text: '#ebe7dd',
    textDim: '#9da3ad',
    textMute: '#6a7280',
    accent: '#c98a5b',      // clay / amber-ochre
    accentInk: '#1a1814',   // text-on-accent
    accent2: '#7f9b86',     // moss
    pass: '#7f9b86',
    fail: '#b8645e',
    warn: '#c98a5b',
    chrome: '#6a7280',
    isDark: true,
  },
  // Warm light — editorial paper. Single deep accent.
  paper: {
    name: 'paper',
    bg0: '#efeae0',
    bg1: '#f8f4ea',
    bg2: '#e6dfce',
    line: '#cfc6ad',
    lineSoft: '#ddd5c0',
    text: '#1d1a13',
    textDim: '#5b5446',
    textMute: '#867d6c',
    accent: '#1f5d4e',      // forest teal
    accentInk: '#f8f4ea',
    accent2: '#a04428',     // brick
    pass: '#1f5d4e',
    fail: '#a04428',
    warn: '#9c6f1c',
    chrome: '#867d6c',
    isDark: false,
  },
  // Cool light slate — quiet, technical, professional.
  slate: {
    name: 'slate',
    bg0: '#eff1f5',
    bg1: '#fafbfc',
    bg2: '#e2e6ec',
    line: '#c8cdd6',
    lineSoft: '#d8dde4',
    text: '#0f1419',
    textDim: '#4a5468',
    textMute: '#7d8595',
    accent: '#2748b8',      // ink blue
    accentInk: '#fafbfc',
    accent2: '#9c3a31',     // muted red
    pass: '#2748b8',
    fail: '#9c3a31',
    warn: '#8a6018',
    chrome: '#7d8595',
    isDark: false,
  },
};

// Mutable live BRAND. Components reference it at render time; setTheme + re-render swaps it.
const BRAND = {
  name: 'Hookbench',
  ...THEMES.ink,
};

function setTheme(name) {
  const t = THEMES[name] || THEMES.ink;
  Object.assign(BRAND, t);
}

// Logo: original hook glyph (no atom/orbit). Bracket + workbench dot.
function Logo({ size = 22, color = null, ink = null, withWordmark = true }) {
  const c = color || BRAND.accent;
  const t = ink || BRAND.text;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M20 5 L11 5 Q5 5 5 11 L5 21 Q5 27 11 27 L20 27"
          stroke={c} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M16 16 H24" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="26" cy="16" r="3" fill={c} />
      </svg>
      {withWordmark && (
        <span style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontWeight: 600, fontSize: 17, color: t, letterSpacing: -0.2
        }}>Hookbench</span>
      )}
    </div>
  );
}

function Nav({ progress = 0.32 }) {
  const items = ['Puzzles', 'Tracks', 'Leaderboard', 'Pricing'];
  const bgGlass = BRAND.isDark
    ? 'rgba(20,22,26,0.72)'
    : 'rgba(255,255,255,0.78)';
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: bgGlass, backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${BRAND.lineSoft}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px', maxWidth: 1280, margin: '0 auto',
      }}>
        <Logo />
        <nav style={{ display: 'flex', gap: 28 }}>
          {items.map((label, i) => (
            <a key={label} href="#" style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: 14, color: i === 0 ? BRAND.text : BRAND.textDim,
              textDecoration: 'none', fontWeight: 500,
            }}>{label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#" style={{
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            fontSize: 13.5, color: BRAND.textDim, textDecoration: 'none', fontWeight: 500,
          }}>Sign in</a>
          <Button compact>Start solving</Button>
        </div>
      </div>
      {/* scroll-progress hairline — flat color, no glow */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2 }}>
        <div style={{
          width: `${progress * 100}%`, height: '100%',
          background: BRAND.accent,
        }} />
      </div>
    </div>
  );
}

function Button({ children, variant = 'primary', compact = false, mono = false }) {
  const base = {
    fontFamily: mono ? '"JetBrains Mono", ui-monospace, monospace' : '"Space Grotesk", system-ui, sans-serif',
    fontWeight: mono ? 500 : 600,
    fontSize: compact ? 13 : 14.5,
    letterSpacing: mono ? 0 : -0.1,
    padding: compact ? '8px 14px' : '12px 18px',
    borderRadius: 7,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'transform .15s ease',
  };
  const styles = variant === 'primary' ? {
    background: BRAND.accent, color: BRAND.accentInk,
  } : variant === 'ghost' ? {
    background: 'transparent', color: BRAND.text,
    boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
  } : {
    background: BRAND.bg2, color: BRAND.text,
    boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
  };
  return <button style={{ ...base, ...styles }}>{children}</button>;
}

function Chip({ children, tone = 'accent' }) {
  const color = tone === 'accent' ? BRAND.accent : tone === 'warn' ? BRAND.warn : BRAND.chrome;
  const bg = BRAND.isDark ? `${color}1a` : `${color}14`;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11.5, letterSpacing: 0.2,
      padding: '5px 10px', borderRadius: 999,
      background: bg, color,
      boxShadow: `inset 0 0 0 1px ${color}33`,
    }}>{children}</span>
  );
}

function DiffDot({ level = 'easy' }) {
  const c = level === 'easy' ? BRAND.accent2 : level === 'medium' ? BRAND.warn : BRAND.fail;
  return <span style={{ width: 7, height: 7, borderRadius: 99, background: c, display: 'inline-block' }} />;
}

function SectionHeader({ eyebrow, title, sub, align = 'left' }) {
  return (
    <div style={{ textAlign: align, maxWidth: 720, margin: align === 'center' ? '0 auto' : 0 }}>
      {eyebrow && (
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 12, letterSpacing: 1.6, color: BRAND.accent, textTransform: 'uppercase',
          marginBottom: 14,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        fontWeight: 600, fontSize: 38, letterSpacing: -0.8, lineHeight: 1.08,
        color: BRAND.text, margin: 0, textWrap: 'balance',
      }}>{title}</h2>
      {sub && (
        <p style={{
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: 16, lineHeight: 1.55, color: BRAND.textDim,
          marginTop: 14, textWrap: 'pretty',
        }}>{sub}</p>
      )}
    </div>
  );
}

function Container({ children, pad = '0 60px', style = {} }) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: pad, ...style }}>{children}</div>
  );
}

Object.assign(window, { BRAND, THEMES, setTheme, Logo, Nav, Button, Chip, DiffDot, SectionHeader, Container });
