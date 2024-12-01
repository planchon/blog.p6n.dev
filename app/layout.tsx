import "@styles/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "P6N Blog",
  description: "P6N Blog",
}

const P6NBlog = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SpeedInsights />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export default P6NBlog
