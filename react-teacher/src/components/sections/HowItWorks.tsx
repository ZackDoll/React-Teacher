import './HowItWorks.css';
import Container from '../Container.tsx';
import SectionHeader from '../SectionHeader.tsx';

const STEPS = [
  {
    n: '01',
    t: 'Pick a puzzle',
    d: 'Hooks, state, perf, suspense, server components — daily drop, plus 240+ in the archive.',
  },
  {
    n: '02',
    t: 'Edit in-browser',
    d: 'Real React in a sandbox. No setup. Hit Run, watch tests turn green.',
  },
  {
    n: '03',
    t: 'Compare solutions',
    d: 'See how others solved it. Three idiomatic ways, ranked by readability and bundle size.',
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw">
      <Container>
        <SectionHeader
          eyebrow="The loop"
          title="Solve. Learn. Ship better React."
          sub="Bite-sized puzzles modeled on the bugs you actually hit at work. Three minutes a day stacks up fast."
        />
        <div className="hiw__grid">
          {STEPS.map(s => (
            <div key={s.n} className="hiw__card">
              <div className="hiw__card-num">{s.n}</div>
              <div className="hiw__card-title">{s.t}</div>
              <div className="hiw__card-body">{s.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
