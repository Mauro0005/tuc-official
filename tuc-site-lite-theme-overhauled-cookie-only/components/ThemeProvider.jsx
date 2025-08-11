
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext({ theme:'system', setTheme: (_)=>{} });
export function ThemeProvider({ children }){
  const [theme,setTheme]=useState('system');
  useEffect(()=>{const saved=localStorage.getItem('tuc-theme')||'system';apply(saved);
    const mq=window.matchMedia('(prefers-color-scheme: dark)');
    const fn=()=>{ if((localStorage.getItem('tuc-theme')||'system')==='system') apply('system'); };
    mq.addEventListener?.('change',fn); return()=>mq.removeEventListener?.('change',fn);
  },[]);
  function apply(t){setTheme(t);const dark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark',dark);localStorage.setItem('tuc-theme',t);}
  return <ThemeContext.Provider value={{theme,setTheme:apply}}>{children}</ThemeContext.Provider>
}
export function useTheme(){return useContext(ThemeContext)}
