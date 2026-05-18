import './Logo.css';

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
}

export default function Logo({ size = 22, withWordmark = true }: LogoProps) {
  return (
    <div className="logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="logo__mark"
      >
        <path
          d="M20 5 L11 5 Q5 5 5 11 L5 21 Q5 27 11 27 L20 27"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 16 H24"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="26" cy="16" r="3" fill="currentColor" />
      </svg>
      {withWordmark && <span className="logo__wordmark">ReactLab</span>}
    </div>
  );
}
