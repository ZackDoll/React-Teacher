import './LandingPage.css';
import Nav from '../components/landing-page/Nav.tsx';
import Footer from '../components/landing-page/Footer.tsx';
import Hero from '../components/landing-page/sections/Hero.tsx';
import LogoStrip from '../components/landing-page/sections/LogoStrip.tsx';
import HowItWorks from '../components/landing-page/sections/HowItWorks.tsx';
import Tracks from '../components/landing-page/sections/Tracks.tsx';
import Leaderboard from '../components/landing-page/sections/Leaderboard.tsx';
import FooterCTA from '../components/landing-page/sections/FooterCTA.tsx';

export default function LandingPage() {
  return (
    <div className="page">
      <Nav />
      <Hero variant="split" />
      <LogoStrip />
      <HowItWorks />
      <Tracks />
      <Leaderboard />
      <FooterCTA />
      <Footer />
    </div>
  );
}
