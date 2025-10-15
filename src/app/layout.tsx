import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop smart',
  description: 'Shop smart, compre oque você precisa',
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
