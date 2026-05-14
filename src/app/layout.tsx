import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://msbawarchi.in"),
  title: {
    default: "Ms Bawarchi — Ghar Jaisa Swaad, Har Bite Mein",
    template: "%s · Ms Bawarchi",
  },
  description:
    "Mumbai's premium homestyle tiffin and classic Indian cuisine, cooked fresh and delivered on pre-order. Order tiffins, parathas, minimeals, and more.",
  keywords: [
    "tiffin service Mumbai",
    "homestyle Indian food",
    "cloud kitchen",
    "Andheri tiffin",
    "Ms Bawarchi",
    "pre-order Indian meals",
  ],
  openGraph: {
    title: "Ms Bawarchi — Ghar Jaisa Swaad, Har Bite Mein",
    description:
      "Mumbai's premium homestyle tiffin and classic Indian cuisine, delivered on pre-order.",
    type: "website",
    locale: "en_IN",
    siteName: "Ms Bawarchi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ms Bawarchi — Ghar Jaisa Swaad",
    description:
      "Mumbai's premium homestyle tiffin and classic Indian cuisine, delivered on pre-order.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-night text-cream antialiased">
        <CartProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <CartDrawer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
