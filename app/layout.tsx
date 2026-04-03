import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VistaNotizie",
  description: "Le notizie del momento, spiegate bene e divise per categoria e città."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
