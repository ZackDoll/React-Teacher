import './Chip.css';
import { type ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  tone?: 'accent' | 'warn' | 'muted';
}

export default function Chip({ children, tone = 'accent' }: ChipProps) {
  return (
    <span className="chip" data-tone={tone}>
      {children}
    </span>
  );
}
