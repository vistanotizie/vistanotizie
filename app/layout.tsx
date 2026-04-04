import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VistaNotizie",
  description: "Notizie aggiornate, ordinate per argomento e citta.",
  icons: {
    icon: "/icon.svg"
  },
  openGraph: {
    title: "VistaNotizie",
    description: "Notizie aggiornate, ordinate per argomento e citta.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
