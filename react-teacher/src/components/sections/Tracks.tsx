import './Tracks.css';
import Container from '../Container.tsx';
import SectionHeader from '../SectionHeader.tsx';
import DiffDot from '../DiffDot.tsx';

const TRACKS = [
  { name: 'Hooks & lifecycles', glyph: 'h',   count: 42, blurb: 'useEffect deps, custom hooks, stale closures, refs vs state.' },
  { name: 'State & reducers',   glyph: 's',   count: 38, blurb: 'Lifting state, derived state, when (not) to reach for a reducer.' },
  { name: 'Rendering & perf',   glyph: 'p',   count: 31, blurb: 'Memo, key correctness, list virtualization, the offending parent.' },
  { name: 'Forms & inputs',     glyph: 'f',   count: 24, blurb: 'Controlled vs uncontrolled, validation, async submit, focus rings.' },
  { name: 'Suspense & data',    glyph: 'd',   count: 28, blurb: 'Race conditions, cache invalidation, optimistic UI, error boundaries.' },
  { name: 'Server components',  glyph: 'rsc', count: 19, blurb: 'Boundary placement, payload size, "use client" smell tests.' },
];

export default function Tracks() {
  return (
    <section className="tracks">
      <Container>
        <div className="tracks__header">
          <SectionHeader eyebrow="Tracks" title="Pick what you want to get sharper at." />
          <a href="#" className="tracks__browse-link">Browse all 240 puzzles →</a>
        </div>
        <div className="tracks__grid">
          {TRACKS.map(t => (
            <div key={t.name} className="tracks__card">
              <div className="tracks__card-header">
                <span className="tracks__glyph">{t.glyph}</span>
                <span className="tracks__name">{t.name}</span>
              </div>
              <div className="tracks__blurb">{t.blurb}</div>
              <div className="tracks__card-footer">
                <span className="tracks__count">{t.count} puzzles</span>
                <span className="tracks__dots">
                  <DiffDot level="easy" />
                  <DiffDot level="medium" />
                  <DiffDot level="hard" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
