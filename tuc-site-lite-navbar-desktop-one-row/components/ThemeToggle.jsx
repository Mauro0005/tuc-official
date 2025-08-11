
'use client';
import { useTheme } from './ThemeProvider';
export default function ThemeToggle(){
  const { theme,setTheme } = useTheme();
  const btn=(on)=>"rounded-lg px-2 py-1 text-xs "+(on?"bg-accent text-white":"text-black/70 dark:text-white/70");
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/10 px-1 py-1 backdrop-blur">
      <button className={btn(theme==='light')} onClick={()=>setTheme('light')}>Light</button>
      <button className={btn(theme==='dark')} onClick={()=>setTheme('dark')}>Dark</button>
      <button className={btn(theme==='system')} onClick={()=>setTheme('system')}>System</button>
    </div>
  );
}
