import './Button.css';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  compact?: boolean;
  mono?: boolean;
  disabled?: boolean;
  to?: string;
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
  to,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
}: ButtonProps) {
  const props = {
    className: 'btn',
    'data-variant': variant,
    'data-compact': compact ? '' : undefined,
    'data-mono': mono ? '' : undefined,
    style,
  };

  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
