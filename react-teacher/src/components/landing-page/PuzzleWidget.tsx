import './PuzzleWidget.css';
import { useState, useEffect, useRef } from 'react';
import DiffDot from '../DiffDot.tsx';
import CodeBlock from './CodeBlock.tsx';

type Stage = 0 | 1 | 2;

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
  { name: 'renders a button with count',  detail: 'button element with numeric text content' },
  { name: 'increments on click',          detail: 'count increases by 1 on each click'       },
  { name: 'does not loop on render',      detail: 'no infinite re-render cycles detected'    },
];

function PreviewPane({ stage }: { stage: Stage }) {
  return (
    <div className="pw-preview">
      <div className="pw-preview__bar">
        <div className="pw-preview__dots">
          <span className="pw-preview__dot" />
          <span className="pw-preview__dot" />
          <span className="pw-preview__dot" />
        </div>
        <span className="pw-preview__url">localhost:3000</span>
      </div>
      <div className="pw-preview__content">
        {stage === 0 && (
          <div className="pw-preview__error">
            <div className="pw-preview__error-title">⚠ Uncaught Error</div>
            <div className="pw-preview__error-msg">
              Too many re-renders. React limits the number of renders to prevent an infinite loop.
            </div>
            <div className="pw-preview__error-src">Counter.jsx:5</div>
          </div>
        )}
        {stage === 1 && (
          <div className="pw-preview__loading">
            <span className="pw-preview__spinner" />
            <span className="pw-preview__loading-text">Rebuilding…</span>
          </div>
        )}
        {stage === 2 && (
          <div className="pw-preview__live">
            <button className="pw-preview__counter-btn">0</button>
            <span className="pw-preview__live-label">Counter working</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TestsPane({ stage }: { stage: Stage }) {
  return (
    <div className="pw-tests">
      <div className="pw-tests__header">
        <span className="pw-tests__suite">Counter.test.jsx</span>
        <span className="pw-tests__count" data-stage={stage}>
          {stage === 2 ? '3 / 3 passed' : stage === 1 ? 'running…' : '0 / 3 passed'}
        </span>
      </div>

      <ul className="pw-tests__list">
        {TESTS.map((t, i) => {
          const pass = stage === 2;
          const running = stage === 1;
          const status = running ? 'running' : pass ? 'pass' : 'fail';
          return (
            <li key={i} className="pw-tests__row">
              <span className="pw-tests__icon" data-status={status}>
                {running ? '·' : pass ? '✓' : '✕'}
              </span>
              <div className="pw-tests__info">
                <span className="pw-tests__name" data-pass={pass ? '' : undefined}>{t.name}</span>
                {!pass && !running && (
                  <span className="pw-tests__detail">{t.detail}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pw-tests__console">
        <div className="pw-tests__console-label">Console</div>
        {stage === 0 && (
          <div className="pw-tests__console-line pw-tests__console-line--error">
            Warning: Maximum update depth exceeded. Check the useEffect in Counter.
          </div>
        )}
        {stage === 1 && (
          <div className="pw-tests__console-line pw-tests__console-line--mute">
            vitest running 3 specs…
          </div>
        )}
        {stage === 2 && (
          <div className="pw-tests__console-line pw-tests__console-line--pass">
            All tests passed in 47ms
          </div>
        )}
      </div>

      {stage === 2 && (
        <div className="pw-tests__success">
          +20 XP · streak 4 days
        </div>
      )}
    </div>
  );
}

interface PuzzleWidgetProps {
  compact?: boolean;
}

export default function PuzzleWidget({ compact = false }: PuzzleWidgetProps) {
  const [stage, setStage] = useState<Stage>(0);
  const [hoverRun, setHoverRun] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = () => {
    if (stage === 1) return;
    setStage(1);
    timerRef.current = setTimeout(() => setStage(s => s === 1 ? 2 : s), 900);
  };

  const reset = () => setStage(0);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const code = stage === 2 ? FIXED : BROKEN;
  const lines = code.split('\n');

  return (
    <div className="puzzle-widget">

      {/* Title bar */}
      <div className="puzzle-widget__header">
        <div className="puzzle-widget__dots">
          <span className="puzzle-widget__dot puzzle-widget__dot--fail" />
          <span className="puzzle-widget__dot puzzle-widget__dot--warn" />
          <span className="puzzle-widget__dot puzzle-widget__dot--pass" />
        </div>
        <span className="puzzle-widget__file">
          puzzles/use-state-loop · <span className="puzzle-widget__filename">Counter.jsx</span>
        </span>
        <div className="puzzle-widget__meta">
          <DiffDot level="easy" />
          <span className="puzzle-widget__meta-label">easy · 4 min</span>
        </div>
      </div>

      {/* Prompt */}
      <div className="puzzle-widget__prompt">
        <div className="puzzle-widget__prompt-id">Puzzle #014</div>
        <div className="puzzle-widget__prompt-text">Fix the infinite render loop.</div>
      </div>

      {/* Body */}
      <div className="puzzle-widget__body" data-compact={compact ? '' : undefined}>

        {/* Code editor */}
        <div className="pw-editor">
          <div className="pw-editor__tabs">
            <span className="pw-editor__tab">Counter.jsx</span>
          </div>
          <div className="pw-editor__scroll">
            <div className="pw-editor__inner">
              <div className="pw-editor__gutter">
                {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              <pre className="pw-editor__pre">
                <CodeBlock source={code} />
              </pre>
            </div>
          </div>
        </div>

        {/* Right column: preview + tests */}
        {!compact && (
          <div className="pw-right">
            <PreviewPane stage={stage} />
            <TestsPane stage={stage} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="puzzle-widget__footer">
        <span className="puzzle-widget__hint" data-stage={stage}>
          {stage === 0 && 'hint: dependency array · setter callback'}
          {stage === 1 && 'vitest · running 3 specs…'}
          {stage === 2 && 'solved in 47s · top 18% today'}
        </span>
        <div className="puzzle-widget__footer-actions">
          {stage === 2 ? (
            <button className="puzzle-widget__btn puzzle-widget__btn--ghost" onClick={reset}>
              ↻ Reset
            </button>
          ) : (
            <button
              className="puzzle-widget__btn puzzle-widget__btn--primary"
              onClick={run}
              disabled={stage === 1}
              onMouseEnter={() => setHoverRun(true)}
              onMouseLeave={() => setHoverRun(false)}
              style={{ transform: hoverRun && stage !== 1 ? 'translateY(-1px)' : 'none' }}
            >
              {stage === 1 ? '· · ·' : '▷ Run tests'}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
