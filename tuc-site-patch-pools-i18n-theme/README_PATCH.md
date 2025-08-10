# TUC Site Patch – Pools + Bilingual FullSchedule + Light/Dark

Copy these files into your Next.js repo (root). Then:
1) Ensure `app/[locale]/layout.jsx` wraps the app with `<ThemeProvider>...</ThemeProvider>` and `Navbar` shows `<ThemeToggle />`.
2) Put your logo at `public/logo.png`.
3) Add team logos at `public/teams/*.png` (we used slugs already).
4) `tailwind.config.js` has `darkMode: 'class'`. Use the provided file or merge with yours.
5) Import and render `<FullSchedule locale={params.locale} />` on your schedule page.

This patch provides:
- components/ThemeProvider.jsx
- components/ThemeToggle.jsx
- components/FullSchedule.jsx (NL/EN + Results column + Dunk contest as event)
- app/[locale]/page.jsx (Home) with Pools A (A–D) and B (E–H)
- app/globals.css (theme tokens)
- next.config.js (contentlayer alias)
- tailwind.config.js (dark mode)
