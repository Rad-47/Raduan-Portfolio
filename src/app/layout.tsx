import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/tokens.css";
import { ScrollProgress } from "@/components/ScrollProgress/ScrollProgress";
import { BackToTop } from "@/components/BackToTop/BackToTop";
import { Cursor } from "@/components/Cursor/Cursor";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raduan-portfolio.vercel.app"),
  title: "Raduan Rahman - Software Developer & Product Owner",
  description:
    "Software developer and product owner in Toronto building web, mobile and AI products - from a 0→1 sports app to AI pipelines and internal platforms.",
  openGraph: {
    title: "Raduan Rahman - Software Developer & Product Owner",
    description: "Building tools people actually use.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body>
        <ScrollProgress />
        {children}
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
