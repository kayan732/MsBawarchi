"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

function HeroFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/30 blur-[120px]" />
    </div>
  );
}

const HEADLINE_LINES = ["Ghar Jaisa Swaad", "Har Bite Mein"] as const;
const SUBTITLE =
  "Mumbai's homestyle tiffin & classic Indian cuisine, delivered on pre-order.";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.2]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <motion.div
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
        className="absolute inset-0"
      >
        <HeroScene />
      </motion.div>

      {/* Vignette + god-ray overlay for warmth on top of 3D */}
      <div className="god-rays absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      <motion.div
        style={{ opacity: copyOpacity, y: copyY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-brass/35 bg-night/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-saffron/90 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron shadow-[0_0_10px_2px_rgba(232,163,61,0.7)]" />
          Mumbai · Andheri · est. 2024
        </span>

        <h1 className="font-display text-balance text-[clamp(2.6rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
          {HEADLINE_LINES.map((line, lineIdx) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "120%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.15 + lineIdx * 0.18,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className={
                  lineIdx === 0
                    ? "inline-block text-saffron-gradient italic"
                    : "inline-block text-cream"
                }
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
          className="mt-7 max-w-xl text-balance font-body text-base text-cream/70 md:text-lg"
        >
          {SUBTITLE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link href="/#subscribe" className="btn-primary">
            Order Tiffin
          </Link>
          <Link href="/#menu" className="btn-ghost">
            Pre-Order Today&apos;s Menu
          </Link>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-cream/40"
          >
            <span>Scroll</span>
            <ArrowDown size={14} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
