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
  { name: 'renders a button with count' },
  { name: 'increments on click' },
  { name: 'does not loop on render' },
];

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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const code = stage === 2 ? FIXED : BROKEN;

  return (
    <div className="puzzle-widget">
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

      <div className="puzzle-widget__prompt">
        <div className="puzzle-widget__prompt-id">Puzzle #014</div>
        <div className="puzzle-widget__prompt-text">Fix the infinite render loop.</div>
      </div>

      <div className="puzzle-widget__body" data-compact={compact ? '' : undefined}>
        <pre className="puzzle-widget__code">
          <CodeBlock source={code} />
        </pre>

        {!compact && (
          <div className="puzzle-widget__tests">
            <div className="puzzle-widget__tests-header">
              <span className="puzzle-widget__tests-label">Tests</span>
              <span className="puzzle-widget__tests-count" data-stage={stage}>
                {stage === 2 ? '3 / 3 passing' : stage === 1 ? 'running…' : '0 / 3'}
              </span>
            </div>
            <ul className="puzzle-widget__test-list">
              {TESTS.map((t, i) => {
                const pass = stage === 2;
                const running = stage === 1;
                return (
                  <li key={i} className="puzzle-widget__test-row">
                    <span
                      className="puzzle-widget__test-icon"
                      data-status={running ? 'running' : pass ? 'pass' : 'fail'}
                    >
                      {running ? '·' : pass ? '✓' : '✕'}
                    </span>
                    <span className="puzzle-widget__test-name" data-pass={pass ? '' : undefined}>
                      {t.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            {stage === 2 && (
              <div className="puzzle-widget__success">
                Nice. +20 XP · streak 4 days
              </div>
            )}
          </div>
        )}
      </div>

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
