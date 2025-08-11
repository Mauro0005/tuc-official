
export default function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Blurred color blobs */}
      <div className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-emerald-300/30 to-teal-600/20 blur-3xl dark:from-emerald-400/15 dark:to-emerald-900/20" />
      <div className="absolute -bottom-32 -right-24 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-emerald-200/25 to-emerald-700/20 blur-3xl dark:from-emerald-300/10 dark:to-emerald-900/25" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,rgba(0,0,0,0.05)_2px,transparent_0)] dark:bg-[radial-gradient(circle_at_25px_25px,rgba(255,255,255,0.06)_2px,transparent_0)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}
