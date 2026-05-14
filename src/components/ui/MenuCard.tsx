"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { Plus, Flame } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import type { MenuItem } from "@/lib/menu";

export function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), {
    stiffness: 150,
    damping: 14,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), {
    stiffness: 150,
    damping: 14,
  });

  return (
    <motion.article
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass brass-edge"
    >
      {/* Hero plate — abstracted dish */}
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, #${item.tone}cc 0%, #${item.tone}55 35%, #1a0e04 80%)`,
        }}
      >
        <DishOrb tone={item.tone} />

        {item.popular && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-saffron/45 bg-night/55 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-saffron backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-saffron" /> Popular
          </span>
        )}

        {item.spicy && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-terracotta/55 bg-night/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest2 text-terracotta backdrop-blur">
            {Array.from({ length: item.spicy }).map((_, i) => (
              <Flame key={i} size={10} />
            ))}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight text-cream">
              {item.name}
            </h3>
            <span
              className="veg-dot mt-1.5 shrink-0"
              data-veg={item.veg ? "true" : "false"}
              aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
            />
          </div>
          {item.description && (
            <p className="mt-2 line-clamp-2 font-body text-[13px] text-cream/55">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-base text-cream">
            {formatINR(item.price)}
          </span>
          <button
            type="button"
            onClick={() => add(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brass-gradient px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-night brass-edge transition hover:brightness-110"
          >
            <Plus size={12} strokeWidth={2.5} />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DishOrb({ tone }: { tone: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-44 w-44">
        {/* steel rim */}
        <div className="absolute inset-0 rounded-full border border-cream/15 bg-gradient-to-br from-cream/20 via-cream/5 to-night shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
        {/* inner dish */}
        <div
          className="absolute inset-2 rounded-full shadow-[inset_0_4px_24px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(255,255,255,0.05)]"
          style={{
            background: `radial-gradient(circle at 35% 35%, #${tone}ff 0%, #${tone}cc 40%, #${tone}55 85%)`,
          }}
        />
        {/* highlight */}
        <div className="absolute left-7 top-6 h-8 w-12 rounded-full bg-cream/30 blur-xl" />
        {/* garnish dots */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-6 -translate-y-2 rounded-full bg-coriander/80" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 translate-x-3 -translate-y-4 rounded-full bg-cream/70" />
      </div>
    </div>
  );
}
