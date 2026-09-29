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
  title: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim Septiardy! ❤️",
  description:
    "Sebuah persembahan kecil untuk merayakan hari spesialmu dan perjalanan satu tahun kita bersama. Dibuat dengan segenap cinta khusus untuk Ibrahim Septiardy.",
  keywords: [
    "Ibrahim Septiardy",
    "ulang tahun",
    "1st anniversary",
    "perayaan satu tahun",
    "kenangan bersama",
    "surat cinta",
  ],
  authors: [{ name: "Pasangan Tersayang" }],
  openGraph: {
    title: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim Septiardy! ❤️",
    description:
      "Sebuah persembahan kecil untuk merayakan hari spesialmu dan perjalanan satu tahun kita bersama.",
    type: "website",
    locale: "id_ID",
    siteName: "Perayaan Spesial Ibrahim Septiardy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selamat Ulang Tahun & Happy 1st Anniversary, Ibrahim Septiardy! ❤️",
    description:
      "Sebuah persembahan kecil untuk merayakan hari spesialmu dan perjalanan satu tahun kita bersama.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable}`}>
      <body className="font-sans bg-bday-bg text-bday-text min-h-screen selection:bg-bday-secondary selection:text-bday-text antialiased">
        {children}
      </body>
    </html>
  );
}
