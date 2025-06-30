import React from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-4 p-4">
      <Link href="/" className="font-bold text-xl">
        WORD HIVE
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/hints">Hints</Link>
        <Link href="/solution">Solve</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
