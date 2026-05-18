import './PuzzlePage.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getPuzzle } from '../api/puzzles.ts';
import type { Puzzle } from '../api/puzzles.ts';
import ProblemPane from '../components/puzzle/ProblemPane.tsx';
import EditorPane from '../components/puzzle/EditorPane.tsx';
import PreviewPane from '../components/puzzle/PreviewPane.tsx';
import DiffDot from '../components/DiffDot.tsx';
import Chip from '../components/Chip.tsx';

type Stage = 0 | 1 | 2;

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; puzzle: Puzzle };

const LEFT_MIN_VW  = 0.15;
const LEFT_MAX_VW  = 0.45;
const LEFT_INIT_VW = 0.25;
const RIGHT_MIN_VW  = 0.15;
const RIGHT_MAX_VW  = 0.40;
const RIGHT_INIT_VW = 0.22;

export default function PuzzlePage() {
  const { id } = useParams<{ id: string }>();
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'loading' });
  const [stage, setStage] = useState<Stage>(0);
  const [leftWidth, setLeftWidth]         = useState(() => Math.round(window.innerWidth * LEFT_INIT_VW));
  const [dragging, setDragging]           = useState(false);
  const [rightWidth, setRightWidth]       = useState(() => Math.round(window.innerWidth * RIGHT_INIT_VW));
  const [rightDragging, setRightDragging] = useState(false);
  const [previewCode, setPreviewCode]     = useState('');
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef   = useRef<string>('');
  const dragStart      = useRef<{ x: number; width: number } | null>(null);
  const rightDragStart = useRef<{ x: number; width: number } | null>(null);

  useEffect(() => {
    if (!id) return;
    getPuzzle(id).then(puzzle => {
      if (puzzle) {
        editorRef.current = puzzle.broken;
        setPreviewCode(puzzle.broken);
        setFetchState({ status: 'ok', puzzle });
      } else {
        setFetchState({ status: 'error', message: `Puzzle "${id}" not found.` });
      }
    });
  }, [id]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (!dragStart.current) return;
      const vw = window.innerWidth;
      const delta = e.clientX - dragStart.current.x;
      setLeftWidth(Math.max(vw * LEFT_MIN_VW, Math.min(vw * LEFT_MAX_VW, dragStart.current.width + delta)));
    };
    const onUp = () => { setDragging(false); dragStart.current = null; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (!rightDragging) return;
    const onMove = (e: MouseEvent) => {
      if (!rightDragStart.current) return;
      const vw = window.innerWidth;
      const delta = rightDragStart.current.x - e.clientX;
      setRightWidth(Math.max(vw * RIGHT_MIN_VW, Math.min(vw * RIGHT_MAX_VW, rightDragStart.current.width + delta)));
    };
    const onUp = () => { setRightDragging(false); rightDragStart.current = null; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [rightDragging]);

  const onDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart.current = { x: e.clientX, width: leftWidth };
    setDragging(true);
  };

  const onRightDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    rightDragStart.current = { x: e.clientX, width: rightWidth };
    setRightDragging(true);
  };

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

  const gridCols = puzzle.preview
    ? `${leftWidth}px 5px 1fr 5px ${rightWidth}px`
    : `${leftWidth}px 5px 1fr`;

  return (
    <div className="puzzle-page" data-dragging={dragging || rightDragging ? '' : undefined}>
      <header className="puzzle-page__header">
        <Link to="/" className="puzzle-page__back">← Puzzles</Link>
        <span className="puzzle-page__id">#{puzzle.id}</span>
        <h1 className="puzzle-page__title">{puzzle.title}</h1>
        <DiffDot level={puzzle.difficulty} />
        <Chip tone="muted">{puzzle.tag}</Chip>
      </header>
      <div className="puzzle-page__panels" style={{ gridTemplateColumns: gridCols }}>
        <ProblemPane puzzle={puzzle} stage={stage} />
        <div
          className="puzzle-page__divider"
          onMouseDown={onDividerMouseDown}
          data-dragging={dragging ? '' : undefined}
        />
        <EditorPane
          puzzle={puzzle}
          stage={stage}
          onRun={run}
          onEditorChange={(value) => { editorRef.current = value; }}
          onPushPreview={puzzle.preview !== undefined ? () => setPreviewCode(editorRef.current) : undefined}
        />
        {puzzle.preview !== undefined && (
          <>
            <div
              className="puzzle-page__divider"
              onMouseDown={onRightDividerMouseDown}
              data-dragging={rightDragging ? '' : undefined}
            />
            <PreviewPane
              code={previewCode}
              componentName={puzzle.preview.componentName}
            />
          </>
        )}
      </div>
    </div>
  );
}
