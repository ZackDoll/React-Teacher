import './CodeBlock.css';

interface Token {
  k: 'kw' | 'fn' | 'str' | 'num' | 'cmt' | 'jsx' | 'op' | 'txt';
  v: string;
}

const KEYWORDS = new Set([
  'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
  'import', 'from', 'export', 'default', 'useState', 'useEffect', 'useRef',
  'useMemo', 'useCallback', 'useReducer', 'React',
]);

const RE = /(\/\/.*?$)|(["'`].*?["'`])|(\b\d+\b)|(<\/?[A-Za-z][A-Za-z0-9]*)|([A-Za-z_][A-Za-z0-9_]*)|([{}()[\];,.=+\-*/<>!?:&|])|(\s+)/gms;

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = RE.exec(src)) !== null) {
    const [, cmt, str, num, jsx, ident, op, ws] = m;
    if (cmt)   out.push({ k: 'cmt', v: cmt });
    else if (str)   out.push({ k: 'str', v: str });
    else if (num)   out.push({ k: 'num', v: num });
    else if (jsx)   out.push({ k: 'jsx', v: jsx });
    else if (ident) out.push({ k: KEYWORDS.has(ident) ? 'kw' : (/^[A-Z]/.test(ident) ? 'jsx' : 'fn'), v: ident });
    else if (op)    out.push({ k: 'op', v: op });
    else if (ws)    out.push({ k: 'txt', v: ws });
  }
  return out;
}

interface CodeBlockProps {
  source: string;
}

export default function CodeBlock({ source }: CodeBlockProps) {
  const tokens = tokenize(source);
  return (
    <code className="codeblock">
      {tokens.map((t, i) => (
        <span key={i} className={`codeblock__token codeblock__token--${t.k}`}>{t.v}</span>
      ))}
    </code>
  );
}
