"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, cartCount } from "@/lib/cart";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#menu", label: "Menu" },
  { href: "/#subscribe", label: "Subscribe" },
  { href: "/#story", label: "Our Story" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const lines = useCart((s) => s.lines);
  const openDrawer = useCart((s) => s.openDrawer);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = cartCount(lines);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-brass/20 bg-night/70 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="z-10"
            aria-label="Ms Bawarchi — home"
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="gold-underline font-body text-[13px] uppercase tracking-widest2 text-cream/85 transition hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Open cart"
              className="relative inline-flex h-10 items-center gap-2 rounded-full border border-brass/35 bg-charcoal/50 px-4 text-cream backdrop-blur transition hover:border-saffron/70 hover:bg-charcoal/80"
            >
              <ShoppingBag size={16} />
              <span className="font-mono text-xs tracking-widest">
                {count.toString().padStart(2, "0")}
              </span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-saffron shadow-[0_0_12px_2px_rgba(232,163,61,0.7)]" />
              )}
            </button>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-charcoal/50 text-cream"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-30 origin-top transition-all duration-300 md:hidden",
          mobileOpen
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <ul className="mx-6 mt-2 space-y-1 rounded-2xl border border-brass/30 bg-night/95 p-3 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 font-body text-sm uppercase tracking-widest2 text-cream/85 hover:bg-charcoal/60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
