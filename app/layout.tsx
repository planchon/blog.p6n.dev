import "@styles/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "P6N Blog",
  description: "P6N Blog",
}

const P6NBlog = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default P6NBlog
