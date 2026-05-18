import { ThemeProvider } from './theme/ThemeProvider.tsx';
import LandingPage from './pages/LandingPage.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}
