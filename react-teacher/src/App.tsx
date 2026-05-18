import './App.css';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import Nav from './components/Nav.tsx';
import Footer from './components/Footer.tsx';
import Hero from './sections/Hero.tsx';
import LogoStrip from './sections/LogoStrip.tsx';
import HowItWorks from './sections/HowItWorks.tsx';
import Tracks from './sections/Tracks.tsx';
import Leaderboard from './sections/Leaderboard.tsx';
import FooterCTA from './sections/FooterCTA.tsx';

function Page() {
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

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
