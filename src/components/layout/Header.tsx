"use client";

import MorphicNavbar from "@/components/ui/MorphicNavbar";
import SwitchButton from "@/components/ui/SwitchButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 sm:px-8 md:px-12 py-4 pointer-events-none">
      {/* Centered Morphic Split Navigation */}
      <div className="pointer-events-auto">
        <MorphicNavbar compact={false} />
      </div>

      {/* Theme Switcher in Top Right */}
      <div className="pointer-events-auto absolute right-4 sm:right-8 md:right-12">
        <SwitchButton size="default" showLabel={false} />
      </div>
    </header>
  );
}
