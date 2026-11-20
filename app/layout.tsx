import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site, socials } from "@/content/site";
import { Providers } from "@/components/Providers";
import { ReelTimer } from "@/components/motion/ReelTimer";
import { Cursor } from "@/components/motion/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ATL in 60 Seconds | Atlanta Food Reviews, UGC & Food Marketing",
    template: "%s | ATL in 60 Seconds",
  },
  description: site.description,
  keywords: [
    "Atlanta food influencer",
    "Atlanta food reviews",
    "Atlanta UGC creators",
    "restaurant marketing Atlanta",
    "Atlanta foodie",
    "Metro Atlanta restaurants",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: "ATL in 60 Seconds | Atlanta, one bite at a time.",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/atl60-badge.png`,
  email: site.contact.email,
  telephone: site.contact.phone,
  foundingDate: String(site.established),
  areaServed: "Metro Atlanta, GA",
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <ReelTimer />
          <Cursor />
        </Providers>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
