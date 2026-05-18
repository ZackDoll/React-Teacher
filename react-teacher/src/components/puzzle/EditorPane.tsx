import './EditorPane.css';
import { useState, useRef, useEffect } from 'react';
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

const PUSH_COOLDOWN_MS = 5000;

export default function EditorPane({ puzzle, stage, onRun, onEditorChange, onPushPreview }: EditorPaneProps) {
  const { theme } = useTheme();
  const monacoTheme = theme === 'ink' ? 'vs-dark' : 'vs';
  const [pushCooldown, setPushCooldown] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (cooldownTimer.current) clearTimeout(cooldownTimer.current); };
  }, []);

  const handlePush = () => {
    if (!onPushPreview || pushCooldown) return;
    onPushPreview();
    setPushCooldown(true);
    cooldownTimer.current = setTimeout(() => setPushCooldown(false), PUSH_COOLDOWN_MS);
  };

  return (
    <div className="editor-pane">
      <div className="editor-pane__toolbar">
        <div className="editor-pane__tabs">
          <span className="editor-pane__tab">{puzzle.filename}</span>
        </div>
        <div className="editor-pane__actions">
          {onPushPreview && (
            <Button variant="ghost" compact mono disabled={pushCooldown} onClick={handlePush}>
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
