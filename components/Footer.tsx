import Link from "@components/Link";
import type React from "react";

const Footer: React.FC = () => (
  <footer className="border-gray-100 border-t px-5 py-12 md:px-8 dark:border-gray-800">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-start px-5 sm:px-4 xl:px-0">
      <Link className="underline-offset-0" href="https://p6n.dev">
        p6n.dev
      </Link>
      <Copyright />
    </div>
  </footer>
);

export default Footer;

const FooterListLink: React.FC<{
  href: string;
  children?: React.ReactNode;
}> = ({ children, href }) => (
  <li>
    <Link className="hover:text-foreground" href={href}>
      {children}
    </Link>
  </li>
);

const Copyright: React.FC = () => (
  <div className="w-full text-gray-500 text-xs dark:text-gray-400">
    Copyright © {new Date().getFullYear()}{" "}
    <Link href="https://p6n.dev">p6n.dev</Link> <br />
    All rights reserved.
  </div>
);
