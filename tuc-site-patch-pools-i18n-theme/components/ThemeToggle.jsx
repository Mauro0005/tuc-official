'use client';
import { useTheme } from '@/components/ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const cls = (active) => "rounded-lg px-2 py-1 text-xs " + (active ? "bg-accent text-white shadow" : "text-black/70 dark:text-white/70");
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/10 px-1 py-1 backdrop-blur">
      <button type="button" aria-pressed={theme==='light'} onClick={() => setTheme('light')} className={cls(theme==='light')}>Light</button>
      <button type="button" aria-pressed={theme==='dark'} onClick={() => setTheme('dark')} className={cls(theme==='dark')}>Dark</button>
      <button type="button" aria-pressed={theme==='system'} onClick={() => setTheme('system')} className={cls(theme==='system')}>System</button>
    </div>
  );
}
