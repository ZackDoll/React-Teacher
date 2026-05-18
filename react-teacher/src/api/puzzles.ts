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

export async function getPuzzle(id: string): Promise<Puzzle | null> {
  return Promise.resolve(PUZZLES.find(p => p.id === id) ?? null);
}

export async function listPuzzles(): Promise<PuzzleListItem[]> {
  return Promise.resolve(
    PUZZLES.map(({ id, title, difficulty, tag }) => ({ id, title, difficulty, tag }))
  );
}
