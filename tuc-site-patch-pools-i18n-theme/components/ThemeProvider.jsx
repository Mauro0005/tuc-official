'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'system', setTheme: (_)=>{} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('tuc-theme') : null;
    const t = saved || 'system';
    applyTheme(t);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if ((localStorage.getItem('tuc-theme')||'system')==='system') applyTheme('system'); };
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  function applyTheme(t) {
    setTheme(t);
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const isDark = t === 'dark' || (t === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    localStorage.setItem('tuc-theme', t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(){ return useContext(ThemeContext); }
