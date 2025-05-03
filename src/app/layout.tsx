import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ImproofFund | Decentralized Funding Platform',
  description:
    'A web3 funding platform by Yuri Improof. Connect your wallet to fund or withdraw ETH using the ImproofFund smart contract.',
  keywords: [
    'blockchain',
    'ethereum',
    'web3',
    'funding',
    'dapp',
    'decentralized',
    'smart contract',
  ],
  authors: [{ name: 'Yuri Improof' }],
  openGraph: {
    title: 'ImproofFund | Decentralized Funding Platform',
    description:
      'Connect your wallet to fund or withdraw ETH using the ImproofFund smart contract.',
    siteName: 'ImproofFund',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
