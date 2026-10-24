"use client";

/**
 * @author: @dorianbaffier (adapted for bulletproof React 19 Next.js theme toggling)
 * @description: Switch Button
 * @version: 2.1.0
 * @website: https://kokonutui.com
 */

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

interface SwitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default" | "lg";
  showLabel?: boolean;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  reveal?: boolean;
}

const SIZES = {
  sm: { button: "h-8 gap-1.5 px-2.5 text-[12px]", square: "w-8", icon: 14 },
  default: { button: "h-9 gap-2 px-3 text-xs", square: "w-9", icon: 16 },
  lg: { button: "h-10 gap-2 px-3.5 text-sm", square: "w-10", icon: 18 },
};

const REVEAL_ATTR = "data-theme-reveal";
const REVEAL_STYLE_ID = "kokonut-theme-reveal";
const REVEAL_CSS = `
html[${REVEAL_ATTR}]::view-transition-old(root),
html[${REVEAL_ATTR}]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
`;

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const RAYS = RAY_ANGLES.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  const at = (r: number) => ({
    x: Number((12 + r * Math.cos(rad)).toFixed(2)),
    y: Number((12 + r * Math.sin(rad)).toFixed(2)),
  });
  return { deg, from: at(7.5), to: at(10) };
});

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ensureRevealStyle() {
  if (typeof document === "undefined" || document.getElementById(REVEAL_STYLE_ID)) {
    return;
  }
  const style = document.createElement("style");
  style.id = REVEAL_STYLE_ID;
  style.textContent = REVEAL_CSS;
  document.head.appendChild(style);
}

export default function SwitchButton({
  className,
  size = "default",
  showLabel = false,
  theme,
  onThemeChange,
  reveal = true,
  onClick,
  ...props
}: SwitchButtonProps) {
  const maskId = useId().replace(/:/g, "") + "-moon";
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Sync state with DOM on mount and on class changes
  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const sizing = SIZES[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const root = document.documentElement;
    const currentlyDark = root.classList.contains("dark");
    const nextTheme: Theme = currentlyDark ? "light" : "dark";

    const changeTheme = () => {
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.style.colorScheme = "light";
      }
      localStorage.setItem("theme", nextTheme);
      setIsDark(nextTheme === "dark");
      onThemeChange?.(nextTheme);
    };

    // Try circular view transition if supported, otherwise toggle cleanly
    const doc = document as any;
    if (
      !reveal ||
      typeof doc.startViewTransition !== "function" ||
      prefersReducedMotion()
    ) {
      changeTheme();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    ensureRevealStyle();
    root.setAttribute(REVEAL_ATTR, "");

    try {
      const transition = doc.startViewTransition(() => {
        changeTheme();
      });

      transition.ready
        ?.then(() => {
          try {
            root.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${radius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 450,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          } catch {
            // Fallback if WAAPI pseudoElement is unsupported
          }
        })
        .catch(() => {});

      transition.finished?.finally(() => {
        root.removeAttribute(REVEAL_ATTR);
      });
    } catch {
      root.removeAttribute(REVEAL_ATTR);
      changeTheme();
    }
  };

  // Prevent hydration mismatch
  const activeDark = mounted ? isDark : true;

  return (
    <button
      aria-label="Toggle dark/light theme"
      aria-pressed={activeDark}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-full font-medium",
        "border border-black/10 bg-white/80 text-zinc-900 shadow-sm backdrop-blur-md",
        "dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-100",
        "hover:border-black/20 hover:bg-zinc-100 dark:hover:border-white/20 dark:hover:bg-white/[0.1]",
        "active:scale-95 transition-all duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        sizing.button,
        !showLabel && cn(sizing.square, "px-0"),
        className
      )}
      type="button"
      {...props}
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none shrink-0 overflow-visible"
        fill="none"
        height={sizing.icon}
        viewBox="0 0 24 24"
        width={sizing.icon}
      >
        <mask id={maskId}>
          <rect fill="white" height="32" width="32" x="-4" y="-4" />
          <circle
            className="transition-transform duration-300 ease-out"
            style={{
              transform: activeDark
                ? "translate(0px, 0px)"
                : "translate(10px, -10px)",
            }}
            cx="17"
            cy="7"
            fill="black"
            r="7.5"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <circle
            className="origin-[12px_12px] [transform-box:view-box] transition-transform duration-300 ease-out"
            style={{
              transform: activeDark ? "scale(1.75)" : "scale(1)",
            }}
            cx="12"
            cy="12"
            fill="currentColor"
            r="4.75"
          />
        </g>
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
          {RAYS.map((ray, index) => (
            <line
              key={ray.deg}
              className="origin-[12px_12px] [transform-box:view-box] transition-all duration-300 ease-out"
              style={{
                transform: activeDark ? "scale(0.4)" : "scale(1)",
                opacity: activeDark ? 0 : 1,
                transitionDelay: activeDark
                  ? `${index * 15}ms`
                  : `${80 + index * 15}ms`,
              }}
              x1={ray.from.x}
              x2={ray.to.x}
              y1={ray.from.y}
              y2={ray.to.y}
            />
          ))}
        </g>
      </svg>
      {showLabel && (
        <span aria-hidden="true" className="font-mono text-[11px] uppercase tracking-wider">
          {activeDark ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
