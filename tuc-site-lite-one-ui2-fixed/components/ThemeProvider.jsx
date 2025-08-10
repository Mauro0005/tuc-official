
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext({ theme:'system', setTheme: (_)=>{} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('tuc-theme') : null;
    applyTheme(saved || 'system');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const fn = () => { if((localStorage.getItem('tuc-theme')||'system')==='system') applyTheme('system'); };
    mq.addEventListener?.('change', fn);
    return () => mq.removeEventListener?.('change', fn);
  }, []);
  function applyTheme(t){
    setTheme(t);
    if (typeof window==='undefined') return;
    const isDark = t==='dark' || (t==='system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('tuc-theme', t);
  }
  return <ThemeContext.Provider value={{theme,setTheme:applyTheme}}>{children}</ThemeContext.Provider>;
}
export function useTheme(){ return useContext(ThemeContext); }
