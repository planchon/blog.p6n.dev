import "@styles/globals.css"
import { Metadata } from "next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CSPostHogProvider } from "./provider"

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
}

const P6NBlog = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/icon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/icon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <SpeedInsights />
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  )
}

export default P6NBlog
