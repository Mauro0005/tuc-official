// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Torneo Urbis Cruoninga',
  description: 'Official outdoor 5v5 tournament in Groningen',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
