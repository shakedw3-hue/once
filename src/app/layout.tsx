import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistrar from "@/components/ui/ServiceWorkerRegistrar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Once",
    default: "Once: The decision that changes everything",
  },
  description:
    "One assessment. One personalized path across Money, Mind, Body, and Spirit. Once Core ₱1,499. Once Pro ₱2,350. Once AI Careers ₱3,950. One decision.",
  metadataBase: new URL("https://onceph.com"),
  openGraph: {
    title: "Once: The decision that changes everything",
    description: "One assessment. One personalized path. One decision that changes everything.",
    url: "https://onceph.com",
    siteName: "Once",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Once" }],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Once: The decision that changes everything",
    description: "One assessment. One personalized path. One decision.",
    images: ["/opengraph-image"],
  },
  icons: {
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  other: {
    "theme-color": "#FAFAFF",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Once",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
