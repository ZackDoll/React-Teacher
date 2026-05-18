import './Button.css';
import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  compact?: boolean;
  mono?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  variant = 'primary',
  compact = false,
  mono = false,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
}: ButtonProps) {
  return (
    <button
      className="btn"
      data-variant={variant}
      data-compact={compact ? '' : undefined}
      data-mono={mono ? '' : undefined}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {children}
    </button>
  );
}
