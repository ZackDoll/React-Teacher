export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PuzzleTest {
  name: string;
  detail: string;
}

export interface PreviewConfig {
  componentName: string;
}

export interface Puzzle {
  id: string;
  title: string;
  difficulty: Difficulty;
  tag: string;
  description: string;
  filename: string;
  broken: string;
  fixed: string;
  tests: PuzzleTest[];
  consoleOutput: string;
  preview?: PreviewConfig;
}

export interface PuzzleListItem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tag: string;
}

const PUZZLES: Puzzle[] = [
  {
    id: '014',
    title: 'Fix the infinite render loop',
    difficulty: 'easy',
    tag: 'hooks',
    description:
      'This Counter component causes an infinite render loop. The useEffect hook calls setCount on every render, which triggers another render — which calls setCount again, which triggers another render, and so on until React bails out with a "Maximum update depth exceeded" error.\n\nThe root issue is that count is listed as a dependency of the effect, but the effect itself modifies count. Every time count changes, the effect fires. Every time the effect fires, count changes. There is no exit condition.\n\nThe fix is straightforward: remove the useEffect entirely. State updates in response to user interaction belong in event handlers, not effects. Wire setCount to an onClick handler on the button instead. Use the functional updater form (c => c + 1) so the increment does not close over a stale value of count — this is especially important if the handler could ever be called multiple times in quick succession.\n\nAs a rule of thumb: if you find yourself writing useEffect to update state based on other state, that is almost always a sign that the logic belongs in an event handler or can be computed as derived state during render.',
    filename: 'Counter.jsx',
    broken: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <button>{count}</button>;
}`,
    fixed: `function Counter() {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(c => c + 1);

  return <button onClick={onClick}>{count}</button>;
}`,
    tests: [
      { name: 'renders a button with count',  detail: 'button element with numeric text content' },
      { name: 'increments on click',          detail: 'count increases by 1 on each click'       },
      { name: 'does not loop on render',      detail: 'no infinite re-render cycles detected'    },
    ],
    consoleOutput:
      'Warning: Maximum update depth exceeded. Check the useEffect in Counter — it triggers a state update on every render.',
    preview: { componentName: 'Counter' },
  },
];

const DIFFICULTIES = new Set<string>(['easy', 'medium', 'hard']);
const COMPONENT_NAME_RE = /^[A-Z][A-Za-z0-9]*$/;
const FILENAME_RE = /^[\w.-]+$/;
const ID_RE = /^[\w-]+$/;

function isValidPuzzle(p: unknown): p is Puzzle {
  if (typeof p !== 'object' || p === null) return false;
  const x = p as Record<string, unknown>;
  if (typeof x['id'] !== 'string' || !ID_RE.test(x['id'])) return false;
  if (typeof x['title'] !== 'string' || x['title'].length === 0) return false;
  if (typeof x['difficulty'] !== 'string' || !DIFFICULTIES.has(x['difficulty'])) return false;
  if (typeof x['tag'] !== 'string' || x['tag'].length === 0) return false;
  if (typeof x['description'] !== 'string') return false;
  if (typeof x['filename'] !== 'string' || !FILENAME_RE.test(x['filename'])) return false;
  if (typeof x['broken'] !== 'string' || typeof x['fixed'] !== 'string') return false;
  if (typeof x['consoleOutput'] !== 'string') return false;
  if (!Array.isArray(x['tests'])) return false;
  if (x['preview'] !== undefined) {
    const prev = x['preview'] as Record<string, unknown>;
    if (typeof prev['componentName'] !== 'string' || !COMPONENT_NAME_RE.test(prev['componentName'])) return false;
  }
  return true;
}

export async function getPuzzle(id: string): Promise<Puzzle | null> {
  const puzzle = PUZZLES.find(p => p.id === id);
  if (!puzzle || !isValidPuzzle(puzzle)) return null;
  return Promise.resolve(puzzle);
}

export async function listPuzzles(): Promise<PuzzleListItem[]> {
  return Promise.resolve(
    PUZZLES.filter(isValidPuzzle).map(({ id, title, difficulty, tag }) => ({ id, title, difficulty, tag }))
  );
}
