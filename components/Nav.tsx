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

  const pathname = usePathname()

  const isBlogPage = pathname.includes("/p/")

  return (
    <div className="px-5 md:px-8">
      <nav
        className={cn(
          "max-w-6xl mx-auto py-6 flex justify-between items-center border-transparent",
          !isBlogPage ? "" : "border-gray-100"
        )}
      >
        <Link href="/" className="flex items-center space-x-4">
          <Logo />
          <span className="text-xl font-heading">p6n blog</span>
        </Link>
      </nav>
    </div>
  )
}

export default Nav
