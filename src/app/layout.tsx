import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "@/styles/tokens.css";
import { ScrollProgress } from "@/components/ScrollProgress/ScrollProgress";
import { BackToTop } from "@/components/BackToTop/BackToTop";
import { Cursor } from "@/components/Cursor/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://raduan-portfolio.vercel.app"),
  title: "Raduan Rahman — Product Analyst & AI Product Owner",
  description:
    "Product Analyst & AI Product Owner in Toronto. Building tools people actually use. Background in SaaS, healthcare, and sports tech.",
  openGraph: {
    title: "Raduan Rahman — Product Analyst & AI Product Owner",
    description: "Building tools people actually use.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        {children}
        <BackToTop />
        <Cursor />
      </body>
    </html>
  );
}
