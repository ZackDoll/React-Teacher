// Live puzzle widget — interactive. Theme-aware.

function PuzzleWidget({ compact = false }) {
  const [stage, setStage] = React.useState(0);
  const [hoverRun, setHoverRun] = React.useState(false);

  const run = () => {
    if (stage === 1) return;
    setStage(1);
    setTimeout(() => setStage(s => s === 1 ? 2 : s), 900);
  };
  const reset = () => setStage(0);

  const broken = `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <button>{count}</button>;
}`;

  const fixed = `function Counter() {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(c => c + 1);

  return <button onClick={onClick}>{count}</button>;
}`;

  const code = stage === 2 ? fixed : broken;

  const tests = [
    { name: 'renders a button with count', pass: stage === 2 },
    { name: 'increments on click', pass: stage === 2 },
    { name: 'does not loop on render', pass: stage === 2 },
  ];

  return (
    <div style={{
      borderRadius: 12,
      background: BRAND.bg1,
      boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    }}>
      {/* window header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 14px', borderBottom: `1px solid ${BRAND.lineSoft}`,
        background: BRAND.bg2,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[BRAND.fail, BRAND.warn, BRAND.pass].map((c, i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: 99, background: c, opacity: 0.55 }} />
          ))}
        </div>
        <span style={{ marginLeft: 6, fontSize: 11.5, color: BRAND.textMute, letterSpacing: 0.2 }}>
          puzzles/use-state-loop · <span style={{ color: BRAND.textDim }}>Counter.jsx</span>
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <DiffDot level="easy" />
          <span style={{ fontSize: 11, color: BRAND.textDim }}>easy · 4 min</span>
        </div>
      </div>

      {/* prompt */}
      <div style={{
        padding: '12px 18px', borderBottom: `1px solid ${BRAND.lineSoft}`,
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}>
        <div style={{
          fontSize: 11.5, color: BRAND.textMute, letterSpacing: 1.2,
          textTransform: 'uppercase', marginBottom: 4,
          fontFamily: '"JetBrains Mono", monospace',
        }}>Puzzle #014</div>
        <div style={{ fontSize: 15, color: BRAND.text, fontWeight: 500 }}>
          Fix the infinite render loop.
        </div>
      </div>

      {/* code + tests */}
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 280px' }}>
        <pre style={{
          margin: 0, padding: '16px 18px',
          fontSize: 12.5, lineHeight: 1.65, color: BRAND.textDim,
          whiteSpace: 'pre', overflow: 'hidden',
          background: BRAND.bg1,
        }}>
          <Code source={code} />
        </pre>

        {!compact && (
          <div style={{
            background: BRAND.bg0,
            borderLeft: `1px solid ${BRAND.lineSoft}`,
            padding: '14px 16px',
            fontSize: 12, color: BRAND.textDim,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 10,
            }}>
              <span style={{
                color: BRAND.textMute, letterSpacing: 0.6,
                textTransform: 'uppercase', fontSize: 10.5,
              }}>Tests</span>
              <span style={{
                color: stage === 2 ? BRAND.pass : stage === 1 ? BRAND.warn : BRAND.textMute,
                fontSize: 11,
              }}>
                {stage === 2 ? '3 / 3 passing' : stage === 1 ? 'running…' : '0 / 3'}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tests.map((t, i) => {
                const c = stage === 1 ? BRAND.warn : t.pass ? BRAND.pass : BRAND.fail;
                return (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: 4,
                      background: `${c}1f`, color: c,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1,
                    }}>{stage === 1 ? '·' : t.pass ? '✓' : '✕'}</span>
                    <span style={{ color: t.pass ? BRAND.text : BRAND.textDim, lineHeight: 1.4 }}>{t.name}</span>
                  </li>
                );
              })}
            </ul>
            {stage === 2 && (
              <div style={{
                marginTop: 14, padding: '10px 12px', borderRadius: 6,
                color: BRAND.pass, fontSize: 11.5, lineHeight: 1.4,
                boxShadow: `inset 0 0 0 1px ${BRAND.pass}33`,
                background: `${BRAND.pass}10`,
              }}>
                Nice. +20 XP · streak 4 days
              </div>
            )}
          </div>
        )}
      </div>

      {/* footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        borderTop: `1px solid ${BRAND.lineSoft}`,
        background: BRAND.bg2,
      }}>
        <div style={{ fontSize: 11, color: BRAND.textMute }}>
          {stage === 0 && 'hint: dependency array · setter callback'}
          {stage === 1 && <span style={{ color: BRAND.warn }}>vitest · running 3 specs…</span>}
          {stage === 2 && <span style={{ color: BRAND.pass }}>solved in 47s · top 18% today</span>}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {stage === 2 ? (
            <button onClick={reset} style={pwBtnStyle('ghost')}>↻ Reset</button>
          ) : (
            <button onClick={run} disabled={stage === 1}
              onMouseEnter={() => setHoverRun(true)} onMouseLeave={() => setHoverRun(false)}
              style={{
                ...pwBtnStyle('primary'),
                transform: hoverRun && stage !== 1 ? 'translateY(-1px)' : 'none',
              }}>
              {stage === 1 ? '· · ·' : '▷ Run tests'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function pwBtnStyle(variant) {
  const base = {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 12, padding: '7px 12px', borderRadius: 6, cursor: 'pointer',
    border: 'none', transition: 'transform .15s ease',
  };
  if (variant === 'primary') return {
    ...base, background: BRAND.accent, color: BRAND.accentInk, fontWeight: 600,
  };
  return {
    ...base, background: 'transparent', color: BRAND.textDim,
    boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
  };
}

// Token-class highlighter — theme-aware.
function Code({ source }) {
  const palette = {
    kw: BRAND.accent,
    fn: BRAND.text,
    str: BRAND.warn,
    num: BRAND.warn,
    cmt: BRAND.textMute,
    jsx: BRAND.accent2,
    op: BRAND.textMute,
    txt: BRAND.textDim,
  };
  const tokens = tokenize(source);
  return (
    <code style={{ fontFamily: 'inherit' }}>
      {tokens.map((t, i) => (
        <span key={i} style={{ color: palette[t.k] || palette.txt }}>{t.v}</span>
      ))}
    </code>
  );
}

function tokenize(src) {
  const out = [];
  const kw = new Set(['function','const','let','var','return','if','else','for','while','import','from','export','default','useState','useEffect','useRef','useMemo','useCallback','useReducer','React']);
  const re = /(\/\/.*?$)|(["'`].*?["'`])|(\b\d+\b)|(<\/?[A-Za-z][A-Za-z0-9]*)|([A-Za-z_][A-Za-z0-9_]*)|([{}()\[\];,.=+\-*/<>!?:&|])|(\s+)/gms;
  let m;
  while ((m = re.exec(src)) !== null) {
    const [, cmt, str, num, jsx, ident, op, ws] = m;
    if (cmt) out.push({ k:'cmt', v:cmt });
    else if (str) out.push({ k:'str', v:str });
    else if (num) out.push({ k:'num', v:num });
    else if (jsx) out.push({ k:'jsx', v:jsx });
    else if (ident) out.push({ k: kw.has(ident) ? 'kw' : (/^[A-Z]/.test(ident) ? 'jsx' : 'fn'), v: ident });
    else if (op) out.push({ k:'op', v:op });
    else if (ws) out.push({ k:'txt', v:ws });
  }
  return out;
}

Object.assign(window, { PuzzleWidget, Code });
