import './FooterCTA.css';
import Container from '../../Container.tsx';
import Button from '../../Button.tsx';

export default function FooterCTA() {
  return (
    <section className="footer-cta">
      <Container>
        <div className="footer-cta__panel">
          <div className="footer-cta__left">
            <h3 className="footer-cta__title">
              One puzzle a day. Your React stops being squishy.
            </h3>
            <p className="footer-cta__sub">
              Free forever for the daily puzzle. Pro unlocks the archive, hints, and peer-rated solutions.
            </p>
          </div>
          <div className="footer-cta__btns">
            <Button>Start today's puzzle</Button>
            <Button variant="ghost">See pricing</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
