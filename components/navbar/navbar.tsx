import React from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-end gap-4 p-4">
      <Link href="/hints">Hints</Link>
      <Link href="/solution">Solve</Link>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
