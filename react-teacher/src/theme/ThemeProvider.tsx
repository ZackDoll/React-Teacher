import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './useTheme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('hb-theme');
  if (stored === 'ink' || stored === 'paper') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'ink' : 'paper';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem('hb-theme', next);
    document.documentElement.dataset.theme = next;
  };

  const toggle = () => setTheme(theme === 'ink' ? 'paper' : 'ink');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('hb-theme')) {
        setThemeState(e.matches ? 'ink' : 'paper');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
