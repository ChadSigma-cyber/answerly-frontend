import './globals.css';
import type { Metadata } from 'next';
import "katex/dist/katex.min.css";
import Script from "next/script";

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H5TGTBGR81"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H5TGTBGR81');
          `}
        </Script>
      </head>
      <body className="overflow-hidden bg-black">
        {children}
      </body>
    </html>
  );
}
