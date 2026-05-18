// Direction A — "Split Console". Theme-aware. No gradients, no glow.
// heroLayout tweak: 'split' | 'stacked' | 'command'.

function DirectionA({ heroLayout = 'split' }) {
  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: BRAND.bg0, color: BRAND.text,
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      position: 'relative',
    }}>
      <Nav progress={0.28} />

      {/* HERO */}
      {heroLayout === 'split' && <HeroSplit />}
      {heroLayout === 'stacked' && <HeroStacked />}
      {heroLayout === 'command' && <HeroCommand />}

      {/* Logo strip */}
      <Container>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 36, justifyContent: 'space-between',
          padding: '40px 0 14px', borderTop: `1px solid ${BRAND.lineSoft}`, marginTop: 80,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11.5, letterSpacing: 1.4,
            color: BRAND.textMute, textTransform: 'uppercase',
          }}>devs from</span>
          {['vercel','linear','figma','stripe','notion','retool'].map(co => (
            <span key={co} style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 17,
              color: BRAND.textMute, opacity: 0.85, letterSpacing: -0.3,
            }}>{co}</span>
          ))}
        </div>
      </Container>

      {/* HOW IT WORKS */}
      <section style={{ padding: '90px 0' }}>
        <Container>
          <SectionHeader
            eyebrow="The loop"
            title="Solve. Learn. Ship better React."
            sub="Bite-sized puzzles modeled on the bugs you actually hit at work. Three minutes a day stacks up fast."
          />
          <div style={{
            marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18,
          }}>
            {[
              { n: '01', t: 'Pick a puzzle', d: 'Hooks, state, perf, suspense, server components — daily drop, plus 240+ in the archive.' },
              { n: '02', t: 'Edit in-browser', d: 'Real React in a sandbox. No setup. Hit Run, watch tests turn green.' },
              { n: '03', t: 'Compare solutions', d: 'See how others solved it. Three idiomatic ways, ranked by readability and bundle size.' },
            ].map((s) => (
              <div key={s.n} style={{
                padding: '24px 22px', borderRadius: 12,
                background: BRAND.bg1,
                boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
              }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                  color: BRAND.accent, marginBottom: 22,
                }}>{s.n}</div>
                <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: -0.3, marginBottom: 8, color: BRAND.text }}>{s.t}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: BRAND.textDim }}>{s.d}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRACKS */}
      <section style={{ padding: '40px 0 90px' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
            <SectionHeader
              eyebrow="Tracks"
              title="Pick what you want to get sharper at."
            />
            <a href="#" style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
              color: BRAND.accent, textDecoration: 'none', whiteSpace: 'nowrap',
            }}>Browse all 240 puzzles →</a>
          </div>
          <div style={{
            marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {TRACKS.map((t) => (
              <div key={t.name} style={{
                padding: '24px 22px', borderRadius: 12,
                background: BRAND.bg1,
                boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: BRAND.bg2, color: BRAND.accent,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700,
                    boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
                  }}>{t.glyph}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: BRAND.text }}>{t.name}</span>
                </div>
                <div style={{ fontSize: 13.5, color: BRAND.textDim, lineHeight: 1.5, minHeight: 38 }}>
                  {t.blurb}
                </div>
                <div style={{
                  marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 14, borderTop: `1px solid ${BRAND.lineSoft}`,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 11.5, color: BRAND.textMute,
                }}>
                  <span>{t.count} puzzles</span>
                  <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                    <DiffDot level="easy" /><DiffDot level="medium" /><DiffDot level="hard" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* LEADERBOARD */}
      <section style={{ padding: '40px 0 90px' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <SectionHeader
                eyebrow="Leaderboard"
                title="Climb against 18,400 React devs."
                sub="Daily, weekly and all-time boards. Streaks count. So does elegant code — peer-rated solutions earn a multiplier."
              />
              <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
                <Button>See your rank →</Button>
                <Button variant="ghost">How scoring works</Button>
              </div>
            </div>
            <Leaderboard />
          </div>
        </Container>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '40px 0 100px' }}>
        <Container>
          <div style={{
            borderRadius: 14, padding: '54px 56px',
            background: BRAND.bg1,
            boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
          }}>
            <div>
              <h3 style={{
                margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.1,
                color: BRAND.text, maxWidth: 480, textWrap: 'balance',
              }}>One puzzle a day. Your React stops being squishy.</h3>
              <p style={{ margin: '10px 0 0', color: BRAND.textDim, fontSize: 15, maxWidth: 460 }}>
                Free forever for the daily puzzle. Pro unlocks the archive, hints, and peer-rated solutions.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button>Start today's puzzle</Button>
              <Button variant="ghost">See pricing</Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

function HeroSplit() {
  return (
    <Container style={{ padding: '64px 60px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
          <h1 style={{
            margin: '22px 0 18px', fontSize: 62, lineHeight: 1.02,
            fontWeight: 600, letterSpacing: -1.8, textWrap: 'balance',
            color: BRAND.text,
          }}>
            React puzzles<br/>that teach you what<br/>
            <span style={{ color: BRAND.accent }}>senior code feels like.</span>
          </h1>
          <p style={{
            margin: 0, fontSize: 17.5, lineHeight: 1.55, color: BRAND.textDim,
            maxWidth: 460, textWrap: 'pretty',
          }}>
            Tiny bugs, broken hooks, gnarly re-renders — fix them in your browser, get instant feedback, level up faster than reading docs.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <Button>Solve today's puzzle</Button>
            <Button variant="ghost">Browse the archive</Button>
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 32 }}>
            {[
              ['240+', 'puzzles'],
              ['18.4k', 'solvers'],
              ['3 min', 'avg solve'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, color: BRAND.text }}>{n}</div>
                <div style={{ fontSize: 12, color: BRAND.textMute, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 0.6, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <PuzzleWidget />
      </div>
    </Container>
  );
}

function HeroStacked() {
  return (
    <Container style={{ padding: '70px 60px 30px' }}>
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
        <h1 style={{
          margin: '22px 0 18px', fontSize: 70, lineHeight: 1.02,
          fontWeight: 600, letterSpacing: -2.2, textWrap: 'balance', color: BRAND.text,
        }}>
          React puzzles that teach you what <span style={{ color: BRAND.accent }}>senior code</span> feels like.
        </h1>
        <p style={{
          margin: '0 auto', fontSize: 18, lineHeight: 1.55, color: BRAND.textDim,
          maxWidth: 560,
        }}>
          Tiny bugs, broken hooks, gnarly re-renders — fix them in your browser, get instant feedback, level up faster than reading docs.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 28, justifyContent: 'center' }}>
          <Button>Solve today's puzzle</Button>
          <Button variant="ghost">Browse the archive</Button>
        </div>
      </div>
      <div style={{ marginTop: 56, maxWidth: 900, margin: '56px auto 0' }}>
        <PuzzleWidget />
      </div>
    </Container>
  );
}

function HeroCommand() {
  return (
    <Container style={{ padding: '80px 60px 40px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
        </div>
        <h1 style={{
          margin: '22px 0 18px', fontSize: 58, lineHeight: 1.04,
          fontWeight: 600, letterSpacing: -1.6, textWrap: 'balance', textAlign: 'center',
          color: BRAND.text,
        }}>
          A workbench for your React reflexes.
        </h1>
        <p style={{
          margin: '0 auto 36px', fontSize: 17, lineHeight: 1.55, color: BRAND.textDim,
          maxWidth: 560, textAlign: 'center',
        }}>
          Type a puzzle id, a hook name, or a vibe. We'll find one for you.
        </p>
        <div style={{
          borderRadius: 12, background: BRAND.bg1,
          boxShadow: `inset 0 0 0 1px ${BRAND.line}`,
          overflow: 'hidden',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px', borderBottom: `1px solid ${BRAND.lineSoft}`,
          }}>
            <span style={{ color: BRAND.accent, fontSize: 14 }}>▷</span>
            <span style={{ fontSize: 14, color: BRAND.text }}>useState in a loop</span>
            <span style={{
              width: 8, height: 16, background: BRAND.accent, marginLeft: 1,
              animation: 'hb-blink 1s steps(2) infinite',
            }} />
            <span style={{ marginLeft: 'auto', fontSize: 11, color: BRAND.textMute }}>⌘K to search</span>
          </div>
          {[
            { id: '#014', title: 'Fix the infinite render loop', level: 'easy', tag: 'hooks' },
            { id: '#087', title: 'Why does this list not re-render?', level: 'medium', tag: 'state' },
            { id: '#132', title: 'Make this list virtualize without flicker', level: 'hard', tag: 'perf' },
            { id: '#201', title: 'Suspense boundary races a router', level: 'medium', tag: 'suspense' },
          ].map((r, i) => (
            <div key={r.id} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 90px 90px',
              alignItems: 'center', padding: '14px 18px', gap: 14,
              borderTop: i === 0 ? 'none' : `1px solid ${BRAND.lineSoft}`,
              fontSize: 13,
              background: i === 0 ? `${BRAND.accent}10` : 'transparent',
            }}>
              <span style={{ color: BRAND.textMute }}>{r.id}</span>
              <span style={{ color: BRAND.text, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500 }}>{r.title}</span>
              <span style={{ color: BRAND.textDim }}>{r.tag}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: BRAND.textDim, justifySelf: 'end' }}>
                <DiffDot level={r.level} /> {r.level}
              </span>
            </div>
          ))}
        </div>
        <style>{`@keyframes hb-blink { 50% { opacity: 0; } }`}</style>
      </div>
    </Container>
  );
}

const TRACKS = [
  { name: 'Hooks & lifecycles', glyph: 'h', count: 42, blurb: 'useEffect deps, custom hooks, stale closures, refs vs state.' },
  { name: 'State & reducers', glyph: 's', count: 38, blurb: 'Lifting state, derived state, when (not) to reach for a reducer.' },
  { name: 'Rendering & perf', glyph: 'p', count: 31, blurb: 'Memo, key correctness, list virtualization, the offending parent.' },
  { name: 'Forms & inputs', glyph: 'f', count: 24, blurb: 'Controlled vs uncontrolled, validation, async submit, focus rings.' },
  { name: 'Suspense & data', glyph: 'd', count: 28, blurb: 'Race conditions, cache invalidation, optimistic UI, error boundaries.' },
  { name: 'Server components', glyph: 'rsc', count: 19, blurb: 'Boundary placement, payload size, "use client" smell tests.' },
];

function Leaderboard() {
  const rows = [
    { rank: 1, who: 'm.cho', solved: 218, streak: 47, xp: 14820, top: true },
    { rank: 2, who: 'devereux', solved: 211, streak: 32, xp: 14210 },
    { rank: 3, who: 'priya.k', solved: 209, streak: 41, xp: 13960 },
    { rank: 4, who: 'fern_io', solved: 204, streak: 18, xp: 13420 },
    { rank: 5, who: 'you', solved: 138, streak: 6, xp: 9120, you: true },
  ];
  return (
    <div style={{
      borderRadius: 12, background: BRAND.bg1,
      boxShadow: `inset 0 0 0 1px ${BRAND.line}`, overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px', display: 'flex', justifyContent: 'space-between',
        borderBottom: `1px solid ${BRAND.lineSoft}`, alignItems: 'center',
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 1.4,
          color: BRAND.textMute, textTransform: 'uppercase',
        }}>This week · global</span>
        <span style={{ fontSize: 11.5, color: BRAND.accent }}>● live</span>
      </div>
      {rows.map((r) => (
        <div key={r.who} style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 80px 70px 80px',
          alignItems: 'center', padding: '13px 18px', gap: 10,
          background: r.you ? `${BRAND.accent}10` : 'transparent',
          borderTop: `1px solid ${BRAND.lineSoft}`,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
        }}>
          <span style={{ color: r.top ? BRAND.accent : BRAND.textMute, fontWeight: 600 }}>{r.rank.toString().padStart(2,'0')}</span>
          <span style={{
            color: r.you ? BRAND.accent : BRAND.text, fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: r.you ? 600 : 500, fontSize: 14,
          }}>@{r.who}{r.you && <span style={{ marginLeft: 8, fontSize: 11, color: BRAND.textMute }}>(you)</span>}</span>
          <span style={{ color: BRAND.textDim, fontSize: 12 }}>{r.solved} solved</span>
          <span style={{ color: BRAND.warn, fontSize: 12 }}>{r.streak}d streak</span>
          <span style={{ color: BRAND.text, textAlign: 'right' }}>{r.xp.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${BRAND.lineSoft}`,
      padding: '36px 0 48px', marginTop: 20,
    }}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 30 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: BRAND.textDim, fontFamily: '"Space Grotesk", sans-serif' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Puzzles</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Changelog</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Discord</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          </div>
          <div style={{ fontSize: 12, color: BRAND.textMute, fontFamily: '"JetBrains Mono", monospace' }}>
            v2026.5 · built in San Francisco
          </div>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { DirectionA });
