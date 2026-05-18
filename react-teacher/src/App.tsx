import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import LandingPage from './pages/LandingPage.tsx';
import PuzzlePage from './pages/PuzzlePage.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/puzzles/:id" element={<PuzzlePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
