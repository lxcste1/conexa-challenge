import type { Metadata, Viewport } from "next";
import { Bungee, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick & Morty | Character Episode Explorer",
  description:
    "Compare two Rick and Morty characters and discover their solo and shared episodes across the multiverse.",
  icons: {
    icon: [
      {
        url: "/portal-glow.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/portal-glow.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#1a2238",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, bungee.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
