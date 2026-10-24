"use client";

import Link from "next/link";
import MorphicNavbar from "@/components/ui/MorphicNavbar";
import SwitchButton from "@/components/ui/SwitchButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 pointer-events-none">
      {/* Brand Logo */}
      <div className="pointer-events-auto flex items-center gap-2">
        <Link
          href="/"
          className="group flex items-center text-lg sm:text-xl font-black tracking-tighter text-zinc-900 dark:text-white transition-transform active:scale-95"
        >
          <span>AM</span>
          <span className="text-blue-600 dark:text-[#AEC6FF] transition-colors group-hover:scale-125 inline-block">
            .
          </span>
        </Link>
      </div>

      {/* Morphic Split Nav */}
      <div className="pointer-events-auto">
        <MorphicNavbar compact={true} />
      </div>

      {/* Light / Dark Mode Toggle */}
      <div className="pointer-events-auto flex items-center">
        <SwitchButton size="default" showLabel={false} />
      </div>
    </header>
  );
}
