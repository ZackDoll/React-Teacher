import './Hero.css';
import Chip from '../../Chip.tsx';
import Button from '../../Button.tsx';
import Container from '../../Container.tsx';
import DiffDot from '../../DiffDot.tsx';
import PuzzleWidget from '../PuzzleWidget.tsx';

export type HeroVariant = 'split' | 'stacked' | 'command';

interface HeroProps {
  variant?: HeroVariant;
}

export default function Hero({ variant = 'split' }: HeroProps) {
  if (variant === 'stacked') return <HeroStacked />;
  if (variant === 'command') return <HeroCommand />;
  return <HeroSplit />;
}

function HeroSplit() {
  return (
    <Container className="hero-split__container">
      <div className="hero-split__grid">
        <div className="hero-split__left">
          <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
          <h1 className="hero-split__h1">
            React puzzles that teach you what{' '}
            <span className="hero__accent">senior code feels like.</span>
          </h1>
          <p className="hero-split__sub">
            Tiny bugs, broken hooks, gnarly re-renders, fix them in your browser, get instant feedback, level up faster than reading docs.
          </p>
          <div className="hero__btn-row">
            <Button>Solve today's puzzle</Button>
            <Button variant="ghost">Browse the archive</Button>
          </div>
          <div className="hero-split__stats">
            {([['240+', 'puzzles'], ['18.4k', 'solvers'], ['3 min', 'avg solve']] as const).map(([n, l]) => (
              <div key={l} className="hero-split__stat">
                <div className="hero-split__stat-num">{n}</div>
                <div className="hero-split__stat-label">{l}</div>
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
    <Container className="hero-stacked__container">
      <div className="hero-stacked__inner">
        <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
        <h1 className="hero-stacked__h1">
          React puzzles that teach you what{' '}
          <span className="hero__accent">senior code</span> feels like.
        </h1>
        <p className="hero-stacked__sub">
          Tiny bugs, broken hooks, gnarly re-renders, fix them in your browser, get instant feedback, level up faster than reading docs.
        </p>
        <div className="hero__btn-row hero__btn-row--center">
          <Button>Solve today's puzzle</Button>
          <Button variant="ghost">Browse the archive</Button>
        </div>
      </div>
      <div className="hero-stacked__widget">
        <PuzzleWidget />
      </div>
    </Container>
  );
}

const COMMAND_ROWS = [
  { id: '#014', title: 'Fix the infinite render loop',              level: 'easy'   as const, tag: 'hooks'    },
  { id: '#087', title: 'Why does this list not re-render?',         level: 'medium' as const, tag: 'state'    },
  { id: '#132', title: 'Make this list virtualize without flicker', level: 'hard'   as const, tag: 'perf'     },
  { id: '#201', title: 'Suspense boundary races a router',          level: 'medium' as const, tag: 'suspense' },
];

function HeroCommand() {
  return (
    <Container className="hero-command__container">
      <div className="hero-command__inner">
        <div className="hero-command__chip-row">
          <Chip tone="accent">● Today's puzzle live · 02:14:41 left</Chip>
        </div>
        <h1 className="hero-command__h1">A workbench for your React reflexes.</h1>
        <p className="hero-command__sub">
          Type a puzzle id, a hook name, or a vibe. We'll find one for you.
        </p>
        <div className="hero-command__palette">
          <div className="hero-command__search">
            <span className="hero-command__arrow">▷</span>
            <span className="hero-command__query">useState in a loop</span>
            <span className="hero-command__caret" />
            <span className="hero-command__kbd">⌘K to search</span>
          </div>
          {COMMAND_ROWS.map((r, i) => (
            <div key={r.id} className="hero-command__row" data-selected={i === 0 ? '' : undefined}>
              <span className="hero-command__row-id">{r.id}</span>
              <span className="hero-command__row-title">{r.title}</span>
              <span className="hero-command__row-tag">{r.tag}</span>
              <span className="hero-command__row-level">
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
