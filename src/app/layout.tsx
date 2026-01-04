import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop smart',
  description: 'Shop smart, compre oque você precisa',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
