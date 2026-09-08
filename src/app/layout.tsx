import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FFF9F5",
};

export const metadata: Metadata = {
  title: "A Little Birthday Journey ✨ | A Special Experience",
  description: "A little something made especially for you. An interactive birthday journey filled with memories, wishes, and love.",
  keywords: ["birthday", "interactive story", "celebration", "gift", "memories"],
  authors: [{ name: "A Little Birthday Journey" }],
  openGraph: {
    title: "A Little Birthday Journey ✨",
    description: "A little something made especially for you. Open to reveal your birthday surprise.",
    type: "website",
    locale: "en_US",
    siteName: "A Little Birthday Journey",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Little Birthday Journey ✨",
    description: "A little something made especially for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable}`}>
      <body className="font-sans bg-bday-bg text-bday-text min-h-screen selection:bg-bday-secondary selection:text-bday-text">
        {children}
      </body>
    </html>
  );
}
