export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PuzzleTest {
  name: string;
  detail: string;
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
      'This Counter component causes an infinite render loop. The useEffect hook calls setCount on every render, which triggers another render. Remove the effect and wire the increment to a click handler instead.',
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
