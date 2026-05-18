import './DiffDot.css';

interface DiffDotProps {
  level?: 'easy' | 'medium' | 'hard';
}

export default function DiffDot({ level = 'easy' }: DiffDotProps) {
  return <span className="diffdot" data-level={level} />;
}
