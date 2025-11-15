"use client";
import Link from "@components/Link";
import Logo from "@components/Logo";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";
import { Moon, Sun } from "react-feather";
import { cn } from "../utils";

const Nav: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const pathname = usePathname();

  const isBlogPage = pathname.includes("/p/");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-5 md:px-8">
        <nav className="mx-auto flex max-w-6xl items-center justify-between py-6">
          <Link className="flex items-center space-x-4" href="/">
            <Logo />
            <div className="flex flex-col items-start">
              <span className="font-heading text-xl">paul planchon's</span>
              <span className="mt-[-1.5px] text-sm">blog</span>
            </div>
          </Link>
          <div className="h-9 w-9" />
        </nav>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-8">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between border-transparent py-6",
          isBlogPage ? "border-gray-100 dark:border-gray-800" : ""
        )}
      >
        <Link className="flex items-center space-x-4" href="/">
          <Logo />
          <div className="flex flex-col items-start">
            <span className="font-heading text-xl">paul planchon's</span>
            <span className="mt-[-1.5px] text-sm">blog</span>
          </div>
        </Link>
        <button
          aria-label="Toggle theme"
          className="rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default Nav;
