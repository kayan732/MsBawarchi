"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const VALUES = [
  {
    title: "Home-style recipes",
    body: "The dishes our grandmothers cooked, written down for the first time and made every day.",
    accent: "#E8A33D",
    glyph: <GheeJar />,
  },
  {
    title: "No preservatives",
    body: "Cooked fresh, sent out within the hour. If it sits long enough to need preservatives, we don't sell it.",
    accent: "#4A7C3A",
    glyph: <Leaf />,
  },
  {
    title: "Pre-order fresh",
    body: "We cook against the day's orders, not against an inventory. Every tiffin is hand-made the same day.",
    accent: "#FFB347",
    glyph: <ClockGlyph />,
  },
  {
    title: "Real ghee, real spices",
    body: "Hand-pounded masalas, A2 ghee, slow-cooked dals. No flavour shortcuts in the Bawarchi kitchen.",
    accent: "#B8862F",
    glyph: <MasalaDabba />,
  },
  {
    title: "Mumbai's premium tiffin",
    body: "Built for a city that misses ghar ka khaana. Designed for the way Mumbai actually eats.",
    accent: "#C84B31",
    glyph: <City />,
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-night py-32 md:py-40"
    >
      <div className="container-x">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <div>
            <SectionLabel number="06" label="Why Ms Bawarchi" />
            <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
              Built like a kitchen,
              <span className="block italic text-saffron-gradient">
                run like a craft.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-balance font-body text-cream/65 md:justify-self-end md:text-right">
            The values that keep ghar-ka-khaana ghar-ka — even when it
            arrives in a tiffin.
          </p>
        </div>
      </div>

      {/* horizontal scroll rail */}
      <div className="scrollbar-hidden mt-14 overflow-x-auto pb-6">
        <ul className="flex w-max gap-6 px-6 md:px-10">
          {VALUES.map((v, i) => (
            <motion.li
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.07,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="group relative flex h-[420px] w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl glass p-7 brass-edge md:w-[340px]"
            >
              <div
                className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: v.accent }}
              />
              <div className="relative h-32">{v.glyph}</div>
              <div className="relative">
                <h3 className="font-display text-2xl text-cream">
                  {v.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-cream/60">
                  {v.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────── 3D-ish glyphs ───────────────── */

const G_DEF = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FFD27A" />
      <stop offset="55%" stopColor="#E8A33D" />
      <stop offset="100%" stopColor="#8B6420" />
    </linearGradient>
  </defs>
);

function GheeJar() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-auto" aria-hidden="true">
      {G_DEF("ghee")}
      <rect x="28" y="34" width="40" height="48" rx="6" fill="url(#ghee)" />
      <rect x="24" y="28" width="48" height="8" rx="2" fill="#F5EDD9" />
      <rect x="32" y="46" width="32" height="20" rx="2" fill="#7A2E2E" opacity="0.7" />
      <text
        x="48"
        y="60"
        textAnchor="middle"
        fontSize="7"
        fontFamily="serif"
        fill="#F5EDD9"
      >
        GHEE
      </text>
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-auto" aria-hidden="true">
      {G_DEF("leaf")}
      <path
        d="M16 70 Q40 8 80 18 Q72 70 16 70 Z"
        fill="url(#leaf)"
        opacity="0.85"
      />
      <path
        d="M16 70 Q44 50 80 18"
        stroke="#4A7C3A"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-auto" aria-hidden="true">
      {G_DEF("clk")}
      <circle cx="48" cy="48" r="32" fill="none" stroke="url(#clk)" strokeWidth="2" />
      <line x1="48" y1="48" x2="48" y2="26" stroke="url(#clk)" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="48" x2="64" y2="48" stroke="url(#clk)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="48" r="2" fill="#FFD27A" />
    </svg>
  );
}

function MasalaDabba() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-auto" aria-hidden="true">
      {G_DEF("md")}
      <circle cx="48" cy="48" r="34" fill="url(#md)" opacity="0.4" />
      <circle cx="48" cy="48" r="32" fill="none" stroke="url(#md)" strokeWidth="1.5" />
      {[
        { x: 48, y: 28, c: "#E8A33D" },
        { x: 66, y: 38, c: "#C84B31" },
        { x: 66, y: 58, c: "#7A2E2E" },
        { x: 48, y: 68, c: "#4A7C3A" },
        { x: 30, y: 58, c: "#F5EDD9" },
        { x: 30, y: 38, c: "#8B6420" },
        { x: 48, y: 48, c: "#E8A33D" },
      ].map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={i === 6 ? 8 : 7}
          fill={c.c}
          stroke="#0A0A0A"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

function City() {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-auto" aria-hidden="true">
      {G_DEF("cty")}
      <rect x="14" y="40" width="14" height="36" fill="url(#cty)" opacity="0.85" />
      <rect x="32" y="30" width="14" height="46" fill="url(#cty)" />
      <rect x="50" y="36" width="14" height="40" fill="url(#cty)" opacity="0.85" />
      <rect x="68" y="44" width="14" height="32" fill="url(#cty)" opacity="0.7" />
      <line x1="10" y1="76" x2="86" y2="76" stroke="#8B6420" strokeWidth="1.2" />
    </svg>
  );
}
