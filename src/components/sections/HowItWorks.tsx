"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Calendar, Flame, Bike } from "lucide-react";
import type { ReactNode } from "react";

const STEPS = [
  {
    number: "01",
    title: "Pre-order by 10 AM",
    description:
      "Pick today's tiffin or any à la carte dish. We close the order book at 10 AM for lunch, 5 PM for dinner.",
    icon: <Calendar size={28} strokeWidth={1.4} />,
  },
  {
    number: "02",
    title: "We cook it fresh",
    description:
      "Each tiffin is hand-cooked in small batches. Real ghee, hand-pounded masalas, no shortcuts.",
    icon: <Flame size={28} strokeWidth={1.4} />,
  },
  {
    number: "03",
    title: "Delivered hot at your slot",
    description:
      "Pick a lunch (12–2 PM) or dinner (7–9 PM) window. Insulated boxes keep it ghar-jaisa hot.",
    icon: <Bike size={28} strokeWidth={1.4} />,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-night py-32 md:py-44"
    >
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel
            number="03"
            label="How it works"
            className="justify-center"
          />
          <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.05] tracking-[-0.01em] text-cream md:text-6xl">
            Three steps to
            <span className="block italic text-saffron-gradient">
              dinner you didn&apos;t cook.
            </span>
          </h2>
        </div>

        <ol className="mt-20 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <FloatingCard key={step.number} index={i}>
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-cream/40">
                {step.number}
              </span>
              <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brass-gradient text-night brass-edge">
                {step.icon}
              </div>
              <h3 className="mt-7 font-display text-2xl font-light text-cream">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-cream/65">
                {step.description}
              </p>
            </FloatingCard>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateY = useTransform(rx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(ry, [-1, 1], [5, -5]);

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.65, 0, 0.35, 1],
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        ry.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="glass relative rounded-3xl p-8 brass-edge transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(232,163,61,0.25)]"
    >
      {children}
    </motion.li>
  );
}
