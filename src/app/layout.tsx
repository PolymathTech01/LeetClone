'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leet code clone',
  description: 'A leet code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <RecoilRoot>
        <head>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
        </head>
        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
