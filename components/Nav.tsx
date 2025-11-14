"use client"
import React from "react"
import Link from "@components/Link"
import Logo from "@components/Logo"
import { Moon, Sun, Rss } from "react-feather"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { cn } from "../utils"

const Nav: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  const pathname = usePathname()

  const isBlogPage = pathname.includes("/p/")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="px-5 md:px-8">
        <nav className="max-w-6xl mx-auto py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-4">
            <Logo />
            <span className="text-xl font-heading">p6n blog</span>
          </Link>
          <div className="h-9 w-9" />
        </nav>
      </div>
    )
  }

  return (
    <div className="px-5 md:px-8">
      <nav
        className={cn(
          "max-w-6xl mx-auto py-6 flex justify-between items-center border-transparent",
          !isBlogPage ? "" : "border-gray-100 dark:border-gray-800"
        )}
      >
        <Link href="/" className="flex items-center space-x-4">
          <Logo />
          <span className="text-xl font-heading">p6n blog</span>
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </nav>
    </div>
  )
}

export default Nav
