import './Nav.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo.tsx';
import Button from '../Button.tsx';
import { useTheme } from '../../theme/useTheme.ts';

const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Puzzles',     to: '/puzzles'     },
  { label: 'Tracks',      to: '/tracks'      },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Pricing',     to: '/pricing'     },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav">
      <div className="nav__inner">
        <Logo />
        <nav className="nav__links">
          {NAV_LINKS.map(({ label, to }, i) => (
            <Link key={label} to={to} className={`nav__link${i === 0 ? ' nav__link--active' : ''}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav__actions">
          <Link to="/signin" className="nav__signin">Sign in</Link>
          <Button compact>Start solving</Button>
          <button
            className="nav__theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'ink' ? 'light' : 'dark'} mode`}
          >
            {theme === 'ink' ? '☀' : '☾'}
          </button>
        </div>
      </div>
      <div className="nav__progress">
        <div className="nav__progress-bar" style={{ width: `${progress * 100}%` }} />
      </div>
    </header>
  );
}
