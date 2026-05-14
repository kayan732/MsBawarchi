"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya M.",
    handle: "Andheri West",
    quote:
      "The dal makhani is the closest thing to my Nani's. I gave up on tiffin services years ago. Ms Bawarchi changed my mind.",
    rating: 5,
  },
  {
    name: "Aman G.",
    handle: "Lokhandwala",
    quote:
      "I've been on the weekly plan for three months. The variety, the warmth, the fact that I don't have to think — it's a quiet luxury.",
    rating: 5,
  },
  {
    name: "Riya K.",
    handle: "Versova",
    quote:
      "The cream chicken is unreal. Real ghee, real spices — you can taste it the second you open the box.",
    rating: 5,
  },
  {
    name: "Saurabh D.",
    handle: "Jogeshwari",
    quote:
      "Ordered for my parents while they were visiting. Mom asked for the kadhi recipe. That's a five-star rating in our house.",
    rating: 5,
  },
  {
    name: "Tanvi S.",
    handle: "Oshiwara",
    quote:
      "The monthly plan paid for itself in week two — better than my fridge, my cook, and my mood.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-night py-32 md:py-44"
    >
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel
            number="07"
            label="Tiffins in the wild"
            className="justify-center"
          />
          <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
            Notes from the
            <span className="block italic text-saffron-gradient">
              dining table.
            </span>
          </h2>
        </div>
      </div>

      {/* Polaroid drift rail */}
      <div className="scrollbar-hidden mt-16 overflow-x-auto pb-10">
        <ul className="flex w-max gap-6 px-6 md:px-10">
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -3 : 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 1,
                delay: i * 0.07,
                ease: [0.65, 0, 0.35, 1],
              }}
              whileHover={{
                rotate: 0,
                y: -8,
                transition: { duration: 0.4 },
              }}
              className="relative w-[340px] shrink-0"
              style={{
                rotate: `${i % 2 === 0 ? -3 : 2}deg`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="glass rounded-3xl p-7 brass-edge shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1 text-saffron">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 font-display text-lg leading-snug text-cream/85">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-brass/15 pt-4">
                  <span className="font-display text-base text-cream">
                    {t.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-cream/45">
                    {t.handle}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
