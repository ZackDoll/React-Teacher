import './LandingPage.css';
import Nav from '../components/Nav.tsx';
import Footer from '../components/Footer.tsx';
import Hero from '../components/sections/Hero.tsx';
import LogoStrip from '../components/sections/LogoStrip.tsx';
import HowItWorks from '../components/sections/HowItWorks.tsx';
import Tracks from '../components/sections/Tracks.tsx';
import Leaderboard from '../components/sections/Leaderboard.tsx';
import FooterCTA from '../components/sections/FooterCTA.tsx';

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
