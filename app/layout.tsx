import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Answerly',
  description: 'AI Doubt Solver App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="overflow-hidden bg-black">
        {children}
      </body>
    </html>
  );
}

