import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "@/styles/tokens.css";

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
      <body>{children}</body>
    </html>
  );
}
