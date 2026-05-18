import './PreviewPane.css';
import { useEffect, useRef, useState } from 'react';
import { transpileJSX } from '../../utils/transpile.ts';

interface PreviewPaneProps {
  code: string;
  componentName: string;
}

function buildSrcdoc(transpiledCode: string, componentName: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>* { box-sizing: border-box; } body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }</style>
</head>
<body>
  <div id="root"></div>
  <script>
    window.onerror = (msg, _src, _line, _col, err) => {
      parent.postMessage({ type: 'iframe-error', message: err ? err.message : String(msg) }, '*');
      return true;
    };
    window.addEventListener('unhandledrejection', (e) => {
      parent.postMessage({ type: 'iframe-error', message: e.reason?.message ?? String(e.reason) }, '*');
    });
  <\/script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>
  <script>
    const { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext } = React;
    try {
      ${transpiledCode}
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(${componentName}));
    } catch (e) {
      parent.postMessage({ type: 'iframe-error', message: e.message }, '*');
    }
  <\/script>
</body>
</html>`;
}

interface IframeErrorMessage {
  type: 'iframe-error';
  message: string;
}

function isIframeError(data: unknown): data is IframeErrorMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as Record<string, unknown>)['type'] === 'iframe-error' &&
    typeof (data as Record<string, unknown>)['message'] === 'string'
  );
}

export default function PreviewPane({ code, componentName }: PreviewPaneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setErrorMsg(null);
    const timerId = setTimeout(() => {
      void transpileJSX(code).then((result) => {
        if ('error' in result) {
          setErrorMsg(result.error);
          return;
        }
        if (iframeRef.current) {
          iframeRef.current.srcdoc = buildSrcdoc(result.code, componentName);
        }
      });
    }, 500);
    return () => clearTimeout(timerId);
  }, [code, componentName]);

  useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      if (isIframeError(event.data)) {
        setErrorMsg(event.data.message);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className="preview-pane">
      <div className="preview-pane__bar">
        <div className="preview-pane__dots">
          <span className="preview-pane__dot" />
          <span className="preview-pane__dot" />
          <span className="preview-pane__dot" />
        </div>
        <span className="preview-pane__url">localhost:5173</span>
      </div>
      <div className="preview-pane__content">
        {errorMsg !== null && (
          <div className="preview-pane__error">
            <span className="preview-pane__error-label">Error</span>
            <pre className="preview-pane__error-msg">{errorMsg}</pre>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="preview-pane__iframe"
          sandbox="allow-scripts"
          title="preview"
        />
      </div>
    </div>
  );
}
