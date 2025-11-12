import "@styles/globals.css";
import Footer from "@components/Footer";
import Nav from "@components/Nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "p6n blog - software, startups, and life",
  abstract: "Paul Planchon personal blog about software, startups, and life.",
  description:
    "Paul Planchon personal blog about software, startups, and life.",
  keywords: "software, startups, life",
  authors: [{ name: "Paul Planchon", url: "https://p6n.dev" }],
  creator: "Paul Planchon",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "p6n blog - software, startups, and life",
    description:
      "Paul Planchon personal blog about software, startups, and life.",
    type: "website",
    url: "https://blog.p6n.dev",
    siteName: "p6n blog - software, startups, and life",
  },
};

const P6NBlog = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <link
        href="/icons/icon-180x180.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/icons/icon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/icons/icon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/manifest.json" rel="manifest" />
    </head>
    <body>
      <Nav />
      <SpeedInsights />
      <Analytics />
      <div className="relative min-h-screen overflow-x-hidden">{children}</div>
      <Footer />
    </body>
  </html>
);

export default P6NBlog;
