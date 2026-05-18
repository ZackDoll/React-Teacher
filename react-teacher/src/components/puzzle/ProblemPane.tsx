import './ProblemPane.css';
import type { Puzzle } from '../../api/puzzles.ts';
import DiffDot from '../DiffDot.tsx';
import Chip from '../Chip.tsx';

type Stage = 0 | 1 | 2;

interface ProblemPaneProps {
  puzzle: Puzzle;
  stage: Stage;
}

export default function ProblemPane({ puzzle, stage }: ProblemPaneProps) {
  const pass    = stage === 2;
  const running = stage === 1;

  return (
    <aside className="problem-pane">
      <div className="problem-pane__scroll">

        <header className="problem-pane__header">
          <span className="problem-pane__id">Puzzle #{puzzle.id}</span>
          <h1 className="problem-pane__title">{puzzle.title}</h1>
          <div className="problem-pane__meta">
            <DiffDot level={puzzle.difficulty} />
            <Chip tone="muted">{puzzle.tag}</Chip>
          </div>
        </header>

        <div className="problem-pane__description">
          {puzzle.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <section className="problem-pane__section">
          <div className="problem-pane__section-label">Tests</div>
          <ul className="problem-pane__tests">
            {puzzle.tests.map((t, i) => {
              const status = running ? 'running' : pass ? 'pass' : 'fail';
              return (
                <li key={i} className="problem-pane__test-row">
                  <span className="problem-pane__test-icon" data-status={status}>
                    {running ? '·' : pass ? '✓' : '✕'}
                  </span>
                  <div className="problem-pane__test-info">
                    <span className="problem-pane__test-name" data-pass={pass ? '' : undefined}>
                      {t.name}
                    </span>
                    {!pass && !running && (
                      <span className="problem-pane__test-detail">{t.detail}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="problem-pane__section">
          <div className="problem-pane__section-label">Console</div>
          <div className="problem-pane__console">
            {stage === 0 && (
              <div className="problem-pane__console-line problem-pane__console-line--error">
                {puzzle.consoleOutput}
              </div>
            )}
            {stage === 1 && (
              <div className="problem-pane__console-line problem-pane__console-line--mute">
                vitest running 3 specs…
              </div>
            )}
            {stage === 2 && (
              <div className="problem-pane__console-line problem-pane__console-line--pass">
                All tests passed in 47ms
              </div>
            )}
          </div>
        </section>

      </div>
    </aside>
  );
}
