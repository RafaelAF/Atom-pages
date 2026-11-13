import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';

import { Playfair_Display, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Atom Pages — Landing Pages Sob Demanda",
  description: "Plataforma multi-tenant para celebrações e convites digitais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth ${playfair.variable} ${greatVibes.variable} ${poppins.variable}`}
    >
      <body className="antialiased selection:bg-primary selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

