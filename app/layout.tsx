import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const siteUrl = 'https://vistanotizie.it';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'VistaNotizie',
  description: 'Aggregatore moderno di notizie RSS con riassunti AI e immagini dinamiche.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'VistaNotizie',
    description: 'Aggregatore moderno di notizie RSS con riassunti AI e immagini dinamiche.',
    url: siteUrl,
    siteName: 'VistaNotizie',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?title=VistaNotizie`,
        width: 1200,
        height: 630,
        alt: 'VistaNotizie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VistaNotizie',
    description: 'Aggregatore moderno di notizie RSS con riassunti AI e immagini dinamiche.',
    images: [`${siteUrl}/api/og?title=VistaNotizie`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
