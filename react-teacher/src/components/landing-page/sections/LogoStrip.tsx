import './LogoStrip.css';
import Container from '../../Container.tsx';

const FEATURES = [
  'Daily puzzles',
  'Browser sandbox',
  'Instant feedback',
  'Peer solutions',
  'Streak tracking',
];

export default function LogoStrip() {
  return (
    <Container>
      <div className="logo-strip">
        {FEATURES.map((feature, i) => (
          <span key={feature} className="logo-strip__feature">
            {i !== 0 && <span className="logo-strip__sep">·</span>}
            {feature}
          </span>
        ))}
      </div>
    </Container>
  );
}
