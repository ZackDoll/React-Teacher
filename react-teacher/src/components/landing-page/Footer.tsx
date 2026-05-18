import './Footer.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo.tsx';
import Container from '../Container.tsx';

const FOOTER_LINKS: { label: string; to: string }[] = [
  { label: 'Puzzles',   to: '/puzzles'   },
  { label: 'Pricing',   to: '/pricing'   },
  { label: 'Changelog', to: '/changelog' },
  { label: 'Discord',   to: '/discord'   },
  { label: 'Privacy',   to: '/privacy'   },
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <Logo />
          <div className="footer__links">
            {FOOTER_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="footer__link">{label}</Link>
            ))}
          </div>
          <div className="footer__version">v2026.5 · built in Los Angeles</div>
        </div>
      </Container>
    </footer>
  );
}
