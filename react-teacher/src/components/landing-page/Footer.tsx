import './Footer.css';
import Logo from '../Logo.tsx';
import Container from '../Container.tsx';

const FOOTER_LINKS = ['Puzzles', 'Pricing', 'Changelog', 'Discord', 'Privacy'];

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <Logo />
          <div className="footer__links">
            {FOOTER_LINKS.map(label => (
              <a key={label} href="#" className="footer__link">{label}</a>
            ))}
          </div>
          <div className="footer__version">v2026.5 · built in Los Angeles</div>
        </div>
      </Container>
    </footer>
  );
}
