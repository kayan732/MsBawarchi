"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CATEGORIES, MENU, type MenuCategoryId } from "@/lib/menu";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CategoryGlyph } from "@/components/ui/CategoryGlyph";
import { MenuCard } from "@/components/ui/MenuCard";
import { cn } from "@/lib/utils";

export function MenuCarousel() {
  const [active, setActive] = useState<MenuCategoryId>("tiffin");

  const items = useMemo(
    () => MENU.filter((i) => i.category === active),
    [active],
  );

  const activeCategory = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-night py-28 md:py-40"
    >
      {/* warm wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,179,71,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-x">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <div>
            <SectionLabel number="04" label="Today's menu" />
            <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
              The book of
              <span className="block italic text-saffron-gradient">
                ghar ka khaana.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-balance font-body text-cream/65 md:justify-self-end md:text-right">
            Pre-order any dish below by 10 AM for the lunch slot, 5 PM
            for dinner. Single dishes, minimeals, parathas — or commit
            to a daily tiffin.
          </p>
        </div>

        {/* Category rail */}
        <div className="scrollbar-hidden -mx-6 mt-14 overflow-x-auto px-6 md:mt-20">
          <ul
            role="tablist"
            aria-label="Menu categories"
            className="flex min-w-max gap-3 pb-2"
          >
            {CATEGORIES.map((cat) => {
              const selected = cat.id === active;
              return (
                <li key={cat.id}>
                  <button
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(cat.id)}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-full border px-4 py-3 transition-all duration-500 ease-cinematic md:px-5 md:py-3.5",
                      selected
                        ? "border-saffron/55 bg-night/70 text-cream shadow-[0_8px_30px_-8px_rgba(232,163,61,0.45)]"
                        : "border-brass/20 bg-night/30 text-cream/65 hover:border-brass/45 hover:text-cream",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full transition",
                        selected ? "bg-night/60" : "bg-night/30",
                      )}
                    >
                      <CategoryGlyph kind={cat.glyph} size={28} />
                    </span>
                    <span className="flex flex-col items-start text-left">
                      <span className="font-display text-[13px] leading-tight md:text-sm">
                        {cat.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest2 text-cream/40">
                        {MENU.filter((i) => i.category === cat.id).length} items
                      </span>
                    </span>
                    {selected && (
                      <motion.span
                        layoutId="cat-glow"
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          background:
                            "radial-gradient(closest-side, rgba(232,163,61,0.18), transparent 70%)",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Active category tagline */}
        <div className="mt-10 flex items-baseline justify-between gap-4 border-t border-brass/20 pt-6">
          <p className="font-display text-2xl text-cream md:text-3xl">
            <span className="text-saffron-gradient italic">
              {activeCategory.label}
            </span>{" "}
            <span className="text-cream/45">— {activeCategory.tagline}</span>
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-widest2 text-cream/45 md:block">
            {items.length} dishes
          </p>
        </div>

        {/* Cards grid — feels like a curved film reel via subtle scale/translate */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
