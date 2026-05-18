import './LogoStrip.css';
import Container from '../components/Container.tsx';

const COMPANIES = ['vercel', 'linear', 'figma', 'stripe', 'notion', 'retool'];

export default function LogoStrip() {
  return (
    <Container>
      <div className="logo-strip">
        <span className="logo-strip__label">devs from</span>
        {COMPANIES.map(co => (
          <span key={co} className="logo-strip__company">{co}</span>
        ))}
      </div>
    </Container>
  );
}
