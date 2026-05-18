import './PuzzlePage.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getPuzzle } from '../api/puzzles.ts';
import type { Puzzle } from '../api/puzzles.ts';
import ProblemPane from '../components/puzzle/ProblemPane.tsx';
import EditorPane from '../components/puzzle/EditorPane.tsx';
import DiffDot from '../components/DiffDot.tsx';
import Chip from '../components/Chip.tsx';

type Stage = 0 | 1 | 2;

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; puzzle: Puzzle };

export default function PuzzlePage() {
  const { id } = useParams<{ id: string }>();
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'loading' });
  const [stage, setStage] = useState<Stage>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<string>('');

  useEffect(() => {
    if (!id) return;
    getPuzzle(id).then(puzzle => {
      if (puzzle) {
        editorRef.current = puzzle.broken;
        setFetchState({ status: 'ok', puzzle });
      } else {
        setFetchState({ status: 'error', message: `Puzzle "${id}" not found.` });
      }
    });
  }, [id]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const run = () => {
    if (stage === 1) return;
    void editorRef.current;
    setStage(1);
    timerRef.current = setTimeout(() => setStage(s => s === 1 ? 2 : s), 900);
  };

  if (!id) return <Navigate to="/" replace />;

  if (fetchState.status === 'loading') {
    return <div className="puzzle-page puzzle-page--loading">Loading…</div>;
  }

  if (fetchState.status === 'error') {
    return <Navigate to="/" replace />;
  }

  const { puzzle } = fetchState;

  return (
    <div className="puzzle-page">
      <header className="puzzle-page__header">
        <Link to="/" className="puzzle-page__back">← Puzzles</Link>
        <span className="puzzle-page__id">#{puzzle.id}</span>
        <h1 className="puzzle-page__title">{puzzle.title}</h1>
        <DiffDot level={puzzle.difficulty} />
        <Chip tone="muted">{puzzle.tag}</Chip>
      </header>
      <div className="puzzle-page__panels">
        <ProblemPane puzzle={puzzle} stage={stage} />
        <EditorPane
          puzzle={puzzle}
          stage={stage}
          onRun={run}
          onEditorChange={(value) => { editorRef.current = value; }}
        />
      </div>
    </div>
  );
}
