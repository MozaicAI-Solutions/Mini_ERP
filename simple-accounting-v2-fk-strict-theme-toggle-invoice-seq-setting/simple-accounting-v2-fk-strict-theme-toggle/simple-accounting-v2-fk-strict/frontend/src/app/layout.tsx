import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ThemeToggle } from './ui/ThemeToggle';

export const metadata = {
  title: 'Z&M Bremen ',
};

function TopNav() {
  return (
    <div className="nav">
      <Link href="/">Dashboard</Link>
      <Link href="/customers">Kunden</Link>
      <Link href="/orders">Aufträge</Link>
      <Link href="/sites">Baustellen</Link>
      <Link href="/employees">Mitarbeiter</Link>
      <Link href="/work-entries">Arbeitszeiten</Link>
      <Link href="/stundentabelle">Stundentabelle</Link>
      <Link href="/invoices/drafts">Entwürfe</Link>
      <Link href="/invoices">Rechnungen</Link>
      <Link href="/reports/hours">Stundenübersicht</Link>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash by setting the theme before React mounts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const key = 'sa_theme';
    const saved = localStorage.getItem(key);
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div>
              <div className="muted">Z&M Rechnungen</div>
              <h1>Geschäftsführer-Portal</h1>
            </div>
            <div className="headerRight">
              <ThemeToggle />
              <TopNav />
            </div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
