import './EditorPane.css';
import Editor from '@monaco-editor/react';
import type { Puzzle } from '../../api/puzzles.ts';
import { useTheme } from '../../theme/useTheme.ts';
import Button from '../Button.tsx';

type Stage = 0 | 1 | 2;

interface EditorPaneProps {
  puzzle: Puzzle;
  stage: Stage;
  onRun: () => void;
  onEditorChange: (value: string) => void;
  onPushPreview?: () => void;
}

export default function EditorPane({ puzzle, stage, onRun, onEditorChange, onPushPreview }: EditorPaneProps) {
  const { theme } = useTheme();
  const monacoTheme = theme === 'ink' ? 'vs-dark' : 'vs';

  return (
    <div className="editor-pane">
      <div className="editor-pane__toolbar">
        <div className="editor-pane__tabs">
          <span className="editor-pane__tab">{puzzle.filename}</span>
        </div>
        <div className="editor-pane__actions">
          {onPushPreview && (
            <Button variant="ghost" compact mono onClick={onPushPreview}>
              ↑ Preview
            </Button>
          )}
          <Button
            variant="primary"
            compact
            mono
            disabled={stage === 1}
            onClick={onRun}
          >
            {stage === 1 ? '· · ·' : '▷ Run tests'}
          </Button>
        </div>
      </div>
      <div className="editor-pane__editor">
        <Editor
          height="100%"
          language="javascript"
          theme={monacoTheme}
          defaultValue={puzzle.broken}
          onChange={(value) => onEditorChange(value ?? '')}
          options={{
            minimap: { enabled: false },
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 13,
            lineHeight: 21,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
