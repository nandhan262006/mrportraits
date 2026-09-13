import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mr. Portrait's Photography | Best Wedding Photographer in Eluru",
    template: "%s | Mr. Portrait's Photography",
  },
  description:
    "Mr. Portrait's Photography — Eluru's top-rated photography studio (5.0 ★, 164 Google reviews). Weddings, pre-weddings, portraits, maternity, baby and event photography in Eluru, Andhra Pradesh.",
  applicationName: "Mr. Portrait's Photography",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/gallery/favicon.png", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Mr. Portrait's Photography",
    title: "Mr. Portrait's Photography | Best Wedding Photographer in Eluru",
    description:
      "Weddings, pre-weddings, maternity, portraits, baby and event photography in Eluru, Andhra Pradesh. Rated 5.0 on Google by 164 happy clients.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1536,
        height: 1024,
        alt: "Mr. Portrait's Photography — Wedding & Event Photography Studio, Eluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Portrait's Photography | Best Wedding Photographer in Eluru",
    description:
      "Weddings, pre-weddings, maternity, portraits and event photography in Eluru, Andhra Pradesh.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}